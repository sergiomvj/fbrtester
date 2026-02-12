
import { Server } from "@modelcontextprotocol/sdk/server/index";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio";
import { CallToolRequestSchema, ListToolsRequestSchema } from "@modelcontextprotocol/sdk/types";
import { LinkCrawler } from "../auditor/crawler";
import { SpecVerifier } from "../spec-verifier/verifier";
import * as dotenv from "dotenv";

dotenv.config();

const server = new Server(
    {
        name: "8tester-agent",
        version: "1.0.0",
    },
    {
        capabilities: {
            tools: {},
        },
    }
);

const crawler = new LinkCrawler(""); // Base URL will be overridden per request if needed, or we pass it in tool
const verifier = new SpecVerifier();

server.setRequestHandler(ListToolsRequestSchema, async () => {
    return {
        tools: [
            {
                name: "audit_page",
                description: "Scans a web page for broken links, assets, interactables, and accessibility issues.",
                inputSchema: {
                    type: "object",
                    properties: {
                        url: {
                            type: "string",
                            description: "The URL to audit",
                        },
                        max_pages: {
                            type: "number",
                            description: "Maximum number of pages to crawl (default: 5)",
                        }
                    },
                    required: ["url"],
                },
            },
            {
                name: "verify_spec",
                description: "Verifies if a requirement is satisfied based on a provided context.",
                inputSchema: {
                    type: "object",
                    properties: {
                        requirement: {
                            type: "string",
                            description: "The requirement to check",
                        },
                        context: {
                            type: "string",
                            description: "The context (logs, test results) to check against",
                        }
                    },
                    required: ["requirement", "context"],
                },
            }
        ],
    };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
    switch (request.params.name) {
        case "audit_page": {
            const url = String(request.params.arguments?.url);
            const maxPages = Number(request.params.arguments?.max_pages) || 5;

            // Create a new crawler instance for the specific URL to clean state
            const specificCrawler = new LinkCrawler(url);
            const scanResults = await specificCrawler.scan(maxPages);

            return {
                content: [
                    {
                        type: "text",
                        text: JSON.stringify(scanResults, null, 2),
                    },
                ],
            };
        }
        case "verify_spec": {
            const requirement = String(request.params.arguments?.requirement);
            const context = String(request.params.arguments?.context);

            const result = await verifier.verify(requirement, context);

            return {
                content: [
                    {
                        type: "text",
                        text: JSON.stringify(result, null, 2),
                    },
                ],
            };
        }
        default:
            throw new Error("Unknown tool");
    }
});

async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error("8Tester MCP Server running on stdio");
}

main().catch((error) => {
    console.error("Server error:", error);
    process.exit(1);
});
