"use strict";
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const PFX='atlas_';
const store={
  get(k,d){try{return JSON.parse(localStorage.getItem(PFX+k))??d}catch{return d}},
  set(k,v){try{localStorage.setItem(PFX+k,JSON.stringify(v))}catch{}},
  del(k){localStorage.removeItem(PFX+k)}
};

/* ---------- i18n ---------- */
const I18N={
 he:{home:'בית',reflex:'רפלקסולוגיה',points:'נקודות גוף',meridians:'מרידיאנים',learn:'לימוד',favs:'מועדפים',
   heroEye:'אטלס לימודי אינטראקטיבי',heroH:'מה נחקור היום?',heroP:'עיון ברפלקסולוגיה, ב־361 נקודות הגוף וב־14 המרידיאנים — הכול אופליין, בלי חשבון ובלי מפתח.',
   t_reflex:'מפות כפות הרגליים',t_points:'361 נקודות תקן',t_meridians:'14 מסלולים',t_learn:'כרטיסיות וחידון',
   footViews:'מבט',v_soles:'סוליות',v_top:'מלמעלה',v_inner:'צד פנימי',v_outer:'צד חיצוני',v_sidestop:'צדדים',v_full:'מפה מלאה',
   zoom:'זום',pickZone:'בחרו מספר אזור',reflexNote:'המפה להמחשה לימודית. אסכולות שונות עשויות לסמן גבולות מעט שונים.',
   bodySubject:'דמות',allMer:'כל המרידיאנים',pointsNote:n=>`${n} סימוני נקודות על הדמות. לחצו על נקודה לפרטים; הרשימה כוללת את כל 361 הנקודות.`,
   listPoints:'מאגר הנקודות',listZones:'אזורי רפלקסולוגיה',results:q=>`תוצאות עבור “${q}”`,noRes:'לא נמצאו תוצאות. נסו קוד כמו LI 4 או מילה בעברית.',
   merIntro:'ארבעה־עשר המסלולים המרכזיים. בחרו מרידיאן לתרשים, מסלול ורשימת נקודות.',pts:'נקודות',
   loc:'מיקום',ind:'שימושים מסורתיים',method:'שיטת דיקור',assoc:'שיוך מסורתי',path:'מסלול',caution:'שים לב',
   addFav:'הוספה למועדפים',inFav:'שמור במועדפים',favEmpty:'עדיין אין מועדפים. הקישו על הלב בכל פריט.',
   safety:'המידע מיועד ללימוד והעשרה בלבד ואינו ייעוץ, אבחון או טיפול רפואי. אין ללחוץ על פצע, נפיחות או כאב חד; בכל ספק — היוועצו באיש מקצוע מוסמך.',
   set:'הגדרות',name:'שם משתמש',lang:'שפה',palette:'ערכת צבע',mode:'מצב',day:'יום',night:'לילה',
   aiTitle:'עוזר AI מקוון (אופציונלי)',aiNote:'כאשר משתמשים בעוזר, השאלה נשלחת לספק ה־AI שבחרתם. מפתח הגישה נשמר בדפדפן במכשיר הזה; אין להזין מידע רפואי אישי או להשתמש במכשיר משותף.',aiKey:'מפתח API',aiNone:'ללא',backup:'גיבוי',restore:'שחזור',wipe:'מחיקת הכול',
   about:'מקורות ואודות',abTagline:'אטלס לימודי לרפלקסולוגיה, נקודות הגוף והמרידיאנים',abAppTitle:'על האפליקציה',abAppBody:'אפליקציית לימוד (PWA) שעובדת גם ללא אינטרנט לאחר טעינה ראשונה. אין חשבון ואין שרת — כל המידע, ההגדרות והמועדפים נשמרים במכשיר שלך בלבד. עוזר ה-AI הוא רשות (BYOK) והמפתח נשמר מקומית.',abShare:'שיתוף האפליקציה',abShareMsg:'אטלס הגוף — אפליקציית לימוד לרפלקסולוגיה ולנקודות הגוף',abStore:'עוד אפליקציות שלי — חנות AppNest',abDevTitle:'המפַתח',abDevBody:'פותח, עוצב ותורגם על ידי ברק אפללו · AppNest.',abCopied:'הקישור הועתק ✓',ver:'גרסה',guide:'מדריך',start:'בואו נתחיל',welcome:'ברוכים הבאים לאטלס הגוף',
   onbo:'עיון חופשי ברפלקסולוגיה, בנקודות הגוף ובמרידיאנים — הכול נשמר במכשיר, עובד גם בלי אינטרנט.',
   srcTitle:'מקורות',srcBody:'נקודות ומרידיאנים לפי תקן ה־WHO 2008 (מאגר TARA). סימוני הנקודות על הגוף מבוססים על acuSim (רישיון CC BY 4.0). מפות רפלקסולוגיה ומדריכים בעברית — להמחשה לימודית, טעונים בדיקה מקצועית.',
   quizScore:s=>`${s} תשובות נכונות`,again:'עוד סבב',flashcards:'כרטיסיות',quiz:'חידון',flip:'הפוך',next:'הבא',
   wipeConfirm1:'למחוק את כל הנתונים (מועדפים והגדרות)?',wipeConfirm2:'בטוח? הפעולה בלתי הפיכה.',restored:'שוחזר בהצלחה',bad:'קובץ לא תקין'},
 en:{home:'Home',reflex:'Reflexology',points:'Body points',meridians:'Meridians',learn:'Learn',favs:'Favorites',
   heroEye:'Interactive learning atlas',heroH:'What shall we explore?',heroP:'Browse reflexology, all 361 body points and the 14 meridians — fully offline, no account, no key.',
   t_reflex:'Foot maps',t_points:'361 standard points',t_meridians:'14 pathways',t_learn:'Flashcards & quiz',
   footViews:'View',v_soles:'Soles',v_top:'Top',v_inner:'Inner side',v_outer:'Outer side',v_sidestop:'Sides',v_full:'Full chart',
   zoom:'Zoom',pickZone:'Pick a zone number',reflexNote:'Educational illustration. Different schools may mark slightly different borders.',
   bodySubject:'Subject',allMer:'All meridians',pointsNote:n=>`${n} point markers on this subject. Tap a point for details; the list holds all 361 points.`,
   listPoints:'Point library',listZones:'Reflexology zones',results:q=>`Results for “${q}”`,noRes:'No results. Try a code like LI 4.',
   merIntro:'The fourteen main pathways. Pick a meridian for its diagram, route and point list.',pts:'points',
   loc:'Location',ind:'Traditional uses',method:'Needling method',assoc:'Traditional association',path:'Route',caution:'Note',
   addFav:'Add to favorites',inFav:'Saved to favorites',favEmpty:'No favorites yet. Tap the heart on any item.',
   safety:'For learning and enrichment only — not medical advice, diagnosis or treatment. Never press on a wound, swelling or sharp pain; when in doubt, consult a licensed professional.',
   set:'Settings',name:'User name',lang:'Language',palette:'Color palette',mode:'Mode',day:'Day',night:'Night',
   aiTitle:'AI assistant (optional)',aiNote:'Connect a key to chat with the assistant. The key is stored only on your device.',aiKey:'API key',aiNone:'None',backup:'Backup',restore:'Restore',wipe:'Delete all',
   about:'Sources & about',abTagline:'A learning atlas for reflexology, body points and meridians',abAppTitle:'About the app',abAppBody:'A learning app (PWA) that works offline after the first load. No account, no server — all content, settings and favorites stay on your device only. The AI assistant is optional (BYOK) and its key is stored locally.',abShare:'Share the app',abShareMsg:'Body Atlas — a learning app for reflexology and body points',abStore:'More of my apps — AppNest store',abDevTitle:'Developer',abDevBody:'Built, designed and translated by Barak Aflalo · AppNest.',abCopied:'Link copied ✓',ver:'Version',guide:'Guide',start:'Let’s start',welcome:'Welcome to Body Atlas',
   onbo:'Freely browse reflexology, body points and meridians — everything is stored on your device and works offline.',
   srcTitle:'Sources',srcBody:'Points and meridians follow the WHO 2008 standard (TARA dataset). On-body point markers are based on acuSim (CC BY 4.0). Reflexology maps and Hebrew guides are educational and pending professional review.',
   quizScore:s=>`${s} correct`,again:'Play again',flashcards:'Flashcards',quiz:'Quiz',flip:'Flip',next:'Next',
   wipeConfirm1:'Delete all data (favorites and settings)?',wipeConfirm2:'Sure? This cannot be undone.',restored:'Restored',bad:'Invalid file'},
ru:{home:'Главная',reflex:'Рефлексология',points:'Точки тела',meridians:'Меридианы',learn:'Обучение',favs:'Избранное',
   heroEye:'Интерактивный учебный атлас',heroH:'Что изучим сегодня?',heroP:'Рефлексология, все 361 точка тела и 14 меридианов — полностью офлайн, без аккаунта и ключа.',
   t_reflex:'Карты стоп',t_points:'361 стандартная точка',t_meridians:'14 каналов',t_learn:'Карточки и тест',
   footViews:'Вид',v_soles:'Подошвы',v_top:'Сверху',v_inner:'Внутренняя сторона',v_outer:'Внешняя сторона',v_sidestop:'Стороны',v_full:'Полная карта',
   zoom:'Масштаб',pickZone:'Выберите номер зоны',reflexNote:'Учебная иллюстрация. Разные школы могут отмечать границы немного по-разному.',
   bodySubject:'Модель',allMer:'Все меридианы',pointsNote:n=>`${n} отметок точек на модели. Нажмите на точку для подробностей; в списке все 361 точка.`,
   listPoints:'Библиотека точек',listZones:'Зоны рефлексологии',results:q=>`Результаты по «${q}»`,noRes:'Ничего не найдено. Попробуйте код, например LI 4.',
   merIntro:'Четырнадцать основных каналов. Выберите меридиан для схемы, маршрута и списка точек.',pts:'точек',
   loc:'Расположение',ind:'Традиционное применение',method:'Метод введения иглы',assoc:'Традиционная связь',path:'Маршрут',caution:'Внимание',
   addFav:'В избранное',inFav:'Сохранено в избранном',favEmpty:'Пока нет избранного. Нажмите на сердечко у любого элемента.',
   safety:'Только для обучения и ознакомления — не является медицинской консультацией, диагнозом или лечением. Не надавливайте на рану, отёк или острую боль; при сомнениях обратитесь к лицензированному специалисту.',
   set:'Настройки',name:'Имя пользователя',lang:'Язык',palette:'Цветовая палитра',mode:'Режим',day:'День',night:'Ночь',
   aiTitle:'AI-помощник (необязательно)',aiNote:'Подключите ключ, чтобы общаться с помощником. Ключ хранится только на вашем устройстве.',aiKey:'Ключ API',aiNone:'Нет',backup:'Резервная копия',restore:'Восстановить',wipe:'Удалить всё',
   about:'Источники и о приложении',guide:'Руководство',start:'Начнём',welcome:'Добро пожаловать в Атлас тела',
   onbo:'Свободно изучайте рефлексологию, точки тела и меридианы — всё хранится на вашем устройстве и работает офлайн.',
   srcTitle:'Источники',srcBody:'Точки и меридианы соответствуют стандарту ВОЗ 2008 (набор данных TARA). Отметки точек на теле основаны на acuSim (CC BY 4.0). Карты рефлексологии и руководства на иврите носят учебный характер и ожидают профессиональной проверки.',
   quizScore:s=>`${s} правильно`,again:'Ещё раз',flashcards:'Карточки',quiz:'Тест',flip:'Перевернуть',next:'Далее',
   wipeConfirm1:'Удалить все данные (избранное и настройки)?',wipeConfirm2:'Точно? Это нельзя отменить.',restored:'Восстановлено',bad:'Неверный файл'},
es:{home:'Inicio',reflex:'Reflexología',points:'Puntos del cuerpo',meridians:'Meridianos',learn:'Aprender',favs:'Favoritos',
   heroEye:'Atlas de aprendizaje interactivo',heroH:'¿Qué exploramos hoy?',heroP:'Explora la reflexología, los 361 puntos del cuerpo y los 14 meridianos — totalmente sin conexión, sin cuenta y sin clave.',
   t_reflex:'Mapas del pie',t_points:'361 puntos estándar',t_meridians:'14 trayectos',t_learn:'Tarjetas y cuestionario',
   footViews:'Vista',v_soles:'Plantas',v_top:'Superior',v_inner:'Lado interno',v_outer:'Lado externo',v_sidestop:'Lados',v_full:'Mapa completo',
   zoom:'Zoom',pickZone:'Elige un número de zona',reflexNote:'Ilustración educativa. Distintas escuelas pueden marcar límites algo diferentes.',
   bodySubject:'Figura',allMer:'Todos los meridianos',pointsNote:n=>`${n} marcas de puntos en la figura. Toca un punto para ver detalles; la lista incluye los 361 puntos.`,
   listPoints:'Biblioteca de puntos',listZones:'Zonas de reflexología',results:q=>`Resultados de «${q}»`,noRes:'Sin resultados. Prueba un código como LI 4.',
   merIntro:'Los catorce trayectos principales. Elige un meridiano para ver su diagrama, ruta y lista de puntos.',pts:'puntos',
   loc:'Ubicación',ind:'Usos tradicionales',method:'Método de punción',assoc:'Asociación tradicional',path:'Ruta',caution:'Atención',
   addFav:'Añadir a favoritos',inFav:'Guardado en favoritos',favEmpty:'Aún no hay favoritos. Toca el corazón en cualquier elemento.',
   safety:'Solo para aprendizaje y enriquecimiento — no es consejo, diagnóstico ni tratamiento médico. Nunca presiones sobre una herida, hinchazón o dolor agudo; ante la duda, consulta a un profesional autorizado.',
   set:'Ajustes',name:'Nombre de usuario',lang:'Idioma',palette:'Paleta de colores',mode:'Modo',day:'Día',night:'Noche',
   aiTitle:'Asistente IA (opcional)',aiNote:'Conecta una clave para chatear con el asistente. La clave se guarda solo en tu dispositivo.',aiKey:'Clave API',aiNone:'Ninguno',backup:'Copia de seguridad',restore:'Restaurar',wipe:'Borrar todo',
   about:'Fuentes y acerca de',guide:'Guía',start:'Empecemos',welcome:'Bienvenido al Atlas del cuerpo',
   onbo:'Explora libremente la reflexología, los puntos del cuerpo y los meridianos — todo se guarda en tu dispositivo y funciona sin conexión.',
   srcTitle:'Fuentes',srcBody:'Los puntos y meridianos siguen el estándar OMS 2008 (conjunto de datos TARA). Las marcas de puntos en el cuerpo se basan en acuSim (CC BY 4.0). Los mapas de reflexología y las guías en hebreo son educativos y pendientes de revisión profesional.',
   quizScore:s=>`${s} correctas`,again:'Jugar de nuevo',flashcards:'Tarjetas',quiz:'Cuestionario',flip:'Girar',next:'Siguiente',
   wipeConfirm1:'¿Borrar todos los datos (favoritos y ajustes)?',wipeConfirm2:'¿Seguro? Esto no se puede deshacer.',restored:'Restaurado',bad:'Archivo no válido'},
ar:{home:'الرئيسية',reflex:'علم المنعكسات',points:'نقاط الجسم',meridians:'المسارات',learn:'تعلّم',favs:'المفضلة',
   heroEye:'أطلس تعليمي تفاعلي',heroH:'ماذا نستكشف اليوم؟',heroP:'تصفّح علم المنعكسات وجميع نقاط الجسم الـ361 والمسارات الـ14 — بلا اتصال تمامًا، بدون حساب أو مفتاح.',
   t_reflex:'خرائط القدم',t_points:'361 نقطة معيارية',t_meridians:'14 مسارًا',t_learn:'بطاقات واختبار',
   footViews:'المنظر',v_soles:'الأخمص',v_top:'من الأعلى',v_inner:'الجانب الداخلي',v_outer:'الجانب الخارجي',v_sidestop:'الجانبان',v_full:'خريطة كاملة',
   zoom:'تكبير',pickZone:'اختر رقم منطقة',reflexNote:'رسم توضيحي تعليمي. قد تحدّد المدارس المختلفة حدودًا مختلفة قليلًا.',
   bodySubject:'النموذج',allMer:'كل المسارات',pointsNote:n=>`${n} علامات نقاط على النموذج. اضغط على نقطة للتفاصيل؛ تشمل القائمة جميع النقاط الـ361.`,
   listPoints:'مكتبة النقاط',listZones:'مناطق المنعكسات',results:q=>`نتائج البحث عن «${q}»`,noRes:'لا نتائج. جرّب رمزًا مثل LI 4.',
   merIntro:'المسارات الرئيسية الأربعة عشر. اختر مسارًا لعرض مخططه ومساره وقائمة نقاطه.',pts:'نقاط',
   loc:'الموقع',ind:'الاستخدامات التقليدية',method:'طريقة الوخز',assoc:'الارتباط التقليدي',path:'المسار',caution:'تنبيه',
   addFav:'أضف إلى المفضلة',inFav:'محفوظ في المفضلة',favEmpty:'لا مفضلة بعد. اضغط على القلب في أي عنصر.',
   safety:'للتعلّم والإثراء فقط — ليس استشارة أو تشخيصًا أو علاجًا طبيًا. لا تضغط على جرح أو ورم أو ألم حاد؛ عند الشك استشر مختصًا مرخّصًا.',
   set:'الإعدادات',name:'اسم المستخدم',lang:'اللغة',palette:'لوحة الألوان',mode:'الوضع',day:'نهار',night:'ليل',
   aiTitle:'مساعد الذكاء الاصطناعي (اختياري)',aiNote:'اربط مفتاحًا للدردشة مع المساعد. يُحفظ المفتاح على جهازك فقط.',aiKey:'مفتاح API',aiNone:'بدون',backup:'نسخة احتياطية',restore:'استعادة',wipe:'حذف الكل',
   about:'المصادر ومعلومات',guide:'دليل',start:'لنبدأ',welcome:'مرحبًا بك في أطلس الجسم',
   onbo:'تصفّح بحرية علم المنعكسات ونقاط الجسم والمسارات — كل شيء محفوظ على جهازك ويعمل بلا اتصال.',
   srcTitle:'المصادر',srcBody:'النقاط والمسارات وفق معيار منظمة الصحة العالمية 2008 (مجموعة بيانات TARA). علامات النقاط على الجسم مبنية على acuSim (رخصة CC BY 4.0). خرائط المنعكسات والأدلة بالعبرية تعليمية وقيد المراجعة المهنية.',
   quizScore:s=>`${s} إجابات صحيحة`,again:'مرة أخرى',flashcards:'بطاقات',quiz:'اختبار',flip:'اقلب',next:'التالي',
   wipeConfirm1:'حذف جميع البيانات (المفضلة والإعدادات)؟',wipeConfirm2:'متأكد؟ لا يمكن التراجع.',restored:'تمت الاستعادة',bad:'ملف غير صالح'}
};
const RTL=['he','ar'];
let LANG=store.get('lang','he');
function t(k,...a){const base=I18N[LANG]||{}, en=I18N.en; let v=base[k]; if(v===undefined) v=en[k]; return typeof v==='function'?v(...a):v;}

