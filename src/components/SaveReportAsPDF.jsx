'use client';

import { useState } from 'react';
import { Button, message } from 'antd';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

function replaceUnsupportedColors(element) {
  const problematicStyles = [];

  function traverse(node) {
    if (node.nodeType !== 1) return;
    const computedStyle = window.getComputedStyle(node);
    const inlineStyle = node.style;

    for (let i = 0; i < computedStyle.length; i++) {
      const prop = computedStyle[i];
      const val = computedStyle.getPropertyValue(prop);

      if (val.includes('oklab(') || val.includes('oklch(')) {
        problematicStyles.push({
          element: node,
          property: prop,
          originalValue: inlineStyle.getPropertyValue(prop) || '',
        });
        inlineStyle.setProperty(prop, '#ffffff', 'important');
      }
    }

    for (const child of node.children) {
      traverse(child);
    }
  }

  traverse(element);
  return problematicStyles;
}

function restoreStyles(problematicStyles) {
  problematicStyles.forEach(({ element, property, originalValue }) => {
    if (originalValue) {
      element.style.setProperty(property, originalValue);
    } else {
      element.style.removeProperty(property);
    }
  });
}

export function SaveReportAsPDF() {
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    setLoading(true);

    try {
      const input = document.getElementById('report');
      const downloadBtn = document.getElementById('download-btn');

      if (!input) {
        message.error('Блок #report не найден');
        setLoading(false);
        return;
      }

      // Скрыть только визуально
      if (downloadBtn) downloadBtn.classList.add('exclude-from-pdf');

      const replacedStyles = replaceUnsupportedColors(input);

      const canvas = await html2canvas(input, {
        scale: 2,
        useCORS: true,
        scrollY: -window.scrollY,
        windowWidth: document.documentElement.scrollWidth,
        windowHeight: document.documentElement.scrollHeight,
      });

      restoreStyles(replacedStyles);

      // Вернуть обратно
      if (downloadBtn) downloadBtn.classList.remove('exclude-from-pdf');

      const imgData = canvas.toDataURL('image/png');

      const imgWidth = canvas.width;
      const imgHeight = canvas.height;

      const pdfWidth = 595.28;
      const scale = pdfWidth / imgWidth;
      const pdfHeight = imgHeight * scale;

      const pdf = new jsPDF('p', 'pt', [pdfWidth, pdfHeight]);
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('report.pdf');
    } catch (error) {
      console.error('PDF Error:', error);
      message.error('Ошибка при создании PDF');
    }

    setLoading(false);
  };

  return (
    <>
      <Button
        id="download-btn"
        className=""
        type="primary"
        loading={loading}
        onClick={handleDownload}
      >
        Скачать отчет в PDF
      </Button>

      <style>{`
        .exclude-from-pdf {
          visibility: hidden !important;
        }
      `}</style>
    </>
  );
}
export default SaveReportAsPDF;
