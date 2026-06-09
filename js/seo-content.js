/**
 * On-Page SEO içerik blokları — build.mjs tarafından her araç sayfasına enjekte edilir.
 * Her araç: 3-4 h2 bölümü, h3 alt başlıklar ve SSS (FAQ).
 */
const TOOL_CONTENT = {
  t1: {
    sections: [
      {
        h2: '3D Baskı Maliyeti Nasıl Hesaplanır?',
        paragraphs: ['2026 yılında 3D baskı ile ürün satan atölyeler için doğru fiyatlandırma, rekabet avantajının temelidir. Maliyet; filament, elektrik, makine amortismanı, işçilik ve kâr marjından oluşur. CalcMaster hesaplayıcısı bu kalemleri tek formda birleştirerek önerilen satış fiyatını anında verir.'],
        subsections: [
          { h3: 'Filament Yoğunluğu ve Gramaj Analizi Nasıl Yapılır?', paragraphs: ['PLA yoğunluğu 1,24 g/cm³, PETG 1,27 g/cm³ civarındadır. Slicer çıktısındaki gramajı temel alın; purge tower, brim ve başarısız denemeler için %5–10 fire payı ekleyin. Kilogram fiyatını 1000\'e bölerek gram maliyetini bulun.'] },
          { h3: '3D Yazıcı Elektrik Tüketimi Hesaplama', paragraphs: ['Ortalama FDM yazıcı 150–250 W arası çeker. Formül: (Watt ÷ 1000) × saat × kWh fiyatı. 2026 mesken tarifesinde kWh 4–5 ₺ bandındadır; uzun baskılarda %10 enerji tamponu eklemek gerçekçi sonuç verir.'] }
        ]
      },
      {
        h2: 'Ticari 3D Baskıda Gizli Maliyet Kalemleri',
        paragraphs: ['Nozzle, PEI tabla ve step motor aşınması fiyata yansımazsa kâr illüzyonu oluşur. Saatlik amortisman payı makine yatırımını baskı başına dağıtır. Post-processing (support temizliği, zımpara) süresini saatlik ücretle çarpıp ekleyin.'],
        subsections: [
          { h3: 'Kâr Marjı ve Pazaryeri Komisyonu', paragraphs: ['Etsy veya Trendyol\'da %15–25 komisyon vardır. %30 altı brüt marj, vergi sonrası sürdürülemez. Hobi üretimde %50–100, seri üretimde %25–40 hedef makuldür.'] }
        ]
      },
      {
        h2: '2026\'da 3D Baskı Fiyatlandırma Trendleri',
        paragraphs: ['Filament fiyatları ve enerji maliyetleri yıllık güncellenir. Rakiplerinizi kıyaslarken sadece filament değil, toplam maliyeti (TCO) hesaplayın. Bu araçla her baskı için güncel birim maliyetinizi saniyeler içinde çıkarın.']
      }
    ],
    faq: [
      { q: '3D baskı maliyeti hesaplamak için hangi verilere ihtiyacım var?', a: 'Filament kg fiyatı, kullanılan gram, yazıcı watt değeri, baskı süresi, kWh ücreti, amortisman payı ve hedef kâr oranı yeterlidir. Slicer\'dan gramaj ve süre alabilirsiniz.' },
      { q: 'Elektrik maliyeti 3D baskı fiyatını ne kadar etkiler?', a: 'Kısa baskılarda %5–10, geceden sabaha süren baskılarda %15\'e kadar çıkabilir. Hot-end ve yatak ısıtması ana tüketicidir.' },
      { q: 'Amortisman payı neden önemlidir?', a: 'Makine yatırımı (15.000–50.000 ₺) ömrü boyunca baskılara dağıtılmazsa gerçek kâr görülmez. Ticari üretimde bu kalem zorunludur.' },
      { q: 'Önerilen satış fiyatı nasıl hesaplanır?', a: 'Toplam maliyet × (1 + kâr% ÷ 100). Örneğin 100 ₺ maliyet ve %30 kâr → 130 ₺ satış fiyatı.' }
    ]
  },
  t2: {
    sections: [
      {
        h2: 'Filament Metraj ve Gram İlişkisi',
        paragraphs: ['Makarada kalan filamentin metre cinsinden uzunluğu, stok planlaması ve gece baskısı güvenliği için kritiktir. Kesit alanı (πr²) ve malzeme yoğunluğu denkleme girer.'],
        subsections: [
          { h3: '1,75 mm ve 2,85 mm Çap Farkı', paragraphs: ['Aynı gramajda 2,85 mm filament, 1,75 mm\'ye göre yaklaşık %60 daha az metre verir. Endüstriyel makinelerde 2,85 mm yüksek debi için tercih edilir.'] },
          { h3: 'Malzeme Türüne Göre Yoğunluk Tablosu', paragraphs: ['PLA 1,24, PETG 1,27, ABS 1,04, TPU 1,30, PA/Naylon 1,78 g/cm³. Aynı hacimde farklı kütle = farklı metraj.'] }
        ]
      },
      {
        h2: 'Makarada Kalan Filament Nasıl Ölçülür?',
        paragraphs: ['En güvenilir yöntem tartıdır: dolu makara − boş makara = kalan gram. Runout sensörü yardımcı olsa da slicer tahminini mutlaka doğrulayın.'],
        subsections: [
          { h3: 'Gece Baskısı İçin Metraj Planlaması', paragraphs: ['12 saatlik baskıda filament yetmezse hem zaman hem malzeme kaybı olur. Retraction ve purge tower gerçek tüketimi %10–15 artırabilir.'] }
        ]
      },
      {
        h2: 'Filament Metraj Hesaplayıcı Kullanım Rehberi',
        paragraphs: ['Filament türünü, çapını ve kalan gramı girin; araç anında metre cinsinden uzunluk verir. Seri üretim yapan atölyeler malzeme başına metraj tablosu tutarak acil siparişlerde "makara yetecek mi?" sorusunu yanıtlar.']
      }
    ],
    faq: [
      { q: '1 kg filament kaç metre eder?', a: '1,75 mm PLA\'da yaklaşık 330 metre; çap ve yoğunluğa göre değişir. Bu araç gram bazlı kesin hesap verir.' },
      { q: 'PETG ve PLA aynı metrajı verir mi?', a: 'Hayır. Yoğunluk farkı nedeniyle aynı kütlede farklı uzunluk çıkar.' },
      { q: 'Tartı ile slicer tahmini arasında fark olur mu?', a: 'Evet, %5–10 sapma normaldir. Kritik baskılarda tartıyı esas alın.' },
      { q: 'TPU filament için ek pay gerekir mi?', a: 'Evet, ekstrüder bükülmesi ve gerilim nedeniyle %15 fire payı önerilir.' }
    ]
  },
  t3: {
    sections: [
      {
        h2: '3D Baskı Süresi Nasıl Tahmin Edilir?',
        paragraphs: ['Baskı süresi; nozzle çapı, katman yüksekliği, hız, parça hacmi ve dolgu oranına bağlıdır. Debi (mm³/s) = nozzle × layer height × speed formülü temel alınır.'],
        subsections: [
          { h3: 'Katman Yüksekliği ve Kalite Dengesi', paragraphs: ['0,4 mm nozzle\'da 0,2 mm layer height, 0,1 mm\'ye göre süreyi %40–50 kısaltır. Vitrin parçasında ince, fonksiyonel parçada kalın katman tercih edin.'] },
          { h3: 'Doluluk Oranı (Infill) Etkisi', paragraphs: ['%20\'den %40\'a çıkmak süre ve malzemeyi artırır. Gyroid desen hız-mukavemet dengesinde öne çıkar.'] }
        ]
      },
      {
        h2: 'Nozzle Çapı Seçimi ve Baskı Hızı',
        paragraphs: ['0,2 mm detay, 0,4 mm standart, 0,6–1,0 mm hız ve endüstriyel üretim içindir. Debi 12 mm³/s üzerine çıkarsa under-extrusion riski artar.'],
        subsections: [
          { h3: 'Hız Ayarları ve Maliyet Etkisi', paragraphs: ['Hız artışı elektrik tasarrufu sağlar ama kalite düşebilir. Tahmini süreyi maliyet hesaplayıcıyla birlikte kullanın.'] }
        ]
      },
      {
        h2: 'Baskı Süresi Optimizasyonu İpuçları',
        paragraphs: ['Adaptive layer, eğimde ince düzde kalın katman kullanarak süreyi %15–25 düşürebilir. Duvar sayısını artırmak çoğu senaryoda infill şişirmekten verimlidir.']
      }
    ],
    faq: [
      { q: 'Standart hot-end max debi nedir?', a: 'Çoğu FDM hot-end için güvenli üst sınır ~12 mm³/s civarındadır. Araç yüksek debide uyarı verir.' },
      { q: 'Katman yüksekliği nozzle çapının kaçta kaçı olmalı?', a: 'Nozzle çapının %25–75\'i arası önerilir. 0,4 mm nozzle için 0,1–0,3 mm aralığı idealdir.' },
      { q: 'Slicer tahmini ile bu araç farklı mı çıkar?', a: 'Bu araç parametrik tahmin verir; travel, retraction ve purge sürelerini içermez. ±%15 sapma normaldir.' },
      { q: 'En hızlı baskı için ne yapmalıyım?', a: 'Kalın nozzle, yüksek layer height, düşük infill ve yüksek hız — kalite trade-off\'u kabul ederek.' }
    ]
  },
  t4: {
    sections: [
      {
        h2: 'Filament Kurutma Neden Gereklidir?',
        paragraphs: ['Higroskopik malzemeler nem emer; nozzle\'da çatırtı, gözenekli yüzey ve zayıf katmanlar oluşur. PA/Naylon en hassas, PLA nispeten toleranslıdır.'],
        subsections: [
          { h3: 'Malzeme Bazlı Kritik Nem Eşikleri', paragraphs: ['PLA >%45, PETG >%35, ABS >%50, PA >%25, TPU >%40 nemde kurutma şarttır. Ortam neminizi ölçün.'] },
          { h3: 'Kurutma Sıcaklığı ve Süre Tablosu', paragraphs: ['PLA 45–50°C, PETG 65°C, ABS 80°C, PA 70–80°C. Tg (cam geçiş) sıcaklığının 20°C altında kalın.'] }
        ]
      },
      {
        h2: 'Filament Kurutucu ve Depolama Stratejileri',
        paragraphs: ['Vakum torbası + silika jel en ekonomik uzun süreli çözümdür. PrintDry veya Sunlu S2 aktif kurutma için tasarlanmıştır.'],
        subsections: [
          { h3: 'Fırınla Kurutma Güvenliği', paragraphs: ['Ev fırınında mutlaka iç termometre kullanın; gösterge ile gerçek sıcaklık arasında 15°C fark sık görülür. PLA fazla kurutulursa kırılganlaşır.'] }
        ]
      },
      {
        h2: '2026 Atölye Nem Yönetimi',
        paragraphs: ['İstanbul ve Ege kıyılarında yaz nem oranı %70\'i aşabilir. Açılmış makarayı 48 saat içinde mühürleyin veya kurutun. Bu analizör ortam neminize göre aciliyet skoru verir.']
      }
    ],
    faq: [
      { q: 'Filament nemli mi nasıl anlarım?', a: 'Nozzle\'dan çatırtı, yüzeyde kabarcık ve mat görünüm tipik belirtilerdir. Nem ölçer veya tartı kaybı da ipucu verir.' },
      { q: 'PLA kurutulmalı mı?', a: 'Kuru iklimde şart değil; nemli ortamda veya açık makarada 1 haftadan uzun beklediyse evet.' },
      { q: 'Kurutma sonrası ne kadar süre dayanır?', a: 'Vakum + silika ile aylar; açık ortamda saatler (PA) ile günler (PLA) arası değişir.' },
      { q: 'PVA destek malzemesi için özel kural var mı?', a: 'Evet, PVA son derece higroskopiktir; aktif kurutucu şart ve %20 nem altında saklayın.' }
    ]
  },
  t5: {
    sections: [
      {
        h2: 'Borç Geri Ödeme Simülasyonu Nasıl Çalışır?',
        paragraphs: ['Her taksit faiz ve anaparaya ayrılır. Borcun başında faiz payı yüksektir; kalan azaldıkça anapara hızlanır. Bu amortisman eğrisi kredi kartı ve ihtiyaç kredilerinde aynı mantıkla işler.'],
        subsections: [
          { h3: 'Anapara-Faiz Dengesi ve Taksit Amortismanı', paragraphs: ['50.000 ₺ borçta %3,5 aylık faizle ilk ay 1.750 ₺ faiz gidebilir. Ay bazlı tablo hangi ayda ne ödediğinizi şeffaf gösterir.'] },
          { h3: 'Erken Ödeme Stratejileri', paragraphs: ['Avalanche (yüksek faiz önce) matematiksel olarak optimaldir. Aylık ödemeyi artırmak hem süreyi kısaltır hem on binlerce lira faizden kurtarır.'] }
        ]
      },
      {
        h2: 'Kredi Kartı Asgari Ödeme Tuzağı',
        paragraphs: ['Asgari ödeme faizi karşılamazsa borç yıllarca büyür. Simülatör taksit faizi karşılamıyorsa kırmızı uyarı verir.'],
        subsections: [
          { h3: 'Borç Yapılandırma ve Refinancing', paragraphs: ['Birden fazla yüksek faizli borç tek kredide birleştirilebilir. KKDF ve BSMV nominal faizi yukarı çeker — gerçek maliyet için efektif orana bakın.'] }
        ]
      },
      {
        h2: '2026 Borç Yönetimi İpuçları',
        paragraphs: ['Faiz oranları değişkendir; simülasyonu güncel oranla tekrarlayın. Erken ödeme planını ay bazlı tabloyla görselleştirmek motivasyon sağlar.']
      }
    ],
    faq: [
      { q: 'Aylık ödeme faizi karşılamazsa ne olur?', a: 'Borç hiç kapanmaz, sürekli büyür. Minimum ödeme = kalan borç × aylık faiz + en az 1 ₺ anapara olmalıdır.' },
      { q: 'Erken ödeme faizi düşürür mü?', a: 'Evet, anaparayı erken düşürdüğünüz için kalan dönemlerde ödenecek toplam faiz azalır.' },
      { q: 'Kredi kartı ile ihtiyaç kredisi farkı?', a: 'Hesaplama mantığı benzer; kartta asgari ödeme ve değişken faiz dikkat gerektirir.' },
      { q: 'Simülasyon banka ekstresi yerine geçer mi?', a: 'Hayır, karar destek amaçlıdır. Kesin plan için bankanızın resmi ödeme tablosuna bakın.' }
    ]
  },
  t6: {
    sections: [
      {
        h2: 'Freelance Saatlik Ücret Nasıl Belirlenir?',
        paragraphs: ['Net gelir hedefi + giderler + vergi = brüt ihtiyaç. Aylık çalışılabilir saate bölerek taban saatlik ücret çıkar. Haftada 40 saat ayda ~173 saat eder; faturalandırılabilir olan genelde %60–70\'idir.'],
        subsections: [
          { h3: 'Gizli Giderler: Sigorta, Lisans ve Amortisman', paragraphs: ['Adobe, Figma, hosting, MacBook amortismanı, Bağ-Kur ve emeklilik birikimi net hedefin üstüne yazılır.'] },
          { h3: 'Net Gelir Hedefleme ve Vergi Planlaması', paragraphs: ['30.000 ₺ net + %20 vergi ile brüt ihtiyaç ~37.500 ₺ bandına çıkar. Vergi dilimini slider ile test edin.'] }
        ]
      },
      {
        h2: 'Proje Bazlı vs Saatlik Fiyatlandırma',
        paragraphs: ['Deneyim arttıkça işi hızlı bitirirsiniz; saatlik model bunu cezalandırır. Proje fiyatı = tahmini saat × taban ücret × risk çarpanı (1,2–1,5) daha adildir.'],
        subsections: [
          { h3: 'Platform Komisyonu (Bionluk, Upwork)', paragraphs: ['%10–20 komisyonu ücretin üzerine koymazsanız her işte zarar edersiniz. Fatura tutarına bunu dahil edin.'] }
        ]
      },
      {
        h2: '2026 Freelance Pazar Trendleri',
        paragraphs: ['Uzaktan çalışma ve dövizli ödeme seçenekleri taban ücreti yukarı çeker. Türkiye\'de yazılım ve tasarım için saatlik 300–800 ₺ bandı yaygındır; nişe göre değişir.']
      }
    ],
    faq: [
      { q: 'Minimum saatlik ücret nasıl hesaplanır?', a: '(Net hedef + giderler) ÷ (1 − vergi%) ÷ aylık çalışılabilir saat. Araç bunu otomatik yapar.' },
      { q: 'Proje faturası vergi dahil mi?', a: 'Araç hem vergisiz ham fiyat hem vergi dahil fatura tutarını ayrı gösterir.' },
      { q: 'Haftalık 40 saatin tamamı faturalanır mı?', a: 'Hayır, toplantı, teklif ve idari işler genelde %30–40 süreyi yer. Kapasiteyi abartmayın.' },
      { q: 'Yeni başlayanlar daha düşük ücret istemeli mi?', a: 'İlk projelerde portföy için indirim yapılabilir; uzun vadede taban ücretin altına inmeyin.' }
    ]
  },
  t7: {
    sections: [
      {
        h2: 'Google AdSense Kazancı Nasıl Optimize Edilir?',
        paragraphs: ['Gelir = sayfa görüntüleme × CTR × CPC. Üç değişkenden herhangi birini %20 artırmak geliri doğrusal yükseltir. İçerik nişi, reklam yerleşimi ve Core Web Vitals doğrudan etkiler.'],
        subsections: [
          { h3: 'Sayfa BGBG (RPM) ve Tıklama Oranı (CTR) Nedir?', paragraphs: ['RPM = (kazanç ÷ görüntüleme) × 1000. Türkiye genel nişte 5–15 ₺, finans/hukukta 30–80 ₺ görülür. CTR %0,5–3 normaldir; %5 üzeri invalid traffic riski taşır.'] },
          { h3: 'Tıklama Başı Kazanç (CPC) Faktörleri', paragraphs: ['"Kredi hesaplama" gibi yüksek niyetli sorgularda CPC 2–5 ₺\'ye çıkabilir. Mevsimsel pikler (vergi dönemi) CPC\'yi artırır.'] }
        ]
      },
      {
        h2: 'AdSense Onayı ve İçerik Gereksinimleri',
        paragraphs: ['Özgün, derin içerik şart. Her hesaplayıcının altındaki rehber metin hem kullanıcıya hem Google\'a değer sunar. Gizlilik politikası ve mobil uyumluluk zorunludur.'],
        subsections: [
          { h3: 'Reklam Yerleşimi En İyi Uygulamalar', paragraphs: ['İçerik içi reklam sidebar\'a göre 2–4 kat daha iyi CTR verir. Auto ads ile manuel yerleşimi A/B test edin.'] }
        ]
      },
      {
        h2: '2026 Organik Trafik ile AdSense Geliri Tahmini',
        paragraphs: ['Sıfır reklam bütçesiyle organik SEO ana stratejiniz olmalı. Bu tahminleyici mevcut trafiğinizden ne kazanabileceğinizi somutlaştırır; hedef RPM için gerekli PV\'yi tersine hesaplayabilirsiniz.']
      }
    ],
    faq: [
      { q: 'AdSense geliri nasıl hesaplanır?', a: 'Günlük PV × (CTR/100) × CPC = günlük kazanç. Aylık için ×30, yıllık için ×365.' },
      { q: 'Türkiye\'de ortalama RPM nedir?', a: 'Genel niş 5–15 ₺; finans, hukuk ve B2B araç sitelerinde 30–80 ₺ mümkündür.' },
      { q: 'CTR\'yi nasıl artırırım?', a: 'Reklamı içerikle uyumlu yere koyun, sayfa hızını iyileştirin, mobil deneyimi optimize edin.' },
      { q: 'Bu tahminler garanti midir?', a: 'Hayır, Google\'ın gerçek ödemesi coğrafya, niş ve mevsime göre değişir. Planlama aracıdır.' }
    ]
  },
  t8: {
    sections: [
      {
        h2: '2026 Gelir Vergisi Dilimleri ve Hesaplama',
        paragraphs: ['Türkiye\'de gelir vergisi artan oranlıdır: %15, %20, %27, %35, %40 dilimleri. Tüm gelir en yüksek orandan kesilmez; her dilim ayrı vergilendirilir.'],
        subsections: [
          { h3: 'Ücret vs Ücret Dışı Gelir Farkı', paragraphs: ['Serbest meslek ve kira gelirinde üçüncü dilim 1.000.000 ₺\'de biter; ücret gelirlerinde 1.500.000 ₺. Tebliğ yıllık güncellenir.'] },
          { h3: 'Efektif Vergi Oranı Nedir?', paragraphs: ['Toplam vergi ÷ matrah. Nominal %40 ile karıştırmayın; orta gelirde efektif oran %20–25 bandındadır.'] }
        ]
      },
      {
        h2: 'İndirilebilir Giderler ve Matrah Düşürme',
        paragraphs: ['Kira, amortisman, personel, yazılım lisansı belgelendirildiği sürece indirilebilir. Brüt − gider = vergi matrahı.'],
        subsections: [
          { h3: 'Kurumlar Vergisi Karşılaştırması', paragraphs: ['%25 sabit kurumlar vergisi, üst gelir dilimlerinde limited şirket avantajı sağlayabilir. Temettüde ek %15 stopaj vardır.'] }
        ]
      },
      {
        h2: 'Net Kazanç Planlaması 2026',
        paragraphs: ['Yıl içi geçici vergi ödemelerini planlamaya dahil edin. Bu simülatör karar destek amaçlıdır; kesin tablo için mali müşavirinize danışın.']
      }
    ],
    faq: [
      { q: '2026 gelir vergisi dilimleri nelerdir?', a: '0–190K %15, 190–400K %20, 400K–1M %27, 1M–5,3M %35, üzeri %40 (ücret dışı gelir).' },
      { q: 'Brüt maaştan net nasıl hesaplanır?', a: 'Brüt − SGK/işsizlik − gelir vergisi − damga = net. Bu araç yıllık brüt ve gider üzerinden vergi simülasyonu yapar.' },
      { q: 'Kurumlar vergisi ne zaman mantıklı?', a: 'Yıllık matrah üst dilimlere yaklaştığında limited yapı toplam yükü düşürebilir.' },
      { q: 'Gider belgesi olmadan indirim yapılır mı?', a: 'Hayır, vergi denetiminde belgesiz gider kabul edilmeyebilir.' }
    ]
  },
  t9: {
    sections: [
      {
        h2: 'Pazaryeri Komisyon ve Net Kâr Hesaplama',
        paragraphs: ['Trendyol, Hepsiburada ve N11\'de komisyon KDV hariç satış üzerinden kesilir. Kargo, ambalaj ve iade maliyeti görünmez kâr eritir.'],
        subsections: [
          { h3: 'Trendyol ve Hepsiburada Gizli Maliyetleri', paragraphs: ['Hizmet bedeli, ödeme kesintisi, kampanya katılımı ve lojistik ek maliyetleri panel komisyonunun üzerine eklenir.'] },
          { h3: 'KDV ve Net Kâr Marjı', paragraphs: ['300 ₺ satışta %20 KDV ile net ciro 250 ₺. Sürdürülebilir satışta net marj en az %15–20 hedeflenir.'] }
        ]
      },
      {
        h2: 'E-Ticaret Fiyatlandırma Stratejisi',
        paragraphs: ['Fiyatı geriye doğru kurun: hedef marjdan satış fiyatını türetin. Kampanya öncesi indirimli fiyatı simüle edin; zarar eden kampanyaya girmeyin.'],
        subsections: [
          { h3: 'Trendyol Ads ve ACoS Etkisi', paragraphs: ['ACoS %10\'u geçince ürün başı kâr hızla düşer. Reklamı birim ekonomiye mutlaka yazın.'] }
        ]
      },
      {
        h2: '2026 Pazaryeri Satıcı Rehberi',
        paragraphs: ['Modada %25–40 iade oranı normaldir. İade kargosu kârı eritir. Aynı ürünü farklı platform komisyonlarıyla kıyaslayarak kanal seçin.']
      }
    ],
    faq: [
      { q: 'Komisyon brüt mü net satıştan mı kesilir?', a: 'Genelde KDV hariç satış tutarı (net ciro) üzerinden hesaplanır.' },
      { q: 'Zarar eden fiyat nasıl anlaşılır?', a: 'Araç net kâr negatifse kırmızı uyarı verir; alış veya satış fiyatını gözden geçirin.' },
      { q: 'Kâr marjı kaç olmalı?', a: 'En az %15–20 sürdürülebilir; düşük marjlı ürünler trafik çekici (loss leader) olarak kullanılabilir.' },
      { q: 'Kargo maliyeti dahil mi?', a: 'Evet, formda kargo ve diğer gider alanlarına yazabilirsiniz.' }
    ]
  },
  t10: {
    sections: [
      {
        h2: 'Kargo Desi Hesaplama Formülü',
        paragraphs: ['Türkiye\'de desi = (En × Boy × Yükseklik) ÷ 3000. Sonuç kilogram cinsindendir. Ücret, desi ile gerçek ağırlıktan büyük olana göre kesilir.'],
        subsections: [
          { h3: 'Hacimsel Ağırlık vs Gerçek Ağırlık', paragraphs: ['Hafif ama hacimli paketlerde desi belirleyicidir. Kutu boyutunu küçültmek doğrudan maliyeti düşürür.'] },
          { h3: 'Uluslararası Kargo Farkı', paragraphs: ['DHL/FedEx\'te bölen 5000\'dir. İhracatta aynı kutu daha düşük desi sayılabilir.'] }
        ]
      },
      {
        h2: 'E-Ticarette Kargo Maliyeti Optimizasyonu',
        paragraphs: ['Vakumlu paketleme hacmi %40–60 azaltır. Pazaryeri anlaşmalı kargo perakendeye göre %30–50 ucuzdur.'],
        subsections: [
          { h3: 'Ücretsiz Kargo Eşiği Belirleme', paragraphs: ['50 ₺\'lik üründe 36 ₺ kargo sürdürülemez. Eşiği desi maliyetine göre hesaplayın.'] }
        ]
      },
      {
        h2: 'Desi Hesaplayıcı Kullanım Senaryoları',
        paragraphs: ['Yeni ürün lansmanında paket boyutu seçimi, iade lojistik maliyeti ve pazaryeri kâr hesabıyla birlikte kullanın.']
      }
    ],
    faq: [
      { q: 'Desi nasıl hesaplanır?', a: '(En cm × Boy cm × Yükseklik cm) ÷ 3000 = desi (kg).' },
      { q: 'Hangi ağırlık faturalandırılır?', a: 'max(desi, gerçek kg) — hangisi büyükse o.' },
      { q: '30×20×15 cm paket kaç desi?', a: '9000 ÷ 3000 = 3 desi.' },
      { q: 'İade kargosu da desiden mi?', a: 'Evet, çoğu platformda iade de aynı desi kuralıyla faturalanır.' }
    ]
  },
  t11: {
    sections: [
      {
        h2: 'Stok Devir Hızı Nedir ve Nasıl Hesaplanır?',
        paragraphs: ['Devir hızı = satılan miktar ÷ ortalama stok. Yıllık devir 8 ise stok ortalama 45 günde bir yenilenir. Nakit akışının kalp atışıdır.'],
        subsections: [
          { h3: 'Sektöre Göre Benchmark Değerler', paragraphs: ['Kozmetikte 12–24 devir normal; elektronikte 4–6 kabul edilebilir. Çok hızlı devir tükenme riski taşır.'] },
          { h3: 'Bağlı Sermaye Analizi', paragraphs: ['150 adet × 100 ₺ = 15.000 ₺ depoda bağlı sermaye. Devir hızlandıkça bu para nakde döner.'] }
        ]
      },
      {
        h2: 'ABC Analizi ve Stok Optimizasyonu',
        paragraphs: ['Satışların %80\'i %20 SKU\'dan gelir. A grubuna stok güvenliği, C grubuna minimum stok. 180 gün+ rafta kalan ürün indirim adayıdır.'],
        subsections: [
          { h3: 'Emniyet Stoğu Hesabı', paragraphs: ['Emniyet stoğu = (max günlük satış × max tedarik süresi) − (ortalama satış × ortalama süre).'] }
        ]
      },
      {
        h2: '2026 E-Ticaret Stok Yönetimi',
        paragraphs: ['Black Friday ve Ramazan için planı 2–3 ay önce yapın. Çin ithalatında 45–90 gün tedarik tamponu şarttır.']
      }
    ],
    faq: [
      { q: 'İyi stok devir hızı kaçtır?', a: 'Sektöre göre değişir; yılda 6–12 arası çoğu e-ticaret için sağlıklı kabul edilir.' },
      { q: 'Devir hızı düşükse ne yapmalı?', a: 'Fazla SKU\'yu budayın, kampanya/bundle yapın, tedarik süresini kısaltın.' },
      { q: 'Dropshipping\'te devir hesaplanır mı?', a: 'Fiziksel stok yoksa klasik devir uygulanmaz; tedarik süresi müşteri memnuniyetini belirler.' },
      { q: 'Bağlı sermaye neden önemli?', a: 'Depodaki para başka yatırımda kullanılamaz; fırsat maliyeti oluşturur.' }
    ]
  },
  t12: {
    sections: [
      {
        h2: 'ROI (Yatırım Geri Dönüş Oranı) Nasıl Hesaplanır?',
        paragraphs: ['ROI% = (Net kâr ÷ Toplam yatırım) × 100. 90 günde %43 ROI yıllıklandırıldığında farklı risk profili verir.'],
        subsections: [
          { h3: 'Payback Süresi ve Nakit Akışı', paragraphs: ['Geri ödeme = yatırım ÷ aylık net nakit. Kâr kadar nakit zamanlaması da kritiktir.'] },
          { h3: 'Yıllıklandırılmış ROI Karşılaştırması', paragraphs: ['Mevduat veya fon getirisiyle kıyaslayın. Toplu alım risk primi en az 2–3 kat üzerinde olmalıdır.'] }
        ]
      },
      {
        h2: 'Toplu Alım-Satım Risk Analizi',
        paragraphs: ['Likidite, fiyat düşüşü ve talep belirsizliği birlikte değerlendirilmeli. 120 günde %50 satılamayan stok için stop-loss planı yapın.'],
        subsections: [
          { h3: 'Ara Giderlerin ROI Etkisi', paragraphs: ['Kargo, depo, gümrük ve sigorta toplam yatırımı şişirir; mutlaka dahil edin.'] }
        ]
      },
      {
        h2: '2026 E-Ticaret Yatırım Kararları',
        paragraphs: ['Vadeli tedarik nakit akışını rahatlatır ama stok riski artar. Bu araçla senaryoları hızlıca kıyaslayın.']
      }
    ],
    faq: [
      { q: 'İyi ROI oranı nedir?', a: 'Sektöre göre değişir; toplu alımda yıllık %50+ hedef yaygındır, riskle birlikte değerlendirin.' },
      { q: 'Yıllık ROI nasıl hesaplanır?', a: 'Dönem ROI × (365 ÷ gün sayısı). Araç otomatik hesaplar.' },
      { q: 'Ciroyu kârla karıştırmayın', a: 'ROI net kâr üzerinden hesaplanır; 155K ciro 47K kâr demek değildir.' },
      { q: 'Negatif ROI ne anlama gelir?', a: 'Yatırımın geri dönmediği, zarar edildiği anlamına gelir.' }
    ]
  },
  t13: {
    sections: [
      {
        h2: 'KM Başına Yakıt Maliyeti Nasıl Hesaplanır?',
        paragraphs: ['Yakıt (L) = mesafe × (tüketim ÷ 100). Toplam = litre × fiyat. KM başı = toplam ÷ mesafe. Broşür tüketimi ile gerçek arasında %10–20 fark olağandır.'],
        subsections: [
          { h3: 'Gerçek Tüketim Verisi Toplama', paragraphs: ['Fuelio veya Drivvo ile tank dolumlarından gerçek L/100 km hesaplayın.'] },
          { h3: 'Kişi Başına Maliyet Paylaşımı', paragraphs: ['Carpool senaryosunda toplam yakıt ÷ yolcu sayısı adil paylaşım verir.'] }
        ]
      },
      {
        h2: 'Yakıt Tasarrufu ve Sürüş Alışkanlıkları',
        paragraphs: ['90 km/s cruise, 120 km/s\'e göre %15–25 tasarruf. Sert kalkış-fren %20–30 fazla tüketir. Lastik basıncı ayda bir kontrol edilmeli.'],
        subsections: [
          { h3: 'Hibrit ve Dizel Karşılaştırması', paragraphs: ['Dizelde uzun yol, hibritte şehir içi avantajlıdır. Aynı mesafede farklı yakıt türü maliyeti değişir.'] }
        ]
      },
      {
        h2: '2026 Seyahat Bütçesi Planlama',
        paragraphs: ['Yaz tatili ve bayram öncesi litre fiyatları dalgalanır. Bu araçla tek seferlik veya düzenli güzergâh maliyetini önceden görün.']
      }
    ],
    faq: [
      { q: '100 km\'de 7,5 litre ne kadar yakıt?', a: '350 km\'de 26,25 litre. Fiyatla çarpınca toplam maliyet çıkar.' },
      { q: 'Klima tüketimi ne kadar artırır?', a: 'Ortalama %5–15 ek yük; sıcak havalarda daha belirgindir.' },
      { q: 'Yıllık yakıt bütçesi nasıl hesaplanır?', a: 'Yıllık km × (tüketim/100) × litre fiyatı.' },
      { q: 'Elektrikli araç için bu araç uygun mu?', a: 'Hayır, bu araç benzin/dizel L/100 km içindir; EV için kWh/100 km hesabı gerekir.' }
    ]
  },
  t14: {
    sections: [
      {
        h2: 'KM Başı Bakım Maliyeti Nedir?',
        paragraphs: ['Yakıt tek başına gerçeği göstermez. Yıllık bakım + lastik + değer kaybı ÷ yıllık km = km başı toplam maliyet (TCO bileşeni).'],
        subsections: [
          { h3: 'Periyodik Bakım Kalemleri', paragraphs: ['Yağ-filtre 10–15K km, fren 30–50K km, triger 60–120K km. Erteleme pahalıya patlar.'] },
          { h3: 'Lastik KM Başı Maliyeti', paragraphs: ['8.000 ₺ set ÷ 40.000 km = 0,20 ₺/km. Rotasyon ömrü %20–30 uzatır.'] }
        ]
      },
      {
        h2: 'Toplam Sahiplik Maliyeti (TCO)',
        paragraphs: ['TCO = yakıt + bakım + lastik + sigorta + vergi + değer kaybı. Az km yapan araçta birim maliyet yüksektir.'],
        subsections: [
          { h3: 'Kiralama vs Satın Alma', paragraphs: ['TCO karşılaştırması standart yöntemdir. Bu araç yakıt dışı kalemlerin km dağılımını verir.'] }
        ]
      },
      {
        h2: '2026 Araç Bakım Planlaması',
        paragraphs: ['Yetkili servis vs bağımsız usta maliyet farkı %30–50 olabilir. Garanti süresince yetkili tercih edin.']
      }
    ],
    faq: [
      { q: 'KM başı bakım ortalaması nedir?', a: 'Araç tipine göre 0,50–2 ₺/km arası değişir; lüks ve yaşlı araçlarda daha yüksek.' },
      { q: 'Değer kaybı neden hesaba katılmalı?', a: 'Satışta geri alamadığınız fark gerçek maliyettir; özellikle ilk 3 yılda yüksektir.' },
      { q: 'Lastik ömrü kaç km?', a: 'Kalite ve kullanıma göre 30.000–60.000 km; agresif sürüşte daha kısa.' },
      { q: 'Bu araç yakıt dahil mi?', a: 'Hayır, yalnızca bakım, lastik ve değer kaybı payını hesaplar.' }
    ]
  },
  t15: {
    sections: [
      {
        h2: 'Scooter Varyatör Kayışı Ne Zaman Değişir?',
        paragraphs: ['Üretici aralığı genelde 6.000–10.000 km. Devir artıyor hız artmıyorsa kayış kayıyordur. Kopma trafikte ani duruş demektir.'],
        subsections: [
          { h3: 'Kayış Aşınma Belirtileri', paragraphs: ['Titreşim, ses, hızlanma gecikmesi erken uyarıdır. 18–20 mm kayış 17 mm altına düşünce değişim zamanı gelmiştir.'] },
          { h3: '125cc Scooter Bakım Aralıkları', paragraphs: ['Motolux MTX 125, Kuba Çınar 125 gibi modellerde yağ 3–5K km, kayış 6–10K km, buji 10–15K km.'] }
        ]
      },
      {
        h2: 'Varyatör Bagaları (Ağırlıkları) Performansı Nasıl Etkiler?',
        paragraphs: ['Yanlış ağırlık profili kayış ömrünü kısaltır. Malossi/Polini upgrade sonrası OEM kayış uyumsuz kalabilir. Kasnak yüzeyi pürüzsüz olmalıdır.'],
        subsections: [
          { h3: 'Varyatör Filtresi ve Soğutma', paragraphs: ['Tıkalı centrifugal filter varyatörü ısıtır; kayış ömrü yarıya inebilir. 5–6K km\'de üfleme önerilir.'] },
          { h3: '125cc Scooter Debriyaj Bakım Rehberi', paragraphs: ['Debriyaj balatası ve kısa vites dişlileri yağ kalitesiyle doğrudan ilişkilidir. Düşük kalite yağ varyatör yükünü artırır.'] }
        ]
      },
      {
        h2: 'Sürüş Tarzı ve Bakım Takvimi',
        paragraphs: ['Agresif sürüş kayış ömrünü %30–40 kısaltır. Bu araç sürüş tarzı çarpanını hesaba katarak tahmini bakım tarihi verir.']
      }
    ],
    faq: [
      { q: 'Scooter kayışı kaç km\'de değişir?', a: 'Genelde 6.000–10.000 km; marka, sürüş tarzı ve filtre bakımına göre değişir.' },
      { q: 'Kayış koparsa ne olur?', a: 'Güç aktarımı kesilir; trafikte ani durma ve yürüyen aksam hasarı riski vardır.' },
      { q: 'Varyatör ruloları ne zaman değişir?', a: 'Kayış değişiminde mutlaka kontrol edin; aşınmış rulo yeni kayışı erken tüketir.' },
      { q: 'Günlük km nasıl tahmin edilir?', a: 'Son 30 gün toplam km ÷ 30 veya işe gidiş-geliş × çalışma günü.' }
    ]
  },
  t16: {
    sections: [
      {
        h2: 'Araç Aküsü Şarj Süresi Nasıl Hesaplanır?',
        paragraphs: ['Doldurulacak Ah = kapasite × (1 − mevcut%). Süre = (doldurulacak ÷ verimlilik) ÷ şarj akımı. 45 Ah akü %20\'den %5A ile ~8 saat.'],
        subsections: [
          { h3: 'Amper-Saat (Ah) ve Şarj Akımı İlişkisi', paragraphs: ['Kural: şarj akımı kapasitenin ~%10\'u (45 Ah için 4–5A). Yüksek akım acil içindir, rutinde ömrü kısaltır.'] },
          { h3: 'Şarj Verimliliği Farkları', paragraphs: ['Akıllı şarj %90, eski trafolu cihaz %75 verimlilikte kalır. Bulk-absorption-float profili ömrü uzatır.'] }
        ]
      },
      {
        h2: 'Akü Bakımı ve Önleyici Tedbirler',
        paragraphs: ['Kurşun-asit akü 3–5 yıl ömür verir. Uzun parkta ayda bir kısa şarj veya trickle charger kullanın.'],
        subsections: [
          { h3: 'AGM/EFB ve Lithium Farkları', paragraphs: ['Start-stop araçlarda AGM/EFB gerekir; profil seçimi yanlışsa şarj süresi ve ömür etkilenir.'] }
        ]
      },
      {
        h2: '2026 Kış Ayları Akü Rehberi',
        paragraphs: ['Soğukta CCA düşer; marş zorlanır. Jumper sonrası alternatör tam şarj etmez — harici şarj şarttır.']
      }
    ],
    faq: [
      { q: '45 Ah akü kaç saatte dolar?', a: '%20\'den %5A ve %90 verimle yaklaşık 8 saat; seviye ve cihaza göre değişir.' },
      { q: 'Hızlı şarj aküye zarar verir mi?', a: 'Sürekli 10A+ kapasiteyi eritir; acil durum dışında %10 kuralına uyun.' },
      { q: 'Alternatör aküyü tam doldurur mu?', a: 'Kısa sürüşlerde hayır; haftalık uzun sürüş veya harici şarj gerekir.' },
      { q: 'Şarj gücü watt nasıl hesaplanır?', a: '12V × amper (ör. 5A = 60W). Araç bunu gösterir.' }
    ]
  },
  t17: {
    sections: [
      {
        h2: 'Sunucu Bandwidth İhtiyacı Nasıl Hesaplanır?',
        paragraphs: ['Aylık BW (GB) = (ziyaretçi × sayfa/ziyaret × ortalama MB) ÷ 1024. 50K ziyaret × 3 sayfa × 1,5 MB ≈ 220 GB/ay.'],
        subsections: [
          { h3: 'Sayfa Boyutu Optimizasyonu', paragraphs: ['Brotli/Gzip metni %60–70 küçültür. WebP görseller JPEG\'e göre %25–35 hafiftir.'] },
          { h3: 'CDN ve Origin Yükü', paragraphs: ['CDN origin trafiğini %70–90 azaltır; bandwidth planı buna göre küçültülebilir.'] }
        ]
      },
      {
        h2: 'Hosting Kota Aşımı Riski',
        paragraphs: ['"Sınırsız" planlar fair use ile sınırlıdır. Aşım cezası GB başına 0,05–0,15 $ olabilir. %50 tampon bırakın.'],
        subsections: [
          { h3: 'Ölçeklenebilir Hosting Seçimi', paragraphs: ['50.000+ aylık ziyaretçide shared hosting yetmez; VPS veya cloud düşünün.'] }
        ]
      },
      {
        h2: '2026 Web Performans ve Trafik',
        paragraphs: ['Core Web Vitals düşükse hem SEO hem kullanıcı kaybı olur. JS bundle küçültme hesaplama sitelerinde kritiktir.']
      }
    ],
    faq: [
      { q: 'Bandwidth ve trafik aynı şey mi?', a: 'Evet, hosting panelinde aylık transfer kotası olarak geçer.' },
      { q: '1 milyon PV kaç GB eder?', a: 'Sayfa başı 1,5 MB ile yaklaşık 1.465 GB; sayfa boyutuna bağlıdır.' },
      { q: 'CDN bandwidth\'i düşürür mü?', a: 'Evet, statik dosyalar edge\'den servis edilir; origin kotanız azalır.' },
      { q: 'Limit 0 ne demek?', a: 'Araçta sınırsız plan simülasyonu; gerçekte fair use olabilir.' }
    ]
  },
  t18: {
    sections: [
      {
        h2: 'Yazılım Projesi Bütçesi Nasıl Tahmin Edilir?',
        paragraphs: ['WBS (iş kırılımı) yöntemi: ekran × saat × entegrasyon çarpanı. %20–30 PM ve test payı standarttır.'],
        subsections: [
          { h3: 'Ekran Bazlı Tahminleme', paragraphs: ['Basit CRUD 4–6 saat, dashboard 12–16 saat, wizard 16–24 saat. Deneyimle kalibre edin.'] },
          { h3: 'Entegrasyon Karmaşıklığı', paragraphs: ['Ödeme, OAuth, ERP entegrasyonu göründüğünden 3–5 kat uzun sürer. Legacy çarpanı 2,0.'] }
        ]
      },
      {
        h2: 'Adam/Saat ve Teslim Süresi',
        paragraphs: ['2 kişilik ekip, günde 8 saat: toplam saat ÷ 2 ÷ 8 = iş günü. Velocity ölçerek sprint sprint güncelleyin.'],
        subsections: [
          { h3: 'Fixed-Price Teklif Risk Payı', paragraphs: ['Belirsizlik yüksekse %20–30 risk payı ekleyin. Production bug geliştirmeden 5–15 kat pahalıdır.'] }
        ]
      },
      {
        h2: '2026 Yazılım Fiyatlandırma Trendleri',
        paragraphs: ['Türkiye\'de saatlik 300–800 ₺ bandı yaygın; AI destekli geliştirme bazı ekranları hızlandırır ama entegrasyon aynı kalır.']
      }
    ],
    faq: [
      { q: 'Adam/saat nedir?', a: 'Bir geliştiricinin bir saatlik çalışması; proje bütçesinin temel birimi.' },
      { q: 'PM payı neden %25?', a: 'Proje yönetimi, toplantı, dokümantasyon ve koordinasyon süresini kapsar.' },
      { q: '2 kişilik süre nasıl hesaplanır?', a: 'Toplam adam/saat ÷ ekip sayısı ÷ 8 saat/gün.' },
      { q: 'Bu teklif yerine geçer mi?', a: 'Hayır, ön tahmindir; detaylı analiz sonrası kesinleşir.' }
    ]
  },
  t19: {
    sections: [
      {
        h2: 'PSU Watt İhtiyacı Nasıl Hesaplanır?',
        paragraphs: ['CPU TDP + GPU TDP + (RAM×5) + (disk×8) + anakart payı = tahmini çekim. Güvenli PSU = min ÷ 0,8 × 1,25.'],
        subsections: [
          { h3: 'TDP ve Gerçek Güç Tüketimi', paragraphs: ['TDP etiket değeridir; boost anında %20–50 üzerine çıkılır. RTX 40 serisinde spike\'lar 400W+ görülebilir.'] },
          { h3: '80 Plus Verimlilik', paragraphs: ['Gold %87–90, Platinum %90–92. Verimsiz PSU fazla ısı ve fatura üretir.'] }
        ]
      },
      {
        h2: 'Güvenli Kapasite ve Headroom',
        paragraphs: ['GPU yükseltmesi planlıyorsanız 150–200W pay bırakın. RTX 40 için 12VHPWR uyumlu model seçin.'],
        subsections: [
          { h3: 'Modüler PSU Avantajları', paragraphs: ['Kablo yönetimi hava akışını iyileştirir; küçük kasalarda kritiktir.'] }
        ]
      },
      {
        h2: '2026 Gaming ve Workstation Güç Planlaması',
        paragraphs: ['PSU\'da tasarruf GPU\'yu riske atmaktan pahalıya gelir. Marka ve seri (Seasonic, Corsair RMx vb.) önemlidir.']
      }
    ],
    faq: [
      { q: '425W çekim için kaç W PSU?', a: 'Güvenli öneri 650–750W Gold; headroom için araç hesaplar.' },
      { q: 'TDP toplamı yeterli mi?', a: 'Başlangıç noktasıdır; %25–50 headroom ekleyin.' },
      { q: 'Aşırı büyük PSU verimsiz mi?', a: 'Çok düşük yükte verimlilik düşer; 40–60% yükte zirve yapar.' },
      { q: 'Mini-ITX için fark var mı?', a: 'Evet, SFX form faktörü ve daha düşük anakart payı seçilir.' }
    ]
  },
  t20: {
    sections: [
      {
        h2: 'IP Subnet ve CIDR Hesaplama Temelleri',
        paragraphs: ['Ağ adresi = IP AND mask. Broadcast = ağ OR NOT mask. Host sayısı = 2^(32-CIDR) − 2. /24 = 254 kullanılabilir host.'],
        subsections: [
          { h3: 'CIDR Notasyonu Pratik Kullanım', paragraphs: ['/30 point-to-point link (2 host), /26 sunucu VLAN (62 host), /24 kullanıcı ağı (254 host).'] },
          { h3: 'Private vs Public IP', paragraphs: ['10.x, 172.16–31.x, 192.168.x internete doğrudan çıkmaz; NAT ile dönüşür.'] }
        ]
      },
      {
        h2: 'Ağ Segmentasyonu ve Güvenlik',
        paragraphs: ['IoT ve misafir Wi-Fi ayrı subnet\'te tutulmalı. Firewall kuralları segment sınırında uygulanır.'],
        subsections: [
          { h3: 'IPv6 /64 Standartları', paragraphs: ['IPv6\'da adres kıtlığı yoktur; /64 LAN için standarttır.'] }
        ]
      },
      {
        h2: 'Subnet Hesaplayıcı Kullanım Senaryoları',
        paragraphs: ['Yeni ofis ağı planlama, VPS firewall kuralı, Docker network ve sınav hazırlığı için anlık ağ/broadcast/host aralığı verir.']
      }
    ],
    faq: [
      { q: '/24 subnet kaç host?', a: '254 kullanılabilir host (256 − ağ − broadcast).' },
      { q: '192.168.1.100/24 ağ adresi nedir?', a: '192.168.1.0; broadcast 192.168.1.255; host aralığı .1–.254.' },
      { q: '/30 ne zaman kullanılır?', a: 'Router-to-router point-to-point linklerde; yalnızca 2 host.' },
      { q: 'Subnet mask ile CIDR aynı mı?', a: 'Evet, farklı gösterim: /24 = 255.255.255.0.' }
    ]
  }
};

