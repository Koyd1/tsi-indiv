'use client';
import { Header, Footer, CompanyInputForm } from '@/components';
import '../../app/globals.css';
export default function Start() {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] min-h-screen bg-white text-neutral-800 font-[family-name:var(--font-geist-sans)]">
      <Header />
      <main className="row-start-2 flex flex-col items-center justify-center px-6 sm:px-12 py-12 gap-10">
        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl font-semibold select-none">
            Введите название компании:
          </h1>
        </div>
        <CompanyInputForm />
      </main>
      <Footer />
    </div>
  );
}
