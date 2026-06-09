import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LanguageToggle } from "@/components/LanguageToggle";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Shield,
  GraduationCap,
  Users,
  Briefcase,
  UserPlus,
  Settings,
  Lock,
  Fingerprint,
  QrCode,
  ArrowRight,
  CheckCircle2,
  Building2,
} from "lucide-react";

export default function Index() {
  const { t } = useLanguage();

  const portals = [
    {
      id: "student",
      title: t("student_portal"),
      description: t("student_desc"),
      icon: GraduationCap,
      href: "/student",
      color: "from-cyan-500 to-blue-500",
      features: ["QR", "Wallet", "Academics"],
    },
    {
      id: "staff",
      title: t("staff_portal"),
      description: t("staff_desc"),
      icon: Briefcase,
      href: "/staff",
      color: "from-emerald-500 to-teal-500",
      features: ["QR", "Schedule", "Attendance"],
    },
    {
      id: "worker",
      title: t("worker_portal"),
      description: t("worker_desc"),
      icon: Users,
      href: "/worker",
      color: "from-orange-500 to-amber-500",
      features: ["QR", "Shifts", "Attendance"],
    },
    {
      id: "visitor",
      title: t("visitor_portal"),
      description: t("visitor_desc"),
      icon: UserPlus,
      href: "/visitor",
      color: "from-purple-500 to-pink-500",
      features: ["Registration", "Pass", "Visit"],
    },
    {
      id: "verify",
      title: t("verify_cert"),
      description: t("verify_desc"),
      icon: Shield,
      href: "/verify",
      color: "from-teal-500 to-cyan-500",
      features: ["QR Scan", "Upload", "Verify"],
    },
    {
      id: "admin",
      title: t("admin_dashboard"),
      description: t("admin_desc"),
      icon: Settings,
      href: "/admin",
      color: "from-red-500 to-orange-500",
      features: ["Analytics", "Security", "Reports"],
      premium: true,
    },
  ];

  const securityFeatures = [
    { icon: Lock, label: t("end_to_end") },
    { icon: Fingerprint, label: t("biometric") },
    { icon: QrCode, label: t("dynamic_qr") },
    { icon: Shield, label: t("zero_trust") },
  ];

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background mesh */}
      <div className="fixed inset-0 gradient-mesh pointer-events-none" />

      {/* Animated grid */}
      <div className="fixed inset-0 opacity-[0.02] pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-border/50 bg-background/50 backdrop-blur-xl">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-glow-sm">
              <Building2 className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-bold text-xl gradient-text">PathPort</h1>
              <p className="text-xs text-muted-foreground">{t("brand_tagline")}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <LanguageToggle />
            <Badge variant="verified" className="gap-1.5 hidden sm:flex">
              <CheckCircle2 className="h-3 w-3" />
              {t("system_online")}
            </Badge>
            <Link to="/admin">
              <Button variant="outline" size="sm">
                {t("admin_access")}
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 py-20 lg:py-32">
        <div className="container mx-auto px-6 text-center">
          <div className="animate-fade-in">
            <Badge variant="glass" className="mb-6 gap-2 px-4 py-2">
              <Shield className="h-4 w-4 text-primary" />
              {t("hero_badge")}
            </Badge>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in delay-100">
            {t("hero_title_1")}
            <br />
            <span className="gradient-text">{t("hero_title_2")}</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 animate-fade-in delay-200">
            {t("hero_subtitle")}
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-16 animate-fade-in delay-300">
            {securityFeatures.map((feature) => (
              <div
                key={feature.label}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-surface-2/50 border border-border/50 text-sm"
              >
                <feature.icon className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground">{feature.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portals Grid */}
      <section className="relative z-10 pb-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">{t("select_portal")}</h2>
            <p className="text-muted-foreground">{t("select_portal_sub")}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {portals.map((portal, index) => {
              const Icon = portal.icon;
              return (
                <Link
                  key={portal.id}
                  to={portal.href}
                  className="group animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="glass-card-hover p-6 h-full relative overflow-hidden">
                    <div
                      className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 bg-gradient-to-br ${portal.color}`}
                    />

                    {portal.premium && (
                      <Badge variant="warning" className="absolute top-4 right-4">
                        {t("admin_only")}
                      </Badge>
                    )}

                    <div className="relative z-10">
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${portal.color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="h-7 w-7 text-white" />
                      </div>

                      <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                        {portal.title}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-4">
                        {portal.description}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {portal.features.map((feature) => (
                          <span
                            key={feature}
                            className="text-xs px-2 py-1 rounded-md bg-surface-2 text-muted-foreground"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-2 text-primary font-medium text-sm">
                        <span>{t("enter_portal")}</span>
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform rtl:rotate-180" />
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border/50 py-8">
        <div className="container mx-auto px-6 text-center">
          <p className="text-sm text-muted-foreground">{t("footer_rights")}</p>
          <p className="text-xs text-muted-foreground mt-2">{t("footer_secured")}</p>
        </div>
      </footer>
    </div>
  );
}
