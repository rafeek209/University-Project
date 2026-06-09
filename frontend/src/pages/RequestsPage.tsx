import { useState } from "react";
import {
  LayoutDashboard,
  QrCode,
  Wallet,
  GraduationCap,
  Calendar,
  FileText,
  MessageSquare,
  Settings,
  Car,
  Plus,
  Search,
  Clock,
  CheckCircle2,
  AlertCircle,
  Loader2,
  CreditCard,
  ChevronRight,
  Filter,
} from "lucide-react";
import { DashboardNav } from "@/components/dashboard/DashboardNav";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { EmergencyButton } from "@/components/dashboard/EmergencyButton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const navItems = [
  { label: "Dashboard", href: "/student", icon: LayoutDashboard },
  { label: "Digital ID", href: "/student/id", icon: QrCode },
  { label: "Academics", href: "/student/academics", icon: GraduationCap },
  { label: "Wallet", href: "/student/wallet", icon: Wallet },
  { label: "Requests", href: "/student/requests", icon: FileText, badge: 2 },
  { label: "Events", href: "/student/events", icon: Calendar },
  { label: "Car Permits", href: "/student/permits", icon: Car },
  { label: "AI Assistant", href: "/student/assistant", icon: MessageSquare },
  { label: "Settings", href: "/student/settings", icon: Settings },
];

type RequestStatus = "submitted" | "processing" | "ready" | "rejected";
type RequestType = "grade_statement" | "lost_id" | "car_permit" | "enrollment_certificate";

interface Request {
  id: string;
  type: RequestType;
  title: string;
  description: string;
  submittedAt: string;
  status: RequestStatus;
  estimatedCompletion?: string;
  trackingNumber: string;
}

const requestTypes = [
  { 
    type: "grade_statement" as const, 
    icon: FileText, 
    title: "Grade Statement", 
    description: "Official transcript of your grades",
    processingTime: "2-3 business days"
  },
  { 
    type: "lost_id" as const, 
    icon: CreditCard, 
    title: "Lost ID Replacement", 
    description: "Request a new student ID card",
    processingTime: "3-5 business days"
  },
  { 
    type: "car_permit" as const, 
    icon: Car, 
    title: "Car Permit", 
    description: "Apply for campus parking permit",
    processingTime: "1-2 business days"
  },
  { 
    type: "enrollment_certificate" as const, 
    icon: GraduationCap, 
    title: "Enrollment Certificate", 
    description: "Proof of enrollment document",
    processingTime: "1-2 business days"
  },
];

