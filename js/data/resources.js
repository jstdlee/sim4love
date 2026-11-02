/* Safety / help cards shown with {resource:'id'}.
   Per-locale tables (see docs/ARCHITECTURE.md §10 i18n). Default locale: en-SG (Singapore, English).
   Every contact below was checked on its official website on 2026-11-02 (see `src`). Re-verify before each
   release: tests should warn when `verified` is more than 12 months old. Never invent a number. */
(function () {
  const VERIFIED = '2026-11-02';
  // Shared Singapore contacts (name, how to reach, hours, official source).
  const SG = {
    emergency:  { name: 'Emergency', how: 'Police 999 (or SMS 70999) · Ambulance 995', hours: '24/7', src: 'https://onlinesafety.mlaw.gov.sg/getting-help/reporting-to-the-osc/' },
    sos:        { name: 'Samaritans of Singapore (SOS)', how: 'Call 1767 · CareText on WhatsApp 9151 1767', hours: '24/7', src: 'https://www.sos.org.sg/our-services/' },
    mindline:   { name: 'national mindline 1771', how: 'Call 1771 · WhatsApp 6669 1771 · webchat mindline.sg/fsmh', hours: '24/7', src: 'https://www.moh.gov.sg/newsroom/national-mindline-1771-to-provide--round-the-clock-support-for-mental-health/' },
    chat:       { name: 'CHAT (youth mental health, ages 16–30)', how: '6493 6500 / 6493 6501 · *SCAPE, 2 Orchard Link #04-07', hours: 'Tue–Sat 12pm–9pm', src: 'https://www.nhghealth.com.sg/imh/chat/about-chat/contact-us' },
    scamshield: { name: 'ScamShield Helpline', how: 'Call 1799 (overseas +65 6869 1799) · ScamShield app · scamshield.gov.sg', hours: '24/7', src: 'https://www.scamshield.gov.sg/check-for-scams/scamshield-helpline/' },
    osc:        { name: 'Online Safety Commission', how: 'Report intimate image abuse, image-based child abuse or doxxing at onlinesafety.mlaw.gov.sg', hours: 'online', src: 'https://onlinesafety.mlaw.gov.sg/getting-help/reporting-to-the-osc/' },
    shecares:   { name: 'SHECARES support centre (online harms)', how: 'Call 8001 01 4616 · WhatsApp 8985 5528', hours: 'Mon–Fri 9am–9pm', src: 'https://she.org.sg/shecares-scwo' },
    sacc:       { name: 'AWARE Sexual Assault Care Centre', how: 'Call 6779 0282 (any age, any gender)', hours: 'Mon–Fri 10am–6pm', src: 'https://www.aware.org.sg/womens-care-centre/sexual-assault-care-centre-sacc/' },
    dsc:        { name: 'DSC Clinic (STI testing and treatment)', how: '31 Kelantan Lane #01-16 · 6293 9648', hours: 'Mon–Fri 8am–4pm', src: 'https://www.nhghealth.com.sg/find-care/Clinic/nsc-dsc-kelantan-clinic' },
    afa:        { name: 'Action for AIDS Anonymous HIV Testing', how: '31 Kelantan Lane · no name or NRIC needed', hours: 'Tue & Wed 6:30–8:30pm, Sat 1:30–3:30pm', src: 'https://afa.org.sg/what-we-do/hiv-sti-testing-and-linkage-to-care/anonymous-testing-service-ats/' },
    healthhub:  { name: 'HealthHub: sexually transmitted infections', how: 'healthhub.sg/programmes/sexually-transmitted-infections', hours: 'online', src: 'https://www.healthhub.sg/programmes/sexually-transmitted-infections' },
    ccs:        { name: 'Credit Counselling Singapore', how: 'Call 6225 5227 · ccs.org.sg', hours: 'Mon–Fri 9am–6pm', src: 'https://ccs.org.sg/see-your-options/contact-ccs/' },
  };
  const line = c => `${c.name}: ${c.how} (${c.hours})`;

  const en = { // advice text, locale-neutral English; contacts added per locale below
    sextortion: { title: 'If someone threatens to share your photos', lines: [
      'Do not pay and do not send anything more.', 'Keep screenshots of the account and messages, then block and report it on the platform.',
      'Tell a trusted adult. It is a crime against you — you are not in trouble.'], contacts: ['emergency', 'osc', 'shecares', 'scamshield'] },
    scam: { title: 'If someone asks you for money online', lines: [
      'Never send money, gift cards or crypto to someone you have only met online or just met.', 'Urgent + secret + money = stop and talk to someone.'],
      contacts: ['scamshield', 'emergency'] },
    images: { title: 'Intimate images', lines: [
      'Never ask for, keep, or forward intimate images — for minors this is a serious crime.', 'If you receive one, do not share it; report it and tell a trusted adult.'],
      contacts: ['osc', 'shecares', 'emergency'] },
    mentalhealth: { title: 'When someone you love is struggling', lines: [
      'Listen without judging; you do not have to fix it.', 'Encourage them to talk to a counsellor, doctor or trusted adult.',
      'If they talk about hurting themselves, contact a crisis line or emergency services right away.', 'Look after yourself too.'],
      contacts: ['sos', 'mindline', 'chat', 'emergency'] },
  };

  // Locale tables. en-SG = English text + Singapore contacts. Add 'zh-SG' with translated text and the same
  // contacts (plus Mandarin-language lines where they exist) — see docs/ARCHITECTURE.md §10.
  const build = (texts, contacts) => Object.fromEntries(Object.entries(texts).map(([id, r]) => [id,
    { title: r.title, lines: r.lines.concat((r.contacts || []).map(k => line(contacts[k]))), contacts: r.contacts, verified: VERIFIED }]));

  window.RESOURCE_CONTACTS = { 'en-SG': SG };
  window.RESOURCES_BY_LOCALE = { 'en-SG': build(en, SG) };
  window.RESOURCE_LOCALE_FALLBACK = ['en-SG'];
  const want = (typeof localStorage !== 'undefined' && localStorage.getItem('sim4love.locale')) || 'en-SG';
  window.RESOURCES = window.RESOURCES_BY_LOCALE[want] || window.RESOURCES_BY_LOCALE['en-SG'];
})();
