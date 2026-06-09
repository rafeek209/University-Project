import {
  LayoutDashboard,
  QrCode,
  Clock,
  ClipboardCheck,
  Calendar,
  Settings,
  ChevronRight,
  MapPin,
  CheckCircle2,
  XCircle,
  Coffee,
  AlertCircle,
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
  { label: "Dashboard", href: "/worker", icon: LayoutDashboard },
  { label: "Digital ID", href: "/worker/id", icon: QrCode },
  { label: "Shifts", href: "/worker/shifts", icon: Clock },
  { label: "Attendance", href: "/worker/attendance", icon: ClipboardCheck },
  { label: "Schedule", href: "/worker/schedule", icon: Calendar },
  { label: "Settings", href: "/worker/settings", icon: Settings },
];

const currentShift = {
  start: "08:00 AM",
  end: "04:00 PM",
  location: "Engineering Building",
  supervisor: "Karim Abdelrahman",
  type: "Regular",
};

const todayTasks = [
  { id: 1, title: "Morning Cleaning - Floor 1", status: "completed", time: "08:00 - 09:30" },
  { id: 2, title: "Maintenance Check - HVAC", status: "completed", time: "09:30 - 10:30" },
  { id: 3, title: "Classroom Setup - CS-201", status: "in-progress", time: "10:30 - 11:30" },
  { id: 4, title: "Afternoon Cleaning - Floor 2", status: "pending", time: "14:00 - 15:30" },
  { id: 5, title: "Equipment Inspection", status: "pending", time: "15:30 - 16:00" },
];

const weeklyAttendance = [
  { day: "Mon", status: "present", hours: 8 },
  { day: "Tue", status: "present", hours: 8 },
  { day: "Wed", status: "present", hours: 8 },
  { day: "Thu", status: "present", hours: 7.5 },
  { day: "Fri", status: "today", hours: 0 },
  { day: "Sat", status: "off", hours: 0 },
  { day: "Sun", status: "off", hours: 0 },
];

const recentAttendance = [
  { date: "Jan 15", checkIn: "07:58 AM", checkOut: "-", status: "active", hours: "In Progress" },
  { date: "Jan 14", checkIn: "08:02 AM", checkOut: "04:05 PM", status: "completed", hours: "8h 03m" },
  { date: "Jan 13", checkIn: "07:55 AM", checkOut: "04:00 PM", status: "completed", hours: "8h 05m" },
  { date: "Jan 12", checkIn: "08:00 AM", checkOut: "03:30 PM", status: "early", hours: "7h 30m" },
];

const upcomingShifts = [
  { date: "Tomorrow", time: "08:00 AM - 04:00 PM", location: "Library Building", type: "Regular" },
  { date: "Jan 17", time: "06:00 AM - 02:00 PM", location: "Main Hall", type: "Event Support" },
  { date: "Jan 18", time: "08:00 AM - 04:00 PM", location: "Engineering Building", type: "Regular" },
];

