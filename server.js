import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { Resend } from 'resend';
import { v4 as uuid } from 'uuid';

const app = express();
app.use(cors());
app.use(express.json());

const otpStore = new Map(); // email -> { code, exp }
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
const fromAddress = process.env.RESEND_FROM || process.env.EMAIL_USER;

app.post('/otp/send', async (req, res) => {
  try {
    const { email } = req.body || {};
    if (!email || !/@st\.qnu\.edu\.vn$/i.test(email.trim())) {
      return res.status(400).json({ error: 'Email không hợp lệ. Vui lòng nhập mail sinh viên st.qnu.edu.vn' });
    }
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    otpStore.set(email, { code, exp: Date.now() + 5 * 60 * 1000 });

    if (!resend || !fromAddress) {
      return res.status(500).json({ error: 'Email server chưa cấu hình (RESEND_API_KEY/RESEND_FROM).' });
    }

    await resend.emails.send({
      from: `QNU Voting <${fromAddress}>`,
      to: email,
      subject: 'Mã OTP đăng nhập QNU - Xác thực sinh viên',
      text: `Mã OTP của bạn: ${code}. Tuyệt đối không chia sẻ cho ai khác. Mã hết hạn trong 5 phút.`,
    });

    res.json({ ok: true });
  } catch (err) {
    console.error('send otp error', err);
    res.status(500).json({ error: 'Không gửi được OTP. Kiểm tra email server.' });
  }
});

app.post('/otp/verify', (req, res) => {
  const { email, code } = req.body || {};
  const item = otpStore.get(email);
  if (!item || item.code !== code || Date.now() > item.exp) {
    return res.status(400).json({ error: 'OTP sai hoặc hết hạn' });
  }
  otpStore.delete(email);
  const token = uuid();
  res.json({ ok: true, token });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`OTP server listening on port ${PORT}`);
});
