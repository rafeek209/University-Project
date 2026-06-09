import {
  LayoutDashboard,
  QrCode,
  Wallet,
  GraduationCap,
  Calendar,
  FileText,
  MessageSquare,
  Settings,
  Car,
  Award,
  TrendingUp,
} from "lucide-react";
import { DashboardNav } from "@/components/dashboard/DashboardNav";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { AcademicProfile } from "@/components/dashboard/AcademicProfile";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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

const certificates = [
  { name: "Enrollment Certificate - Fall 2024", date: "Sep 2024", status: "Verified" },
  { name: "Dean's List Award", date: "Jun 2024", status: "Verified" },
  { name: "Research Participation", date: "Mar 2024", status: "Verified" },
];

export default function AcademicsPage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardNav items={navItems} />
      <div className="ml-64">
        <DashboardHeader userName="Youssef Mostafa" userRole="Computer Science, Year 3" />
        <main className="p-6 space-y-6">
          <div>
            <h1 className="text-2xl font-bold">Academics</h1>
            <p className="text-muted-foreground">Schedule, grades, attendance & certificates</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card variant="glass" className="p-5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Current GPA</span>
                <TrendingUp className="h-4 w-4 text-success" />
              </div>
              <p className="text-3xl font-bold gradient-text">3.75</p>
            </Card>
            <Card variant="glass" className="p-5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Attendance</span>
                <Badge variant="verified">Excellent</Badge>
              </div>
              <p className="text-3xl font-bold">96%</p>
            </Card>
            <Card variant="glass" className="p-5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Credits Earned</span>
                <Award className="h-4 w-4 text-primary" />
              </div>
              <p className="text-3xl font-bold">42</p>
            </Card>
          </div>

          <AcademicProfile
            schedule={schedule}
            grades={grades}
            attendance={96}
            totalCredits={42}
            gpa={3.75}
          />

          <Card variant="glass" className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Award className="h-5 w-5 text-primary" />
              <h3 className="font-semibold">Certificates</h3>
            </div>
            <div className="space-y-3">
              {certificates.map((c) => (
                <div
                  key={c.name}
                  className="flex items-center justify-between p-3 rounded-xl bg-surface-2/50"
                >
                  <div>
                    <p className="font-medium text-sm">{c.name}</p>
                    <p className="text-xs text-muted-foreground">{c.date}</p>
                  </div>
                  <Badge variant="verified">{c.status}</Badge>
                </div>
              ))}
            </div>
          </Card>
        </main>
      </div>
    </div>
  );
}
