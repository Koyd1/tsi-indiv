'use client';

import { useEffect, useState } from 'react';
import { Radio, Typography } from 'antd';

const { Title } = Typography;

export default function SurveyForm() {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    const loadQuestions = async () => {
      const response = await fetch('/api/survey');
      const data = await response.json();
      setQuestions(data);
    };

    loadQuestions();
  }, []);

  const handleAnswer = (questionId, value) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));

    // Переход к следующему вопросу после небольшой паузы (для UX)
    setTimeout(() => {
      setCurrentIndex((prev) => prev + 1);
    }, 300);
  };

  if (currentIndex >= questions.length) {
    return (
      <div>
        <Title level={2}>Спасибо за прохождение опроса!</Title>
        <pre>{JSON.stringify(answers, null, 2)}</pre>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];

  return (
    <div>
      <Title level={3}>
        Вопрос {currentIndex + 1} из {questions.length}
      </Title>

      <p style={{ fontSize: '18px', marginBottom: '16px' }}>
        {currentQuestion.question}
      </p>

      <Radio.Group
        onChange={(e) => handleAnswer(currentQuestion.id, e.target.value)}
        value={answers[currentQuestion.id]}
      >
        <Radio.Button value="yes">Да</Radio.Button>
        <Radio.Button value="no">Нет</Radio.Button>
      </Radio.Group>
    </div>
  );
}
