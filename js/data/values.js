/* Value profiles (docs/VALUE_PROFILES.md §3-4). Axes run -2..+2; neither end is "good".
   Integrity axes (honesty, promises) have a floor: only cast written as wrong sit below it. */
window.VALUE_AXES = ['spend', 'gifts', 'family', 'career', 'children', 'childEdu', 'learning', 'friends', 'lending', 'conflict', 'honesty', 'promises', 'home'];
window.VALUES = {
  hina:  { spend: -1, gifts: -1, family: 2, career: -1, children: 1, childEdu: -1, learning: 1, friends: -1, lending: 1, conflict: 2, honesty: 2, promises: 2, home: 1 },
  mio:   { spend: -2, gifts: -2, family: -1, career: 1, children: -1, childEdu: -2, learning: 2, friends: -2, lending: 0, conflict: -2, honesty: 1, promises: 1, home: -1 },
  kaede: { spend: 1, gifts: 0, family: -2, career: 2, children: -1, childEdu: 2, learning: 0, friends: 1, lending: -1, conflict: 1, honesty: 2, promises: 1, home: -2 },
  yuna:  { spend: 2, gifts: 1, family: 1, career: 2, children: 0, childEdu: 0, learning: -1, friends: 2, lending: 2, conflict: -1, honesty: -1, promises: -1, home: 1 },
  rei:   { spend: 0, gifts: 1, family: -2, career: -1, children: 0, childEdu: 0, learning: 2, friends: -2, lending: 0, conflict: 0, honesty: 0, promises: 0, home: 0 },
  kenta: { spend: 1, gifts: 1, family: 1, career: 0, children: 2, childEdu: 0, learning: -1, friends: 2, lending: 1, conflict: 1, honesty: 1, promises: 1, home: 2 },
  mei:   { spend: -2, gifts: -1, family: 2, career: -1, children: 0, childEdu: 0, learning: 1, friends: -1, lending: 0, conflict: 1, honesty: 2, promises: 2, home: 0 },
  ogawa: { spend: -1, gifts: -1, family: 1, career: 0, children: 0, childEdu: 0, learning: 2, friends: 0, lending: 0, conflict: 0, honesty: 2, promises: 2, home: 0 },
  dad:   { spend: -1, gifts: 0, family: 1, career: -2, children: 1, childEdu: 1, learning: 0, friends: 0, lending: 0, conflict: -1, honesty: 1, promises: 2, home: 1 },
  mom:   { spend: -1, gifts: 0, family: 2, career: -1, children: 1, childEdu: 1, learning: 1, friends: 1, lending: 1, conflict: 1, honesty: 1, promises: 1, home: 1 },
  farah: { spend: 0, gifts: 0, family: 1, career: 0, children: 0, childEdu: 0, learning: 2, friends: 0, lending: 0, conflict: 0, honesty: 1, promises: 1, home: 0 },
  joy:   { spend: -2, gifts: -1, family: 2, career: -1, children: 1, childEdu: 1, learning: 1, friends: 0, lending: 0, conflict: 0, honesty: 2, promises: 2, home: 0 },
  takumi:{ spend: 1, gifts: 1, family: 0, career: 2, children: 0, childEdu: 1, learning: 0, friends: 1, lending: 0, conflict: 0, honesty: 0, promises: -2, home: 0 },
  ren:   { spend: 2, gifts: 1, family: 0, career: 1, children: 0, childEdu: 0, learning: -1, friends: 2, lending: -2, conflict: 0, honesty: 0, promises: -1, home: 0 },
  saki:  { spend: 0, gifts: 0, family: 0, career: 0, children: 0, childEdu: 0, learning: 0, friends: 1, lending: 1, conflict: 1, honesty: 1, promises: 1, home: 0 },
  chloe: { spend: -2, gifts: 0, family: 2, career: 2, children: 0, childEdu: 1, learning: 2, friends: 0, lending: -2, conflict: 1, honesty: 2, promises: 2, home: -1 },
  preet: { spend: -1, gifts: -2, family: 1, career: 0, children: 2, childEdu: -1, learning: 2, friends: 1, lending: 1, conflict: 2, honesty: 2, promises: 1, home: 0 },
  ama:   { spend: -2, gifts: -2, family: 2, career: 0, children: 2, childEdu: 0, learning: 1, friends: 0, lending: -1, conflict: 0, honesty: 1, promises: 2, home: 1 },
  ava:   { spend: 1, gifts: 0, family: 0, career: 2, children: 0, childEdu: 1, learning: 2, friends: 2, lending: 0, conflict: 1, honesty: 2, promises: 1, home: -1 },
  ines:  { spend: 0, gifts: -1, family: 1, career: 2, children: 0, childEdu: 0, learning: 2, friends: 1, lending: 0, conflict: 2, honesty: 2, promises: 1, home: 0 },
  mateo: { spend: 0, gifts: 2, family: 2, career: 0, children: 1, childEdu: 0, learning: 0, friends: 2, lending: 1, conflict: -1, honesty: 1, promises: 0, home: 1 },
  ollie: { spend: -1, gifts: 0, family: 1, career: 1, children: 0, childEdu: 0, learning: 2, friends: 1, lending: 0, conflict: -2, honesty: 1, promises: 2, home: 0 },
  nana:  { spend: 1, gifts: 0, family: 0, career: 0, children: 0, childEdu: 0, learning: 1, friends: 1, lending: -1, conflict: 0, honesty: 1, promises: 0, home: 0 },
};
/* The passion chosen in Ch2 ({passion} in text). */
window.PASSIONS = {
  guitar:     { label: 'guitar', verb: 'play guitar' },
  drawing:    { label: 'drawing', verb: 'draw' },
  coding:     { label: 'your little game', verb: 'code' },
  basketball: { label: 'basketball', verb: 'shoot hoops' },
  all:        { label: 'your four hobbies', verb: 'dabble' },
};
