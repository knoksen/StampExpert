/**
 * Desktop Application Test Suite
 * Tests specifically for the Electron desktop application features
 */

const { test, expect } = require('@jest/globals');
const fs = require('fs');
const path = require('path');

describe('Desktop Application Configuration', () => {
  test('main.js should exist and be properly configured', () => {
    const mainPath = path.join(__dirname, '..', 'main.js');
    expect(fs.existsSync(mainPath)).toBe(true);
    
    const mainContent = fs.readFileSync(mainPath, 'utf8');
    expect(mainContent).toContain('app.whenReady()');
    expect(mainContent).toContain('BrowserWindow');
    expect(mainContent).toContain('Express server');
  });

  test('package.json should have desktop configuration', () => {
    const packagePath = path.join(__dirname, '..', 'package.json');
    const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
    
    expect(packageJson.main).toBe('main.js');
    expect(packageJson.build).toBeDefined();
    expect(packageJson.build.appId).toBe('com.stampexpert.desktop');
    expect(packageJson.build.productName).toBe('StampExpert');
    
    expect(packageJson.scripts.electron).toBeDefined();
    expect(packageJson.scripts['dist-win']).toBeDefined();
    
    expect(packageJson.devDependencies.electron).toBeDefined();
    expect(packageJson.devDependencies['electron-builder']).toBeDefined();
  });

  test('desktop UI enhancements should be present', () => {
    const htmlPath = path.join(__dirname, '..', 'public', 'index.html');
    const htmlContent = fs.readFileSync(htmlPath, 'utf8');
    
    expect(htmlContent).toContain('StampExpert Desktop');
    expect(htmlContent).toContain('Windows 10 Desktop Application');
    expect(htmlContent).toContain('Keyboard Shortcuts');
    expect(htmlContent).toContain('desktop-app');
    expect(htmlContent).toContain('Ctrl+N');
    expect(htmlContent).toContain('Ctrl+O');
  });

  test('desktop assets should be properly configured', () => {
    const assetsPath = path.join(__dirname, '..', 'assets');
    expect(fs.existsSync(assetsPath)).toBe(true);
    
    const iconPath = path.join(assetsPath, 'icon.png');
    const icoPath = path.join(assetsPath, 'icon.ico');
    
    expect(fs.existsSync(iconPath)).toBe(true);
    expect(fs.existsSync(icoPath)).toBe(true);
  });

  test('build configuration should be valid', () => {
    const packagePath = path.join(__dirname, '..', 'package.json');
    const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
    
    const buildConfig = packageJson.build;
    expect(buildConfig.files).toContain('main.js');
    expect(buildConfig.files).toContain('server.js');
    expect(buildConfig.files).toContain('public/**/*');
    expect(buildConfig.files).toContain('src/**/*');
    
    expect(buildConfig.win).toBeDefined();
    expect(buildConfig.win.target).toBeDefined();
    expect(buildConfig.nsis).toBeDefined();
  });

  test('launcher script should exist', () => {
    const launcherPath = path.join(__dirname, '..', 'desktop-launcher.js');
    expect(fs.existsSync(launcherPath)).toBe(true);
    
    const launcherContent = fs.readFileSync(launcherPath, 'utf8');
    expect(launcherContent).toContain('StampExpert Desktop Application');
    expect(launcherContent).toContain('headless environment');
    expect(launcherContent).toContain('Windows packaging');
  });
});