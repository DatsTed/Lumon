const VFXT={};
function vfxTex(k){if(VFXT[k])return VFXT[k];const c=document.createElement('canvas');c.width=c.height=64;const x=c.getContext('2d');x.translate(32,32);
 const glow=(col,b=12)=>{x.shadowColor=col;x.shadowBlur=b};
 switch(k){case'flame':{const g=x.createRadialGradient(0,8,2,0,4,26);g.addColorStop(0,'#fff6b0');g.addColorStop(.4,'#ffb020');g.addColorStop(1,'rgba(255,60,0,0)');x.fillStyle=g;x.beginPath();x.moveTo(0,-28);x.quadraticCurveTo(20,0,14,16);x.quadraticCurveTo(0,30,-14,16);x.quadraticCurveTo(-20,0,0,-28);x.fill();break}
  case'drop':glow('#7fd8ff');x.fillStyle='#5ab8ff';x.beginPath();x.moveTo(0,-24);x.quadraticCurveTo(18,6,0,20);x.quadraticCurveTo(-18,6,0,-24);x.fill();x.fillStyle='rgba(255,255,255,.8)';x.beginPath();x.ellipse(-5,2,3,6,0,0,7);x.fill();break;
  case'leaf':glow('#9cff6a',8);x.fillStyle='#5fd04a';x.beginPath();x.ellipse(0,0,10,24,.6,0,7);x.fill();x.strokeStyle='#2f7a1a';x.lineWidth=2;x.beginPath();x.moveTo(-12,16);x.lineTo(12,-16);x.stroke();break;
  case'star':glow('#fff7a0',14);x.fillStyle='#fff';x.beginPath();for(let i=0;i<8;i++){const r=i%2?8:26,a=i*Math.PI/4;x.lineTo(Math.cos(a)*r,Math.sin(a)*r)}x.closePath();x.fill();break;
  case'rock':x.fillStyle='#8a7a60';x.strokeStyle='#2b2220';x.lineWidth=3;x.beginPath();[[-18,-6],[-8,-20],[12,-16],[20,0],[10,18],[-12,16]].forEach(([a,b2])=>x.lineTo(a,b2));x.closePath();x.fill();x.stroke();x.fillStyle='#a8987a';x.beginPath();x.ellipse(-4,-6,6,4,0,0,7);x.fill();break;
  case'wind':glow('#e0f0ff');x.strokeStyle='rgba(230,245,255,.95)';x.lineWidth=5;x.lineCap='round';x.beginPath();x.arc(0,0,20,0,4.4);x.stroke();x.beginPath();x.arc(0,0,10,1,5);x.stroke();break;
  case'bug':glow('#d8ff40');x.fillStyle='#c8e830';x.beginPath();x.moveTo(0,-26);x.lineTo(7,10);x.lineTo(0,22);x.lineTo(-7,10);x.closePath();x.fill();break;
  case'dust':{const g=x.createRadialGradient(0,0,2,0,0,28);g.addColorStop(0,'rgba(220,190,130,.95)');g.addColorStop(1,'rgba(160,120,70,0)');x.fillStyle=g;x.beginPath();x.arc(0,0,28,0,7);x.fill();break}
  case'spark':glow('#fff36a',14);x.strokeStyle='#fff36a';x.lineWidth=5;x.lineJoin='round';x.beginPath();x.moveTo(-6,-26);x.lineTo(6,-6);x.lineTo(-4,-2);x.lineTo(8,26);x.stroke();break;
  case'ice':glow('#bff8ff',14);x.fillStyle='rgba(200,250,255,.95)';x.beginPath();x.moveTo(0,-28);x.lineTo(9,0);x.lineTo(0,28);x.lineTo(-9,0);x.closePath();x.fill();x.strokeStyle='#fff';x.lineWidth=2;x.beginPath();x.moveTo(-20,-10);x.lineTo(20,10);x.moveTo(20,-10);x.lineTo(-20,10);x.stroke();break;
  case'ghost':{glow('#b48cff',16);const g=x.createRadialGradient(0,-4,2,0,0,24);g.addColorStop(0,'rgba(240,225,255,.95)');g.addColorStop(.5,'rgba(160,110,240,.7)');g.addColorStop(1,'rgba(90,40,180,0)');x.fillStyle=g;x.beginPath();x.arc(0,-4,20,PI,0);x.lineTo(20,18);for(let i=0;i<4;i++)x.quadraticCurveTo(15-i*10,10,10-i*10,18);x.closePath();x.fill();x.fillStyle='#2a1450';x.beginPath();x.arc(-7,-6,3,0,7);x.arc(7,-6,3,0,7);x.fill();break}
  case'dark':{const g=x.createRadialGradient(0,0,2,0,0,30);g.addColorStop(0,'rgba(255,60,90,.9)');g.addColorStop(.35,'rgba(70,20,60,.9)');g.addColorStop(1,'rgba(20,5,20,0)');x.fillStyle=g;x.beginPath();x.arc(0,0,30,0,7);x.fill();break}
  case'zz':x.fillStyle='#c8d0ff';x.font='bold 40px sans-serif';x.textAlign='center';x.textBaseline='middle';glow('#8090ff');x.fillText('Z',0,0);break;
  case'ring':{const g=x.createRadialGradient(0,0,4,0,0,30);g.addColorStop(0,'rgba(255,255,255,.9)');g.addColorStop(.4,'rgba(255,255,255,.35)');g.addColorStop(1,'rgba(255,255,255,0)');x.fillStyle=g;x.beginPath();x.arc(0,0,30,0,7);x.fill();break}
  case'bubble':glow('#d070ff');x.fillStyle='rgba(190,90,240,.85)';x.beginPath();x.arc(0,0,18,0,7);x.fill();x.fillStyle='rgba(255,255,255,.7)';x.beginPath();x.arc(-6,-6,5,0,7);x.fill();break}
 const t=new THREE.CanvasTexture(c);return VFXT[k]=t}
