import React, { useState } from "react";
// import { DashboardMain } from "./Dashboard/DashboardMain";
// import { ProjectSection } from "./Dashboard/ProjectSection";
import { MarketplaceSection } from "./Dashboard/MarketplaceSection";
// import { AnalyticsSection } from "./Dashboard/AnalyticsSection";
// import { ProfileSection } from "./Dashboard/ProfileSection";
import { Sidebar } from "./Dashboard/Sidebar";
// import { Topbar } from "./Dashboard/Topbar";
import { SearchBar } from "./Dashboard/SearchBar";
import FirmProfile from "./Dashboard/ConstructionFirm/FirmProfile";
import FirmProject from "./Dashboard/ConstructionFirm/FirmProject";
import FirmAnalytics from "./Dashboard/ConstructionFirm/FirmAnalytics";
import DashboardMain from "./Dashboard/ConstructionFirm/DashboardMain";
import BudgetEstimator from "./Dashboard/BudgetEstimator";

const DashboardFirm = () => {
  const [selected, setSelected] = useState("Dashboard");

  // Add dashboard-specific class when mounted
  React.useEffect(() => {
    document.body.classList.add("dashboard-active");
    return () => {
      // Clean up when unmounting
      document.body.classList.remove("dashboard-active");
      window.scrollTo(0, 0);
    };
  }, []);

  return (
    <div
      id="dashboard-container"
      className="flex min-h-screen bg-gray-50 relative"
    >
      {/* <Topbar /> */}

      <Sidebar selected={selected} setSelected={setSelected} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <main className="p-8 mt-16 animate-fade-in-up">
          <h1 className="text-2xl font-bold text-blue-600 mb-2">{selected}</h1>
          {selected === "Dashboard" && (
            <>
              <div className="text-gray-500 mb-4">
                Welcome to your dashboard
              </div>
              <DashboardMain />
            </>
          )}

          {selected === "Projects" && <FirmProject />}

          {selected === "Marketplace" && (
            <div id="marketplace">
              <p className="text-gray-500 mb-6">
                Discover verified construction professionals for your next
                project
              </p>

              <SearchBar />

              <MarketplaceSection />
            </div>
          )}

          {selected === "Analytics" && <FirmAnalytics />}

          {selected === "Profile" && <FirmProfile />}

          {selected === "AI Budget Estimator" && <BudgetEstimator />}
        </main>
      </div>
    </div>
  );
};

export default DashboardFirm;
