'use client';

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Phone, Battery, Clock, Users, Brain, HeartPulse, Play, Pause } from 'lucide-react';
import { Button } from '@/components/ui/button';

const VoiceAIDashboard = () => {
  // Updated sample data with new campaigns
  const agentData = [
    {
      id: 1,
      name: 'Agent Emma',
      program: 'Diabetes Care Onboarding 2025',
      status: 'Paused',
      activeFrom: '2024-02-15',
      callsMade: 15025,
      totalCalls: 18000,
      avgCallLength: '1:45',
      optInRate: 45,
      handoffRate: 38,
      answerRate: 13,
      lastActive: '3 ago',
      cohorts: ['Unmanaged A1C', 'Lifestyle Change Ready']
    },
    {
      id: 2,
      name: 'Agent Sarah',
      program: 'Diabetes Management Program',
      status: 'Active',
      activeFrom: '2024-01-20',
      callsMade: 60102,
      totalCalls: 75000,
      avgCallLength: '1:15',
      optInRate: 67,
      handoffRate: 42,
      answerRate: 15,
      lastActive: '2 hours ago',
      cohorts: ['Digital Engagement', 'Mental Health Comorbidity']
    }
  ];

  const [callHistory] = useState([
    {
      id: 1,
      agentName: 'Agent Emma',
      memberID: 'MEM-2024-001',
      timestamp: '2024-03-24 14:30',
      duration: '2:12',
      outcome: 'Voice Mail',
      recording: 'call_1.mp3'
    },
    {
      id: 2,
      agentName: 'Agent Sarah',
      memberID: 'MEM-2024-002',
      timestamp: '2024-03-24 14:15',
      duration: '5:45',
      outcome: 'Follow-up',
      recording: 'call_2.mp3'
    },
    {
      id: 3,
      agentName: 'Agent Emma',
      memberID: 'MEM-2024-003',
      timestamp: '2024-03-24 14:00',
      duration: '3:30',
      outcome: 'Handoff to Care Manager',
      recording: 'call_3.mp3'
    },
    {
      id: 4,
      agentName: 'Agent Sarah',
      memberID: 'MEM-2024-004',
      timestamp: '2024-03-24 13:45',
      duration: '4:50',
      outcome: 'Opted In',
      recording: 'call_4.mp3'
    },
    {
      id: 5,
      agentName: 'Agent Emma',
      memberID: 'MEM-2024-005',
      timestamp: '2024-03-24 13:30',
      duration: '2:15',
      outcome: 'No Answer',
      recording: 'call_5.mp3'
    },
    {
      id: 6,
      agentName: 'Agent Sarah',
      memberID: 'MEM-2024-006',
      timestamp: '2024-03-24 13:15',
      duration: '6:20',
      outcome: 'Handoff to Care Manager',
      recording: 'call_6.mp3'
    },
    {
      id: 7,
      agentName: 'Agent Emma',
      memberID: 'MEM-2024-007',
      timestamp: '2024-03-24 13:00',
      duration: '1:45',
      outcome: 'Declined',
      recording: 'call_7.mp3'
    },
    {
      id: 8,
      agentName: 'Agent Sarah',
      memberID: 'MEM-2024-008',
      timestamp: '2024-03-24 12:45',
      duration: '5:10',
      outcome: 'Scheduled Follow-up',
      recording: 'call_8.mp3'
    },
    {
      id: 9,
      agentName: 'Agent Emma',
      memberID: 'MEM-2024-009',
      timestamp: '2024-03-24 12:30',
      duration: '3:45',
      outcome: 'No Answer',
      recording: 'call_9.mp3'
    },
    {
      id: 10,
      agentName: 'Agent Sarah',
      memberID: 'MEM-2024-010',
      timestamp: '2024-03-24 12:15',
      duration: '4:30',
      outcome: 'Opted In',
      recording: 'call_10.mp3'
    }
  ]);

  const [currentlyPlaying, setCurrentlyPlaying] = useState(null);

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


  const handlePlayPause = (callId) => {
    if (currentlyPlaying === callId) {
      setCurrentlyPlaying(null);
    } else {
      setCurrentlyPlaying(callId);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Voice AI Agents Dashboard</h1>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Active Agents</p>
                <p className="text-2xl font-bold">
                  {agentData.filter(agent => agent.status === 'Active').length}
                </p>
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
                <p className="text-2xl font-bold">
                  {agentData.reduce((sum, agent) => sum + agent.callsMade, 0).toLocaleString()}
                </p>
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
                <p className="text-2xl font-bold">
                  {(agentData.reduce((sum, agent) => sum + agent.optInRate, 0) / agentData.length).toFixed(1)}%
                </p>
              </div>
              <Users className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Agents Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {agentData.map(agent => (
          <Card key={agent.id} className="overflow-hidden">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-semibold text-lg">{agent.name}</h3>
                  <p className={`font-medium`}>{agent.program}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(agent.status)}`}>
                  {agent.status}
                </span>
              </div>

              {/* Cohorts Section */}
              <div className="mb-4">
                <p className="text-sm text-gray-500 mb-2">Target Cohorts:</p>
                <div className="flex flex-wrap gap-2">
                  {agent.cohorts.map((cohort, index) => (
                    <span key={index} className="bg-blue-50 text-blue-700 px-2 py-1 rounded-md text-sm">
                      {cohort}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Members Reached</p>
                  <p className="font-medium">
                    {agent.callsMade.toLocaleString()} / {agent.totalCalls.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Answer Rate</p>
                  <p className="font-medium">{agent.answerRate}%</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Avg Call Length</p>
                  <p className="font-medium">{agent.avgCallLength}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Opt-in Rate</p>
                  <p className="font-medium">{agent.optInRate}%</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Handoff Rate</p>
                  <p className="font-medium">{agent.handoffRate}%</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Active From</p>
                  <p className="font-medium">{formatDate(agent.activeFrom)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Recent Call History</h2>
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Agent</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Member ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timestamp</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Outcome</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Recording</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {callHistory.map((call) => (
                    <tr key={call.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="font-medium">{call.agentName}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-gray-900">{call.memberID}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-gray-900">{call.timestamp}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-gray-900">{call.duration}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`font-medium text-orange-700 `}>
                          {call.outcome}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="flex items-center gap-2"
                          onClick={() => handlePlayPause(call.id)}
                        >
                          {currentlyPlaying === call.id ? (
                            <>
                              <Pause className="h-4 w-4" />
                              <span>Pause</span>
                            </>
                          ) : (
                            <>
                              <Play className="h-4 w-4" />
                              <span>Play</span>
                            </>
                          )}
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

    </div>
  );
};

export default VoiceAIDashboard;