'use client';

import { useEffect, useState } from 'react';
import { Typography, Card, Tag, Empty, Tabs, Button, Space } from 'antd';
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  FolderOpenOutlined,
  LeftOutlined,
  RightOutlined,
} from '@ant-design/icons';
import { Header, Footer } from '@/components';

const { Text } = Typography;

export default function DetailedResults() {
  // Состояние с ответами пользователя (структура: { category: { questionId: answerData } })
  const [answers, setAnswers] = useState({});
  // Состояние с данными опроса (категории и вопросы)
  const [data, setData] = useState([]);
  // Активная вкладка (категория)
  const [activeKey, setActiveKey] = useState('');

  // Цвета для разных вариантов оценки
  const evaluationColors = {
    'Не выполнено': '#F3B20D',
    'Частично выполнено': '#F6D426',
    'Почти выполнено': '#ABD925',
    'Полностью выполнено': '#77CB3D',
  };

  // Высота шапки (хедера) для отступа сверху
  const HEADER_HEIGHT = 60;

  // Загрузка данных опроса и ответов из localStorage при первом рендере
  useEffect(() => {
    (async () => {
      try {
        // Получаем данные опроса с сервера
        const res = await fetch('/api/survey');
        const survey = await res.json();
        setData(survey);

        // Устанавливаем первую категорию активной (если данные есть)
        if (survey.length > 0) setActiveKey(survey[0].category);

        // Получаем сохранённые ответы пользователя из localStorage
        const saved = localStorage.getItem('answers');
        if (saved) setAnswers(JSON.parse(saved));
      } catch (error) {
        console.error('Ошибка загрузки данных:', error);
      }
    })();
  }, []);

  // Если данных нет, показываем пустой экран с Header и Footer
  if (!data.length) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <Empty description="Нет данных для отображения" />
        </main>
        <Footer />
      </div>
    );
  }

  // Извлекаем список категорий из данных для навигации
  const categories = data.map(({ category }) => category);
  // Находим индекс активной категории
  const activeIndex = categories.indexOf(activeKey);

  // Формируем элементы вкладок для компонента Tabs
  const items = data.map(({ category, questions }) => ({
    key: category,
    label: (
      <Space align="center" size={8}>
        <FolderOpenOutlined style={{ color: '#1890ff', fontSize: 18 }} />
        <Text strong>{category}</Text>
      </Space>
    ),
    children: (
      <div className="flex flex-col gap-6 w-full mt-4">
        {/* Перебираем вопросы в категории */}
        {questions.map(({ id, question }) => {
          const userAnswer = answers[category]?.[id]; // ответ пользователя на конкретный вопрос
          const isYes = userAnswer?.answer === 'yes'; // ответ "да" или "нет"

          return (
            <Card
              key={id}
              className="
                rounded-lg shadow-md hover:shadow-lg transition cursor-default w-full
              "
              style={{
                padding: '24px 32px',
                borderLeft: `6px solid ${isYes ? '#52c41a' : '#ff4d4f'}`, // зеленая или красная полоса
                position: 'relative',
              }}
              body={{ padding: 0 }}
            >
              {/* Вопрос */}
              <div style={{ paddingRight: 48, minHeight: 40 }}>
                <Text
                  strong
                  className="!text-lg text-gray-900"
                  style={{ whiteSpace: 'normal', wordBreak: 'break-word' }}
                >
                  {question}
                </Text>
              </div>

              {/* Иконка проверки — зеленая галочка или красный крест */}
              <div
                style={{
                  position: 'absolute',
                  top: 24,
                  right: 32,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: 40,
                  height: 40,
                  color: isYes ? '#52c41a' : '#ff4d4f',
                  fontSize: 28,
                }}
              >
                {isYes ? <CheckCircleOutlined /> : <CloseCircleOutlined />}
              </div>

              {/* Блок с ответом и оценкой (если есть) */}
              <div className="mt-5 flex flex-wrap gap-8 items-center w-full">
                <div className="flex items-center gap-3">
                  <Text strong style={{ fontSize: 16 }}>
                    Ответ:
                  </Text>
                  <Tag
                    color={isYes ? '#52c41a' : '#ff4d4f'}
                    className="text-lg font-semibold flex items-center gap-1 px-4 py-1"
                    style={{ fontSize: 16 }}
                  >
                    {isYes ? 'Да' : 'Нет'}
                  </Tag>
                </div>

                {/* Если ответ "да" и есть оценка, показываем её */}
                {isYes && userAnswer?.evaluation && (
                  <div className="flex items-center gap-3">
                    <Text strong style={{ fontSize: 16 }}>
                      Оценка:
                    </Text>
                    <Tag
                      color={
                        evaluationColors[userAnswer.evaluation] || 'default'
                      }
                      className="text-lg font-semibold px-4 py-1"
                      style={{ fontSize: 16 }}
                    >
                      {userAnswer.evaluation}
                    </Tag>
                  </div>
                )}
              </div>
            </Card>
          );
        })}
      </div>
    ),
  }));

  // Функция плавной прокрутки страницы вверх
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white flex flex-col pt-[60px]">
      {/* Шапка страницы */}
      <Header />

      {/* Основной контент с отступом сверху под Header */}
      <main
        className="flex-grow w-full max-w-full px-4 py-16 flex flex-col justify-center items-center"
        style={{ paddingTop: HEADER_HEIGHT + 20 }}
      >
        <div className="w-full max-w-[95%] sm:max-w-[80%]">
          {/* Вкладки категорий с вопросами */}
          <Tabs
            tabPosition="top"
            activeKey={activeKey}
            onChange={(key) => {
              setActiveKey(key); // меняем активную вкладку
            }}
            items={items}
            size="large"
            tabBarGutter={24}
            style={{
              background: '#f9f9f9',
              borderRadius: 10,
              padding: 16,
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              minHeight: 600,
            }}
          />

          {/* Кнопки навигации между категориями снизу */}
          <div className="flex justify-between mt-6">
            <Button
              type="primary"
              icon={<LeftOutlined />}
              disabled={activeIndex <= 0} // запрещаем назад, если первая вкладка
              onClick={() => {
                if (activeIndex > 0) {
                  setActiveKey(categories[activeIndex - 1]);
                  scrollToTop(); // скроллим наверх при переходе
                }
              }}
            >
              Назад
            </Button>
            <Button
              type="primary"
              icon={<RightOutlined />}
              disabled={activeIndex === categories.length - 1} // запрещаем вперед, если последняя вкладка
              onClick={() => {
                if (activeIndex < categories.length - 1) {
                  setActiveKey(categories[activeIndex + 1]);
                  scrollToTop(); // скроллим наверх при переходе
                }
              }}
            >
              Вперед
            </Button>
          </div>
        </div>
      </main>

      {/* Футер страницы */}
      <Footer />
    </div>
  );
}
