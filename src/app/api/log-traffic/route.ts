import { NextResponse } from 'next/server';
import { logTraffic } from '@/lib/supabase';

export async function POST(request: Request) {
    try {
        const body = await request.json();

        const { visitor_type, path, user_agent } = body;

        if (!visitor_type || !path || !user_agent) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        await logTraffic({
            visitor_type,
            path,
            user_agent,
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error logging traffic:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
