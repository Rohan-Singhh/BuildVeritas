export function generateEstimate(projectData) {
  const qualityMultipliers = {
    standard: 1,
    premium: 1.3,
    luxury: 1.6,
  };

  const baseRate = 30000;
  const multiplier = qualityMultipliers[projectData.qualityLevel];
  const totalArea = projectData.areaSqm;

  const baseCost = totalArea * baseRate * multiplier;
  const minCost = Math.round(baseCost * 0.95);
  const maxCost = Math.round(baseCost * 1.05);

  const cementBagsPerSqm = 0.4 * projectData.floors;
  const totalCementBags = Math.round(totalArea * cementBagsPerSqm);

  const costBreakdown = [
    {
      category: "Land Preparation and Excavation",
      amount: {
        min: Math.round(minCost * 0.05),
        max: Math.round(maxCost * 0.055),
      },
      percentage: 5,
      details: [
        {
          item: "Site clearing and excavation",
          quantity: `${totalArea} sq.m`,
          unit_cost: 1500,
          total_cost: totalArea * 1500,
        },
      ],
    },
    {
      category: "Structural Work",
      amount: {
        min: Math.round(minCost * 0.37),
        max: Math.round(maxCost * 0.385),
      },
      percentage: 37,
      details: [
        {
          item: "Reinforced concrete for foundation, columns, and beams",
          quantity: `${Math.round(totalArea * 0.6)} cu.m`,
          unit_cost: 7500,
          total_cost: Math.round(totalArea * 0.6 * 7500),
        },
        {
          item: "Structural steel work",
          quantity: `${Math.round(totalArea * 0.08)} MT`,
          unit_cost: 75000,
          total_cost: Math.round(totalArea * 0.08 * 75000),
        },
      ],
    },
    {
      category: "MEP and Electrical Work",
      amount: {
        min: Math.round(minCost * 0.16),
        max: Math.round(maxCost * 0.175),
      },
      percentage: 16,
      details: [
        {
          item: "Electrical installations",
          quantity: `${totalArea} sq.m`,
          unit_cost: 2000,
          total_cost: totalArea * 2000,
        },
        {
          item: "Plumbing and sanitary fittings",
          quantity: `${totalArea} sq.m`,
          unit_cost: 1500,
          total_cost: totalArea * 1500,
        },
      ],
    },
    {
      category: "External and Miscellaneous Work",
      amount: {
        min: Math.round(minCost * 0.05),
        max: Math.round(maxCost * 0.058),
      },
      percentage: 5,
      details: [
        {
          item: "External landscaping and drainage",
          quantity: `${Math.round(totalArea * 0.4)} sq.m`,
          unit_cost: 2500,
          total_cost: Math.round(totalArea * 0.4 * 2500),
        },
      ],
    },
    {
      category: "Finishing Work",
      amount: {
        min: Math.round(minCost * 0.32),
        max: Math.round(maxCost * 0.35),
      },
      percentage: 32,
      details: [
        {
          item:
            projectData.qualityLevel === "luxury"
              ? "Premium flooring (marble/granite)"
              : "Quality flooring",
          quantity: `${totalArea} sq.m`,
          unit_cost:
            projectData.qualityLevel === "luxury"
              ? 3000
              : projectData.qualityLevel === "premium"
              ? 2000
              : 1200,
          total_cost:
            totalArea *
            (projectData.qualityLevel === "luxury"
              ? 3000
              : projectData.qualityLevel === "premium"
              ? 2000
              : 1200),
        },
        {
          item: "Interior fittings and fixtures",
          quantity: `${totalArea} sq.m`,
          unit_cost:
            projectData.qualityLevel === "luxury"
              ? 6000
              : projectData.qualityLevel === "premium"
              ? 4000
              : 2500,
          total_cost:
            totalArea *
            (projectData.qualityLevel === "luxury"
              ? 6000
              : projectData.qualityLevel === "premium"
              ? 4000
              : 2500),
        },
      ],
    },
  ];

  const factorsConsidered = [
    {
      factor: `Location (${projectData.city})`,
      impact: "Regional cost variations and local regulations",
      percentage_effect: 10,
    },
    {
      factor: `${
        projectData.qualityLevel.charAt(0).toUpperCase() +
        projectData.qualityLevel.slice(1)
      } quality finishes`,
      impact: "Higher material and labor costs for premium materials",
      percentage_effect:
        projectData.qualityLevel === "luxury"
          ? 15
          : projectData.qualityLevel === "premium"
          ? 10
          : 5,
    },
    {
      factor: `Timeline (${projectData.timelineMonths} months)`,
      impact:
        projectData.timelineMonths < 18
          ? "Expedited timeline may increase costs"
          : "Standard timeline allows for cost optimization",
      percentage_effect: projectData.timelineMonths < 18 ? 5 : 0,
    },
  ];

  const recommendations = [
    {
      type: "Value Engineering",
      description: "Optimize material choices without compromising quality",
      potential_savings: 7.5,
    },
    {
      type: "Local sourcing of materials",
      description: "Reduce transportation costs by using local suppliers",
      potential_savings: 2.5,
    },
    {
      type: "Phased construction",
      description: "Manage cash flow effectively and reduce financing costs",
      potential_savings: 5,
    },
  ];

  const cementBreakdown = [
    {
      cement_type: "OPC 53 Grade (Foundation & Structural)",
      quantity_bags: Math.round(totalCementBags * 0.5),
      unit_cost: 400,
      total_cost: Math.round(totalCementBags * 0.5 * 400),
      usage: "Foundation, columns, beams, and load-bearing structures",
    },
    {
      cement_type: "OPC 43 Grade (General Construction)",
      quantity_bags: Math.round(totalCementBags * 0.3),
      unit_cost: 350,
      total_cost: Math.round(totalCementBags * 0.3 * 350),
      usage: "Plastering, brick work, and non-structural elements",
    },
    {
      cement_type: "PPC (Portland Pozzolana Cement)",
      quantity_bags: Math.round(totalCementBags * 0.2),
      unit_cost: 320,
      total_cost: Math.round(totalCementBags * 0.2 * 320),
      usage: "Plastering, finishing work, and exterior applications",
    },
  ];

  return {
    projectName: projectData.projectName,
    total_cost: {
      min: minCost,
      max: maxCost,
    },
    cost_breakdown: costBreakdown,
    cement_breakdown: cementBreakdown,
    factors_considered: factorsConsidered,
    recommendations,
  };
}
