import { QRCode_V } from '@/components/index';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="row-start-3 flex flex-col sm:flex-row sm:justify-between items-center gap-6 py-6 border-t !mt-30 max-w-7xl mx-auto px-4 sm:px-8">
      <div className="flex flex-col items-center sm:items-start space-y-1 text-gray-400 text-sm sm:text-base">
        <p>© 2025 — FalcoNS All rights reserved.</p>
        <p>Адрес: г. Кишинёв, ул. Студенческая, 9/7, блок 3</p>
        <Link href="/about" className="underline hover:text-gray-600">
          О проекте
        </Link>
      </div>
      <div>
        <QRCode_V />
      </div>
    </footer>
  );
}
