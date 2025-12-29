const loginSuccessHtmlTemplate = (firstName: string): string => `
  <div style="font-family: Arial, sans-serif; padding: 20px; background:#f9f9f9;">
    <div style="max-width: 600px; margin: auto; background:#ffffff; padding: 20px; border-radius: 8px; box-shadow:0 0 10px rgba(0,0,0,0.1);">
      <h2 style="color:#333;">🔐 Login Alert</h2>
      <p style="font-size:16px; color:#555;">
        Hello <strong>${firstName}</strong>,
      </p>
      <p style="font-size:16px; color:#555;">
        We noticed a new login to your <strong>Saraha App</strong> account.
      </p>
      <p style="font-size:16px; color:#555;">
        If this was you, everything is fine and no action is required.<br>
        If you didn’t attempt this login, please <strong>secure your account immediately</strong>.
      </p>
      <hr style="margin: 20px 0;">
      <p style="font-size:14px; color:#777;">
        This email was sent automatically. Please do not reply.
      </p>
      <p style="font-size:14px; color:#777;">
        — Saraha App Team
      </p>
    </div>
  </div>
`;

export default loginSuccessHtmlTemplate;
