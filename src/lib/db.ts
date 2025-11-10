import { Pool } from 'pg';

// Create a singleton pool instance
let pool: Pool | null = null;

function getPool(): Pool {
  if (!pool) {
    const connectionString = process.env.DATABASE_URL;

    if (!connectionString) {
      throw new Error('DATABASE_URL environment variable is not set');
    }

    pool = new Pool({
      connectionString,
      ssl: process.env.NODE_ENV === 'production'
        ? { rejectUnauthorized: false }
        : false,
      max: 20,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 10000,
    });
  }

  return pool;
}

/**
 * Query helper function
 * @param text SQL query string
 * @param params Query parameters
 * @returns Query result
 */
export async function q<T = any>(text: string, params?: any[]): Promise<T[]> {
  const client = getPool();
  try {
    const result = await client.query(text, params);
    return result.rows as T[];
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  }
}

/**
 * Query helper that returns a single row or null
 */
export async function qOne<T = any>(text: string, params?: any[]): Promise<T | null> {
  const rows = await q<T>(text, params);
  return rows[0] || null;
}

/**
 * Close the database pool (for cleanup)
 */
export async function closePool(): Promise<void> {
  if (pool) {
    await pool.end();
    pool = null;
  }
}
