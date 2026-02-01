import { Bot, Users, MapPin, Activity, RefreshCw, Eye } from 'lucide-react';
import { getTrafficStats, getRecentBots, type TrafficLog } from '@/lib/supabase';

// Revalidate every 30 seconds for near real-time data
export const revalidate = 30;

function formatUserAgent(ua: string): string {
    // Extract the bot/browser name from user agent
    const botPatterns = [
        /GPTBot/i, /ClaudeBot/i, /PerplexityBot/i, /Googlebot/i,
        /Bingbot/i, /ChatGPT/i, /OAI-SearchBot/i
    ];

    for (const pattern of botPatterns) {
        const match = ua.match(pattern);
        if (match) return match[0];
    }

    // For browsers, extract browser name
    if (ua.includes('Chrome')) return 'Chrome';
    if (ua.includes('Firefox')) return 'Firefox';
    if (ua.includes('Safari')) return 'Safari';
    if (ua.includes('Edge')) return 'Edge';

    return ua.slice(0, 30) + '...';
}

function getVisitorTypeLabel(type: string): string {
    switch (type) {
        case 'ai_crawler': return 'AI Bot';
        case 'general_crawler': return 'Crawler';
        case 'human': return 'Human';
        default: return type;
    }
}

function getVisitorTypeColor(type: string): string {
    switch (type) {
        case 'ai_crawler': return 'bg-[#8B5CF6]';
        case 'general_crawler': return 'bg-blue-500';
        case 'human': return 'bg-green-500';
        default: return 'bg-gray-500';
    }
}

