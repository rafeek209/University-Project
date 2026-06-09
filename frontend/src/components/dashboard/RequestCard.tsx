import { cn } from "@/lib/utils";
import { 
  FileText, 
  CreditCard, 
  Car, 
  GraduationCap, 
  Clock,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ChevronRight
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type RequestStatus = "submitted" | "processing" | "ready" | "rejected";
type RequestType = "grade_statement" | "lost_id" | "car_permit" | "enrollment_certificate";

interface Request {
  id: string;
  type: RequestType;
  title: string;
  submittedAt: string;
  status: RequestStatus;
  estimatedCompletion?: string;
}

const requestIcons: Record<RequestType, typeof FileText> = {
  grade_statement: FileText,
  lost_id: CreditCard,
  car_permit: Car,
  enrollment_certificate: GraduationCap,
};

const statusConfig: Record<RequestStatus, { label: string; color: string; icon: typeof Clock }> = {
  submitted: { label: "Submitted", color: "bg-blue-500/20 text-blue-400 border-blue-500/30", icon: Clock },
  processing: { label: "Processing", color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30", icon: Loader2 },
  ready: { label: "Ready", color: "bg-green-500/20 text-green-400 border-green-500/30", icon: CheckCircle2 },
  rejected: { label: "Rejected", color: "bg-red-500/20 text-red-400 border-red-500/30", icon: AlertCircle },
};

interface RequestCardProps {
  request: Request;
  onView?: (id: string) => void;
  className?: string;
}

export function RequestCard({ request, onView, className }: RequestCardProps) {
  const Icon = requestIcons[request.type];
  const status = statusConfig[request.status];
  const StatusIcon = status.icon;

  return (
    <Card 
      variant="glass" 
      className={cn(
        "p-4 hover:bg-glass/60 transition-all duration-200 cursor-pointer group",
        className
      )}
      onClick={() => onView?.(request.id)}
    >
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
          <Icon className="h-6 w-6 text-primary" />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="font-medium text-sm truncate">{request.title}</h4>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span>Submitted {request.submittedAt}</span>
            {request.estimatedCompletion && request.status === "processing" && (
              <>
                <span>•</span>
                <span>Est. {request.estimatedCompletion}</span>
              </>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Badge className={cn("gap-1.5 border", status.color)}>
            <StatusIcon className={cn("h-3 w-3", request.status === "processing" && "animate-spin")} />
            {status.label}
          </Badge>
          <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
        </div>
      </div>
    </Card>
  );
}

interface RequestsListProps {
  requests: Request[];
  onViewRequest?: (id: string) => void;
  onNewRequest?: () => void;
  className?: string;
}

export function RequestsList({ requests, onViewRequest, onNewRequest, className }: RequestsListProps) {
  return (
    <Card variant="glass" className={cn("p-6", className)}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-semibold">Smart Requests</h3>
          <p className="text-sm text-muted-foreground">Track your document requests</p>
        </div>
        <Button variant="default" size="sm" onClick={onNewRequest}>
          New Request
        </Button>
      </div>

      <div className="space-y-3">
        {requests.length > 0 ? (
          requests.map((request) => (
            <RequestCard key={request.id} request={request} onView={onViewRequest} />
          ))
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            <FileText className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No active requests</p>
          </div>
        )}
      </div>
    </Card>
  );
}
