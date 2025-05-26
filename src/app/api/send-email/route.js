// app/api/send-email/route.js
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import connectDB from '@/lib/dbConnect';
import Visitor from '@/models/visitor';

export async function POST(request) {
  try {
    const data = await request.json();

    // ✅ Connect to DB
    await connectDB();

    // ✅ Save to MongoDB
    await Visitor.create(data);

    // ✅ Send Email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const message = `
Visitor Name(s): ${data.visitorNames.join(', ')}
NIC(s): ${data.visitorNICs.join(', ')}
Visit Company: ${data.visitCompany}
Department: ${data.department}
Reason: ${data.reason}
Date of Visit: ${data.dateOfVisit}
End Visit: ${data.endVisit}
Vehicle Number: ${data.vehicleNumber}
HOD/Authorized Person: ${data.hodPerson}
    `;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: 'lmadurapperuma10@gmail.com',
      subject: 'Visitor GatePass',
      text: message,
    });

    return NextResponse.json({ success: true, message: 'Data saved & email sent!' });
  } catch (error) {
    console.error('❌ Error occurred:', error);
    return NextResponse.json({ success: false, error: error.message });
  }
}
