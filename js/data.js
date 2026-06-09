const SITE = {
  name: 'CalcMaster',
  url: 'https://calcmaster.com.tr',
  locale: 'tr_TR'
};

const CATEGORIES = [
  {
    id: 'cat1',
    label: '🖨️ 3D Baskı',
    tools: [
      { id: 't1', slug: '3d-baski-maliyet', label: '3D Baskı Maliyet' },
      { id: 't2', slug: 'filament-metraj', label: 'Filament Metraj' },
      { id: 't3', slug: 'nozzle-katman-suresi', label: 'Nozzle & Katman Süresi' },
      { id: 't4', slug: 'filament-kurutma', label: 'Filament Kurutma' }
    ]
  },
  {
    id: 'cat2',
    label: '💳 Finans',
    tools: [
      { id: 't5', slug: 'borc-simulatoru', label: 'Borç Simülatörü' },
      { id: 't6', slug: 'freelance-fiyatlandirma', label: 'Freelance Fiyatlandırma' },
      { id: 't7', slug: 'adsense-gelir', label: 'AdSense Gelir Tahmini' },
      { id: 't8', slug: 'vergi-net-kazanc', label: 'Vergi & Net Kazanç' }
    ]
  },
  {
    id: 'cat3',
    label: '🛒 E-Ticaret',
    tools: [
      { id: 't9', slug: 'pazaryeri-kar', label: 'Pazaryeri Kâr & Komisyon' },
      { id: 't10', slug: 'kargo-desi', label: 'Kargo Desi Hesaplayıcı' },
      { id: 't11', slug: 'stok-devir-hizi', label: 'Stok Devir Hızı' },
      { id: 't12', slug: 'toplu-alim-roi', label: 'Toplu Alım-Satım ROI' }
    ]
  },
  {
    id: 'cat4',
    label: '🏍️ Araç Yönetimi',
    tools: [
      { id: 't13', slug: 'yakit-yol-maliyeti', label: 'Yakıt & Yol Maliyeti' },
      { id: 't14', slug: 'km-basi-bakim', label: 'KM Başı Bakım Payı' },
      { id: 't15', slug: 'varyator-kayis-omru', label: 'Varyatör & Kayış Ömrü' },
      { id: 't16', slug: 'aku-sarj-suresi', label: 'Akü Şarj Süresi' }
    ]
  },
  {
    id: 'cat5',
    label: '💻 Yazılım & Sistem',
    tools: [
      { id: 't17', slug: 'bandwidth-hesaplayici', label: 'Bandwidth Hesaplayıcı' },
      { id: 't18', slug: 'yazilim-proje-simulatoru', label: 'Yazılım Proje Simülatörü' },
      { id: 't19', slug: 'psu-watt', label: 'PSU Watt Hesaplayıcı' },
      { id: 't20', slug: 'ip-subnet', label: 'IP Subnet Hesaplayıcı' }
    ]
  }
];

