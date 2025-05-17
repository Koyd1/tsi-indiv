'use client';
import { useState } from 'react';

const standards = {
  iso: {
    title: 'ISO 27001',
    description:
      'ISO/IEC 27001:2022 — это обновлённая версия международного стандарта по управлению информационной безопасностью, который устанавливает требования к созданию, внедрению, сопровождению и постоянному улучшению Системы управления информационной безопасностью (СУИБ). Новая редакция 2022 года обновила и расширила приложение Annex A с перечнем контролей, сделав акцент на адаптивность и интеграцию с современными технологиями и бизнес-процессами. ' +
      'Структура чеклиста напрямую сопоставляется с главами стандарта и приложением Annex A.',
  },
  nist: {
    title: 'NIST',
    description:
      'NIST Cybersecurity Framework — руководство, разработанное Национальным институтом стандартов и технологий США (NIST) для повышения устойчивости кибербезопасности организаций всех типов и размеров.' +
      'В части соответствия NIST Cybersecurity Framework (CSF) чеклист отражает пять функций: Identify (определение активов, владельцев систем и оценки рисков), Protect (политики шифрования, контроль доступа, резервное копирование), Detect (мониторинг журналов, выявление аномалий, IDS), Respond (реагирование на инциденты, журнал действий, процедуры) и Recover (стратегия восстановления и планы непрерывности). ',
  },
};

export default function StandardsTabs() {
  const [activeTab, setActiveTab] = useState('iso');

  return (
    <div className="w-full max-w-3xl mx-auto mt-10 mb-10 p-4 bg-white shadow-md rounded-xl">
      <div className="flex border-b border-gray-200 mb-6">
        {Object.entries(standards).map(([key, { title }]) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`px-6 py-2 text-sm sm:text-base font-medium transition-colors duration-200 ${
              activeTab === key
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-500 hover:text-blue-600'
            }`}
          >
            {title}
          </button>
        ))}
      </div>

      <div className="text-gray-800 space-y-2">
        <h2 className="text-xl font-semibold">{standards[activeTab].title}</h2>
        <p className="text-base">{standards[activeTab].description}</p>
      </div>
    </div>
  );
}
