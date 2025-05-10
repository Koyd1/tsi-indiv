import { QRCode_V } from '@/components/index';

export default function Footer() {
  return (
    <footer className="row-start-3 flex flex-col sm:flex-row items-center justify-center gap-4 py-6 border-t">
      <p className="text-gray-400 text-sm sm:text-base">
        © 2025 — Что-то придумаем
      </p>
      <QRCode_V />
    </footer>
  );
}
