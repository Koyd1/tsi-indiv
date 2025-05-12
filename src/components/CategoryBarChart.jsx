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
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} layout="vertical">
          <XAxis type="number" />
          <YAxis type="category" dataKey="name" />
          <Tooltip />
          <Legend />
          <Bar dataKey="Да" fill="#00C49F" />
          <Bar dataKey="Нет" fill="#FF8042" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
