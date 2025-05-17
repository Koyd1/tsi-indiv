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

const { Title } = Typography;

export default function CategoryBarChart({ data }) {
  return (
    <div>
      <Title level={4}>2. Ответы по категориям</Title>
      <ResponsiveContainer width="100%" height={data.length * 50}>
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 20, right: 20, bottom: 20, left: 120 }}
        >
          <XAxis type="number" />
          <YAxis
            type="category"
            dataKey="name"
            interval={0}
            tick={{ fontSize: 14, width: 200, wordBreak: 'break-word' }}
          />
          <Tooltip />
          <Legend />
          <Bar dataKey="Да" fill="#00B771" />
          <Bar dataKey="Нет" fill="#F37356" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
