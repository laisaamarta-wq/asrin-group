// All site copy and data, in Turkish (default), English and Russian.
// Facts come only from asringroup.net and blue-lagoon-village.vercel.app.
export const L = (tr, en, ru) => ({ tr, en, ru });
export const LANGS = ['tr', 'en', 'ru'];
export const LANG_META = {
  tr: { name: 'Türkçe', short: 'TR', locale: 'tr_TR', html: 'tr' },
  en: { name: 'English', short: 'EN', locale: 'en_GB', html: 'en' },
  ru: { name: 'Русский', short: 'RU', locale: 'ru_RU', html: 'ru' },
};

export const SITE = {
  url: 'https://www.asringroup.net',
  phone: '+90 539 261 39 95',
  phoneDisplay: '+90 (539) 261 39 95',
  phoneHref: 'tel:+905392613995',
  wa: '905392613995',
  email: 'info@asringroup.net',
  address: 'Pazarcı Mah. Uğur Mumcu Cad. Asrın Apt. 101/1, 07900 Gazipaşa / Antalya',
  addressShort: 'Pazarcı Mah. Uğur Mumcu Cad. Asrın Apt. 101/1',
  city: 'Gazipaşa / Antalya, Türkiye',
  mapQuery: 'Pazarcı Mahallesi Uğur Mumcu Caddesi Gazipaşa Antalya',
  blueLagoonSite: 'https://blue-lagoon-village.vercel.app/',
};

// Route slugs per language
export const ROUTES = {
  home: L('', '', ''),
  about: L('kurumsal', 'about', 'o-kompanii'),
  projects: L('projeler', 'projects', 'proekty'),
  gallery: L('galeri', 'gallery', 'galereya'),
  videos: L('videolar', 'videos', 'video'),
  news: L('haberler', 'news', 'novosti'),
  faq: L('sss', 'faq', 'voprosy'),
  contact: L('iletisim', 'contact', 'kontakty'),
};

export const UI = {
  skip: L('İçeriğe geç', 'Skip to content', 'Перейти к содержанию'),
  menu: L('Menü', 'Menu', 'Меню'),
  close: L('Kapat', 'Close', 'Закрыть'),
  lang: L('Dil', 'Language', 'Язык'),
  nav: {
    projects: L('Projeler', 'Projects', 'Проекты'),
    city: L('Asrin City', 'Asrin City', 'Asrin City'),
    lagoon: L('Blue Lagoon', 'Blue Lagoon', 'Blue Lagoon'),
    about: L('Kurumsal', 'About', 'О компании'),
    team: L('Kadromuz', 'Our team', 'Команда'),
    gallery: L('Galeri', 'Gallery', 'Галерея'),
    photos: L('Fotoğraflar', 'Photos', 'Фотографии'),
    videos: L('Videolar', 'Videos', 'Видео'),
    news: L('Haberler', 'News', 'Новости'),
    faq: L('Sıkça Sorulan Sorular', 'FAQ', 'Вопросы и ответы'),
    contact: L('İletişim', 'Contact', 'Контакты'),
    planned: L('Planlanan Projeler', 'Planned projects', 'Планируемые проекты'),
    building: L('Yapımda Olan Projeler', 'Under construction', 'Строящиеся проекты'),
    completed: L('Tamamlanan Projeler', 'Completed projects', 'Завершённые проекты'),
  },
  cta: {
    explore: L('Projeleri keşfedin', 'Explore our projects', 'Смотреть проекты'),
    contact: L('Bize ulaşın', 'Get in touch', 'Связаться с нами'),
    whatsapp: L('WhatsApp', 'WhatsApp', 'WhatsApp'),
    call: L('Ara', 'Call', 'Позвонить'),
    email: L('E-posta', 'Email', 'Почта'),
    inquire: L('Bilgi alın', 'Enquire', 'Узнать подробнее'),
    inquireProject: L('Bu proje hakkında bilgi alın', 'Enquire about this project', 'Узнать об этом проекте'),
    discover: L('Projeyi keşfedin', 'Discover the project', 'Подробнее о проекте'),
    allProjects: L('Tüm projeler', 'All projects', 'Все проекты'),
    allGallery: L('Tüm galeri', 'Full gallery', 'Вся галерея'),
    more: L('Devamı', 'Read more', 'Подробнее'),
    book: L('Konaklama rezervasyonu', 'Book a stay', 'Забронировать отдых'),
    back: L('Tüm projeler', 'All projects', 'Все проекты'),
    next: L('Sonraki proje', 'Next project', 'Следующий проект'),
    viewGallery: L('Galeriyi aç', 'Open gallery', 'Открыть галерею'),
    play: L('Videoyu oynat', 'Play film', 'Смотреть видео'),
    home: L('Ana sayfa', 'Home', 'Главная'),
  },
  scroll: L('Keşfedin', 'Scroll', 'Листайте'),
  status: {
    completed: L('Tamamlandı', 'Completed', 'Завершён'),
    operating: L('Hizmette', 'Open to guests', 'Принимает гостей'),
    building: L('Yapımda', 'Under construction', 'Строится'),
    planned: L('Planlanan', 'Planned', 'Планируется'),
  },
  labels: {
    location: L('Konum', 'Location', 'Расположение'),
    status: L('Durum', 'Status', 'Статус'),
    year: L('Teslim', 'Delivered', 'Сдан'),
    type: L('Tür', 'Type', 'Тип'),
    plot: L('Arsa', 'Plot', 'Участок'),
    units: L('Daire tipleri', 'Apartment types', 'Планировки'),
    amenities: L('Sosyal olanaklar', 'Shared amenities', 'Инфраструктура комплекса'),
    technical: L('Teknik özellikler', 'Technical features', 'Технические характеристики'),
    apartment: L('Daire özellikleri', 'Apartment features', 'Отделка и оснащение квартир'),
    distances: L('Mesafeler', 'Distances', 'Расстояния'),
    rooms: L('Odalar', 'Rooms', 'Номера'),
    rules: L('Ev kuralları', 'House rules', 'Правила проживания'),
    gallery: L('Galeri', 'Gallery', 'Галерея'),
    films: L('Filmler', 'Films', 'Видео'),
    photoCount: L('fotoğraf', 'photos', 'фото'),
  },
  enhanced: L(
    'Bazı fotoğraflarda ışık ve renk dijital olarak iyileştirilmiştir; mimari değiştirilmemiştir.',
    'Light and colour in some photographs have been digitally enhanced; the architecture is unchanged.',
    'Свет и цвет на некоторых фотографиях улучшены цифровой обработкой; архитектура не изменена.'
  ),
  rights: L('Tüm hakları saklıdır.', 'All rights reserved.', 'Все права защищены.'),
  tagline: L('Birlikte <em>daha ileriye.</em>', 'Together, <em>further ahead.</em>', 'Вместе — <em>дальше.</em>'),
  waText: L('Merhaba ASRIN GROUP, bilgi almak istiyorum.', 'Hello ASRIN GROUP, I would like some information.', 'Здравствуйте, ASRIN GROUP! Хотел(а) бы получить информацию.'),
  waProject: L('Merhaba ASRIN GROUP, {p} hakkında bilgi almak istiyorum.', 'Hello ASRIN GROUP, I would like information about {p}.', 'Здравствуйте, ASRIN GROUP! Хотел(а) бы узнать подробнее о проекте {p}.'),
};

