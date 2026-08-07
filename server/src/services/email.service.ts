import nodemailer from 'nodemailer';

let transporter: nodemailer.Transporter | null = null;

const getTransporter = () => {
  if (transporter) return transporter;

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;

  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
    console.warn('SMTP credentials not configured. Emails will not be sent.');
    return null;
  }

  transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: parseInt(SMTP_PORT, 10),
    secure: parseInt(SMTP_PORT, 10) === 465,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  });

  return transporter;
};

const sendMail = async (to: string, subject: string, html: string) => {
  try {
    const mailTransporter = getTransporter();
    if (!mailTransporter) {
      console.log(`[Email Mock] Would send to: ${to} | Subject: ${subject}`);
      return;
    }

    const mailOptions = {
      from: process.env.SMTP_FROM_EMAIL || '"Galcare Pharmaceuticals" <noreply@galcare.com>',
      to,
      subject,
      html,
    };

    await mailTransporter.sendMail(mailOptions);
    console.log(`Email sent successfully to ${to}`);
  } catch (error) {
    console.error('Error sending email:', error);
    // Suppress error to avoid crashing the server
  }
};

const styles = `
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .header { background-color: #16a34a; color: white; padding: 20px; text-align: center; }
    .content { padding: 20px; }
    .footer { font-size: 12px; text-align: center; color: #777; margin-top: 20px; }
  </style>
`;

export const notifyTeamNewLead = async (lead: any) => {
  const alertEmail = process.env.ALERT_EMAIL_SALES || 'sales@galcare.com';
  const html = `
    ${styles}
    <div class="header">
      <h2>New Lead Submission</h2>
    </div>
    <div class="content">
      <p><strong>Name:</strong> ${lead.name}</p>
      <p><strong>Company:</strong> ${lead.company || 'N/A'}</p>
      <p><strong>Email:</strong> ${lead.email}</p>
      <p><strong>Phone:</strong> ${lead.phone || 'N/A'}</p>
      <p><strong>Interest Area:</strong> ${lead.interestArea}</p>
      <p><strong>Category:</strong> ${lead.category}</p>
      <p><strong>Notes:</strong> ${lead.notes || 'N/A'}</p>
    </div>
    <div class="footer">
      <p>This is an automated message from Galcare Pharmaceuticals.</p>
    </div>
  `;
  await sendMail(alertEmail, 'New Lead Alert', html);
};

export const notifyTeamNewJobApplication = async (application: any, jobTitle: string) => {
  const alertEmail = process.env.ALERT_EMAIL_CAREERS || 'careers@galcare.com';
  const html = `
    ${styles}
    <div class="header">
      <h2>New Job Application: ${jobTitle}</h2>
    </div>
    <div class="content">
      <p><strong>Candidate:</strong> ${application.candidate}</p>
      <p><strong>Email:</strong> ${application.email}</p>
      <p><strong>Phone:</strong> ${application.phone}</p>
      <p><strong>Resume URL:</strong> <a href="${application.resumeUrl}">${application.resumeUrl}</a></p>
    </div>
    <div class="footer">
      <p>This is an automated message from Galcare Pharmaceuticals.</p>
    </div>
  `;
  await sendMail(alertEmail, `New Job Application: ${jobTitle}`, html);
};

export const notifyTeamNew3rdPartyRequest = async (lead: any) => {
  const alertEmail = process.env.ALERT_EMAIL_SALES || 'sales@galcare.com';
  const html = `
    ${styles}
    <div class="header">
      <h2>New 3rd Party Manufacturing Request</h2>
    </div>
    <div class="content">
      <p><strong>Name:</strong> ${lead.name}</p>
      <p><strong>Company:</strong> ${lead.company || 'N/A'}</p>
      <p><strong>Email:</strong> ${lead.email}</p>
      <p><strong>Phone:</strong> ${lead.phone || 'N/A'}</p>
      <p><strong>Interest Area:</strong> ${lead.interestArea}</p>
      <p><strong>Notes:</strong> ${lead.notes || 'N/A'}</p>
    </div>
    <div class="footer">
      <p>This is an automated message from Galcare Pharmaceuticals.</p>
    </div>
  `;
  await sendMail(alertEmail, 'New 3rd Party Manufacturing Request', html);
};

export const sendAutoResponderToLeadSubmitter = async (email: string, name: string, category: string) => {
  const html = `
    ${styles}
    <div class="header">
      <h2>Thank You for Contacting Galcare Pharmaceuticals</h2>
    </div>
    <div class="content">
      <p>Dear ${name},</p>
      <p>Thank you for reaching out to us regarding ${category}. We have received your inquiry and our team will get back to you shortly.</p>
      <p>Best Regards,</p>
      <p><strong>Galcare Pharmaceuticals Team</strong></p>
    </div>
  `;
  await sendMail(email, 'We have received your inquiry', html);
};

export const sendAutoResponderToJobApplicant = async (email: string, candidateName: string, jobTitle: string) => {
  const html = `
    ${styles}
    <div class="header">
      <h2>Job Application Received</h2>
    </div>
    <div class="content">
      <p>Dear ${candidateName},</p>
      <p>Thank you for applying for the <strong>${jobTitle}</strong> position at Galcare Pharmaceuticals. We have received your application and our HR team is currently reviewing it.</p>
      <p>We will reach out to you if your qualifications match our current needs.</p>
      <p>Best Regards,</p>
      <p><strong>Galcare Pharmaceuticals HR Team</strong></p>
    </div>
  `;
  await sendMail(email, 'Your application has been received', html);
};
