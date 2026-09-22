/* Schematic orientation diagrams. Coordinates are illustration coordinates, not clinical placements. */
const BA_ROUTE_PATHS={
 LU:['M253 214 Q239 225 224 257 L205 317 185 382 161 428'],
 LI:['M156 450 L175 406 197 337 220 265 Q240 218 270 202 L286 179 291 165'],
 ST:['M290 148 L303 167 283 170 Q301 193 303 218 L310 288 313 357 322 430 329 506 332 579 340 623'],
 SP:['M302 629 L308 587 301 520 300 454 301 381 290 340 294 279 325 252'],
 HT:['M242 239 L230 281 215 334 199 389 182 434'],
 SI:['M184 451 L202 405 223 343 242 282 Q251 247 271 238 L279 215 287 184 280 157'],
 BL:['M290 141 Q277 96 289 79 M292 181 L287 244 288 311 290 367 285 424 281 492 278 557 274 613 258 632','M278 224 L273 290 275 350 278 389'],
 KI:['M307 622 L311 596 302 565 300 504 304 442 302 382 297 337 297 274 296 208'],
 PC:['M267 229 L235 268 215 326 190 391 166 447'],
 TE:['M178 449 L199 396 220 332 239 272 248 220 Q263 195 280 183 L280 155 Q260 139 278 122 L282 118'],
 GB:['M285 136 Q266 116 279 99 Q315 100 303 127 Q290 148 273 170 L267 196 249 219 259 275 266 335 276 380 277 456 279 515 281 581 268 625'],
 LR:['M309 629 L314 608 308 570 311 502 312 437 310 377 L313 334 310 296 326 269'],
 GV:['M300 391 L300 314 300 241 300 181 Q300 110 300 82'],
 CV:['M300 390 L300 332 300 274 300 214 300 184 300 164']
};
function baMeridianDiagram(ab){
 const back=['SI','BL','GV'].includes(ab), color={LU:'#78c9d5',LI:'#e6ac70',ST:'#eac16b',SP:'#d0b88a',HT:'#eb958b',SI:'#dfb797',BL:'#85b9dd',KI:'#a7acdf',PC:'#dd94b4',TE:'#8ecbb9',GB:'#97c695',LR:'#87c6ac',GV:'#d1bddf',CV:'#e4c184'}[ab];
 const outline='M282 175 Q270 184 250 191 Q230 194 224 221 L210 268 192 317 175 364 154 414 Q149 424 142 441 Q140 447 145 448 L152 439 149 456 Q151 463 156 456 L165 442 163 459 Q168 463 171 455 L180 432 189 414 207 378 231 330 243 283 254 255 L258 315 Q251 353 263 391 L266 454 272 521 272 588 258 622 Q254 635 268 638 L292 633 291 609 290 541 291 469 300 409 309 469 310 541 309 609 308 633 332 638 Q346 635 342 622 L328 588 328 521 334 454 337 391 Q349 353 342 315 L346 255 357 283 369 330 393 378 411 414 420 432 429 455 Q432 463 437 459 L435 442 444 456 Q449 463 451 456 L448 439 455 448 Q460 447 458 441 Q451 424 446 414 L425 364 408 317 390 268 376 221 Q370 194 350 191 Q330 184 318 175 L318 161 Q332 148 332 127 L333 104 Q328 73 300 72 Q272 73 267 104 L268 127 Q268 148 282 161 Z';
 return `<svg class="ba-body-diagram" viewBox="80 45 440 630" role="img" aria-label="${ab}: ${baT('מסלול חיצוני סכמטי','schematic external route')}"><defs><linearGradient id="body-${ab}" x1="0" x2="1"><stop stop-color="#a79e8b"/><stop offset=".48" stop-color="#eee0c3"/><stop offset="1" stop-color="#a99a84"/></linearGradient><filter id="glow-${ab}"><feGaussianBlur stdDeviation="3"/></filter></defs><path d="${outline}" fill="url(#body-${ab})" stroke="#e7d6b6" stroke-width="1.7"/><g fill="none" stroke="#807461" stroke-width="1.6" opacity=".48">${back?'<path d="M300 175V389M281 203Q247 224 278 268M319 203Q353 224 322 268M272 330Q290 344 292 378M328 330Q310 344 308 378"/>':'<path d="M279 195L295 209 300 206 305 209 321 195M300 208V278M263 244Q278 255 294 248M337 244Q322 255 306 248M276 298Q300 309 324 298M271 348Q300 357 329 348"/><circle cx="300" cy="330" r="2"/>'}<path d="M278 441Q289 452 297 442M303 442Q313 453 323 442M281 494L290 584M319 494L310 584"/></g>${BA_ROUTE_PATHS[ab].map(d=>`<path d="${d}" fill="none" stroke="${color}" stroke-width="10" opacity=".35" filter="url(#glow-${ab})"/><path d="${d}" fill="none" stroke="${color}" stroke-width="4" stroke-linecap="round"/>`).join('')}${ab==="GV"?'<g fill="none" stroke="#cabbad" stroke-width="1.6"><ellipse cx="432" cy="125" rx="28" ry="38"/><path d="M454 111L467 132L456 139V150"/><path d="M432 87Q456 90 456 119L462 133 457 143" stroke="#d1bddf" stroke-width="4"/></g><text x="432" y="189" text-anchor="middle" fill="#bed1d0" font-size="13">GV 24–28</text>':""}<text x="300" y="664" text-anchor="middle" fill="#bed1d0" font-size="14">${baT(back?'מבט אחורי · התמצאות בלבד':'מבט קדמי · התמצאות בלבד',back?'Posterior · orientation only':'Anterior · orientation only')}</text></svg>`;
}
// R/L refer to the person's feet, in plantar view. The source map supplies associations.
const BA_SOLE_MARKERS=[
 [0,205,105,'both'],[1,195,143,'both'],[2,201,64,'both'],[3,210,185,'both'],[4,223,130,'both'],[5,181,113,'both'],[6,230,84,'both'],[7,199,223,'both'],[8,148,207,'both'],[9,99,233,'both'],[10,72,290,'both'],[11,133,264,'both'],[12,190,288,'both'],[13,222,220,'both'],[14,126,318,'both'],[15,207,355,'both'],[16,209,411,'both'],[17,193,385,'left'],[18,121,362,'right'],[19,156,384,'right'],[20,171,337,'both'],[21,177,387,'both'],[22,174,424,'both'],[23,191,468,'both'],[24,211,540,'both'],[25,133,505,'both'],[26,103,545,'right'],[27,105,514,'right'],[28,81,460,'right'],[29,136,450,'both'],[30,79,473,'left'],[31,145,544,'left'],[32,205,568,'left'],[33,115,363,'left'],[34,84,411,'left'],[35,81,575,'both'],[36,112,612,'both'],[37,159,626,'both'],[38,133,653,'both']
];
const BA_TOP_MARKERS=[[39,150,440],[40,235,410],[41,248,245],[43,176,290],[44,172,354],[45,238,198],[46,231,148],[47,221,94],[48,238,223]];
const BA_INNER_MARKERS=[[24,345,283],[49,239,100],[50,202,209],[51,295,244],[52,156,109],[53,607,284],[54,492,262],[55,401,251],[56,264,289]];
const BA_OUTER_MARKERS=[[10,558,295],[35,410,289],[36,235,248],[38,250,179],[39,234,105],[42,570,266]];
function baFootDiagram(view='soles',selected=''){
 const id='baFoot-'+view,foot='M145 686 C112 685 86 662 86 628 C85 585 108 540 103 496 C100 449 64 399 59 333 C55 297 65 269 54 246 C44 220 47 201 61 197 C79 191 87 208 84 225 C91 205 71 185 84 165 C95 150 111 162 111 183 C119 160 101 139 116 122 C131 109 147 127 142 151 C153 130 141 110 153 90 C170 70 186 87 182 118 C185 88 180 54 203 40 C235 20 254 47 247 83 C242 108 234 131 237 167 C242 216 248 260 227 309 C210 347 210 387 217 426 C224 466 214 510 217 550 C222 604 225 646 195 672 C181 684 161 689 145 686Z';
 const node=(n,x,y)=>`<g role="button" tabindex="0" data-open="zone:R${n}" aria-label="R${n}: ${baEsc(baT(D.zones.find(z=>z.c==='R'+n)?.he||'',D.zones.find(z=>z.c==='R'+n)?.en||''))}" class="ba-map-node ${selected==='R'+n?'selected':''}"><circle cx="${x}" cy="${y}" r="13"/><text x="${x}" y="${y+4}" text-anchor="middle">${n}</text></g>`;
 let drawing='';
 if(view==='soles'){
 drawing=['right','left'].map((side,i)=>`<g transform="translate(${i?394:15} 15)"><path d="${foot}" ${i?'transform="translate(304 0) scale(-1 1)"':''} fill="url(#${id})" stroke="#e8c89d" stroke-width="2"/>${BA_SOLE_MARKERS.filter(m=>m[3]==='both'||m[3]===side).map(([n,x,y])=>node(n,i?304-x:x,y)).join('')}<text x="154" y="725" text-anchor="middle" fill="#bad0cb" font-size="19">${baT(side==='right'?'רגל ימין':'רגל שמאל',side==='right'?'Right foot':'Left foot')}</text></g>`).join('');
 }else if(view==='top'){
 drawing=`<g transform="translate(210 25)"><path d="${foot}" fill="url(#${id})" stroke="#e8c89d" stroke-width="2"/><g fill="none" stroke="#9f856a" opacity=".6">${[90,119,151,183,216].map((x,i)=>`<path d="M${x} ${200-i*20} Q${x+25} 360 ${153+i*4} 560"/>`).join('')}</g>${BA_TOP_MARKERS.map(m=>node(...m)).join('')}</g>`;
 }else{
 drawing=`<path d="M157 54L259 49Q254 121 286 160Q340 185 402 221L591 249Q655 242 667 273Q675 310 620 319L230 329Q158 330 147 284Q133 242 150 194Z" fill="url(#${id})" stroke="#e8c89d" stroke-width="2"/><path d="M216 170Q206 238 242 276M280 267Q424 238 600 288" fill="none" stroke="#947b61" stroke-width="3" opacity=".7"/>${(view==='inner'?BA_INNER_MARKERS:BA_OUTER_MARKERS).map(m=>node(...m)).join('')}`;
 }
 return `<svg class="ba-foot-diagram" viewBox="0 0 740 ${['inner','outer'].includes(view)?380:780}" role="group" aria-label="${baT('מפת שיוכים מסורתית של כף הרגל','Traditional foot association map')}"><defs><linearGradient id="${id}" x1="0" x2="1"><stop stop-color="#a58a6c"/><stop offset=".5" stop-color="#edce9d"/><stop offset="1" stop-color="#b59977"/></linearGradient></defs>${drawing}</svg>`;
}
