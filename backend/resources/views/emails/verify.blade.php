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
    <h3>Sau khi xem xét hồ sơ của bạn, hệ thống chúng tôi thông báo {{ $name }} từ hôm nay đã trở thành 1 {{ $role }} của hệ thống.</h3>
    <h4>Rất mong trong thời gian tới hai bên chúng ta sẽ hợp tác thành công tốt đẹp</h4>
    <a href="http://localhost:3000/login/">Click vào link để tiến hành đăng nhập hệ thống</a>
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

        .cta {
            display: inline-block;
            margin-top: 20px;
            padding: 10px 20px;
            background-color: #3498db;
            color: #ffffff;
            text-decoration: none;
            border-radius: 5px;
            font-size: 16px;
            font-weight: bold;
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

        .footer a {
            color: #ffffff;
            text-decoration: none;
        }
    </style>
</head>

<body>
    <div class="container">
        <!-- Header with logo and title -->
        <div class="header">
            <img src="https://i.ibb.co/QjkJcfx/logo02-Photoroom-1.png" alt="HyTree Logo">
            <h1>HyTree Đà Nẵng</h1>
        </div>

        <!-- Main content -->
        <div class="content">
            <h2 style="font-size: 28px; color: #2a3d63; font-weight: bold;">Chào mừng bạn đã gia nhập hệ thống!</h2>
            <p style="font-size: 16px; color: #333333; line-height: 1.6; margin-top: 20px;">
                Chúng tôi xin thông báo rằng {{ $name }} đã được chấp nhận gia nhập và trở thành một <strong>{{ $role }}</strong> của hệ thống kinh doanh HyTree Đà Nẵng kể từ hôm nay.
            </p>
            <p style="font-size: 16px; color: #333333; line-height: 1.6;">
                Chúng tôi hy vọng bạn sẽ có nhiều cơ hội phát triển và đồng hành cùng HyTree Đà Nẵng trong những dự án và hành trình sắp tới. Sự hợp tác thành công của chúng ta sẽ là nền tảng quan trọng cho sự phát triển bền vững và lâu dài.
            </p>
            <p style="font-size: 16px; color: #333333; line-height: 1.6; margin-top: 20px;">
                Để bắt đầu, vui lòng truy cập vào hệ thống bằng cách nhấn vào nút bên dưới:
            </p>
            <a href="https://hytreedn.id.vn/login" class="cta">Đăng nhập hệ thống</a>
            <h4 style="font-size: 18px; color: #888888; margin-top: 30px;">Thân gửi!</h4>
        </div>

        <!-- Footer with date and contact info -->
        <div class="footer">
            <p>Ngày {{ date('d-m-Y') }}</p>
            <p>Email: support@hytree.com | Website: <a href="https://hytreedn.id.vn">hytreedn.id.vn</a></p>
        </div>
    </div>
</body>

</html>