export const FORM = {
  title: L('Talep formu', 'Enquiry form', 'Форма запроса'),
  name: L('Adınız Soyadınız', 'Your name', 'Ваше имя'),
  phone: L('Telefon', 'Phone', 'Телефон'),
  email: L('E-posta', 'Email', 'Эл. почта'),
  project: L('İlgilendiğiniz proje', 'Project of interest', 'Интересующий проект'),
  general: L('Genel bilgi', 'General enquiry', 'Общий вопрос'),
  message: L('Mesajınız', 'Your message', 'Ваше сообщение'),
  messagePh: L('Örneğin: 2+1 daire, deniz manzarası, bütçe…', 'For example: 2-bedroom flat, sea view, budget…', 'Например: квартира 2+1, вид на море, бюджет…'),
  via: L('Talebinizi nasıl gönderelim?', 'How should we send your enquiry?', 'Как отправить запрос?'),
  sendWa: L('WhatsApp ile gönder', 'Send via WhatsApp', 'Отправить в WhatsApp'),
  sendMail: L('E-posta ile gönder', 'Send by email', 'Отправить по почте'),
  note: L(
    'Gönder\'e bastığınızda mesajınız WhatsApp\'ta veya e-posta uygulamanızda hazır olarak açılır; son kontrolü siz yaparsınız.',
    'When you press send, your message opens ready-written in WhatsApp or your email app, so you can check it before it goes.',
    'После нажатия кнопки сообщение откроется готовым в WhatsApp или почтовом приложении — вы сможете проверить его перед отправкой.'
  ),
  required: L('Lütfen adınızı ve telefon ya da e-posta bilginizi girin.', 'Please add your name and a phone number or email.', 'Пожалуйста, укажите имя и телефон или e-mail.'),
  subject: L('Web sitesi talebi', 'Website enquiry', 'Запрос с сайта'),
  consent: L('Bilgilerim yalnızca bu talep için kullanılacaktır.', 'My details will only be used to answer this enquiry.', 'Мои данные будут использованы только для ответа на этот запрос.'),
};

// Projects. img keys refer to files in media-src (without extension).
export const PROJECTS = [
  {
    slug: 'asrin-city-gazipasa',
    name: 'Asrin City Gazipaşa',
    status: 'completed',
    year: null,
    flagship: true,
    cover: 'ac-hero', coverMobile: 'ac-hero-v',
    card: 'ac-hero',
    location: L('Gazipaşa, Antalya', 'Gazipaşa, Antalya', 'Газипаша, Анталья'),
    type: L('Konut kompleksi', 'Residential complex', 'Жилой комплекс'),
    short: L(
      'Havuzlu, peyzajlı bahçeli ve 4. kattan itibaren deniz manzaralı modern yaşam kompleksi.',
      'A modern residential complex with pool, landscaped gardens and sea views from the 4th floor up.',
      'Современный жилой комплекс с бассейном, ландшафтным садом и видом на море с 4-го этажа.'
    ),
    intro: L(
      'Deniz, güneş ve doğa manzarasıyla çevrili <strong>5.000 m² arsa</strong> üzerinde modern bir yaşam kompleksi. Yaklaşık 900 m² yapı alanı bulunan projede geri kalan alan yeşil alan ve parklara ayrıldı. <strong>4. kat ve üzerindeki daireler deniz manzaralıdır.</strong>',
      'A modern residential complex on a <strong>5,000 m² plot</strong> surrounded by sea, sun and nature. Around 900 m² of the site is built; the rest is given to green space and parks. <strong>Apartments from the 4th floor up enjoy sea views.</strong>',
      'Современный жилой комплекс на <strong>участке 5 000 м²</strong>, окружённом морем, солнцем и природой. Под застройку отведено около 900 м², остальное — зелёные зоны и парки. <strong>Из квартир начиная с 4-го этажа открывается вид на море.</strong>'
    ),
    gallery: ['ac-hero', 'ac-sunset-v', 'ac-sunset', 'ac-golden', 'ac-blue', 'ac-road', 'ac-lookup', 'ac-pool-gold', 'ac-topdown-gold', 'ac-vertical-gold', 'city-hero', 'city-dusk', 'city-detail', 'city-pool', 'city-topdown', 'city-drone-front', 'city-drone-pool', 'city-drone-road', 'city-palm'],
  },
  {
    slug: 'blue-lagoon-village',
    name: 'Blue Lagoon Village',
    status: 'operating',
    year: null,
    flagship: true,
    cover: 'bl-poster-hero', card: 'bl-pool-sunset',
    location: L('Koru Mah., Gazipaşa', 'Koru, Gazipaşa', 'Кору, Газипаша'),
    type: L('Butik konaklama · villalar', 'Boutique stay · villas', 'Бутик-отель · виллы'),
    short: L(
      'Yeşil bir yamaçta üç ev, yedi oda, denize bakan havuz ve 300 metre aşağıda kendi lagünü.',
      'Three houses on a green hillside, seven rooms, a pool above the sea and its own lagoon 300 m below.',
      'Три дома на зелёном склоне, семь номеров, бассейн над морем и своя лагуна в 300 метрах ниже.'
    ),
    intro: L(
      'Gazipaşa\'nın hemen dışında, muz teraslarıyla çevrili yeşil bir yamaçta üç krem rengi ev. <strong>Yedi oda, denizin üzerinde bir havuz</strong> ve 300 metre aşağıda kendine ait küçük bir lagün.',
      'Just outside Gazipaşa, three cream houses stand on a green hillside among banana terraces. <strong>Seven rooms, one pool above the sea</strong> and a small lagoon of its own, 300 m below.',
      'Сразу за Газипашей, на зелёном склоне среди банановых террас, стоят три светлых дома. <strong>Семь номеров, бассейн над морем</strong> и собственная маленькая лагуна в 300 метрах ниже.'
    ),
    gallery: ['bl-approach', 'bl-villas-aerial', 'bl-coast-aerial', 'bl-pool-sunset', 'bl-pool-sea', 'bl-villa-garden', 'bl-lagoon-topdown', 'bl-lagoon-stairs', 'bl-rock-view', 'bl-terrace-sunset', 'bl-retreat-terrace', 'bl-romantic-room', 'bl-room-sea-wide', 'bl-room-terrace-view', 'bl-room-view', 'bl-twin-room'],
  },
  {
    slug: 'asrin-town-15',
    name: 'Asrin Town 15',
    status: 'completed', year: '2020', date: '02.01.2020',
    cover: 'town15-main', card: 'town15-main',
    location: L('Gazipaşa, Antalya', 'Gazipaşa, Antalya', 'Газипаша, Анталья'),
    type: L('Konut kompleksi', 'Residential complex', 'Жилой комплекс'),
    short: L(
      'Yüzme havuzu, spor sahası ve çocuk oyun alanıyla çok bloklu konut kompleksi.',
      'A multi-block residential complex with swimming pool, sports court and children\'s playground.',
      'Жилой комплекс из нескольких корпусов с бассейном, спортивной площадкой и детской зоной.'
    ),
    intro: L(
      'Yüzme havuzu, spor sahası ve çocuk oyun alanıyla çevrili, cam balkonlu çok bloklu konut kompleksi. Proje 2 Ocak 2020\'de tamamlanarak teslim edildi.',
      'A multi-block residential complex with glass balconies, set around a swimming pool, a sports court and a children\'s playground. The project was completed on 2 January 2020.',
      'Жилой комплекс из нескольких корпусов со стеклянными балконами, бассейном, спортивной площадкой и детской зоной. Проект завершён 2 января 2020 года.'
    ),
    gallery: ['town15-main', 'town15-5', 'town15-2', 'town15-3', 'town15-1'],
  },
  {
    slug: 'special-villas',
    name: 'Special Villas',
    status: 'completed', year: null,
    cover: 'villa-pool', card: 'villa-main',
    location: L('Gazipaşa, Antalya', 'Gazipaşa, Antalya', 'Газипаша, Анталья'),
    type: L('Villalar', 'Villas', 'Виллы'),
    short: L(
      'Özel havuzlu, deniz manzaralı villalar.',
      'Villas with private pools and open sea views.',
      'Виллы с собственными бассейнами и видом на море.'
    ),
    intro: L(
      'Taş duvarlar, kemerli teraslar ve ferforje korkuluklarla Akdeniz karakterini taşıyan villalar. Özel havuzlardan açık denize uzanan manzara.',
      'Villas with a Mediterranean character — natural-stone walls, arched terraces and wrought-iron balustrades — and private pools that look straight out to the open sea.',
      'Виллы в средиземноморском характере — каменная кладка, арочные террасы, кованые ограждения — и собственные бассейны с видом на открытое море.'
    ),
    gallery: ['villa-pool', 'villa-main', 'villas-1', 'villas-3'],
  },
  {
    slug: 'asrin-10-11',
    name: 'Asrin 10-11',
    status: 'completed', year: '2017',
    cover: 'a1011-main', card: 'a1011-main',
    location: L('Gazipaşa, Antalya', 'Gazipaşa, Antalya', 'Газипаша, Анталья'),
    type: L('Konut ve ticari', 'Residential & commercial', 'Жилой дом с коммерцией'),
    short: L(
      'Yuvarlak balkonlu, zemin katı ticari alanlı konut binaları.',
      'Apartment buildings with rounded balconies and shops at street level.',
      'Жилые дома с полукруглыми балконами и магазинами на первом этаже.'
    ),
    intro: L(
      'Köşede yükselen yuvarlak balkonları ve zemin kattaki ticari alanlarıyla şehir hayatının içinde konut. 2017\'de tamamlandı.',
      'Homes at the heart of town life, with rounded corner balconies and shops on the ground floor. Completed in 2017.',
      'Жильё в гуще городской жизни: полукруглые угловые балконы и магазины на первом этаже. Завершён в 2017 году.'
    ),
    gallery: ['a1011-main', 'a1011-1', 'a1011-4'],
  },
  {
    slug: 'asrin-7-8',
    name: 'Asrin 7-8',
    status: 'completed', year: '2015',
    cover: 'a78-main', card: 'a78-main',
    location: L('Gazipaşa, Antalya', 'Gazipaşa, Antalya', 'Газипаша, Анталья'),
    type: L('Konut ve ticari', 'Residential & commercial', 'Жилой дом с коммерцией'),
    short: L(
      'Cam balkonlu, zemin katı mağazalı konut projesi.',
      'An apartment building with glass balconies and street-level shops.',
      'Жилой дом со стеклянными балконами и магазинами на первом этаже.'
    ),
    intro: L(
      'Cam korkuluklu balkonlar ve zemin kattaki mağazalarla günlük hayatın tam ortasında bir konut projesi. 2015\'te tamamlandı.',
      'An apartment building with glass-railed balconies and shops at street level, right in the middle of everyday life. Completed in 2015.',
      'Жилой дом со стеклянными ограждениями балконов и магазинами на первом этаже — в самом центре повседневной жизни. Завершён в 2015 году.'
    ),
    gallery: ['a78-main', 'a78-2'],
  },
];

