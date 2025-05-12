import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { Typography } from 'antd';

const COLORS = ['#00C49F', '#FF8042'];
const { Title } = Typography;

export default function YesNoPieChart({ data }) {
  return (
    <div>
      <Title level={4}>1. Да / Нет</Title>
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
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
