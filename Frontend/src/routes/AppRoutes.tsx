// src/routes/AppRoutes.tsx
import { Route } from "react-router";
import AppLayout from "../layout/AppLayout";
import Home from "../pages/Dashboard/Home";
import UserProfiles from "../pages/UserProfiles";
import Calendar from "../pages/Calendar";
import Blank from "../pages/Blank";

export const AppRoutes = (



  <Route element={<AppLayout />}>
    <Route index path="/" element={<Home />} />
    <Route path="/profile" element={<UserProfiles />} />
    <Route path="/calendar" element={<Calendar />} />
    <Route path="/blank" element={<Blank />} />
  </Route>

);
