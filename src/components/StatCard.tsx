import { ReactNode } from "react";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  status?: "online" | "warning" | "critical" | "offline";
}

export function StatCard({ title, value, subtitle, icon: Icon, trend, status = "online" }: StatCardProps) {
  const getStatusClass = () => {
    switch (status) {
      case "online": return "status-online";
      case "warning": return "status-warning";
      case "critical": return "status-critical";
      case "offline": return "status-offline";
      default: return "status-online";
    }
  };

  const getStatusIndicator = () => {
    switch (status) {
      case "online": return "signal-green";
      case "warning": return "signal-yellow";
      case "critical": return "signal-red";
      case "offline": return "signal-indicator bg-muted";
      default: return "signal-green";
    }
  };

  return (
    <div className="control-card">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <Icon className="h-5 w-5 text-primary" />
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
          </div>
          
          <div className="space-y-1">
            <p className="text-3xl font-bold text-foreground">{value}</p>
            {subtitle && (
              <p className="text-sm text-muted-foreground">{subtitle}</p>
            )}
          </div>
          
          {trend && (
            <div className="flex items-center gap-1 mt-2">
              <span className={`text-sm font-medium ${
                trend.isPositive ? "text-status-online" : "text-status-critical"
              }`}>
                {trend.isPositive ? "+" : ""}{trend.value}%
              </span>
              <span className="text-xs text-muted-foreground">vs last hour</span>
            </div>
          )}
        </div>
        
        <div className="flex flex-col items-end gap-2">
          <div className={`signal-indicator ${getStatusIndicator()} pulse-glow`}></div>
          <div className={getStatusClass()}>
            {status}
          </div>
        </div>
      </div>
    </div>
  );
}