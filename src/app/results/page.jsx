// noinspection NonAsciiCharacters

'use client';
import { useEffect, useState } from 'react';
import { Typography } from 'antd';
import SaveReportAsPDF from '@/components/SaveReportAsPDF';
import {
  CategoryBarChart,
  EvaluationStackedChart,
  ResultsTable,
  YesNoPieChart,
} from '@/components';

const EvaluationOptions = [
  'Не выполнено',
  'Частично выполнено',
  'Почти выполнено',
  'Полностью выполнено',
];
const { Title } = Typography;

export default function VisualReport() {
  const [answers, setAnswers] = useState({});
  const [companyName, setCompanyName] = useState('');

  useEffect(() => {
    const savedAnswers = JSON.parse(localStorage.getItem('answers'));
    const savedCompanyName = localStorage.getItem('companyName');
    setAnswers(savedAnswers || {});
    setCompanyName(savedCompanyName || '');
  }, []);

  const allCategories = Object.keys(answers);
  let totalYes = 0;
  let totalNo = 0;

  const perCategoryStats = allCategories.map((cat) => {
    const questions = Object.values(answers[cat] || {});
    let yes = 0;
    let no = 0;
    const evalDist = EvaluationOptions.reduce((acc, opt) => {
      acc[opt] = 0;
      return acc;
    }, {});

    questions.forEach(({ answer, evaluation }) => {
      if (answer === 'yes') {
        yes++;
        evalDist[evaluation] = (evalDist[evaluation] || 0) + 1;
      } else {
        no++;
      }
    });

    totalYes += yes;
    totalNo += no;

    return {
      category: cat,
      yes,
      no,
      ...evalDist,
      total: yes + no,
    };
  });

  const pieData = [
    { name: 'Да', value: totalYes },
    { name: 'Нет', value: totalNo },
  ];

  const barData = perCategoryStats.map(({ category, yes, no }) => ({
    name: category,
    Да: yes,
    Нет: no,
  }));

  const stackedData = perCategoryStats.map(({ category, ...rest }) => ({
    name: category,
    ...EvaluationOptions.reduce((acc, key) => {
      acc[key] = rest[key];
      return acc;
    }, {}),
  }));

  return (
    <div id="report" className="max-w-6xl mx-auto p-6">
      <Title level={2}>Отчёт</Title>
      <p className="mb-4 text-lg">
        Компания: <strong>{companyName}</strong>
      </p>

      <div className="gap-8">
        <YesNoPieChart data={pieData} />
        <CategoryBarChart data={barData} />
        <EvaluationStackedChart data={stackedData} />
      </div>

      <ResultsTable data={perCategoryStats} />

      <SaveReportAsPDF />
    </div>
  );
}