export const CITY = {
  facts: [
    { v: '5.000 m²', l: L('arsa alanı', 'plot', 'участок') },
    { v: '≈ 900 m²', l: L('yapı alanı', 'built footprint', 'площадь застройки') },
    { v: L('4. kat +', '4th floor +', 'с 4-го этажа'), l: L('deniz manzarası', 'sea views', 'вид на море') },
    { v: '5 km', l: L('Gazipaşa Havalimanı', 'Gazipaşa Airport', 'аэропорт Газипаша') },
  ],
  units: [
    { k: '1+1', v: '50 m²', d: L('1 yatak odası + salon', '1 bedroom + living room', '1 спальня + гостиная') },
    { k: '2+1', v: '75–85 m²', d: L('2 yatak odası + salon', '2 bedrooms + living room', '2 спальни + гостиная') },
    { k: '3+1', v: '110–125 m²', d: L('3 yatak odası + salon', '3 bedrooms + living room', '3 спальни + гостиная') },
    { k: L('Penthouse', 'Penthouse', 'Пентхаус'), v: '180 m²', d: L('Çatı katı', 'Top-floor residence', 'Верхний этаж') },
  ],
  amenities: [
    ['pool', L('Büyük yüzme havuzu', 'Large swimming pool', 'Большой бассейн')],
    ['kids-pool', L('Çocuk havuzu', 'Children\'s pool', 'Детский бассейн')],
    ['court', L('Futbol ve basketbol sahası', 'Football & basketball court', 'Площадка для футбола и баскетбола')],
    ['parking', L('Kapalı otopark', 'Covered parking', 'Крытая парковка')],
    ['gym', L('Geniş fitness salonu', 'Large gym', 'Просторный фитнес-зал')],
    ['play', L('Çocuk oyun parkı', 'Children\'s playground', 'Детская игровая площадка')],
    ['gazebo', L('Kamelya alanları', 'Gazebo areas', 'Беседки')],
    ['gate', L('Güvenlikli giriş', 'Secured entrance', 'Охраняемый въезд')],
  ],
  technical: [
    L('Isı, ses ve su yalıtımı', 'Heat, sound and water insulation', 'Тепло-, звуко- и гидроизоляция'),
    L('İki adet geniş, modern asansör', 'Two large, modern lifts', 'Два просторных современных лифта'),
    L('Merkezi uydu sistemi', 'Central satellite system', 'Центральная спутниковая система'),
    L('7/24 kamera güvenlik sistemi', '24-hour CCTV security', 'Круглосуточное видеонаблюдение'),
  ],
  apartment: [
    L('Asma tavan', 'Suspended ceilings', 'Подвесные потолки'),
    L('Ebeveyn banyosu', 'En-suite master bathroom', 'Ванная при родительской спальне'),
    L('Laminat parke', 'Laminate parquet', 'Ламинированный паркет'),
    L('Doğalgaz altyapısı', 'Natural gas infrastructure', 'Подведённый природный газ'),
    L('Isı yalıtımlı PVC doğrama', 'Thermally insulated PVC windows', 'Тёплые ПВХ-окна'),
    L('Panjur', 'Roller shutters', 'Рольставни'),
    L('Lake mutfak dolapları', 'Lacquered kitchen cabinets', 'Лакированные кухонные фасады'),
    L('Vestiyer', 'Entrance wardrobe', 'Гардероб в прихожей'),
    L('Klima altyapısı', 'Air-conditioning infrastructure', 'Подготовка под кондиционеры'),
    L('Birinci sınıf seramik', 'First-class ceramics', 'Керамика первого класса'),
  ],
  distances: [
    { v: '5 km', l: L('Gazipaşa–Alanya Havalimanı', 'Gazipaşa–Alanya Airport', 'Аэропорт Газипаша–Аланья') },
    { v: '35 km', l: L('Alanya merkez', 'Central Alanya', 'Центр Аланьи') },
    { v: '180 km', l: L('Antalya', 'Antalya', 'Анталья') },
  ],
};

