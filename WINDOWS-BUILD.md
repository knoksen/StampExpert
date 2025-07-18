# Building StampExpert for Windows 10

This guide explains how to build the StampExpert desktop application for Windows 10.

## Prerequisites

1. **Node.js 16+** - Download from [nodejs.org](https://nodejs.org)
2. **Git** - For cloning the repository
3. **Windows 10** - Target platform

## Quick Build

```bash
# Clone the repository
git clone https://github.com/knoksen/StampExpert.git
cd StampExpert

# Install dependencies
npm install

# Test the application (optional)
npm test

# Build Windows installer
npm run dist-win
```

## Available Build Commands

```bash
# Development
npm run electron-dev     # Run desktop app in development mode
npm start               # Run web version only

# Testing
npm test                # Run all tests including desktop tests
node desktop-launcher.js # Test desktop app functionality

# Building
npm run pack            # Build unpacked application
npm run dist            # Build for current platform
npm run dist-win        # Build Windows installer and portable
```

## Build Outputs

After running `npm run dist-win`, you'll find:

```
dist/
├── StampExpert Setup 1.0.0.exe    # Windows installer (NSIS)
├── StampExpert 1.0.0.exe           # Portable executable
└── win-unpacked/                   # Unpacked application folder
    ├── StampExpert.exe             # Main executable
    ├── resources/                  # Application resources
    └── ...                         # Electron runtime files
```

## Installation Types

### 1. Installer (Recommended)
- **File**: `StampExpert Setup 1.0.0.exe`
- **Size**: ~150-200 MB
- **Features**: 
  - Installs to Program Files
  - Creates Start Menu shortcuts
  - Creates Desktop shortcut
  - Automatic updates (future)
  - Uninstaller

### 2. Portable
- **File**: `StampExpert 1.0.0.exe`
- **Size**: ~150-200 MB
- **Features**:
  - No installation required
  - Run from any location
  - Stores data locally
  - Perfect for USB drives

## Application Features

✅ **Native Windows 10 Integration**
- Windows-style menus and dialogs
- System notifications
- File associations (future)
- Windows 10 design language

✅ **Desktop Enhancements**
- Keyboard shortcuts (Ctrl+N, Ctrl+O, F11)
- Right-click context menus
- Drag & drop from Explorer
- Offline functionality

✅ **Security Features**
- Code signed executable (future)
- Sandboxed web content
- No Node.js access from renderer
- CSP headers

## System Requirements

- **OS**: Windows 10 (64-bit)
- **RAM**: 4 GB minimum, 8 GB recommended
- **Storage**: 500 MB free space
- **Network**: Required for stamp database (optional for offline use)

## Troubleshooting

### Build Issues

**Error: `electron-builder` not found**
```bash
npm install --save-dev electron-builder
```

**Error: Python/Visual Studio build tools**
```bash
npm install --global windows-build-tools
```

**Error: Out of memory during build**
```bash
node --max-old-space-size=4096 ./node_modules/.bin/electron-builder --win
```

### Runtime Issues

**App won't start**
- Check Windows Defender/antivirus
- Run as administrator
- Check Event Viewer for errors

**Port already in use**
- Close other instances
- Check Task Manager for node.exe processes

### Performance Issues

**Slow startup**
- Disable Windows Defender real-time scanning for app folder
- Add exclusion for StampExpert.exe

**High memory usage**
- Normal for Electron apps (Chrome engine)
- Typically 100-200 MB RAM usage

## Distribution

### Code Signing (Recommended for Production)

1. Obtain code signing certificate
2. Configure in package.json:
```json
{
  "build": {
    "win": {
      "certificateFile": "path/to/certificate.p12",
      "certificatePassword": "password"
    }
  }
}
```

### Auto-Updates (Future Enhancement)

1. Set up update server
2. Configure update URL in package.json
3. Implement update notifications

## Development Notes

- Main process: `main.js` (Electron)
- Renderer process: `public/index.html` + `src/app.js`
- Backend API: `server.js` (Express)
- Build config: `package.json` (electron-builder)

The application architecture uses Electron to wrap the existing web application, providing native desktop integration while maintaining the original functionality.