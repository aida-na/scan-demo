"use client"
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Minus, Wand2, Users, Rss, Route, Sparkles, AlertCircle, CheckCircle2, Edit2, ThumbsUp, ThumbsDown, RefreshCw, Mail, MailIcon } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useRouter } from 'next/navigation';


const CampaignDashboard = () => {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [campaignData, setCampaignData] = useState({
    type: 'new',
    goal: '',
    journey: '',
    selectedCohorts: [],
    channels: [],
    content: ''
  });

    const [selectedOptionId, setSelectedOptionId] = useState(null);
    const [editMode, setEditMode] = useState(false);
  
    const generatedOptions = {
      'Old email': {
        subject: "Take Control of Your Health: Important Blood Sugar Update",
        title: "Small Changes Today Can Prevent Diabetes Tomorrow",
        content: "Your recent health screening showed elevated blood glucose levels, and we care about your long-term health. While this doesn't mean you have diabetes, it's an important early warning sign that lets you take action now.\n\nAt [Company Name], we've seen countless members successfully lower their risk of developing type 2 diabetes through our prevention program. Our data shows that simple lifestyle modifications can reduce your diabetes risk by up to 58%. Early intervention is key to preventing the progression to type 2 diabetes.\n\nYour comprehensive benefits include:\n- Free consultation with a certified diabetes educator\n- Personalized nutrition guidance from registered dietitians\n- Access to our digital prevention tools and tracking app\n- Regular support from your dedicated health coach\n\nThe good news? You're catching this early. Our preventive care program is designed to fit your schedule and lifestyle, with both virtual and in-person options available. Many of our members have brought their blood sugar levels back to normal range within just 6 months of starting our program.",
        cta: "Schedule your free prevention consultation today"
      },
      'New email': {
        subject: "Important: Your Recent Blood Sugar Results",
        title: "You Have the Power to Prevent Diabetes",
        content: "We recently received your blood glucose test results, and while they're higher than normal, you have an incredible opportunity right now. You can take steps to prevent type 2 diabetes before it develops, and [Company Name] is here to support you every step of the way.\n\nAs your healthcare partner, we're committed to helping you succeed with proven strategies that fit your lifestyle. Our members who participate in our prevention program are 2.5 times more likely to avoid developing diabetes compared to those who don't, and we're ready to help you achieve similar success.\n\nYour comprehensive preventive care benefits cover:\n- One-on-one coaching with diabetes prevention specialists\n- Customized meal planning and exercise guidance\n- Smart device integration for easy progress tracking\n- Virtual group support sessions with others on the same journey\n\nRemember: elevated blood sugar doesn't have to lead to diabetes. With the right support and early action, you can take control of your health destiny. Our team of specialists is ready to create a personalized plan that works for you.",
        cta: "Join our diabetes prevention program now"
      }
    };
  
    const handleOptionSelect = (optionId) => {
      setSelectedOptionId(optionId);
    };

  // Add missing cohort options
  const cohortOptions = [
    {
      id: 1,
      name: "Prediabetes Risk",
      description: "Members with elevated blood glucose levels not yet diagnosed with diabetes",
      size: 8750,
      enrollmentRate: 4.2,
      enrollmentPotential: 2100,
      engagement: "Medium",
      tags: ["Priority", "Early Intervention"],
      aiRecommended: true
    },
    {
      id: 2,
      name: "Medication Non-Adherence",
      description: "Members showing irregular medication refill patterns",
      size: 7000,
      enrollmentRate: 3.8,
      enrollmentPotential: 1800,
      engagement: "Low",
      tags: ["Urgent", "Care Gap"],
      aiRecommended: true
    },
    {
      id: 3,
      name: "Missed Appointments",
      description: "Members who missed 2+ appointments in last 6 months",
      size: 5250,
      enrollmentRate: 3.5,
      enrollmentPotential: 1400,
      engagement: "Medium",
      tags: ["Care Gap", "High Risk"],
      aiRecommended: true
    },
    {
      id: 4,
      name: "High A1C Volatility",
      description: "Members with unstable A1C readings",
      size: 4200,
      enrollmentRate: 3.9,
      enrollmentPotential: 1100,
      engagement: "High",
      tags: ["Critical", "High Risk"],
      aiRecommended: true
    }
  ];

  // Add missing handler functions
  const handleStructureChange = (id, field, value) => {
    setContentStructure(prev =>
      prev.map(item =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  const handleAddStructureItem = () => {
    const newId = Math.max(...contentStructure.map(item => item.id)) + 1;
    setContentStructure(prev => [
      ...prev,
      {
        id: newId,
        label: 'New Section',
        content: '',
        enabled: true,
        required: false,
        placeholder: 'Enter content...'
      }
    ]);
  };

  const handleGuidelineAdd = (type) => {
    if (!newGuideline.trim()) return;
    if (type === 'writing') {
      setWritingGuidelines(prev => [...prev, newGuideline]);
    } else {
      setBrandGuidelines(prev => [...prev, newGuideline]);
    }
    setNewGuideline('');
  };

  const handleGuidelineRemove = (type, index) => {
    if (type === 'writing') {
      setWritingGuidelines(prev => prev.filter((_, i) => i !== index));
    } else {
      setBrandGuidelines(prev => prev.filter((_, i) => i !== index));
    }
  };

  // Keep existing campaign goals and journey data...
  const campaignGoals = [
    {
      id: 'mental-health-enroll',
      title: 'Mental Health Enrollment 2025',
      description: 'Drive enrollment in comprehensive mental health management and prevention programs for at-risk and diagnosed members'
    },
    {
      id: 'fitness-engage',
      title: 'Fitness Program Enrollment',
      description: 'Increase active participation in fitness programs, workout adherence, and regular exercise'
    },
    {
      id: 'wellness-checkup',
      title: 'Annual Wellness Checkup',
      description: 'Promote preventive care awareness and regular health screenings through targeted education'
    },
    {
      id: 'diabetes-retain',
      title: 'Diabetes Care Retention Program',
      description: 'Strengthen long-term participation in diabetes care programs through personalized support and continuous care'
    }
  ];

  const existingJourneys = [
    {
      id: 'mental-health-2025',
      name: 'Mental Health Enrollment 2025',
      description: 'Proactive mental health support and therapy enrollment campaign',
      activeMembers: 25430, // Based on reached members
      status: 'active',
      lastModified: '2024-03-15'
    },
    {
      id: 'fitness-program',
      name: 'Fitness Program Enrollment',
      description: 'Digital fitness program with personalized workout plans',
      activeMembers: 35890, // Based on reached members
      status: 'active',
      lastModified: '2024-03-01'
    },
    {
      id: 'annual-wellness',
      name: 'Annual Wellness Checkup',
      description: 'Annual wellness visit scheduling and preventive care reminders',
      activeMembers: 98760, // Based on reached members
      status: 'active',
      lastModified: '2024-02-15'
    },
    {
      id: 'diabetes-retention',
      name: 'Diabetes Care Retention Program',
      description: 'Engagement and retention program for existing diabetes care members',
      activeMembers: 35000,
      status: 'active',
      lastModified: '2024-03-20'
    }
  ];

  const channelOptions = [
    {
      id: 'email',
      name: 'Email',
      description: 'Best for detailed information and educational content',
      metrics: { openRate: '24%', responseRate: '12%' },
      cost: 'Low',
      recommendedTime: 'SFMC Integration'
    },
    {
      id: 'sms',
      name: 'SMS',
      description: 'Ideal for urgent reminders and quick updates',
      metrics: { openRate: '98%', responseRate: '45%' },
      cost: 'Medium',
      recommendedTime: 'Twilio'
    },
    {
      id: 'voice',
      name: 'Voice Call',
      description: 'Perfect for complex communications requiring interaction',
      metrics: { answerRate: '65%', completionRate: '58%' },
      cost: 'High',
      recommendedTime: 'Twilio'
    },
    {
      id: 'mail',
      name: 'Physical Mail',
      description: 'Best for formal communications and detailed documents',
      metrics: { deliveryRate: '99%', responseRate: '15%' },
      cost: 'High',
      recommendedTime: 'N/A'
    }
  ];
  const [selectedChannels, setSelectedChannels] = useState([channelOptions[0].id]);

  const toggleChannel = (channelId) => {
    setSelectedChannels(prev => {
      if (prev.length === 1 && prev.includes(channelId)) {
        return prev;
      }
      return prev.includes(channelId) 
        ? prev.filter(id => id !== channelId)
        : [...prev, channelId];
    });
  };

  const toggleCohort = (cohortId) => {
    setCampaignData(prev => ({
      ...prev,
      selectedCohorts: prev.selectedCohorts.includes(cohortId)
        ? prev.selectedCohorts.filter(id => id !== cohortId)
        : [...prev.selectedCohorts, cohortId]
    }));
  };

  const handleNext = () => {
    if (step === steps.length) {
      router.push('/campaigns'); // Use router.push instead of navigate
    } else {
      setStep(prev => Math.min(prev + 1, steps.length));
    }
  };

  const steps = [
    { number: 1, title: 'Campaign Type' },
    { number: 2, title: 'Cohort Selection' },
    { number: 3, title: 'Channels' },
    { number: 4, title: 'Content' }
  ];

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="flex justify-center w-full max-w-4xl mx-auto px-4">
          <Tabs 
            defaultValue="existing" 
            className="w-full"
            onValueChange={(value) => setCampaignData(prev => ({ ...prev, type: value }))}
          >
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="existing">Existing Campaign</TabsTrigger>
              <TabsTrigger value="new">New Campaign</TabsTrigger>
            </TabsList>
            
            <TabsContent value="existing">
              <div className="space-y-4 pt-2">
             <Alert className="bg-blue-50 border-blue-200">
             <div className="flex items-center gap-3">
              <Sparkles className="w-4 h-4" />
              <AlertDescription className="flex-1">
              Connect your campaign to an active journey to enhance existing member communications
             </AlertDescription>
          </div>
        </Alert>
        <div className="grid grid-cols-2 gap-4">
          {existingJourneys.map((journey) => (
            <div
              key={journey.id}
              className={`p-4 border rounded-lg hover:border-blue-500 cursor-pointer
                ${campaignData.journey === journey.id ? 'border-blue-500 bg-blue-50' : ''}`}
              onClick={() => setCampaignData(prev => ({ ...prev, journey: journey.id }))}
            >
              <div className="font-medium mb-2">{journey.name}</div>
              <p className="text-sm text-gray-500 mb-2">{journey.description}</p>
              <div className="flex justify-between text-sm">
                <span className="text-green-600">Active Members: {journey.activeMembers.toLocaleString()}</span>
                <span className="text-gray-500">Modified: {new Date(journey.lastModified).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </TabsContent>
    
            <TabsContent value="new">
              <div className="space-y-4 pt-2">
                <Label className="text-lg font-semibold">Campaign Goal</Label>
                <div className="grid grid-cols-2 gap-4">
                  {campaignGoals.map((goal) => (
                    <div
                      key={goal.id}
                      className={`p-4 border rounded-lg hover:border-blue-500 cursor-pointer
                        ${campaignData.goal === goal.id ? 'border-blue-500 bg-blue-50' : ''}`}
                      onClick={() => setCampaignData(prev => ({ ...prev, goal: goal.id }))}
                    >
                      <div className="font-medium mb-2">{goal.title}</div>
                      <p className="text-sm text-gray-500">{goal.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
                  </div>
        );
        case 2:
          return (
            <div className="space-y-6">
              <div className="flex items-center gap-2 mb-4">
                <Users className="w-5 h-5 text-blue-600" />
                <h2 className="text-lg font-semibold">Select Target Cohorts</h2>
              </div>
              <Alert className="bg-blue-50 border-blue-200">
                <Sparkles className="w-4 h-4" />
                <AlertDescription>
                  Based on your selected goal, we've highlighted recommended cohorts based on their retention opportunity
                </AlertDescription>
              </Alert>
              <div className="grid grid-cols-2 gap-4">
                {cohortOptions.map((cohort) => (
                  <div
                    key={cohort.id}
                    className={`relative p-4 border rounded-lg cursor-pointer
                      ${campaignData.selectedCohorts.includes(cohort.id) ? 'border-blue-500 bg-blue-50' : ''}`}
                    onClick={() => toggleCohort(cohort.id)}
                  >
                    {cohort.aiRecommended && (
                      <Sparkles className="absolute top-2 right-2 w-4 h-4 text-blue-500" />
                    )}
                    <div className="mb-2">
                      <h3 className="font-medium">{cohort.name}</h3>
                      <p className="text-sm text-gray-600">{cohort.description}</p>
                    </div>
                    <div className="flex gap-20 text-sm">
                      <span>Size: {cohort.size}</span>
                      <p className="text-sm text-green-800"> Retention potential: +{cohort.enrollmentPotential}</p>
                    </div>
                  </div>
                ))}
                <div className="flex w-full"> 
                  <Button variant="ghost" className="gap-2 ">
                    <Plus className="w-4 h-4" />
                    Select More Cohorts
                  </Button>
                </div>
              </div>
            </div>
          );

      case 3:
        return (
         <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2 mb-4">
                  <Rss className="w-5 h-5 text-blue-600" />
                  <h2 className="text-lg font-semibold">Communication Channels</h2>
                  </div>
              </div>
              <Alert className="bg-blue-50 border-blue-200">
              <Sparkles className="w-4 h-4 text-blue-500" />
              <AlertDescription>
                Channel is selected based on your connected journey
              </AlertDescription>
              </Alert>
              <div className="grid grid-cols-2 gap-4">
                {channelOptions.map((channel) => (
                  <div
                    key={channel.id}
                    className={`p-4 border rounded-lg cursor-pointer
                      ${selectedChannels.includes(channel.id) ? 'border-blue-500 bg-blue-50' : ''}`}
                    onClick={() => toggleChannel(channel.id)}
                  >
                    <h3 className="font-medium">{channel.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">{channel.description}</p>
                    <div className="mt-2 text-sm text-gray-500">
                      Connection: {channel.recommendedTime}
                    </div>
                  </div>
                ))}
              </div>
            </div>
        );
      case 4:
        case 4:
          return (
            <div className="max-w-4xl mx-auto space-y-6">
                <div className="flex items-center gap-2 mb-4">
                  <MailIcon className="w-5 h-5 text-blue-600" />
                  <h2 className="text-lg font-semibold">Personalized Content</h2>
                </div>
  
        
              {/* Stepper Section */}
              <div className="w-full mb-6">
                <h3 className="text-sm font-medium text-gray-700 mb-4">Diabetes Program Enrollment 2025 Journey Steps</h3>
                <div className="max-w-md mx-auto">
          <div className="relative flex justify-between items-center px-2">
            {/* Background Progress Bar Container */}
            <div className="absolute left-4 right-4 top-1/2 -translate-y-1/2">
              <div className="h-1 w-full bg-gray-200" />
              <div className="absolute top-0 left-0 h-1 w-1/4 bg-blue-600" />
            </div>
            
            {/* Dots */}
 {[1, 2, 3, 4].map((step, index) => (
              <div 
                key={index} 
                className={`relative z-10 w-3 h-3 rounded-full border-2 
                  ${index === 0 
                    ? 'bg-blue-600 border-blue-600' 
                    : 'bg-white border-gray-300'}`}
              />
            ))}
          </div>
        </div>
      </div>
        
              {/* Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(generatedOptions).map(([key, option]) => (
                  <Card 
                    key={key}
                    className={`relative ${selectedOptionId === key ? 'ring-2 ring-blue-500' : ''}`}
                  >
                    <CardHeader>
                      <CardTitle className="text-lg">{key}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="font-medium text-gray-500">Subject:</div>
                        <div>{option.subject}</div>
                      </div>
                      <div className="space-y-2">
                        <div className="font-medium text-gray-500">Title:</div>
                        <div className="text-lg font-semibold">{option.title}</div>
                      </div>
                      <div className="space-y-2">
                        <div className="font-medium text-gray-500">Content:</div>
                        <div className="whitespace-pre-wrap">{option.content}</div>
                      </div>
                      <div className="space-y-2">
                        <div className="font-medium text-gray-500">CTA:</div>
                        <div className="text-blue-600">{option.cta}</div>
                      </div>
                    </CardContent>
                    <CardFooter className="justify-between">
                      <div className="flex space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleOptionSelect(key)}
                        >
                          Select
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => setEditMode(true)}
                        >
                          <Edit2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm">
                          <ThumbsUp className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <ThumbsDown className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          );
      }
    };
  
    return (
      <div className="min-h-screen p-8">
              <div className="max-w-6xl mx-auto p-6 space-y-6">
                <header className="flex items-center justify-between mb-6">
                  <div>
                    <h1 className="text-2xl font-bold">Create Smart Cohort Campaign</h1>
                  </div>
                  <Button 
            variant="outline" 
            onClick={() => router.push('/campaigns')}
            className="gap-2"
          >
            <Route className="w-4 h-4" />
            View All Campaigns
          </Button>
                </header>
          <div className="mb-8 flex justify-center">
            <div className="flex gap-8">
              {steps.map((s) => (
                <div
                  key={s.number}
                  className={`flex items-center gap-2 cursor-pointer ${
                    step >= s.number ? 'text-gray-600' : 'text-gray-400'
                  }`}
                  onClick={() => setStep(s.number)}
                >
                  <div 
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      step >= s.number ? 'bg-gray-600 text-white' : 'bg-gray-200'
                    }`}
                  >
                    {step > s.number ? <CheckCircle2 className="w-5 h-5" /> : s.number}
                  </div>
                  <span className="font-medium">{s.title}</span>
                </div>
              ))}
            </div>
          </div>
  
          <div className="w-full">
              {renderStepContent()}
              <div className="flex justify-between mt-8">
                <Button
                  variant="default"
                  onClick={() => setStep(prev => Math.max(prev - 1, 1))}
                  disabled={step === 1}
                >
                  Previous
                </Button>
                <Button 
                  variant="default"
                  onClick={handleNext}
                >
                  {step === steps.length ? 'Export to Marketing Cloud' : 'Next'}
                </Button>
              </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default CampaignDashboard;