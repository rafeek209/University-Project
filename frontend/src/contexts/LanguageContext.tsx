import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export type Language = "en" | "ar";

type Translations = Record<string, { en: string; ar: string }>;

const translations: Translations = {
  brand_tagline: { en: "Smart Campus System", ar: "نظام الحرم الذكي" },
  system_online: { en: "System Online", ar: "النظام متصل" },
  admin_access: { en: "Admin Access", ar: "دخول المسؤول" },
  hero_badge: { en: "Enterprise-Grade Campus Security", ar: "أمان جامعي على مستوى المؤسسات" },
  hero_title_1: { en: "The Future of", ar: "مستقبل" },
  hero_title_2: { en: "Campus Management", ar: "إدارة الحرم الجامعي" },
  hero_subtitle: {
    en: "A unified digital ecosystem for identity, access, payments, and academics. Secure. Smart. Seamless.",
    ar: "منظومة رقمية موحدة للهوية والوصول والمدفوعات والشؤون الأكاديمية. آمن. ذكي. سلس.",
  },
  select_portal: { en: "Select Your Portal", ar: "اختر بوابتك" },
  select_portal_sub: {
    en: "Choose your role to access the appropriate dashboard",
    ar: "اختر دورك للوصول إلى لوحة التحكم المناسبة",
  },
  enter_portal: { en: "Enter Portal", ar: "ادخل البوابة" },
  admin_only: { en: "Admin Only", ar: "للمسؤول فقط" },
  footer_rights: {
    en: "© 2024 PathPort Campus System. All rights reserved.",
    ar: "© 2024 نظام باسبورت الجامعي. جميع الحقوق محفوظة.",
  },
  footer_secured: {
    en: "Secured by enterprise-grade encryption • ISO 27001 Compliant",
    ar: "مؤمن بتشفير على مستوى المؤسسات • متوافق مع ISO 27001",
  },
  end_to_end: { en: "End-to-End Encryption", ar: "تشفير من طرف إلى طرف" },
  biometric: { en: "Biometric Support", ar: "دعم القياسات الحيوية" },
  dynamic_qr: { en: "Dynamic QR Tokens", ar: "رموز QR ديناميكية" },
  zero_trust: { en: "Zero-Trust Security", ar: "أمان الثقة الصفرية" },
  // Portal cards
  student_portal: { en: "Student Portal", ar: "بوابة الطالب" },
  student_desc: { en: "Access your QR pass, grades, wallet & more", ar: "الوصول إلى رمز QR والدرجات والمحفظة" },
  staff_portal: { en: "Staff Portal", ar: "بوابة الموظفين" },
  staff_desc: { en: "Manage your schedule, attendance & access", ar: "إدارة جدولك وحضورك ووصولك" },
  worker_portal: { en: "Worker Portal", ar: "بوابة العمال" },
  worker_desc: { en: "Simple shift & attendance management", ar: "إدارة المناوبات والحضور" },
  visitor_portal: { en: "Visitor Portal", ar: "بوابة الزوار" },
  visitor_desc: { en: "Register for campus access", ar: "التسجيل للوصول إلى الحرم" },
  verify_cert: { en: "Verify Certificate", ar: "التحقق من الشهادة" },
  verify_desc: { en: "Verify academic documents & credentials", ar: "التحقق من الوثائق والمؤهلات الأكاديمية" },
  admin_dashboard: { en: "Admin Dashboard", ar: "لوحة المسؤول" },
  admin_desc: { en: "Command center for campus management", ar: "مركز قيادة إدارة الحرم" },
};

interface LanguageContextValue {
  lang: Language;
  setLang: (l: Language) => void;
  toggle: () => void;
  t: (key: keyof typeof translations) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>(() => {
    if (typeof window === "undefined") return "en";
    return (localStorage.getItem("lang") as Language) || "en";
  });

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    localStorage.setItem("lang", lang);
  }, [lang]);

  const setLang = (l: Language) => setLangState(l);
  const toggle = () => setLangState((p) => (p === "en" ? "ar" : "en"));
  const t = (key: keyof typeof translations) => translations[key]?.[lang] ?? String(key);

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggle, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
