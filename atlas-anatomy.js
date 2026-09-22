'use strict';
// Coordinate-matched teaching drawings. These are schematic projections, not scans.
let anLayer='combined';
const AN_VIEWS=['handPalm','handBack','footMedial','footLateral','face','hip'];
const anBaseGeometry=adGeometry;
function anBone(x1,y1,x2,y2,r=16,tag='bone'){
 const dx=x2-x1,dy=y2-y1,len=Math.hypot(dx,dy),nx=-dy/len,ny=dx/len;
 const a=(x,y,k)=>`${(x+nx*r*k).toFixed(1)} ${(y+ny*r*k).toFixed(1)}`;
 return `<path class="an-bone" data-an-part="${tag}" d="M${a(x1,y1,1)} Q${x1-dx*.07} ${y1-dy*.07} ${a(x1,y1,-1)} Q${a((x1+x2)/2,(y1+y2)/2,-.48)} ${a(x2,y2,-1)} Q${x2+dx*.07} ${y2+dy*.07} ${a(x2,y2,1)} Q${a((x1+x2)/2,(y1+y2)/2,.48)} ${a(x1,y1,1)}Z"/>`;
}
function anPath(d,cls='an-bone'){return `<path class="${cls}" d="${d}"/>`;}
function anOval(x,y,rx,ry,cls='an-bone',tag='bone'){return `<ellipse class="${cls}" data-an-part="${tag}" cx="${x}" cy="${y}" rx="${rx}" ry="${ry}"/>`;}
adGeometry=function(view){
 const old=anBaseGeometry(view);if(!AN_VIEWS.includes(view))return old;
 let skin='',bones='',soft='',surface='',marks=old.marks;
 const mark=(x,y,he,en)=>marks.push({x,y,he,en});
 if(view==='handPalm'||view==='handBack'){
  skin=anPath('M390 945 L386 813 Q290 709 263 601 L148 447 Q126 395 179 366 Q226 345 256 403 L318 496 L310 226 Q315 166 355 166 Q394 169 397 225 L412 422 L425 144 Q431 91 474 92 Q514 98 513 150 L524 411 L538 202 Q546 158 582 161 Q623 162 624 211 L632 457 L638 320 Q644 277 678 280 Q716 282 720 325 L730 511 Q760 660 670 814 L642 945Z','an-surface');
  // Four fingers: distal, middle and proximal phalanges. The thumb has two.
  const fingers=[[355,215,285,340,439,395,782],[474,145,230,318,439,466,795],[582,208,285,353,439,531,795],[678,323,361,396,441,611,778]];
  for(const [x,tip,dip,pip,mcp,bx,by]of fingers){
   bones+=anBone(x,tip,x,dip-8,14,'phalanx')+anBone(x,dip+8,x,pip-8,17,'phalanx')+anBone(x,pip+8,x,mcp-7,20,'phalanx')+anBone(x,mcp+20,bx,by,22,'metacarpal');
   for(const y of [dip,pip,mcp])surface+=anPath(`M${x-24} ${y} Q${x} ${y+8} ${x+24} ${y}`,'an-fold');
   soft+=anPath(`M${bx} ${by+8} Q${x-5} 587 ${x} ${mcp} L${x} ${tip+10}`,'an-tendon');
  }
  bones+=anBone(187,409,221,457,18,'phalanx')+anBone(234,475,280,548,21,'phalanx')+anBone(294,570,407,772,24,'metacarpal');
  [[417,803,25,20],[465,808,24,20],[516,808,24,20],[568,803,22,20],[430,850,30,20],[498,858,29,22],[590,850,28,22],[617,858,15,18]].forEach(([x,y,rx,ry])=>bones+=anOval(x,y,rx,ry,'an-bone','carpal'));
  bones+=anBone(437,904,424,974,29,'radius')+anBone(602,905,615,974,23,'ulna');
  soft+=anPath('M305 581 Q279 659 393 781 Q427 710 340 599Z','an-muscle')+anPath('M646 539 Q720 619 644 779 Q592 719 646 539Z','an-muscle');
  soft+=anPath('M189 415 L284 556 Q359 663 407 782','an-tendon')+anPath('M434 727 L448 915 M477 724 L486 917 M522 737 L523 917 M565 743 L558 917','an-tendon');
  surface+=anPath('M392 880 Q502 861 640 880','an-fold');
  if(view==='handBack'){
   [[355,205],[474,135],[582,200],[678,315]].forEach(([x,y])=>surface+=`<rect class="an-nail" x="${x-20}" y="${y-16}" width="40" height="47" rx="11"/><path class="an-nail-rim" d="M${x-18} ${y+30} Q${x} ${y+21} ${x+18} ${y+30}"/>`);
   surface+=`<ellipse class="an-nail" cx="185" cy="414" rx="18" ry="29" transform="rotate(-38 185 414)"/>`;
  }else surface+=anPath('M337 473 Q353 569 307 643 Q308 703 395 755 M393 771 Q501 618 639 559 M381 565 Q530 508 718 501 M418 474 Q545 458 630 479','an-fold');
  // Palmar right-hand view is reflected together with points and landmark registry.
  const mirror=view==='handPalm'?' transform="translate(1000 0) scale(-1 1)"':'';
  const wrap=s=>`<g${mirror}>${s}</g>`;
  skin=wrap(skin);bones=wrap(bones);soft=wrap(soft);surface=wrap(surface);
  mark(view==='handPalm'?484:516,808,'עצמות שורש כף היד · היטל','Carpal bones · projection');
 }else if(view==='footMedial'||view==='footLateral'){
  skin=anPath('M224 173 L388 173 Q401 356 432 455 Q469 533 649 574 L812 606 Q877 599 892 646 Q902 692 853 716 L620 760 Q462 771 362 790 Q253 833 174 781 Q125 739 169 661 Q224 571 215 457Z','an-surface');
  bones+=anPath('M278 167 L361 167 L369 381 Q394 405 348 474 Q326 496 293 466 L277 436 Q309 313 278 167Z');
  bones+=anPath('M290 492 Q336 463 380 495 L422 547 Q400 583 342 591 L297 572Z');
  bones+=anPath('M210 621 Q272 589 341 590 Q389 603 400 656 L359 739 Q291 784 207 763 Q169 741 189 680Z');
  bones+=anOval(315,430,29,36,'an-joint');
  if(view==='footMedial'){
   bones+=anPath('M430 550 Q474 530 501 559 L508 593 Q475 614 438 595Z')+anPath('M518 587 L556 608 L565 647 L529 653 L510 617Z');
   bones+=anBone(571,651,715,680,21,'metatarsal')+anBone(753,682,803,673,22,'phalanx')+anBone(817,671,861,661,21,'phalanx');
   soft+=anPath('M285 186 Q278 359 275 456 Q260 515 323 548 Q405 575 475 575','an-tendon')+anPath('M394 240 Q403 446 480 580 L553 633','an-tendon');
   mark(348,520,'עצם הערקום','Talus');mark(277,712,'עצם העקב','Calcaneus');
  }else{
   bones+=anPath('M426 544 Q454 531 486 552 L494 593 Q460 609 427 596Z');
   bones+=anBone(540,650,714,684,20,'metatarsal')+anBone(761,679,795,668,15,'phalanx')+anBone(808,666,829,661,12,'phalanx')+anBone(841,657,868,650,11,'phalanx');
   soft+=anPath('M282 182 Q282 336 277 427 Q259 489 343 547 Q428 606 540 650','an-tendon');
   mark(455,575,'עצם הקובייה','Cuboid');mark(277,712,'עצם העקב','Calcaneus');
  }
  soft+=anPath('M237 235 Q255 441 213 675 L210 727','an-tendon an-achilles')+anPath('M224 774 Q430 736 700 722','an-fascia');
  surface+=anPath('M780 626 Q797 653 803 704 M413 492 Q454 513 481 528','an-fold');
 }else if(view==='face'){
  skin=old.body.replaceAll('ad-skin','an-surface');
  bones+=anPath('M275 306 Q280 157 500 149 Q720 157 725 306 L701 416 L666 484 Q642 514 598 509 L566 548 L541 580 L459 580 L434 548 L402 509 Q358 514 334 484 L299 416Z');
  bones+=anPath('M324 631 Q355 696 414 735 Q500 786 586 735 Q645 696 676 631 L641 646 Q612 700 567 714 L433 714 Q388 700 359 646Z');
  bones+=anPath('M346 394 Q400 371 456 397 L447 448 Q397 470 345 441Z M544 397 Q600 371 654 394 L655 441 Q603 470 553 448Z','an-cavity');
  bones+=anPath('M486 466 L470 534 Q500 548 530 534 L514 466Z','an-cavity')+anOval(400,470,8,7,'an-cavity')+anOval(600,470,8,7,'an-cavity');
  bones+=anPath('M467 755 Q500 777 533 755 L530 770 Q500 786 470 770Z');
  soft+=anPath('M312 526 Q349 548 358 641 L331 666 Q302 609 312 526Z M688 526 Q651 548 642 641 L669 666 Q698 609 688 526Z','an-muscle');
  soft+=anPath('M348 710 Q412 757 453 906 L428 913 Q371 795 331 734Z M652 710 Q588 757 547 906 L572 913 Q629 795 669 734Z','an-muscle');
  soft+=anPath('M473 783 Q500 795 527 783 L523 811 L477 811Z M478 825 Q500 833 522 825 L524 841 L476 841Z','an-cartilage');
  surface=old.detail.replaceAll('ad-structure','an-fold').replaceAll('ad-bone','an-eye');
  surface+=anPath('M453 541 Q438 555 454 568 M547 541 Q562 555 546 568 M486 574 L486 614 M514 574 L514 614','an-fold');
  mark(400,470,'הנקב התת־ארובתי · היטל','Infraorbital foramen · projection');
 }else if(view==='hip'){
  skin=old.body.replaceAll('ad-skin','an-surface');
  bones+=anPath('M293 232 Q493 119 730 260 L688 292 Q664 422 596 493 Q562 550 527 566 L463 528 Q490 419 387 383 Q320 353 293 232Z');
  bones+=anPath('M599 577 Q639 583 668 624 L670 674 L633 916 L566 916 L597 680 Q583 647 558 643 L533 610 L551 584Z');
  bones+=anOval(544,569,41,43,'an-joint')+anOval(650,630,29,39);
  soft+=anPath('M309 278 Q479 190 680 282 Q630 431 556 486 Q442 408 350 415Z','an-muscle')+anPath('M296 379 Q432 391 565 510 L614 578 Q470 628 335 563 Q263 491 296 379Z','an-muscle');
  soft+=anPath('M675 317 Q727 389 671 596 L644 659 L627 855','an-tendon');
  // Sacral hiatus is a posterior reference projected onto this teaching diagram.
  surface=anPath('M270 310 L270 520','an-projection')+anOval(270,520,20,19,'an-projection')+anPath('M293 232 Q530 140 730 260','an-fold');
 }
 const showBone=anLayer!=='soft',showSoft=anLayer!=='bones';
 return {body:`<g class="an-anatomy an-${anLayer}">${skin}${showBone?`<g class="an-bones">${bones}</g>`:''}${showSoft?`<g class="an-soft">${soft}</g>`:''}${surface}</g>`,detail:'',marks};
};
