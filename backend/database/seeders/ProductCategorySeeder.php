<?php

namespace Database\Seeders;

use App\Models\ProductCategory;
use Illuminate\Database\Seeder;

class ProductCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $items = [
            ['id' => 1, 'style' => 'the_van_nhan', 'name_jp' => 'Bunjingi', 'name_vn' => 'Thế văn nhân',
              'img' => 'images/products/Bunjingi/1.jpg',
                'detail' =>
                    'Với dáng này thì bonsai có thân dài và mảnh, thường cong một cách khúc khuỷu,
                    chỉ có rất ít nhánh hướng về phía trên của thân cây. Tên của dáng này xuất phát
                    từ các nghệ sĩ văn học Trung Quốc nổi tiếng, người đã tạo ra những bức tranh về
                    những tán lá thưa thớt với thân và cành dài, mỏng và méo mó.'],
            ['id' => 2, 'style' => 'dang_truc', 'name_jp' => 'Chokkan', 'name_vn' => 'Dáng trực đối xứng',
              'img' => 'images/products/Chokkan/1.png',
                'detail' =>
                    'Trong dáng này thì cây phát triển theo đường thẳng nghĩa là
                    khi ta nhìn sẽ thấy trên thân của chúng hoàn toàn phẳng lì và láng mịn,
                    hoặc nói cách khác không có bất kì phần thịt cây nào bị lồi ra hay bị
                    uốn khúc khuỷu, đỉnh của cây nằm ở phía trên cùng, nơi cao nhất của cây.
                    Các nhánh và cành đều nhau, càng lên cao độ dài của cành càng ngắn dần và
                    hẹp lại, độ dày của tán lá cũng trở nên mỏng dần về phía ngọn cây. Rễ phải
                    được nhìn thấy rõ ràng trên bề mặt đất, kéo dài từ trung tâm của gốc cây, tỏa
                    ra xung quanh đối xứng với toàn bộ thân cây.'],
            ['id' => 3, 'style' => 'the_gio_thoi_nghieng', 'name_jp' => 'Fukinagashi', 'name_vn' => 'Thế xiêu phong',
              'img' => 'images/products/Fukinagashi/1.png',
                'detail' =>
                    'Thế bonsai xiêu phong được tạo ra để tái tạo diện mạo của một cây đã chịu tác
                    động của lực gió lớn thổi từ một hướng duy nhất. Điều này thường xảy ra trong
                    tự nhiên nếu cây mọc trên bờ biển hoặc sườn núi lộ thiên. Thông thường, theo
                    dáng này sẽ tạo ra một hình ảnh cây nghiêng, với thân và các nhánh của cây cảnh
                    đều nghiêng theo một hướng.'],
            ['id' => 4, 'style' => 'the_thac_do', 'name_jp' => 'Han-Kengai', 'name_vn' => 'Dáng hoành',
            'img' => 'images/products/Fukinagashi/1.png',
                'detail' =>
                    'Đối với dáng hoành, các nhánh của cây được uốn ngang với gốc cây. Trong một số
                    thuật ngữ, dáng hoành có thể được sử dụng để mô tả cây có dạng trong đó một số nhánh
                    cây chúng ta sẽ thấy chúng hơi ngả xuống ở phía bên dưới so với gốc và các nhánh khác
                    thì ở trên, nhưng đỉnh của cây vẫn phải thẳng hàng hoặc hơi ngả xuống dưới so với gốc
                    cây hoặc chậu cây.'],
            ['id' => 5, 'style' => 'the_choi', 'name_jp' => 'Hokidachi', 'name_vn' => 'Dáng chổi',
            'img'=>'images/products/Hokidachi/1.jpg',
                'detail' =>
                    'Với dáng cây chổi, cây bonsai được thiết kế để thân cây thẳng hoàn toàn, như dáng trực
                     đứng đối xứng. Tuy nhiên, thay vì các nhánh trở nên ngắn dần về phía đỉnh của cây, thì
                     các tán lá và cành của cây lại vươn ra ngoài theo mọi hướng. Kết quả hình dáng cây hình
                     thành nên một dạng tròn, giống như vương miệng được hình thành bởi lá và cành. Phong cách
                     này phù hợp với các loài cây có nhiều nhánh mỏng, dẻo.'],
            ['id' => 6, 'style' => 'dang_truc_lac', 'name_jp' => 'Moyogi', 'name_vn' => 'Dáng trực không đối xứng',
            'img' => 'images/products/Moyogi/1.jpg',
                'detail' =>
                    'Những cây bonsai có dáng này không thẳng đứng hoàn toàn như với cây bonsai có dáng trực đối
                    xứng – trên thân và cành của chúng hiện rõ những đường uốn quanh co cho thấy chúng phát triển
                    theo những hướng uốn khúc và ngoằn nghèo. Tuy nhiên, đỉnh của cây nằm ở phía trên cùng nơi cao
                    nhất của cây giống với dáng trực thẳng đối xứng. Và còn một điểm nữa giống với dáng trực thẳng
                    đối xứng đó là càng lên cao độ dài của cành càng ngắn dần và độ dày của tán lá cũng trở nên mỏng
                    dần về phía ngọn cây.'],
            ['id' => 7, 'style' => 'the_bam_da', 'name_jp' => 'Seki-joju', 'name_vn' => 'Thế rễ ôm đá',
            'img' => 'images/products/Seki-joju/1.jpg',
                'detail' =>
                    'Trong dáng này, rễ của cây bonsai được để lộ ra và vượt lên khỏi mặt tảng đá một chút. Tuy nhiên,
                    không giống với dáng bám vào đá, rễ cây không mọc từ đất trong khe nứt của đá, mà là từ đất trong
                    chậu, và sau đó rễ cây chỉ đơn giản là mọc ngang qua đá.'],
            ['id' => 8, 'style' => 'the_than_doi', 'name_jp' => 'Sokan', 'name_vn' => 'Thế thân chẻ/thân đôi',
            'img' => 'images/products/Sokan/1.png',
                'detail' =>
                    'Dáng này này nhằm mục đích mô phỏng theo hình ảnh của một cây bị sét đánh làm hai hoặc bị phá hủy
                    nghiêm trọng bởi một trường hợp khác. Thân cây rỗng và tách sâu. Dáng này thường được tạo ra bằng
                    cách đục cẩn thận và phong hóa thân cây của người chơi bonsai. Dáng này khá là hạn chế, chỉ có một
                    vài cây là có thể tạo được theo dáng này, bao gồm cây lá kim, những cây có mùa rụng lá và các giống
                    cây thường xanh lá to.'],
            ['id' => 9, 'style' => 'the_rung_cay', 'name_jp' => 'Yose-ue', 'name_vn' => 'Dáng rừng rậm',
              'img' => 'images/products/Yose-ue/1.jpg',
                'detail' =>
                    'Dáng này khá giống dáng đa thân, tuy nhiên mỗi cây có gốc riêng của chính nó thay vì có gốc chung
                    như dáng đa thân.Khi có từ ba đến chín cây riêng biệt được đặt cùng nhau trong một chậu cây bonsai,
                    chúng được gọi là một “group setting”, nghĩa là một nhóm các cây được sắp xếp lại cùng nhau. Thông
                    thường có rất nhiều vấn đề trong việc chọn cây, đa dạng về chiều rộng và chiều cao thân cây. Tuy nhiên,
                    chúng vẫn nên giống nhau về hình dạng, tỷ lệ và tán lá, và không nên có nhiều hơn hai cây thẳng hàng với
                    nhau. Việc này giúp tạo ra một cái nhìn tự nhiên hơn và ít nhân tạo hơn.

                    Dáng này còn yêu cầu phải có hơn chín cây được trồng trong một chậu bonsai. Hầu hết, chậu được sử dụng phải dài và nông. Theo truyền thống, tất cả các cây bonsai theo kiểu dáng rừng rậm là cùng một giống cây, và chúng đều có chiều cao khác nhau để nâng cao tính thẩm mỹ, tạo sự thích thú cho người xem và mô phỏng một khu rừng thực tế, các cây sẽ có sự khác nhau về kích cỡ và tuổi thọ. Đôi khi, những cây nhỏ nhất được đặt ở phía sau để tạo cảm giác phối cảnh, để người ngắm cây
                    cảm thấy rằng mình đang nhìn vào một khu rừng rộng lớn.'],
                    ['id' => 11, 'style' => 'the_van_nhan', 'name_jp' => 'Bunjingi', 'name_vn' => 'Thế văn nhân',
                    'img' => 'images/products/the_van_nhan/1.jpg',
                      'detail' =>
                          'Với dáng này thì bonsai có thân dài và mảnh, thường cong một cách khúc khuỷu,
                          chỉ có rất ít nhánh hướng về phía trên của thân cây. Tên của dáng này xuất phát
                          từ các nghệ sĩ văn học Trung Quốc nổi tiếng, người đã tạo ra những bức tranh về
                          những tán lá thưa thớt với thân và cành dài, mỏng và méo mó.'],
                  ['id' => 12, 'style' => 'dang_truc', 'name_jp' => 'Chokkan', 'name_vn' => 'Dáng trực đối xứng',
                    'img' => 'images/products/dang_truc/1.png',
                      'detail' =>
                          'Trong dáng này thì cây phát triển theo đường thẳng nghĩa là
                          khi ta nhìn sẽ thấy trên thân của chúng hoàn toàn phẳng lì và láng mịn,
                          hoặc nói cách khác không có bất kì phần thịt cây nào bị lồi ra hay bị
                          uốn khúc khuỷu, đỉnh của cây nằm ở phía trên cùng, nơi cao nhất của cây.
                          Các nhánh và cành đều nhau, càng lên cao độ dài của cành càng ngắn dần và
                          hẹp lại, độ dày của tán lá cũng trở nên mỏng dần về phía ngọn cây. Rễ phải
                          được nhìn thấy rõ ràng trên bề mặt đất, kéo dài từ trung tâm của gốc cây, tỏa
                          ra xung quanh đối xứng với toàn bộ thân cây.'],
                  ['id' => 13, 'style' => 'the_gio_thoi_nghieng', 'name_jp' => 'Fukinagashi', 'name_vn' => 'Thế xiêu phong',
                    'img' => 'images/products/the_gio_thoi_nghieng/1.png',
                      'detail' =>
                          'Thế bonsai xiêu phong được tạo ra để tái tạo diện mạo của một cây đã chịu tác
                          động của lực gió lớn thổi từ một hướng duy nhất. Điều này thường xảy ra trong
                          tự nhiên nếu cây mọc trên bờ biển hoặc sườn núi lộ thiên. Thông thường, theo
                          dáng này sẽ tạo ra một hình ảnh cây nghiêng, với thân và các nhánh của cây cảnh
                          đều nghiêng theo một hướng.'],
                  ['id' => 14, 'style' => 'the_thac_do', 'name_jp' => 'Han-Kengai', 'name_vn' => 'Dáng hoành',
                  'img' => 'images/products/the_thac_do/1.png',
                      'detail' =>
                          'Đối với dáng hoành, các nhánh của cây được uốn ngang với gốc cây. Trong một số
                          thuật ngữ, dáng hoành có thể được sử dụng để mô tả cây có dạng trong đó một số nhánh
                          cây chúng ta sẽ thấy chúng hơi ngả xuống ở phía bên dưới so với gốc và các nhánh khác
                          thì ở trên, nhưng đỉnh của cây vẫn phải thẳng hàng hoặc hơi ngả xuống dưới so với gốc
                          cây hoặc chậu cây.'],
                  ['id' => 15, 'style' => 'the_choi', 'name_jp' => 'Hokidachi', 'name_vn' => 'Dáng chổi',
                  'img'=>'images/products/the_choi/1.jpg',
                      'detail' =>
                          'Với dáng cây chổi, cây bonsai được thiết kế để thân cây thẳng hoàn toàn, như dáng trực
                           đứng đối xứng. Tuy nhiên, thay vì các nhánh trở nên ngắn dần về phía đỉnh của cây, thì
                           các tán lá và cành của cây lại vươn ra ngoài theo mọi hướng. Kết quả hình dáng cây hình
                           thành nên một dạng tròn, giống như vương miệng được hình thành bởi lá và cành. Phong cách
                           này phù hợp với các loài cây có nhiều nhánh mỏng, dẻo.'],
                  ['id' => 16, 'style' => 'dang_truc_lac', 'name_jp' => 'Moyogi', 'name_vn' => 'Dáng trực không đối xứng',
                  'img' => 'images/products/dang_truc_lac/1.jpg',
                      'detail' =>
                          'Những cây bonsai có dáng này không thẳng đứng hoàn toàn như với cây bonsai có dáng trực đối
                          xứng – trên thân và cành của chúng hiện rõ những đường uốn quanh co cho thấy chúng phát triển
                          theo những hướng uốn khúc và ngoằn nghèo. Tuy nhiên, đỉnh của cây nằm ở phía trên cùng nơi cao
                          nhất của cây giống với dáng trực thẳng đối xứng. Và còn một điểm nữa giống với dáng trực thẳng
                          đối xứng đó là càng lên cao độ dài của cành càng ngắn dần và độ dày của tán lá cũng trở nên mỏng
                          dần về phía ngọn cây.'],
                  ['id' => 17, 'style' => 'the_bam_da', 'name_jp' => 'Seki-joju', 'name_vn' => 'Thế rễ ôm đá',
                  'img' => 'images/products/the_bam_da/1.jpg',
                      'detail' =>
                          'Trong dáng này, rễ của cây bonsai được để lộ ra và vượt lên khỏi mặt tảng đá một chút. Tuy nhiên,
                          không giống với dáng bám vào đá, rễ cây không mọc từ đất trong khe nứt của đá, mà là từ đất trong
                          chậu, và sau đó rễ cây chỉ đơn giản là mọc ngang qua đá.'],
                  ['id' => 18, 'style' => 'the_than_doi', 'name_jp' => 'Sokan', 'name_vn' => 'Thế thân chẻ/thân đôi',
                  'img' => 'images/products/the_than_doi/1.png',
                      'detail' =>
                          'Dáng này này nhằm mục đích mô phỏng theo hình ảnh của một cây bị sét đánh làm hai hoặc bị phá hủy
                          nghiêm trọng bởi một trường hợp khác. Thân cây rỗng và tách sâu. Dáng này thường được tạo ra bằng
                          cách đục cẩn thận và phong hóa thân cây của người chơi bonsai. Dáng này khá là hạn chế, chỉ có một
                          vài cây là có thể tạo được theo dáng này, bao gồm cây lá kim, những cây có mùa rụng lá và các giống
                          cây thường xanh lá to.'],
                  ['id' => 19, 'style' => 'the_rung_cay', 'name_jp' => 'Yose-ue', 'name_vn' => 'Dáng rừng rậm',
                    'img' => 'images/products/the_rung_cay/1.jpg',
                      'detail' =>
                          'Dáng này khá giống dáng đa thân, tuy nhiên mỗi cây có gốc riêng của chính nó thay vì có gốc chung
                          như dáng đa thân.Khi có từ ba đến chín cây riêng biệt được đặt cùng nhau trong một chậu cây bonsai,
                          chúng được gọi là một “group setting”, nghĩa là một nhóm các cây được sắp xếp lại cùng nhau. Thông
                          thường có rất nhiều vấn đề trong việc chọn cây, đa dạng về chiều rộng và chiều cao thân cây. Tuy nhiên,
                          chúng vẫn nên giống nhau về hình dạng, tỷ lệ và tán lá, và không nên có nhiều hơn hai cây thẳng hàng với
                          nhau. Việc này giúp tạo ra một cái nhìn tự nhiên hơn và ít nhân tạo hơn.

                          Dáng này còn yêu cầu phải có hơn chín cây được trồng trong một chậu bonsai. Hầu hết, chậu được sử dụng phải dài và nông. Theo truyền thống, tất cả các cây bonsai theo kiểu dáng rừng rậm là cùng một giống cây, và chúng đều có chiều cao khác nhau để nâng cao tính thẩm mỹ, tạo sự thích thú cho người xem và mô phỏng một khu rừng thực tế, các cây sẽ có sự khác nhau về kích cỡ và tuổi thọ. Đôi khi, những cây nhỏ nhất được đặt ở phía sau để tạo cảm giác phối cảnh, để người ngắm cây
                          cảm thấy rằng mình đang nhìn vào một khu rừng rộng lớn.'],
        ];

        foreach ($items as $item){
            ProductCategory::create($item);
        }
    }
}
