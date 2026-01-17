import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import FishFeeder from "./pages/FishFeeder";
import { ThemeProvider } from "./components/theme-provider"; // Import ThemeProvider
import { ThemeToggle } from "./components/ThemeToggle"; // Import ThemeToggle

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme"> {/* Wrap with ThemeProvider */}
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="relative min-h-screen"> {/* Added a div for positioning */}
            <div className="absolute top-4 right-4 z-10"> {/* Position the toggle */}
              <ThemeToggle />
            </div>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/fish-feeder" element={<FishFeeder />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;