export const LAGOON = {
  tagline: L('Kara ile deniz arasında sakin bir yer.', 'A quiet place between land and sea.', 'Тихое место между землёй и морем.'),
  stats: [
    { v: '3', l: L('ev', 'houses', 'дома') },
    { v: '7', l: L('oda', 'rooms', 'номеров') },
    { v: '1', l: L('denize bakan havuz', 'pool above the sea', 'бассейн над морем') },
    { v: '300 m', l: L('lagüne', 'to the lagoon', 'до лагуны') },
  ],
  rooms: [
    { name: L('Romantik Çift Kişilik Oda', 'Romantic Double Room', 'Романтический номер'), img: 'bl-romantic-room', spec: L('30 m² · 2 kişi · jakuzi · deniz manzarası', '30 m² · for two · whirlpool bath · sea view', '30 м² · для двоих · джакузи · вид на море') },
    { name: L('Villa Garden', 'Villa Garden', 'Вилла Garden'), img: 'bl-room-sea-wide', spec: L('≈105 m² · 2 yatak odası · özel bahçe · 5 kişiye kadar', '≈105 m² · 2 bedrooms · private garden · up to 5 guests', '≈105 м² · 2 спальни · свой сад · до 5 гостей') },
    { name: L('Villa Terrace', 'Villa Terrace', 'Вилла Terrace'), img: 'bl-room-terrace-view', spec: L('≈135 m² · 3 yatak odası · deniz terası · 6 kişiye kadar', '≈135 m² · 3 bedrooms · sea terrace · up to 6 guests', '≈135 м² · 3 спальни · терраса у моря · до 6 гостей') },
  ],
  distances: [
    { v: '300 m', l: L('Lagün', 'The lagoon', 'Лагуна') },
    { v: '5–8 dk', vEn: '5–8 min', vRu: '5–8 мин', l: L('Mavi Lagün plajı (yürüyerek)', 'Mavi Lagün beach, on foot', 'Пляж Мави Лагюн пешком') },
    { v: '≈10 km', l: L('Gazipaşa–Alanya Havalimanı', 'Gazipaşa–Alanya Airport', 'Аэропорт Газипаша–Аланья') },
    { v: '≈50 dk', vEn: '≈50 min', vRu: '≈50 мин', l: L('Alanya', 'Alanya', 'Аланья') },
    { v: '180 km', l: L('Antalya', 'Antalya', 'Анталья') },
  ],
  rules: [
    L('Giriş 15:00\'ten itibaren', 'Check-in from 15:00', 'Заселение с 15:00'),
    L('Çıkış 10:30\'a kadar', 'Check-out by 10:30', 'Выезд до 10:30'),
    L('Yalnızca yetişkinler (18+)', 'Adults only (18+)', 'Только для взрослых (18+)'),
    L('Evcil hayvan kabul edilmez', 'No pets', 'Без домашних животных'),
  ],
  address: 'Kanal Yolu Sokak 326, Koru Mah., 07900 Gazipaşa / Antalya',
  yoga: L(
    'Denizin üzerindeki terasta yoga ve dinlenme. Küçük gruplar ve inziva programları için tarih sorarken bilgi verebilirsiniz.',
    'A terrace above the sea for yoga and rest. Small groups and retreats are welcome to mention it when asking about dates.',
    'Терраса над морем для йоги и отдыха. О небольших группах и ретритах можно сообщить при запросе дат.'
  ),
  films: [
    { id: 'hero', file: 'bl-hero', poster: 'bl-poster-hero', title: L('Kıyı', 'The coast', 'Побережье') },
    { id: 'villas', file: 'bl-villas', poster: 'bl-poster-villas', title: L('Villalar', 'The villas', 'Виллы') },
    { id: 'descend', file: 'bl-descend', poster: 'bl-poster-descend', title: L('Lagüne iniş', 'Down to the lagoon', 'Спуск к лагуне') },
    { id: 'sunset', file: 'bl-sunset', poster: 'bl-poster-sunset', title: L('Havuzda gün batımı', 'Sunset at the pool', 'Закат у бассейна') },
    { id: 'morning', file: 'bl-morning-window', poster: 'bl-poster-morning-window', title: L('Sabah', 'Morning', 'Утро') },
    { id: 'finale', file: 'bl-lagoon-finale', poster: 'bl-poster-lagoon-finale', title: L('Lagün', 'The lagoon', 'Лагуна') },
  ],
};

export const GAZIPASA = {
  title: L('Gazipaşa — <em>huzurlu bir Akdeniz cenneti.</em>', 'Gazipaşa — <em>a peaceful Mediterranean paradise.</em>', 'Газипаша — <em>спокойный средиземноморский рай.</em>'),
  body: L(
    'Antalya kıyısının doğu ucunda, <strong>kendi havalimanı</strong>, haftalık pazarı ve kayalıklardaki Roma kalıntılarıyla küçük bir sahil kasabası. Toros dağları ile deniz arasında, <strong>1999\'dan beri evimiz.</strong>',
    'A small town at the eastern end of the Antalya coast, with <strong>its own airport</strong>, a weekly market and Roman ruins on the cliffs. Between the Taurus mountains and the sea — <strong>our home since 1999.</strong>',
    'Небольшой город на восточной оконечности побережья Антальи — <strong>со своим аэропортом</strong>, еженедельным рынком и римскими руинами на скалах. Между горами Тавра и морем — <strong>наш дом с 1999 года.</strong>'
  ),
  album: ['gz-bay-sunset', 'gz-coves-sunset', 'gazipasa-coast', 'gazipasa-01', 'gazipasa-02', 'gazipasa-03', 'gazipasa-04', 'gazipasa-05', 'gazipasa-06', 'gazipasa-07', 'gazipasa-08', 'gazipasa-09'],
};

