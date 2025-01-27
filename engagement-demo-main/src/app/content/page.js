'use client';
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { AlertCircle, Mail, Send, Sparkles, Wand2, Plus, Upload, Minus } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const EmailMarketingDashboard = () => {
  const [emailContent, setEmailContent] = useState('');
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [channel, setChannel] = useState('email');
  const [selectedTemplate, setSelectedTemplate] = useState('custom');
  const [selectedCohort, setSelectedCohort] = useState('all');
  const [characterLimit, setCharacterLimit] = useState({
    email: 2000,
    text: 160,
    push: 140,
    mail: 5000
  });
  const [writingGuidelines, setWritingGuidelines] = useState([
    'Use clear, simple language',
    'Avoid medical jargon when possible',
    'Include disclaimer when necessary'
  ]);
  const [brandGuidelines, setBrandGuidelines] = useState([
    'Maintain compassionate tone',
    'Use approved brand colors',
    'Follow HIPAA compliance'
  ]);
  const [newGuideline, setNewGuideline] = useState('');

  // Configuration options
  const campaignTypes = [
    { id: 'open-enrollment', name: 'Open Enrollment' },
    { id: 'wellness-program', name: 'Program Engagement' },
    { id: 'plan-updates', name: 'Plan Updates' },
    { id: 'preventive-care', name: 'Preventive Care' },
    { id: 'custom', name: 'Custom' },
  ];

  const toneOptions = [
    { id: 'professional', name: 'Professional' },
    { id: 'friendly', name: 'Friendly' },
    { id: 'informative', name: 'Informative' },
    { id: 'urgent', name: 'Urgent' },
  ];

  const cohorts = {
    prediabetesRisk: { name: 'Prediabetes Risk', description: 'Members with elevated blood glucose levels not yet diagnosed with diabetes' },
    unmanaged: { name: 'Unmanaged A1C', description: 'Diagnosed members with A1C > 8.0% in past 6 months' },
    ruralMarkets: { name: 'Rural Markets', description: 'Members in rural areas with limited access to in-person care' },
    sdohChallenges: { name: 'SDOH Challenges', description: 'Members with food access or mobility barriers' },
    lifestyleChange: { name: 'Lifestyle Change Ready', description: 'Members showing indicators of readiness for lifestyle modification' },
    glp1Interest: { name: 'GLP1 Interest', description: 'Members who previously expressed interest in the GLP1 therapy' },
    mentalHealth: { name: 'Mental Health Comorbidity', description: 'Members with both diabetes and mental health conditions' },
    hypertension: { name: 'Hypertension Comorbidity', description: 'Members managing both diabetes and hypertension' },
    digitalEngagement: { name: 'Digital Engagement', description: 'Members actively using health apps and digital tools' },
    employerPrograms: { name: 'Employer Programs', description: 'Members in companies with wellness initiatives' }
};

  const handleGuidelineAdd = (type) => {
    if (!newGuideline.trim()) return;
    if (type === 'writing') {
      setWritingGuidelines([...writingGuidelines, newGuideline.trim()]);
    } else {
      setBrandGuidelines([...brandGuidelines, newGuideline.trim()]);
    }
    setNewGuideline('');
  };

  const handleGuidelineRemove = (type, index) => {
    if (type === 'writing') {
      setWritingGuidelines(writingGuidelines.filter((_, i) => i !== index));
    } else {
      setBrandGuidelines(brandGuidelines.filter((_, i) => i !== index));
    }
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    
    // Get the selected cohort details
    const cohortDetails = cohorts[selectedCohort] || { name: 'Members', description: 'all members' };
    
    const contentTemplates = {
      'open-enrollment': {
        subject: 'Important: Your Healthcare Plan Open Enrollment Period',
        content: `Dear [Member Name],
  
  We hope this message finds you well. As a valued member of our ${cohortDetails.name} program, we want to ensure you're aware of the upcoming open enrollment period for your healthcare coverage.
  
  Based on your health profile and needs, we've identified some specific plans that might be particularly beneficial for you. These plans include enhanced coverage for:
  • Preventive care and regular health screenings
  • Prescription medication coverage
  • Specialist visits and consultations
  ${cohortDetails.name === 'Digital Engagement' ? '• Telehealth services and digital health tools' : ''}
  ${cohortDetails.name.includes('Rural') ? '• Enhanced transportation benefits and remote care options' : ''}
  
  Your current benefits have been helping you manage your health needs, and we want to ensure you continue receiving the best possible care. Our healthcare advisors are available to discuss your options and help you make the best choice for your health journey.
  
  Next Steps:
  1. Review your current plan and any changes for the upcoming year
  2. Explore our new plan options and enhanced benefits
  3. Schedule a consultation with our benefits advisor if you need assistance
  
  Important Dates:
  • Open Enrollment Period: [Start Date] - [End Date]
  • New Plan Effect Date: [Effect Date]
  
  Questions? Our dedicated support team is here to help:
  • Call: 1-800-XXX-XXXX
  • Email: support@healthcare.com
  • Visit: www.healthcare.com/open-enrollment
  
  Best regards,
  Your Healthcare Team
  
  [Legal Disclaimer: This communication contains important information about your healthcare benefits. Please review it carefully.]`,
      },
      'wellness-program': {
        subject: 'Personalized Wellness Program Updates',
        content: `Dear [Member Name],
  
  We're reaching out with some exciting updates about our wellness programs specifically designed for ${cohortDetails.name}.
  
  As part of our commitment to your health journey, we've developed some new features and resources tailored to your needs:
  
  ${cohortDetails.name.includes('Diabetes') ? `• Advanced blood glucose monitoring integration
  • Personalized nutrition planning
  • Direct access to diabetes educators` : ''}
  ${cohortDetails.name.includes('Mental Health') ? `• 24/7 mental health support
  • Stress management resources
  • Virtual therapy sessions` : ''}
  ${cohortDetails.name.includes('Rural') ? `• Remote health monitoring
  • Transportation assistance
  • Virtual care options` : ''}
  
  We've seen great success with members who actively participate in our wellness programs, with many reporting improved health outcomes and better quality of life.
  
  Your Next Steps:
  1. Log in to your member portal to explore these new features
  2. Schedule your wellness consultation
  3. Download our mobile app for easy access to all resources
  
  Need help getting started? Our wellness team is ready to assist:
  • Phone: 1-800-XXX-XXXX
  • Email: wellness@healthcare.com
  • Chat: Available 24/7 through our mobile app
  
  Best regards,
  Your Healthcare Team
  
  [This program is designed to complement, not replace, your current medical treatment. Always consult with your healthcare provider before starting any new health program.]`,
      },
      'plan-updates': {
        subject: 'Important Updates to Your Healthcare Plan',
        content: `Dear [Member Name],
  
  We're writing to inform you about important updates to your healthcare plan that specifically affect ${cohortDetails.name} members.
  
  Key Updates for Your Plan:
  ${cohortDetails.name.includes('GLP1') ? `• Enhanced coverage for GLP-1 medications
  • Simplified prior authorization process
  • Additional nutritionist visits` : ''}
  ${cohortDetails.name.includes('Digital') ? `• New telehealth platform features
  • Enhanced mobile app capabilities
  • Digital health tracking integration` : ''}
  ${cohortDetails.name.includes('SDOH') ? `• Expanded transportation benefits
  • Food assistance program integration
  • Community health worker support` : ''}
  
  These changes will take effect on [Effective Date]. We've made these updates based on member feedback and our commitment to providing you with the best possible care coverage.
  
  What This Means for You:
  • No immediate action required
  • Your current care plans remain unchanged
  • New benefits will be automatically available
  
  Questions about these updates? Contact us:
  • Call: 1-800-XXX-XXXX
  • Email: support@healthcare.com
  • Visit: www.healthcare.com/plan-updates
  
  Best regards,
  Your Healthcare Team
  
  [Important: This is a summary of changes. Please refer to your plan documentation for complete details.]`,
      },
      'preventive-care': {
        subject: 'Your Preventive Care Reminder',
        content: `Dear [Member Name],
  
  As part of our commitment to your health, we're reaching out to remind you about important preventive care services available to ${cohortDetails.name} members.
  
  Recommended Preventive Services for You:
  ${cohortDetails.name.includes('Prediabetes') ? `• Annual blood glucose screening
  • Diabetes prevention program enrollment
  • Nutrition consultation` : ''}
  ${cohortDetails.name.includes('Hypertension') ? `• Regular blood pressure monitoring
  • Cardiovascular health screening
  • Medication review` : ''}
  ${cohortDetails.name.includes('Lifestyle') ? `• Wellness check-up
  • Fitness program enrollment
  • Health coaching session` : ''}
  
  These services are covered under your plan with no additional cost to you. Taking advantage of preventive care can help you maintain your health and catch potential issues early.
  
  Schedule Your Services:
  1. Review the recommended services above
  2. Call your primary care provider or use our online scheduling tool
  3. Set up reminders for future preventive care dates
  
  Need assistance scheduling? We're here to help:
  • Phone: 1-800-XXX-XXXX
  • Online: www.healthcare.com/schedule
  • Mobile App: Use our appointment scheduling feature
  
  Best regards,
  Your Healthcare Team
  
  [Preventive services coverage may vary. Please refer to your plan details or contact us for specific coverage information.]`,
      },
      'custom': {
        subject: 'A Message from Your Healthcare Team',
        content: `Dear [Member Name],
  
  Thank you for being a valued member of our healthcare community. We want to ensure you're getting the most out of your healthcare benefits.
  
  ${prompt}
  
  If you have any questions or need assistance, please don't hesitate to reach out:
  • Phone: 1-800-XXX-XXXX
  • Email: support@healthcare.com
  • Online: www.healthcare.com/support
  
  Best regards,
  Your Healthcare Team`
      }
    };
  
    setTimeout(() => {
      const template = contentTemplates[selectedTemplate] || contentTemplates.custom;
      setEmailContent(template.content);
      setIsGenerating(false);
    }, 1500);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <header className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Healthcare Content Creator</h1>
        </div>
        <Button variant="outline" className="gap-2">
          <Mail className="w-4 h-4" />
          Content Library
        </Button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Campaign Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Target Cohort</label>
                <Select value={selectedCohort} onValueChange={setSelectedCohort}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose target cohort..." />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(cohorts).map(([key, cohort]) => (
                      <SelectItem key={key} value={key}>
                        {cohort.name} - {cohort.description}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Campaign Type</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select campaign type" />
                  </SelectTrigger>
                  <SelectContent>
                    {campaignTypes.map((type) => (
                      <SelectItem key={type.id} value={type.id}>
                        {type.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Tone</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select tone" />
                  </SelectTrigger>
                  <SelectContent>
                    {toneOptions.map((tone) => (
                      <SelectItem key={tone.id} value={tone.id}>
                        {tone.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Channel</label>
                <RadioGroup value={channel} onValueChange={setChannel} className="flex flex-col space-y-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="email" id="email" />
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      type="number" 
                      value={characterLimit.email}
                      onChange={(e) => setCharacterLimit({...characterLimit, email: parseInt(e.target.value)})}
                      className="w-24 ml-auto"
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="text" id="text" />
                    <Label htmlFor="text">Text Message</Label>
                    <Input 
                      type="number" 
                      value={characterLimit.text}
                      onChange={(e) => setCharacterLimit({...characterLimit, text: parseInt(e.target.value)})}
                      className="w-24 ml-auto"
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="mail" id="mail" />
                    <Label htmlFor="mail">Physical Mail</Label>
                    <Input 
                      type="number" 
                      value={characterLimit.mail}
                      onChange={(e) => setCharacterLimit({...characterLimit, mail: parseInt(e.target.value)})}
                      className="w-24 ml-auto"
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="push" id="push" />
                    <Label htmlFor="push">Push Notification</Label>
                    <Input 
                      type="number" 
                      value={characterLimit.push}
                      onChange={(e) => setCharacterLimit({...characterLimit, push: parseInt(e.target.value)})}
                      className="w-24 ml-auto"
                    />
                  </div>
                </RadioGroup>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle>Guidelines</CardTitle>
              <Button 
                variant="outline"
                size="sm" 
                className="flex items-center"
              >
                <Upload className="h-4 w-4 mr-2" />
                Upload
              </Button>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="writing">
                <TabsList className="w-full">
                  <TabsTrigger value="writing" className="flex-1">Writing</TabsTrigger>
                  <TabsTrigger value="brand" className="flex-1">Brand</TabsTrigger>
                </TabsList>

                <TabsContent value="writing" className="space-y-4">
                  {writingGuidelines.map((guideline, index) => (
                    <div key={index} className="flex items-center justify-between text-sm">
                      <span className="flex-1">{guideline}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleGuidelineRemove('writing', index)}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <div className="flex space-x-2">
                    <Input
                      value={newGuideline}
                      onChange={(e) => setNewGuideline(e.target.value)}
                      placeholder="Add guideline"
                      className="flex-1 text-sm"
                    />
                    <Button 
                      onClick={() => handleGuidelineAdd('writing')}
                      size="sm"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="brand" className="space-y-4">
                  {brandGuidelines.map((guideline, index) => (
                    <div key={index} className="flex items-center justify-between text-sm">
                      <span className="flex-1">{guideline}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleGuidelineRemove('brand', index)}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <div className="flex space-x-2">
                    <Input
                      value={newGuideline}
                      onChange={(e) => setNewGuideline(e.target.value)}
                      placeholder="Add guideline"
                      className="flex-1 text-sm"
                    />
                    <Button 
                      onClick={() => handleGuidelineAdd('brand')}
                      size="sm"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <Card className="md:col-span-2">
  <CardHeader>
    <CardTitle>Content Creator</CardTitle>
  </CardHeader>
  <CardContent className="space-y-4 h-[calc(100vh-200px)]">  {/* Added fixed height */}
  <div className="space-y-2">
  <label className="text-sm font-medium">Content Prompt</label>
  <Textarea
    placeholder="Describe what you want to communicate to your members..."
    value={prompt}
    onChange={(e) => setPrompt(e.target.value)}
    className="h-20 min-h-[80px]" // Changed from h-24 to h-20 and added min-height
  />
</div>

    <div className="flex gap-2">
      <Button 
        onClick={handleGenerate} 
        disabled={isGenerating}
        className="gap-2"
      >
        {isGenerating ? (
          <>
            <Sparkles className="w-4 h-4 animate-spin" />
            Creating...
          </>
        ) : (
          <>
            <Wand2 className="w-4 h-4" />
            Create Content
          </>
        )}
      </Button>
    </div>

    <div className="space-y-2 h-[calc(100vh-400px)]">
  <label className="text-sm font-medium">Created Content</label>
  <Textarea
    value={emailContent}
    onChange={(e) => setEmailContent(e.target.value)}
    className="h-full font-mono text-sm resize-y"
    placeholder="Created content will appear here..."
  />
  <div className="flex items-center justify-between pt-4">
    <div className="text-sm text-gray-500">
      {emailContent.length} / {characterLimit[channel]} characters
    </div>
    <Button variant="outline" className="gap-2 ml-auto">
      <Send className="w-4 h-4" />
      Save Content
    </Button>
  </div>
</div>
  </CardContent>
</Card>
      </div>
    </div>
  );
};

export default EmailMarketingDashboard;