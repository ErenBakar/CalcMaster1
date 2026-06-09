function calcT1() {
  const kg = gv('t1-kg'), g = gv('t1-g'), w = gv('t1-w'), s = gv('t1-s'), kwh = gv('t1-kwh') || 4.0, amort = gv('t1-amort') || 1.5, ek = gv('t1-ek'), kar = gv('t1-kar');
  const mal = (kg / 1000) * g, el = (w / 1000) * s * kwh, amortPay = s * amort, top = mal + el + amortPay + ek, satis = top * (1 + kar / 100), net = satis - top;
  sv('t1-r1', tl(mal)); sv('t1-r2', tl(el)); sv('t1-r3', tl(top)); sv('t1-r4', tl(satis)); sv('t1-r5', tl(net));
}

function calcT2() {
  const yog = gv('t2-tip') || 1.24, cap = gv('t2-cap') || 1.75, g = gv('t2-g');
  const r = cap / 2 / 10, hacim = g / yog, uzun = hacim / (Math.PI * r * r) / 100;
  sv('t2-r1', yog + ' g/cm³'); sv('t2-r2', fmt(hacim, 2) + ' cm³'); sv('t2-r3', fmt(uzun, 2) + ' metre');
}

function calcT3() {
  const noz = gv('t3-noz') || 0.4, lh = gv('t3-lh') || 0.2, hiz = gv('t3-hiz') || 60, hacim = gv('t3-hacim') || 50, dolgu = gv('t3-dolgu') || 20;
  const debi = noz * lh * hiz;
  const efHacim = hacim * 1000 * (dolgu / 100 + 0.25);
  const sure = efHacim / debi / 3600;
  const oran = lh / noz;
  let uyum = '✅ Uygun';
  if (oran < 0.25) uyum = '⚠️ Katman çok ince'; else if (oran > 0.75) uyum = '⚠️ Katman çok kalın';
  sv('t3-r1', fmt(sure, 1) + ' Saat'); sv('t3-r2', fmt(debi, 2) + ' mm³/s'); sv('t3-r3', uyum);
  const w = document.getElementById('t3-warn');
  if (debi > 15) { w.classList.remove('hidden'); w.textContent = '⚠️ Debi yüksek! Standart hot-end için max ~12 mm³/s. Baskı kalitesi düşebilir.'; }
  else { w.classList.add('hidden'); }
}

function calcT4() {
  const tip = gs('t4-tip'), nem = gv('t4-nem');
  const data = {
    PLA: { sicaklik: '45-50°C', base: 4, esik: 45 },
    PETG: { sicaklik: '55-65°C', base: 5, esik: 35 },
    ABS: { sicaklik: '60-70°C', base: 4, esik: 50 },
    TPU: { sicaklik: '50-60°C', base: 6, esik: 40 },
    ASA: { sicaklik: '60-70°C', base: 4, esik: 40 },
    PA: { sicaklik: '70-80°C', base: 8, esik: 25 },
    PVA: { sicaklik: '45-55°C', base: 6, esik: 20 }
  };
  const d = data[tip] || data['PLA'];
  const ekSure = nem > d.esik ? Math.ceil((nem - d.esik) / 10) : 0;
  const toplamSure = d.base + ekSure;
  sv('t4-r1', d.sicaklik);
  sv('t4-r2', toplamSure + ' Saat');
  const acil = nem > d.esik + 20 ? '🔴 ACİL — Hemen Kurut' : nem > d.esik ? '🟡 KURUTMA GEREKLİ' : '🟢 Filament Kuru';
  sv('t4-r3', acil);
  const tip2 = document.getElementById('t4-tip-text');
  tip2.classList.remove('hidden');
  tip2.textContent = nem > d.esik ? `${tip} için kritik nem eşiği %${d.esik}. Ortam nemi yüksek — kurutma şart.` : `${tip} için ortam nemi kabul edilebilir seviyede. Kapalı kap saklama önerilir.`;
}

