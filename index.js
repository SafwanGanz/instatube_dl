import readline from 'readline';
import chalk from 'chalk';
import { sanitizeFilename, getVideoTitle, downloadContent, downloadInstagram, downloadSpotify } from './src/downloader.js';
import os from 'os';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const info = chalk.cyanBright;
const success = chalk.greenBright;
const error = chalk.redBright;
const prompt = chalk.yellowBright;
const header = chalk.blueBright;

const platform = os.platform();
const basePath = platform === 'win32' ? `${os.homedir()}\\Desktop\\InstaTubeDL` : '/sdcard/InstaTubeDL';

const banner = `
${header('  ╔════════════════════════════════════╗')}
${header('  ║                                    ║')}
${header('  ║         🎥  InstaTubeDL  🎵         ║')}
${header('  ║                                    ║')}
${header('  ╚════════════════════════════════════╝')}
${chalk.dim('            SafwanGanz            ')}
`;

function drawLine(length = 40) {
    return header('─'.repeat(length));
}

function askQuestion(query) {
    return new Promise((resolve) => rl.question(prompt(`\n${query} `), resolve));
}

async function startCLI() {
    console.log(banner);
    console.log(drawLine());
    console.log(info(`Save location: ${basePath}`));

    while (true) {
        console.log(info('\nSelect a platform to download from:'));
        console.log(header('1. YouTube'));
        console.log(header('2. Instagram'));
        console.log(header('3. Spotify'));
        console.log(info('Or type "exit" to quit'));
        console.log(drawLine());

        const choice = await askQuestion('Enter your choice (1-3):');
        
        if (choice.toLowerCase() === 'exit') {
            console.log(info('\n👋 Goodbye!'));
            console.log(drawLine());
            rl.close();
            break;
        }

        if (choice === '1') {
            const url = await askQuestion('🌐 Enter YouTube URL:');
            if (!url || (!url.includes('youtube.com') && !url.includes('youtu.be'))) {
                console.log(error('\n❌ Invalid URL! Must be a valid YouTube link.'));
                console.log(drawLine());
                continue;
            }

            const type = (await askQuestion('🎬 Download as (video/audio):')).toLowerCase();
            if (!['video', 'audio'].includes(type)) {
                console.log(error('\n❌ Invalid option! Choose "video" or "audio".'));
                console.log(drawLine());
                continue;
            }

            console.log(drawLine());
            const result = await downloadContent(url, type);
            console.log(drawLine());

            if (result) {
                console.log(info('\n🎉 Ready for your next download!'));
            } else {
                console.log(info('\n⏳ Something went wrong, but you can try again!'));
            }
        } 
        else if (choice === '2') {
            const url = await askQuestion('🌐 Enter Instagram URL:');
            if (!url || !url.includes('instagram.com')) {
                console.log(error('\n❌ Invalid URL! Must be a valid Instagram link.'));
                console.log(drawLine());
                continue;
            }

            console.log(drawLine());
            const result = await downloadInstagram(url);
            console.log(drawLine());

            if (result) {
                console.log(info('\n🎉 Ready for your next download!'));
            } else {
                console.log(info('\n⏳ Something went wrong, but you can try again!'));
            }
        } 
        else if (choice === '3') {
            const url = await askQuestion('🌐 Enter Spotify URL (track/playlist/album):');
            if (!url || !url.includes('spotify.com')) {
                console.log(error('\n❌ Invalid URL! Must be a valid Spotify link.'));
                console.log(drawLine());
                continue;
            }

            console.log(drawLine());
            const result = await downloadSpotify(url);
            console.log(drawLine());

            if (result) {
                console.log(info('\n🎉 Ready for your next download!'));
            } else {
                console.log(info('\n⏳ Something went wrong, but you can try again!'));
            }
        }
        else {
            console.log(error('\n❌ Invalid choice! Please select 1, 2, or 3.'));
            console.log(drawLine());
            continue;
        }
    }
}

startCLI().catch((err) => {
    console.log(error(`\n❗ Fatal error: ${err.message}`));
    console.log(drawLine());
    rl.close();
    process.exit(1);
});
