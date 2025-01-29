import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { 
  User, AlertCircle, Clock, Stethoscope, Building2, 
  Calendar, Store, FileText, Heart, DollarSign,
  MessageCircle, CheckCircle2, Star
} from 'lucide-react';

const SCANPreCallSummary = () => {
  // Mock data - would come from various SCAN Health systems
  const memberData = {
    basic: {
      name: "Sarah Johnson",
      preferredName: "Sarah",
      memberID: "MEM-2024-045",
      age: 67,
      location: "Los Angeles, CA",
      planName: "SCAN Classic (HMO)",
      planEffectiveDate: "2024-07-01",
      pcpRequired: true,
      communicationPreferences: {
        language: "English",
        bestTimeToCall: "Mornings",
        previousCallDuration: "Average 8 minutes"
      }
    },
    personalInsights: {
      relationshipStatus: "Lives with spouse, Bob",
      lifestyle: ["Regular walker", "Interested in fitness tracking"],
      interests: ["Preventive care", "Digital health tools"]
    },
    healthData: {
      primaryProvider: "Dr. Michelle Crespo",
      facility: "Dignity Health - Downtown Los Angeles",
      lastVisit: "2024-01-10",
      upcomingVisit: "2024-02-15",
      primaryDiagnoses: ["Type 2 Diabetes", "Hypertension"],
      gapsInCare: [
        {
          type: "Preventive",
          description: "Annual flu shot due",
          priority: "high"
        },
        {
          type: "HEDIS",
          description: "Diabetes A1C test overdue",
          priority: "medium"
        }
      ]
    },
    rxData: {
      currentMedications: [
        {
          name: "Humira",
          lastFill: "2024-01-05",
          pharmacy: "Express Scripts",
          coverageChange: {
            type: "price",
            description: "Using out-of-network pharmacy",
            alternativeAvailable: true
          }
        },
        {
          name: "Metformin",
          lastFill: "2024-01-15",
          pharmacy: "Ralphs Pharmacy",
          dueForRefill: "2024-02-15"
        }
      ],
      preferredPharmacy: "Multiple pharmacies used",
      mailOrderEligible: true,
      yearToDateSpend: 2750.84
    },
    actionItems: [
      {
        priority: "Immediate",
        type: "retention",
        title: "Member Retention - Missed Appointments",
        description: "Member has missed several appointments - at risk for gaps in care and dissatisfaction",
        category: "retention",
        talkingPoints: [
          "I noticed you've had some challenges making it to recent appointments",
          "We want to ensure you're getting the care you need - can you tell me about any barriers you're facing?",
          "We have several services that might help, like free transportation to appointments",
          "Would you like help rescheduling your next visit with Dr. Crespo?"
        ]
      },
      {
        priority: "Immediate",
        type: "cost_savings",
        title: "Switch to In-Network CVS Pharmacy",
        description: "Switch to in-network CVS pharmacy for Humira - estimated savings $200/month",
        category: "cost_savings",
        talkingPoints: [
          "I notice you're getting Humira from an out-of-network pharmacy",
          "We can help you transfer to an in-network CVS pharmacy",
          "This could save you approximately $200 per month",
          "Would you like help finding a convenient CVS location?"
        ]
      },
      {
        priority: "High",
        type: "care_gap",
        title: "Schedule Annual Wellness Visit",
        description: "Due for annual wellness visit with PCP",
        category: "preventive_care",
        talkingPoints: [
          "It's time for your annual wellness visit",
          "This is fully covered under your SCAN plan",
          "Would you like help scheduling with Dr. Crespo?"
        ]
      },
      {
        priority: "High",
        type: "preventive_care",
        title: "Schedule Flu Shot",
        description: "Due for annual flu shot - covered at various locations",
        category: "preventive_care",
        talkingPoints: [
          "I see you're due for your annual flu shot",
          "This is fully covered at many convenient locations",
          "We can arrange transportation to get your flu shot at CVS"
        ]
      }
    ],
    recommendedPrograms: [
      {
        name: "SCAN Silver Sneakers",
        reason: "Matches interest in walking and fitness",
        benefit: "Free gym membership and fitness classes",
        priority: "high"
      },
      {
        name: "OTC Debit Card",
        reason: "Member who has expenses for health and wellness items",
        benefit: "Use the card to pay for thousands of items rather than paying out of pocket",
        priority: "high"
      },
      {
        name: "Transportation Benefits",
        reason: "Member who needs to get to CVS for Flu shot and prescription pick-up",
        benefit: "Transportation paid for as part of your plan to access medical services",
        priority: "high"
      }
    ],
    recentInteractions: [
      {
        date: "2024-01-10",
        type: "Dignity Health Visit",
        summary: "Routine checkup, prescription renewals"
      },
      {
        date: "2024-01-05",
        type: "Pharmacy",
        summary: "Filled Humira at out-of-network pharmacy"
      }
    ]
  };

  return (
    <div className="max-w-6xl p-6 space-y-6">
      {/* Header with Member Overview */}
      <div className="flex items-start justify-between bg-white p-4 rounded-lg shadow">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <User className="h-6 w-6" />
            {memberData.basic.name}
            <Badge variant="destructive" className="ml-2">Missed Appointments</Badge>
          </h1>
          <div className="mt-1 space-y-1">
            <p className="text-gray-600">Member ID: {memberData.basic.memberID}</p>
            <p className="text-gray-600">{memberData.basic.age} years • {memberData.basic.location}</p>
            <p className="text-gray-600">Plan: {memberData.basic.planName}</p>
          </div>
        </div>
        <div className="text-right">
          <Badge className="mb-2">Plan Effective: {memberData.basic.planEffectiveDate}</Badge>
        </div>
      </div>

      {/* Quick Reference Guide */}
      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5" />
            Personalization Guide
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold mb-2">Conversation Starters</h3>
              <ul className="space-y-2 text-sm">
                <li>• Prefer to be called: "{memberData.basic.preferredName}"</li>
                <li>• Lives with: {memberData.personalInsights.relationshipStatus}</li>
                <li>• Interests: {memberData.personalInsights.interests.join(", ")}</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Communication Notes</h3>
              <ul className="space-y-2 text-sm">
                <li>• Language: {memberData.basic.communicationPreferences.language}</li>
                <li>• Best time: {memberData.basic.communicationPreferences.bestTimeToCall}</li>
                <li>• Call duration: {memberData.basic.communicationPreferences.previousCallDuration}</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Priority Actions Needed */}
      <Card className="border-red-200">
        <CardHeader className="bg-red-50">
          <CardTitle className="flex items-center gap-2 text-red-700">
            <AlertCircle className="h-5 w-5" />
            Priority Actions Needed
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {memberData.actionItems
            .sort((a, b) => (a.priority === 'Immediate' ? -1 : 1))
            .map((action, idx) => (
              <div key={idx} className="border-l-4 border-red-500 pl-4 py-3">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-semibold">{action.title}</h3>
                  <Badge variant={action.priority === 'Immediate' ? 'destructive' : 'default'}>
                    {action.priority}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 mb-2">{action.description}</p>
                <div className="bg-gray-50 p-3 rounded-md">
                  <h4 className="font-semibold text-sm mb-2">Suggested Talking Points:</h4>
                  <ul className="space-y-1 text-sm">
                    {action.talkingPoints.map((point, i) => (
                      <li key={i}>• {point}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Health Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              Health Care
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Primary Care</h3>
              <p>{memberData.healthData.primaryProvider}</p>
              <p className="text-sm text-gray-600">{memberData.healthData.facility}</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Diagnoses</h3>
              <div className="flex gap-2 flex-wrap">
                {memberData.healthData.primaryDiagnoses.map((diagnosis, idx) => (
                  <Badge key={idx} variant="secondary">{diagnosis}</Badge>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Appointments</h3>
              <p className="text-sm">Last Visit: {memberData.healthData.lastVisit}</p>
              <p className="text-sm">Next Visit: {memberData.healthData.upcomingVisit}</p>
            </div>
          </CardContent>
        </Card>

        {/* Prescription Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Stethoscope className="h-5 w-5" />
              Pharmacy Services
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold">Current Medications</h3>
                <Badge variant="outline" className="flex items-center gap-1">
                  <DollarSign className="h-4 w-4" />
                  YTD: ${memberData.rxData.yearToDateSpend}
                </Badge>
              </div>
              {memberData.rxData.currentMedications.map((med, idx) => (
                <div key={idx} className="border-l-4 border-blue-500 pl-4 py-2 mb-2">
                  <div className="flex justify-between">
                    <h4 className="font-semibold">{med.name}</h4>
                    {med.coverageChange && (
                      <Badge variant="destructive">Out of Network</Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-600">Last Fill: {med.lastFill}</p>
                  <p className="text-sm text-gray-600">Pharmacy: {med.pharmacy}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recommended Programs */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5" />
              Recommended Programs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {memberData.recommendedPrograms.map((program, idx) => (
                <div key={idx} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold">{program.name}</h3>
                    <Badge variant={program.priority === 'high' ? 'default' : 'secondary'}>
                      {program.priority}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{program.reason}</p>
                  <p className="text-sm font-medium">Benefit: {program.benefit}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SCANPreCallSummary;