const statusConfig: Record<RequestStatus, { label: string; color: string; icon: typeof Clock }> = {
  submitted: { label: "Submitted", color: "bg-blue-500/20 text-blue-400 border-blue-500/30", icon: Clock },
  processing: { label: "Processing", color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30", icon: Loader2 },
  ready: { label: "Ready for Pickup", color: "bg-green-500/20 text-green-400 border-green-500/30", icon: CheckCircle2 },
  rejected: { label: "Rejected", color: "bg-red-500/20 text-red-400 border-red-500/30", icon: AlertCircle },
};

const mockRequests: Request[] = [
  { 
    id: "REQ-2024-001", 
    type: "grade_statement", 
    title: "Grade Statement - Fall 2024",
    description: "Official transcript for Fall 2024 semester",
    submittedAt: "2024-01-02", 
    status: "processing",
    estimatedCompletion: "Jan 5, 2024",
    trackingNumber: "GS-45821-2024"
  },
  { 
    id: "REQ-2024-002", 
    type: "enrollment_certificate", 
    title: "Enrollment Certificate",
    description: "Proof of current enrollment for visa application",
    submittedAt: "2023-12-28", 
    status: "ready",
    trackingNumber: "EC-45821-2024"
  },
  { 
    id: "REQ-2024-003", 
    type: "car_permit", 
    title: "Temporary Parking Permit",
    description: "Guest parking for January 15-20",
    submittedAt: "2023-12-20", 
    status: "submitted",
    estimatedCompletion: "Jan 3, 2024",
    trackingNumber: "CP-45821-2024"
  },
];

const requestIcons: Record<RequestType, typeof FileText> = {
  grade_statement: FileText,
  lost_id: CreditCard,
  car_permit: Car,
  enrollment_certificate: GraduationCap,
};

export default function RequestsPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [isNewRequestOpen, setIsNewRequestOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredRequests = mockRequests.filter((req) => {
    if (activeTab !== "all" && req.status !== activeTab) return false;
    if (searchQuery && !req.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-background">
      <DashboardNav items={navItems} />

      <div className="ml-64">
        <DashboardHeader
          userName="Youssef Mostafa"
          userRole="Computer Science, Year 3"
          notificationCount={3}
        />

        <main className="p-6 space-y-6">
          {/* Page Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Smart Requests</h1>
              <p className="text-muted-foreground">Submit and track your document requests</p>
            </div>
            <Dialog open={isNewRequestOpen} onOpenChange={setIsNewRequestOpen}>
              <DialogTrigger asChild>
                <Button variant="default">
                  <Plus className="h-4 w-4 mr-2" />
                  New Request
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Create New Request</DialogTitle>
                  <DialogDescription>
                    Select the type of document you need
                  </DialogDescription>
                </DialogHeader>
                <div className="grid grid-cols-2 gap-4 py-4">
                  {requestTypes.map((type) => {
                    const Icon = type.icon;
                    return (
                      <button
                        key={type.type}
                        className="flex items-start gap-4 p-4 rounded-xl border border-border bg-surface-2/50 hover:bg-surface-2 hover:border-primary/50 transition-all text-left"
                        onClick={() => setIsNewRequestOpen(false)}
                      >
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold mb-1">{type.title}</h4>
                          <p className="text-sm text-muted-foreground mb-2">{type.description}</p>
                          <Badge variant="glass" className="text-xs">
                            <Clock className="h-3 w-3 mr-1" />
                            {type.processingTime}
                          </Badge>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Search & Filter */}
          <Card variant="glass" className="p-4">
            <div className="flex items-center gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search requests..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-10 pl-10 pr-4 rounded-xl bg-surface-2 border border-border text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </Card>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="all">All Requests</TabsTrigger>
              <TabsTrigger value="submitted">Submitted</TabsTrigger>
              <TabsTrigger value="processing">Processing</TabsTrigger>
              <TabsTrigger value="ready">Ready</TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="mt-6">
              <div className="space-y-4">
                {filteredRequests.length > 0 ? (
                  filteredRequests.map((request) => {
                    const Icon = requestIcons[request.type];
                    const status = statusConfig[request.status];
                    const StatusIcon = status.icon;

                    return (
                      <Card 
                        key={request.id}
                        variant="glass" 
                        className="p-6 hover:bg-glass/60 transition-all duration-200"
                      >
                        <div className="flex items-start gap-4">
                          <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                            <Icon className="h-7 w-7 text-primary" />
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <h3 className="font-semibold text-lg">{request.title}</h3>
                                <p className="text-sm text-muted-foreground">{request.description}</p>
                              </div>
                              <Badge className={`gap-1.5 border ${status.color}`}>
                                <StatusIcon className={`h-3 w-3 ${request.status === "processing" ? "animate-spin" : ""}`} />
                                {status.label}
                              </Badge>
                            </div>
                            
                            <div className="flex items-center gap-6 text-sm text-muted-foreground">
                              <span>Tracking: <span className="font-mono text-foreground">{request.trackingNumber}</span></span>
                              <span>Submitted: {request.submittedAt}</span>
                              {request.estimatedCompletion && request.status !== "ready" && (
                                <span>Est. Completion: {request.estimatedCompletion}</span>
                              )}
                            </div>

                            {/* Status Timeline */}
                            <div className="mt-4 flex items-center gap-2">
                              <div className="flex items-center gap-1">
                                <div className="w-6 h-6 rounded-full bg-success flex items-center justify-center">
                                  <CheckCircle2 className="h-4 w-4 text-success-foreground" />
                                </div>
                                <span className="text-xs text-muted-foreground">Submitted</span>
                              </div>
                              <div className={`flex-1 h-1 rounded ${request.status !== "submitted" ? "bg-success" : "bg-border"}`} />
                              <div className="flex items-center gap-1">
                                <div className={`w-6 h-6 rounded-full flex items-center justify-center ${request.status === "processing" || request.status === "ready" ? "bg-success" : "bg-border"}`}>
                                  {request.status === "processing" ? (
                                    <Loader2 className="h-4 w-4 text-success-foreground animate-spin" />
                                  ) : request.status === "ready" ? (
                                    <CheckCircle2 className="h-4 w-4 text-success-foreground" />
                                  ) : (
                                    <Loader2 className="h-4 w-4 text-muted-foreground" />
                                  )}
                                </div>
                                <span className="text-xs text-muted-foreground">Processing</span>
                              </div>
                              <div className={`flex-1 h-1 rounded ${request.status === "ready" ? "bg-success" : "bg-border"}`} />
                              <div className="flex items-center gap-1">
                                <div className={`w-6 h-6 rounded-full flex items-center justify-center ${request.status === "ready" ? "bg-success" : "bg-border"}`}>
                                  <CheckCircle2 className={`h-4 w-4 ${request.status === "ready" ? "text-success-foreground" : "text-muted-foreground"}`} />
                                </div>
                                <span className="text-xs text-muted-foreground">Ready</span>
                              </div>
                            </div>
                          </div>

                          <Button variant="ghost" size="icon">
                            <ChevronRight className="h-5 w-5" />
                          </Button>
                        </div>
                      </Card>
                    );
                  })
                ) : (
                  <Card variant="glass" className="p-12 text-center">
                    <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                    <h3 className="font-semibold mb-2">No Requests Found</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {searchQuery ? "Try a different search term" : "You haven't made any requests yet"}
                    </p>
                    <Button variant="default" onClick={() => setIsNewRequestOpen(true)}>
                      <Plus className="h-4 w-4 mr-2" />
                      Create First Request
                    </Button>
                  </Card>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>

      <EmergencyButton />
    </div>
  );
}
