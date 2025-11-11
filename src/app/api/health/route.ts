import { NextResponse } from 'next/server';
import { q } from '@/src/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  const startTime = Date.now();

  try {
    // Check database connectivity
    const result = await q<{ count: number }>('SELECT COUNT(*) as count FROM businesses LIMIT 1');
    const dbLatency = Date.now() - startTime;

    const businessCount = result[0]?.count || 0;

    return NextResponse.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      database: {
        connected: true,
        latency: `${dbLatency}ms`,
        businessCount,
      },
      environment: process.env.NODE_ENV || 'development',
    });
  } catch (error) {
    const dbLatency = Date.now() - startTime;

    return NextResponse.json(
      {
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
        database: {
          connected: false,
          latency: `${dbLatency}ms`,
          error: error instanceof Error ? error.message : 'Unknown error',
        },
        environment: process.env.NODE_ENV || 'development',
      },
      { status: 503 }
    );
  }
}
