const setTheme = require('./setTheme');

module.exports = async (page, scenario, viewport, isReference, browserContext) => {
  console.log('SCENARIO > ' + scenario.label + ' (Starting)');

  // 1. Wait for body to ensure page is loaded
  await page.waitForSelector('body', { timeout: 10000 });

  // 2. Wait for window.app to be defined
  try {
      await page.waitForFunction(() => typeof window.app !== 'undefined' && typeof window.app.openVPPDrawer === 'function', { timeout: 10000 });
  } catch (e) {
      console.error('ERROR: App not ready or openVPPDrawer not found');
      // Take a screenshot for debug if possible, or just log
  }

  // 3. Set Theme
  await setTheme(page, scenario);

  // 4. Open Drawer
  console.log('SCENARIO > ' + scenario.label + ' (Opening Drawer)');
  await page.evaluate(() => {
    if (window.app && window.app.openVPPDrawer) {
        window.app.openVPPDrawer();
    }
  });

  // 5. Wait for animation/render
  await new Promise(r => setTimeout(r, 1000));
};
