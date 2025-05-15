'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Card, Statistic } from 'antd';

export default function FinalPage() {
  const router = useRouter();

  const [companyName, setCompanyName] = useState('');
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [yesCount, setYesCount] = useState(0);
  const [noCount, setNoCount] = useState(0);

  useEffect(() => {
    // пример: загрузка из localStorage
    const savedAnswers = JSON.parse(localStorage.getItem('answers')) || {};
    const savedCompany = localStorage.getItem('companyName') || 'Компания';

    let total = 0,
      yes = 0,
      no = 0;

    // Подсчёт ответов "да"/"нет"
    Object.values(savedAnswers).forEach((category) => {
      Object.values(category).forEach(({ answer }) => {
        total++;
        if (answer === 'yes') yes++;
        else if (answer === 'no') no++;
      });
    });

    setCompanyName(savedCompany);
    setTotalQuestions(total);
    setYesCount(yes);
    setNoCount(no);
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center gap-12 p-8">
      <h1 className="text-5xl font-bold text-center">{companyName}</h1>

      <Card className="w-full max-w-md text-center shadow-lg">
        <h2 className="text-2xl mb-4">Результаты опроса</h2>
        <div className="flex justify-around">
          <Statistic title="Всего вопросов" value={totalQuestions} />
          <Statistic
            title="Ответов 'Да'"
            value={yesCount}
            valueStyle={{ color: 'green' }}
          />
          <Statistic
            title="Ответов 'Нет'"
            value={noCount}
            valueStyle={{ color: 'red' }}
          />
        </div>
      </Card>

      <div className="flex flex-col sm:flex-row gap-4">
        <Button
          type="default"
          size="large"
          onClick={() => router.push('/review')}
        >
          Полный обзор ответов
        </Button>
        <Button
          type="dashed"
          size="large"
          onClick={() => router.push('/end-stat/results-report')}
        >
          Аналитика и отчёт
        </Button>
        <Button
          type="default"
          size="large"
          onClick={() => {
            const reportUrl = `/api/report/download?company=${encodeURIComponent(companyName)}`;
            window.open(reportUrl, '_blank');
          }}
        >
          Скачать отчёт
        </Button>
      </div>
    </div>
  );
}
