'use strict';
const num = (question, answer, why) => ({question, answer, why});
const pick = (question, choices, answer, why) => ({question, choices, answer, why});
const group = (title, note, qs) => ({title,note,qs});
const steps = [
 group('Параметри джерела','Запишіть редактор і профіль, який він показав після відкриття PNG.',[
  num('Скільки пікселів містить зображення 1200 × 800?',960000,'Помножте ширину на висоту.'),
  num('Скільки значень можливі для одного 8-бітного каналу?',256,'2⁸ дає 256 значень, від 0 до 255.'),
  num('Скільки біт припадає на RGB-піксель без альфа-каналу за 8 біт на канал?',24,'Три канали по 8 біт.'),
  num('Скільки байтів займають лише незапаковані RGB-канали всього зображення?',2880000,'Кількість пікселів × 3 байти.'),
  pick('Який профіль залишаємо під час відкриття джерела?',['Вбудований sRGB','Профіль монітора як профіль джерела','Цільовий CMYK'],0,'Вбудований sRGB задає тлумачення вихідних чисел.')]),
 group('Розмір у друці','Поясніть, чому PPI та ICC-профіль перевіряють окремо.',[
  num('Яка ширина у дюймах при 300 PPI і 1200 пікселях?',4,'1200 ÷ 300.'),
  num('Яка висота в мм при 200 PPI і 800 пікселях? 1 дюйм = 25,4 мм.',101.6,'800 ÷ 200 × 25,4.'),
  num('Яке ефективне PPI, якщо 1200 пікселів розмістити на ширині 15,24 см?',200,'15,24 см — 6 дюймів.'),
  num('Скільки пікселів потрібно на ширину 10,16 см за 300 PPI?',1200,'10,16 см — 4 дюйми.'),
  pick('Що робити, якщо задана ширина дає недостатнє PPI?',['Замінити ICC-профіль','Взяти детальніше джерело або погодити меншу ширину','Змінити лише назву файла'],1,'Ефективне PPI залежить від кількості пікселів і фізичного розміру.')]),
 group('Числа у RGB','Знайдіть плашки A1–B4 на тестовому зображенні. Яка пара нейтралей дає корисний контроль світлоти?',[
  num('На скільки одиниць G плашки A1 (0, 255, 0) перевищує G плашки A3 (255, 100, 0)?',155,'255 − 100.'),
  num('Наскільки світла нейтраль B1 (245, 245, 245) перевищує B2 (128, 128, 128) за одним каналом?',117,'245 − 128.'),
  num('Скільки одиниць між B2 (128, 128, 128) і B3 (32, 32, 32) за одним каналом?',96,'128 − 32.'),
  num('Який діапазон каналів у B4 (210, 155, 125), якщо від найбільшого відняти найменший?',85,'210 − 125.'),
  pick('Що означають однакові R, G і B в плашці B2 у цьому sRGB-файлі?',['Три однакові відсотки фарби','Ахроматичний тон у sRGB','Максимальну насиченість'],1,'Рівні канали в sRGB відповідають нейтральній осі.')]),
 group('Призначення і конвертація','Запишіть, чи виконали конвертацію, який профіль вибрали та що показало повторне відкриття TIFF.',[
  pick('Яка операція обчислює нові значення каналів?',['Призначення','Перетворення','Перейменування'],1,'Перетворення обчислює координати у просторі призначення.'),
  pick('Що зміниться, якщо відомому RGB-зображенню просто призначити інший RGB-профіль?',['Числа пікселів','Тлумачення чисел','Розміри в пікселях'],1,'Числа при призначенні зберігаються.'),
  pick('Яка копія відповідає заданому маршруту?',['PNG зі зміненою назвою','TIFF з ICC-профілем монітора','CMYK TIFF із WAN-IFRAnewspaper26v5'],2,'У завданні визначено модель та умови відтворення.'),
  num('Скільки процесних каналів у CMYK?',4,'C, M, Y та K.'),
  num('Скільки байтів займають лише незапаковані 8-бітні CMYK-канали для 1200 × 800 пікселів?',3840000,'1200 × 800 × 4. Фактичний TIFF має інший розмір через стиснення та службові дані.')]),
];
const tac = ([c,m,y,k]) => (c+m+y+k)*100/255;
const sample = (id) => samples[id].join(', ');
const tacQuestion = (id) => num(
 `Плашка ${id}. TIFF зберігає C, M, Y, K як байти (${sample(id)}). Обчисліть TAC у %, округліть до десятих.`,
 Math.round(tac(samples[id])*10)/10,'Додайте всі чотири значення, поділіть на 255 і помножте на 100.');
