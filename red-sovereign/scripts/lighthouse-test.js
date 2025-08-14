const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');
const fs = require('fs');
const path = require('path');

async function runLighthouse() {
  // Wait for server to be ready
  await new Promise(resolve => setTimeout(resolve, 5000));
  
  const chrome = await chromeLauncher.launch({
    chromeFlags: ['--headless', '--disable-gpu', '--no-sandbox']
  });
  
  const options = {
    logLevel: 'info',
    output: 'json',
    port: chrome.port,
    onlyCategories: ['performance', 'accessibility', 'best-practices'],
    throttling: {
      rttMs: 40,
      throughputKbps: 10 * 1024,
      cpuSlowdownMultiplier: 1,
    },
    screenEmulation: {
      mobile: false,
      width: 1920,
      height: 1080,
      deviceScaleFactor: 1,
    },
  };
  
  try {
    const runnerResult = await lighthouse('http://localhost:3002', options);
    
    // Extract scores
    const scores = {
      performance: Math.round(runnerResult.lhr.categories.performance.score * 100),
      accessibility: Math.round(runnerResult.lhr.categories.accessibility.score * 100),
      bestPractices: Math.round(runnerResult.lhr.categories['best-practices'].score * 100),
    };
    
    // Extract key metrics
    const metrics = {
      FCP: runnerResult.lhr.audits['first-contentful-paint'].numericValue,
      LCP: runnerResult.lhr.audits['largest-contentful-paint'].numericValue,
      TBT: runnerResult.lhr.audits['total-blocking-time'].numericValue,
      CLS: runnerResult.lhr.audits['cumulative-layout-shift'].numericValue,
      SI: runnerResult.lhr.audits['speed-index'].numericValue,
    };
    
    console.log('\n=================================');
    console.log('   LIGHTHOUSE PERFORMANCE AUDIT');
    console.log('=================================\n');
    
    // Display scores with color coding
    console.log('📊 SCORES:');
    console.log(`   Performance:    ${getScoreEmoji(scores.performance)} ${scores.performance}/100`);
    console.log(`   Accessibility:  ${getScoreEmoji(scores.accessibility)} ${scores.accessibility}/100`);
    console.log(`   Best Practices: ${getScoreEmoji(scores.bestPractices)} ${scores.bestPractices}/100`);
    
    console.log('\n📈 KEY METRICS:');
    console.log(`   First Contentful Paint (FCP):    ${(metrics.FCP / 1000).toFixed(2)}s ${getFCPStatus(metrics.FCP)}`);
    console.log(`   Largest Contentful Paint (LCP):  ${(metrics.LCP / 1000).toFixed(2)}s ${getLCPStatus(metrics.LCP)}`);
    console.log(`   Total Blocking Time (TBT):       ${metrics.TBT.toFixed(0)}ms ${getTBTStatus(metrics.TBT)}`);
    console.log(`   Cumulative Layout Shift (CLS):   ${metrics.CLS.toFixed(3)} ${getCLSStatus(metrics.CLS)}`);
    console.log(`   Speed Index:                     ${(metrics.SI / 1000).toFixed(2)}s ${getSIStatus(metrics.SI)}`);
    
    // Check against requirements
    console.log('\n🎯 REQUIREMENTS CHECK:');
    const passed = scores.performance >= 95;
    console.log(`   Target Score: 95`);
    console.log(`   Actual Score: ${scores.performance}`);
    console.log(`   Status: ${passed ? '✅ PASSED' : '❌ FAILED'}`);
    
    if (!passed) {
      console.log('\n⚠️  OPTIMIZATION NEEDED:');
      
      // Analyze specific issues
      const audits = runnerResult.lhr.audits;
      
      if (audits['uses-optimized-images']?.score < 1) {
        console.log('   • Optimize images (use WebP/AVIF format)');
      }
      if (audits['unused-css-rules']?.score < 1) {
        console.log('   • Remove unused CSS');
      }
      if (audits['unused-javascript']?.score < 1) {
        console.log('   • Remove unused JavaScript');
      }
      if (audits['render-blocking-resources']?.score < 1) {
        console.log('   • Eliminate render-blocking resources');
      }
      if (audits['uses-text-compression']?.score < 1) {
        console.log('   • Enable text compression');
      }
      if (metrics.TBT > 300) {
        console.log('   • Reduce JavaScript execution time');
      }
      if (metrics.CLS > 0.1) {
        console.log('   • Fix layout shifts');
      }
    }
    
    // Save detailed report
    const reportPath = path.join(__dirname, '..', 'lighthouse-report.json');
    fs.writeFileSync(reportPath, JSON.stringify(runnerResult.lhr, null, 2));
    console.log(`\n📄 Full report saved to: ${reportPath}`);
    
  } finally {
    await chrome.kill();
  }
}

function getScoreEmoji(score) {
  if (score >= 90) return '🟢';
  if (score >= 50) return '🟡';
  return '🔴';
}

function getFCPStatus(value) {
  if (value <= 1800) return '🟢';
  if (value <= 3000) return '🟡';
  return '🔴';
}

function getLCPStatus(value) {
  if (value <= 2500) return '🟢';
  if (value <= 4000) return '🟡';
  return '🔴';
}

function getTBTStatus(value) {
  if (value <= 200) return '🟢';
  if (value <= 600) return '🟡';
  return '🔴';
}

function getCLSStatus(value) {
  if (value <= 0.1) return '🟢';
  if (value <= 0.25) return '🟡';
  return '🔴';
}

function getSIStatus(value) {
  if (value <= 3400) return '🟢';
  if (value <= 5800) return '🟡';
  return '🔴';
}

runLighthouse().catch(console.error);