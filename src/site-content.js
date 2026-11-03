/* Bilingual copy for the public pages (landing, about, privacy, disclaimer) and the agent files.
   Inline syntax inside strings: [text](href) for links, **text** for emphasis. Everything else is escaped.
   Keep it spoiler-free: describe themes, never plot twists, routes or endings. */

export const UPDATED = '2026-11-03';
export const REPO = 'https://github.com/jstdlee/sim4love';
export const ISSUES = 'https://github.com/jstdlee/sim4love/issues';
export const EMAIL = 'sim4love@ohmyai.xyz';
const MAIL = '[' + EMAIL + '](mailto:' + EMAIL + ')';

export const STORAGE_KEYS = [
  ['sim4love.save.v2', 'Your autosave: chapter, choices, stats and the name you typed', '自动存档：章节、选择、数值，以及你输入的名字'],
  ['sim4love.progress', 'Which chapters you have finished', '你已完成的章节'],
  ['sim4love.gallery', 'Endings and scenes you have unlocked', '你已解锁的结局与场景'],
  ['sim4love.locale', 'Your language (English or 简体中文)', '你选择的语言（English 或简体中文）'],
  ['sim4love.age14', 'That you confirmed you are 14 or older', '你已确认自己年满14岁'],
  ['sim4love.age14.no', 'That you answered “not yet 14”, so the game stays closed', '你回答了“未满14岁”，游戏会保持关闭'],
  ['sim4love.bgm.vol', 'Music volume', '音乐音量'],
  ['sim4love.bgm.mute', 'Music on or off', '音乐开关'],
  ['sim4love.social', 'Whether phone-chat pop-ups are shown', '是否显示手机聊天弹窗'],
];

