"use client"
import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { 
  Activity, AlertCircle, Calendar, HeartPulse, 
  Building2, Brain, MapPin, Users, Clock, 
  TrendingDown, Download, Share, FileDown,
  ArrowUpDown, Info, Stethoscope, Clock4
} from 'lucide-react';

const InfoTooltip = ({ content }) => (
  <TooltipProvider>
    <Tooltip delayDuration={100}>
      <TooltipTrigger asChild>
        <span className="inline-flex items-center cursor-help">
          <Info className="h-4 w-4 text-gray-400 hover:text-gray-600" />
        </span>
      </TooltipTrigger>
      <TooltipContent side="top" align="center" sideOffset={4}>
        <p className="text-sm max-w-xs">{content}</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
);

const MetricCard = ({ title, value, subtitle, tooltip, valueColor = "text-gray-900", icon }) => (
  <Card className="p-6 from-white to-gray-50 shadow-sm hover:shadow-md transition-shadow">
    <div className="h-25 flex flex-col">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center min-h-10 gap-1">
          <h3 className="text-sm font-medium text-gray-600 leading-tight">{title}</h3>
          {tooltip && <InfoTooltip content={tooltip} />}
        </div>
      </div>
      <div className="mt-auto">
        <p className={`text-3xl font-bold ${valueColor} tracking-tight`}>{value}</p>
        {subtitle && (
          <p className="text-sm text-gray-500 mt-2 font-medium">{subtitle}</p>
        )}
      </div>
    </div>
  </Card>
);

const MetricSummaryCard = () => {
  const metrics = {
    eligiblePopulation: 93000,
    enrolledPopulation: 35000,
    currentRetentionRate: 70,
    yearlyChurn: 10500, // 30% of 35000
    retentionImprovement: 15,
  };

  return (
    <div className="grid grid-cols-5 gap-6 mb-8">
      <MetricCard
        title="Total Eligible Population"
        value={metrics.eligiblePopulation.toLocaleString()}
        tooltip="Total number of members eligible for the diabetes program"
      />
      <MetricCard
        title="Total Enrolled"
        value={metrics.enrolledPopulation.toLocaleString()}
        subtitle={`${((metrics.enrolledPopulation / metrics.eligiblePopulation) * 100).toFixed(1)}% of eligible`}
        tooltip="Current number of members enrolled in the diabetes program"
      />
      <MetricCard
        title="Current Retention Rate"
        value={`${metrics.currentRetentionRate}%`}
        tooltip="Percentage of enrolled members staying in the program"
      />
      <MetricCard
        title="Yearly Churn"
        value={metrics.yearlyChurn.toLocaleString()}
        subtitle={`${((metrics.yearlyChurn / metrics.enrolledPopulation) * 100).toFixed(1)}% of enrolled`}
        tooltip="Number of members expected to leave the program within a year"
      />
      <MetricCard
        title="Retention Improvement"
        value={`+${metrics.retentionImprovement}%`}
        subtitle={`Up to ${metrics.currentRetentionRate + metrics.retentionImprovement}% total`}
        valueColor="text-green-600"
        tooltip="Potential improvement in retention rate through targeted interventions"
      />
    </div>
  );
};

