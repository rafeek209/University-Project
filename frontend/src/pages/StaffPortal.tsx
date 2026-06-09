import { useState } from "react";
import {
  LayoutDashboard,
  QrCode,
  Calendar,
  ClipboardCheck,
  Users,
  FileText,
  MessageSquare,
  Settings,
  Clock,
  ChevronRight,
  BookOpen,
  MapPin,
  TrendingUp,
  Bell,
  Building2,
} from "lucide-react";
import { DashboardNav } from "@/components/dashboard/DashboardNav";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { EnhancedQRCard } from "@/components/dashboard/EnhancedQRCard";
import { EmergencyButton } from "@/components/dashboard/EmergencyButton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const navItems = [
  { label: "Dashboard", href: "/staff", icon: LayoutDashboard },
  { label: "Digital ID", href: "/staff/id", icon: QrCode },
  { label: "Schedule", href: "/staff/schedule", icon: Calendar },
  { label: "Attendance", href: "/staff/attendance", icon: ClipboardCheck },
  { label: "Students", href: "/staff/students", icon: Users },
  { label: "Documents", href: "/staff/documents", icon: FileText },
  { label: "Messages", href: "/staff/messages", icon: MessageSquare, badge: 3 },
  { label: "Settings", href: "/staff/settings", icon: Settings },
];

const todaySchedule = [
  { time: "09:00 - 10:30", subject: "Data Structures", room: "CS-201", students: 45, type: "lecture" },
  { time: "11:00 - 12:30", subject: "Algorithm Design", room: "CS-305", students: 38, type: "lecture" },
  { time: "14:00 - 15:30", subject: "Office Hours", room: "Office 412", students: null, type: "office" },
  { time: "16:00 - 17:30", subject: "Graduate Seminar", room: "CS-101", students: 15, type: "seminar" },
];

const weeklySchedule = [
  { day: "Mon", classes: 4, hours: 6 },
  { day: "Tue", classes: 3, hours: 4.5 },
  { day: "Wed", classes: 4, hours: 6 },
  { day: "Thu", classes: 2, hours: 3 },
  { day: "Fri", classes: 3, hours: 4.5 },
];

const attendanceLog = [
  { date: "Jan 15", checkIn: "08:45 AM", checkOut: "05:30 PM", status: "present", hours: "8h 45m" },
  { date: "Jan 14", checkIn: "09:00 AM", checkOut: "06:00 PM", status: "present", hours: "9h 00m" },
  { date: "Jan 13", checkIn: "08:30 AM", checkOut: "05:00 PM", status: "present", hours: "8h 30m" },
  { date: "Jan 12", checkIn: "-", checkOut: "-", status: "leave", hours: "-" },
  { date: "Jan 11", checkIn: "09:15 AM", checkOut: "05:45 PM", status: "present", hours: "8h 30m" },
];

const upcomingMeetings = [
  { title: "Department Meeting", time: "Tomorrow, 10:00 AM", location: "Conference Room A" },
  { title: "Thesis Committee", time: "Jan 18, 2:00 PM", location: "Dean's Office" },
  { title: "Faculty Review", time: "Jan 20, 11:00 AM", location: "Admin Building" },
];

const pendingTasks = [
  { id: 1, title: "Grade Midterm Exams", course: "Data Structures", due: "Jan 18", priority: "high" },
  { id: 2, title: "Submit Research Report", course: "", due: "Jan 20", priority: "medium" },
  { id: 3, title: "Review Thesis Draft", course: "Graduate", due: "Jan 22", priority: "low" },
];

const accessHistory = [
  { time: "08:45 AM", location: "Main Gate", type: "Entry" },
  { time: "09:00 AM", location: "CS Building", type: "Entry" },
  { time: "12:30 PM", location: "Cafeteria", type: "Entry" },
  { time: "01:00 PM", location: "CS Building", type: "Entry" },
];

