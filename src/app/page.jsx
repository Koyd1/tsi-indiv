'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  //Автоматический переход
  useEffect(() => {
    router.push('/start');
  }, []);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1 className="fixed top-0 left-0 right-0 z-50 bg-white text-4xl font-semibold text-center sm:text-center p-10 shadow-md">
          Oh Noooo La politia
        </h1>

        <p>ARINA ALEXEI DURA...</p>
      </main>
    </div>
  );
}
