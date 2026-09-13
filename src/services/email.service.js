
const nodemailer = require("nodemailer");

// =====================================================
// 1. TRANSPORTER CREATE KARNA
// =====================================================

// createTransport() ka kaam:
// Backend ko batana ki email kis email server/service
// ke through send karni hai.
//
// IMPORTANT:
// createTestAccount() aur createTransport() alag hain.
// Real Gmail OAuth2 ke liye createTransport() use karo.

const transport = nodemailer.createTransport({
    service: "gmail",

    auth: {
        // OAuth2 authentication use kar rahe hain.
        // Isme normal Gmail password ke bajay
        // Google OAuth credentials use hote hain.

        type: "OAuth2",

        // Gmail account jiske through email bhejni hai
        user: process.env.EMAIL_USER,

        // Google OAuth Client ID
        clientId: process.env.CLIENT_ID,

        // Google OAuth Client Secret
        clientSecret: process.env.CLIENT_SECRET,

        // OAuth2 refresh token
        // Isse access token obtain/refresh kiya ja sakta hai.
        refreshToken: process.env.REFRESH_TOKEN,
    },
});


// =====================================================
// 2. TRANSPORTER VERIFY
// =====================================================

// verify() check karta hai ki:
// "Kya transporter email server se properly connect
// kar sakta hai?"

transport.verify((error, success) => {

    // Agar connection/authentication mein problem hai
    if (error) {
        console.error("Error connecting to email server:", error);
    }

    // Agar connection successful hai
    else {
        console.log("Email server is ready to send messages");
    }
});


// =====================================================
// 3. TRANSPORTER EXPORT
// =====================================================

// Dusri files mein transporter use karne ke liye export.

module.exports = transport;


// =====================================================
// 4. GENERIC SEND EMAIL FUNCTION
// =====================================================

// Ye function kisi bhi email ko send karne ke liye
// reusable function hai.
//
// to      -> receiver ka email
// subject -> email ka subject
// text    -> plain text version
// html    -> HTML version

const sendEmail = async (to, subject, text, html) => {

    try {

        // IMPORTANT:
        // Nodemailer mein method sendMail() hota hai,
        // sendEmail() nahi.

        const info = await transport.sendMail({

            // Sender
            from: `"BankFlow" <${process.env.EMAIL_USER}>`,

            // Receiver
            to,

            // Email subject
            subject,

            // Plain text email
            text,

            // HTML email
            html,
        });

        // Email successfully send hone ke baad
        // messageId milta hai.
        console.log("Message sent:", info.messageId);

    } catch (error) {

        // Email send fail hone par error
        console.error("Error sending email:", error);
    }
};


// =====================================================
// 5. REGISTRATION EMAIL
// =====================================================

// User register hone ke baad welcome email
// prepare karne ke liye function.

function sendRegisterEmail(userEmail, name) {

    // Email subject
    const subject = "BankFlow Registration";

    // Plain text email
    const text = `
Hello ${name},

Thank you for registering with BankFlow.

Your account has been created successfully.

Best regards,
BankFlow Team
`;

    // Ab actual email send karni hai.
    //
    // IMPORTANT:
    // Tumhare original code mein ye missing tha.
    //
    // sendEmail(
    //     userEmail,
    //     subject,
    //     text
    // );
}


// =====================================================
// 6. EXPORT FUNCTIONS
// =====================================================

// Dusri files/controller mein use karne ke liye
// functions export kar rahe hain.

module.exports = {
    sendEmail,
    sendRegisterEmail,
};

