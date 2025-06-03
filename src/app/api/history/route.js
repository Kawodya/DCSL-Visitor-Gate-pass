import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const historyFilePath = path.join(process.cwd(), 'data', 'history.json');

export async function GET() {
  try {
    const file = await fs.readFile(historyFilePath, 'utf-8');
    const data = JSON.parse(file);
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ error: 'Unable to load history' }, { status: 500 });
  }
}
