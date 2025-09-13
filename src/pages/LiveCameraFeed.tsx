import React, { useEffect, useState } from "react";

// ===================== LiveCameraFeed =====================
export default function LiveCameraFeed() {
  const [snapshots, setSnapshots] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const [playingIndex, setPlayingIndex] = useState(0);

  const handleDrop = async (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file && file.type.startsWith("video/")) {
      setUploading(true);
      try {
        const formData = new FormData();
        formData.append("video", file);

        const res = await fetch("http://localhost:5000/upload", {
          method: "POST",
          body: formData,
        });

        const data = await res.json();

        if (data.status === "success" && data.snapshots) {
          const urls = data.snapshots.map(
            (name: string) => `http://localhost:5000/uploads/${name}`
          );
          setSnapshots(urls);
          setPlayingIndex(0);
          console.log("✅ Upload successful, snapshots ready");
        } else {
          console.error("❌ Upload failed", data.message);
        }
      } catch (error) {
        console.error("❌ Upload failed", error);
      } finally {
        setUploading(false);
      }
    }
  };

  // Slideshow effect (simulate video playback)
  useEffect(() => {
    if (snapshots.length > 0) {
      const interval = setInterval(() => {
        setPlayingIndex((prev) => (prev + 1) % snapshots.length);
      }, 500); // change frame every 0.5s
      return () => clearInterval(interval);
    }
  }, [snapshots]);

  return (
    <div
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      className="border-2 border-dashed border-gray-400 p-6 rounded-md text-center"
    >
      <p>Drop your video here</p>

      {uploading && <p className="text-blue-500 mt-2">Processing video…</p>}

      {snapshots.length > 0 && (
        <div className="mt-4">
          <img
            src={snapshots[playingIndex]}
            alt={`Snapshot ${playingIndex}`}
            className="mx-auto rounded shadow max-h-[400px]"
          />
        </div>
      )}
    </div>
  );
}

// ===================== CongestionDensity =====================
interface LogEntry {
  mode: string;
  date?: string;
  time?: string;
  video_name?: string;
  timestamp_sec?: number;
  vehicles: number;
}

export function CongestionDensity(): JSX.Element {
  const [data, setData] = useState<LogEntry[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      fetch("http://localhost:5000/results")
        .then((res) => res.json())
        .then((json) => setData(json))
        .catch((err) => console.error("Error fetching data:", err));
    }, 5000); // refresh every 5s

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Congestion Density</h1>

      {data.length === 0 ? (
        <p>Waiting for results...</p>
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
                <td className="border px-4 py-2">{entry.timestamp_sec ?? "-"}</td>
                <td className="border px-4 py-2">{entry.date || "-"}</td>
                <td className="border px-4 py-2">{entry.time || "-"}</td>
                <td className="border px-4 py-2 font-bold">{entry.vehicles}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}