import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import React from 'react';

const SaveReportAsPDF = () => {
  const downloadPDF = async () => {
    const report = document.getElementById('report');
    if (!report) return;

    // Используем html2canvas для захвата содержимого
    const canvas = await html2canvas(report, {
      scale: 4, // Увеличиваем масштаб для лучшего качества
      // scrollX: 0,
      // scrollY: -window.scrollY, // Учитываем прокрутку страницы
      useCORS: true, // Разрешаем кросс-оригинальные запросы для изображений
    });

    const imgData = canvas.toDataURL('image/png'); // Преобразуем canvas в изображение

    // Создаем PDF документ
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'px',
      format: [canvas.width + 400, canvas.height + 500], // Размер страницы PDF по размеру canvas
    });

    // Добавляем изображение на первую страницу PDF
    pdf.addImage(imgData, 'png', 0, 0, canvas.width, canvas.height);

    // Сохраняем PDF
    pdf.save('report.pdf');
  };

  return (
    <button
      onClick={downloadPDF}
      className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
    >
      Скачать PDF
    </button>
  );
};

export default SaveReportAsPDF;
