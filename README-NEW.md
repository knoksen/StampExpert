# StampExpert Desktop

<p align="center">
  <img src="assets/icon.png" alt="StampExpert Logo" width="128" height="128">
</p>

<p align="center">
  <strong>Professional Stamp Identification and Collection Management</strong>
</p>

<p align="center">
  Identify and catalog stamps from around the world with our advanced recognition system.<br>
  Discover rarity, origin, and historical significance of your stamp collection.
</p>

## ✨ Features

### 🔍 Advanced Stamp Analysis

- **Image Recognition**: Upload stamp images for instant identification
- **Technical Analysis**: Image quality assessment, dimensions, and color analysis
- **Confidence Scoring**: AI-powered confidence ratings for accurate results
- **Comprehensive Database**: Extensive collection of stamps from around the world

### 📊 Collection Management

- **Personal Collection**: Save and organize your stamp discoveries
- **Smart Filtering**: Filter by country, rarity, and other criteria
- **Statistics Dashboard**: Track collection size, countries, rare stamps, and estimated value
- **Import/Export**: Backup and share your collection with JSON export/import

### 🎨 User Experience

- **Drag & Drop**: Intuitive file upload with drag-and-drop support
- **Keyboard Shortcuts**: Efficient navigation with keyboard shortcuts
- **Responsive Design**: Works beautifully on different screen sizes
- **Real-time Feedback**: Instant feedback with success/error messages

### 🛠️ Technical Features

- **Cross-Platform**: Windows, macOS, and Linux support
- **Offline Capable**: Works without internet connection
- **Local Storage**: Data persists between sessions
- **Image Processing**: Client-side image analysis and optimization

## 🚀 Quick Start

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/StampExpert.git
   cd StampExpert
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the application:

   ```bash
   npm run electron
   ```

### Building for Distribution

```bash
# Build the application
npm run build

# Create distributable packages
npm run dist

# Windows-specific build
npm run dist-win
```

## 🎯 Usage

### Analyzing Stamps

1. **Upload Image**: Click "Browse Files" or drag & drop a stamp image
2. **Analyze**: Click "Analyze Stamp" to process the image
3. **Review Results**: View detailed information about your stamp
4. **Save**: Add the stamp to your personal collection

### Managing Collection

1. **View Collection**: Scroll down to see your saved stamps
2. **Filter**: Use country and rarity filters to find specific stamps
3. **Statistics**: Monitor your collection growth and value
4. **Export**: Backup your collection using the Export button

### Keyboard Shortcuts

- `Ctrl+O`: Open image file
- `Ctrl+E`: Export collection
- `Esc`: Cancel current operation
- `F11`: Toggle fullscreen

## 📁 Project Structure

```
StampExpert/
├── assets/              # Application icons and assets
├── public/              # Web application files
│   └── index.html       # Main HTML file
├── src/                 # Source code
│   ├── app.js          # Main application logic
│   └── styles.css      # Custom styles
├── tests/              # Test files
├── main.js             # Electron main process
├── server.js           # Express server
├── build.js            # Build script
└── package.json        # Project configuration
```

## 🧪 Testing

Run the test suite:

```bash
npm test
```

The application includes comprehensive tests for:

- Server functionality
- Desktop application features
- Basic API endpoints

## 🔧 Development

### Development Mode

```bash
# Start in development mode
npm run electron-dev
```

### Adding New Stamps

To add new stamps to the database, edit the `stampDatabase` object in `src/app.js`.

### Customizing Styles

Modify `src/styles.css` for custom styling. The application uses Tailwind CSS for base styling.

## 🌟 Stamp Database

The application includes stamps from various countries and time periods:

- **USA**: Including the famous Inverted Jenny
- **UK**: Penny Black and Penny Red
- **France**: Ceres series
- **Germany**: Imperial Eagle stamps
- **Japan**: Dragon series
- **Canada**: Black Empress
- **Brazil**: Bull's Eye
- **Australia**: Kangaroo and Map

Each stamp entry includes:

- Country of origin
- Year of issue
- Denomination
- Catalog number
- Rarity classification
- Condition assessment
- Estimated value
- Historical description

## 📊 Rarity Classifications

- **Common**: Easily found stamps
- **Uncommon**: Less frequently seen
- **Rare**: Hard to find specimens
- **Ultra-Rare**: Very scarce stamps
- **Legendary**: Extremely rare and valuable

## 🎨 UI/UX Features

### Visual Enhancements

- Smooth animations and transitions
- Hover effects for interactive elements
- Color-coded rarity indicators
- Responsive grid layouts

### Accessibility

- Keyboard navigation support
- Screen reader compatible
- High contrast design
- Accessible form controls

## 🔐 Privacy & Security

- **Local Storage**: All data stays on your device
- **No Tracking**: No user data collection
- **Secure**: No external data transmission
- **Privacy First**: Your collection remains private

## 📱 Platform Support

### Windows

- Windows 10 and later
- Both x64 and x86 architectures
- NSIS installer available

### macOS

- macOS 10.14 and later
- Universal binary support
- DMG installer

### Linux

- Most modern distributions
- AppImage and Snap packages
- Debian/Ubuntu DEB packages

## 🛠️ Technical Details

### Built With

- **Electron**: Cross-platform desktop app framework
- **Express**: Web server framework
- **Tailwind CSS**: Utility-first CSS framework
- **Font Awesome**: Icon library
- **Jest**: Testing framework

### Performance

- **Fast Startup**: Optimized loading times
- **Efficient Memory**: Minimal resource usage
- **Responsive**: Smooth user interactions
- **Scalable**: Handles large collections

## 🔄 Updates & Maintenance

### Auto-Updates

Future versions will include automatic update checking and installation.

### Backup Recommendations

- Regular export of your collection
- Keep backups in multiple locations
- Use version control for important collections

## 🤝 Contributing

Contributions are welcome! Please feel free to:

- Report bugs
- Suggest new features
- Submit pull requests
- Improve documentation

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Stamp images from Wikimedia Commons
- Historical stamp data from various philatelic sources
- Icon design inspired by classic stamp designs

---

<p align="center">
  Made with ❤️ for stamp collectors worldwide
</p>
