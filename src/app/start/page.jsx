'use client';
import { Input, Button } from 'antd';
import { Header, QRCode_V } from '@/components';

import { useState } from 'react';
import '../globals.css';

export default function Start() {
  const [companyName, setCompanyName] = useState('');

  const handleChange = (e) => {
    setCompanyName(e.target.value);
  };

  return (
    <div className="grid grid-rows-[auto_1fr_auto] min-h-screen bg-white text-neutral-800 font-[family-name:var(--font-geist-sans)]">
      <Header />
      <main className="row-start-2 flex flex-col items-center justify-center px-6 sm:px-12 py-12 gap-10">
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl font-semibold select-none">
            Введите название компании
          </h1>
          <p className="text-md sm:text-lg text-gray-500 select-none"></p>
        </div>

        <div className="w-full max-w-md flex flex-col gap-6">
          <Input
            size="large"
            placeholder="Например: ООО Сигма"
            value={companyName}
            onChange={handleChange}
            className="rounded-xl text-lg px-4 py-2"
          />

          <Button
            type="primary"
            className="w-full !h-12 !text-lg shadow hover:shadow-lg transition-all duration-300"
            onClick={() => {
              console.log('Button clicked');
            }}
          >
            Начать опрос
          </Button>
        </div>
      </main>

      <footer className="row-start-3 flex flex-col sm:flex-row items-center justify-center gap-4 py-6 border-t">
        <p className="text-gray-400 text-sm sm:text-base">
          © 2025 — Что-то придумаем
        </p>
        <QRCode_V />
      </footer>
    </div>
  );
}
