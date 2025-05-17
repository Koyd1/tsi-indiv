import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { Typography } from 'antd';

const COLORS = ['#00b771', 'rgb(243,115,86)'];
const { Title } = Typography;

export default function YesNoPieChart({ data }) {
  if (!Array.isArray(data) || data.length === 0) {
    return <p>Нет данных для отображения</p>;
  }

  return (
    // <div className="w-full flex flex-col items-center">
    <div className="w-[400px] flex flex-col items-center">
      <Title level={4}>Соотношение внедренных контролей</Title>
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
