'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Phone, Clock, PhoneCall, Calendar, Users } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

const ProgramDetails = () => {
  // Target cohort data
  const cohortData = [
    { name: 'Missed Appointments', value: 8500, color: '#3B82F6' },
    { name: 'Limited Provider Contact', value: 6800, color: '#10B981' },
    { name: 'Medication Non-Adherence', value: 5130, color: '#6366F1' }
  ];

  // Weekly trend data
  const weeklyTrendData = [
    { week: 'Week 1', calls: 850, answered: 380 },
    { week: 'Week 2', calls: 920, answered: 415 },
    { week: 'Week 3', calls: 780, answered: 350 },
    { week: 'Week 4', calls: 1050, answered: 472 }
  ];

  const programStats = {
    callsMade: 20430,
    totalCalls: 35000,
    avgCallLength: '4:30',
    answerRate: 45,
  };

  const callHistory = [
    { 
      id: 1,
      memberId: "MEM-2024-001",
      date: "2024-01-28",
      time: "10:30 AM",
      duration: "5:20",
      outcome: "Completed",
      notes: "Member agreed to schedule follow-up appointment",
      cohort: "Missed Appointments"
    },
    { 
      id: 2,
      memberId: "MEM-2024-015",
      date: "2024-01-28",
      time: "11:45 AM",
      duration: "3:15",
      outcome: "Voicemail",
      notes: "Left detailed message about medication adherence",
      cohort: "Medication Non-Adherence"
    },
    { 
      id: 3,
      memberId: "MEM-2024-023",
      date: "2024-01-28",
      time: "2:15 PM",
      duration: "4:45",
      outcome: "Completed",
      notes: "Discussed care plan changes",
      cohort: "Limited Provider Contact"
    },
    { 
      id: 4,
      memberId: "MEM-2024-030",
      date: "2024-01-27",
      time: "9:15 AM",
      duration: "3:30",
      outcome: "No Answer",
      notes: "Second attempt - will try again next week",
      cohort: "Missed Appointments"
    },
    { 
      id: 5,
      memberId: "MEM-2024-042",
      date: "2024-01-27",
      time: "1:30 PM",
      duration: "6:15",
      outcome: "Completed",
      notes: "Comprehensive medication review completed",
      cohort: "Medication Non-Adherence"
    }
  ];

  const upcomingCalls = [
    {
      id: 1,
      memberId: "MEM-2024-045",
      scheduledDate: "2024-01-29",
      scheduledTime: "9:00 AM",
      priority: "High",
      reason: "Missed appointment follow-up",
      cohort: "Missed Appointments"
    },
    {
      id: 2,
      memberId: "MEM-2024-052",
      scheduledDate: "2024-01-29",
      scheduledTime: "10:30 AM",
      priority: "Medium",
      reason: "Medication review",
      cohort: "Medication Non-Adherence"
    },
    {
      id: 3,
      memberId: "MEM-2024-061",
      scheduledDate: "2024-01-29",
      scheduledTime: "2:00 PM",
      priority: "High",
      reason: "Care plan discussion",
      cohort: "Limited Provider Contact"
    },
    {
      id: 4,
      memberId: "MEM-2024-075",
      scheduledDate: "2024-01-30",
      scheduledTime: "11:15 AM",
      priority: "Medium",
      reason: "Follow-up on missed PCP visit",
      cohort: "Missed Appointments"
    },
    {
      id: 5,
      memberId: "MEM-2024-083",
      scheduledDate: "2024-01-30",
      scheduledTime: "3:45 PM",
      priority: "Low",
      reason: "Routine check-in",
      cohort: "Limited Provider Contact"
    }
  ];

  const getOutcomeColor = (outcome) => {
    const colors = {
      'Completed': 'bg-green-100 text-green-800',
      'Voicemail': 'bg-yellow-100 text-yellow-800',
      'No Answer': 'bg-red-100 text-red-800'
    };
    return colors[outcome] || 'bg-gray-100 text-gray-800';
  };

  const getPriorityColor = (priority) => {
    const colors = {
      'High': 'bg-red-100 text-red-800',
      'Medium': 'bg-yellow-100 text-yellow-800',
      'Low': 'bg-blue-100 text-blue-800'
    };
    return colors[priority] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">New Member Retention Program</h1>
        <p className="text-gray-500">Program Details and Call Management</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Calls Made</p>
                <p className="text-2xl font-bold">{programStats.callsMade.toLocaleString()}</p>
                <p className="text-sm text-gray-500">of {programStats.totalCalls.toLocaleString()}</p>
              </div>
              <Phone className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Avg Call Length</p>
                <p className="text-2xl font-bold">{programStats.avgCallLength}</p>
                <p className="text-sm text-gray-500">minutes</p>
              </div>
              <Clock className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Answer Rate</p>
                <p className="text-2xl font-bold">{programStats.answerRate}%</p>
                <p className="text-sm text-gray-500">of total calls</p>
              </div>
              <PhoneCall className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Upcoming Calls</p>
                <p className="text-2xl font-bold">{upcomingCalls.length}</p>
                <p className="text-sm text-gray-500">scheduled</p>
              </div>
              <Calendar className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
      </div>


      {/* Call History */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Recent Call History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Member ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Outcome</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cohort</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Notes</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {callHistory.map((call) => (
                  <tr key={call.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{call.memberId}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{call.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{call.time}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{call.duration}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium`}>
                        {call.outcome}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{call.cohort}</td>
                    <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">{call.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Calls */}
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Calls</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Member ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cohort</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reason</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {upcomingCalls.map((call) => (
                  <tr key={call.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{call.memberId}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{call.scheduledDate}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{call.scheduledTime}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium}`}>
                        {call.priority}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{call.cohort}</td>
                    <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">{call.reason}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProgramDetails;