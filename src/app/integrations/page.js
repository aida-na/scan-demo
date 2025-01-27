"use client";
import React, { useState } from 'react';
import { Database, ArrowRightLeft, Key, PlusCircle, Search } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

const IntegrationsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const warehouses = [
    { 
      id: 'snowflake', 
      name: 'Snowflake', 
      status: 'connected',
      description: 'Cloud data platform',
      lastSync: '2 hours ago'
    },
    { 
      id: 'gcp', 
      name: 'Google Cloud Platform', 
      status: 'connected',
      description: 'Google Cloud analytics services',
      lastSync: '1 hour ago'
    },
    { 
      id: 'databricks', 
      name: 'Databricks', 
      status: 'connected',
      description: 'Unified analytics platform',
      lastSync: '30 minutes ago'
    }
  ];

  const platforms = [
    { 
      id: 'sfmc', 
      name: 'Salesforce Marketing Cloud', 
      status: 'connected',
      description: 'Marketing automation platform',
      lastSync: '1 hour ago'
    },
    { 
      id: 'braze', 
      name: 'Braze', 
      status: 'disconnected',
      description: 'Customer engagement platform',
      lastSync: 'Never'
    },
    { 
      id: 'adobe', 
      name: 'Adobe Experience Cloud', 
      status: 'disconnected',
      description: 'Digital experience platform',
      lastSync: 'Never'
    },
    { 
      id: 'iterable', 
      name: 'Iterable', 
      status: 'disconnected',
      description: 'Cross-channel marketing platform',
      lastSync: 'Never'
    }
  ];

  const filteredWarehouses = warehouses.filter(wh => 
    wh.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    wh.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredPlatforms = platforms.filter(platform => 
    platform.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    platform.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const ConnectionDialog = ({ type }) => (
    <Dialog>
      <DialogTrigger asChild>
        <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
          <PlusCircle className="h-4 w-4" />
          Add {type}
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New {type}</DialogTitle>
          <DialogDescription>
            Connect a new {type.toLowerCase()} to your platform.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <p className="text-sm font-medium">Available {type}s</p>
            {type === 'Data Warehouse' ? 
              warehouses.filter(w => w.status === 'disconnected').map(w => (
                <div key={w.id} className="flex items-center justify-between p-4 rounded-lg border hover:bg-gray-50 cursor-pointer">
                  <div>
                    <h3 className="font-medium">{w.name}</h3>
                    <p className="text-sm text-gray-500">{w.description}</p>
                  </div>
                  <button className="px-3 py-1 text-sm border rounded-md hover:bg-gray-100">
                    Connect
                  </button>
                </div>
              ))
              :
              platforms.filter(p => p.status === 'disconnected').map(p => (
                <div key={p.id} className="flex items-center justify-between p-4 rounded-lg border hover:bg-gray-50 cursor-pointer">
                  <div>
                    <h3 className="font-medium">{p.name}</h3>
                    <p className="text-sm text-gray-500">{p.description}</p>
                  </div>
                  <button className="px-3 py-1 text-sm border rounded-md hover:bg-gray-100">
                    Connect
                  </button>
                </div>
              ))
            }
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <ArrowRightLeft className="h-8 w-8 text-gray-700" />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Integrations</h1>
            <p className="text-gray-500">Manage your data connections and platform integrations</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Input 
              type="text"
              placeholder="Search integrations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                Data Warehouses
              </CardTitle>
              <CardDescription>
                Connect your data sources for cohort analysis
              </CardDescription>
            </div>
            <ConnectionDialog type="Data Warehouse" />
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {filteredWarehouses.map((warehouse) => (
                <div
                  key={warehouse.id}
                  className={`flex items-center justify-between p-4 rounded-lg border ${
                    warehouse.status === 'connected' ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${
                      warehouse.status === 'connected' ? 'bg-green-500' : 'bg-gray-400'
                    }`} />
                    <div>
                      <div className="font-medium">{warehouse.name}</div>
                      <div className="text-sm text-gray-500">
                        {warehouse.description} • Last sync: {warehouse.lastSync}
                      </div>
                    </div>
                  </div>
                  <button
                    className={`px-4 py-2 rounded-md text-sm font-medium ${
                      warehouse.status === 'connected'
                        ? 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    {warehouse.status === 'connected' ? 'Manage' : 'Connect'}
                  </button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <div>
              <CardTitle className="flex items-center gap-2">
                <ArrowRightLeft className="h-5 w-5" />
                Platform Integrations
              </CardTitle>
              <CardDescription>
                Configure your external platform connections
              </CardDescription>
            </div>
            <ConnectionDialog type="Platform" />
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {filteredPlatforms.map((platform) => (
                <div
                  key={platform.id}
                  className={`flex items-center justify-between p-4 rounded-lg border ${
                    platform.status === 'connected' ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${
                      platform.status === 'connected' ? 'bg-green-500' : 'bg-gray-400'
                    }`} />
                    <div>
                      <div className="font-medium">{platform.name}</div>
                      <div className="text-sm text-gray-500">
                        {platform.description} • Last sync: {platform.lastSync}
                      </div>
                    </div>
                  </div>
                  <button
                    className={`px-4 py-2 rounded-md text-sm font-medium ${
                      platform.status === 'connected'
                        ? 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    {platform.status === 'connected' ? 'Manage' : 'Connect'}
                  </button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Alert>
          <Key className="h-4 w-4" />
          <AlertTitle>API Keys</AlertTitle>
          <AlertDescription>
            Your API keys and credentials are encrypted and stored securely. Use the manage buttons above to rotate or revoke access.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
};

export default IntegrationsPage;