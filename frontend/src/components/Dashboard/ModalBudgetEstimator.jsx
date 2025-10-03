import { X, Download, Share2, CheckCircle, TrendingDown } from "lucide-react";
import { useEffect, useRef } from "react";

function ModalBudgetEstimator({ result, onClose }) {
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
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getCategoryColor = (index) => {
    const colors = [
      {
        bg: "bg-blue-500",
        light: "bg-blue-50",
        border: "border-blue-200",
        text: "text-blue-600",
      },
      {
        bg: "bg-emerald-500",
        light: "bg-emerald-50",
        border: "border-emerald-200",
        text: "text-emerald-600",
      },
      {
        bg: "bg-amber-500",
        light: "bg-amber-50",
        border: "border-amber-200",
        text: "text-amber-600",
      },
      {
        bg: "bg-rose-500",
        light: "bg-rose-50",
        border: "border-rose-200",
        text: "text-rose-600",
      },
      {
        bg: "bg-violet-500",
        light: "bg-violet-50",
        border: "border-violet-200",
        text: "text-violet-600",
      },
    ];
    return colors[index % colors.length];
  };

  const totalSavings = result.recommendations?.reduce(
    (acc, rec) => acc + (rec.potential_savings || 0),
    0
  ) || 0;

  return (
    <div
      className="fixed inset-0 bg-black/60 bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        ref={modalRef}
        className="bg-white rounded-3xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-100 to-transparent rounded-full blur-3xl opacity-30 -z-10"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-emerald-100 to-transparent rounded-full blur-3xl opacity-30 -z-10"></div>

        {/* Header */}
        <div className="relative bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white px-6 py-4">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>

          <div className="relative flex justify-between items-start">
            <div className="flex-1">
              {/* <div className="inline-block bg-white bg-opacity-10 backdrop-blur-sm px-4 py-1 rounded-full">
                <span className="text-sm font-medium text-blue-500">
                  AI Generated Estimate
                </span>
              </div> */}
              <h2 className="text-3xl font-bold mb-2">{result.projectName || result.project_name}</h2>
              <p className="text-slate-300 text-sm">
                Comprehensive budget breakdown and recommendations
              </p>
            </div>

            <div className="flex gap-2">
              {/* <button className="p-3 bg-white bg-opacity-10 hover:bg-opacity-20 rounded-xl transition backdrop-blur-sm">
                <Share2 className="w-5 h-5 text-blue-500" />
              </button> */}
              <button className="cursor-pointer p-3 bg-white bg-opacity-10 hover:bg-opacity-20 hover:bg-blue-100 rounded-xl transition backdrop-blur-sm">
                <Download className="w-5 h-5 text-blue-500" />
              </button>
              <button
                onClick={onClose}
                className="cursor-pointer p-3 bg-white bg-opacity-10 hover:bg-opacity-20 hover:bg-blue-100 rounded-xl transition backdrop-blur-sm"
              >
                <X className="w-5 h-5 text-blue-500" />
              </button>
            </div>
          </div>
        </div>

        {/* <div className="overflow-y-auto max-h-[calc(95vh-180px)]"> */}
        <div
          className="p-8 space-y-8 overflow-y-auto"
          style={{ maxHeight: "calc(90vh - 165px)" }}
        >
          {/* Hero Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Total Cost Card */}
            <div className="md:col-span-2 bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500 rounded-full blur-3xl opacity-20"></div>
              <div className="relative">
                <p className="text-slate-400 text-sm font-medium mb-2">
                  ESTIMATED TOTAL COST
                </p>
                <div className="flex items-baseline gap-3 mb-4">
                  <span className="text-2xl font-bold">
                    {formatCurrency(
                      (result.total_cost?.min + result.total_cost?.max) / 2 || 0
                    )}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-300">
                  <span>Range:</span>
                  <span className="font-semibold">
                    {formatCurrency(result.total_cost?.min || 0)}
                  </span>
                  <span>-</span>
                  <span className="font-semibold">
                    {formatCurrency(result.total_cost?.max || 0)}
                  </span>
                </div>
              </div>
            </div>

            {/* Savings Card */}
            <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl p-6 text-white relative overflow-hidden">
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-white rounded-full blur-3xl opacity-10"></div>
              <div className="relative">
                <div>
                  <TrendingDown className="w-6 h-6 mb-1 opacity-80" />
                  <p className="text-emerald-100 text-sm font-medium mb-1">
                    POTENTIAL SAVINGS
                  </p>
                </div>
                <p className="text-2xl font-bold">up to {totalSavings}%</p>
                <p className="text-emerald-100 text-xs mt-2">
                  {result.recommendations?.length || 0} optimization tips
                </p>
              </div>
            </div>
          </div>

          {/* Cost Breakdown - Modern Card Grid */}
          <div>
            <h3 className="text-2xl font-bold text-slate-800 mb-6">
              Cost Breakdown
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {result.cost_breakdown?.map((category, index) => {
                const colors = getCategoryColor(index);
                return (
                  <div
                    key={index}
                    className={`${colors.light} border ${colors.border} rounded-2xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1`}
                  >
                    {/* Category Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div
                            className={`w-3 h-3 ${colors.bg} rounded-full`}
                          ></div>
                          <h4 className="font-bold text-slate-800 text-lg">
                            {category.category}
                          </h4>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`${colors.text} text-2xl font-bold`}>
                            {category.percentage || 0}%
                          </span>
                          <span className="text-slate-500 text-sm">
                            of budget
                          </span>
                        </div>
                      </div>
                      <div
                        className={`${colors.bg} text-white px-4 py-2 rounded-xl text-sm font-bold`}
                      >
                        {formatCurrency(category.amount?.min || 0)}
                      </div>
                    </div>

                    {/* Circular Progress */}
                    <div className="relative w-full h-2 bg-white rounded-full mb-4">
                      <div
                        className={`absolute top-0 left-0 h-full ${colors.bg} rounded-full transition-all duration-1000 ease-out`}
                        style={{ width: `${category.percentage || 0}%` }}
                      ></div>
                    </div>

                    {/* Line Items */}
                    <div className="space-y-2">
                      {category.details?.slice(0, 2).map((detail, idx) => (
                        <div
                          key={idx}
                          className="bg-white rounded-lg p-3 border border-slate-100"
                        >
                          <div className="flex justify-between items-start gap-2">
                            <div className="flex-1">
                              <p className="text-slate-700 text-sm font-medium leading-tight">
                                {detail.item}
                              </p>
                              <p className="text-slate-400 text-xs mt-1">
                                {detail.quantity}
                              </p>
                            </div>
                            <span className="text-slate-800 font-bold text-sm whitespace-nowrap">
                              {formatCurrency(detail.total_cost || 0)}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>


          {/* Factors & Recommendations Side by Side */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Factors */}
            <div>
              <h3 className="text-xl font-bold text-slate-800 mb-4">
                Key Factors
              </h3>
              <div className="space-y-3">
                {result.factors_considered?.map((factor, index) => (
                  <div
                    key={index}
                    className="bg-white border border-slate-200 rounded-xl p-4 hover:border-slate-300 transition"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-amber-600 font-bold text-sm">
                          +{factor.percentage_effect || 0}%
                        </span>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-slate-800 mb-1">
                          {factor.factor}
                        </h4>
                        <p className="text-slate-600 text-sm">
                          {factor.impact}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommendations */}
            <div>
              <h3 className="text-xl font-bold text-slate-800 mb-4">
                Optimize Your Budget
              </h3>
              <div className="space-y-3">
                {result.recommendations?.map((rec, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-br from-emerald-50 to-white border border-emerald-200 rounded-xl p-4 hover:shadow-md transition"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-semibold text-slate-800">
                            {rec.type}
                          </h4>
                          <span className="bg-emerald-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                            -{rec.potential_savings || 0}%
                          </span>
                        </div>
                        <p className="text-slate-600 text-sm">
                          {rec.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-4 text-white text-center">
            <h3 className="text-2xl font-bold mb-2">
              Ready to Start Your Project?
            </h3>
            <p className="text-blue-100 mb-6">
              Download this detailed estimate and share it with your team
            </p>
            <div className="flex gap-4 justify-center">
              <button className="cursor-pointer bg-white text-blue-600 font-semibold px-8 py-3 rounded-xl hover:bg-blue-800 hover:text-white hover:border hover:border-white transition">
                Download PDF
              </button>
              <button className="cursor-pointer bg-blue-800 text-white font-semibold px-8 py-3 rounded-xl hover:bg-blue-900 hover:border hover:border-white transition">
                Share Estimate
              </button>
            </div>
          </div>
        </div>
        {/* </div> */}
      </div>
    </div>
  );
}

export default ModalBudgetEstimator;
