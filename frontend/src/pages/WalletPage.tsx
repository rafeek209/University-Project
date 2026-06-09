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
  TrendingUp,
  CreditCard,
  ArrowDownLeft,
  ArrowUpRight,
} from "lucide-react";
import { DashboardNav } from "@/components/dashboard/DashboardNav";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
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

const transactions = [
  { id: 1, description: "Cafeteria Purchase", amount: -12.5, time: "Today, 12:30 PM", category: "Food" },
  { id: 2, description: "Wallet Top-up", amount: 100.0, time: "Yesterday, 9:15 AM", category: "Top-up" },
  { id: 3, description: "Library Fine", amount: -5.0, time: "2 days ago", category: "Fees" },
  { id: 4, description: "Bookstore", amount: -42.0, time: "3 days ago", category: "Books" },
  { id: 5, description: "Wallet Top-up", amount: 50.0, time: "1 week ago", category: "Top-up" },
  { id: 6, description: "Print Center", amount: -3.25, time: "1 week ago", category: "Services" },
];

export default function WalletPage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardNav items={navItems} />
      <div className="ml-64">
        <DashboardHeader userName="Youssef Mostafa" userRole="Computer Science, Year 3" />
        <main className="p-6 space-y-6 max-w-6xl">
          <div>
            <h1 className="text-2xl font-bold">Digital Wallet</h1>
            <p className="text-muted-foreground">Manage your campus payments & transactions</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main balance card */}
            <Card variant="glow" className="p-6 relative overflow-hidden lg:col-span-2">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <Wallet className="h-5 w-5 text-primary" />
                    <span className="text-sm font-medium">Available Balance</span>
                  </div>
                  <Badge variant="active">Active</Badge>
                </div>
                <p className="text-5xl font-bold mb-2">$125.50</p>
                <p className="text-sm text-muted-foreground mb-6">Card •••• 4821</p>
                <div className="grid grid-cols-3 gap-3">
                  <Button variant="default">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Top Up
                  </Button>
                  <Button variant="outline">
                    <CreditCard className="h-4 w-4 mr-2" />
                    Pay
                  </Button>
                  <Button variant="outline">
                    <ArrowUpRight className="h-4 w-4 mr-2" />
                    Send
                  </Button>
                </div>
              </div>
            </Card>

            {/* Fees */}
            <Card variant="glass" className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-sm">University Fees</h3>
                <Badge variant="glass">Due Jan 15</Badge>
              </div>
              <p className="text-3xl font-bold">$4,500.00</p>
              <p className="text-xs text-muted-foreground mb-4">Spring Semester</p>
              <Button variant="glow" className="w-full">Pay Now</Button>
            </Card>
          </div>

          {/* Transactions */}
          <Card variant="glass" className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Transaction History</h3>
              <Button variant="ghost" size="sm">Export</Button>
            </div>
            <div className="space-y-2">
              {transactions.map((tx) => (
                <div
                  key={tx.id}
                  className="flex items-center justify-between p-3 rounded-xl bg-surface-2/50 hover:bg-surface-2 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        tx.amount > 0 ? "bg-success/10" : "bg-muted/20"
                      }`}
                    >
                      {tx.amount > 0 ? (
                        <ArrowDownLeft className="h-5 w-5 text-success" />
                      ) : (
                        <ArrowUpRight className="h-5 w-5 text-muted-foreground" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-sm">{tx.description}</p>
                      <p className="text-xs text-muted-foreground">{tx.time} • {tx.category}</p>
                    </div>
                  </div>
                  <span
                    className={`font-bold ${
                      tx.amount > 0 ? "text-success" : "text-foreground"
                    }`}
                  >
                    {tx.amount > 0 ? "+" : "-"}${Math.abs(tx.amount).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </main>
      </div>
    </div>
  );
}
