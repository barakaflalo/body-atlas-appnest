'use strict';
// Coordinates describe this authored teaching surface, never patient measurements.
const AL={};
function alSet(view,names,shape,kind='structure'){for(const name of names.split('|'))AL[view+'|'+name.toLowerCase()]={...shape,kind};}
function alDot(v,n,x,y,rx=22,ry=rx,k='structure'){alSet(v,n,{type:'ellipse',x,y,rx,ry},k);}
function alLine(v,n,d,k='structure'){alSet(v,n,{type:'path',d},k);}
function alArea(v,n,x,y,rx,ry){alDot(v,n,x,y,rx,ry,'region');}
const alOrdinal=['first','second','third','fourth','fifth','sixth','seventh','eighth','ninth','tenth','eleventh','twelfth'];
alArea('face','Face|Head',500,420,240,290);alArea('face','Neck',500,809,165,105);
alDot('face','Cricoid Cartilage',500,830,43,15);alDot('face','Thyroid Cartilage',500,780,42,28);
alLine('face','Sternocleidomastoid Muscle','M350 711 Q403 790 452 907');
alDot('face','Philtrum',500,592,12,28);alDot('face','Nostril',468,549,17,12);alDot('face','Ala Of Nose',454,551,22,20);
alLine('face','Nasolabial Sulcus','M446 551 Q431 583 424 616');
alDot('face','Eyeball|Eye|Orbital Cavity',400,425,56,30);alLine('face','Infraorbital Margin','M345 444 Q400 461 458 444');
alDot('face','Pupil',400,425,12);alDot('face','Infraorbital Foramen',400,470,12);
alArea('face','Mouth',500,625,70,20);alLine('face','Mandible','M301 580 Q320 666 414 707 Q500 744 586 707 Q680 666 699 580');
alArea('face','Masseter',329,602,33,65);alLine('face','Facial Artery','M340 672 Q346 625 392 594 Q435 578 446 555','projection');
alLine('face','Common Carotid Artery','M425 870 L430 774 L436 735','projection');
alDot('face','Lesser Supraclavicular Fossa',451,907,17);alLine('face','Clavicle','M260 925 Q390 894 500 930 Q610 894 740 925');
alDot('face','Greater Supraclavicular Fossa',295,907,40,15);alLine('face','Anterior Median Line','M500 170 L500 945','reference');
alArea('face','Zygomatic Bone',345,537,40,26);alDot('face','Outer Canthus',345,425,10);alDot('face','Inner Canthus',458,425,10);
alLine('face','Eyebrow','M300 377 Q377 350 458 377');alDot('face','Frontal Notch',445,377,12);
alArea('face','Nose',500,500,34,65);alDot('face','Nose Tip',500,550,16);alLine('face','Upper Lip','M430 625 Q500 602 570 625');
alDot('face','Suprasternal Fossa',500,925,23,13);alLine('face','Hyoid Bone','M460 763 Q500 781 540 763');alDot('face','Hyoid Tubercle',500,771,10);alLine('face','Mentolabial Sulcus','M459 677 Q500 690 541 677');
alArea('headSide','Face',690,486,65,180);alArea('headSide','Head',488,398,230,260);alArea('headSide','Neck',485,796,100,100);
alLine('headSide','Zygomatic Arch','M516 430 Q599 406 669 430');alDot('headSide','Mandibular Notch',536,488,21,14);
alDot('headSide','Tragus',505,490,12,16);alDot('headSide','Mandible Condylar Process|Condyloid Process',535,460,18);
alDot('headSide','Ear Lobe',442,578,24,16);alArea('headSide','Mastoid Process',375,615,27,32);
alArea('headSide','ear',450,483,60,93);alDot('headSide','supratragic notch',505,456,12);alDot('headSide','Intertragic Notch',505,516,12);
alLine('headSide','Hairline','M272 255 Q426 158 635 220');alLine('headSide','Auricular Root','M425 380 Q386 484 421 582');
alLine('headSide','Superficial Temporal Artery','M528 440 Q528 360 567 294','projection');alLine('headSide','Eyebrow','M666 366 Q700 350 727 367');
alDot('headSide','Outer Canthus',705,400,11);alArea('headSide','Eye',692,400,25,15);
alArea('scalp','Head',500,500,280,320);alLine('scalp','Anterior Hairline','M258 235 Q500 165 742 235','reference');alLine('scalp','Posterior Hairline','M258 770 Q500 832 742 770','reference');
alArea('scalp','Forehead',500,173,180,40);alLine('scalp','Anterior Median Line|Posterior Median Line','M500 120 L500 880','reference');
alLine('scalp','Frontal Notch','M424 145 L424 325','projection');alLine('scalp','Pupil','M365 145 L365 420','projection');alLine('scalp','Eyebrow','M300 150 L460 150','projection');
alArea('headBack','Head|Occipital Bone',500,304,202,208);alDot('headBack','External Occipital Protuberance',500,400,20);alLine('headBack','Posterior Median Line','M500 80 L500 890','reference');
alArea('headBack','Trapezius Muscle|Trapezius',446,644,35,129);alArea('headBack','Sternocleidomastoid',623,610,30,100);alArea('headBack','Neck',500,650,123,154);alDot('headBack','Second Cervical Vertebra',500,580,29,15);
alArea('torsoFront','Anterior Thoracic Region',500,299,212,190);alLine('torsoFront','Anterior Median Line','M500 113 L500 925','reference');
for(let n=1;n<=7;n++)alLine('torsoFront',alOrdinal[n-1]+' Intercostal Space',`M264 ${130+n*50} L736 ${130+n*50}`,'reference');
alDot('torsoFront','Infraclavicular Fossa',309,129,41,18);alDot('torsoFront','Coracoid Process Of The Scapula',270,141,15);alArea('torsoFront','Clavipectoral Triangle',292,161,25,27);
alLine('torsoFront','Clavicle','M265 151 Q378 105 500 145 Q622 105 735 151');alLine('torsoFront','Second Rib','M486 194 Q370 177 253 234');alDot('torsoFront','Sternal Angle',500,205,16,10);
alDot('torsoFront','Nipple',372,330,13);alLine('torsoFront','Nipple Line|Midclavicular Line','M372 130 L372 875','reference');
alArea('torsoFront','Upper Abdomen',500,589,156,105);alDot('torsoFront','Umbilicus',500,720,18);
alLine('torsoFront','Infrasternal Angle','M442 477 L500 440 L558 477');alLine('torsoFront','Rib','M486 394 Q370 362 253 420');
alArea('torsoFront','Lower Abdomen',500,820,160,75);alArea('torsoFront','Groin Region',370,897,80,36);alDot('torsoFront','Pubic Symphysis',500,895,26,14);
alLine('torsoFront','Femoral Artery','M354 892 L336 949','projection');alLine('torsoFront','Inguinal Crease','M300 859 Q390 877 500 939');
alDot('torsoFront','Anterior Superior Iliac Spine',310,824,17);alDot('torsoFront','Xiphisternal Junction',500,440,19);alDot('torsoFront','Suprasternal Fossa',500,119,20,10);
alArea('torsoSide','Lateral Thoracic Region',478,363,79,164);alArea('torsoSide','Abdomen',527,673,96,128);
alLine('torsoSide','Fourth Intercostal Space','M398 330 L648 330','reference');alLine('torsoSide','Sixth Intercostal Space','M403 430 L645 430','reference');
alLine('torsoSide','Midaxillary Line','M480 190 L480 777','reference');alLine('torsoSide','Posterior Axillary Line','M406 219 L406 714','reference');
alLine('torsoSide','Twelfth Rib','M399 606 L440 640');alLine('torsoSide','Eleventh Rib','M421 563 Q479 550 530 600');alLine('torsoSide','Costal Arch','M420 552 Q547 514 640 490');alLine('torsoSide','Umbilicus','M433 720 L672 720','projection');
alArea('back','Shoulder Girdle',653,208,124,65);alLine('back','Posterior Axillary Fold','M758 217 Q745 301 752 359');alLine('back','Scapula Spine','M708 229 L575 279');
alArea('back','Scapular Region|Scapula',655,308,83,118);alArea('back','Supraspinatus Fossa',660,213,61,31);alArea('back','Upper Back',500,344,190,219);alLine('back','Posterior Median Line','M500 85 L500 957','reference');
alDot('back','Seventh Cervical Vertebra',500,160,25,13);for(let n=1;n<=12;n++)alDot('back',alOrdinal[n-1]+' Thoracic Vertebra',500,160+n*35,24,13);
alArea('back','Lumbar Region',500,691,157,105);for(let n=1;n<=5;n++)alDot('back',alOrdinal[n-1]+' Lumbar Vertebra',500,580+n*40,25,15);
alArea('back','Sacral Region',500,867,64,70);for(let n=1;n<=4;n++)alDot('back',alOrdinal[n-1]+' Posterior Sacral Foramen',530,790+n*30,10,8);
alLine('back','Median Sacral Crest','M500 817 L500 918');alDot('back','Sacral Hiatus',500,930,11);alDot('back','Posterior Superior Iliac Spine',567,812,14);
alDot('back','Second Sacral Vertebra',500,850,19,12);alArea('back','Buttock',642,877,73,70);alDot('back','Coccyx',500,958,12);alArea('back','Neck',500,101,71,28);
alDot('back','Acromion',762,177,20);alLine('back','Anal Cleft','M500 943 L500 977','reference');alLine('back','Iliac Crest','M345 810 Q421 758 500 812 Q579 758 655 810');
for(const v of ['armFront','armBack']){alArea(v,'Arm',500,263,94,164);alArea(v,'Forearm',500,676,91,172);alArea(v,'Elbow',500,452,137,28);alArea(v,'Wrist',500,884,105,35);alLine(v,'Cubital Crease','M368 450 Q500 436 634 450');alDot(v,'Medial Epicondyle',617,450,19);alLine(v,'Ulna','M590 500 L590 880');}
alArea('armFront','Biceps Brachii Muscle',500,282,72,125);alLine('armFront','Anterior Axillary Fold','M395 165 Q488 150 577 165');alLine('armFront','Biceps Brachii Tendon','M492 393 L485 463');
alLine('armFront','Palmar Wrist Crease','M391 880 Q502 865 612 880');alLine('armFront','Abductor Pollicis Longus Tendon','M401 741 L386 834');alLine('armFront','extensor pollicis brevis muscle','M377 721 L391 838','projection');
alDot('armFront','Radial Styloid Process',382,861,13);alLine('armFront','Radial Artery','M412 775 L411 893','projection');alDot('armFront','Scaphoid Bone',405,910,20,12);
alArea('armFront','Axilla|Axillary Fossa',625,165,31,28);alLine('armFront','Axillary Artery','M638 132 L624 195','projection');alLine('armFront','Tendon of flexor carpi ulnaris','M592 736 L591 887');
alDot('armFront','Pisiform Bone',578,904,16);alLine('armFront','Palmaris Longus Tendon','M518 680 L515 877');alLine('armFront','Tendon of flexor carpi radialis','M490 680 L479 877');
alLine('armBack','Dorsal Wrist Crease','M358 880 Q502 865 647 880');alDot('armBack','Lateral Epicondyle',355,450,20);alLine('armBack','Lateral Supraepicondylar Ridge','M355 444 L369 355');
alArea('armBack','Deltoid Muscle',487,150,114,85);alArea('armBack','Shoulder Girdle|Shoulder Joint',500,104,135,41);alDot('armBack','Acromion',485,85,24,13);
alDot('armBack','Greater Tubercle Of The Humerus',448,123,23);alLine('armBack','Clavicle','M390 79 L471 76','projection');alArea('armBack','Scapula|Suprascapular Fossa',585,90,44,22);
alArea('armBack','Flexor Carpi Ulnaris Muscle',620,637,25,130);alDot('armBack','Olecranon',500,450,28,24);alLine('armBack','Humerus Bone','M500 132 L500 419','projection');
alLine('armBack','Ulnar Nerve','M627 436 Q632 465 608 500','projection');alLine('armBack','Posterior Axillary Fold','M572 132 L623 159');alLine('armBack','Radius','M420 500 L420 885');
alArea('armBack','Interosseous Space',503,686,50,169);alDot('armBack','Olecranon Fossa',500,423,20,12);
// Hand coordinates use the unmirrored authoring basis; palmar rendering mirrors it.
for(const v of ['handPalm','handBack']){
 alArea(v,'Hand|Palm|Dorsum Of The Hand',514,634,167,153);alArea(v,'Wrist',520,870,116,32);alLine(v,'Dorsal Wrist Crease','M392 853 Q507 833 645 853');
 const fingers=[[205,405,290,558],[355,205,395,786],[474,133,466,808],[582,200,531,808],[678,315,596,800]];
 fingers.forEach(([x,y,xx,yy],i)=>{const n=i+1;alLine(v,alOrdinal[i]+' Metacarpal Bone',n===1?'M250 485 L324 657':`M${x} 476 L${xx} ${yy}`);alDot(v,'metacarpophalangeal joint of manual digit '+n,x,n===1?480:450,25,18);alDot(v,'Nail Of Manual Digit '+n,x,y+7,19,25);});
 alArea(v,'Thumb',220,450,36,81);alArea(v,'Index Finger',355,324,29,112);alArea(v,'Middle Finger',474,285,29,164);alArea(v,'Ring Finger',582,326,29,114);alArea(v,'Little Finger',678,383,29,66);
 alDot(v,'Thumb Nail',199,405,21,22);alDot(v,'Radial Styloid Process',385,840,15);alDot(v,'Ulnar Styloid Process',650,835,15);alDot(v,'Triquetrum',653,776,18);
 alArea(v,'Radial Fossa',379,817,21,26);alLine(v,'Extensor Pollicis Longus Tendon','M394 801 L337 703 L273 578');alLine(v,'Extensor Pollicis Brevis Tendon','M365 810 L316 710 L250 584');alLine(v,'Tendon of extensor digitorum','M532 808 L582 473');
}
for(const v of ['legFront','legBack','legMedial','legLateral']){alArea(v,'Thigh',501,272,100,174);alArea(v,'Leg',500,681,103,160);alArea(v,'Knee|Knee Joint',500,473,105,39);alLine(v,'Popliteal Crease','M399 470 L608 470','reference');alLine(v,'Calcaneal Tendon','M500 734 L500 905');alLine(v,'Fibula','M604 530 L590 903');}
alArea('legFront','Rectus Femoris Muscle',500,279,46,153);alLine('legFront','Sartorius Muscle','M601 112 Q477 226 421 421');alArea('legFront','Tensor Fasciae Latae Muscle',603,183,24,58);
alDot('legFront','Patella',500,462,48,43);alDot('legFront','Anterior Superior Iliac Spine',600,105,18);alLine('legFront','Pubic Symphysis','M352 130 L620 130','projection');
alLine('legFront','Tendon Of Quadriceps Femoris','M471 385 L529 385 L540 421 L460 421 Z');alArea('legFront','Vastus Lateralis Muscle',579,328,32,99);alLine('legFront','Patellar Ligament','M483 505 L520 540 L522 505');
alArea('legFront','Tibialis Anterior Muscle',565,670,25,121);alDot('legFront','Lateral Malleolus',597,903,17);
alArea('legBack','Buttock',500,104,106,51);alLine('legBack','Gluteal Fold','M405 150 Q500 176 595 150');alArea('legBack','Biceps Femoris',575,306,39,132);alArea('legBack','Semitendinosus',435,319,26,126);
alLine('legBack','Biceps Femoris Tendon','M586 385 L600 479');alArea('legBack','Gastrocnemius Muscle',499,604,82,88);
alLine('legMedial','Tibia','M570 485 L564 883');alDot('legMedial','Medial Malleolus',569,899,17);alDot('legMedial','Patella',600,450,23,26);alDot('legMedial','Medial Condyle Of The Tibia',574,474,34,23);
alArea('legMedial','Vastus Medialis Muscle',563,382,27,56);alLine('legMedial','Sartorius Muscle','M590 174 Q544 315 497 445');alArea('legMedial','Adductor Longus Muscle',475,250,31,123);
alLine('legMedial','Femoral Artery','M522 168 L530 296','projection');alArea('legMedial','Soleus Muscle',476,682,36,117);alLine('legMedial','Semitendinosus Tendon','M436 375 L439 486');
alArea('legMedial','Semimembranosus Muscle',454,348,22,85);alArea('legMedial','Gracilis Muscle',500,311,18,151);
alArea('legLateral','Buttock',459,137,81,69);alDot('legLateral','Anterior Superior Iliac Spine',560,63,18);alDot('legLateral','Greater Trochanter',560,180,30,40);alLine('legLateral','Sacral Hiatus','M255 150 L420 150','projection');
alLine('legLateral','Iliotibial Band','M558 220 L540 441');alLine('legLateral','Biceps Femoris Tendon','M438 398 L475 493');alLine('legLateral','Femur','M509 210 L510 461','projection');alLine('legLateral','Fibula','M510 534 L516 890');alDot('legLateral','Lateral Malleolus',516,904,18);
for(const v of ['footTop','footSole']){
 alArea(v,'Foot|Sole Of The Foot',508,603,181,254);alArea(v,'Ankle|Ankle Joint',514,778,119,32);alDot(v,'Lateral Malleolus',650,777,18);
 const toes=[[330,222],[445,220],[538,264],[620,306],[699,355]];
 toes.forEach(([x,y],i)=>{alArea(v,alOrdinal[i]+' Toe|Pedal Digit '+(i+1),x,y,24,47);alDot(v,'Nail Of Pedal Digit '+(i+1),x,y-22,17,22);alDot(v,'metatarsophalangeal joint of pedal digit '+(i+1),x,400,21,16);alLine(v,alOrdinal[i]+' Metatarsal Bone',`M${x} 420 L${[423,486,539,585,634][i]} ${[666,668,655,635,613][i]}`);});
 alArea(v,'Great Toe|First Toe',330,242,37,73);alArea(v,'Little Toe|Fifth Toe',699,355,24,47);alDot(v,'Nail Of The Second Toe',445,198,17,22);
 alLine(v,'Tendon of extensor hallucis longus','M405 740 L341 446');alLine(v,'Tendon of extensor digitorum longus','M535 739 L538 428');alDot(v,'Intermediate Cuneiform Bone',486,687,23,24);alLine(v,'Dorsalis Pedis Artery','M483 744 L452 556','projection');
}
for(const v of ['footMedial','footLateral']){alArea(v,'Foot',558,663,273,91);alArea(v,'Ankle',315,443,84,76);alLine(v,'Calcaneal Tendon','M237 235 Q255 441 213 675');alArea(v,'Calcaneus',254,726,69,49);}
alArea('footMedial','Great Toe',825,661,46,35);alDot('footMedial','First Metatarsophalangeal Joint',737,685,28,26);alLine('footMedial','First Metatarsal Bone','M562 650 L711 672');alDot('footMedial','Medial Malleolus',315,430,38,44);
alDot('footMedial','Navicular Bone',475,575,31,26);alDot('footMedial','Calcaneal Tuberosity',200,753,25,22);alLine('footMedial','Tibialis Anterior Tendon','M400 341 Q414 456 484 597');
alDot('footLateral','Lateral Malleolus',315,430,38,44);alLine('footLateral','Fifth Metatarsal Bone','M540 650 L710 686');alDot('footLateral','Cuboid Bone',455,575,31,27);alDot('footLateral','Metatarsophalangeal Joint Of Pedal Digit 5',740,680,25);alArea('footLateral','Little Toe',825,661,38,28);
alArea('perineum','Perineal Region',500,568,185,235);alDot('perineum','Coccyx',500,840,24);alDot('perineum','Anus',500,680,34,24);alDot('perineum','Genital Organ',500,310,65,38);
alArea('mouth','Face',500,450,300,222);alLine('mouth','Labial Frenulum','M500 277 L500 391');alLine('mouth','Upper Gum','M225 457 Q500 351 775 457');
alArea('hip','Buttock',470,529,232,223);alDot('hip','Anterior Superior Iliac Spine',730,260,23);alDot('hip','Greater Trochanter',650,630,33,44);alDot('hip','Sacral Hiatus',270,520,20);
function alResolve(c,index){const p=AD.points[c],term=p.landmarks[index]?.en;if(!term)return null;const v=p.view,n=term.toLowerCase();
 if(n==='distal phalanx'||n==='toenail'||n==='metacarpophalangeal joint'){
  if(v==='handPalm'||v==='handBack'){const digit=/^(LU)/.test(c)?1:/^(LI)/.test(c)?2:/^(PC)/.test(c)?3:/^(TE)/.test(c)?4:5,xy=[[185,414],[355,239],[474,168],[582,232],[678,347]][digit-1];if(n==='metacarpophalangeal joint')return {type:'ellipse',x:xy[0],y:450,rx:26,ry:20,kind:'structure'};return {type:'ellipse',x:xy[0],y:xy[1],rx:24,ry:32,kind:'structure'};}
  if(v==='footTop'){const digit=/^(SP|LR)/.test(c)?1:/^ST/.test(c)?2:/^GB/.test(c)?4:5,xy=[[330,224],[445,222],[538,266],[620,308],[699,355]][digit-1];return {type:'ellipse',x:xy[0],y:xy[1]-(n==='toenail'?20:0),rx:22,ry:28,kind:'structure'};}
 }
 return AL[v+'|'+n]||null;
}
function alShape(shape,cls='al-focus'){return shape.type==='path'?`<path class="${cls}" d="${shape.d}"/>`:`<ellipse class="${cls}" cx="${shape.x}" cy="${shape.y}" rx="${shape.rx}" ry="${shape.ry}"/>`;}
function alOverlay(c,index){const d=AD.points[c],shape=alResolve(c,index);if(!shape)return '';return `<g class="al-overlay" aria-hidden="true"${d.view==='handPalm'?' transform="translate(1000 0) scale(-1 1)"':''}>${alShape(shape)}</g>`;}

// 3.3: use the same reference geometry as the expanded teaching drawings.
for(const v of ['handPalm','handBack']){
 alLine(v,'First Metacarpal Bone','M294 570 L407 772');
 alDot(v,'metacarpophalangeal joint of manual digit 1',287,555,25,20);
 alDot(v,'Thumb Nail|Nail Of Manual Digit 1',185,414,23,30);
 alDot(v,'Triquetrum',590,850,28,22);
}
