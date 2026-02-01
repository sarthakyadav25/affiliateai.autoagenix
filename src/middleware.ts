import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// AI Crawler Patterns - These bots use content for LLM training/search
const AI_CRAWLER_PATTERNS = [
    /GPTBot/i,
    /OAI-SearchBot/i,
    /ChatGPT-User/i,
    /ClaudeBot/i,
    /Claude-Web/i,
    /PerplexityBot/i,
    /Applebot-Extended/i,
    /Google-Extended/i,
    /anthropic-ai/i,
    /Bytespider/i,
    /CCBot/i,
    /cohere-ai/i,
];

// General Search Engine Crawler Patterns
const GENERAL_CRAWLER_PATTERNS = [
    /Googlebot/i,
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
    const response = NextResponse.next();

    // Skip logging for static assets and API routes
    const pathname = request.nextUrl.pathname;
    if (
        pathname.startsWith('/_next') ||
        pathname.startsWith('/api') ||
        pathname.includes('.') // Static files
    ) {
        return response;
    }

    // Get user agent
    const userAgent = request.headers.get('user-agent') || 'Unknown';
    const visitorType = detectVisitorType(userAgent);

    // Log traffic asynchronously (don't block the response)
    // We use fetch to call an API route since middleware runs on Edge
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
