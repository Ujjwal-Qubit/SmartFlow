import { Card } from "@/components/ui/card";
import {
  BarChart,
  LineChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// -------------------- Weekend vs Weekday --------------------
const weekendData = [
  { is_weekend: "Weekday", Low: 43, Medium: 31, High: 46 },
  { is_weekend: "Weekend", Low: 22, Medium: 22, High: 5 },
];

export const WeekendVsWeekday = () => (
  <Card className="p-6 border-2 border-black">
    <h3 className="text-lg font-semibold mb-4">
      Congestion Levels: Weekend vs Weekday
    </h3>
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={weekendData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="is_weekend" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Low" stackId="a" fill="#1f77b4" />
          <Bar dataKey="Medium" stackId="a" fill="#ff7f0e" />
          <Bar dataKey="High" stackId="a" fill="#2ca02c" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  </Card>
);

// -------------------- Weather Congestion --------------------
const weatherData = [
  { weather: "Clear", Low: 23, Medium: 17, High: 12 },
  { weather: "Cloudy", Low: 14, Medium: 10, High: 10 },
  { weather: "Rainy", Low: 11, Medium: 11, High: 16 },
  { weather: "Snowy", Low: 18, Medium: 15, High: 12 },
];

export const WeatherCongestion = () => (
  <Card className="p-6 border-2 border-black">
    <h3 className="text-lg font-semibold mb-4">
      Congestion Levels by Weather Condition
    </h3>
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={weatherData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="weather" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Low" fill="#1f77b4" />
          <Bar dataKey="Medium" fill="#ff7f0e" />
          <Bar dataKey="High" fill="#2ca02c" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  </Card>
);

// -------------------- Hourly Vehicle Count --------------------
const hourlyData = [
  { hour: 0, Mon: 2, Tue: 3, Wed: 1, Thu: 4, Fri: 15, Sat: 2, Sun: 1 },
  { hour: 1, Mon: 1, Tue: 2, Wed: 0, Thu: 3, Fri: 10, Sat: 1, Sun: 2 },
  // ... continue filling your dataset as needed
  { hour: 23, Mon: 10, Tue: 12, Wed: 8, Thu: 9, Fri: 15, Sat: 5, Sun: 4 },
];

export const HourlyVehicleCount = () => (
  <Card className="p-6 border-2 border-black">
    <h3 className="text-lg font-semibold mb-4">
      Hourly Vehicle Count by Day of Week
    </h3>
    <div className="h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={hourlyData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="hour" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="Mon" stroke="#1f77b4" />
          <Line type="monotone" dataKey="Tue" stroke="#ff7f0e" />
          <Line type="monotone" dataKey="Wed" stroke="#2ca02c" />
          <Line type="monotone" dataKey="Thu" stroke="#d62728" />
          <Line type="monotone" dataKey="Fri" stroke="#9467bd" />
          <Line type="monotone" dataKey="Sat" stroke="#8c564b" />
          <Line type="monotone" dataKey="Sun" stroke="#e377c2" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  </Card>
);

// -------------------- Main Historical Analysis Component --------------------
const HistoricalAnalysis = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold tracking-tight">Historical Analysis</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <WeekendVsWeekday />
        <WeatherCongestion />
        <HourlyVehicleCount />
      </div>
    </div>
  );
};

export default HistoricalAnalysis;
