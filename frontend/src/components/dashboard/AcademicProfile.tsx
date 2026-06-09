import { cn } from "@/lib/utils";
import { 
  GraduationCap, 
  Calendar, 
  BookOpen, 
  FileText, 
  Wallet, 
  Settings,
  ChevronRight,
  Clock,
  BarChart3
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Schedule {
  time: string;
  subject: string;
  room: string;
  professor: string;
}

interface Grade {
  subject: string;
  grade: string;
  points: number;
  credits: number;
}

interface AcademicProfileProps {
  schedule: Schedule[];
  grades: Grade[];
  attendance: number;
  totalCredits: number;
  gpa: number;
  className?: string;
}

export function AcademicProfile({
  schedule,
  grades,
  attendance = 96,
  totalCredits = 42,
  gpa = 3.75,
  className,
}: AcademicProfileProps) {
  const academicSections = [
    { icon: Calendar, label: "Schedule", href: "/student/schedule", count: schedule.length },
    { icon: BookOpen, label: "Grades", href: "/student/grades", count: grades.length },
    { icon: Clock, label: "Attendance", href: "/student/attendance", value: `${attendance}%` },
    { icon: Wallet, label: "Finances", href: "/student/finances" },
    { icon: Settings, label: "Services", href: "/student/services" },
    { icon: FileText, label: "Certificates", href: "/student/certificates" },
  ];

  return (
    <Card variant="glass" className={cn("p-6", className)}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
            <GraduationCap className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold">Academic Profile</h3>
            <p className="text-sm text-muted-foreground">Connected to your QR Identity</p>
          </div>
        </div>
        <Badge variant="verified" className="gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-success" />
          Synced
        </Badge>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center p-4 rounded-xl bg-surface-2/50">
          <p className="text-2xl font-bold gradient-text">{gpa}</p>
          <p className="text-xs text-muted-foreground">GPA</p>
        </div>
        <div className="text-center p-4 rounded-xl bg-surface-2/50">
          <p className="text-2xl font-bold gradient-text">{totalCredits}</p>
          <p className="text-xs text-muted-foreground">Credits</p>
        </div>
        <div className="text-center p-4 rounded-xl bg-surface-2/50">
          <p className="text-2xl font-bold gradient-text">{attendance}%</p>
          <p className="text-xs text-muted-foreground">Attendance</p>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="schedule" className="w-full">
        <TabsList className="w-full mb-4">
          <TabsTrigger value="schedule" className="flex-1">Schedule</TabsTrigger>
          <TabsTrigger value="grades" className="flex-1">Grades</TabsTrigger>
          <TabsTrigger value="services" className="flex-1">Services</TabsTrigger>
        </TabsList>

        <TabsContent value="schedule" className="space-y-3">
          {schedule.map((item, index) => (
            <div
              key={index}
              className="flex items-start gap-4 p-3 rounded-xl bg-surface-2/50 hover:bg-surface-2 transition-colors"
            >
              <div className="text-center min-w-[50px]">
                <p className="text-sm font-bold text-primary">{item.time}</p>
              </div>
              <div className="flex-1">
                <p className="font-medium text-sm">{item.subject}</p>
                <p className="text-xs text-muted-foreground">
                  {item.room} • {item.professor}
                </p>
              </div>
            </div>
          ))}
        </TabsContent>

        <TabsContent value="grades" className="space-y-3">
          {grades.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between py-3 border-b border-border last:border-0"
            >
              <div>
                <p className="text-sm font-medium">{item.subject}</p>
                <p className="text-xs text-muted-foreground">{item.credits} Credits</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-primary">{item.grade}</p>
                <p className="text-xs text-muted-foreground">{item.points}</p>
              </div>
            </div>
          ))}
        </TabsContent>

        <TabsContent value="services" className="space-y-2">
          {academicSections.map((section) => {
            const Icon = section.icon;
            return (
              <Button
                key={section.label}
                variant="ghost"
                className="w-full justify-between h-auto py-3"
              >
                <div className="flex items-center gap-3">
                  <Icon className="h-4 w-4 text-muted-foreground" />
                  <span>{section.label}</span>
                </div>
                <div className="flex items-center gap-2">
                  {section.count && (
                    <Badge variant="glass">{section.count}</Badge>
                  )}
                  {section.value && (
                    <span className="text-sm text-primary font-medium">{section.value}</span>
                  )}
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </div>
              </Button>
            );
          })}
        </TabsContent>
      </Tabs>
    </Card>
  );
}