const TFX={Feu:'flame',Eau:'drop',Plante:'leaf',Normal:'star',Roche:'rock',Vol:'wind',Insecte:'bug',Sol:'dust',Électrik:'spark',Glace:'ice',Spectre:'ghost',Ténèbres:'dark'};
function spr(k,size,add=true){const m=new THREE.SpriteMaterial({map:vfxTex(k),transparent:true,depthWrite:false,blending:add&&k!=='rock'&&k!=='dust'?THREE.AdditiveBlending:THREE.NormalBlending});const s=new THREE.Sprite(m);s.scale.set(size,size,1);ARENA.group.add(s);return s}
async function burstAt(p,k,n=12,sp=1.4,size=.45,ms=450){const ps=[],dirs=[];for(let i=0;i<n;i++){ps.push(spr(k,size));dirs.push(new V(rnd()-.5,rnd()*.9,rnd()-.5).normalize())}
 await tween(ms,q=>ps.forEach((s,i)=>{s.position.copy(p).addScaledVector(dirs[i],q*sp);s.material.opacity=1-q;s.material.rotation=q*4+i}));ps.forEach(s=>ARENA.group.remove(s))}
async function trainerOutro(sad){const t=B.tm,P=t.P,pos=ARENA.p2.clone();if(B.fm)B.fm.g.visible=false;t.g.visible=true;t.g.position.set(pos.x+3,.12,pos.z);
 const toC=new V(B.camP.x-pos.x,0,B.camP.z-pos.z).normalize();$('bhud').classList.add('cine');
 if(OPT.anim)camGo(frontShot(pos,ARENA.p1,4.2,1.35,.5),pos.clone().setY(.95),700,0);else camHome(0);
 t.g.rotation.y=-PI/2;await tween(600,k=>{t.g.position.x=pos.x+3*(1-k);t.g.position.y=.12+Math.abs(Math.sin(k*PI*3))*.08;P.legs[0].rotation.x=Math.sin(k*20)*.6;P.legs[1].rotation.x=-Math.sin(k*20)*.6});
 P.legs.forEach(l=>l.rotation.x=0);await tween(250,k=>t.g.rotation.y=-PI/2+(Math.atan2(toC.x,toC.z)+PI/2)*k);
 let run=true;const t0=performance.now(),tears=[];
 if(sad){sfx(392,.25,'triangle',.18);setTimeout(()=>sfx(330,.3,'triangle',.18),250);setTimeout(()=>sfx(262,.5,'triangle',.18),550)}
 else{sfx(784,.1);sfx(1046,.2)}
 (function f(){if(!run){P.head.rotation.x=0;P.body.rotation.x=0;P.body.position.y=.42;t.g.rotation.z=0;P.arms.forEach(a=>{a.rotation.x=0;a.rotation.z=a===P.arms[0]?-.12:.12});t.g.position.y=.12;tears.forEach(x=>ARENA.group.remove(x));return}
  const e=(performance.now()-t0)/1000;
  if(sad){const sob=Math.sin(e*14)*.04;P.head.rotation.x=.55+sob;P.body.rotation.x=.18;P.body.position.y=.38+Math.abs(Math.sin(e*7))*.015;
   const rub=Math.sin(e*9)*.35;P.arms[0].rotation.x=-1.1+rub;P.arms[1].rotation.x=-1.1-rub;P.arms[0].rotation.z=.5;P.arms[1].rotation.z=-.5;t.g.rotation.z=Math.sin(e*3)*.05;
   if(tears.length<10&&Math.random()<.12){const d=spr('drop',.16);d.position.copy(t.g.position).add(new V((Math.random()-.5)*.35,1.75,.25));d.userData.v=0;tears.push(d)}
   tears.forEach(d=>{d.userData.v+=.004;d.position.y-=d.userData.v;if(d.position.y<.2){d.position.copy(t.g.position).add(new V((Math.random()-.5)*.35,1.75,.25));d.userData.v=0}})}
  else{t.g.position.y=.12+Math.abs(Math.sin(e*8))*.25;P.arms.forEach((a,i)=>{a.rotation.x=-2.6;a.rotation.z=(i?-1:1)*(.3+Math.sin(e*16)*.2)})}
  requestAnimationFrame(f)})();
 await sleep(500);return()=>{run=false}}
