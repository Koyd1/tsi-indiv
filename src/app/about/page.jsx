'use client';
import { useRouter } from 'next/navigation';
import { Team, StandardTabs, Footer } from '@/components';
import '../../app/globals.css';
import { Button } from 'antd';

const paragraphClass = 'text-lg text-gray-800 leading-relaxed';

export default function About() {
  const router = useRouter();

  const goToStart = () => {
    router.push('/');
  };

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen px-4">
      <h1 className="text-4xl font-bold">О проекте</h1>

      <p className={`${paragraphClass} mt-4`}>
        Чеклист по информационной безопасности охватывает ключевые направления,
        соответствующие основным требованиям стандартов ISO 27001 и NIST CSF. Он
        помогает выявить зрелость процессов, включает административные,
        технические и физические меры защиты, а также позволяет провести
        gap-анализ и построить план улучшения.
      </p>

      <StandardTabs />

      <p className={`${paragraphClass} mt-4`}>
        Для оценки внедрения каждый вопрос чеклиста рассматривается как
        контрольный индикатор соответствия: утвердительный ответ указывает на
        зрелость и соответствие, отрицательный фиксирует пробел, который можно
        связать с требованием ISO или NIST, назначить ответственного, установить
        приоритет и запланировать корректирующие действия. В итоге, этот чеклист
        полностью совместим с ISO 27001 и NIST CSF, может использоваться как
        основа для самодиагностики или внутреннего аудита, помогает
        подготовиться к сертификации или формальной оценке и служит полезным
        инструментом для построения дорожной карты внедрения мер информационной
        безопасности.
      </p>

      <Team />

      <Button
        type="primary"
        className="!h-12 !text-lg shadow hover:shadow-lg transition-all duration-300"
        onClick={goToStart}
      >
        Перейти к чеклисту
      </Button>

      <Footer />
    </div>
  );
}
