import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import FishFeeder from "./pages/FishFeeder";
import { ModeToggle } from "@/components/ModeToggle"; // Import ModeToggle

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="relative min-h-screen"> {/* Added relative positioning for ModeToggle */}
          <div className="absolute top-4 right-4 z-50"> {/* Position ModeToggle globally */}
            <ModeToggle />
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
  </QueryClientProvider>
);

export default App;