/* ---------- state ---------- */
const D=window.ATLAS;
const MER_HE={}, MER={}; D.meridians.forEach(m=>{MER[m.ab]=m;MER_HE[m.ab]=m.heN||m.name;});
let favs=store.get('favs',[]);
let screen='home', query='';
const subjFile={asher:'asher_c',grace:'grace_e',minami:'minami_a',novak:'novak_e'};
const footViews=[['soles','reflexology-soles.jpg'],['top','reflexology-top.jpg'],['inner','reflexology-side-inner.jpg'],['outer','reflexology-side-outer.jpg'],['sidestop','reflexology-sides-top.jpg'],['full','foot-reflexology-chart.jpg']];
let reflexView='full', bodySubject='asher', merFilter='', zoom=100, curMer=null, merRegion='face';
let installPrompt=null;

/* ---------- helpers ---------- */
function heName(p){return p.heN||p.py||p.c;}
function favKey(kind,id){return kind+':'+id;}
function isFav(k){return favs.includes(k);}
function toggleFav(k){favs=isFav(k)?favs.filter(x=>x!==k):[...favs,k];store.set('favs',favs);renderNav();if(screen==='favs')route('favs');refreshSheetFav(k);}
const ICON={
 home:'<path d="M3 11 12 3l9 8"/><path d="M5 10v10h14V10"/>',
 reflex:'<path d="M7 14c0-3 1-5 3-5s3 2 3 5c0 2-1 3-3 3s-3-1-3-3Z"/><circle cx="8" cy="7" r="1"/><circle cx="11" cy="6.4" r="1"/><circle cx="14" cy="7.4" r="1"/><path d="M13 17c2 0 4 1 4 3"/>',
 points:'<path d="M12 3v18M6 8l12 8M18 8 6 16"/><circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none"/><circle cx="6" cy="8" r="1.4" fill="currentColor" stroke="none"/><circle cx="18" cy="16" r="1.4" fill="currentColor" stroke="none"/>',
 meridians:'<path d="M5 4c4 2 4 6 0 8s-4 6 0 8M12 4c4 2 4 6 0 8s-4 6 0 8M19 4c-4 2-4 6 0 8s4 6 0 8"/>',
 learn:'<path d="M4 5h16v12H4z"/><path d="M4 9h16M9 5v12"/>',
 favs:'<path d="M12 20s-7-4.5-9.2-8.5C1.3 8.5 2.6 5 6 5c2 0 3 1.4 3.6 2.3C10.2 6.4 11.2 5 13.2 5 16.6 5 18 8.5 16.4 11.5 14.2 15.5 12 20 12 20Z"/>'
};
function svg(name,cls=''){return `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">${ICON[name]}</svg>`;}

/* ---------- navigation ---------- */
const NAVS=['home','reflex','points','meridians','learn','favs'];
function renderNav(){
  $('#nav').innerHTML=NAVS.map(s=>`<button class="tab ${screen===s?'active':''}" data-go="${s}">${svg(s)}${t(s==='reflex'?'reflex':s==='points'?'points':s==='meridians'?'meridians':s)} ${s==='favs'?`<span class="count">${favs.length}</span>`:''}</button>`).join('');
}
function route(s){screen=s;query=$('#q').value='';renderNav();window.scrollTo(0,0);
  ({home:homeScreen,reflex:reflexScreen,points:pointsScreen,meridians:meridiansScreen,learn:learnScreen,favs:favsScreen,settings:settingsScreen,about:aboutScreen}[s]||homeScreen)();}

/* ---------- HOME ---------- */
function homeScreen(){
  const tiles=[['reflex','reflex',D.zones.length+' '+t('reflex')],['points','points',D.points.length],['meridians','meridians',D.meridians.length],['learn','learn','']];
  $('#view').innerHTML=`<div class="screen">
   <div class="hero"><div><div class="eyebrow">${t('heroEye')}</div><h1>${t('heroH')}</h1><p>${t('heroP')}</p></div>
     <button class="favpill" data-go="favs">${svg('favs')} ${favs.length} ${t('favs')}</button></div>
   <div class="tiles">
     ${tiles.map(([go,ic,cnt])=>`<button class="tile" data-go="${go}"><span class="ic">${svg(ic)}</span>
        <div><b>${t(go)}</b><small>${t('t_'+go)}</small></div><span class="cnt">${cnt||''}</span></button>`).join('')}
   </div>
   <div class="card ready-card">
     <div class="ready-copy"><span class="ready-icon">✓</span><div><b>${LANG==='he'?'מוכנה לשימוש אישי':'Ready for personal use'}</b>
       <p>${LANG==='he'?'המידע והמועדפים נשמרים במכשיר. לאחר טעינה ראשונה האפליקציה זמינה גם בלי אינטרנט.':'Content and favorites stay on this device. After the first load, the app is also available offline.'}</p></div></div>
     <button class="btn ghost" data-install>${isStandalone()?(LANG==='he'?'האפליקציה מותקנת':'App installed'):(installPrompt?(LANG==='he'?'התקנה במכשיר':'Install on device'):(LANG==='he'?'איך מתקינים?':'How to install'))}</button>
   </div>
   <div class="card warn" style="margin-top:22px">${t('safety')}</div>
  </div>`;
}

function isStandalone(){return window.matchMedia('(display-mode: standalone)').matches||navigator.standalone===true;}
function showInstallHelp(){
  const m=document.createElement('div');m.className='modal';
  m.innerHTML=`<div class="box"><div class="eyebrow">${LANG==='he'?'התקנה אישית':'Personal install'}</div><h2>${LANG==='he'?'כך מוסיפים למסך הבית':'Add to your home screen'}</h2>
    <p class="steps">${LANG==='he'?'ב־Android או במחשב: פתחו את תפריט הדפדפן ובחרו „התקנת האפליקציה” או „הוספה למסך הבית”. ב־iPhone: לחצו על שיתוף ואז „הוספה למסך הבית”.':'On Android or desktop, open the browser menu and choose Install app or Add to Home Screen. On iPhone, choose Share and then Add to Home Screen.'}</p>
    <p style="color:var(--muted)">${LANG==='he'?'אין צורך בחנות אפליקציות או בחשבון.':'No app store or account is required.'}</p><button class="btn" data-install-close>${LANG==='he'?'הבנתי':'Got it'}</button></div>`;
  document.body.appendChild(m);m.querySelector('[data-install-close]').onclick=()=>m.remove();
}

