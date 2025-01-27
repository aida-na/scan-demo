"use client";
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Search, 
  Plus, 
  ExternalLink,
  Clock,
  Tag,
  Users,
  Mail,
  Filter,
  ArrowUpDown,
  CloudIcon
} from 'lucide-react';

const CampaignOverview = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showLiveOnly, setShowLiveOnly] = useState(false);

  // Sample data - in production this would come from your backend
  const campaigns = [
    {
      id: 1,
      name: 'Diabetes Program Enrollment 2025',
      status: 'live',
      campaignStatus: {
        isLive: true,
        startDate: '2024-12-26',
        endDate: '2025-02-21',
      },
      exportLocation: 'Salesforce Marketing Cloud',
      exportDate: '2024-12-26',
      type: 'existing',
      goal: 'diabetes-enroll',
      cohorts: [
        { name: 'Prediabetes Risk', size: 450000 },
        { name: 'Unmanaged A1C', size: 180000 }
      ],
      channels: ['email'],
      contentVersion: 'Option 1',
      lastModified: '2024-12-26'
    },
    {
      id: 2,
      name: 'Diabetes Care Onboarding Q2',
      status: 'draft',
      campaignStatus: {
        isLive: false
      },
      type: 'new',
      goal: 'diabetes-engage',
      cohorts: [
        { name: 'Rural Markets', size: 320000 }
      ],
      channels: ['email', 'sms'],
      contentVersion: 'Option 2',
      lastModified: '2024-12-19'
    },
    {
      id: 3,
      name: 'Diabetes Management Program',
      status: 'scheduled',
      campaignStatus: {
        isLive: false,
        scheduledStart: '2025-01-04',
        scheduledEnd: '2025-05-01'
      },
      exportLocation: 'Twilio',
      exportDate: '2024-12-18',
      type: 'new',
      goal: 'diabetes-retain',
      cohorts: [
        { name: 'SDOH Challenges', size: 280000 }
      ],
      channels: ['sms', 'voice'],
      contentVersion: 'Option 1',
      lastModified: '2024-12-18'
    }
  ];

  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesSearch = campaign.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || campaign.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'live':
        return 'bg-green-100 text-green-800';
      case 'scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'draft':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIndicator = (campaign) => {
    if (campaign.status === 'live') {
      return (
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-sm text-green-700">Live</span>
          </div>
          <span className="text-sm text-gray-500">
            {new Date(campaign.campaignStatus.startDate).toLocaleDateString()} - 
            {new Date(campaign.campaignStatus.endDate).toLocaleDateString()}
          </span>
        </div>
      );
    } else if (campaign.status === 'scheduled') {
      return (
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-blue-500" />
          <span className="text-sm text-gray-500">
            Scheduled for {new Date(campaign.campaignStatus.scheduledStart).toLocaleDateString()}
          </span>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Campaign Overview</h1>
          <Button className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            New Campaign
          </Button>
        </div>

        <div className="flex gap-4 mb-6">
          <div className="relative flex-1">
            <Input
              placeholder="Search campaigns..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Filter
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <ArrowUpDown className="w-4 h-4" />
              Sort
            </Button>
          </div>
        </div>

        <Tabs defaultValue="all" className="mb-6">
          <TabsList>
            <TabsTrigger value="all" onClick={() => setFilterStatus('all')}>
              All Campaigns
            </TabsTrigger>
            <TabsTrigger value="live" onClick={() => setFilterStatus('live')}>
              Live
            </TabsTrigger>
            <TabsTrigger value="scheduled" onClick={() => setFilterStatus('scheduled')}>
              Scheduled
            </TabsTrigger>
            <TabsTrigger value="draft" onClick={() => setFilterStatus('draft')}>
              Drafts
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="grid gap-4">
          {filteredCampaigns.map((campaign) => (
            <Card key={campaign.id} className="overflow-hidden">
              <CardContent className="p-6">
                <div className="grid grid-cols-12 gap-6">
                  <div className="col-span-4">
                    <h3 className="font-semibold text-lg mb-2">{campaign.name}</h3>
                    <div className="flex gap-2 mb-2">
                      <Badge className={getStatusColor(campaign.status)}>
                        {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                      </Badge>
                      <Badge variant="outline">{campaign.type === 'new' ? 'New Campaign' : 'Existing Journey'}</Badge>
                    </div>
                    {campaign.exportLocation && (
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <CloudIcon className="w-4 h-4" />
                        {campaign.exportLocation}
                      </div>
                    )}
                    {getStatusIndicator(campaign)}
                  </div>

                  <div className="col-span-2">
                    <div className="text-sm text-gray-500 mb-1">Cohorts</div>
                    <div className="space-y-1">
                      {campaign.cohorts.map((cohort, idx) => (
                        <div key={idx} className="flex items-center gap-1 text-sm">
                          <Users className="w-3 h-3" />
                          {cohort.name}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="col-span-2">
                    <div className="text-sm text-gray-500 mb-1">Channels</div>
                    <div className="space-y-1">
                      {campaign.channels.map((channel, idx) => (
                        <div key={idx} className="flex items-center gap-1 text-sm">
                          <Mail className="w-3 h-3" />
                          {channel.charAt(0).toUpperCase() + channel.slice(1)}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="col-span-2">
                    <div className="text-sm text-gray-500 mb-1">Content</div>
                    <div className="text-sm">{campaign.contentVersion}</div>
                  </div>

                  <div className="col-span-2 flex items-start justify-end">
                    <div className="text-sm text-gray-500">
                      <Clock className="w-3 h-3 inline mr-1" />
                      Modified {new Date(campaign.lastModified).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CampaignOverview;