export default function StaffPortal() {
  const currentMonth = {
    present: 18,
    leave: 2,
    total: 22,
  };

  return (
    <div className="min-h-screen bg-background">
      <DashboardNav items={navItems} />

      <div className="ml-64">
        <DashboardHeader
          userName="Dr. Salma Mansour"
          userRole="Associate Professor, Computer Science"
          notificationCount={3}
        />

        <main className="p-6 space-y-6">
          {/* Welcome Section */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Good Morning, Dr. Mitchell!</h1>
              <p className="text-muted-foreground">You have 4 classes scheduled today</p>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="verified" className="gap-1.5">
                <span className="w-2 h-2 rounded-full bg-success" />
                On Campus
              </Badge>
              <Badge variant="glass" className="gap-1.5">
                <Clock className="h-3 w-3" />
                Checked in: 08:45 AM
              </Badge>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Digital ID & Attendance */}
            <div className="space-y-6">
              {/* Enhanced QR Card */}
              <EnhancedQRCard
                userId="STF-2024-0142"
                userName="Dr. Salma Mansour"
                userRole="Staff"
                faculty="College of Engineering"
                status="Active"
              />

              {/* Monthly Attendance Summary */}
              <Card variant="glass" className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <ClipboardCheck className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold">This Month</h3>
                  </div>
                  <Badge variant="glass">January 2024</Badge>
                </div>
                
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="text-center p-3 rounded-xl bg-success/10">
                    <p className="text-2xl font-bold text-success">{currentMonth.present}</p>
                    <p className="text-xs text-muted-foreground">Present</p>
                  </div>
                  <div className="text-center p-3 rounded-xl bg-warning/10">
                    <p className="text-2xl font-bold text-warning">{currentMonth.leave}</p>
                    <p className="text-xs text-muted-foreground">Leave</p>
                  </div>
                  <div className="text-center p-3 rounded-xl bg-primary/10">
                    <p className="text-2xl font-bold text-primary">{currentMonth.total}</p>
                    <p className="text-xs text-muted-foreground">Work Days</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Attendance Rate</span>
                    <span className="font-medium">90%</span>
                  </div>
                  <Progress value={90} className="h-2" />
                </div>
              </Card>

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

            {/* Center Column - Schedule */}
            <div className="space-y-6">
              {/* Today's Schedule */}
              <Card variant="glass" className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold">Today's Schedule</h3>
                  </div>
                  <Badge variant="glass">4 Classes</Badge>
                </div>
                <div className="space-y-3">
                  {todaySchedule.map((item, index) => (
                    <div
                      key={index}
                      className="p-4 rounded-xl bg-surface-2/50 hover:bg-surface-2 transition-colors border-l-4 border-primary"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="font-medium">{item.subject}</p>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                            <MapPin className="h-3 w-3" />
                            <span>{item.room}</span>
                          </div>
                        </div>
                        <Badge 
                          variant={item.type === "lecture" ? "default" : item.type === "office" ? "glass" : "secondary"}
                          className="text-xs"
                        >
                          {item.type}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">{item.time}</span>
                        {item.students && (
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <Users className="h-3 w-3" />
                            <span>{item.students} students</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Weekly Overview */}
              <Card variant="glass" className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">Weekly Overview</h3>
                  <Button variant="ghost" size="sm">Full Calendar</Button>
                </div>
                <div className="flex gap-2">
                  {weeklySchedule.map((day, index) => (
                    <div
                      key={index}
                      className={`flex-1 p-3 rounded-xl text-center ${
                        index === 0 ? "bg-primary/10 border border-primary/20" : "bg-surface-2/50"
                      }`}
                    >
                      <p className="text-xs font-medium mb-1">{day.day}</p>
                      <p className="text-lg font-bold">{day.classes}</p>
                      <p className="text-xs text-muted-foreground">{day.hours}h</p>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Pending Tasks */}
              <Card variant="glass" className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold">Pending Tasks</h3>
                  </div>
                  <Badge variant="glass">{pendingTasks.length} Tasks</Badge>
                </div>
                <div className="space-y-3">
                  {pendingTasks.map((task) => (
                    <div
                      key={task.id}
                      className="flex items-center justify-between p-3 rounded-xl bg-surface-2/50 hover:bg-surface-2 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${
                          task.priority === "high" ? "bg-destructive" : 
                          task.priority === "medium" ? "bg-warning" : "bg-success"
                        }`} />
                        <div>
                          <p className="font-medium text-sm">{task.title}</p>
                          {task.course && (
                            <p className="text-xs text-muted-foreground">{task.course}</p>
                          )}
                        </div>
                      </div>
                      <span className="text-xs text-muted-foreground">{task.due}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Right Column - Attendance Log & Meetings */}
            <div className="space-y-6">
              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-4">
                <Card variant="stat" className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <BookOpen className="h-4 w-4 text-primary" />
                    <span className="text-xs text-muted-foreground">Courses</span>
                  </div>
                  <p className="text-2xl font-bold">4</p>
                  <p className="text-xs text-muted-foreground">This Semester</p>
                </Card>
                <Card variant="stat" className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="h-4 w-4 text-primary" />
                    <span className="text-xs text-muted-foreground">Students</span>
                  </div>
                  <p className="text-2xl font-bold">156</p>
                  <p className="text-xs text-muted-foreground">Total Enrolled</p>
                </Card>
              </div>

              {/* Attendance Log */}
              <Card variant="glass" className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold">Attendance Log</h3>
                  </div>
                  <Button variant="ghost" size="sm">Export</Button>
                </div>
                <div className="space-y-3">
                  {attendanceLog.map((log, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 rounded-xl bg-surface-2/50"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                          log.status === "present" ? "bg-success/10 text-success" : "bg-warning/10 text-warning"
                        }`}>
                          {log.status === "present" ? "✓" : "L"}
                        </div>
                        <div>
                          <p className="font-medium text-sm">{log.date}</p>
                          <p className="text-xs text-muted-foreground">
                            {log.checkIn !== "-" ? `${log.checkIn} - ${log.checkOut}` : "On Leave"}
                          </p>
                        </div>
                      </div>
                      <span className="text-sm font-medium">{log.hours}</span>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Upcoming Meetings */}
              <Card variant="glass" className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Bell className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold">Upcoming Meetings</h3>
                  </div>
                </div>
                <div className="space-y-3">
                  {upcomingMeetings.map((meeting, index) => (
                    <div
                      key={index}
                      className="p-3 rounded-xl bg-surface-2/50 hover:bg-surface-2 transition-colors"
                    >
                      <p className="font-medium text-sm">{meeting.title}</p>
                      <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                        <span>{meeting.time}</span>
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {meeting.location}
                        </span>
                      </div>
                    </div>
                  ))}
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
