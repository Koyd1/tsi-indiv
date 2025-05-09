'use client';
import { Input, Button } from 'antd';
import { Header, QRCode_V } from '@/components';

import { useState } from 'react';
import '../app/globals.css';

export default function Home() {
  const [companyName, setCompanyName] = useState('');

  const handleChange = (e) => {
    setCompanyName(e.target.value);
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start font-[family-name:var(--font-geist-sans)]">
        <Header />
        <div className="text-4xl m-auto">
          <h1 className="select-none">Введите название компании:</h1>
        </div>
        <Input
          style={{
            width: '40vw',
            height: '7vh',
            fontSize: '24px',
            margin: 'auto',
          }}
          placeholder="Введите название компании..."
          value={companyName}
          onChange={handleChange}
        />
        <Button
          type="primary"
          className="w-[30vw] !h-[8vh] !text-2xl m-auto"
          onClick={() => {
            console.log('Button clicked');
          }}
        >
          Начать опрос
        </Button>
      </main>

      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <p>Что-то придумаем</p>
        <QRCode_V />

        {/*<a*/}
        {/*  className="flex items-center gap-2 hover:underline hover:underline-offset-4"*/}
        {/*  href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"*/}
        {/*  target="_blank"*/}
        {/*  rel="noopener noreferrer"*/}
        {/*>*/}
        {/*  <Image*/}
        {/*    aria-hidden*/}
        {/*    src="/file.svg"*/}
        {/*    alt="File icon"*/}
        {/*    width={16}*/}
        {/*    height={16}*/}
        {/*  />*/}
        {/*  Learn*/}
        {/*</a>*/}
      </footer>
    </div>
  );
}
