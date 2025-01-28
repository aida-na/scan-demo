'use client';

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Users, TrendingUp, Activity, UserMinus, Database, Cloud, Mail, Phone, MessageSquare } from 'lucide-react';

const HomePage = () => {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  // Updated metrics data to focus on retention
  const metrics = {
    activeMembers: 200000,
    retainedMembers: 184500,
    retentionRate: 78
  };

  // Updated campaign data for mental health, fitness, and annual checkup
  const campaignData = [
    {
      name: 'Mental Health Enrollment 2025',
      status: 'Active',
      engagement: 38,
      channelType: 'multi',
      reached: 25430,
      cohorts: ['Depression Risk', 'Anxiety Symptoms'],
      description: 'Proactive mental health support and therapy enrollment campaign',
      potentialMembers: 45000
    },
    {
      name: 'Fitness Program Enrollment',
      status: 'Active',
      engagement: 55,
      channelType: 'email',
      reached: 35890,
      cohorts: ['Sedentary Lifestyle', 'Weight Management'],
      description: 'Digital fitness program with personalized workout plans',
      potentialMembers: 80000
    },
    {
      name: 'Annual Wellness Checkup',
      status: 'Active',
      engagement: 42,
      channelType: 'voice',
      reached: 98760,
      cohorts: ['Preventive Care Due', 'High Risk Members'],
      description: 'Annual wellness visit scheduling and preventive care reminders',
      potentialMembers: 150000
    }
  ];

  const [showAll, setShowAll] = useState(false);
  const displayedCampaigns = showAll ? campaignData : campaignData.slice(0, 3);

  const getChannelIcon = (channelType) => {
    switch (channelType) {
      case 'email':
        return <Mail className="w-4 h-4 text-blue-500" />;
      case 'text':
        return <MessageSquare className="w-4 h-4 text-green-500" />;
      case 'voice':
        return <Phone className="w-4 h-4 text-purple-500" />;
      case 'multi':
        return <Users className="w-4 h-4 text-indigo-500" />;
      default:
        return <MessageSquare className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      {/* Greeting */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{getGreeting()}, Kirk</h1>
        <span className="text-sm text-gray-500">
          {new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </span>
      </div>

      {/* Main Metrics - Updated for Retention */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-4">
              <Users className="w-8 h-8 text-blue-500" />
              <div>
                <p className="text-sm font-medium text-gray-800">Active Members</p>
                <h3 className="text-2xl font-bold">{metrics.activeMembers.toLocaleString()}</h3>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-4">
              <Activity className="w-8 h-8 text-blue-500" />
              <div>
                <p className="text-sm font-medium text-gray-800">Member Retention</p>
                <h3 className="text-2xl font-bold">{metrics.retainedMembers.toLocaleString()}</h3>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-4">
              <TrendingUp className="w-8 h-8 text-blue-500" />
              <div>
                <p className="text-sm font-medium text-gray-800">Retention Rate</p>
                <h3 className="text-2xl font-bold">{metrics.retentionRate}%</h3>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Active Campaigns Section */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <h2 className="text-xl font-semibold">Current Active Campaigns</h2>
            </div>
            <div className="text-sm text-gray-500">
              Updated {new Date().toLocaleTimeString()}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {displayedCampaigns.map((campaign) => (
              <Card key={campaign.name} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold">{campaign.name}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      campaign.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {campaign.status}
                    </span>
                  </div>
                  <div className="space-y-3">
                    <div className="text-sm">
                      <span className="text-gray-600">Target Cohorts:</span>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {campaign.cohorts.map((cohort) => (
                          <span 
                            key={cohort} 
                            className="px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800"
                          >
                            {cohort}
                          </span>
                        ))}
                      </div>
                      <p className="font-light mt-1">{campaign.description}</p>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <span>Channel:</span>
                      {getChannelIcon(campaign.channelType)}
                      <span className="capitalize">{campaign.channelType}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Engagement Rate</span>
                      <span className="font-medium">{campaign.engagement}%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Members Reached</span>
                      <span className="font-medium">{campaign.reached.toLocaleString()}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Data Warehouse and SFMC Export Status sections remain unchanged */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2 mb-4">
              <h2 className="text-xl font-semibold">Data Warehouse Status</h2>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="capitalize">snowflake</span>
                <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">Connected</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="capitalize">GCP</span>
                <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">Connected</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="capitalize">databricks</span>
                <span className="px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-800">Processing</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2 mb-4">
              <h2 className="text-xl font-semibold">SFMC Export Status</h2>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span>Status</span>
                <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">Active</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Last Sync</span>
                <span className="text-gray-600">10 minutes ago</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Pending Records</span>
                <span className="text-gray-600">234</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HomePage;