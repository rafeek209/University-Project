import { useState } from "react";
import {
  LayoutDashboard,
  QrCode,
  Wallet,
  GraduationCap,
  Calendar,
  FileText,
  MessageSquare,
  Settings,
  Trophy,
  Car,
  Bell,
  CreditCard,
  TrendingUp,
  Send,
  Star,
  ChevronRight,
} from "lucide-react";
import { DashboardNav } from "@/components/dashboard/DashboardNav";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { EnhancedQRCard } from "@/components/dashboard/EnhancedQRCard";
import { UniversityScore } from "@/components/dashboard/UniversityScore";
import { InterestsSelector } from "@/components/dashboard/InterestsSelector";
import { AIAssistant } from "@/components/dashboard/AIAssistant";
import { AcademicProfile } from "@/components/dashboard/AcademicProfile";
import { RequestsList } from "@/components/dashboard/RequestCard";
import { EmergencyButton } from "@/components/dashboard/EmergencyButton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";

const navItems = [
  { label: "Dashboard", href: "/student", icon: LayoutDashboard },
  { label: "Digital ID", href: "/student/id", icon: QrCode },
  { label: "Academics", href: "/student/academics", icon: GraduationCap },
  { label: "Wallet", href: "/student/wallet", icon: Wallet, badge: "$125" },
  { label: "Requests", href: "/student/requests", icon: FileText, badge: 2 },
  { label: "Events", href: "/student/events", icon: Calendar },
  { label: "Car Permits", href: "/student/permits", icon: Car },
  { label: "AI Assistant", href: "/student/assistant", icon: MessageSquare },
  { label: "Settings", href: "/student/settings", icon: Settings },
];

const schedule = [
  { time: "09:00", subject: "Data Structures", room: "CS-201", professor: "Dr. Hassan" },
  { time: "11:00", subject: "Calculus II", room: "MATH-105", professor: "Prof. Gamal" },
  { time: "14:00", subject: "Physics Lab", room: "PHY-LAB-3", professor: "Dr. Wael" },
  { time: "16:00", subject: "English Literature", room: "HUM-302", professor: "Prof. Bahaa" },
];

const grades = [
  { subject: "Data Structures", grade: "A", points: 4.0, credits: 3 },
  { subject: "Calculus II", grade: "A-", points: 3.7, credits: 4 },
  { subject: "Physics", grade: "B+", points: 3.3, credits: 4 },
  { subject: "English", grade: "A", points: 4.0, credits: 3 },
];

const transactions = [
  { id: 1, type: "payment", description: "Cafeteria Purchase", amount: -12.50, time: "2h ago" },
  { id: 2, type: "topup", description: "Wallet Top-up", amount: 100.00, time: "1d ago" },
  { id: 3, type: "payment", description: "Library Fine", amount: -5.00, time: "2d ago" },
];

const requests = [
  { 
    id: "1", 
    type: "grade_statement" as const, 
    title: "Grade Statement - Fall 2024", 
    submittedAt: "2 days ago", 
    status: "processing" as const,
    estimatedCompletion: "Tomorrow"
  },
  { 
    id: "2", 
    type: "enrollment_certificate" as const, 
    title: "Enrollment Certificate", 
    submittedAt: "5 days ago", 
    status: "ready" as const
  },
];

const upcomingEvents = [
  { id: 1, title: "Tech Hackathon 2024", date: "Jan 15", type: "tech", registered: true },
  { id: 2, title: "Basketball Tournament", date: "Jan 20", type: "sports", registered: false },
  { id: 3, title: "Career Fair", date: "Jan 25", type: "academic", registered: true },
];

const accessHistory = [
  { time: "08:45 AM", location: "Main Gate", type: "Entry" },
  { time: "12:30 PM", location: "Library", type: "Entry" },
  { time: "01:15 PM", location: "Library", type: "Exit" },
];

