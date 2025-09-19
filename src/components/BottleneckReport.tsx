import { Card } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

const weeklyData = [
  { day: "Monday", traffic: 1200 },
  { day: "Tuesday", traffic: 1500 },
  { day: "Wednesday", traffic: 1800 },
  { day: "Thursday", traffic: 1400 },
  { day: "Friday", traffic: 2000 },
  { day: "Saturday", traffic: 2500 },
  { day: "Sunday", traffic: 2700 },
];

const weekdayTraffic = weeklyData
  .filter(d => !["Saturday", "Sunday"].includes(d.day))
  .reduce((sum, d) => sum + d.traffic, 0);

const weekendTraffic = weeklyData
  .filter(d => ["Saturday", "Sunday"].includes(d.day))
  .reduce((sum, d) => sum + d.traffic, 0);

const BottleneckReport = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold tracking-tight">Bottleneck Report</h2>

      {/* Bar Chart for Daily Traffic */}
      <Card className="p-6 border-2 border-border bg-background">
        <h3 className="text-lg font-semibold mb-4">Traffic in the Last 7 Days</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="day" stroke="hsl(var(--foreground))" />
              <YAxis stroke="hsl(var(--foreground))" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--background))",
                  color: "hsl(var(--foreground))",
                }}
              />
              <Bar dataKey="traffic" fill="hsl(var(--primary))" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Summary */}
      <Card className="p-6 border-2 border-border bg-background">
        <h3 className="text-lg font-semibold mb-4">Weekday vs Weekend Analysis</h3>
        <p className="text-base">
          📊 <strong>Weekday Traffic:</strong> {weekdayTraffic} vehicles
        </p>
        <p className="text-base">
          🚦 <strong>Weekend Traffic:</strong> {weekendTraffic} vehicles
        </p>
        <p className="mt-2 font-medium">
          {weekendTraffic > weekdayTraffic
            ? "⚠️ Traffic bottlenecks mostly occur on weekends."
            : "✅ Traffic bottlenecks mostly occur on weekdays."}
        </p>
      </Card>
    </div>
  );
};

export default BottleneckReport;