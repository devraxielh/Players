// src/routes/index.tsx
import { Routes } from "react-router";
import { AppRoutes } from "./AppRoutes";
import { AuthRoutes } from "./AuthRoutes";
import { JugadoresRoutes } from "./JugadoresRoutes";

export default function AppRouter() {
  return(
  <Routes>
            {AppRoutes}
            {AuthRoutes}
            {JugadoresRoutes}
        </Routes>
)}
