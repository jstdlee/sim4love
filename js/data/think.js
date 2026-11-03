/* Think Deeper cards (GAME_DESIGN §6.2). Optional, never graded, no lens is "correct".
   Each card: hook → 2–3 lenses (structural · personal · cultural) → Singapore facts with a source →
   "us vs the problem" reframe → a question. The engine adds the fixed closing line (ui 'deeper.closing').
   Facts were checked against the linked official pages on 2026-11-02; re-verify before each release. */
window.THINK_VERIFIED = '2026-11-02';
window.THINK = {
  consumption: {
    title: 'Why does spending feel like love?', mentor: 'ogawa',
    hook: 'A gift, a treat, a "top gifter" badge. Why does paying for someone feel like caring for them?',
    lenses: [
      { kind: 'structural', text: 'Ads, feeds and checkout buttons are designed by very smart people to link spending with feelings: belonging, status, being a good partner. Instalments and "buy now, pay later" make the price feel smaller than it is.' },
      { kind: 'personal', text: 'You still choose. A budget you set calmly beats a decision made at 1 a.m. with a heart emoji on screen. The most remembered gifts are usually time, attention and something handmade.' },
      { kind: 'cultural', text: 'Families differ. For some, generous gifts and treating others show respect and "face"; for others, saving is the respectful thing. Neither is wrong, but it helps to know which one you grew up with.' },
    ],
    sg: [
      { t: 'MoneySense says credit card interest here is about 25% to 29% a year on any unpaid balance. Paying only the minimum on a $5,000 bill can take about 14.5 years.', src: 'https://www.moneysense.gov.sg/understanding-credit-card-interest-and-charges/' },
      { t: 'MoneySense, the national financial literacy programme, advises paying off the highest-interest debt first, including instalment plans.', src: 'https://www.moneysense.gov.sg/managing-debt-what-can-you-do/' },
    ],
    reframe: 'The pull to spend is built into the system around you. That is not your partner\'s fault, and it is not a test of love.',
    question: 'Which of these explains your last impulse buy best?',
  },
  genderwar: {
    title: 'Online it\'s "men vs women". Is it?', mentor: 'farah',
    hook: 'Your feed says boys and girls are enemies: one side has it easy, the other side pays. Who gains from that story?',
    lenses: [
      { kind: 'structural', label: 'Costs and platforms', text: 'Rising costs of housing, weddings and raising children squeeze young men and young women at the same time. Outrage also earns clicks: platforms tend to reward posts that make groups angry at each other, because anger keeps people scrolling.' },
      { kind: 'personal', text: 'Whatever the feed says, each couple can set its own fair terms: who pays for what, who does which chores, whose career goes first and when. Real people are not averages.' },
      { kind: 'cultural', text: 'Many parents grew up with "the man provides, the woman cares". Some couples still like that; many want something else. Expectations from home shape what each of you thinks is "fair" before you even talk.' },
    ],
    sg: [
      { t: 'Male citizens and second-generation permanent residents serve about two years of full-time National Service, usually right after school.', src: 'https://www.mindef.gov.sg/national-service/' },
      { t: 'The Ministry of Manpower reported a 14.3% pay gap between men and women in 2023, or 6.0% when comparing similar jobs and hours. It names job types, caregiving and discrimination as causes.', src: 'https://www.mom.gov.sg/newsroom/parliament-questions-and-replies/2024/0402-written-answer-to-pq-on-gender-pay-gap' },
    ],
    reframe: 'Both of you are facing the same price tags. A war between the two of you is the least useful fight available.',
    question: 'Which lens feels closest to what you see around you?',
  },
  careerpressure: {
    title: 'Whose expectations are these?', mentor: 'farah',
    hook: 'Grades, the "right" course, the "right" job. When you imagine failing, whose face do you see?',
    lenses: [
      { kind: 'structural', text: 'A small, competitive economy rewards credentials, and entry to courses and scholarships is decided by results. The pressure is real, and it was not invented by your parents or your partner.' },
      { kind: 'personal', text: 'Effort matters, and so does rest. You also get to write your own definition of success: a job you can grow in, a life with time for people and the things you love.' },
      { kind: 'cultural', text: 'Many parents sacrificed a lot so their children could study. Their hopes often come from love and fear at the same time. You can honour that and still choose your path, with a plan.' },
    ],
    sg: [
      { t: 'Many scholarships come with a bond. PSC undergraduate scholarships, for example, usually mean four to six years of work for the government after graduating.', src: 'https://www.psc.gov.sg/scholarships/undergraduate-scholarships/psc-scholarships' },
      { t: 'Every Singaporean aged 25 and above receives SkillsFuture Credit for courses, with more for mid-career workers aged 40 and above. Learning does not end at your A-levels.', src: 'https://www.skillsfuture.gov.sg/initiatives/mid-career/credit' },
    ],
    reframe: 'Exam stress is a weather system over everyone in the cohort. Help each other through it instead of making it a contest.',
    question: 'Where does most of your pressure come from right now?',
  },
  nstiming: {
    title: 'Two years "behind"?', mentor: 'dad',
    hook: 'Haziq says: "By the time we ORD, the girls in our batch are already in year two of uni." Is anyone actually behind?',
    lenses: [
      { kind: 'structural', text: 'National needs set the NS timeline. Different people lose different years to different things: service, caregiving, illness, a parent\'s job abroad. Timelines were never equal to begin with.' },
      { kind: 'personal', text: 'What matters is how you use the time: skills, fitness, friendships, savings, a clearer idea of what you want to study. Two years can be a head start in maturity.' },
      { kind: 'cultural', text: 'For many families, NS is a point of pride, and also a time of worry. Your parents may have their own stories about it. Ask them.' },
    ],
    sg: [
      { t: 'Full-time National Service lasts two years for most servicemen, followed by years of reservist training.', src: 'https://www.cmpb.gov.sg/parents-guide/your-sons-ns-commitments/' },
      { t: 'MOM notes that women here still shoulder more of the care for children and elders, which also shapes career timelines.', src: 'https://www.mom.gov.sg/newsroom/press-releases/2020/0109-singapores-adjusted-gender-pay-gap-narrows-to-6-percent' },
    ],
    reframe: 'Comparing timelines turns partners into rivals. You are not racing each other; you are both on a road with different bumps.',
    question: 'Which lens would you share with Haziq?',
  },
  eldercare: {
    title: 'Who looks after Ah Ma?', mentor: 'mom',
    hook: 'Mum on the phone: "Your grandmother fell again." Who is going to care for her, and who pays?',
    lenses: [
      { kind: 'structural', text: 'A lot of care for elders is unpaid work done at home, and it often falls on daughters and daughters-in-law, sometimes while they also raise children: the "sandwich generation".' },
      { kind: 'personal', text: 'Planning helps: talk early with siblings and your partner, save a little, learn what support exists, and show up regularly, even in small ways like a weekly visit.' },
      { kind: 'cultural', text: 'Filial piety and multigenerational homes are important to many families here. Others prefer independent living with support nearby. Couples often come from both kinds of family.' },
    ],
    sg: [
      { t: 'You can top up a parent\'s or grandparent\'s CPF retirement account. Eligible seniors with lower savings get a matching government grant of up to $2,000 a year.', src: 'https://www.cpf.gov.sg/member/growing-your-savings/government-support/matching-grant-for-retirement' },
      { t: 'The Agency for Integrated Care lists caregiver support, respite care and grants such as the Home Caregiving Grant.', src: 'https://www.aic.sg/financial-assistance/home-caregiving-grant/' },
    ],
    reframe: 'Ageing parents are a family project, not a test of which partner loves their side more.',
    question: 'What did your family teach you about caring for elders?',
  },
  children: {
    title: 'Who pays for a child?', mentor: 'mei',
    hook: 'Mei, holding her colleague\'s newborn at a full-month party: "Everyone asks when they\'re having the second one. Nobody asks who\'s going to sleep."',
    lenses: [
      { kind: 'structural', text: 'Much of the cost of raising children is unpaid time: night feeds, sick days, school runs. When budgets and leave are tight, it turns into "who sacrifices?" fights between partners.' },
      { kind: 'personal', text: 'Readiness is a shared choice: money, health, where you will live, who takes leave, and whether you both want it at all. Talking about it early is part of loving someone.' },
      { kind: 'cultural', text: 'Relatives may ask "when got baby?" at every reunion dinner. Their excitement is often love, but the decision belongs to the couple.' },
    ],
    sg: [
      { t: 'The Baby Bonus Scheme gives $11,000 in cash for a first child plus a Child Development Account with government co-matching. A new SG Child Support Package announced in 2026 will replace it.', src: 'https://www.madeforfamilies.gov.sg/support-measures/child-raising/financial-support/baby-bonus-scheme' },
      { t: 'From 1 April 2026, parents get up to 30 weeks of paid leave in total: 16 weeks maternity, 4 weeks paternity and 10 weeks shared between both parents.', src: 'https://www.madeforfamilies.gov.sg/parental-leave-and-benefits/shared-parental-leave' },
    ],
    reframe: 'Sleepless nights and childcare fees are a shared problem to solve, not a score to keep against each other.',
    question: 'If you have children one day, what would "fair" look like to you?',
  },
  marriagecost: {
    title: 'Us vs the problem', mentor: 'ogawa',
    hook: 'BTO queue, wedding banquet, renovation, a family who wants a big celebration. It is easy to start blaming each other.',
    lenses: [
      { kind: 'structural', text: 'Fights between men and women often hide a pressure from above: housing prices, care work and wages. Societies share these costs differently between the state, employers and families, and every model strains when growth slows.' },
      { kind: 'personal', text: 'A budget you both choose beats a budget your relatives choose. Decide what matters most to you two, write down the numbers, and leave room for savings.' },
      { kind: 'cultural', text: 'Wedding customs differ: banquets, hantaran, dowry traditions, church weddings, simple ROM ceremonies. Many couples blend customs from two families. Talk about it before the aunties do.' },
    ],
    sg: [
      { t: 'First-timer couples can get an Enhanced CPF Housing Grant of up to $120,000, depending on household income.', src: 'https://www.cpf.gov.sg/member/infohub/educational-resources/a-guide-to-enhanced-cpf-housing-and-proximity-grant' },
      { t: 'BTO flats are built after launch, so many couples wait years for keys. Some 2026 launches are Shorter Waiting Time flats with waits under three years.', src: 'https://www.madeforfamilies.gov.sg/support-measures/housing/housing-schemes-and-grants' },
    ],
    reframe: 'Put the problem on the table between you, not between you and her. Then solve it as a team.',
    question: 'Which lens helps you two most right now?',
  },
  allowance: {
    title: 'Allowance, or helping at home?', mentor: 'ollie',
    hook: 'Ava gets $80 a week and keeps all of it. You give part of your café pay to Mum. Which one is "normal"?',
    lenses: [
      { kind: 'personal', label: 'Independence first', text: 'In many families an allowance is practice money: you learn to budget, save and make mistakes while the stakes are small. Parents pay for the household, and children are not expected to contribute.' },
      { kind: 'cultural', label: 'Family first', text: 'In many other families, including lots of Singapore homes, giving part of your first pay to your parents is a way of saying thank you and sharing the load. It is not a debt; it is belonging.' },
      { kind: 'structural', label: 'What the bill says', text: 'Small habits differ too. Restaurants here usually add a 10% service charge, and then 9% GST on top, so there is no tipping culture; hawker stalls have no service charge at all. Neither side is being cheap or showing off.' },
    ],
    sg: [
      { t: 'IRAS: when a service charge applies, GST is charged on the service charge too. A $100 meal with a 10% service charge comes to $119.90 with 9% GST.', src: 'https://www.iras.gov.sg/taxes/goods-services-tax-(gst)/consumers/quick-links/gst-and-service-charges' },
      { t: 'Under the Maintenance of Parents Act, parents aged 60 and above who cannot support themselves can claim maintenance from their adult children. It is a safety net, not a rule that every child must give money home.', src: 'https://www.msf.gov.sg/what-we-do/maintenance-of-parents' },
    ],
    reframe: 'Two families, two reasonable systems. The useful question is not who is right but "what did your family teach you money means?"',
    question: 'Which system did you grow up with, and which one do you want?',
  },
  dtr: {
    title: '"So… are we dating?"', mentor: 'ines',
    hook: 'Ava grew up with "you date first, then decide". Inès says in France people often just are together, no big question. Here, a lot of people expect someone to ask. Who has it right?',
    lenses: [
      { kind: 'cultural', label: 'Ask first', text: 'Many people here, and many families, expect a clear "will you be my girlfriend?" before anything is official. It makes things simple: you both know where you stand, and so do your friends.' },
      { kind: 'cultural', label: 'Date first', text: 'In the US it is common to go on several dates before deciding what you are. In France couples often drift into being together without a formal question at all. Both work when both people know the norm.' },
      { kind: 'personal', label: 'Say it anyway', text: 'Whatever the culture, the trouble starts when two people assume different rules. A short "what are we?" talk, said kindly, saves months of guessing. You can be romantic and still be clear.' },
    ],
    sg: [
      { t: 'SingStat: in 2024 the median age at first marriage was 31.1 for grooms and 29.6 for brides, up from 30.2 and 28.2 a decade earlier. There is time; nobody has to decide everything at seventeen.', src: 'https://www.singstat.gov.sg/find-data/search-by-theme/population/marriages-and-divorces/latest-data' },
    ],
    reframe: 'There is no correct country. There is only whether the two of you have actually said it out loud.',
    question: 'Do you need to hear the question, or is showing up enough?',
  },
};
