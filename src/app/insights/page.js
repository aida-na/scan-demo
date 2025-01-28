
"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Users, TrendingUp, Activity, Target, Map, Calculator, ChartBar, Heart } from 'lucide-react';
import PrediabetesMap from "@/app/PrediabetesMap";

// Mock data for the charts
const mockData = {
  ageDistribution: [
    { age: '65-70', value: 25 },
    { age: '71-75', value: 30 },
    { age: '76-80', value: 28 },
    { age: '81-85', value: 17 },
  ],
  funnelMetrics: [
    { stage: "Total Cohort Size", value: "450,000", percentage: "22.5%" },
    { stage: "Current Enrollment", value: "18,900", percentage: "4.2%" },
    { stage: "Potential with Personalization", value: "71,100", percentage: "15.8%" },
    { stage: "Potential New Enrollment", value: "+52,088", percentage: "Growth" }
  ]
};

const CohortDetailsDashboard = () => {
  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Prediabetes Risk Members</h1>
        <Card className="bg-orange-50">
          <CardContent className="pt-6">
            <h3 className="text-lg font-semibold mb-3">Cohort Definition</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h4 className="font-medium mb-2">Clinical Profile:</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Elevated blood glucose levels</li>
                  <li>A1C between 5.7% and 6.4%</li>
                  <li>Fasting glucose 100-125 mg/dL</li>
                  <li>No current diabetes diagnosis</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">Risk Factors:</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>BMI ≥ 25</li>
                  <li>Family history of diabetes</li>
                  <li>Sedentary lifestyle indicators</li>
                  <li>History of gestational diabetes</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">Monitoring Status:</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Annual A1C screening</li>
                  <li>Quarterly glucose monitoring</li>
                  <li>Regular BMI tracking</li>
                  <li>Lifestyle assessment needed</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Enrollment Funnel & Potential</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {mockData.funnelMetrics.map((metric, index) => (
                <div 
                  key={index} 
                  className={`p-4 rounded-lg ${
                    index === 0 ? 'bg-orange-100' : 
                    index === 1 ? 'bg-orange-200' : 
                    index === 2 ? 'bg-orange-300' : 
                    'bg-green-300'
                  }`}
                >
                  <div className="text-sm font-medium mb-1">{metric.stage}</div>
                  <div className="text-2xl font-bold">{metric.value}</div>
                  <div className="text-sm font-medium mt-1 text-gray-700">
                    {metric.percentage}
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
            <div className="flex items-center gap-2">
              <CardTitle>Geographic Distribution</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="w-full aspect-[2/1] min-h-[300px]">
              <PrediabetesMap />
            </div>
          </CardContent>
        </Card>

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
                <Bar dataKey="value" fill="#f97316" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CohortDetailsDashboard;