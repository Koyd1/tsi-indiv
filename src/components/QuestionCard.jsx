import { Card, Collapse, Radio, Select } from 'antd';

const { Option } = Select;

export default function QuestionCard({
  question,
  answer,
  onAnswerChange,
  onEvaluationChange,
  evaluationOptions,
}) {
  return (
    <Card
      className="!mb-5 !break-words !text-base !font-medium"
      title={
        <div className="whitespace-normal break-words p-3">
          {question.question}
          <div className="pt-4">Приоритет: {question.priority}</div>
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
        >
          <Radio.Button value="yes">Да</Radio.Button>
          <Radio.Button value="no">Нет</Radio.Button>
        </Radio.Group>

        {answer?.answer === 'yes' && (
          <Select
            placeholder="Выберите уровень выполнения"
            className="min-w-[200px] !ml-5 sm:min-w-[150px] sm:!ml-3"
            value={answer?.evaluation}
            onChange={(val) => onEvaluationChange(question.id, val)}
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
