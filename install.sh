#!/bin/bash

GREEN='\033[0;32m'
CYAN='\033[0;36m'
RED='\033[0;31m'
NC='\033[0m'

command_exists() {
    command -v "$1" >/dev/null 2>&1
}

echo -e "${CYAN}Starting installation for Youtube-Dl Downloader...${NC}"

echo -e "${CYAN}Requesting storage permissions...${NC}"
termux-setup-storage || { echo -e "${RED}Failed to setup storage permissions${NC}"; exit 1; }
sleep 2

echo -e "${CYAN}Updating package list...${NC}"
pkg update -y || { echo -e "${RED}Failed to update package list${NC}"; exit 1; }

if ! command_exists node; then
    echo -e "${CYAN}Installing Node.js...${NC}"
    pkg install -y nodejs || { echo -e "${RED}Failed to install Node.js${NC}"; exit 1; }
else
    echo -e "${GREEN}Node.js is already installed.$(node -v)${NC}"
fi

if ! command_exists npm; then
    echo -e "${CYAN}Installing npm...${NC}"
    pkg install -y npm || { echo -e "${RED}Failed to install npm${NC}"; exit 1; }
else
    echo -e "${GREEN}npm is already installed.$(npm -v)${NC}"
fi

if ! command_exists yt-dlp; then
    echo -e "${CYAN}Installing yt-dlp...${NC}"
    pkg install -y python
    pip install -U yt-dlp || { echo -e "${RED}Failed to install yt-dlp${NC}"; exit 1; }
else
    echo -e "${GREEN}yt-dlp is already installed.${NC}"
fi

if ! command_exists ffmpeg; then
    echo -e "${CYAN}Installing ffmpeg...${NC}"
    pkg install -y ffmpeg || { echo -e "${RED}Failed to install ffmpeg${NC}"; exit 1; }
else
    echo -e "${GREEN}ffmpeg is already installed.${NC}"
fi

echo -e "${CYAN}Installing Node.js dependencies...${NC}"
npm install || { echo -e "${RED}Failed to install ${NC}"; exit 1; }

echo -e "${GREEN}Installation completed successfully!${NC}"
echo -e "${CYAN}Run 'npm start' to start the Youtube-Dl Downloader.${NC}"

npm start