const TOOL_SEO = {
  t1: {
    title: '3D Baskı Maliyet Hesaplayıcı — Filament, Elektrik & Kâr | CalcMaster',
    description: '3D baskı maliyet hesaplayıcı ile filament gram maliyeti, elektrik tüketimi, amortisman ve kâr marjını anında hesaplayın. Ücretsiz online 3D yazıcı fiyatlandırma aracı.',
    keywords: '3d baskı maliyet hesaplayıcı, filament maliyet, 3d yazıcı fiyat hesaplama, 3d print cost calculator',
    schemaName: '3D Baskı Maliyet Hesaplayıcı'
  },
  t2: {
    title: 'Filament Metraj Hesaplayıcı — Gramdan Metreye Dönüştürücü | CalcMaster',
    description: 'PLA, PETG, ABS filament gram değerinden metre uzunluğu hesaplayın. 1,75 mm ve 2,85 mm çap desteği ile makara metraj planlaması yapın.',
    keywords: 'filament metraj hesaplayıcı, filament uzunluk hesaplama, gram metre dönüştürücü, 3d filament calculator',
    schemaName: 'Filament Metraj Dönüştürücü'
  },
  t3: {
    title: 'Nozzle & Katman Süresi Hesaplayıcı — 3D Baskı Süre Tahmini | CalcMaster',
    description: 'Nozzle çapı, katman yüksekliği ve baskı hızına göre 3D baskı süresini tahmin edin. Debi ve katman uyumu analizi ile optimize edin.',
    keywords: '3d baskı süre hesaplayıcı, nozzle katman süresi, layer height calculator, print time estimator',
    schemaName: 'Nozzle & Katman Süresi Tahminleyici'
  },
  t4: {
    title: 'Filament Kurutma Hesaplayıcı — Nem Analizi & Kurutma Reçetesi | CalcMaster',
    description: 'PLA, PETG, ABS, PA filament için ortam nemine göre ideal kurutma sıcaklığı ve süresini hesaplayın. Nem analizi ile fire oranını düşürün.',
    keywords: 'filament kurutma hesaplayıcı, filament nem analizi, pla kurutma sıcaklığı, filament dryer guide',
    schemaName: 'Filament Kurutma & Nem Analizörü'
  },
  t5: {
    title: 'Borç Simülatörü — Kredi Geri Ödeme & Faiz Hesaplama | CalcMaster',
    description: 'Borcunuzun kaç ayda kapanacağını, toplam faiz yükünü ve ay bazlı ödeme planını ücretsiz hesaplayın. Akıllı borç simülasyon aracı.',
    keywords: 'borç simülatörü, kredi geri ödeme hesaplama, faiz hesaplayıcı, borç yapılandırma simülasyonu',
    schemaName: 'Akıllı Borç & Geri Ödeme Simülatörü'
  },
  t6: {
    title: 'Freelance Fiyatlandırma Hesaplayıcı — Saatlik Ücret & Fatura | CalcMaster',
    description: 'Freelance saatlik ücret, vergi dahil fatura tutarı ve proje fiyatını hesaplayın. Net gelir hedefinize göre minimum ücret belirleyin.',
    keywords: 'freelance fiyat hesaplama, saatlik ücret hesaplayıcı, freelance fatura tutarı, serbest meslek ücret',
    schemaName: 'Freelance Proje Fiyatlandırma Aracı'
  },
  t7: {
    title: 'AdSense Gelir Hesaplayıcı — RPM, CTR & CPC Tahmini | CalcMaster',
    description: 'Google AdSense günlük, aylık ve yıllık reklam geliri tahmini yapın. CTR, CPC ve sayfa görüntüleme ile kazanç simülasyonu.',
    keywords: 'adsense gelir hesaplayıcı, reklam geliri tahmini, adsense rpm hesaplama, google adsense calculator',
    schemaName: 'AdSense & Reklam Gelir Tahminleyicisi'
  },
  t8: {
    title: 'Gelir Vergisi Hesaplayıcı 2026 — Net Kazanç & Dilimler | CalcMaster',
    description: '2026 güncel gelir vergisi dilimleri ile brüt gelirden net kazancınızı hesaplayın. Kurumlar vergisi karşılaştırması dahil.',
    keywords: 'gelir vergisi hesaplayıcı 2026, net kazanç hesaplama, vergi dilimleri, kurumlar vergisi hesaplama',
    schemaName: 'Gelir Vergisi & Net Kazanç Hesaplayıcı'
  },
  t9: {
    title: 'Pazaryeri Kâr Hesaplayıcı — Trendyol, Hepsiburada Komisyon | CalcMaster',
    description: 'Trendyol, Hepsiburada, N11 pazaryeri komisyon, KDV ve kargo dahil net kâr marjınızı hesaplayın. E-ticaret fiyatlandırma aracı.',
    keywords: 'pazaryeri kâr hesaplayıcı, trendyol komisyon hesaplama, hepsiburada kâr marjı, e-ticaret fiyat hesaplama',
    schemaName: 'Pazaryeri Kâr & Komisyon Hesaplayıcı'
  },
  t10: {
    title: 'Kargo Desi Hesaplayıcı — Paket Boyutu & Kargo Maliyeti | CalcMaster',
    description: 'En × boy × yükseklik ile desi değerini ve kargo maliyetini hesaplayın. Hacimsel ağırlık vs gerçek ağırlık karşılaştırması.',
    keywords: 'kargo desi hesaplayıcı, desi hesaplama formülü, kargo maliyet hesaplama, e-ticaret kargo desi',
    schemaName: 'Kargo Desi & Paketleme Maliyet Hesaplayıcı'
  },
  t11: {
    title: 'Stok Devir Hızı Hesaplayıcı — E-Ticaret Sermaye Verimliliği | CalcMaster',
    description: 'E-ticaret stok devir hızı, ortalama stokta kalma süresi ve bağlı sermayeyi hesaplayın. Stok optimizasyonu için ücretsiz araç.',
    keywords: 'stok devir hızı hesaplayıcı, e-ticaret stok analizi, inventory turnover calculator, bağlı sermaye',
    schemaName: 'E-Ticaret Stok Devir Hızı Hesaplayıcı'
  },
  t12: {
    title: 'Toplu Alım-Satım ROI Hesaplayıcı — Yatırım Geri Dönüşü | CalcMaster',
    description: 'Toplu alım-satım yatırımınızın ROI oranını ve yıllıklandırılmış getirisini hesaplayın. Net kâr ve geri ödeme süresi analizi.',
    keywords: 'roi hesaplayıcı, toplu alım satım roi, yatırım geri dönüş hesaplama, e-ticaret roi calculator',
    schemaName: 'Toplu Alım-Satım ROI Hesaplayıcı'
  },
  t13: {
    title: 'Yakıt & Yol Maliyeti Hesaplayıcı — KM Başına Tüketim | CalcMaster',
    description: 'Yakıt litre fiyatı ve 100 km tüketim ile yol maliyetini, km başına ve kişi başına masrafı hesaplayın. Seyahat bütçe planlayıcı.',
    keywords: 'yakıt maliyet hesaplayıcı, km başı yakıt tüketimi, yol maliyeti hesaplama, seyahat bütçe hesaplayıcı',
    schemaName: 'KM Başına Yakıt & Yol Maliyeti Hesaplayıcı'
  },
  t14: {
    title: 'KM Başı Bakım Maliyeti Hesaplayıcı — Araç TCO Analizi | CalcMaster',
    description: 'Araç bakım, lastik ve değer kaybı payını km başına hesaplayın. Toplam sahiplik maliyeti (TCO) analizi için ücretsiz araç.',
    keywords: 'km başı bakım maliyeti, araç bakım hesaplayıcı, tco hesaplama, lastik km maliyeti',
    schemaName: 'KM Başı Bakım & Yıpranma Payı Hesaplayıcı'
  },
  t15: {
    title: 'Varyatör & Kayış Ömrü Hesaplayıcı — 125cc Scooter Bakım | CalcMaster',
    description: 'Scooter ve motosiklet CVT kayış ömrü, varyatör bakım tarihi ve sürüş tarzına göre periyodik bakım planı hesaplayın.',
    keywords: 'varyatör kayış ömrü, scooter bakım hesaplayıcı, 125cc bakım takvimi, cvt kayış değişim km',
    schemaName: 'Scooter Varyatör & Kayış Ömür Tahminleyicisi'
  },
  t16: {
    title: 'Akü Şarj Süresi Hesaplayıcı — Amper & Kapasite Analizi | CalcMaster',
    description: 'Araç aküsü Ah kapasitesi, şarj akımı ve mevcut seviyeye göre şarj süresini hesaplayın. Akıllı şarj cihazı verimlilik analizi.',
    keywords: 'akü şarj süresi hesaplayıcı, araç aküsü şarj, amper saat hesaplama, battery charge calculator',
    schemaName: 'Akü Şarj Süresi & Amper Analizörü'
  },
  t17: {
    title: 'Bandwidth Hesaplayıcı — Sunucu Trafik & Aylık Kota | CalcMaster',
    description: 'Aylık ziyaretçi ve sayfa boyutuna göre sunucu bandwidth ihtiyacını hesaplayın. Hosting kota aşım riski analizi.',
    keywords: 'bandwidth hesaplayıcı, sunucu trafik hesaplama, hosting bandwidth calculator, aylık kota hesaplama',
    schemaName: 'Sunucu Trafiği & Bandwidth Hesaplayıcı'
  },
  t18: {
    title: 'Yazılım Proje Maliyet Hesaplayıcı — Adam/Saat & Bütçe | CalcMaster',
    description: 'Yazılım projesi ekran sayısı, entegrasyon karmaşıklığı ve saatlik ücret ile adam/saat ve bütçe tahmini yapın.',
    keywords: 'yazılım proje maliyet hesaplama, adam saat hesaplayıcı, yazılım bütçe simülasyonu, software project estimator',
    schemaName: 'Yazılım Projesi Süre & Maliyet Simülatörü'
  },
  t19: {
    title: 'PSU Watt Hesaplayıcı — Bilgisayar Güç Kaynağı Seçimi | CalcMaster',
    description: 'CPU, GPU TDP ve sistem bileşenlerine göre minimum ve güvenli PSU wattajını hesaplayın. 80 Plus verimlilik önerileri.',
    keywords: 'psu watt hesaplayıcı, güç kaynağı hesaplama, bilgisayar psu seçimi, power supply calculator',
    schemaName: 'Bilgisayar PSU Watt İhtiyacı Hesaplayıcı'
  },
  t20: {
    title: 'IP Subnet Hesaplayıcı — CIDR, Ağ & Broadcast Adresi | CalcMaster',
    description: 'IP adresi ve CIDR notasyonundan ağ adresi, broadcast, host aralığı ve maksimum host sayısını hesaplayın. Ücretsiz subnet aracı.',
    keywords: 'ip subnet hesaplayıcı, cidr hesaplama, ağ maskesi calculator, subnet mask hesaplama',
    schemaName: 'Ağ IP Subnet Hesaplayıcı'
  }
};

function getAllTools() {
  return CATEGORIES.flatMap(cat =>
    cat.tools.map(t => ({ ...t, category: cat.label, categoryId: cat.id }))
  );
}

function getToolBySlug(slug) {
  return getAllTools().find(t => t.slug === slug);
}

function getToolById(id) {
  return getAllTools().find(t => t.id === id);
}

if (typeof module !== 'undefined') module.exports = { SITE, CATEGORIES, TOOL_SEO, getAllTools, getToolById, getToolBySlug };
