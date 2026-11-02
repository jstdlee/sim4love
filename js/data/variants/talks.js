/* Variant pools for partner talks. Speaker '@talk' = whoever the talk is with (route heroine, or Haziq on solo).
   Every pool has a generic fallback (no who/ch/when). */
window.VARIANTS = window.VARIANTS || {};
(function (V) {
  const say = (e, t) => ({ s: '@talk', e, t });
  const her = (topic, map, generic) => {
    V[`talk.${topic}.her`] = Object.entries(map).map(([who, lines]) => ({ id: `talk.${topic}.her.${who}`, who, lines }))
      .concat([{ id: `talk.${topic}.her.any`, lines: generic }]);
  };

  // ---------- Part I-II (talk partner fixed by the chapter) ----------
  her('refusal', {
    hina: [say('angry', 'Real friends can hear no. If I always say yes to you, my yes means nothing.'), say('neutral', 'My nenek says a friend who can\'t hear "no" is a customer, not a friend.')],
  }, [say('neutral', 'I think a real friend can hear no.')]);
  her('friendship', {
    mio: [say('shy', 'I have one close friend. We\'ve swapped notebooks since Primary Four.'), say('neutral', 'With a crowd I spend the whole time performing. With her I can just... be quiet.')],
  }, [say('neutral', 'I like a few close friends more than a big crowd.')]);
  her('whitelies', {
    yuna: [say('happy', 'Like, if a friend dyes her hair green, I say "omg so cute!" Who does the truth help?'), say('neutral', 'My viewers want the happy version of me. That\'s kind of a white lie too, right?')],
  }, [say('neutral', 'Small lies keep the peace, no?')]);
  her('spending', {
    kaede: [say('cool', 'Good spikes shave a tenth off my time. Good food keeps me running. That\'s not waste, that\'s fuel.'), say('smug', 'And honestly? If I\'m tired after training, bubble tea is a human right.')],
  }, [say('neutral', 'I like spending on things that make life good now.')]);
  her('goodlife', {
    hina: [say('happy', 'A good life? Being a nurse. Nenek healthy. Sunday lunch with everyone shouting at once.')],
    mio: [say('shy', 'Writing something that makes one stranger feel less alone. Even if my parents never read it.')],
    kaede: [say('cool', 'Winning. SEA Games gold. Then I\'ll think about the rest.')],
    yuna: [say('happy', 'Being known. Like, people remembering my name.'), say('sad', '...And not being tired all the time. That would be nice too.')],
  }, [say('neutral', 'A good life? I guess... doing something that matters to you.')]);
  her('promises', {
    hina: [say('angry', 'Plans change, sure. Then you SAY so. Before. Not after, with a sticker.'), say('neutral', 'When someone vanishes on you, it tells you exactly where you rank.')],
  }, [say('neutral', 'If plans change, say so early.')]);
  her('greed', {
    yuna: [say('happy', 'Okay but nice things ARE nice. I worked for my ring light!'), say('neutral', 'I just don\'t want to be poor again. Is that greedy?')],
  }, [say('neutral', 'Nice things are nice, though.')]);
  her('whylike', {
    kenta: [say('happy', 'Bro. Looks. Obviously. Then personality. Then... I don\'t know, her Spotify?'), say('neutral', 'Wait. Mei\'s doing the eyebrow. Why is she doing the eyebrow.')],
  }, [say('neutral', 'You like someone for their looks first, right?')]);

  // ---------- Part III-V (route heroine, or Haziq on solo) ----------
  her('gifts', {
    hina: [say('neutral', 'The best gift I ever got was a lunch-box bag with cats on it. It cost twelve dollars.'), say('happy', 'Something useful that says "I listened". That\'s it.')],
    mio: [say('shy', 'A letter. Handwritten. I keep every one in a biscuit tin.'), say('neutral', 'If it costs a lot, I just feel guilty holding it.')],
    kaede: [say('cool', 'Don\'t buy me something pink. Buy me something I\'ll actually use. Or nothing. Nothing is fine.')],
    yuna: [say('happy', 'Okay, I like brand stuff. It shows you planned it, you know?'), say('sad', 'My dad used to buy me big gifts. Then he left. So maybe I\'m confused about what gifts mean.')],
    kenta: [say('neutral', 'Aisha wants a bag for our six months. Bro, it\'s three hundred dollars. Do I have to?'), say('sad', 'Her friends\' boyfriends all buy bags. I don\'t want her to feel small.')],
  }, [say('neutral', 'Do gifts need to cost money to mean something?')]);
  her('cheating', {
    hina: [say('angry', 'Lying. That\'s the line. You can have friends who are girls. You can\'t have secrets.')],
    mio: [say('sad', 'If you message an ex every night and don\'t tell me... I\'d feel replaced. Even if nothing "happens".')],
    kaede: [say('cool', 'Texting an ex? Fine by me, as long as I know. It\'s the hiding that kills it.')],
    yuna: [say('neutral', 'My viewers flirt with me all day. That\'s not cheating, it\'s work. Right?'), say('sad', 'But if you hid something from me, I think I\'d break a bit.')],
    kenta: [say('sad', 'Bro, Aisha saw my old DMs with my ex. Nothing happened! But I deleted them, and that looked worse.')],
  }, [say('neutral', 'What do you think counts as cheating?')]);
  her('coupletime', {
    hina: [say('shy', 'Between shifts and nenek, I only really get Saturdays. I want them with you.')],
    mio: [say('neutral', 'Actually, I need my Sundays alone to write. I hope that doesn\'t sound cold.')],
    kaede: [say('cool', 'I train Saturdays anyway. Do your futsal. Just show up to my meet.')],
    yuna: [say('sad', 'My weekends are all streams and editing. When I\'m free, I want you there. Is that too much?')],
    kenta: [say('neutral', 'Aisha says I spend too much time with you guys. Bro, are you guys a bad influence?')],
  }, [say('neutral', 'I wish weekends were more "us".')]);
  her('familymoney', {
    hina: [say('neutral', 'My family\'s opinion matters a lot. They\'ll ask about your job, your plans, your mosque, everything.'), say('happy', 'It\'s not to scare you. It\'s how they love.')],
    mio: [say('sad', 'My parents will ask if you\'re "on track". They asked me that every day until I stopped answering.')],
    kaede: [say('cool', 'My parents are in Dubai. My aunt will feed you and ask nothing. You\'re safe.')],
    yuna: [say('neutral', 'My mum just wants to know you\'re kind. And maybe that you can fix her Wi-Fi.')],
    kenta: [say('neutral', 'Aisha\'s dad asked me how much I\'ll earn. Bro, I\'m eighteen. I earn ten dollars an hour.')],
  }, [say('neutral', 'Does my family\'s opinion matter to you?')]);
  her('boundaries', {
    hina: [say('shy', 'I want to wait. Until I\'m older, until it\'s right. That\'s not about you, it\'s about me.')],
    mio: [say('shy', 'I don\'t even know yet. I think I need a lot of time, and a lot of talking. Is that okay?')],
    kaede: [say('neutral', 'I\'m focused on the Games. Honestly, not now. Maybe not for a long time.')],
    yuna: [say('sad', 'Everyone online acts like they\'re so experienced. I\'m... not. I don\'t want to pretend.')],
    kenta: [say('neutral', 'Aisha said she wants to wait. And bro... I kind of feel relieved? Is that weird?')],
  }, [say('neutral', 'What do we want, and when?')]);
  her('support', {
    hina: [say('angry', 'I don\'t want to owe you. My family borrowed once and it took years to feel normal again.')],
    mio: [say('shy', 'I feel bad when you pay. I\'d rather we go somewhere cheaper.')],
    kaede: [say('cool', 'Pay me back or don\'t ask. That\'s my rule for everyone. You too.')],
    yuna: [say('happy', 'Honestly? I\'d pay for you anytime. Money comes and goes!'), say('sad', '...That\'s also why my account is always empty.')],
    kenta: [say('sad', 'Aisha always pays for our makan. I feel useless, bro.')],
  }, [say('neutral', 'I don\'t want to owe you.')]);
  her('learning', {
    hina: [say('happy', 'Nursing first. Then part-time courses forever. I want to be an advanced practice nurse one day.')],
    mio: [say('neutral', 'My parents want medicine. I want literature. I\'m going to keep learning either way, even if it\'s at night.')],
    kaede: [say('smug', 'Learning? I learned how to lose. That was the hardest one.'), say('cool', 'Okay fine. A sports science course. After the Games.')],
    yuna: [say('shy', 'I signed up for a video-editing course. Online. Don\'t laugh. It\'s the first course I ever chose.')],
    kenta: [say('neutral', 'I thought studying ended at A-levels, bro. But my cousin did a diploma at thirty. He says it changed everything.')],
  }, [say('neutral', 'What do you actually want to learn?')]);
  her('eldercare', {
    hina: [say('happy', 'A BTO near my parents and nenek. I want to be there when they need me.'), say('neutral', 'But I also see what it costs my mum. She hasn\'t had a holiday in years.')],
    mio: [say('neutral', 'Joy looks after Ah Ma. My parents say it\'s "handled". I don\'t think anyone asked Joy how she is.'), say('shy', 'I want to study overseas first. Then... I don\'t know.')],
    kaede: [say('cool', 'My parents live abroad. Build your own life first. Then you have something to give.')],
    yuna: [say('neutral', 'I want my own place near my mum. She did everything alone. Not doing that to her.')],
    kenta: [say('happy', 'Bro, I want a BTO near my parents ASAP. Ten grandkids. My mum already picked names.')],
  }, [say('neutral', 'Would you want to live near your parents?')]);
  her('lending', {
    hina: [say('neutral', 'I lend to family. Friends... once. And I write it down.')],
    mio: [say('shy', 'I\'d rather buy someone a meal than lend them money. Money makes it strange.')],
    kaede: [say('cool', 'Pay me back or don\'t ask. Ryan has asked twice.')],
    yuna: [say('sad', 'I lend to everyone. And then they forget. And then I feel stupid for asking.')],
    kenta: [say('neutral', 'Ryan owes me eighty dollars, bro. He bought new earbuds yesterday.')],
  }, [say('neutral', 'Do you lend money to friends?')]);
  her('children', {
    hina: [say('happy', 'I want kids one day. After I\'m a nurse, late twenties. Lots of outdoor time, not tuition every night.')],
    mio: [say('shy', 'Honestly? Maybe never. I\'m not sure. And I don\'t want to be talked into being sure.')],
    kaede: [say('cool', 'Later. After my career. And yes, they\'d train every morning. Kidding. Mostly.')],
    yuna: [say('neutral', 'I don\'t know yet. My mum had me at twenty. I saw what it cost her.')],
    kenta: [say('happy', 'Bro. Big family. Early. Aisha says "we\'ll see". I don\'t know what "we\'ll see" means.')],
  }, [say('neutral', 'Do you want kids, one day?')]);
  her('fraud', {
    hina: [say('angry', 'My cousin lost four thousand dollars to one of those. She cried for a week and still blamed herself.')],
    mio: [say('neutral', 'I read their brochure. The numbers only work if everyone keeps recruiting forever.')],
    kaede: [say('cool', 'If it\'s so good, why do they need me to bring my friends?')],
    yuna: [say('sad', 'They DM me every week. "Be your own boss!" Some days I almost say yes.')],
    kenta: [say('neutral', 'My uncle says it\'s legit, bro. He has a nice car now. Well. He has a nice photo of a car.')],
  }, [say('neutral', 'Is it really that bad?')]);
  her('jointmoney', {
    hina: [say('happy', 'A BTO near my parents, a small wedding, everyone eating. And a joint account for the bills.')],
    mio: [say('neutral', 'Separate accounts. I want to know I can always stand on my own. That\'s not about trust.')],
    kaede: [say('cool', 'No rush. Career, travel, then talk. And I hate banquets.')],
    yuna: [say('neutral', 'I\'m learning to budget. So... a shared pot for shared stuff? I\'d feel safer.')],
    kenta: [say('happy', 'Bro, Aisha and I made a spreadsheet. A SPREADSHEET. It has tabs.')],
  }, [say('neutral', 'How would we do money, if we got serious?')]);

  // ---------- replies by value gap (shared by all preference talks) ----------
  const pool = (id, map, generic) => {
    V[id] = Object.entries(map).map(([who, lines]) => ({ id: `${id}.${who}`, who, lines })).concat([{ id: `${id}.any`, lines: generic }]);
  };
  pool('talk.agree', {
    hina: [say('happy', 'Huh. We\'re closer on this than I thought. Good.')],
    mio: [say('shy', 'Oh. I think we see it almost the same way. That\'s... nice to know.')],
    kaede: [say('smug', 'Same page. Look at us, being compatible.')],
    yuna: [say('happy', 'Wait, same! Okay, that made me happy.')],
    kenta: [say('happy', 'Bro! Same brain. Kind of.')],
  }, [say('happy', 'We see it pretty much the same way.')]);
  pool('talk.differ', {
    hina: [say('neutral', 'We see it differently. That\'s okay. I\'d rather know than guess.')],
    mio: [say('neutral', 'Not the same. But I can see why you think that. Thank you for saying it properly.')],
    kaede: [say('cool', 'Different. Fine. Different isn\'t a loss.')],
    yuna: [say('neutral', 'Hm. We\'re not the same. But you didn\'t make me feel stupid. That\'s new.')],
    kenta: [say('neutral', 'Different, bro. But okay. I\'ll think about it.')],
  }, [say('neutral', 'We see it differently. That\'s okay.'), { mochi: 'Different values aren\'t wrong values. You both said yours. That\'s the win.', e: 'happy' }]);
  pool('talk.clash', {
    hina: [say('sad', 'That\'s... really far from me. I need to sit with that.')],
    mio: [say('sad', 'We\'re very far apart on this. I\'m glad you didn\'t pretend.')],
    kaede: [say('neutral', 'Okay. That\'s a big gap. Better now than in ten years.')],
    yuna: [say('sad', 'Oh. That\'s far. I don\'t know what to do with that yet.')],
    kenta: [say('surprised', 'Bro. That\'s opposite. Like, opposite opposite.')],
  }, [say('sad', 'We\'re very far apart on this.')]);
  pool('talk.cave', {
    hina: [say('angry', '"Whatever I think"? I asked what YOU think.')],
    mio: [say('sad', 'You agreed very fast. I can\'t tell if you mean it.')],
    kaede: [say('cool', 'You don\'t have to agree to keep me. That\'s kind of worse.')],
    yuna: [say('neutral', 'Okay! ...Wait, do you actually agree?')],
    kenta: [say('neutral', 'You\'re just saying that, bro.')],
  }, [say('neutral', 'You agreed really fast.'), { mochi: 'Agreeing to everything isn\'t love. It\'s hiding. And she ends up dating nobody.', e: 'sad' }]);
  pool('talk.contempt', {
    hina: [say('angry', 'Wow. Okay. Next time I\'ll keep my thoughts to myself, then.')],
    mio: [say('sad', '...I won\'t bring it up again.')],
    kaede: [say('angry', 'You can disagree without sneering. Try it sometime.')],
    yuna: [say('sad', 'Haha. Right. Sorry I said anything.')],
    kenta: [say('sad', 'Harsh, bro.')],
  }, [say('sad', 'Okay. I won\'t say anything, then.'), { mochi: 'Contempt is the number-one predictor that a relationship ends. Disagree with the idea. Respect the person.', e: 'angry' }]);
  pool('talk.avoid', {
    hina: [say('neutral', 'Fine. But we\'re coming back to it. I know where you live. Literally.')],
    mio: [say('neutral', 'Okay. Maybe another day.')],
    kaede: [say('cool', 'Dodging. Noted.')],
    yuna: [say('happy', 'Haha, okay! Snacks?')],
    kenta: [say('neutral', 'Okay okay. Later.')],
  }, [say('neutral', 'Okay. Another time, then.')]);
  pool('talk.integrityWrong', {
    hina: [say('angry', 'No. That one\'s not a matter of taste.')],
    mio: [say('sad', 'I don\'t think I can agree with that. Not on this.')],
    kaede: [say('angry', 'Hard no. That\'s not a "different view". That\'s just wrong.')],
    yuna: [say('sad', 'That... scares me a little, honestly.')],
    kenta: [say('surprised', 'Bro, even I know that\'s wrong.')],
  }, [say('sad', 'No. Not on this one.'), { mochi: 'Some things aren\'t a matter of taste: lying that hides harm, fraud, breaking promises in silence. Integrity has a floor.', e: 'angry' }]);
  pool('talk.keepTalking', {}, [say('neutral', 'Okay. Let\'s keep talking. I\'d rather grow into an answer together than fake one now.')]);
  pool('talk.middle', {}, [say('neutral', 'Maybe. Let\'s both think about what we could really live with. Not what sounds nice.')]);
  pool('talk.differentLives', {}, [say('sad', 'That hurts. But it\'s the kindest thing anyone\'s said to me in a while. Thank you for not pretending.'),
    { mochi: 'A kind "this doesn\'t fit" is allowed. It\'s not failing. It\'s honesty, early.', e: 'neutral' }]);

  // ---------- topic extras ----------
  pool('talk.gifts.whopays', {
    hina: [say('neutral', 'And for dates, let\'s take turns. I have a job too, you know.')],
    mio: [say('shy', 'Can we just split everything? I feel calmer that way.')],
    kaede: [say('cool', 'Whoever wins the race pays. I\'m kidding. Split it.')],
    yuna: [say('neutral', 'My aunt says the boy should always pay. My mum says that\'s how you end up owing. Ugh. Take turns?')],
    kenta: [say('neutral', 'Aisha says we split. Her friends say I should pay. Bro, the internet is fighting in my head.')],
  }, [say('neutral', 'And who pays for dates? Let\'s take turns.')]);
  pool('talk.children.edu', {
    hina: [say('happy', 'And if we ever did, no tuition marathons. Kids need trees.')],
    mio: [say('sad', 'If I ever had a child, they would never go to tuition six nights a week. Never.')],
    kaede: [say('cool', 'If I had kids, structure. Training. Discipline. With love. Lots of snacks.')],
    yuna: [say('happy', 'I\'d let them try everything. Dance, coding, cooking, whatever!')],
    kenta: [say('neutral', 'My parents sent me to tuition five days a week. I\'d do two. Maybe one and a half.')],
  }, [say('neutral', 'And how would you raise them? Free play or structure?')]);
})(window.VARIANTS);
