"use client";

import jsPDF from "jspdf";
import { toPng } from "html-to-image";

export default function DownloadReportButton() {
  async function downloadPDF() {
    const report =
      document.getElementById(
        "report-content"
      );

    if (!report) return;

    const dataUrl = await toPng(report, {
      cacheBust: true,
      pixelRatio: 2,
    });

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: "a4",
    });

    const pdfWidth =
      pdf.internal.pageSize.getWidth();

    const pdfHeight = 1200;

    pdf.addImage(
      dataUrl,
      "PNG",
      0,
      0,
      pdfWidth,
      pdfHeight
    );

    pdf.save("stacksave-report.pdf");
  }

  return (
    <button
      onClick={downloadPDF}
      className="
        rounded-2xl
        bg-black
        text-white
        px-6
        py-4
        font-semibold
        hover:opacity-90
        transition
      "
    >
      Download PDF Report
    </button>
  );
}