let SHK=0;function camShake(ms=260,amp=.12){return tween(ms,q=>{SHK=(1-q)*amp}).then(()=>{SHK=0})}
function camGo(p,l,ms,vo){const fp=camera.position.clone(),fl=camL.clone(),v0=B&&B.vo!=null?B.vo:0;return tween(ms,k=>{const e=ease(k);camera.position.lerpVectors(fp,p,e);camL.lerpVectors(fl,l,e);camera.lookAt(camL);if(vo!=null)setVO(v0+(vo-v0)*e)})}
function camHome(ms=380){return B&&B.camP?camGo(B.camP,B.camLk,ms,B.voBase):Promise.resolve()}
function frontShot(pos,toward,dist,h,sideOff=.9){const f=new V().subVectors(toward,pos).setY(0).normalize(),sd=new V(-f.z,0,f.x);if(sd.z<0)sd.negate();return pos.clone().addScaledVector(f,dist).addScaledVector(sd,sideOff).setY(h)}
async function cineAttack(side,ar,dr,fn){if(!OPT.anim){await fn();return}const A=ar.base,D=dr.base,h=.5*(ar.sc||1.4)+.2;
 $('bhud').classList.add('cine');await camGo(frontShot(A,D,2.9,h+.5),A.clone().setY(h),380,0);await sleep(160);const p=fn();await sleep(140);await camHome(420);$('bhud').classList.remove('cine');await p}
function beam(pos){const d=new THREE.Object3D();d.material={opacity:0,color:{set(){}}};d.visible=false;return d}
function beamOld(pos){const m=new THREE.Mesh(new THREE.CylinderGeometry(.12,.8,7,24,1,true),new THREE.MeshBasicMaterial({color:'#fff3b0',transparent:true,opacity:0,blending:THREE.AdditiveBlending,depthWrite:false,side:THREE.DoubleSide}));m.position.set(pos.x,3.5,pos.z);ARENA.group.add(m);return m}
const RINGG=new THREE.RingGeometry(.82,1,40);
function shock(p,col,r=1.6,ms=380,y=.14){const m=new THREE.Mesh(RINGG,new THREE.MeshBasicMaterial({color:col,transparent:true,opacity:.9,side:THREE.DoubleSide,depthWrite:false,blending:THREE.AdditiveBlending}));
 m.rotation.x=-PI/2;m.position.set(p.x,y,p.z);ARENA.group.add(m);return tween(ms,q=>{const e=1-(1-q)*(1-q);m.scale.setScalar(.15+e*r);m.material.opacity=.9*(1-q)}).then(()=>{ARENA.group.remove(m);m.material.dispose()})}
