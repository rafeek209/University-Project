import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Shield, CheckCircle2, GraduationCap, Building2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface EnhancedQRCardProps {
  userId: string;
  userName: string;
  userRole: "Student" | "Staff" | "Alumni" | "Worker";
  userPhoto?: string;
  faculty?: string;
  status?: "Active" | "Alumni" | "Suspended";
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function EnhancedQRCard({
  userId,
  userName,
  userRole,
  userPhoto,
  faculty = "College of Engineering",
  status = "Active",
  className,
  size = "md",
}: EnhancedQRCardProps) {
  const [timeLeft, setTimeLeft] = useState(300);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 300));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const sizeClasses = {
    sm: "w-28 h-28",
    md: "w-40 h-40",
    lg: "w-56 h-56",
  };

  const generateQRPattern = () => {
    const patterns = [];
    for (let i = 0; i < 11; i++) {
      for (let j = 0; j < 11; j++) {
        if (Math.random() > 0.5 || (i < 3 && j < 3) || (i < 3 && j > 7) || (i > 7 && j < 3)) {
          patterns.push(
            <rect
              key={`${i}-${j}`}
              x={j * 18 + 10}
              y={i * 18 + 10}
              width="16"
              height="16"
              rx="2"
              fill="currentColor"
            />
          );
        }
      }
    }
    return patterns;
  };

  const statusColors = {
    Active: "bg-success/20 text-success border-success/30",
    Alumni: "bg-primary/20 text-primary border-primary/30",
    Suspended: "bg-destructive/20 text-destructive border-destructive/30",
  };

  return (
    <div className={cn("glass-card p-6 animate-fade-in", className)}>
      <div className="flex flex-col items-center space-y-4">
        {/* Header */}
        <div className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-primary" />
          <span className="text-sm font-medium text-muted-foreground">Digital Identity Card</span>
        </div>

        {/* Profile Photo & QR Code Side by Side */}
        <div className="flex items-center gap-6 w-full justify-center">
          {/* Profile Photo */}
          <div className="relative">
            <div className="w-24 h-24 rounded-2xl bg-surface-2 border-2 border-primary/30 overflow-hidden shadow-glow-sm">
              {userPhoto ? (
                <img src={userPhoto} alt={userName} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-accent/20">
                  <span className="text-3xl font-bold text-primary">
                    {userName.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
              )}
            </div>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-success flex items-center justify-center border-2 border-background">
              <CheckCircle2 className="h-3.5 w-3.5 text-success-foreground" />
            </div>
          </div>

          {/* QR Code */}
          <div className="relative">
            <div className="absolute inset-0 rounded-2xl animate-pulse-glow" />
            <div className={cn("qr-container relative", sizeClasses[size])}>
              <svg viewBox="0 0 220 220" className="w-full h-full text-primary-foreground">
                <rect x="0" y="0" width="220" height="220" fill="white" rx="12" />
                <g className="text-background">
                  {generateQRPattern()}
                </g>
                {/* Corner markers */}
                <rect x="10" y="10" width="50" height="50" rx="8" fill="none" stroke="hsl(187 100% 50%)" strokeWidth="4" />
                <rect x="160" y="10" width="50" height="50" rx="8" fill="none" stroke="hsl(187 100% 50%)" strokeWidth="4" />
                <rect x="10" y="160" width="50" height="50" rx="8" fill="none" stroke="hsl(187 100% 50%)" strokeWidth="4" />
              </svg>
            </div>
          </div>
        </div>

        {/* User Info */}
        <div className="text-center space-y-2 w-full">
          <p className="font-bold text-xl">{userName}</p>
          <p className="text-sm text-muted-foreground font-mono">{userId}</p>
          
          {/* Faculty & Role */}
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <GraduationCap className="h-4 w-4" />
            <span>{faculty}</span>
          </div>
        </div>

        {/* Status Badges */}
        <div className="flex items-center gap-2 flex-wrap justify-center">
          <Badge className={cn("gap-1 border", statusColors[status])}>
            <span className="w-1.5 h-1.5 rounded-full bg-current" />
            {status}
          </Badge>
          <Badge variant="active" className="gap-1">
            {userRole}
          </Badge>
          <Badge variant="verified" className="gap-1">
            <CheckCircle2 className="h-3 w-3" />
            Verified
          </Badge>
        </div>

        {/* Timer */}
        <div className="flex items-center gap-2 text-sm pt-2 border-t border-border w-full justify-center">
          <span className="text-muted-foreground">Token expires in</span>
          <span className="font-mono font-bold text-primary">{formatTime(timeLeft)}</span>
        </div>
      </div>
    </div>
  );
}
