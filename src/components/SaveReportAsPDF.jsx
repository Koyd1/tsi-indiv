import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import React from 'react';
import { Button } from 'antd';
// Функция для замены цветов в формате oklch
const replaceOklchColors = () => {
  const styles = document.querySelectorAll('*');
  styles.forEach((element) => {
    const style = window.getComputedStyle(element);
    const backgroundColor = style.backgroundColor;
    const color = style.color;

    if (backgroundColor.includes('oklch')) {
      element.style.backgroundColor = 'rgb(255, 255, 255)'; // Заменить на белый
    }

    if (color && color.includes('oklch')) {
      element.style.color = 'rgb(0, 0, 0)'; // Заменить на черный
    }
  });
};
const SaveReportAsPDF = () => {
  const downloadPDF = async () => {
    const report = document.getElementById('report');
    if (!report) return;

    // Заменяем oklch на rgb или другой формат
    replaceOklchColors();

    // Используем html2canvas для захвата содержимого
    const canvas = await html2canvas(report, {
      scale: 4, // Увеличиваем масштаб для лучшего качества
      useCORS: true, // Разрешаем кросс-оригинальные запросы для изображений
      backgroundColor: '#ffffff', // Белый фон
    });

    const imgData = canvas.toDataURL('image/png'); // Преобразуем canvas в изображение

    // Создаем новый PDF документ
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'px',
      format: [canvas.width + 400, canvas.height + 500], // Размер страницы PDF по размеру canvas
    });

    const pageHeight = pdf.internal.pageSize.height; // Высота страницы PDF
    const pageWidth = pdf.internal.pageSize.width; // Ширина страницы PDF

    const canvasHeight = canvas.height;
    const canvasWidth = canvas.width;

    const imageAspectRatio = canvasWidth / canvasHeight; // Расчет пропорции изображения
    const imageHeight = pageHeight; // Высота изображения на странице

    const imageWidth = imageHeight * imageAspectRatio; // Ширина изображения с сохранением пропорций

    // Вычисляем смещение для центрирования изображения по горизонтали
    const xOffset = (pageWidth - imageWidth) / 2; // Смещение по оси X

    let yOffset = 0; // Начальная позиция для изображения на странице

    // Добавляем первое изображение на первую страницу
    pdf.addImage(imgData, 'png', xOffset, yOffset, imageWidth, imageHeight);

    // Сохраняем PDF
    pdf.save('report.pdf');
  };

  return (
    <Button
      type="primary"
      className="mt-5 !h-12 !text-lg shadow hover:shadow-lg transition-all duration-300"
      onClick={downloadPDF}
    >
      Скачать PDF
    </Button>
  );
};

export default SaveReportAsPDF;