steps.push(
 group('Вибір проби для друку','Порівняйте дві насичені плашки у своєму досліді. Запишіть їхні коди й вирішіть, яку з них ви б першою перевірили на фізичній пробі. Поясніть вибір.',[
  num('Умовне замовлення вимагає, щоб було видно межі щонайменше 6 із 7 пар сусідніх сходинок у тінях. У пробі А видно 4 межі. Скількох меж бракує до вимоги?',2,'Від мінімальних 6 відніміть 4 видимі межі.'),
  num('У пробі Б видно 6 із 7 меж. На скільки більше меж видно в пробі Б, ніж у пробі А?',2,'Порівняйте 6 видимих меж у пробі Б з 4 у пробі А.'),
  pick('У пробі А зелена плашка яскравіша, але частина деталей у тінях зливається. Проба Б менш насичена, проте проходить вимогу до тіней. З якої проби продовжити погодження, якщо деталі в тінях є обов’язковими?',['З проби А через яскравішу зелену плашку','З проби Б, бо вона виконує вимогу до тіней','З будь-якої, бо обидві отримано конвертацією в CMYK'],1,'Спочатку перевірте виконання обов’язкової вимоги. Далі оцініть, чи прийнятна насиченість.'),
  pick('Щоб з’ясувати вплив способу відтворення, як підготувати дві копії для порівняння?',['Змінити лише спосіб відтворення, зберігши профіль та інші налаштування','Одночасно змінити профіль, спосіб відтворення й масштаб','Порівняти різні ділянки на різних моніторах'],0,'Порівняння з одним змінним параметром дозволяє пов’язати результат із цим параметром.'),
  pick('На екрані проба Б відповідає вимозі до тіней. Як перевірити, що вони розрізнятимуться на погодженому папері?',['Зберегти скриншот','Перевірити погоджену фізичну пробу в однакових умовах освітлення','Подивитися розмір TIFF у байтах'],1,'Фізична проба дає змогу оцінити деталі на матеріалі за визначеного освітлення.')
 ]),
 group('Контроль файла перед друком','За даними перевірки складіть короткий запис для оператора. Вкажіть проблемну ділянку, дію та спосіб повторного контролю.',[
  num('У звіті для восьми ділянок дві позначено як обов’язкові до виправлення. Одну вже виправили та перевірили повторно. Скільки обов’язкових виправлень залишилося?',1,'Із двох обов’язкових виправлень одне вже підтверджене.'),
  pick('Preflight позначив тінь під чашкою як ділянку з надмірним покриттям. Яка перша дія?', ['Перевірити, чи копію перетворено за погодженим профілем друку','Зменшити масштаб фото на екрані','Виправити лише назву файла'],0,'Почніть із перевірки умов перетворення й локалізації проблеми.'),
  pick('Дрібний чорний підпис позначено як багатофарбовий. Друкарня вимагає для нього лише чорну фарбу. Що виправити?', ['Змінити колір підпису у вихідному макеті та перевірити кольороподіл повторно','Змінити весь макет на градації сірого','Прийняти підпис, якщо він здається чорним на моніторі'],0,'Виправлення стосується підпису. Кольороподіл підтверджує склад фарб у готовому файлі.'),
  pick('Після виправлення оператор експортував новий файл. Який звіт придатний для приймання?', ['Звіт до виправлення','Звіт повторної перевірки нового файла з його назвою або версією','Скриншот налаштувань експорту'],1,'Рішення про приймання має спиратися на перевірку саме нового файла.'),
  pick('Після повторної перевірки технічне попередження зникло, але фактура в тіні стала менш помітною. Як діяти?', ['Прийняти файл лише за результатом preflight','Узгодити вигляд критичної ділянки за пробою','Перевірити тільки розмір файла'],1,'Технічна перевірка та погодження вигляду оцінюють різні властивості відбитка.')]),
 group('Насичені кольори','Порівняйте дві плашки A у редакторі. Вкажіть коди й конкретні зміни відтінку або насиченості.',[
  num(`Значення C плашки A2 дорівнює ${samples.A2[0]} з 255. Який це відсоток? Округліть до десятих.`,Math.round(samples.A2[0]*1000/255)/10,'Значення байта × 100 ÷ 255.'),
  num(`Значення Y плашки A3 дорівнює ${samples.A3[2]} з 255. Який це відсоток?`,samples.A3[2]*100/255,'255 відповідає 100 %.'),
  num(`На скільки кодових одиниць C у A2 (${samples.A2[0]}) перевищує C у A1 (${samples.A1[0]})?`,samples.A2[0]-samples.A1[0],'Від більшого байтового значення відніміть менше.'),
  pick('Який сигнал дає попередження про вихід за охоплення?',['Місце можливого компромісу під час відтворення','Виміряний колір тиражу','Помилку геометрії'],0,'Попередження позначає колір, якого цільовий процес може не відтворити.'),
  pick('Що варто змінювати по одному при порівнянні результатів?',['Усі налаштування разом','Спосіб відтворення за незмінного профілю','Освітлення і монітор одночасно'],1,'Один змінний параметр дозволяє пояснити відмінність.')]),
 group('Нейтралі й тіні','Порівняйте дві плашки B і обидва переходи C. Запишіть, які сусідні сходинки розрізняються та чи лишився плавним градієнт.',[
  num('Скільки сходинок у C1: 0, 8, 16, 24, 32, 48, 64, 80?',8,'Порахуйте всі окремі плашки.'),
  num('Скільки меж між сусідніми плашками в C1?',7,'У ряді з восьми плашок сім меж.'),
  num('Який крок між значеннями 48 і 64?',16,'64 − 48.'),
  num(`На скільки кодових одиниць K у B3 (${samples.B3[3]}) перевищує K у B2 (${samples.B2[3]})?`,samples.B3[3]-samples.B2[3],'Відніміть два значення з контрольного TIFF.'),
  pick('Що перевірити, якщо дві темні ділянки злилися після конвертації?',['Чи різнилися вони в джерелі і як перетворилися','Тільки назву TIFF','Лише кількість пікселів'],0,'Спочатку встановіть, чи містив оригінал різницю в тінях.')]),
 group('Колір і перевірка відбитка','Назвіть дві ділянки з найбільшим ризиком і запропонуйте спосіб перевірки кожної.',[
  num('Для зразка Lab a* = 6, b* = 8. Обчисліть хрому C*ab = √(a*² + b*²).',10,'√(36 + 64) = 10.'),
  num('Для зразка a* = −5, b* = 12. Обчисліть C*ab.',13,'√(25 + 144) = 13.'),
  num('Зразки мають L* 52 і L* 65. Яка абсолютна різниця за світлотою?',13,'|65 − 52|. Це різниця тільки за L*.'),
  pick('Чим підтвердити погоджений колір критичної ділянки на матеріалі?',['Знімком з телефона','Погодженою фізичною пробою','Назвою профілю у файлі'],1,'Фізична проба дає змогу оцінити результат на матеріалі.'),
  pick('Що зробити, коли проба виглядає інакше, ніж очікували?',['Одразу змінити насиченість','Звірити файл, матеріал і умови перегляду','Призначити профіль монітора'],1,'Перевірте джерело розбіжності до редагування.')]),
 group('Підсумок і здавання','Складіть висновок. Назвіть вихідний і цільовий профілі, виконані дії, результат порівняння та межу вашого висновку.',[
  num('Яка ширина в пікселях має залишитися після перетворення без зміни розміру?',1200,'Колірне перетворення не змінює геометрію зображення.'),
  num('Наскільки більше байтів припадає на один піксель у незапакованому 8-бітному CMYK порівняно з RGB?',1,'Чотири канали мінус три.'),
  pick('Що перевірити після збереження TIFF?',['Профіль, модель і розміри після повторного відкриття','Тільки назву','Лише колір у мініатюрі'],0,'Контроль стосується записаного файла.'),
  pick('Як позначити роботу, якщо порівнювали готовий контрольний TIFF?',['Вказати самостійний експорт','Вказати використаний контрольний зразок і причину','Залишити джерело невідомим'],1,'У звіті важливо відрізняти власний результат від готового зразка.'),
  pick('Що завантажувати в папку звітів після власної конвертації?',['Лише вихідний PNG','Звіт і свій CMYK TIFF','Лише контрольний TIFF'],1,'Звіт описує ваші дії, TIFF містить ваш результат.')])
);

