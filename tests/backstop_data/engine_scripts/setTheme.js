module.exports = async (page, scenario) => {
  console.log('SCENARIO > ' + scenario.label);
  
  // Ensure app is loaded
  try {
    await page.waitForFunction(() => typeof window.app !== 'undefined', { timeout: 5000 });
  } catch (e) {
    console.log('DEBUG: Timed out waiting for app in setTheme.js');
  }

  if (scenario.label.includes('Dark')) {
    await page.evaluate(() => {
      if (window.app && window.app.applyTheme) {
        window.app.applyTheme('dark');
      }
    });
  } else {
    await page.evaluate(() => {
      if (window.app && window.app.applyTheme) {
        window.app.applyTheme('light');
      }
    });
  }
  
  // Wait for transitions to complete
  await new Promise(r => setTimeout(r, 1000));
};
