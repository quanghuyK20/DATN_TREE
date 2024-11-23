<style>
    .test-email {
        width: 500px;
        margin: 0 auto;
        padding: 15px;
        text-align: center;
    }
</style>

<div class="test-email">
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

</div>
