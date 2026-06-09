import {
  LayoutDashboard,
  Users,
  DoorOpen,
  CreditCard,
  FileText,
  Shield,
  Settings,
  UserPlus,
  GraduationCap,
  BarChart3,
  Bell,
  Building2,
  Car,
  Target,
  CheckCircle2,
  Clock,
  AlertCircle,
} from "lucide-react";
import { DashboardNav } from "@/components/dashboard/DashboardNav";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { StatCard } from "@/components/dashboard/StatCard";
import { ActivityLog } from "@/components/dashboard/ActivityLog";
import { UniversityPerformanceScore } from "@/components/dashboard/UniversityPerformanceScore";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts";
import { Link } from "react-router-dom";

const navItems = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Users & Roles", href: "/admin/users", icon: Users },
  { label: "Gate Access", href: "/admin/access", icon: DoorOpen, badge: 12 },
  { label: "Visitors", href: "/admin/visitors", icon: UserPlus },
  { label: "Car Permits", href: "/admin/permits", icon: Car, badge: 3 },
  { label: "Requests", href: "/admin/requests", icon: FileText, badge: 8 },
  { label: "Academics", href: "/admin/academics", icon: GraduationCap },
  { label: "Finance", href: "/admin/finance", icon: CreditCard },
  { label: "Reports", href: "/admin/reports", icon: BarChart3 },
  { label: "Security", href: "/admin/security", icon: Shield },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

const entryData = [
  { time: "06:00", entries: 45, exits: 12 },
  { time: "07:00", entries: 180, exits: 25 },
  { time: "08:00", entries: 420, exits: 45 },
  { time: "09:00", entries: 280, exits: 120 },
  { time: "10:00", entries: 150, exits: 85 },
  { time: "11:00", entries: 95, exits: 140 },
  { time: "12:00", entries: 65, exits: 220 },
  { time: "13:00", entries: 180, exits: 90 },
  { time: "14:00", entries: 120, exits: 150 },
  { time: "15:00", entries: 80, exits: 200 },
  { time: "16:00", entries: 45, exits: 320 },
  { time: "17:00", entries: 25, exits: 280 },
];

const buildingData = [
  { name: "Main Building", occupancy: 85, capacity: 500 },
  { name: "Library", occupancy: 72, capacity: 300 },
  { name: "Engineering", occupancy: 68, capacity: 400 },
  { name: "Science Block", occupancy: 45, capacity: 350 },
  { name: "Student Center", occupancy: 90, capacity: 200 },
];

const userDistribution = [
  { name: "Students", value: 12500, color: "hsl(187, 100%, 50%)" },
  { name: "Staff", value: 850, color: "hsl(142, 76%, 46%)" },
  { name: "Workers", value: 320, color: "hsl(45, 100%, 51%)" },
  { name: "Visitors", value: 145, color: "hsl(270, 100%, 65%)" },
];

const recentActivity = [
  {
    id: "1",
    type: "entry" as const,
    title: "Student Entry",
    description: "Omar Naguib entered Main Building",
    time: "2 min ago",
    location: "Gate A",
    status: "success" as const,
  },
  {
    id: "2",
    type: "visitor" as const,
    title: "Visitor Registered",
    description: "New visitor pass generated for Sara Gamal",
    time: "5 min ago",
    location: "Reception",
    status: "success" as const,
  },
  {
    id: "3",
    type: "alert" as const,
    title: "Access Denied",
    description: "Invalid QR code at Engineering Building",
    time: "8 min ago",
    location: "Gate C",
    status: "warning" as const,
  },
  {
    id: "4",
    type: "exit" as const,
    title: "Staff Exit",
    description: "Dr. Wael left campus",
    time: "12 min ago",
    location: "Gate B",
    status: "success" as const,
  },
  {
    id: "5",
    type: "payment" as const,
    title: "Fee Payment",
    description: "Tuition fee received from student #45821",
    time: "15 min ago",
    status: "success" as const,
  },
];

