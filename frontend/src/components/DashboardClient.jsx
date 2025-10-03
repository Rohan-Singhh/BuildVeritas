import React, { useState } from "react";
import { DashboardMain } from "./Dashboard/DashboardMain";
import ClientProjectSection from "./Dashboard/ClientProjectSection";
import { MarketplaceSection } from "./Dashboard/MarketplaceSection";
import { AnalyticsSection } from "./Dashboard/AnalyticsSection";
import { ProfileSection } from "./Dashboard/ProfileSection";
import { Sidebar } from "./Dashboard/Sidebar";
import { Topbar } from "./Dashboard/Topbar";
import { SearchBar } from "./Dashboard/SearchBar";
import BudgetEstimator from "./Dashboard/BudgetEstimator";

const DashboardClient = () => {
  const [selected, setSelected] = useState("Dashboard");
  const [isCollapsed, setIsCollapsed] = useState(false);

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

      <Sidebar 
        selected={selected} 
        setSelected={setSelected} 
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top spacing to account for navbar */}
        <div className="h-16"></div>
        <main className={`p-3 md:p-4 animate-fade-in-up max-w-none transition-all duration-300 ease-out ${
          isCollapsed ? 'md:ml-16' : 'md:ml-48'
        }`}>
          <h1 className="text-2xl font-bold text-blue-600 mb-2">{selected}</h1>
          {selected === "Dashboard" && (
            <>
              <div className="text-gray-500 mb-4">
                Welcome to your dashboard
              </div>
              <DashboardMain />
            </>
          )}

          {selected === "Projects" && <ClientProjectSection />}

          {selected === "Marketplace" && (
            <>
              <p className="text-gray-500 mb-4">
                Discover verified construction professionals for your next
                project
              </p>

              <SearchBar />

              <MarketplaceSection />
            </>
          )}

          {selected === "Analytics" && <AnalyticsSection />}

          {selected === "Profile" && <ProfileSection />}

          {selected === "AI Budget Estimator" && <BudgetEstimator />}
        </main>
      </div>
    </div>
  );
};

export default DashboardClient;
