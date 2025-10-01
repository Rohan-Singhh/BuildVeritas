import React from "react";
import {
  ShoppingCart,
  Calendar,
  DollarSign,
  User,
  Truck,
  CheckCircle,
  Clock,
  Package,
  IndianRupee,
} from "lucide-react";

const RecentOrders = () => {
  const recentOrders = [
    {
      id: "#ORD-2024-001",
      customer: "Metro Construction LLC",
      items: [
        { name: "Portland Cement", quantity: "25 bags" },
        { name: "Steel Rods", quantity: "50 pieces" },
      ],
      total: 1250,
      date: "2024-01-28",
      status: "delivered",
      deliveryDate: "2024-01-30",
    },
    {
      id: "#ORD-2024-002",
      customer: "Green Homes Builder",
      items: [
        { name: "Premium Paint", quantity: "15 gallons" },
        { name: "Ceramic Tiles", quantity: "200 sq ft" },
      ],
      total: 890,
      date: "2024-01-27",
      status: "in-transit",
      deliveryDate: "2024-01-29",
    },
    {
      id: "#ORD-2024-003",
      customer: "City of Dallas",
      items: [
        { name: "Waterproofing Material", quantity: "10 drums" },
        { name: "Safety Equipment", quantity: "20 sets" },
      ],
      total: 2150,
      date: "2024-01-26",
      status: "processing",
      deliveryDate: "2024-01-31",
    },
    {
      id: "#ORD-2024-004",
      customer: "Retail Development Corp",
      items: [
        { name: "Glass Panels", quantity: "30 panels" },
        { name: "Electrical Supplies", quantity: "1 set" },
      ],
      total: 3200,
      date: "2024-01-25",
      status: "delivered",
      deliveryDate: "2024-01-27",
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-800 border-green-200";
      case "in-transit":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "processing":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "delivered":
        return <CheckCircle className="w-4 h-4" />;
      case "in-transit":
        return <Truck className="w-4 h-4" />;
      case "processing":
        return <Clock className="w-4 h-4" />;
      default:
        return <Package className="w-4 h-4" />;
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  const totalOrderValue = recentOrders.reduce(
    (sum, order) => sum + order.total,
    0
  );

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 animate-fade-in-up delay-300">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              Recent Orders
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Track your recent sales and deliveries
            </p>
          </div>
          <div className="bg-blue-50 px-4 py-2 rounded-lg">
            <div className="flex items-center space-x-2">
              <ShoppingCart className="w-5 h-5 text-blue-600" />
              <span className="text-blue-900 font-medium">
                Rs {formatCurrency(totalOrderValue)} total
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="space-y-4">
          {recentOrders.map((order) => (
            <div
              key={order.id}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow duration-200"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="font-semibold text-gray-900">{order.id}</h3>
                    <span
                      className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                        order.status
                      )}`}
                    >
                      {getStatusIcon(order.status)}
                      <span className="capitalize">
                        {order.status.replace("-", " ")}
                      </span>
                    </span>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                    <div className="flex items-center space-x-1">
                      <User className="w-4 h-4 text-blue-500" />
                      <span>{order.customer}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4 text-blue-500" />
                      <span>Ordered: {formatDate(order.date)}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Truck className="w-4 h-4 text-blue-500" />
                      <span>Delivery: {formatDate(order.deliveryDate)}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
                    {order.items.map((item, index) => (
                      <div key={index} className="bg-gray-50 rounded px-3 py-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-900">
                            {item.name}
                          </span>
                          <span className="text-xs text-gray-600">
                            {item.quantity}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="text-right ml-4">
                  <div className="flex items-center space-x-1 text-lg font-bold text-gray-900">
                    <IndianRupee className="w-5 h-5 text-blue-600" />
                    <span>{formatCurrency(order.total)}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 text-center">
          <button className="px-6 py-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors duration-200 font-medium">
            View All Orders →
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecentOrders;
