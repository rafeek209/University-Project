import { useState } from "react";
import {
  FileText,
  Search,
  CheckCircle2,
  XCircle,
  Upload,
  QrCode,
  Shield,
  Calendar,
  User,
  GraduationCap,
  Building,
  ArrowLeft,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";

interface VerificationResult {
  status: "verified" | "invalid" | "expired";
  certificate?: {
    id: string;
    type: string;
    holderName: string;
    holderId: string;
    issueDate: string;
    expiryDate?: string;
    program: string;
    institution: string;
    grade?: string;
  };
}

export default function CertificateVerification() {
  const [verificationCode, setVerificationCode] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [result, setResult] = useState<VerificationResult | null>(null);

  const handleVerify = async () => {
    if (!verificationCode.trim()) return;
    
    setIsVerifying(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock result
    if (verificationCode.toUpperCase().startsWith("CERT-")) {
      setResult({
        status: "verified",
        certificate: {
          id: verificationCode.toUpperCase(),
          type: "Bachelor's Degree Certificate",
          holderName: "Mohamed Karim Saad",
          holderId: "STU-2020-12345",
          issueDate: "May 15, 2024",
          program: "Bachelor of Science in Computer Science",
          institution: "Smart University",
          grade: "Magna Cum Laude",
        },
      });
    } else if (verificationCode.toUpperCase().startsWith("EXP-")) {
      setResult({
        status: "expired",
        certificate: {
          id: verificationCode.toUpperCase(),
          type: "Enrollment Certificate",
          holderName: "Mariam Ali",
          holderId: "STU-2019-54321",
          issueDate: "Jan 10, 2023",
          expiryDate: "Jan 10, 2024",
          program: "Bachelor of Arts in Psychology",
          institution: "Smart University",
        },
      });
    } else {
      setResult({
        status: "invalid",
      });
    }
    
    setIsVerifying(false);
  };

  const resetVerification = () => {
    setResult(null);
    setVerificationCode("");
  };

  return (
    <div className="min-h-screen bg-background gradient-mesh">
      {/* Header */}
      <header className="border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                  <Shield className="h-5 w-5 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="font-bold text-lg">Certificate Verification</h1>
                  <p className="text-xs text-muted-foreground">Smart University</p>
                </div>
              </div>
            </div>
            <Badge variant="verified" className="gap-1">
              <Shield className="h-3 w-3" />
              Secure Portal
            </Badge>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12">
        {!result ? (
          <div className="space-y-8">
            {/* Hero */}
            <div className="text-center space-y-4">
              <div className="w-20 h-20 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center shadow-glow-sm">
                <FileText className="h-10 w-10 text-primary" />
              </div>
              <h2 className="text-3xl font-bold">Verify Academic Certificate</h2>
              <p className="text-muted-foreground max-w-md mx-auto">
                Enter the certificate code or scan the QR code to verify the authenticity of any document issued by Smart University.
              </p>
            </div>

            {/* Verification Methods */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
              {/* Manual Entry */}
              <Card variant="glass" className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Search className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Enter Code</h3>
                    <p className="text-xs text-muted-foreground">Type the certificate ID</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <input
                    type="text"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    placeholder="e.g., CERT-2024-45821"
                    className="w-full h-12 px-4 rounded-xl bg-surface-2 border border-border text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 font-mono uppercase"
                  />
                  <Button 
                    variant="default" 
                    className="w-full" 
                    onClick={handleVerify}
                    disabled={isVerifying || !verificationCode.trim()}
                  >
                    {isVerifying ? "Verifying..." : "Verify Certificate"}
                  </Button>
                </div>
              </Card>

              {/* QR Scan */}
              <Card variant="glass" className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                    <QrCode className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Scan QR Code</h3>
                    <p className="text-xs text-muted-foreground">Use camera to scan</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="h-32 rounded-xl bg-surface-2 border-2 border-dashed border-border flex items-center justify-center">
                    <div className="text-center">
                      <QrCode className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">Camera access required</p>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full">
                    Open Camera
                  </Button>
                </div>
              </Card>
            </div>

            {/* Upload PDF */}
            <Card variant="glass" className="p-6 max-w-2xl mx-auto">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-success/10 flex items-center justify-center">
                  <Upload className="h-5 w-5 text-success" />
                </div>
                <div>
                  <h3 className="font-semibold">Upload Certificate PDF</h3>
                  <p className="text-xs text-muted-foreground">We'll extract and verify the QR code automatically</p>
                </div>
              </div>
              <div className="h-32 rounded-xl bg-surface-2 border-2 border-dashed border-border flex items-center justify-center cursor-pointer hover:border-primary/50 transition-colors">
                <div className="text-center">
                  <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">Drop PDF here or click to browse</p>
                  <p className="text-xs text-muted-foreground mt-1">Max file size: 10MB</p>
                </div>
              </div>
            </Card>

            {/* Sample Codes */}
            <div className="text-center space-y-2">
              <p className="text-sm text-muted-foreground">Try these sample codes for demo:</p>
              <div className="flex justify-center gap-2">
                <Badge 
                  variant="glass" 
                  className="cursor-pointer hover:bg-surface-2"
                  onClick={() => setVerificationCode("CERT-2024-45821")}
                >
                  CERT-2024-45821 (Valid)
                </Badge>
                <Badge 
                  variant="glass" 
                  className="cursor-pointer hover:bg-surface-2"
                  onClick={() => setVerificationCode("EXP-2023-12345")}
                >
                  EXP-2023-12345 (Expired)
                </Badge>
                <Badge 
                  variant="glass" 
                  className="cursor-pointer hover:bg-surface-2"
                  onClick={() => setVerificationCode("FAKE-1234")}
                >
                  FAKE-1234 (Invalid)
                </Badge>
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-2xl mx-auto space-y-6">
            {/* Result Status */}
            <Card 
              variant={result.status === "verified" ? "glow" : "glass"}
              className={`p-8 text-center ${
                result.status === "verified" 
                  ? "border-success/50" 
                  : result.status === "expired" 
                    ? "border-warning/50" 
                    : "border-destructive/50"
              }`}
            >
              <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-4 ${
                result.status === "verified" 
                  ? "bg-success/20" 
                  : result.status === "expired" 
                    ? "bg-warning/20" 
                    : "bg-destructive/20"
              }`}>
                {result.status === "verified" ? (
                  <CheckCircle2 className="h-10 w-10 text-success" />
                ) : result.status === "expired" ? (
                  <Calendar className="h-10 w-10 text-warning" />
                ) : (
                  <XCircle className="h-10 w-10 text-destructive" />
                )}
              </div>
              
              <h2 className={`text-2xl font-bold mb-2 ${
                result.status === "verified" 
                  ? "text-success" 
                  : result.status === "expired" 
                    ? "text-warning" 
                    : "text-destructive"
              }`}>
                {result.status === "verified" 
                  ? "Certificate Verified" 
                  : result.status === "expired" 
                    ? "Certificate Expired" 
                    : "Certificate Invalid"}
              </h2>
              
              <p className="text-muted-foreground">
                {result.status === "verified" 
                  ? "This certificate is authentic and currently valid." 
                  : result.status === "expired" 
                    ? "This certificate was valid but has now expired." 
                    : "This certificate could not be verified. It may be fake or the code is incorrect."}
              </p>
            </Card>

            {/* Certificate Details */}
            {result.certificate && (
              <Card variant="glass" className="p-6">
                <h3 className="font-semibold mb-4">Certificate Details</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-surface-2/50">
                      <FileText className="h-5 w-5 text-primary" />
                      <div>
                        <p className="text-xs text-muted-foreground">Certificate Type</p>
                        <p className="font-medium text-sm">{result.certificate.type}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-surface-2/50">
                      <User className="h-5 w-5 text-primary" />
                      <div>
                        <p className="text-xs text-muted-foreground">Holder Name</p>
                        <p className="font-medium text-sm">{result.certificate.holderName}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-surface-2/50">
                      <GraduationCap className="h-5 w-5 text-primary" />
                      <div>
                        <p className="text-xs text-muted-foreground">Program</p>
                        <p className="font-medium text-sm">{result.certificate.program}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-surface-2/50">
                      <Building className="h-5 w-5 text-primary" />
                      <div>
                        <p className="text-xs text-muted-foreground">Institution</p>
                        <p className="font-medium text-sm">{result.certificate.institution}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-surface-2/50">
                      <Calendar className="h-5 w-5 text-primary" />
                      <div>
                        <p className="text-xs text-muted-foreground">Issue Date</p>
                        <p className="font-medium text-sm">{result.certificate.issueDate}</p>
                      </div>
                    </div>
                    {result.certificate.grade && (
                      <div className="flex items-center gap-3 p-3 rounded-xl bg-surface-2/50">
                        <Shield className="h-5 w-5 text-primary" />
                        <div>
                          <p className="text-xs text-muted-foreground">Distinction</p>
                          <p className="font-medium text-sm">{result.certificate.grade}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            )}

            {/* Actions */}
            <div className="flex justify-center gap-4">
              <Button variant="outline" onClick={resetVerification}>
                Verify Another
              </Button>
              {result.status === "verified" && (
                <Button variant="default">
                  Download Report
                </Button>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-12">
        <div className="max-w-4xl mx-auto px-6 py-6 text-center text-sm text-muted-foreground">
          <p>This verification portal is operated by Smart University.</p>
          <p>For questions, contact registrar@smartuniversity.edu</p>
        </div>
      </footer>
    </div>
  );
}
