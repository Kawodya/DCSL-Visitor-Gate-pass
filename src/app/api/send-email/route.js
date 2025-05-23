import nodemailer from 'nodemailer';

export async function POST(req) {
  try {
    const data = await req.json();

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

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error('Email send error:', error);
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
    });
  }
}
