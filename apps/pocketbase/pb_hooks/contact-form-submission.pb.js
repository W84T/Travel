/// <reference path="../pb_data/types.d.ts" />
onRecordAfterCreateSuccess((e) => {
  const name = e.record.get("name");
  const email = e.record.get("email");
  const phone = e.record.get("phone");
  const subject = e.record.get("subject");
  const message = e.record.get("message");
  const preferredMethod = e.record.get("preferred_contact_method");
  const language = e.record.get("language");
  const timestamp = e.record.get("created");

  // Bilingual content
  const isArabic = language === "ar";
  
  // Admin notification email
  const adminSubject = "New Contact Form Submission - Tourism in Malaysia";
  const adminHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background-color: #1a472a; color: white; padding: 20px; text-align: center;">
        <h1 style="margin: 0;">Tourism in Malaysia</h1>
        <p style="margin: 5px 0 0 0;">New Contact Form Submission</p>
      </div>
      <div style="padding: 20px; background-color: #f9f9f9;">
        <h2 style="color: #1a472a; border-bottom: 2px solid #1a472a; padding-bottom: 10px;">Submission Details</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr style="background-color: #fff;">
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold; width: 30%;">Name:</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${name}</td>
          </tr>
          <tr style="background-color: #f5f5f5;">
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Email:</td>
            <td style="padding: 10px; border: 1px solid #ddd;"><a href="mailto:${email}">${email}</a></td>
          </tr>
          <tr style="background-color: #fff;">
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Phone:</td>
            <td style="padding: 10px; border: 1px solid #ddd;"><a href="tel:${phone}">${phone}</a></td>
          </tr>
          <tr style="background-color: #f5f5f5;">
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Subject:</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${subject}</td>
          </tr>
          <tr style="background-color: #fff;">
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Preferred Contact:</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${preferredMethod.toUpperCase()}</td>
          </tr>
          <tr style="background-color: #f5f5f5;">
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Language:</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${language === "ar" ? "العربية (Arabic)" : "English"}</td>
          </tr>
          <tr style="background-color: #fff;">
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Submitted:</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${new Date(timestamp).toLocaleString()}</td>
          </tr>
        </table>
        <h3 style="color: #1a472a; margin-top: 20px;">Message:</h3>
        <div style="background-color: #fff; padding: 15px; border-left: 4px solid #1a472a; white-space: pre-wrap;">
${message}
        </div>
      </div>
      <div style="padding: 20px; background-color: #1a472a; color: white; text-align: center; font-size: 12px;">
        <p style="margin: 0;">Tourism in Malaysia - Contact Management System</p>
        <p style="margin: 5px 0 0 0;">Submission ID: ${e.record.id}</p>
      </div>
    </div>
  `;

  // User confirmation email
  const userSubjectAr = "شكراً لتواصلك معنا - السياحة في ماليزيا";
  const userSubjectEn = "Thank You for Contacting Us - Tourism in Malaysia";
  const userSubject = isArabic ? userSubjectAr : userSubjectEn;

  const userHtmlAr = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; direction: rtl;">
      <div style="background-color: #1a472a; color: white; padding: 20px; text-align: center;">
        <h1 style="margin: 0;">السياحة في ماليزيا</h1>
        <p style="margin: 5px 0 0 0;">شكراً لتواصلك معنا</p>
      </div>
      <div style="padding: 20px; background-color: #f9f9f9;">
        <p style="font-size: 16px; color: #333;">السيد/السيدة ${name}،</p>
        <p style="font-size: 14px; color: #555; line-height: 1.6;">
          شكراً لك على تواصلك معنا. لقد استقبلنا استفسارك بنجاح وسنقوم بمراجعته في أقرب وقت ممكن.
        </p>
        <div style="background-color: #fff; padding: 15px; border-right: 4px solid #1a472a; margin: 20px 0;">
          <p style="margin: 0; font-weight: bold; color: #1a472a;">تفاصيل استفسارك:</p>
          <p style="margin: 10px 0 0 0; font-size: 13px;">
            <strong>الموضوع:</strong> ${subject}<br>
            <strong>طريقة التواصل المفضلة:</strong> ${preferredMethod === "email" ? "البريد الإلكتروني" : preferredMethod === "phone" ? "الهاتف" : "واتس آب"}<br>
            <strong>رقم الاستفسار:</strong> ${e.record.id}
          </p>
        </div>
        <p style="font-size: 14px; color: #555; line-height: 1.6;">
          سيتواصل معك فريقنا قريباً على ${preferredMethod === "email" ? "بريدك الإلكتروني" : preferredMethod === "phone" ? "رقم هاتفك" : "حسابك على واتس آب"} للرد على استفسارك.
        </p>
      </div>
      <div style="padding: 20px; background-color: #1a472a; color: white; text-align: center; font-size: 12px;">
        <p style="margin: 0;">السياحة في ماليزيا</p>
        <p style="margin: 5px 0 0 0;">نحن هنا لخدمتك</p>
      </div>
    </div>
  `;

  const userHtmlEn = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background-color: #1a472a; color: white; padding: 20px; text-align: center;">
        <h1 style="margin: 0;">Tourism in Malaysia</h1>
        <p style="margin: 5px 0 0 0;">Thank You for Contacting Us</p>
      </div>
      <div style="padding: 20px; background-color: #f9f9f9;">
        <p style="font-size: 16px; color: #333;">Dear ${name},</p>
        <p style="font-size: 14px; color: #555; line-height: 1.6;">
          Thank you for reaching out to us. We have successfully received your inquiry and will review it as soon as possible.
        </p>
        <div style="background-color: #fff; padding: 15px; border-left: 4px solid #1a472a; margin: 20px 0;">
          <p style="margin: 0; font-weight: bold; color: #1a472a;">Your Inquiry Details:</p>
          <p style="margin: 10px 0 0 0; font-size: 13px;">
            <strong>Subject:</strong> ${subject}<br>
            <strong>Preferred Contact Method:</strong> ${preferredMethod.charAt(0).toUpperCase() + preferredMethod.slice(1)}<br>
            <strong>Inquiry ID:</strong> ${e.record.id}
          </p>
        </div>
        <p style="font-size: 14px; color: #555; line-height: 1.6;">
          Our team will contact you shortly via your preferred method to respond to your inquiry.
        </p>
      </div>
      <div style="padding: 20px; background-color: #1a472a; color: white; text-align: center; font-size: 12px;">
        <p style="margin: 0;">Tourism in Malaysia</p>
        <p style="margin: 5px 0 0 0;">We are here to serve you</p>
      </div>
    </div>
  `;

  const userHtml = isArabic ? userHtmlAr : userHtmlEn;

  // Send admin notification
  try {
    const adminMessage = new MailerMessage({
      from: {
        address: $app.settings().meta.senderAddress,
        name: "Tourism in Malaysia - Contact Form"
      },
      to: [{ address: "info@tourisminmalaysia.com" }],
      subject: adminSubject,
      html: adminHtml
    });
    $app.newMailClient().send(adminMessage);
  } catch (err) {
    console.log("Admin email error:", err);
  }

  // Send user confirmation
  try {
    const userMessage = new MailerMessage({
      from: {
        address: $app.settings().meta.senderAddress,
        name: "Tourism in Malaysia"
      },
      to: [{ address: email }],
      subject: userSubject,
      html: userHtml
    });
    $app.newMailClient().send(userMessage);
  } catch (err) {
    console.log("User confirmation email error:", err);
  }

  e.next();
}, "contact_submissions");