import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * AI Bot User Agent Patterns - Updated February 2025
 * These patterns match the actual user agent strings used by major AI platforms
 */

// OpenAI Bots (ChatGPT, GPT-4, etc.)
const OPENAI_BOTS = [
    /GPTBot/i,              // Training crawler: GPTBot/1.0, GPTBot/1.3
    /ChatGPT-User/i,        // Real-time browsing: ChatGPT-User/1.0, ChatGPT-User/2.0
    /OAI-SearchBot/i,       // Search indexing: OAI-SearchBot/1.3
];

// Anthropic Bots (Claude)
const ANTHROPIC_BOTS = [
    /ClaudeBot/i,           // Training crawler: ClaudeBot/1.0
    /Claude-User/i,         // User-initiated browsing
    /Claude-SearchBot/i,    // Search indexing
    /Claude-Web/i,          // Legacy (deprecated July 2024)
    /anthropic-ai/i,        // Legacy identifier
    /claude\.ai/i,          // Claude web browsing identifier
];

// Google Bots (Gemini, Bard)
const GOOGLE_AI_BOTS = [
    /Google-Extended/i,         // AI training control token
    /Gemini-Deep-Research/i,    // Gemini Deep Research feature
    /Google-CloudVertexBot/i,   // Vertex AI Agent Builder
    /GoogleAgent-Mariner/i,     // Agentic browser for AI Ultra
    /Gemini-AI/i,               // Gemini AI model bot
    /Bard-AI/i,                 // Google Bard AI bot
];

// Perplexity Bots
const PERPLEXITY_BOTS = [
    /PerplexityBot/i,       // Index crawler: PerplexityBot/1.0
    /Perplexity-User/i,     // User-initiated browsing: Perplexity-User/1.0
    /Perplexity\/1\.0/i,    // Alternative user agent format
];

// xAI Bots (Grok)
const XAI_BOTS = [
    /GrokBot/i,             // GrokBot/1.0 - Training
    /xAI-Grok/i,            // xAI-Grok/1.0 - General search
    /Grok-DeepSearch/i,     // Grok-DeepSearch/1.0 - Advanced search
    /xAI-Bot/i,             // xAI-Bot - General xAI crawler
];

// Other AI Bots
const OTHER_AI_BOTS = [
    /Applebot-Extended/i,   // Apple AI training
    /Bytespider/i,          // ByteDance AI
    /CCBot/i,               // Common Crawl (used by many AI companies)
    /cohere-ai/i,           // Cohere AI
    /Meta-ExternalAgent/i,  // Meta AI
    /FacebookBot/i,         // Meta/Facebook AI
    /YouBot/i,              // You.com AI search
    /DiffBot/i,             // Diffbot AI
];

// Combine all AI bot patterns
const AI_CRAWLER_PATTERNS = [
    ...OPENAI_BOTS,
    ...ANTHROPIC_BOTS,
    ...GOOGLE_AI_BOTS,
    ...PERPLEXITY_BOTS,
    ...XAI_BOTS,
    ...OTHER_AI_BOTS,
];

// General Search Engine Crawler Patterns (not AI-specific)
const GENERAL_CRAWLER_PATTERNS = [
    /Googlebot(?!.*Extended)/i,  // Googlebot but not Google-Extended
    /Bingbot/i,
    /Slurp/i,           // Yahoo
    /DuckDuckBot/i,
    /Baiduspider/i,
    /YandexBot/i,
    /facebookexternalhit/i,
    /Twitterbot/i,
    /LinkedInBot/i,
    /WhatsApp/i,
    /TelegramBot/i,
];

function detectVisitorType(userAgent: string): 'ai_crawler' | 'general_crawler' | 'human' {
    // Check AI crawlers first (more specific)
    for (const pattern of AI_CRAWLER_PATTERNS) {
        if (pattern.test(userAgent)) {
            return 'ai_crawler';
        }
    }

    // Check general crawlers
    for (const pattern of GENERAL_CRAWLER_PATTERNS) {
        if (pattern.test(userAgent)) {
            return 'general_crawler';
        }
    }

    // Default to human
    return 'human';
}

export async function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    // Skip for static assets, API routes, and admin
    if (
        pathname.startsWith('/_next') ||
        pathname.startsWith('/api') ||
        pathname.startsWith('/admin') ||
        pathname.includes('.') // Static files
    ) {
        return NextResponse.next();
    }

    // Get user agent
    const userAgent = request.headers.get('user-agent') || 'Unknown';
    const visitorType = detectVisitorType(userAgent);

    // If AI crawler is detected, serve combined GEO content
    if (visitorType === 'ai_crawler') {
        // Rewrite to the GEO content API endpoint
        const geoUrl = new URL('/api/geo-content', request.url);

        // Log the AI crawler visit
        try {
            const baseUrl = request.nextUrl.origin;
            fetch(`${baseUrl}/api/log-traffic`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    visitor_type: visitorType,
                    path: pathname,
                    user_agent: userAgent,
                    note: 'Served combined GEO content',
                }),
            }).catch(() => { });
        } catch {
            // Silent fail
        }

        // Rewrite the request to serve GEO content
        return NextResponse.rewrite(geoUrl);
    }

    // For humans and general crawlers, proceed normally
    const response = NextResponse.next();

    // Log traffic asynchronously (don't block the response)
    const logData = {
        visitor_type: visitorType,
        path: pathname,
        user_agent: userAgent,
    };

    // Fire and forget - log to API endpoint
    try {
        const baseUrl = request.nextUrl.origin;
        fetch(`${baseUrl}/api/log-traffic`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(logData),
        }).catch(() => {
            // Silent fail - don't block user experience
        });
    } catch {
        // Silent fail
    }

    return response;
}

// Configure which paths the middleware runs on
export const config = {
    matcher: [
        /*
         * Match all request paths except:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - public files (public directory)
         */
        '/((?!_next/static|_next/image|favicon.ico|.*\\..*|api).*)',
    ],
};
