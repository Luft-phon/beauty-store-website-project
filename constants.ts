
import { Language, Service, Translation } from './types';

export const INITIAL_SERVICES: Service[] = [
  {
    id: '1',
    category: 'Makeup',
    name: 'Bridal Makeup',
    description: 'Full bridal package including trial, lashes, and touch-up kit.',
    price: 350,
    image: 'https://picsum.photos/id/1027/800/600'
  },
  {
    id: '2',
    category: 'Makeup',
    name: 'Event Glam',
    description: 'Professional makeup for parties, proms, and special occasions.',
    price: 150,
    image: 'https://picsum.photos/id/342/800/600'
  },
  {
    id: '3',
    category: 'Nails',
    name: 'Gel Manicure Deluxe',
    description: 'Premium gel polish with cuticle care and hand massage.',
    price: 65,
    image: 'https://picsum.photos/id/106/800/600'
  },
  {
    id: '4',
    category: 'Tattooing',
    name: 'Ombre Powder Brows',
    description: 'Semi-permanent shading technique for a soft, misty look.',
    price: 450,
    image: 'https://picsum.photos/id/64/800/600'
  },
  {
    id: '5',
    category: 'Photography',
    name: 'Wedding Day Coverage',
    description: '8 hours of coverage, 2 photographers, digital gallery.',
    price: 2500,
    image: 'https://picsum.photos/id/250/800/600'
  },
  {
    id: '6',
    category: 'Photography',
    name: 'Engagement Session',
    description: '2-hour location shoot with 50 edited images.',
    price: 400,
    image: 'https://picsum.photos/id/338/800/600'
  }
];

