import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, ArrowDownRight, Clock } from "lucide-react";

interface ActivityItem {
  id: string;
  type: "entry" | "exit" | "payment" | "alert" | "visitor";
  title: string;
  description: string;
  time: string;
  location?: string;
  status?: "success" | "warning" | "error";
}

interface ActivityLogProps {
  items: ActivityItem[];
  className?: string;
  maxItems?: number;
}

export function ActivityLog({ items, className, maxItems = 5 }: ActivityLogProps) {
  const displayItems = items.slice(0, maxItems);

  const getIcon = (type: ActivityItem["type"]) => {
    switch (type) {
      case "entry":
        return <ArrowDownRight className="h-4 w-4 text-success" />;
      case "exit":
        return <ArrowUpRight className="h-4 w-4 text-warning" />;
      default:
        return <Clock className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getStatusBadge = (status?: ActivityItem["status"]) => {
    if (!status) return null;
    const variants = {
      success: "verified" as const,
      warning: "warning" as const,
      error: "destructive" as const,
    };
    return <Badge variant={variants[status]} className="text-xs">{status}</Badge>;
  };

  return (
    <div className={cn("glass-card p-6", className)}>
      <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
      <div className="space-y-4">
        {displayItems.map((item, index) => (
          <div
            key={item.id}
            className={cn(
              "flex items-start gap-4 pb-4 animate-fade-in",
              index < displayItems.length - 1 && "border-b border-border"
            )}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="w-10 h-10 rounded-xl bg-surface-2 flex items-center justify-center shrink-0">
              {getIcon(item.type)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <p className="font-medium text-sm truncate">{item.title}</p>
                {getStatusBadge(item.status)}
              </div>
              <p className="text-sm text-muted-foreground truncate">{item.description}</p>
              <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                <span>{item.time}</span>
                {item.location && (
                  <>
                    <span>•</span>
                    <span>{item.location}</span>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
