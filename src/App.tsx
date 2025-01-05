import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// Change this line:
import { HashRouter, Routes, Route } from "react-router-dom"; // Use HashRouter instead of BrowserRouter
import Index from "./pages/Index";
import ButtonPage from "./components/ButtonPage";

const queryClient = new QueryClient();

const buttonRoutes = [
  "Joule Victorum",
  "Joule Samsung",
  "Joule Modular Air",
  "DeDietrich Strateo",
  "LG Thermia",
  "Hitachi Yutaki",
  "Panasonic Aquarea",
  "Grant Areona",
  "Itec Thermia",
  "Smart Control",
  "System Status",
].map((name) => ({
  path: `/${name.toLowerCase().replace(/\s+/g, "-")}`,
  element: <ButtonPage title={name} />,
}));

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      {/* Change BrowserRouter to HashRouter here */}
      <HashRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/pdf-files" element={<ButtonPage title="PDF Files" />} />
          {buttonRoutes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
        </Routes>
      </HashRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