export const ABOUT = {
  eyebrow: L('ASRIN İNŞAAT', 'ASRIN İNŞAAT', 'ASRIN İNŞAAT'),
  statement: L(
    'Güvenin ve kalitenin adresi: 35 yıldır sağlam, estetik ve uzun ömürlü yaşam alanları inşa ediyoruz.',
    'The address of trust and quality: for 35 years we have built homes that are sound, beautiful and made to last.',
    'Адрес доверия и качества: 35 лет мы строим надёжное, красивое и долговечное жильё.'
  ),
  p1: L(
    'ASRIN İNŞAAT, 1990 yılında Hollanda\'da kuruldu ve 1999\'dan bu yana Türkiye\'nin gözde bölgelerinden Gazipaşa\'da faaliyet gösteriyor. Avrupa standartlarında hizmet, müşteri memnuniyeti ve güvenilirlik her projemizin temelidir.',
    'ASRIN İNŞAAT was founded in the Netherlands in 1990 and has been building in Gazipaşa, one of Turkey\'s most sought-after regions, since 1999. European-standard service, customer satisfaction and reliability are the foundation of every project.',
    'ASRIN İNŞAAT основана в Нидерландах в 1990 году и с 1999 года работает в Газипаше — одном из самых привлекательных регионов Турции. Сервис европейского уровня, внимание к клиенту и надёжность лежат в основе каждого нашего проекта.'
  ),
  p2: L(
    'Kuruluşumuzdan bu yana farklı ölçeklerde pek çok projeyi başarıyla tamamladık. Modern teknolojiyi deneyimli ve uzman kadromuzla birleştirerek konut, ticari yapı ve altyapı projeleri geliştiriyoruz; tüm çalışmalarımızda yüksek kalite standartları ve sürdürülebilirlik ilkeleri yol göstericimizdir.',
    'Since our founding we have completed many projects of every scale. Combining modern technology with an experienced team of specialists, we develop residential, commercial and infrastructure projects, guided throughout by high quality standards and the principles of sustainability.',
    'С момента основания мы успешно реализовали множество проектов разного масштаба. Соединяя современные технологии с опытом нашей команды специалистов, мы строим жилые, коммерческие и инфраструктурные объекты, неизменно придерживаясь высоких стандартов качества и принципов устойчивого развития.'
  ),
  p3: L(
    'Proje geliştirmeden anahtar teslimine kadar her aşamayı üstleniyor, kendi kalite standartlarımızı aşmayı hedefliyoruz. Amacımız; güvenilir, estetik ve içinde yaşamaktan keyif alınan mekânlar inşa etmek.',
    'We take on every stage, from project development to turnkey delivery, and aim to exceed our own quality standards. Our goal is to build reliable, beautiful places that people love to live in.',
    'Мы ведём проект на всех этапах — от разработки до сдачи «под ключ» — и стремимся превзойти собственные стандарты качества. Наша цель — строить надёжные и красивые дома, в которых приятно жить.'
  ),
  p4: L(
    'ASRIN İNŞAAT yalnızca yaşam alanları inşa etmiyor; <strong>yaşam standartlarını yükselterek kalıcı bir fark</strong> yaratmayı amaçlıyor.',
    'ASRIN İNŞAAT does not only build living spaces — it sets out to <strong>raise living standards and make a lasting difference</strong>.',
    'ASRIN İNŞAAT не просто строит дома — мы стремимся <strong>повышать качество жизни</strong> и оставлять долгий след.'
  ),
  teamTitle: L('Kadromuz', 'Our team', 'Наша команда'),
  teamBody: L(
    'Deneyimli ve uzman kadromuz, proje geliştirmeden anahtar teslimine kadar her aşamada yanınızda. Sektördeki yenilikleri yakından takip eden dinamik ve profesyonel ekibimiz, her projede birinci sınıf yapı kalitesinden ödün vermeden çalışır.',
    'Our experienced team of specialists is with you at every stage, from project development to turnkey delivery. Dynamic and professional, the team follows every innovation in the sector closely and never compromises on first-class construction quality.',
    'Наша опытная команда специалистов сопровождает вас на всех этапах — от разработки проекта до сдачи «под ключ». Динамичная и профессиональная, она внимательно следит за новшествами отрасли и не идёт на компромиссы в качестве строительства.'
  ),
};

export const STATS = [
  { n: 35, l: L('yıllık tecrübe', 'years of experience', 'лет опыта') },
  { n: 2568, l: L('mutlu müşteri', 'happy clients', 'довольных клиентов') },
  { n: 580, l: L('konut', 'homes built', 'построенных квартир и домов') },
  { n: 1999, l: L('yılından beri Gazipaşa\'da', 'in Gazipaşa since', 'год прихода в Газипашу'), plain: true },
];

export const PILLARS = [
  {
    t: L('Sağlamlık ilkesi', 'Soundness first', 'Прочность прежде всего'),
    d: L(
      'Tamamlanan ve planlanan tüm projelerimizde sağlamlık ve güvenilirlik temel ilkemizdir. Birinci sınıf yapı kalitesinden ödün vermeyiz.',
      'Soundness and reliability are the core principle of every project we complete or plan. We never compromise on first-class construction quality.',
      'Прочность и надёжность — главный принцип всех наших завершённых и будущих проектов. Мы не идём на компромиссы в качестве строительства.'
    ),
  },
  {
    t: L('Avrupa standartları', 'European standards', 'Европейские стандарты'),
    d: L(
      'Hollanda\'da başlayan yolculuğumuz hizmet anlayışımızı belirliyor: Avrupa standartlarında hizmet, müşteri memnuniyeti ve güvenilirlik.',
      'A journey that began in the Netherlands shapes how we work: European-standard service, customer satisfaction and reliability.',
      'Путь, начавшийся в Нидерландах, определяет наш подход: сервис европейского уровня, внимание к клиенту и надёжность.'
    ),
  },
  {
    t: L('Geleceğe yatırım', 'Built for tomorrow', 'С расчётом на будущее'),
    d: L(
      'Modern teknoloji ve sürdürülebilirlik ilkeleriyle bugünün ve geleceğin ihtiyaçlarına yenilikçi çözümler üretiyoruz.',
      'With modern technology and sustainability principles, we develop innovative answers to the needs of today and tomorrow.',
      'Современные технологии и принципы устойчивого развития помогают нам находить решения для сегодняшних и будущих потребностей.'
    ),
  },
];

export const PROCESS = [
  { t: L('Proje geliştirme', 'Project development', 'Разработка проекта'), d: L('Arsa, mimari ve izinler en baştan planlanır.', 'Land, architecture and permits are planned from the very start.', 'Участок, архитектура и разрешения продуманы с самого начала.') },
  { t: L('İnşaat', 'Construction', 'Строительство'), d: L('Malzeme ve işçilik her aşamada denetlenir.', 'Materials and workmanship are checked at every stage.', 'Материалы и работа проверяются на каждом этапе.') },
  { t: L('Anahtar teslim', 'Turnkey delivery', 'Сдача «под ключ»'), d: L('Yaşamaya hazır, tamamlanmış bir ev teslim alırsınız.', 'You receive a finished home, ready to live in.', 'Вы получаете готовый дом, в который можно сразу въехать.') },
];

export const MILESTONES = [
  { y: '1990', t: L('ASRIN İNŞAAT Hollanda\'da kuruldu', 'ASRIN İNŞAAT is founded in the Netherlands', 'ASRIN İNŞAAT основана в Нидерландах'), d: L('Avrupa standartlarında hizmet anlayışıyla yola çıkıldı.', 'The company sets out with a European-standard approach to service.', 'Компания начинает работу с европейским подходом к сервису.'), img: null },
  { y: '1999', t: L('Gazipaşa\'da faaliyete başladık', 'We begin building in Gazipaşa', 'Начало работы в Газипаше'), d: L('Antalya kıyısının doğusundaki Gazipaşa, ASRIN\'in yeni evi oldu.', 'Gazipaşa, on the eastern Antalya coast, becomes ASRIN\'s home.', 'Газипаша на востоке побережья Антальи становится домом ASRIN.'), img: 'gazipasa-coast' },
  { y: '2015', t: L('Asrin 7-8 tamamlandı', 'Asrin 7-8 completed', 'Завершён проект Asrin 7-8'), d: L('Zemin katı ticari alanlı konut projesi teslim edildi.', 'An apartment building with street-level shops is delivered.', 'Сдан жилой дом с магазинами на первом этаже.'), img: 'a78-main', p: 'asrin-7-8' },
  { y: '2017', t: L('Asrin 10-11 tamamlandı', 'Asrin 10-11 completed', 'Завершён проект Asrin 10-11'), d: L('Yuvarlak balkonlu konut binaları teslim edildi.', 'Apartment buildings with rounded balconies are delivered.', 'Сданы жилые дома с полукруглыми балконами.'), img: 'a1011-main', p: 'asrin-10-11' },
  { y: '2020', t: L('Asrin Town 15 tamamlandı', 'Asrin Town 15 completed', 'Завершён комплекс Asrin Town 15'), d: L('Havuzlu çok bloklu kompleks 2 Ocak 2020\'de teslim edildi.', 'The multi-block complex with pool is delivered on 2 January 2020.', 'Комплекс из нескольких корпусов с бассейном сдан 2 января 2020 года.'), img: 'town15-main', p: 'asrin-town-15' },
  { y: L('Bugün', 'Today', 'Сегодня'), t: L('Asrin City Gazipaşa tamamlandı', 'Asrin City Gazipaşa completed', 'Завершён комплекс Asrin City Gazipaşa'), d: L('5.000 m² arsa üzerinde havuzlu, deniz manzaralı yaşam kompleksi.', 'A residential complex with pool and sea views on a 5,000 m² plot.', 'Жилой комплекс с бассейном и видом на море на участке 5 000 м².'), img: 'city-dusk', p: 'asrin-city-gazipasa' },
];

