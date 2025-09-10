import { X, Clock, User, Calendar } from "lucide-react";

const BlogModal = ({ blog, onClose }) => {
  if (!blog) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-gray-900/20 backdrop-blur-sm animate-fade-in">
      {/* Backdrop */}
      <div className="fixed inset-0 transition-opacity" onClick={onClose}></div>

      {/* Modal */}
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="relative bg-white/95 backdrop-blur-sm rounded-2xl max-w-4xl w-full overflow-hidden shadow-2xl border border-gray-100 animate-slide-up">
          {/* Close button */}
          <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
            <button
              onClick={onClose}
              className="group bg-gray-100 hover:bg-gray-200 rounded-full p-2 transition-all duration-200"
            >
              <X className="h-5 w-5 text-gray-600 group-hover:text-gray-800" />
            </button>
          </div>

          {/* Image */}
          <div className="relative h-72 w-full">
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4">
              <span className="inline-block bg-blue-500 text-white text-sm px-3 py-1 rounded-full">
                {blog.category}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 sm:p-8">
            {/* Meta info */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-4">
              <div className="flex items-center">
                <User className="h-4 w-4 mr-2" />
                <span>{blog.author}</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                <span>{blog.readTime}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                <span>{blog.date}</span>
              </div>
            </div>

            {/* Title */}
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {blog.title}
            </h2>

            {/* Full content */}
            <div className="prose prose-blue max-w-none">
              <p className="text-gray-600 mb-6">{blog.excerpt}</p>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Key Takeaways
              </h3>
              <ul className="list-disc list-inside space-y-2 text-gray-600 mb-6">
                {blog.category === "Technology" && (
                  <>
                    <li>
                      AI-driven project management is revolutionizing
                      construction efficiency
                    </li>
                    <li>
                      Real-time monitoring and predictive analytics reduce
                      delays and costs
                    </li>
                    <li>
                      Machine learning algorithms optimize resource allocation
                    </li>
                    <li>
                      Integration with existing systems enhances workflow
                      automation
                    </li>
                  </>
                )}
                {blog.category === "Sustainability" && (
                  <>
                    <li>
                      Green building practices reduce environmental impact
                    </li>
                    <li>
                      Sustainable materials improve long-term cost efficiency
                    </li>
                    <li>
                      Energy-efficient designs meet modern environmental
                      standards
                    </li>
                    <li>Innovation in eco-friendly construction methods</li>
                  </>
                )}
                {blog.category === "Digital" && (
                  <>
                    <li>
                      Digital transformation streamlines construction processes
                    </li>
                    <li>
                      BIM technology enhances project visualization and planning
                    </li>
                    <li>Cloud solutions improve team collaboration</li>
                    <li>Mobile apps increase on-site productivity</li>
                  </>
                )}
                {blog.category === "Safety" && (
                  <>
                    <li>AI monitoring systems enhance site safety</li>
                    <li>Real-time hazard detection prevents accidents</li>
                    <li>
                      Automated compliance checks ensure regulatory adherence
                    </li>
                    <li>Data analytics improve safety protocols</li>
                  </>
                )}
              </ul>
              <p className="text-gray-600 mb-6">
                {blog.category === "Technology" &&
                  "The integration of AI in construction project management marks a significant shift in how projects are planned, executed, and monitored. By leveraging advanced algorithms and machine learning capabilities, construction firms can now predict potential issues before they arise, optimize resource allocation, and ensure projects stay on schedule and within budget."}
                {blog.category === "Sustainability" &&
                  "Sustainable construction practices are no longer just a trend but a necessity in modern building projects. By implementing eco-friendly materials and methods, construction firms can significantly reduce their environmental impact while often achieving better long-term cost efficiency and meeting increasingly stringent environmental regulations."}
                {blog.category === "Digital" &&
                  "The digital transformation of the construction industry is fundamentally changing how projects are managed and executed. From Building Information Modeling (BIM) to mobile applications and cloud-based collaboration tools, digital technologies are creating more efficient, transparent, and collaborative construction processes."}
                {blog.category === "Safety" &&
                  "AI-powered safety systems represent the next evolution in construction site safety. These systems use advanced computer vision and machine learning to provide real-time monitoring, instant hazard detection, and automated compliance checking, significantly reducing the risk of accidents and ensuring regulatory compliance."}
              </p>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-6">
              {blog.tags.map((tag, index) => (
                <span
                  key={index}
                  className="text-sm text-blue-600 bg-blue-50 px-3 py-1 rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogModal;
