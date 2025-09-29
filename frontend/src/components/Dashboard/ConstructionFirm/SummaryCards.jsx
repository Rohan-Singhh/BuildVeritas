import { useMemo } from "react";
import { projects } from "../../../constants/Dashboard/Projects";
import {
  CircleCheckBig,
  HardHat,
  TrendingUp,
  TriangleAlert,
} from "lucide-react";

export const SummaryCards = () => {
  // Calculate summary statistics
  const stats = useMemo(() => {
    const total = projects.length;
    const active = projects.filter((p) => p.status === "In Progress").length;
    const completed = projects.filter((p) => p.status === "Completed").length;
    const onHold = projects.filter((p) => p.status === "On Hold").length;

    return { total, active, completed, onHold };
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow animate-fade-in-up">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm font-medium">Total Projects</p>
            <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
          </div>
          <div className="p-3 bg-purple-100 rounded-lg">
            <HardHat className="h-6 w-6 text-purple-600" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow animate-fade-in-up delay-100">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm font-medium">Active Projects</p>
            <p className="text-2xl font-bold text-blue-600">{stats.active}</p>
          </div>
          <div className="p-3 bg-blue-100 rounded-lg">
            <TrendingUp className="h-6 w-6 text-blue-600" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow animate-fade-in-up delay-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm font-medium">Completed</p>
            <p className="text-2xl font-bold text-green-600">
              {stats.completed}
            </p>
          </div>
          <div className="p-3 bg-green-100 rounded-lg">
            <CircleCheckBig className="h-6 w-6 text-green-600" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow animate-fade-in-up delay-300">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm font-medium">On Hold</p>
            <p className="text-2xl font-bold text-orange-600">{stats.onHold}</p>
          </div>
          <div className="p-3 bg-orange-100 rounded-lg">
            <TriangleAlert className="h-6 w-6 text-orange-600" />
          </div>
        </div>
      </div>
    </div>
  );
};
