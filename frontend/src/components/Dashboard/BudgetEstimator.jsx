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
      <div className="container mx-auto py-1">
        <header className="mb-12">
          <p className="text-slate-600">
            Get detailed cost estimates for your construction project in seconds
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
