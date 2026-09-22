'use strict';
const AD=window.ATLAS_DETAIL;
let adSvgSerial=0;
const adPoint=c=>D.points.find(p=>p.c===c);
const adViewTitle=v=>AD.views[v]?.[LANG==='he'?'he':'en']||v;
const adXY=c=>{const p=AD.points[c];return {x:p.view==='handPalm'?1000-p.x:p.x,y:p.y}};
function adGeometry(view){
 const outline=d=>`<path class="ad-skin" d="${d}"/>`,line=(d,cls='ad-structure')=>`<path class="${cls}" d="${d}"/>`,oval=(x,y,rx,ry,cls='ad-bone')=>`<ellipse class="${cls}" cx="${x}" cy="${y}" rx="${rx}" ry="${ry}"/>`;
 let body='',detail='',marks=[];
 const mark=(x,y,he,en)=>marks.push({x,y,he,en});
 if(view==='face'){
  body=outline('M310 670 Q335 790 260 867 L215 925 Q200 970 500 975 Q800 970 785 925 L740 867 Q665 790 690 670Z')+oval(500,420,260,305,'ad-skin');
  detail=line('M282 270 Q350 165 500 195 Q650 165 718 270 M300 377 Q377 350 458 377 M542 377 Q620 350 700 377 M345 425 Q400 398 458 425 Q400 450 345 425 M542 425 Q600 398 655 425 Q600 450 542 425 M488 430 L465 538 Q500 569 535 538 L512 430 M430 625 Q500 602 570 625 Q500 650 430 625 M405 700 Q500 738 595 700 M355 710 Q410 790 451 907 M645 710 Q590 790 549 907 M260 925 Q390 894 500 930 Q610 894 740 925')+oval(400,424,11,14)+oval(600,424,11,14)+line('M500 700 L500 932','ad-axis');
  mark(500,550,'קצה האף','Nasal tip');mark(400,425,'גובה האישון','Pupil level');mark(500,763,'עצם הלשון','Hyoid');mark(500,925,'הגומה שמעל עצם החזה','Suprasternal fossa');
 }else if(view==='headSide'){
  body=outline('M300 765 Q340 685 255 580 Q145 375 264 209 Q390 77 620 170 Q697 189 721 290 L727 397 L792 470 Q794 497 742 511 L745 552 L770 572 L744 589 Q768 655 705 678 L620 712 Q614 825 725 915 L280 915 Q325 837 300 765Z');
  detail=oval(452,483,70,109)+line('M437 554 Q490 568 495 490 Q500 416 436 422 Q405 447 430 485 Q466 456 470 502 M666 366 Q700 350 727 367 M675 400 L716 400 M693 570 L745 572 M270 257 Q430 152 635 220 M296 584 Q319 658 373 683 M378 651 Q452 801 380 907 M604 724 Q580 802 612 910');
  mark(505,490,'טרגוס האוזן','Tragus');mark(705,400,'זווית העין החיצונית','Lateral eye angle');mark(375,625,'זיז הפטמה','Mastoid region');
 }else if(view==='scalp'){
  body=oval(500,500,340,380,'ad-skin');detail=line('M230 270 Q500 126 770 270 M245 738 Q500 862 755 738 M500 120 L500 880','ad-axis');
  for(let y=200;y<=800;y+=50)detail+=line(`M480 ${y} L520 ${y}`,'ad-tick');
  mark(500,200,'קו שיער קדמי · סכמה פרוסה','Anterior hairline · flattened scheme');mark(500,800,'קו שיער אחורי','Posterior hairline');
 }else if(view==='headBack'){
  body=outline('M285 897 Q375 795 340 501 Q230 400 269 219 Q312 65 500 65 Q688 65 731 219 Q770 400 660 501 Q625 795 715 897Z');
  detail=line('M310 410 Q500 480 690 410 M340 490 Q500 540 660 490 M500 80 L500 905','ad-axis')+line('M405 530 Q442 645 403 804 M595 530 Q558 645 597 804');
  [580,650,705,755,800].forEach(y=>detail+=oval(500,y,28,15));mark(500,400,'בליטה עורפית חיצונית','External occipital protuberance');mark(500,580,'אזור C2','C2 region');mark(500,800,'C7 · בסיס הצוואר','C7 · neck base');
 }else if(view==='torsoFront'){
  body=outline('M410 65 L405 118 Q303 105 200 170 L235 405 Q263 600 225 825 L284 960 L716 960 L775 825 Q737 600 765 405 L800 170 Q697 105 595 118 L590 65Z');
  detail=line('M265 151 Q378 105 500 145 Q622 105 735 151 M500 132 L500 445 M488 150 L488 407 Q500 433 512 407 L512 150 M500 480 L500 885','ad-axis');
  for(let i=0;i<7;i++){let y=180+i*50;detail+=line(`M486 ${y-18} Q370 ${y-50} 253 ${y+8} M514 ${y-18} Q630 ${y-50} 747 ${y+8}`);}
  detail+=line('M350 530 Q400 685 365 815 M650 530 Q600 685 635 815 M284 863 Q390 877 500 941 Q610 877 716 863')+oval(500,720,12,10)+oval(372,330,9,6)+oval(628,330,9,6);
  mark(500,130,'עצם החזה · קצה עליון','Sternum · upper end');mark(500,440,'חיבור גוף החזה וזיז הסיף','Xiphisternal junction');mark(500,720,'טבור','Umbilicus');mark(500,895,'גבול עליון של מאחה הערווה','Superior pubic symphysis');
 }else if(view==='torsoSide'){
  body=outline('M399 66 Q543 60 588 157 Q609 244 674 310 Q714 392 652 465 Q631 580 671 719 Q691 835 645 944 L368 944 Q343 830 388 744 Q412 645 385 539 Q330 398 354 235Z');
  detail=line('M450 105 Q517 153 479 216 Q449 274 480 338 M399 227 Q501 240 627 289 M382 280 Q493 284 650 340 M380 335 Q493 337 660 390 M384 390 Q493 391 657 440 M398 445 Q493 441 640 490 M418 504 Q482 496 580 554 M421 563 Q479 550 530 600 M400 606 L440 640 M388 799 Q510 764 651 837')+line('M480 190 L480 777','ad-axis');
  mark(480,190,'אזור בית השחי','Axillary region');mark(530,600,'קצה הצלע ה־11','Free end of rib 11');mark(440,640,'קצה הצלע ה־12','Free end of rib 12');mark(640,720,'גובה הטבור','Umbilical level');
 }else if(view==='back'){
  body=outline('M412 70 L405 132 Q320 137 200 208 L235 400 Q280 600 260 794 L280 960 L720 960 L740 794 Q720 600 765 400 L800 208 Q680 137 595 132 L588 70Z');
  detail=line('M270 197 Q340 178 437 199 L428 425 Q332 414 300 303Z M730 197 Q660 178 563 199 L572 425 Q668 414 700 303Z M292 229 L425 279 M708 229 L575 279 M345 810 Q421 758 500 812 Q579 758 655 810 M438 814 L500 958 L562 814Z');
  const levels=[['C7',160],...Array.from({length:12},(_,i)=>['T'+(i+1),195+i*35]),...Array.from({length:5},(_,i)=>['L'+(i+1),620+i*40])];
  for(const [name,y]of levels){detail+=oval(500,y,20,10);if(['C7','T1','T7','T12','L4'].includes(name))detail+=`<text class="ad-level" x="465" y="${y+6}" text-anchor="end">${name}</text>`;}
  for(let i=0;i<4;i++)detail+=oval(530,820+i*30,7,5)+oval(470,820+i*30,7,5);
  mark(500,160,'C7 · בסיס הצוואר','C7 · neck base');mark(690,340,'גוף השכמה','Scapular body');mark(500,740,'גובה L4','L4 level');mark(500,930,'פתח תחתון של תעלת העצה','Sacral hiatus');
 }else if(view==='armFront'||view==='armBack'){
  body=outline(view==='armBack'?'M370 78 Q500 15 630 78 Q675 125 650 243 L660 410 Q693 444 659 535 L647 900 Q605 950 500 960 Q395 950 358 900 L339 535 Q325 444 335 410 L350 243 Q325 125 370 78Z':'M370 78 Q500 15 630 78 Q675 125 650 243 L640 410 Q675 444 630 535 L615 900 Q605 950 500 960 Q395 950 385 900 L365 535 Q325 444 360 410 L350 243 Q325 125 370 78Z');
  detail=line('M379 455 Q500 429 626 455 M391 880 Q502 865 612 880 M405 130 Q499 109 595 130 M420 497 Q408 665 415 881 M580 497 Q600 665 585 881');
  if(view==='armFront')detail+=outline('M424 178 Q503 127 578 181 Q610 295 522 418 L493 450 L470 414 Q391 300 424 178Z')+line('M490 680 L479 877 M518 680 L515 877');
  else detail+=line('M409 172 Q500 292 498 427 Q530 331 592 177 M425 479 L478 847 M587 479 L535 847')+oval(500,450,27,24);
  mark(500,165,'גובה קפל בית השחי','Axillary fold level');mark(500,450,view==='armFront'?'קפל המרפק':'זיז המרפק',view==='armFront'?'Elbow crease':'Olecranon');mark(500,880,'קפל שורש כף היד','Wrist crease');mark(400,750,'צד רדיאלי · אגודל','Radial · thumb side');
 }else if(view==='handPalm'||view==='handBack'){
  body=outline('M390 945 L386 813 Q290 709 263 601 L148 447 Q126 395 179 366 Q226 345 256 403 L318 496 L310 226 Q315 166 355 166 Q394 169 397 225 L412 422 L425 144 Q431 91 474 92 Q514 98 513 150 L524 411 L538 202 Q546 158 582 161 Q623 162 624 211 L632 457 L638 320 Q644 277 678 280 Q716 282 720 325 L730 511 Q760 660 670 814 L642 945Z');
  detail=line('M392 853 Q507 833 645 853 M398 880 Q506 862 641 880');
  if(view==='handBack'){
   [[355,210,394,786],[474,135,466,808],[582,205,531,808],[678,320,596,800]].forEach(([x,y,xx,yy])=>{detail+=line(`M${x} ${y} L${x} 462 L${xx} ${yy}`,'ad-tendon');detail+=oval(x,450,25,18);for(let dy=55;dy<220;dy+=75)if(y+dy<420)detail+=line(`M${x-22} ${y+dy} Q${x} ${y+dy+10} ${x+22} ${y+dy}`);});
   detail+=line('M189 405 L287 562 L398 777','ad-tendon');
   [[355,205],[474,135],[582,200],[678,315]].forEach(([x,y])=>detail+=`<rect class="ad-bone" x="${x-20}" y="${y-16}" width="40" height="47" rx="12"/>`);
  }else detail+=line('M337 473 Q353 569 307 643 Q308 703 395 755 M393 771 Q501 618 639 559 M381 565 Q530 508 718 501 M418 474 Q545 458 630 479 M332 252 L383 258 M450 212 L498 212 M554 274 L612 274 M652 359 L705 359');
  mark(500,850,'שורש כף היד','Wrist');mark(675,450,'מפרק המסרק־גליל החמישי','Fifth metacarpophalangeal joint');mark(355,450,'מפרק המסרק־גליל השני','Second metacarpophalangeal joint');
  if(view==='handPalm'){body=`<g transform="translate(1000 0) scale(-1 1)">${body}${detail}</g>`;detail='';marks=marks.map(p=>({...p,x:1000-p.x}));}
 }else if(['legFront','legBack','legMedial','legLateral'].includes(view)){
  body=outline('M385 76 Q500 15 617 76 Q685 168 636 320 L603 421 Q676 479 650 560 Q696 672 630 820 L590 944 L420 944 L403 820 Q325 672 365 560 Q339 479 395 421 L363 320 Q315 168 385 76Z');
  detail=line('M406 900 Q500 883 590 900 M403 456 Q500 477 603 456');
  if(view==='legFront'){detail+=oval(500,462,48,43)+line('M500 505 L520 892 M620 530 L596 896 M422 162 Q393 330 452 416 M571 170 Q606 330 548 416 M451 507 L552 507');mark(500,462,'פיקת הברך','Patella');mark(520,640,'קדמת השוקה','Anterior tibia');}
  if(view==='legBack'){detail+=line('M405 150 Q500 176 595 150 M403 470 Q500 449 608 470 M498 517 Q392 508 412 627 Q435 698 498 715 Q562 698 589 627 Q608 508 502 517 M484 725 L481 900 M516 725 L519 900');mark(500,150,'קפל העכוז','Gluteal fold');mark(500,470,'קפל הברך האחורי','Popliteal crease');mark(500,785,'גיד אכילס','Achilles tendon');}
  if(view==='legMedial'){detail+=line('M570 485 L564 883 M409 744 L425 890 M559 151 Q604 319 570 450 M478 461 Q431 481 440 523')+oval(574,474,34,23);mark(560,485,'שוקה · אזור הקונדיל הפנימי','Tibia · medial condyle');mark(564,675,'שוליים פנימיים של השוקה','Medial tibial border');}
  if(view==='legLateral'){detail+=oval(560,180,30,40)+oval(510,508,23,30)+line('M558 220 L540 441 M510 534 L516 890 M402 139 Q472 118 582 140');mark(560,180,'התל הגדול','Greater trochanter');mark(510,508,'ראש השוקית','Head of fibula');mark(516,740,'שוקית','Fibula');}
  mark(500,900,'גובה הקרסול','Ankle level');
 }else if(view==='footTop'||view==='footSole'){
  body=outline('M399 949 Q351 900 361 791 Q289 650 264 442 L270 235 Q275 168 320 153 Q363 145 382 194 L391 183 Q400 120 441 123 Q480 124 479 181 Q505 152 536 163 Q564 171 566 210 Q591 190 619 204 Q645 214 645 251 Q671 232 697 253 Q724 276 721 310 Q766 345 751 444 Q743 562 682 684 L627 839 Q609 966 500 974Z');
  if(view==='footTop'){
   [[330,200,423,666],[445,175,486,668],[538,220,539,655],[620,262,585,635],[699,313,634,613]].forEach(([x,y,xx,yy])=>detail+=line(`M${x} ${y} L${x} 403 L${xx} ${yy}`,'ad-tendon')+oval(x,400,20,13));detail+=line('M400 750 Q500 717 643 756 M408 779 Q500 752 626 781');
  }else detail+=line('M327 430 Q485 352 721 437 M352 470 Q444 522 413 652 Q387 736 432 795 M583 469 Q656 595 580 776 M432 855 Q500 827 580 848');
  mark(330,400,'מפרק המסרק־גליל הראשון','First metatarsophalangeal joint');mark(500,780,'אזור הקרסול','Ankle region');mark(500,900,'עקב','Heel');
 }else if(view==='footMedial'||view==='footLateral'){
  body=outline('M224 173 L388 173 Q401 356 432 455 Q469 533 649 574 L812 606 Q877 599 892 646 Q902 692 853 716 L620 760 Q462 771 362 790 Q253 833 174 781 Q125 739 169 661 Q224 571 215 457Z');
  detail=oval(315,430,38,44)+line('M237 235 Q255 441 213 675 M246 698 Q310 681 364 707 Q509 651 703 649 M438 588 Q484 561 514 591 L535 643 M551 594 L730 636 M697 630 L739 690 M799 618 L806 686');
  mark(315,430,view==='footMedial'?'פטישון פנימי':'פטישון חיצוני',view==='footMedial'?'Medial malleolus':'Lateral malleolus');mark(216,510,'גיד אכילס','Achilles tendon');mark(view==='footMedial'?475:540,view==='footMedial'?575:650,view==='footMedial'?'עצם הסירה':'בסיס המסרק החמישי',view==='footMedial'?'Navicular':'Fifth metatarsal base');
 }else if(view==='perineum'){
  body=outline('M500 107 Q820 290 773 605 Q730 812 500 922 Q270 812 227 605 Q180 290 500 107Z');
  detail=line('M500 180 L500 850','ad-axis')+oval(500,310,65,38)+oval(500,680,34,24)+line('M419 240 Q500 198 581 240 M461 840 L500 870 L539 840');
  mark(500,180,'קדימה · אזור הערווה','Anterior · pubic region');mark(500,310,'בסיס איברי המין החיצוניים · ייצוג מופשט','External genital base · abstract reference');mark(500,680,'פי הטבעת','Anus');mark(500,840,'קצה עצם הזנב','Coccygeal tip');
 }else if(view==='hip'){
  body=outline('M280 150 Q508 45 776 179 Q844 337 747 592 Q738 756 692 918 L510 918 Q476 754 377 711 Q179 653 214 414Z');
  detail=line('M293 232 Q530 140 730 260 M293 232 Q270 350 270 520 M330 378 Q525 348 650 630 M648 674 L602 898')+oval(650,630,33,44)+oval(730,260,23,20)+oval(270,520,20,19);
  mark(730,260,'קוץ הכסל הקדמי העליון','Anterior superior iliac spine');mark(650,630,'התל הגדול','Greater trochanter');mark(270,520,'פתח העצה · נקודת ייחוס','Sacral hiatus · reference');
 }else if(view==='mouth'){
  body=outline('M161 270 Q500 90 839 270 L856 648 Q500 860 144 648Z');
  detail=outline('M202 352 Q500 230 798 352 L789 510 Q500 620 211 510Z')+line('M225 457 Q500 351 775 457 M488 269 L485 388 Q500 409 515 388 L512 269 M200 673 Q500 801 800 673');
  for(let x=300;x<=700;x+=80)detail+=outline(`M${x-35} 488 L${x-32} 582 Q${x} 601 ${x+32} 582 L${x+35} 488Z`);
  mark(500,280,'שפה עליונה מורמת · סכמה','Upper lip raised · schematic');mark(500,390,'רסנית השפה וחניכיים עליונות','Labial frenulum and upper gum');
 }
 return {body,detail,marks};
}
function adDiagram(view,{codes=[],selected='',labels=true,focus=false,arrows=false,answers=null,interactive=true,positions={},overlay='',afterNodes='',frame=null}={}){
 const id='ad'+(++adSvgSerial),g=adGeometry(view),xy=c=>{const p=positions[c]||AD.points[c];return {x:p.view==='handPalm'?1000-p.x:p.x,y:p.y}},pts=[...new Set(codes)].filter(c=>(positions[c]||AD.points[c])?.view===view);
 if(selected&&!pts.includes(selected)&&(positions[selected]||AD.points[selected])?.view===view)pts.push(selected);
 let box=[80,45,840,945];
 if(focus&&selected){const p=xy(selected);box=[Math.max(55,Math.min(505,p.x-220)),Math.max(45,Math.min(545,p.y-220)),440,440];}
 if(frame)box=frame;
 const [bx,by,bw,bh]=box,visible=p=>p.x>=bx&&p.x<=bx+bw&&p.y>=by&&p.y<=by+bh;
 let links='';if(arrows)for(let i=1;i<pts.length;i++){const a=pts[i-1],b=pts[i];if(a.split(' ')[0]===b.split(' ')[0]&&+b.split(' ')[1]===+a.split(' ')[1]+1){const x=xy(a),y=xy(b),len=Math.hypot(y.x-x.x,y.y-x.y);if(len>28)links+=`<path class="ad-route" d="M${x.x} ${x.y} L${x.x+(y.x-x.x)*(len-18)/len} ${x.y+(y.y-x.y)*(len-18)/len}" marker-end="url(#${id}arrow)"/>`;}}
 const occupied=[];
 const nodes=pts.map((c,i)=>{const p=xy(c),active=selected===c,letter=answers?.[i],caption=letter||(labels?c:(active?'●':''));let pos={x:p.x+22,y:p.y-20};
  if(caption){const width=letter?32:64;const candidates=[[22,-23],[-width-22,-23],[22,28],[-width-22,28],[-width/2,-35],[-width/2,49]];
   for(const [dx,dy]of candidates){const r={x:p.x+dx,y:p.y+dy-20,w:width,h:27};if(r.x<bx+8||r.x+r.w>bx+bw-8||r.y<by+8||r.y+r.h>by+bh-8)continue;if(occupied.every(q=>r.x+r.w<q.x||r.x>q.x+q.w||r.y+r.h<q.y||r.y>q.y+q.h)){pos={x:r.x,y:r.y+20};occupied.push(r);break;}}
  }
  const attrs=interactive?(letter?`role="button" tabindex="0" data-ad-answer="${i}" aria-label="${baEsc(baT('אפשרות ','Option ')+letter)}"`:`role="button" tabindex="0" data-open="point:${c}" aria-label="${baEsc(c+' · '+baName(adPoint(c)))}"`):'';
  const hitX=Math.min(p.x-21,caption?pos.x:p.x-21),hitY=Math.min(p.y-21,caption?pos.y-26:p.y-21),hitW=Math.max(p.x+21,caption?pos.x+(letter?32:70):p.x+21)-hitX,hitH=Math.max(p.y+21,caption?pos.y+5:p.y+21)-hitY;
  return `<g class="ad-marker ${active?'selected':''} ${letter?'ad-choice':''}" ${attrs}><rect x="${hitX}" y="${hitY}" width="${hitW}" height="${hitH}" fill="transparent" pointer-events="all"/><circle class="ad-hit" cx="${p.x}" cy="${p.y}" r="21"/><circle class="ad-dot" cx="${p.x}" cy="${p.y}" r="${active?12:8}"/>${active?`<circle class="ad-ring" cx="${p.x}" cy="${p.y}" r="20"/>`:''}${caption?`<text class="ad-point-label" x="${pos.x}" y="${pos.y}" text-anchor="start">${baEsc(caption)}</text>`:''}</g>`;
 }).join('');
 const marks=g.marks.map((m,i)=>visible(m)&&labels?`<g class="ad-landmark"><circle cx="${m.x}" cy="${m.y}" r="12"/><text x="${m.x}" y="${m.y+4}" text-anchor="middle">${i+1}</text></g>`:'').join('');
 return `<figure class="ad-diagram"><div class="ad-chart-head"><span>${baEsc(adViewTitle(view))}</span><small>${baT('מיקום יחסי · סכמה','Relative location · schematic')}</small></div><svg xmlns="http://www.w3.org/2000/svg" viewBox="${box.join(' ')}" class="ad-svg" role="group" aria-label="${baEsc(adViewTitle(view)+(answers?'':selected?' · '+selected:''))}" style="--ad-skin:url(#${id}skin)"><defs><linearGradient id="${id}skin" x1="0" x2="1"><stop stop-color="#aa8659"/><stop offset=".25" stop-color="#e0c49a"/><stop offset=".5" stop-color="#f4e4c7"/><stop offset=".72" stop-color="#d7b68b"/><stop offset="1" stop-color="#9f7a52"/></linearGradient><marker id="${id}arrow" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto"><path d="M0 0L6 3L0 6Z" fill="#69ead8"/></marker></defs>${g.body}${g.detail}${overlay}${links}${marks}${nodes}${afterNodes}</svg>${labels?`<figcaption class="ad-legend">${g.marks.map((m,i)=>visible(m)?`<span><b>${i+1}</b>${baEsc(baT(m.he,m.en))}</span>`:'').join('')}</figcaption>`:''}</figure>`;
}
