'use client';

import { useEffect } from 'react';

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    // Log the error to console
    console.error('Global error:', error);
  }, [error]);

  return (
    <html>
      <body>
        <div style={{
          maxWidth: '600px',
          margin: '100px auto',
          padding: '20px',
          textAlign: 'center',
          fontFamily: 'system-ui, -apple-system, sans-serif'
        }}>
          <h1 style={{ fontSize: '48px', color: '#dc2626', marginBottom: '20px' }}>
            Critical Error
          </h1>
          <h2 style={{ fontSize: '24px', color: '#374151', marginBottom: '20px' }}>
            Something went seriously wrong
          </h2>
          <p style={{ color: '#6b7280', marginBottom: '30px' }}>
            A critical error occurred that prevented the application from loading properly.
          </p>
          {error.digest && (
            <p style={{
              fontSize: '14px',
              color: '#9ca3af',
              fontFamily: 'monospace',
              backgroundColor: '#f3f4f6',
              padding: '10px',
              borderRadius: '5px',
              marginBottom: '30px'
            }}>
              Error ID: {error.digest}
            </p>
          )}
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
            <button
              onClick={reset}
              style={{
                backgroundColor: '#2563eb',
                color: 'white',
                padding: '12px 24px',
                borderRadius: '8px',
                border: 'none',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              Try Again
            </button>
            <a
              href="/"
              style={{
                backgroundColor: '#6b7280',
                color: 'white',
                padding: '12px 24px',
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: '600'
              }}
            >
              Back to Home
            </a>
          </div>
        </div>
      </body>
    </html>
  );
}
