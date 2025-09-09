import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';
import { Brain, Building2, Mail, Phone } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white text-gray-600 relative overflow-hidden border-t border-gray-100">
      {/* Subtle Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 to-transparent pointer-events-none"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <div>
            <h3 className="text-gray-900 text-lg font-semibold mb-4 flex items-center space-x-2">
              <Building2 className="h-5 w-5 text-gray-700" />
              <span>About Us</span>
            </h3>
            <p className="text-sm leading-relaxed text-gray-600">
              Revolutionizing construction management with AI-powered solutions. Transform your projects with real-time tracking and intelligent site verification.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-gray-900 text-lg font-semibold mb-4">Solutions</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/ai-estimation" className="text-sm hover:text-gray-900 transition-colors flex items-center space-x-2 group">
                  <span className="w-1.5 h-1.5 bg-gray-300 rounded-full group-hover:bg-gray-600 transition-all"></span>
                  <span>AI Cost Estimation</span>
                </Link>
              </li>
              <li>
                <Link to="/site-monitoring" className="text-sm hover:text-gray-900 transition-colors flex items-center space-x-2 group">
                  <span className="w-1.5 h-1.5 bg-gray-300 rounded-full group-hover:bg-gray-600 transition-all"></span>
                  <span>Site Monitoring</span>
                </Link>
              </li>
              <li>
                <Link to="/project-analytics" className="text-sm hover:text-gray-900 transition-colors flex items-center space-x-2 group">
                  <span className="w-1.5 h-1.5 bg-gray-300 rounded-full group-hover:bg-gray-600 transition-all"></span>
                  <span>Project Analytics</span>
                </Link>
              </li>
              <li>
                <Link to="/resource-management" className="text-sm hover:text-gray-900 transition-colors flex items-center space-x-2 group">
                  <span className="w-1.5 h-1.5 bg-gray-300 rounded-full group-hover:bg-gray-600 transition-all"></span>
                  <span>Resource Management</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-gray-900 text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3 text-sm">
                <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Building2 className="h-4 w-4 text-gray-600" />
                </div>
                <span>123 Innovation Hub, NY 10001</span>
              </li>
              <li className="flex items-center space-x-3 text-sm">
                <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Phone className="h-4 w-4 text-gray-600" />
                </div>
                <span>(555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-3 text-sm">
                <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Mail className="h-4 w-4 text-gray-600" />
                </div>
                <span>contact@buildveritas.com</span>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-gray-900 text-lg font-semibold mb-4">Connect</h3>
            <div className="grid grid-cols-2 gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 bg-gray-50 hover:bg-gray-100 transition-colors p-3 rounded-xl group"
              >
                <FaFacebook className="h-5 w-5 text-gray-600" />
                <span className="text-sm group-hover:text-gray-900 transition-colors">Facebook</span>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 bg-gray-50 hover:bg-gray-100 transition-colors p-3 rounded-xl group"
              >
                <FaTwitter className="h-5 w-5 text-gray-600" />
                <span className="text-sm group-hover:text-gray-900 transition-colors">Twitter</span>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 bg-gray-50 hover:bg-gray-100 transition-colors p-3 rounded-xl group"
              >
                <FaLinkedin className="h-5 w-5 text-gray-600" />
                <span className="text-sm group-hover:text-gray-900 transition-colors">LinkedIn</span>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 bg-gray-50 hover:bg-gray-100 transition-colors p-3 rounded-xl group"
              >
                <FaInstagram className="h-5 w-5 text-gray-600" />
                <span className="text-sm group-hover:text-gray-900 transition-colors">Instagram</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm">
              © {currentYear} <span className="text-gray-900">BuildVeritas AI</span>. All rights reserved.
            </p>
            <div className="flex items-center space-x-6">
              <Link to="/privacy" className="text-sm hover:text-gray-900 transition-colors">
                Privacy
              </Link>
              <span className="w-1.5 h-1.5 bg-gray-300 rounded-full"></span>
              <Link to="/terms" className="text-sm hover:text-gray-900 transition-colors">
                Terms
              </Link>
              <span className="w-1.5 h-1.5 bg-gray-300 rounded-full"></span>
              <Link to="/cookies" className="text-sm hover:text-gray-900 transition-colors">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