/* ---------- REFLEXOLOGY ---------- */
const REFLEX_SVG=`<svg viewBox="0 0 820 620" xmlns="http://www.w3.org/2000/svg" width="100%" style="max-width:820px;display:block;margin:auto;border-radius:14px" role="img" aria-label="מפת רפלקסולוגיה סכמטית"><rect x="0" y="0" width="820" height="620" rx="16" fill="#15151b"/><text x="26" y="34" fill="#C9A84C" font-family="Segoe UI,system-ui,sans-serif" font-size="19" font-weight="700">מפת רפלקסולוגיה — סכמה לימודית</text><text x="26" y="52" fill="#8f8a7e" font-family="Segoe UI,system-ui,sans-serif" font-size="12">Reflexology sole map — schematic · המספור המדויק ברשת האזורים שמתחת</text><!-- region bands (behind both feet) --><g><rect x="120" y="78"  width="430" height="70"  rx="10" fill="#C9A84C" opacity="0.16"/><rect x="120" y="150" width="430" height="52"  rx="10" fill="#7FB2C9" opacity="0.15"/><rect x="120" y="204" width="430" height="86"  rx="10" fill="#C97F7F" opacity="0.14"/><rect x="120" y="292" width="430" height="80"  rx="10" fill="#9CC97F" opacity="0.14"/><rect x="120" y="374" width="430" height="66"  rx="10" fill="#C9A84C" opacity="0.10"/><rect x="120" y="442" width="430" height="74"  rx="10" fill="#A88CC9" opacity="0.16"/></g><!-- diaphragm & waist guide lines --><line x1="128" y1="292" x2="542" y2="292" stroke="#C9A84C" stroke-width="1" stroke-dasharray="4 5" opacity="0.5"/><line x1="128" y1="374" x2="542" y2="374" stroke="#C9A84C" stroke-width="1" stroke-dasharray="4 5" opacity="0.5"/><text x="546" y="296" fill="#8f8a7e" font-family="Segoe UI,sans-serif" font-size="10" text-anchor="start" transform="translate(-420,0)"> </text><!-- FEET --><defs><path id="sole" d="M -72,70 C -78,22 -58,10 -30,8 L 30,8 C 58,10 78,22 72,70 C 78,140 50,150 40,180 C 34,220 32,240 34,270 C 40,340 60,362 58,402 C 56,442 30,454 0,454 C -30,454 -56,442 -58,402 C -60,362 -40,340 -34,270 C -32,240 -34,220 -40,180 C -50,150 -78,140 -72,70 Z"/><g id="foot">  <use href="#sole" fill="#C9A84C" fill-opacity="0.05" stroke="#C9A84C" stroke-width="2"/>  <circle cx="42" cy="-12" r="17" fill="#C9A84C" fill-opacity="0.05" stroke="#C9A84C" stroke-width="2"/>  <circle cx="15" cy="-22" r="12" fill="#C9A84C" fill-opacity="0.05" stroke="#C9A84C" stroke-width="2"/>  <circle cx="-8" cy="-24" r="11" fill="#C9A84C" fill-opacity="0.05" stroke="#C9A84C" stroke-width="2"/>  <circle cx="-28" cy="-22" r="10" fill="#C9A84C" fill-opacity="0.05" stroke="#C9A84C" stroke-width="2"/>  <circle cx="-46" cy="-17" r="8"  fill="#C9A84C" fill-opacity="0.05" stroke="#C9A84C" stroke-width="2"/>  <!-- spine along inner (medial, +x) edge -->  <path d="M 58,60 C 40,150 34,240 40,330 C 44,380 40,410 34,440" fill="none" stroke="#EDE6D6" stroke-width="2.4" stroke-dasharray="2 6" stroke-linecap="round" opacity="0.75"/></g></defs><g transform="translate(210,150)"><use href="#foot"/></g><g transform="translate(460,150) scale(-1,1)"><use href="#foot"/></g><!-- on-foot region words (right foot, RTL Hebrew) --><g font-family="Segoe UI,system-ui,sans-serif" font-size="13" fill="#EDE6D6" text-anchor="middle">  <text x="196" y="128">ראש · סינוסים</text>  <text x="196" y="180">עיניים · אוזניים</text>  <text x="196" y="255">ריאות · חזה</text>  <text x="196" y="336">קיבה · כליות</text>  <text x="196" y="412">מעיים</text>  <text x="196" y="486">אגן · סיאטיקה</text></g><!-- spine caption --><text x="335" y="300" fill="#EDE6D6" font-family="Segoe UI,sans-serif" font-size="12" text-anchor="middle" opacity="0.9" transform="rotate(-90 335 300)">עמוד השדרה · Spine</text><!-- LEGEND --><g font-family="Segoe UI,system-ui,sans-serif"><text x="800" y="96" text-anchor="end" fill="#C9A84C" font-size="13" font-weight="700">מקרא · Zones</text><g transform="translate(0,110)">  <rect x="782" y="0"  width="16" height="16" rx="4" fill="#C9A84C" opacity="0.6"/><text x="774" y="13" text-anchor="end" fill="#EDE6D6" font-size="12.5">ראש · בלוטות · Head / glands</text>  <rect x="782" y="30" width="16" height="16" rx="4" fill="#7FB2C9" opacity="0.7"/><text x="774" y="43" text-anchor="end" fill="#EDE6D6" font-size="12.5">חושים · כתף · Senses / shoulder</text>  <rect x="782" y="60" width="16" height="16" rx="4" fill="#C97F7F" opacity="0.7"/><text x="774" y="73" text-anchor="end" fill="#EDE6D6" font-size="12.5">ריאות · לב · כבד · Chest</text>  <rect x="782" y="90" width="16" height="16" rx="4" fill="#9CC97F" opacity="0.7"/><text x="774" y="103" text-anchor="end" fill="#EDE6D6" font-size="12.5">קיבה · כליות · לבלב · Upper abdomen</text>  <rect x="782" y="120" width="16" height="16" rx="4" fill="#C9A84C" opacity="0.45"/><text x="774" y="133" text-anchor="end" fill="#EDE6D6" font-size="12.5">מעי דק · מעי גס · Intestines</text>  <rect x="782" y="150" width="16" height="16" rx="4" fill="#A88CC9" opacity="0.7"/><text x="774" y="163" text-anchor="end" fill="#EDE6D6" font-size="12.5">אגן · סיאטיקה · Pelvis / sciatic</text>  <g transform="translate(0,186)">    <line x1="784" y1="8" x2="798" y2="8" stroke="#EDE6D6" stroke-width="2.4" stroke-dasharray="2 5" opacity="0.75"/>    <text x="778" y="12" text-anchor="end" fill="#EDE6D6" font-size="12.5">עמוד השדרה (קצה פנימי) · Spine</text>  </g></g><text x="800" y="330" text-anchor="end" fill="#8f8a7e" font-size="11">אסכולות שונות עשויות לסמן</text><text x="800" y="346" text-anchor="end" fill="#8f8a7e" font-size="11">גבולות מעט שונים.</text></g></svg>`;
function reflexScreen(){
  const viewFile=footViews.find(v=>v[0]===reflexView)[1];
  const q=query.trim().toLowerCase();
  const zones=D.zones.filter(z=>!q||[z.c,z.he,z.en].some(v=>(v||'').toLowerCase().includes(q)));
  $('#view').innerHTML=`<div class="screen">
   <div class="section-head"><div><div class="eyebrow">${t('reflex')}</div><h2>${t('t_reflex')}</h2></div></div>
   <div class="workspace">
     <div class="card">
       <div class="toolbar"><div class="seg">${footViews.map(v=>`<button class="chip ${reflexView===v[0]?'active':''}" data-fv="${v[0]}">${t('v_'+v[0])}</button>`).join('')}</div></div>
       <div class="stage" id="stage">${reflexView==='full'?REFLEX_SVG:`<img src="assets/${viewFile}" alt="${t('t_reflex')}">`}</div>
       <div class="zoombar"><span>${t('zoom')}</span><button data-zoom="-1">−</button><input id="zoom" type="range" min="100" max="360" step="20" value="${zoom}"><button data-zoom="1">+</button><span id="zval">${zoom}%</span></div>
       <div class="zonegrid">${D.zones.map(z=>`<button data-zone="${z.c}" title="${z.he}">${z.c.replace(/^R/,'')}</button>`).join('')}</div>
       <p class="map-note">${t('reflexNote')}</p>
     </div>
     ${listPanel(t('listZones'),zones.map(z=>rowHtml('R'+z.c.replace(/^R/,''),z.he,z.en,t('reflex'),'zone:'+z.c)))}
   </div></div>`;
  bindStage(); applyZoom();
}

/* ---------- POINTS (body) ---------- */
function pointsScreen(){
  const q=query.trim().toLowerCase().replace(/\s/g,'');
  let pts=D.points;
  if(merFilter) pts=pts.filter(p=>p.m===merFilter);
  if(q) pts=pts.filter(p=>[p.c,p.py,p.zh,heName(p),p.m,MER_HE[p.m],p.heL,p.heI,p.heA].some(v=>(v||'').toLowerCase().replace(/\s/g,'').includes(q)));
  const placements=(D.placements[bodySubject]||[]);
  const byCode={}; D.points.forEach(p=>byCode[p.c]=p);
  const pins=placements.filter(pl=>byCode[pl.c]).map(pl=>`<button class="acupin" data-point="${pl.c}" title="${pl.c}" style="left:${pl.x*100}%;top:${pl.y*100}%"></button>`).join('');
  $('#view').innerHTML=`<div class="screen">
   <div class="section-head"><div><div class="eyebrow">${t('points')}</div><h2>${t('t_points')}</h2></div></div>
   <div class="workspace">
     <div class="card">
       <div class="toolbar"><span class="chip" style="pointer-events:none">${t('bodySubject')}</span>
         <select class="chip" id="subject">${Object.keys(subjFile).map(s=>`<option value="${s}" ${bodySubject===s?'selected':''}>${s[0].toUpperCase()+s.slice(1)}</option>`).join('')}</select></div>
       <div class="stage body" id="stage"><img src="assets/acusim/${subjFile[bodySubject]}.webp" alt="${t('points')}">${pins}</div>
       <p class="map-note">${t('pointsNote',placements.filter(pl=>byCode[pl.c]).length)}</p>
     </div>
     ${listPanel(q&&LANG==='he'?`תוצאות חיפוש: ${query}`:t('listPoints'),pts.map(p=>rowHtml(p.c,heName(p),(p.zh?p.zh+' · ':'')+p.py,(MER_HE[p.m]||p.m)+(p.heI?' · עברית ערוכה':''),'point:'+p.c)),pts.length,`
        <select class="chip" id="merfilter"><option value="">${t('allMer')}</option>${D.meridians.map(m=>`<option value="${m.ab}" ${merFilter===m.ab?'selected':''}>${m.ab} · ${m.heN||m.name}</option>`).join('')}</select>`)}
   </div></div>`;
  $('#subject').onchange=e=>{bodySubject=e.target.value;pointsScreen();};
  $('#merfilter').onchange=e=>{merFilter=e.target.value;pointsScreen();};
}

