
import { LinkCrawler } from './auditor/crawler';
import { SpecVerifier } from './spec-verifier/verifier';
import * as readline from 'readline';
import * as fs from 'fs';
import * as path from 'path';

// Import Personas
import { Lurdinha } from './agents/lurdinha';
import { Tereza } from './agents/tereza';
import { Judith } from './agents/judith';
import { Rosangela } from './agents/rosangela';

const args = process.argv.slice(2);
const helpMessage = `
Usage:
  npx ts-node src/index.ts --scan <url>
  npx ts-node src/index.ts --verify <requirement> <context>
  npx ts-node src/index.ts --agent <name> [--url <url>]

Options:
  --scan <url>     Start scanning the provided URL.
  --verify ...     Verify a requirement against a context string.
  --agent <name>   Run a specific agent (lurdinha, tereza, judith, rosangela) or "all".
  --help           Show this help message.
`;

async function main() {
  if (args.includes('--help')) {
    console.log(helpMessage);
    process.exit(0);
  }

  const agentIndex = args.indexOf('--agent');
  const scanIndex = args.indexOf('--scan');
  const verifyIndex = args.indexOf('--verify');

  // --- AGENT ORCHESTRATOR ---
  if (agentIndex !== -1 && args[agentIndex + 1]) {
    const agentName = args[agentIndex + 1].toLowerCase();
    const urlIndex = args.indexOf('--url');
    const targetUrl = urlIndex !== -1 ? args[urlIndex + 1] : 'https://example.com';

    console.log(`\n🚀 Iniciando Agente: ${agentName.toUpperCase()}...\n`);

    const lurdinha = new Lurdinha();
    const tereza = new Tereza();
    const judith = new Judith();
    const rosangela = new Rosangela();

    // Store results for Judith
    let lurdinhaReport: any = null;
    let auditResults: any[] = [];

    // 1. Lurdinha
    if (agentName === 'lurdinha' || agentName === 'all') {
      lurdinhaReport = await lurdinha.run(targetUrl);
      auditResults = lurdinhaReport.details;
      saveReport(auditResults);
    }

    // 2. Tereza
    if (agentName === 'tereza' || agentName === 'all') {
      await tereza.run(process.cwd());
    }

    // 3. Judith (Needs Lurdinha's data)
    if (agentName === 'judith' || agentName === 'all') {
      if (!lurdinhaReport && agentName === 'judith') {
        console.log("👩‍⚖️ Judith: Preciso de dados atualizados. Chamando Lurdinha...");
        lurdinhaReport = await lurdinha.run(targetUrl);
        auditResults = lurdinhaReport.details;
      } else if (!lurdinhaReport && agentName === 'all') {
        // If running all, lurdinha likely ran. If not (logic error), we run her.
        if (auditResults.length === 0) {
          // Fallback
          lurdinhaReport = await lurdinha.run(targetUrl);
          auditResults = lurdinhaReport.details;
        }
      }
      await judith.run(process.cwd(), auditResults);
    }

    // 4. Rosangela
    if (agentName === 'rosangela' || agentName === 'all') {
      await rosangela.run(process.cwd());
    }

  }
  // --- LEGACY SCANNERS ---
  else if (scanIndex !== -1 && args[scanIndex + 1]) {
    const urlToScan = args[scanIndex + 1];
    console.log(`Starting Auditor on: ${urlToScan}`);

    const crawler = new LinkCrawler(urlToScan);
    const results = await crawler.scan(5);

    saveReport(results);

    console.log(JSON.stringify(results, null, 2));
  } else if (verifyIndex !== -1 && args[verifyIndex + 1] && args[verifyIndex + 2]) {
    const requirement = args[verifyIndex + 1];
    const context = args[verifyIndex + 2];
    console.log(`Verifying requirement: "${requirement}"`);

    const verifier = new SpecVerifier();
    const result = await verifier.verify(requirement, context);
    console.log(JSON.stringify(result, null, 2));
  } else {
    console.log("No valid command provided.");
    console.log(helpMessage);
  }
}

function saveReport(results: any) {
  try {
    const reportPath = process.env.REPORT_PATH || path.join(__dirname, '../dashboard/public/report.json');
    const dir = path.dirname(reportPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(reportPath, JSON.stringify(results, null, 2));
    console.log(`Report saved to ${reportPath}`);
  } catch (e) {
    console.error("Failed to save report:", e);
  }
}

main().catch(console.error);