export const TRANSLATIONS: Record<Language, Translation> = {
  [Language.EN]: {
    nav: { home: 'Home', about: 'About Us', services: 'Services', gallery: 'Gallery', contact: 'Contact', booking: 'BOOKING', admin: 'Admin' },
    hero: { title: 'Elegance in Every Detail', subtitle: 'Premier Makeup, Nails, Tattooing & Photography', cta: 'Book Appointment' },
    aboutPage: {
      title: 'Our Story',
      subtitle: 'A sanctuary of beauty and artistry.',
      storyTitle: 'Where Passion Meets Perfection',
      storyText: 'Founded in 2020, Lumière Beauty & Wedding began with a simple vision: to create a space where every client feels like the most beautiful version of themselves. We combine traditional techniques with modern artistry to deliver exceptional results.',
      philosophyTitle: 'Our Philosophy',
      philosophyText: 'We believe that true beauty lies in the details. Whether it is the precise stroke of a brow tattoo, the perfect shade of polish, or capturing a fleeting moment of love, we dedicate ourselves to perfection.',
      teamTitle: 'Meet The Artists'
    },
    servicePage: { addToCart: 'Add to Cart', added: 'Added' },
    serviceDetail: {
      back: 'Back',
      rating: 'rating',
      perSession: 'per session',
      depositRequired: 'deposit',
      toSecureBooking: 'required to secure booking',
      whatsIncluded: "What's Included",
      duration: 'Duration',
      bookingLabel: 'Booking',
      advanceRequired: 'Advance required',
      bookNow: 'Book Now',
      serviceDetails: 'Service Details',
      importantInfo: 'Important Information',
      importantInfoItems: {
        arrive: 'Please arrive 10 minutes early for your appointment',
        cancellation: 'Cancellations require 24-hour notice',
        consultation: 'Consultation available before booking',
        patchTest: 'Patch test may be required for certain services'
      },
      youMayLike: 'You May Also Like',
      notFound: 'Service Not Found',
      backToServices: 'Back to Services',
      view: 'View',
      durationMakeup: '60-90 min',
      durationNails: '60-90 min',
      durationTattooing: '60-90 min',
      durationPhotography: '2-8 hours'
    },
    cart: {
      title: 'Your Shopping Cart',
      empty: 'Your cart is currently empty.',
      subtotal: 'Subtotal',
      total: 'Total',
      proceed: 'Proceed to Booking',
      continue: 'Continue Shopping',
      remove: 'Remove'
    },
    booking: { 
      title: 'Checkout', 
      summary: 'Order Summary',
      items: 'items',
      selectDate: 'Select Date', 
      selectTime: 'Select Time', 
      selectService: 'Select Service', 
      name: 'Your Name', 
      email: 'Email Address', 
      deposit: 'Pay Deposit', 
      confirm: 'Confirm Booking', 
      success: 'Booking Confirmed!',
      emptyRedirect: 'Your cart is empty. Please select services first.'
    },
    footer: { rights: 'All rights reserved. Management rights reserved.' }
  },
  [Language.VI]: {
    nav: { home: 'Trang Chủ', about: 'Về Chúng Tôi', services: 'Dịch Vụ', gallery: 'Thư Viện', contact: 'Liên Hệ', booking: 'ĐẶT LỊCH', admin: 'Quản Lý' },
    hero: { title: 'Vẻ Đẹp Tinh Tế', subtitle: 'Trang Điểm, Nail, Phun Xăm & Nhiếp Ảnh', cta: 'Đặt Lịch Ngay' },
    aboutPage: {
      title: 'Câu Chuyện Của Chúng Tôi',
      subtitle: 'Nơi tôn vinh vẻ đẹp và nghệ thuật.',
      storyTitle: 'Khi Đam Mê Gặp Sự Hoàn Hảo',
      storyText: 'Được thành lập vào năm 2020, Lumière Beauty & Wedding bắt đầu với một tầm nhìn đơn giản: tạo ra một không gian nơi mọi khách hàng đều cảm thấy mình xinh đẹp nhất. Chúng tôi kết hợp kỹ thuật truyền thống với nghệ thuật hiện đại để mang lại kết quả vượt trội.',
      philosophyTitle: 'Triết Lý Của Chúng Tôi',
      philosophyText: 'Chúng tôi tin rằng vẻ đẹp đích thực nằm ở những chi tiết. Dù là một đường phun xăm chân mày tinh tế, màu sơn móng hoàn hảo hay khoảnh khắc tình yêu được ghi lại, chúng tôi luôn tận tâm vì sự hoàn hảo.',
      teamTitle: 'Đội Ngũ Nghệ Sĩ'
    },
    servicePage: { addToCart: 'Thêm vào giỏ', added: 'Đã thêm' },
    serviceDetail: {
      back: 'Quay lại',
      rating: 'đánh giá',
      perSession: 'mỗi buổi',
      depositRequired: 'đặt cọc',
      toSecureBooking: 'cần thiết để đặt lịch',
      whatsIncluded: 'Bao gồm những gì',
      duration: 'Thời gian',
      bookingLabel: 'Đặt lịch',
      advanceRequired: 'Yêu cầu đặt trước',
      bookNow: 'Đặt ngay',
      serviceDetails: 'Chi tiết dịch vụ',
      importantInfo: 'Thông tin quan trọng',
      importantInfoItems: {
        arrive: 'Vui lòng đến sớm 10 phút trước giờ hẹn',
        cancellation: 'Hủy lịch cần thông báo trước 24 giờ',
        consultation: 'Tư vấn miễn phí trước khi đặt lịch',
        patchTest: 'Có thể yêu cầu kiểm tra da cho một số dịch vụ'
      },
      youMayLike: 'Bạn có thể thích',
      notFound: 'Không tìm thấy dịch vụ',
      backToServices: 'Quay lại dịch vụ',
      view: 'Xem',
      durationMakeup: '60-90 phút',
      durationNails: '60-90 phút',
      durationTattooing: '60-90 phút',
      durationPhotography: '2-8 giờ'
    },
    cart: {
      title: 'Giỏ Hàng Của Bạn',
      empty: 'Giỏ hàng của bạn đang trống.',
      subtotal: 'Tạm tính',
      total: 'Tổng cộng',
      proceed: 'Tiến hành đặt lịch',
      continue: 'Tiếp tục xem dịch vụ',
      remove: 'Xóa'
    },
    booking: { 
      title: 'Thanh Toán', 
      summary: 'Tóm tắt đơn hàng',
      items: 'dịch vụ',
      selectDate: 'Chọn Ngày', 
      selectTime: 'Chọn Giờ', 
      selectService: 'Chọn Dịch Vụ', 
      name: 'Tên Của Bạn', 
      email: 'Email', 
      deposit: 'Đặt Cọc', 
      confirm: 'Xác Nhận', 
      success: 'Đã Đặt Lịch!',
      emptyRedirect: 'Giỏ hàng trống. Vui lòng chọn dịch vụ trước.'
    },
    footer: { rights: 'Bảo lưu mọi quyền.' }
  },
  [Language.FR]: {
    nav: { home: 'Accueil', about: 'À Propos', services: 'Services', gallery: 'Galerie', contact: 'Contact', booking: 'RÉSERVER', admin: 'Admin' },
    hero: { title: 'L\'élégance dans les détails', subtitle: 'Maquillage, Ongles, Tatouage & Photographie', cta: 'Prendre Rendez-vous' },
    aboutPage: {
      title: 'Notre Histoire',
      subtitle: 'Un sanctuaire de beauté et d\'art.',
      storyTitle: 'Où la passion rencontre la perfection',
      storyText: 'Fondée en 2020, Lumière Beauty & Wedding a débuté avec une vision simple : créer un espace où chaque client se sent la plus belle version d\'elle-même. Nous combinons techniques traditionnelles et art moderne.',
      philosophyTitle: 'Notre Philosophie',
      philosophyText: 'Nous croyons que la vraie beauté réside dans les détails. Qu\'il s\'agisse du trait précis d\'un tatouage de sourcils, de la teinte parfaite de vernis ou de la capture d\'un moment d\'amour, nous nous consacrons à la perfection.',
      teamTitle: 'Rencontrez Les Artistes'
    },
    servicePage: { addToCart: 'Ajouter au panier', added: 'Ajouté' },
    serviceDetail: {
      back: 'Retour',
      rating: 'note',
      perSession: 'par séance',
      depositRequired: 'acompte',
      toSecureBooking: 'requis pour réserver',
      whatsIncluded: 'Ce qui est inclus',
      duration: 'Durée',
      bookingLabel: 'Réservation',
      advanceRequired: 'Réservation anticipée requise',
      bookNow: 'Réserver maintenant',
      serviceDetails: 'Détails du service',
      importantInfo: 'Informations importantes',
      importantInfoItems: {
        arrive: 'Veuillez arriver 10 minutes en avance',
        cancellation: 'Les annulations nécessitent un préavis de 24 heures',
        consultation: 'Consultation disponible avant la réservation',
        patchTest: 'Un test cutané peut être requis pour certains services'
      },
      youMayLike: 'Vous aimerez aussi',
      notFound: 'Service non trouvé',
      backToServices: 'Retour aux services',
      view: 'Voir',
      durationMakeup: '60-90 min',
      durationNails: '60-90 min',
      durationTattooing: '60-90 min',
      durationPhotography: '2-8 heures'
    },
    cart: {
      title: 'Votre Panier',
      empty: 'Votre panier est vide.',
      subtotal: 'Sous-total',
      total: 'Total',
      proceed: 'Procéder à la réservation',
      continue: 'Continuer vos achats',
      remove: 'Retirer'
    },
    booking: { 
      title: 'Paiement', 
      summary: 'Résumé de la commande',
      items: 'articles',
      selectDate: 'Choisir une date', 
      selectTime: 'Choisir une heure', 
      selectService: 'Choisir un service', 
      name: 'Votre nom', 
      email: 'Email', 
      deposit: 'Acompte', 
      confirm: 'Confirmer', 
      success: 'Réservation confirmée!',
      emptyRedirect: 'Votre panier est vide. Veuillez d\'abord sélectionner des services.'
    },
    footer: { rights: 'Tous droits réservés.' }
  },
  [Language.ZH]: {
    nav: { home: '首页', about: '关于我们', services: '服务', gallery: '画廊', contact: '联系', booking: '预约', admin: '管理' },
    hero: { title: '细节中的优雅', subtitle: '化妆, 美甲, 纹绣 & 摄影', cta: '立即预约' },
    aboutPage: {
      title: '我们的故事',
      subtitle: '美丽与艺术的殿堂。',
      storyTitle: '当激情遇上完美',
      storyText: 'Lumière Beauty & Wedding 成立于 2020 年，其愿景很简单：创造一个让每位客户都感觉自己最美丽的空间。我们将传统技术与现代艺术相结合，提供卓越的效果。',
      philosophyTitle: '我们的理念',
      philosophyText: '我们相信真正的美在于细节。无论是精准的眉部纹绣、完美的指甲色调，还是捕捉稍纵即逝的爱情时刻，我们都致力于追求完美。',
      teamTitle: '认识我们的艺术家'
    },
    servicePage: { addToCart: '加入购物车', added: '已添加' },
    serviceDetail: {
      back: '返回',
      rating: '评分',
      perSession: '每次',
      depositRequired: '定金',
      toSecureBooking: '预订所需',
      whatsIncluded: '包含内容',
      duration: '时长',
      bookingLabel: '预订',
      advanceRequired: '需提前预订',
      bookNow: '立即预订',
      serviceDetails: '服务详情',
      importantInfo: '重要信息',
      importantInfoItems: {
        arrive: '请提前10分钟到达预约地点',
        cancellation: '取消需提前24小时通知',
        consultation: '预订前可咨询',
        patchTest: '某些服务可能需要皮肤测试'
      },
      youMayLike: '您可能也喜欢',
      notFound: '未找到服务',
      backToServices: '返回服务列表',
      view: '查看',
      durationMakeup: '60-90分钟',
      durationNails: '60-90分钟',
      durationTattooing: '60-90分钟',
      durationPhotography: '2-8小时'
    },
    cart: {
      title: '您的购物车',
      empty: '您的购物车是空的。',
      subtotal: '小计',
      total: '总计',
      proceed: '进行预约',
      continue: '继续购物',
      remove: '移除'
    },
    booking: { 
      title: '结账', 
      summary: '订单摘要',
      items: '项目',
      selectDate: '选择日期', 
      selectTime: '选择时间', 
      selectService: '选择服务', 
      name: '您的姓名', 
      email: '电子邮箱', 
      deposit: '支付定金', 
      confirm: '确认预约', 
      success: '预约成功!',
      emptyRedirect: '您的购物车是空的。请先选择服务。'
    },
    footer: { rights: '版权所有。' }
  },
  [Language.KO]: {
    nav: { home: '홈', about: '소개', services: '서비스', gallery: '갤러리', contact: '문의', booking: '예약', admin: '관리' },
    hero: { title: '디테일의 우아함', subtitle: '메이크업, 네일, 반영구 & 웨딩 촬영', cta: '예약하기' },
    aboutPage: {
      title: '우리의 이야기',
      subtitle: '아름다움과 예술의 안식처.',
      storyTitle: '열정이 완벽을 만날 때',
      storyText: '2020년에 설립된 Lumière Beauty & Wedding은 모든 고객이 자신의 가장 아름다운 모습을 발견할 수 있는 공간을 만들겠다는 단순한 비전으로 시작했습니다. 우리는 전통적인 기술과 현대적인 예술성을 결합하여 탁월한 결과를 제공합니다.',
      philosophyTitle: '우리의 철학',
      philosophyText: '우리는 진정한 아름다움이 디테일에 있다고 믿습니다. 정교한 눈썹 문신, 완벽한 매니큐어 색조, 찰나의 사랑을 포착하는 것까지, 우리는 완벽을 위해 헌신합니다.',
      teamTitle: '아티스트 소개'
    },
    servicePage: { addToCart: '장바구니 담기', added: '추가됨' },
    serviceDetail: {
      back: '뒤로',
      rating: '평점',
      perSession: '회당',
      depositRequired: '보증금',
      toSecureBooking: '예약에 필요',
      whatsIncluded: '포함 사항',
      duration: '소요 시간',
      bookingLabel: '예약',
      advanceRequired: '사전 예약 필요',
      bookNow: '지금 예약',
      serviceDetails: '서비스 상세',
      importantInfo: '중요 정보',
      importantInfoItems: {
        arrive: '예약 시간 10분 전에 도착해 주세요',
        cancellation: '취소는 24시간 전에 통보해야 합니다',
        consultation: '예약 전 상담 가능',
        patchTest: '일부 서비스의 경우 피부 테스트가 필요할 수 있습니다'
      },
      youMayLike: '추천 서비스',
      notFound: '서비스를 찾을 수 없습니다',
      backToServices: '서비스 목록으로',
      view: '보기',
      durationMakeup: '60-90분',
      durationNails: '60-90분',
      durationTattooing: '60-90분',
      durationPhotography: '2-8시간'
    },
    cart: {
      title: '장바구니',
      empty: '장바구니가 비어 있습니다.',
      subtotal: '소계',
      total: '합계',
      proceed: '예약 진행',
      continue: '쇼핑 계속하기',
      remove: '삭제'
    },
    booking: { 
      title: '결제', 
      summary: '주문 요약',
      items: '항목',
      selectDate: '날짜 선택', 
      selectTime: '시간 선택', 
      selectService: '서비스 선택', 
      name: '이름', 
      email: '이메일', 
      deposit: '보증금 결제', 
      confirm: '예약 확정', 
      success: '예약이 확정되었습니다!',
      emptyRedirect: '장바구니가 비어 있습니다. 서비스를 먼저 선택해주세요.'
    },
    footer: { rights: 'All rights reserved.' }
  }
};

export const GALLERIES = [
  'https://picsum.photos/id/1011/600/600',
  'https://picsum.photos/id/1012/600/800',
  'https://picsum.photos/id/331/600/600',
  'https://picsum.photos/id/325/600/600',
  'https://picsum.photos/id/129/600/800',
  'https://picsum.photos/id/65/600/600',
  'https://picsum.photos/id/823/600/600',
  'https://picsum.photos/id/646/600/800',
];
