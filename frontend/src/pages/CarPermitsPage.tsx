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
  CheckCircle2,
  Clock,
  AlertTriangle,
  Filter,
  MoreVertical,
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
  { label: "Requests", href: "/student/requests", icon: FileText },
  { label: "Events", href: "/student/events", icon: Calendar },
  { label: "Car Permits", href: "/student/permits", icon: Car, badge: 1 },
  { label: "AI Assistant", href: "/student/assistant", icon: MessageSquare },
  { label: "Settings", href: "/student/settings", icon: Settings },
];

type PermitType = "permanent" | "temporary";
type PermitStatus = "active" | "expired" | "pending";

interface CarPermit {
  id: string;
  type: PermitType;
  vehiclePlate: string;
  vehicleModel: string;
  vehicleColor: string;
  validFrom: string;
  validUntil: string;
  status: PermitStatus;
  qrCode: string;
  parkingZone: string;
}

const statusConfig: Record<PermitStatus, { label: string; color: string; icon: typeof Clock }> = {
  active: { label: "Active", color: "bg-green-500/20 text-green-400 border-green-500/30", icon: CheckCircle2 },
  expired: { label: "Expired", color: "bg-red-500/20 text-red-400 border-red-500/30", icon: AlertTriangle },
  pending: { label: "Pending", color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30", icon: Clock },
};

const permits: CarPermit[] = [
  {
    id: "PRM-2024-001",
    type: "permanent",
    vehiclePlate: "ABC-1234",
    vehicleModel: "Toyota Camry",
    vehicleColor: "Silver",
    validFrom: "Jan 1, 2024",
    validUntil: "Dec 31, 2024",
    status: "active",
    qrCode: "QR-PRM-45821",
    parkingZone: "Zone A - Student Parking",
  },
  {
    id: "PRM-2024-002",
    type: "temporary",
    vehiclePlate: "XYZ-5678",
    vehicleModel: "Honda Civic",
    vehicleColor: "Blue",
    validFrom: "Jan 15, 2024",
    validUntil: "Jan 20, 2024",
    status: "pending",
    qrCode: "QR-TMP-45821",
    parkingZone: "Zone B - Visitor Parking",
  },
];

export default function CarPermitsPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [isNewPermitOpen, setIsNewPermitOpen] = useState(false);
  const [selectedPermit, setSelectedPermit] = useState<CarPermit | null>(null);

  const filteredPermits = permits.filter((permit) => {
    if (activeTab === "permanent" && permit.type !== "permanent") return false;
    if (activeTab === "temporary" && permit.type !== "temporary") return false;
    return true;
  });

  const generateQRPattern = () => {
    const patterns = [];
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (Math.random() > 0.5 || (i < 2 && j < 2) || (i < 2 && j > 6) || (i > 6 && j < 2)) {
          patterns.push(
            <rect
              key={`${i}-${j}`}
              x={j * 20 + 10}
              y={i * 20 + 10}
              width="18"
              height="18"
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
              <h1 className="text-2xl font-bold">Car Permits</h1>
              <p className="text-muted-foreground">Manage your campus parking permits</p>
            </div>
            <Dialog open={isNewPermitOpen} onOpenChange={setIsNewPermitOpen}>
              <DialogTrigger asChild>
                <Button variant="default">
                  <Plus className="h-4 w-4 mr-2" />
                  Request Permit
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Request Car Permit</DialogTitle>
                  <DialogDescription>
                    Select the type of parking permit you need
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <button
                    className="w-full flex items-start gap-4 p-4 rounded-xl border border-border bg-surface-2/50 hover:bg-surface-2 hover:border-primary/50 transition-all text-left"
                    onClick={() => setIsNewPermitOpen(false)}
                  >
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <Car className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Permanent Permit</h4>
                      <p className="text-sm text-muted-foreground">Valid for entire semester/year</p>
                      <Badge variant="glass" className="mt-2 text-xs">$150/semester</Badge>
                    </div>
                  </button>
                  <button
                    className="w-full flex items-start gap-4 p-4 rounded-xl border border-border bg-surface-2/50 hover:bg-surface-2 hover:border-primary/50 transition-all text-left"
                    onClick={() => setIsNewPermitOpen(false)}
                  >
                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                      <Clock className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Temporary Permit</h4>
                      <p className="text-sm text-muted-foreground">Short-term parking (1-7 days)</p>
                      <Badge variant="glass" className="mt-2 text-xs">$10/day</Badge>
                    </div>
                  </button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card variant="glass" className="p-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center">
                  <CheckCircle2 className="h-6 w-6 text-success" />
                </div>
                <div>
                  <p className="text-2xl font-bold">1</p>
                  <p className="text-sm text-muted-foreground">Active Permits</p>
                </div>
              </div>
            </Card>
            <Card variant="glass" className="p-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-warning/10 flex items-center justify-center">
                  <Clock className="h-6 w-6 text-warning" />
                </div>
                <div>
                  <p className="text-2xl font-bold">1</p>
                  <p className="text-sm text-muted-foreground">Pending Approval</p>
                </div>
              </div>
            </Card>
            <Card variant="glass" className="p-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Car className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">Zone A</p>
                  <p className="text-sm text-muted-foreground">Assigned Parking</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="all">All Permits</TabsTrigger>
              <TabsTrigger value="permanent">Permanent</TabsTrigger>
              <TabsTrigger value="temporary">Temporary</TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredPermits.map((permit) => {
                  const status = statusConfig[permit.status];
                  const StatusIcon = status.icon;

                  return (
                    <Card 
                      key={permit.id}
                      variant="glow" 
                      className="overflow-hidden cursor-pointer hover:shadow-glow transition-all duration-300"
                      onClick={() => setSelectedPermit(permit)}
                    >
                      <div className="p-6">
                        {/* Header */}
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-bold text-lg">{permit.vehiclePlate}</h3>
                              <Badge className={`gap-1 border ${status.color}`}>
                                <StatusIcon className="h-3 w-3" />
                                {status.label}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {permit.vehicleModel} • {permit.vehicleColor}
                            </p>
                          </div>
                          <Badge variant="glass">
                            {permit.type === "permanent" ? "Permanent" : "Temporary"}
                          </Badge>
                        </div>

                        {/* Permit Details & QR */}
                        <div className="flex items-center gap-6">
                          {/* QR Code */}
                          <div className="w-24 h-24 bg-white rounded-xl p-2 shadow-glow-sm">
                            <svg viewBox="0 0 200 200" className="w-full h-full text-background">
                              {generateQRPattern()}
                            </svg>
                          </div>

                          {/* Details */}
                          <div className="flex-1 space-y-2 text-sm">
                            <div className="flex items-center justify-between">
                              <span className="text-muted-foreground">Permit ID</span>
                              <span className="font-mono">{permit.id}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-muted-foreground">Valid From</span>
                              <span>{permit.validFrom}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-muted-foreground">Valid Until</span>
                              <span>{permit.validUntil}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-muted-foreground">Zone</span>
                              <span className="text-primary font-medium">{permit.parkingZone.split(" - ")[0]}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Footer */}
                      <div className="px-6 py-4 bg-surface-2/50 border-t border-border">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">
                            {permit.parkingZone}
                          </span>
                          <Button variant="ghost" size="sm">
                            View Details
                          </Button>
                        </div>
                      </div>
                    </Card>
                  );
                })}

                {filteredPermits.length === 0 && (
                  <Card variant="glass" className="col-span-2 p-12 text-center">
                    <Car className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                    <h3 className="font-semibold mb-2">No Permits Found</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      You don't have any {activeTab === "all" ? "" : activeTab} permits yet
                    </p>
                    <Button variant="default" onClick={() => setIsNewPermitOpen(true)}>
                      <Plus className="h-4 w-4 mr-2" />
                      Request Your First Permit
                    </Button>
                  </Card>
                )}
              </div>
            </TabsContent>
          </Tabs>

          {/* Parking Rules */}
          <Card variant="glass" className="p-6">
            <h3 className="font-semibold mb-4">Parking Rules & Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="p-4 rounded-xl bg-surface-2/50">
                <h4 className="font-medium mb-2">Zone A - Student Parking</h4>
                <p className="text-muted-foreground">Available 6:00 AM - 10:00 PM. Located near Engineering & Science buildings.</p>
              </div>
              <div className="p-4 rounded-xl bg-surface-2/50">
                <h4 className="font-medium mb-2">Zone B - Visitor Parking</h4>
                <p className="text-muted-foreground">Available 24/7. Located near Main Gate and Student Center.</p>
              </div>
              <div className="p-4 rounded-xl bg-surface-2/50">
                <h4 className="font-medium mb-2">Zone C - Staff Parking</h4>
                <p className="text-muted-foreground">Reserved for faculty and staff. Requires staff ID verification.</p>
              </div>
            </div>
          </Card>
        </main>
      </div>

      <EmergencyButton />
    </div>
  );
}
