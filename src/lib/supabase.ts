import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Supabase client for server-side operations
// Uses service role key for admin access to traffic_logs table

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Only create client if credentials are available
let supabase: SupabaseClient | null = null;

if (supabaseUrl && supabaseServiceKey) {
    supabase = createClient(supabaseUrl, supabaseServiceKey, {
        auth: {
            autoRefreshToken: false,
            persistSession: false,
        },
    });
}

// Type definitions for traffic logs
export interface TrafficLog {
    id?: number;
    visitor_type: 'ai_crawler' | 'general_crawler' | 'human';
    path: string;
    user_agent: string;
    created_at?: string;
    ip_address?: string;
    country?: string;
}

// Insert a traffic log entry
export async function logTraffic(log: Omit<TrafficLog, 'id' | 'created_at'>) {
    if (!supabase) {
        return { error: 'Supabase not configured' };
    }

    const { data, error } = await supabase
        .from('traffic_logs')
        .insert([log]);

    if (error) {
        console.error('Error logging traffic:', error);
    }

    return { data, error };
}

// Fetch traffic statistics
export async function getTrafficStats() {
    if (!supabase) {
        return { aiHits: 0, humanVisits: 0, crawlerHits: 0, totalVisits: 0 };
    }

    const { data, error } = await supabase
        .from('traffic_logs')
        .select('visitor_type');

    if (error) {
        console.error('Error fetching stats:', error);
        return { aiHits: 0, humanVisits: 0, crawlerHits: 0, totalVisits: 0 };
    }

    const stats = {
        aiHits: data?.filter(d => d.visitor_type === 'ai_crawler').length || 0,
        humanVisits: data?.filter(d => d.visitor_type === 'human').length || 0,
        crawlerHits: data?.filter(d => d.visitor_type === 'general_crawler').length || 0,
        totalVisits: data?.length || 0,
    };

    return stats;
}

// Fetch recent bot activity
export async function getRecentBots(limit: number = 10) {
    if (!supabase) {
        return [];
    }

    const { data, error } = await supabase
        .from('traffic_logs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(limit);

    if (error) {
        console.error('Error fetching recent bots:', error);
        return [];
    }

    return data || [];
}

export { supabase };
