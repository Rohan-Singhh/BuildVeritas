import React from "react";
import {
  Package,
  TrendingUp,
  Truck,
  AlertCircle,
  CheckCircle,
  Clock,
  BarChart3,
} from "lucide-react";

const ItemsOverview = () => {
//   const inventoryStats = {
//     totalItems: 1245,
//     soldItems: 892,
//     onDelivery: 45,
//     lowStock: 8,
//   };

  const topItems = [
    { name: "Portland Cement", sold: 234, stock: 156, status: "good" },
    { name: "Steel Rods", sold: 189, stock: 89, status: "medium" },
    { name: "Premium Paint", sold: 145, stock: 23, status: "low" },
    { name: "Ceramic Tiles", sold: 98, stock: 167, status: "good" },
    { name: "Plumbing Pipes", sold: 76, stock: 12, status: "low" },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "good":
        return "bg-green-100 text-green-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "good":
        return <CheckCircle className="w-4 h-4" />;
      case "medium":
        return <Clock className="w-4 h-4" />;
      case "low":
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <Package className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Inventory Overview */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        {/* <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            Inventory Overview
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Track your stock levels and sales
          </p>
        </div> */}
        {/* <div className="p-6"> */}
          {/* <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-600 rounded-lg">
                  <Package className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">
                    Total Items
                  </p>
                  <p className="text-xl font-bold text-blue-900">
                    {inventoryStats.totalItems.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-600 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Sold</p>
                  <p className="text-xl font-bold text-green-900">
                    {inventoryStats.soldItems.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-purple-600 rounded-lg">
                  <Truck className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">
                    On Delivery
                  </p>
                  <p className="text-xl font-bold text-purple-900">
                    {inventoryStats.onDelivery}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-red-50 p-4 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-red-600 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Low Stock</p>
                  <p className="text-xl font-bold text-red-900">
                    {inventoryStats.lowStock}
                  </p>
                </div>
              </div>
            </div>
          </div> */}

          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-medium text-gray-900">
                Top Selling Items
              </h3>
              <BarChart3 className="w-5 h-5 text-gray-400" />
            </div>
            <div className="space-y-3">
              {topItems.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-150"
                >
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-medium text-gray-900 text-sm">
                        {item.name}
                      </p>
                      <span
                        className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          item.status
                        )}`}
                      >
                        {getStatusIcon(item.status)}
                        <span className="capitalize">{item.status} Stock</span>
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>Sold: {item.sold}</span>
                      <span>Stock: {item.stock}</span>
                    </div>
                    <div className="mt-2">
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div
                          className="bg-blue-600 h-1.5 rounded-full transition-all duration-300"
                          style={{
                            width: `${Math.min(
                              (item.sold / (item.sold + item.stock)) * 100,
                              100
                            )}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        {/* </div> */}
      </div>
    </div>
  );
};

export default ItemsOverview;
