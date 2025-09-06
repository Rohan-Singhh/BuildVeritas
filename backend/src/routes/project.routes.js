const express = require('express');
const router = express.Router();
const projectController = require('../controllers/project.controller');
const { authMiddleware } = require('../middleware/auth.middleware');
const { roleAuth } = require('../middleware/roleAuth.middleware');

// All routes require authentication
router.use(authMiddleware);

// Create project (clients only)
router.post('/', 
    roleAuth(['client_owner']),
    projectController.createProject
);

// Get all projects for the client
router.get('/', 
    roleAuth(['client_owner']),
    projectController.getClientProjects
);

// Get specific project
router.get('/:id', 
    roleAuth(['client_owner']),
    projectController.getProject
);

// Update project
router.put('/:id', 
    roleAuth(['client_owner']),
    projectController.updateProject
);

// Delete project
router.delete('/:id', 
    roleAuth(['client_owner']),
    projectController.deleteProject
);

module.exports = router;
