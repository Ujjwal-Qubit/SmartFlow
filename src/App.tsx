import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Dashboard } from "@/components/Dashboard";
import Overview from "./pages/Overview";
import LiveCameraFeed from "./pages/LiveCameraFeed";
import CongestionDensity from "./pages/CongestionDensity";
import SignalTimings from "./pages/SignalTimings";
import NotFound from "./pages/NotFound";
import HistoricalAnalysis from './components/HistoricalAnalysis';
import BottleneckReport from "./components/BottleneckReport";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
        <Dashboard>
          <Routes>
            <Route path="/" element={<Overview />} />
            <Route path="/signals" element={<SignalTimings />} />
            <Route path="/cameras" element={<LiveCameraFeed />} />
            <Route path="/congestion" element={<CongestionDensity />} />
            <Route path="/flow" element={<div className="p-8 text-center text-muted-foreground">Traffic Flow page coming soon...</div>} />
            <Route path="/bottlenecks" element={<BottleneckReport />} />
            <Route path="/history" element={<HistoricalAnalysis />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Dashboard>
      </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
