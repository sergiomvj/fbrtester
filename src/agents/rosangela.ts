
import { exec } from 'child_process';
import { promisify } from 'util';
const execAsync = promisify(exec);

export interface RosangelaReport {
    vulnerabilities: number;
    exposedSecrets: string[];
    score: number;
}

export class Rosangela {
    async run(projectPath: string): Promise<RosangelaReport> {
        console.log("👮‍♀️ Rosangela: Documentos, por favor. Verificando a segurança...");

        let vulnerabilities = 0;
        const exposedSecrets: string[] = [];
        let score = 100;

        // 1. NPM Audit
        try {
            console.log("👮‍♀️ Rosangela: Rodando npm audit...");
            const { stdout } = await execAsync('npm audit --json');
            const auditResult = JSON.parse(stdout);
            vulnerabilities = auditResult.metadata?.vulnerabilities?.total || 0;

            if (vulnerabilities > 0) {
                score -= (vulnerabilities * 5);
            }
        } catch (e: any) {
            // npm audit returns non-zero exit code if vulnerabilities found
            if (e.stdout) {
                const auditResult = JSON.parse(e.stdout);
                vulnerabilities = auditResult.metadata?.vulnerabilities?.total || 0;
                score -= (vulnerabilities * 5);
            } else {
                console.error("Erro no npm audit:", e.message);
            }
        }

        // 2. Basic Secret Scanning (naive)
        // In a real scenario, use tools like gitleaks or trufflehog
        // We just warn if .env is committed (checked via git status or presence in repo if we could)
        // Checking for .env in .gitignore was done by Tereza implicitly, but let's check here too.

        // We can check for "password" or "key" in source files via grep (simulated here)

        const report: RosangelaReport = {
            vulnerabilities,
            exposedSecrets,
            score: Math.max(0, score)
        };

        console.log(`👮‍♀️ Rosangela: Ronda terminada. ${vulnerabilities} problemas encontrados. Nota: ${report.score}/100`);
        return report;
    }
}
