"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, PieChart, Pie, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { Users, Calendar, Clock, AlertCircle, MapPin, PhoneCall, CarFront, Stethoscope } from 'lucide-react';

// Mock data for the charts
const mockData = {
  ageDistribution: [
    { age: '65-70', value: 32 },
    { age: '71-75', value: 28 },
    { age: '76-80', value: 25 },
    { age: '81-85', value: 15 },
  ],
  appointmentTypes: [
    { name: 'PCP Visits', value: 42 },
    { name: 'Specialist', value: 35 },
    { name: 'Labs', value: 15 },
    { name: 'Screenings', value: 8 },
  ],
  funnelMetrics: [
    { stage: "Total Cohort Size", value: "5,250", subtext: "15% of eligible" },
    { stage: "Current Retention Rate", value: "64%", subtext: "Below target" },
    { stage: "Expected Churn", value: "1,890", subtext: "36% of cohort" },
    { stage: "Retention Opportunity", value: "+1,103", subtext: "Through personalized intervention" }
  ]
};

const COLORS = ['#2563eb', '#3b82f6', '#60a5fa', '#93c5fd'];

const CohortDetailsDashboard = () => {
  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Missed Appointments Members</h1>
        <Card className="bg-blue-50">
          <CardContent className="pt-6">
            <h3 className="text-lg font-semibold mb-3">Cohort Definition</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h4 className="font-medium mb-2">Clinical Profile:</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Multiple chronic conditions (avg. 2.8)</li>
                  <li>Higher HbA1c variability (±0.8%)</li>
                  <li>Medication adherence below 70%</li>
                  <li>Preventive screening gaps</li>
                  <li>Higher ED utilization (+25%)</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">Appointment Patterns:</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>2+ missed appointments in 6 months</li>
                  <li>48% same-day cancellations</li>
                  <li>Avg. 32 days between reschedules</li>
                  <li>75% specialist appointment gaps</li>
                  <li>Irregular follow-up compliance</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">Digital Engagement:</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>38% portal activation rate</li>
                  <li>22% use mobile app regularly</li>
                  <li>45% opt-in to text reminders</li>
                  <li>15% telehealth utilization</li>
                  <li>Low digital literacy scores</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Cohort Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {mockData.funnelMetrics.map((metric, index) => (
                <div 
                  key={index} 
                  className={`p-4 rounded-lg ${
                    index === 3 ? 'bg-green-100' : 'bg-blue-100'
                  }`}
                >
                  <div className="text-sm font-medium mb-1">{metric.stage}</div>
                  <div className="text-2xl font-bold">{metric.value}</div>
                  <div className="text-sm font-medium mt-1 text-gray-700">
                    {metric.subtext}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Age Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={mockData.ageDistribution}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="age" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#2563eb" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Missed Appointment Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={mockData.appointmentTypes}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {mockData.appointmentTypes.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CohortDetailsDashboard;