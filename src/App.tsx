import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import AboutPage from "./pages/AboutPage";
import AdmissionPage from "./pages/AdmissionPage";
import DepartmentPage from "./pages/DepartmentPage";
import FacultyPage from "./pages/FacultyPage";
import ExaminationPage from "./pages/ExaminationPage";
import PlacementsPage from "./pages/PlacementsPage";
import FeePayment from "./pages/FeePayment";
import CampusPage from "./pages/CampusPage";
import ResourcesPage from "./pages/ResourcesPage";
import Login from "./pages/Login";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import FacultyDashboard from "./pages/faculty/FacultyDashboard";
import StudentDashboard from "./pages/student/StudentDashboard";
import NotFound from "./pages/NotFound";
import ScrollToTopOnNav from "./components/ScrollToTopOnNav";
import Conference from "./pages/Conference";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTopOnNav />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/about/:section" element={<AboutPage />} />
            <Route path="/admission" element={<AdmissionPage />} />
            <Route path="/admission/:section" element={<AdmissionPage />} />
            <Route path="/department" element={<DepartmentPage />} />
            <Route path="/department/:dept" element={<DepartmentPage />} />
            <Route path="/faculty" element={<FacultyPage />} />
            <Route path="/examination" element={<ExaminationPage />} />
            <Route path="/examination/:section" element={<ExaminationPage />} />
            <Route path="/placements" element={<PlacementsPage />} />
            <Route path="/placements/:section" element={<PlacementsPage />} />
            <Route path="/fee-payment" element={<FeePayment />} />
            <Route path="/campus" element={<CampusPage />} />
            <Route path="/campus/:section" element={<CampusPage />} />
            <Route path="/resources" element={<ResourcesPage />} />
            <Route path="/resources/:section" element={<ResourcesPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/faculty/dashboard" element={<FacultyDashboard />} />
            <Route path="/student/dashboard" element={<StudentDashboard />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/conference" element={<Conference />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
