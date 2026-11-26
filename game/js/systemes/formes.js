/* ---- Silhouettes procédurales des fusions ----
   Chaque fusion a un « plan du corps » (gène plan) : quadrupede, bipede, serpent, volant, flottant ou boule (l'ancien modèle rond).
   Le plan est hérité d'un des deux parents (ou muté au Fusionneur). Les anciennes fusions sans gène plan en reçoivent un,
   déduit de leurs gènes (pattes, ailes, tentacules) : elles changent donc d'allure, mais restent reconnaissables (couleurs, tête, dos).
   genModel(g,G) est remplacé ici ; l'ancien modèle rond reste disponible (genBoule). */
const genBoule=genModel;
GOPT.plan=['quadrupede','bipede','serpent','volant','flottant','boule'];
const PLAN_N={quadrupede:'quadrupède',bipede:'bipède',serpent:'sans pattes, comme un serpent',volant:'volant',flottant:'qui flotte dans les airs',boule:'tout rond'};
// plan déduit des autres gènes (Lumons de base et anciennes fusions)
function planOf(G){if(!G)return'boule';if(GOPT.plan.includes(G.plan))return G.plan;
 if(G.side==='wings')return'volant';if(G.feet==='tentacles')return'flottant';if(G.feet==='four')return'quadrupede';if(G.feet==='two')return G.body==='blob'||G.body==='box'?'boule':'bipede';
 return G.body==='rock'||G.body==='blob'?'boule':'serpent'}
// tronc selon le gène body
function torso(g,G,R,x,y,z,sx,sy,sz,rx=0){const geo={box:BOXG,cone:CONE,rock:DOD}[G.body]||SPH,k=G.body==='tall'?[.9,1.2,.9]:G.body==='blob'?[1.1,.8,1.05]:G.body==='box'?[1.5,1.5,1.5]:G.body==='cone'?[1.05,1.6,1.05]:[1,1,1];
 const m=tp(g,geo,G.c1,x,y,z,sx*k[0],sy*k[1],sz*k[2],{r:[rx,0,0],th:G.body==='rock'||G.body==='cone'?.03:undefined});
 if(geo===SPH)tp(g,SPH,G.c2,x,y-sy*.12,z+sz*.42,sx*.62,sy*.62,sz*.5,{ol:false,r:[rx,0,0]});return m}
// tête : yeux, dessus de la tête, oreilles (centre 0,0,0, rayon R)
function headDeco(h,G,R){const top=R*.9,ey=R*.12,ez=R*.84,es=R*.19;
 if(G.eyes==='sleepy')for(const s of[-1,1])tp(h,BOXG,'#1d1626',s*R*.36,ey,ez,es*1.3,es*.3,.02,{ol:false,r:[0,0,s*.25]});
 else eyes(h,ey,ez,R*.36,es,G.eyes==='fierce'?(G.c2==='#ff8a2c'?'#ffd24a':'#ff9a3c'):'#1d1626',G.eyes!=='fierce');
 switch(G.top){case'leaves':for(let i=-1;i<=1;i++)leaf(h,i?G.c3:'#cfe08a',i*R*.36,top+R*.35,0,R*.2,R*.6,-i*.4);break;
  case'helmet':tp(h,HEMI,G.c3,0,top-R*.45,0,R*.92,R*.62,R*.92);tp(h,CYL,'#fff6c8',0,top-R*.1,R*.72,R*.2,R*.16,R*.2,{r:[1.2,0,0],emi:'#fff3a0'});break;
  case'shell':tp(h,SPH,G.c3,0,top-R*.25,-R*.15,R*1.02,R*.6,R*1,{r:[.3,0,0]});break;
  case'fries':for(let k=-1;k<=1;k++)tp(h,BOXG,'#f2c14e',k*R*.3,top+R*.3,0,R*.14,R*.8,R*.14,{r:[0,0,-k*.35]});break;
  case'grass':tp(h,SPH,G.c3,0,top,0,R*.3,R*.2,R*.3);for(let k=-1;k<=1;k++)tp(h,CONE,'#4b9e36',k*R*.15,top+R*.25,0,R*.07,R*.35,R*.07,{ol:false});break;
  case'spikes':for(let k=0;k<5;k++){const a=k/5*PI*2;tp(h,CONE,G.c3,Math.cos(a)*R*.42,top-R*.05,Math.sin(a)*R*.4,R*.15,R*.48,R*.15,{r:[Math.sin(a)*.5,0,-Math.cos(a)*.5]})}break;
  case'crown':for(let k=-2;k<=2;k++)tp(h,CONE,'#f6c80f',k*R*.28,top+R*.12,R*.1,R*.11,R*.42,R*.11);break;
  case'sugar':for(let k=0;k<6;k++)tp(h,SPH,'#ffffff',(k%3-1)*R*.42,top-R*.05,(k<3?-1:1)*R*.15,R*.11,R*.11,R*.11,{ol:false});break;
  case'antennae':for(const s of[-1,1]){tp(h,CYL,'#2b2220',s*R*.2,top+R*.2,R*.3,R*.035,R*.5,R*.035,{r:[.5,0,-s*.4],ol:false});tp(h,SPH,G.c3,s*R*.33,top+R*.45,R*.45,R*.12,R*.05,R*.14,{ol:false})}break}
 switch(G.ears){case'pointy':for(const s of[-1,1])tp(h,CONE,G.c1,s*R*.55,top,-R*.05,R*.17,R*.45,R*.12,{r:[0,0,-s*.35]});break;
  case'round':for(const s of[-1,1]){tp(h,SPH,G.c1,s*R*.66,top-R*.1,-R*.05,R*.25,R*.25,R*.1);tp(h,SPH,G.c3,s*R*.66,top-R*.1,R*.02,R*.15,R*.15,R*.05,{ol:false})}break;
  case'long':for(const s of[-1,1])tp(h,SPH,G.c1,s*R*.32,top+R*.5,-R*.1,R*.14,R*.6,R*.1,{r:[0,0,-s*.22]});break;
  case'horns':for(const s of[-1,1]){tp(h,CONE,'#efe8dc',s*R*.45,top+R*.05,R*.05,R*.1,R*.45,R*.1,{r:[.3,0,-s*.6]});tp(h,CONE,'#efe8dc',s*R*.62,top+R*.38,R*.2,R*.06,R*.25,R*.06,{r:[.9,0,-s*.3]})}break;
  case'fins':for(const s of[-1,1])tp(h,CONE,G.c2,s*R*.95,0,-R*.1,R*.08,R*.5,R*.3,{r:[0,0,-s*1.2]});break}
 // museau / bec selon le plan (donne une vraie tête d'animal)
 return h}
