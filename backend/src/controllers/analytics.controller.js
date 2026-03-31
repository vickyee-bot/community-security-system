const analyticsService = require("../services/analytics.service");
const { Parser } = require("json2csv");
const PDFDocument = require("pdfkit");

const getIncidentsByType = async (req, res) => {
  try {
    const data = await analyticsService.getIncidentsByType();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getIncidentsByDay = async (req, res) => {
  try {
    const data = await analyticsService.getIncidentsByDay();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getSummaryStats = async (req, res) => {
  try {
    const data = await analyticsService.getSummaryStats();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// CSV EXPORT
const exportCSV = async (req, res) => {
  try {
    const data = await analyticsService.getIncidentsByType();

    const formatted = data.map((item) => ({
      Type: item.type,
      Count: item._count.type,
    }));

    const parser = new Parser();
    const csv = parser.parse(formatted);

    res.header("Content-Type", "text/csv");
    res.attachment("incident-report.csv");
    return res.send(csv);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// PDF EXPORT
const exportPDF = async (req, res) => {
  try {
    const data = await analyticsService.getIncidentsByType();

    const doc = new PDFDocument();

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=report.pdf");

    doc.pipe(res);

    doc.fontSize(18).text("Incident Report", { align: "center" });
    doc.moveDown();

    data.forEach((item) => {
      doc.fontSize(12).text(`Type: ${item.type} | Count: ${item._count.type}`);
    });

    doc.end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getIncidentsByType,
  getIncidentsByDay,
  getSummaryStats,
  getIncidentsByType,
  exportCSV,
  exportPDF,
};
