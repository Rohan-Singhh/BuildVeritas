import { Mail, Phone, Star } from "lucide-react";
import { constructionFirms } from "../../constants/Dashboard/ConstructionFirms";

export const MarketplaceSection = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in-up">
        {constructionFirms.map((firm) => (
          <div
            key={firm.id}
            className={`bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-lg}`}
          >
            <div className="flex items-start space-x-4 mb-4">
              <img
                src={firm.image}
                alt={firm.name}
                className="w-20 h-20 rounded-lg object-cover"
              />
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {firm.name}
                  </h3>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium text-gray-700">
                      {firm.rating}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-2">{firm.speciality}</p>
                <p className="text-xs text-gray-500">{firm.location}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <p className="text-2xl font-bold text-blue-600">
                  {firm.projects}
                </p>
                <p className="text-xs text-gray-600">Projects</p>
              </div>
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <p className="text-2xl font-bold text-green-600">
                  {firm.experience}
                </p>
                <p className="text-xs text-gray-600">Experience</p>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Phone className="w-4 h-4 text-blue-500" />
                <span>{firm.phone}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Mail className="w-4 h-4 text-blue-500" />
                <span>{firm.email}</span>
              </div>
            </div>

            <div className="flex space-x-3">
              <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                View Profile
              </button>
              <button className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
                Contact
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
