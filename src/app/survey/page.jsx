'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Footer, Header, QRCode_V } from '@/components';
import { SurveyHeader, QuestionCard, NavigationButtons } from '@/components';

const EvaluationOptions = [
  'Не выполнено',
  'Частично выполнено',
  'Почти выполнено',
  'Полностью выполнено',
];

export default function SurveyPage() {
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
      const res = await fetch('/api/survey');
      const survey = await res.json();
      setData(survey);
      const initialAnswers = survey.reduce((acc, category) => {
        acc[category.category] = category.questions.reduce((qAcc, q) => {
          qAcc[q.id] = { answer: 'no', evaluation: '' };
          return qAcc;
        }, {});
        return acc;
      }, {});
      setAnswers(initialAnswers);
    };
    fetchSurveyData();
  }, []);

  useEffect(() => {
    const fetchSurveyData = async () => {
      const res = await fetch('/api/survey');
      const survey = await res.json();
      setData(survey);

      // Пытаемся загрузить сохранённые ответы
      const savedAnswers = JSON.parse(localStorage.getItem('answers'));

      if (savedAnswers) {
        setAnswers(savedAnswers);
      } else {
        const initialAnswers = survey.reduce((acc, category) => {
          acc[category.category] = category.questions.reduce((qAcc, q) => {
            qAcc[q.id] = { answer: 'no', evaluation: '' };
            return qAcc;
          }, {});
          return acc;
        }, {});
        setAnswers(initialAnswers);
      }
    };

    fetchSurveyData();
  }, []);

  useEffect(() => {
    if (Object.keys(answers).length > 0) {
      localStorage.setItem('answers', JSON.stringify(answers));
    }
  }, [answers]);

  const handleAnswer = (questionId, value) => {
    const updated = {
      ...currentAnswers,
      [questionId]: { ...currentAnswers[questionId], answer: value },
    };
    setAnswers((prev) => ({
      ...prev,
      [currentCategory.category]: updated,
    }));
  };

  const handleEvaluation = (questionId, value) => {
    const updated = {
      ...currentAnswers,
      [questionId]: { ...currentAnswers[questionId], evaluation: value },
    };
    setAnswers((prev) => ({
      ...prev,
      [currentCategory.category]: updated,
    }));
  };

  const isCategoryComplete = () => {
    const questions = currentCategory.questions || [];
    return questions.every((q) => {
      const answer = currentAnswers[q.id]?.answer;
      if (!answer) return false;
      return answer === 'no' || !!currentAnswers[q.id]?.evaluation;
    });
  };

  const nextCategory = () => {
    if (!isLast) {
      setCategoryIndex((prev) => prev + 1);
      window.scrollTo(0, 0);
    } else {
      router.push('/results');
    }
  };

  const prevCategory = () => {
    if (categoryIndex > 0) setCategoryIndex((prev) => prev - 1);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 sm:p-4">
      <Header />
      <SurveyHeader category={currentCategory.category} progress={progress} />

      {currentCategory.questions?.map((q) => (
        <QuestionCard
          key={q.id}
          question={q}
          answer={currentAnswers[q.id]}
          onAnswerChange={handleAnswer}
          onEvaluationChange={handleEvaluation}
          evaluationOptions={EvaluationOptions}
        />
      ))}

      <NavigationButtons
        isFirst={categoryIndex === 0}
        isLast={isLast}
        onNext={nextCategory}
        onPrev={prevCategory}
        disabledNext={!isCategoryComplete()}
      />
      <QRCode_V />
      <Footer />
    </div>
  );
}
