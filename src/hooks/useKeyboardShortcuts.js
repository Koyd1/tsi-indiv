// hooks/useKeyboardShortcuts.js
import { useEffect } from 'react';

const EvaluationOptions = [
  'Не выполнено',
  'Частично выполнено',
  'Почти выполнено',
  'Полностью выполнено',
];

export function useKeyboardShortcuts(
  currentCategory,
  currentAnswers,
  setAnswers,
) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      const key = e.key.toLowerCase();

      // Обработка оценки 1–4
      if (['1', '2', '3', '4'].includes(key)) {
        const selectedIndex = parseInt(key, 10) - 1;
        const selectedValue = EvaluationOptions[selectedIndex];

        const updated = { ...currentAnswers };
        let changed = false;

        for (const [questionId, response] of Object.entries(currentAnswers)) {
          if (response.answer === 'yes') {
            updated[questionId] = {
              ...response,
              evaluation: selectedValue,
            };
            changed = true;
          }
        }

        if (changed) {
          setAnswers((prev) => ({
            ...prev,
            [currentCategory.category]: updated,
          }));
        }
      }

      // Обработка Q (yes) и E (no)
      if (key === 'e' || key === 'q') {
        const answerValue = key === 'e' ? 'no' : 'yes';

        const updated = { ...currentAnswers };
        let changed = false;

        for (const [questionId, response] of Object.entries(currentAnswers)) {
          updated[questionId] = {
            ...response,
            answer: answerValue,
            evaluation: answerValue === 'no' ? '' : response.evaluation,
          };
          changed = true;
        }

        if (changed) {
          setAnswers((prev) => ({
            ...prev,
            [currentCategory.category]: updated,
          }));
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentAnswers, currentCategory.category, setAnswers]);
}
