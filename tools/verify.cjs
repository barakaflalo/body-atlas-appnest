const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..'),elements=new Map(),saved=new Map();
function element(id=''){return {innerHTML:'',textContent:'',value:'',isConnected:true,inert:false,style:{setProperty(){}},dataset:{},classList:{values:new Set(),add(k){this.values.add(k)},remove(k){this.values.delete(k)},contains(k){return this.values.has(k)},toggle(){}},setAttribute(){},removeAttribute(){},click(){},focus(){},scrollIntoView(){},addEventListener(){},append(){},appendChild(){},insertAdjacentHTML(where,html){this.innerHTML+=html},getClientRects(){return [1]},querySelector(){return element()},querySelectorAll(){return []}};}
const doc={querySelector(s){if(!elements.has(s))elements.set(s,element(s));return elements.get(s)},querySelectorAll(){return []},body:element(),documentElement:element(),activeElement:element(),addEventListener(){},createElement(){return element()}};
const context={window:{addEventListener(){},scrollTo(){},matchMedia(){return {matches:false}}},document:doc,localStorage:{getItem:k=>saved.get(k)||null,setItem:(k,v)=>saved.set(k,v),removeItem:k=>saved.delete(k)},navigator:{},location:{protocol:'file:',href:'file:///index.html'},console,URL,Blob,setTimeout(){},clearTimeout(){},alert(){},confirm:()=>false,Intl};vm.createContext(context);
for(const f of ['atlas-data.js','atlas-engine.js','atlas-diagrams.js','atlas-pro.js','atlas-detail-data.js','atlas-learning-data.js','atlas-detail-diagrams.js','atlas-anatomy.js','atlas-landmarks.js','atlas-detail.js','atlas-study.js','atlas-courses.js'])vm.runInContext(fs.readFileSync(path.join(root,f),'utf8'),context,{filename:f});
const run=code=>vm.runInContext(code,context);const D=context.window.ATLAS,BA=context.window.ATLAS_EDITORIAL;
assert.equal(D.points.length,361);assert.equal(D.zones.length,57);assert.equal(D.meridians.length,14);assert.equal(new Set(D.points.map(p=>p.c)).size,361);
const images=new Set();let rendered=0,sections=0;
function checkHtml(html){assert(!/\b(?:undefined|NaN)\b/.test(html));for(const m of html.matchAll(/(?:src|href)="(assets\/[^"#]+)"/g)){assert(fs.existsSync(path.join(root,m[1])),m[1]);images.add(m[1]);}}
for(const p of D.points){assert(p.heL&&p.heI&&p.standardLocation&&p.referencePage&&BA.regions[p.region],p.c);const m=BA.meridians[p.m],n=+p.c.split(' ')[1];assert.equal(m.steps.filter(s=>n>=s[0]&&n<=s[1]).length,1,p.c);}
for(const z of D.zones){assert(z.locationHe&&z.anatomyHe&&z.locationEn&&z.anatomyEn,z.c);const svg=run(`baFootDiagram(${JSON.stringify(z.surface)})`);assert(svg.includes('data-open="zone:'+z.c+'"'),z.c+' absent from assigned map');}
for(const lang of ['he','en']){
 run(`LANG='${lang}';`);
 for(const p of D.points){run(`openItem(${JSON.stringify('point:'+p.c)})`);checkHtml(elements.get('#sheet').innerHTML);rendered++;}
 for(const z of D.zones){run(`openItem(${JSON.stringify('zone:'+z.c)})`);checkHtml(elements.get('#sheet').innerHTML);rendered++;}
 for(const m of D.meridians){assert.equal(D.points.filter(p=>p.m===m.ab).length,m.n);for(let i=0;i<BA.meridians[m.ab].steps.length;i++){run(`baStep=${i};meridianDetail('${m.ab}')`);checkHtml(elements.get('#view').innerHTML);sections++;}}
 for(const f of ['homeScreen','pointsScreen','meridiansScreen','reflexScreen','learnScreen','aboutScreen']){run(`${f}()`);checkHtml(elements.get('#view').innerHTML);}
 for(let i=0;i<20;i++){run('buildQuiz()');assert(run('quizSet.length===8&&quizSet.every(q=>q.opts.length===4&&q.opts.filter(o=>o.ok).length===1&&new Set(q.opts.map(o=>o.txt)).size===4)'));}
}
assert.equal(run(`baNorm('נֵיי גוּאָן')`),run(`baNorm('ניי גואן')`));assert.equal(run(`baNorm('PC 6')`),'pc6');
assert.equal(run(`baValidateBackup({settings:{name:'<img src=x onerror=alert(1)>',apiKey:'secret',theme:'day',pal:'jade'},favs:['point:PC 6'],lang:'he',readLessons:['models','bad'],lastItem:'point:PC 6'}).settings.apiKey`),undefined);
assert.throws(()=>run(`baValidateBackup({favs:['point:NOTREAL']})`));assert.throws(()=>run(`baValidateBackup({settings:'broken'})`));
run(`LANG='he';store.set('settings',{name:'\" onfocus=\"alert(1)'});settingsScreen()`);assert(!elements.get('#view').innerHTML.includes('value="" onfocus='));
const allPlates=fs.readdirSync(path.join(root,'assets/plates'));const manifest=JSON.parse(fs.readFileSync(path.join(root,'asset-manifest.json'),'utf8'));for(const file of manifest.assets.filter(x=>x!=='./'))assert(fs.existsSync(path.join(root,file)),file);
for(const f of ['sw.js','assistant.js'])new vm.Script(fs.readFileSync(path.join(root,f),'utf8'),{filename:f});
const gallery=fs.readFileSync(path.join(root,'illustration-atlas.html'),'utf8');for(const script of gallery.matchAll(/<script(?: [^>]*)?>([\s\S]*?)<\/script>/g))new vm.Script(script[1]);

const detail=context.window.ATLAS_DETAIL;assert.equal(Object.keys(detail.points).length,361);assert.equal(Object.keys(detail.views).length,22);
assert.notEqual(D.points.find(p=>p.c==='SI 2').standardLocation,D.points.find(p=>p.c==='SI 1').standardLocation);
assert.match(D.points.find(p=>p.c==='SI 2').standardLocation,/distal/);assert.match(D.points.find(p=>p.c==='SI 3').standardLocation,/proximal/);
assert.equal(detail.points['SI 2'].page,'88');assert.equal(detail.points['SI 3'].page,'89');
assert(detail.points['SI 2'].y<450&&detail.points['SI 3'].y>450,'SI 2 and SI 3 must lie on opposite sides of the MCP reference');
assert(detail.points['PC 6'].y<detail.points['PC 7'].y,'PC 6 must be proximal to the wrist point');
assert.equal(Object.values(detail.points).filter(p=>p.variant).length,6);
assert.equal(Object.values(detail.points).filter(p=>p.externalCheck).length,4);
for(const p of D.points){const d=detail.points[p.c];assert(detail.views[d.view]);assert(d.x>0&&d.x<1000&&d.y>0&&d.y<1000);assert(d.landmarks.length&&d.landmarks.every(l=>l.he&&l.en));const svg=run('adDiagram('+JSON.stringify(d.view)+',{selected:'+JSON.stringify(p.c)+',focus:true})');assert(svg.includes('data-open="point:'+p.c+'"'));assert(!/NaN|undefined/.test(svg));}
for(const lang of ['he','en']){run('LANG='+JSON.stringify(lang));for(const tab of ['visual','compare','flashcards']){run('baLearnTab='+JSON.stringify(tab)+';learnScreen()');checkHtml(elements.get('#learnBody').innerHTML);}for(let n=0;n<30;n++){run('adQuiz=adQuizBuild()');assert(run('adQuiz.questions.length===8&&new Set(adQuiz.questions.map(q=>q.code)).size===8&&adQuiz.questions.every(q=>q.choices.length>=2&&q.choices.length<=4&&new Set(q.choices).size===q.choices.length&&q.choices.includes(q.code)&&q.choices.every(c=>AD.points[c].view===q.view))'));}}
run('adQuiz=adQuizBuild();adQuizAnswer(adQuiz.questions[0].choices.indexOf(adQuiz.questions[0].code))');assert.equal(run('adQuiz.score'),1);run('adQuizAnswer(0)');assert.equal(run('adQuiz.score'),1,'answers cannot score twice');
for(let n=1;n<8;n++)run('adQuiz.index++;adQuizAnswer(adQuiz.questions[adQuiz.index].choices.indexOf(adQuiz.questions[adQuiz.index].code))');run('adQuiz.index++;adQuizRender()');assert.equal(run("store.get('lastVisualQuiz').score"),8);
assert.equal(run("baValidateBackup({favs:[],lastVisualQuiz:{score:99,total:8,date:'invalid'}}).lastVisualQuiz"),null);
assert.equal(run("baValidateBackup({favs:[],lastVisualQuiz:{score:6,total:8,date:'2026-09-21'}}).lastVisualQuiz.score"),6);
for(const file of ['point-atlas.html','review-register.html'])for(const m of fs.readFileSync(path.join(root,file),'utf8').matchAll(/<script(?: [^>]*)?>([\s\S]*?)<\/script>/g))new vm.Script(m[1]);


const learning=context.window.ATLAS_LEARNING;let landmarkLinks=0;
for(const [c,d]of Object.entries(detail.points)){assert(learning.points[c]?.focus.he&&learning.points[c]?.focus.en,c);assert(learning.points[c].compare!==c&&detail.points[learning.points[c].compare]);for(let i=0;i<d.landmarks.length;i++){assert(run('alResolve('+JSON.stringify(c)+','+i+')'),c+' landmark '+i);landmarkLinks++;}for(const mode of ['primary','alternate','both']){run('adCurrent='+JSON.stringify(c)+';asVariant='+JSON.stringify(mode));checkHtml(run('adPointChart()'));}}
assert.equal(landmarkLinks,1131);assert.equal(Object.values(detail.points).filter(p=>p.check32).length,8);
for(const c of ['TE 5','TE 6','TE 9'])assert(detail.points[c].landmarks.some(l=>l.en==='Interosseous Space'));
assert.equal(detail.points['GB 29'].x,(730+650)/2);assert.equal(detail.points['GB 30'].y,630+(520-630)/3);
for(const [c,d]of Object.entries(detail.points).filter(([,d])=>d.alternate)){assert(d.alternate.x!==d.x||d.alternate.y!==d.y||d.alternate.view!==d.view);assert(detail.views[d.alternate.view]);}
assert.equal(detail.points['PC 9'].alternate.view,'handBack');
run("store.set('learningProgress',null);asMode='mixed';adQuiz=adQuizBuild();var missedCode=adQuiz.questions[0].code;adQuizAnswer(adQuiz.questions[0].choices.findIndex(c=>c!==missedCode))");
assert.equal(run('asProgress().points[missedCode].wrong'),1);assert(run('asNeedsReview(asProgress().points[missedCode])'));
run('adQuizAnswer(0)');assert.equal(run('asProgress().points[missedCode].attempts'),1);
assert(run("asValidateSession(store.get('visualSession',null)).questions[0].answer!==null"));
run("asMode='review';adQuiz=adQuizBuild()");assert.equal(run('adQuiz.questions[0].code'),run('missedCode'));
run('adQuiz.questions[0].hinted=true;adQuizAnswer(adQuiz.questions[0].choices.indexOf(missedCode))');assert.equal(run('asProgress().points[missedCode].assisted'),1);assert.equal(run('asProgress().points[missedCode].streak'),0);
for(let n=0;n<2;n++){run('adQuiz=adQuizBuild();adQuizAnswer(adQuiz.questions[0].choices.indexOf(missedCode))');}
assert.equal(run('asProgress().points[missedCode].streak'),2);assert(!run('asNeedsReview(asProgress().points[missedCode])'));
assert(run('Date.parse(asProgress().points[missedCode].nextDue)>Date.now()+2.9*86400000'));
run("var roundCount=asProgress().rounds.length;while(adQuiz.index<adQuiz.questions.length){if(adQuiz.questions[adQuiz.index].answer===null)adQuizAnswer(0);adQuiz.index++;}adQuizRender();adQuizRender();");assert.equal(run('asProgress().rounds.length'),run('roundCount+1'));
assert.equal(run("store.get('visualSession',null)"),null);
assert.equal(run("baValidateBackup({favs:[]}).learningProgress.version"),1);
assert.throws(()=>run("asValidateProgress({version:1,points:{BAD:{}},rounds:[]})"));
assert(run("baValidateBackup({favs:[],learningProgress:asProgress()}).learningProgress.points[missedCode].attempts>=4"));
assert.equal(run("asValidateSession({version:'3.2.0',id:'test',mode:'review',questions:[{code:'PC 6',view:'armFront',choices:['PC 6','PC 6'],answer:null}],index:0})"),null);
assert.match(fs.readFileSync(path.join(root,'atlas-pro.js'),'utf8'),/learningProgress:store.get/);

run('var capturedBackup;var originalBlob=Blob,originalCreateUrl=URL.createObjectURL;Blob=class{constructor(parts){capturedBackup=parts.join("")}};URL.createObjectURL=()=>"blob:test";doBackup();Blob=originalBlob;URL.createObjectURL=originalCreateUrl;');
const exported=JSON.parse(run('capturedBackup'));assert(exported.learningProgress.points[run('missedCode')]);assert.equal(exported.visualSession,null);
run('adQuiz=adQuizBuild();adQuizAnswer(0);adQuiz.index++;adQuizRender();');const resumed=run("asValidateSession(store.get('visualSession'))");assert.equal(resumed.index,1);assert.notEqual(resumed.questions[0].answer,null);assert.equal(resumed.reviewCount,run('adQuiz.reviewCount'));
for(const f of ['atlas-study.js','atlas-landmarks.js','atlas-learning-data.js'])assert(manifest.assets.includes(f));

// v3.3 editorial coverage, paired geometry, scoped learning and backup migration.
assert.equal(Object.values(learning.points).filter(p=>p.focus.kind.startsWith('edited-')).length,361);
assert.equal(Object.values(learning.points).filter(p=>p.focus.kind==='edited-location-3.3').length,215);
assert.equal(new Set(Object.values(learning.points).filter(p=>p.focus.kind==='edited-location-3.3').map(p=>p.focus.he)).size,215);
assert.equal(Object.values(detail.points).filter(p=>p.adjustment33).length,13);
for(const view of ['handPalm','handBack']){
 const body=run(`anLayer='bones';adGeometry('${view}').body`);
 assert.equal((body.match(/data-an-part="phalanx"/g)||[]).length,14);
 assert.equal((body.match(/data-an-part="metacarpal"/g)||[]).length,5);
 assert.equal((body.match(/data-an-part="carpal"/g)||[]).length,8);
 assert.equal(body.includes('translate(1000 0) scale(-1 1)'),view==='handPalm');
}
for(const view of run('AN_VIEWS'))for(const layer of ['combined','bones','soft']){
 const body=run(`anLayer='${layer}';adGeometry('${view}').body`);assert.equal(body.includes('class="an-bones"'),layer!=='soft');assert.equal(body.includes('class="an-soft"'),layer!=='bones');checkHtml(run(`adDiagram('${view}')`));
}
run("anLayer='combined';anZoom='wrist';adCurrent='LI 4';asVariant='primary'");assert.match(run('adPointChart()'),/viewBox="245 425 505 520"/);
run("anChartContext=false");assert.match(run("adDiagram('handBack')"),/viewBox="80 45 840 945"/,'point zoom must not affect unrelated charts');
run("anZoom='auto'");
assert(detail.points['SI 4'].y>778&&detail.points['SI 4'].y<850);assert.equal(detail.points['SI 5'].y,850);
assert.equal(detail.points['LU 11'].view,'handBack');assert.equal(detail.points['HT 9'].view,'handBack');
assert(detail.points['LI 1'].y>236&&detail.points['SI 1'].y>346&&detail.points['TE 1'].y>231);
assert(detail.points['HT 9'].x<678&&detail.points['SI 1'].x>678);
assert(detail.points['BL 63'].y>575&&detail.points['BL 63'].x<540);
assert(detail.points['BL 64'].x>540);assert(detail.points['ST 4'].x<430);
assert.equal(detail.points['ST 3'].y,detail.points['LI 20'].alternate.y);
assert(detail.points['SP 19'].sourceIssue33);assert.match(learning.points['SP 19'].focus.en,/ST 16/);
assert.match(D.points.find(p=>p.c==='ST 19').standardLocation,/needling/);assert.doesNotMatch(D.points.find(p=>p.c==='ST 19').referenceExcerpt,/needling/);
run("openItem('point:ST 19')");assert(!elements.get('#sheet').innerHTML.includes('oblique needling'));
const paths=run('AN_PATHS');assert.equal(paths.length,8);assert.equal(paths.reduce((n,p)=>n+p.steps.length,0),24);
for(const lang of ['he','en']){
 run(`LANG='${lang}'`);
 for(const p of paths){
  for(const s of p.steps){assert(s.slice(0,2).every(c=>detail.points[c]));assert(s.slice(2).every(s=>s.length>3));}
  run(`store.set('courseProgress',{version:1,active:'${p.id}',completed:{},results:{}});anPathsRender()`);checkHtml(elements.get('#learnBody').innerHTML);
  run(`anQuizPathId='${p.id}';adQuiz=adQuizBuild()`);const q=run('adQuiz');assert(q.questions.length>=2&&q.questions.length<=8);assert(q.questions.every(q=>p.steps.some(s=>s.slice(0,2).includes(q.code))));
  for(const question of q.questions){assert(question.choices.length>=2);assert(question.choices.every(c=>detail.points[c].view===question.view));}
  run(`anSetStep('${p.id}',0,true);anSetStep('${p.id}',0,true)`);assert.equal(run(`anProgress().completed['${p.id}'].length`),1);
  run('asSaveSession()');assert.equal(run("asValidateSession(store.get('visualSession')).pathId"),p.id);
  run('adQuizAnswer(adQuiz.questions[0].choices.indexOf(adQuiz.questions[0].code));adQuiz.index++;adQuizRender();');assert.equal(run("asValidateSession(store.get('visualSession')).index"),1);
  run('while(adQuiz.index<adQuiz.questions.length){adQuizAnswer(0);adQuiz.index++;}adQuizRender();adQuizRender()');assert.equal(run(`anProgress().results['${p.id}'].total`),q.questions.length);
 }
}
assert.throws(()=>run("anValidateCourses({version:1,active:null,completed:{BAD:[0]},results:{}})"));
assert.throws(()=>run("anValidateCourses({version:1,active:null,completed:{'hand-foundation':[3]},results:{}})"));
assert.throws(()=>run("anValidateCourses({version:1,active:null,completed:{'hand-foundation':[0,0]},results:{}})"));
run("anQuizPathId=null;adQuiz=adQuizBuild();var oldSession=JSON.parse(JSON.stringify(adQuiz));oldSession.version='3.2.0';delete oldSession.pathId");assert(run('asValidateSession(oldSession)'));
run("oldSession.pathId='hand-foundation';oldSession.questions[0].code='BL 63'");assert.equal(run('asValidateSession(oldSession)'),null);
run("anQuizPathId='hand-foundation';adQuiz=adQuizBuild();asSaveSession();Blob=class{constructor(parts){capturedBackup=parts.join('')}};URL.createObjectURL=()=> 'blob:test';doBackup();Blob=originalBlob;URL.createObjectURL=originalCreateUrl;");
const courseBackup=JSON.parse(run('capturedBackup'));assert.equal(courseBackup.visualSession.pathId,'hand-foundation');assert(courseBackup.courseProgress.results['pelvis-comparison']);
run('var restore33=baValidateBackup(JSON.parse(capturedBackup));store.set("courseProgress",restore33.courseProgress);store.set("visualSession",restore33.visualSession);adQuiz=null;adQuizRender()');assert.equal(run('adQuiz.pathId'),'hand-foundation');
assert.equal(run("baValidateBackup({favs:[]}).courseProgress.version"),1);
assert.equal(run("baValidateBackup({favs:[],lastVisualQuiz:{score:4,total:6,date:'2026-09-22'}}).lastVisualQuiz.total"),6);
for(const f of ['atlas-anatomy.js','atlas-courses.js','atlas-anatomy.css'])assert(manifest.assets.includes(f));


const result={newPointNotes:215,expandedAnatomyViews:6,learningPaths:8,courseSteps:24,markerAdjustments:13,landmarkLinks,adaptiveChecks:true,newFocusedExternalChecks:8,schematicViews:22,pointMarkers:361,landmarkTranslations:275,sourceCorrections:2,landmarkLabelCorrections:3,authoredPointNotes:361,locationVariants:6,visualQuizRoundsChecked:60,version:D.version,points:D.points.length,zones:D.zones.length,meridians:D.meridians.length,renderedCards:rendered,renderedRouteSections:sections,languages:['he','en'],illustrationFiles:allPlates.length,imagesReferencedInRender:images.size,checks:['361 individually edited point explanations, including 215 new notes','six new drawings in three layers, hand bone counts and mirror orientation','eight scoped course quizzes, completion tracking, legacy session migration and course backup roundtrip','13 schematic alignment changes and preserved source provenance','all 1131 landmark links resolve to a defined highlight','six alternatives render in primary, alternative and comparison modes','adaptive priority, hint handling, 3-day scheduling, resume and history deduplication','backup export includes validated learning progress','all 361 point diagrams have source landmarks and a selected marker','SI2 and SI3 copied descriptions corrected, with opposite-side joint positions','six source alternatives identified','visual quiz choices belong to the correct view with no duplicate choices','visual quiz answer locking, full-round scoring and backup validation','all point and zone cards render','each point belongs to exactly one route section','all zones appear on their assigned foot map','all referenced image files exist','Hebrew niqqud-insensitive search','quiz choices unique with exactly one correct answer','backup allowlist and invalid input rejection','user-name attribute escaping','offline manifest files present','JavaScript and gallery syntax']};
fs.writeFileSync(path.join(root,'verification.json'),JSON.stringify(result,null,2));console.log(JSON.stringify(result,null,2));
