'use client';
import { Team } from '@/components';
import '../../app/globals.css';
export default function About() {
  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen">
      <h1 className="text-4xl font-bold">О проекте</h1>
      <p className="mt-4 text-lg">
        Это приложение предназначено для оценки уровня кибербезопасности
        организаций и компаний.
      </p>
      <p className="mt-2 text-lg">
        Оно позволяет пользователям пройти опрос и получить отчет о состоянии их
        кибербезопасности.
      </p>
      <Team />
    </div>
  );
}
