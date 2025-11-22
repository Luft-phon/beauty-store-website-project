
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
