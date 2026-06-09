import { cn } from "@/lib/utils";
import { 
  Target, 
  TrendingUp, 
  Users, 
  Calendar, 
  Building2, 
  BookOpen,
  Trophy,
  CheckCircle2,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  RadialBarChart,
  RadialBar,
  ResponsiveContainer,
  PolarAngleAxis,
} from "recharts";

interface PerformanceMetric {
  label: string;
  current: number;
  target: number;
  unit?: string;
  icon: typeof Target;
}

interface UniversityPerformanceScoreProps {
  overallScore?: number;
  metrics?: PerformanceMetric[];
  className?: string;
}

const defaultMetrics: PerformanceMetric[] = [
  { label: "Student Engagement", current: 87, target: 90, unit: "%", icon: Users },
  { label: "Attendance Rate", current: 92, target: 95, unit: "%", icon: Calendar },
  { label: "Facility Usage", current: 78, target: 85, unit: "%", icon: Building2 },
  { label: "Events Participation", current: 65, target: 70, unit: "%", icon: Trophy },
  { label: "Academic Activity", current: 94, target: 95, unit: "%", icon: BookOpen },
];

export function UniversityPerformanceScore({
  overallScore = 83,
  metrics = defaultMetrics,
  className,
}: UniversityPerformanceScoreProps) {
  const chartData = [{ score: overallScore, fill: "hsl(187, 100%, 50%)" }];

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-success";
    if (score >= 75) return "text-primary";
    if (score >= 60) return "text-warning";
    return "text-destructive";
  };

  const getScoreLabel = (score: number) => {
    if (score >= 90) return "Excellent";
    if (score >= 75) return "Good";
    if (score >= 60) return "Fair";
    return "Needs Improvement";
  };

  return (
    <Card variant="glow" className={cn("p-6", className)}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-bold text-lg">University Performance Score</h3>
          <p className="text-sm text-muted-foreground">Annual targets and metrics</p>
        </div>
        <div className="flex items-center gap-2">
          <Target className="h-5 w-5 text-primary" />
          <span className="text-sm font-medium">2024 Goals</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Score Chart */}
        <div className="flex flex-col items-center justify-center">
          <div className="relative w-48 h-48">
            <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart
                cx="50%"
                cy="50%"
                innerRadius="70%"
                outerRadius="100%"
                barSize={12}
                data={chartData}
                startAngle={90}
                endAngle={-270}
              >
                <PolarAngleAxis
                  type="number"
                  domain={[0, 100]}
                  angleAxisId={0}
                  tick={false}
                />
                <RadialBar
                  background={{ fill: "hsl(222, 47%, 16%)" }}
                  dataKey="score"
                  cornerRadius={10}
                  fill="hsl(187, 100%, 50%)"
                />
              </RadialBarChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className={cn("text-4xl font-bold", getScoreColor(overallScore))}>
                {overallScore}
              </span>
              <span className="text-sm text-muted-foreground">/ 100</span>
            </div>
          </div>
          <div className="mt-4 text-center">
            <p className={cn("font-semibold", getScoreColor(overallScore))}>
              {getScoreLabel(overallScore)}
            </p>
            <p className="text-xs text-muted-foreground">Overall Performance</p>
          </div>
        </div>

        {/* Metrics */}
        <div className="space-y-4">
          {metrics.map((metric) => {
            const Icon = metric.icon;
            const percentage = (metric.current / metric.target) * 100;
            const isAchieved = percentage >= 100;

            return (
              <div key={metric.label} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <Icon className="h-4 w-4 text-muted-foreground" />
                    <span>{metric.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={cn("font-medium", isAchieved ? "text-success" : "")}>
                      {metric.current}{metric.unit}
                    </span>
                    <span className="text-muted-foreground">/ {metric.target}{metric.unit}</span>
                    {isAchieved && <CheckCircle2 className="h-4 w-4 text-success" />}
                  </div>
                </div>
                <div className="h-2 bg-surface-2 rounded-full overflow-hidden">
                  <div
                    className={cn(
                      "h-full rounded-full transition-all duration-500",
                      isAchieved ? "bg-success" : percentage >= 80 ? "bg-primary" : "bg-warning"
                    )}
                    style={{ width: `${Math.min(percentage, 100)}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Summary */}
      <div className="mt-6 pt-6 border-t border-border grid grid-cols-3 gap-4 text-center">
        <div>
          <p className="text-2xl font-bold text-success">3</p>
          <p className="text-xs text-muted-foreground">Targets Achieved</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-warning">2</p>
          <p className="text-xs text-muted-foreground">In Progress</p>
        </div>
        <div>
          <p className="text-2xl font-bold gradient-text">+5%</p>
          <p className="text-xs text-muted-foreground">vs Last Year</p>
        </div>
      </div>
    </Card>
  );
}