export default function WorkerPortal() {
  const completedTasks = todayTasks.filter(t => t.status === "completed").length;
  const totalTasks = todayTasks.length;
  const progressPercent = (completedTasks / totalTasks) * 100;

  const weeklyHours = weeklyAttendance.reduce((sum, day) => sum + day.hours, 0);

  return (
    <div className="min-h-screen bg-background">
      <DashboardNav items={navItems} />

      <div className="ml-64">
        <DashboardHeader
          userName="Ahmed Hassan"
          userRole="Facilities Worker"
          notificationCount={1}
        />

        <main className="p-6 space-y-6">
          {/* Welcome Section */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Hello, Ahmed!</h1>
              <p className="text-muted-foreground">Your shift started at 08:00 AM</p>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="verified" className="gap-1.5">
                <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
                On Duty
              </Badge>
              <Badge variant="glass" className="gap-1.5">
                <Clock className="h-3 w-3" />
                6h 15m worked
              </Badge>
            </div>
          </div>

          {/* Main Content Grid - Simpler 2 Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column - Digital ID & Current Shift */}
            <div className="space-y-6">
              {/* Enhanced QR Card */}
              <EnhancedQRCard
                userId="WRK-2024-0089"
                userName="Ahmed Hassan"
                userRole="Worker"
                faculty="Facilities Department"
                status="Active"
              />

              {/* Current Shift */}
              <Card variant="glow" className="p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-primary" />
                      <h3 className="font-semibold">Current Shift</h3>
                    </div>
                    <Badge variant="active">Active</Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-xs text-muted-foreground">Start Time</p>
                      <p className="text-xl font-bold">{currentShift.start}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">End Time</p>
                      <p className="text-xl font-bold">{currentShift.end}</p>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{currentShift.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground">Supervisor:</span>
                      <span>{currentShift.supervisor}</span>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-border">
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-muted-foreground">Shift Progress</span>
                      <span className="font-medium">78%</span>
                    </div>
                    <Progress value={78} className="h-2" />
                  </div>
                </div>
              </Card>

              {/* Weekly Hours Summary */}
              <Card variant="glass" className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">This Week</h3>
                  <span className="text-2xl font-bold text-primary">{weeklyHours.toFixed(1)}h</span>
                </div>
                <div className="flex gap-2">
                  {weeklyAttendance.map((day, index) => (
                    <div
                      key={index}
                      className={`flex-1 p-3 rounded-xl text-center ${
                        day.status === "today" 
                          ? "bg-primary/10 border border-primary/20" 
                          : day.status === "off"
                          ? "bg-muted/30"
                          : "bg-surface-2/50"
                      }`}
                    >
                      <p className="text-xs font-medium mb-1">{day.day}</p>
                      {day.status === "present" ? (
                        <CheckCircle2 className="h-5 w-5 text-success mx-auto" />
                      ) : day.status === "today" ? (
                        <div className="w-5 h-5 rounded-full bg-primary/20 border-2 border-primary mx-auto" />
                      ) : (
                        <span className="text-xs text-muted-foreground">Off</span>
                      )}
                      {day.hours > 0 && (
                        <p className="text-xs text-muted-foreground mt-1">{day.hours}h</p>
                      )}
                    </div>
                  ))}
                </div>
              </Card>

              {/* Upcoming Shifts */}
              <Card variant="glass" className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold">Upcoming Shifts</h3>
                  </div>
                </div>
                <div className="space-y-3">
                  {upcomingShifts.map((shift, index) => (
                    <div
                      key={index}
                      className="p-3 rounded-xl bg-surface-2/50 hover:bg-surface-2 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <p className="font-medium text-sm">{shift.date}</p>
                        <Badge variant="glass" className="text-xs">{shift.type}</Badge>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {shift.time}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {shift.location}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Right Column - Tasks & Attendance */}
            <div className="space-y-6">
              {/* Today's Tasks */}
              <Card variant="glass" className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <ClipboardCheck className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold">Today's Tasks</h3>
                  </div>
                  <Badge variant="glass">{completedTasks}/{totalTasks} Done</Badge>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium">{Math.round(progressPercent)}%</span>
                  </div>
                  <Progress value={progressPercent} className="h-3" />
                </div>

                {/* Task List */}
                <div className="space-y-3">
                  {todayTasks.map((task) => (
                    <div
                      key={task.id}
                      className={`p-4 rounded-xl transition-colors ${
                        task.status === "completed" 
                          ? "bg-success/5 border border-success/20" 
                          : task.status === "in-progress"
                          ? "bg-primary/5 border border-primary/20"
                          : "bg-surface-2/50"
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          <div className={`mt-0.5 ${
                            task.status === "completed" 
                              ? "text-success" 
                              : task.status === "in-progress"
                              ? "text-primary"
                              : "text-muted-foreground"
                          }`}>
                            {task.status === "completed" ? (
                              <CheckCircle2 className="h-5 w-5" />
                            ) : task.status === "in-progress" ? (
                              <div className="w-5 h-5 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                            ) : (
                              <div className="w-5 h-5 rounded-full border-2 border-muted-foreground" />
                            )}
                          </div>
                          <div>
                            <p className={`font-medium text-sm ${
                              task.status === "completed" ? "line-through text-muted-foreground" : ""
                            }`}>
                              {task.title}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {task.time}
                            </p>
                          </div>
                        </div>
                        <Badge 
                          variant={
                            task.status === "completed" ? "verified" : 
                            task.status === "in-progress" ? "active" : 
                            "glass"
                          }
                          className="text-xs"
                        >
                          {task.status === "in-progress" ? "In Progress" : 
                           task.status === "completed" ? "Done" : "Pending"}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Recent Attendance */}
              <Card variant="glass" className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold">Recent Attendance</h3>
                  </div>
                  <Button variant="ghost" size="sm" className="text-xs">
                    View All
                    <ChevronRight className="h-3 w-3 ml-1" />
                  </Button>
                </div>
                <div className="space-y-3">
                  {recentAttendance.map((record, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 rounded-xl bg-surface-2/50"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                          record.status === "active" 
                            ? "bg-primary/10 text-primary" 
                            : record.status === "early"
                            ? "bg-warning/10 text-warning"
                            : "bg-success/10 text-success"
                        }`}>
                          {record.status === "active" ? (
                            <Clock className="h-5 w-5" />
                          ) : record.status === "early" ? (
                            <AlertCircle className="h-5 w-5" />
                          ) : (
                            <CheckCircle2 className="h-5 w-5" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-sm">{record.date}</p>
                          <p className="text-xs text-muted-foreground">
                            {record.checkIn} - {record.checkOut}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-sm">{record.hours}</p>
                        <Badge 
                          variant={record.status === "early" ? "glass" : "verified"} 
                          className="text-xs"
                        >
                          {record.status === "active" ? "Active" : 
                           record.status === "early" ? "Left Early" : "Complete"}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Quick Actions */}
              <Card variant="glass" className="p-6">
                <h3 className="font-semibold mb-4">Quick Actions</h3>
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" className="h-auto py-4 flex-col gap-2">
                    <Coffee className="h-5 w-5" />
                    <span className="text-sm">Start Break</span>
                  </Button>
                  <Button variant="outline" className="h-auto py-4 flex-col gap-2">
                    <AlertCircle className="h-5 w-5" />
                    <span className="text-sm">Report Issue</span>
                  </Button>
                  <Button variant="outline" className="h-auto py-4 flex-col gap-2">
                    <Calendar className="h-5 w-5" />
                    <span className="text-sm">Request Leave</span>
                  </Button>
                  <Button variant="outline" className="h-auto py-4 flex-col gap-2">
                    <Clock className="h-5 w-5" />
                    <span className="text-sm">Clock Out</span>
                  </Button>
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