/* ---------- MERIDIANS ---------- */
function meridiansScreen(){
  if(curMer){return meridianDetail(curMer);}
  $('#view').innerHTML=`<div class="screen">
   <div class="section-head"><div><div class="eyebrow">${t('meridians')}</div><h2>${t('t_meridians')}</h2></div></div>
   <p style="color:var(--muted);margin:0 0 16px">${t('merIntro')}</p>
   <div class="mgrid">${D.meridians.map(m=>`<button class="mcard" data-mer="${m.ab}"><span class="ab">${m.ab}</span><b>${m.heN||m.name}</b><small>${m.n} ${t('pts')}</small><span class="mdot"></span></button>`).join('')}</div>
  </div>`;
}
function meridianVisual(m){
  if(m.ab==='GB'){
    const headPoints=[
      ['GB 1',426,170,-22,5],['GB 2',470,184,22,5],['GB 3',506,166,-22,5],['GB 4',535,139,22,5],['GB 5',550,105,-22,5],
      ['GB 6',538,73,22,5],['GB 7',505,58,-22,5],['GB 8',468,62,22,5],['GB 9',438,80,-22,5],['GB 10',420,110,22,5],
      ['GB 11',438,205,-22,5],['GB 12',466,230,22,5],['GB 13',395,82,-22,5],['GB 14',378,108,22,5],['GB 15',370,140,-22,5],
      ['GB 16',378,171,22,5],['GB 17',392,199,-22,5],['GB 18',408,225,22,5],['GB 19',430,250,-22,5],['GB 20',455,280,22,5]
    ];
    const torsoPoints=Array.from({length:10},(_,i)=>[`GB ${21+i}`,420+(i%2?18:-18),70+i*42,i%2?25:-25,5]);
    const legCoords=[[430,65],[438,94],[442,124],[448,154],[451,186],[454,220],[456,255],[458,290],[458,326],[454,360],[447,394],[425,425],[385,451],[335,470]];
    const legPoints=legCoords.map(([x,y],i)=>[`GB ${31+i}`,x,y,i%2?25:-25,5]);
    const regions={
      head:{title:'ראש וצוואר',range:'GB 1–GB 20',subtitle:'זווית העין ← סביב האוזן והרקה ← אחורי הראש ← בסיס הגולגולת',points:headPoints,body:'M460 42c-66 0-112 50-112 116 0 58 35 101 84 111l-8 48-55 72m91-347c66 0 112 50 112 116 0 58-35 101-84 111l8 48 55 72M390 146h140M416 207c29 18 59 18 88 0M424 317h72',route:'M426 170C465 188 485 185 506 166S544 130 550 105 528 62 505 58 458 67 438 80 417 104 420 110L438 205 466 230 395 82 378 108 370 140 378 171 392 199 408 225 430 250 455 280'},
      torso:{title:'כתף, צדי הגוף והאגן',range:'GB 21–GB 30',subtitle:'שיא הכתף ← צד בית החזה והמותן ← צד האגן והעכוז',points:torsoPoints,body:'M410 42c-35 0-62 26-62 59v38l-76 80m138-177c35 0 62 26 62 59v38l76 80M348 119l-34 92 20 244m148-336 34 92-20 244M334 455l76 24 76-24M410 112v344M354 250h112M350 348h120',route:'M402 70C430 110 390 160 438 196S402 270 448 310 416 390 438 448'},
      leg:{title:'ירך, שוק וכף הרגל',range:'GB 31–GB 44',subtitle:'צד הירך ← צד הברך והשוק ← קרסול חיצוני ← גב כף הרגל והאצבע הרביעית',points:legPoints,body:'M350 40l60 22 60-22M350 40l-20 185 28 174-25 61m137-420 20 185-28 174 25 61M358 399l-25 61-58 18m187-79 25 61 58 18M275 478h94m81 0h95',route:'M430 65C440 145 452 215 456 290S455 365 447 394 426 424 425 425 392 448 385 451 350 466 335 470'}
    };
    const key=regions[merRegion]?merRegion:'head',r=regions[key];
    const nodes=r.points.map(([c,x,y,dx,dy])=>`<g class="point-node" aria-hidden="true"><circle cx="${x}" cy="${y}" r="8"/><text x="${x+dx}" y="${y+dy}" text-anchor="${dx<0?'end':'start'}">${c}</text></g>`).join('');
    const hits=r.points.map(([c,x,y])=>`<button class="map-hit" data-point="${c}" aria-label="פתיחת ${c}" style="left:${x/8.2}%;top:${y/5.2}%">${c}</button>`).join('');
    return `<div class="card" style="overflow:hidden;margin-bottom:14px"><div class="seg-toggle" style="margin:14px;display:grid;grid-template-columns:repeat(3,1fr)">${[['head','ראש וצוואר','1–20'],['torso','צדי הגוף והאגן','21–30'],['leg','רגל וכף הרגל','31–44']].map(([k,n,rg])=>`<button class="${key===k?'active':''}" data-mregion="${k}">${n}<br><small>GB ${rg}</small></button>`).join('')}</div>
      <div style="padding:0 16px 8px"><b style="color:var(--gold)">${r.title} · ${r.range}</b><div style="color:var(--muted);font-size:14px;margin-top:3px">${r.subtitle}</div></div><div class="mer-map compact"><div class="mer-canvas"><svg viewBox="0 0 820 520" role="img" aria-label="מפת ${r.title} של מרידיאן כיס המרה"><defs><marker id="gbArrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 10 5 0 10z" fill="var(--gold-soft)"/></marker></defs><path class="bodyline" d="${r.body}"/><path class="route-line" d="${r.route}"/><path class="flow-line" marker-end="url(#gbArrow)" d="${r.route}"/>${nodes}<g fill="var(--muted)" font-family="Segoe UI,Arial,sans-serif"><text x="790" y="34" text-anchor="end" fill="var(--gold)" font-size="18" font-weight="800">מרידיאן כיס המרה · GB</text></g></svg>${hits}</div></div><div class="map-guide"><span>☝</span><span><b>איך משתמשים במפה?</b> בחרו אחד משלושת האזורים ולחצו על GB 1–GB 44. המסלול מפותל סביב הראש והצד החיצוני של הגוף, ולכן התרשים סכמטי ומיועד ללימוד.</span></div></div>`;
  }
  if(m.ab==='TE'){
    const regions={
      arm:{title:'כף היד והזרוע',range:'TE 1–TE 10',subtitle:'קמיצה ← גב כף היד ← שורש כף היד ← גב האמה והמרפק',points:[
        ['TE 1',220,466,-22,-12],['TE 2',260,452,22,-12],['TE 3',300,434,-22,-12],['TE 4',340,408,22,-12],['TE 5',380,376,-22,-12],
        ['TE 6',420,340,22,-12],['TE 7',455,306,-22,-12],['TE 8',486,272,22,-12],['TE 9',515,235,-22,-12],['TE 10',540,195,22,-12]],
        body:'M690 68c-44 0-70 24-79 66l-12 60 48 52 48-52-12-60c-8-42-31-66-69-66M612 132c-35 23-67 51-95 86l-67 75-67 61-68 48-96 57M681 134c24 18 42 47 49 84M219 466l-24 8m24-8 9 21m-9-21 23 11m-23-11 17-4',
        route:'M220 466C260 453 280 444 300 434S325 418 340 408 366 387 380 376 407 350 420 340 444 317 455 306 475 284 486 272 505 248 515 235 533 208 540 195',
        arrows:['M234 461L291 438','M311 428L333 413','M350 400L373 382','M390 369L413 346','M431 330L449 312','M465 296L480 279','M495 261L511 241','M522 225L537 201']},
      upper:{title:'כתף, צוואר וסביב האוזן',range:'TE 11–TE 23',subtitle:'זרוע עליונה ← כתף ← צד הצוואר ← מאחורי האוזן ← רקה וגבה',points:[
        ['TE 11',322,390,-22,5],['TE 12',345,352,22,5],['TE 13',372,315,-22,5],['TE 14',405,282,22,5],['TE 15',446,247,-22,5],
        ['TE 16',490,210,22,5],['TE 17',530,181,-22,5],['TE 18',555,145,22,5],['TE 19',578,108,-22,5],['TE 20',607,79,22,5],
        ['TE 21',640,105,-22,5],['TE 22',662,137,22,5],['TE 23',642,166,-22,5]],
        body:'M586 48c-55 0-94 43-94 98 0 46 26 82 62 94l-8 40-47 55M586 48c55 0 94 43 94 98 0 46-26 82-62 94l8 40 47 55M515 138h142M540 199c28 17 57 17 84 0M500 334l-83 30-95 26m304-56 72 52M417 364l-25 83m-70-57-38 57',
        route:'M322 390C342 366 345 352 372 315S390 296 405 282 431 260 446 247 475 222 490 210 515 191 530 181 548 157 555 145 568 119 578 108 594 89 607 79 630 93 640 105 654 123 662 137 653 155 642 166',
        arrows:['M329 381L341 359','M352 342L367 322','M381 306L399 288','M414 275L439 253','M455 239L482 216','M500 203L523 186','M539 172L551 151','M561 136L574 114','M586 99L601 84','M616 84L635 100','M647 113L658 132','M658 146L646 161']}
    };
    const key=merRegion==='upper'?'upper':'arm',r=regions[key];
    const nodes=r.points.map(([c,x,y,dx,dy])=>`<g class="point-node" aria-hidden="true"><circle cx="${x}" cy="${y}" r="9"/><text x="${x+dx}" y="${y+dy}" text-anchor="${dx<0?'end':'start'}">${c}</text></g>`).join('');
    const hits=r.points.map(([c,x,y])=>`<button class="map-hit" data-point="${c}" aria-label="פתיחת ${c}" style="left:${x/8.2}%;top:${y/5.2}%">${c}</button>`).join('');
    const arrows=r.arrows.map(d=>`<path class="flow-line" marker-end="url(#teArrow)" d="${d}"/>`).join('');
    return `<div class="card" style="overflow:hidden;margin-bottom:14px"><div class="seg-toggle" style="margin:14px;display:grid;grid-template-columns:repeat(2,1fr)">
      <button class="${key==='arm'?'active':''}" data-mregion="arm">כף היד והזרוע<br><small>TE 1–10</small></button><button class="${key==='upper'?'active':''}" data-mregion="upper">כתף, צוואר ואוזן<br><small>TE 11–23</small></button></div>
      <div style="padding:0 16px 8px"><b style="color:var(--gold)">${r.title} · ${r.range}</b><div style="color:var(--muted);font-size:14px;margin-top:3px">${r.subtitle}</div></div>
      <div class="mer-map compact"><div class="mer-canvas"><svg viewBox="0 0 820 520" role="img" aria-label="מפת ${r.title} של מרידיאן המחמם המשולש"><defs><marker id="teArrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 10 5 0 10z" fill="var(--gold-soft)"/></marker></defs><path class="bodyline" d="${r.body}"/><path class="route-line" d="${r.route}"/>${arrows}${nodes}<g fill="var(--muted)" font-family="Segoe UI,Arial,sans-serif"><text x="790" y="34" text-anchor="end" fill="var(--gold)" font-size="18" font-weight="800">מרידיאן המחמם המשולש · TE</text><text x="36" y="42" font-size="15">החצים מציגים את כיוון המסלול</text></g></svg>${hits}</div></div>
      <div class="map-guide"><span>☝</span><span><b>איך משתמשים במפה?</b> בחרו חלק ולחצו על TE 1–TE 23 לפתיחת מיקום, שימושים מסורתיים והנחיות זהירות. התרשים סכמטי ומיועד ללימוד.</span></div></div>`;
  }
  if(m.ab==='PC'){
    const points=[
      ['PC 1',656,126,22,-12],['PC 2',610,181,22,-12],['PC 3',556,242,22,-12],['PC 4',503,304,22,-12],
      ['PC 5',458,349,22,-12],['PC 6',420,383,22,-12],['PC 7',378,416,22,-12],['PC 8',324,449,22,-12],['PC 9',266,476,-22,-12]
    ];
    const nodes=points.map(([c,x,y,dx,dy])=>`<g class="point-node" aria-hidden="true"><circle cx="${x}" cy="${y}" r="10"/><text x="${x+dx}" y="${y+dy}" text-anchor="${dx<0?'end':'start'}">${c}</text></g>`).join('');
    const hits=points.map(([c,x,y])=>`<button class="map-hit" data-point="${c}" aria-label="פתיחת ${c}" style="left:${x/8.2}%;top:${y/5.2}%">${c}</button>`).join('');
    return `<div class="card" style="overflow:hidden;margin-bottom:14px">
      <div style="padding:15px 16px 8px"><b style="color:var(--gold)">החזה עד האצבע האמצעית · PC 1–PC 9</b><div style="color:var(--muted);font-size:14px;margin-top:3px">צד החזה ← פנים הזרוע ← מרפק ← מרכז שורש כף היד ← אצבע אמצעית</div></div>
      <div class="mer-map"><div class="mer-canvas"><svg viewBox="0 0 820 520" role="img" aria-labelledby="pcMapTitle pcMapDesc">
        <title id="pcMapTitle">מפה אינטראקטיבית של מרידיאן מעטפת הלב</title><desc id="pcMapDesc">המסלול מתחיל בצד החזה, עובר במרכז הצד הפנימי של הזרוע ומסתיים בקצה האצבע האמצעית. כל תשע הנקודות לחיצות.</desc>
        <defs><marker id="pcArrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 10 5 0 10z" fill="var(--gold-soft)"/></marker></defs>
        <path class="bodyline" d="M700 68c-45 0-72 25-80 69l-13 61 45 54 48-55-11-61c-7-43-29-68-68-68M620 135c-35 24-65 51-91 83l-66 78-67 66-65 50-68 62M689 138c25 18 43 47 49 84M263 474l-23 8m23-8 8 21m-8-21 22 11m-22-11 17-5"/>
        <path class="route-line" d="M656 126C638 146 624 167 610 181S577 219 556 242 523 284 503 304 475 337 458 349 436 372 420 383 397 405 378 416 345 439 324 449 283 470 266 476"/>
        <path class="flow-line" marker-end="url(#pcArrow)" d="M648 136L617 174M597 195L564 233M546 254L511 296M493 314L466 343M446 359L427 377M408 393L385 411M365 425L332 445M310 456L275 472"/>
        ${nodes}
        <g fill="var(--muted)" font-family="Segoe UI,Arial,sans-serif" font-size="15"><text x="790" y="34" text-anchor="end" fill="var(--gold)" font-size="18" font-weight="800">מרידיאן מעטפת הלב · PC</text><text x="790" y="58" text-anchor="end">החזה ← פנים הזרוע ← אצבע אמצעית</text><text x="36" y="42">החצים מציגים את כיוון המסלול</text></g>
      </svg>${hits}</div></div>
      <div class="map-guide"><span>☝</span><span><b>איך משתמשים במפה?</b> לחצו על PC 1–PC 9 כדי לפתוח מיקום, שימושים מסורתיים והנחיות זהירות. אפשר לגלול לצדדים במסך קטן.</span></div>
    </div>`;
  }
  if(m.ab==='KI'){
    const regions={
      foot:{title:'כף הרגל והרגל',range:'KI 1–KI 10',subtitle:'סוליית כף הרגל ← קרסול פנימי ← פנים השוק ← פנים הברך',points:[
        ['KI 1',282,467,-24,-10],['KI 2',322,448,24,-10],['KI 3',355,420,-24,-10],['KI 4',377,386,24,-10],['KI 5',390,350,-24,-10],
        ['KI 6',398,312,24,-10],['KI 7',403,268,-24,-10],['KI 8',407,222,24,-10],['KI 9',409,174,-24,-10],['KI 10',410,122,24,-10]],
        body:'M350 42l60 22 60-22M350 42l-20 182 28 174-28 65m140-421 20 182-28 174 28 65M358 398l-28 65-75 16m207-81 28 65 75 16M255 479h118m74 0h118',
        route:'M282 467C315 453 340 434 355 420S381 373 390 350 401 290 403 268L410 122',
        arrows:['M296 461L345 427','M365 408L387 358','M394 340L402 280','M405 255L409 190','M409 170L410 132']},
      torso:{title:'אגן, בטן וחזה',range:'KI 11–KI 27',subtitle:'עצם החיק ← מרכז הבטן ← צדי עצם החזה ← מתחת לעצם הבריח',points:Array.from({length:17},(_,i)=>[`KI ${11+i}`,410+(i%2?5:-5),455-i*24,i%2?25:-25,5]),
        body:'M410 44c-35 0-62 26-62 59v38l-76 80m138-177c35 0 62 26 62 59v38l76 80M348 121l-32 92 20 242m146-334 32 92-20 242M336 455l74 24 74-24M410 112v345M354 252h112M350 348h120',
        route:'M405 455C410 390 402 320 408 250S404 145 405 71',
        arrows:['M406 442L407 370','M406 347L407 275','M407 250L406 180','M406 155L405 82']}
    };
    const key=merRegion==='torso'?'torso':'foot',r=regions[key];
    const nodes=r.points.map(([c,x,y,dx,dy])=>`<g class="point-node" aria-hidden="true"><circle cx="${x}" cy="${y}" r="9"/><text x="${x+dx}" y="${y+dy}" text-anchor="${dx<0?'end':'start'}">${c}</text></g>`).join('');
    const hits=r.points.map(([c,x,y])=>`<button class="map-hit" data-point="${c}" aria-label="פתיחת ${c}" style="left:${x/8.2}%;top:${y/5.2}%">${c}</button>`).join('');
    const arrows=r.arrows.map(d=>`<path class="flow-line" marker-end="url(#kiArrow)" d="${d}"/>`).join('');
    return `<div class="card" style="overflow:hidden;margin-bottom:14px">
      <div class="seg-toggle" style="margin:14px;display:grid;grid-template-columns:repeat(2,1fr)">
        <button class="${key==='foot'?'active':''}" data-mregion="foot">כף הרגל והרגל<br><small>KI 1–10</small></button>
        <button class="${key==='torso'?'active':''}" data-mregion="torso">אגן, בטן וחזה<br><small>KI 11–27</small></button>
      </div>
      <div style="padding:0 16px 8px"><b style="color:var(--gold)">${r.title} · ${r.range}</b><div style="color:var(--muted);font-size:14px;margin-top:3px">${r.subtitle}</div></div>
      <div class="mer-map compact"><div class="mer-canvas"><svg viewBox="0 0 820 520" role="img" aria-label="מפת ${r.title} של מרידיאן הכליות">
        <defs><marker id="kiArrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 10 5 0 10z" fill="var(--gold-soft)"/></marker></defs>
        <path class="bodyline" d="${r.body}"/><path class="route-line" d="${r.route}"/>${arrows}${nodes}
        <g fill="var(--muted)" font-family="Segoe UI,Arial,sans-serif"><text x="790" y="34" text-anchor="end" fill="var(--gold)" font-size="18" font-weight="800">מרידיאן הכליות · KI</text><text x="36" y="42" font-size="15">החצים מציגים את כיוון המסלול</text></g>
      </svg>${hits}</div></div>
      <div class="map-guide"><span>☝</span><span><b>איך משתמשים במפה?</b> בחרו אזור ולחצו על KI 1–KI 27 לפתיחת מיקום, שימושים מסורתיים והנחיות זהירות. התרשים סכמטי ומיועד ללימוד.</span></div>
    </div>`;
  }
  if(m.ab==='BL'){
    const make=(start,count,step=22,x=410)=>Array.from({length:count},(_,i)=>[`BL ${start+i}`,x+(i%2?5:-5),70+i*step,i%2?25:-25,5]);
    const regions={
      head:{title:'ראש וצוואר',range:'BL 1–BL 10',subtitle:'זווית העין ← מצח וקודקוד ← עורף',points:[['BL 1',430,205,-24,5],['BL 2',420,165,24,5],['BL 3',410,125,-24,5],['BL 4',420,88,24,5],['BL 5',455,68,-24,5],['BL 6',495,65,24,5],['BL 7',535,78,-24,5],['BL 8',565,105,24,5],['BL 9',575,145,-24,5],['BL 10',555,190,24,5]],body:'M500 48c-66 0-112 50-112 116 0 58 35 101 84 111l-8 48-55 72m91-347c66 0 112 50 112 116 0 58-35 101-84 111l8 48 55 72M430 150h140M456 211c29 18 59 18 88 0M464 323h72',route:'M430 205L420 165 410 125 420 88 455 68 495 65 535 78 565 105 575 145 555 190'},
      upper:{title:'גב עליון ואמצעי',range:'BL 11–BL 30',subtitle:'בסיס הצוואר ← שתי שורות לאורך עמוד השדרה ← מותניים',points:make(11,20,21),body:'M410 42c-34 0-62 27-62 61v42l-76 78m138-181c34 0 62 27 62 61v42l76 78M348 122l-30 92 19 250m145-342 30 92-19 250M337 464l73 18 73-18M410 106v355M354 248h112M350 350h120',route:'M405 70C409 165 402 260 408 350S408 430 415 469'},
      lower:{title:'גב תחתון, אגן וירך',range:'BL 31–BL 50',subtitle:'עצם העצה והעכוז ← אחורי הירך וברך ← קו הגב החיצוני',points:make(31,20,21),body:'M350 48l60 22 60-22M350 48l-20 170 28 174-28 72m140-416 20 170-28 174 28 72M358 392l-28 72-55 16m187-88 28 72 55 16M410 70v172M348 218h124',route:'M405 70C412 155 398 235 408 315S405 408 415 469'},
      leg:{title:'שוק, קרסול וכף הרגל',range:'BL 51–BL 67',subtitle:'אחורי השוק ← קרסול חיצוני ← צד כף הרגל ← הזרת',points:make(51,17,25),body:'M350 42l60 22 60-22M350 42l-20 182 28 174-28 65m140-421 20 182-28 174 28 65M358 398l-28 65-75 16m207-81 28 65 75 16M255 479h118m74 0h118',route:'M405 70C412 170 401 270 408 350S390 425 350 452L305 470'},
    };
    const key=regions[merRegion]?merRegion:'head',r=regions[key]; const ps=r.points;
    const nodes=ps.map(([c,x,y,dx,dy])=>`<g class="point-node" aria-hidden="true"><circle cx="${x}" cy="${y}" r="8"/><text x="${x+dx}" y="${y+dy}" text-anchor="${dx<0?'end':'start'}">${c}</text></g>`).join('');
    const hits=ps.map(([c,x,y])=>`<button class="map-hit" data-point="${c}" aria-label="פתיחת ${c}" style="left:${x/8.2}%;top:${y/5.2}%">${c}</button>`).join('');
    return `<div class="card" style="overflow:hidden;margin-bottom:14px"><div class="seg-toggle" style="margin:14px;display:grid;grid-template-columns:repeat(4,1fr)">${[['head','ראש וצוואר','1–10'],['upper','גב עליון','11–30'],['lower','גב תחתון','31–50'],['leg','רגל וכף רגל','51–67']].map(([k,n,rg])=>`<button class="${key===k?'active':''}" data-mregion="${k}">${n}<br><small>BL ${rg}</small></button>`).join('')}</div>
    <div style="padding:0 16px 8px"><b style="color:var(--gold)">${r.title} · ${r.range}</b><div style="color:var(--muted);font-size:14px;margin-top:3px">${r.subtitle}</div></div><div class="mer-map compact"><div class="mer-canvas"><svg viewBox="0 0 820 520" role="img" aria-label="מפת ${r.title} של מרידיאן שלפוחית השתן"><defs><marker id="blArrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 10 5 0 10z" fill="var(--gold-soft)"/></marker></defs><path class="bodyline" d="${r.body}"/><path class="route-line" d="${r.route}"/><path class="flow-line" marker-end="url(#blArrow)" d="${r.route}"/>${nodes}<g fill="var(--muted)" font-family="Segoe UI,Arial,sans-serif"><text x="790" y="34" text-anchor="end" fill="var(--gold)" font-size="18" font-weight="800">מרידיאן שלפוחית השתן · BL</text></g></svg>${hits}</div></div><div class="map-guide"><span>☝</span><span><b>איך משתמשים במפה?</b> בחרו אחד מארבעת האזורים ולחצו על BL 1–BL 67. התרשים סכמטי; במסלול זה יש שתי שורות בגב ולכן איתור מדויק דורש הכשרה.</span></div></div>`;
  }
  if(m.ab==='SI'){
    const regions={
      arm:{title:'כף היד והזרוע',range:'SI 1–SI 8',subtitle:'זרת ← צד כף היד ← שורש כף היד ← אמה ומרפק',points:[
        ['SI 1',220,464,-20,-12],['SI 2',265,448,20,-12],['SI 3',310,427,-20,-12],['SI 4',355,400,20,-12],
        ['SI 5',397,365,-20,-12],['SI 6',438,326,20,-12],['SI 7',480,280,-20,-12],['SI 8',520,230,20,-12]],
        body:'M690 74c-44 0-70 24-79 66l-12 60 48 52 48-52-12-60c-8-42-31-66-69-66M612 138c-35 23-67 51-95 86l-67 75-67 61-68 48-96 57M681 140c24 18 42 47 49 84M219 465l-24 8m24-8 9 21m-9-21 23 11m-23-11 17-4',
        route:'M220 464C260 451 285 440 310 427S337 412 355 400 383 377 397 365 425 338 438 326 467 293 480 280 508 245 520 230',
        arrows:['M234 459L296 433','M323 420L386 373','M409 354L469 291','M490 268L514 238']},
      upper:{title:'כתף, שכמה ופנים',range:'SI 9–SI 19',subtitle:'כתף ושכמה ← צוואר ← לחי ← קדמת האוזן',points:[
        ['SI 9',315,382,-22,5],['SI 10',345,340,22,5],['SI 11',400,325,-22,5],['SI 12',438,292,22,5],['SI 13',470,255,-22,5],
        ['SI 14',492,214,22,5],['SI 15',510,172,-22,5],['SI 16',535,135,22,5],['SI 17',563,106,-22,5],['SI 18',600,89,22,5],['SI 19',635,105,22,5]],
        body:'M586 54c-55 0-94 43-94 98 0 46 26 82 62 94l-8 40-47 55M586 54c55 0 94 43 94 98 0 46-26 82-62 94l8 40 47 55M515 144h142M540 205c28 17 57 17 84 0M500 340l-83 30-102 12m311-42 72 52M417 370l-25 83m-77-71-31 71',
        route:'M315 382C335 368 338 349 345 340S380 329 400 325 428 300 438 292 462 266 470 255 487 229 492 214 502 184 510 172 527 145 535 135 551 116 563 106 585 94 600 89 624 95 635 105',
        arrows:['M324 375L341 347','M357 337L391 327','M411 317L431 298','M447 282L467 260','M477 246L489 220','M497 204L507 179','M516 162L532 140','M542 128L558 111','M573 101L594 92','M610 91L630 101']}
    };
    const key=merRegion==='upper'?'upper':'arm',r=regions[key];
    const nodes=r.points.map(([c,x,y,dx,dy])=>`<g class="point-node" aria-hidden="true"><circle cx="${x}" cy="${y}" r="9"/><text x="${x+dx}" y="${y+dy}" text-anchor="${dx<0?'end':'start'}">${c}</text></g>`).join('');
    const hits=r.points.map(([c,x,y])=>`<button class="map-hit" data-point="${c}" aria-label="פתיחת ${c}" style="left:${x/8.2}%;top:${y/5.2}%">${c}</button>`).join('');
    const arrows=r.arrows.map(d=>`<path class="flow-line" marker-end="url(#siArrow)" d="${d}"/>`).join('');
    return `<div class="card" style="overflow:hidden;margin-bottom:14px"><div class="seg-toggle" style="margin:14px;display:grid;grid-template-columns:repeat(2,1fr)">
      <button class="${key==='arm'?'active':''}" data-mregion="arm">כף היד והזרוע<br><small>SI 1–8</small></button><button class="${key==='upper'?'active':''}" data-mregion="upper">כתף, שכמה ופנים<br><small>SI 9–19</small></button></div>
      <div style="padding:0 16px 8px"><b style="color:var(--gold)">${r.title} · ${r.range}</b><div style="color:var(--muted);font-size:14px;margin-top:3px">${r.subtitle}</div></div>
      <div class="mer-map compact"><div class="mer-canvas"><svg viewBox="0 0 820 520" role="img" aria-label="מפת ${r.title} של מרידיאן המעי הדק"><defs><marker id="siArrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 10 5 0 10z" fill="var(--gold-soft)"/></marker></defs>
      <path class="bodyline" d="${r.body}"/><path class="route-line" d="${r.route}"/>${arrows}${nodes}<g fill="var(--muted)" font-family="Segoe UI,Arial,sans-serif"><text x="790" y="34" text-anchor="end" fill="var(--gold)" font-size="18" font-weight="800">מרידיאן המעי הדק · SI</text><text x="36" y="42" font-size="15">החצים מציגים את כיוון המסלול</text></g></svg>${hits}</div></div>
      <div class="map-guide"><span>☝</span><span><b>איך משתמשים במפה?</b> בחרו חלק ולחצו על SI 1–SI 19 לפתיחת מיקום והסברים. התרשים סכמטי ומיועד ללימוד.</span></div></div>`;
  }
  if(m.ab==='HT'){
    const points=[
      ['HT 1',650,130,20,-12],['HT 2',603,190,20,-12],['HT 3',550,250,20,-12],['HT 4',492,314,20,-12],
      ['HT 5',448,354,20,-12],['HT 6',410,387,20,-12],['HT 7',372,416,20,-12],['HT 8',320,448,20,-12],['HT 9',265,474,-20,-12]
    ];
    const nodes=points.map(([c,x,y,dx,dy])=>`<g class="point-node" aria-hidden="true"><circle cx="${x}" cy="${y}" r="10"/><text x="${x+dx}" y="${y+dy}" text-anchor="${dx<0?'end':'start'}">${c}</text></g>`).join('');
    const hits=points.map(([c,x,y])=>`<button class="map-hit" data-point="${c}" aria-label="פתיחת ${c}" style="left:${x/8.2}%;top:${y/5.2}%">${c}</button>`).join('');
    return `<div class="card" style="overflow:hidden;margin-bottom:14px">
      <div style="padding:15px 16px 8px"><b style="color:var(--gold)">בית השחי עד הזרת · HT 1–HT 9</b><div style="color:var(--muted);font-size:14px;margin-top:3px">בית שחי ← פנים הזרוע ← מרפק ← שורש כף היד ← זרת</div></div>
      <div class="mer-map"><div class="mer-canvas"><svg viewBox="0 0 820 520" role="img" aria-labelledby="htMapTitle htMapDesc">
        <title id="htMapTitle">מפה אינטראקטיבית של מרידיאן הלב</title><desc id="htMapDesc">המסלול מתחיל בבית השחי, עובר בצד הפנימי של הזרוע ומסתיים בזרת. כל תשע הנקודות לחיצות.</desc>
        <defs><marker id="htArrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 10 5 0 10z" fill="var(--gold-soft)"/></marker></defs>
        <path class="bodyline" d="M700 68c-45 0-72 25-80 69l-13 61 45 54 48-55-11-61c-7-43-29-68-68-68M620 135c-35 24-65 51-91 83l-66 78-67 66-65 50-68 62M689 138c25 18 43 47 49 84M263 474l-23 8m23-8 8 21m-8-21 22 11m-22-11 17-5"/>
        <path class="route-line" d="M650 130C631 153 617 174 603 190S572 227 550 250 514 291 492 314 465 341 448 354 425 376 410 387 390 405 372 416 340 438 320 448 282 468 265 474"/>
        <path class="flow-line" marker-end="url(#htArrow)" d="M641 141L611 181M589 206L558 241M535 267L502 304M481 325L455 348M434 365L416 382M395 398L378 411M357 426L328 444M305 455L274 470"/>
        ${nodes}
        <g fill="var(--muted)" font-family="Segoe UI,Arial,sans-serif" font-size="15"><text x="790" y="34" text-anchor="end" fill="var(--gold)" font-size="18" font-weight="800">מרידיאן הלב · HT</text><text x="790" y="58" text-anchor="end">בית השחי ← פנים הזרוע ← זרת</text><text x="36" y="42">החצים מציגים את כיוון המסלול</text></g>
      </svg>${hits}</div></div>
      <div class="map-guide"><span>☝</span><span><b>איך משתמשים במפה?</b> לחצו על HT 1–HT 9 כדי לפתוח מיקום, שיוך מסורתי והנחיות זהירות. אפשר לגלול לצדדים במסך קטן.</span></div>
    </div>`;
  }
  if(m.ab==='SP'){
    const regions={
      foot:{title:'כף הרגל והרגל',range:'SP 1–SP 10',subtitle:'בוהן גדולה ← פנים כף הרגל ← קרסול ← שוק וירך פנימית',points:[
        ['SP 1',275,458,-22,5],['SP 2',307,446,22,5],['SP 3',338,430,-22,5],['SP 4',365,408,22,5],['SP 5',386,378,-22,5],
        ['SP 6',399,336,22,5],['SP 7',404,289,-22,5],['SP 8',406,242,22,5],['SP 9',408,192,-22,5],['SP 10',410,128,22,5]],
        body:'M350 45l60 20 60-20M350 45l-20 175 28 172-28 70m140-417 20 175-28 172 28 70M358 392l-28 70-75 16m207-86 28 70 75 16M255 478h118m74 0h118',
        route:'M275 458C310 446 340 431 365 408S391 360 399 336L410 128',
        arrows:['M289 453L350 420','M374 397L396 345','M402 326L405 250','M407 225L409 142']},
      torso:{title:'אגן, בטן וחזה',range:'SP 11–SP 21',subtitle:'מפשעה ← צדי הבטן ← צלעות וחזה ← צד בית החזה',points:[
        ['SP 11',405,442,-24,5],['SP 12',400,406,24,5],['SP 13',397,369,-24,5],['SP 14',394,332,24,5],['SP 15',391,292,-24,5],
        ['SP 16',388,252,24,5],['SP 17',386,210,-24,5],['SP 18',390,169,24,5],['SP 19',405,132,-24,5],['SP 20',435,105,24,5],['SP 21',500,155,24,5]],
        body:'M410 48c-34 0-61 25-61 57v40l-72 78m133-175c34 0 61 25 61 57v40l72 78M349 122l-30 92 18 240m134-332 30 92-18 240M337 454l73 24 73-24M410 112v340M354 252h112M349 348h122',
        route:'M405 442C397 395 394 340 391 292S381 223 386 210 386 156 405 132 424 110 435 105C450 118 475 140 500 155',
        arrows:['M403 427L397 360','M394 342L390 270','M389 246L389 180','M397 146L428 109','M447 115L490 149']}
    };
    const key=merRegion==='torso'?'torso':'foot',r=regions[key];
    const nodes=r.points.map(([c,x,y,dx,dy])=>`<g class="point-node" aria-hidden="true"><circle cx="${x}" cy="${y}" r="9"/><text x="${x+dx}" y="${y+dy}" text-anchor="${dx<0?'end':'start'}">${c}</text></g>`).join('');
    const hits=r.points.map(([c,x,y])=>`<button class="map-hit" data-point="${c}" aria-label="פתיחת ${c}" style="left:${x/8.2}%;top:${y/5.2}%">${c}</button>`).join('');
    const arrows=r.arrows.map(d=>`<path class="flow-line" marker-end="url(#spArrow)" d="${d}"/>`).join('');
    return `<div class="card" style="overflow:hidden;margin-bottom:14px">
      <div class="seg-toggle" style="margin:14px;display:grid;grid-template-columns:repeat(2,1fr)">
        <button class="${key==='foot'?'active':''}" data-mregion="foot">כף הרגל והרגל<br><small>SP 1–10</small></button>
        <button class="${key==='torso'?'active':''}" data-mregion="torso">אגן, בטן וחזה<br><small>SP 11–21</small></button>
      </div>
      <div style="padding:0 16px 8px"><b style="color:var(--gold)">${r.title} · ${r.range}</b><div style="color:var(--muted);font-size:14px;margin-top:3px">${r.subtitle}</div></div>
      <div class="mer-map compact"><div class="mer-canvas"><svg viewBox="0 0 820 520" role="img" aria-label="מפת ${r.title} של מרידיאן הטחול">
        <defs><marker id="spArrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 10 5 0 10z" fill="var(--gold-soft)"/></marker></defs>
        <path class="bodyline" d="${r.body}"/><path class="route-line" d="${r.route}"/>${arrows}${nodes}
        <g fill="var(--muted)" font-family="Segoe UI,Arial,sans-serif"><text x="790" y="34" text-anchor="end" fill="var(--gold)" font-size="18" font-weight="800">מרידיאן הטחול · SP</text><text x="36" y="42" font-size="15">החצים מציגים את כיוון המסלול</text></g>
      </svg>${hits}</div></div>
      <div class="map-guide"><span>☝</span><span><b>איך משתמשים במפה?</b> בחרו אזור ולחצו על SP 1–SP 21 כדי לפתוח מידע מלא. המסלול הוא תרשים לימודי סכמטי; איתור מדויק דורש הכשרה מקצועית.</span></div>
    </div>`;
  }
  if(m.ab==='ST'){
    const regions={
      face:{title:'פנים וצוואר',range:'ST 1–ST 12',subtitle:'מתחת לעין ← לחי ולסת ← צוואר ועצם הבריח',points:[
        ['ST 1',410,105,-18,4],['ST 2',410,140,-18,4],['ST 3',416,176,-18,4],['ST 4',430,210,-18,4],
        ['ST 5',466,238,18,4],['ST 6',505,215,18,4],['ST 7',520,174,18,4],['ST 8',472,82,18,4],
        ['ST 9',438,278,-18,4],['ST 10',440,320,18,4],['ST 11',443,362,-18,4],['ST 12',458,405,18,4]],
        body:'M410 54c-62 0-105 49-105 111 0 53 30 94 72 106l-7 42-50 62m90-321c62 0 105 49 105 111 0 53-30 94-72 106l7 42 50 62M354 145h112M374 202c23 17 49 17 72 0M366 313h88M320 375l-45 76m225-76 45 76',
        route:'M410 105L410 140 416 176 430 210 466 238 505 215 520 174 472 82M430 210L438 278 440 320 443 362 458 405',
        arrows:['M410 115L414 168','M442 220L462 235','M498 216L516 182','M437 286L441 350','M447 370L456 398']},
      torso:{title:'חזה ובטן',range:'ST 13–ST 30',subtitle:'מתחת לעצם הבריח ← חזה ← בטן ← מפשעה',points:Array.from({length:18},(_,i)=>[`ST ${i+13}`,410+(i%2?5:-5),72+i*23,i%2?24:-24,5]),
        body:'M410 42c-35 0-62 26-62 58v38l-76 80m138-176c35 0 62 26 62 58v38l76 80M348 118l-34 92 20 245m148-337 34 92-20 245M334 455l76 24 76-24M410 112v344M354 255h112M350 350h120',
        route:'M405 72C407 150 402 225 407 300S406 390 415 463',arrows:['M406 88L405 170','M405 200L407 282','M407 314L411 395','M412 414L415 455']},
      leg:{title:'רגל וכף הרגל',range:'ST 31–ST 45',subtitle:'ירך קדמית ← ברך ושוק ← גב כף הרגל ← האצבע השנייה',points:Array.from({length:15},(_,i)=>{
        const c=`ST ${i+31}`; const coords=[[410,62],[410,91],[410,120],[410,149],[410,178],[410,210],[410,242],[410,274],[410,306],[410,338],[410,370],[397,402],[375,430],[342,452],[305,466]][i];
        return [c,coords[0],coords[1],i%2?24:-24,5];}),
        body:'M350 40l60 22 60-22M350 40l-20 185 28 174-25 61m137-420 20 185-28 174 25 61M358 399l-25 61-58 18m187-79 25 61 58 18M275 478h94m81 0h95',
        route:'M410 62L410 370 397 402 375 430 342 452 305 466',arrows:['M410 76L410 155','M410 180L410 260','M410 285L410 358','M399 397L349 448','M340 453L312 464']}
    };
    const r=regions[merRegion]||regions.face;
    const nodes=r.points.map(([c,x,y,dx,dy])=>`<g class="point-node" aria-hidden="true"><circle cx="${x}" cy="${y}" r="9"/><text x="${x+dx}" y="${y+dy}" text-anchor="${dx<0?'end':'start'}">${c}</text></g>`).join('');
    const hits=r.points.map(([c,x,y])=>`<button class="map-hit" data-point="${c}" aria-label="פתיחת ${c}" style="left:${x/8.2}%;top:${y/5.2}%">${c}</button>`).join('');
    const arrows=r.arrows.map(d=>`<path class="flow-line" marker-end="url(#stArrow)" d="${d}"/>`).join('');
    return `<div class="card" style="overflow:hidden;margin-bottom:14px">
      <div class="seg-toggle" style="margin:14px;display:grid;grid-template-columns:repeat(3,1fr)">
        <button class="${merRegion==='face'?'active':''}" data-mregion="face">פנים וצוואר<br><small>ST 1–12</small></button>
        <button class="${merRegion==='torso'?'active':''}" data-mregion="torso">חזה ובטן<br><small>ST 13–30</small></button>
        <button class="${merRegion==='leg'?'active':''}" data-mregion="leg">רגל וכף רגל<br><small>ST 31–45</small></button>
      </div>
      <div style="padding:0 16px 8px"><b style="color:var(--gold)">${r.title} · ${r.range}</b><div style="color:var(--muted);font-size:14px;margin-top:3px">${r.subtitle}</div></div>
      <div class="mer-map compact"><div class="mer-canvas"><svg viewBox="0 0 820 520" role="img" aria-label="מפת ${r.title} של מרידיאן הקיבה">
        <defs><marker id="stArrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 10 5 0 10z" fill="var(--gold-soft)"/></marker></defs>
        <path class="bodyline" d="${r.body}"/><path class="route-line" d="${r.route}"/>${arrows}${nodes}
        <g fill="var(--muted)" font-family="Segoe UI,Arial,sans-serif"><text x="790" y="34" text-anchor="end" fill="var(--gold)" font-size="18" font-weight="800">מרידיאן הקיבה · ST</text><text x="36" y="42" font-size="15">החצים מציגים את כיוון המסלול</text></g>
      </svg>${hits}</div></div>
      <div class="map-guide"><span>☝</span><span><b>איך משתמשים במפה?</b> בחרו אזור למעלה ולחצו על נקודה כדי לפתוח את המיקום, השיוך המסורתי והזהירות שלה. זהו תרשים לימודי סכמטי, לא סימון מדויק לטיפול.</span></div>
    </div>`;
  }
  if(m.ab==='LI'){
    const points=[
      ['LI 1',112,455,0,-18],['LI 2',145,442,0,28],['LI 3',181,426,0,-18],['LI 4',218,410,0,28],['LI 5',255,392,0,-18],
      ['LI 6',294,371,0,28],['LI 7',334,348,0,-18],['LI 8',374,322,0,28],['LI 9',412,295,0,-18],['LI 10',449,267,0,28],
      ['LI 11',484,238,0,-18],['LI 12',520,212,0,28],['LI 13',552,190,0,-18],['LI 14',584,168,0,28],['LI 15',614,146,0,-18],
      ['LI 16',640,126,0,28],['LI 17',660,105,-18,-10],['LI 18',679,86,-18,-10],['LI 19',706,78,18,-10],['LI 20',724,99,18,5]
    ];
    const nodes=points.map(([c,x,y,dx,dy])=>`<g class="point-node" aria-hidden="true"><circle cx="${x}" cy="${y}" r="9"/><text x="${x+dx}" y="${y+dy}" text-anchor="${dx<0?'end':dx>0?'start':'middle'}">${c}</text></g>`).join('');
    const hits=points.map(([c,x,y])=>`<button class="map-hit" data-point="${c}" aria-label="פתיחת ${c}" style="left:${x/8.2}%;top:${y/5.2}%">${c}</button>`).join('');
    return `<div class="card" style="overflow:hidden;margin-bottom:14px">
      <div class="mer-map compact"><div class="mer-canvas"><svg viewBox="0 0 820 520" role="img" aria-labelledby="liMapTitle liMapDesc">
        <title id="liMapTitle">מפה אינטראקטיבית של מרידיאן המעי הגס</title><desc id="liMapDesc">המסלול מתחיל באצבע המורה, עובר בגב היד והזרוע, ממשיך לכתף ולצוואר ומסתיים לצד האף. כל עשרים הנקודות לחיצות.</desc>
        <defs><marker id="liArrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 10 5 0 10z" fill="var(--gold-soft)"/></marker></defs>
        <path class="bodyline" d="M92 462l56-26 75-33 75-39 79-49 71-54 70-58 67-47 47-30 28-32 24-26 29-3 33 19 10 35-4 41M645 128c17 3 35 1 51-10M111 455l-25 9m25-9-18-15m18 15-5 23M585 157l37 64 25 91"/>
        <path class="route-line" d="M112 455C156 438 186 423 218 410S281 379 294 371S322 355 334 348S361 331 374 322S399 304 412 295S437 276 449 267S474 247 484 238S509 219 520 212S542 197 552 190S575 174 584 168S605 153 614 146S632 132 640 126S653 113 660 105S672 92 679 86S697 78 706 78S718 89 724 99"/>
        <path class="flow-line" marker-end="url(#liArrow)" d="M128 449C197 421 262 390 318 357M350 338C410 299 463 257 509 221M544 196C591 164 629 134 654 110M685 86C701 82 714 88 721 96"/>
        ${nodes}
        <g fill="var(--muted)" font-family="Segoe UI,Arial,sans-serif" font-size="15"><text x="790" y="34" text-anchor="end" fill="var(--gold)" font-size="18" font-weight="800">מרידיאן המעי הגס · LI</text><text x="790" y="58" text-anchor="end">אצבע מורה ← גב הזרוע ← כתף ← צד האף</text><text x="36" y="42">החצים מציגים את כיוון המסלול</text></g>
      </svg>${hits}</div></div>
      <div class="map-guide"><span>☝</span><span><b>איך משתמשים במפה?</b> לחצו על LI 1–LI 20 כדי לפתוח את המיקום והמידע של כל נקודה. המסלול המוצג הוא תרשים לימודי סכמטי.</span></div>
    </div>`;
  }
  if(m.ab!=='LU')return `<div class="card" style="overflow:hidden;margin-bottom:14px"><div class="stage"><img src="assets/meridians/${m.ab}.webp" alt="${m.heN||m.name}"></div></div>`;
  const points=[
    ['LU 1',650,142,18,-15],['LU 2',674,113,18,-15],['LU 3',604,184,18,-14],['LU 4',560,225,18,-14],
    ['LU 5',512,270,18,-14],['LU 6',456,323,18,-14],['LU 7',407,365,18,-14],['LU 8',365,399,18,-14],
    ['LU 9',326,426,18,-14],['LU 10',277,453,18,-14],['LU 11',230,475,-18,-14]
  ];
  const nodes=points.map(([c,x,y,dx,dy])=>`<g class="point-node" aria-hidden="true"><circle cx="${x}" cy="${y}" r="10"/><text x="${x+dx}" y="${y+dy}" text-anchor="${dx<0?'end':'start'}">${c}</text></g>`).join('');
  const hits=points.map(([c,x,y])=>`<button class="map-hit" data-point="${c}" aria-label="פתיחת ${c}" style="left:${x/8.2}%;top:${y/5.2}%">${c}</button>`).join('');
  return `<div class="card" style="overflow:hidden;margin-bottom:14px">
    <div class="mer-map"><div class="mer-canvas"><svg viewBox="0 0 820 520" role="img" aria-labelledby="luMapTitle luMapDesc">
      <title id="luMapTitle">מפה אינטראקטיבית של מרידיאן הריאות</title><desc id="luMapDesc">המסלול מתחיל בבית החזה, עובר בצד הפנימי של הזרוע ומסתיים באגודל. כל נקודה לחיצה.</desc>
      <defs><marker id="luArrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 10 5 0 10z" fill="var(--gold-soft)"/></marker></defs>
      <path class="bodyline" d="M700 72c-46 0-72 24-82 66l-15 63 52 57 52-57-15-63c-7-42-31-66-72-66M618 138c-34 17-65 43-94 76l-74 83-70 65-60 50-86 59M692 139c25 20 43 49 50 85M234 471l-21 9m21-9 7 22m-7-22 22 11m-22-11 17-4"/>
      <path class="route-line" d="M650 142C661 126 667 119 674 113C649 135 629 158 604 184S551 233 512 270S464 317 456 323S421 352 407 365S376 392 365 399S341 417 326 426S292 447 277 453S244 470 230 475"/>
      <path class="flow-line" marker-end="url(#luArrow)" d="M638 154C610 191 574 221 542 252M495 286C465 320 432 349 397 376M353 407C323 432 288 451 247 469"/>
      ${nodes}
      <g fill="var(--muted)" font-family="Segoe UI,Arial,sans-serif" font-size="15"><text x="790" y="34" text-anchor="end" fill="var(--gold)" font-size="18" font-weight="800">מרידיאן הריאות · LU</text><text x="790" y="58" text-anchor="end">בית החזה ← פנים הזרוע ← אגודל</text><text x="36" y="42">החצים מציגים את כיוון המסלול</text></g>
    </svg>${hits}</div></div>
    <div class="map-guide"><span>☝</span><span><b>איך משתמשים במפה?</b> לחצו על LU 1–LU 11 כדי לפתוח מיקום, שיוך מסורתי, שימושים והנחיות זהירות. אפשר לגלול את המפה לצדדים במסך קטן.</span></div>
  </div>`;
}
function meridianDetail(ab){
  const m=MER[ab]; const pts=D.points.filter(p=>p.m===ab);
  $('#view').innerHTML=`<div class="screen">
   <button class="chip" data-mer-back style="margin-bottom:14px">‹ ${t('meridians')}</button>
   <div class="section-head"><div><div class="eyebrow" style="direction:ltr">${m.ab} · ${m.zh||''}</div><h2>${m.heN||m.name}</h2></div></div>
   ${meridianVisual(m)}
   ${m.hePath?`<div class="card" style="padding:15px;margin-bottom:8px"><b style="color:var(--muted);font-size:13px">${t('path')}</b><p style="margin:6px 0 0">${m.hePath}</p></div>`:''}
   ${m.heAssoc?`<div class="card" style="padding:15px;margin-bottom:14px"><b style="color:var(--muted);font-size:13px">${t('assoc')}</b><p style="margin:6px 0 0">${m.heAssoc}</p></div>`:''}
   ${listPanel(t('listPoints')+' · '+m.ab,pts.map(p=>rowHtml(p.c,heName(p),(p.zh?p.zh+' · ':'')+p.py,p.heI?'עברית ערוכה':'','point:'+p.c)),pts.length)}
  </div>`;
}

