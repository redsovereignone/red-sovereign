/**
 * Performance Monitor - Red Sovereign Design System
 * Ensures all animations run at 60fps and tracks Core Web Vitals
 */

interface PerformanceMetrics {
  fps: number;
  frameTime: number;
  droppedFrames: number;
  animationJank: boolean;
}

class PerformanceMonitor {
  private frameCount = 0;
  private lastTime = performance.now();
  private fps = 60;
  private frameTimeHistory: number[] = [];
  private readonly maxHistorySize = 60;
  private animationFrameId: number | null = null;
  private isMonitoring = false;

  /**
   * Start monitoring animation performance
   */
  startMonitoring(): void {
    if (this.isMonitoring) return;
    
    this.isMonitoring = true;
    this.frameCount = 0;
    this.lastTime = performance.now();
    this.monitorFrame();
  }

  /**
   * Stop monitoring
   */
  stopMonitoring(): void {
    this.isMonitoring = false;
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }

  /**
   * Monitor a single frame
   */
  private monitorFrame = (): void => {
    if (!this.isMonitoring) return;

    const currentTime = performance.now();
    const deltaTime = currentTime - this.lastTime;
    
    // Calculate FPS
    if (deltaTime > 0) {
      this.fps = 1000 / deltaTime;
      this.frameTimeHistory.push(deltaTime);
      
      // Keep history size manageable
      if (this.frameTimeHistory.length > this.maxHistorySize) {
        this.frameTimeHistory.shift();
      }
    }
    
    this.frameCount++;
    this.lastTime = currentTime;
    
    // Check for jank (frame time > 16.67ms for 60fps)
    if (deltaTime > 16.67 && this.frameCount > 10) {
      this.logPerformanceWarning(deltaTime);
    }
    
    this.animationFrameId = requestAnimationFrame(this.monitorFrame);
  };

  /**
   * Get current performance metrics
   */
  getMetrics(): PerformanceMetrics {
    const avgFrameTime = this.frameTimeHistory.length > 0
      ? this.frameTimeHistory.reduce((a, b) => a + b, 0) / this.frameTimeHistory.length
      : 16.67;
    
    const droppedFrames = this.frameTimeHistory.filter(time => time > 16.67).length;
    const animationJank = droppedFrames > this.frameTimeHistory.length * 0.1; // >10% dropped frames
    
    return {
      fps: Math.round(1000 / avgFrameTime),
      frameTime: avgFrameTime,
      droppedFrames,
      animationJank
    };
  }

  /**
   * Log performance warning
   */
  private logPerformanceWarning(frameTime: number): void {
    if (process.env.NODE_ENV === 'development') {
      console.warn(
        `⚠️ Animation Performance Warning: Frame took ${frameTime.toFixed(2)}ms (target: 16.67ms for 60fps)`
      );
    }
  }

  /**
   * Measure Core Web Vitals
   */
  measureWebVitals(): void {
    // Largest Contentful Paint (LCP)
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1] as PerformanceEntry & { renderTime?: number; loadTime?: number };
      const lcp = lastEntry.renderTime || lastEntry.loadTime || 0;
      
      if (lcp > 2500) {
        console.warn(`⚠️ LCP Warning: ${lcp.toFixed(0)}ms (target: <2500ms)`);
      }
    });
    
    try {
      lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_e) {
      // LCP not supported
    }

    // First Input Delay (FID)
    const fidObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry: PerformanceEntry & { processingStart?: number; startTime: number }) => {
        const fid = (entry.processingStart || entry.startTime) - entry.startTime;
        if (fid > 100) {
          console.warn(`⚠️ FID Warning: ${fid.toFixed(0)}ms (target: <100ms)`);
        }
      });
    });
    
    try {
      fidObserver.observe({ type: 'first-input', buffered: true });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_e) {
      // FID not supported
    }

    // Cumulative Layout Shift (CLS)
    let clsValue = 0;
    const clsObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        const layoutShiftEntry = entry as PerformanceEntry & { hadRecentInput?: boolean; value?: number };
        if (!layoutShiftEntry.hadRecentInput) {
          clsValue += layoutShiftEntry.value || 0;
          if (clsValue > 0.1) {
            console.warn(`⚠️ CLS Warning: ${clsValue.toFixed(3)} (target: <0.1)`);
          }
        }
      }
    });
    
    try {
      clsObserver.observe({ type: 'layout-shift', buffered: true });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_e) {
      // CLS not supported
    }
  }

  /**
   * Profile a specific animation
   */
  async profileAnimation(
    animationName: string,
    animationFn: () => Promise<void>
  ): Promise<void> {
    const startMark = `animation-${animationName}-start`;
    const endMark = `animation-${animationName}-end`;
    const measureName = `animation-${animationName}`;
    
    performance.mark(startMark);
    this.startMonitoring();
    
    await animationFn();
    
    performance.mark(endMark);
    performance.measure(measureName, startMark, endMark);
    
    const metrics = this.getMetrics();
    this.stopMonitoring();
    
    const measure = performance.getEntriesByName(measureName)[0];
    
    if (process.env.NODE_ENV === 'development') {
      console.group(`📊 Animation Profile: ${animationName}`);
      console.log(`Duration: ${measure.duration.toFixed(2)}ms`);
      console.log(`Average FPS: ${metrics.fps}`);
      console.log(`Average Frame Time: ${metrics.frameTime.toFixed(2)}ms`);
      console.log(`Dropped Frames: ${metrics.droppedFrames}`);
      console.log(`Has Jank: ${metrics.animationJank ? '❌ Yes' : '✅ No'}`);
      console.groupEnd();
    }
    
    // Clean up marks and measures
    performance.clearMarks(startMark);
    performance.clearMarks(endMark);
    performance.clearMeasures(measureName);
  }

  /**
   * Check if device prefers reduced motion
   */
  prefersReducedMotion(): boolean {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  /**
   * Get device performance tier
   */
  getDevicePerformanceTier(): 'high' | 'medium' | 'low' {
    const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;
    const cores = navigator.hardwareConcurrency;
    
    if (memory && memory >= 8 && cores >= 4) return 'high';
    if (memory && memory >= 4 && cores >= 2) return 'medium';
    return 'low';
  }

  /**
   * Optimize animations based on device capabilities
   */
  getOptimizedAnimationSettings() {
    const tier = this.getDevicePerformanceTier();
    const reducedMotion = this.prefersReducedMotion();
    
    if (reducedMotion) {
      return {
        enableAnimations: false,
        transitionDuration: 0,
        animationComplexity: 'none'
      };
    }
    
    switch (tier) {
      case 'high':
        return {
          enableAnimations: true,
          transitionDuration: 300,
          animationComplexity: 'full',
          enableParallax: true,
          enableBlur: true,
          maxAnimatedElements: 50
        };
      case 'medium':
        return {
          enableAnimations: true,
          transitionDuration: 200,
          animationComplexity: 'reduced',
          enableParallax: false,
          enableBlur: true,
          maxAnimatedElements: 20
        };
      case 'low':
        return {
          enableAnimations: true,
          transitionDuration: 150,
          animationComplexity: 'minimal',
          enableParallax: false,
          enableBlur: false,
          maxAnimatedElements: 10
        };
    }
  }
}

// Export singleton instance
export const performanceMonitor = new PerformanceMonitor();

// Auto-start monitoring in development
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  performanceMonitor.measureWebVitals();
  
  // Log performance tier on load
  console.log(
    `🎮 Device Performance Tier: ${performanceMonitor.getDevicePerformanceTier()}`,
    performanceMonitor.getOptimizedAnimationSettings()
  );
}

export default performanceMonitor;