
import { Page } from 'playwright';

export interface AssetResult {
    url: string;
    type: 'image' | 'video' | 'script' | 'stylesheet';
    status: number;
}

export class AssetValidator {
    async validate(page: Page): Promise<AssetResult[]> {
        const assets = await page.evaluate(() => {
            const results: { url: string; type: string }[] = [];

            // Images
            document.querySelectorAll('img').forEach((img: unknown) => {
                const element = img as HTMLImageElement;
                if (element.src) results.push({ url: element.src, type: 'image' });
            });

            // Videos
            document.querySelectorAll('video').forEach((video: unknown) => {
                const element = video as HTMLVideoElement;
                if (element.src) results.push({ url: element.src, type: 'video' });
                element.querySelectorAll('source').forEach((source: unknown) => {
                    const srcElement = source as HTMLSourceElement;
                    if (srcElement.src) results.push({ url: srcElement.src, type: 'video' });
                });
            });

            // Scripts
            document.querySelectorAll('script').forEach((script: unknown) => {
                const element = script as HTMLScriptElement;
                if (element.src) results.push({ url: element.src, type: 'script' });
            });

            // Stylesheets
            document.querySelectorAll('link[rel="stylesheet"]').forEach((link: unknown) => {
                const element = link as HTMLLinkElement;
                if (element.href) results.push({ url: element.href, type: 'stylesheet' });
            });

            return results;
        });

        const validations: AssetResult[] = [];

        // Setup network interception or just request them?
        // Requesting them from node context might be faster/easier than handling page events for already loaded resources.
        // However, some resources might require cookies/auth from the page context.
        // For now, let's use a simple fetch from the page context to reuse session.

        for (const asset of assets) {
            try {
                // Use page.request to make request within browser context
                const response = await page.request.head(asset.url).catch(async () => {
                    return await page.request.get(asset.url);
                });
                validations.push({
                    url: asset.url,
                    type: asset.type as any,
                    status: response.status()
                });
            } catch (e) {
                validations.push({
                    url: asset.url,
                    type: asset.type as any,
                    status: 0
                });
            }
        }

        return validations;
    }
}