function renderSeoArticle(toolId) {
  const content = TOOL_CONTENT[toolId];
  if (!content) return '';
  let html = '<article class="seo-authority mt-8" aria-label="Detaylı rehber">';
  content.sections.forEach((section, idx) => {
    html += `<section class="seo-section${idx > 0 ? ' mt-8 pt-8 border-t border-slate-800' : ''}">`;
    html += `<h2 class="text-lg font-semibold text-indigo-300">${section.h2}</h2>`;
    section.paragraphs?.forEach(p => {
      html += `<p class="text-slate-300 text-sm leading-relaxed mt-3">${p}</p>`;
    });
    section.subsections?.forEach(sub => {
      html += `<h3 class="text-sm font-semibold text-violet-300 mt-5">${sub.h3}</h3>`;
      sub.paragraphs?.forEach(p => {
        html += `<p class="text-slate-400 text-sm leading-relaxed mt-2">${p}</p>`;
      });
    });
    html += '</section>';
  });
  html += '</article>';
  return html;
}

function renderFaq(toolId) {
  const faq = TOOL_CONTENT[toolId]?.faq;
  if (!faq?.length) return '';
  let html = `<section class="seo-faq mt-6" aria-labelledby="faq-title-${toolId}">`;
  html += `<h2 id="faq-title-${toolId}" class="text-lg font-semibold text-indigo-300 mb-4">Sıkça Sorulan Sorular</h2>`;
  html += '<div class="space-y-3">';
  faq.forEach(item => {
    html += '<details class="faq-item">';
    html += `<summary class="faq-q">${item.q}</summary>`;
    html += `<p class="faq-a">${item.a}</p>`;
    html += '</details>';
  });
  html += '</div></section>';
  return html;
}

function faqSchemaJson(toolId) {
  const faq = TOOL_CONTENT[toolId]?.faq;
  if (!faq?.length) return null;
  return {
    '@type': 'FAQPage',
    mainEntity: faq.map(item => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a }
    }))
  };
}

export { TOOL_CONTENT, renderSeoArticle, renderFaq, faqSchemaJson };