function flashScr(col,ms=260,a=.55,blend='screen'){const f=$('fxflash');if(!f||!OPT.anim)return Promise.resolve();f.style.background=col;f.style.mixBlendMode=blend;return tween(ms,q=>f.style.opacity=a*(1-q)*(q<.15?q/.15:1)).then(()=>f.style.opacity=0)}
async function rain(p,k,n,size,ms,spread=1,fall=3){const ps=[];for(let i=0;i<n;i++){const s=spr(k,size);s.userData={x:p.x+(rnd()-.5)*spread,z:p.z+(rnd()-.5)*spread*.6,d:rnd()*.4,v:.7+rnd()*.5};ps.push(s)}
 await tween(ms,q=>ps.forEach(s=>{const u=s.userData,lq=Math.min(1,Math.max(0,(q-u.d)/(1-u.d)));s.visible=lq>0;s.position.set(u.x,p.y+fall*(1-lq*u.v*1.2),u.z);s.material.opacity=lq<.8?1:(1-lq)*5}));ps.forEach(s=>ARENA.group.remove(s))}
async function fountainFx(p,k,n,size,ms,h=1.4,col){const ps=[],dv=[];for(let i=0;i<n;i++){ps.push(spr(k,size));const a=rnd()*PI*2,r=.5+rnd()*.8;dv.push([Math.cos(a)*r,1.6+rnd()*1.4,Math.sin(a)*r*.6])}
 await tween(ms,q=>ps.forEach((s,i)=>{const d=dv[i];s.position.set(p.x+d[0]*q,p.y-.4+(d[1]*q-2.6*q*q)*h,p.z+d[2]*q);s.material.opacity=1-q*q;s.material.rotation=q*3+i}));ps.forEach(s=>ARENA.group.remove(s))}
async function vines(D){const vs=[];for(let i=0;i<5;i++){const a=i/5*PI*2+rnd()*.4,g=new THREE.Group();g.position.set(D.x+Math.cos(a)*.62,0,D.z+Math.sin(a)*.42);g.rotation.set(Math.sin(a)*.5,0,-Math.cos(a)*.5);
  const c=tp(g,CYL,i%2?'#3f9a2a':'#5fd13a',0,.6,0,.07,1.2,.07,{ol:false,emi:'#2e6e1a'});const tip=tp(g,SPH,'#8ff05a',0,1.2,0,.1,.1,.1,{ol:false,emi:'#5fd13a'});g.scale.y=0;ARENA.group.add(g);vs.push(g)}
 sfx(300,.25,'triangle',.12);await tween(280,q=>vs.forEach((g,i)=>{g.scale.y=Math.min(1,q*1.3-i*.06);g.rotation.y=q*1.2}));
 burstAt(D,'leaf',10,1.2,.4,450);await Promise.all([camShake(220,.1),tween(380,q=>vs.forEach(g=>{g.rotation.y=1.2+q*2;g.scale.y=1-q}))]);vs.forEach(g=>ARENA.group.remove(g))}
function bolt(from,to,col='#fff6a0'){const pts=[];const N=9;for(let i=0;i<=N;i++){const k=i/N,p=from.clone().lerp(to,k);if(i&&i<N){p.x+=(rnd()-.5)*.5;p.z+=(rnd()-.5)*.3}pts.push(p)}
 const l=new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts),new THREE.LineBasicMaterial({color:col,transparent:true,blending:THREE.AdditiveBlending,depthWrite:false}));ARENA.group.add(l);
 const gl=spr('spark',.9);gl.position.copy(to);return{l,gl,kill(){ARENA.group.remove(l);ARENA.group.remove(gl);l.geometry.dispose();l.material.dispose()}}}
async function projectile(t,k,A,D,N,size,arc,wob){const ps=[];for(let i=0;i<N;i++){const s=spr(k,size);s.visible=false;ps.push(s)}
 await tween(560,q=>ps.forEach((s,i)=>{const lq=Math.min(1,Math.max(0,(q-i*.045)/.6));s.visible=lq>0&&lq<1;s.position.lerpVectors(A,D,lq);s.position.y+=Math.sin(lq*PI)*arc;s.position.x+=Math.sin(lq*9+i)*wob;s.material.rotation=lq*6+i;const sc=size*(1+lq*.5);s.scale.set(sc,sc,1)}));ps.forEach(s=>ARENA.group.remove(s))}
