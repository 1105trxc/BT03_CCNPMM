require('dotenv').config();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

const sendResetPasswordEmail = async (email, token) => {
    const resetLink = `http://localhost:5173/reset-password?token=${token}`;
    const subject = 'Đặt lại mật khẩu - FullStack App';

    const html = `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 480px; margin: 0 auto; padding: 32px; background: #f8fafc; border-radius: 12px;">
            <h2 style="color: #1677ff; margin-bottom: 8px;">
                🔐 Đặt lại Mật khẩu
            </h2>
            <p style="color: #555; font-size: 15px;">Bạn đã yêu cầu đặt lại mật khẩu. Vui lòng click vào nút bên dưới để tiến hành đặt lại mật khẩu của bạn:</p>
            <div style="text-align: center; margin: 24px 0;">
                <a href="${resetLink}" style="font-size: 16px; font-weight: bold; color: #fff; background: #1677ff; padding: 12px 28px; border-radius: 8px; text-decoration: none; display: inline-block;">
                    Đặt Lại Mật Khẩu
                </a>
            </div>
            <p style="color: #888; font-size: 13px;">Link này có hiệu lực trong <strong>15 phút</strong>. Nếu bạn không yêu cầu đặt lại mật khẩu, vui lòng bỏ qua email này.</p>
        </div>
    `;

    await transporter.sendMail({
        from: `"FullStack App" <${process.env.EMAIL_USER}>`,
        to: email,
        subject,
        html,
    });
};

module.exports = {
    sendResetPasswordEmail,
};
