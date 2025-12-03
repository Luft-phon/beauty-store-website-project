/**
 * Translation Data
 * 
 * Multi-language support for the application.
 * All UI text should be defined here for easy localization.
 * 
 * When integrating with a CMS or translation service:
 * - Replace with API calls to fetch translations
 * - Consider using libraries like i18next or react-intl
 */

import { Language, Translation } from '../types';

export const TRANSLATIONS: Record<Language, Translation> = {
  [Language.EN]: {
    nav: { 
      home: 'Home', 
      about: 'About Us', 
      services: 'Services', 
      gallery: 'Gallery', 
      contact: 'Contact', 
      booking: 'BOOKING', 
      admin: 'Admin' 
    },
    hero: { 
      title: 'Elegance in Every Detail', 
      subtitle: 'Premier Makeup, Nails, Tattooing & Photography', 
      cta: 'Book Appointment' 
    },
    homepage: {
      statistics: {
        clients: 'Happy Clients',
        rating: 'Average Rating',
        years: 'Years Experience',
        awards: 'Industry Awards'
      },
      sections: {
        ourServices: 'Our Services',
        ourServicesDesc: 'Discover our comprehensive range of beauty and wedding services, crafted to perfection by our expert team.',
        featuredServices: 'Featured Services',
        featuredServicesDesc: 'Our most popular services, trusted by thousands of satisfied clients.',
        whyChooseUs: 'Why Choose Us',
        whyChooseUsDesc: 'Excellence in every detail, care in every service.',
        howItWorks: 'How It Works',
        howItWorksDesc: 'Your journey to beauty, simplified in four easy steps.',
        clientReviews: 'Client Reviews',
        clientReviewsDesc: "Don't just take our word for it – hear from our satisfied clients."
      },
      categories: {
        makeup: {
          name: 'Makeup',
          description: 'Professional makeup artistry for all occasions, from natural glam to bold bridal looks.'
        },
        nails: {
          name: 'Nails',
          description: 'Expert nail care and art, featuring the latest trends in manicures and pedicures.'
        },
        tattooing: {
          name: 'Tattooing',
          description: 'Semi-permanent makeup including microblading and ombre powder brows by certified artists.'
        },
        photography: {
          name: 'Photography',
          description: 'Capture your special moments with our professional wedding and portrait photography.'
        }
      },
      features: {
        quality: {
          title: 'Premium Quality',
          description: 'We use only the finest products and latest techniques to ensure exceptional results every time.'
        },
        experts: {
          title: 'Expert Team',
          description: 'Our certified professionals bring years of experience and passion to every service.'
        },
        hygiene: {
          title: 'Hygiene First',
          description: 'Strict sanitization protocols and premium-grade equipment for your safety and comfort.'
        },
        personalized: {
          title: 'Personalized Care',
          description: 'Every client receives tailored attention and customized solutions for their unique needs.'
        }
      },
      process: {
        step1: {
          title: 'Book Online',
          description: 'Choose your service and preferred date/time through our easy booking system.'
        },
        step2: {
          title: 'Consultation',
          description: 'Meet with our experts to discuss your vision and customize your service.'
        },
        step3: {
          title: 'Experience',
          description: 'Relax and enjoy your service in our comfortable, luxurious environment.'
        },
        step4: {
          title: 'Follow-Up',
          description: 'Receive aftercare instructions and schedule any follow-up appointments.'
        }
      },
      cta: {
        title: 'Ready to Transform Your Look?',
        subtitle: 'Book your appointment today and experience the difference',
        button: 'Get Started'
      },
      buttons: {
        explore: 'Explore',
        learnMore: 'Learn More',
        viewAll: 'View All Services',
        addToCart: 'Add to Cart'
      }
    },
    aboutPage: {
      title: 'Our Story',
      subtitle: 'A sanctuary of beauty and artistry.',
      storyTitle: 'Where Passion Meets Perfection',
      storyText: 'Founded in 2020, Lumière Beauty & Wedding began with a simple vision: to create a space where every client feels like the most beautiful version of themselves. We combine traditional techniques with modern artistry to deliver exceptional results.',
      philosophyTitle: 'Our Philosophy',
      philosophyText: 'We believe that true beauty lies in the details. Whether it is the precise stroke of a brow tattoo, the perfect shade of polish, or capturing a fleeting moment of love, we dedicate ourselves to perfection.',
      teamTitle: 'Meet The Artists'
    },
    servicePage: { 
      addToCart: 'Add to Cart', 
      added: 'Added' 
    },
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
    footer: { 
      rights: 'All rights reserved. Management rights reserved.' 
    }
  },
  [Language.VI]: {
    nav: { 
      home: 'Trang Chủ', 
      about: 'Về Chúng Tôi', 
      services: 'Dịch Vụ', 
      gallery: 'Thư Viện', 
      contact: 'Liên Hệ', 
      booking: 'ĐẶT LỊCH', 
      admin: 'Quản Lý' 
    },
    hero: { 
      title: 'Vẻ Đẹp Tinh Tế', 
      subtitle: 'Trang Điểm, Nail, Phun Xăm & Nhiếp Ảnh', 
      cta: 'Đặt Lịch Ngay' 
    },
    homepage: {
      statistics: {
        clients: 'Khách Hàng Hài Lòng',
        rating: 'Đánh Giá Trung Bình',
        years: 'Năm Kinh Nghiệm',
        awards: 'Giải Thưởng Nghành'
      },
      sections: {
        ourServices: 'Dịch Vụ Của Chúng Tôi',
        ourServicesDesc: 'Khám phá đầy đủ các dịch vụ làm đẹp và cưới hỏi, được tạo ra hoàn hảo bởi đội ngũ chuyên gia của chúng tôi.',
        featuredServices: 'Dịch Vụ Nổi Bật',
        featuredServicesDesc: 'Các dịch vụ phổ biến nhất của chúng tôi, được hàng ngàn khách hàng tin tưởng.',
        whyChooseUs: 'Tại Sao Chọn Chúng Tôi',
        whyChooseUsDesc: 'Xuất sắc trong từng chi tiết, chăm sóc trong mỗi dịch vụ.',
        howItWorks: 'Quy Trình Làm Việc',
        howItWorksDesc: 'Hành trình làm đẹp của bạn, đơn giản hóa trong bốn bước dễ dàng.',
        clientReviews: 'Đánh Giá Khách Hàng',
        clientReviewsDesc: 'Đừng chỉ tin lời chúng tôi – hãy nghe từ khách hàng hài lòng của chúng tôi.'
      },
      categories: {
        makeup: {
          name: 'Trang Điểm',
          description: 'Nghệ thuật trang điểm chuyên nghiệp cho mọi dịp, từ trang điểm tự nhiên đến cô dâu quyến rũ.'
        },
        nails: {
          name: 'Làm Nail',
          description: 'Chăm sóc và nghệ thuật móng chuyên gia, theo xu hướng mới nhất trong làm đẹp móng tay và móng chân.'
        },
        tattooing: {
          name: 'Phun Xăm',
          description: 'Trang điểm bán vĩnh cửu bao gồm microblading và phun xăm chân mày ombre bởi nghệ sĩ được chứng nhận.'
        },
        photography: {
          name: 'Nhiếp Ảnh',
          description: 'Ghi lại những khoảnh khắc đặc biệt của bạn với dịch vụ chụp ảnh cưới và chân dung chuyên nghiệp của chúng tôi.'
        }
      },
      features: {
        quality: {
          title: 'Chất Lượng Cao Cấp',
          description: 'Chúng tôi chỉ sử dụng các sản phẩm tốt nhất và kỹ thuật mới nhất để đảm bảo kết quả xuất sắc mỗi lần.'
        },
        experts: {
          title: 'Đội Ngũ Chuyên Gia',
          description: 'Các chuyên gia được chứng nhận của chúng tôi mang đến nhiều năm kinh nghiệm và đam mê cho mỗi dịch vụ.'
        },
        hygiene: {
          title: 'Vệ Sinh Là Ưu Tiên',
          description: 'Quy trình khử trùng nghiêm ngặt và thiết bị cấp cao cho sự an toàn và thoải mái của bạn.'
        },
        personalized: {
          title: 'Chăm Sóc Cá Nhân Hóa',
          description: 'Mỗi khách hàng nhận được sự quan tâm riêng biệt và giải pháp tùy chỉnh cho nhu cầu độc đáo của họ.'
        }
      },
      process: {
        step1: {
          title: 'Đặt Lịch Online',
          description: 'Chọn dịch vụ và ngày/giờ ưa thích của bạn thông qua hệ thống đặt lịch dễ dàng của chúng tôi.'
        },
        step2: {
          title: 'Tư Vấn',
          description: 'Gặp gỡ các chuyên gia của chúng tôi để thảo luận về tầm nhìn và tùy chỉnh dịch vụ của bạn.'
        },
        step3: {
          title: 'Trải Nghiệm',
          description: 'Thư giãn và tận hưởng dịch vụ của bạn trong môi trường thoải mái, sang trọng của chúng tôi.'
        },
        step4: {
          title: 'Theo Dõi',
          description: 'Nhận hướng dẫn chăm sóc sau dịch vụ và đặt lịch hẹn theo dõi nếu cần.'
        }
      },
      cta: {
        title: 'Sẵn Sàng Thay Đổi Diện Mạo?',
        subtitle: 'Đặt lịch hẹn của bạn ngay hôm nay và trải nghiệm sự khác biệt',
        button: 'Bắt Đầu Ngay'
      },
      buttons: {
        explore: 'Khám Phá',
        learnMore: 'Tìm Hiểu Thêm',
        viewAll: 'Xem Tất Cả Dịch Vụ',
        addToCart: 'Thêm Vào Giỏ'
      }
    },
    aboutPage: {
      title: 'Câu Chuyện Của Chúng Tôi',
      subtitle: 'Nơi tôn vinh vẻ đẹp và nghệ thuật.',
      storyTitle: 'Khi Đam Mê Gặp Sự Hoàn Hảo',
      storyText: 'Được thành lập vào năm 2020, Lumière Beauty & Wedding bắt đầu với một tầm nhìn đơn giản: tạo ra một không gian nơi mọi khách hàng đều cảm thấy mình xinh đẹp nhất. Chúng tôi kết hợp kỹ thuật truyền thống với nghệ thuật hiện đại để mang lại kết quả vượt trội.',
      philosophyTitle: 'Triết Lý Của Chúng Tôi',
      philosophyText: 'Chúng tôi tin rằng vẻ đẹp đích thực nằm ở những chi tiết. Dù là một đường phun xăm chân mày tinh tế, màu sơn móng hoàn hảo hay khoảnh khắc tình yêu được ghi lại, chúng tôi luôn tận tâm vì sự hoàn hảo.',
      teamTitle: 'Đội Ngũ Nghệ Sĩ'
    },
    servicePage: { 
      addToCart: 'Thêm vào giỏ', 
      added: 'Đã thêm' 
    },
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
    footer: { 
      rights: 'Bảo lưu mọi quyền.' 
    }
  },
  [Language.FR]: {
    nav: { 
      home: 'Accueil', 
      about: 'À Propos', 
      services: 'Services', 
      gallery: 'Galerie', 
      contact: 'Contact', 
      booking: 'RÉSERVER', 
      admin: 'Admin' 
    },
    hero: { 
      title: 'L\'élégance dans les détails', 
      subtitle: 'Maquillage, Ongles, Tatouage & Photographie', 
      cta: 'Prendre Rendez-vous' 
    },
    homepage: {
      statistics: {
        clients: 'Clients Satisfaits',
        rating: 'Note Moyenne',
        years: 'Ans d\'Expérience',
        awards: 'Prix de l\'Industrie'
      },
      sections: {
        ourServices: 'Nos Services',
        ourServicesDesc: 'Découvrez notre gamme complète de services de beauté et de mariage, parfaitement réalisés par notre équipe d\'experts.',
        featuredServices: 'Services Vedettes',
        featuredServicesDesc: 'Nos services les plus populaires, approuvés par des milliers de clients satisfaits.',
        whyChooseUs: 'Pourquoi Nous Choisir',
        whyChooseUsDesc: 'L\'excellence dans chaque détail, le soin dans chaque service.',
        howItWorks: 'Comment Ça Marche',
        howItWorksDesc: 'Votre parcours beauté, simplifié en quatre étapes faciles.',
        clientReviews: 'Avis Clients',
        clientReviewsDesc: 'Ne nous croyez pas sur parole – écoutez nos clients satisfaits.'
      },
      categories: {
        makeup: {
          name: 'Maquillage',
          description: 'Artistry de maquillage professionnel pour toutes les occasions, du naturel quotidien au glamour de la mariée.'
        },
        nails: {
          name: 'Ongles',
          description: 'Soins des ongles experts et nail art, suivant les dernières tendances en beauté des ongles et des pieds.'
        },
        tattooing: {
          name: 'Tatouage',
          description: 'Maquillage semi-permanent incluant le microblading et le tatouage sourcils ombré par des artistes certifiés.'
        },
        photography: {
          name: 'Photographie',
          description: 'Capturez vos moments spéciaux avec nos services de photographie de mariage et de portrait professionnels.'
        }
      },
      features: {
        quality: {
          title: 'Qualité Premium',
          description: 'Nous utilisons uniquement les meilleurs produits et les techniques les plus récentes pour garantir des résultats exceptionnels à chaque fois.'
        },
        experts: {
          title: 'Équipe d\'Experts',
          description: 'Nos professionnels certifiés apportent des années d\'expérience et de passion à chaque service.'
        },
        hygiene: {
          title: 'Hygiène Prioritaire',
          description: 'Protocoles de stérilisation stricts et équipement de qualité médicale pour votre sécurité et votre confort.'
        },
        personalized: {
          title: 'Soins Personnalisés',
          description: 'Chaque client reçoit une attention individuelle et des solutions personnalisées pour ses besoins uniques.'
        }
      },
      process: {
        step1: {
          title: 'Réservation en Ligne',
          description: 'Choisissez votre service et la date/heure préférée via notre système de réservation facile.'
        },
        step2: {
          title: 'Consultation',
          description: 'Rencontrez nos experts pour discuter de votre vision et personnaliser votre service.'
        },
        step3: {
          title: 'Expérience',
          description: 'Détendez-vous et profitez de votre service dans notre environnement confortable et luxueux.'
        },
        step4: {
          title: 'Suivi',
          description: 'Recevez des conseils d\'entretien et planifiez des rendez-vous de suivi si nécessaire.'
        }
      },
      cta: {
        title: 'Prêt à Transformer Votre Look?',
        subtitle: 'Réservez votre rendez-vous aujourd\'hui et découvrez la différence',
        button: 'Commencer'
      },
      buttons: {
        explore: 'Explorer',
        learnMore: 'En Savoir Plus',
        viewAll: 'Voir Tous les Services',
        addToCart: 'Ajouter au Panier'
      }
    },
    aboutPage: {
      title: 'Notre Histoire',
      subtitle: 'Un sanctuaire de beauté et d\'art.',
      storyTitle: 'Où la passion rencontre la perfection',
      storyText: 'Fondée en 2020, Lumière Beauty & Wedding a débuté avec une vision simple : créer un espace où chaque client se sent la plus belle version d\'elle-même. Nous combinons techniques traditionnelles et art moderne.',
      philosophyTitle: 'Notre Philosophie',
      philosophyText: 'Nous croyons que la vraie beauté réside dans les détails. Qu\'il s\'agisse du trait précis d\'un tatouage de sourcils, de la teinte parfaite de vernis ou de la capture d\'un moment d\'amour, nous nous consacrons à la perfection.',
      teamTitle: 'Rencontrez Les Artistes'
    },
    servicePage: { 
      addToCart: 'Ajouter au panier', 
      added: 'Ajouté' 
    },
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
    footer: { 
      rights: 'Tous droits réservés.' 
    }
  },
  [Language.ZH]: {
    nav: { 
      home: '首页', 
      about: '关于我们', 
      services: '服务', 
      gallery: '画廊', 
      contact: '联系', 
      booking: '预约', 
      admin: '管理' 
    },
    hero: { 
      title: '细节中的优雅', 
      subtitle: '化妆, 美甲, 纹绣 & 摄影', 
      cta: '立即预约' 
    },
    homepage: {
      statistics: {
        clients: '满意客户',
        rating: '平均评分',
        years: '年经验',
        awards: '行业奖项'
      },
      sections: {
        ourServices: '我们的服务',
        ourServicesDesc: '探索我们全面的美容和婚礼服务，由我们的专家团队完美打造。',
        featuredServices: '精选服务',
        featuredServicesDesc: '我们最受欢迎的服务，得到数千名满意客户的信赖。',
        whyChooseUs: '为什么选择我们',
        whyChooseUsDesc: '每个细节都追求卓越，每项服务都用心关怀。',
        howItWorks: '工作流程',
        howItWorksDesc: '您的美丽之旅，简化为四个简单步骤。',
        clientReviews: '客户评价',
        clientReviewsDesc: '不要只听我们说——听听我们满意客户的声音。'
      },
      categories: {
        makeup: {
          name: '化妆',
          description: '专业化妆艺术，适合各种场合，从日常自然妆到新娘魅力妆。'
        },
        nails: {
          name: '美甲',
          description: '专业美甲护理和艺术，紧跟手部和足部美容的最新趋势。'
        },
        tattooing: {
          name: '纹绣',
          description: '半永久化妆，包括由认证艺术家进行的微针和渐变眉纹绣。'
        },
        photography: {
          name: '摄影',
          description: '用我们的专业婚礼和肖像摄影服务捕捉您的特殊时刻。'
        }
      },
      features: {
        quality: {
          title: '优质品质',
          description: '我们只使用最好的产品和最新的技术，每次都确保出色的结果。'
        },
        experts: {
          title: '专家团队',
          description: '我们的认证专业人员为每项服务带来多年的经验和热情。'
        },
        hygiene: {
          title: '卫生优先',
          description: '严格的消毒程序和医疗级设备，确保您的安全和舒适。'
        },
        personalized: {
          title: '个性化护理',
          description: '每位客户都会得到个性化的关注和针对其独特需求的定制解决方案。'
        }
      },
      process: {
        step1: {
          title: '在线预约',
          description: '通过我们简单的预约系统选择您的服务和首选日期/时间。'
        },
        step2: {
          title: '咨询',
          description: '与我们的专家会面，讨论您的愿景并定制您的服务。'
        },
        step3: {
          title: '体验',
          description: '在我们舒适豪华的环境中放松并享受您的服务。'
        },
        step4: {
          title: '跟进',
          description: '接收护理指导，如有需要可安排后续预约。'
        }
      },
      cta: {
        title: '准备好改变您的形象了吗？',
        subtitle: '今天就预约，体验不同之处',
        button: '立即开始'
      },
      buttons: {
        explore: '探索',
        learnMore: '了解更多',
        viewAll: '查看所有服务',
        addToCart: '添加到购物车'
      }
    },
    aboutPage: {
      title: '我们的故事',
      subtitle: '美丽与艺术的殿堂。',
      storyTitle: '当激情遇上完美',
      storyText: 'Lumière Beauty & Wedding 成立于 2020 年，其愿景很简单：创造一个让每位客户都感觉自己最美丽的空间。我们将传统技术与现代艺术相结合，提供卓越的效果。',
      philosophyTitle: '我们的理念',
      philosophyText: '我们相信真正的美在于细节。无论是精准的眉部纹绣、完美的指甲色调，还是捕捉稍纵即逝的爱情时刻，我们都致力于追求完美。',
      teamTitle: '认识我们的艺术家'
    },
    servicePage: { 
      addToCart: '加入购物车', 
      added: '已添加' 
    },
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
    footer: { 
      rights: '版权所有。' 
    }
  },
  [Language.KO]: {
    nav: { 
      home: '홈', 
      about: '소개', 
      services: '서비스', 
      gallery: '갤러리', 
      contact: '문의', 
      booking: '예약', 
      admin: '관리' 
    },
    hero: { 
      title: '디테일의 우아함', 
      subtitle: '메이크업, 네일, 반영구 & 웨딩 촬영', 
      cta: '예약하기' 
    },
    homepage: {
      statistics: {
        clients: '만족한 고객',
        rating: '평균 평점',
        years: '년 경력',
        awards: '업계 수상'
      },
      sections: {
        ourServices: '우리의 서비스',
        ourServicesDesc: '전문가 팀이 완벽하게 제작한 전체 뷰티 및 웨딩 서비스를 탐색해보세요.',
        featuredServices: '특선 서비스',
        featuredServicesDesc: '수천 명의 만족한 고객들이 신뢰하는 가장 인기 있는 서비스입니다.',
        whyChooseUs: '우리를 선택하는 이유',
        whyChooseUsDesc: '모든 세부 사항의 탁월함, 모든 서비스의 관리.',
        howItWorks: '작동 방식',
        howItWorksDesc: '귀하의 뷰티 여정을 네 가지 간단한 단계로 단순화했습니다.',
        clientReviews: '고객 리뷰',
        clientReviewsDesc: '우리 말만 믿지 마시고 만족한 고객의 이야기를 들어보세요.'
      },
      categories: {
        makeup: {
          name: '메이크업',
          description: '일상적인 자연스러운 메이크업부터 화려한 신부 메이크업까지 모든 경우를 위한 전문 메이크업 아티스트리.'
        },
        nails: {
          name: '네일',
          description: '손과 발의 아름다움에 대한 최신 트렌드를 따르는 전문 네일 케어 및 네일 아트.'
        },
        tattooing: {
          name: '반영구',
          description: '인증된 아티스트의 마이크로블레이딩 및 옴브레 눈썹 타투를 포함한 반영구 화장.'
        },
        photography: {
          name: '사진 촬영',
          description: '전문 웨딩 및 인물 사진 서비스로 특별한 순간을 포착하세요.'
        }
      },
      features: {
        quality: {
          title: '프리미엄 품질',
          description: '매번 뛰어난 결과를 보장하기 위해 최고의 제품과 최신 기술만 사용합니다.'
        },
        experts: {
          title: '전문가 팀',
          description: '인증된 전문가들이 각 서비스에 수년간의 경험과 열정을 가져옵니다.'
        },
        hygiene: {
          title: '위생 우선',
          description: '귀하의 안전과 편안함을 위한 엄격한 살균 프로토콜과 의료용 장비.'
        },
        personalized: {
          title: '맞춤형 케어',
          description: '각 고객은 독특한 요구사항에 맞는 개별적인 관심과 맞춤형 솔루션을 받습니다.'
        }
      },
      process: {
        step1: {
          title: '온라인 예약',
          description: '간편한 예약 시스템을 통해 서비스와 선호하는 날짜/시간을 선택하세요.'
        },
        step2: {
          title: '상담',
          description: '전문가를 만나 비전을 논의하고 서비스를 맞춤화하세요.'
        },
        step3: {
          title: '경험',
          description: '편안하고 럭셔리한 환경에서 서비스를 받으며 휴식을 취하세요.'
        },
        step4: {
          title: '후속 조치',
          description: '관리 지침을 받고 필요시 후속 예약을 잡으세요.'
        }
      },
      cta: {
        title: '외모를 바꿀 준비가 되셨나요?',
        subtitle: '오늘 예약하고 차이를 경험하세요',
        button: '시작하기'
      },
      buttons: {
        explore: '탐색',
        learnMore: '더 알아보기',
        viewAll: '모든 서비스 보기',
        addToCart: '장바구니에 추가'
      }
    },
    aboutPage: {
      title: '우리의 이야기',
      subtitle: '아름다움과 예술의 안식처.',
      storyTitle: '열정이 완벽을 만날 때',
      storyText: '2020년에 설립된 Lumière Beauty & Wedding은 모든 고객이 자신의 가장 아름다운 모습을 발견할 수 있는 공간을 만들겠다는 단순한 비전으로 시작했습니다. 우리는 전통적인 기술과 현대적인 예술성을 결합하여 탁월한 결과를 제공합니다.',
      philosophyTitle: '우리의 철학',
      philosophyText: '우리는 진정한 아름다움이 디테일에 있다고 믿습니다. 정교한 눈썹 문신, 완벽한 매니큐어 색조, 찰나의 사랑을 포착하는 것까지, 우리는 완벽을 위해 헌신합니다.',
      teamTitle: '아티스트 소개'
    },
    servicePage: { 
      addToCart: '장바구니 담기', 
      added: '추가됨' 
    },
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
    footer: { 
      rights: 'All rights reserved.' 
    }
  }
};
