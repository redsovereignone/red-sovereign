const puppeteer = require('puppeteer');

async function analyzePerformance() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  
  // Enable performance monitoring
  await page.evaluateOnNewDocument(() => {
    window.performanceMetrics = {
      fps: [],
      paintTimes: [],
      animationFrames: []
    };
    
    let lastTime = performance.now();
    let frameCount = 0;
    
    function measureFPS() {
      const currentTime = performance.now();
      frameCount++;
      
      if (currentTime >= lastTime + 1000) {
        window.performanceMetrics.fps.push(frameCount);
        frameCount = 0;
        lastTime = currentTime;
      }
      
      requestAnimationFrame(measureFPS);
    }
    
    measureFPS();
  });
  
  // Navigate to the page
  await page.goto('http://localhost:3002', { waitUntil: 'networkidle0' });
  
  // Wait for animations to complete
  await page.waitForTimeout(3000);
  
  // Get performance metrics
  const metrics = await page.evaluate(() => {
    const entries = performance.getEntriesByType('paint');
    const navigationTiming = performance.getEntriesByType('navigation')[0];
    
    return {
      fps: window.performanceMetrics.fps,
      averageFPS: window.performanceMetrics.fps.reduce((a, b) => a + b, 0) / window.performanceMetrics.fps.length,
      firstContentfulPaint: entries.find(e => e.name === 'first-contentful-paint')?.startTime,
      largestContentfulPaint: performance.getEntriesByType('largest-contentful-paint')[0]?.startTime,
      domContentLoaded: navigationTiming.domContentLoadedEventEnd - navigationTiming.domContentLoadedEventStart,
      loadComplete: navigationTiming.loadEventEnd - navigationTiming.loadEventStart
    };
  });
  
  console.log('Performance Analysis Results:');
  console.log('=============================');
  console.log(`Average FPS: ${metrics.averageFPS.toFixed(2)}`);
  console.log(`FPS Range: ${Math.min(...metrics.fps)} - ${Math.max(...metrics.fps)}`);
  console.log(`First Contentful Paint: ${metrics.firstContentfulPaint?.toFixed(2)}ms`);
  console.log(`Largest Contentful Paint: ${metrics.largestContentfulPaint?.toFixed(2)}ms`);
  console.log(`DOM Content Loaded: ${metrics.domContentLoaded?.toFixed(2)}ms`);
  console.log(`Page Load Complete: ${metrics.loadComplete?.toFixed(2)}ms`);
  
  // Check for janky animations
  const jankyFrames = metrics.fps.filter(f => f < 55).length;
  if (jankyFrames > 0) {
    console.log(`\n⚠️  Warning: ${jankyFrames} seconds with FPS below 55`);
  }
  
  await browser.close();
}

analyzePerformance().catch(console.error);