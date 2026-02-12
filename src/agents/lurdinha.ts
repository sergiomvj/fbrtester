
import { LinkCrawler, CrawlResult } from '../auditor/crawler';

export interface LurdinhaReport {
    totalLinks: number;
    brokenLinks: number;
    underConstruction: string[];
    menuItems: number;
    score: number;
    details: CrawlResult[];
}

export class Lurdinha {
    async run(url: string): Promise<LurdinhaReport> {
        console.log("👩‍🦰 Lurdinha: Iniciando varredura de navegação...");

        const crawler = new LinkCrawler(url);
        const results = await crawler.scan(20); // Deep scan

        let brokenCount = 0;
        const underConstruction: string[] = [];
        let menuItemsCount = 0;

        results.forEach(page => {
            brokenCount += page.brokenLinks.length;
            if (page.status !== 200) brokenCount++;
        });

        const report: LurdinhaReport = {
            totalLinks: results.length,
            brokenLinks: brokenCount,
            underConstruction,
            menuItems: menuItemsCount, // Placeholder
            score: Math.max(0, 100 - (brokenCount * 10)),
            details: results
        };

        console.log(`👩‍🦰 Lurdinha: Varredura concluída. Nota: ${report.score}/100`);
        return report;
    }
}
