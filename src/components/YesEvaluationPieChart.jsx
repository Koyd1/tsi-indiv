import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { Typography } from 'antd';

const COLORS = ['#f3b20d', '#f1df18', '#abd925', '#77cb3d'];
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
    <div className="w-[400px] flex flex-col items-center">
      <Title level={4}>Степень внедрения</Title>
      <div className="w-[400px] h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
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
            <Legend layout="horizontal" verticalAlign="bottom" align="center" />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