function calcT5() {
  const borc = gv('t5-borc'), faiz = gv('t5-faiz'), taksit = gv('t5-taksit');
  const warnEl = document.getElementById('t5-warn'), tw = document.getElementById('t5-twrap'), tbody = document.getElementById('t5-tbody');
  warnEl.classList.add('hidden'); tw.classList.add('hidden'); tbody.innerHTML = '';
  if (!borc || !faiz || !taksit) { sv('t5-r1', '—'); sv('t5-r2', '—'); sv('t5-r3', '—'); return; }
  const ayFaiz = faiz / 100, minTak = borc * ayFaiz;
  if (taksit <= minTak) { warnEl.classList.remove('hidden'); warnEl.textContent = '⚠️ Aylık ödeme faizi karşılamıyor! Min: ' + fmt(minTak + 1) + ' ₺ gerekli.'; sv('t5-r1', 'Hiçbir zaman'); sv('t5-r2', '—'); sv('t5-r3', '—'); return; }
  let kalan = borc, ay = 0, toplam = 0; const rows = [];
  while (kalan > 0.01 && ay < 600) {
    ay++; const fi = kalan * ayFaiz, gercek = Math.min(taksit, kalan + fi), ana = gercek - fi;
    kalan = Math.max(0, kalan - ana); toplam += gercek;
    rows.push({ ay, gercek, fi, ana, kalan });
  }
  sv('t5-r1', ay + ' Ay (' + (Math.floor(ay / 12) > 0 ? Math.floor(ay / 12) + ' Yıl ' : '') + ay % 12 + ' Ay)');
  sv('t5-r2', tl(toplam)); sv('t5-r3', tl(toplam - borc));
  rows.slice(0, 360).forEach(r => {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${r.ay}</td><td>${fmt(r.gercek)} ₺</td><td class="rv-red" style="color:#f87171">${fmt(r.fi)} ₺</td><td style="color:#4ade80">${fmt(r.ana)} ₺</td><td>${fmt(r.kalan)} ₺</td>`;
    tbody.appendChild(tr);
  });
  tw.classList.remove('hidden');
}

function calcT6() {
  const net = gv('t6-net'), gider = gv('t6-gider'), hafta = gv('t6-hafta') || 40, proje = gv('t6-proje'), vergi = gv('t6-vergi') || 20;
  const aySaat = hafta * 4.33, brut = (net + gider) / (1 - vergi / 100), saatlik = brut / aySaat, ham = saatlik * proje, fatura = ham * (1 + vergi / 100);
  sv('t6-r1', tl(saatlik) + ' / Saat'); sv('t6-r2', tl(ham)); sv('t6-r3', tl(fatura)); sv('t6-r4', fmt(aySaat, 0) + ' Saat / Ay');
}

function calcT7() {
  const pv = gv('t7-pv'), ctr = parseFloat(document.getElementById('t7-ctr')?.value) || 2, cpc = gv('t7-cpc');
  const tiklama = pv * (ctr / 100), gun = tiklama * cpc, ay = gun * 30, yil = gun * 365;
  sv('t7-r1', fmt(tiklama, 0) + ' tıklama'); sv('t7-r2', tl(gun)); sv('t7-r3', tl(ay)); sv('t7-r4', tl(yil));
}

function calcT8() {
  const brut = gv('t8-brut'), gider = gv('t8-gider'), tip = gs('t8-tip');
  const matrah = Math.max(0, brut - gider);
  let vergi = 0;
  if (tip === 'kurumlar') { vergi = matrah * 0.25; }
  else {
    const dilimler = [[190000, 0.15], [400000, 0.20], [1000000, 0.27], [5300000, 0.35], [Infinity, 0.40]];
    let prev = 0, kalan = matrah;
    for (const [ust, oran] of dilimler) {
      if (kalan <= 0) break;
      const pay = Math.min(kalan, ust - prev);
      vergi += pay * oran; kalan -= pay; prev = ust;
    }
  }
  const net = matrah - vergi, efektif = matrah > 0 ? (vergi / matrah * 100) : 0;
  sv('t8-r1', tl(matrah)); sv('t8-r2', tl(vergi)); sv('t8-r3', '%' + fmt(efektif, 1)); sv('t8-r4', tl(net));
}

function calcT9() {
  const alis = gv('t9-alis'), satis = gv('t9-satis'), kom = gv('t9-kom'), kdv = gv('t9-kdv'), kargo = gv('t9-kargo'), diger = gv('t9-diger');
  const satisNetKdv = satis / (1 + kdv / 100), komisyon = satisNetKdv * (kom / 100), topMaliyet = alis + kargo + diger + komisyon, net = satisNetKdv - topMaliyet, marj = satisNetKdv > 0 ? (net / satisNetKdv * 100) : 0;
  sv('t9-r1', tl(komisyon)); sv('t9-r2', tl(topMaliyet)); sv('t9-r3', tl(net)); sv('t9-r4', '%' + fmt(marj, 1));
  const w = document.getElementById('t9-warn');
  if (net < 0) { w.classList.remove('hidden'); w.textContent = '🚨 ZARAR! Bu fiyatta satış yapmayın. Alış veya satış fiyatını gözden geçirin.'; }
  else { w.classList.add('hidden'); }
}

function calcT10() {
  const en = gv('t10-en'), boy = gv('t10-boy'), yuk = gv('t10-yuk'), kg = gv('t10-kg'), fiyat = gv('t10-fiyat');
  const desi = (en * boy * yuk) / 3000, fatAgirlik = Math.max(desi, kg), maliyet = fatAgirlik * fiyat;
  sv('t10-r1', fmt(desi, 3) + ' Desi'); sv('t10-r2', fmt(fatAgirlik, 2) + ' kg/desi');
  sv('t10-r3', tl(maliyet));
  const t = document.getElementById('t10-tip');
  t.textContent = desi > kg ? `📦 Hacimsel ağırlık belirleyici (${fmt(desi, 2)} desi > ${kg} kg). Paket boyutunu küçültün!` : `⚖️ Gerçek ağırlık belirleyici (${kg} kg > ${fmt(desi, 2)} desi).`;
}

function calcT11() {
  const satilan = gv('t11-satilan'), gun = gv('t11-gun') || 365, stok = gv('t11-stok'), maliyet = gv('t11-maliyet');
  const devir = stok > 0 ? satilan / stok : 0;
  const yillikDevir = gun > 0 ? devir * (365 / gun) : 0;
  const kalma = devir > 0 ? gun / devir : 0;
  const bagliSermaye = stok * maliyet;
  sv('t11-r1', fmt(yillikDevir, 1) + ' kez/yıl'); sv('t11-r2', fmt(kalma, 0) + ' Gün'); sv('t11-r3', tl(bagliSermaye, 0));
  const y = document.getElementById('t11-yorum');
  if (yillikDevir > 12) y.textContent = '🟢 Mükemmel! Stok çok hızlı dönüyor.';
  else if (yillikDevir > 6) y.textContent = '🟡 İyi. Sektör ortalamasında.';
  else if (yillikDevir > 3) y.textContent = '🟠 Orta. Stok optimizasyonu düşünün.';
  else y.textContent = '🔴 Düşük. Fazla stok bağlı sermayeyi zorluyor.';
}

function calcT12() {
  const alis = gv('t12-alis'), gider = gv('t12-gider'), satis = gv('t12-satis'), gun = gv('t12-gun') || 90;
  const yatirim = alis + gider, kar = satis - yatirim, roi = yatirim > 0 ? (kar / yatirim * 100) : 0, yillikRoi = roi * (365 / gun);
  sv('t12-r1', tl(yatirim, 0)); sv('t12-r2', tl(kar, 0)); sv('t12-r3', '%' + fmt(roi, 1)); sv('t12-r4', '%' + fmt(yillikRoi, 1));
}

function calcT13() {
  const fiyat = gv('t13-fiyat'), tuketim = gv('t13-tuketim'), mesafe = gv('t13-mesafe'), yolcu = gv('t13-yolcu') || 1;
  const yakit = mesafe * (tuketim / 100), toplam = yakit * fiyat, kmBasi = mesafe > 0 ? toplam / mesafe : 0, kisi = toplam / yolcu;
  sv('t13-r1', fmt(yakit, 2) + ' Litre'); sv('t13-r2', tl(toplam)); sv('t13-r3', tl(kmBasi) + '/km'); sv('t13-r4', tl(kisi));
}

function calcT14() {
  const bakim = gv('t14-bakim'), lastik = gv('t14-lastik'), lastikOmur = gv('t14-lastikOmur') || 1, km = gv('t14-km') || 1, deger = gv('t14-deger');
  const kmBakim = bakim / km, kmLastik = lastik / lastikOmur, kmDeger = deger / km, toplam = kmBakim + kmLastik + kmDeger;
  sv('t14-r1', tl(kmBakim) + '/km'); sv('t14-r2', tl(kmLastik) + '/km'); sv('t14-r3', tl(kmDeger) + '/km'); sv('t14-r4', tl(toplam) + '/km');
}

function calcT15() {
  const anlik = gv('t15-anlik'), son = gv('t15-sonKm'), periyot = gv('t15-periyot') || 8000, gunluk = gv('t15-gunluk') || 35, tarz = parseFloat(document.getElementById('t15-tarz')?.value) || 1.0;
  const gecen = anlik - son, etkinPeriyot = periyot * tarz, kalan = Math.max(0, etkinPeriyot - gecen), kalanGun = gunluk > 0 ? Math.ceil(kalan / gunluk) : 0;
  const tarih = new Date(); tarih.setDate(tarih.getDate() + kalanGun);
  const tarihStr = tarih.toLocaleDateString('tr-TR', { day: '2-digit', month: 'long', year: 'numeric' });
  sv('t15-r1', fmt(gecen, 0) + ' KM');
  sv('t15-r2', kalan <= 0 ? '⚠️ AŞILDI!' : fmt(kalan, 0) + ' KM');
  sv('t15-r3', kalan <= 0 ? 'HEMEN BAKIMA' : '~' + tarihStr);
  const d = document.getElementById('t15-durum');
  const yuzde = etkinPeriyot > 0 ? gecen / etkinPeriyot * 100 : 0;
  if (yuzde >= 100) { d.className = 'berr'; d.textContent = '🔴 KRİTİK! Kayış ömrü aşıldı. Acil bakım gerekiyor!'; }
  else if (yuzde >= 80) { d.className = 'bwarn'; d.textContent = '🟡 DİKKAT! Yakında bakım zamanı. (%' + fmt(yuzde, 0) + ' kullanıldı)'; }
  else { d.className = 'bok'; d.textContent = '🟢 Normal. Ömrün %' + fmt(yuzde, 0) + "'i kullanıldı."; }
}

function calcT16() {
  const ah = gv('t16-ah'), amper = gv('t16-amper'), seviye = gv('t16-seviye'), verim = parseFloat(document.getElementById('t16-verim')?.value) || 0.9;
  const dolu = (100 - seviye) / 100, dolacak = ah * dolu, net = dolacak / verim, sure = amper > 0 ? net / amper : 0, watt = 12 * amper;
  const saat = Math.floor(sure), dak = Math.round((sure - saat) * 60);
  sv('t16-r1', fmt(dolacak, 1) + ' Ah'); sv('t16-r2', saat + 's ' + dak + 'dk'); sv('t16-r3', fmt(watt, 0) + ' Watt');
  const o = document.getElementById('t16-oneri');
  if (amper > ah * 0.2) { o.className = 'bwarn'; o.textContent = '⚡ Şarj akımı yüksek! Önerilen max: ' + fmt(ah * 0.1, 1) + ' A. Akü ömrü kısalabilir.'; }
  else { o.className = 'bok'; o.textContent = '✅ Şarj akımı uygun aralıkta.'; }
}

function calcT17() {
  const z = gv('t17-z'), s = gv('t17-s') || 1, mb = gv('t17-mb'), limit = gv('t17-limit');
  const toplamGor = z * s, gb = (toplamGor * mb) / 1024, gunluk = gb / 30;
  sv('t17-r1', fmt(toplamGor, 0) + ' görüntüleme'); sv('t17-r2', fmt(gb, 2) + ' GB'); sv('t17-r3', fmt(gunluk, 2) + ' GB/gün');
  const d = document.getElementById('t17-durum');
  if (limit <= 0) { d.className = 'bok'; d.textContent = '✅ Sınırsız plan — sorun yok.'; }
  else if (gb > limit) { d.className = 'berr'; d.textContent = '🚨 AŞIM! Limitin ' + fmt(gb - limit, 2) + ' GB üzerinde. Plan yükseltin.'; }
  else if (gb > limit * 0.8) { d.className = 'bwarn'; d.textContent = '⚠️ Yüksek risk! Limitin %' + fmt(gb / limit * 100, 0) + "'ini kullanıyorsunuz."; }
  else { d.className = 'bok'; d.textContent = '✅ Güvende. Limitin %' + fmt(gb / limit * 100, 0) + "'ini kullanıyorsunuz."; }
}

function calcT18() {
  const ekran = gv('t18-ekran'), ekranSaat = gv('t18-ekranSaat'), enteg = parseFloat(document.getElementById('t18-enteg')?.value) || 1.0, saatUcret = gv('t18-saat'), pm = gv('t18-pm');
  const gelistirme = ekran * ekranSaat * enteg, toplam = gelistirme * (1 + pm / 100), butce = toplam * saatUcret, sure = toplam / 2 / 8;
  sv('t18-r1', fmt(gelistirme, 0) + ' Adam/Saat'); sv('t18-r2', fmt(toplam, 0) + ' Adam/Saat'); sv('t18-r3', tl(butce, 0)); sv('t18-r4', fmt(sure, 1) + ' İş Günü');
}

function calcT19() {
  const cpu = gv('t19-cpu'), gpu = gv('t19-gpu'), ram = gv('t19-ram'), disk = gv('t19-disk'), ana = gv('t19-tip') || 40;
  const sistem = cpu + gpu + (ram * 5) + (disk * 8) + ana, minPSU = sistem / 0.8, guvenli = minPSU * 1.25;
  sv('t19-r1', fmt(sistem, 0) + ' Watt'); sv('t19-r2', fmt(minPSU, 0) + ' Watt'); sv('t19-r3', fmt(guvenli, 0) + ' Watt');
  const o = document.getElementById('t19-oneri');
  let oneri = '';
  if (guvenli <= 350) oneri = '💡 Önerilen: 550W 80+ Bronze';
  else if (guvenli <= 500) oneri = '💡 Önerilen: 650W 80+ Gold';
  else if (guvenli <= 700) oneri = '💡 Önerilen: 850W 80+ Gold';
  else oneri = '💡 Önerilen: 1000W+ 80+ Platinum';
  o.textContent = oneri;
}

function calcT20() {
  const ipStr = gs('t20-ip'), cidr = gi('t20-mask') || 24;
  const parts = ipStr.split('.').map(Number);
  if (parts.length !== 4 || parts.some(p => isNaN(p) || p < 0 || p > 255)) { sv('t20-r1', 'Geçersiz IP'); sv('t20-r2', '—'); sv('t20-r3', '—'); sv('t20-r4', '—'); return; }
  const ipInt = (parts[0] << 24) | (parts[1] << 16) | (parts[2] << 8) | parts[3];
  const mask = cidr === 0 ? 0 : (~0 << (32 - cidr)) >>> 0;
  const network = (ipInt & mask) >>> 0;
  const broadcast = (network | (~mask >>> 0)) >>> 0;
  const firstHost = (network + 1) >>> 0;
  const lastHost = (broadcast - 1) >>> 0;
  const hostCount = Math.pow(2, 32 - cidr) - 2;
  const toIP = n => [(n >>> 24) & 255, (n >>> 16) & 255, (n >>> 8) & 255, n & 255].join('.');
  sv('t20-r1', toIP(network) + '/' + cidr); sv('t20-r2', toIP(broadcast));
  sv('t20-r3', toIP(firstHost) + ' — ' + toIP(lastHost)); sv('t20-r4', hostCount > 0 ? fmt(hostCount, 0) + ' host' : 'Geçersiz');
}

const CALC_INIT = {
  t1: calcT1, t2: calcT2, t3: calcT3, t4: calcT4, t5: calcT5,
  t6: calcT6, t7: calcT7, t8: calcT8, t9: calcT9, t10: calcT10,
  t11: calcT11, t12: calcT12, t13: calcT13, t14: calcT14, t15: calcT15,
  t16: calcT16, t17: calcT17, t18: calcT18, t19: calcT19, t20: calcT20
};

function initCalculator(toolId) {
  const fn = CALC_INIT[toolId];
  if (fn) fn();
}
