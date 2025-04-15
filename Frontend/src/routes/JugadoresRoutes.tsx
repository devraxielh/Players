// src/routes/JugadoresRoutes.tsx
import { Route } from "react-router";
import AppLayout from "../layout/AppLayout";
import Jugadores from "../pages/JugadoresPages/Jugadores";
import JugadorDetalle from "../pages/JugadoresPages/JugadorDetalle";
import AddPlayer from "../pages/Players/AddPlayer";

export const JugadoresRoutes = (
  <Route element={<AppLayout />}>
    <Route path="/jugadores" element={<Jugadores />} />
    <Route path="/jugadores/:id" element={<JugadorDetalle />} />
    <Route path="/jugadores/nuevo" element={<AddPlayer />} />
  </Route>
);
