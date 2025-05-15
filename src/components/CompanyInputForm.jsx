'use client';
import { Input, Button } from 'antd';
import { useCompanyNameForm } from '@/hooks/useCompanyNameForm';

export default function CompanyInputForm() {
  const { inputRef, companyName, loading, handleChange, handleSubmit } =
    useCompanyNameForm();

  return (
    <div className="w-full max-w-md flex flex-col gap-6">
      <Input
        ref={inputRef}
        size="large"
        placeholder="Например: ООО Сигма"
        value={companyName}
        onChange={handleChange}
        onPressEnter={handleSubmit}
        className="rounded-xl text-lg px-4 py-2"
      />
      <Button
        type="primary"
        loading={loading}
        disabled={companyName.trim().length === 0}
        className="w-full !h-12 !text-lg shadow hover:shadow-lg transition-all duration-300"
        onClick={handleSubmit}
      >
        Начать опрос
      </Button>
    </div>
  );
}
