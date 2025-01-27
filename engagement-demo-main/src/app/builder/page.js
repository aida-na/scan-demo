"use client";
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { 
  TooltipProvider, 
  Tooltip, 
  TooltipContent, 
  TooltipTrigger 
} from '@/components/ui/tooltip';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Upload, AlertTriangle, Info, RefreshCw, ChevronLeft, ChevronRight } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';

const CohortCreator = () => {
  // State management
  const [minCohorts, setMinCohorts] = useState(5);
  const [maxCohorts, setMaxCohorts] = useState(15);
  const [method, setMethod] = useState('Waterfall');
  const [maxFeatures, setMaxFeatures] = useState('');
  const [currentOutputIndex, setCurrentOutputIndex] = useState(0);
  const [minCohortSize, setMinCohortSize] = useState('500');
  const [mustInclude, setMustInclude] = useState('');
  const [shouldNotInclude, setShouldNotInclude] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isDataUploaded, setIsDataUploaded] = useState(false);
  const [isTargetSelected, setIsTargetSelected] = useState(false);
  const [chartData, setChartData] = useState([]);

  // Sample feature data
  const featureList = [
    { name: 'Prior Surgery', effectSize: '0.85', available: 98, sdoh: 'No', description: 'Previous surgical procedures' },
    { name: 'Age Group', effectSize: '0.72', available: 100, sdoh: 'Yes', description: 'Patient age brackets' },
    { name: 'Income Level', effectSize: '0.68', available: 85, sdoh: 'Yes', description: 'Household income category' },
    { name: 'Geographic Access', effectSize: '0.65', available: 92, sdoh: 'Yes', description: 'Distance to healthcare facilities' },
    { name: 'Insurance Type', effectSize: '0.61', available: 95, sdoh: 'No', description: 'Primary insurance coverage' }
  ];

  const [features, setFeatures] = useState(featureList);
  const [output, setOutput] = useState('');
  const [summaries, setSummaries] = useState('');

  const handleFileUpload = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsDataUploaded(true);
      setError('');
    } catch (err) {
      setError('Error uploading file. Please try again.');
    }
    setIsLoading(false);
  };

  const handleTargetSelection = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsTargetSelected(true);
      setError('');
    } catch (err) {
      setError('Error selecting target. Please try again.');
    }
    setIsLoading(false);
  };

  const handleGenerate = async () => {
    if (minCohorts > maxCohorts) {
      setError('Minimum cohorts cannot be greater than maximum cohorts');
      return;
    }

    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      const defaultText = '\n\nWaterfall Cohorts\n\n' +
        'Cohort 1: Affluent + Female + Prior Surgery (n=3,623)\n' +
        'Target Rate: 53%\n' +
        'Key Features: Income > 75k, Female, Prior Surgery\n\n' +
        'Cohort 2: Affluent + Male + Prior Surgery (n=3,212)\n' +
        'Target Rate: 48%\n' +
        'Key Features: Income > 75k, Male, Prior Surgery\n\n' +
        'Cohort 3: Rural + Access Barriers (n=2,546)\n' +
        'Target Rate: 35%\n' +
        'Key Features: Rural Location, Transportation Barriers';
      
      setOutput(`${minCohorts} - ${maxCohorts} Cohorts${defaultText}`);
      setSummaries('Analysis complete. View the results above.');
      setError('');

      setChartData([
        { name: 'Cohort 1', value: 53 },
        { name: 'Cohort 2', value: 48 },
        { name: 'Cohort 3', value: 35 }
      ]);
    } catch (err) {
      setError('Error generating cohorts. Please try again.');
    }
    setIsLoading(false);
  };

  return (
    <TooltipProvider>
      <div className="w-full max-w-6xl mx-auto p-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Smart Cohort Creator</span>
              {isLoading && <RefreshCw className="animate-spin h-5 w-5" />}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="flex justify-center gap-4 mb-6">
              <Button 
                onClick={handleFileUpload}
                disabled={isLoading}
                className={isDataUploaded ? 'bg-green-600' : ''}
              >
                <Upload className="mr-2 h-4 w-4" />
                {isDataUploaded ? 'Data Uploaded' : 'Select Data'}
              </Button>
              <Button 
                onClick={handleTargetSelection}
                disabled={isLoading || !isDataUploaded}
                className={isTargetSelected ? 'bg-green-600' : ''}
              >
                {isTargetSelected ? 'Target Selected' : 'Select Target'}
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Label className="flex items-center gap-2">
                      Number of Cohorts
                      <Info className="h-4 w-4 text-gray-400" />
                    </Label>
                  </TooltipTrigger>
                  <TooltipContent>Choose the range of cohorts to generate</TooltipContent>
                </Tooltip>
                <div className="flex items-center gap-4 mt-2">
                  <Input 
                    type="number" 
                    value={minCohorts}
                    onChange={(e) => setMinCohorts(Number(e.target.value))}
                    min="1"
                    max="50"
                    className="w-24"
                  />
                  <span>to</span>
                  <Input 
                    type="number" 
                    value={maxCohorts}
                    onChange={(e) => setMaxCohorts(Number(e.target.value))}
                    min="1"
                    max="50"
                    className="w-24"
                  />
                </div>
              </div>

              <div>
                <Label>Method</Label>
                <Select 
                  value={method}
                  onValueChange={setMethod}
                  className="w-full mt-2"
                >
                  <option value="Waterfall">Waterfall</option>
                  <option value="Pruning">Pruning</option>
                  <option value="Clustering">Clustering</option>
                  <option value="All">All</option>
                </Select>
              </div>

              <div>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Label className="flex items-center gap-2">
                      Max SDOH Features
                      <Info className="h-4 w-4 text-gray-400" />
                    </Label>
                  </TooltipTrigger>
                  <TooltipContent>Maximum number of social determinants of health features</TooltipContent>
                </Tooltip>
                <Input 
                  type="number"
                  value={maxFeatures}
                  onChange={(e) => setMaxFeatures(e.target.value)}
                  min="0"
                  placeholder="Enter number"
                  className="w-full mt-2"
                />
              </div>
            </div>

            <div className="overflow-x-auto mb-6">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="p-2 border text-left">Feature Name</th>
                    <th className="p-2 border text-left">Effect Size</th>
                    <th className="p-2 border text-left">% Available</th>
                    <th className="p-2 border text-left">SDOH Feature</th>
                    <th className="p-2 border text-center">Include</th>
                    <th className="p-2 border text-center">Exclude</th>
                  </tr>
                </thead>
                <tbody>
                  {features.map((feature, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="p-2 border">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <span className="cursor-help">{feature.name}</span>
                          </TooltipTrigger>
                          <TooltipContent>{feature.description}</TooltipContent>
                        </Tooltip>
                      </td>
                      <td className="p-2 border">{feature.effectSize}</td>
                      <td className="p-2 border">{feature.available}%</td>
                      <td className="p-2 border">{feature.sdoh}</td>
                      <td className="p-2 border text-center">
                        <input type="checkbox" className="w-4 h-4" />
                      </td>
                      <td className="p-2 border text-center">
                        <input type="checkbox" className="w-4 h-4" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex justify-center mb-6">
              <Button onClick={handleGenerate} disabled={isLoading}>
                Generate Cohorts
              </Button>
            </div>

            <div className="grid grid-cols-1 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Output</h3>
                <Textarea 
                  value={output}
                  readOnly
                  className="h-40"
                />
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Cohort Distribution</h3>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <RechartsTooltip />
                      <Bar dataKey="value" fill="#4f46e5" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Summary</h3>
                <Textarea 
                  value={summaries}
                  readOnly
                  className="h-40"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </TooltipProvider>
  );
};

export default CohortCreator;