const pendingRequests = [
  { id: "REQ-001", type: "Car Permit", user: "Alex Thompson", time: "10 min ago", status: "pending" },
  { id: "REQ-002", type: "Grade Statement", user: "Mariam Gamil", time: "25 min ago", status: "pending" },
  { id: "REQ-003", type: "Lost ID", user: "Yassin Wagdy", time: "1 hour ago", status: "processing" },
];

const alerts = [
  { id: 1, message: "3 unauthorized access attempts in the last hour", severity: "warning" },
  { id: 2, message: "Gate D sensor offline - maintenance required", severity: "error" },
  { id: 3, message: "Visitor capacity reaching 90% at Student Center", severity: "warning" },
];

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardNav items={navItems} />

      <div className="ml-64">
        <DashboardHeader
          userName="Admin User"
          userRole="System Administrator"
          notificationCount={5}
        />

        <main className="p-6 space-y-6">
          {/* Page Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Command Center</h1>
              <p className="text-muted-foreground">Real-time campus overview and analytics</p>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="active" className="gap-1.5">
                <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
                Live Mode
              </Badge>
              <Button variant="outline" size="sm">
                <FileText className="h-4 w-4 mr-2" />
                Export Report
              </Button>
            </div>
          </div>

          {/* Alerts Banner */}
          {alerts.length > 0 && (
            <Card variant="glass" className="p-4 border-warning/30">
              <div className="flex items-start gap-4">
                <Bell className="h-5 w-5 text-warning shrink-0 mt-0.5" />
                <div className="flex-1">
                  <h3 className="font-medium text-warning mb-2">Active Alerts</h3>
                  <div className="space-y-2">
                    {alerts.map((alert) => (
                      <div
                        key={alert.id}
                        className="flex items-center gap-2 text-sm text-muted-foreground"
                      >
                        <span
                          className={`w-2 h-2 rounded-full ${
                            alert.severity === "error" ? "bg-destructive" : "bg-warning"
                          }`}
                        />
                        {alert.message}
                      </div>
                    ))}
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  View All
                </Button>
              </div>
            </Card>
          )}

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              title="On Campus Now"
              value="2,847"
              change="+127 from yesterday"
              changeType="positive"
              icon={Users}
            />
            <StatCard
              title="Today's Entries"
              value="4,521"
              change="+8.2% vs last week"
              changeType="positive"
              icon={DoorOpen}
            />
            <StatCard
              title="Active Visitors"
              value="145"
              change="23 pending approval"
              changeType="neutral"
              icon={UserPlus}
            />
            <StatCard
              title="Revenue Today"
              value="$12,450"
              change="+12.5% vs yesterday"
              changeType="positive"
              icon={CreditCard}
            />
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Entry/Exit Chart */}
            <Card variant="glass" className="lg:col-span-2 p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="font-semibold">Entry & Exit Flow</h3>
                  <p className="text-sm text-muted-foreground">Real-time gate activity</p>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-primary" />
                    Entries
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-warning" />
                    Exits
                  </div>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={entryData}>
                  <defs>
                    <linearGradient id="colorEntries" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(187, 100%, 50%)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(187, 100%, 50%)" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorExits" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(45, 100%, 51%)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(45, 100%, 51%)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(222, 47%, 22%)" />
                  <XAxis dataKey="time" stroke="hsl(215, 20%, 65%)" fontSize={12} />
                  <YAxis stroke="hsl(215, 20%, 65%)" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(222, 47%, 13%)",
                      border: "1px solid hsl(222, 47%, 22%)",
                      borderRadius: "12px",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="entries"
                    stroke="hsl(187, 100%, 50%)"
                    fillOpacity={1}
                    fill="url(#colorEntries)"
                    strokeWidth={2}
                  />
                  <Area
                    type="monotone"
                    dataKey="exits"
                    stroke="hsl(45, 100%, 51%)"
                    fillOpacity={1}
                    fill="url(#colorExits)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </Card>

            {/* User Distribution */}
            <Card variant="glass" className="p-6">
              <h3 className="font-semibold mb-2">Population Distribution</h3>
              <p className="text-sm text-muted-foreground mb-4">By user type</p>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={userDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {userDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(222, 47%, 13%)",
                      border: "1px solid hsl(222, 47%, 22%)",
                      borderRadius: "12px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="grid grid-cols-2 gap-2 mt-4">
                {userDistribution.map((item) => (
                  <div key={item.name} className="flex items-center gap-2">
                    <span
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-xs text-muted-foreground">{item.name}</span>
                    <span className="text-xs font-medium ml-auto">
                      {item.value.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* University Performance Score */}
          <UniversityPerformanceScore overallScore={83} />

          {/* Pending Requests & Building Occupancy */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Pending Requests */}
            <Card variant="glass" className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="font-semibold">Pending Requests</h3>
                  <p className="text-sm text-muted-foreground">Awaiting approval</p>
                </div>
                <Link to="/admin/requests">
                  <Button variant="ghost" size="sm">View All</Button>
                </Link>
              </div>
              <div className="space-y-3">
                {pendingRequests.map((request) => (
                  <div
                    key={request.id}
                    className="flex items-center justify-between p-4 rounded-xl bg-surface-2/50 hover:bg-surface-2 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                        <FileText className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">{request.type}</p>
                        <p className="text-xs text-muted-foreground">{request.user} • {request.time}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="glass" className="gap-1">
                        {request.status === "pending" ? (
                          <Clock className="h-3 w-3" />
                        ) : (
                          <AlertCircle className="h-3 w-3" />
                        )}
                        {request.status}
                      </Badge>
                      <Button variant="default" size="sm">Review</Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Building Occupancy */}
            <Card variant="glass" className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="font-semibold">Building Occupancy</h3>
                  <p className="text-sm text-muted-foreground">Real-time capacity</p>
                </div>
                <Building2 className="h-5 w-5 text-muted-foreground" />
              </div>
              <div className="space-y-4">
                {buildingData.map((building) => {
                  const percentage = Math.round((building.occupancy / 100) * 100);
                  const isHigh = percentage > 80;

                  return (
                    <div key={building.name} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>{building.name}</span>
                        <span className={isHigh ? "text-warning font-medium" : "text-muted-foreground"}>
                          {building.occupancy}%
                        </span>
                      </div>
                      <div className="h-2 bg-surface-2 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            isHigh ? "bg-warning" : "bg-primary"
                          }`}
                          style={{ width: `${building.occupancy}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          </div>

          {/* Activity Log & Quick Actions */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ActivityLog items={recentActivity} />

            {/* Quick Actions */}
            <Card variant="glass" className="p-6">
              <h3 className="font-semibold mb-4">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-4">
                <Button variant="glass" className="h-auto py-4 flex-col gap-2">
                  <Users className="h-5 w-5" />
                  <span className="text-xs">Add User</span>
                </Button>
                <Button variant="glass" className="h-auto py-4 flex-col gap-2">
                  <UserPlus className="h-5 w-5" />
                  <span className="text-xs">Register Visitor</span>
                </Button>
                <Button variant="glass" className="h-auto py-4 flex-col gap-2">
                  <Car className="h-5 w-5" />
                  <span className="text-xs">Issue Permit</span>
                </Button>
                <Button variant="glass" className="h-auto py-4 flex-col gap-2">
                  <Shield className="h-5 w-5" />
                  <span className="text-xs">Security Scan</span>
                </Button>
                <Button variant="glass" className="h-auto py-4 flex-col gap-2">
                  <CheckCircle2 className="h-5 w-5" />
                  <span className="text-xs">Verify Certificate</span>
                </Button>
                <Button variant="glass" className="h-auto py-4 flex-col gap-2">
                  <BarChart3 className="h-5 w-5" />
                  <span className="text-xs">View Reports</span>
                </Button>
              </div>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