async function vfxAttack(t,ar,dr,e=1){const k=TFX[t]||'star',A=ar.base.clone().setY(.9),D=dr.base.clone().setY(.85),big=e>1,col=TC[t]||'#fff';
 const charge=()=>tween(200,q=>ar.g.position.y=ar.base.y+Math.sin(q*PI)*.3);
 if(t==='Normal'){await lunge(ar,dr.base);sfx(140,.12,'square',.25);await Promise.all([burstAt(D,'star',9,1.1,.5),shock(dr.base,'#ffffff',1.4),camShake(),flashScr('#ffffff',180,.25)])}
 else if(t==='Sol'){await charge();sfx(70,.35,'sawtooth',.25);await Promise.all([shock(dr.base,'#c9a24a',2.2,450),shock(dr.base,'#ffe2a0',1.4,320),camShake(420,.2)]);await Promise.all([fountainFx(D,'dust',14,.6,600,1),fountainFx(D,'rock',5,.3,600,1.2)])}
 else if(t==='Roche'){await charge();const rs=[];for(let i=0;i<6;i++){const s=spr('rock',.45,false);s.position.set(D.x+(rnd()-.5)*1.1,D.y+3+i*.5,D.z+(rnd()-.5)*.6);rs.push(s)}
  sfx(90,.3,'sawtooth',.2);await tween(520,q=>rs.forEach((s,i)=>{s.position.y=Math.max(D.y-.2,D.y+3+i*.5-q*(4+i*.6));s.material.rotation=q*5+i}));rs.forEach(s=>ARENA.group.remove(s));
  await Promise.all([burstAt(D,'dust',10,1.3,.7),fountainFx(D,'rock',7,.28,520,.9),shock(dr.base,'#b09a36',1.8),camShake(300,.16)])}
 else if(t==='Vol'){await lunge(ar,dr.base);const ws=[0,1,2].map(()=>spr('wind',.9));sfx(600,.25,'triangle',.15);
  await Promise.all([tween(500,q=>ws.forEach((s,i)=>{const a=q*8+i*2.1;s.position.set(D.x+Math.cos(a)*.6*(1-q*.3),D.y-.3+q*1.2+i*.1,D.z+Math.sin(a)*.6);s.material.opacity=1-q*.6;s.material.rotation=a})),shock(dr.base,'#cfc0ff',1.6,500,.5)]);ws.forEach(s=>ARENA.group.remove(s))}
 else if(t==='Feu'){await charge();sfx(220,.35,'sawtooth',.12);await projectile(t,'flame',A,D,9,.62,.45,.05);flashScr('#ff7a20',300,.4);sfx(120,.3,'sawtooth',.18);
  await Promise.all([fountainFx(D,'flame',14,.6,600,.8),burstAt(D,'flame',10,1.3,.65),shock(dr.base,'#ff8a30',1.7),camShake(260,.12)])}
 else if(t==='Eau'){await charge();sfx(700,.3,'triangle',.12);await projectile(t,'drop',A,D,9,.42,.5,.05);sfx(320,.25,'sine',.15);
  await Promise.all([fountainFx(D,'drop',16,.36,650,1.2),shock(dr.base,'#6390f0',1.6),shock(dr.base,'#bfe0ff',1,300),camShake(200,.08)])}
 else if(t==='Plante'){await charge();await projectile(t,'leaf',A,D,7,.42,.9,.25);await vines(D)}
 else if(t==='Électrik'){await charge();sfx(900,.08,'square',.12);const top=D.clone().setY(D.y+4);
  for(let i=0;i<3;i++){const b=bolt(top.clone().setX(top.x+(rnd()-.5)*.6),D);flashScr('#fff6a0',120,.45);sfx(1200-i*200,.06,'square',.1);await sleep(90);b.kill();await sleep(40)}
  await Promise.all([burstAt(D,'spark',12,1.4,.45),shock(dr.base,'#e8b80c',1.6),camShake(220,.12)])}
 else if(t==='Insecte'){await charge();const ps=[];for(let i=0;i<8;i++)ps.push(spr('bug',.36));sfx(520,.3,'triangle',.1);
  await tween(700,q=>ps.forEach((s,i)=>{const lq=Math.min(1,q*1.4),a=q*14+i*.8,r=.7*(1-lq)+.35;const p=A.clone().lerp(D,lq);s.position.set(p.x+Math.cos(a)*r,p.y+Math.sin(a*.7)*.3,p.z+Math.sin(a)*r*.6)}));ps.forEach(s=>ARENA.group.remove(s));
  await Promise.all([burstAt(D,'bug',8,1,.35),shock(dr.base,'#94a81a',1.3),camShake(180,.08)])}
 else if(t==='Glace'){await charge();sfx(1400,.2,'sine',.1);await projectile(t,'ice',A,D,7,.42,.35,.03);flashScr('#c8faff',260,.5);sfx(1800,.15,'triangle',.1);
  await Promise.all([rain(D,'ice',10,.45,600,1.1,2.6),shock(dr.base,'#bff8ff',1.8),shock(dr.base,'#ffffff',1.1,300),camShake(200,.08)])}
 else if(t==='Spectre'){await charge();const gs=[0,1,2,3].map(()=>spr('ghost',.55));sfx(260,.5,'sine',.12);
  await tween(700,q=>gs.forEach((s,i)=>{const p=A.clone().lerp(D,Math.min(1,q*1.3)),a=q*9+i*PI/2;s.position.set(p.x+Math.cos(a)*.5,p.y+Math.sin(q*12+i)*.15,p.z+Math.sin(a)*.35);s.material.opacity=.4+.5*Math.sin(q*PI)}));gs.forEach(s=>ARENA.group.remove(s));
  flashScr('#3a1a6a',320,.55,'multiply');await Promise.all([burstAt(D,'ghost',7,1.1,.45,520),shock(dr.base,'#8a6ad0',1.6),camShake(220,.1)])}
 else if(t==='Ténèbres'){await lunge(ar,dr.base);sfx(90,.25,'sawtooth',.2);flashScr('#200818',300,.6,'multiply');
  const ds=[];for(let i=0;i<10;i++){const s=spr('dark',.7);const a=i/10*PI*2;s.userData=[Math.cos(a)*1.6,Math.sin(a)*1.6];ds.push(s)}
  await tween(380,q=>ds.forEach(s=>{const[u,v]=s.userData;s.position.set(D.x+u*(1-q),D.y+v*.5*(1-q),D.z+u*.3*(1-q));s.material.opacity=q}));ds.forEach(s=>ARENA.group.remove(s));
  await Promise.all([burstAt(D,'dark',10,1.4,.6),shock(dr.base,'#ff3b5c',1.7),shock(dr.base,'#5a4458',2.3,460),camShake(280,.15)])}
 else{await charge();await projectile(t,k,A,D,8,.45,.5,.05);await Promise.all([burstAt(D,k,12,1.3,.45),shock(dr.base,col,1.5),camShake(200,.08)])}
 if(big){flashScr(col,320,.4);await Promise.all([shock(dr.base,'#ffffff',2.4,420,.3),camShake(240,.14)])}}