export const FAQ = [
  {
    q: L('ASRIN GROUP projeleri nerede bulunuyor?', 'Where are ASRIN GROUP\'s projects?', 'Где находятся проекты ASRIN GROUP?'),
    a: L(
      'Projelerimiz Antalya\'nın Gazipaşa ilçesindedir. ASRIN İNŞAAT 1999\'dan bu yana Gazipaşa\'da faaliyet gösteriyor.',
      'Our projects are in Gazipaşa, in the province of Antalya. ASRIN İNŞAAT has been building in Gazipaşa since 1999.',
      'Наши проекты находятся в Газипаше, провинция Анталья. ASRIN İNŞAAT работает в Газипаше с 1999 года.'
    ),
  },
  {
    q: L('Asrin City\'de hangi daire tipleri var?', 'Which apartment types does Asrin City offer?', 'Какие планировки есть в Asrin City?'),
    a: L(
      '1+1 (50 m²), 2+1 (75–85 m²), 3+1 (110–125 m²) ve 180 m² penthouse seçenekleri bulunur. Güncel durum için bize ulaşın.',
      '1+1 (50 m²), 2+1 (75–85 m²), 3+1 (110–125 m²) and a 180 m² penthouse. Contact us for current availability.',
      '1+1 (50 м²), 2+1 (75–85 м²), 3+1 (110–125 м²) и пентхаус 180 м². Актуальное наличие уточняйте у нас.'
    ),
  },
  {
    q: L('Asrin City\'de hangi sosyal olanaklar var?', 'What amenities does Asrin City have?', 'Какая инфраструктура в Asrin City?'),
    a: L(
      'Büyük yüzme havuzu, çocuk havuzu, futbol ve basketbol sahası, kapalı otopark, geniş fitness salonu, çocuk oyun parkı, kamelya alanları ve güvenlikli giriş.',
      'A large swimming pool, a children\'s pool, a football and basketball court, covered parking, a large gym, a children\'s playground, gazebo areas and a secured entrance.',
      'Большой бассейн, детский бассейн, площадка для футбола и баскетбола, крытая парковка, просторный фитнес-зал, детская игровая площадка, беседки и охраняемый въезд.'
    ),
  },
  {
    q: L('Hangi dairelerden deniz görülüyor?', 'Which apartments have sea views?', 'Из каких квартир видно море?'),
    a: L(
      'Asrin City\'de 4. kat ve üzerindeki daireler deniz manzaralıdır.',
      'At Asrin City, apartments on the 4th floor and above have sea views.',
      'В Asrin City вид на море открывается из квартир начиная с 4-го этажа.'
    ),
  },
  {
    q: L('Asrin City havalimanına ve Alanya\'ya ne kadar uzak?', 'How far is Asrin City from the airport and Alanya?', 'Как далеко Asrin City от аэропорта и Аланьи?'),
    a: L(
      'Gazipaşa–Alanya Havalimanı\'na 5 km, Alanya merkeze 35 km, Antalya\'ya 180 km uzaklıktadır.',
      'It is 5 km from Gazipaşa–Alanya Airport, 35 km from central Alanya and 180 km from Antalya.',
      '5 км до аэропорта Газипаша–Аланья, 35 км до центра Аланьи и 180 км до Антальи.'
    ),
  },
  {
    q: L('Hangi hizmetleri sunuyorsunuz?', 'What services do you offer?', 'Какие услуги вы предлагаете?'),
    a: L(
      'Proje geliştirmeden anahtar teslimine kadar her aşamayı üstleniyoruz. Konut, ticari yapı ve altyapı projeleri geliştiriyoruz.',
      'We handle every stage, from project development to turnkey delivery, across residential, commercial and infrastructure projects.',
      'Мы ведём проекты на всех этапах — от разработки до сдачи «под ключ»: жилые, коммерческие и инфраструктурные объекты.'
    ),
  },
  {
    q: L('Projeleri yerinde görebilir miyim?', 'Can I see a project in person?', 'Можно ли посмотреть объект вживую?'),
    a: L(
      'Bize telefon, WhatsApp veya e-posta ile ulaşarak görüşme ve ziyaret planlayabilirsiniz: +90 (539) 261 39 95 · info@asringroup.net.',
      'Get in touch by phone, WhatsApp or email to arrange a meeting or visit: +90 (539) 261 39 95 · info@asringroup.net.',
      'Свяжитесь с нами по телефону, WhatsApp или e-mail, чтобы договориться о встрече или просмотре: +90 (539) 261 39 95 · info@asringroup.net.'
    ),
  },
  {
    q: L('Blue Lagoon Village\'da konaklayabilir miyim?', 'Can I stay at Blue Lagoon Village?', 'Можно ли остановиться в Blue Lagoon Village?'),
    a: L(
      'Evet. Üç evde yedi oda bulunur. Giriş 15:00\'ten itibaren, çıkış 10:30\'a kadardır; tesis yalnızca yetişkinlere (18+) hizmet verir ve evcil hayvan kabul edilmez. Müsaitlik için Blue Lagoon Village sitesinden talep gönderebilirsiniz.',
      'Yes. There are seven rooms in three houses. Check-in is from 15:00 and check-out by 10:30; the village is for adults only (18+) and pets are not allowed. You can request availability on the Blue Lagoon Village website.',
      'Да. В трёх домах семь номеров. Заселение с 15:00, выезд до 10:30; только для взрослых (18+), без домашних животных. Запросить свободные даты можно на сайте Blue Lagoon Village.'
    ),
  },
  {
    q: L('Yapımda olan veya planlanan projeleriniz var mı?', 'Do you have projects under construction or planned?', 'Есть ли у вас строящиеся или планируемые проекты?'),
    a: L(
      'Yeni projelerimizle ilgili en güncel bilgiyi doğrudan ekibimizden alabilirsiniz. Bize ulaşın; yeni bir proje duyurulduğunda sizi ilk bilgilendirelim.',
      'For the latest on new projects, please ask our team directly. Get in touch and we will let you know first when a new project is announced.',
      'Самую свежую информацию о новых проектах вы получите напрямую от нашей команды. Свяжитесь с нами — мы сообщим первыми, когда объявим новый проект.'
    ),
  },
];

