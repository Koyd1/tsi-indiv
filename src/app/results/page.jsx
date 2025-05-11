// VisualReport.js;
'use client';
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Typography, Table, Progress } from 'antd';
import { useEffect, useState } from 'react';
import SaveReportAsPDF from '@/components/SaveReportAsPDF';
const COLORS = ['#00C49F', '#FF8042', '#0088FE', '#FFBB28'];
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
  const evaluationCounts = {};

  const perCategoryStats = allCategories.map((cat) => {
    const questions = Object.values(answers[cat] || {});
    let yes = 0;
    let no = 0;
    const evalDist = {
      'Не выполнено': 0,
      'Частично выполнено': 0,
      'Почти выполнено': 0,
      'Полностью выполнено': 0,
    };
    questions.forEach((q) => {
      if (q.answer === 'yes') {
        yes++;
        evalDist[q.evaluation] = (evalDist[q.evaluation] || 0) + 1;
        evaluationCounts[q.evaluation] =
          (evaluationCounts[q.evaluation] || 0) + 1;
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

  const barData = perCategoryStats.map((cat) => ({
    name: cat.category,
    Да: cat.yes,
    Нет: cat.no,
  }));

  const stackedData = perCategoryStats.map((cat) => ({
    name: cat.category,
    ...EvaluationOptions.reduce((acc, key) => {
      acc[key] = cat[key];
      return acc;
    }, {}),
  }));

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
    <div id="report" className="max-w-6xl mx-auto p-6">
      <div className="max-w-6xl mx-auto p-6">
        <Title level={2}>Отчёт</Title>
        <p className="mb-4 text-lg">
          Компания: <strong>{companyName}</strong>
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <Title level={4}>1. Да / Нет</Title>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={100}
                  label
                >
                  {pieData.map((entry, index) => (
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

          <div>
            <Title level={4}>2. Ответы по категориям</Title>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={barData} layout="vertical">
                <XAxis type="number" />
                <YAxis type="category" dataKey="name" />
                <Tooltip />
                <Legend />
                <Bar dataKey="Да" fill="#00C49F" />
                <Bar dataKey="Нет" fill="#FF8042" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="col-span-1 md:col-span-2">
            <Title level={4}>3. Распределение оценок (только для Да)</Title>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart
                data={stackedData}
                margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
              >
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Legend />
                {EvaluationOptions.map((key, index) => (
                  <Bar
                    key={key}
                    dataKey={key}
                    stackId="a"
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="mt-8">
          <Title level={4}>4. Таблица результатов</Title>
          <Table
            dataSource={perCategoryStats}
            columns={columns}
            rowKey="category"
            pagination={false}
          />
        </div>
      </div>
      <SaveReportAsPDF />
    </div>
  );
}

// 'use client';
//
// import { useEffect, useState } from 'react';
// import { Typography, Card, Collapse } from 'antd';
//
// const { Title, Text } = Typography;
//
// const EvaluationLabels = [
//   'Не выполнено',
//   'Частично выполнено',
//   'Почти выполнено',
//   'Полностью выполнено',
// ];
//
// export default function ResultsPage() {
//   const [companyName, setCompanyName] = useState('');
//   const [answers, setAnswers] = useState({});
//   const [surveyData, setSurveyData] = useState([]);
//
//   useEffect(() => {
//     const savedAnswers = JSON.parse(localStorage.getItem('answers'));
//     const savedCompany = localStorage.getItem('companyName');
//     setCompanyName(savedCompany || '');
//     setAnswers(savedAnswers || {});
//
//     fetch('/api/survey')
//       .then((res) => res.json())
//       .then((data) => setSurveyData(data));
//   }, []);
//
//   const totalQuestions = surveyData.reduce(
//     (sum, cat) => sum + cat.questions.length,
//     0,
//   );
//
//   const allEvaluations = {};
//
//   const totalYes = Object.values(answers).reduce((sum, catAns) => {
//     for (const a of Object.values(catAns)) {
//       if (a.answer === 'yes') {
//         const label = a.evaluation || 'Не указано';
//         allEvaluations[label] = (allEvaluations[label] || 0) + 1;
//       }
//     }
//     return sum + Object.values(catAns).filter((a) => a.answer === 'yes').length;
//   }, 0);
//
//   const totalNo = totalQuestions - totalYes;
//
//   return (
//     <div className="max-w-4xl mx-auto p-6 space-y-6">
//       <Title level={2}>Результаты опроса</Title>
//       <div>
//         <div>
//           {companyName && (
//             <Text className="text-lg block mb-4">
//               <strong>Компания:</strong> {companyName}
//             </Text>
//           )}
//         </div>
//         <div>
//           <p>
//             <strong>Всего ответов "Да":</strong> {totalYes} из {totalQuestions}
//           </p>
//           <p>
//             <strong>Всего ответов "Нет":</strong> {totalNo} из {totalQuestions}
//           </p>
//           <div className="mt-4">
//             <p className="font-semibold mb-1">Оценки среди ответов "Да":</p>
//             {Object.entries(allEvaluations).map(([label, count]) => (
//               <p key={label}>
//                 {label}: <strong>{count}</strong>
//               </p>
//             ))}
//           </div>
//         </div>
//         <div>
//           {surveyData.map((category, index) => {
//             const catAnswers = answers[category.category] || {};
//             const yesAnswers = Object.values(catAnswers).filter(
//               (a) => a.answer === 'yes',
//             );
//             const yesCount = yesAnswers.length;
//             const noCount = category.questions.length - yesCount;
//
//             const catEvaluations = yesAnswers.reduce((acc, a) => {
//               const label = a.evaluation || 'Не указано';
//               acc[label] = (acc[label] || 0) + 1;
//               return acc;
//             }, {});
//
//             return (
//               <Card
//                 key={category.category}
//                 className="bg-white shadow rounded-xl"
//                 title={`${index + 1}. ${category.category}`}
//               >
//                 <p>
//                   Ответов "Да": <strong>{yesCount}</strong>
//                 </p>
//                 <p>
//                   Ответов "Нет": <strong>{noCount}</strong>
//                 </p>
//                 <div className="mt-2">
//                   <p className="font-medium">Оценки среди "Да":</p>
//                   {Object.entries(catEvaluations).map(([label, count]) => (
//                     <p key={label}>
//                       {label}: <strong>{count}</strong>
//                     </p>
//                   ))}
//                 </div>
//               </Card>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// }

// 'use client';
//
// import { useEffect, useState } from 'react';
// import { Typography, Card } from 'antd';
//
// const { Title, Text } = Typography;
//
// export default function ResultsPage() {
//   const [companyName, setCompanyName] = useState('');
//   const [answers, setAnswers] = useState({});
//   const [surveyData, setSurveyData] = useState([]);
//
//   useEffect(() => {
//     const savedAnswers = JSON.parse(localStorage.getItem('answers'));
//     const savedCompany = localStorage.getItem('companyName');
//     setCompanyName(savedCompany || '');
//     setAnswers(savedAnswers || {});
//
//     fetch('/api/survey')
//       .then((res) => res.json())
//       .then((data) => setSurveyData(data));
//   }, []);
//
//   const totalQuestions = surveyData.reduce(
//     (sum, cat) => sum + cat.questions.length,
//     0,
//   );
//
//   const totalYes = Object.values(answers).reduce((sum, catAns) => {
//     return sum + Object.values(catAns).filter((a) => a.answer === 'yes').length;
//   }, 0);
//
//   const totalNo = totalQuestions - totalYes;
//
//   return (
//     <div className="max-w-4xl mx-auto p-6 space-y-6">
//       <Title level={2}>Результаты опроса</Title>
//
//       {companyName && (
//         <Text className="text-lg block mb-4">
//           <strong>Компания:</strong> {companyName}
//         </Text>
//       )}
//
//       <Card className="bg-white shadow rounded-xl">
//         <p>
//           <strong>Всего ответов "Да":</strong> {totalYes} из {totalQuestions}
//         </p>
//         <p>
//           <strong>Всего ответов "Нет":</strong> {totalNo} из {totalQuestions}
//         </p>
//       </Card>
//
//       {surveyData.map((category, index) => {
//         const catAnswers = answers[category.category] || {};
//         const yesCount = Object.values(catAnswers).filter(
//           (a) => a.answer === 'yes',
//         ).length;
//         const noCount = category.questions.length - yesCount;
//
//         return (
//           <Card
//             key={category.category}
//             className="bg-white shadow rounded-xl"
//             title={`${index + 1}. ${category.category}`}
//           >
//             <p>
//               Ответов "Да": <strong>{yesCount}</strong>
//             </p>
//             <p>
//               Ответов "Нет": <strong>{noCount}</strong>
//             </p>
//           </Card>
//         );
//       })}
//     </div>
//   );
// }

// 'use client';
//
// import { useEffect, useState } from 'react';
// import { Typography, Card } from 'antd';
//
// const { Title, Text } = Typography;
//
// export default function ResultsPage() {
//   const [companyName, setCompanyName] = useState('');
//   const [answers, setAnswers] = useState({});
//   const [surveyData, setSurveyData] = useState([]);
//
//   useEffect(() => {
//     const savedAnswers = JSON.parse(localStorage.getItem('answers'));
//     const savedCompany = localStorage.getItem('companyName');
//     setCompanyName(savedCompany || '');
//     setAnswers(savedAnswers || {});
//
//     fetch('/api/survey')
//       .then((res) => res.json())
//       .then((data) => setSurveyData(data));
//   }, []);
//
//   return (
//     <div className="max-w-5xl mx-auto p-6 space-y-8">
//       <Title level={2}>Результаты опроса</Title>
//
//       {companyName && (
//         <Text className="text-lg text-gray-700">
//           Компания: <strong>{companyName}</strong>
//         </Text>
//       )}
//
//       {surveyData.map((category) => {
//         const categoryAnswers = answers[category.category] || {};
//         const yesCount = Object.values(categoryAnswers).filter(
//           (a) => a.answer === 'yes',
//         ).length;
//         const noCount = Object.values(categoryAnswers).filter(
//           (a) => a.answer === 'no',
//         ).length;
//
//         return (
//           <Card
//             key={category.category}
//             title={category.category}
//             className="bg-white shadow rounded-xl"
//           >
//             <p>
//               <strong>Ответов "Да":</strong> {yesCount} /{' '}
//               {category.questions.length}
//             </p>
//             <p>
//               <strong>Ответов "Нет":</strong> {noCount}
//             </p>
//
//             <div className="mt-4 space-y-4">
//               {category.questions.map((q) => {
//                 const a = categoryAnswers[q.id];
//                 if (!a || a.answer !== 'yes') return null;
//
//                 return (
//                   <div key={q.id} className="border p-4 rounded-lg bg-gray-50">
//                     <Text strong>{q.question}</Text>
//                     <br />
//                     <Text type="secondary">Оценка: {a.evaluation || '—'}</Text>
//                   </div>
//                 );
//               })}
//             </div>
//           </Card>
//         );
//       })}
//     </div>
//   );
// }
