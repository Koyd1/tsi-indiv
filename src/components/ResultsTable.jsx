import { Table, Progress, Typography } from 'antd';

const { Title } = Typography;

export default function ResultsTable({ data }) {
  const columns = [
    { title: 'Категория', dataIndex: 'category' },
    { title: 'Да', dataIndex: 'yes' },
    { title: 'Нет', dataIndex: 'no' },
    { title: 'Полностью', dataIndex: 'Полностью выполнено' },
    { title: 'Частично', dataIndex: 'Частично выполнено' },
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
      <Table
        dataSource={data}
        columns={columns}
        rowKey="category"
        pagination={false}
      />
    </div>
  );
}
