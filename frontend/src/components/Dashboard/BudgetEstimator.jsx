import { useState } from "react";
import FormBudgetEstimator from "./FormBudgetEstimator";
import ModalBudgetEstimator from "./ModalBudgetEstimator";

function BudgetEstimator() {
  const [showModal, setShowModal] = useState(false);
  const [estimateResult, setEstimateResult] = useState(null);

  const handleEstimateGenerated = (result) => {
    setEstimateResult(result);
    setShowModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto py-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-800 mb-4">
            AI Budget Estimator
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Get detailed cost estimates for your construction project in seconds with our advanced AI technology
          </p>
        </header>

        <FormBudgetEstimator onEstimateGenerated={handleEstimateGenerated} />

        {showModal && estimateResult && (
          <ModalBudgetEstimator
            result={estimateResult}
            onClose={() => setShowModal(false)}
          />
        )}
      </div>
    </div>
  );
}

export default BudgetEstimator;
