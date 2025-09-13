import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { TrafficSidebar } from "./TrafficSidebar";
import { ThemeToggle } from "./ThemeToggle";
import { ReactNode } from "react";

interface DashboardProps {
  children: ReactNode;
}

export function Dashboard({ children }: DashboardProps) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <TrafficSidebar />
        
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="h-16 border-b-4 border-control-panel-border bg-card/50 backdrop-blur-sm">
            <div className="flex items-center justify-between h-full px-6">
              <div className="flex items-center gap-4">
                <SidebarTrigger className="text-foreground hover:text-primary transition-colors" />
                <div>
                  <h1 className="text-xl font-semibold text-foreground">Traffic Control Center</h1>
                  <p className="text-sm text-muted-foreground">AI-Powered Urban Traffic Management</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="status-online">
                  <div className="signal-indicator signal-green pulse-glow"></div>
                  System Online
                </div>
                <div className="text-sm text-muted-foreground">
                  Last updated: {new Date().toLocaleTimeString()}
                </div>
                <ThemeToggle />
              </div>
            </div>
          </header>
          
          {/* Main Content */}
          <main className="flex-1 p-6">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}