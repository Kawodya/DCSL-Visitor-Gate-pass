import nodemailer from 'nodemailer';

async function sendEmail(data) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Create clearly formatted lines for each visitor
  const visitorLines = data.visitorNames.map((name, index) => {
    const nic = data.visitorNICs[index] || '';
    const nameLabel = `Visitor${index + 1} Name:`.padEnd(20);
    const nicLabel = `Visitor${index + 1} NIC:`.padEnd(20);
    return `${nameLabel} ${name}    ${nicLabel} ${nic}`;
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: 'lmadurapperuma10@gmail.com',
    subject: 'Visitor GatePass',
    text: `🧍 Visitors:
${visitorLines.join('\n')}

🏢 Visit Details:
Visit Company       : ${data.visitCompany}
Department          : ${data.department}
Reason              : ${data.reason}
Date of Visit       : ${data.dateOfVisit}
End Visit           : ${data.endVisit}
Vehicle Number      : ${data.vehicleNumber}
HOD/Authorized Person: ${data.hodPerson}
`,
  };

  await transporter.sendMail(mailOptions);
  console.log('✅ Email sent');
}

export async function POST(req) {
  try {
    const data = await req.json();

    if (   //
      !data ||
      !Array.isArray(data.visitorNames) ||
      !Array.isArray(data.visitorNICs)
    ) {
      return new Response(
        JSON.stringify({ success: false, error: 'Invalid visitorNames or visitorNICs' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    await sendEmail(data);

    return new Response(JSON.stringify({ success: true, message: 'Email sent successfully' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('❌ Error in /api/send-email:', error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
