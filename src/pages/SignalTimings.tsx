import { Clock, Play, Pause, RotateCcw } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";

const signalData = [
  { id: "SIG001", location: "Rajpath (Kartavya Path)", status: "green", timer: 45, cycle: 120, lastCycle: 118 },
  { id: "SIG002", location: "Janpath", status: "red", timer: 12, cycle: 100, lastCycle: 102 },
  { id: "SIG003", location: "Outer Ring Road", status: "yellow", timer: 3, cycle: 90, lastCycle: 88 },
  { id: "SIG004", location: "Inner Ring Road", status: "green", timer: 67, cycle: 110, lastCycle: 115 },
  { id: "SIG005", location: "Mathura Road", status: "red", timer: 8, cycle: 95, lastCycle: 94 },
  { id: "SIG006", location: "Aurobindo Marg", status: "green", timer: 34, cycle: 105, lastCycle: 108 },
];

const timingHistory = [
  { time: "08:00", green: 65, yellow: 5, red: 30 },
  { time: "08:05", green: 70, yellow: 5, red: 25 },
  { time: "08:10", green: 60, yellow: 5, red: 35 },
  { time: "08:15", green: 68, yellow: 5, red: 27 },
  { time: "08:20", green: 72, yellow: 5, red: 23 },
  { time: "08:25", green: 66, yellow: 5, red: 29 },
  { time: "08:30", green: 69, yellow: 5, red: 26 },
];

export default function SignalTimings() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "green": return "signal-green";
      case "yellow": return "signal-yellow";
      case "red": return "signal-red";
      default: return "bg-muted";
    }
  };

  const getStatusText = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Signal Timings</h1>
          <p className="text-muted-foreground">Real-time traffic light control and monitoring</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-lg hover:bg-primary/20 transition-colors">
            <RotateCcw className="h-4 w-4" />
            Reset All Timers
          </button>
          <div className="control-card py-2 px-4">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Auto Mode</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Signals Table */}
        <div className="xl:col-span-2 control-card">
          <div className="flex items-center gap-2 mb-6">
            <Clock className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold">Active Traffic Signals</h3>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-control-panel-border">
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Signal ID</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Location</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Timer</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Cycle Time</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {signalData.map((signal) => (
                  <tr key={signal.id} className="border-b border-control-panel-border/50 hover:bg-muted/20 transition-colors">
                    <td className="py-4 px-4">
                      <span className="font-mono text-sm font-medium">{signal.id}</span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-sm">{signal.location}</span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <div className={`signal-indicator ${getStatusColor(signal.status)} pulse-glow`}></div>
                        <span className="text-sm font-medium">{getStatusText(signal.status)}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-foreground">{signal.timer}s</span>
                        <div className="w-12 h-2 bg-muted rounded-full overflow-hidden">
                          <div 
                            className={`h-full bg-${getStatusColor(signal.status)} transition-all duration-1000`}
                            style={{ width: `${(signal.timer / signal.cycle) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-sm text-muted-foreground">{signal.cycle}s avg</span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <button className="p-1 hover:bg-muted rounded transition-colors">
                          <Play className="h-4 w-4" />
                        </button>
                        <button className="p-1 hover:bg-muted rounded transition-colors">
                          <Pause className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Timing History Chart */}
        <div className="control-card">
          <div className="flex items-center gap-2 mb-6">
            <Clock className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold">Signal Distribution</h3>
          </div>
          
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={timingHistory}>
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
                  dataKey="green" 
                  stroke="hsl(var(--signal-green))" 
                  strokeWidth={2}
                  name="Green"
                />
                <Line 
                  type="monotone" 
                  dataKey="yellow" 
                  stroke="hsl(var(--signal-yellow))" 
                  strokeWidth={2}
                  name="Yellow"
                />
                <Line 
                  type="monotone" 
                  dataKey="red" 
                  stroke="hsl(var(--signal-red))" 
                  strokeWidth={2}
                  name="Red"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          
          {/* Legend */}
          <div className="flex items-center justify-center gap-6 mt-4">
            <div className="flex items-center gap-2">
              <div className="signal-indicator signal-green"></div>
              <span className="text-sm">Green</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="signal-indicator signal-yellow"></div>
              <span className="text-sm">Yellow</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="signal-indicator signal-red"></div>
              <span className="text-sm">Red</span>
            </div>
          </div>
        </div>
      </div>

      {/* Manual Override Panel */}
      <div className="control-card">
        <h3 className="text-lg font-semibold mb-4">Manual Override Controls</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center justify-center gap-2 p-4 bg-signal-green/10 border border-signal-green/20 rounded-lg hover:bg-signal-green/20 transition-colors">
            <div className="signal-indicator signal-green pulse-glow"></div>
            <span className="font-medium">Force Green - Main St</span>
          </button>
          
          <button className="flex items-center justify-center gap-2 p-4 bg-signal-yellow/10 border border-signal-yellow/20 rounded-lg hover:bg-signal-yellow/20 transition-colors">
            <div className="signal-indicator signal-yellow pulse-glow"></div>
            <span className="font-medium">Extend Yellow - Broadway</span>
          </button>
          
          <button className="flex items-center justify-center gap-2 p-4 bg-signal-red/10 border border-signal-red/20 rounded-lg hover:bg-signal-red/20 transition-colors">
            <div className="signal-indicator signal-red pulse-glow"></div>
            <span className="font-medium">Emergency Stop - All</span>
          </button>
        </div>
      </div>
    </div>
  );
}