// components/YesEvaluationPieChart.jsx
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { Typography } from 'antd';

const COLORS = ['#00C49F', '#FFBB28', '#FF8042', '#0088FE'];
const EvaluationOptions = [
  'Не выполнено',
  'Частично выполнено',
  'Почти выполнено',
  'Полностью выполнено',
];
const { Title } = Typography;

export default function YesEvaluationPieChart({ responses }) {
  const counts = EvaluationOptions.reduce((acc, key) => {
    acc[key] = 0;
    return acc;
  }, {});

  responses.forEach(({ evaluation }) => {
    if (counts.hasOwnProperty(evaluation)) {
      counts[evaluation]++;
    }
  });

  const data = Object.entries(counts)
    .filter(([, value]) => value > 0)
    .map(([name, value]) => ({ name, value }));

  return (
    <div>
      <Title level={4}>1. Да — Распределение по оценкам</Title>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius={100}
            label
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
