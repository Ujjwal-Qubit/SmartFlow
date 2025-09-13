import { StatCard } from "@/components/StatCard";
import { Car, Clock, AlertTriangle, TrendingUp, MapPin, Activity } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, BarChart, Bar } from "recharts";

// Mock data for charts
const trafficFlowData = [
  { time: "06:00", vehicles: 1200, avgSpeed: 45 },
  { time: "07:00", vehicles: 2800, avgSpeed: 35 },
  { time: "08:00", vehicles: 4200, avgSpeed: 25 },
  { time: "09:00", vehicles: 3600, avgSpeed: 40 },
  { time: "10:00", vehicles: 2400, avgSpeed: 50 },
  { time: "11:00", vehicles: 2800, avgSpeed: 48 },
  { time: "12:00", vehicles: 3200, avgSpeed: 42 },
];

const intersectionData = [
  { name: "Rajpath (Kartavya Path)", congestion: 85, vehicles: 240 },
  { name: "Janpath", congestion: 72, vehicles: 180 },
  { name: "Outer Ring Road", congestion: 65, vehicles: 160 },
  { name: "Mathura Road", congestion: 58, vehicles: 140 },
  { name: "Aurobindo Marg", congestion: 45, vehicles: 120 },
];

export default function Overview() {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Traffic Overview</h1>
          <p className="text-muted-foreground">Real-time city traffic monitoring and control</p>
        </div>
        <div className="flex items-center gap-2 control-card py-2 px-4">
          <div className="signal-indicator signal-green pulse-glow"></div>
          <span className="text-sm font-medium">AI System Active</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Vehicles"
          value="24,672"
          subtitle="Currently in traffic network"
          icon={Car}
          trend={{ value: 12, isPositive: true }}
          status="online"
        />
        
        <StatCard
          title="Average Speed"
          value="42 mph"
          subtitle="City-wide average"
          icon={TrendingUp}
          trend={{ value: -5, isPositive: false }}
          status="warning"
        />
        
        <StatCard
          title="Active Signals"
          value="158/160"
          subtitle="Systems operational"
          icon={Clock}
          status="online"
        />
        
        <StatCard
          title="Critical Alerts"
          value="3"
          subtitle="Require immediate attention"
          icon={AlertTriangle}
          status="critical"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Traffic Flow Chart */}
        <div className="control-card">
          <div className="flex items-center gap-2 mb-6">
            <Activity className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold">Traffic Flow - Last 7 Hours</h3>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trafficFlowData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="time" 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <Line 
                  type="monotone" 
                  dataKey="vehicles" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={3}
                  dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Congestion Heatmap */}
        <div className="control-card">
          <div className="flex items-center gap-2 mb-6">
            <MapPin className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold">Top Congested Intersections</h3>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={intersectionData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  type="number"
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <YAxis 
                  type="category"
                  dataKey="name"
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={10}
                  width={100}
                />
                <Bar 
                  dataKey="congestion" 
                  fill="hsl(var(--signal-red))"
                  radius={[0, 4, 4, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="control-card">
        <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center gap-3 p-4 bg-primary/10 border border-primary/20 rounded-lg hover:bg-primary/20 transition-colors">
            <div className="signal-indicator signal-green pulse-glow"></div>
            <div className="text-left">
              <p className="font-medium">Enable Emergency Mode</p>
              <p className="text-sm text-muted-foreground">Clear main arterial routes</p>
            </div>
          </button>
          
          <button className="flex items-center gap-3 p-4 bg-signal-yellow/10 border border-signal-yellow/20 rounded-lg hover:bg-signal-yellow/20 transition-colors">
            <div className="signal-indicator signal-yellow pulse-glow"></div>
            <div className="text-left">
              <p className="font-medium">Optimize Timings</p>
              <p className="text-sm text-muted-foreground">AI-powered adjustment</p>
            </div>
          </button>
          
          <button className="flex items-center gap-3 p-4 bg-muted/10 border border-muted/20 rounded-lg hover:bg-muted/20 transition-colors">
            <div className="signal-indicator bg-muted"></div>
            <div className="text-left">
              <p className="font-medium">Generate Report</p>
              <p className="text-sm text-muted-foreground">Export current status</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}