import { Card, Collapse, Radio, Select } from 'antd';
import Image from 'next/image';
import '@ant-design/v5-patch-for-react-19';

const { Option } = Select;

const getPriorityIcon = (priority) => {
  switch (priority) {
    case '4':
      return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          Приоритет: Низкий
          <Image
            src="/arrow-low.svg"
            alt="Low priority"
            width={20}
            height={20}
          />
        </div>
      );
    case '3':
      return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          Приоритет: Нормальный
          <Image
            src="/green-tick.svg"
            alt="Medium priority"
            width={20}
            height={20}
          />
        </div>
      );
    case '2':
      return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          Приоритет: Высокий
          <Image
            src="/orange-alert.svg"
            alt="High priority"
            width={20}
            height={20}
          />
        </div>
      );
    case '1':
      return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          Приоритет: Критический
          <Image
            src="/alert-red.svg"
            alt="Critical priority"
            width={20}
            height={20}
          />
        </div>
      );
    default:
      return null;
  }
};

export default function QuestionCard({
  question,
  answer,
  onAnswerChange,
  onEvaluationChange,
  evaluationOptions,
  onSelect,
  isSelected,
}) {
  return (
    <Card
      onClick={onSelect}
      className={`!mb-5 !break-words !text-base !font-medium !border-gray-300 ${
        isSelected ? 'border-blue-500' : ''
      }`}
      title={
        <div>
          <div className="whitespace-normal break-words pt-5">
            {question.question}
          </div>

          <div className="pt-4 pb-2 text-sm">
            {getPriorityIcon(String(question.priority))}
          </div>
        </div>
      }
      variant="outlined"
    >
      <Collapse
        defaultActiveKey={[]}
        className="mt-2"
        items={[
          {
            key: question.id,
            label: 'Описание:',
            children: (
              <p className="mb-4 text-gray-600 whitespace-pre-line text-sm sm:text-base">
                {question.description}
              </p>
            ),
          },
        ]}
      />

      <div className="m-4 sm:m-2 !mt-8 flex items-center justify-start flex-wrap gap-1">
        <Radio.Group
          value={answer?.answer}
          onChange={(e) => onAnswerChange(question.id, e.target.value)}
          onClick={(e) => e.stopPropagation()} // чтобы клик по радио не выбирал карточку
        >
          <Radio.Button value="yes">Есть</Radio.Button>
          <Radio.Button value="no">Нет</Radio.Button>
        </Radio.Group>

        {answer?.answer === 'yes' && (
          <Select
            placeholder="Выберите уровень выполнения"
            className="!min-w-[210px] !ml-5 sm:min-w-[150px] sm:!ml-3"
            value={answer?.evaluation || undefined}
            onChange={(val) => onEvaluationChange(question.id, val)}
            onClick={(e) => e.stopPropagation()} // чтобы клик по селекту не выбирал карточку
          >
            {evaluationOptions.map((level) => (
              <Option key={level} value={level}>
                {level}
              </Option>
            ))}
          </Select>
        )}
      </div>
    </Card>
  );
}
