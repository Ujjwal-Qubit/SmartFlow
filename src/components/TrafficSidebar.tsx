import { NavLink, useLocation } from "react-router-dom";
import {
  Activity,
  BarChart3,
  Camera,
  Clock,
  Map,
  AlertTriangle,
  History,
  Home,
  Zap,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const navigationItems = [
  { title: "Overview", url: "/", icon: Home },
  { title: "Signal Timings", url: "/signals", icon: Clock },
  { title: "Traffic Flow", url: "/flow", icon: Activity },
  { title: "Congestion Density", url: "/congestion", icon: Map },
  { title: "Live Cameras", url: "/cameras", icon: Camera },
  { title: "Bottleneck Reports", url: "/bottlenecks", icon: AlertTriangle },
  { title: "Historical Analysis", url: "/history", icon: History },
];

export function TrafficSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path;
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive 
      ? "bg-primary/10 text-primary border-l-2 border-primary font-medium data-glow" 
      : "hover:bg-muted/50 text-sidebar-accent-foreground hover:text-foreground transition-colors";

  return (
    <Sidebar
      className={`${collapsed ? "w-16" : "w-64"} border-r-4 border-control-panel-border bg-sidebar transition-all duration-300`}
      collapsible="icon"
    >
      <SidebarContent>
        {/* Header */}
        <div className={`p-6 border-b-4 border-control-panel-border ${collapsed ? "px-4" : ""}`}>
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 border border-primary/20">
              <Zap className="h-4 w-4 text-primary" />
            </div>
            {!collapsed && (
              <div>
                <h2 className="text-lg font-semibold text-foreground">SmartFlow</h2>
                <p className="text-xs text-muted-foreground">AI Dashboard</p>
              </div>
            )}
          </div>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel className={collapsed ? "hidden" : ""}>
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="mb-1">
                    <NavLink 
                      to={item.url} 
                      end={item.url === "/"}
                      className={getNavCls}
                    >
                      <item.icon className="h-5 w-5" />
                      {!collapsed && <span className="ml-3">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Status Indicator */}
        {!collapsed && (
          <div className="mt-auto p-6">
            <div className="control-card p-4">
              <div className="flex items-center gap-3">
                <div className="signal-indicator signal-green pulse-glow"></div>
                <div>
                  <p className="text-sm font-medium">System Status</p>
                  <p className="text-xs text-muted-foreground">All systems operational</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </SidebarContent>
    </Sidebar>
  );
}