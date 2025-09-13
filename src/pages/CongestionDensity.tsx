import React, { useEffect, useState } from "react";

interface LogEntry {
  mode: string;
  date?: string;
  time?: string;
  video_name?: string;
  timestamp_sec?: number;
  vehicles: number;
}

export default function CongestionDensity(): JSX.Element {
  const [data, setData] = useState<LogEntry[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/results") // Flask backend
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => console.error("Error fetching data:", err));
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Congestion Density</h1>

      {data.length === 0 ? (
        <p>Loading results...</p>
      ) : (
        <table className="table-auto border-collapse border border-gray-400 w-full">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2">Mode</th>
              <th className="border px-4 py-2">Video Name</th>
              <th className="border px-4 py-2">Timestamp (s)</th>
              <th className="border px-4 py-2">Date</th>
              <th className="border px-4 py-2">Time</th>
              <th className="border px-4 py-2">Vehicles</th>
            </tr>
          </thead>
          <tbody>
            {data.map((entry, index) => (
              <tr key={index} className="text-center">
                <td className="border px-4 py-2">{entry.mode}</td>
                <td className="border px-4 py-2">{entry.video_name || "-"}</td>
                <td className="border px-4 py-2">
                  {entry.timestamp_sec ?? "-"}
                </td>
                <td className="border px-4 py-2">{entry.date || "-"}</td>
                <td className="border px-4 py-2">{entry.time || "-"}</td>
                <td className="border px-4 py-2 font-bold">
                  {entry.vehicles}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
