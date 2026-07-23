/* =====================================================================
   slides.js - Nội dung + engine bộ slide (TASK-008 / DEC-020)
   Nội dung bám presentation/flow.md. Ảnh trong assets/img/ (bản sinh từ
   capture.mjs). Tự chứa, chạy offline.
   ===================================================================== */
(function () {
  "use strict";

  // Nhãn phần (part) dùng chung cho kicker.
  var P = {
    intro:   { no: "", label: "Giới thiệu" },
    entry:   { no: "", label: "Vào hệ thống · Trang chào" },
    problem: { no: "1", label: "Mục tiêu & phạm vi" },
    big:     { no: "2", label: "Sơ đồ chức năng" },
    collect: { no: "3", label: "Thu thập dữ liệu · PH-001" },
    event:   { no: "4", label: "Sự kiện vận hành · PH-002" },
    calc:    { no: "5", label: "Tính toán và tổng hợp · PH-003" },
    pc:      { no: "6", label: "Tính giá Pc · PH-009 / PH-008" },
    dossier: { no: "7", label: "Tổng hợp hồ sơ · PH-004" },
    ops:     { no: "8", label: "Báo cáo & cấu hình" },
    cross:   { no: "9", label: "Năng lực xuyên suốt" },
    close:   { no: "10", label: "Chốt" }
  };
  var IMG = "assets/img/";

  var SLIDES = [
    // ---- 0. Mở đầu ----
    { type: "cover",
      title: "Hệ thống Lập hồ sơ thanh toán tiền điện GENCO3",
      sub: "Giới thiệu prototype - từ tổng quan tới chi tiết",
      meta: "Giai đoạn Discovery · Bản trình bày khách hàng lần đầu" },

    { type: "content", part: P.intro, textonly: true,
      title: "Mục tiêu bài trình bày",
      lead: "Giúp <b>Người dùng cuối</b> hình dung được <b>ý tưởng thiết kế phần mềm</b> Lập hồ sơ thanh toán - đi từ <b>tổng quan luồng thiết kế màn hình</b> tới <b>chi tiết từng màn hình</b>.",
      bullets: [
        "Nhìn <b>bức tranh tổng thể</b>: sơ đồ chức năng và mạch đi giữa các màn hình.",
        "Đi sâu vào <b>chi tiết từng màn hình</b> theo trình tự nghiệp vụ.",
        "Ghi nhận các điểm cần Quý khách hàng <b>xác nhận</b> để hoàn thiện thiết kế."
      ],
      note: "Cách xem: dùng phím <b>&larr; &rarr;</b> hoặc nút dưới màn hình để chuyển slide; phím <b>O</b> xem lưới tổng thể; với các ảnh màn hình, dùng nút <b>+ / -</b> hoặc cuộn chuột để <b>phóng to soi chi tiết</b> (chỉ ảnh phóng to, chữ giữ nguyên).",
      source: "presentation/flow.md" },

    // ---- 1. Mục tiêu & phạm vi ----
    { type: "content", part: P.problem, textonly: true,
      title: "Mục tiêu hệ thống",
      lead: "Số hóa toàn bộ hồ sơ thanh toán và tự động hóa quy trình tính toán, với khả năng truy vết và tái lập đầy đủ.",
      bullets: [
        "<b>Số hóa toàn bộ hồ sơ thanh toán</b> - thay quy trình thủ công, rời rạc bằng một luồng số hóa xuyên suốt.",
        "<b>Tự động hóa quy trình tính toán hồ sơ</b> - engine công thức cấu hình được thay cho các file Excel ghép tay.",
        "<b>Đảm bảo khả năng truy vết và tái lập kết quả tính toán</b> - mọi con số lần ngược được về chứng từ và công thức gốc."
      ],
      source: "overview/README (tóm tắt một dòng)" },

    { type: "content", part: P.problem, textonly: true,
      title: "Phạm vi trình bày",
      lead: "Bản prototype tập trung vào các nhà máy trong <b>cụm Phú Mỹ</b>.",
      bullets: [
        "Nhà máy chuẩn của bản trình bày: <b>Phú Mỹ 1</b> (tuabin khí); kỳ thanh toán <b>Tháng 05/2026</b>.",
        "Phần <b>Tính giá Pc</b> dùng <b>dữ liệu thực của cụm Phú Mỹ</b> (nhóm tuabin khí).",
        "Hệ thống chịu được <b>nhiều nhóm mô hình nhà máy</b> khác nhau - thêm nhà máy là thêm cấu hình, không sửa lõi.",
        "Các màn vòng đời khác minh họa luồng nghiệp vụ trên bộ dữ liệu mẫu (ghi chú rõ trong từng slide)."
      ],
      note: "Vì sao Phú Mỹ 1: đây là nhà máy đã có <b>dữ liệu tính Pc thực</b> qua khảo sát; các phân hệ vòng đời còn lại minh họa trên mẫu nhiệt điện than Vĩnh Tân 2 do chưa có bộ dữ liệu khí đầy đủ cho những phần đó.",
      source: "overview/01, DEC-019, DEC-020" },

    // ---- 2. Sơ đồ chức năng ----
    { type: "funcmap", part: P.big,
      title: "Sơ đồ chức năng hệ thống",
      lead: "Hệ thống gồm <b>8 phân hệ</b>: <b>6 phân hệ nghiệp vụ</b> nối tiếp theo dòng chảy của một hồ sơ, và <b>2 phân hệ quản trị & giám sát</b> chạy xuyên suốt.",
      rootLabel: "Hệ thống Lập hồ sơ thanh toán tiền điện GENCO3",
      bands: [
        { label: "Nghiệp vụ (theo dòng chảy hồ sơ)", tone: "biz", flex: 6, groups: [
          { no: "1", name: "Thu thập & quản lý dữ liệu", items: [
            "Kết nối & thu thập 5 nguồn",
            "OCR bóc tách chứng từ",
            "Chuẩn hóa, giám sát & lịch sử"
          ] },
          { no: "2", name: "Sự kiện vận hành", items: [
            "Tổng hợp sự kiện vận hành / tháng",
            "Duyệt & công bố (xác nhận NSMO)",
            "Khai báo thủ công & trao đổi"
          ] },
          { no: "3", name: "Tính Pc", items: [
            "Dữ liệu đầu vào hai chiều",
            "Công thức theo hiệu lực kỳ",
            "Bản đồ quy trình & giải trình audit"
          ] },
          { no: "4", name: "Tính toán và tổng hợp", items: [
            "Engine nhóm tính toán cấu hình",
            "Kết quả, snapshot & so sánh",
            "Đối soát thị trường & chốt kỳ"
          ] },
          { no: "5", name: "Tổng hợp hồ sơ", items: [
            "Chi tiết hồ sơ theo kỳ",
            "Thư mục hồ sơ (11 loại tài liệu)",
            "Xuất hồ sơ & ký số"
          ] },
          { no: "6", name: "Cấu hình tính toán", items: [
            "Quản công thức / tham số (Write)",
            "Phiên bản + hiệu lực từ / đến",
            "Phạm vi áp dụng theo nhà máy"
          ] }
        ] },
        { label: "Admin & giám sát", tone: "ops", flex: 2, groups: [
          { no: "7", name: "Giám sát & báo cáo", items: [
            "Bảng điều khiển & báo cáo kỳ",
            "Giám sát đồng bộ & lỗi",
            "Nhật ký hoạt động"
          ] },
          { no: "8", name: "Quản lý & cấu hình", items: [
            "Danh mục nghiệp vụ",
            "Phân quyền theo nhà máy",
            "Cấu hình OCR & tích hợp"
          ] }
        ] }
      ],
      note: "Nhóm nghiệp vụ (xanh) đi theo dòng chảy hồ sơ; nhóm Admin & giám sát (xanh ngọc) phục vụ vận hành, chạy xuyên suốt. Phần sau đi sâu vào <b>Tính Pc</b>, <b>Tính toán và tổng hợp</b> và <b>Tổng hợp hồ sơ</b>.",
      source: "overview/README, features/, prototype SC-021" },

    // ---- 3. Thu thập dữ liệu ----
    { type: "content", part: P.entry,
      title: "Trang chào - điểm vào sau đăng nhập",
      lead: "Ngay sau đăng nhập, chuyên viên vào <b>Trang chào</b>: chọn nhanh mô-đun cần làm và thấy ngay tổng quan kỳ.",
      bullets: [
        "<b>Module launcher</b>: 8 mô-đun của hệ thống, mở thẳng phân hệ cần làm.",
        "Nhúng luôn <b>Bảng điều khiển</b>: KPI kỳ, cảnh báo, tiến độ, đồng bộ nguồn.",
        "Hiển thị ngay <b>nhà máy phụ trách</b> và <b>kỳ thanh toán</b> đang làm."
      ],
      img: "welcome.png", caption: "Trang chào sau đăng nhập (SC-021)",
      note: "Màn minh họa trên nhà máy than Vĩnh Tân 2 (dữ liệu mẫu) - bố cục Trang chào áp dụng chung. Khối dashboard ở dưới truy vết theo SC-001.",
      source: "SC-021, SC-001, DEC-021" },

    { type: "content", part: P.collect,
      title: "Thu thập & đồng bộ dữ liệu",
      lead: "Nạp dữ liệu từ nhiều nguồn chính thức, theo dõi trạng thái đồng bộ tập trung.",
      bullets: [
        "Các nguồn: <b>DIM, DCS, NKVH, Web Thị trường điện</b> và <b>OCR chứng từ</b>.",
        "Hàng đợi xử lý, trạng thái <b>thành công / lỗi / chờ</b> theo từng tác vụ.",
        "Giám sát và <b>tra cứu lịch sử</b> thu thập, chạy lại khi cần."
      ],
      img: "thu-thap.png", caption: "Thu thập & đồng bộ dữ liệu (SC-002)",
      source: "features/01, SC-002" },

    { type: "content", part: P.collect,
      title: "OCR bóc tách chứng từ",
      lead: "Chứng từ giấy được số hóa tự động, có bước con người kiểm tra trước khi ghi nhận.",
      bullets: [
        "Bóc tách hóa đơn / biên bản; hiển thị <b>độ tin cậy</b> từng trường.",
        "Modal <b>kiểm tra & xác nhận</b>: chuyên viên soát rồi mới chấp nhận.",
        "Trường dưới ngưỡng tin cậy được đánh dấu để rà kỹ."
      ],
      img: "thu-thap-ocr.png", caption: "Kiểm tra kết quả OCR trước khi xác nhận",
      note: "Màn minh họa dùng chứng từ than của nhà máy Vĩnh Tân 2 (dữ liệu mẫu) - cơ chế OCR áp dụng cho mọi loại chứng từ.",
      source: "SC-002" },

    // ---- 4. Sự kiện ----
    { type: "content", part: P.event,
      title: "Tổng hợp & công bố sự kiện",
      lead: "Sự kiện vận hành được tổng hợp, công bố và xác nhận theo quy trình với NSMO.",
      bullets: [
        "Danh sách sự kiện vận hành và <b>sự kiện tháng</b> theo kỳ.",
        "Quy trình <b>duyệt và công bố</b>, xác nhận trạng thái với NSMO.",
        "Bám sát thực tế trao đổi văn bản giữa nhà máy và điều độ."
      ],
      img: "su-kien.png", caption: "Tổng hợp & công bố sự kiện (SC-003)",
      source: "features/02, SC-003" },

    { type: "content", part: P.event,
      title: "Xử lý ngoại lệ sự kiện",
      lead: "Hệ thống hỗ trợ các tình huống không theo mặc định thường gặp trong vận hành.",
      bullets: [
        "<b>NSMO từ chối</b> sự kiện: theo dõi, bổ sung và gửi lại.",
        "<b>Khai báo sự kiện thủ công</b> khi nguồn tự động chưa phản ánh.",
        "<b>Soạn email</b> trực tiếp từ sự kiện để trao đổi với điều độ."
      ],
      img: "su-kien.png", caption: "Màn Sự kiện - các thao tác công bố / xử lý",
      source: "FL-004, FL-016, FL-017" },

    // ---- 5. Tính toán và tổng hợp ----
    { type: "content", part: P.calc, core: true,
      title: "Engine tính toán bằng công thức cấu hình",
      lead: "Cách tính không cứng trong code - tổ chức thành các nhóm tính toán cấu hình được.",
      bullets: [
        "Các <b>nhóm tính toán</b> bật / tắt và <b>sắp thứ tự chạy</b>.",
        "Công thức có <b>phiên bản</b>, phục vụ truy vết và kiểm toán.",
        "Thay đổi chính sách tính = đổi cấu hình, không phải sửa hệ thống."
      ],
      img: "tinh-toan.png", caption: "Tính toán và tổng hợp (SC-004)",
      source: "features/03, SC-004" },

    { type: "content", part: P.calc, core: true,
      title: "Kết quả minh bạch & so sánh được",
      lead: "Mỗi lần tính là một bản ghi có thể đối chiếu, không phải kết quả \"một lần rồi thôi\".",
      bullets: [
        "Kết quả theo <b>khoản mục thanh toán</b>, rõ từng thành phần.",
        "<b>Snapshot</b> mỗi lần tính; <b>so sánh giữa các lần</b> để thấy chênh lệch.",
        "<b>Đối soát bảng kê thị trường</b> điện với số liệu hệ thống."
      ],
      img: "tinh-toan.png", caption: "Kết quả theo khoản mục, snapshot & so sánh lần tính",
      source: "SC-004, FL-019" },

    { type: "content", part: P.calc, core: true, textonly: true,
      title: "Chốt kỳ - khóa số liệu, vẫn tái lập được",
      lead: "Khi kỳ đã ổn định, chuyên viên <b>chốt kỳ</b> để khóa số liệu làm căn cứ hồ sơ.",
      bullets: [
        "Chốt kỳ <b>khóa</b> dữ liệu và kết quả, tránh chỉnh sửa ngoài kiểm soát.",
        "Mọi kết quả vẫn <b>tính lại được</b> từ đầu vào đã lưu (snapshot).",
        "Mọi con số <b>truy vết được</b> về chứng từ và công thức đã dùng.",
        "Là nền tảng cho việc <b>đối soát</b> và <b>kiểm toán</b> sau này."
      ],
      source: "FL-006" },

    // ---- 6. Tính giá Pc (core, sâu nhất) ----
    { type: "content", part: P.pc, core: true, textonly: true,
      title: "Vì sao Tính giá Pc là bài toán khó",
      lead: "Pc là giá hợp đồng - vừa nhạy về tiền, vừa phức tạp về công thức và dữ liệu.",
      bullets: [
        "<b>Độ nhạy tiền tỷ</b>: lệch nhỏ ở Pc kéo theo chênh doanh thu rất lớn mỗi tháng.",
        "Công thức <b>gắn hiệu lực hợp đồng</b> (SĐBS) và <b>phụ thuộc kỳ</b> đang tính, không phải một biểu thức cố định.",
        "Dữ liệu đầu vào <b>đa nguồn</b> (phân bổ khí, sản lượng, tỷ giá, giá nhiên liệu...).",
        "Mỗi nhà máy / nhóm nhà máy có thể dùng <b>mô hình khác nhau</b>."
      ],
      note: "Phần này dùng <b>dữ liệu thực cụm Phú Mỹ</b> (nhóm tuabin khí) - DEC-019.",
      source: "TASK-007, DEC-017, DEC-018" },

    { type: "content", part: P.pc, core: true,
      title: "Pc - Dữ liệu đầu vào hai chiều",
      lead: "Không chỉ thấy đầu vào có gì, mà còn thấy đầu vào đó chảy vào bước tính nào.",
      bullets: [
        "Mỗi loại dữ liệu: <b>nguồn, giá trị, trạng thái đủ / thiếu</b>, file gốc đính kèm.",
        "Cột <b>\"Bước tính sử dụng\"</b> (chiều ngược): biết ngay <b>đổi một đầu vào thì phải chạy lại những bước nào</b>.",
        "Ví dụ: đổi <b>tỷ giá</b> kéo theo cả chuỗi bước phía sau tới Pc."
      ],
      img: "pc-dau-vao.png", caption: "Tab Dữ liệu đầu vào - hai chiều tra cứu (SC-019)",
      source: "SC-019 (muc 4.2)" },

    { type: "content", part: P.pc, core: true,
      title: "Pc - Công thức áp dụng trong kỳ",
      lead: "Chọn đúng công thức <b>có hiệu lực tại kỳ đang tính</b> - không phải bản mới nhất.",
      bullets: [
        "Mỗi công thức kèm <b>hiệu lực từ / đến</b>, <b>căn cứ hợp đồng</b> (số SĐBS) và <b>phạm vi nhà máy</b>.",
        "Tính lại kỳ cũ vẫn ra đúng số nhờ chọn theo <b>hiệu lực tại kỳ</b> (effective-dating).",
        "Thiếu công thức hợp lệ hoặc chồng lấn thì <b>chặn tính</b> và cảnh báo - không tự chọn bừa."
      ],
      img: "pc-cong-thuc.png", caption: "Tab Công thức áp dụng trong kỳ (chỉ đọc)",
      source: "SC-019, DEC-017, DEC-018" },

    { type: "content", part: P.pc, core: true,
      title: "Pc - Quy trình tính theo bước",
      lead: "Chuỗi bước tính hiển thị theo đúng thứ tự phụ thuộc, có kết quả từng bước.",
      bullets: [
        "Danh sách <b>bước tính</b> từ dữ liệu đầu vào tới giá Pc cuối.",
        "Mỗi bước nêu <b>phụ thuộc</b> vào bước / dữ liệu nào.",
        "Phù hợp thao tác tuần tự và kiểm tra từng mắt xích."
      ],
      img: "pc-quy-trinh.png", caption: "Tab Quy trình tính toán - bảng bước tính",
      source: "SC-019" },

    { type: "content", part: P.pc, core: true,
      title: "Pc - Bản đồ quy trình tính",
      lead: "Cùng một quy trình, nhìn ở dạng <b>sơ đồ toàn cảnh</b> để hiểu tổng thể.",
      bullets: [
        "Sơ đồ từ <b>chứng từ đầu vào</b> tới nút <b>Pc</b> cuối theo thứ tự phụ thuộc.",
        "Mỗi nút hiện <b>trạng thái</b>: đã chạy / cần chạy lại / lỗi / chưa chạy.",
        "Bảng danh sách và sơ đồ dùng <b>chung một nguồn dữ liệu</b>."
      ],
      img: "pc-ban-do.png", caption: "Bản đồ quy trình tính Pc (SC-020)",
      source: "SC-020" },

    { type: "content", part: P.pc, core: true,
      title: "Pc - Truy vết & đối chiếu file hiện trạng",
      lead: "Chọn một bước tính để mở toàn bộ ngữ cảnh của nó - và đối chiếu với file Excel đang dùng.",
      bullets: [
        "Panel chi tiết: <b>đầu vào cần, công thức áp dụng, kết quả, file / sheet đối chiếu</b>.",
        "Lớp phủ <b>\"bản đồ file hiện trạng\"</b>: nối bước tính với file Excel chuyên viên quen dùng.",
        "Giúp <b>tin tưởng chuyển đổi</b>: đối chiếu từng mắt xích trước khi rời Excel."
      ],
      img: "pc-ban-do-node.png", caption: "Chọn một bước tính => panel chi tiết + đối chiếu",
      note: "Mô hình hai trục: hệ thống tính bằng <b>bước tính</b> (chuẩn), file Excel là <b>căn cứ đối chiếu</b> có thời hạn - DEC-016.",
      source: "SC-020, DEC-016" },

    { type: "content", part: P.pc, core: true,
      title: "Pc - Giải trình audit trên bảng tính",
      lead: "Mở file tính dưới dạng bảng tính chỉ đọc, bấm vào ô để xem cách con số ra đời.",
      bullets: [
        "Xem file tính <b>read-only</b> ngay trong hệ thống (không sửa được).",
        "Bấm một ô => <b>công thức, dữ liệu đầu vào, các bước tính, truy vết ngược</b>.",
        "Đưa mức minh bạch tới <b>từng ô</b> - phục vụ giải trình và kiểm toán."
      ],
      img: "pc-audit.png", caption: "Giải trình audit dạng bảng tính (SC-016)",
      source: "SC-016" },

    { type: "content", part: P.pc, core: true,
      title: "Cấu hình tính toán - nơi quản công thức",
      lead: "Công thức và tham số được quản tập trung tại một nơi, có phiên bản và hiệu lực.",
      bullets: [
        "Đây là <b>nơi ghi (Write) duy nhất</b> của công thức / tham số.",
        "Mỗi phiên bản kèm <b>hiệu lực từ / đến</b>, căn cứ hợp đồng, phạm vi nhà máy.",
        "Các phân hệ tính toán chỉ <b>xem (View)</b> - tách bạch quản trị và sử dụng."
      ],
      img: "cau-hinh-tinh-toan.png", caption: "Cấu hình tính toán (SC-018, PH-008)",
      source: "features/08, SC-018, DEC-013" },

    // ---- 7. Tổng hợp hồ sơ ----
    { type: "content", part: P.dossier, core: true,
      title: "Chi tiết hồ sơ theo kỳ",
      lead: "Vào thẳng hồ sơ của nhà máy và tháng đang làm, thấy đầy đủ tình trạng.",
      bullets: [
        "Tab <b>Tài liệu</b>, checklist <b>đủ / thiếu</b> theo danh mục.",
        "Tổng thanh toán tạm tính, trạng thái xử lý của kỳ.",
        "Điều kiện ký được kiểm soát: thiếu tài liệu thì cảnh báo."
      ],
      img: "ho-so.png", caption: "Chi tiết hồ sơ thanh toán (SC-006)",
      note: "Màn minh họa trên nhà máy than Vĩnh Tân 2 (dữ liệu mẫu) - cấu trúc hồ sơ áp dụng chung.",
      source: "features/04, SC-006" },

    { type: "content", part: P.dossier, core: true,
      title: "Hồ sơ tổ chức theo thư mục chuẩn",
      lead: "Bộ hồ sơ được sắp theo <b>taxonomy 11 loại tài liệu</b>, tra cứu và tải theo cây thư mục.",
      bullets: [
        "Cấu trúc thư mục thống nhất cho mọi kỳ - dễ tìm, dễ bàn giao.",
        "Mỗi loại tài liệu rõ <b>bắt buộc / tùy chọn</b> và trạng thái.",
        "Chuẩn hóa theo trình tự lập hồ sơ thực tế của khách hàng."
      ],
      img: "ho-so-thu-muc.png", caption: "Thư mục hồ sơ - taxonomy 11 tài liệu (SC-014)",
      source: "SC-014, DEC-008" },

    { type: "content", part: P.dossier, core: true,
      title: "Xuất hồ sơ & ký số",
      lead: "Hoàn tất hồ sơ bằng xuất bộ tài liệu và ký số - khép kín vòng đời.",
      bullets: [
        "<b>Xuất hồ sơ</b> với 3 lựa chọn: trọn bộ, PDF riêng lẻ, hoặc gộp một PDF.",
        "<b>Ký số</b> bằng USB Token ngay trên hệ thống.",
        "Quản <b>phiên bản hồ sơ</b> để theo dõi thay đổi giữa các lần."
      ],
      img: "ho-so-xuat.png", caption: "Modal Xuất hồ sơ (SC-006)",
      source: "SC-006, SC-017, DEC-009" },

    // ---- 8. Báo cáo & cấu hình ----
    { type: "content", part: P.ops,
      title: "Giám sát & báo cáo",
      lead: "Bức tranh vận hành: đồng bộ dữ liệu, lỗi hệ thống, hoạt động người dùng.",
      bullets: [
        "Hiện trạng <b>đồng bộ nguồn</b> và cảnh báo lỗi (WARN / FATAL).",
        "<b>Nhật ký hoạt động</b> người dùng phục vụ giám sát và truy vết.",
        "Báo cáo nhanh dạng dashboard theo kỳ."
      ],
      img: "bao-cao.png", caption: "Giám sát và báo cáo (SC-007)",
      source: "features/05, SC-007, SC-013" },

    { type: "content", part: P.ops,
      title: "Danh mục & cấu hình",
      lead: "Quản trị hệ thống: danh mục nghiệp vụ, tích hợp và phân quyền.",
      bullets: [
        "Danh mục nghiệp vụ, cấu hình <b>OCR</b> và các tích hợp.",
        "<b>Phân quyền theo nhà máy</b> - mỗi chuyên viên đúng phạm vi phụ trách.",
        "Thông tin nhà máy, tổ máy, kỳ thanh toán."
      ],
      img: "cau-hinh.png", caption: "Danh mục & cấu hình (SC-008)",
      source: "features/06, SC-008" },

    // ---- 9. Năng lực xuyên suốt ----
    { type: "content", part: P.cross, textonly: true,
      title: "Truy vết & tái lập kết quả",
      lead: "Đây là năng lực nền tảng chạy xuyên suốt mọi phân hệ, không phải một tính năng lẻ.",
      bullets: [
        "Mọi kết quả gắn <b>snapshot dữ liệu đầu vào</b> tại thời điểm tính.",
        "Từ con số trong hồ sơ có thể <b>lần ngược</b> tới công thức và chứng từ gốc.",
        "<b>Tái lập</b> lại kết quả của bất kỳ kỳ nào - kể cả sau nhiều tháng.",
        "Phục vụ trực tiếp <b>đối soát</b> và <b>kiểm toán</b>."
      ],
      source: "overview, SC-016" },

    { type: "content", part: P.cross,
      title: "Trải nghiệm & giao diện nhất quán",
      lead: "Toàn hệ thống dùng chung một hệ thống thiết kế, thống nhất và dễ dùng.",
      bullets: [
        "<b>Design system</b> chung: màu, thành phần, bố cục đồng bộ mọi màn.",
        "Giao diện gọn, ưu tiên nội dung nghiệp vụ.",
        "Có thể tùy biến phong cách trình bày (minh họa để review)."
      ],
      img: "themes.png", caption: "Đối chiếu phong cách giao diện (review-only)",
      source: "design/, showcase" },

    { type: "content", part: P.cross, textonly: true,
      title: "Mở rộng theo từng nhà máy",
      lead: "Thiết kế để phục vụ nhiều nhà máy với mô hình tính khác nhau, không viết lại engine.",
      bullets: [
        "Mỗi mô-đun tính toán có <b>tầng rẽ nhánh theo nhà máy</b> - áp đúng mô hình / công thức / tham số.",
        "Hiện quan sát <b>2 nhóm</b> mô hình (từ khảo sát cụm Phú Mỹ); con số có thể tăng khi thêm nhà máy.",
        "<b>Thêm nhà máy = thêm cấu hình</b>, không sửa lõi hệ thống."
      ],
      note: "Nguyên tắc rẽ nhánh theo nhà máy - DEC-019.",
      source: "DEC-019" },

    // ---- 10. Chốt ----
    { type: "content", part: P.close, textonly: true,
      title: "Prototype giải quyết bài toán thế nào",
      lead: "Nối lại các nhức nhối ban đầu với năng lực đã trình bày.",
      bullets: [
        "Thủ công, rời rạc => <b>một luồng số hóa</b> từ thu thập tới ký số.",
        "Nhiều file Excel tách rời => <b>engine công thức</b> tập trung, cấu hình được.",
        "Khó truy vết => <b>audit tới từng ô</b> và tái lập kết quả bất kỳ kỳ nào.",
        "Rủi ro sai số Pc => <b>công thức theo hiệu lực</b> và cơ chế chặn khi thiếu."
      ],
      source: "tổng hợp" },

    { type: "content", part: P.close, textonly: true,
      title: "Điểm còn chờ Quý khách hàng xác nhận",
      lead: "Để hoàn thiện thiết kế chi tiết, một số điểm cần khách hàng chốt.",
      bullets: [
        "Danh mục <b>bước tính</b> và <b>dữ liệu đầu vào</b> chuẩn cho Pc.",
        "Cách xử lý khi <b>công thức đổi hiệu lực giữa kỳ</b>; cách xác định chỉ số năm vận hành.",
        "Mô hình của <b>nhóm nhà máy còn lại</b> (khảo sát mới phủ cụm Phú Mỹ).",
        "Quy tắc <b>làm tròn</b> và các ngưỡng cảnh báo khi đối chiếu."
      ],
      note: "Chi tiết theo dõi trong review/open-issues (ISS-015 ...).",
      source: "review/open-issues" },

    { type: "content", part: P.close, textonly: true,
      title: "Bước tiếp theo",
      lead: "Từ buổi hôm nay tới thiết kế chi tiết và triển khai.",
      bullets: [
        "Chốt các điểm còn để ngỏ ở slide trước.",
        "Hoàn thiện <b>thiết kế chi tiết</b> theo phản hồi của Quý khách hàng.",
        "Thống nhất <b>kế hoạch triển khai theo giai đoạn</b>."
      ],
      source: "overview/01" },

    { type: "cover", closing: true,
      title: "Cảm ơn Quý khách hàng",
      sub: "Rất mong nhận được trao đổi và góp ý",
      meta: "Hệ thống Lập hồ sơ thanh toán tiền điện GENCO3 · Prototype" }
  ];

  // ================= ENGINE =================
  var deck = document.getElementById("deck");
  var counter = document.getElementById("counter");
  var progress = document.getElementById("progress");
  var thumbsWrap = document.getElementById("thumbs");
  var gridOverlay = document.getElementById("gridOverlay");
  var cur = 0;

  function esc(s) { return s == null ? "" : s; }

  function slideHTML(s, i) {
    if (s.type === "cover") {
      var cls = "slide slide--cover" + (s.closing ? " slide--closing" : "");
      return '<section class="' + cls + '" data-i="' + i + '">' +
        (s.closing ? "" : '<div class="cover-logo">G3</div>') +
        '<h1 class="slide__title">' + esc(s.title) + '</h1>' +
        '<div class="cover-sub">' + esc(s.sub) + '</div>' +
        '<div class="cover-meta">' + esc(s.meta) + '</div>' +
        '</section>';
    }
    // sơ đồ chức năng (cây phân hệ => chức năng con, gom theo nhóm màu)
    if (s.type === "funcmap") {
      var fmKicker = s.part ? '<div class="slide__kicker">' +
        (s.part.no ? '<span class="part-no">' + s.part.no + '</span>' : '') +
        '<span>' + s.part.label + '</span></div>' : '';
      var fmLead = s.lead ? '<p class="slide__lead">' + s.lead + '</p>' : '';
      var funcol = function (g) {
        var items = (g.items || []).map(function (it) {
          return '<li>' + it + '</li>';
        }).join('');
        return '<div class="funcol">' +
          '<div class="funcol__head">' +
            '<span class="funcol__no">' + esc(g.no) + '</span>' +
            '<span class="funcol__name">' + esc(g.name) + '</span>' +
          '</div>' +
          '<ul class="funcol__items">' + items + '</ul>' +
        '</div>';
      };
      var bands = (s.bands || []).map(function (band) {
        var cols = (band.groups || []).map(funcol).join('');
        return '<section class="fband fband--' + (band.tone || 'biz') + '" style="flex:' + (band.flex || 1) + '">' +
          '<header class="fband__label">' + esc(band.label) + '</header>' +
          '<div class="fband__cols">' + cols + '</div>' +
        '</section>';
      }).join('');
      var fmNote = s.note ? '<div class="note funcmap__note">' + s.note + '</div>' : '';
      return '<section class="slide slide--funcmap" data-i="' + i + '">' +
        fmKicker +
        '<h1 class="slide__title">' + esc(s.title) + '</h1>' + fmLead +
        '<div class="funcmap">' +
          '<div class="funcmap__root">' + esc(s.rootLabel || s.title) + '</div>' +
          '<div class="funcmap__stem"></div>' +
          '<div class="funcmap__bands">' + bands + '</div>' +
        '</div>' + fmNote +
        (s.source ? '<div class="slide__source">' + s.source + '</div>' : '') +
        '</section>';
    }
    // content
    var kicker = "";
    if (s.part) {
      kicker = '<div class="slide__kicker">' +
        (s.part.no ? '<span class="part-no">' + s.part.no + '</span>' : '') +
        '<span>' + s.part.label + '</span>' +
        (s.core ? '<span class="badge-core">Phân hệ lõi</span>' : '') +
        '</div>';
    }
    var bullets = "";
    if (s.bullets && s.bullets.length) {
      bullets = '<ul class="bullets' + (s.bullets.length > 4 ? ' compact' : '') + '">' +
        s.bullets.map(function (b) { return '<li>' + b + '</li>'; }).join('') + '</ul>';
    }
    var note = s.note ? '<div class="note">' + s.note + '</div>' : '';
    var lead = s.lead ? '<p class="slide__lead">' + s.lead + '</p>' : '';
    var textCol = '<div class="slide__text">' + bullets + note + '</div>';
    var figCol = "";
    if (s.img) {
      figCol = '<div class="slide__fig"><div class="figure">' +
          '<div class="zoombar">' +
            '<button data-z="out" title="Thu nhỏ">&minus;</button>' +
            '<span class="lvl">100%</span>' +
            '<button data-z="in" title="Phóng to">+</button>' +
            '<button data-z="reset" title="Về mặc định">&#8635;</button>' +
          '</div>' +
          '<div class="figure__view">' +
            '<img class="figure__img" src="' + IMG + s.img + '" alt="' + esc(s.caption) + '" draggable="false">' +
          '</div>' +
          (s.caption ? '<div class="figure__cap">' + esc(s.caption) + '</div>' : '') +
        '</div></div>';
    }
    var cls = "slide" + (s.textonly || !s.img ? " slide--textonly" : "");
    return '<section class="' + cls + '" data-i="' + i + '">' +
      kicker +
      '<h1 class="slide__title">' + esc(s.title) + '</h1>' + lead +
      '<div class="slide__body">' + textCol + figCol + '</div>' +
      (s.source ? '<div class="slide__source">' + s.source + '</div>' : '') +
      '</section>';
  }

  deck.innerHTML = SLIDES.map(slideHTML).join('');
  var slideEls = Array.prototype.slice.call(deck.querySelectorAll('.slide'));

  // ---- Scale deck vừa viewport (giữ 16:9, letterbox) ----
  function fit() {
    var vw = window.innerWidth, vh = window.innerHeight;
    var scale = Math.min(vw / 1280, vh / 720);
    deck.style.transform = 'scale(' + scale + ')';
  }
  window.addEventListener('resize', fit);
  fit();

  // ---- Điều hướng ----
  function show(i) {
    i = Math.max(0, Math.min(SLIDES.length - 1, i));
    slideEls[cur].classList.remove('is-active');
    cur = i;
    slideEls[cur].classList.add('is-active');
    counter.textContent = (cur + 1) + ' / ' + SLIDES.length;
    progress.style.width = ((cur + 1) / SLIDES.length * 100) + '%';
    resetZoom(slideEls[cur]);
    if (gridOverlay.classList.contains('is-open')) markThumb();
    if (location.hash !== '#' + (cur + 1)) history.replaceState(null, '', '#' + (cur + 1));
  }
  function next() { show(cur + 1); }
  function prev() { show(cur - 1); }

  document.getElementById('btnNext').onclick = next;
  document.getElementById('btnPrev').onclick = prev;
  document.getElementById('btnFirst').onclick = function () { show(0); };
  document.getElementById('btnLast').onclick = function () { show(SLIDES.length - 1); };
  document.getElementById('btnFs').onclick = toggleFs;
  document.getElementById('btnGrid').onclick = toggleGrid;

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') { next(); e.preventDefault(); }
    else if (e.key === 'ArrowLeft' || e.key === 'PageUp') { prev(); e.preventDefault(); }
    else if (e.key === 'Home') { show(0); }
    else if (e.key === 'End') { show(SLIDES.length - 1); }
    else if (e.key === 'f' || e.key === 'F') { toggleFs(); }
    else if (e.key === 'o' || e.key === 'O') { toggleGrid(); }
    else if (e.key === 'Escape' && gridOverlay.classList.contains('is-open')) { toggleGrid(); }
  });

  function toggleFs() {
    if (!document.fullscreenElement) { (document.documentElement.requestFullscreen || function(){})(); }
    else if (document.exitFullscreen) { document.exitFullscreen(); }
  }

  // ---- Lưới tổng thể ----
  function buildThumbs() {
    thumbsWrap.innerHTML = SLIDES.map(function (s, i) {
      var t = s.title || '';
      return '<button class="thumb" data-i="' + i + '">' +
        '<span class="t-no">' + (i + 1) + '</span>' +
        '<span class="t-title">' + t + '</span>' +
        '</button>';
    }).join('');
    Array.prototype.forEach.call(thumbsWrap.querySelectorAll('.thumb'), function (el) {
      el.onclick = function () { show(+el.getAttribute('data-i')); toggleGrid(); };
    });
  }
  function markThumb() {
    Array.prototype.forEach.call(thumbsWrap.querySelectorAll('.thumb'), function (el) {
      el.classList.toggle('is-cur', +el.getAttribute('data-i') === cur);
    });
  }
  function toggleGrid() {
    var open = gridOverlay.classList.toggle('is-open');
    if (open) markThumb();
  }
  buildThumbs();

  // ---- Zoom ảnh (chỉ tác động phần ảnh, không đụng chữ) ----
  var Z = { min: 1, max: 4, step: 0.35 };
  function figState(fig) {
    if (!fig.__z) fig.__z = { s: 1, tx: 0, ty: 0 };
    return fig.__z;
  }
  function applyZoom(fig) {
    var st = figState(fig);
    var img = fig.querySelector('.figure__img');
    var view = fig.querySelector('.figure__view');
    var lvl = fig.querySelector('.zoombar .lvl');
    img.style.transform = 'translate(' + st.tx + 'px,' + st.ty + 'px) scale(' + st.s + ')';
    if (lvl) lvl.textContent = Math.round(st.s * 100) + '%';
    view.classList.toggle('zoomed', st.s > 1.01);
    if (st.s <= 1.01) { st.tx = 0; st.ty = 0; img.style.transform = 'scale(1)'; }
  }
  function zoomBy(fig, delta) {
    var st = figState(fig);
    st.s = Math.max(Z.min, Math.min(Z.max, st.s + delta));
    applyZoom(fig);
  }
  function resetZoom(slide) {
    var figs = slide.querySelectorAll('.figure');
    Array.prototype.forEach.call(figs, function (fig) {
      fig.__z = { s: 1, tx: 0, ty: 0 };
      applyZoom(fig);
    });
  }

  // gắn tương tác cho từng figure
  Array.prototype.forEach.call(deck.querySelectorAll('.figure'), function (fig) {
    var view = fig.querySelector('.figure__view');
    fig.querySelector('[data-z="in"]').onclick = function () { zoomBy(fig, Z.step); };
    fig.querySelector('[data-z="out"]').onclick = function () { zoomBy(fig, -Z.step); };
    fig.querySelector('[data-z="reset"]').onclick = function () { fig.__z = { s: 1, tx: 0, ty: 0 }; applyZoom(fig); };
    // cuộn chuột trong khung => zoom
    view.addEventListener('wheel', function (e) {
      e.preventDefault();
      zoomBy(fig, e.deltaY < 0 ? Z.step : -Z.step);
    }, { passive: false });
    // kéo để pan khi đã phóng to
    var drag = null;
    view.addEventListener('mousedown', function (e) {
      var st = figState(fig);
      if (st.s <= 1.01) return;
      drag = { x: e.clientX, y: e.clientY, tx: st.tx, ty: st.ty };
      view.classList.add('is-panning');
      e.preventDefault();
    });
    window.addEventListener('mousemove', function (e) {
      if (!drag) return;
      var st = figState(fig);
      st.tx = drag.tx + (e.clientX - drag.x);
      st.ty = drag.ty + (e.clientY - drag.y);
      applyZoom(fig);
    });
    window.addEventListener('mouseup', function () {
      if (drag) { drag = null; view.classList.remove('is-panning'); }
    });
  });

  // ---- Khởi động (hỗ trợ mở thẳng vào slide qua #n) ----
  var start = parseInt((location.hash || '').replace('#', ''), 10);
  slideEls[0].classList.remove('is-active');
  show(isNaN(start) ? 0 : start - 1);
})();
