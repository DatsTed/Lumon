/* ---- Un effet visuel propre à chaque technique ----
   MOVEFX[id](ar,dr,e,side) : animation de la technique (ar = modèle de l'attaquant, dr = celui de la cible, e = efficacité).
   Chaque technique a son propre dessin (MTEX : chicon, moule, perle de sucre, croc, plume, note de musique…) en rapport avec son nom.
   vfxAttack(t,ar,dr,e,id) utilise MOVEFX[id] s'il existe, sinon l'effet générique du type. Les techniques de statut ont aussi leur effet. */
const MTEX={
 chicon:x=>{const g=x.createLinearGradient(0,-26,0,26);g.addColorStop(0,'#c8e87a');g.addColorStop(.35,'#f4f0c8');g.addColorStop(1,'#fffbe8');x.fillStyle=g;x.beginPath();x.ellipse(0,2,9,25,0,0,7);x.fill();x.strokeStyle='#9cbc4a';x.lineWidth=2;x.beginPath();x.moveTo(0,-20);x.lineTo(0,24);x.stroke()},
 lierre:x=>{x.fillStyle='#2f8a2a';x.strokeStyle='#14501a';x.lineWidth=2;x.beginPath();x.moveTo(0,22);x.lineTo(-20,-2);x.lineTo(-8,-6);x.lineTo(0,-24);x.lineTo(8,-6);x.lineTo(20,-2);x.closePath();x.fill();x.stroke();x.beginPath();x.moveTo(0,22);x.lineTo(0,-14);x.stroke()},
 racine:x=>{x.strokeStyle='#7a4a22';x.lineCap='round';x.lineWidth=6;x.beginPath();x.moveTo(0,-26);x.bezierCurveTo(14,-10,-14,6,4,26);x.stroke();x.lineWidth=3;x.beginPath();x.moveTo(2,-4);x.lineTo(16,4);x.moveTo(-4,8);x.lineTo(-16,14);x.stroke()},
 lame:x=>{x.shadowColor='#fff7a0';x.shadowBlur=10;x.fillStyle='#ffffff';x.beginPath();x.arc(0,8,28,PI*1.1,PI*1.9);x.arc(0,18,26,PI*1.85,PI*1.15,true);x.closePath();x.fill()},
 fissure:x=>{x.strokeStyle='#3a2414';x.lineWidth=4;x.lineJoin='round';x.beginPath();x.moveTo(-28,-4);x.lineTo(-12,2);x.lineTo(-4,-8);x.lineTo(8,4);x.lineTo(28,-2);x.moveTo(-4,-8);x.lineTo(-2,-24);x.moveTo(8,4);x.lineTo(12,24);x.stroke()},
 braise:x=>{x.shadowColor='#ff7a1a';x.shadowBlur=14;const g=x.createRadialGradient(0,0,1,0,0,12);g.addColorStop(0,'#fff6c0');g.addColorStop(.5,'#ff9a2a');g.addColorStop(1,'rgba(255,60,0,0)');x.fillStyle=g;x.beginPath();x.arc(0,0,12,0,7);x.fill()},
 boom:x=>{x.shadowColor='#ffb020';x.shadowBlur=12;x.fillStyle='#ffd24a';x.beginPath();for(let i=0;i<16;i++){const r=i%2?12:28,a=i*PI/8;x.lineTo(Math.cos(a)*r,Math.sin(a)*r)}x.closePath();x.fill();x.fillStyle='#fff6d0';x.beginPath();x.arc(0,0,8,0,7);x.fill()},
 fumee:x=>{x.fillStyle='rgba(120,116,124,.85)';for(const[a,b,r]of[[-10,4,13],[8,6,14],[0,-8,15],[14,-6,10],[-14,-6,10]]){x.beginPath();x.arc(a,b,r,0,7);x.fill()}x.fillStyle='rgba(170,166,176,.6)';x.beginPath();x.arc(-4,-10,8,0,7);x.fill()},
 note:x=>{x.shadowColor='#b48cff';x.shadowBlur=8;x.fillStyle='#d8c8ff';x.beginPath();x.ellipse(-6,14,9,7,-.4,0,7);x.fill();x.fillRect(1,-22,4,36);x.beginPath();x.moveTo(5,-22);x.quadraticCurveTo(22,-14,14,0);x.quadraticCurveTo(16,-12,5,-12);x.fill()},
 metal:x=>{x.shadowColor='#ff5a10';x.shadowBlur=14;const g=x.createRadialGradient(-3,-6,2,0,0,22);g.addColorStop(0,'#fffbe0');g.addColorStop(.35,'#ffb030');g.addColorStop(1,'#c8300a');x.fillStyle=g;x.beginPath();x.moveTo(0,-26);x.quadraticCurveTo(18,4,0,22);x.quadraticCurveTo(-18,4,0,-26);x.fill()},
 galet:x=>{x.fillStyle='#9a958c';x.strokeStyle='#3a3630';x.lineWidth=3;x.beginPath();x.ellipse(0,0,18,13,.4,0,7);x.fill();x.stroke();x.fillStyle='#c8c2b6';x.beginPath();x.ellipse(-5,-4,6,3,.4,0,7);x.fill()},
 bouclier:x=>{x.shadowColor='#7fe8ff';x.shadowBlur=12;x.strokeStyle='#bff6ff';x.lineWidth=4;x.fillStyle='rgba(120,220,255,.25)';x.beginPath();for(let i=0;i<6;i++){const a=i*PI/3+PI/6;x.lineTo(Math.cos(a)*26,Math.sin(a)*26)}x.closePath();x.fill();x.stroke()},
 moule:x=>{const g=x.createLinearGradient(-20,0,20,0);g.addColorStop(0,'#1a2440');g.addColorStop(.5,'#3a4f80');g.addColorStop(1,'#141a30');x.fillStyle=g;x.strokeStyle='#0a0e1c';x.lineWidth=2;x.beginPath();x.moveTo(0,-26);x.bezierCurveTo(22,-12,18,18,0,26);x.bezierCurveTo(-14,14,-12,-12,0,-26);x.fill();x.stroke();x.fillStyle='#ff9a4a';x.beginPath();x.ellipse(2,4,4,12,0,0,7);x.fill()},
 coquille:x=>{x.fillStyle='#ffd8c0';x.strokeStyle='#c87a5a';x.lineWidth=2;x.beginPath();x.moveTo(0,22);x.lineTo(-24,-6);x.arc(0,-6,24,PI,0);x.closePath();x.fill();x.stroke();for(let i=-2;i<=2;i++){x.beginPath();x.moveTo(0,22);x.lineTo(i*10,-28);x.stroke()}},
 vague:x=>{x.shadowColor='#7fd8ff';x.shadowBlur=8;x.fillStyle='#3a8adf';x.beginPath();x.moveTo(-30,28);x.lineTo(-30,6);x.quadraticCurveTo(-16,-28,14,-18);x.quadraticCurveTo(-2,-10,6,4);x.quadraticCurveTo(18,10,30,0);x.lineTo(30,28);x.closePath();x.fill();x.fillStyle='#e8f8ff';x.beginPath();x.arc(10,-16,5,0,7);x.arc(-6,-20,4,0,7);x.fill()},
 perle:x=>{const g=x.createRadialGradient(-6,-6,2,0,0,18);g.addColorStop(0,'#ffffff');g.addColorStop(.6,'#f4eee0');g.addColorStop(1,'#c8bfa8');x.fillStyle=g;x.beginPath();x.arc(0,0,17,0,7);x.fill()},
 coeur:x=>{x.shadowColor='#ff6a9a';x.shadowBlur=10;x.fillStyle='#ff5a8a';x.beginPath();x.moveTo(0,22);x.bezierCurveTo(-30,0,-18,-26,0,-10);x.bezierCurveTo(18,-26,30,0,0,22);x.fill()},
 plume:x=>{x.fillStyle='#e8eaf0';x.strokeStyle='#8a90a0';x.lineWidth=2;x.beginPath();x.ellipse(0,0,8,26,.5,0,7);x.fill();x.stroke();x.beginPath();x.moveTo(-14,20);x.lineTo(12,-20);x.stroke()},
 dard:x=>{x.fillStyle='#2b2220';x.beginPath();x.moveTo(0,-28);x.lineTo(7,14);x.lineTo(-7,14);x.closePath();x.fill();x.fillStyle='#f2d22a';for(let k=0;k<3;k++)x.fillRect(-6+k*.4,-4+k*7,12-k*.8,3)},
 onde:x=>{x.strokeStyle='rgba(220,240,120,.95)';x.lineWidth=4;for(const r of[8,16,24]){x.beginPath();x.arc(0,0,r,-.8,.8);x.stroke();x.beginPath();x.arc(0,0,r,PI-.8,PI+.8);x.stroke()}},
 croc:x=>{x.fillStyle='#ffffff';x.strokeStyle='#5a4a4a';x.lineWidth=2;for(const s of[-1,1]){x.beginPath();x.moveTo(s*16-8,-12);x.lineTo(s*16+8,-12);x.lineTo(s*16,20);x.closePath();x.fill();x.stroke()}x.fillStyle='#c83a5a';x.fillRect(-26,-20,52,9)},
 lune:x=>{x.shadowColor='#c8a0ff';x.shadowBlur=14;x.fillStyle='#e8d8ff';x.beginPath();x.arc(0,0,22,0,7);x.fill();x.globalCompositeOperation='destination-out';x.beginPath();x.arc(10,-6,19,0,7);x.fill();x.globalCompositeOperation='source-over'},
 atome:x=>{x.shadowColor='#bfe0ff';x.shadowBlur=8;x.fillStyle='#d8e4f0';x.strokeStyle='#8090a8';x.lineWidth=3;const P=[[0,-18],[-16,-6],[16,-6],[0,0],[-16,10],[16,10],[0,20]];x.beginPath();x.moveTo(0,-18);x.lineTo(0,20);x.moveTo(-16,-6);x.lineTo(16,10);x.moveTo(16,-6);x.lineTo(-16,10);x.stroke();for(const[a,b]of P){x.beginPath();x.arc(a,b,6,0,7);x.fill();x.stroke()}},
 oeil:x=>{x.shadowColor='#ff2a4a';x.shadowBlur=14;x.fillStyle='#ffe8e8';x.beginPath();x.moveTo(-28,0);x.quadraticCurveTo(0,-22,28,0);x.quadraticCurveTo(0,22,-28,0);x.fill();x.fillStyle='#d01030';x.beginPath();x.arc(0,0,10,0,7);x.fill();x.fillStyle='#000';x.beginPath();x.ellipse(0,0,3,9,0,0,7);x.fill()},
 flocon:x=>{x.shadowColor='#bff8ff';x.shadowBlur=10;x.strokeStyle='#f4ffff';x.lineWidth=3;x.lineCap='round';for(let i=0;i<6;i++){const a=i*PI/3;x.beginPath();x.moveTo(0,0);x.lineTo(Math.cos(a)*24,Math.sin(a)*24);x.moveTo(Math.cos(a)*14,Math.sin(a)*14);x.lineTo(Math.cos(a+.5)*20,Math.sin(a+.5)*20);x.moveTo(Math.cos(a)*14,Math.sin(a)*14);x.lineTo(Math.cos(a-.5)*20,Math.sin(a-.5)*20);x.stroke()}},
 follet:x=>{x.shadowColor='#5affc8';x.shadowBlur=16;const g=x.createRadialGradient(0,8,2,0,4,24);g.addColorStop(0,'#eafff6');g.addColorStop(.45,'#5affc8');g.addColorStop(1,'rgba(40,120,255,0)');x.fillStyle=g;x.beginPath();x.moveTo(0,-26);x.quadraticCurveTo(16,0,12,14);x.quadraticCurveTo(0,26,-12,14);x.quadraticCurveTo(-16,0,0,-26);x.fill()},
 brume:x=>{const g=x.createRadialGradient(0,0,2,0,0,30);g.addColorStop(0,'rgba(200,210,230,.7)');g.addColorStop(1,'rgba(160,170,200,0)');x.fillStyle=g;x.beginPath();x.ellipse(0,0,30,18,0,0,7);x.fill()},
 wouf:x=>{x.font='bold 22px Fredoka,sans-serif';x.textAlign='center';x.textBaseline='middle';x.lineWidth=5;x.strokeStyle='#5a3a10';x.strokeText('WOUF!',0,0);x.fillStyle='#ffd84a';x.fillText('WOUF!',0,0)},
 colere:x=>{x.strokeStyle='#ff3b3b';x.lineWidth=6;x.lineCap='round';for(let i=0;i<4;i++){x.save();x.rotate(i*PI/2);x.beginPath();x.moveTo(6,-20);x.quadraticCurveTo(6,-6,20,-6);x.stroke();x.restore()}},
 puanteur:x=>{x.fillStyle='rgba(140,190,60,.8)';for(const[a,b,r]of[[-8,4,14],[10,2,13],[0,-10,12]]){x.beginPath();x.arc(a,b,r,0,7);x.fill()}x.strokeStyle='rgba(100,40,120,.9)';x.lineWidth=3;x.beginPath();x.moveTo(-14,-24);x.quadraticCurveTo(-6,-30,-10,-18);x.moveTo(8,-26);x.quadraticCurveTo(16,-32,12,-20);x.stroke()},
 impact:x=>{x.fillStyle='#ffffff';x.strokeStyle='#ff6a2a';x.lineWidth=3;x.beginPath();for(let i=0;i<20;i++){const r=i%2?11:22+(i%4)*3,a=i*PI/10;x.lineTo(Math.cos(a)*r,Math.sin(a)*r)}x.closePath();x.fill();x.stroke()},
 goutte:x=>{x.fillStyle='#bfe6ff';x.strokeStyle='#3a7ab0';x.lineWidth=2;x.beginPath();x.moveTo(0,-22);x.quadraticCurveTo(16,6,0,18);x.quadraticCurveTo(-16,6,0,-22);x.fill();x.stroke()},
 tremble:x=>{x.fillStyle='#c9a24a';x.strokeStyle='#5a3a14';x.lineWidth=3;x.beginPath();[[-24,10],[-10,-14],[6,-8],[22,-18],[26,14]].forEach(([a,b])=>x.lineTo(a,b));x.closePath();x.fill();x.stroke()},
 croix:x=>{x.shadowColor='#ffffff';x.shadowBlur=10;x.strokeStyle='#ffffff';x.lineWidth=7;x.lineCap='round';x.beginPath();x.moveTo(-20,-20);x.lineTo(20,20);x.moveTo(20,-20);x.lineTo(-20,20);x.stroke()}
};
// dessins opaques (pas de mélange additif : sinon ils deviennent transparents)
const OPAQ=new Set(['chicon','lierre','racine','fissure','fumee','galet','moule','coquille','vague','perle','plume','dard','croc','atome','oeil','wouf','colere','puanteur','impact','goutte','tremble','rock','dust']);
{const vt=vfxTex;vfxTex=function(k){if(VFXT[k])return VFXT[k];if(!MTEX[k])return vt(k);const c=document.createElement('canvas');c.width=c.height=64;const x=c.getContext('2d');x.translate(32,32);MTEX[k](x);return VFXT[k]=new THREE.CanvasTexture(c)}}
{const sp0=spr;spr=function(k,size,add=true){return sp0(k,size,add&&!OPAQ.has(k))}}
// petites briques d'animation
const rm=a=>a.forEach(s=>ARENA.group.remove(s));
async function popFx(p,k,size,ms=500,rise=.5){const s=spr(k,size);s.position.copy(p);await tween(ms,q=>{const sc=size*(q<.25?q/.25*1.2:1.2-(q-.25)*.3);s.scale.set(sc,sc,1);s.position.y=p.y+q*rise;s.material.opacity=q<.7?1:(1-q)/.3});rm([s])}
async function orbitFx(p,k,n,size,ms,r=.7,h=.4,turns=1.5){const ps=Array.from({length:n},()=>spr(k,size));await tween(ms,q=>ps.forEach((s,i)=>{const a=q*PI*2*turns+i/n*PI*2;s.position.set(p.x+Math.cos(a)*r,p.y+h*Math.sin(q*PI)+i*.03,p.z+Math.sin(a)*r*.6);s.material.opacity=Math.sin(q*PI)*1.2}));rm(ps)}
async function slashFx(D,k='lame',n=1,size=1.4,col='#ffffff'){for(let i=0;i<n;i++){const s=spr(k,size),dir=i%2?-1:1;s.material.rotation=dir*.8;sfx(1600-i*200,.07,'sawtooth',.08);
  await tween(170,q=>{s.position.set(D.x-dir*(.7-q*1.4),D.y+.5-q*1,D.z+.2);s.material.opacity=1-q*.6});rm([s]);shock(new V(D.x,.12,D.z),col,1.2,250)}}
