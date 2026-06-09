import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import AdminDashboard from "./pages/AdminDashboard";
import StudentPortal from "./pages/StudentPortal";
import DigitalIdPage from "./pages/DigitalIdPage";
import AcademicsPage from "./pages/AcademicsPage";
import WalletPage from "./pages/WalletPage";
import StaffPortal from "./pages/StaffPortal";
import WorkerPortal from "./pages/WorkerPortal";
import VisitorPortal from "./pages/VisitorPortal";
import RequestsPage from "./pages/RequestsPage";
import EventsPage from "./pages/EventsPage";
import CarPermitsPage from "./pages/CarPermitsPage";
import CertificateVerification from "./pages/CertificateVerification";
import NotFound from "./pages/NotFound";
import { LanguageProvider } from "./contexts/LanguageContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/*" element={<AdminDashboard />} />
          <Route path="/student" element={<StudentPortal />} />
          <Route path="/student/id" element={<DigitalIdPage />} />
          <Route path="/student/academics" element={<AcademicsPage />} />
          <Route path="/student/wallet" element={<WalletPage />} />
          <Route path="/student/requests" element={<RequestsPage />} />
          <Route path="/student/events" element={<EventsPage />} />
          <Route path="/student/permits" element={<CarPermitsPage />} />
          <Route path="/staff" element={<StaffPortal />} />
          <Route path="/staff/*" element={<StaffPortal />} />
          <Route path="/worker" element={<WorkerPortal />} />
          <Route path="/worker/*" element={<WorkerPortal />} />
          <Route path="/visitor" element={<VisitorPortal />} />
          <Route path="/verify" element={<CertificateVerification />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