/* ---------- FAVORITES ---------- */
function favsScreen(){
  const rows=favs.map(k=>{
    const [kind,id]=k.split(':');
    if(kind==='point'){const p=D.points.find(x=>x.c===id);return p&&rowHtml(p.c,heName(p),(p.zh?p.zh+' · ':'')+p.py,MER_HE[p.m]||p.m,k);}
    if(kind==='zone'){const z=D.zones.find(x=>x.c===id);return z&&rowHtml('R'+z.c.replace(/^R/,''),z.he,z.en,t('reflex'),k);}
    if(kind==='mer'){const m=MER[id];return m&&rowHtml(m.ab,m.heN||m.name,m.zh,t('meridians'),k);}
  }).filter(Boolean);
  $('#view').innerHTML=`<div class="screen"><div class="section-head"><div><div class="eyebrow">${t('favs')}</div><h2>${favs.length} ${t('favs')}</h2></div></div>
   ${rows.length?`<p style="color:var(--muted);margin:0 0 14px">${LANG==='he'?'כל הנקודות, האזורים והמרידיאנים שסימנתם נשמרים במכשיר הזה. לחצו על פריט כדי לפתוח אותו.':'Saved points, zones and meridians are kept on this device. Select an item to open it.'}</p><div class="card list">${rows.join('')}</div>`:`<div class="card empty">${t('favEmpty')}<br><small>${LANG==='he'?'פתחו נקודה או אזור ולחצו על „הוספה למועדפים”.':'Open a point or zone and choose Add to favorites.'}</small></div>`}</div>`;
}