const key = 'quality-icc-pr05-v1';
const stepFiveRevision = 2;
const stepSixRevision = 2;
const byId = id => document.getElementById(id);
const esc = text => String(text).replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
const fresh = () => ({name:'',group:'',current:0,parts:steps.map(() => ({answers:Array(5).fill(''),note:'',first:null,done:false}))});
let state=fresh(), storageUnavailable=false;
let sending=false, sendError='';
try {
 const existing=JSON.parse(localStorage.getItem(key));
 if (existing?.parts?.length===10 && existing.current>=0 && existing.current<10) state=existing;
} catch { storageUnavailable=true; }
if(state.stepFiveRevision!==stepFiveRevision&&!state.submission){
 const revised=state.parts[4];
 if(revised.done||revised.first!==null||revised.answers.some(Boolean)||revised.note){
  state.parts[4]=fresh().parts[4];
  if(state.current>=4)state.current=4;
 }
 state.stepFiveRevision=stepFiveRevision;
 save();
}
if(state.stepSixRevision!==stepSixRevision&&!state.submission){
 const revised=state.parts[5];
 if(revised.done||revised.first!==null||revised.answers.some(Boolean)||revised.note){
  state.parts[5]=fresh().parts[5];
  if(state.current>=5)state.current=5;
 }
 state.stepSixRevision=stepSixRevision;
 save();
}
function save() {
 try { localStorage.setItem(key,JSON.stringify(state)); } catch { storageUnavailable=true; }
}
function isCorrect(q, value) {
 const clean=String(value).trim().replace(/\s+/g,'').replace(',','.');
 return clean!=='' && /^[+-]?\d+(?:\.\d+)?$/.test(clean) && Math.abs(Number(clean)-q.answer)<0.00001;
}
function update() {
 const done=state.parts.filter(p=>p.done).length;
 byId('progress').value=done;
 byId('progress-label').textContent=`${done} із 10 кроків · ${done*10} %`;
 byId('nav').innerHTML=steps.map((s,i)=>`<button type="button" data-step="${i}" ${state.parts.slice(0,i).some(p=>!p.done)?'disabled':''} ${i===state.current?'aria-current="step"':''}>${i+1}. ${esc(s.title)}${state.parts[i].done?' ✓':''}</button>`).join('');
 byId('finish').hidden=done!==10&&!storageUnavailable;
 byId('report-status').textContent=(sendError?'Не вдалося завершити роботу. Спробуйте ще раз або повідомте викладача.':
 done===10?'Усі 10 кроків виконано.':'')+
 (storageUnavailable?' Збереження чернетки у браузері недоступне.':'');
}
function render() {
 const i=state.current, s=steps[i], part=state.parts[i], lock=part.done?'disabled':'';
 byId('step').innerHTML=`<p class="eyebrow protected">КРОК ${i+1} ІЗ 10</p><h2 class="protected">${esc(s.title)}</h2><form id="questions">
 ${s.qs.map((q,j)=>`<div class="question"><label><span class="protected">${j+1}. ${esc(q.question)}</span>${q.choices
 ? `<select name="q${j}" required ${lock}><option value="">Оберіть відповідь</option>${q.choices.map((x,k)=>`<option value="${k}" ${String(k)===part.answers[j]?'selected':''}>${esc(x)}</option>`).join('')}</select>`
 : `<input name="q${j}" type="text" inputmode="decimal" maxlength="24" required value="${esc(part.answers[j])}" ${lock}>`}</label><span class="feedback protected" id="feedback-${j}"></span></div>`).join('')}
 <label><span class="protected">${esc(s.note)}</span><textarea name="note" maxlength="1500" required ${part.done?'readonly':''}>${esc(part.note)}</textarea></label>
 <p id="result" class="protected" role="status">${part.done?`Крок завершено. Перша перевірка — ${part.first}/5.`:''}</p>
 <div class="actions">${part.done&&i<9?'<button type="button" id="next">Наступний крок</button>':
 part.done&&(!sendError||sending||state.receipt)?'':
 `<button type="submit">${i===9?'Перевірити результати':'Перевірити відповіді'}</button>`}</div></form>`;
 update();
}
function openStep(i){
 if(!steps[i] || state.parts.slice(0,i).some(p=>!p.done))return;
 state.current=i; save(); render();
 const h=byId('step').querySelector('h2');
 h.tabIndex=-1; h.focus();
}
['name','group'].forEach(id=>{
 const field=byId(id); field.value=state[id];
 field.readOnly=!!state.submission;
 field.addEventListener('input',()=>{state[id]=field.value;save();update();});
 field.addEventListener('change',()=>{if(state.parts.every(p=>p.done))void sendReport();});
});
byId('nav').addEventListener('click',e=>{const btn=e.target.closest('[data-step]');if(btn)openStep(Number(btn.dataset.step));});
byId('step').addEventListener('click',e=>{if(e.target.id==='next')openStep(state.current+1);});
byId('step').addEventListener('input',e=>{
 const p=state.parts[state.current], name=e.target.name;
 if(name==='note') p.note=e.target.value;
 else if(/^q[0-4]$/.test(name)) p.answers[Number(name.slice(1))]=e.target.value;
 save();
});
byId('step').addEventListener('submit',e=>{
 e.preventDefault();
 const p=state.parts[state.current], s=steps[state.current];
 if(p.done){if(state.current===9&&sendError)void sendReport();return;}
 if(!p.note.trim()){byId('result').textContent='Запишіть коротке власне пояснення.';return;}
 if(state.current===9&&(!state.name.trim()||!state.group.trim())){
  byId('result').textContent='Для здавання роботи заповніть ПІБ і групу.';
  byId(!state.name.trim()?'name':'group').focus();return;
 }
 const correct=s.qs.map((q,i)=>isCorrect(q,p.answers[i]));
 const score=correct.filter(Boolean).length;
 if(p.first===null) p.first=score;
 p.done=score===5;save();
 if(p.done){
  render();
  if(state.current===9){
   byId('finish').scrollIntoView({block:'start'});
   void sendReport();
  }else byId('next')?.focus();
  return;
 }
 s.qs.forEach((q,i)=>{
  const f=byId('feedback-'+i);f.className='feedback protected '+(correct[i]?'good':'bad');
  f.textContent=(correct[i]?'Правильно. ':'Перегляньте відповідь. ')+q.why;
 });
 byId('result').textContent=`${score}/5. Виправте відповіді. Перша перевірка — ${p.first}/5.`;
 update();
});
function protectedSelection(e) {
 if(e.target.closest?.('input,textarea,select,[contenteditable]'))return false;
 const selection=window.getSelection();
 if(selection&&!selection.isCollapsed) {
  const range=selection.getRangeAt(0);
  return [...document.querySelectorAll('.protected')].some(el=>range.intersectsNode(el));
 }
 return !!e.target.closest?.('.protected');
}
for(const type of ['copy','cut','contextmenu','dragstart']){
 document.addEventListener(type,e=>{if(protectedSelection(e))e.preventDefault();});
}
function makeSubmission(){
 return {
  id:crypto.randomUUID(),
  name:state.name.trim(),group:state.group.trim(),
  sections:steps.map((s,i)=>{
   const p=state.parts[i];
   return {title:s.title,first:p.first,note:p.note,items:s.qs.map((q,j)=>({
    question:q.question,answer:q.choices?q.choices[Number(p.answers[j])]:p.answers[j]
   }))};
  })
 };
}
function receive(url,snapshot){
 return new Promise((resolve,reject)=>{
  const nonce=crypto.randomUUID();
  const frame=document.createElement('iframe'), form=document.createElement('form');
  frame.name='pr05_'+nonce;frame.hidden=true;frame.title='Квитанція здавання';
  form.hidden=true;form.method='POST';form.action=url;form.target=frame.name;
  for(const [name,value] of Object.entries({origin:location.origin,nonce,payload:JSON.stringify(snapshot)})){
   const field=document.createElement('input');field.type='hidden';field.name=name;field.value=value;form.append(field);
  }
  function clean(){clearTimeout(timer);window.removeEventListener('message',ack);form.remove();frame.remove();}
  function ack(event){
   if(!/^https:\/\/(?:script\.google\.com|(?:[a-z0-9-]+\.)*googleusercontent\.com)$/.test(event.origin)) return;
   const data=event.data;
   if(data?.protocol!=='pr05-icc-v1'||data.nonce!==nonce||data.id!==snapshot.id)return;
   clean();
   if(data.status==='saved')resolve(true);else reject(new Error('SAVE'));
  }
  const timer=setTimeout(()=>{clean();reject(new Error('TIMEOUT'));},45000);
  window.addEventListener('message',ack);document.body.append(frame,form);
  try{form.submit();}catch(error){clean();reject(error);}
 });
}
async function sendReport(){
 if(sending||state.receipt||!state.parts.every(p=>p.done)||!state.name.trim()||!state.group.trim())return;
 const url=String(window.PR05_ICC_RECEIVER||'').trim();
 if(!/^https:\/\/script\.google\.com\/macros\/s\/[\w-]+\/exec$/.test(url)){
  sendError='Приймач звітів ще не підключено. Повідомте викладача.';render();return;
 }
 if(location.protocol!=='https:'){
  sendError='Для здавання відкрийте опублікований сайт GitHub Pages.';render();return;
 }
 state.submission ||= makeSubmission();
 byId('name').readOnly=true;byId('group').readOnly=true;
 sending=true;sendError='';save();render();
 try{await receive(url,state.submission);state.receipt=true;save();}
 catch{sendError='Підтвердження не надійшло. Перевірте інтернет і повторіть надсилання.';}
 finally{sending=false;render();}
}
render();
if(state.parts.every(p=>p.done))void sendReport();