const en = {
  lang: 'en-SG', htmlLang: 'en-SG', ogLocale: 'en_SG', prefix: '',
  nav: { home: 'Home', about: 'About', privacy: 'Privacy', disclaimer: 'Disclaimer', play: 'Play free', switchLabel: '中文', switchAria: '切换到中文' },
  footer: {
    note: 'sim4love is fiction made for learning. It is not professional advice and is not affiliated with MOE or any school.',
    help: 'Need help now? In an emergency call **999** (Police) or **995** (Ambulance). [More Singapore helplines](/disclaimer#help).',
    source: 'Contact: ' + MAIL + ' · Source and feedback on [GitHub](' + REPO + ').',
  },
  home: {
    title: 'sim4love: a free visual novel about healthy relationships for Singapore teens',
    desc: 'A free anime visual novel for teens 14+ in Singapore. Explore healthy relationships, consent, self-respect, money sense, online safety and family through your own choices. In English and 简体中文, right in your browser.',
    tagline: 'A visual novel about real love',
    lead: 'One year at a Singapore junior college. Your choices, your values, your story. A free interactive story for teens 14+ about healthy relationships, self-respect and growing up.',
    cta: 'Play free in your browser', cta2: 'For parents and educators',
    facts: [['Free', 'no ads, no purchases'], ['14+', 'no explicit content'], ['2–3 hours', '20 chapters'], ['EN · 中文', 'switch any time'], ['No account', 'no download']],
    topicsTitle: 'What you will explore',
    topics: [
      ['Healthy relationships', 'See what respect, trust and good communication look like, and learn to spot red flags by what people do, not by labels.'],
      ['Consent and boundaries', 'Practise saying no, hearing no and checking in. The story is non-graphic: the most you will see is a hug.'],
      ['Self-respect', 'Love is one part of life. Your goals, passion, health and friendships count too, and the game keeps score of all of them.'],
      ['Money sense', 'Money management for teens in SGD: pocket money, gifts, lending to friends, and the classic scam pitches.'],
      ['Online safety', 'Cyber wellness in practice: catfishing, requests for photos, oversharing, and where to report in Singapore.'],
      ['Family and values', 'Different families, cultures and hopes for the future. Learn to disagree well, from the HDB dinner table to big life plans.'],
    ],
    sgTitle: 'Made in and for Singapore',
    sg: 'The story is set in a fictional Singapore neighbourhood: a JC, secondary-school friends, the MRT, hawker centres, HDB void decks and the shadow of NS. A multicultural cast talks the way people here actually talk. Where the story touches on something serious, in-game cards point to real, verified Singapore support services.',
    eduTitle: 'For parents, educators and school counsellors',
    edu: 'sim4love can be a low-pressure way to open conversations about relationships, sexuality education and cyber wellness, alongside CCE lessons or at home. It is fiction for learning, not counselling, and it is not an official MOE resource. [Read more about using it](/about#educators).',
    howTitle: 'How to play',
    how: [
      'Open **Play** in any modern browser, on a phone or a computer.',
      'Pass a quick Cloudflare check. There is no sign-up.',
      'Confirm that you are 14 or older.',
      'Tap or press Space to read on, and 1–3 to choose. Progress saves in your browser automatically.',
    ],
    faqTitle: 'Questions',
    faq: [
      ['Is sim4love free?', 'Yes. It is completely free, with no ads, no in-game purchases and no account.'],
      ['What age is it for?', 'Ages 14 and up. It deals with dating, peer pressure, online scams and relationship red flags in an educational, non-graphic way. There is no explicit content; the most you will see on screen is a hug.'],
      ['Can teachers or counsellors use it?', 'Yes. Its themes fit naturally beside lessons on healthy relationships, sexuality education, cyber wellness and financial literacy. Please play it yourself first. It is an independent project and is not endorsed by MOE or any school.'],
      ['Do you collect my data?', 'We do not collect or store personal information. Your progress stays in your own browser. Cloudflare, our host, processes technical data such as your IP address to deliver the site and keep bots out. See the [privacy policy](/privacy).'],
      ['Which languages are available?', 'English and Simplified Chinese (简体中文). Switch any time on the title screen or in Settings.'],
      ['Does it work on phones?', 'Yes. It is built mobile-first and runs in any modern browser. Nothing to install.'],
      ['Why is there a verification step?', 'Cloudflare Turnstile keeps automated bots out. It usually passes on its own, and it sets one functional cookie that lasts 7 days so you are not asked again.'],
      ['What if something in the story feels close to home?', 'Talk to someone you trust. In Singapore you can call SOS on 1767 or mindline on 1771, any time. The [disclaimer page](/disclaimer#help) lists every helpline used in the game.'],
    ],
  },
  about: {
    title: 'About sim4love: an educational interactive story for teens in Singapore',
    desc: 'What sim4love is, who it is for, how to play, and how parents, teachers and school counsellors can use this free visual novel about healthy relationships, consent and money sense.',
    h1: 'About sim4love',
    lead: 'sim4love is a free, hand-drawn anime visual novel about love, choices and becoming someone you like. It is set over one ordinary year in Singapore and made for teens aged 14 and up.',
    sections: [
      ['what', 'What it is', [
        { p: 'You play a student at a junior college and meet a mix of classmates, neighbours and new friends. Every choice says something about who you are. You are not here to “win” anyone; you are here to find out what you want from love, and from your own life.' },
        { ul: ['20 chapters in 5 parts, about 2–3 hours for one run', '240+ choices, with bad endings you can rewind straight away', 'A notebook of 119 short lessons and 7 optional Think Deeper cards', '“Your Life” meters for goals, passion, health and wallet', 'English and 简体中文, fully translated, including every help card', 'An original soundtrack, released CC0'] },
      ]],
      ['themes', 'What it teaches, without lectures', [
        { p: 'The game mixes humour with honest situations young people in Singapore actually face. Lessons arrive through consequences, not sermons.' },
        { ul: ['**Healthy relationships**: respect, trust, honesty and handling conflict', '**Consent and boundaries**: asking, listening and respecting a no', '**Self-respect**: keeping your own goals, friends and health in the picture', '**Money sense**: budgeting in SGD, gifts, lending, and spotting scams', '**Online safety and cyber wellness**: image requests, catfishing, doxxing and reporting', '**Family**: different cultures and expectations, and how to disagree kindly'] },
      ]],
      ['audience', 'Who it is for', [
        { ul: ['**Teens 14+** in secondary school, JC, ITE or poly who like stories and want to think things through privately', '**Parents** looking for an easy way into conversations about dating, money and life online', '**Educators and school counsellors** who want a discussion starter for CCE, sexuality education or cyber wellness'] },
      ]],
      ['educators', 'Using it with students', [
        { p: 'sim4love works well as a shared experience to talk about afterwards. Some ideas:' },
        { ul: ['Play a chapter together, pause at a choice, and ask the class what each option says about the person choosing it.', 'Compare a rewound bad ending with the better path: what was the warning sign?', 'Use a Think Deeper card as a balanced prompt. There is no single right answer.', 'Point out the in-game help cards, so students know which Singapore services exist.'] },
        { p: 'Please preview it before using it with a class, and follow your school’s own guidelines. sim4love is an independent project. It is not produced, reviewed or endorsed by MOE or any school.' },
      ]],
      ['rating', 'Content note: 14+', [
        { p: 'sim4love deals with dating, peer pressure, online scams and relationship red flags, always in an educational, non-graphic way. There is no explicit content, and the most you will see on screen is a hug. Red flags are shown through behaviour, and the game never shames the player.' },
      ]],
      ['play', 'How to play', [
        { ol: ['Open [Play](/play) in a modern browser on your phone or computer.', 'Pass the quick Cloudflare Turnstile check (no sign-up).', 'Confirm that you are 14 or older.', 'Tap or press Space to advance, 1–3 to choose. ⚙ opens Settings for music, language and chat pop-ups.'] },
        { p: 'Progress, language and music settings save automatically in your browser. Clearing your browser’s site data resets everything.' },
      ]],
      ['made', 'Who made it', [
        { p: 'sim4love is a small independent project. All dialogue is written by hand; there is no live AI in the game. The source is public on [GitHub](' + REPO + '), and that is the best place to send [feedback or corrections](' + ISSUES + '). For anything you would rather not post in public, email ' + MAIL + '.' },
      ]],
    ],
  },
  privacy: {
    title: 'Privacy policy | sim4love',
    desc: 'sim4love has no accounts, analytics, ads or trackers and does not collect or store personal information. Progress stays in your browser. How Cloudflare Turnstile and our one functional cookie work.',
    h1: 'Privacy policy',
    lead: 'The short version: no accounts, no analytics, no ads and no trackers. We do not collect or store personal information. Your progress stays on your own device.',
    sections: [
      ['summary', 'In short', [
        { ul: ['We do not ask for your name, email, phone number, school or age, and we do not store any of it.', 'There are no accounts, analytics, advertising or tracking scripts, and no social-media pixels.', 'Your game progress is saved only in your own browser.', 'Our host, Cloudflare, processes technical data (such as your IP address) to deliver the site and to tell people apart from bots.', 'We set one functional cookie, s4l_pass, so you are not asked to verify again for 7 days.'] },
      ]],
      ['device', 'What stays in your browser', [
        { p: 'The game uses your browser’s localStorage to remember where you are. This data never leaves your device and we cannot see it. These are all the keys it uses:' },
        { keys: true },
        { p: 'The name you type on the title screen is part of your autosave and stays in your browser too. To delete everything, clear this site’s data in your browser settings, or use a private window.' },
      ]],
      ['cookie', 'The one cookie', [
        { p: 'After you pass the verification check, the site sets **s4l_pass**: a signed, HttpOnly cookie that lasts 7 days. It contains only an expiry time and a signature. It does not identify you and is not used for tracking. It is strictly necessary to let you into the game, so there is no cookie banner.' },
      ]],
      ['cloudflare', 'Cloudflare and Turnstile', [
        { p: 'sim4love runs on Cloudflare Workers. Like every website host, Cloudflare needs technical data such as your IP address, browser type and the pages requested in order to deliver the site and protect it from abuse. Before you play, Cloudflare Turnstile checks that you are a person and not a bot; to do so it processes signals from your browser and device.' },
        { p: 'Cloudflare handles this data under its own policies: the [Cloudflare Privacy Policy](https://www.cloudflare.com/privacypolicy/) and the [Turnstile Privacy Addendum](https://www.cloudflare.com/turnstile-privacy-policy/). We do not add logging, analytics or storage of our own. The Cloudflare dashboard shows us only aggregate figures such as total request counts and error rates.' },
      ]],
      ['pdpa', 'Singapore’s PDPA', [
        { p: 'Singapore’s [Personal Data Protection Act 2012 (PDPA)](https://www.pdpc.gov.sg/overview-of-pdpa/the-legislation/personal-data-protection-act) sets rules for how organisations collect, use and disclose personal data. We have designed sim4love to need as little data as possible: we do not collect personal data ourselves, and the technical data that hosting requires is processed by Cloudflare as our service provider. We do not claim any certification.' },
      ]],
      ['young', 'Young players', [
        { p: 'sim4love is meant for ages 14 and up. Because we do not collect personal information, there is nothing for a young player to hand over. The age question is answered on your device and stored only there.' },
      ]],
      ['links', 'Links to other sites', [
        { p: 'Help cards and these pages link to official Singapore services and to GitHub. Those sites have their own privacy policies.' },
      ]],
      ['contact', 'Changes and contact', [
        { p: 'If this policy changes, the date below will change too. Questions? Email ' + MAIL + ' or open an issue on [GitHub](' + ISSUES + '). Issues are public, so please do not post personal details there.' },
        { p: 'If you email us, we receive your email address and whatever you write. We use it only to reply, we do not add you to any list, and you can ask us to delete the conversation at any time. Mail to this address is forwarded by Cloudflare Email Routing to the maintainer\'s personal inbox.' },
      ]],
    ],
  },
  disclaimer: {
    title: 'Disclaimer and Singapore help resources | sim4love',
    desc: 'sim4love is fiction made for learning, not professional advice. All characters are fictional and the game is not affiliated with MOE or any school. Verified Singapore helplines: SOS 1767, mindline 1771, ScamShield 1799 and more.',
    h1: 'Disclaimer',
    lead: 'sim4love is a work of fiction made for learning. Please read it as a story, not as advice.',
    sections: [
      ['fiction', 'Fiction for education', [
        { p: 'All characters, names and events in sim4love are fictional. Any resemblance to real people is a coincidence. **Bayview JC** and the **Seri Bayu** neighbourhood are made up. Real Singapore places such as the MRT, hawker centres and Sentosa appear only as everyday backdrops.' },
      ]],
      ['advice', 'Not professional advice', [
        { p: 'The story, notebook lessons and Think Deeper cards share general information to start reflection and conversation. They are not medical, legal, financial, psychological or counselling advice, and they do not replace a doctor, counsellor, lawyer or other qualified professional. If you are worried about your health, safety or money, please talk to a trusted adult or a professional.' },
      ]],
      ['affiliation', 'No affiliation', [
        { p: 'sim4love is an independent project. It is not affiliated with, produced for or endorsed by the Ministry of Education (MOE), any school, any government agency, or any of the services listed below. Mentions of CCE, sexuality education or cyber wellness describe topics, not an official curriculum.' },
      ]],
      ['help', 'Singapore help resources', [
        { p: 'These are the same services shown on the in-game help cards. Details were checked against each service’s official page on {verified}. Opening hours can change, so please check the linked page.' },
        { help: true },
        { p: 'If you or someone else is in immediate danger, call **999** (Police) or **995** (Ambulance) now.' },
      ]],
      ['warranty', 'No warranty', [
        { p: 'We work to keep the information accurate, but the game is provided as is, without any warranty. Spotted something wrong or out of date? Please tell us at ' + MAIL + ' or on [GitHub](' + ISSUES + ').' },
      ]],
    ],
  },
};

