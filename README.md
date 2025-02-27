
# InstaTubeDL

A command-line tool to download media from YouTube, Instagram, and Spotify.

## Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/SafwanGanz/instatube_dl.git
   cd instatube_dl
   ```

2. **Run the Installation Script (Termux)**:
   ```bash
   chmod +x install.sh
   ./install.sh
   ```
   - This script sets up storage permissions, installs dependencies (Node.js, npm, Python, yt-dlp, ffmpeg, Rust, spotdl), and runs `npm install`.

## Usage

1. **Start the Application**:
   ```bash
   npm start
   ```
   - Launches the CLI interface.

2. **Choose a Platform**:
   - Select from:
     - `1` for YouTube
     - `2` for Instagram
     - `3` for Spotify
     - Type `exit` to quit

3. **Follow Prompts**:
   - **YouTube**: Enter a YouTube URL, then choose `video` or `audio`.
   - **Instagram**: Enter an Instagram URL (downloads as video).
   - **Spotify**: Enter a Spotify URL (track, playlist, or album; downloads as audio).

### Save Locations (Termux/Android)
- **YouTube**:
  - Videos: `/sdcard/InstaTubeDL/Video`
  - Audio: `/sdcard/InstaTubeDL/Audio`
- **Instagram**:
  - Videos: `/sdcard/InstaTubeDL/Instagram`
- **Spotify**:
  - Audio: `/sdcard/InstaTubeDL/Spotify`

### Save Locations (Windows)
- Files are saved to your Desktop under:
  - `~/Desktop/InstaTubeDL/Video`
  - `~/Desktop/InstaTubeDL/Audio`
  - `~/Desktop/InstaTubeDL/Instagram`
  - `~/Desktop/InstaTubeDL/Spotify`

## Requirements
- **Termux** (Android):
  - Install from [F-Droid](https://f-droid.org/packages/com.termux/).
  - Grant storage permissions when prompted.
- **Dependencies**:
  - Node.js, npm, Python, yt-dlp, ffmpeg, Rust, spotdl (installed by `install.sh`).
- **Windows**:
  - Ensure FFmpeg is installed and adjust the `ffmpegPath` in `src/downloader.js` if not in PATH.

## Notes
- **Legal Disclaimer**: Downloading content from YouTube, Instagram, or Spotify may violate their terms of service. Use this tool responsibly and for educational purposes only.
- **Troubleshooting**: If `spotdl` installation fails, ensure Rust is installed (`pkg install rust`) and retry `pip install spotdl`.

## Credits
- Created by SafwanGanz
```

### Changes and Enhancements
1. **Consistency**: Standardized directory names to `InstaTubeDL` (capitalized consistently as in your code).
2. **Structure**: Organized into clear sections (Installation, Usage, etc.).
3. **Platform Support**: Added Windows save locations since your code supports both Termux and Windows.
4. **Usage Details**: Expanded instructions to cover all three platforms (YouTube, Instagram, Spotify).
5. **Requirements**: Listed dependencies and added a note about Termux installation.
6. **Notes**: Included a legal disclaimer and troubleshooting tip based on your `spotdl` installation issue.
7. **Credits**: Added your name as the creator.

### How to Use This
- Save this content in a file named `README.md` in your `instatube_dl` directory.
- Push it to your GitHub repository:
  ```bash
  git add README.md
  git commit -m "Add README documentation"
  git push origin main

