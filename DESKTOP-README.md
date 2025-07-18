# StampExpert Desktop Application

A Windows 10 desktop application for identifying and cataloging stamps from around the world using advanced recognition technology.

## Features

- 🖥️ Native Windows 10 desktop application
- 🔍 Advanced stamp recognition and analysis
- 📚 Personal stamp collection management
- 🏷️ Detailed stamp information including rarity, value, and historical context
- 📊 Collection filtering and organization
- 💾 Local data storage
- 🎨 Modern, intuitive user interface

## Installation

### For Windows 10 Users

1. Download the installer from the releases page
2. Run `StampExpert-Setup-1.0.0.exe`
3. Follow the installation wizard
4. Launch StampExpert from the Start Menu or Desktop shortcut

### For Developers

```bash
# Clone the repository
git clone https://github.com/knoksen/StampExpert.git
cd StampExpert

# Install dependencies
npm install

# Run in development mode
npm run electron-dev

# Build for Windows
npm run dist-win
```

## Usage

1. **Upload a Stamp**: Drag and drop a stamp image or click "Browse Files"
2. **Analyze**: Click "Analyze Stamp" to identify the stamp
3. **Review Results**: View detailed information about country, year, rarity, and value
4. **Save to Collection**: Add interesting stamps to your personal collection
5. **Manage Collection**: Filter and organize your stamps by country or rarity

## Keyboard Shortcuts

- `Ctrl+N` - Start new stamp analysis
- `Ctrl+O` - View stamp collection
- `Ctrl+Q` - Exit application
- `F11` - Toggle fullscreen mode
- `Ctrl+R` - Reload application

## System Requirements

- Windows 10 (64-bit)
- 4 GB RAM minimum
- 500 MB free disk space
- Internet connection for stamp database updates

## Building from Source

### Prerequisites
- Node.js 16 or higher
- npm or yarn package manager

### Build Commands
```bash
# Install dependencies
npm install

# Test the application
npm run electron-dev

# Create Windows distribution
npm run dist-win

# Create portable version
npm run pack
```

## Architecture

The application uses:
- **Electron** - Desktop application framework
- **Express.js** - Backend server for API endpoints
- **HTML/CSS/JavaScript** - Frontend user interface
- **Node.js** - Runtime environment

## File Structure
```
StampExpert/
├── main.js              # Electron main process
├── server.js            # Express server
├── public/              # Frontend assets
│   └── index.html       # Main application page
├── src/                 # Application logic
│   ├── app.js          # Frontend JavaScript
│   └── styles.css      # Application styles
├── assets/             # Application icons and resources
└── dist/               # Built application (after build)
```

## Security

The application implements several security measures:
- Content Security Policy (CSP)
- Sandboxed renderer processes
- No Node.js integration in renderer
- External link handling
- Input validation and sanitization

## Troubleshooting

### Application Won't Start
- Ensure Windows 10 is up to date
- Check that all dependencies are installed
- Try running as administrator

### Stamp Analysis Not Working
- Check internet connection
- Verify image file format (JPG, PNG supported)
- Ensure image file size is under 10MB

### Collection Not Saving
- Check available disk space
- Verify write permissions in application directory

## Support

For issues and support:
- Create an issue on GitHub
- Check the documentation
- Review troubleshooting guide

## License

This project is licensed under the MIT License - see the LICENSE file for details.