import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import { promisify } from 'util';

const execPromise = promisify(exec);
const info = chalk.cyanBright;
const success = chalk.greenBright;
const error = chalk.redBright;

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
    const basePath = '/sdcard/Youtube-Dl';
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

        const command = type === 'video'
            ? `yt-dlp -f "bestvideo[ext=mp4]+bestaudio[ext=m4a]/best[ext=mp4]" -o "${outputPath}" "${url}"`
            : `yt-dlp -x --audio-format mp3 -o "${outputPath}" "${url}"`;

        await execPromise(command, { encoding: 'utf8' });

        console.log(success('✅ Download completed!'));
        return true;
    } catch (err) {
        console.log(error(`❌ Download failed: ${err.message}`));
        return false;
    }
}