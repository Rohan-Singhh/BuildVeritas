import { useState } from "react";
import { Clock, User, ArrowRight } from "lucide-react";
import BlogModal from "./BlogModal";
import { BlogsData as blogs } from "../constants/BlogsData";

const Blogs = () => {
  const [selectedBlog, setSelectedBlog] = useState(null);
  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Construction Insights & Innovation
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Stay updated with the latest trends, technologies, and best practices
          in the construction industry.
        </p>
      </div>

      {/* Blog Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        {blogs.map((blog) => (
          <article
            key={blog.id}
            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <div className="relative h-64 overflow-hidden">
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-4 left-4">
                <span className="inline-block bg-blue-500 text-white text-sm px-3 py-1 rounded-full">
                  {blog.category}
                </span>
              </div>
            </div>

            <div className="p-6">
              <div className="flex items-center text-sm text-gray-500 mb-4">
                <User className="h-4 w-4 mr-2" />
                <span>{blog.author}</span>
                <span className="mx-2">•</span>
                <Clock className="h-4 w-4 mr-2" />
                <span>{blog.readTime}</span>
              </div>

              <h2 className="text-xl font-bold text-gray-900 mb-3">
                {blog.title}
              </h2>

              <p className="text-gray-600 mb-4 line-clamp-3">{blog.excerpt}</p>

              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-2">
                  {blog.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="text-sm text-blue-600 bg-blue-50 px-2 py-1 rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
                <button
                  onClick={() => setSelectedBlog(blog)}
                  className="inline-flex items-center text-blue-500 hover:text-blue-600 font-medium"
                >
                  Read More
                  <ArrowRight className="h-4 w-4 ml-2" />
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Blog Modal */}
      {selectedBlog && (
        <BlogModal blog={selectedBlog} onClose={() => setSelectedBlog(null)} />
      )}
    </div>
  );
};

export default Blogs;
