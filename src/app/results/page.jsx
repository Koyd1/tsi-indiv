'use client';

import '@ant-design/v5-patch-for-react-19';
import { useEffect, useState } from 'react';
import { Typography } from 'antd';

const { Title } = Typography;

export default function ResultsPage() {
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('answers'));
    setAnswers(saved || {});
  }, []);

  return (
    <div className="max-w-xl mx-auto p-6">
      <Title level={2}>Результаты</Title>
      <pre className="bg-gray-100 p-4 rounded mt-4 text-sm">
        {JSON.stringify(answers, null, 2)}
      </pre>
    </div>
  );
}
