<style>
    .test-email {
        width: 500px;
        margin: 0 auto;
        padding: 15px;
        text-align: center;
    }
</style>

<!-- <div class="test-email">
    <h2>Cảm ơn bạn đã ủng hộ shop</h2>
    <h3>Dưới đây là những sản phẩm mà bạn đã order, vui lòng chờ trong vài ngày đơn vị shipper sẽ giao hàng đến cho bạn</h3>
    <h4>Sản phẩm gồm có :</h4>

    <div class="table-responsive mb-5 mt-5">
        <table class="table bg-cart__content">
            <thead>
                <tr>
                    <th scope="col" class="h20 header-table__title">
                        <span>Sản phẩm</span>
                    </th>
                    <th scope="col" class="h4 header-table">Đơn giá</th>
                    <th scope="col" class="h4 header-table">Số lượng</th>
                    <th scope="col" class="h4 header-table">Thành tiền</th>
                </tr>
            </thead>
            <tbody>
                @if(count($products) > 0)
                    @foreach($products as $index => $product)
                        <tr>
                            <td scope="row">
                                <div class="d-flex align-items-center">
                                    <img src="{{ 'http://localhost:8004/' . $product['product_img'] }}" class="img-fluid rounded-3 cart-product-card" alt="product" />
                                    <div class="flex-column ms-4">
                                        <p class="mb-2">{{ $product['product_name'] }}</p>
                                        <p class="mb-0">{{ $product['product_desc'] }}</p>
                                    </div>
                                </div>
                            </td>
                            <td class="align-middle">
                                <p class="mb-0 h4">{{ number_format($product['product_price'], 0, ',', '.') }}₫</p>
                            </td>
                            <td class="align-middle">
                                <div class="d-flex flex-row">
                                    <p class="qty" >{{ $product['product_amount'] }}</p>
                                </div>
                            </td>
                            <td class="align-middle">
                                <p class="mb-0 h4">{{ number_format($product['product_price'] * $product['product_amount'], 0, ',', '.') }}₫</p>
                            </td>
                        </tr>
                    @endforeach
                @endif
            </tbody>
        </table>
    </div>
    <h1>Tổng giá trị sản phẩm : {{ number_format($paymentTotal, 0, ',', '.') }}₫</h4>

</div> -->

<div style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px; color: #333;">
    <div style="max-width: 600px; margin: auto; background-color: #fff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
        <div style="padding: 20px; text-align: center; background-color: #ff6f61; color: #fff;">
            <h2 style="margin: 0;">Cảm ơn bạn đã ủng hộ shop!</h2>
        </div>
        <div style="padding: 20px;">
            <h3 style="margin-bottom: 10px;">Thông tin đơn hàng của bạn:</h3>
            <p style="margin-bottom: 20px; font-size: 14px; line-height: 1.6;">
                Dưới đây là những sản phẩm bạn đã đặt hàng. Chúng tôi sẽ giao đến bạn trong thời gian sớm nhất. Nếu cần hỗ trợ, đừng ngần ngại liên hệ với chúng tôi.
            </p>
            <h4 style="margin-bottom: 15px; color: #ff6f61;">Sản phẩm gồm có:</h4>
            <div style="overflow-x: auto; margin-bottom: 20px;">
                <table style="width: 100%; border-collapse: collapse; text-align: left; background-color: #fff;">
                    <thead>
                        <tr style="background-color: #ff6f61; color: #fff;">
                            <th style="padding: 10px;">Sản phẩm</th>
                            <th style="padding: 10px; text-align: right;">Đơn giá</th>
                            <th style="padding: 10px; text-align: right;">Số lượng</th>
                            <th style="padding: 10px; text-align: right;">Thành tiền</th>
                        </tr>
                    </thead>
                    <tbody>
                        @if(count($products) > 0)
                            @foreach($products as $product)
                                <tr style="border-bottom: 1px solid #ddd;">
                                    <td style="padding: 10px; display: flex; align-items: center;">
                                        <img src="/"
                                             style="width: 50px; height: 50px; object-fit: cover; border-radius: 4px; margin-right: 10px;"
                                             alt="{{ $product['product_name'] }}" />
                                        <div>
                                            <strong style="display: block;">{{ $product['product_name'] }}</strong>
                                            <small style="color: #777;">{{ $product['product_desc'] }}</small>
                                        </div>
                                    </td>
                                    <td style="padding: 10px; text-align: right;">{{ number_format($product['product_price'], 0, ',', '.') }}₫</td>
                                    <td style="padding: 10px; text-align: right;">{{ $product['product_amount'] }}</td>
                                    <td style="padding: 10px; text-align: right;">{{ number_format($product['product_price'] * $product['product_amount'], 0, ',', '.') }}₫</td>
                                </tr>
                            @endforeach
                        @else
                            <tr>
                                <td colspan="4" style="text-align: center; padding: 20px; color: #777;">Không có sản phẩm nào.</td>
                            </tr>
                        @endif
                    </tbody>
                </table>
            </div>
            <h3 style="text-align: right; color: #ff6f61;">Tổng giá trị: {{ number_format($paymentTotal, 0, ',', '.') }}₫</h3>
        </div>
        <div style="background-color: #f5f5f5; padding: 15px; text-align: center;">
            <p style="font-size: 12px; color: #777; margin: 0;">Cảm ơn bạn đã tin tưởng và ủng hộ chúng tôi.</p>
            <a href="#" style="color: #ff6f61; text-decoration: none;">Liên hệ hỗ trợ</a>
        </div>
    </div>
</div>