/* ---------- LEARN ---------- */
let learnMode='flashcards', quizIdx=0, quizScore=0, quizSet=[];
function buildQuiz(){
  const pool=D.points.filter(p=>p.m); quizSet=[];
  const shuffled=[...pool].sort(()=>Math.random()-.5).slice(0,8);
  shuffled.forEach(p=>{
    const correct=MER[p.m]; const others=D.meridians.filter(m=>m.ab!==p.m).sort(()=>Math.random()-.5).slice(0,3);
    const opts=[correct,...others].sort(()=>Math.random()-.5);
    quizSet.push({q:`${p.c} — ${p.py}`,sub:LANG==='en'?'Which meridian?':'לאיזה מרידיאן שייכת?',opts:opts.map(o=>({txt:(o.heN||o.name)+' ('+o.ab+')',ok:o.ab===p.m}))});
  });
  quizIdx=0;quizScore=0;
}
function learnScreen(){
  $('#view').innerHTML=`<div class="screen learn-wrap">
    <div class="section-head"><div><div class="eyebrow">${t('learn')}</div><h2>${LANG==='he'?'לומדים בקצב שלכם':'Learn at your pace'}</h2></div></div>
    <p style="color:var(--muted);margin:-6px 0 16px">${LANG==='he'?'בכרטיסיות מנסים לזהות נקודה; בחידון מתרגלים לאיזה מרידיאן היא שייכת.':'Use cards to identify points and the quiz to practice their meridians.'}</p>
    <div class="seg-toggle" style="margin-bottom:16px"><button class="${learnMode==='flashcards'?'active':''}" data-lm="flashcards">${t('flashcards')}</button><button class="${learnMode==='quiz'?'active':''}" data-lm="quiz">${t('quiz')}</button></div>
    <div id="learnBody"></div></div>`;
  learnMode==='flashcards'?flashcard():(buildQuiz(),quizStep());
}
let flashCard=null, flashFlipped=false;
function flashcard(){
  if(!flashCard) flashCard=D.points[Math.floor(Math.random()*D.points.length)];
  const p=flashCard;
  $('#learnBody').innerHTML=`<div class="card flash">
    <span class="code">${p.c}</span>
    ${flashFlipped?`<div class="q">${heName(p)}</div><div class="a"><b>${MER_HE[p.m]||p.m}</b> · ${p.py}<br>${(LANG==='en'?p.loc:(p.heL||p.loc))||''}${LANG==='he'&&p.heI?`<br><br>${p.heI}`:''}</div>`:`<div class="q">${LANG==='en'?'Which point is this?':'איזו נקודה זו?'}</div><div class="a">${LANG==='he'?'נסו להיזכר בשם, במרידיאן ובמיקום — ואז הפכו את הכרטיס.':'Try to recall its name, meridian and location, then flip the card.'}</div>`}
    <div class="opts" style="grid-template-columns:1fr 1fr"><button class="opt" style="text-align:center" data-flip>${t('flip')}</button><button class="opt" style="text-align:center" data-fnext>${t('next')}</button></div></div>`;
}
function quizStep(){
  if(quizIdx>=quizSet.length){
    $('#learnBody').innerHTML=`<div class="card flash"><div class="q">${t('quizScore',quizScore+'/'+quizSet.length)}</div><button class="btn" data-qagain>${t('again')}</button></div>`;return;}
  const it=quizSet[quizIdx];
  $('#learnBody').innerHTML=`<div class="progress"><i style="width:${quizIdx/quizSet.length*100}%"></i></div>
   <div class="card flash"><span class="code">${it.q.split(' — ')[0]}</span><div class="q">${it.q.split(' — ')[1]}</div><div class="a">${it.sub}</div>
   <div class="opts">${it.opts.map((o,i)=>`<button class="opt" data-opt="${i}">${o.txt}</button>`).join('')}</div></div>`;
}

