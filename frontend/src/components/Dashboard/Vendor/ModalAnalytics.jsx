import { useEffect, useRef } from "react";
import {
  X,
  Package,
  TrendingUp,
  DollarSign,
  Star,
  Award,
  BarChart3,
  ArrowUp,
  ArrowDown,
  Calendar,
  Target,
} from "lucide-react";
import {
  PieChart as RechartsPieChart,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Pie,
} from "recharts";

const ItemAnalyticsModal = ({ item, onClose }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    if (modalRef.current) {
      // Scroll modal into view when opened
      modalRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, []);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  // Prepare data for charts
  const variantData = [
    {
      name: "Basic",
      sold: item.variants.basic.sold,
      revenue: item.variants.basic.sold * item.variants.basic.price,
      price: item.variants.basic.price,
    },
    {
      name: "Standard",
      sold: item.variants.standard.sold,
      revenue: item.variants.standard.sold * item.variants.standard.price,
      price: item.variants.standard.price,
    },
    {
      name: "Premium",
      sold: item.variants.premium.sold,
      revenue: item.variants.premium.sold * item.variants.premium.price,
      price: item.variants.premium.price,
    },
  ];

  const pieData = variantData.map((variant) => ({
    name: variant.name,
    value: variant.sold,
    revenue: variant.revenue,
  }));

  const COLORS = ["#3B82F6", "#10B981", "#F59E0B"];

  // Find best selling variant
  const bestSelling = variantData.reduce((prev, current) =>
    prev.sold > current.sold ? prev : current
  );

  // const totalVariantRevenue = variantData.reduce((sum, variant) => sum + variant.revenue, 0);
  const totalVariantSold = variantData.reduce(
    (sum, variant) => sum + variant.sold,
    0
  );

  // Monthly sales data (mock data)
  const monthlySales = [
    { month: "Jan", sales: 45, revenue: 1350 },
    { month: "Feb", sales: 52, revenue: 1560 },
    { month: "Mar", sales: 48, revenue: 1440 },
    { month: "Apr", sales: 61, revenue: 1830 },
    { month: "May", sales: 55, revenue: 1650 },
    { month: "Jun", sales: 67, revenue: 2010 },
  ];

  return (
    <div
      className="fixed inset-0 bg-black/60 bg-opacity-50 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        ref={modalRef}
        className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[87vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 rounded-t-2xl border-b border-gray-200 bg-gradient-to-r from-blue-50 to-blue-100">
          <div className="flex items-center space-x-4">
            <img
              src={item.image}
              alt={item.name}
              className="w-16 h-16 rounded-lg object-cover shadow-md"
            />
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{item.name}</h2>
              <div className="flex items-center space-x-3 mt-1">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                  {item.category}
                </span>
                <div
                  className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${
                    item.growth >= 0
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {item.growth >= 0 ? (
                    <ArrowUp className="w-3 h-3" />
                  ) : (
                    <ArrowDown className="w-3 h-3" />
                  )}
                  <span>{Math.abs(item.growth)}% growth</span>
                </div>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* Content */}
        {/* <div className="max-h-[calc(90vh-120px)] "> */}
        <div
          className="p-6 space-y-8 overflow-y-auto"
          style={{ maxHeight: "calc(87vh - 145px)" }}
        >
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-blue-50 p-6 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-blue-600 rounded-lg">
                  <Package className="w-4.5 h-4.5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">
                    Total Stock
                  </p>
                  <p className="text-xl font-bold text-blue-900">
                    {item.totalStock}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-green-50 p-6 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-green-600 rounded-lg">
                  <TrendingUp className="w-4.5 h-4.5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">
                    Sold (Month)
                  </p>
                  <p className="text-xl font-bold text-green-900">
                    {item.soldLastMonth}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-purple-50 p-6 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-purple-600 rounded-lg">
                  <Calendar className="w-4.5 h-4.5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">
                    Sold (Year)
                  </p>
                  <p className="text-xl font-bold text-purple-900">
                    {item.soldLastYear}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-orange-50 p-6 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-orange-600 rounded-lg">
                  <DollarSign className="w-4.5 h-4.5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Revenue</p>
                  <p className="text-xl font-bold text-orange-900">
                    {formatCurrency(item.revenue)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Variant Analysis */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Variant Performance */}
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">
                  Variant Performance
                </h3>
                <div className="flex items-center space-x-2">
                  <Award className="w-5 h-5 text-yellow-500" />
                  <span className="text-sm font-medium text-gray-700">
                    Best: {bestSelling.name}
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                {Object.entries(item.variants).map(([type, data], index) => (
                  <div
                    key={type}
                    className="bg-white rounded-lg p-4 border border-gray-200"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-4 h-4 rounded-full`}
                          style={{ backgroundColor: COLORS[index] }}
                        ></div>
                        <h4 className="font-semibold text-gray-900 capitalize">
                          {type}
                        </h4>
                        {type === bestSelling.name.toLowerCase() && (
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        )}
                      </div>
                      <span className="text-lg font-bold text-gray-900">
                        {formatCurrency(data.price)}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Sold</p>
                        <p className="font-bold text-blue-600">{data.sold}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Stock</p>
                        <p className="font-bold text-green-600">{data.stock}</p>
                      </div>
                    </div>
                    <div className="mt-3">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="h-2 rounded-full transition-all duration-300"
                          style={{
                            width: `${(data.sold / totalVariantSold) * 100}%`,
                            backgroundColor: COLORS[index],
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sales Distribution */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">
                Sales Distribution
              </h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value, name) => [`${value} units`, name]}
                    />
                    <Legend />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 text-center">
                <p className="text-sm text-gray-600">Total Units Sold</p>
                <p className="text-2xl font-bold text-gray-900">
                  {totalVariantSold}
                </p>
              </div>
            </div>
          </div>

          {/* Monthly Sales Trend */}
          <div className="bg-gray-50 rounded-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">
                Monthly Sales Trend
              </h3>
              <div className="flex items-center space-x-2">
                <BarChart3 className="w-5 h-5 text-gray-400" />
                <span className="text-sm text-gray-600">Last 6 months</span>
              </div>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlySales}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip
                    cursor={false}
                    formatter={(value, name) => {
                      if (name === "Revenue") {
                        return [formatCurrency(Number(value)), name];
                      }
                      return [`${value}`, name];
                    }}
                  />
                  <Legend />
                  <Bar
                    yAxisId="left"
                    dataKey="sales"
                    fill="#3B82F6"
                    name="Units Sold"
                  />
                  <Bar
                    yAxisId="right"
                    dataKey="revenue"
                    fill="#10B981"
                    name="Revenue"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Performance Insights */}
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Performance Insights
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Target className="w-5 h-5 text-blue-600" />
                  <span className="font-medium text-gray-900">
                    Best Performer
                  </span>
                </div>
                <p className="text-sm text-gray-600">
                  {bestSelling.name} variant leads with {bestSelling.sold} units
                  sold
                </p>
              </div>
              <div className="bg-white rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  <span className="font-medium text-gray-900">Growth Rate</span>
                </div>
                <p className="text-sm text-gray-600">
                  {item.growth >= 0 ? "Positive" : "Negative"} growth of{" "}
                  {Math.abs(item.growth)}% this month
                </p>
              </div>
              <div className="bg-white rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <DollarSign className="w-5 h-5 text-purple-600" />
                  <span className="font-medium text-gray-900">
                    Revenue Impact
                  </span>
                </div>
                <p className="text-sm text-gray-600">
                  Contributes {((item.revenue / 166480) * 100).toFixed(1)}% to
                  total revenue
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* </div> */}
      </div>
    </div>
  );
};

export default ItemAnalyticsModal;
