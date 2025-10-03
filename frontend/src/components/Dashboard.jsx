import React, { useState } from "react";
import { DashboardMain } from "./Dashboard/DashboardMain";
import ClientProjectSection from "./Dashboard/ClientProjectSection";
import { MarketplaceSection } from "./Dashboard/MarketplaceSection";
import { AnalyticsSection } from "./Dashboard/AnalyticsSection";
import { ProfileSection } from "./Dashboard/ProfileSection";
import { Sidebar } from "./Dashboard/Sidebar";
// import { Topbar } from "./Dashboard/Topbar";

const Dashboard = () => {
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

          {selected === "Projects" && <ClientProjectSection />}

          {selected === "Marketplace" && (
            <>
              <p className="text-gray-500 mb-4">
                Discover verified construction professionals for your next
                project
              </p>
              <MarketplaceSection />
            </>
          )}

          {selected === "Analytics" && <AnalyticsSection />}

          {selected === "Profile" && <ProfileSection />}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
