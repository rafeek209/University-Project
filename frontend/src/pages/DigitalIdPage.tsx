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
  Shield,
  Fingerprint,
  CheckCircle2,
} from "lucide-react";
import { DashboardNav } from "@/components/dashboard/DashboardNav";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { EnhancedQRCard } from "@/components/dashboard/EnhancedQRCard";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const navItems = [
  { label: "Dashboard", href: "/student", icon: LayoutDashboard },
  { label: "Digital ID", href: "/student/id", icon: QrCode },
  { label: "Academics", href: "/student/academics", icon: GraduationCap },
  { label: "Wallet", href: "/student/wallet", icon: Wallet, badge: "$125" },
  { label: "Requests", href: "/student/requests", icon: FileText, badge: 2 },
  { label: "Events", href: "/student/events", icon: Calendar },
  { label: "Car Permits", href: "/student/permits", icon: Car },
  { label: "AI Assistant", href: "/student/assistant", icon: MessageSquare },
  { label: "Settings", href: "/student/settings", icon: Settings },
];

export default function DigitalIdPage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardNav items={navItems} />
      <div className="ml-64">
        <DashboardHeader userName="Youssef Mostafa" userRole="Computer Science, Year 3" />
        <main className="p-6 space-y-6 max-w-5xl">
          <div>
            <h1 className="text-2xl font-bold">Digital Identity</h1>
            <p className="text-muted-foreground">Your secure campus identity & access pass</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <EnhancedQRCard
              userId="STU-2024-45821"
              userName="Youssef Mostafa"
              userRole="Student"
              faculty="College of Engineering"
              status="Active"
            />

            <div className="space-y-6">
              <Card variant="glass" className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Shield className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold">Identity Details</h3>
                </div>
                <div className="space-y-3 text-sm">
                  {[
                    ["Full Name", "Youssef Mostafa"],
                    ["Student ID", "STU-2024-45821"],
                    ["National ID Ref", "•••• •••• 4821"],
                    ["Faculty", "College of Engineering"],
                    ["Program", "Computer Science"],
                    ["Year", "3"],
                    ["Issued", "Sep 2024"],
                    ["Expires", "Aug 2025"],
                  ].map(([k, v]) => (
                    <div key={k} className="flex justify-between border-b border-border/50 pb-2">
                      <span className="text-muted-foreground">{k}</span>
                      <span className="font-medium">{v}</span>
                    </div>
                  ))}
                </div>
              </Card>

              <Card variant="glass" className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Fingerprint className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold">Security Status</h3>
                </div>
                <div className="space-y-3">
                  {[
                    "Biometric verified",
                    "Two-factor authentication",
                    "Dynamic QR token active",
                    "Encrypted credentials",
                  ].map((s) => (
                    <div key={s} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-success" />
                      <span>{s}</span>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2 mt-4">
                  <Button variant="outline" className="flex-1">Refresh QR</Button>
                  <Button variant="default" className="flex-1">Download ID</Button>
                </div>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