// motif sur le tronc
function bodyPattern(g,G,R,x,y,z,fx){switch(G.pattern){case'spots':for(let k=0;k<7;k++){const a=k*2.4,yy=y+R*(((k*37)%10)/14-.3);tp(g,SPH,G.c3,x+Math.cos(a)*R*.88,yy,z+Math.sin(a)*R*.85,R*.13,R*.13,R*.06,{ol:false})}break;
  case'stripes':for(let k=0;k<3;k++)tp(g,TOR,G.c3,x,y+R*(k-1)*.35,z,R*(.95-Math.abs(k-1)*.12),R*(.95-Math.abs(k-1)*.12),R*.07,{r:[PI/2,0,0],ol:false});break;
  case'belly':tp(g,SPH,G.c3,x,y-R*.15,z+R*.55,R*.5,R*.55,R*.3,{ol:false});break;
  case'glow':{const gl=tp(g,SPH,G.c3,x,y,z+R*.7,R*.18,R*.18,R*.08,{ol:false,emi:G.c3});fx.push(t=>gl.scale.setScalar(R*.18*(1+Math.sin(t*4)*.25)))}break}}
// dos (queue, braise, arbre, cheminée, charbon, carapace) au point (x,y,z), vers l'arrière (−z)
function backDeco(g,G,R,x,y,z,fx){switch(G.back){
  case'tail':{const tl=new THREE.Group();tl.position.set(x,y,z);g.add(tl);for(let k=0;k<4;k++)tp(tl,SPH,k===3?G.c3:G.c1,0,k*R*.18,-k*R*.28,R*(.26-k*.03),R*(.26-k*.03),R*(.3-k*.03));fx.push(t=>tl.rotation.y=Math.sin(t*3)*.35);break}
  case'ember':{tp(g,CYL,G.c1,x,y+R*.2,z-R*.1,R*.1,R*.8,R*.1,{r:[-.9,0,0]});const e=tp(g,SPH,'#ff9a3c',x,y+R*.55,z-R*.45,R*.28,R*.28,R*.28,{emi:'#ff7a1a'});fx.push(t=>e.scale.setScalar(R*.28*(1+Math.sin(t*14)*.12)));break}
  case'tree':tp(g,CYL,'#7a5230',x,y+R*.55,z,R*.14,R*1.1,R*.14);tp(g,CONE,'#3f8f3a',x,y+R*1.4,z,R*.7,R*1.3,R*.7);break;
  case'chimney':{tp(g,CYL,'#a95a3a',x,y+R*.6,z,R*.4,R*1.4,R*.4);const f=tp(g,SPH,'#ff7a1a',x,y+R*1.45,z,R*.38,R*.48,R*.38,{emi:'#ff5a10'});fx.push(t=>{const k=1+Math.sin(t*10)*.15;f.scale.set(R*.38*k,R*.5*k,R*.38*k)});break}
  case'coal':for(let k=0;k<3;k++)tp(g,DOD,'#2b2b30',x+(k-1)*R*.42,y+R*.25,z+R*.15,R*.28,R*.28,R*.28,{r:[k,k,0]});break;
  case'shellback':for(let k=-1;k<=1;k++)tp(g,SPH,G.c3,x+k*R*.5,y+R*.15,z+R*.25,R*.42,R*.24,R*.48,{r:[.5,0,0]});break}}
