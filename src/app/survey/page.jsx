'use client';

import '@ant-design/v5-patch-for-react-19';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Select, Radio, Progress, Collapse, Card } from 'antd';
import '../globals.css';
import { Header } from '@/components'; // Если используете локальные данные для начальной загрузки

const { Option } = Select;

const EvaluationOptions = [
  'Not done',
  'Partly done',
  'Mostly done',
  'Fully done',
];

export default function Survey() {
  const [categoryIndex, setCategoryIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [data, setData] = useState([]);
  const router = useRouter();

  const currentCategory = data[categoryIndex] || {};
  const totalCategories = data.length;
  const currentAnswers = answers[currentCategory.category] || {};

  const isLast = categoryIndex === totalCategories - 1;
  const progress = Math.round((categoryIndex / totalCategories) * 100);

  useEffect(() => {
    const fetchSurveyData = async () => {
      const res = await fetch('/api/survey'); // Получаем данные через API
      const survey = await res.json();
      setData(survey); // Сохраняем данные в состоянии

      // Инициализация состояния с ответом "no" по умолчанию
      const initialAnswers = survey.reduce((acc, category) => {
        acc[category.category] = category.questions.reduce((qAcc, q) => {
          qAcc[q.id] = { answer: 'no', evaluation: '' }; // Устанавливаем "no" как ответ по умолчанию
          return qAcc;
        }, {});
        return acc;
      }, {});
      setAnswers(initialAnswers);
    };
    fetchSurveyData();
  }, []);

  const handleAnswer = (questionId, value) => {
    const updatedCategoryAnswers = {
      ...currentAnswers,
      [questionId]: { ...currentAnswers[questionId], answer: value },
    };
    setAnswers((prev) => ({
      ...prev,
      [currentCategory.category]: updatedCategoryAnswers,
    }));
  };

  const handleEvaluation = (questionId, value) => {
    const updatedCategoryAnswers = {
      ...currentAnswers,
      [questionId]: { ...currentAnswers[questionId], evaluation: value },
    };
    setAnswers((prev) => ({
      ...prev,
      [currentCategory.category]: updatedCategoryAnswers,
    }));
  };

  // Функция для проверки, завершена ли текущая категория
  const isCategoryComplete = () => {
    const questions = currentCategory.questions || [];
    return questions.every((q) => {
      const answer = currentAnswers[q.id]?.answer;
      if (!answer) return false;
      if (answer === 'yes') {
        return !!currentAnswers[q.id]?.evaluation;
      }
      return true;
    });
  };

  const nextCategory = () => {
    if (categoryIndex < totalCategories - 1) {
      setCategoryIndex((prev) => prev + 1);
    } else {
      router.push('/results');
    }
  };

  const prevCategory = () => {
    if (categoryIndex > 0) {
      setCategoryIndex((prev) => prev - 1);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Header />
      <h2 className="text-2xl mb-4 mt-25">
        Категория: {currentCategory.category}
      </h2>

      <Progress percent={progress} className="mb-4" />

      {currentCategory.questions?.map((q) => (
        <Card key={q.id} className="mb-4" title={q.question} variant="outlined">
          <Collapse
            defaultActiveKey={[]}
            className="mt-2"
            items={[
              {
                key: q.id,
                label: 'Description',
                children: (
                  <p className="mb-4 text-gray-600 whitespace-pre-line">
                    {q.description}
                  </p>
                ),
              },
            ]}
          />

          <div className="m-4 !mt-8 flex items-center justify-start flex-wrap gap-1">
            <Radio.Group
              value={currentAnswers[q.id]?.answer}
              onChange={(e) => handleAnswer(q.id, e.target.value)}
            >
              <Radio.Button value="yes">Yes</Radio.Button>
              <Radio.Button value="no">No</Radio.Button>
            </Radio.Group>

            {currentAnswers[q.id]?.answer === 'yes' && (
              <Select
                placeholder="Select implementation level"
                className="min-w-[200px] !ml-5"
                value={currentAnswers[q.id]?.evaluation}
                onChange={(val) => handleEvaluation(q.id, val)}
              >
                {EvaluationOptions.map((level) => (
                  <Option key={level} value={level}>
                    {level}
                  </Option>
                ))}
              </Select>
            )}
          </div>
        </Card>
      ))}

      <div className="flex justify-between mt-6">
        <Button onClick={prevCategory} disabled={categoryIndex === 0}>
          Previous
        </Button>
        <Button
          type="primary"
          onClick={nextCategory}
          disabled={!isCategoryComplete()}
        >
          {categoryIndex === totalCategories - 1 ? 'Finish' : 'Next Category'}
        </Button>
      </div>
    </div>
  );
}
