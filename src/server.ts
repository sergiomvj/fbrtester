
import express from 'express';
import { Lurdinha } from './agents/lurdinha';
import { Tereza } from './agents/tereza';
import { Judith } from './agents/judith';
import { Rosangela } from './agents/rosangela';
import * as fs from 'fs';
import * as path from 'path';

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());

// REPORT PATH CONFIG
// In production/docker, this should be a volume shared with the dashboard
const REPORT_PATH = process.env.REPORT_PATH || path.join(__dirname, '../dashboard/public/report.json');

app.get('/health', (req, res) => {
    res.json({ status: 'ok', agent: '8Tester Agent Service' });
});

app.post('/scan', async (req, res) => {
    const { url, agent } = req.body;

    if (!url) {
        return res.status(400).json({ error: 'URL is required' });
    }

    console.log(`[API] Received scan request for ${url} with agent ${agent}`);

    // Trigger processing asynchronously to not block the response?? 
    // Actually, for this MVP, let's wait or return a jobId. 
    // To keep it simple for the user's "visual dashboard" request, we will wait (long polling)
    // OR we return immediately and let the dashboard poll the report.json.
    // Let's return immediately and update status.

    try {
        // Start the scan in background
        runScan(url, agent).catch(err => console.error("Scan background error:", err));

        return res.json({
            success: true,
            message: `Scan started for ${url}`,
            reportPath: '/report.json' // Dashboard expects this
        });
    } catch (error) {
        console.error("Scan failed:", error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

async function runScan(targetUrl: string, agentName: string) {
    console.log(`[Worker] Starting ${agentName} on ${targetUrl}`);

    const lurdinha = new Lurdinha();
    const tereza = new Tereza();
    const judith = new Judith();
    const rosangela = new Rosangela();

    let lurdinhaReport: any = null;
    let finalReport: any = {
        url: targetUrl,
        status: 0,
        links: [],
        externalLinks: [],
        brokenLinks: [],
        assets: [],
        interactables: [],
        accessibility: []
    };

    // Helper to merge results
    const updateReport = (details: any) => {
        finalReport = { ...finalReport, ...details, url: targetUrl };
        saveReport(finalReport);
    };

    // 1. Lurdinha (The Crawler)
    if (agentName === 'lurdinha' || agentName === 'squad' || agentName === 'all') {
        lurdinhaReport = await lurdinha.run(targetUrl);
        updateReport(lurdinhaReport.details);
    }

    // 2. Tereza (Best Practices - Mocked/Static for now)
    if (agentName === 'tereza' || agentName === 'squad' || agentName === 'all') {
        await tereza.run(process.cwd()); // This runs on the agent source code for now
        // Tereza doesn't return web report data yet in this mvp version
    }

    // 3. Judith (Specs assertions)
    if (agentName === 'judith' || agentName === 'squad' || agentName === 'all') {
        // Judith needs Lurdinha's data
        if (!lurdinhaReport) {
            lurdinhaReport = await lurdinha.run(targetUrl);
            updateReport(lurdinhaReport.details);
        }
        await judith.run(process.cwd(), lurdinhaReport.details);
    }

    // 4. Rosangela (Security assertions)
    if (agentName === 'rosangela' || agentName === 'squad' || agentName === 'all') {
        await rosangela.run(process.cwd());
    }

    console.log(`[Worker] Scan finished for ${targetUrl}`);
}

function saveReport(results: any) {
    try {
        const dir = path.dirname(REPORT_PATH);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        fs.writeFileSync(REPORT_PATH, JSON.stringify(results, null, 2));
        console.log(`[Worker] Report saved to ${REPORT_PATH}`);
    } catch (e) {
        console.error("Failed to save report:", e);
    }
}

app.listen(port, () => {
    console.log(`8Tester Agent Server listening on port ${port}`);
    console.log(`Report path configured to: ${REPORT_PATH}`);
});