const LIMB=(g,col,x0,y0,z0,x1,y1,z1,r)=>{const dx=x1-x0,dy=y1-y0,dz=z1-z0,L=Math.hypot(dx,dy,dz)||1e-3,m=tp(g,CYL,col,(x0+x1)/2,(y0+y1)/2,(z0+z1)/2,r,L,r);m.quaternion.setFromUnitVectors(new V(0,1,0),new V(dx/L,dy/L,dz/L));return m};
genModel=function(g,G){const own=Object.values(SP).find(s=>s.G===G),plan=own&&!own.fusion&&!GOPT.plan.includes(G.plan)?'boule':planOf(G);if(plan==='boule')return genBoule(g,G);
 const fx=[],S0=G.size||1;let R;
 if(plan==='quadrupede'){R=.3*S0;const ty=R*1.3;
  torso(g,G,R,0,ty,0,R*.95,R*.82,R*1.35);bodyPattern(g,G,R,0,ty,0,fx);
  const legs=[];for(const[sx,sz]of[[-1,1],[1,1],[-1,-1],[1,-1]]){const lg=new THREE.Group();lg.position.set(sx*R*.55,ty-R*.35,sz*R*.78);g.add(lg);LIMB(lg,G.c1,0,0,0,0,-(ty-R*.35)+R*.12,0,R*.2);tp(lg,SPH,G.c2,0,-(ty-R*.35)+R*.1,R*.06,R*.24,R*.15,R*.3);
   if(G.side==='claws'&&sz>0)for(let c=0;c<3;c++)tp(lg,CONE,'#efe8dc',(c-1)*R*.1,-(ty-R*.35)+R*.08,R*.3,R*.05,R*.2,R*.05,{r:[PI/2,0,0],ol:false});legs.push([lg,sx*sz])}
  fx.push(t=>legs.forEach(([l,s])=>l.rotation.x=Math.sin(t*2)*.06*s));
  const hd=new THREE.Group();hd.position.set(0,ty+R*.75,R*1.3);g.add(hd);LIMB(g,G.c1,0,ty+R*.2,R*.9,0,ty+R*.6,R*1.2,R*.32);
  tp(hd,SPH,G.c1,0,0,0,R*.72,R*.68,R*.72);tp(hd,SPH,G.c2,0,-R*.22,R*.55,R*.36,R*.26,R*.3,{ol:false});tp(hd,SPH,'#2b2228',0,-R*.12,R*.8,R*.08,R*.06,R*.05,{ol:false});headDeco(hd,G,R*.72);
  fx.push(t=>{hd.rotation.y=Math.sin(t*.9)*.18;hd.rotation.x=Math.sin(t*1.3)*.06});
  if(G.side==='wings')for(const s of[-1,1])tp(g,SPH,G.c2,s*R*.9,ty+R*.55,0,R*.12,R*.45,R*.75,{r:[0,0,s*.6]});
  if(G.side==='shells')for(const s of[-1,1])tp(g,SPH,G.c3,s*R*.85,ty+R*.3,R*.6,R*.3,R*.35,R*.4);
  backDeco(g,G,R,0,ty+R*.25,-R*1.25,fx)}
 else if(plan==='bipede'){R=.27*S0;const ty=R*1.75;
  const legs=[];for(const s of[-1,1]){const lg=new THREE.Group();lg.position.set(s*R*.42,ty-R*.55,0);g.add(lg);LIMB(lg,G.c1,0,0,0,0,-(ty-R*.55)+R*.15,0,R*.22);tp(lg,SPH,G.c2,0,-(ty-R*.55)+R*.12,R*.12,R*.27,R*.17,R*.38);legs.push([lg,s])}
  fx.push(t=>legs.forEach(([l,s])=>l.rotation.x=Math.sin(t*2.2)*.05*s));
  torso(g,G,R,0,ty,0,R*.85,R*1.02,R*.75);bodyPattern(g,G,R*.85,0,ty,0,fx);
  const arms=[];if(G.side!=='wings')for(const s of[-1,1]){const am=new THREE.Group();am.position.set(s*R*.8,ty+R*.45,0);g.add(am);
   if(G.side==='shells'){tp(am,SPH,G.c3,s*R*.1,0,0,R*.32,R*.3,R*.38)}
   LIMB(am,G.c1,0,0,0,s*R*.38,-R*.7,R*.25,R*.17);
   if(G.side==='claws'){tp(am,SPH,G.c1,s*R*.4,-R*.78,R*.28,R*.24,R*.2,R*.24);for(let c=0;c<3;c++)tp(am,CONE,'#efe8dc',s*R*.4+(c-1)*R*.1,-R*.88,R*.48,R*.05,R*.22,R*.05,{r:[PI/2,0,0],ol:false})}
   else tp(am,SPH,G.c2,s*R*.4,-R*.76,R*.27,R*.17,R*.17,R*.17);arms.push([am,s])}
  fx.push(t=>arms.forEach(([a,s])=>a.rotation.z=s*(.08+Math.sin(t*2.2+s)*.08)));
  if(G.side==='wings'){const ws=[];for(const s of[-1,1]){const w=new THREE.Group();w.position.set(s*R*.4,ty+R*.5,-R*.5);g.add(w);tp(w,SPH,G.c2,s*R*.7,R*.2,0,R*.75,R*.12,R*.45,{r:[0,0,s*.4]});ws.push([w,s])}fx.push(t=>ws.forEach(([w,s])=>w.rotation.z=s*Math.sin(t*5)*.25))}
  const hd=new THREE.Group();hd.position.set(0,ty+R*1.6,R*.05);g.add(hd);tp(hd,SPH,G.c1,0,0,0,R*.78,R*.74,R*.74);tp(hd,SPH,G.c2,0,-R*.28,R*.58,R*.34,R*.24,R*.28,{ol:false});headDeco(hd,G,R*.78);
  fx.push(t=>hd.rotation.z=Math.sin(t*1.1)*.07);backDeco(g,G,R,0,ty+R*.2,-R*.7,fx)}
 else if(plan==='serpent'){R=.3*S0;const segs=[],N=6;
  for(let k=0;k<N;k++){const r=R*(.62-k*.065),s=tp(g,SPH,k%2&&G.pattern!=='none'?G.c3:G.c1,0,r*.95,-k*R*.62+R*.2,r,r*.9,r*1.05);segs.push([s,k])}
  tp(g,CONE,G.c1,0,R*.22,-N*R*.62+R*.35,R*.18,R*.6,R*.18,{r:[-PI/2,0,0]});
  const nk=[[0,R*.95,R*.55],[0,R*1.35,R*.8]];nk.forEach(([x,y,z],i)=>tp(g,SPH,G.c1,x,y,z,R*(.48-i*.06),R*(.48-i*.06),R*(.5-i*.06)));
  const hd=new THREE.Group();hd.position.set(0,R*1.85,R*1.05);g.add(hd);tp(hd,SPH,G.c1,0,0,0,R*.7,R*.6,R*.8);tp(hd,SPH,G.c2,0,-R*.2,R*.5,R*.42,R*.22,R*.4,{ol:false});headDeco(hd,G,R*.7);
  const tg=tp(hd,CYL,'#e0405a',0,-R*.22,R*.9,R*.03,R*.3,R*.03,{r:[PI/2,0,0],ol:false});
  fx.push(t=>{segs.forEach(([s,k])=>s.position.x=(Math.sin(k*1.15)*R*.5+Math.sin(t*2.4-k*.8)*R*.15)*Math.min(1,k*.5));hd.position.x=Math.sin(t*2.4+.8)*R*.12;hd.rotation.y=Math.sin(t*1.2)*.25;tg.visible=Math.sin(t*3)>.6});
  if(G.side==='wings')for(const s of[-1,1])tp(g,SPH,G.c2,s*R*.6,R*1.3,R*.5,R*.6,R*.1,R*.35,{r:[0,0,s*.5]});
  backDeco(g,G,R*.8,0,R*.7,-R*.9,fx)}
 else if(plan==='volant'){R=.26*S0;const by=R*2.4,fl=new THREE.Group();g.add(fl);
  torso(fl,G,R,0,by,0,R*.82,R*.78,R*.95);bodyPattern(fl,G,R*.8,0,by,0,fx);
  const hd=new THREE.Group();hd.position.set(0,by+R*.85,R*.6);fl.add(hd);tp(hd,SPH,G.c1,0,0,0,R*.62,R*.6,R*.62);tp(hd,CONE,'#f2b13a',0,-R*.12,R*.68,R*.14,R*.36,R*.14,{r:[PI/2,0,0]});headDeco(hd,G,R*.62);
  const ws=[];for(const s of[-1,1]){const w=new THREE.Group();w.position.set(s*R*.7,by+R*.3,0);fl.add(w);tp(w,SPH,G.c2,s*R*1.05,0,0,R*1.15,R*.1,R*.55);for(let f=0;f<3;f++)tp(w,CONE,G.c3,s*R*(1.7+f*.12),-R*.02,-R*.35+f*R*.32,R*.12,R*.5,R*.08,{r:[0,0,-s*PI/2],ol:false});ws.push([w,s])}
  for(let f=-1;f<=1;f++)tp(fl,CONE,G.c3,f*R*.22,by-R*.1,-R*1.05,R*.12,R*.7,R*.06,{r:[-1.9,f*.3,0]});
  for(const s of[-1,1]){LIMB(fl,'#d89a3a',s*R*.25,by-R*.6,0,s*R*.25,by-R*1.15,R*.1,R*.06)}
  const sh=new THREE.Mesh(new THREE.CircleGeometry(R*.9,20),new THREE.MeshBasicMaterial({color:'#000',transparent:true,opacity:.22,depthWrite:false}));sh.rotation.x=-PI/2;sh.position.y=.02;g.add(sh);
  fx.push(t=>{ws.forEach(([w,s])=>w.rotation.z=s*Math.sin(t*7)*.55);fl.position.y=Math.sin(t*2.5)*R*.22;fl.rotation.z=Math.sin(t*1.3)*.05});
  if(G.back!=='tail')backDeco(fl,G,R*.8,0,by+R*.4,-R*.7,fx)}
 else{/* flottant */R=.32*S0;const by=R*2.2,fl=new THREE.Group();g.add(fl);
  torso(fl,G,R,0,by,0,R,R*.9,R);const hd=new THREE.Group();hd.position.set(0,by,0);fl.add(hd);headDeco(hd,G,R);
  bodyPattern(fl,G,R,0,by-R*.2,0,fx);
  const ts=[];for(let k=0;k<6;k++){const a=k/6*PI*2+.3,tg=new THREE.Group();tg.position.set(Math.cos(a)*R*.55,by-R*.6,Math.sin(a)*R*.55);fl.add(tg);
   for(let j=0;j<3;j++)tp(tg,SPH,j===2?G.c3:G.c1,0,-j*R*.38,0,R*(.17-j*.03),R*.26,R*(.17-j*.03));ts.push([tg,k])}
  if(G.side==='wings')for(const s of[-1,1])tp(fl,SPH,G.c2,s*R*1.1,by+R*.2,-R*.1,R*.6,R*.1,R*.4,{r:[0,0,s*.4]});
  if(G.side==='arms'||G.side==='claws')for(const s of[-1,1])tp(fl,SPH,G.c1,s*R*1.05,by-R*.15,R*.2,R*.22,R*.4,R*.22,{r:[0,0,s*.5]});
  const sh=new THREE.Mesh(new THREE.CircleGeometry(R*.9,20),new THREE.MeshBasicMaterial({color:'#000',transparent:true,opacity:.22,depthWrite:false}));sh.rotation.x=-PI/2;sh.position.y=.02;g.add(sh);
  fx.push(t=>{fl.position.y=Math.sin(t*1.8)*R*.2;ts.forEach(([tg,k])=>{tg.rotation.x=Math.sin(t*2.5+k)*.3;tg.rotation.z=Math.cos(t*2.2+k)*.3})});
  backDeco(fl,G,R*.8,0,by+R*.3,-R*.8,fx)}
 if(G.sq&&G.sq!==1)g.scale.y=G.sq;
 return fx.length?{fx:t=>fx.forEach(f=>f(t))}:{}};
// le Lumidex décrit la silhouette
{const el=ensureLore;ensureLore=function(sp){const s=SP[sp];el(sp);if(s&&s.fusion&&s.G&&!s.planD){const p=planOf(s.G);if(p!=='boule'&&typeof s.d==='string')s.d=s.d.replace(/^([^,]+), /,`$1, ${PLAN_N[p]}, `);s.planD=1}}}
