from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import json
import os
from datetime import datetime
from ultralytics import YOLO
import cv2

app = Flask(__name__)
CORS(app)  # allow React frontend to talk to Flask

UPLOAD_FOLDER = os.path.join(app.root_path, "uploads")
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Load YOLO model once
model = YOLO("yolov8n.pt")

# Path for JSON results
RESULTS_FILE = os.path.join(app.root_path, "traffic_counts.json")


def process_video(file_path, filename):
    cap = cv2.VideoCapture(file_path)
    frame_id = 0
    data_log = []
    snapshots = []

    while True:
        ret, frame = cap.read()
        if not ret:
            break

        if frame_id % 10 == 0:  # process every 10th frame
            results = model(frame, verbose=False)
            count = 0

            for r in results:
                frame = r.plot()  # draw bounding boxes
                for box in r.boxes:
                    cls = int(box.cls[0])
                    if cls in [2, 3, 5, 7]:  # vehicles
                        count += 1

            frame_time = cap.get(cv2.CAP_PROP_POS_MSEC) / 1000.0
            now = datetime.now()

            log_entry = {
                "mode": "video",
                "video_name": filename,
                "timestamp_sec": round(frame_time, 2),
                "vehicles": count,
                "date": now.strftime("%Y-%m-%d"),
                "time": now.strftime("%H:%M:%S")
            }
            data_log.append(log_entry)

            # Save snapshot image
            snapshot_name = f"snapshot_{frame_id}.jpg"
            snapshot_path = os.path.join(UPLOAD_FOLDER, snapshot_name)
            cv2.imwrite(snapshot_path, frame)
            snapshots.append(snapshot_name)

        frame_id += 1

    cap.release()

    # Save JSON results
    with open(RESULTS_FILE, "w") as f:
        json.dump(data_log, f, indent=4)

    print(f"✅ Video processed, snapshots saved: {len(snapshots)} frames")
    return snapshots


@app.route("/upload", methods=["POST"])
def upload_video():
    file = request.files.get("video")
    if not file:
        return jsonify({"status": "error", "message": "No video file provided"}), 400

    filepath = os.path.join(UPLOAD_FOLDER, file.filename)
    file.save(filepath)

    snapshots = process_video(filepath, file.filename)

    return jsonify({
        "status": "success",
        "message": "Video processed (snapshots saved)",
        "file": file.filename,
        "snapshots": snapshots
    })


@app.route("/results", methods=["GET"])
def get_results():
    if os.path.exists(RESULTS_FILE):
        with open(RESULTS_FILE) as f:
            data = json.load(f)
        return jsonify(data)
    return jsonify([])


@app.route("/uploads/<filename>")
def uploaded_file(filename):
    return send_from_directory(UPLOAD_FOLDER, filename)


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)