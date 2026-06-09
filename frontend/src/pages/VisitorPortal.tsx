import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  UserPlus,
  Building2,
  Calendar,
  Clock,
  User,
  Mail,
  Phone,
  FileText,
  QrCode,
  CheckCircle2,
  Shield,
  ArrowLeft,
  Car,
} from "lucide-react";

interface VisitorFormData {
  fullName: string;
  email: string;
  phone: string;
  company: string;
  purpose: string;
  hostName: string;
  hostDepartment: string;
  building: string;
  visitDate: string;
  visitTime: string;
  vehiclePlate: string;
}

export default function VisitorPortal() {
  const navigate = useNavigate();
  const [step, setStep] = useState<"form" | "pass">("form");
  const [formData, setFormData] = useState<VisitorFormData>({
    fullName: "",
    email: "",
    phone: "",
    company: "",
    purpose: "",
    hostName: "",
    hostDepartment: "",
    building: "",
    visitDate: "",
    visitTime: "",
    vehiclePlate: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("pass");
  };

  const generateVisitorId = () => {
    return `VIS-${Date.now().toString(36).toUpperCase()}`;
  };

  if (step === "pass") {
    const visitorId = generateVisitorId();
    
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <div className="w-full max-w-md animate-scale-in">
          {/* Digital Visitor Pass - styled like a boarding pass */}
          <Card variant="glass" className="overflow-hidden">
            {/* Header */}
            <div className="bg-primary p-6 text-primary-foreground">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Building2 className="h-6 w-6" />
                  <span className="font-bold text-lg">PathPort</span>
                </div>
                <Badge className="bg-white/20 text-white border-white/30">
                  VISITOR PASS
                </Badge>
              </div>
              <p className="text-sm text-white/80">Campus Access Authorization</p>
            </div>

            {/* Decorative divider */}
            <div className="relative">
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-8 bg-background rounded-r-full" />
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-8 bg-background rounded-l-full" />
              <div className="border-t border-dashed border-border mx-6" />
            </div>

            {/* Visitor Info */}
            <div className="p-6 space-y-6">
              {/* QR Code */}
              <div className="flex justify-center">
                <div className="relative">
                  <div className="absolute inset-0 rounded-2xl animate-pulse-glow" />
                  <div className="w-48 h-48 bg-white rounded-2xl p-4 relative">
                    <svg viewBox="0 0 200 200" className="w-full h-full">
                      <rect x="0" y="0" width="200" height="200" fill="white" />
                      {/* Simplified QR pattern */}
                      <g fill="hsl(222, 47%, 11%)">
                        {Array.from({ length: 10 }).map((_, i) =>
                          Array.from({ length: 10 }).map((_, j) => (
                            Math.random() > 0.4 && (
                              <rect
                                key={`${i}-${j}`}
                                x={j * 18 + 10}
                                y={i * 18 + 10}
                                width="14"
                                height="14"
                                rx="2"
                              />
                            )
                          ))
                        )}
                      </g>
                      {/* Corner markers */}
                      <rect x="10" y="10" width="45" height="45" rx="6" fill="none" stroke="hsl(187, 100%, 40%)" strokeWidth="4" />
                      <rect x="145" y="10" width="45" height="45" rx="6" fill="none" stroke="hsl(187, 100%, 40%)" strokeWidth="4" />
                      <rect x="10" y="145" width="45" height="45" rx="6" fill="none" stroke="hsl(187, 100%, 40%)" strokeWidth="4" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Visitor Details */}
              <div className="space-y-4">
                <div className="text-center">
                  <p className="text-xl font-bold">{formData.fullName}</p>
                  <p className="text-sm text-muted-foreground">{formData.company}</p>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground text-xs">VISITOR ID</p>
                    <p className="font-mono font-bold">{visitorId}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs">VALID FOR</p>
                    <p className="font-bold">{formData.visitDate}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs">HOST</p>
                    <p className="font-medium">{formData.hostName}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs">BUILDING</p>
                    <p className="font-medium">{formData.building}</p>
                  </div>
                </div>

                {formData.vehiclePlate && (
                  <div className="flex items-center gap-2 p-3 rounded-xl bg-surface-2">
                    <Car className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Vehicle: {formData.vehiclePlate}</span>
                  </div>
                )}
              </div>

              {/* Status */}
              <div className="flex items-center justify-center gap-2 p-3 rounded-xl bg-success/10 border border-success/30">
                <CheckCircle2 className="h-5 w-5 text-success" />
                <span className="font-medium text-success">Pass Approved</span>
              </div>

              {/* Security Note */}
              <div className="flex items-start gap-2 text-xs text-muted-foreground">
                <Shield className="h-4 w-4 shrink-0 mt-0.5" />
                <p>
                  This digital pass must be presented at all security checkpoints.
                  Valid only for the date and location specified.
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 pt-0 space-y-3">
              <Button variant="glow" className="w-full" onClick={() => window.print()}>
                <QrCode className="h-4 w-4 mr-2" />
                Save Pass
              </Button>
              <Button variant="outline" className="w-full" onClick={() => navigate("/")}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Return Home
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 gradient-mesh pointer-events-none" />

      {/* Header */}
      <header className="relative z-10 border-b border-border/50 bg-background/50 backdrop-blur-xl">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <button onClick={() => navigate("/")} className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-glow-sm">
              <Building2 className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-bold text-xl gradient-text">PathPort</h1>
              <p className="text-xs text-muted-foreground">Visitor Registration</p>
            </div>
          </button>
          
          <Badge variant="glass" className="gap-1.5">
            <UserPlus className="h-3 w-3" />
            New Visitor
          </Badge>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-6 py-12">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Visitor Registration</h1>
            <p className="text-muted-foreground">
              Complete the form below to request campus access
            </p>
          </div>

          <Card variant="glass" className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div>
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <User className="h-4 w-4 text-primary" />
                  Personal Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Full Name *</label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      required
                      className="w-full h-11 px-4 rounded-xl bg-surface-2 border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                      placeholder="Ahmed Mohamed"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Company/Organization</label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full h-11 px-4 rounded-xl bg-surface-2 border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                      placeholder="ABC Corp"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full h-11 px-4 rounded-xl bg-surface-2 border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Phone *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full h-11 px-4 rounded-xl bg-surface-2 border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                </div>
              </div>

              {/* Visit Details */}
              <div>
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-primary" />
                  Visit Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Host Name *</label>
                    <input
                      type="text"
                      name="hostName"
                      value={formData.hostName}
                      onChange={handleInputChange}
                      required
                      className="w-full h-11 px-4 rounded-xl bg-surface-2 border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                      placeholder="Dr. Mariam Saeed"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Department</label>
                    <input
                      type="text"
                      name="hostDepartment"
                      value={formData.hostDepartment}
                      onChange={handleInputChange}
                      className="w-full h-11 px-4 rounded-xl bg-surface-2 border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                      placeholder="Computer Science"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Building *</label>
                    <select
                      name="building"
                      value={formData.building}
                      onChange={handleInputChange}
                      required
                      className="w-full h-11 px-4 rounded-xl bg-surface-2 border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                    >
                      <option value="">Select building</option>
                      <option value="Main Building">Main Building</option>
                      <option value="Engineering Block">Engineering Block</option>
                      <option value="Science Center">Science Center</option>
                      <option value="Library">Library</option>
                      <option value="Student Center">Student Center</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Visit Date *</label>
                    <input
                      type="date"
                      name="visitDate"
                      value={formData.visitDate}
                      onChange={handleInputChange}
                      required
                      className="w-full h-11 px-4 rounded-xl bg-surface-2 border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-medium">Purpose of Visit *</label>
                    <textarea
                      name="purpose"
                      value={formData.purpose}
                      onChange={handleInputChange}
                      required
                      rows={3}
                      className="w-full px-4 py-3 rounded-xl bg-surface-2 border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                      placeholder="Describe the purpose of your visit..."
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-medium flex items-center gap-2">
                      <Car className="h-4 w-4" />
                      Vehicle Plate (if driving)
                    </label>
                    <input
                      type="text"
                      name="vehiclePlate"
                      value={formData.vehiclePlate}
                      onChange={handleInputChange}
                      className="w-full h-11 px-4 rounded-xl bg-surface-2 border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                      placeholder="ABC-1234"
                    />
                  </div>
                </div>
              </div>

              {/* Terms */}
              <div className="flex items-start gap-3 p-4 rounded-xl bg-surface-2/50">
                <input
                  type="checkbox"
                  id="terms"
                  required
                  className="mt-1 w-4 h-4 rounded border-border bg-surface-2"
                />
                <label htmlFor="terms" className="text-sm text-muted-foreground">
                  I agree to comply with all campus security policies and understand that this
                  registration is subject to approval by the host and security department.
                </label>
              </div>

              {/* Submit */}
              <Button type="submit" variant="glow" size="xl" className="w-full">
                <FileText className="h-5 w-5 mr-2" />
                Submit Registration
              </Button>
            </form>
          </Card>
        </div>
      </main>
    </div>
  );
}
