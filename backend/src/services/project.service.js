const Project = require('../models/project.model');
const { ApiError } = require('../utils/apiError');
const mongoose = require('mongoose');

class ProjectService {
    /**
     * Create and publish a project in one step
     * @param {string} clientId - The client's ID
     * @param {Object} projectData - The project data
     * @returns {Promise<Object>} Created and published project
     */
    async createAndPublish(clientId, projectData) {
        try {
            // Create project first
            const project = await this.createProject(clientId, projectData);
            
            // Update status to OPEN directly
            project.status = {
                current: 'OPEN',
                history: [
                    {
                        status: 'DRAFT',
                        timestamp: project.createdAt
                    },
                    {
                        status: 'OPEN',
                        timestamp: new Date(),
                        reason: 'Project published on creation'
                    }
                ]
            };

            await project.save();
            return project;
        } catch (error) {
            if (error instanceof ApiError) throw error;
            throw new ApiError(500, 'Error creating and publishing project', error);
        }
    }
    constructor() {
        // Cache frequently accessed data
        this.projectCache = new Map();
        this.PROJECT_CACHE_TTL = 5 * 60 * 1000; // 5 minutes
        this.MAX_CACHE_SIZE = 1000;
    }

    /**
     * Create a new project
     * @param {string} clientId - The client's ID
     * @param {Object} projectData - The project data
     * @returns {Promise<Object>} Created project
     */
    async createProject(clientId, projectData) {
        try {
            // Validate client exists and get profile
            console.log('Searching for client profile with user ID:', clientId);
            const ClientProfile = mongoose.model('ClientProfile');
            const User = mongoose.model('User');

            // First, verify the user exists
            const user = await User.findById(clientId);
            if (!user) {
                throw new ApiError(404, 'User not found');
            }

            // Then find the client profile
            const clientProfile = await ClientProfile.findOne({ user: clientId });
            console.log('Found client profile:', clientProfile);
            
            if (!clientProfile) {
                throw new ApiError(404, 'Client profile not found. Please create your profile first');
            }

            // Create project with initial status
            console.log('Creating project with client profile ID:', clientProfile._id);
            console.log('Project data:', projectData);
            
            // Prepare project data
            const projectDataWithDefaults = {
                ...projectData,
                client: clientProfile._id,
                location: {
                    ...projectData.location,
                    coordinates: projectData.location.coordinates || undefined
                }
            };

            // Create project
            const project = new Project({
                ...projectDataWithDefaults,
                status: {
                    current: 'DRAFT',
                    history: [{
                        status: 'DRAFT',
                        timestamp: new Date()
                    }]
                }
            });

            console.log('Project model before save:', project);

            try {
                // Save project
                await project.save();
            } catch (error) {
                console.error('Project save error:', error);
                if (error.code === 16755) {
                    throw new ApiError(400, 'Invalid project structure');
                }
                throw error;
            }

            // Cache the new project
            this._cacheProject(project);

            return project;
        } catch (error) {
            if (error instanceof ApiError) throw error;
            if (error.name === 'ValidationError') {
                throw new ApiError(400, 'Invalid project data', error.errors);
            }
            throw new ApiError(500, 'Error creating project', error);
        }
    }

    /**
     * Get project by ID
     */
    async getProjectById(projectId) {
        // Try cache first
        let project = this._getCachedProject(projectId);

        if (!project) {
            project = await Project.findById(projectId)
                .populate('client', 'name location');
            
            if (!project) {
                throw new ApiError(404, 'Project not found');
            }

            this._cacheProject(project);
        }

        return project;
    }

