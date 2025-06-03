import { NextResponse } from 'next/server';
import ExcelJS from 'exceljs';
import fs from 'fs';
import { writeFile, readFile } from 'fs/promises';
import path from 'path';

const excelFilePath = 'D:/Lisitha/DCSL/vgp/visitor_data.xlsx'; // Excel file path
const historyFilePath = path.join(process.cwd(), 'data', 'history.json'); // History JSON file path

// Define headers with explicit keys
const excelColumns = [
  { header: 'Visitor Names', key: 'visitorNames' },
  { header: 'NICs', key: 'visitorNICs' },
  { header: 'Visit Company', key: 'visitCompany' },
  { header: 'Department', key: 'department' },
  { header: 'Reason', key: 'reason' },
  { header: 'Date of Visit', key: 'dateOfVisit' },
  { header: 'End Visit', key: 'endVisit' },
  { header: 'Vehicle Number', key: 'vehicleNumber' },
  { header: 'HOD/Authorized Person', key: 'hodPerson' },
];

// Save data to Excel
async function saveVisitorData(data, filePath = excelFilePath) {
  try {
    const workbook = new ExcelJS.Workbook();

    if (!fs.existsSync(filePath)) {
      // Create new file and worksheet
      const worksheet = workbook.addWorksheet('Sheet1');
      worksheet.columns = excelColumns;
      await workbook.xlsx.writeFile(filePath);
      console.log(`📄 Excel file created at: ${filePath}`);
    }

    // Load existing file
    await workbook.xlsx.readFile(filePath);
    const worksheet = workbook.getWorksheet('Sheet1');

    // ✅ Set columns every time (important!)
    worksheet.columns = excelColumns;

    // Combine visitor names and NICs arrays into comma-separated strings
    const visitorNamesStr = data.visitorNames.join(', ');
    const visitorNICsStr = data.visitorNICs.join(', ');

    // Add data row
    worksheet.addRow({
      visitorNames: visitorNamesStr,
      visitorNICs: visitorNICsStr,
      visitCompany: data.visitCompany,
      department: data.department,
      reason: data.reason,
      dateOfVisit: data.dateOfVisit,
      endVisit: data.endVisit,
      vehicleNumber: data.vehicleNumber,
      hodPerson: data.hodPerson,
    });

    await workbook.xlsx.writeFile(filePath);
    console.log(`✅ Data saved to Excel at: ${filePath}`);
  } catch (error) {
    console.error('❌ Error saving to Excel:', error);
    throw error;
  }
}

// Save to History Table (JSON file)
async function saveToHistory(data) {
  try {
    let history = [];

    // Try to read existing history
    if (fs.existsSync(historyFilePath)) {
      const file = await readFile(historyFilePath, 'utf-8');
      history = JSON.parse(file);
    }

    // Prepare formatted entry (names and NICs line-separated)
    const historyEntry = {
      visitorNames: data.visitorNames.join('\n'),
      visitorNICs: data.visitorNICs.join('\n'),
      visitCompany: data.visitCompany,
      department: data.department,
      reason: data.reason,
      dateOfVisit: data.dateOfVisit,
      endVisit: data.endVisit,
      vehicleNumber: data.vehicleNumber,
      hodPerson: data.hodPerson,
      timestamp: new Date().toISOString(),
    };

    history.push(historyEntry);

    // Save updated history
    await writeFile(historyFilePath, JSON.stringify(history, null, 2));
    console.log('📚 History updated');
  } catch (error) {
    console.error('❌ Error saving to history:', error);
    throw error;
  }
}

// Main POST handler
export async function POST(req) {
  try {
    const body = await req.json();

    // Save to Excel
    await saveVisitorData(body);

    // Save to history
    await saveToHistory(body);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
                            