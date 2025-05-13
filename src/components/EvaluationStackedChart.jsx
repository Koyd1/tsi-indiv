import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Typography } from 'antd';

const COLORS = ['#00C49F', '#FF8042', '#0088FE', '#FFBB28'];
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

export default function EvaluationStackedChart({ data }) {
  const chunkedData = chunkArray(data, 4); // разбиваем по 4 категории

  return (
    <div className="col-span-1 md:col-span-2">
      <Title level={4}>3. Распределение оценок (только для Да)</Title>
      {chunkedData.map((chunk, index) => (
        <div key={index} className="mb-8">
          <ResponsiveContainer width="100%" height={350}>
            <BarChart
              data={chunk}
              margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
            >
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
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