export const HOME = {
  heroEyebrow: L('Gazipaşa · Antalya · 1990\'dan beri', 'Gazipaşa · Antalya · Since 1990', 'Газипаша · Анталья · с 1990 года'),
  heroTitle: L('Akdeniz\'de yaşamı <em>inşa</em> ediyoruz.', 'Building the <em>Mediterranean</em> way of life.', 'Строим жизнь <em>у Средиземного</em> моря.'),
  heroSub: L(
    'Hollanda\'da kurulan ve 1999\'dan beri Gazipaşa\'da Avrupa standartlarında projeler geliştiren ASRIN GROUP — Toros dağları ile deniz arasında, güvenle yaşanacak evler.',
    'Founded in the Netherlands and building in Gazipaşa since 1999, ASRIN GROUP creates homes to European standards between the Taurus mountains and the sea.',
    'Основанная в Нидерландах и строящая в Газипаше с 1999 года, ASRIN GROUP создаёт дома по европейским стандартам — между горами Тавра и морем.'
  ),
  heroCaption: L('Blue Lagoon Village · Gazipaşa', 'Blue Lagoon Village · Gazipaşa', 'Blue Lagoon Village · Газипаша'),
  projectsTitle: L('Hayalinizdeki projeleri inşa ediyoruz.', 'We build the homes you dream of.', 'Строим дома вашей мечты.'),
  projectsEyebrow: L('Projelerimiz', 'Our developments', 'Наши проекты'),
  flagship: L('Amiral proje', 'Flagship development', 'Флагманский проект'),
  cityTitle: L('Dağlarla deniz arasında, gün batımına bakan bir yaşam.', 'A life between the mountains and the sea, facing the sunset.', 'Жизнь между горами и морем — с видом на закат.'),
  lagoonEyebrow: L('Akdeniz yaşamı', 'Mediterranean living', 'Средиземноморская жизнь'),
  completedEyebrow: L('Tamamlanan projeler', 'Completed projects', 'Завершённые проекты'),
  completedTitle: L('Teslim ettiğimiz her proje, sözümüzün somut hali.', 'Every project we deliver is our word, made tangible.', 'Каждый сданный проект — наше слово, воплощённое в камне.'),
  philosophyEyebrow: L('Yaklaşımımız', 'Our approach', 'Наш подход'),
  philosophyTitle: L('Güven. Estetik. Dayanıklılık.', 'Trust. Aesthetics. Durability.', 'Доверие. Эстетика. Долговечность.'),
  galleryEyebrow: L('Galeri', 'Gallery', 'Галерея'),
  galleryTitle: L('Işık, taş ve deniz.', 'Light, stone and sea.', 'Свет, камень и море.'),
  contactEyebrow: L('İletişim', 'Contact', 'Контакты'),
  contactTitle: L('Geleceğin evini <em>birlikte bulalım.</em>', 'Let\'s find your future home <em>together.</em>', 'Давайте вместе найдём <em>ваш будущий дом.</em>'),
  contactText: L(
    'Bize <strong>telefon, WhatsApp veya e-posta</strong> üzerinden kolayca ulaşabilirsiniz. Bilgi ve talepleriniz için hemen bizi arayın.',
    'You can reach us easily by <strong>phone, WhatsApp or email</strong>. Call us with any question or request.',
    'С нами легко связаться <strong>по телефону, WhatsApp или e-mail</strong>. Звоните — ответим на любые вопросы.'
  ),
};

export const PAGES = {
  about: {
    title: L('Kurumsal', 'About us', 'О компании'),
    meta: L(
      'ASRIN İNŞAAT: 1990\'da Hollanda\'da kuruldu, 1999\'dan beri Gazipaşa\'da Avrupa standartlarında konut projeleri geliştiriyor.',
      'ASRIN İNŞAAT: founded in the Netherlands in 1990, building homes to European standards in Gazipaşa since 1999.',
      'ASRIN İNŞAAT: основана в Нидерландах в 1990 году, с 1999 года строит жильё по европейским стандартам в Газипаше.'
    ),
  },
  projects: {
    title: L('Projeler', 'Projects', 'Проекты'),
    lead: L('Gazipaşa\'da tamamlanan konut projelerimiz ve Blue Lagoon Village.', 'Our completed residential projects in Gazipaşa, and Blue Lagoon Village.', 'Наши завершённые жилые проекты в Газипаше и Blue Lagoon Village.'),
    meta: L('ASRIN GROUP projeleri: Asrin City Gazipaşa, Blue Lagoon Village, Asrin Town 15, Special Villas, Asrin 10-11 ve Asrin 7-8.', 'ASRIN GROUP projects: Asrin City Gazipaşa, Blue Lagoon Village, Asrin Town 15, Special Villas, Asrin 10-11 and Asrin 7-8.', 'Проекты ASRIN GROUP: Asrin City Gazipaşa, Blue Lagoon Village, Asrin Town 15, Special Villas, Asrin 10-11 и Asrin 7-8.'),
    all: L('Tümü', 'All', 'Все'),
    emptyBuilding: L('Şu anda yapımda olan projemiz bulunmuyor. Yeni projeler duyurulduğunda ilk siz haberdar olun.', 'There are no projects under construction right now. Be the first to hear when a new one is announced.', 'Сейчас строящихся проектов нет. Узнайте первыми, когда мы объявим новый.'),
    emptyPlanned: L('Planlanan projelerimizle ilgili bilgi için ekibimizle iletişime geçin.', 'For information on planned projects, please contact our team.', 'Чтобы узнать о планируемых проектах, свяжитесь с нашей командой.'),
    notify: L('Haberdar olmak istiyorum', 'Keep me informed', 'Сообщите мне'),
  },
  gallery: {
    title: L('Galeri', 'Gallery', 'Галерея'),
    lead: L('Projelerimizden ve Gazipaşa\'dan kareler.', 'Photographs from our projects and from Gazipaşa.', 'Фотографии наших проектов и Газипаши.'),
    meta: L('ASRIN GROUP fotoğraf galerisi: Asrin City, Blue Lagoon Village, villalar ve Gazipaşa.', 'ASRIN GROUP photo gallery: Asrin City, Blue Lagoon Village, villas and Gazipaşa.', 'Фотогалерея ASRIN GROUP: Asrin City, Blue Lagoon Village, виллы и Газипаша.'),
    region: L('Gazipaşa', 'Gazipaşa', 'Газипаша'),
  },
  videos: {
    title: L('Videolar', 'Videos', 'Видео'),
    lead: L('Blue Lagoon Village\'dan kısa filmler: kıyı, villalar, lagün ve gün batımı.', 'Short films from Blue Lagoon Village: the coast, the villas, the lagoon and the sunset.', 'Короткие фильмы о Blue Lagoon Village: побережье, виллы, лагуна и закат.'),
    meta: L('ASRIN GROUP video galerisi — Blue Lagoon Village, Gazipaşa.', 'ASRIN GROUP video gallery — Blue Lagoon Village, Gazipaşa.', 'Видеогалерея ASRIN GROUP — Blue Lagoon Village, Газипаша.'),
  },
  news: {
    title: L('Haberler', 'News', 'Новости'),
    lead: L('1990\'dan bugüne kilometre taşlarımız.', 'Our milestones, from 1990 to today.', 'Наши вехи — с 1990 года до сегодняшнего дня.'),
    meta: L('ASRIN GROUP haberleri ve kilometre taşları.', 'ASRIN GROUP news and milestones.', 'Новости и вехи ASRIN GROUP.'),
  },
  faq: {
    title: L('Sıkça Sorulan Sorular', 'Frequently asked questions', 'Вопросы и ответы'),
    lead: L('Projelerimiz, konum ve iletişim hakkında merak edilenler.', 'What people ask about our projects, the location and how to reach us.', 'Ответы на частые вопросы о проектах, расположении и связи с нами.'),
    meta: L('ASRIN GROUP sıkça sorulan sorular: Asrin City daire tipleri, olanaklar, mesafeler ve Blue Lagoon Village.', 'ASRIN GROUP FAQ: Asrin City apartment types, amenities, distances and Blue Lagoon Village.', 'Вопросы и ответы ASRIN GROUP: планировки и инфраструктура Asrin City, расстояния, Blue Lagoon Village.'),
    more: L('Sorunuz burada yok mu?', 'Question not answered here?', 'Не нашли ответ?'),
  },
  contact: {
    title: L('İletişim', 'Contact', 'Контакты'),
    meta: L('ASRIN GROUP iletişim: +90 (539) 261 39 95, info@asringroup.net, Pazarcı Mah. Uğur Mumcu Cad. Asrın Apt. 101/1 Gazipaşa / Antalya.', 'Contact ASRIN GROUP: +90 (539) 261 39 95, info@asringroup.net, Pazarcı Mah. Uğur Mumcu Cad. Asrın Apt. 101/1, Gazipaşa / Antalya.', 'Контакты ASRIN GROUP: +90 (539) 261 39 95, info@asringroup.net, Pazarcı Mah. Uğur Mumcu Cad. Asrın Apt. 101/1, Газипаша / Анталья.'),
    office: L('Ofis', 'Office', 'Офис'),
    map: L('Haritada aç', 'Open in Maps', 'Открыть на карте'),
  },
  home: {
    title: L('ASRIN GROUP — Gazipaşa\'da Akdeniz yaşamı', 'ASRIN GROUP — Mediterranean living in Gazipaşa', 'ASRIN GROUP — средиземноморская жизнь в Газипаше'),
    meta: L(
      'ASRIN GROUP / ASRIN İNŞAAT: 1990\'dan beri Avrupa standartlarında konut. Asrin City Gazipaşa, Blue Lagoon Village ve tamamlanan projelerimizi keşfedin.',
      'ASRIN GROUP / ASRIN İNŞAAT: homes built to European standards since 1990. Discover Asrin City Gazipaşa, Blue Lagoon Village and our completed projects.',
      'ASRIN GROUP / ASRIN İNŞAAT: жильё по европейским стандартам с 1990 года. Asrin City Gazipaşa, Blue Lagoon Village и наши завершённые проекты.'
    ),
  },
  notFound: {
    title: L('Sayfa bulunamadı', 'Page not found', 'Страница не найдена'),
    text: L('Aradığınız sayfa taşınmış veya kaldırılmış olabilir.', 'The page you are looking for may have moved or no longer exists.', 'Возможно, страница была перемещена или удалена.'),
  },
};