export default async function DashboardPage() {
    const stats = await getTrafficStats();
    const recentBots = await getRecentBots(10);

    const totalTraffic = stats.totalVisits || 1; // Prevent division by zero
    const aiPercentage = Math.round((stats.aiHits / totalTraffic) * 100);
    const humanPercentage = Math.round((stats.humanVisits / totalTraffic) * 100);
    const crawlerPercentage = Math.round((stats.crawlerHits / totalTraffic) * 100);

    return (
        <div className="min-h-screen bg-[#121212] text-white p-6 md:p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <header className="mb-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl md:text-3xl font-bold mb-2">
                                <span className="text-white">Traffic </span>
                                <span className="bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA] bg-clip-text text-transparent">
                                    Analytics
                                </span>
                            </h1>
                            <p className="text-gray-400 text-sm">
                                Real-time AI & Human traffic monitoring for Affiliate AutoAgenix
                            </p>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                            <RefreshCw className="w-4 h-4" />
                            <span>Auto-refresh: 30s</span>
                        </div>
                    </div>
                </header>

                {/* Stats Cards */}
                <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {/* AI Hits Card */}
                    <div className="bg-[#1a1a1a] rounded-2xl border border-gray-800 p-6 hover:border-[#8B5CF6]/40 transition-colors">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 bg-[#8B5CF6]/20 rounded-xl flex items-center justify-center">
                                <Bot className="w-6 h-6 text-[#8B5CF6]" />
                            </div>
                            <span className="text-xs text-[#8B5CF6] bg-[#8B5CF6]/10 px-2 py-1 rounded-full">
                                AI Traffic
                            </span>
                        </div>
                        <div className="text-3xl font-bold text-white mb-1">
                            {stats.aiHits.toLocaleString()}
                        </div>
                        <p className="text-gray-400 text-sm">Total AI Hits</p>
                        <p className="text-xs text-gray-500 mt-2">
                            GPTBot, ClaudeBot, PerplexityBot & more
                        </p>
                    </div>

                    {/* Human Visits Card */}
                    <div className="bg-[#1a1a1a] rounded-2xl border border-gray-800 p-6 hover:border-green-500/40 transition-colors">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                                <Users className="w-6 h-6 text-green-500" />
                            </div>
                            <span className="text-xs text-green-500 bg-green-500/10 px-2 py-1 rounded-full">
                                Human Traffic
                            </span>
                        </div>
                        <div className="text-3xl font-bold text-white mb-1">
                            {stats.humanVisits.toLocaleString()}
                        </div>
                        <p className="text-gray-400 text-sm">Total Human Visits</p>
                        <p className="text-xs text-gray-500 mt-2">
                            Real users browsing the site
                        </p>
                    </div>

                    {/* Pune Local Card */}
                    <div className="bg-[#1a1a1a] rounded-2xl border border-gray-800 p-6 hover:border-orange-500/40 transition-colors">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center">
                                <MapPin className="w-6 h-6 text-orange-500" />
                            </div>
                            <span className="text-xs text-orange-500 bg-orange-500/10 px-2 py-1 rounded-full">
                                Local Reach
                            </span>
                        </div>
                        <div className="text-3xl font-bold text-white mb-1">
                            {stats.totalVisits.toLocaleString()}
                        </div>
                        <p className="text-gray-400 text-sm">Pune Local Reach</p>
                        <p className="text-xs text-gray-500 mt-2">
                            Hinjewadi, Baner, Magarpatta
                        </p>
                    </div>
                </section>

                {/* Traffic Distribution Chart */}
                <section className="bg-[#1a1a1a] rounded-2xl border border-gray-800 p-6 mb-8">
                    <div className="flex items-center gap-2 mb-6">
                        <Activity className="w-5 h-5 text-[#8B5CF6]" />
                        <h2 className="text-lg font-semibold">Traffic Distribution</h2>
                    </div>

                    <div className="space-y-4">
                        {/* AI Crawlers Bar */}
                        <div>
                            <div className="flex justify-between text-sm mb-2">
                                <span className="text-gray-400">AI Crawlers</span>
                                <span className="text-[#8B5CF6] font-medium">{aiPercentage}%</span>
                            </div>
                            <div className="h-4 bg-[#121212] rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA] rounded-full transition-all duration-500"
                                    style={{ width: `${aiPercentage}%` }}
                                />
                            </div>
                        </div>

                        {/* Human Visitors Bar */}
                        <div>
                            <div className="flex justify-between text-sm mb-2">
                                <span className="text-gray-400">Human Visitors</span>
                                <span className="text-green-500 font-medium">{humanPercentage}%</span>
                            </div>
                            <div className="h-4 bg-[#121212] rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-gradient-to-r from-green-500 to-emerald-400 rounded-full transition-all duration-500"
                                    style={{ width: `${humanPercentage}%` }}
                                />
                            </div>
                        </div>

                        {/* General Crawlers Bar */}
                        <div>
                            <div className="flex justify-between text-sm mb-2">
                                <span className="text-gray-400">Search Crawlers</span>
                                <span className="text-blue-500 font-medium">{crawlerPercentage}%</span>
                            </div>
                            <div className="h-4 bg-[#121212] rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full transition-all duration-500"
                                    style={{ width: `${crawlerPercentage}%` }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Vertical Bar Chart */}
                    <div className="mt-8 pt-6 border-t border-gray-800">
                        <h3 className="text-sm text-gray-400 mb-4">AI vs Human Ratio</h3>
                        <div className="flex items-end justify-center gap-8 h-40">
                            <div className="flex flex-col items-center">
                                <div
                                    className="w-16 bg-gradient-to-t from-[#8B5CF6] to-[#A78BFA] rounded-t-lg transition-all duration-500"
                                    style={{ height: `${Math.max(aiPercentage, 5)}%` }}
                                />
                                <span className="text-sm text-gray-400 mt-2">AI</span>
                                <span className="text-lg font-bold text-[#8B5CF6]">{stats.aiHits}</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <div
                                    className="w-16 bg-gradient-to-t from-green-500 to-emerald-400 rounded-t-lg transition-all duration-500"
                                    style={{ height: `${Math.max(humanPercentage, 5)}%` }}
                                />
                                <span className="text-sm text-gray-400 mt-2">Human</span>
                                <span className="text-lg font-bold text-green-500">{stats.humanVisits}</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Live Bot Feed */}
                <section className="bg-[#1a1a1a] rounded-2xl border border-gray-800 p-6">
                    <div className="flex items-center gap-2 mb-6">
                        <Eye className="w-5 h-5 text-[#8B5CF6]" />
                        <h2 className="text-lg font-semibold">Live Bot Feed</h2>
                        <div className="ml-auto flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                            <span className="text-xs text-gray-400">Live</span>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="text-left text-sm text-gray-500 border-b border-gray-800">
                                    <th className="pb-3 font-medium">Type</th>
                                    <th className="pb-3 font-medium">Agent</th>
                                    <th className="pb-3 font-medium">Path</th>
                                    <th className="pb-3 font-medium">Time</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm">
                                {recentBots.length > 0 ? (
                                    recentBots.map((log: TrafficLog, index: number) => (
                                        <tr key={log.id || index} className="border-b border-gray-800/50 hover:bg-[#121212]/50">
                                            <td className="py-3">
                                                <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs ${getVisitorTypeColor(log.visitor_type)} bg-opacity-20`}>
                                                    <span className={`w-1.5 h-1.5 rounded-full ${getVisitorTypeColor(log.visitor_type)}`} />
                                                    {getVisitorTypeLabel(log.visitor_type)}
                                                </span>
                                            </td>
                                            <td className="py-3 text-gray-300 font-mono text-xs">
                                                {formatUserAgent(log.user_agent)}
                                            </td>
                                            <td className="py-3 text-gray-400 font-mono text-xs">
                                                {log.path}
                                            </td>
                                            <td className="py-3 text-gray-500 text-xs">
                                                {log.created_at ? new Date(log.created_at).toLocaleTimeString() : 'Just now'}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={4} className="py-8 text-center text-gray-500">
                                            No traffic logged yet. Configure Supabase to start tracking.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* Footer */}
                <footer className="mt-8 text-center text-sm text-gray-500">
                    <p>Affiliate AutoAgenix Traffic Analytics</p>
                    <p className="text-xs mt-1">affiliateai.autoagenix.com</p>
                </footer>
            </div>
        </div>
    );
}