const zh = {
  lang: 'zh-SG', htmlLang: 'zh-Hans-SG', ogLocale: 'zh_SG', prefix: '/zh',
  nav: { home: '首页', about: '关于', privacy: '隐私', disclaimer: '免责声明', play: '免费开玩', switchLabel: 'English', switchAria: 'Switch to English' },
  footer: {
    note: 'sim4love 是为学习而写的虚构故事，不是专业建议，也与教育部（MOE）或任何学校无关。',
    help: '现在就需要帮助？紧急情况请拨 **999**（警察）或 **995**（救护车）。[更多新加坡求助热线](/zh/disclaimer#help)。',
    source: '联系：' + MAIL + ' · 源代码与反馈：[GitHub](' + REPO + ')。',
  },
  home: {
    title: 'sim4love：写给新加坡青少年的免费恋爱教育视觉小说',
    desc: '一款免费的动漫风视觉小说，适合新加坡14岁以上青少年。用你自己的选择，探索健康的恋爱关系、同意与界限、自尊、理财、网络安全和家庭。支持简体中文与英文，打开浏览器就能玩。',
    tagline: '一部关于真实爱情的视觉小说',
    lead: '在新加坡初级学院的一年。你的选择，你的价值观，你的故事。一部写给14岁以上青少年的免费互动故事，关于健康的关系、自尊与成长。',
    cta: '在浏览器里免费开玩', cta2: '给家长和老师',
    facts: [['免费', '无广告、无内购'], ['14+', '无露骨内容'], ['2–3 小时', '共20章'], ['中文 · EN', '随时切换'], ['无需账号', '无需下载']],
    topicsTitle: '你会探索什么',
    topics: [
      ['健康的恋爱关系', '看看尊重、信任和良好沟通是什么样子，学会从对方的行为（而不是标签）认出危险信号。'],
      ['同意与界限', '练习说“不”、听见“不”，以及主动确认对方的感受。故事没有露骨内容，最多只是一个拥抱。'],
      ['自尊自爱', '爱情只是生活的一部分。你的目标、热情、健康和友谊同样重要，游戏会把它们都算进去。'],
      ['理财观念', '用新元学理财：零用钱、送礼、借钱给朋友，还有常见的诈骗套路。'],
      ['网络安全', '网络健康（cyber wellness）实战：网恋诈骗、被要求发照片、过度分享，以及在新加坡该向哪里举报。'],
      ['家庭与价值观', '不同的家庭、文化和对未来的期待。从组屋饭桌到人生规划，学会好好地表达不同意见。'],
    ],
    sgTitle: '在新加坡制作，为新加坡而写',
    sg: '故事发生在一个虚构的新加坡社区：初院、中学老同学、地铁、小贩中心、组屋楼下的空地，还有国民服役（NS）的影子。多元种族的角色说着本地人真正会说的话。故事碰到严肃话题时，游戏里的求助卡会指向真实、经过核实的新加坡支援服务。',
    eduTitle: '给家长、老师和学校辅导员',
    edu: 'sim4love 可以作为轻松的开场，在家里或配合品格与公民教育（CCE）课程，聊聊恋爱关系、性教育和网络健康。它是用于学习的虚构作品，不是心理辅导，也不是教育部的官方资源。[了解如何使用](/zh/about#educators)。',
    howTitle: '怎么玩',
    how: [
      '在任何现代浏览器打开**开始游戏**，手机或电脑都可以。',
      '通过 Cloudflare 的快速验证，不需要注册。',
      '确认你已年满14岁。',
      '点击或按空格键继续，按 1–3 做选择。进度会自动保存在你的浏览器里。',
    ],
    faqTitle: '常见问题',
    faq: [
      ['sim4love 免费吗？', '完全免费，没有广告、没有内购，也不需要账号。'],
      ['适合几岁？', '14岁以上。游戏以教育性、非露骨的方式谈到约会、同侪压力、网络诈骗和恋爱中的危险信号。没有露骨内容，画面上最多只是一个拥抱。'],
      ['老师或辅导员可以使用吗？', '可以。它的主题很适合配合健康关系、性教育、网络健康和理财教育的课程。请先自己玩一遍。这是独立项目，没有获得教育部或任何学校的认可。'],
      ['你们会收集我的资料吗？', '我们不收集、也不存储个人信息。你的进度只保存在你自己的浏览器里。我们的托管商 Cloudflare 会处理 IP 地址等技术数据，用来提供网站和阻挡机器人。详见[隐私政策](/zh/privacy)。'],
      ['有哪些语言？', '简体中文和英文。在标题画面或设置里随时切换。'],
      ['手机能玩吗？', '能。游戏以手机优先设计，任何现代浏览器都能运行，不用安装。'],
      ['为什么要先验证？', 'Cloudflare Turnstile 用来挡住自动化机器人，通常会自动通过。它会设置一个有效期7天的功能性 Cookie，这样你就不用一再验证。'],
      ['如果故事里的情节让我想起自己的事怎么办？', '找一个你信任的人聊聊。在新加坡，你可以随时拨打援人协会 SOS 1767 或 mindline 1771。[免责声明页面](/zh/disclaimer#help)列出了游戏里用到的所有求助热线。'],
    ],
  },
  about: {
    title: '关于 sim4love：写给新加坡青少年的教育互动故事',
    desc: '介绍 sim4love 是什么、适合谁、怎么玩，以及家长、老师和学校辅导员可以怎样使用这款关于健康关系、同意与理财的免费视觉小说。',
    h1: '关于 sim4love',
    lead: 'sim4love 是一款免费的手绘动漫风视觉小说，讲爱情、选择，以及成为一个你喜欢的自己。故事发生在新加坡平凡的一年，写给14岁以上的青少年。',
    sections: [
      ['what', '这是什么', [
        { p: '你扮演一名初级学院的学生，认识同学、邻居和新朋友。每一个选择都在说明你是怎样的人。你不是来“攻略”谁的，而是来弄清楚你想从爱情、从自己的人生中得到什么。' },
        { ul: ['5部共20章，玩一轮大约2–3小时', '超过240个选择，坏结局可以马上倒带重来', '笔记本收录119条小课题，另有7张可选的“深入想想”卡', '“我的生活”指标：目标、热情、健康和钱包', '简体中文与英文完整翻译，包括每一张求助卡', '原创配乐，以 CC0 方式公开'] },
      ]],
      ['themes', '它教什么（不说教）', [
        { p: '游戏把幽默和新加坡年轻人真实会遇到的处境放在一起。道理来自选择的后果，而不是说教。' },
        { ul: ['**健康的恋爱关系**：尊重、信任、诚实和处理冲突', '**同意与界限**：主动询问、认真倾听、尊重对方的“不”', '**自尊自爱**：别把自己的目标、朋友和健康丢在一边', '**理财观念**：用新元做预算、送礼、借钱，以及识破诈骗', '**网络安全与网络健康**：被要求发照片、网恋诈骗、人肉搜索和举报', '**家庭**：不同的文化与期待，以及怎样温和地表达不同意见'] },
      ]],
      ['audience', '适合谁', [
        { ul: ['**14岁以上的青少年**：中学、初院、工艺教育学院或理工学院学生，喜欢故事，也想私下想清楚一些事', '**家长**：想找个轻松的切入点，聊聊约会、金钱和网络生活', '**老师和学校辅导员**：想为品格与公民教育（CCE）、性教育或网络健康课找个讨论引子'] },
      ]],
      ['educators', '和学生一起使用', [
        { p: 'sim4love 很适合先一起体验，再一起讨论。一些做法：' },
        { ul: ['一起玩一章，在选择处暂停，问大家每个选项说明了做选择的人是怎样的人。', '比较倒带前的坏结局和更好的路线：危险信号出现在哪里？', '用一张“深入想想”卡作为平衡的讨论题，没有唯一的正确答案。', '指出游戏里的求助卡，让学生知道新加坡有哪些支援服务。'] },
        { p: '在课堂使用前请先自己预览，并遵守学校的相关指引。sim4love 是独立项目，不是由教育部或任何学校制作、审核或认可的。' },
      ]],
      ['rating', '内容提示：14+', [
        { p: 'sim4love 以教育性、非露骨的方式谈到约会、同侪压力、网络诈骗和恋爱中的危险信号。没有露骨内容，画面上最多只是一个拥抱。危险信号通过行为来呈现，游戏从不羞辱玩家。' },
      ]],
      ['play', '怎么玩', [
        { ol: ['用手机或电脑的现代浏览器打开[开始游戏](/play?lang=zh-SG)。', '通过 Cloudflare Turnstile 快速验证（不需要注册）。', '确认你已年满14岁。', '点击或按空格键继续，按 1–3 做选择。⚙ 打开设置，可调整音乐、语言和聊天弹窗。'] },
        { p: '进度、语言和音乐设置会自动保存在你的浏览器里。清除浏览器的网站数据就会全部重置。' },
      ]],
      ['made', '谁做的', [
        { p: 'sim4love 是一个小型独立项目。所有对白都由人手写成，游戏里没有实时 AI。源代码公开在 [GitHub](' + REPO + ')，欢迎在那里[提出反馈或指正](' + ISSUES + ')。不方便公开的事，可以发邮件到 ' + MAIL + '。' },
      ]],
    ],
  },
  privacy: {
    title: '隐私政策 | sim4love',
    desc: 'sim4love 没有账号、分析工具、广告或追踪器，不收集也不存储个人信息。进度只保存在你的浏览器。说明 Cloudflare Turnstile 和唯一一个功能性 Cookie 的作用。',
    h1: '隐私政策',
    lead: '简单来说：没有账号、没有分析工具、没有广告、没有追踪器。我们不收集也不存储个人信息。你的进度只留在你自己的设备上。',
    sections: [
      ['summary', '重点', [
        { ul: ['我们不会问你的名字、电邮、电话、学校或年龄，也不存储这些资料。', '没有账号、分析、广告或追踪脚本，也没有社交媒体像素。', '游戏进度只保存在你自己的浏览器里。', '我们的托管商 Cloudflare 会处理技术数据（例如 IP 地址），用来提供网站并分辨真人与机器人。', '我们只设置一个功能性 Cookie：s4l_pass，让你在7天内不必再次验证。'] },
      ]],
      ['device', '保存在你浏览器里的数据', [
        { p: '游戏使用浏览器的 localStorage 记住你的进度。这些数据不会离开你的设备，我们也看不到。以下是它用到的全部键名：' },
        { keys: true },
        { p: '你在标题画面输入的名字也属于自动存档，同样只留在你的浏览器里。想全部删除，可以在浏览器设置里清除本网站的数据，或使用无痕窗口。' },
      ]],
      ['cookie', '唯一的 Cookie', [
        { p: '通过验证后，网站会设置 **s4l_pass**：一个经过签名、HttpOnly、有效期7天的 Cookie。它只包含到期时间和签名，不能识别你的身份，也不用于追踪。它是进入游戏所必需的，所以没有 Cookie 横幅。' },
      ]],
      ['cloudflare', 'Cloudflare 与 Turnstile', [
        { p: 'sim4love 运行在 Cloudflare Workers 上。和所有网站托管商一样，Cloudflare 需要处理 IP 地址、浏览器类型和所请求的页面等技术数据，才能提供网站并防止滥用。开始游戏前，Cloudflare Turnstile 会确认你是真人而不是机器人，为此它会处理来自你的浏览器和设备的信号。' },
        { p: 'Cloudflare 依照它自己的政策处理这些数据：[Cloudflare 隐私政策](https://www.cloudflare.com/privacypolicy/)和 [Turnstile 隐私附录](https://www.cloudflare.com/turnstile-privacy-policy/)（英文）。我们自己没有加入任何日志、分析或存储。Cloudflare 后台只向我们显示总请求数、错误率等汇总数字。' },
      ]],
      ['pdpa', '新加坡个人资料保护法（PDPA）', [
        { p: '新加坡的[《2012年个人资料保护法》（PDPA）](https://www.pdpc.gov.sg/overview-of-pdpa/the-legislation/personal-data-protection-act)规定了机构如何收集、使用和披露个人资料。我们把 sim4love 设计成尽量不需要任何资料：我们自己不收集个人资料，托管所需的技术数据由 Cloudflare 作为服务商处理。我们不声称拥有任何认证。' },
      ]],
      ['young', '年轻玩家', [
        { p: 'sim4love 适合14岁以上。因为我们不收集个人信息，年轻玩家没有什么需要交出来的。年龄问题在你的设备上回答，也只保存在那里。' },
      ]],
      ['links', '其他网站的链接', [
        { p: '求助卡和这些页面会链接到新加坡官方服务和 GitHub。那些网站有各自的隐私政策。' },
      ]],
      ['contact', '更新与联系', [
        { p: '如果这份政策有变，下面的日期也会更新。有问题？请发邮件到 ' + MAIL + '，或到 [GitHub](' + ISSUES + ') 开一个 issue。Issue 是公开的，请不要在那里留下个人资料。' },
        { p: '如果你发邮件给我们，我们会收到你的邮箱地址和你写的内容。我们只用它来回复你，不会把你加入任何名单，你也可以随时要求我们删除这段往来。寄到这个地址的邮件由 Cloudflare Email Routing 转发到维护者的个人邮箱。' },
      ]],
    ],
  },
  disclaimer: {
    title: '免责声明与新加坡求助资源 | sim4love',
    desc: 'sim4love 是为学习而写的虚构作品，不是专业建议。所有角色均为虚构，与教育部或任何学校无关。经核实的新加坡求助热线：SOS 1767、mindline 1771、ScamShield 1799 等。',
    h1: '免责声明',
    lead: 'sim4love 是为学习而写的虚构作品。请把它当作故事来读，而不是建议。',
    sections: [
      ['fiction', '为教育而写的虚构故事', [
        { p: 'sim4love 中的所有角色、名字和事件都是虚构的，如与真人相似，纯属巧合。**湾景初院（Bayview JC）**和**斯里巴尤（Seri Bayu）**社区都是虚构的。地铁、小贩中心、圣淘沙等真实的新加坡地点只作为日常背景出现。' },
      ]],
      ['advice', '不是专业建议', [
        { p: '故事、笔记本小课题和“深入想想”卡分享的是一般信息，用来引发思考和对话。它们不是医疗、法律、财务、心理或辅导建议，也不能取代医生、辅导员、律师或其他合格专业人士。如果你担心自己的健康、安全或金钱问题，请找信任的大人或专业人士谈谈。' },
      ]],
      ['affiliation', '没有从属关系', [
        { p: 'sim4love 是独立项目，与教育部（MOE）、任何学校、任何政府机构或下列任何服务都没有从属关系，也不是为它们制作或经它们认可的。提到品格与公民教育（CCE）、性教育或网络健康，只是在描述主题，并非官方课程。' },
      ]],
      ['help', '新加坡求助资源', [
        { p: '这些就是游戏求助卡里列出的服务。资料已于 {verified} 根据各服务的官方网页核实。服务时间可能会变，请以链接页面为准。' },
        { help: true },
        { p: '如果你或别人正面临即时危险，请立刻拨打 **999**（警察）或 **995**（救护车）。' },
      ]],
      ['warranty', '不提供保证', [
        { p: '我们会尽力保持资料准确，但游戏按现状提供，不附带任何保证。发现错误或过时的资料？请发邮件到 ' + MAIL + '，或在 [GitHub](' + ISSUES + ') 告诉我们。' },
      ]],
    ],
  },
};

export const COPY = { en, zh };
