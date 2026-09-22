const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const root=path.resolve(__dirname,'..'),ctx={window:{}};vm.createContext(ctx);
for(const file of ['atlas-data.js','atlas-detail-data.js','atlas-learning-data.js'])vm.runInContext(fs.readFileSync(path.join(root,file),'utf8'),ctx);
const D=ctx.window.ATLAS,A=ctx.window.ATLAS_DETAIL,L=ctx.window.ATLAS_LEARNING;
const header=['code','source_page','view','schematic_x','schematic_y','primary_source_description','learning_note_he','learning_note_en','comparison_code','alternative_he','focused_check','alignment_33','source_conflict_33','review_status','reviewer','review_date','review_notes'];
const rows=D.points.map(p=>{const d=A.points[p.c],l=L.points[p.c];return [p.c,d.page,d.view,d.x,d.y,p.standardLocation,l.focus.he,l.focus.en,l.compare,d.alternate?.he||'',d.check32?'focused WHO excerpt check (3.2)':d.corrected?'focused WHO excerpt correction':d.externalCheck?'MSK patient education comparison':'supplied dataset',d.adjustment33?.he||'',d.sourceIssue33?.he||'','ממתין לסקירה מקצועית','','',''];});
const q=s=>'"'+String(s).replaceAll('"','""')+'"';
fs.writeFileSync(path.join(root,'clinical-review.csv'),'\ufeff'+[header,...rows].map(r=>r.map(q).join(',')).join('\r\n')+'\r\n');
console.log('361 review rows exported; clinical status remains pending');
