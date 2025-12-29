const resetPasswordTemplate = (link: string): string => `<!DOCTYPE html> 
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Reset Your Password</title>

<style>
    body { 
        background-color: #f5f5f7; 
        margin: 0; 
        padding: 0; 
        font-family: Arial, Helvetica, sans-serif; 
    }

    .container {
        width: 100%;
        padding: 30px 0;
        display: flex;
        justify-content: center;
    }

    .card {
        width: 480px;
        background: #ffffff;
        border-radius: 12px;
        box-shadow: 0 6px 18px rgba(0,0,0,0.08);
        overflow: hidden;
        border: 1px solid #eee;
    }

    .header {
        background: linear-gradient(135deg, #3498db, #2980b9);
        text-align: center;
        padding: 40px 20px;
        color: #fff;
    }

    .header img {
        width: 120px;
        margin-bottom: 15px;
        border-radius: 12px;
    }

    .content {
        padding: 30px 25px;
        text-align: center;
    }

    .title {
        font-size: 26px;
        margin-bottom: 15px;
        color: #333;
        font-weight: bold;
    }

    .text {
        color: #555;
        font-size: 15px;
        line-height: 1.6;
        margin-bottom: 30px;
    }

    .btn {
        display: inline-block;
        padding: 12px 22px;
        background: #2980b9;
        color: #fff !important;
        text-decoration: none;
        border-radius: 6px;
        font-size: 16px;
        font-weight: bold;
    }

    .footer {
        text-align: center;
        padding: 20px;
        color: #999;
        font-size: 13px;
    }
</style>
</head>

<body>

<div class="container">
    <div class="card">
        
        <div class="header">
            <img 
                src="https://cdn-icons-png.flaticon.com/512/3064/3064197.png"
                alt="Reset Password"
            />
            <h2>Reset Your Password</h2>
        </div>

        <div class="content">
            <p class="title">Forgot Your Password?</p>
            
            <p class="text">
                No worries! Click the button below to reset your password.  
                This link is valid for <strong>15 minutes</strong>.
            </p>

            <a href="${link}" class="btn">Reset Password</a>
        </div>

        <div class="footer">
            If you didn't request this, you can ignore this email.
        </div>

    </div>
</div>

</body>
</html>`;

export default resetPasswordTemplate;
