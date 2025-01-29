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
    eligiblePopulation: 30000,
    currentRetentionRate: 90,
    yearlyChurn: Math.round(30000 * 0.1), // 10% of eligible population (30k)
    retentionImprovement: 15
  };

  const improvedMembers = Math.round(metrics.yearlyChurn * (metrics.retentionImprovement / 100));

  return (
    <div className="grid grid-cols-4 gap-6 mb-8">
      <MetricCard
        title="Total New Eligible Population"
        value={metrics.eligiblePopulation.toLocaleString()}
        tooltip="Total number of new members"
      />
      <MetricCard
        title="Current Retention Rate"
        value={`${metrics.currentRetentionRate}%`}
        tooltip="Percentage of enrolled members staying in the program"
      />
      <MetricCard
        title="Yearly Churn"
        value={metrics.yearlyChurn.toLocaleString()}
        subtitle={`${((metrics.yearlyChurn / metrics.eligiblePopulation) * 100).toFixed(1)}% of eligible`}
        tooltip="Number of members expected to leave the program within a year"
      />
      <MetricCard
        title="Retention Improvement"
        value={`+${metrics.retentionImprovement}%`}
        subtitle={`${improvedMembers.toLocaleString()} more retained`}
        valueColor="text-green-600"
        tooltip="Potential improvement in retention through personalized interventions"
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
                  {cohort.name === "Missed Appointments" ? (
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
                ({((cohort.size / 35000) * 100).toFixed(1)}% of eligible)
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
      name: "Medication Non-Adherence",
      description: "Members showing irregular medication refill patterns",
      icon: <Clock className="mr-2 text-blue-700" size={20} />,
      size: 7000,
      currentRetention: 62,
      potentialChurn: 2660,
      retentionOpportunity: 1610
    },
    {
      id: 2,
      name: "New-Onset Chronic Conditions",
      description: "Members diagnosed with new chronic conditions in past 90 days",
      icon: <AlertCircle className="mr-2 text-blue-700" size={20} />,
      size: 6300,
      currentRetention: 63,
      potentialChurn: 2331,
      retentionOpportunity: 1386
    },
    {
      id: 3,
      name: "Missed Appointments",
      description: "Members who missed 2+ appointments in last 6 months",
      icon: <Calendar className="mr-2 text-blue-700" size={20} />,
      size: 5250,
      currentRetention: 64,
      potentialChurn: 1890,
      retentionOpportunity: 1103
    },
    {
      id: 4,
      name: "High-Risk Dual Eligibles",
      description: "Dual Medicare-Medicaid members with complex care needs",
      icon: <HeartPulse className="mr-2 text-blue-700" size={20} />,
      size: 4900,
      currentRetention: 61,
      potentialChurn: 1911,
      retentionOpportunity: 1176
    },
    {
      id: 5,
      name: "Limited Provider Contact",
      description: "Members with minimal provider interactions",
      icon: <Users className="mr-2 text-blue-700" size={20} />,
      size: 4200,
      currentRetention: 63,
      potentialChurn: 1554,
      retentionOpportunity: 924
    },
    {
      id: 6,
      name: "Post-Acute Care Transitions",
      description: "Recently discharged from hospital or skilled nursing",
      icon: <Activity className="mr-2 text-blue-700" size={20} />,
      size: 3850,
      currentRetention: 66,
      potentialChurn: 1309,
      retentionOpportunity: 731
    },
    {
      id: 7,
      name: "Limited English Proficiency",
      description: "Members requiring language assistance services",
      icon: <Users className="mr-2 text-blue-700" size={20} />,
      size: 3500,
      currentRetention: 67,
      potentialChurn: 1155,
      retentionOpportunity: 630
    },
    {
      id: 8,
      name: "Digital Navigation Challenges",
      description: "Low digital literacy affecting telehealth/portal usage",
      icon: <Brain className="mr-2 text-blue-700" size={20} />,
      size: 3150,
      currentRetention: 63,
      potentialChurn: 1166,
      retentionOpportunity: 693
    },
    {
      id: 9,
      name: "Social Isolation Risk",
      description: "Members with limited social support network",
      icon: <Users className="mr-2 text-blue-700" size={20} />,
      size: 2800,
      currentRetention: 62,
      potentialChurn: 1064,
      retentionOpportunity: 644
    },
    {
      id: 10,
      name: "Behavioral Health Needs",
      description: "Members with untreated depression or anxiety",
      icon: <Brain className="mr-2 text-blue-700" size={20} />,
      size: 2450,
      currentRetention: 60,
      potentialChurn: 980,
      retentionOpportunity: 613
    },
    {
      id: 12,
      name: "Care Coordination Gaps",
      description: "Multiple providers with limited communication",
      icon: <Stethoscope className="mr-2 text-blue-700" size={20} />,
      size: 1750,
      currentRetention: 64,
      potentialChurn: 630,
      retentionOpportunity: 368
    },
    {
      id: 13,
      name: "Benefit Utilization Issues",
      description: "Low engagement with supplemental benefits",
      icon: <Clock4 className="mr-2 text-blue-700" size={20} />,
      size: 1050,
      currentRetention: 65,
      potentialChurn: 368,
      retentionOpportunity: 210
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
            <h1 className="text-2xl font-bold">Smart Cohorts for New Member Retention</h1>
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

