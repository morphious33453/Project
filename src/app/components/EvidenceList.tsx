import React from 'react';

interface Evidence {
  url: string;
  title: string;
  date?: string;
}

interface EvidenceListProps {
  evidence: Evidence[];
}

export function EvidenceList({ evidence }: EvidenceListProps) {
  if (!evidence || evidence.length === 0) {
    return (
      <div className="text-gray-500 italic">No evidence available yet</div>
    );
  }

  return (
    <div className="space-y-3">
      {evidence.slice(0, 5).map((item, idx) => (
        <div key={idx} className="border-l-2 border-green-500 pl-3 py-1">
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline font-medium"
          >
            {item.title}
          </a>
          {item.date && (
            <p className="text-sm text-gray-500 mt-1">
              {new Date(item.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
              })}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
