/* ================= MODELS : Lumons ================= */
function eyes(g,y,z,sep,s=.06,col='#1d1626',hl=true){for(const k of[-1,1]){tp(g,SPH,col,k*sep,y,z,s,s*1.3,s*.6,{ol:false});if(hl)tp(g,SPH,'#ffffff',k*sep+s*.3,y+s*.45,z+s*.45,s*.33,s*.33,s*.2,{ol:false})}}
const leaf=(g,c,x,y,z,w,h,rz,rx=0)=>tp(g,SPH,c,x,y,z,w,h,w*.4,{r:[rx,0,rz]});
const MODELS={
 chicorin(g){tp(g,SPH,'#f1ecd2',0,.32,0,.36,.31,.33);tp(g,SPH,'#9cc65a',0,.42,.14,.2,.15,.2);eyes(g,.4,.31,.12,.05);tp(g,SPH,'#6b5a4a',0,.33,.34,.045,.035,.035,{ol:false});
  leaf(g,'#cfe08a',-.13,.72,-.02,.08,.2,.35);leaf(g,'#cfe08a',.13,.72,-.02,.08,.2,-.35);leaf(g,'#9cc65a',0,.79,-.02,.07,.24,0);
  for(const[x,z]of[[-.18,.14],[.18,.14],[-.18,-.14],[.18,-.14]])tp(g,SPH,'#d8d0ad',x,.06,z,.09,.06,.1);tp(g,SPH,'#e2dab8',0,.3,-.34,.1,.1,.1)},
 witloof(g){for(const s of[-1,1])tp(g,SPH,'#d8d0ad',s*.18,.12,.02,.12,.13,.15);tp(g,SPH,'#ece4c2',0,.52,0,.36,.42,.32);tp(g,SPH,'#fbf6e2',0,.46,.16,.24,.3,.18,{ol:false});
  tp(g,SPH,'#ece4c2',0,.98,.02,.3,.26,.27);tp(g,SPH,'#7fb34a',0,1.03,.12,.2,.12,.18);eyes(g,1,.28,.11,.05);tp(g,SPH,'#6b5a4a',0,.92,.3,.05,.04,.04,{ol:false});
  for(let i=-2;i<=2;i++)leaf(g,i%2?'#cfe08a':'#9cc65a',i*.09,1.34,-.04,.065,.26,-i*.3);
  for(const s of[-1,1])tp(g,SPH,'#ece4c2',s*.37,.6,.06,.09,.19,.09,{r:[0,0,s*.5]});leaf(g,'#7fb34a',0,.48,-.4,.09,.32,0,-.9)},
 endivaure(g){for(const s of[-1,1]){tp(g,CYL,'#cfc38f',s*.28,.2,0,.17,.4,.17);tp(g,SPH,'#bdb07a',s*.28,.04,.06,.2,.08,.24)}
  tp(g,SPH,'#d9cf9f',0,.85,0,.62,.6,.52);tp(g,SPH,'#f0e8c4',0,.78,.26,.4,.42,.28,{ol:false});
  for(const s of[-1,1]){tp(g,SPH,'#5f9a35',s*.56,1.15,0,.3,.14,.3,{r:[0,0,s*.4]});tp(g,CYL,'#cfc38f',s*.7,.8,.1,.14,.52,.14,{r:[0,0,s*.3]});for(let c=0;c<3;c++)tp(g,CONE,'#ffffff',s*.78+(c-1)*.06,.5,.2,.035,.12,.035,{r:[PI,0,0]})}
  tp(g,SPH,'#d9cf9f',0,1.45,.14,.36,.3,.32);tp(g,SPH,'#3f7a2a',0,1.5,.27,.24,.13,.2);eyes(g,1.48,.43,.13,.05,'#1d1626',false);tp(g,SPH,'#6b5a4a',0,1.38,.46,.06,.05,.05,{ol:false});
  for(let i=-1;i<=1;i++)leaf(g,i?'#9cc65a':'#cfe08a',i*.15,1.92,.05,.1,.36,-i*.35);
  tp(g,CYL,'#7a5230',0,1.4,-.45,.07,.55,.07);tp(g,CONE,'#3f8f3a',0,1.9,-.45,.32,.62,.32);tp(g,CONE,'#4c9e3e',0,2.2,-.45,.22,.42,.22)},
 charbonnet(g){tp(g,SPH,'#55555f',0,.3,0,.34,.3,.36);tp(g,SPH,'#8a8a96',0,.26,.17,.22,.2,.2,{ol:false});
  tp(g,HEMI,'#f2c94c',0,.47,0,.3,.22,.3);tp(g,CYL,'#fff6c8',0,.58,.24,.07,.06,.07,{r:[1.2,0,0],emi:'#fff3a0'});
  for(const s of[-1,1])tp(g,BOXG,'#1d1626',s*.1,.38,.32,.07,.015,.02,{ol:false,r:[0,0,s*.25]});tp(g,SPH,'#f19aa8',0,.3,.36,.06,.045,.045);
  for(const s of[-1,1])for(let c=0;c<3;c++)tp(g,CONE,'#efe8dc',s*.2+(c-1)*.04,.06,.3,.025,.09,.025,{r:[PI/2,0,0],ol:false});
  tp(g,CYL,'#4a4a55',0,.34,-.38,.04,.32,.04,{r:[-.9,0,0]});const e=tp(g,SPH,'#ff9a3c',0,.5,-.52,.1,.1,.1,{emi:'#ff7a1a'});tp(e,SPH,'#ffd24a',0,0,.2,.55,.55,.55,{ol:false,emi:'#ffd24a'});
  return{fx:t=>{const k=1+Math.sin(t*14)*.12;e.scale.set(.1*k,.1*k*1.1,.1*k)}}},
 terrillon(g){tp(g,SPH,'#4e4e58',0,.42,0,.44,.4,.48);tp(g,SPH,'#8a8a96',0,.36,.25,.28,.26,.22,{ol:false});
  tp(g,HEMI,'#f2c94c',0,.68,.12,.3,.22,.3);tp(g,CYL,'#fff6c8',0,.8,.37,.09,.07,.09,{r:[1.2,0,0],emi:'#fff3a0'});
  for(const s of[-1,1])tp(g,BOXG,'#1d1626',s*.12,.56,.42,.09,.02,.02,{ol:false,r:[0,0,s*.3]});tp(g,SPH,'#f19aa8',0,.46,.48,.07,.05,.05);
  const lumps=[[-.2,.75,-.2],[.15,.8,-.25],[0,.7,-.4],[.25,.62,-.1],[-.27,.6,-.05]];lumps.forEach(([x,y,z],i)=>{tp(g,DOD,'#2b2b30',x,y,z,.13,.13,.13,{r:[i,i*2,0]});tp(g,SPH,'#ff7a1a',x,y+.1,z+.05,.03,.03,.03,{ol:false,emi:'#ff7a1a'})});
  for(const s of[-1,1]){tp(g,SPH,'#4e4e58',s*.38,.18,.25,.12,.09,.14);for(let c=0;c<3;c++)tp(g,CONE,'#efe8dc',s*.38+(c-1)*.05,.12,.4,.03,.12,.03,{r:[PI/2,0,0],ol:false})}
  tp(g,CYL,'#3e3e48',0,.45,-.52,.06,.4,.06,{r:[-.9,0,0]});const e=tp(g,SPH,'#ff8a2c',0,.66,-.72,.15,.15,.15,{emi:'#ff6a1a'});
  return{fx:t=>{const k=1+Math.sin(t*12)*.14;e.scale.set(.15*k,.17*k,.15*k)}}},
 hautfourno(g){for(const s of[-1,1])tp(g,CYL,'#3e3e48',s*.3,.22,0,.18,.44,.18);tp(g,SPH,'#4a4a52',0,.95,0,.62,.68,.56);tp(g,SPH,'#7e7e8a',0,.88,.3,.4,.46,.3,{ol:false});
  for(let k=0;k<4;k++)tp(g,BOXG,'#ff7a1a',(k-1.5)*.14,.95+((k%2)*.15),.53,.04,.2,.02,{ol:false,emi:'#ff7a1a',r:[0,0,.3*(k%2?1:-1)]});
  tp(g,SPH,'#4a4a52',0,1.62,.12,.34,.28,.3);tp(g,HEMI,'#f2c94c',0,1.72,.1,.36,.24,.36);tp(g,CYL,'#fff6c8',0,1.82,.4,.1,.08,.1,{r:[1.2,0,0],emi:'#fff3a0'});
  eyes(g,1.6,.4,.13,.05,'#ff9a3c',false);tp(g,SPH,'#f19aa8',0,1.52,.43,.07,.05,.05);
  for(const s of[-1,1]){tp(g,CYL,'#4a4a52',s*.72,.95,.1,.16,.6,.16,{r:[0,0,s*.35]});for(let c=0;c<3;c++)tp(g,CONE,'#efe8dc',s*.86+(c-1)*.07,.6,.2,.04,.16,.04,{r:[PI,0,0],ol:false})}
  tp(g,CYL,'#a95a3a',0,1.5,-.5,.2,.9,.2);tp(g,CYL,'#7a3a2a',0,1.97,-.5,.25,.08,.25);const f=tp(g,SPH,'#ff7a1a',0,2.12,-.5,.17,.22,.17,{emi:'#ff5a10'});tp(f,SPH,'#ffd24a',0,.2,0,.6,.6,.6,{ol:false,emi:'#ffd24a'});
  return{fx:t=>{const k=1+Math.sin(t*10)*.15;f.scale.set(.17*k,.24*k,.17*k)}}},
 moulinet(g){tp(g,SPH,'#8fd3f0',0,.24,.03,.32,.24,.3);tp(g,SPH,'#2b3550',0,.36,-.06,.36,.24,.34,{r:[.3,0,0]});eyes(g,.26,.31,.11,.055);
  tp(g,TOR,'#1d2a3a',0,.15,.31,.03,.02,.02,{ol:false,r:[0,0,PI]});for(const s of[-1,1])tp(g,SPH,'#6cbde0',s*.13,.04,.16,.08,.05,.08);
  for(let k=0;k<3;k++)tp(g,TOR,'#4a5a85',0,.38,-.06,.25-k*.07,.25-k*.07,.25,{ol:false,r:[PI/2+.3,0,0]})},
 moulefrit(g){tp(g,SPH,'#8fd3f0',0,.4,.03,.38,.36,.34);tp(g,SPH,'#c9ecfa',0,.34,.22,.22,.22,.16,{ol:false});tp(g,SPH,'#2b3550',0,.62,-.04,.4,.24,.37,{r:[.25,0,0]});eyes(g,.48,.33,.12,.06);
  for(const s of[-1,1]){tp(g,SPH,'#2b3550',s*.43,.4,.06,.1,.26,.2,{r:[0,0,s*.35]});tp(g,SPH,'#6cbde0',s*.15,.06,.12,.1,.07,.11)}
  for(let k=-1;k<=1;k++)tp(g,BOXG,'#f2c14e',k*.1,.92,-.02,.05,.28,.05,{r:[0,0,-k*.35]})},
 krakamoule(g){tp(g,SPH,'#6cbde0',0,.85,0,.6,.55,.55);tp(g,SPH,'#c9ecfa',0,.75,.3,.36,.34,.25,{ol:false});
  for(let k=0;k<6;k++){const a=k/6*PI*2+.3;tp(g,CYL,'#4fa3c8',Math.cos(a)*.45,.25,Math.sin(a)*.45,.09,.55,.09,{r:[Math.sin(a)*.6,0,-Math.cos(a)*.6]});tp(g,SPH,'#4fa3c8',Math.cos(a)*.62,.04,Math.sin(a)*.62,.1,.06,.1)}
  [[0,1.25,-.15,.48],[-.4,1.0,-.3,.32],[.4,1.0,-.3,.32]].forEach(([x,y,z,s])=>tp(g,SPH,'#1f2a44',x,y,z,s,s*.5,s*.9,{r:[.4,0,0]}));
  for(let k=-2;k<=2;k++)tp(g,CONE,'#f6c80f',k*.12,1.5,.05,.05,.18,.05);eyes(g,.92,.52,.15,.06,'#1d1626',true);
  for(const s of[-1,1]){tp(g,SPH,'#1f2a44',s*.72,.95,.25,.12,.25,.22,{r:[0,0,s*.5]});tp(g,SPH,'#1f2a44',s*.8,1.15,.35,.12,.2,.2,{r:[0,0,-s*.4]})}},
 gaufrelin(g){tp(g,BOXG,'#e2b060',0,.36,0,.52,.5,.22);for(const v of[-.09,.09]){tp(g,BOXG,'#c08a3a',v,.36,.112,.03,.46,.01,{ol:false});tp(g,BOXG,'#c08a3a',0,.36+v,.112,.48,.03,.01,{ol:false})}
  for(const[x,y]of[[-.2,.62],[0,.63],[.2,.62],[-.12,.6],[.12,.6]])tp(g,SPH,'#ffffff',x,y,.04,.04,.04,.04,{ol:false});
  eyes(g,.42,.12,.12,.045);tp(g,TOR,'#5a3a1a',0,.27,.115,.04,.025,.02,{ol:false,r:[0,0,PI]});
  for(const s of[-1,1]){tp(g,SPH,'#c08a3a',s*.13,.06,.03,.07,.06,.08);tp(g,SPH,'#e2b060',s*.3,.36,0,.05,.09,.05)}},
 pigeolet(g){tp(g,SPH,'#9aa0ab',0,.33,0,.24,.24,.3);tp(g,SPH,'#d9dbe0',0,.3,.13,.16,.16,.15,{ol:false});tp(g,SPH,'#4fae8a',0,.48,.07,.18,.07,.18,{ol:false});
  tp(g,SPH,'#8a909b',0,.6,.12,.16,.16,.16);tp(g,CONE,'#e8a24a',0,.58,.3,.035,.09,.035,{r:[PI/2,0,0]});eyes(g,.63,.25,.08,.03,'#e05a1a');
  for(const s of[-1,1]){tp(g,SPH,'#7d838e',s*.24,.35,-.02,.06,.16,.24);tp(g,CYL,'#e8a24a',s*.08,.07,.02,.018,.14,.018)}tp(g,BOXG,'#6a707a',0,.3,-.33,.17,.04,.17,{r:[-.3,0,0]})},
 terrilou(g){tp(g,CONE,'#3d3833',0,.33,0,.34,.62,.34,{th:.03});tp(g,SPH,'#5fae45',0,.64,0,.09,.07,.09);for(let k=0;k<3;k++)tp(g,CONE,'#4b9e36',(k-1)*.05,.72,0,.025,.12,.025,{ol:false});
  eyes(g,.32,.22,.09,.045);tp(g,TOR,'#1d1626',0,.22,.25,.035,.02,.02,{ol:false,r:[0,0,PI]});for(const s of[-1,1])tp(g,SPH,'#2b2622',s*.16,.05,.08,.09,.06,.11);
  for(const[x,y,z]of[[-.2,.18,.16],[.18,.25,.15],[.05,.12,.25]])tp(g,DOD,'#5a524a',x,y,z,.05,.05,.05,{ol:false})},
 laikamobile(g){const BK='#1d1a20',TN='#b8642a',WH='#f4efe6';
  tp(g,SPH,BK,0,.34,-.02,.27,.24,.36);tp(g,SPH,WH,0,.36,.25,.15,.16,.1,{ol:false});
  for(const[x,z]of[[-.15,.18],[.15,.18],[-.15,-.2],[.15,-.2]]){tp(g,CYL,BK,x,.16,z,.07,.22,.07);tp(g,SPH,TN,x,.05,z+.03,.08,.05,.1)}
  const h=new THREE.Group();h.position.set(0,.62,.24);g.add(h);tp(h,SPH,BK,0,0,0,.24,.22,.22);tp(h,SPH,TN,0,-.07,.19,.13,.1,.12);tp(h,SPH,'#111',0,-.03,.3,.05,.035,.035,{ol:false});
  tp(h,SPH,WH,0,.1,.17,.04,.11,.03,{ol:false,r:[.3,0,0]});for(const s of[-1,1]){tp(h,SPH,TN,s*.09,.07,.19,.035,.02,.02,{ol:false});tp(h,SPH,BK,s*.2,-.02,-.02,.07,.16,.1,{r:[0,0,s*.35]})}
  eyes(h,.02,.19,.09,.045);tp(h,SPH,'#ff7a9a',0,-.14,.24,.04,.03,.04,{ol:false});
  const tl=new THREE.Group();tl.position.set(0,.42,-.34);g.add(tl);tp(tl,SPH,BK,0,.08,-.04,.05,.14,.05,{r:[-.6,0,0]});tp(tl,SPH,WH,0,.18,-.1,.04,.04,.04,{ol:false});
  return{fx:t=>{tl.rotation.y=Math.sin(t*13)*.7;h.rotation.z=Math.sin(t*1.7)*.06}}},
 laikador(g){const BK='#1d1a20',TN='#b8642a',WH='#f4efe6';
  tp(g,SPH,BK,0,.55,-.04,.36,.33,.52);tp(g,SPH,WH,0,.58,.36,.2,.22,.12,{ol:false});
  for(const[x,z]of[[-.2,.28],[.2,.28],[-.2,-.3],[.2,-.3]]){tp(g,CYL,BK,x,.24,z,.1,.38,.1);tp(g,SPH,TN,x,.06,z+.03,.12,.07,.14);tp(g,SPH,BK,x,.38,z,.13,.15,.15)}
  for(let k=0;k<9;k++){const a=k/9*PI*2;tp(g,SPH,k%3===1?TN:BK,Math.cos(a)*.26,.82+Math.sin(a)*.12,.3+Math.sin(a)*.05,.13,.13,.12)}
  const h=new THREE.Group();h.position.set(0,1.02,.46);g.add(h);tp(h,SPH,BK,0,0,0,.27,.24,.25);tp(h,SPH,TN,0,-.08,.21,.16,.12,.15);tp(h,SPH,'#111',0,-.03,.34,.06,.04,.04,{ol:false});
  tp(h,SPH,WH,0,.11,.2,.045,.12,.03,{ol:false,r:[.3,0,0]});for(const s of[-1,1]){tp(h,SPH,TN,s*.1,.08,.21,.04,.022,.02,{ol:false});tp(h,SPH,BK,s*.22,.04,-.02,.08,.15,.1,{r:[0,0,s*.25]})}
  eyes(h,.03,.21,.1,.045,'#2a1406');tp(h,BOXG,'#f4efe6',-.05,-.16,.27,.03,.05,.02,{ol:false});tp(h,BOXG,'#f4efe6',.05,-.16,.27,.03,.05,.02,{ol:false});
  const tl=new THREE.Group();tl.position.set(0,.72,-.5);g.add(tl);tp(tl,SPH,BK,0,.1,-.08,.09,.22,.09,{r:[-.7,0,0]});tp(tl,SPH,WH,0,.25,-.18,.07,.07,.07,{ol:false});
  return{fx:t=>{tl.rotation.y=Math.sin(t*8)*.5;h.rotation.x=Math.sin(t*1.3)*.04}}},
 cerbiscuit(g){const BK='#17141b',TN='#b8642a',WH='#f4efe6';
  tp(g,SPH,BK,0,.78,-.06,.36,.36,.72);tp(g,SPH,BK,0,.86,.36,.4,.38,.3);tp(g,SPH,WH,0,.8,.56,.2,.26,.12,{ol:false});
  for(const[x,z]of[[-.24,.42],[.24,.42],[-.24,-.46],[.24,-.46]]){tp(g,CYL,BK,x,.32,z,.1,.56,.1);tp(g,SPH,TN,x,.07,z+.04,.13,.07,.16);tp(g,SPH,BK,x,.55,z,.15,.19,.17);for(const c of[-1,0,1])tp(g,CONE,'#e8e2d8',x+c*.06,.03,z+.2,.025,.06,.025,{ol:false,r:[PI/2,0,0]})}
  for(let k=0;k<7;k++)tp(g,CONE,'#7a3a9a',0,1.16-k*.05,.2-k*.16,.1,.42-k*.03,.1,{emi:'#4a0a6a',r:[-.45,0,0]});
  for(let k=0;k<10;k++){const a=k/10*PI*2;tp(g,SPH,k%4===1?TN:BK,Math.cos(a)*.34,1.04+Math.sin(a)*.12,.4+Math.sin(a)*.05,.13,.14,.12)}
  const heads=[];for(const[x,y,z,ry]of[[0,1.42,.62,0],[-.46,1.22,.5,-.5],[.46,1.22,.5,.5]]){const h=new THREE.Group();h.position.set(x,y,z);h.rotation.y=ry;g.add(h);heads.push(h);
   tp(h,SPH,BK,0,0,0,.27,.24,.25);tp(h,SPH,TN,0,-.08,.21,.16,.12,.16);tp(h,SPH,'#111',0,-.03,.35,.06,.04,.04,{ol:false});tp(h,SPH,WH,0,.11,.2,.045,.12,.03,{ol:false,r:[.3,0,0]});
   for(const s of[-1,1]){tp(h,SPH,'#ff2a3a',s*.1,.03,.21,.045,.04,.02,{ol:false,emi:'#ff1020'});tp(h,SPH,TN,s*.1,.09,.21,.04,.02,.02,{ol:false});tp(h,CONE,BK,s*.16,.24,-.02,.07,.16,.07,{r:[0,0,-s*.35]})}
   tp(h,BOXG,'#f4efe6',-.06,-.17,.28,.035,.07,.02,{ol:false});tp(h,BOXG,'#f4efe6',.06,-.17,.28,.035,.07,.02,{ol:false});
   tp(h,TOR,'#1c1820',0,-.22,-.02,.2,.2,.12,{r:[PI/2.2,0,0],ol:false});for(let k=0;k<5;k++){const a=-1+k*.5;tp(h,CONE,'#d8dce4',Math.sin(a)*.2,-.22,-.02+Math.cos(a)*.09,.025,.07,.025,{ol:false,r:[PI/2,0,a]})}}
  const tl=new THREE.Group();tl.position.set(0,.9,-.72);g.add(tl);tp(tl,SPH,BK,0,.12,-.1,.12,.3,.12,{r:[-.7,0,0]});tp(tl,SPH,'#5a2a6a',0,.33,-.24,.09,.09,.09,{emi:'#3a0a4a'});
  heads.forEach(h=>h.userData.y=h.position.y);return{fx:t=>{tl.rotation.y=Math.sin(t*5)*.4;heads.forEach((h,i)=>{h.position.y=h.userData.y+Math.sin(t*2+i*2.1)*.025;h.rotation.z=Math.sin(t*1.5+i)*.06})}}},
 givrale(g){const W='#d6eef8',D='#2a2a44',I='#9fe8ff';tp(g,SPH,W,0,.62,-.05,.32,.3,.55,{op:.92});tp(g,SPH,'#eaf6fc',0,.6,.3,.2,.22,.14,{ol:false,op:.9});
  for(const[x,z]of[[-.18,.32],[.18,.32],[-.18,-.36],[.18,-.36]]){tp(g,CYL,W,x,.27,z,.08,.45,.08,{op:.92});tp(g,SPH,'#bfe0f0',x,.06,z+.04,.1,.05,.12,{op:.9})}
  for(let k=0;k<10;k++){const a=k/10*PI*2;tp(g,SPH,D,Math.cos(a)*.24,.86+Math.sin(a)*.12,.32,.12,.12,.11)}for(let k=0;k<5;k++)tp(g,CONE,I,0,.95-k*.03,.05-k*.15,.05,.2,.05,{emi:'#4ab8e8',r:[-.5,0,0]});
  const h=new THREE.Group();h.position.set(0,1.0,.48);g.add(h);tp(h,SPH,W,0,0,0,.22,.2,.24,{op:.95});tp(h,CONE,W,0,-.05,.26,.1,.22,.1,{r:[PI/2,0,0]});tp(h,SPH,'#111',0,-.05,.38,.04,.03,.03,{ol:false});
  for(const s2 of[-1,1]){tp(h,CONE,D,s2*.13,.22,-.04,.06,.16,.05,{r:[0,0,-s2*.3]});tp(h,SPH,'#7fe8ff',s2*.09,.04,.18,.04,.025,.02,{ol:false,emi:'#3ad8ff'})}
  const tl=new THREE.Group();tl.position.set(0,.7,-.55);g.add(tl);for(let k=0;k<4;k++)tp(tl,SPH,W,0,.05*k,-.12*k,.12-k*.02,.12-k*.02,.14,{op:.85-k*.18,ol:false});
  return{fx:t=>{g.position.y=Math.sin(t*1.6)*.04;tl.rotation.y=Math.sin(t*3)*.4;h.rotation.x=Math.sin(t*.9)*.05}}},
 noctiluce(g){const B='#3a2a5a',Wc='#5a3a8a',L='#7fffd0';const body=new THREE.Group();body.position.y=.75;g.add(body);tp(body,SPH,B,0,0,0,.16,.16,.3);tp(body,SPH,'#4a3a6a',0,.02,-.32,.12,.12,.2);
  tp(body,SPH,B,0,.05,.28,.14,.13,.13);for(const s2 of[-1,1]){tp(body,SPH,L,s2*.08,.08,.36,.05,.05,.04,{ol:false,emi:'#3affc0'});tp(body,CONE,'#c9b8ef',s2*.06,.2,.36,.02,.25,.02,{r:[.4,0,s2*.5]})}
  const wings=[];for(const[s2,y,sc]of[[-1,.05,1],[1,.05,1],[-1,-.08,.7],[1,-.08,.7]]){const w=new THREE.Group();w.position.set(s2*.1,y,0);body.add(w);tp(w,SPH,Wc,s2*.38*sc,0,0,.38*sc,.03,.28*sc,{op:.9});
   tp(w,SPH,L,s2*.45*sc,.02,.05,.08*sc,.02,.08*sc,{ol:false,emi:'#3affc0'});tp(w,SPH,'#ff8ae0',s2*.25*sc,.02,-.08,.05*sc,.02,.05*sc,{ol:false,emi:'#c040a0'});w.userData.s=s2;wings.push(w)}
  return{fx:t=>{body.position.y=.75+Math.sin(t*2.2)*.08;wings.forEach((w,i)=>w.rotation.z=w.userData.s*(.25+Math.sin(t*9+(i>1?.6:0))*.45))}}},
 krakapitaine(g){const C='#8a2a4a',Cl='#b84a6a';tp(g,SPH,C,0,.85,0,.42,.45,.4);tp(g,SPH,Cl,0,.7,.25,.28,.22,.18,{ol:false});
  tp(g,SPH,'#ffffff',-.14,.9,.33,.08,.09,.04,{ol:false});tp(g,SPH,'#111',-.13,.89,.37,.035,.045,.02,{ol:false});tp(g,SPH,'#111',.14,.9,.36,.09,.08,.03,{ol:false});tp(g,TOR,'#111',0,.95,.05,.42,.42,.42,{r:[.2,0,-.3],ol:false});
  tp(g,TOR,'#f6c80f',.4,.78,.05,.05,.05,.05,{ol:false,emi:'#8a6a00'});
  tp(g,CYL,'#1a1418',0,1.3,-.02,.4,.12,.36);tp(g,CYL,'#1a1418',0,1.24,-.02,.5,.04,.46);tp(g,TOR,'#f6c80f',0,1.24,-.02,.48,.48,.03,{r:[PI/2,0,0],ol:false});tp(g,SPH,'#ffffff',0,1.32,.33,.07,.07,.02,{ol:false});
  const ten=[];for(let k=0;k<8;k++){const a=k/8*PI*2,t=new THREE.Group();t.position.set(Math.cos(a)*.26,.45,Math.sin(a)*.26);t.rotation.y=-a;g.add(t);for(let j=0;j<4;j++)tp(t,SPH,j%2?Cl:C,.08+j*.12,-.12-j*.07,0,.09-j*.015,.08-j*.012,.09-j*.015);ten.push(t)}
  return{fx:t=>{ten.forEach((q,i)=>q.rotation.z=Math.sin(t*3+i)*.25);g.position.y=Math.sin(t*1.4)*.03}}},
 scorion(g){tp(g,DOD,'#4a4440',0,.36,0,.36,.32,.34,{th:.03});for(const[x,y,z,r]of[[-.15,.5,.2,.3],[.18,.32,.26,-.4],[0,.2,.3,.1],[.25,.5,0,1]])tp(g,BOXG,'#ff8a2c',x,y,z,.025,.16,.02,{ol:false,emi:'#ff6a10',r:[0,0,r]});
  tp(g,DOD,'#3a3430',.22,.62,-.05,.12,.12,.12);tp(g,DOD,'#3a3430',-.2,.6,-.1,.1,.1,.1);eyes(g,.42,.3,.1,.05,'#ffd24a',false);for(const s of[-1,1])tp(g,DOD,'#4a4440',s*.36,.25,.08,.1,.1,.1)},
 hannetonne(g){for(const s of[-1,1])tp(g,SPH,'#8a4a22',s*.11,.3,-.03,.13,.17,.28);tp(g,SPH,'#2b2220',0,.33,.22,.17,.13,.12);tp(g,SPH,'#2b2220',0,.32,.33,.1,.09,.08);
  eyes(g,.35,.4,.06,.025,'#ffffff',false);
  for(const s of[-1,1]){tp(g,CYL,'#2b2220',s*.06,.46,.38,.012,.16,.012,{r:[.5,0,-s*.4],ol:false});for(let f=0;f<3;f++)tp(g,SPH,'#5a3a1a',s*(.11+f*.012),.54,.44+f*.02,.03,.012,.04,{ol:false});
   for(let l=0;l<3;l++)tp(g,CYL,'#2b2220',s*.2,.12,.15-l*.15,.015,.22,.015,{r:[0,0,s*.9],ol:false})}}
};
const MSCALE={givrale:.78,noctiluce:.85,krakapitaine:.8,laikamobile:1.05,laikador:.82,cerbiscuit:.66,sambrax:.8,chicorin:1,charbonnet:1,moulinet:1.05,witloof:.9,terrillon:.9,moulefrit:.92,endivaure:.75,hautfourno:.72,krakamoule:.78,gaufrelin:1,pigeolet:1.05,hannetonne:1.1,terrilou:1.05,scorion:1};
function monModel(sp,form){const g=new THREE.Group(),inner=new THREE.Group();g.add(inner);let ex={};try{ex=(MODELS[sp]||(gg=>genModel(gg,SP[sp].G)))(inner)||{}}catch(e){console.error('monModel',sp,e);while(inner.children.length)inner.remove(inner.children[0]);try{ex=genModel(inner,sanitizeSpecies({G:{}}).G)||{}}catch(e2){ex={}}}const r={g,inner,kind:'m',sp,form,...ex};if(ex.fx)ANIMS.add(r);if(form)addAura(r,form);else if(SP[sp]&&SP[sp].epic)addAura(r,SP[sp].t[0]);return r}
function disposeModel(r){if(r){ANIMS.delete(r);r.g.parent&&r.g.parent.remove(r.g)}}
