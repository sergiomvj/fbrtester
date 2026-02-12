
import { chromium, Page } from 'playwright';
import { AssetValidator, AssetResult } from './asset-validator';
import { InteractablesChecker, InteractableResult } from './interactables';
import { AccessibilityScanner } from './accessibility';

export interface CrawlResult {
    url: string;
    status: number;
    links: string[];
    externalLinks: string[];
    brokenLinks: { url: string; status: number }[];
    assets: AssetResult[];
    interactables: InteractableResult[];
    accessibility: any[];
}

export class LinkCrawler {
    private visitedUrls: Set<string> = new Set();
    private results: CrawlResult[] = [];
    private baseUrl: string;

    // Validators
    private assetValidator = new AssetValidator();
    private interactablesChecker = new InteractablesChecker();
    private accessibilityScanner = new AccessibilityScanner();

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    async scan(maxPages: number = 10): Promise<CrawlResult[]> {
        const browser = await chromium.launch();
        const context = await browser.newContext();
        const page = await context.newPage();

        // Queue of URLs to visit
        const queue: string[] = [this.baseUrl];

        while (queue.length > 0 && this.visitedUrls.size < maxPages) {
            const currentUrl = queue.shift();

            if (!currentUrl || this.visitedUrls.has(currentUrl)) continue;

            console.log(`Scanning: ${currentUrl}`);
            this.visitedUrls.add(currentUrl);

            try {
                const response = await page.goto(currentUrl, { waitUntil: 'domcontentloaded', timeout: 30000 });
                const status = response?.status() || 0;

                const links = await this.getLinks(page);
                const internalLinks = links.filter(link => link.startsWith(this.baseUrl));
                const externalLinks = links.filter(link => !link.startsWith(this.baseUrl));

                // Check for potential broken links on this page (shallow check)
                const brokenLinks = await this.checkBrokenLinks(page, links);

                // Run Validators
                const assets = await this.assetValidator.validate(page);
                const interactables = await this.interactablesChecker.check(page);
                const accessibility = await this.accessibilityScanner.scan(page);

                this.results.push({
                    url: currentUrl,
                    status,
                    links: internalLinks,
                    externalLinks,
                    brokenLinks,
                    assets,
                    interactables,
                    accessibility
                });

                // Add new internal links to queue
                for (const link of internalLinks) {
                    if (!this.visitedUrls.has(link) && !queue.includes(link)) {
                        queue.push(link);
                    }
                }

            } catch (error) {
                console.error(`Failed to scan ${currentUrl}:`, error);
                this.results.push({
                    url: currentUrl,
                    status: 0, // Error
                    links: [],
                    externalLinks: [],
                    brokenLinks: [],
                    assets: [],
                    interactables: [],
                    accessibility: []
                });
            }
        }

        await browser.close();
        return this.results;
    }

    private async getLinks(page: Page): Promise<string[]> {
        return await page.evaluate(() => {
            const anchors = Array.from(document.querySelectorAll('a'));
            return anchors
                .map(a => a.href)
                .filter(href => href && (href.startsWith('http') || href.startsWith('https')));
        });
    }

    private async checkBrokenLinks(page: Page, links: string[]): Promise<{ url: string; status: number }[]> {
        // For a deep scan we would visit each. For now, we just list them.
        // In a real implementation this would HEAD request them.
        // returning empty for the MVP speed.
        return [];
    }
}
