'use client';

interface DataPoint {
  date: Date;
  score: number;
}

interface ScoreChartProps {
  data: DataPoint[];
  width?: number;
  height?: number;
}

export function ScoreChart({ data, width = 600, height = 200 }: ScoreChartProps) {
  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-gray-400">
        No historical data available
      </div>
    );
  }

  const padding = { top: 20, right: 20, bottom: 40, left: 50 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  // Find min/max scores for Y axis
  const scores = data.map(d => d.score);
  const maxScore = Math.max(...scores);
  const minScore = Math.min(...scores);
  const scoreRange = maxScore - minScore || 10;
  const yMin = Math.max(0, minScore - 5);
  const yMax = Math.min(100, maxScore + 5);

  // Scale functions
  const scaleX = (index: number) => (index / (data.length - 1)) * chartWidth;
  const scaleY = (score: number) => chartHeight - ((score - yMin) / (yMax - yMin)) * chartHeight;

  // Generate path
  const linePath = data
    .map((d, i) => {
      const x = scaleX(i);
      const y = scaleY(d.score);
      return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
    })
    .join(' ');

  // Generate area path
  const areaPath = `${linePath} L ${scaleX(data.length - 1)} ${chartHeight} L 0 ${chartHeight} Z`;

  // Y axis ticks
  const yTicks = [yMin, Math.round((yMin + yMax) / 2), yMax];

  // X axis ticks (show first, middle, last dates)
  const xTickIndices = [0, Math.floor(data.length / 2), data.length - 1].filter(
    (v, i, arr) => arr.indexOf(v) === i
  );

  return (
    <div className="w-full overflow-x-auto">
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-auto"
      >
        <g transform={`translate(${padding.left}, ${padding.top})`}>
          {/* Grid lines */}
          {yTicks.map(tick => (
            <line
              key={`grid-${tick}`}
              x1={0}
              y1={scaleY(tick)}
              x2={chartWidth}
              y2={scaleY(tick)}
              stroke="#e5e7eb"
              strokeWidth="1"
            />
          ))}

          {/* Area fill */}
          <path d={areaPath} fill="url(#gradient)" opacity="0.3" />

          {/* Line */}
          <path
            d={linePath}
            fill="none"
            stroke="#2563eb"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Data points */}
          {data.map((d, i) => (
            <g key={i}>
              <circle
                cx={scaleX(i)}
                cy={scaleY(d.score)}
                r="4"
                fill="#2563eb"
                stroke="white"
                strokeWidth="2"
              />
            </g>
          ))}

          {/* Y axis */}
          <line x1={0} y1={0} x2={0} y2={chartHeight} stroke="#9ca3af" strokeWidth="1" />

          {/* X axis */}
          <line
            x1={0}
            y1={chartHeight}
            x2={chartWidth}
            y2={chartHeight}
            stroke="#9ca3af"
            strokeWidth="1"
          />

          {/* Y axis labels */}
          {yTicks.map(tick => (
            <text
              key={`y-label-${tick}`}
              x={-10}
              y={scaleY(tick)}
              textAnchor="end"
              dominantBaseline="middle"
              fontSize="12"
              fill="#6b7280"
            >
              {Math.round(tick)}
            </text>
          ))}

          {/* X axis labels */}
          {xTickIndices.map(i => {
            const d = data[i];
            const dateStr = d.date.toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric'
            });
            return (
              <text
                key={`x-label-${i}`}
                x={scaleX(i)}
                y={chartHeight + 20}
                textAnchor="middle"
                fontSize="12"
                fill="#6b7280"
              >
                {dateStr}
              </text>
            );
          })}

          {/* Chart title */}
          <text
            x={chartWidth / 2}
            y={-5}
            textAnchor="middle"
            fontSize="14"
            fontWeight="600"
            fill="#374151"
          >
            Trust Score History
          </text>
        </g>

        {/* Gradient definition */}
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#2563eb" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#2563eb" stopOpacity="0.1" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
