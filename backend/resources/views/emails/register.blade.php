<!-- <style>
    .test-email {
        width: 500px;
        margin: 0 auto;
        padding: 15px;
        text-align: center;
    }
</style>

<div class="test-email" style="width: 500px; margin: 0 auto; padding: 15px; text-align: center;">
    <h2>Cảm ơn bạn đã quan tâm đến hệ thống kinh doanh HyTree Da Nang</h2>
    <h3>Hệ thống sẽ xác thực các thông tin cá nhân của bạn. Và sẽ phản hồi bạn trong thời gian sớm nhất.</h3>
    <h4>Thân gửi!</h4>
</div> -->

<!DOCTYPE html>
<html lang="vi">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Thông báo từ HyTree Đà Nẵng</title>
    <style>
        /* Thiết lập chung cho email */
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }

        .container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }

        .header {
            background-color: #2a3d63;
            color: #ffffff;
            padding: 20px;
            text-align: center;
        }

        .header img {
            width: 120px;
        }

        .content {
            padding: 20px;
            text-align: center;
            font-size: 16px;
            color: #333333;
        }

        .content h2 {
            font-size: 24px;
            color: #2a3d63;
        }

        .content h3 {
            font-size: 20px;
            color: #333333;
        }

        .content h4 {
            font-size: 18px;
            color: #888888;
        }

        .footer {
            background-color: #2a3d63;
            color: #ffffff;
            padding: 10px;
            text-align: center;
        }

        .footer p {
            font-size: 14px;
        }
    </style>
</head>

<body>
    <div class="container">
        <!-- Header with logo and title -->
        <div class="header">
            <img src="https://i.ibb.co/QjkJcfx/logo02-Photoroom-1.png" alt="logo02-Photoroom-1" alt="">
            <h1>HyTree Đà Nẵng</h1>
        </div>

        <!-- Main content -->
        <div class="content">
            <h2 style="font-size: 28px; color: #2a3d63; font-weight: bold;">Cảm ơn bạn đã quan tâm đến hệ thống kinh doanh HyTree Đà Nẵng!</h2>
            <p style="font-size: 16px; color: #333333; line-height: 1.6; margin-top: 20px;">
                Chúng tôi rất vui mừng khi nhận được yêu cầu của bạn và muốn cảm ơn bạn đã chọn HyTree Đà Nẵng là đối tác trong hành trình phát triển của bạn. HyTree Đà Nẵng cam kết mang đến những dịch vụ chất lượng và đáng tin cậy, luôn nỗ lực đáp ứng mọi nhu cầu của khách hàng.
            </p>
            <p style="font-size: 16px; color: #333333; line-height: 1.6;">
                Hiện tại, hệ thống của chúng tôi đang tiến hành xác thực các thông tin cá nhân mà bạn đã cung cấp. Quá trình này sẽ được thực hiện nhanh chóng và chính xác để đảm bảo rằng mọi thông tin của bạn đều hợp lệ và an toàn. Chúng tôi sẽ phản hồi bạn trong thời gian sớm nhất, và hy vọng sẽ có cơ hội hợp tác lâu dài cùng bạn.
            </p>
            <p style="font-size: 16px; color: #333333; line-height: 1.6;">
                Nếu bạn có bất kỳ câu hỏi nào trong suốt quá trình đăng ký hoặc cần sự hỗ trợ thêm, đừng ngần ngại liên hệ với chúng tôi qua email hoặc số điện thoại dưới đây. Chúng tôi luôn sẵn sàng hỗ trợ bạn.
            </p>
            <p style="font-size: 16px; color: #333333; line-height: 1.6; margin-top: 20px;">
                Chúc bạn một ngày tuyệt vời và hy vọng sớm nhận được phản hồi từ bạn!
            </p>
            <h4 style="font-size: 18px; color: #888888; margin-top: 30px;">Thân gửi!</h4>
        </div>


        <!-- Footer with date and contact info -->
        <div class="footer">
            <p>Ngày {{ date('d-m-Y') }}</p>
            <p>Email: support@hytree.com | Website: <a href="https://hytree.com" style="color: #ffffff;">www.hytree.com</a></p>
        </div>
    </div>
</body>

</html>
