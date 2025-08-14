// Performance test script for animations
// Run with: node scripts/test-performance.js

const puppeteer = require('puppeteer');

async function testAnimationPerformance() {
  const browser = await puppeteer.launch({
    headless: false,
    devtools: true
  });

  const page = await browser.newPage();
  await page.goto('http://localhost:3001', { waitUntil: 'networkidle0' });

  // Enable Chrome DevTools Protocol
  const client = await page.target().createCDPSession();
  await client.send('Performance.enable');

  // Start recording
  await client.send('Tracing.start', {
    categories: ['devtools.timeline', 'disabled-by-default-devtools.timeline.frame']
  });

  // Scroll through the page to trigger animations
  await page.evaluate(() => {
    return new Promise((resolve) => {
      let totalHeight = 0;
      const distance = 100;
      const timer = setInterval(() => {
        const scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;

        if (totalHeight >= scrollHeight) {
          clearInterval(timer);
          resolve();
        }
      }, 100);
    });
  });

  // Stop recording
  const traceData = await client.send('Tracing.end');
  
  // Analyze frames
  const metrics = await page.metrics();
  console.log('\n=== Performance Metrics ===');
  console.log('JSHeapUsedSize:', (metrics.JSHeapUsedSize / 1048576).toFixed(2), 'MB');
  console.log('LayoutCount:', metrics.LayoutCount);
  console.log('RecalcStyleCount:', metrics.RecalcStyleCount);
  console.log('TaskDuration:', metrics.TaskDuration?.toFixed(2), 'ms');

  // Check animation frame rate
  const performanceData = await page.evaluate(() => {
    return performance.getEntriesByType('measure').map(entry => ({
      name: entry.name,
      duration: entry.duration
    }));
  });

  console.log('\n=== Animation Performance ===');
  const frameThreshold = 16.67; // 60fps threshold
  let slowFrames = 0;
  let totalFrames = 0;

  // Monitor frame rate for 3 seconds
  await page.evaluate(() => {
    return new Promise((resolve) => {
      let frames = [];
      let lastTime = performance.now();
      
      function checkFrame() {
        const currentTime = performance.now();
        const delta = currentTime - lastTime;
        frames.push(delta);
        lastTime = currentTime;
        
        if (frames.length < 180) { // ~3 seconds at 60fps
          requestAnimationFrame(checkFrame);
        } else {
          resolve(frames);
        }
      }
      
      requestAnimationFrame(checkFrame);
    });
  }).then(frames => {
    frames.forEach(frameTime => {
      totalFrames++;
      if (frameTime > frameThreshold) {
        slowFrames++;
      }
    });
    
    const avgFrameTime = frames.reduce((a, b) => a + b, 0) / frames.length;
    const fps = 1000 / avgFrameTime;
    
    console.log('Average FPS:', fps.toFixed(2));
    console.log('Frame time:', avgFrameTime.toFixed(2), 'ms');
    console.log('Slow frames (>16.67ms):', slowFrames, '/', totalFrames);
    console.log('Performance score:', ((1 - slowFrames/totalFrames) * 100).toFixed(2) + '%');
    
    if (fps >= 59) {
      console.log('✅ Animations running at 60fps');
    } else {
      console.log('⚠️ Animation performance needs optimization');
    }
  });

  await browser.close();
}

// Run the test
testAnimationPerformance().catch(console.error);