function hitNum(r,txt,col){const c=document.createElement('canvas');c.width=128;c.height=64;const x=c.getContext('2d');x.font='bold 44px Fredoka,sans-serif';x.textAlign='center';x.textBaseline='middle';x.lineWidth=7;x.strokeStyle='#120e1c';x.strokeText(txt,64,32);x.fillStyle=col;x.shadowColor=col;x.shadowBlur=10;x.fillText(txt,64,32);
 const s=new THREE.Sprite(new THREE.SpriteMaterial({map:new THREE.CanvasTexture(c),transparent:true,depthTest:false}));s.scale.set(1.1,.55,1);s.position.copy(r.base).setY(1.6);ARENA.group.add(s);
 tween(900,q=>{s.position.y=1.6+q*.8;s.material.opacity=q<.6?1:1-(q-.6)/.4}).then(()=>ARENA.group.remove(s))}
async function statusFx(r,st){const k={brn:'flame',psn:'bubble',slp:'zz'}[st];await burstAt(r.base.clone().setY(.9),k,8,.9,.4,600)}
function sparkAt(x,z,k='star',n=6){const g=cur.group,arr=[];for(let i=0;i<n;i++){const s0=new THREE.Sprite(new THREE.SpriteMaterial({map:vfxTex(k),transparent:true,depthWrite:false,blending:THREE.AdditiveBlending}));s0.scale.set(.35,.35,1);s0.position.set(cur.ox+x,1,cur.oz+z);g.add(s0);arr.push([s0,new V(rnd()-.5,rnd()*.8+.2,rnd()-.5).multiplyScalar(1.6)])}
 return tween(450,q=>arr.forEach(([s0,d])=>{s0.position.set(cur.ox+x+d.x*q,1+d.y*q,cur.oz+z+d.z*q);s0.material.opacity=1-q})).then(()=>arr.forEach(([s0])=>{g.remove(s0);s0.material.dispose()}))}
