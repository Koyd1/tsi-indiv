import { Progress } from 'antd';

export default function SurveyHeader({ category, progress }) {
  return (
    <>
      <h2 className="!mt-40 text-2xl sm:text-xl md:text-2xl sm:mt-2">
        Категория: {category}
      </h2>
      <Progress percent={progress} className="!mb-10 !mt-7" />
    </>
  );
}
