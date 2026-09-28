(() => {
  const TOTAL_FRAMES = 300;
  const FOLDER_PATH = 'Scrollbackground';
  const FRAME_PREFIX = 'ezgif-frame-';
  const FRAME_EXT = '.png';

  const canvas = document.getElementById('animationCanvas');
  const ctx = canvas.getContext('2d', { alpha: false });

  const images = new Array(TOTAL_FRAMES);
  const loaded = new Array(TOTAL_FRAMES).fill(false);
  const loading = new Array(TOTAL_FRAMES).fill(null);

  let currentFrame = 0;
  let targetFrame = 0;
  let lastDrawnImage = null;
  let lastDrawnWidth = 0;
  let lastDrawnHeight = 0;
  let isRafRunning = false;

  // Natural smooth inertia
  const EASING = 0.085;

  function getFramePath(index) {
    const frameNumber = String(index + 1).padStart(3, '0');
    return `${FOLDER_PATH}/${FRAME_PREFIX}${frameNumber}${FRAME_EXT}`;
  }

  // Find the closest loaded frame to ensure zero blank flashes
  function getNearestLoadedImage(index) {
    if (loaded[index] && images[index]) {
      return images[index];
    }
    // Search outward from target index
    for (let offset = 1; offset < TOTAL_FRAMES; offset++) {
      const prev = index - offset;
      const next = index + offset;
      if (prev >= 0 && loaded[prev] && images[prev]) return images[prev];
      if (next < TOTAL_FRAMES && loaded[next] && images[next]) return images[next];
    }
    return null;
  }

  // Draw frame with 'cover' aspect ratio centering
  function renderFrame(frameIndex) {
    const img = getNearestLoadedImage(frameIndex);
    if (!img) return;

    const cw = canvas.width;
    const ch = canvas.height;

    // Skip redundant draws if the same image is already rendered at the same canvas size
    if (img === lastDrawnImage && cw === lastDrawnWidth && ch === lastDrawnHeight) {
      return;
    }

    const iw = img.naturalWidth || 1280;
    const ih = img.naturalHeight || 720;

    const imgRatio = iw / ih;
    const canvasRatio = cw / ch;

    let drawW, drawH, offsetX, offsetY;

    if (canvasRatio > imgRatio) {
      // Screen is wider than 16:9
      drawW = cw;
      drawH = cw / imgRatio;
      offsetX = 0;
      offsetY = (ch - drawH) / 2;
    } else {
      // Screen is taller than 16:9
      drawH = ch;
      drawW = ch * imgRatio;
      offsetX = (cw - drawW) / 2;
      offsetY = 0;
    }

    ctx.fillStyle = '#0a182d';
    ctx.fillRect(0, 0, cw, ch);
    ctx.drawImage(img, offsetX, offsetY, drawW, drawH);

    lastDrawnImage = img;
    lastDrawnWidth = cw;
    lastDrawnHeight = ch;
  }

  // Canvas resizing supporting device pixel ratio
  function resizeCanvas() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = window.innerWidth;
    const h = window.innerHeight;

    const targetW = Math.round(w * dpr);
    const targetH = Math.round(h * dpr);

    if (canvas.width !== targetW || canvas.height !== targetH) {
      canvas.width = targetW;
      canvas.height = targetH;
      lastDrawnWidth = 0; // Trigger re-render
    }

    renderFrame(Math.round(currentFrame));
  }

  // Calculate target frame from scroll progress
  function calculateTargetFrame() {
    const scrollY = window.pageYOffset || window.scrollY || document.documentElement.scrollTop || 0;
    const scrollHeight = Math.max(
      document.documentElement.scrollHeight,
      document.body.scrollHeight,
      1
    );
    const maxScroll = Math.max(scrollHeight - window.innerHeight, 1);
    const progress = Math.max(0, Math.min(1, scrollY / maxScroll));
    return progress * (TOTAL_FRAMES - 1);
  }

  // Smooth animation loop
  function tick() {
    const diff = targetFrame - currentFrame;

    if (Math.abs(diff) > 0.005) {
      currentFrame += diff * EASING;
      renderFrame(Math.round(currentFrame));
      requestAnimationFrame(tick);
    } else {
      currentFrame = targetFrame;
      renderFrame(Math.round(currentFrame));
      isRafRunning = false;
    }
  }

  function requestTick() {
    if (!isRafRunning) {
      isRafRunning = true;
      requestAnimationFrame(tick);
    }
  }

  // Dynamically prioritize loading frames around current scroll position
  function prioritizeCurrentRegion(frameIdx) {
    const radius = 10;
    for (let r = 0; r <= radius; r++) {
      const p = frameIdx - r;
      const n = frameIdx + r;
      if (p >= 0 && !loaded[p]) loadImage(p);
      if (n < TOTAL_FRAMES && !loaded[n]) loadImage(n);
    }
  }

  function onScroll() {
    targetFrame = calculateTargetFrame();
    prioritizeCurrentRegion(Math.round(targetFrame));
    requestTick();
  }

  // Single-flight image loader: never duplicates in-flight requests
  function loadImage(index) {
    if (index < 0 || index >= TOTAL_FRAMES) return Promise.resolve(null);
    if (loaded[index] && images[index]) return Promise.resolve(images[index]);
    if (loading[index]) return loading[index];

    loading[index] = new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        images[index] = img;
        loaded[index] = true;
        const cur = Math.round(currentFrame);
        if (Math.abs(cur - index) <= 2 || lastDrawnImage === null) {
          renderFrame(cur);
        }
        resolve(img);
      };
      img.onerror = () => {
        resolve(null);
      };
      img.src = getFramePath(index);
    });

    return loading[index];
  }

  // Batch loader with concurrency control
  async function loadInBatches(indices, concurrency = 10) {
    const queue = indices.slice();
    const workers = [];
    for (let w = 0; w < concurrency; w++) {
      workers.push(
        (async () => {
          while (queue.length > 0) {
            const idx = queue.shift();
            if (idx !== undefined) {
              await loadImage(idx);
            }
          }
        })()
      );
    }
    await Promise.all(workers);
  }

  // 3-Phase Preloader:
  // 1. Immediately load frame 0 and display it
  // 2. Preload keyframes every 5th frame across the sequence
  // 3. Concurrently fill in all remaining frames
  async function preloadAllFrames() {
    // Phase 1: First frame
    await loadImage(0);
    renderFrame(0);

    // Phase 2: Sparse keyframes
    const keyframes = [];
    for (let i = 5; i < TOTAL_FRAMES; i += 5) {
      keyframes.push(i);
    }
    if (!keyframes.includes(TOTAL_FRAMES - 1)) {
      keyframes.push(TOTAL_FRAMES - 1);
    }
    await loadInBatches(keyframes, 10);

    // Phase 3: All remaining frames
    const remaining = [];
    for (let i = 0; i < TOTAL_FRAMES; i++) {
      if (!loaded[i]) {
        remaining.push(i);
      }
    }
    await loadInBatches(remaining, 12);
  }

  // Global debug interface for validation
  window.__ANIM__ = {
    get currentFrame() { return currentFrame; },
    get targetFrame() { return targetFrame; },
    get scrollY() { return window.pageYOffset || window.scrollY || document.documentElement.scrollTop; },
    get maxScroll() {
      const scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
      return Math.max(scrollHeight - window.innerHeight, 1);
    },
    get loadedCount() { return loaded.filter(Boolean).length; },
    renderFrame
  };

  // Setup event listeners
  window.addEventListener('resize', resizeCanvas, { passive: true });
  window.addEventListener('scroll', onScroll, { passive: true });

  // Initial execution
  resizeCanvas();
  targetFrame = calculateTargetFrame();
  currentFrame = targetFrame;
  preloadAllFrames();
})();
