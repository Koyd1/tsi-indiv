import { QRCode_V } from '@/components/index';
import { useRouter } from 'next/navigation';

export default function Footer() {
  const router = useRouter();
  return (
    <footer className="mt-5 row-start-3 w-full border-t bg-white py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 flex flex-col sm:flex-row sm:justify-between items-center">
        <div className="w-full flex flex-col items-center space-y-1 text-gray-400 text-sm sm:text-base text-center">
          <p>© 2025 — FalcoNS All rights reserved.</p>
          <p>Адрес: г. Кишинёв, ул. Студенческая, 9/7</p>
          <p>Телефон: Xiaomi</p>
          <p
            onClick={() => router.push('/about')}
            className="underline hover:text-gray-600 cursor-pointer"
          >
            О проекте
          </p>
        </div>
        <QRCode_V />
      </div>
    </footer>
  );
}