// ---------- Home v2 (Asrin City first) ----------
export const HOME2 = {
  kicker: L('ASRIN GROUP sunar', 'ASRIN GROUP presents', 'ASRIN GROUP представляет'),
  title: L('Dağlar ile deniz <em>arasında bir yaşam.</em>', 'A life between <em>the mountains and the sea.</em>', 'Жизнь <em>между горами и&nbsp;морем.</em>'),
  sub: L(
    'Asrin City Gazipaşa — Toros dağları ile Akdeniz arasında, <strong>havuzlu ve peyzajlı bahçeli</strong> modern yaşam kompleksi. 1990\'dan beri <strong>Avrupa standartlarında</strong> inşa eden ASRIN GROUP imzasıyla.',
    'Asrin City Gazipaşa — a modern residential complex with <strong>pool and landscaped gardens</strong> between the Taurus mountains and the Mediterranean. Built by ASRIN GROUP, <strong>to European standards since 1990</strong>.',
    'Asrin City Gazipaşa — современный жилой комплекс <strong>с бассейном и ландшафтным садом</strong> между горами Тавра и Средиземным морем. От ASRIN GROUP, которая строит <strong>по европейским стандартам с 1990 года</strong>.'
  ),
  chips: [L('1+1 — Penthouse', '1+1 — Penthouse', '1+1 — пентхаус'), L('Havalimanına 5 km', '5 km to the airport', '5 км до аэропорта'), L('4. kattan deniz manzarası', 'Sea views from the 4th floor', 'Вид на море с 4-го этажа')],
  manifestoEyebrow: L('ASRIN GROUP · 1990', 'ASRIN GROUP · 1990', 'ASRIN GROUP · 1990'),
  manifesto: L(
    '1990\'da Hollanda\'da kurulduk, 1999\'dan beri Gazipaşa\'da inşa ediyoruz. [[Güven, estetik ve dayanıklılık:]] her projede aynı söz — içinde yaşamaktan keyif alınan, uzun ömürlü evler.',
    'Founded in the Netherlands in 1990, building in Gazipaşa since 1999. [[Trust, aesthetics and durability:]] one promise in every project — lasting homes that are a joy to live in.',
    'Основаны в Нидерландах в 1990 году, строим в Газипаше с 1999-го. [[Доверие, эстетика и долговечность:]] одно обещание в каждом проекте — надёжные дома, в которых приятно жить.'
  ),
  lapseEyebrow: L('Asrin City · bir gün', 'Asrin City · one day', 'Asrin City · один день'),
  lapseTitle: L('Günün en güzel saatleri — <em>her gün.</em>', 'The finest hours of the day — <em>every day.</em>', 'Лучшие часы дня — <em>каждый день.</em>'),
  lapse: [
    { t: '17:50', l: L('Altın saat', 'Golden hour', 'Золотой час'), n: L('4. kattan itibaren deniz manzarası', 'Sea views from the 4th floor up', 'Вид на море начиная с 4-го этажа') },
    { t: '18:40', l: L('Gün batımı', 'Sunset', 'Закат'), n: L('Toros dağları ile Akdeniz arasında', 'Between the Taurus mountains and the Mediterranean', 'Между горами Тавра и Средиземным морем') },
    { t: '19:20', l: L('Mavi saat', 'Blue hour', 'Синий час'), n: L('7/24 kamera güvenliği, güvenlikli giriş', '24-hour CCTV and a secured entrance', 'Круглосуточное видеонаблюдение и охраняемый въезд') },
  ],
  cityEyebrow: L('Satışta · Tamamlandı', 'For sale · Completed', 'В продаже · Дом сдан'),
  unitsTitle: L('Size uygun <em>daireyi seçin.</em>', 'Choose the home <em>that fits you.</em>', 'Выберите <em>свою квартиру.</em>'),
  amenEyebrow: L('Site yaşamı', 'Life on site', 'Жизнь в комплексе'),
  amenTitle: L('Her şey, <em>sitenin içinde.</em>', 'Everything, <em>inside the gates.</em>', 'Всё — <em>внутри комплекса.</em>'),
  hotspots: [
    { x: 53, y: 72, k: 'pool' },
    { x: 41, y: 34, k: 'play' },
    { x: 55, y: 37, k: 'gazebo' },
    { x: 11, y: 38, k: 'court' },
    { x: 84, y: 62, k: 'parking' },
  ],
  reelEyebrow: L('Galeri', 'Gallery', 'Галерея'),
  reelTitle: L('Asrin City, <em>ışığın her halinde.</em>', 'Asrin City, <em>in every light.</em>', 'Asrin City — <em>в любом свете.</em>'),
  drag: L('Kaydırın', 'Drag', 'Листайте'),
  placeEyebrow: L('Konum', 'Location', 'Расположение'),
  portfolioEyebrow: L('Portföy', 'Portfolio', 'Портфолио'),
  portfolioTitle: L('Gazipaşa\'da <em>inşa ettiklerimiz.</em>', 'What we have built <em>in Gazipaşa.</em>', 'Что мы построили <em>в Газипаше.</em>'),
  view: L('Keşfet', 'View', 'Смотреть'),
  open: L('Aç', 'Open', 'Открыть'),
};
