'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Phone, Battery, Users, Monitor, PersonStanding } from 'lucide-react';

const VoiceDashboard = () => {
  // Sample data structure for programs and their agents
  const programData = [
    {
      id: 1,
      name: 'Diabetes Care Onboarding 2025',
      status: 'Active',
      startDate: '2024-02-15',
      endDate: '2025-02-15',
      targetCohorts: ['Unmanaged A1C', 'Lifestyle Change Ready'],
      description: 'Proactive outreach for diabetes care management',
      agents: [
        {
          id: 1,
          name: 'Emma',
          type: 'AI',
          status: 'Active',
          callsMade: 15025,
          totalCalls: 18000,
          avgCallLength: '1:45',
          optInRate: 45,
          handoffRate: 38,
          answerRate: 13
        },
        {
          id: 2,
          name: 'John Smith',
          type: 'Human',
          status: 'Active',
          callsMade: 1205,
          totalCalls: 1500,
          avgCallLength: '2:30',
          optInRate: 65,
          handoffRate: 28,
          answerRate: 22
        }
      ]
    },
    {
      id: 2,
      name: 'Mental Health Support Program',
      status: 'Active',
      startDate: '2024-01-20',
      endDate: '2024-12-31',
      targetCohorts: ['Depression Screening', 'Anxiety Management'],
      description: 'Mental health screening and support outreach',
      agents: [
        {
          id: 3,
          name: 'Sarah',
          type: 'AI',
          status: 'Active',
          callsMade: 60102,
          totalCalls: 75000,
          avgCallLength: '1:15',
          optInRate: 67,
          handoffRate: 42,
          answerRate: 15
        },
        {
          id: 4,
          name: 'Maria Garcia',
          type: 'Human',
          status: 'Paused',
          callsMade: 2890,
          totalCalls: 3000,
          avgCallLength: '3:15',
          optInRate: 72,
          handoffRate: 31,
          answerRate: 25
        }
      ]
    }
  ];

  const getStatusColor = (status) => {
    const colors = {
      'Active': 'bg-green-100 text-green-800',
      'Paused': 'bg-yellow-100 text-yellow-800',
      'Completed': 'bg-blue-100 text-blue-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  // Calculate dashboard metrics
  const totalActiveAgents = programData.reduce((sum, program) => 
    sum + program.agents.filter(agent => agent.status === 'Active').length, 0
  );

  const totalMembersReached = programData.reduce((sum, program) => 
    sum + program.agents.reduce((agentSum, agent) => agentSum + agent.callsMade, 0), 0
  );

  const avgOptInRate = programData.reduce((sum, program) => {
    const programAgents = program.agents.length;
    const programOptIn = program.agents.reduce((agentSum, agent) => agentSum + agent.optInRate, 0);
    return sum + (programOptIn / programAgents);
  }, 0) / programData.length;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Voice Dashboard</h1>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Active Agents</p>
                <p className="text-2xl font-bold">{totalActiveAgents}</p>
              </div>
              <Battery className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Members Reached</p>
                <p className="text-2xl font-bold">{totalMembersReached.toLocaleString()}</p>
              </div>
              <Phone className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Avg Opt-in Rate</p>
                <p className="text-2xl font-bold">{avgOptInRate.toFixed(1)}%</p>
              </div>
              <Users className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Active Programs */}
      <div className="space-y-6">
        {programData.map(program => (
          <Card key={program.id} className="overflow-hidden">
            <CardContent className="p-6">
              {/* Program Header */}
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-semibold text-lg">{program.name}</h3>
                  <p className="text-sm text-gray-500">{program.description}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(program.status)}`}>
                  {program.status}
                </span>
              </div>

              {/* Program Details */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div>
                  <p className="text-sm text-gray-500">Start Date</p>
                  <p className="font-medium">{formatDate(program.startDate)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">End Date</p>
                  <p className="font-medium">{formatDate(program.endDate)}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-gray-500">Target Cohorts</p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {program.targetCohorts.map((cohort, index) => (
                      <span key={index} className="bg-blue-50 text-blue-700 px-2 py-1 rounded-md text-sm">
                        {cohort}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Agents Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {program.agents.map(agent => (
                  <Card key={agent.id} className="bg-gray-50">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          {agent.type === 'AI' ? (
                            <Monitor className="h-5 w-5 text-blue-500" />
                          ) : (
                            <PersonStanding className="h-5 w-5 text-green-500" />
                          )}
                          <span className="font-medium">{agent.name}</span>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(agent.status)}`}>
                          {agent.status}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div>
                          <p className="text-gray-500">Calls Made</p>
                          <p className="font-medium">{agent.callsMade.toLocaleString()} / {agent.totalCalls.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Avg Call Length</p>
                          <p className="font-medium">{agent.avgCallLength}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Opt-in Rate</p>
                          <p className="font-medium">{agent.optInRate}%</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Answer Rate</p>
                          <p className="font-medium">{agent.answerRate}%</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default VoiceDashboard;