/* ---------- shared list/rows ---------- */
function rowHtml(code,title,sub,tag,favk){
  const f=isFav(favk);
  return `<button class="row" data-open="${favk}"><span class="code">${(code||'').replace(/\s/g,' ')}</span>
    <span><b>${title||code}</b><small>${sub||''}</small>${tag?`<em>${tag}</em>`:''}</span>
    <span class="chev">${f?'♥':'›'}</span></button>`;
}
function listPanel(title,rows,count,extra=''){
  return `<aside class="card list"><div class="list-head"><b>${title}</b>${extra}<span class="count">${count??rows.length}</span></div>
    ${rows.length?rows.join(''):`<div class="empty">${t('noRes')}</div>`}</aside>`;
}

/* ---------- DETAIL SHEET ---------- */
function openItem(favk){
  const [kind,id]=favk.split(':');
  let html='';
  if(kind==='point'){
    const p=D.points.find(x=>x.c===id); if(!p)return;
    html=sheetHtml(p.c,t('points'),heName(p),(p.zh?p.zh+' · ':'')+p.py+' · '+(MER_HE[p.m]||p.m),[
      [t('loc'),(LANG==='en'?p.loc:(p.heL||p.loc))],
      [LANG==='he'&&p.heL&&p.heL.includes('צוּן')?'מהו צוּן?':'',LANG==='he'&&p.heL&&p.heL.includes('צוּן')?'צוּן הוא יחידת מדידה יחסית לגוף, ולא סנטימטר קבוע. לאיתור מדויק מומלץ להיעזר במטפל מוסמך.':''],
      [t('assoc'),p.heA||''],
      [t('ind'),LANG==='he'?(p.heI||'התרגום העברי המורחב לנקודה זו עדיין בעריכה. בינתיים אפשר לעיין במיקום ובשיוך המרידיאן.'):(p.ind||'')],
      [LANG==='he'?'איך לוחצים בעדינות?':'Gentle pressure',LANG==='he'?'לעיסוי עצמי בלבד: הניחו אצבע על המקום ולחצו בעדינות במשך 20–30 שניות. הלחץ צריך להיות מורגש אך נעים. הפסיקו מיד אם מופיעים כאב חד, נימול או החמרה. אין להשתמש במחטים באופן עצמאי.':'For self-massage only: apply gentle, comfortable pressure for 20–30 seconds. Stop if pain, numbness or worsening occurs. Do not use needles yourself.'],
      [t('caution'),p.heC||'']
    ],favk);
  } else if(kind==='zone'){
    const z=D.zones.find(x=>x.c===id); if(!z)return;
    const zoneNo=z.c.replace(/^R/,'');
    html=sheetHtml('R'+z.c.replace(/^R/,''),t('reflex'),z.he,z.en,[
      [t('loc'),(LANG==='en'?`Find marker ${zoneNo} on the selected foot chart. Use the view buttons and zoom controls to see its position more clearly.`:`חפשו את המספר ${zoneNo} על מפת כף הרגל. אפשר להחליף מבט ולהשתמש בזום כדי לראות את המיקום בבירור.`)],
      [t('assoc'),(LANG==='en'?`In reflexology, this foot area is traditionally associated with ${z.en}. This is a traditional map association, not evidence of a problem in that organ or area.`:`ברפלקסולוגיה האזור הזה בכף הרגל משויך באופן מסורתי אל ${z.he}. זהו שיוך של מפת רפלקסולוגיה, ולא סימן לכך שקיימת בעיה באיבר או באזור הזה.`)],
      [LANG==='he'?'איך מעסים את האזור?':'How to massage the area',LANG==='en'?'For self-massage only: gently massage the numbered area for 20–30 seconds. The pressure should feel comfortable. Stop if there is sharp pain, numbness or worsening.':'לעיסוי עצמי בלבד: עסו בעדינות את האזור המסומן במשך 20–30 שניות. הלחץ צריך להיות נעים ולא מכאיב. הפסיקו אם מופיעים כאב חד, נימול או החמרה.'],
      [LANG==='he'?'מה אומרת רגישות במקום?':'What does local tenderness mean?',LANG==='en'?'Tenderness can come from local pressure, footwear, skin or muscle sensitivity. It cannot diagnose the associated organ.':'רגישות בכף הרגל יכולה לנבוע מלחץ מקומי, מנעליים, מהעור או מהשרירים. היא אינה מאבחנת את האיבר המשויך במפה.']
    ],favk);
  } else if(kind==='mer'){
    const m=MER[id]; if(!m)return;
    html=sheetHtml(m.ab,t('meridians'),m.heN||m.name,m.zh,[[t('path'),m.hePath],[t('assoc'),m.heAssoc],['',m.desc&&LANG==='en'?m.desc:'']],favk);
  }
  $('#sheet').innerHTML=html; openSheet();
}
function sheetHtml(code,type,name,en,sections,favk){
  const f=isFav(favk);
  return `<button class="x" data-close aria-label="${LANG==='he'?'סגירת חלון הפרטים':'Close details'}">✕</button>
   <div class="bigcode">${(code||'').replace(/\s/g,' ')}</div>
   <div class="type">${type}</div><h2>${name||code}</h2><div class="en">${en||''}</div>
   ${sections.filter(s=>s[1]).map(s=>`<section>${s[0]?`<b>${s[0]}</b>`:''}<p>${s[1]}</p></section>`).join('')}
   <div class="warn">${t('safety')}</div>
   <button class="btn ${f?'':'ghost'}" data-fav="${favk}">${svg('favs')} ${f?t('inFav'):t('addFav')}</button>`;
}
function openSheet(){const s=$('#sheet');s.inert=false;s.setAttribute('aria-hidden','false');s.classList.add('open');$('#scrim').classList.add('open');}
function closeSheet(){const s=$('#sheet');s.classList.remove('open');s.setAttribute('aria-hidden','true');s.inert=true;$('#scrim').classList.remove('open');}
function refreshSheetFav(k){const b=$(`#sheet [data-fav="${k}"]`);if(b){const f=isFav(k);b.className='btn '+(f?'':'ghost');b.innerHTML=svg('favs')+' '+(f?t('inFav'):t('addFav'));}
  const chev=$(`#view [data-open="${k}"] .chev`); if(chev) chev.textContent=isFav(k)?'♥':'›';}

