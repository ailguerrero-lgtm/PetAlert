import { createBrowserRouter } from "react-router";
import LandingPage from "./pages/LandingPage";
import AdminDashboard from "./pages/AdminDashboard";
import ClientDashboard from "./pages/ClientDashboard";
import RegisterPet from "./pages/RegisterPet";
import Emergencies from "./pages/Emergencies";
import Appointments from "./pages/Appointments";
import MedicalHistory from "./pages/MedicalHistory";
import Reports from "./pages/Reports";
import Pets from "./pages/Pets";
import Users from "./pages/Users";
import Settings from "./pages/Settings";
import ClientAppointments from "./pages/ClientAppointments";
import ClientMedicalHistory from "./pages/ClientMedicalHistory";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: LandingPage,
  },
  {
    path: "/admin",
    Component: AdminDashboard,
  },
  {
    path: "/admin/pets",
    Component: Pets,
  },
  {
    path: "/admin/emergencies",
    Component: Emergencies,
  },
  {
    path: "/admin/medical-history",
    Component: MedicalHistory,
  },
  {
    path: "/admin/appointments",
    Component: Appointments,
  },
  {
    path: "/admin/reports",
    Component: Reports,
  },
  {
    path: "/admin/users",
    Component: Users,
  },
  {
    path: "/admin/settings",
    Component: Settings,
  },
  {
    path: "/client",
    Component: ClientDashboard,
  },
  {
    path: "/client/register-pet",
    Component: RegisterPet,
  },
  {
    path: "/client/appointments",
    Component: ClientAppointments,
  },
  {
    path: "/client/medical-history",
    Component: ClientMedicalHistory,
  },
]);