    /**
     * Search for projects based on criteria
     */
    async searchProjects(criteria, options = {}) {
        try {
            console.log('Search criteria:', criteria);
            
            // First, let's check what projects exist in the database
            const allProjects = await Project.find({}).lean();
            console.log('All projects in database:', allProjects);

            const query = this._buildSearchQuery(criteria);
            console.log('Built query:', query);
            
            const { page = 1, limit = 10, sort = '-metadata.createdAt' } = options;

            // If vendor and no status specified, default to OPEN projects
            if (criteria.userRole === 'vendor_supplier' && !query['status.current']) {
                query['status.current'] = 'OPEN';
            }

            console.log('Final query:', query);

            const [projects, total] = await Promise.all([
                Project.find(query)
                    .sort(sort)
                    .skip((page - 1) * limit)
                    .limit(limit)
                    .populate('client', 'name location')
                    .lean(), // Convert to plain JavaScript objects
                Project.countDocuments(query)
            ]);

            // Format the response
            const formattedProjects = projects.map(project => {
                console.log('Formatting project:', project);
                return {
                    _id: project._id,
                    client: project.client,
                    title: project.title,
                    description: project.description,
                    budget: {
                        range: {
                            min: project.budget.range.min,
                            max: project.budget.range.max
                        },
                        currency: project.budget.currency,
                        flexibility: project.budget.flexibility
                    },
                    location: project.location,
                    projectType: project.projectType,
                    subType: project.subType,
                    specifications: {
                        area: {
                            value: project.specifications.area.value,
                            unit: project.specifications.area.unit
                        },
                        floors: project.specifications.floors,
                        requirements: project.specifications.requirements
                    },
                    timeline: {
                        expectedStartDate: project.timeline.expectedStartDate,
                        expectedDuration: project.timeline.expectedDuration,
                        preferredWorkingHours: project.timeline.preferredWorkingHours
                    },
                    status: project.status,
                    preferences: project.preferences,
                    visibility: project.visibility,
                    metadata: project.metadata,
                    createdAt: project.createdAt,
                    updatedAt: project.updatedAt
                };
            });

            return {
                projects: formattedProjects,
                pagination: {
                    page,
                    limit,
                    total,
                    pages: Math.ceil(total / limit)
                }
            };
        } catch (error) {
            throw new ApiError(500, 'Error searching projects', error);
        }
    }

    /**
     * Find matching vendors for a project
     */
    async findMatchingVendors(projectId) {
        try {
            const project = await Project.findById(projectId);
            if (!project) {
                throw new ApiError(404, 'Project not found');
            }

            const VendorProfile = mongoose.model('VendorProfile');
            
            // Build vendor matching query
            const query = {
                'services': project.projectType,
                'location.city': project.location.city,
                'location.state': project.location.state,
                'projectRange.minBudget': { $lte: project.budget.range.min },
                'projectRange.maxBudget': { $gte: project.budget.range.max },
                'status': 'active',
                'isVerified': true
            };

            if (project.preferences?.vendorRequirements?.minExperience) {
                query['experience.yearsInBusiness'] = {
                    $gte: project.preferences.vendorRequirements.minExperience
                };
            }

            if (project.preferences?.vendorRequirements?.minRating) {
                query['ratings.average'] = {
                    $gte: project.preferences.vendorRequirements.minRating
                };
            }

            const vendors = await VendorProfile.find(query)
                .select('companyName location experience ratings')
                .sort('-ratings.average -experience.yearsInBusiness');

            return vendors;
        } catch (error) {
            if (error instanceof ApiError) throw error;
            throw new ApiError(500, 'Error finding matching vendors', error);
        }
    }

    // Private helper methods

    _buildSearchQuery(criteria) {
        const query = {};

        // Handle role-based visibility
        if (criteria.userRole === 'vendor_supplier') {
            // Vendors can only see OPEN projects
            query['status.current'] = 'OPEN';
        } else if (criteria.userRole === 'client_owner') {
            // Clients can see their own projects in any status
            if (criteria.status) {
                query['status.current'] = criteria.status.toUpperCase();
            }
            // Only show projects owned by this client
            query.client = criteria.userId;
        }

        // Handle project type
        if (criteria.projectType) {
            query.projectType = criteria.projectType.toLowerCase();
        }

        // Handle location
        if (criteria.location) {
            if (criteria.location.city) {
                query['location.city'] = new RegExp(criteria.location.city, 'i');
            }
            if (criteria.location.state) {
                query['location.state'] = new RegExp(criteria.location.state, 'i');
            }
        }

        // Handle budget range
        if (criteria.budget) {
            if (criteria.budget.min) {
                query['budget.range.min'] = { $lte: parseFloat(criteria.budget.min) };
                query['budget.range.max'] = { $gte: parseFloat(criteria.budget.min) };
            }
            if (criteria.budget.max) {
                query['budget.range.max'] = { $gte: parseFloat(criteria.budget.max) };
            }
        }

        console.log('Built query for role', criteria.userRole, ':', query);
        return query;
    }

    _getCachedProject(projectId) {
        const cached = this.projectCache.get(projectId);
        if (cached && Date.now() - cached.timestamp < this.PROJECT_CACHE_TTL) {
            return cached.project;
        }
        this.projectCache.delete(projectId);
        return null;
    }

    _cacheProject(project) {
        if (this.projectCache.size >= this.MAX_CACHE_SIZE) {
            const oldestKey = this.projectCache.keys().next().value;
            this.projectCache.delete(oldestKey);
        }

        this.projectCache.set(project._id.toString(), {
            project,
            timestamp: Date.now()
        });
    }
}

module.exports = new ProjectService();