const CohortCard = ({ cohort, onSelect, selected }) => {
  return (
    <Card className="mb-2 hover:shadow-md transition-shadow">
      <div className="p-4">
        <div className="flex flex-col space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <input
                type="checkbox"
                checked={selected}
                onChange={() => onSelect(cohort.id)}
                className="h-4 w-4 rounded border-gray-300"
              />
              <div className="flex items-center">
                {cohort.icon}
                <div className="flex flex-col">
                  {cohort.name === "Prediabetes Risk" ? (
                    <a href="/insights" className="font-medium hover:text-blue-600 hover:underline">{cohort.name}</a>
                  ) : (
                    <span className="font-medium">{cohort.name}</span>
                  )}
                  <span className="text-sm text-gray-500">{cohort.description}</span>
                </div>
              </div>
            </div>
            <div className="text-sm text-gray-500">
              {cohort.size.toLocaleString()} members
              <span className="text-gray-400 ml-1">
                ({((cohort.size / 35000) * 100).toFixed(1)}% of enrolled)
              </span>
            </div>
          </div>

          <div className="flex justify-between items-center border-t pt-4">
            <div className="flex flex-col">
              <div className="text-sm text-gray-500">Current Retention Rate</div>
              <div className="text-2xl font-bold">
                {cohort.currentRetention}%
              </div>
            </div>
            <div className="flex flex-col items-end">
              <div className="flex items-center gap-1">
                <div className="text-sm text-gray-500">Expected Churn</div>
                <InfoTooltip content="Members at risk of leaving the program" />
              </div>
              <div className="text-2xl font-bold">
                {cohort.potentialChurn.toLocaleString()}
              </div>
            </div>
            <div className="flex flex-col items-end border-l pl-6">
              <div className="flex items-center gap-1">
                <div className="text-sm text-gray-500">Retention Opportunity</div>
                <InfoTooltip content="Additional members that could be retained by reaching 85% retention rate" />
              </div>
              <div className="text-2xl font-bold text-green-600">
                +{cohort.retentionOpportunity.toLocaleString()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};


const ActionBar = ({ selectedCount }) => (
  <div className="sticky top-0 z-10 bg-white border-b mb-6 py-3">
    <div className="flex justify-between items-center">
      <div className="flex items-center space-x-2">
        {selectedCount > 0 && (
          <span className="text-sm text-gray-600">
            {selectedCount} cohort{selectedCount !== 1 ? 's' : ''} selected
          </span>
        )}
      </div>
      <div className="flex space-x-3">
        <Button variant="outline" size="sm" className="flex items-center">
          <Share className="mr-2 h-4 w-4" />
          Connect to Journey
        </Button>
        <Button variant="outline" size="sm" className="flex items-center">
          <FileDown className="mr-2 h-4 w-4" />
          Export Selected
        </Button>
        <Button variant="outline" size="sm" className="flex items-center">
          <Download className="mr-2 h-4 w-4" />
          Download Report
        </Button>
      </div>
    </div>
  </div>
);

const Dashboard = () => {
  const [selectedCohorts, setSelectedCohorts] = useState(new Set());
  const [sortBy, setSortBy] = useState('impact');

  const toggleCohort = (cohortId) => {
    const newSelected = new Set(selectedCohorts);
    if (newSelected.has(cohortId)) {
      newSelected.delete(cohortId);
    } else {
      newSelected.add(cohortId);
    }
    setSelectedCohorts(newSelected);
  };

  const cohorts = [
    {
      id: 1,
      name: "Prediabetes Risk",
      description: "Members with elevated blood glucose levels not yet diagnosed with diabetes",
      icon: <AlertCircle className="mr-2 text-blue-700" size={20} />,
      size: 8750, // 25% of total enrolled
      currentRetention: 65,
      potentialChurn: 3063, // 35% of 8750
      retentionOpportunity: 1750 // (85% - 65%) * 8750 = 1750 members
    },
    {
      id: 2,
      name: "Medication Non-Adherence",
      description: "Members showing irregular medication refill patterns",
      icon: <Clock className="mr-2 text-blue-700" size={20} />,
      size: 7000, // 20% of total enrolled
      currentRetention: 62,
      potentialChurn: 2660,
      retentionOpportunity: 1610 // (85% - 62%) * 7000 = 1610 members
    },
    {
      id: 3,
      name: "Missed Appointments",
      description: "Members who missed 2+ appointments in last 6 months",
      icon: <Calendar className="mr-2 text-blue-700" size={20} />,
      size: 5250, // 15% of total enrolled
      currentRetention: 64,
      potentialChurn: 1890,
      retentionOpportunity: 1103 // (85% - 64%) * 5250 = 1103 members
    },
    {
      id: 4,
      name: "High A1C Volatility",
      description: "Members with unstable A1C readings",
      icon: <Activity className="mr-2 text-blue-700" size={20} />,
      size: 4200, // 12% of total enrolled
      currentRetention: 66,
      potentialChurn: 1428,
      retentionOpportunity: 798 // (85% - 66%) * 4200 = 798 members
    },
    {
      id: 5,
      name: "Complex Care Needs",
      description: "Members with multiple chronic conditions",
      icon: <Stethoscope className="mr-2 text-blue-700" size={20} />,
      size: 3500, // 10% of total enrolled
      currentRetention: 68,
      potentialChurn: 1120,
      retentionOpportunity: 595 // (85% - 68%) * 3500 = 595 members
    },
    {
      id: 6,
      name: "Limited Provider Contact",
      description: "Members with minimal provider interactions",
      icon: <Users className="mr-2 text-blue-700" size={20} />,
      size: 2450, // 7% of total enrolled
      currentRetention: 63,
      potentialChurn: 907,
      retentionOpportunity: 539 // (85% - 63%) * 2450 = 539 members
    },
    {
      id: 7,
      name: "Recent Health Changes",
      description: "Members with declining health indicators",
      icon: <TrendingDown className="mr-2 text-blue-700" size={20} />,
      size: 2100, // 6% of total enrolled
      currentRetention: 65,
      potentialChurn: 735,
      retentionOpportunity: 420 // (85% - 65%) * 2100 = 420 members
    },
    {
      id: 8,
      name: "Program Disengagement",
      description: "Members showing decreased program participation",
      icon: <Clock4 className="mr-2 text-blue-700" size={20} />,
      size: 1750, // 5% of total enrolled
      currentRetention: 61,
      potentialChurn: 683,
      retentionOpportunity: 420 // (85% - 61%) * 1750 = 420 members
    }
  ];

  const sortedCohorts = [...cohorts].sort((a, b) => {
    if (sortBy === 'impact') {
      return b.retentionOpportunity - a.retentionOpportunity;
    }
    return b.size - a.size;
  });

  return (
    <TooltipProvider>
      <div className="p-6 max-w-6xl mx-auto">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">Smart Cohorts for Diabetes Program Retention</h1>
          </div>
          <div className="flex justify-end items-center mb-4">
            <button
              onClick={() => setSortBy(sortBy === 'impact' ? 'size' : 'impact')}
              className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-900"
            >
              <ArrowUpDown size={16} />
              <span>Sort by {sortBy === 'impact' ? 'Size' : 'Impact'}</span>
            </button>
          </div>
        </div>

        <MetricSummaryCard />
        
        <ActionBar selectedCount={selectedCohorts.size} />
        
        <div className="space-y-2">
          {sortedCohorts.map(cohort => (
            <CohortCard 
              key={cohort.id}
              cohort={cohort}
              selected={selectedCohorts.has(cohort.id)}
              onSelect={toggleCohort}
            />
          ))}
        </div>
      </div>
    </TooltipProvider>
  );
};

export default Dashboard;

