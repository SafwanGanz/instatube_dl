import readline from 'readline';
import chalk from 'chalk';
import { sanitizeFilename, getVideoTitle, downloadContent } from './src/downloader.js';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const info = chalk.cyanBright;
const success = chalk.greenBright;
const error = chalk.redBright;
const prompt = chalk.yellowBright;
const header = chalk.blueBright;

const banner = `
${header('  ╔════════════════════════════════════╗')}
${header('  ║                                    ║')}
${header('  ║   🎥  Youtube-Dl Downloader  🎵    ║')}
${header('  ║                                    ║')}
${header('  ╚════════════════════════════════════╝')}
${chalk.dim('        SafwanGanz       ')}
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

    while (true) {
        console.log(info('\nWhat would you like to do?'));
        console.log(drawLine());

        const url = await askQuestion('🌐 Enter YouTube URL (or "exit" to quit):');
        if (url.toLowerCase() === 'exit') {
            console.log(info('\n👋 Goodbye!'));
            console.log(drawLine());
            rl.close();
            break;
        }

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
        const success = await downloadContent(url, type);
        console.log(drawLine());

        if (success) {
            console.log(info('\n🎉 Ready for your next download!'));
        } else {
            console.log(info('\n⏳ Something went wrong, but you can try again!'));
        }
    }
}

startCLI().catch((err) => {
    console.log(error(`\n❗ Fatal error: ${err.message}`));
    console.log(drawLine());
    rl.close();
    process.exit(1);
});