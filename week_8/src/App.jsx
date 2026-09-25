import { useEffect, useRef, useState } from "react";

const API_URL = (import.meta.env.VITE_API_URL || "http://127.0.0.1:8000").replace(/\/$/, "");
const ACCEPTED_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/jfif"];
const ACCEPTED_EXTENSIONS = ["jpg", "jpeg", "png", "webp", "jfif"];

function formatFileSize(bytes) {
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function validateFile(selectedFile) {
  const extension = selectedFile.name.split(".").pop()?.toLowerCase();
  if (!ACCEPTED_TYPES.includes(selectedFile.type) && !ACCEPTED_EXTENSIONS.includes(extension)) {
    return "That file type is not supported. Please choose a JPG, PNG, WEBP, or JFIF image.";
  }
  return "";
}

function StatusIcon({ status }) {
  return <span className={`status-dot status-${status}`} aria-hidden="true" />;
}

function App() {
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [apiStatus, setApiStatus] = useState("checking");
  const [imageDimensions, setImageDimensions] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    let cancelled = false;

    const checkApi = async () => {
      try {
        const response = await fetch(`${API_URL}/`, { signal: AbortSignal.timeout(5000) });
        if (!cancelled) setApiStatus(response.ok ? "online" : "offline");
      } catch {
        if (!cancelled) setApiStatus("offline");
      }
    };

    checkApi();
    const interval = window.setInterval(checkApi, 30000);
    return () => {
      cancelled = true;
      window.clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    return () => {
      if (imageUrl) URL.revokeObjectURL(imageUrl);
    };
  }, [imageUrl]);

  useEffect(() => {
    const image = imageRef.current;
    if (!image) return undefined;

    const updateDimensions = () => {
      if (image.naturalWidth && image.naturalHeight) {
        setImageDimensions({
          naturalWidth: image.naturalWidth,
          naturalHeight: image.naturalHeight,
          clientWidth: image.clientWidth,
          clientHeight: image.clientHeight,
        });
      }
    };

    updateDimensions();
    const observer = new ResizeObserver(updateDimensions);
    observer.observe(image);
    return () => observer.disconnect();
  }, [imageUrl]);

  const handleImageChange = (event) => handleSelectedFile(event.target.files[0]);

  const handleSelectedFile = (selectedFile) => {
    if (!selectedFile) return;

    if (selectedFile.size === 0) {
      setError("This image is empty. Please choose another file and try again.");
      return;
    }

    const validationError = validateFile(selectedFile);
    if (validationError) {
      setError(validationError);
      return;
    }

    if (imageUrl) URL.revokeObjectURL(imageUrl);
    setFile(selectedFile);
    setImageUrl(URL.createObjectURL(selectedFile));
    setResult(null);
    setError("");
    setImageDimensions(null);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);
    handleSelectedFile(event.dataTransfer.files[0]);
  };

  const detectPlate = async () => {
    if (!file) {
      setError("Please select an image before starting detection.");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    const formData = new FormData();

    formData.append("file", file);

    try {
      const response = await fetch(`${API_URL}/predict`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        if (response.status === 400) {
          throw new Error("The ANPR API could not process this image. Please check the file and try again.");
        }
        if (response.status === 503 || response.status >= 500) {
          throw new Error("The ANPR service is temporarily unavailable. Please try again.");
        }
        throw new Error("We could not process that image. Please try again.");
      }

      setResult(data);
      setApiStatus("online");
    } catch (err) {
      setApiStatus("offline");
      setError(err.name === "TypeError" ? "Unable to connect to the ANPR API. Please make sure the backend is running." : err.message || "We could not process that image.");
    } finally {
      setLoading(false);
    }
  };

  const detections = result?.detections || [];
  const ocrResults = detections.filter((detection) => detection.plate_text?.trim()).length;

  const renderBoundingBoxes = () => {
    if (!result || !imageDimensions) return null;
    const { naturalWidth, naturalHeight, clientWidth, clientHeight } = imageDimensions;
    const scaleX = clientWidth / naturalWidth;
    const scaleY = clientHeight / naturalHeight;

    return detections.map((detection, index) => {
      const box = detection.bounding_box || {};
      const left = (Number(box.x1) || 0) * scaleX;
      const top = (Number(box.y1) || 0) * scaleY;
      const width = ((Number(box.x2) || 0) - (Number(box.x1) || 0)) * scaleX;
      const height = ((Number(box.y2) || 0) - (Number(box.y1) || 0)) * scaleY;

      const plateText = detection.plate_text?.trim();

      return (
        <div className="bounding-box" key={`${detection.plate_text}-${index}`} style={{ left, top, width, height }}>
          <span>Plate {String(index + 1).padStart(2, "0")} {plateText ? `· ${plateText}` : ""}</span>
        </div>
      );
    });
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="navbar">
        <div className="brand">
          <svg className="brand-mark" viewBox="0 0 40 40" aria-hidden="true">
            <rect className="logo-frame" x="1" y="1" width="38" height="38" rx="10" />
            <path className="logo-brackets" d="M8 14V9h5M27 9h5v5M32 26v5h-5M13 31H8v-5" />
            <rect className="logo-plate" x="10" y="14" width="20" height="12" rx="2.5" />
            <path className="logo-plate-line" d="M14 18h12M14 21h8" />
            <circle className="logo-signal" cx="27" cy="21" r="1.5" />
          </svg>
          <div className="brand-copy"><strong><b>ANPR</b> Vision</strong><span>AI-Powered Recognition</span></div>
        </div>
        <div className="header-badges" aria-label="Computer vision technologies">
          <span>Computer Vision</span>
          <span><i /> YOLO + EasyOCR</span>
        </div>
        <div className="api-status" aria-live="polite">
          <StatusIcon status={apiStatus} />
          <span>{apiStatus === "checking" ? "Checking API" : apiStatus === "online" ? "API Online" : "API Offline"}</span>
        </div>
        </div>
        <section className="hero container">
          <div>
            <div className="eyebrow"><span className="eyebrow-dot" /> Computer vision intelligence</div>
            <h1>Automatic Number Plate <em>Recognition</em></h1>
            <p>Detect license plates and extract text using AI-powered computer vision.</p>
            <div className="hero-tags"><span>YOLO Detection</span><b>+</b><span>EasyOCR</span></div>
          </div>
          <div className="hero-signal"><span>LIVE ENGINE</span><strong>YOLO v8 <i>•</i> OCR</strong></div>
        </section>
      </header>

      <main>
        <section className="workspace container">
          <article className="panel input-panel">
            <div className="panel-heading"><div><span className="section-kicker">01 / INPUT</span><h2>Vehicle Image</h2></div><span className="panel-icon">↥</span></div>
            {!imageUrl ? (
              <div className={`drop-zone${isDragging ? " is-dragging" : ""}`} onDragEnter={(event) => { event.preventDefault(); setIsDragging(true); }} onDragOver={(event) => event.preventDefault()} onDragLeave={(event) => { if (event.currentTarget === event.target) setIsDragging(false); }} onDrop={handleDrop} onClick={() => fileInputRef.current?.click()} role="button" tabIndex="0" onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") fileInputRef.current?.click(); }}>
                <div className="upload-icon">↑</div>
                <strong>Upload Vehicle Image</strong>
                <span>Drag &amp; drop an image here or browse from your device</span>
                <small>JPG • JPEG • PNG • WEBP • JFIF</small>
                <input ref={fileInputRef} type="file" accept=".jpg,.jpeg,.png,.webp,.jfif,image/jpeg,image/png,image/webp,image/jfif" onChange={handleImageChange} hidden />
              </div>
            ) : (
              <div className="preview-area">
                <span className="preview-label">IMAGE PREVIEW</span>
                <div className="image-stage">
                  <img ref={imageRef} src={imageUrl} alt={`Preview of ${file?.name || "vehicle"}`} onLoad={() => { const image = imageRef.current; if (image?.naturalWidth && image?.naturalHeight) setImageDimensions({ naturalWidth: image.naturalWidth, naturalHeight: image.naturalHeight, clientWidth: image.clientWidth, clientHeight: image.clientHeight }); }} />
                  {renderBoundingBoxes()}
                </div>
                <div className="file-meta"><div><strong>{file.name}</strong><span>{formatFileSize(file.size)} · Ready for analysis</span></div><button type="button" className="text-button" onClick={() => fileInputRef.current?.click()}>Change image</button></div>
                <input ref={fileInputRef} type="file" accept=".jpg,.jpeg,.png,.webp,.jfif,image/jpeg,image/png,image/webp,image/jfif" onChange={handleImageChange} hidden />
              </div>
            )}
            <button type="button" className="detect-button" onClick={detectPlate} disabled={loading || !file}>
              {loading ? <><span className="spinner" /> Analyzing image...</> : <>Detect Number Plate <span>↗</span></>}
            </button>
            {loading && <div className="loading-note"><strong>Analyzing vehicle image</strong><span>YOLO is detecting plates and EasyOCR is reading text.</span></div>}
            {error && <div className="error-message" role="alert"><span>!</span><div><strong>Detection could not be completed</strong><p>{error}</p></div></div>}
          </article>

          <article className="panel results-panel">
            <div className="panel-heading"><div><span className="section-kicker">02 / ANALYSIS</span><h2>Detection Results</h2><p className="panel-description">AI-generated license plate detections from the uploaded image.</p></div><span className="result-count">{result ? `${detections.length} FOUND` : "AWAITING INPUT"}</span></div>
            {!result && !loading && <div className="empty-result"><div className="empty-icon">⌁</div><strong>Upload an image to begin detection.</strong><span>Your results and plate coordinates will appear here.</span></div>}
            {loading && <div className="empty-result loading-state"><div className="loader-ring" /><strong>Analyzing vehicle image</strong><span>YOLO is detecting the license plate and EasyOCR is reading the characters.</span></div>}
            {result && <>
              <div className="stats-grid"><div><span>PLATES DETECTED</span><strong>{detections.length}</strong></div><div><span>OCR RESULTS</span><strong>{ocrResults}</strong></div><div className="stat-file"><span>IMAGE</span><strong title={result.filename}>{result.filename}</strong></div></div>
              {detections.length === 0 ? <div className="no-detection"><span>⌕</span><div><strong>No license plates detected</strong><p>Try another vehicle image with a clearer view of the plate.</p></div></div> : <div className="detection-list">{detections.map((detection, index) => { const box = detection.bounding_box || {}; const plateText = detection.plate_text?.trim(); return <div className={`detection-card${plateText ? "" : " ocr-failed"}`} key={`${detection.plate_text}-${index}`}><div className="detection-card-top"><span>PLATE {String(index + 1).padStart(2, "0")}</span><span className="detected-badge">● PLATE DETECTED</span></div><h3>{plateText || "Text not recognized"}</h3>{!plateText && <p className="ocr-note"><strong>Plate detected.</strong> Text could not be recognized.</p>}<div className="coordinates"><span>BOUNDING BOX</span><code>[{box.x1 ?? 0}, {box.y1 ?? 0}] → [{box.x2 ?? 0}, {box.y2 ?? 0}]</code></div></div>; })}</div>}
            </>}
          </article>
        </section>
      </main>
      <footer><strong>ANPR Vision</strong><span>•</span>AI-Powered Number Plate Recognition<small>Built with React, FastAPI, YOLO &amp; EasyOCR</small></footer>
    </div>
  );
}

export default App;