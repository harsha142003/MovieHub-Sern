const nodemailer = require('nodemailer');

const validateEmailConfig = () => {
    const requiredEnvVars = ['EMAIL_USER', 'EMAIL_PASSWORD'];
    const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);

    if (missingVars.length > 0) {
        console.error('Missing email configuration:', missingVars);
        throw new Error(`Missing required email configuration: ${missingVars.join(', ')}`);
    }
    console.log('Email configuration validated successfully');
};

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    },
    tls: {
        rejectUnauthorized: false // Only use this in development
    }
});

const verifyTransporter = async () => {
    try {
        validateEmailConfig();
        await transporter.verify();
        console.log('Email transporter is ready');
        return true;
    } catch (error) {
        console.error('Email transporter verification failed:', error);
        return false;
    }
};

const generateOTP = () => {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    console.log('Generated OTP:', otp);
    return otp;
};

const sendOTPEmail = async (email, otp) => {
    try {
        console.log('Attempting to send OTP email to:', email);
        validateEmailConfig();

        // Verify transporter before sending
        const isVerified = await verifyTransporter();
        if (!isVerified) {
            throw new Error('Email service is not properly configured');
        }

        const mailOptions = {
            from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
            to: email,
            subject: 'Your OTP for MovieHub Verification',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 5px;">
                    <div style="text-align: center; margin-bottom: 20px;">
                        <h2 style="color: #333; margin: 0;">Oncart Verification Code</h2>
                    </div>
                    <div style="background-color: #f9f9f9; padding: 20px; border-radius: 5px; margin-bottom: 20px;">
                        <p style="margin: 0 0 15px 0; color: #666;">Your verification code is:</p>
                        <h1 style="color: #4CAF50; font-size: 32px; letter-spacing: 5px; text-align: center; margin: 0; padding: 15px; background: #fff; border-radius: 5px; border: 2px dashed #4CAF50;">${otp}</h1>
                    </div>
                    <div style="color: #666; font-size: 14px;">
                        <p style="margin: 0 0 10px 0;">This OTP is valid for 10 minutes.</p>
                        <p style="margin: 0 0 10px 0;">If you didn't request this OTP, please ignore this email.</p>
                    </div>
                    <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
                    <div style="color: #999; font-size: 12px; text-align: center;">
                        <p style="margin: 0;">This is an automated email, please do not reply.</p>
                        <p style="margin: 5px 0 0 0;">© ${new Date().getFullYear()} CarCart. All rights reserved.</p>
                    </div>
                </div>
            `
        };

        console.log('Sending email with options:', {
            from: mailOptions.from,
            to: mailOptions.to,
            subject: mailOptions.subject
        });

        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent successfully:', info.messageId);
        return true;
    } catch (error) {
        console.error('Error sending email:', error);
        throw new Error('Failed to send OTP email: ' + error.message);
    }
};

const resendOTPEmail = async (email, otp) => {
    try {
        console.log('Attempting to resend OTP email to:', email);
        validateEmailConfig();

        const mailOptions = {
            from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
            to: email,
            subject: 'Your New OTP for MovieHub Verification',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 5px;">
                    <div style="text-align: center; margin-bottom: 20px;">
                        <h2 style="color: #333; margin: 0;">New Oncart Verification Code</h2>
                    </div>
                    <div style="background-color: #f9f9f9; padding: 20px; border-radius: 5px; margin-bottom: 20px;">
                        <p style="margin: 0 0 15px 0; color: #666;">Your new verification code is:</p>
                        <h1 style="color: #4CAF50; font-size: 32px; letter-spacing: 5px; text-align: center; margin: 0; padding: 15px; background: #fff; border-radius: 5px; border: 2px dashed #4CAF50;">${otp}</h1>
                    </div>
                    <div style="color: #666; font-size: 14px;">
                        <p style="margin: 0 0 10px 0;">This OTP is valid for 10 minutes.</p>
                        <p style="margin: 0 0 10px 0;">If you didn't request this OTP, please ignore this email.</p>
                    </div>
                    <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
                    <div style="color: #999; font-size: 12px; text-align: center;">
                        <p style="margin: 0;">This is an automated email, please do not reply.</p>
                        <p style="margin: 5px 0 0 0;">© ${new Date().getFullYear()} CarCart. All rights reserved.</p>
                    </div>
                </div>
            `
        };

        console.log('Sending resend email with options:', {
            from: mailOptions.from,
            to: mailOptions.to,
            subject: mailOptions.subject
        });

        const info = await transporter.sendMail(mailOptions);
        console.log('Resend email sent successfully:', info.messageId);
        return true;
    } catch (error) {
        console.error('Error resending email:', error);
        throw new Error('Failed to resend OTP email: ' + error.message);
    }
};

module.exports = {
    generateOTP,
    sendOTPEmail,
    resendOTPEmail,
    verifyTransporter
}; 