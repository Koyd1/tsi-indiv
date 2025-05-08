'use client';
import Image from 'next/image';
import DialogWindow from '@/components/DialogWindow/DialogWindow';
import { useState } from 'react';
import '../app/globals.css';

export default function Home() {
  const [open, setOpen] = useState(false);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1 className="fixed top-0 left-0 right-0 z-50 bg-white text-4xl font-semibold text-center sm:text-center p-10 shadow-md">
          Welcome nahui v etu poebotu
        </h1>

        {/* Кнопка для открытия окна */}
        <p onClick={() => setOpen(true)}> Im paragraph</p>

        {/* Модальное окно */}
        <DialogWindow open={open} setOpen={setOpen} />
      </main>

      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
      </footer>
    </div>
  );
}
