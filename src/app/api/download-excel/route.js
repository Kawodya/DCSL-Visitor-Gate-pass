import fs from 'fs';

const excelFilePath = 'D:/Lisitha/DCSL/vgp/visitor_data.xlsx';

export async function GET() {
  try {
    if (!fs.existsSync(excelFilePath)) {
      return new Response('Excel file not found', { status: 404 });
    }

    const fileBuffer = fs.readFileSync(excelFilePath);

    return new Response(fileBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': 'attachment; filename="visitor_data.xlsx"',
        'Content-Length': fileBuffer.length,
      },
    });
  } catch (error) {
    console.error('Error reading Excel file:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}
