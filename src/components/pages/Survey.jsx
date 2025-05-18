'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Footer, Header, QRCode_V, UpAndDownButton } from '@/components';
import { SurveyHeader, QuestionCard, NavigationButtons } from '@/components';

const EvaluationOptions = [
  'Не выполнено',
  'Частично выполнено',
  'Почти выполнено',
  'Полностью выполнено',
];

export default function Survey() {
  const [categoryIndex, setCategoryIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [data, setData] = useState([]);
  const router = useRouter();
  const [selectedQuestionId, setSelectedQuestionId] = useState(null);

  const currentCategory = data[categoryIndex] || {};
  const totalCategories = data.length;
  const currentAnswers = answers[currentCategory.category] || {};

  const isLast = categoryIndex === totalCategories - 1;
  const progress =
    totalCategories === 0
      ? 0
      : Math.round((categoryIndex / totalCategories) * 100);

  useEffect(() => {
    const fetchSurveyData = async () => {
      try {
        const res = await fetch('/api/survey');
        const survey = await res.json();
        setData(survey);

        if (typeof window !== 'undefined') {
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
        }
      } catch (e) {
        console.error('Failed to fetch survey data:', e);
      }
    };
    fetchSurveyData();
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined' && Object.keys(answers).length > 0) {
      localStorage.setItem('answers', JSON.stringify(answers));
    }
  }, [answers]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      const key = e.key.toLowerCase();
      const currentCategoryObj = data[categoryIndex];
      const currentCategoryName = currentCategoryObj?.category;
      const currentAnswers = answers[currentCategoryName] || {};
      const questions = currentCategoryObj?.questions || [];

      const isLastCategory = categoryIndex === data.length - 1;
      const isComplete = questions.every((q) => {
        const a = currentAnswers[q.id];
        return a?.answer === 'no' || (a?.answer === 'yes' && a?.evaluation);
      });

      if (['1', '2', '3', '4'].includes(key)) {
        if (!selectedQuestionId) return;
        const selectedValue = EvaluationOptions[parseInt(key, 10) - 1];
        const currentResponse = currentAnswers[selectedQuestionId];
        if (currentResponse?.answer === 'yes') {
          const updated = {
            ...currentAnswers,
            [selectedQuestionId]: {
              ...currentResponse,
              evaluation: selectedValue,
            },
          };
          setAnswers((prev) => ({
            ...prev,
            [currentCategoryName]: updated,
          }));
        }
      }

      if (e.key === 'ArrowRight') {
        if (isComplete) {
          if (!isLastCategory) {
            setCategoryIndex((prev) => prev + 1);
            setSelectedQuestionId(null);
            window.scrollTo(0, 0);
          } else {
            router.push('/end-stat');
          }
        }
      } else if (e.key === 'ArrowLeft') {
        if (categoryIndex > 0) {
          setCategoryIndex((prev) => prev - 1);
          setSelectedQuestionId(null);
          window.scrollTo(0, 0);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [categoryIndex, data.length, selectedQuestionId, answers]);

  const handleAnswer = (questionId, value) => {
    const updated = {
      ...currentAnswers,
      [questionId]: {
        ...currentAnswers[questionId],
        answer: value,
        evaluation: value === 'no' ? '' : currentAnswers[questionId].evaluation,
      },
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
    if (!isLast && isCategoryComplete()) {
      setCategoryIndex((prev) => prev + 1);
      setSelectedQuestionId(null);
      window.scrollTo(0, 0);
    } else if (isLast && isCategoryComplete()) {
      router.push('/end-stat');
    }
  };

  const prevCategory = () => {
    if (categoryIndex > 0) {
      setCategoryIndex((prev) => prev - 1);
      setSelectedQuestionId(null);
      window.scrollTo(0, 0);
    }
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
          onSelect={() => setSelectedQuestionId(q.id)}
          isSelected={selectedQuestionId === q.id}
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
      <UpAndDownButton />
    </div>
  );
}
