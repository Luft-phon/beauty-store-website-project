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
      admin: 'Admin',
      // convenience: 'Convenience',
    },
    hero: {
      title: 'Beauté in Every Detail',
      subtitle: 'Premier Makeup, Makeup Classes, & Photography',
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
        ourServicesDesc: 'Discover our range of beauty and wedding services.',
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
        party: {
          name: 'Makeup',
          description: 'Specialize in personalized, high-end makeup that enhances your natural beauty and brings out your best features. Every look is crafted with precision, premium products, and an eye for detail.'
        },
        bridal: {
          name: 'Bridal',
          description: 'From classic to modern designs, our wedding dresses are chosen with an eye for detail, quality, and elegance—helping every bride find the perfect gown that reflects her unique style and love story.'
        },
        partyEvent: {
          name: 'Party / Event',
          description: 'Glamorous makeup services for parties, social events, and special occasions.'
        },
        photoshoot: {
          name: 'Photography',
          description: 'We create timeless, elegant photographs that capture your beauty, emotions, and most meaningful moments—naturally and beautifully.'
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
          title: 'Consultation',
          description: 'Meet with our experts to discuss your vision and customize your service.'
        },
        step2: {
          title: 'Customer Satisfaction',
          description: 'Receive aftercare instructions and schedule any follow-up appointments.'
        },
        step3: {
          title: 'Appointment Booking',
          description: 'Choose your service and preferred date/time through our easy booking system.'
        },
        step4: {
          title: 'In',
          description: 'Relax and enjoy your service in our comfortable, luxurious environment.'
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
    contactPage: {
      text: "We would love to hear from you. Whether it's for a bridal consultation or a quick inquiry about our brow services, our team is ready to assist.",
      location: 'Studio Location',
      locationText: '7862 Warner Ave Ste A, Huntington Beach, CA, United States, California',
      dm: 'DM us to reserve your spot',
      dmText: 'lecharme.beauteboutique@gmail.com',
    },
    aboutPage: {
      title: 'Our Story',
      subtitle: 'A sanctuary of beauty and artistry.',
      storyTitle: 'About us',
      storyText: 'At Le’Charme Beauté Boutique, beauty is more than a look — it’s an experience. We specialize in luxury makeup and hair services, thoughtfully crafted to enhance your natural features while reflecting your unique style and personality',
      text: 'With a passion for artistry and an eye for detail, our team is dedicated to delivering flawless, long-lasting results for weddings, special events, photoshoots, and everyday elegance. From soft, timeless beauty to modern, editorial glamour, every look is customized with precision, premium products, and professional techniques.',
      philosophyTitle: 'Our Philosophy',
      philosophyText: 'We believe confidence is the most beautiful accessory. Our mission is to ensure every client feels polished, radiant, and unforgettable—because your most important moments deserve nothing less than perfection.',
      teamTitle: 'Meet The Artists',
      teamMembers: [
        {
          name: 'Avy Nguyen',
          role: 'Founder & Master Artist',
          bio: 'With over 10 years of experience in the beauty industry, Avy Nguyen specializes in bridal and editorial makeup, bringing out the unique beauty in every client.'
        },
        {
          name: 'Tien Truong',
          role: 'Senior Makeup Artist',
          bio: 'Tien Truong creates flawless, long-lasting looks for any occasion. Her attention to detail ensures you look perfect from every angle.'
        },
        {
          name: 'Hannah Nguyen',
          role: 'Hair Stylist',
          bio: 'A master of modern and classic hairstyles, Hannah can create the perfect updo or waves to complement your makeup and complete your look.'
        },
        {
          name: 'Vick Nguyen',
          role: 'Makeup Artist',
          bio: 'Vick captures moments with an artistic eye. Her relaxed approach puts clients at ease, resulting in natural, beautiful portraits.'
        },
        {
          name: 'Yani Truong',
          role: 'Makeup Artist',
          bio: 'Yani captures moments with an artistic eye. Her relaxed approach puts clients at ease, resulting in natural, beautiful portraits.'
        },
        {
          name: 'Nhi Nguyen',
          role: 'Makeup Artist',
          bio: 'Nhi captures moments with an artistic eye. Her relaxed approach puts clients at ease, resulting in natural, beautiful portraits.'
        }
      ]
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
      browseHint: 'Please browse our services to add items to your cart.',
      subtotal: 'Subtotal',
      total: 'Total',
      proceed: 'Checkout',
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
      emptyRedirect: 'Your cart is empty. Please select services first.',
      address: 'Location where you need your makeup to be done',
      phone: 'Phone Number',
      travelfee: 'Convenience Fee',
      travelmethod1: 'In-Studio',
      travelmethod2: 'Travel to you',
      travelmethod3: 'Out of State'
    },
    services: {
      'photoshoot-combo': {
        name: 'Photoshoot / Stage Combo',
        description: 'Designed for camera and stage lighting. Includes long-lasting, HD-ready makeup, advanced contouring & highlighting, eye definition, and professional hair styling tailored to your concept. \n ✔ High-end makeup products \n ✔ All types of false lashes included'
      },
      'premium-combo': {
        name: 'Premium Combo',
        description: 'Includes skin cleansing, priming, foundation, eye makeup, contour & blush, brows & lipstick using mid-range makeup products. \n ✔ Natural false lashes included \n ✔ Hair styling: simple curls or straightening (your choice)'
      },
      'premium-makeup': {
        name: 'Premium Makeup Only',
        description: 'Professional makeup application using mid-range products. \n ✔ Natural false lashes included.'
      },
      'premium-hair': {
        name: 'Premium Hair Only',
        description: 'Simple curls or straightening tailored to your event.'
      },
      'deluxe-combo': {
        name: 'Deluxe Combo',
        description: 'Includes skin cleansing, toner, serum, moisturizing, priming, foundation, eye makeup, full-face contour, blush, powder, highlight & lipstick using high-end makeup products. \n ✔ All types of false lashes included \n ✔ Hair styling: any style of your choice'
      },
      'deluxe-makeup': {
        name: 'Deluxe Makeup Only',
        description: 'Full pampering makeup session using high-end products. \n ✔ All types of false lashes included.'
      },
      'deluxe-hair': {
        name: 'Deluxe Hair Only',
        description: 'Any hairstyle of your choice for your special occasion.'
      },
      'bridal-1': {
        name: 'Bridal Makeup & Hair (1 time)',
        description: 'Complete bridal look for your ceremony or reception.'
      },
      'bridal-2': {
        name: 'Bridal Makeup & 2 Hair Changes',
        description: '1 morning Makeup & Hair + 1 touchup & 1 hair change.'
      },
      'bridal-3': {
        name: 'Bridal Makeup & Hair + Layout Changes',
        description: 'Morning & evening makeup and hair changes to keep you looking perfect all day.'
      },
      'bridal-4': {
        name: 'Bridal All-Day Service',
        description: 'MUA will accompany the bride throughout the day and adjust makeup & hair as needed until the evening ceremony ends. \n🎁 Complimentary manicure included'
      },
      'wedding-guest-combo': {
        name: 'Wedding Guest Makeup & Hair',
        description: 'For moms, relatives, bridesmaids, etc.'
      },
      'wedding-guest-makeup': {
        name: 'Wedding Guest Makeup Only',
        description: 'Professional makeup for wedding guests.'
      },
      'wedding-guest-hair': {
        name: 'Wedding Guest Hair Only',
        description: 'Professional hair styling for wedding guests.'
      },
      'groom-combo': {
        name: 'Groom Makeup & Hair',
        description: 'Grooming service for the groom.'
      },
      'groom-makeup': {
        name: 'Groom Makeup Only',
        description: 'Makeup grooming for the groom.'
      },
      'bridal-trial': {
        name: 'Bridal Trial / Pre-Wedding Photoshoot',
        description: '4–6 hours trying different looks and styles. Perfect for pre-wedding photos or finding your wedding day look.'
      },
      'class-private': {
        name: '1:1 Private Makeup Class',
        description: '3 days, 3 hours per day. Flexible dates/times. \n✔ Includes skincare & makeup products\n✔ Professional Brush Set, Brush Case, Beauty Blender, and Mini Beauty Portrait Photoshoot.'
      },
      'class-group': {
        name: 'Group Makeup Class (4 students)',
        description: '3 days, 3 hours per day. Held on weekends (Fri-Sun). \n✔ Includes skincare & makeup products\n✔ Professional Brush Set\n✔ Brush Case\n✔ Beauty Blender\n✔ Mini Beauty Portrait Photoshoot.'
      },
      'convenience': {
        name: 'Convenience Fee',
        description: 'A travel and convenience fee applies to all appointments requiring travel, starting at s50+ (determined by distance from our location).\n✔ Fees apply per makeup artist.'
      },
      'bridal-airbrush': {
        name: 'Bridal Airbrush Products',
        description: 'Bridal Airbrush Products are professional-grade makeup solutions designed for flawless, long-lasting bridal looks.\n ✔ Featuring a lightweight, breathable formula, they provide smooth, natural coverage that photographs beautifully and stays fresh all day.',
      },
      'event-airbrush': {
        name: 'Event/Party/ Airbrush Products',
        description: 'Professional makeup products designed for flawless, long-lasting looks at special events and parties.\n ✔ Lightweight and smooth, they deliver even coverage with a radiant finish that holds up under lights, heat, and long wear.',
      }
    },
    testimonials: {
      '1': {
        author: 'Ali Tufan',
        location: 'New York, USA',
        text: 'I absolutely love the products I purchased from this boutique! The quality is exceptional, and my skin has never looked better. The packaging is also beautiful, making it a luxurious experience every time I use them. Highly recommend!'
      },
      '2': {
        author: 'Jessica M.',
        location: 'Los Angeles, CA',
        text: 'Absolutely amazing experience! Sarah did my bridal makeup and I felt like a princess. The attention to detail was incredible and the look lasted all night long.'
      },
      '3': {
        author: 'Michael T.',
        location: 'Chicago, IL',
        text: 'David captured our wedding perfectly. Every photo tells a story. We are so grateful for these memories that we will cherish forever.'
      },
      '4': {
        author: 'Emily R.',
        location: 'Miami, FL',
        text: 'The best skincare advice I have ever received. My complexion is glowing and I feel so much more confident. Thank you Lumière!'
      }
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
      admin: 'Quản Lý',
      // convenience: 'Tiện ích'
    },
    hero: {
      title: 'Đẹp Trong Từng Đường Nét',
      subtitle: 'Trang Điểm Cao Cấp, Lớp Học Trang Điểm & Nhiếp Ảnh',
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
        party: {
          name: 'Trang Điểm',
          description: 'Nghệ thuật trang điểm chuyên nghiệp cho mọi dịp, từ trang điểm tự nhiên đến cô dâu quyến rũ.'
        },
        bridal: {
          name: 'Cô Dâu',
          description: 'Từ trang điểm tự nhiên đến cô dâu quyến rũ, chúng tôi mang đến vẻ đẹp hoàn hảo cho mọi khoảnh khắc.'
        },
        partyEvent: {
          name: 'Tiệc / Sự Kiện',
          description: 'Dịch vụ trang điểm quyến rũ cho các bữa tiệc, sự kiện xã hội và các dịp đặc biệt.'
        },
        photoshoot: {
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
    contactPage: {
      text: "Chúng tôi rất mong nhận được phản hồi từ bạn. Dù là tư vấn đám cưới hay thắc mắc nhanh về dịch vụ làm đẹp, đội ngũ của chúng tôi luôn sẵn sàng hỗ trợ.",
      location: 'Địa điểm Studio',
      locationText: '7862 Warner Ave Ste A, Huntington Beach, CA, Hoa Kỳ',
      dm: 'Nhắn tin để đặt chỗ',
      dmText: 'lecharme.beauteboutique@gmail.com',
    },
    aboutPage: {
      title: 'Câu Chuyện Của Chúng Tôi',
      subtitle: 'Nơi tôn vinh vẻ đẹp và nghệ thuật.',
      storyTitle: 'Khi Đam Mê Gặp Sự Hoàn Hảo',
      storyText: 'Được thành lập vào năm 2020, lecharmebeauteboutique bắt đầu với một tầm nhìn đơn giản: tạo ra một không gian nơi mọi khách hàng đều cảm thấy mình xinh đẹp nhất. Chúng tôi kết hợp kỹ thuật truyền thống với nghệ thuật hiện đại để mang lại kết quả vượt trội.',
      philosophyTitle: 'Triết Lý Của Chúng Tôi',
      philosophyText: 'Chúng tôi tin rằng vẻ đẹp đích thực nằm ở những chi tiết. Dù là một đường phun xăm chân mày tinh tế, màu sơn móng hoàn hảo hay khoảnh khắc tình yêu được ghi lại, chúng tôi luôn tận tâm vì sự hoàn hảo.',
      teamTitle: 'Đội Ngũ Nghệ Sĩ',
      teamMembers: [
        {
          name: 'Avy Nguyen',
          role: 'Nhà Sáng Lập & Chuyên Gia Chính',
          bio: 'Với hơn 10 năm kinh nghiệm trong ngành làm đẹp, Avy Nguyen chuyên về trang điểm cô dâu và tạp chí, làm nổi bật vẻ đẹp độc đáo của mỗi khách hàng.'
        },
        {
          name: 'Tien Truong',
          role: 'Chuyên Gia Trang Điểm Cấp Cao',
          bio: 'Tien Truong tạo ra những vẻ ngoài hoàn hảo, lâu trôi cho mọi dịp. Sự chú ý đến từng chi tiết của cô ấy đảm bảo bạn trông hoàn hảo từ mọi góc độ.'
        },
        {
          name: 'Hannah Nguyen',
          role: 'Nhà Tạo Mẫu Tóc',
          bio: 'Bậc thầy của các kiểu tóc hiện đại và cổ điển, Hannah có thể tạo ra kiểu tóc búi hoặc sóng nước hoàn hảo để bổ sung cho lớp trang điểm và hoàn thiện vẻ ngoài của bạn.'
        },
        {
          name: 'Vick Nguyen',
          role: 'Chuyên Gia Trang Điểm',
          bio: 'Vick ghi lại những khoảnh khắc bằng con mắt nghệ thuật. Cách tiếp cận thoải mái của cô ấy giúp khách hàng cảm thấy dễ chịu, tạo ra những bức chân dung tự nhiên và xinh đẹp.'
        },
        {
          name: 'Yani Truong',
          role: 'Chuyên Gia Trang Điểm',
          bio: 'Yani ghi lại những khoảnh khắc bằng con mắt nghệ thuật. Cách tiếp cận thoải mái của cô ấy giúp khách hàng cảm thấy dễ chịu, tạo ra những bức chân dung tự nhiên và xinh đẹp.'
        },
        {
          name: 'Nhi Nguyen',
          role: 'Chuyên Gia Trang Điểm',
          bio: 'Nhi ghi lại những khoảnh khắc bằng con mắt nghệ thuật. Cách tiếp cận thoải mái của cô ấy giúp khách hàng cảm thấy dễ chịu, tạo ra những bức chân dung tự nhiên và xinh đẹp.'
        }
      ],
      text: 'Được thành lập vào năm 2020, lecharmebeauteboutique bắt đầu với một tầm nhìn đơn giản: tạo ra một không gian nơi mọi khách hàng đều cảm thấy mình xinh đẹp nhất. Chúng tôi kết hợp kỹ thuật truyền thống với nghệ thuật hiện đại để mang lại'
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
      browseHint: 'Vui lòng xem qua các dịch vụ của chúng tôi để thêm vào giỏ hàng.',
      subtotal: 'Tạm tính',
      total: 'Tổng cộng',
      proceed: 'Thanh Toán',
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
      emptyRedirect: 'Giỏ hàng trống. Vui lòng chọn dịch vụ trước.',
      address: 'Địa chỉ cần trang điểm',
      phone: 'Số điện thoại',
      travelfee: 'Phí di chuyển',
      travelmethod1: 'Tại Studio Le\'Charme Beauté',
      travelmethod2: 'Di chuyển đến địa điểm của bạn',
      travelmethod3: 'Ngoài tiểu bang'
    },
    services: {
      'photoshoot-combo': {
        name: 'Combo Chụp Ảnh / Sân Khấu',
        description: 'Được thiết kế cho ánh sáng máy ảnh và sân khấu. Bao gồm trang điểm lâu trôi, chuẩn HD, contour & highlight nâng cao, trang điểm mắt sắc sảo và làm tóc chuyên nghiệp theo concept của bạn. \n ✔ Sản phẩm trang điểm cao cấp \n ✔ Bao gồm mọi loại mi giả'
      },
      'premium-combo': {
        name: 'Combo Cao Cấp',
        description: 'Bao gồm làm sạch da, kem lót, kem nền, trang điểm mắt, contour & má hồng, lông mày & son môi sử dụng các sản phẩm tầm trung. \n ✔ Bao gồm mi giả tự nhiên \n ✔ Làm tóc: uốn nhẹ hoặc duỗi thẳng (tùy chọn)'
      },
      'premium-makeup': {
        name: 'Trang Điểm Cao Cấp',
        description: 'Trang điểm chuyên nghiệp sử dụng các sản phẩm tầm trung. \n ✔ Bao gồm mi giả tự nhiên.'
      },
      'premium-hair': {
        name: 'Làm Tóc Cao Cấp',
        description: 'Uốn nhẹ hoặc duỗi thẳng phù hợp với sự kiện của bạn.'
      },
      'deluxe-combo': {
        name: 'Combo Sang Trọng',
        description: 'Bao gồm làm sạch da, toner, serum, dưỡng ẩm, kem lót, kem nền, trang điểm mắt, contour toàn mặt, má hồng, phấn phủ, highlight & son môi sử dụng các sản phẩm cao cấp. \n ✔ Bao gồm mọi loại mi giả \n ✔ Làm tóc: bất kỳ kiểu tóc nào bạn chọn'
      },
      'deluxe-makeup': {
        name: 'Trang Điểm Sang Trọng',
        description: 'Buổi trang điểm chăm sóc toàn diện sử dụng các sản phẩm cao cấp. \n ✔ Bao gồm mọi loại mi giả.'
      },
      'deluxe-hair': {
        name: 'Làm Tóc Sang Trọng',
        description: 'Bất kỳ kiểu tóc nào bạn chọn cho dịp đặc biệt của mình.'
      },
      'bridal-1': {
        name: 'Trang Điểm & Làm Tóc Cô Dâu (1 lần)',
        description: 'Vẻ ngoài hoàn hảo cho lễ cưới hoặc tiệc chiêu đãi của bạn.'
      },
      'bridal-2': {
        name: 'Trang Điểm Cô Dâu & 2 Kiểu Tóc',
        description: '1 lần Trang điểm & Làm tóc buổi sáng + 1 lần dặm lại & 1 lần thay đổi kiểu tóc.'
      },
      'bridal-3': {
        name: 'Trang Điểm & Làm Tóc Cô Dâu + Thay Đổi Layout',
        description: 'Thay đổi trang điểm và làm tóc sáng & tối để bạn luôn hoàn hảo suốt cả ngày.'
      },
      'bridal-4': {
        name: 'Dịch Vụ Cô Dâu Cả Ngày',
        description: 'Chuyên gia trang điểm sẽ đi cùng cô dâu suốt cả ngày và chỉnh sửa trang điểm & làm tóc khi cần thiết cho đến khi tiệc tối kết thúc. \n🎁 Tặng kèm làm móng tay miễn phí'
      },
      'wedding-guest-combo': {
        name: 'Trang Điểm & Làm Tóc Khách Mời',
        description: 'Dành cho mẹ, họ hàng, phụ dâu, v.v.'
      },
      'wedding-guest-makeup': {
        name: 'Trang Điểm Khách Mời',
        description: 'Trang điểm chuyên nghiệp cho khách mời đám cưới.'
      },
      'wedding-guest-hair': {
        name: 'Làm Tóc Khách Mời',
        description: 'Làm tóc chuyên nghiệp cho khách mời đám cưới.'
      },
      'groom-combo': {
        name: 'Trang Điểm & Làm Tóc Chú Rể',
        description: 'Dịch vụ chăm sóc diện mạo cho chú rể.'
      },
      'groom-makeup': {
        name: 'Trang Điểm Chú Rể',
        description: 'Trang điểm nhẹ nhàng cho chú rể.'
      },
      'bridal-trial': {
        name: 'Trang Điểm Thử Cô Dâu / Chụp Ảnh Pre-Wedding',
        description: '4–6 giờ thử các phong cách khác nhau. Hoàn hảo cho chụp ảnh pre-wedding hoặc tìm kiếm phong cách ngày cưới của bạn.'
      },
      'class-private': {
        name: 'Lớp Học Trang Điểm Cá Nhân 1:1',
        description: '3 ngày, 3 giờ mỗi ngày. Thời gian linh hoạt. \n✔ Bao gồm sản phẩm dưỡng da & trang điểm\n✔ Bộ Cọ Chuyên Nghiệp, Túi Đựng Cọ, Mút Trang Điểm, và Chụp Ảnh Chân Dung Beauty Mini.'
      },
      'class-group': {
        name: 'Lớp Học Trang Điểm Nhóm (4 học viên)',
        description: '3 ngày, 3 giờ mỗi ngày. Tổ chức vào cuối tuần (Thứ 6 - Chủ Nhật). \n✔ Bao gồm sản phẩm dưỡng da & trang điểm\n✔ Bộ Cọ Chuyên Nghiệp\n✔ Túi Đựng Cọ\n✔ Mút Trang Điểm\n✔ Chụp Ảnh Chân Dung Beauty Mini.'
      },
      'convenience': {
        name: 'Phí Tiện Lợi',
        description: 'Phí di chuyển và tiện lợi áp dụng cho tất cả các cuộc hẹn cần di chuyển, bắt đầu từ $50+ (xác định theo khoảng cách từ địa điểm của chúng tôi).\n✔ Phí áp dụng cho mỗi nghệ sĩ trang điểm.'
      },
      'bridal-airbrush': {
        name: 'Sản Phẩm Airbrush Cô Dâu',
        description: 'Sản phẩm Airbrush Cô Dâu là giải pháp trang điểm chuyên nghiệp được thiết kế cho vẻ ngoài cô dâu hoàn hảo, lâu trôi.\n ✔ Với công thức nhẹ, thoáng khí, chúng mang lại độ che phủ mịn màng, tự nhiên, lên hình đẹp và tươi tắn suốt cả ngày.',
      },
      'event-airbrush': {
        name: 'Sản Phẩm Airbrush Tiệc / Sự Kiện',
        description: 'Sản phẩm trang điểm chuyên nghiệp được thiết kế cho vẻ ngoài hoàn hảo, lâu trôi tại các sự kiện đặc biệt và bữa tiệc.\n ✔ Nhẹ và mịn, chúng mang lại độ che phủ đều với lớp nền rạng rỡ, chịu được ánh đèn, nhiệt độ và thời gian dài.',
      }
    },
    testimonials: {
      '1': {
        author: 'Ali Tufan',
        location: 'New York, Mỹ',
        text: 'Tôi cực kỳ yêu thích các sản phẩm tôi đã mua từ cửa hàng này! Chất lượng thật đặc biệt, và làn da của tôi chưa bao giờ trông đẹp hơn thế. Bao bì cũng rất đẹp, tạo cảm giác sang trọng mỗi khi tôi sử dụng. Rất khuyến khích!'
      },
      '2': {
        author: 'Jessica M.',
        location: 'Los Angeles, CA',
        text: 'Trải nghiệm tuyệt vời! Sarah đã trang điểm cho đám cưới của tôi và tôi cảm thấy như một công chúa. Sự chú ý đến từng chi tiết thật đáng kinh ngạc và lớp trang điểm giữ được suốt đêm.'
      },
      '3': {
        author: 'Michael T.',
        location: 'Chicago, IL',
        text: 'David đã ghi lại đám cưới của chúng tôi một cách hoàn hảo. Mỗi bức ảnh kể một câu chuyện. Chúng tôi rất biết ơn những kỷ niệm này mà chúng tôi sẽ trân trọng mãi mãi.'
      },
      '4': {
        author: 'Emily R.',
        location: 'Miami, FL',
        text: 'Lời khuyên chăm sóc da tốt nhất mà tôi từng nhận được. Làn da của tôi đang tỏa sáng và tôi cảm thấy tự tin hơn nhiều. Cảm ơn Lumière!'
      }
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
      title: 'La beauté dans chaque détail',
      subtitle: 'Maquillage Haut de Gamme, Cours de Maquillage & Photographie',
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
        party: {
          name: 'Maquillage',
          description: 'Artistry de maquillage professionnel pour toutes les occasions, du naturel quotidien au glamour de la mariée.'
        },
        bridal: {
          name: 'Mariée',
          description: 'De la beauté naturelle au glamour de la mariée, nous créons le look parfait pour chaque instant.'
        },
        partyEvent: {
          name: 'Fête / Événement',
          description: 'Services de maquillage glamour pour les fêtes, les événements sociaux et les occasions spéciales.'
        },
        photoshoot: {
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
    contactPage: {
      text: "Nous serions ravis de vous entendre. Que ce soit pour une consultation de mariage ou une simple question sur nos services de sourcils, notre équipe est prête à vous aider.",
      location: 'Emplacement du Studio',
      locationText: '7862 Warner Ave Ste A, Huntington Beach, CA, États-Unis, Californie',
      dm: 'Envoyez-nous un DM pour réserver',
      dmText: 'lecharme.beauteboutique@gmail.com',
    },
    aboutPage: {
      title: 'Notre Histoire',
      subtitle: 'Un sanctuaire de beauté et d\'art.',
      storyTitle: 'Où la passion rencontre la perfection',
      storyText: 'Fondée en 2020, lecharmebeauteboutique a débuté avec une vision simple : créer un espace où chaque client se sent la plus belle version d\'elle-même. Nous combinons techniques traditionnelles et art moderne.',
      philosophyTitle: 'Notre Philosophie',
      philosophyText: 'Nous croyons que la vraie beauté réside dans les détails. Qu\'il s\'agisse du trait précis d\'un tatouage de sourcils, de la teinte parfaite de vernis ou de la capture d\'un moment d\'amour, nous nous consacrons à la perfection.',
      teamTitle: 'Rencontrez Les Artistes',
      teamMembers: [
        {
          name: 'Avy Nguyen',
          role: 'Fondatrice & Artiste Principale',
          bio: "Avec plus de 10 ans d'expérience dans l'industrie de la beauté, Avy Nguyen se spécialise dans le maquillage de mariée et éditorial, faisant ressortir la beauté unique de chaque client."
        },
        {
          name: 'Tien Truong',
          role: 'Maquilleuse Senior',
          bio: 'Tien Truong crée des looks impeccables et durables pour toutes les occasions. Son attention aux détails vous assure d\'être parfaite sous tous les angles.'
        },
        {
          name: 'Hannah Nguyen',
          role: 'Coiffeur Styliste',
          bio: 'Un maître des coiffures modernes et classiques, Hannah peut créer le chignon ou les ondulations parfaits pour compléter votre maquillage et parfaire votre look.'
        },
        {
          name: 'Vick Nguyen',
          role: 'Maquilleuse',
          bio: "Vick capture des moments avec un œil artistique. Son approche détendue met les clients à l'aise, pour des portraits naturels et magnifiques."
        }, {
          name: 'Yani Truong',
          role: 'Maquilleuse',
          bio: "Yani capture des moments avec un œil artistique. Son approche détendue met les clients à l'aise, pour des portraits naturels et magnifiques."
        }, {
          name: 'Nhi Nguyen',
          role: 'Maquilleuse',
          bio: "Nhi capture des moments avec un œil artistique. Son approche détendue met les clients à l'aise, pour des portraits naturels et magnifiques."
        }
      ],
      text: 'Depuis sa fondation en 2020, lecharmebeauteboutique a commencé avec une vision simple : créer un espace où chaque client se sent la plus belle version d\'elle-même. Nous combinons techniques traditionnelles et art moderne.'
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
      browseHint: 'Veuillez consulter nos services pour ajouter des articles à votre panier.',
      subtotal: 'Sous-total',
      total: 'Total',
      proceed: 'Paiement',
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
      emptyRedirect: 'Votre panier est vide. Veuillez d\'abord sélectionner des services.',
      address: 'Adresse où vous avez besoin de votre maquillage',
      phone: 'Numéro de téléphone',
      travelfee: 'Frais de commodité',
      travelmethod1: 'À notre studio Le\'Charme Beauté',
      travelmethod2: 'Déplacement à votre domicile',
      travelmethod3: 'Hors de l\'État'
    },
    services: {
      'photoshoot-combo': {
        name: 'Combo Photoshoot / Scène',
        description: 'Conçu pour l\'éclairage de caméra et de scène. Comprend maquillage longue tenue, prêt pour la HD, contouring & highlighting avancés, définition des yeux et coiffure professionnelle adaptée à votre concept. \n ✔ Produits de maquillage haut de gamme \n ✔ Tous types de faux cils inclus'
      },
      'premium-combo': {
        name: 'Combo Premium',
        description: 'Comprend nettoyage de la peau, base, fond de teint, maquillage des yeux, contour & blush, sourcils & rouge à lèvres avec des produits de maquillage de moyenne gamme. \n ✔ Faux cils naturels inclus \n ✔ Coiffure : boucles simples ou lissage (au choix)'
      },
      'premium-makeup': {
        name: 'Maquillage Premium Seul',
        description: 'Application de maquillage professionnel utilisant des produits de moyenne gamme. \n ✔ Faux cils naturels inclus.'
      },
      'premium-hair': {
        name: 'Coiffure Premium Seule',
        description: 'Boucles simples ou lissage adaptés à votre événement.'
      },
      'deluxe-combo': {
        name: 'Combo Deluxe',
        description: 'Comprend nettoyage de la peau, lotion, sérum, hydratation, base, fond de teint, maquillage des yeux, contour complet du visage, blush, poudre, highlight & rouge à lèvres avec des produits haut de gamme. \n ✔ Tous types de faux cils inclus \n ✔ Coiffure : le style de votre choix'
      },
      'deluxe-makeup': {
        name: 'Maquillage Deluxe Seul',
        description: 'Session de maquillage complète utilisant des produits haut de gamme. \n ✔ Tous types de faux cils inclus.'
      },
      'deluxe-hair': {
        name: 'Coiffure Deluxe Seule',
        description: 'Tout style de coiffure de votre choix pour votre occasion spéciale.'
      },
      'bridal-1': {
        name: 'Maquillage & Coiffure Mariée (1 fois)',
        description: 'Look complet de mariée pour votre cérémonie ou réception.'
      },
      'bridal-2': {
        name: 'Maquillage Mariée & 2 Changements Coiffure',
        description: '1 Maquillage & Coiffure le matin + 1 retouche & 1 changement de coiffure.'
      },
      'bridal-3': {
        name: 'Maquillage & Coiffure Mariée + Changements de Look',
        description: 'Changements de maquillage et coiffure matin & soir pour un look parfait toute la journée.'
      },
      'bridal-4': {
        name: 'Service Mariée Journée Complète',
        description: 'La maquilleuse accompagnera la mariée tout au long de la journée et ajustera le maquillage & la coiffure si nécessaire jusqu\'à la fin de la cérémonie du soir. \n🎁 Manucure offerte'
      },
      'wedding-guest-combo': {
        name: 'Maquillage & Coiffure Invité Mariage',
        description: 'Pour les mamans, les proches, les demoiselles d\'honneur, etc.'
      },
      'wedding-guest-makeup': {
        name: 'Maquillage Invité Mariage Seul',
        description: 'Maquillage professionnel pour les invités de mariage.'
      },
      'wedding-guest-hair': {
        name: 'Coiffure Invité Mariage Seule',
        description: 'Coiffure professionnelle pour les invités de mariage.'
      },
      'groom-combo': {
        name: 'Maquillage & Coiffure Marié',
        description: 'Service de toilettage pour le marié.'
      },
      'groom-makeup': {
        name: 'Maquillage Marié Seul',
        description: 'Maquillage de toilettage pour le marié.'
      },
      'bridal-trial': {
        name: 'Essai Mariée / Photoshoot Pré-Mariage',
        description: '4–6 heures pour essayer différents looks et styles. Parfait pour les photos pré-mariage ou pour trouver votre look du jour J.'
      },
      'class-private': {
        name: 'Cours de Maquillage Privé 1:1',
        description: '3 jours, 3 heures par jour. Dates/horaires flexibles. \n✔ Comprend les produits de soin & maquillage\n✔ Set de Pinceaux Professionnels, Étui à Pinceaux, Beauty Blender et Mini Séance Photo Portrait Beauté.'
      },
      'class-group': {
        name: 'Cours de Maquillage de Groupe (4 élèves)',
        description: '3 jours, 3 heures par jour. Organisé le week-end (Ven-Dim). \n✔ Comprend les produits de soin & maquillage\n✔ Set de Pinceaux Professionnels\n✔ Étui à Pinceaux\n✔ Beauty Blender\n✔ Mini Séance Photo Portrait Beauté.'
      },
      'convenience': {
        name: 'Frais de Commodité',
        description: 'Frais de déplacement et de commodité s\'appliquent à tous les rendez-vous nécessitant un déplacement, à partir de 50 $+ (déterminé par la distance de notre emplacement).\n✔ Les frais s\'appliquent par artiste maquilleur.'
      },
      'bridal-airbrush': {
        name: 'Produits Airbrush Mariée',
        description: 'Les produits Airbrush Mariée sont des solutions de maquillage de qualité professionnelle conçues pour des looks de mariée impeccables et durables.\n ✔ Dotés d\'une formule légère et respirante, ils offrent une couverture lisse et naturelle qui photographie magnifiquement et reste fraîche toute la journée.',
      },
      'event-airbrush': {
        name: 'Produits Airbrush Événement / Fête',
        description: 'Produits de maquillage professionnels conçus pour des looks impeccables et durables lors d\'événements spéciaux et de fêtes.\n ✔ Légers et lisses, ils offrent une couverture uniforme avec un fini radieux qui résiste aux lumières, à la chaleur et à une longue tenue.',
      }
    },
    testimonials: {
      '1': {
        author: 'Ali Tufan',
        location: 'New York, USA',
        text: 'J\'adore absolument les produits que j\'ai achetés dans cette boutique ! La qualité est exceptionnelle et ma peau n\'a jamais été aussi belle. L\'emballage est également magnifique, ce qui en fait une expérience luxueuse à chaque fois. Je recommande vivement !'
      },
      '2': {
        author: 'Jessica M.',
        location: 'Los Angeles, CA',
        text: 'Une expérience absolument incroyable ! Sarah a réalisé mon maquillage de mariée et je me suis sentie comme une princesse. Le souci du détail était incroyable et le look a tenu toute la nuit.'
      },
      '3': {
        author: 'Michael T.',
        location: 'Chicago, IL',
        text: 'David a parfaitement capturé notre mariage. Chaque photo raconte une histoire. Nous sommes tellement reconnaissants pour ces souvenirs que nous chérirons pour toujours.'
      },
      '4': {
        author: 'Emily R.',
        location: 'Miami, FL',
        text: 'Les meilleurs conseils de soins de la peau que j\'ai jamais reçus. Mon teint est éclatant et je me sens tellement plus confiante. Merci Lumière !'
      }
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
      title: '美，尽在每一个细节',
      subtitle: '高级化妆，化妆课程 & 摄影',
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
        party: {
          name: '化妆',
          description: '专业化妆艺术，适合各种场合，从日常自然妆到新娘魅力妆。'
        },
        bridal: {
          name: '新娘',
          description: '从经典到现代的设计，我们的婚纱注重细节、品质和优雅——帮助每位新娘找到完美匹配她独特风格和爱情故事的礼服。'
        },
        partyEvent: {
          name: '派对 / 活动',
          description: '为派对、社交活动和特殊场合提供的迷人化妆服务。'
        },
        photoshoot: {
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
    contactPage: {
      text: '我们期待与您联系。无论是新娘造型咨询，还是眉部服务的简单询问，我们的团队随时为您服务。',
      location: '工作室地址',
      locationText: '7862 Warner Ave Ste A, Huntington Beach, CA, 美国加利福尼亚州',
      dm: '私信我们预留名额',
      dmText: 'lecharme.beauteboutique@gmail.com',
    },
    aboutPage: {
      title: '我们的故事',
      subtitle: '美丽与艺术的殿堂。',
      storyTitle: '当激情遇上完美',
      storyText: 'lecharmebeauteboutique 成立于 2020 年，其愿景很简单：创造一个让每位客户都感觉自己最美丽的空间。我们将传统技术与现代艺术相结合，提供卓越的效果。',
      philosophyTitle: '我们的理念',
      philosophyText: '我们相信真正的美在于细节。无论是精准的眉部纹绣、完美的指甲色调，还是捕捉稍纵即逝的爱情时刻，我们都致力于追求完美。',
      teamTitle: '认识我们的艺术家',
      teamMembers: [
        {
          name: 'Avy Nguyen',
          role: '创始人 & 首席艺术家',
          bio: '拥有超过10年的美容行业经验，Avy Nguyen 专攻新娘和时尚杂志化妆，展现每位客户独特的美。'
        },
        {
          name: 'Tien Truong',
          role: '高级化妆师',
          bio: 'Tien Truong 为任何场合打造无瑕、持久的妆容。她对细节的关注确保您从每个角度看起来都完美无瑕。'
        },
        {
          name: 'Hannah Nguyen',
          role: '发型师',
          bio: '现代和经典发型的大师，Hannah 可以打造完美的发髻或卷发，搭配您的妆容并完善您的造型。'
        },
        {
          name: 'Vick Nguyen',
          role: '化妆师',
          bio: 'Vick 用艺术的眼光捕捉瞬间。她轻松的方式让客户感到自在，从而拍出自然、美丽的肖像。'
        },
        {
          name: 'Yani Truong',
          role: '化妆师',
          bio: 'Yani 用艺术的眼光捕捉瞬间。她轻松的方式让客户感到自在，从而拍出自然、美丽的肖像。'
        }, {
          name: 'Nhi Nguyen',
          role: '化妆师',
          bio: 'Nhi 用艺术的眼光捕捉瞬间。她轻松的方式让客户感到自在，从而拍出自然、美丽的肖像。'
        }
      ],
      text: '自 2020 年成立以来，lecharmebeauteboutique 的愿景很简单：创建一个让每位客户都感觉自己最美丽的空间。我们将传统技术与现代艺术相结合，提供卓越的效果。'
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
      browseHint: '请浏览我们的服务以将项目添加到您的购物车。',
      subtotal: '小计',
      total: '总计',
      proceed: '结账',
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
      emptyRedirect: '您的购物车是空的。请先选择服务。',
      address: '需要化妆的地点',
      phone: '电话号码',
      travelfee: '便利费',
      travelmethod1: '在 Le\'Charme Beauté 工作室',
      travelmethod2: '前往您的地点',
      travelmethod3: '州外'
    },
    services: {
      'photoshoot-combo': {
        name: '摄影 / 舞台组合',
        description: '专为相机和舞台灯光设计。包括持久、高清化妆、高级轮廓和高光、眼部定义以及根据您的概念量身定制的专业发型设计。 \n ✔ 高端化妆产品 \n ✔ 包含所有类型的假睫毛'
      },
      'premium-combo': {
        name: '高级组合',
        description: '包括皮肤清洁、打底、粉底、眼妆、轮廓和腮红、眉毛和口红，使用中档化妆产品。 \n ✔ 包含自然款假睫毛 \n ✔ 发型设计：简单的卷发或直发（任选）'
      },
      'premium-makeup': {
        name: '仅高级化妆',
        description: '使用中档产品的专业化妆服务。 \n ✔ 包含自然款假睫毛。'
      },
      'premium-hair': {
        name: '仅高级发型',
        description: '适合您活动的简单卷发或直发。'
      },
      'deluxe-combo': {
        name: '豪华组合',
        description: '包括皮肤清洁、爽肤水、精华液、保湿、打底、粉底、眼妆、全脸轮廓、腮红、散粉、高光和口红，使用高端化妆产品。 \n ✔ 包含所有类型的假睫毛 \n ✔ 发型设计：您选择的任何款式'
      },
      'deluxe-makeup': {
        name: '仅豪华化妆',
        description: '使用高端产品的全面呵护化妆流程。 \n ✔ 包含所有类型的假睫毛。'
      },
      'deluxe-hair': {
        name: '仅豪华发型',
        description: '为您特殊场合设计的任何发型。'
      },
      'bridal-1': {
        name: '新娘化妆和发型（1次）',
        description: '为您典礼或招待会打造的完整新娘造型。'
      },
      'bridal-2': {
        name: '新娘化妆和2次发型更换',
        description: '1次早晨化妆和发型 + 1次补妆 & 1次发型更换。'
      },
      'bridal-3': {
        name: '新娘化妆和发型 + 造型更换',
        description: '早晚化妆和发型更换，让您全天保持完美。'
      },
      'bridal-4': {
        name: '新娘全天服务',
        description: '化妆师将全天陪同新娘，并根据需要调整妆容和发型，直到晚宴结束。 \n🎁 赠送免费美甲'
      },
      'wedding-guest-combo': {
        name: '婚礼嘉宾化妆和发型',
        description: '适合妈妈、亲戚、伴娘等。'
      },
      'wedding-guest-makeup': {
        name: '仅婚礼嘉宾化妆',
        description: '为婚礼嘉宾提供的专业化妆。'
      },
      'wedding-guest-hair': {
        name: '仅婚礼嘉宾发型',
        description: '为婚礼嘉宾提供的专业发型设计。'
      },
      'groom-combo': {
        name: '新郎化妆和发型',
        description: '为新郎提供的仪容整理服务。'
      },
      'groom-makeup': {
        name: '仅新郎化妆',
        description: '为新郎提供的化妆整理。'
      },
      'bridal-trial': {
        name: '新娘试妆 / 婚纱照拍摄',
        description: '4–6小时尝试不同的造型和风格。非常适合婚纱照拍摄或寻找您的婚礼当天造型。'
      },
      'class-private': {
        name: '1:1 私人化妆课',
        description: '3天，每天3小时。时间灵活。 \n✔ 包括护肤和化妆产品\n✔ 专业刷具套装、刷具包、美妆蛋和迷你美妆人像拍摄。'
      },
      'class-group': {
        name: '小组化妆课（4名学生）',
        description: '3天，每天3小时。周末举行（周五-周日）。 \n✔ 包括护肤和化妆产品\n✔ 专业刷具套装\n✔ 刷具包\n✔ 美妆蛋\n✔ 迷你美妆人像拍摄。'
      },
      'convenience': {
        name: '便利费',
        description: '所有需要出行的预约均需支付出行和便利费，起价$50+（根据距离我们地点的远近决定）。\n✔ 每个化妆师均需支付此费用。'
      },
      'bridal-airbrush': {
        name: '新娘喷枪产品',
        description: '新娘喷枪产品是专为打造完美、持久的新娘妆容而设计的专业级化妆解决方案。\n ✔ 采用轻盈、透气的配方，提供光滑、自然的遮瑕效果，拍照效果极佳，全天保持清新。',
      },
      'event-airbrush': {
        name: '活动/派对喷枪产品',
        description: '专为特殊活动和派对打造完美、持久妆容的专业化妆产品。\n ✔ 轻盈顺滑，提供均匀的遮瑕效果和光彩照人的妆效，在灯光、高温和长时间佩戴下依然持久。',
      }
    },
    testimonials: {
      '1': {
        author: 'Ali Tufan',
        location: 'New York, USA',
        text: '我非常喜欢我在这家精品店购买的产品！质量非常好，我的皮肤从未像现在这样好。包装也很漂亮，每次使用都感觉奢华。强烈推荐！'
      },
      '2': {
        author: 'Jessica M.',
        location: 'Los Angeles, CA',
        text: '绝妙的体验！Sarah为我做了新娘妆，我感觉像公主一样。细节处理得令人难以置信，妆容持续了一整晚。'
      },
      '3': {
        author: 'Michael T.',
        location: 'Chicago, IL',
        text: 'David完美地捕捉了我们的婚礼。每张照片都在讲述一个故事。我们非常感激这些我们将永远珍藏的回忆。'
      },
      '4': {
        author: 'Emily R.',
        location: 'Miami, FL',
        text: '我也收到过的最好的护肤建议。我的肤色焕发光彩，我感觉更加自信了。谢谢Lumière！'
      }
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
      title: '모든 디테일에 담긴 아름다움',
      subtitle: '프리미엄 메이크업, 메이크업 클래스 & 사진 촬영',
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
        party: {
          name: '메이크업',
          description: '일상적인 자연스러운 메이크업부터 화려한 신부 메이크업까지 모든 경우를 위한 전문 메이크업 아티스트리.'
        },
        bridal: {
          name: '신부',
          description: '고전적인 디자인부터 현대적인 디자인까지, 우리의 웨딩드레스는 디테일, 품질 및 우아함에 대한 안목으로 선택되었습니다. 모든 신부가 자신의 독특한 스타일과 사랑 이야기를 반영하는 완벽한 가운을 찾도록 돕습니다.'
        },
        partyEvent: {
          name: '파티 / 이벤트',
          description: '파티, 사교 행사 및 특별한 날을 위한 화려한 메이크업 서비스.'
        },
        photoshoot: {
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
    contactPage: {
      text: '고객님의 연락을 기다립니다. 웨딩 상담이든 눈썹 시술에 대한 간단한 문의든, 저희 팀이 언제든 도와드릴 준비가 되어 있습니다.',
      location: '스튜디오 위치',
      locationText: '7862 Warner Ave Ste A, Huntington Beach, CA, 미국, 캘리포니아',
      dm: '예약을 위해 DM을 보내주세요',
      dmText: 'lecharme.beauteboutique@gmail.com',
    },
    aboutPage: {
      title: '우리의 이야기',
      subtitle: '아름다움과 예술의 안식처.',
      storyTitle: '열정이 완벽을 만날 때',
      storyText: '2020년에 설립된 lecharmebeauteboutique은 모든 고객이 자신의 가장 아름다운 모습을 발견할 수 있는 공간을 만들겠다는 단순한 비전으로 시작했습니다. 우리는 전통적인 기술과 현대적인 예술성을 결합하여 탁월한 결과를 제공합니다.',
      philosophyTitle: '우리의 철학',
      philosophyText: '우리는 진정한 아름다움이 디테일에 있다고 믿습니다. 정교한 눈썹 문신, 완벽한 매니큐어 색조, 찰나의 사랑을 포착하는 것까지, 우리는 완벽을 위해 헌신합니다.',
      teamTitle: '아티스트 소개',
      teamMembers: [
        {
          name: 'Avy Nguyen',
          role: '설립자 & 마스터 아티스트',
          bio: '뷰티 업계에서 10년 이상의 경력을 가진 Avy Nguyen은 신부 및 화보 메이크업을 전문으로 하며 각 고객의 고유한 아름다움을 이끌어냅니다.'
        },
        {
          name: 'Tien Truong',
          role: '수석 메이크업 아티스트',
          bio: 'Tien Truong은 모든 경우에 완벽하고 오래 지속되는 룩을 만듭니다. 디테일에 대한 그녀의 관심은 당신이 어떤 각도에서도 완벽해 보이도록 보장합니다.'
        },
        {
          name: 'Hannah Nguyen',
          role: '헤어 스타일리스트',
          bio: '현대적이고 클래식한 헤어스타일의 장인인 Hannah는 메이크업을 보완하고 룩을 완성하는 완벽한 업두나 웨이브를 연출할 수 있습니다.'
        },
        {
          name: 'Vick Nguyen',
          role: '메이크업 아티스트',
          bio: 'Vick은 예술적인 눈으로 순간을 포착합니다. 그녀의 편안한 접근 방식은 고객을 편안하게 만들어 자연스럽고 아름다운 인물 사진을 완성합니다.'
        },
        {
          name: 'Yani Truong',
          role: '메이크업 아티스트',
          bio: 'Yani는 예술적인 눈으로 순간을 포착합니다. 그녀의 편안한 접근 방식은 고객을 편안하게 만들어 자연스럽고 아름다운 인물 사진을 완성합니다.'
        }, {
          name: 'Nhi Nguyen',
          role: '메이크업 아티스트',
          bio: 'Nhi는 예술적인 눈으로 순간을 포착합니다. 그녀의 편안한 접근 방식은 고객을 편안하게 만들어 자연스럽고 아름다운 인물 사진을 완성합니다.'
        }
      ],
      text: '2020년에 설립된 lecharmebeauteboutique은 모든 고객이 자신의 가장 아름다운 모습을 발견할 수 있는 공간을 만들겠다는 단순한 비전으로 시작했습니다. 우리는 전통적인 기술과 현대적인 예술성을 결합하여 탁월한 결과를 제공합니다.'
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
      browseHint: '장바구니에 아이템을 추가하려면 서비스를 둘러보세요.',
      subtotal: '소계',
      total: '합계',
      proceed: '결제',
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
      emptyRedirect: '장바구니가 비어 있습니다. 서비스를 먼저 선택해주세요.',
      address: '메이크업이 필요한 장소',
      phone: '전화번호',
      travelfee: '편의 옵션',
      travelmethod1: 'Le\'Charme Beauté 스튜디오',
      travelmethod2: '고객님 댁으로 이동',
      travelmethod3: '주외'
    },
    services: {
      'photoshoot-combo': {
        name: '화보 / 무대 콤보',
        description: '카메라 및 무대 조명을 위해 설계되었습니다. 롱래스팅, HD 준비 메이크업, 고급 컨투어링 & 하이라이팅, 눈매 교정, 컨셉에 맞춘 전문 헤어 스타일링이 포함됩니다. \n ✔ 최고급 메이크업 제품 사용 \n ✔ 모든 종류의 속눈썹 포함'
      },
      'premium-combo': {
        name: '프리미엄 콤보',
        description: '피부 클렌징, 프라이밍, 파운데이션, 아이 메이크업, 컨투어링 & 블러쉬, 눈썹 & 립스틱이 포함되며 중급 메이크업 제품을 사용합니다. \n ✔ 자연스러운 속눈썹 포함 \n ✔ 헤어 스타일링: 간단한 컬 또는 스트레이트 (선택 가능)'
      },
      'premium-makeup': {
        name: '프리미엄 메이크업',
        description: '중급 제품을 사용하는 전문 메이크업 서비스. \n ✔ 자연스러운 속눈썹 포함.'
      },
      'premium-hair': {
        name: '프리미엄 헤어',
        description: '행사에 맞춘 간단한 컬 또는 스트레이트 헤어.'
      },
      'deluxe-combo': {
        name: '디럭스 콤보',
        description: '피부 클렌징, 토너, 세럼, 보습, 프라이밍, 파운데이션, 아이 메이크업, 풀 페이스 컨투어링, 블러쉬, 파우더, 하이라이트 & 립스틱이 포함되며 최고급 메이크업 제품을 사용합니다. \n ✔ 모든 종류의 속눈썹 포함 \n ✔ 헤어 스타일링: 원하시는 모든 스타일'
      },
      'deluxe-makeup': {
        name: '디럭스 메이크업',
        description: '최고급 제품을 사용하는 풀 케어 메이크업 세션. \n ✔ 모든 종류의 속눈썹 포함.'
      },
      'deluxe-hair': {
        name: '디럭스 헤어',
        description: '특별한 날을 위해 원하시는 모든 헤어스타일.'
      },
      'bridal-1': {
        name: '신부 메이크업 & 헤어 (1회)',
        description: '결혼식이나 피로연을 위한 완벽한 신부 룩.'
      },
      'bridal-2': {
        name: '신부 메이크업 & 헤어 2회',
        description: '오전 메이크업 & 헤어 1회 + 터치업 1회 & 헤어 변경 1회.'
      },
      'bridal-3': {
        name: '신부 메이크업 & 헤어 + 레이아웃 변경',
        description: '하루 종일 완벽함을 유지하기 위한 오전 & 저녁 메이크업 및 헤어 변경.'
      },
      'bridal-4': {
        name: '신부 올데이 서비스',
        description: '메이크업 아티스트가 하루 종일 신부님과 동행하며 저녁 예식이 끝날 때까지 필요에 따라 메이크업 & 헤어를 수정해 드립니다. \n🎁 무료 매니큐어 포함'
      },
      'wedding-guest-combo': {
        name: '하객 메이크업 & 헤어',
        description: '어머니, 친척, 신부 들러리 등을 위한 서비스.'
      },
      'wedding-guest-makeup': {
        name: '하객 메이크업',
        description: '결혼식 하객을 위한 전문 메이크업.'
      },
      'wedding-guest-hair': {
        name: '하객 헤어',
        description: '결혼식 하객을 위한 전문 헤어 스타일링.'
      },
      'groom-combo': {
        name: '신랑 메이크업 & 헤어',
        description: '신랑님을 위한 그루밍 서비스.'
      },
      'groom-makeup': {
        name: '신랑 메이크업',
        description: '신랑님을 위한 메이크업 그루밍.'
      },
      'bridal-trial': {
        name: '신부 리허설 / 웨딩 촬영',
        description: '4–6시간 동안 다양한 룩과 스타일 시도. 웨딩 촬영이나 본식 스타일을 찾는 데 완벽합니다.'
      },
      'class-private': {
        name: '1:1 프라이빗 메이크업 클래스',
        description: '3일, 하루 3시간. 날짜/시간 조정 가능. \n✔ 스킨케어 & 메이크업 제품 포함\n✔ 전문가용 브러쉬 세트, 브러쉬 케이스, 뷰티 블렌더, 미니 뷰티 포트레이트 촬영 포함.'
      },
      'class-group': {
        name: '그룹 메이크업 클래스 (4명)',
        description: '3일, 하루 3시간. 주말 진행 (금-일). \n✔ 스킨케어 & 메이크업 제품 포함\n✔ 전문가용 브러쉬 세트\n✔ 브러쉬 케이스\n✔ 뷰티 블렌더\n✔ 미니 뷰티 포트레이트 촬영 포함.'
      },
      'convenience': {
        name: '출장비',
        description: '출장이 필요한 모든 예약에는 출장 및 편의 비용이 적용되며, $50+부터 시작합니다 (저희 위치로부터의 거리에 따라 결정됨).\n✔ 메이크업 아티스트당 비용이 적용됩니다.'
      },
      'bridal-airbrush': {
        name: '신부 에어브러시 제품',
        description: '신부 에어브러시 제품은 결점 없고 오래 지속되는 신부 룩을 위해 설계된 전문가급 메이크업 솔루션입니다.\n ✔ 가볍고 통기성이 좋은 포뮬러로 매끄럽고 자연스러운 커버력을 제공하여 사진이 아름답게 나오며 하루 종일 상쾌함을 유지합니다.',
      },
      'event-airbrush': {
        name: '이벤트/파티 에어브러시 제품',
        description: '특별한 행사와 파티에서 결점 없고 오래 지속되는 룩을 위해 설계된 전문 메이크업 제품입니다.\n ✔ 가볍고 매끄러워 조명, 열, 장시간 착용에도 견디는 빛나는 마무리의 균일한 커버력을 제공합니다.',
      }
    },
    testimonials: {
      '1': {
        author: 'Ali Tufan',
        location: 'New York, USA',
        text: '이 부티크에서 구매한 제품들이 정말 마음에 듭니다! 품질이 탁월하고 제 피부가 이렇게 좋아 보인 적이 없었습니다. 패키지도 아름다워서 사용할 때마다 럭셔리한 경험을 선사합니다. 강력 추천합니다!'
      },
      '2': {
        author: 'Jessica M.',
        location: 'Los Angeles, CA',
        text: '정말 놀라운 경험이었습니다! Sarah가 제 신부 메이크업을 해 주었고 저는 공주가 된 기분이었습니다. 디테일에 대한 관심이 놀라웠고 룩이 밤새 지속되었습니다.'
      },
      '3': {
        author: 'Michael T.',
        location: 'Chicago, IL',
        text: 'David는 우리 결혼식을 완벽하게 담아냈습니다. 모든 사진이 이야기를 담고 있습니다. 영원히 간직할 이러한 추억에 대해 정말 감사드립니다.'
      },
      '4': {
        author: 'Emily R.',
        location: 'Miami, FL',
        text: '제가 받아본 최고의 스킨케어 조언입니다. 제 안색이 빛나고 훨씬 더 자신감이 생겼습니다. 감사합니다 Lumière!'
      }
    },
    footer: {
      rights: 'All rights reserved.'
    }
  },
  [Language.ES]: {
    nav: {
      home: 'Inicio',
      about: 'Nosotros',
      services: 'Servicios',
      gallery: 'Galería',
      contact: 'Contacto',
      booking: 'RESERVAR',
      admin: 'Admin'
    },
    hero: {
      title: 'Belleza en Cada Detalle',
      subtitle: 'Maquillaje Premium, Clases de Maquillaje y Fotografía',
      cta: 'Reservar Cita'
    },
    homepage: {
      statistics: {
        clients: 'Clientes Felices',
        rating: 'Calificación',
        years: 'Años de Exp.',
        awards: 'Premios'
      },
      sections: {
        ourServices: 'Nuestros Servicios',
        ourServicesDesc: 'Descubra nuestra gama completa de servicios de belleza y bodas, elaborados a la perfección por nuestro equipo de expertos.',
        featuredServices: 'Servicios Destacados',
        featuredServicesDesc: 'Nuestros servicios más populares, en los que confían miles de clientes satisfechos.',
        whyChooseUs: 'Por Qué Elegirnos',
        whyChooseUsDesc: 'Excelencia en cada detalle, cuidado en cada servicio.',
        howItWorks: 'Cómo Funciona',
        howItWorksDesc: 'Su viaje de belleza, simplificado en cuatro sencillos pasos.',
        clientReviews: 'Reseñas de Clientes',
        clientReviewsDesc: 'No solo confíe en nuestra palabra: escuche a nuestros clientes satisfechos.'
      },
      categories: {
        party: {
          name: 'Maquillaje',
          description: 'Arte de maquillaje profesional para cada ocasión, desde lo natural diario hasta el glamour nupcial.'
        },
        bridal: {
          name: 'Novia',
          description: 'Desde diseños clásicos hasta modernos, nuestros vestidos de novia se eligen con un ojo para el detalle, la calidad y la elegancia, ayudando a cada novia a encontrar el vestido perfecto que refleje su estilo único y su historia de amor.'
        },
        partyEvent: {
          name: 'Fiesta / Evento',
          description: 'Servicios de maquillaje glamoroso para fiestas, eventos sociales y ocasiones especiales.'
        },
        photoshoot: {
          name: 'Fotografía',
          description: 'Capture sus momentos especiales con nuestros servicios profesionales de fotografía de bodas y retratos.'
        }
      },
      features: {
        quality: {
          title: 'Calidad Premium',
          description: 'Solo utilizamos los mejores productos y las últimas técnicas para garantizar resultados excepcionales en todo momento.'
        },
        experts: {
          title: 'Equipo Experto',
          description: 'Nuestros profesionales certificados aportan años de experiencia y pasión a cada servicio.'
        },
        hygiene: {
          title: 'Higiene Primero',
          description: 'Protocolos estrictos de desinfección y equipos de grado médico para su seguridad y comodidad.'
        },
        personalized: {
          title: 'Cuidado Personalizado',
          description: 'Cada cliente recibe atención individual y soluciones personalizadas para sus necesidades únicas.'
        }
      },
      process: {
        step1: {
          title: 'Reserva en Línea',
          description: 'Elija su servicio y fecha/hora preferida a través de nuestro sencillo sistema de reservas.'
        },
        step2: {
          title: 'Consulta',
          description: 'Reúnase con nuestros expertos para discutir su visión y personalizar su servicio.'
        },
        step3: {
          title: 'Experiencia',
          description: 'Relájese y disfrute de su servicio en nuestro ambiente cómodo y lujoso.'
        },
        step4: {
          title: 'Seguimiento',
          description: 'Reciba instrucciones de cuidado posterior y programe citas de seguimiento si es necesario.'
        }
      },
      cta: {
        title: '¿Listo para Transformar tu Look?',
        subtitle: 'Reserve su cita hoy y experimente la diferencia',
        button: 'Empezar'
      },
      buttons: {
        explore: 'Explorar',
        learnMore: 'Saber Más',
        viewAll: 'Ver Todos los Servicios',
        addToCart: 'Añadir al Carrito'
      }
    },
    contactPage: {
      text: "Nos encantaría saber de usted. Ya sea para una consulta nupcial o una consulta rápida sobre nuestros servicios de cejas, nuestro equipo está listo para ayudar.",
      location: 'Ubicación del Estudio',
      locationText: '7862 Warner Ave Ste A, Huntington Beach, CA, Estados Unidos',
      dm: 'Envíenos un DM para reservar',
      dmText: 'lecharme.beauteboutique@gmail.com',
    },
    aboutPage: {
      title: 'Nuestra Historia',
      subtitle: 'Un santuario de belleza y arte.',
      storyTitle: 'Cuando la Pasión Encuentra la Perfección',
      storyText: 'Fundada en 2020, lecharmebeauteboutique comenzó con una visión simple: crear un espacio donde cada cliente se sienta su versión más hermosa. Combinamos técnicas tradicionales con arte moderno.',
      philosophyTitle: 'Nuestra Filosofía',
      philosophyText: 'Creemos que la verdadera belleza reside en los detalles. Ya sea el trazo preciso de un tatuaje de cejas, el tono perfecto de esmalte de uñas o capturar un momento fugaz de amor, estamos dedicados a la perfección.',
      teamTitle: 'Conoce a los Artistas',
      teamMembers: [
        {
          name: 'Avy Nguyen',
          role: 'Fundadora y Artista Principal',
          bio: 'Con más de 10 años de experiencia en la industria de la belleza, Avy Nguyen se especializa en maquillaje nupcial y editorial, resaltando la belleza única de cada cliente.'
        },
        {
          name: 'Tien Truong',
          role: 'Maquilladora Senior',
          bio: 'Tien Truong crea looks impecables y duraderos para cualquier ocasión. Su atención al detalle asegura que luzca perfecta desde cualquier ángulo.'
        },
        {
          name: 'Hannah Nguyen',
          role: 'Estilista de Cabello',
          bio: 'Maestra de peinados modernos y clásicos, Hannah puede crear el recogido u ondas perfectos para complementar su maquillaje y completar su look.'
        },
        {
          name: 'Vick Nguyen',
          role: 'Maquilladora',
          bio: 'Vick captura momentos con un ojo artístico. Su enfoque relajado hace que los clientes se sientan cómodos, resultando en hermosos retratos naturales.'
        },
        {
          name: 'Yani Truong',
          role: 'Maquilladora',
          bio: 'Yani captura momentos con un ojo artístico. Su enfoque relajado hace que los clientes se sientan cómodos, resultando en hermosos retratos naturales.'
        },
        {
          name: 'Nhi Nguyen',
          role: 'Maquilladora',
          bio: 'Nhi captura momentos con un ojo artístico. Su enfoque relajado hace que los clientes se sientan cómodos, resultando en hermosos retratos naturales.'
        }
      ],
      text: 'Fundada en 2020, lecharmebeauteboutique comenzó con una visión simple: crear un espacio donde cada cliente se sienta su versión más hermosa. Combinamos técnicas tradicionales con arte moderno.'
    },
    servicePage: {
      addToCart: 'Añadir al Carrito',
      added: 'Añadido'
    },
    serviceDetail: {
      back: 'Atrás',
      rating: 'calificación',
      perSession: 'por sesión',
      depositRequired: 'depósito',
      toSecureBooking: 'requerido para reservar',
      whatsIncluded: 'Qué está incluido',
      duration: 'Duración',
      bookingLabel: 'Reserva',
      advanceRequired: 'Reserva anticipada requerida',
      bookNow: 'Reservar Ahora',
      serviceDetails: 'Detalles del Servicio',
      importantInfo: 'Información Importante',
      importantInfoItems: {
        arrive: 'Por favor llegue 10 minutos antes de su cita',
        cancellation: 'Las cancelaciones requieren 24 horas de aviso',
        consultation: 'Consulta disponible antes de reservar',
        patchTest: 'Puede requerirse prueba de parche para ciertos servicios'
      },
      youMayLike: 'También te puede gustar',
      notFound: 'Servicio no encontrado',
      backToServices: 'Volver a Servicios',
      view: 'Ver',
      durationMakeup: '60-90 min',
      durationNails: '60-90 min',
      durationTattooing: '60-90 min',
      durationPhotography: '2-8 horas'
    },
    cart: {
      title: 'Tu Carrito',
      empty: 'Tu carrito está vacío.',
      browseHint: 'Por favor navega por nuestros servicios para añadir artículos a tu carrito.',
      subtotal: 'Subtotal',
      total: 'Total',
      proceed: 'Pagar',
      continue: 'Continuar Comprando',
      remove: 'Eliminar'
    },
    booking: {
      title: 'Pago',
      summary: 'Resumen del Pedido',
      items: 'artículos',
      selectDate: 'Seleccionar Fecha',
      selectTime: 'Seleccionar Hora',
      selectService: 'Seleccionar Servicio',
      name: 'Tu Nombre',
      email: 'Correo Electrónico',
      deposit: 'Pagar Depósito',
      confirm: 'Confirmar',
      success: '¡Reserva Confirmada!',
      emptyRedirect: 'Tu carrito está vacío. Por favor selecciona servicios primero.',
      address: 'Dirección donde necesitas tu maquillaje',
      phone: 'Número de teléfono',
      travelfee: 'Tarifa de conveniencia',
      travelmethod1: 'En el estudio Le\'Charme Beauté',
      travelmethod2: 'Viaje a tu ubicación',
      travelmethod3: 'Fuera del estado'
    },
    services: {
      'photoshoot-combo': {
        name: 'Combo Sesión de Fotos / Escenario',
        description: 'Diseñado para iluminación de cámara y escenario. Incluye maquillaje de larga duración, listo para HD, contorno e iluminador avanzados, definición de ojos y peinado profesional adaptado a su concepto. \n ✔ Productos de maquillaje de alta gama \n ✔ Todo tipo de pestañas postizas incluidas'
      },
      'premium-combo': {
        name: 'Combo Premium',
        description: 'Incluye limpieza de piel, prebase, base, maquillaje de ojos, contorno y rubor, cejas y lápiz labial usando productos de gama media. \n ✔ Pestañas postizas naturales incluidas \n ✔ Peinado: rizos simples o alisado (a su elección)'
      },
      'premium-makeup': {
        name: 'Solo Maquillaje Premium',
        description: 'Aplicación de maquillaje profesional con productos de gama media. \n ✔ Pestañas postizas naturales incluidas.'
      },
      'premium-hair': {
        name: 'Solo Peinado Premium',
        description: 'Rizos simples o alisado adaptados a su evento.'
      },
      'deluxe-combo': {
        name: 'Combo Deluxe',
        description: 'Incluye limpieza de piel, tónico, suero, hidratación, prebase, base, maquillaje de ojos, contorno facial completo, rubor, polvo, iluminador y lápiz labial usando productos de alta gama. \n ✔ Todo tipo de pestañas postizas incluidas \n ✔ Peinado: cualquier estilo de su elección'
      },
      'deluxe-makeup': {
        name: 'Solo Maquillaje Deluxe',
        description: 'Sesión de maquillaje completa con productos de alta gama. \n ✔ Todo tipo de pestañas postizas incluidas.'
      },
      'deluxe-hair': {
        name: 'Solo Peinado Deluxe',
        description: 'Cualquier peinado de su elección para su ocasión especial.'
      },
      'bridal-1': {
        name: 'Maquillaje y Peinado de Novia (1 vez)',
        description: 'Look nupcial completo para su ceremonia o recepción.'
      },
      'bridal-2': {
        name: 'Maquillaje de Novia y 2 Cambios de Peinado',
        description: '1 Maquillaje y Peinado por la mañana + 1 retoque y 1 cambio de peinado.'
      },
      'bridal-3': {
        name: 'Maquillaje y Peinado de Novia + Cambios de Look',
        description: 'Cambios de maquillaje y peinado por la mañana y noche para mantenerla perfecta todo el día.'
      },
      'bridal-4': {
        name: 'Servicio Nupcial de Todo el Día',
        description: 'El maquillador acompañará a la novia durante todo el día y ajustará el maquillaje y peinado según sea necesario hasta que termine la ceremonia de la noche. \n🎁 Manicura de cortesía incluida'
      },
      'wedding-guest-combo': {
        name: 'Maquillaje y Peinado de Invitado de Boda',
        description: 'Para mamás, familiares, damas de honor, etc.'
      },
      'wedding-guest-makeup': {
        name: 'Solo Maquillaje de Invitado',
        description: 'Maquillaje profesional para invitados de boda.'
      },
      'wedding-guest-hair': {
        name: 'Solo Peinado de Invitado',
        description: 'Peinado profesional para invitados de boda.'
      },
      'groom-combo': {
        name: 'Maquillaje y Peinado del Novio',
        description: 'Servicio de arreglo personal para el novio.'
      },
      'groom-makeup': {
        name: 'Solo Maquillaje del Novio',
        description: 'Arreglo de maquillaje para el novio.'
      },
      'bridal-trial': {
        name: 'Prueba de Novia / Sesión de Fotos Pre-Boda',
        description: '4–6 horas probando diferentes looks y estilos. Perfecto para fotos pre-boda o encontrar su look del día de la boda.'
      },
      'class-private': {
        name: 'Clase de Maquillaje Privada 1:1',
        description: '3 días, 3 horas por día. Fechas/horas flexibles. \n✔ Incluye productos de cuidado de la piel y maquillaje\n✔ Set de Brochas Profesionales, Estuche de Brochas, Beauty Blender y Mini Sesión de Fotos de Retrato de Belleza.'
      },
      'class-group': {
        name: 'Clase de Maquillaje en Grupo (4 estudiantes)',
        description: '3 días, 3 horas por día. Se lleva a cabo los fines de semana (Vie-Dom). \n✔ Incluye productos de cuidado de la piel y maquillaje\n✔ Set de Brochas Profesionales\n✔ Estuche de Brochas\n✔ Beauty Blender\n✔ Mini Sesión de Fotos de Retrato de Belleza.'
      },
      'convenience': {
        name: 'Tarifa de Conveniencia',
        description: 'Se aplica una tarifa de viaje y conveniencia a todas las citas que requieren viaje, comenzando en $50+ (determinado por la distancia desde nuestra ubicación).\n✔ Las tarifas se aplican por maquillador.'
      },
      'bridal-airbrush': {
        name: 'Productos de Aerógrafo para Novias',
        description: 'Los productos de aerógrafo para novias son soluciones de maquillaje de grado profesional diseñadas para looks de novia impecables y duraderos.\n ✔ Con una fórmula ligera y transpirable, proporcionan una cobertura suave y natural que fotografía maravillosamente y se mantiene fresca todo el día.',
      },
      'event-airbrush': {
        name: 'Productos de Aerógrafo para Eventos/Fiestas',
        description: 'Productos de maquillaje profesionales diseñados para looks impecables y duraderos en eventos especiales y fiestas.\n ✔ Ligeros y suaves, ofrecen una cobertura uniforme con un acabado radiante que resiste las luces, el calor y el uso prolongado.',
      }
    },
    testimonials: {
      '1': {
        author: 'Ali Tufan',
        location: 'Nueva York, EE. UU.',
        text: '¡Me encantan los productos que compré en esta boutique! La calidad es excepcional y mi piel nunca se ha visto mejor. El empaque también es hermoso, lo que lo convierte en una experiencia lujosa cada vez que los uso. ¡Muy recomendable!'
      },
      '2': {
        author: 'Jessica M.',
        location: 'Los Ángeles, CA',
        text: '¡Una experiencia absolutamente increíble! Sarah hizo mi maquillaje de novia y me sentí como una princesa. La atención al detalle fue increíble y el look duró toda la noche.'
      },
      '3': {
        author: 'Michael T.',
        location: 'Chicago, IL',
        text: 'David capturó nuestra boda perfectamente. Cada foto cuenta una historia. Estamos muy agradecidos por estos recuerdos que atesoraremos para siempre.'
      },
      '4': {
        author: 'Emily R.',
        location: 'Miami, FL',
        text: 'El mejor consejo de cuidado de la piel que he recibido. Mi cutis está radiante y me siento mucho más segura. ¡Gracias Lumière!'
      }
    },
    footer: {
      rights: 'Todos los derechos reservados.'
    }
  }
};
