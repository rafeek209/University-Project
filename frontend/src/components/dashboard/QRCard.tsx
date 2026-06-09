import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Shield, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface QRCardProps {
  userId: string;
  userName: string;
  userRole: string;
  userPhoto?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function QRCard({
  userId,
  userName,
  userRole,
  userPhoto,
  className,
  size = "md",
}: QRCardProps) {
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
    sm: "w-32 h-32",
    md: "w-48 h-48",
    lg: "w-64 h-64",
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

  return (
    <div className={cn("glass-card p-6 animate-fade-in", className)}>
      <div className="flex flex-col items-center space-y-4">
        {/* Header */}
        <div className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-primary" />
          <span className="text-sm font-medium text-muted-foreground">Gate Access Pass</span>
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

        {/* User Info */}
        <div className="text-center space-y-1">
          <p className="font-semibold text-lg">{userName}</p>
          <p className="text-sm text-muted-foreground font-mono">{userId}</p>
        </div>

        {/* Status */}
        <div className="flex items-center gap-2">
          <Badge variant="verified" className="gap-1">
            <CheckCircle2 className="h-3 w-3" />
            Verified
          </Badge>
          <Badge variant="active" className="gap-1">
            {userRole}
          </Badge>
        </div>

        {/* Timer */}
        <div className="flex items-center gap-2 text-sm">
          <span className="text-muted-foreground">Token expires in</span>
          <span className="font-mono font-bold text-primary">{formatTime(timeLeft)}</span>
        </div>
      </div>
    </div>
  );
}
