import { Button } from 'antd';

export default function NavigationButtons({
  isFirst,
  isLast,
  onNext,
  onPrev,
  disabledNext,
}) {
  return (
    <div className="flex justify-between mt-6 sm:mt-4">
      <Button onClick={onPrev} disabled={isFirst} className="sm:text-sm">
        Предыдущая
      </Button>
      <Button
        type="primary"
        onClick={onNext}
        disabled={disabledNext}
        className="sm:text-sm"
      >
        {isLast ? 'Завершить' : 'Следующая категория'}
      </Button>
    </div>
  );
}
