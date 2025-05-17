// import { Table, Progress, Typography } from 'antd';
//
// const { Title } = Typography;
//
// export default function ResultsTable({ data }) {
//   const columns = [
//     { title: 'Категория', dataIndex: 'category' },
//     { title: 'Да', dataIndex: 'yes' },
//     { title: 'Нет', dataIndex: 'no' },
//     { title: 'Полностью', dataIndex: 'Полностью выполнено' },
//     { title: 'Почти', dataIndex: 'Почти выполнено' },
//     { title: 'Частично', dataIndex: 'Частично выполнено' },
//     { title: 'Не выполнено', dataIndex: 'Не выполнено' },
//     {
//       title: 'Прогресс',
//       render: (_, row) => (
//         <Progress
//           percent={Math.round((row.yes / row.total) * 100)}
//           size="small"
//         />
//       ),
//     },
//   ];
//
//   return (
//     <div className="mt-8">
//       <Title level={4}>4. Таблица результатов</Title>
//       <Table
//         dataSource={data}
//         columns={columns}
//         rowKey="category"
//         pagination={false}
//       />
//     </div>
//   );
// }
import { Table, Progress, Typography } from 'antd';

const { Title } = Typography;

export default function ResultsTable({ data }) {
  const columns = [
    { title: 'Категория', dataIndex: 'category' },
    { title: 'Да', dataIndex: 'yes' },
    { title: 'Нет', dataIndex: 'no' },
    { title: 'Полностью', dataIndex: 'Полностью выполнено' },
    { title: 'Почти', dataIndex: 'Почти выполнено' },
    { title: 'Частично', dataIndex: 'Частично выполнено' },
    { title: 'Не выполнено', dataIndex: 'Не выполнено' },
    {
      title: 'Прогресс',
      render: (_, row) => (
        <Progress
          percent={Math.round((row.yes / row.total) * 100)}
          size="small"
        />
      ),
    },
  ];

  return (
    <div className="mt-8">
      <Title level={4}>4. Таблица результатов</Title>
      <div className="overflow-x-auto">
        <div className="min-w-[800px]">
          <Table
            dataSource={data}
            columns={columns}
            rowKey="category"
            pagination={false}
            size="middle"
          />
        </div>
      </div>
    </div>
  );
}
