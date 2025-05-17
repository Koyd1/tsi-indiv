// import {
//   PieChart,
//   Pie,
//   Cell,
//   Tooltip,
//   ResponsiveContainer,
//   Legend,
// } from 'recharts';
// import { Typography } from 'antd';
//
// const COLORS = ['#00b771', '#F37356'];
// const { Title } = Typography;
//
// export default function YesNoPieChart({ data }) {
//   if (!Array.isArray(data) || data.length === 0) {
//     return <p>Нет данных для отображения</p>;
//   }
//
//   return (
//     // <div className="w-full flex flex-col items-center">
//     <div className="w-[400px] flex flex-col items-center">
//       <Title level={4}>Соотношение внедренных контролей</Title>
//       <div className="w-[400px] h-[400px]">
//         <ResponsiveContainer width="100%" height="100%">
//           <PieChart>
//             <Pie
//               data={data}
//               dataKey="value"
//               nameKey="name"
//               outerRadius={100}
//               label
//             >
//               {data.map((entry, index) => (
//                 <Cell
//                   key={`cell-${index}`}
//                   fill={COLORS[index % COLORS.length]}
//                 />
//               ))}
//             </Pie>
//             <Tooltip />
//             <Legend layout="horizontal" verticalAlign="bottom" align="center" />
//           </PieChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//   );
// }
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { Typography } from 'antd';

const COLORS = ['#00b771', '#F37356'];
const { Title } = Typography;

export default function YesNoPieChart({ data }) {
  if (!Array.isArray(data) || data.length === 0) {
    return <p>Нет данных для отображения</p>;
  }

  return (
    <div className="w-full aspect-square max-w-[400px] mx-auto">
      <Title level={4} className="text-center">
        Соотношение внедренных контролей
      </Title>
      {/* Контейнер с сохранением соотношения сторон 1:1 */}
      <div style={{ width: '100%', paddingTop: '100%', position: 'relative' }}>
        <ResponsiveContainer
          width="100%"
          height="100%"
          style={{ position: 'absolute', top: 0, left: 0 }}
        >
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              outerRadius="80%"
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