async function jawsFx(D,n=1){for(let i=0;i<n;i++){const top=spr('croc',.9),bot=spr('croc',.9);bot.material.rotation=PI;sfx(220,.08,'square',.15);
  await tween(200,q=>{const e=q*q;top.position.set(D.x,D.y+.9-e*.55,D.z+.3);bot.position.set(D.x,D.y-.5+e*.55,D.z+.3)});camShake(140,.1);burstAt(D,'impact',4,.8,.3,250);await sleep(70);rm([top,bot])}}
async function waveFx(A,D,k,size,ms=650,n=7){const ps=Array.from({length:n},()=>spr(k,size)),dir=new V().subVectors(D,A).setY(0),side=new V(-dir.z,0,dir.x).normalize();
 await tween(ms,q=>ps.forEach((s,i)=>{const o=(i-(n-1)/2)*.28;s.position.copy(A).lerp(D,Math.min(1.15,q*1.2)).addScaledVector(side,o);s.position.y=.35+Math.sin(q*PI)*.4+Math.sin(q*12+i)*.05;s.material.opacity=q<.85?1:(1-q)/.15}));rm(ps)}
async function streamFx(A,D,k,n,size,ms=520,arc=.25){const ps=Array.from({length:n},()=>spr(k,size));await tween(ms,q=>ps.forEach((s,i)=>{const lq=Math.min(1,Math.max(0,(q-i/n*.5)/.5));s.visible=lq>0&&lq<1;s.position.lerpVectors(A,D,lq);s.position.y+=Math.sin(lq*PI)*arc+(rnd()-.5)*.05}));rm(ps)}
const A_=ar=>ar.base.clone().setY(.85),D_=dr=>dr.base.clone().setY(.8),G_=r=>new V(r.base.x,.14,r.base.z);
const MOVEFX={
 bousculade:async(a,d)=>{await lunge(a,d.base);sfx(140,.12,'square',.25);await Promise.all([popFx(D_(d),'impact',1.1,350,0),burstAt(D_(d),'star',8,1,.4),camShake(240,.14)])},
 grogne:async(a,d)=>{sfx(110,.3,'sawtooth',.15);for(let i=0;i<3;i++)popFx(A_(a).add(new V((i-1)*.35,.55+i*.1,0)),'colere',.45,600,.2);await tween(500,q=>a.g.position.x=a.base.x+Math.sin(q*40)*.04);a.g.position.copy(a.base)},
 airmauvais:async(a,d)=>{sfx(180,.5,'sine',.1);await streamFx(A_(a),D_(d),'puanteur',6,.7,800,.15);await burstAt(D_(d),'puanteur',6,.6,.55,500)},
 feuille:async(a,d)=>{sfx(500,.2,'triangle',.1);await projectile('Plante','chicon',A_(a),D_(d),7,.55,.6,.2);await Promise.all([burstAt(D_(d),'chicon',8,1.1,.42),shock(d.base,'#c8e87a',1.4),camShake(160,.07)])},
 fouet:async(a,d)=>{sfx(900,.06,'sawtooth',.1);await Promise.all([vines(D_(d)),burstAt(D_(d),'lierre',8,1,.4,500)])},
 racines:async(a,d)=>{sfx(160,.4,'triangle',.12);await Promise.all([fountainFx(G_(a).setY(.5),'racine',8,.5,650,.6),shock(a.base,'#7a4a22',1.5,500)])},
 tranche:async(a,d)=>{await lunge(a,d.base);await slashFx(D_(d),'lame',2,1.5,'#fff7a0');camShake(200,.12)},
 seisme:async(a,d)=>{sfx(60,.6,'sawtooth',.28);const cr=[0,1,2].map(i=>{const s=spr('fissure',1.1+i*.3);s.position.set(d.base.x+(i-1)*.5,.2,d.base.z+.2);return s});
  await Promise.all([camShake(700,.3),shock(d.base,'#c9a24a',2.6,600),shock(d.base,'#ffe2a0',1.6,450),fountainFx(D_(d),'tremble',10,.35,700,1.1),tween(700,q=>cr.forEach(s=>s.material.opacity=1-q*q))]);rm(cr)},
 braise:async(a,d)=>{sfx(300,.2,'sawtooth',.08);await streamFx(A_(a),D_(d),'braise',14,.3,560,.4);await burstAt(D_(d),'braise',12,1.1,.32,450)},
 grisou:async(a,d)=>{sfx(90,.3,'sawtooth',.1);await streamFx(A_(a),D_(d),'fumee',5,.6,500,.2);sfx(60,.5,'sawtooth',.3);flashScr('#ffb020',300,.6);await Promise.all([popFx(D_(d),'boom',2.2,450,0),burstAt(D_(d),'flame',12,1.5,.6),camShake(380,.24)])},
 fumee:async(a,d)=>{sfx(200,.6,'sine',.08);await Promise.all([fountainFx(D_(d),'fumee',10,.8,900,.5),orbitFx(D_(d),'fumee',5,.9,900,.8,.3,.5)])},
 berceuse:async(a,d)=>{for(const f of[523,659,784,659])sfx(f,.25,'sine',.08);await orbitFx(D_(d).add(new V(0,.4,0)),'note',5,.42,1100,.75,.3,1.2);await popFx(D_(d).add(new V(.3,.5,0)),'zz',.5,500)},
 haufo:async(a,d)=>{sfx(120,.4,'sawtooth',.15);flashScr('#ff5a10',400,.45);await rain(D_(d),'metal',14,.45,700,1.2,3.4);await Promise.all([fountainFx(D_(d),'flame',14,.6,600,.9),shock(d.base,'#ff6a10',2,450),camShake(300,.18)])},
 eboulis:async(a,d)=>{sfx(90,.3,'sawtooth',.2);await rain(D_(d),'rock',9,.55,600,1.3,3.5);await Promise.all([burstAt(D_(d),'dust',10,1.3,.7),shock(d.base,'#b09a36',1.8),camShake(320,.18)])},
 jetpierre:async(a,d)=>{sfx(400,.1,'square',.1);await projectile('Roche','galet',A_(a),D_(d),6,.4,.9,.05);await Promise.all([burstAt(D_(d),'galet',6,1,.3),camShake(180,.1)])},
 durcir:async(a,d)=>{sfx(700,.15,'square',.08);const s=spr('bouclier',.2);s.position.copy(A_(a));await tween(450,q=>{const k=.2+q*1.6;s.scale.set(k,k,1);s.material.opacity=q<.7?1:(1-q)/.3});rm([s]);shock(a.base,'#7fe8ff',1.4)},
 jet:async(a,d)=>{sfx(800,.3,'triangle',.08);await streamFx(A_(a),D_(d),'drop',18,.3,520,.15);await Promise.all([fountainFx(D_(d),'drop',12,.32,550,1),shock(d.base,'#6390f0',1.4)])},
 bulles:async(a,d)=>{sfx(600,.25,'sine',.1);await projectile('Eau','moule',A_(a),D_(d),5,.5,.6,.1);await Promise.all([burstAt(D_(d),'bubble',10,1,.35),burstAt(D_(d),'moule',4,.9,.4),camShake(160,.07)])},
 coquille:async(a,d)=>{sfx(900,.2,'triangle',.08);await orbitFx(A_(a),'coquille',4,.55,800,.7,.2,1);shock(a.base,'#ffd8c0',1.3)},
 maree:async(a,d)=>{sfx(200,.8,'sine',.15);flashScr('#3a8adf',500,.35);await waveFx(A_(a),D_(d),'vague',.9,700,8);await Promise.all([fountainFx(D_(d),'drop',16,.38,600,1.3),shock(d.base,'#6390f0',2.2),camShake(300,.16)])},
 sucre:async(a,d)=>{sfx(1200,.1,'triangle',.08);await fountainFx(A_(a),'perle',12,.25,700,1)},
 roucoule:async(a,d)=>{sfx(400,.2,'sine',.1);sfx(330,.2,'sine',.1);await Promise.all([streamFx(A_(a),D_(d),'coeur',4,.4,900,.6),streamFx(A_(a),D_(d),'note',3,.4,900,.9)]);await popFx(D_(d),'coeur',.7,400,.3)},
 aile:async(a,d)=>{await lunge(a,d.base);sfx(600,.2,'triangle',.12);await Promise.all([burstAt(D_(d),'plume',10,1.3,.45,600),shock(d.base,'#cfc0ff',1.5),camShake(180,.08)])},
 piqure:async(a,d)=>{sfx(1400,.06,'square',.08);await streamFx(A_(a),D_(d),'dard',3,.45,320,.05);sfx(1800,.05,'square',.08);await Promise.all([popFx(D_(d),'impact',.6,250,0),camShake(120,.06)])},
 vrombi:async(a,d)=>{sfx(140,.6,'sawtooth',.06);for(let i=0;i<3;i++)popFx(A_(a),'onde',.6+i*.5,600,0);await sleep(600)},
 morsure:async(a,d)=>{await lunge(a,d.base);await jawsFx(D_(d),1)},
 nuitbxl:async(a,d)=>{sfx(90,.4,'sawtooth',.2);flashScr('#120820',450,.7,'multiply');const l=spr('lune',1.2);l.position.copy(D_(d)).add(new V(0,1.6,0));
  await orbitFx(D_(d).add(new V(0,.6,0)),'atome',3,.5,800,.8,.3,1.2);rm([l]);await Promise.all([burstAt(D_(d),'dark',10,1.4,.6),shock(d.base,'#ff3b5c',1.7),camShake(280,.15)])},
 regard:async(a,d)=>{sfx(80,.5,'sawtooth',.12);flashScr('#300010',300,.5,'multiply');await popFx(A_(a).add(new V(0,.55,0)),'oeil',.9,600,0);await tween(300,q=>d.g.position.x=d.base.x+Math.sin(q*50)*.05);d.g.position.copy(d.base)},
 givre:async(a,d)=>{sfx(1600,.2,'sine',.08);await Promise.all([rain(D_(d),'flocon',12,.35,700,1.2,2.4),shock(d.base,'#bff8ff',1.4)])},
 blizzard:async(a,d)=>{sfx(300,.9,'sawtooth',.06);flashScr('#e8faff',500,.5);const ps=Array.from({length:22},(_,i)=>{const s=spr(i%3?'flocon':'wind',.4+rnd()*.3);s.userData=[rnd()*PI*2,.3+rnd()*1.2,rnd()];return s});
  await tween(900,q=>ps.forEach(s=>{const[a0,h,r]=s.userData,ang=a0+q*8;s.position.set(d.base.x+Math.cos(ang)*(.4+r*.8),h,d.base.z+Math.sin(ang)*(.4+r*.6));s.material.opacity=Math.sin(q*PI)}));rm(ps);await Promise.all([shock(d.base,'#ffffff',2.2),camShake(300,.14)])},
 feufollet:async(a,d)=>{sfx(500,.5,'sine',.08);await projectile('Spectre','follet',A_(a),D_(d),4,.55,.5,.35);await burstAt(D_(d),'follet',6,.9,.4,500)},
 hantise:async(a,d)=>{sfx(220,.8,'sine',.12);flashScr('#2a1a4a',500,.55,'multiply');await Promise.all([fountainFx(D_(d),'brume',8,1.2,900,.3),orbitFx(D_(d),'ghost',4,.6,900,.9,.4,1)]);await Promise.all([shock(d.base,'#8a6ad0',1.8),camShake(240,.12)])},
 aboiement:async(a,d)=>{sfx(300,.12,'square',.2);sfx(240,.15,'square',.2);await Promise.all([popFx(A_(a).add(new V(0,.6,0)),'wouf',1.2,600,.2),shock(a.base,'#ffd84a',2,500,.6)])},
 fidelite:async(a,d)=>{sfx(660,.2,'sine',.1);await popFx(A_(a).add(new V(0,.6,0)),'coeur',.8,400,.2);await lunge(a,d.base);await Promise.all([burstAt(D_(d),'coeur',8,1.2,.4),shock(d.base,'#ff5a8a',1.8),camShake(220,.12)])},
 triplecroc:async(a,d)=>{await lunge(a,d.base);await jawsFx(D_(d),3);flashScr('#ff3b5c',200,.3)},
 lutte:async(a,d)=>{await lunge(a,d.base);await Promise.all([popFx(D_(d),'impact',.9,300,0),burstAt(A_(a),'goutte',5,.7,.25,450)])}
};
{const va=vfxAttack;vfxAttack=async function(t,ar,dr,e=1,id){const f=id&&MOVEFX[id];if(!f)return va(t,ar,dr,e);await f(ar,dr,e);
 if(e>1){const col=TC[t]||'#fff';flashScr(col,320,.4);await Promise.all([shock(dr.base,'#ffffff',2.4,420,.3),camShake(240,.14)])}}}
