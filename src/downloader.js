import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import snapsave from 'snapsave-downloader2';
import { promisify } from 'util';
import axios from 'axios';
import os from 'os';

const execPromise = promisify(exec);
const info = chalk.cyanBright;
const success = chalk.greenBright;
const error = chalk.redBright;

const platform = os.platform();
const basePath = platform === 'win32' ? `${os.homedir()}\\Desktop\\InstaTubeDL` : '/sdcard/InstaTubeDL';

export function sanitizeFilename(title) {
    return title.replace(/[^a-zA-Z0-9]/g, '_').slice(0, 50);
}

export async function getVideoTitle(url) {
    try {
        const { stdout } = await execPromise(`yt-dlp --get-title "${url}"`);
        return stdout.trim();
    } catch (err) {
        throw new Error('Invalid YouTube URL or yt-dlp not installed');
    }
}

export async function downloadContent(url, type) {
    const outputDir = path.join(basePath, type === 'video' ? 'Video' : 'Audio');
    const ext = type === 'video' ? 'mp4' : 'mp3';

    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    try {
        const title = await getVideoTitle(url);
        const sanitizedTitle = sanitizeFilename(title);
        const outputPath = path.join(outputDir, `${sanitizedTitle}.%(ext)s`);
        const finalPath = outputPath.replace('%(ext)s', ext);

        console.log(info(`\n📋 Title: ${title}`));
        console.log(info(`💾 Saving to: ${finalPath}`));
        console.log(info('🚀 Starting download...'));

        const ffmpegPath = 'C:\\ffmpeg\\bin\\ffmpeg.exe'; // Adjust this path
        const command = type === 'video'
            ? `yt-dlp -f "bestvideo[ext=mp4]+bestaudio[ext=m4a]/best[ext=mp4]" -o "${outputPath}" "${url}" --ffmpeg-location "${ffmpegPath}"`
            : `yt-dlp -x --audio-format mp3 -o "${outputPath}" "${url}" --ffmpeg-location "${ffmpegPath}"`;

        await execPromise(command, { encoding: 'utf8' });

        console.log(success('✅ Download completed!'));
        return true;
    } catch (err) {
        console.log(error(`❌ Download failed: ${err.message}`));
        return false;
    }
}

async function downloadVideo(url, outputPath) {
    const writer = fs.createWriteStream(outputPath);

    const response = await axios({
        url,
        method: 'GET',
        responseType: 'stream'
    });

    response.data.pipe(writer);

    return new Promise((resolve, reject) => {
        writer.on('finish', resolve);
        writer.on('error', reject);
    });
}

export async function downloadInstagram(link) {
    const outputDir = path.join(basePath, 'Instagram');

    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    try {
        console.log(info('\n📋 Fetching Instagram content...'));
        const igdl = await snapsave(link);

        if (!igdl || !igdl.data || igdl.data.length === 0) {
            throw new Error('No downloadable content found');
        }

        const media = igdl.data[0];
        const timestamp = Date.now();
        const filename = `instagram_${timestamp}.mp4`;
        const outputPath = path.join(outputDir, filename);

        console.log(info(`💾 Saving Instagram content to: ${outputPath}`));
        console.log(info('🚀 Starting download...'));

        await downloadVideo(media.url, outputPath);

        console.log(success('✅ Instagram download completed!'));
        return true;
    } catch (err) {
        console.log(error(`❌ Instagram download failed: ${err.message}`));
        return false;
    }
}

export async function downloadSpotify(link) {
    const outputDir = path.join(basePath, 'Spotify');

    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    try {
        console.log(info('\n📋 Fetching Spotify content...'));
        const outputPath = path.join(outputDir, '%(title)s.%(ext)s');
        
        console.log(info(`💾 Saving Spotify content to: ${outputDir}`));
        console.log(info('🚀 Starting download...'));

        const ffmpegPath = 'C:\\ffmpeg\\bin\\ffmpeg.exe'; // Adjust this path
        const command = `spotdl download "${link}" --output "${outputPath}" --ffmpeg "${ffmpegPath}"`;
        await execPromise(command, { encoding: 'utf8' });

        console.log(success('✅ Spotify download completed!'));
        return true;
    } catch (err) {
        console.log(error(`❌ Spotify download failed: ${err.message}`));
        return false;
    }
}
