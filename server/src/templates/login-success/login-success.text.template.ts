const loginSuccessTextTemplate = (firstName: string): string => `
Hello ${firstName},

We noticed a new login to your Saraha App account.

If this was you, no action is needed.  
If you didn’t initiate this login, please secure your account immediately.

Best regards,  
Saraha App Team
`;

export default loginSuccessTextTemplate;
