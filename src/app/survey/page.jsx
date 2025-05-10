'use client';

import '@ant-design/v5-patch-for-react-19';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Radio, Progress, Typography } from 'antd';

const { Title } = Typography;

export default function SurveyForm() {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const router = useRouter();
  const total = questions.length;
  const progress = total > 0 ? Math.round((currentIndex / total) * 100) : 0;

  const current = questions[currentIndex];

  useEffect(() => {
    const savedAnswers = JSON.parse(localStorage.getItem('answers')) || {};
    const savedIndex = parseInt(localStorage.getItem('currentIndex')) || 0;

    setAnswers(savedAnswers);
    setCurrentIndex(savedIndex);

    const fetchQuestions = async () => {
      const response = await fetch('/api/survey');
      const data = await response.json();
      setQuestions(data);
    };

    fetchQuestions();
  }, []);

  useEffect(() => {
    localStorage.setItem('answers', JSON.stringify(answers));
    localStorage.setItem('currentIndex', currentIndex.toString());

    // Редирект на /results, когда опрос завершён
    if (questions.length > 0 && currentIndex >= questions.length) {
      router.push('/results');
    }
  }, [answers, currentIndex, questions.length, router]);

  const handleAnswer = (questionId, value) => {
    const updatedAnswers = { ...answers, [questionId]: value };
    setAnswers(updatedAnswers);
    setTimeout(() => {
      setCurrentIndex((prev) => prev + 1);
    }, 300);
  };

  if (!current) return null;

  return (
    <div className="max-w-xl mx-auto p-6">
      <p className="text-sm text-gray-500 mb-1">
        Категория: {current.category}
      </p>
      <p className="text-lg font-medium mb-6">{current.question}</p>

      <Progress percent={progress} showInfo className="mb-6" />
      <Title level={4} className="!mb-2">
        Вопрос {currentIndex + 1} из {total}
      </Title>
      <p className="text-sm text-gray-500 mb-1">
        Категория: {current.category}
      </p>
      <p className="text-lg font-medium mb-6">{current.question}</p>

      <Radio.Group
        onChange={(e) => handleAnswer(current.id, e.target.value)}
        value={answers[current.id]}
        size="large"
        buttonStyle="solid"
      >
        <Radio.Button value="yes">Да</Radio.Button>
        <Radio.Button value="no">Нет</Radio.Button>
      </Radio.Group>
    </div>
  );
}
