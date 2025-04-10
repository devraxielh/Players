// src/App.tsx
import { BrowserRouter as Router } from "react-router-dom";
import { ScrollToTop } from "./components/common/ScrollToTop";
import AppRouter from "./routes";

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <AppRouter />
    </Router>
  );
}