/* ---------- SETTINGS ---------- */
const PALS=['onyx','jade','ruby','sky','amethyst'];
const PAL_COLORS={onyx:'#d8b25a',jade:'#6fc9a6',ruby:'#e08a7d',sky:'#7fb2e6',amethyst:'#b79ae0'};
function settingsScreen(){
  const s=store.get('settings',{}); const theme=document.body.dataset.theme, pal=document.body.dataset.pal;
  $('#view').innerHTML=`<div class="screen learn-wrap">
   <div class="section-head"><div><div class="eyebrow">AppNest</div><h2>${t('set')}</h2></div></div>
   <div class="card" style="padding:18px">
     <div class="field"><label>${t('name')}</label><input id="uname" value="${baEsc(s.name||'')}" placeholder="${t('name')}"></div>
     <div class="field"><label>${t('lang')}</label><select id="lang">
        <option value="he" ${LANG==='he'?'selected':''}>עברית</option><option value="en" ${LANG==='en'?'selected':''}>English</option></select></div>
     <div class="field"><label>${t('palette')}</label><div class="pals">${PALS.map(p=>`<button data-pal="${p}" class="${pal===p?'active':''}" style="background:${PAL_COLORS[p]}"></button>`).join('')}</div></div>
     <div class="field"><label>${t('mode')}</label><div class="seg-toggle"><button data-theme="day" class="${theme==='day'?'active':''}">☀ ${t('day')}</button><button data-theme="night" class="${theme==='night'?'active':''}">☾ ${t('night')}</button></div></div>
     <div class="field"><label>${t('aiTitle')}</label><select id="aiprov">
        <option value="">${t('aiNone')}</option><option value="gemini">Google Gemini</option><option value="claude">Claude</option><option value="openai">OpenAI</option></select></div>
   <div class="field"><label>${t('aiKey')}</label><input id="aikey" type="password" autocomplete="off" placeholder="AIza… / sk-…"></div>
   <div style="font-size:12px;color:var(--muted);margin:-4px 0 8px">${t('aiNote')}</div>
   <div class="setrow">
       <button class="btn ghost" id="backup">⬇ ${t('backup')}</button>
       <button class="btn ghost" id="restore">⬆ ${t('restore')}</button>
       <button class="btn ghost" id="wipe" style="color:var(--bad)">🗑 ${t('wipe')}</button>
     </div>
   </div>
   <div class="setrow" style="margin-top:12px"><button class="btn ghost" data-go="about">${t('about')}</button></div>
  </div>`;
  $('#uname').onchange=e=>saveSetting('name',e.target.value.trim());
  $('#lang').onchange=e=>{LANG=e.target.value;store.set('lang',LANG);applyLang();route('settings');};
  $$('#view .pals button').forEach(b=>b.onclick=()=>{document.body.dataset.pal=b.dataset.pal;saveSetting('pal',b.dataset.pal);settingsScreen();});
  $$('#view .seg-toggle button').forEach(b=>b.onclick=()=>{document.body.dataset.theme=b.dataset.theme;setThemeMeta();saveSetting('theme',b.dataset.theme);settingsScreen();});
  $('#backup').onclick=doBackup; $('#restore').onclick=doRestore; $('#wipe').onclick=doWipe;
  const aic=store.get('ai-config',{provider:'',keys:{}});
  if($('#aiprov')){$('#aiprov').value=aic.provider||'';$('#aikey').value=(aic.keys&&aic.keys[aic.provider])||'';
    const saveAi=()=>{const prov=$('#aiprov').value,key=$('#aikey').value.trim();const cur=store.get('ai-config',{keys:{}});const keys=cur.keys||{};if(prov&&key)keys[prov]=key;store.set('ai-config',{provider:prov,keys});};
    $('#aiprov').onchange=()=>{const a=store.get('ai-config',{keys:{}});$('#aikey').value=(a.keys&&a.keys[$('#aiprov').value])||'';saveAi();};
    $('#aikey').onchange=saveAi;}
}
function saveSetting(k,v){const s=store.get('settings',{});s[k]=v;store.set('settings',s);}
function doBackup(){const data={settings:store.get('settings',{}),favs,lang:LANG,ts:Date.now()};
  const blob=new Blob([JSON.stringify(data,null,2)],{type:'application/json'});
  const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='atlas-backup.json';a.click();}
function doRestore(){const inp=document.createElement('input');inp.type='file';inp.accept='.json,application/json';
  inp.onchange=()=>{const f=inp.files[0];if(!f)return;const r=new FileReader();
    r.onload=()=>{try{const d=JSON.parse(r.result);if(d.settings)store.set('settings',d.settings);if(d.favs){favs=d.favs;store.set('favs',favs);}if(d.lang){LANG=d.lang;store.set('lang',LANG);}applySettings();applyLang();route('settings');alert(t('restored'));}catch{alert(t('bad'));}};
    r.readAsText(f);};inp.click();}
function doWipe(){if(!confirm(t('wipeConfirm1')))return;if(!confirm(t('wipeConfirm2')))return;
  Object.keys(localStorage).filter(k=>k.startsWith(PFX)).forEach(k=>localStorage.removeItem(k));
  favs=[];LANG='he';applySettings();applyLang();route('home');}

/* ---------- ABOUT ---------- */
const STORE_URL='https://barakaflalo.github.io/appnest';
const APP_VER='3.3';
function toast(msg){let el=document.getElementById('atlas-toast');if(!el){el=document.createElement('div');el.id='atlas-toast';el.style.cssText='position:fixed;left:50%;bottom:84px;transform:translateX(-50%);background:#141418;color:#EDE6D6;border:1px solid #C9A84C55;border-radius:20px;padding:9px 16px;font:14px "Segoe UI",sans-serif;z-index:100001;box-shadow:0 6px 20px rgba(0,0,0,.5);opacity:0;transition:opacity .2s;';document.body.appendChild(el);}el.textContent=msg;el.style.opacity='1';clearTimeout(el._t);el._t=setTimeout(function(){el.style.opacity='0';},1800);}
function shareApp(){var url=location.href.split('#')[0];var data={title:'אטלס הגוף · Body Atlas',text:t('abShareMsg'),url:url};if(navigator.share){navigator.share(data).catch(function(){});return;}if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(url).then(function(){toast(t('abCopied'));},function(){});return;}try{var ta=document.createElement('textarea');ta.value=url;document.body.appendChild(ta);ta.select();document.execCommand('copy');document.body.removeChild(ta);toast(t('abCopied'));}catch(e){}}
function aboutScreen(){
  $('#view').innerHTML=`<div class="screen learn-wrap">
   <div class="section-head"><div><div class="eyebrow">AppNest · ${t('ver')} ${APP_VER}</div><h2>${t('about')}</h2></div></div>
   <div class="card" style="padding:18px">
     <b style="font-size:18px">${LANG==='he'?'אטלס הגוף':'Body Atlas'}</b>
     <p style="margin:6px 0 0;color:var(--muted);line-height:1.7">${t('abTagline')}</p>
   </div>
   <div class="card" style="padding:18px;margin-top:12px"><b>${t('abAppTitle')}</b>
     <p style="line-height:1.8;margin:8px 0 0;color:var(--muted)">${t('abAppBody')}</p></div>
   <div class="setrow" style="margin-top:12px;gap:10px;flex-wrap:wrap">
     <button class="btn" data-share>📤 ${t('abShare')}</button>
     <a class="btn ghost" href="${STORE_URL}" target="_blank" rel="noopener">🏠 ${t('abStore')}</a>
   </div>
   <div class="card" style="padding:18px;margin-top:12px"><b>${t('abDevTitle')}</b>
     <p style="line-height:1.8;margin:8px 0 0;color:var(--muted)">${t('abDevBody')}</p></div>
   <div class="card" style="padding:18px;margin-top:12px"><b>${t('srcTitle')}</b>
     <p style="line-height:1.8;margin:8px 0 0;color:var(--muted)">${t('srcBody')}</p></div>
   <div class="card" style="padding:18px;margin-top:12px;color:var(--muted)">
     <p style="margin:0 0 6px">WHO Standard Acupuncture Point Locations, 2008</p>
     <p style="margin:0 0 6px">TARA Acupoints Ontology</p>
     <p style="margin:0">acuSim body placements — CC BY 4.0</p>
   </div>
   <div class="card warn" style="margin-top:12px">${t('safety')}</div>
   <p style="text-align:center;color:var(--muted);margin-top:18px"><a href="privacy_policy.html">Privacy</a> · AppNest © 2026 · ${t('ver')} ${APP_VER}</p>
  </div>`;
}

/* ---------- interactions ---------- */
function bindStage(){
  $$('#view [data-fv]').forEach(b=>b.onclick=()=>{reflexView=b.dataset.fv;reflexScreen();});
  $$('#view [data-zoom]').forEach(b=>b.onclick=()=>{zoom=Math.max(100,Math.min(360,zoom+40*(+b.dataset.zoom)));$('#zoom').value=zoom;applyZoom();});
  const zr=$('#zoom'); if(zr) zr.oninput=e=>{zoom=+e.target.value;applyZoom();};
  $$('#view [data-zone]').forEach(b=>b.onclick=()=>openItem('zone:'+b.dataset.zone));
}
function applyZoom(){const st=$('#stage');if(st){const im=st.querySelector('img');if(im)im.style.setProperty('--zoom',zoom+'%');}const zv=$('#zval');if(zv)zv.textContent=zoom+'%';}

document.addEventListener('click',e=>{
  const go=e.target.closest('[data-go]'); if(go){curMer=null;route(go.dataset.go);return;}
  const open=e.target.closest('[data-open]'); if(open){openItem(open.dataset.open);return;}
  const pt=e.target.closest('[data-point]'); if(pt){openItem('point:'+pt.dataset.point);return;}
  const mr=e.target.closest('[data-mregion]'); if(mr){merRegion=mr.dataset.mregion;meridianDetail(curMer);return;}
  const mer=e.target.closest('[data-mer]'); if(mer){curMer=mer.dataset.mer;merRegion=(curMer==='SP'||curMer==='KI')?'foot':(curMer==='SI'||curMer==='TE')?'arm':(curMer==='BL'||curMer==='GB')?'head':'face';meridiansScreen();window.scrollTo(0,0);return;}
  if(e.target.closest('[data-mer-back]')){curMer=null;merRegion='face';meridiansScreen();return;}
  const fav=e.target.closest('[data-fav]'); if(fav){toggleFav(fav.dataset.fav);return;}
  if(e.target.closest('[data-close]')||e.target.id==='scrim'){closeSheet();return;}
  const lm=e.target.closest('[data-lm]'); if(lm){learnMode=lm.dataset.lm;flashCard=null;flashFlipped=false;learnScreen();return;}
  if(e.target.closest('[data-flip]')){flashFlipped=!flashFlipped;flashcard();return;}
  if(e.target.closest('[data-fnext]')){flashCard=D.points[Math.floor(Math.random()*D.points.length)];flashFlipped=false;flashcard();return;}
  const opt=e.target.closest('[data-opt]'); if(opt){
    const it=quizSet[quizIdx];const i=+opt.dataset.opt;
    $$('#learnBody .opt').forEach((b,j)=>{if(it.opts[j].ok)b.classList.add('correct');else if(j===i)b.classList.add('wrong');b.disabled=true;});
    if(it.opts[i].ok)quizScore++;
    setTimeout(()=>{quizIdx++;quizStep();},900);return;}
  if(e.target.closest('[data-qagain]')){buildQuiz();quizStep();return;}
  if(e.target.closest('[data-share]')){shareApp();return;}
  if(e.target.closest('[data-install]')){
    if(isStandalone())return;
    if(installPrompt){installPrompt.prompt();installPrompt.userChoice.finally(()=>{installPrompt=null;if(screen==='home')homeScreen();});}
    else showInstallHelp();
    return;
  }
});
$('#q').addEventListener('input',e=>{
  query=e.target.value;
  if(screen==='reflex')reflexScreen();
  else if(screen==='points')pointsScreen();
  else if(query.trim()){
    screen='points';merFilter='';renderNav();pointsScreen();window.scrollTo(0,0);
  }
});
$('#themeBtn').onclick=()=>{const n=document.body.dataset.theme==='day'?'night':'day';document.body.dataset.theme=n;setThemeMeta();saveSetting('theme',n);};

/* ---------- boot ---------- */
function setThemeMeta(){$('meta[name=theme-color]').setAttribute('content',document.body.dataset.theme==='day'?'#f6f3ec':'#0d0d0f');
  $('#themeIco').innerHTML=document.body.dataset.theme==='day'?'<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4 12H2M22 12h-2M5 5 6.5 6.5M17.5 17.5 19 19M5 19l1.5-1.5M17.5 6.5 19 5"/>':'<path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8Z"/>';}
function applySettings(){const s=store.get('settings',{});document.body.dataset.pal=s.pal||'onyx';document.body.dataset.theme=s.theme||'night';setThemeMeta();}
function applyLang(){document.documentElement.lang=LANG;document.documentElement.dir=RTL.includes(LANG)?'rtl':'ltr';document.body.dir=RTL.includes(LANG)?'rtl':'ltr';renderNav();}
function onboard(){
  if(store.get('seen'))return;
  const m=document.createElement('div');m.className='modal';
  m.innerHTML=`<div class="box"><div class="eyebrow">AppNest</div><h2>${t('welcome')}</h2><p class="steps">${t('onbo')}</p><div class="card warn">${t('safety')}</div><button class="btn" id="startBtn">${t('start')}</button></div>`;
  document.body.appendChild(m);
  $('#startBtn').onclick=()=>{store.set('seen',1);m.remove();};
}
/* Boot occurs after the editorial UI is loaded. */
if('serviceWorker' in navigator){window.addEventListener('load',()=>navigator.serviceWorker.register('sw.js',{updateViaCache:'none'}).then(r=>r.update()).catch(()=>{}));}
window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();installPrompt=e;if(screen==='home')homeScreen();});
window.addEventListener('appinstalled',()=>{installPrompt=null;if(screen==='home')homeScreen();});