export default function StudentPortal() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardNav items={navItems} />

      <div className="ml-64">
        <DashboardHeader
          userName="Youssef Mostafa"
          userRole="Computer Science, Year 3"
          notificationCount={5}
        />

        <main className="p-6 space-y-6">
          {/* Welcome Section */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Welcome back, Alex!</h1>
              <p className="text-muted-foreground">Your digital campus experience starts here</p>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="verified" className="gap-1.5">
                <span className="w-2 h-2 rounded-full bg-success" />
                Inside Campus
              </Badge>
              <Badge variant="glass" className="gap-1.5">
                <Star className="h-3 w-3 text-yellow-400" />
                Silver Level
              </Badge>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Digital ID & Score */}
            <div className="space-y-6">
              {/* Enhanced QR Card */}
              <EnhancedQRCard
                userId="STU-2024-45821"
                userName="Youssef Mostafa"
                userRole="Student"
                faculty="College of Engineering"
                status="Active"
              />

              {/* University Score */}
              <UniversityScore
                score={720}
                maxScore={1000}
                level="Silver"
                trend="up"
                recentPoints={25}
              />

              {/* Interests */}
              <InterestsSelector editable />

              {/* Access History */}
              <Card variant="glass" className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-sm">Today's Access</h3>
                  <Button variant="ghost" size="sm" className="text-xs">
                    View All
                    <ChevronRight className="h-3 w-3 ml-1" />
                  </Button>
                </div>
                <div className="space-y-3">
                  {accessHistory.map((entry, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between text-sm"
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`w-2 h-2 rounded-full ${
                            entry.type === "Entry" ? "bg-success" : "bg-warning"
                          }`}
                        />
                        <span>{entry.location}</span>
                      </div>
                      <span className="text-muted-foreground text-xs">{entry.time}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Center Column - Academic Profile & Requests */}
            <div className="space-y-6">
              {/* Academic Profile */}
              <AcademicProfile
                schedule={schedule}
                grades={grades}
                attendance={96}
                totalCredits={42}
                gpa={3.75}
              />

              {/* Upcoming Events */}
              <Card variant="glass" className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold">Upcoming Events</h3>
                  </div>
                  <Link to="/student/events">
                    <Button variant="ghost" size="sm">View All</Button>
                  </Link>
                </div>
                <div className="space-y-3">
                  {upcomingEvents.map((event) => (
                    <div
                      key={event.id}
                      className="flex items-center justify-between p-3 rounded-xl bg-surface-2/50 hover:bg-surface-2 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                          <Calendar className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">{event.title}</p>
                          <p className="text-xs text-muted-foreground">{event.date}</p>
                        </div>
                      </div>
                      {event.registered ? (
                        <Badge variant="verified" className="text-xs">Registered</Badge>
                      ) : (
                        <Button variant="outline" size="sm">Register</Button>
                      )}
                    </div>
                  ))}
                </div>
              </Card>

              {/* Smart Requests Summary */}
              <RequestsList
                requests={requests}
                onNewRequest={() => {}}
              />
            </div>

            {/* Right Column - Wallet & AI */}
            <div className="space-y-6">
              {/* Wallet Card */}
              <Card variant="glow" className="p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                      <Wallet className="h-5 w-5 text-primary" />
                      <span className="text-sm font-medium">Digital Wallet</span>
                    </div>
                    <Badge variant="active">Active</Badge>
                  </div>
                  <p className="text-4xl font-bold mb-2">$125.50</p>
                  <p className="text-sm text-muted-foreground mb-6">Available Balance</p>
                  <div className="grid grid-cols-2 gap-3">
                    <Button variant="default" className="w-full">
                      <TrendingUp className="h-4 w-4 mr-2" />
                      Top Up
                    </Button>
                    <Button variant="outline" className="w-full">
                      <CreditCard className="h-4 w-4 mr-2" />
                      Pay
                    </Button>
                  </div>
                </div>
              </Card>

              {/* Recent Transactions */}
              <Card variant="glass" className="p-4">
                <h3 className="font-semibold text-sm mb-4">Recent Transactions</h3>
                <div className="space-y-3">
                  {transactions.map((tx) => (
                    <div
                      key={tx.id}
                      className="flex items-center justify-between text-sm"
                    >
                      <div>
                        <p className="font-medium">{tx.description}</p>
                        <p className="text-xs text-muted-foreground">{tx.time}</p>
                      </div>
                      <span
                        className={`font-bold ${
                          tx.amount > 0 ? "text-success" : "text-muted-foreground"
                        }`}
                      >
                        {tx.amount > 0 ? "+" : ""}${Math.abs(tx.amount).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
              </Card>

              {/* AI Assistant */}
              <AIAssistant />

              {/* University Fees */}
              <Card variant="glass" className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-sm">University Fees</h3>
                  <Badge variant="glass">Due Jan 15</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold">$4,500.00</p>
                    <p className="text-xs text-muted-foreground">Spring Semester</p>
                  </div>
                  <Button variant="glow">Pay Now</Button>
                </div>
              </Card>
            </div>
          </div>
        </main>
      </div>

      {/* Emergency Button */}
      <EmergencyButton />
    </div>
  );
}
