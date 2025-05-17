'use client';
import '@ant-design/v5-patch-for-react-19';
import { useEffect, useState } from 'react';
import { Typography } from 'antd';
import {
  SaveReportAsPDF,
  CategoryBarChart,
  EvaluationStackedChart,
  ResultsTable,
  YesNoPieChart,
  YesEvaluationPieChart,
  Header,
} from '@/components';

const EvaluationOptions = [
  'Не выполнено',
  'Частично выполнено',
  'Почти выполнено',
  'Полностью выполнено',
];
const { Title } = Typography;

export default function ResultReport() {
  const [answers, setAnswers] = useState({});
  const [companyName, setCompanyName] = useState('');

  const allCategories = Object.keys(answers);
  let totalYes = 0;
  let totalNo = 0;

  const yesEvaluations = [];
  allCategories.forEach((cat) => {
    const questions = Object.values(answers[cat] || {});
    questions.forEach(({ answer, evaluation }) => {
      if (answer === 'yes' && evaluation) {
        yesEvaluations.push({ evaluation });
      }
    });
  });

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

  useEffect(() => {
    const savedAnswers = JSON.parse(localStorage.getItem('answers'));
    const savedCompanyName = localStorage.getItem('companyName');
    setAnswers(savedAnswers || {});
    setCompanyName(savedCompanyName || '');
  }, []);

  return (
    <div
      id="report"
      className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10"
      style={{
        '--background': '#ffffff',
        '--foreground': '#000000',
        '--card': '#ffffff',
        '--card-foreground': '#000000',
        '--muted': '#f0f0f0',
        '--muted-foreground': '#333333',
        '--border': '#cccccc',
        '--input': '#dddddd',
      }}
    >
      <div className="w-full">
        <Header />
      </div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 pt-40">
        <Title level={1}>Отчёт по результатам опроса</Title>
        <div className="text-base text-gray-700 sm:text-lg font-semibold mt-2 sm:mt-0">
          {new Date().toLocaleDateString('ru-RU', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
          })}
        </div>
      </div>

      <p className="mb-4 text-base sm:text-lg">
        Компания: <strong>{companyName}</strong>
      </p>

      <div className="flex flex-col lg:flex-row justify-center gap-8 mb-8">
        <div className="w-full lg:w-1/2">
          <YesNoPieChart data={pieData} />
        </div>
        <div className="w-full lg:w-1/2">
          <YesEvaluationPieChart responses={yesEvaluations} />
        </div>
      </div>

      <div className="space-y-10">
        <div className="w-full">
          <CategoryBarChart data={barData} />
        </div>
        <div className="w-full">
          <EvaluationStackedChart data={stackedData} />
        </div>
      </div>

      <div className="mt-10">
        <ResultsTable data={perCategoryStats} />
      </div>

      <div className="mt-8 flex justify-center">
        <SaveReportAsPDF />
      </div>
    </div>
  );
}
