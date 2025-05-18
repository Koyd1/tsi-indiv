import React, { useState, useEffect } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Typography } from 'antd';

const COLORS = ['#f3b20d', '#f6d426', '#abd925', '#77cb3d'];
const EvaluationOptions = [
  'Не выполнено',
  'Частично выполнено',
  'Почти выполнено',
  'Полностью выполнено',
];
const { Title } = Typography;

function chunkArray(array, size) {
  return Array.from({ length: Math.ceil(array.length / size) }, (_, i) =>
    array.slice(i * size, i * size + size),
  );
}

const getFontSize = () => {
  if (typeof window === 'undefined') return 12;
  if (window.innerWidth < 480) return 9;
  if (window.innerWidth < 768) return 10;
  return 12;
};

function splitWordsToLines(words, maxLines) {
  const lines = [];
  const perLine = Math.ceil(words.length / maxLines);
  for (let i = 0; i < maxLines; i++) {
    const lineWords = words.slice(i * perLine, (i + 1) * perLine);
    if (lineWords.length) lines.push(lineWords.join(' '));
  }
  return lines;
}

const renderCustomTick = ({ x, y, payload }) => {
  const fontSize = getFontSize();
  const maxLines = 4;
  const words = payload.value.split(' ');
  const lines = splitWordsToLines(words, maxLines);
  const lineHeight = fontSize + 4;

  return (
    <g transform={`translate(${x},${y + 10})`}>
      {lines.map((line, index) => (
        <text
          key={index}
          x={0}
          y={index * lineHeight}
          textAnchor="middle"
          fontSize={fontSize}
          fill="#555"
        >
          {line}
        </text>
      ))}
    </g>
  );
};

export default function EvaluationStackedChart({ data }) {
  const [chunkSize, setChunkSize] = useState(4);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 480) {
        setChunkSize(2);
      } else if (width < 768) {
        setChunkSize(3);
      } else {
        setChunkSize(4);
      }
    };

    handleResize(); // Initial run
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const chunkedData = chunkArray(data, chunkSize);
  const fontSize = getFontSize();
  const xAxisHeight = 10 + 4 * (fontSize + 4);

  return (
    <div className="col-span-1 md:col-span-2">
      <Title level={4} style={{ marginBottom: 12 }}>
        3. Распределение оценок (только для Да)
      </Title>

      {/* Легенда один раз сверху */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        {EvaluationOptions.map((label, i) => (
          <div key={label} className="flex items-center space-x-2">
            <div
              style={{
                width: 14,
                height: 14,
                backgroundColor: COLORS[i % COLORS.length],
                borderRadius: 2,
              }}
            />
            <span style={{ fontSize: 14 }}>{label}</span>
          </div>
        ))}
      </div>

      {/* Графики по чанкам */}
      {chunkedData.map((chunk, index) => (
        <div key={index} className="mb-10">
          <ResponsiveContainer width="100%" height={350}>
            <BarChart
              data={chunk}
              margin={{
                top: 10,
                right: 20,
                left: 20,
                bottom: 10,
              }}
            >
              <XAxis
                dataKey="name"
                interval={0}
                tick={renderCustomTick}
                height={xAxisHeight}
                tickLine={false}
              />
              <YAxis allowDecimals={false} />
              <Tooltip />
              {EvaluationOptions.map((key, i) => (
                <Bar
                  key={key}
                  dataKey={key}
                  stackId="a"
                  fill={COLORS[i % COLORS.length]}
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </div>
      ))}
    </div>
  );
}
