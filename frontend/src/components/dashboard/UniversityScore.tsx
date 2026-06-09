import { cn } from "@/lib/utils";
import { Trophy, TrendingUp, TrendingDown, Star, Medal, Zap } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface UniversityScoreProps {
  score: number;
  maxScore?: number;
  level?: string;
  trend?: "up" | "down" | "neutral";
  recentPoints?: number;
  className?: string;
}

export function UniversityScore({
  score,
  maxScore = 1000,
  level = "Silver",
  trend = "up",
  recentPoints = 25,
  className,
}: UniversityScoreProps) {
  const percentage = (score / maxScore) * 100;
  
  const levelColors: Record<string, string> = {
    Bronze: "from-amber-600 to-amber-400",
    Silver: "from-slate-400 to-slate-300",
    Gold: "from-yellow-500 to-yellow-300",
    Platinum: "from-cyan-400 to-cyan-200",
    Diamond: "from-purple-500 to-pink-400",
  };

  const levelIcons: Record<string, typeof Trophy> = {
    Bronze: Medal,
    Silver: Star,
    Gold: Trophy,
    Platinum: Zap,
    Diamond: Trophy,
  };

  const LevelIcon = levelIcons[level] || Star;

  return (
    <Card variant="glow" className={cn("p-6 relative overflow-hidden", className)}>
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-accent/10 rounded-full blur-3xl" />
      
      <div className="relative z-10 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-br", levelColors[level])}>
              <LevelIcon className="h-5 w-5 text-background" />
            </div>
            <div>
              <h3 className="font-semibold text-sm">University Score</h3>
              <p className="text-xs text-muted-foreground">{level} Level</p>
            </div>
          </div>
          <div className="flex items-center gap-1 text-sm">
            {trend === "up" && (
              <>
                <TrendingUp className="h-4 w-4 text-success" />
                <span className="text-success font-medium">+{recentPoints}</span>
              </>
            )}
            {trend === "down" && (
              <>
                <TrendingDown className="h-4 w-4 text-destructive" />
                <span className="text-destructive font-medium">-{recentPoints}</span>
              </>
            )}
          </div>
        </div>

        {/* Score Display */}
        <div className="text-center py-4">
          <p className="text-5xl font-bold gradient-text">{score}</p>
          <p className="text-sm text-muted-foreground">/ {maxScore} points</p>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Progress to next level</span>
            <span>{Math.round(percentage)}%</span>
          </div>
          <div className="h-3 bg-surface-2 rounded-full overflow-hidden">
            <div 
              className={cn("h-full rounded-full bg-gradient-to-r transition-all duration-500", levelColors[level])}
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-border">
          <div className="text-center">
            <p className="text-lg font-bold text-primary">12</p>
            <p className="text-xs text-muted-foreground">Events</p>
          </div>
          <div className="text-center border-x border-border">
            <p className="text-lg font-bold text-success">98%</p>
            <p className="text-xs text-muted-foreground">Attendance</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-warning">3</p>
            <p className="text-xs text-muted-foreground">Competitions</p>
          </div>
        </div>
      </div>
    </Card>
  );
}
