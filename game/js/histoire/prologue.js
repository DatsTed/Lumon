async function talkProf(){const P='Prof. Verhaegen',f=F();
 if(f.badge1&&!f.profBadge){f.profBadge=1;f.fusionOK=1;player.face('up');
  await say(P,"{P} ! Mais… qu'est-ce que je vois là, accroché à ta veste ? La Médaille Terril ?!");
  await say(P,"Ginette ne la donne pas à n'importe qui. Trente ans au fond de la mine, et elle ne fait de cadeau à personne. Je suis fière de toi. Et de toi aussi, Laïka.");
  if(S.bag.sphereEclat){await say('',"Tu sors la Lumisphère de Gérard. Elle se met à pulser plus fort dès qu'elle approche du Fusionneur.");
   await say(P,"Et ça… ?! Une Lumisphère d'Éclat ! Du puits Sainte-Barbe ? Ce vieux Gérard… C'est EXACTEMENT ce qui manquait à mon Fusionneur : un cœur d'Éclat !");delete S.bag.sphereEclat;f.sphereGiven=1;
   await say('',"La Prof ouvre une trappe sur le côté du Fusionneur et y glisse la Lumisphère. La machine tousse, crachote… puis s'illumine en cyan.")}
  await say(P,"Tu as fait tes preuves. Alors c'est le moment : je t'ouvre mon Fusionneur d'Éclat, la machine juste à côté de mon bureau.");
  for(const q of[262,330,392,523,659])sfx(q,.18,'triangle',.12);flashScr('#3ef0ff',500,.5);
  await say(P,"Le principe : tu y places deux de tes Lumons. L'Éclat les fond en un seul Lumon, entièrement nouveau : son corps, ses couleurs, ses types, son nom… Personne n'en a jamais vu un pareil.");
  await say(P,"Deux Lumons de la même espèce ? Là, il renforce le meilleur des deux, jusqu'aux IV parfaits. Et une fusion peut évoluer à son tour. Attention : les deux Lumons d'origine disparaissent.");
  await banner('Fusionneur débloqué !',"Labo de la Prof · à côté de son bureau",2000);
  if(f.rap1){f.north=1;refreshNPCs();
   await say(P,"Et ce n'est pas tout. On m'a appelée de Charleroc : la brume au nord de la ville s'est dissipée cette nuit. C'étaient les fumigènes des concerts de Snow… depuis que son concert à Charleroc est fini, plus rien.");
   await say(P,"La Route 2 est libre. Bruxellia, la capitale, t'attend. Il paraît que le Night White de Bruxellia recrute… mais seulement jusqu'au Jour 200. Ne traîne pas !");
   await banner('Route 2 ouverte !',`Au nord de Charleroc · Bruxellia avant le Jour 200`,2400)}
  else await say(P,"Par contre, la Route 2, au nord de Charleroc, est toujours noyée dans la brume. On dit que c'est lié aux concerts de Snow, à Charleroc… Va voir ce qui se passe là-bas.");
  setObj();saveGame();return}
 if(f.rap1&&f.profBadge&&!f.north){f.north=1;refreshNPCs();await say(P,"La brume du nord s'est levée ! Les concerts de Snow sont finis. La Route 2 vers Bruxellia est ouverte, file — avant le Jour 200 !");setObj();return}
 await say(P,"Tu veux que je soigne tes Lumons ? Allez, sous la lampe d'Éclat !");await healFx();
 await say(P,f.fusionOK?"Le Fusionneur d'Éclat t'attend à côté de mon bureau. Viens l'essayer quand tu veux !":f.badge1?"Montre-moi ta médaille, voyons !":"Tu vois la machine éteinte à côté de moi ? C'est mon Fusionneur d'Éclat. Je l'ouvrirai le jour où tu auras gagné ta première médaille, à l'arène de Charleroc.")}
/* ================= STORY ================= */
const NARR=["Je n'ai pas choisi où j'ai grandi. Chez moi, les adultes se faisaient appeler les Pirates.",
 "Un soir, j'ai claqué la porte. Je n'avais plus rien. Juste la rue… et la drache.",
 "Les squats. Les nuits froides. Ce truc qui te ronge de l'intérieur… J'étais complètement à l'ouest. J'ai bien failli m'y perdre.",
 "Une nuit, sous le pont du canal, j'ai entendu des cris. Trois Kétosaures tabassaient une petite chienne qui ne pouvait même plus se relever.",
 "J'avais plus rien à perdre. Je me suis jeté sur eux. J'ai pris des coups… mais c'est eux qui sont partis en courant.",
 "Elle tremblait, trempée, blessée, aussi perdue que moi. Je l'ai appelée Laïka. Elle ne m'a plus jamais lâché.",
 "Aujourd'hui, je suis clean. Maman m'a repris chez elle, et tante Doudoune… me supporte. Je cherche un vrai boulot. Et Laïka est toujours là."];
let narrIdx=0,narrOn=false,narrTap=null,narrT0=0,glitchUntil=0;
const RAIN=Array.from({length:120},()=>[rnd(),rnd(),.6+rnd()*.8]),GRAF=Array.from({length:14},()=>[rnd(),rnd(),['#ff3b5c','#3ef0ff','#ffd84a','#b58cff'][(rnd()*4)|0],rnd()]),stars=Array.from({length:70},()=>[rnd(),rnd(),rnd()*6]);
function silh(x,X,Y,sc,col,o={}){x.fillStyle=col;x.beginPath();x.arc(X,Y-sc*1.55,sc*.32,0,7);x.fill();x.beginPath();x.roundRect?x.roundRect(X-sc*.38,Y-sc*1.2,sc*.76,sc*(o.sit?.8:1.2),sc*.25):x.rect(X-sc*.38,Y-sc*1.2,sc*.76,sc*(o.sit?.8:1.2));x.fill();
 if(!o.sit){x.fillRect(X-sc*.3,Y-sc*.05,sc*.2,sc*.6);x.fillRect(X+sc*.1,Y-sc*.05,sc*.2,sc*.6)}
 if(o.band){x.fillStyle=o.band;x.fillRect(X-sc*.33,Y-sc*1.72,sc*.66,sc*.1)}}
function dogS(x,X,Y,sc,warm){x.fillStyle='#120f14';x.beginPath();x.ellipse(X,Y-sc*.45,sc*.6,sc*.32,0,0,7);x.fill();x.beginPath();x.arc(X+sc*.55,Y-sc*.85,sc*.28,0,7);x.fill();
 x.fillRect(X-sc*.45,Y-sc*.3,sc*.12,sc*.32);x.fillRect(X+sc*.3,Y-sc*.3,sc*.12,sc*.32);x.fillStyle=warm?'#b8642a':'#3a2418';x.beginPath();x.ellipse(X+sc*.72,Y-sc*.78,sc*.15,sc*.1,0,0,7);x.fill();
 x.fillStyle='#f4efe6';x.globalAlpha=warm?.9:.3;x.beginPath();x.ellipse(X+sc*.25,Y-sc*.5,sc*.12,sc*.18,0,0,7);x.fill();x.globalAlpha=1}
function narrLoop(t){if(!narrOn)return;const c=$('nc'),dpr=Math.min(devicePixelRatio,2),w=c.clientWidth,h=c.clientHeight;if(c.width!==w*dpr){c.width=w*dpr;c.height=h*dpr}
 const x=c.getContext('2d');x.setTransform(dpr,0,0,dpr,0,0);const k=narrIdx,lt=(t-narrT0)/1000,gy=h*.64,sc=Math.min(w,h)*.09;
 const bg=(a,b2)=>{const g=x.createLinearGradient(0,0,0,h);g.addColorStop(0,a);g.addColorStop(1,b2);x.fillStyle=g;x.fillRect(0,0,w,h)};
 if(k===0){bg('#160b1e','#2a1420');x.fillStyle='#1a0e18';x.fillRect(0,gy,w,h-gy);
  for(let i=0;i<3;i++){const X=w*(.55+i*.13),Y=gy;silh(x,X,Y,sc*1.25,'#0a0609',{band:'#8a1a22'});const cx=X-sc*.5,cy=Y-sc*1.4;x.fillStyle=`rgba(255,140,40,${.6+.4*Math.sin(t*.006+i)})`;x.beginPath();x.arc(cx,cy,3,0,7);x.fill();
   for(let j=0;j<4;j++){const q=((lt*.25+j*.25+i*.13)%1);x.fillStyle=`rgba(180,160,190,${.18*(1-q)})`;x.beginPath();x.arc(cx-q*20,cy-q*90,8+q*26,0,7);x.fill()}}
  silh(x,w*.25,gy,sc*.7,'#0e0912',{sit:1})}
 else if(k===1){bg('#070a14','#121828');x.fillStyle='#0c0f18';x.fillRect(0,gy,w,h-gy);const lx=w*.66;x.fillStyle='#22252e';x.fillRect(lx-3,gy-sc*4.6,6,sc*4.6);
  const g=x.createRadialGradient(lx,gy-sc*4.5,4,lx,gy,sc*4);g.addColorStop(0,'rgba(255,230,160,.45)');g.addColorStop(1,'rgba(255,230,160,0)');x.fillStyle=g;x.beginPath();x.moveTo(lx-8,gy-sc*4.5);x.lineTo(lx+sc*2,gy);x.lineTo(lx-sc*2,gy);x.fill();
  silh(x,lx-sc*.6,gy,sc,'#05070c');x.strokeStyle='rgba(170,190,230,.35)';x.lineWidth=1;RAIN.forEach(r=>{const yy=((r[1]+lt*r[2]*1.4)%1)*h,xx=r[0]*w;x.beginPath();x.moveTo(xx,yy);x.lineTo(xx-3,yy+14);x.stroke()})}
 else if(k===2){bg('#0e070c','#1c0e14');x.fillStyle='#24161c';x.fillRect(0,0,w,gy);GRAF.forEach(g=>{x.strokeStyle=g[2];x.globalAlpha=.25;x.lineWidth=4;x.beginPath();x.moveTo(g[0]*w,g[1]*gy);x.quadraticCurveTo(g[0]*w+40,g[1]*gy-30*g[3],g[0]*w+80*g[3]+20,g[1]*gy+10);x.stroke()});x.globalAlpha=1;
  x.fillStyle='#141012';x.fillRect(0,gy,w,h-gy);x.fillStyle='#3a3036';x.fillRect(w*.18,gy-12,w*.34,14);const on=Math.sin(t*.02)>-.6||rnd()<.3;
  if(on){const g=x.createRadialGradient(w*.5,h*.12,2,w*.5,h*.12,h*.6);g.addColorStop(0,'rgba(255,240,200,.28)');g.addColorStop(1,'rgba(0,0,0,0)');x.fillStyle=g;x.fillRect(0,0,w,h)}x.fillStyle='#fff6d8';x.beginPath();x.arc(w*.5,h*.12,4,0,7);x.fill();
  silh(x,w*.36,gy-6,sc*.85,'#07050a',{sit:1})}
 else if(k===3){const bridge=()=>{bg('#05060c','#0a0e18');x.fillStyle='#0d1220';x.beginPath();x.moveTo(0,0);x.lineTo(w,0);x.lineTo(w,gy*.5);x.quadraticCurveTo(w/2,gy*.05-gy*.0+gy*.1,0,gy*.5);x.fill();
  x.fillStyle='#08101c';x.fillRect(0,gy,w,h-gy);for(let i=0;i<10;i++){x.fillStyle=`rgba(120,150,210,${.06+.05*Math.sin(t*.003+i)})`;x.fillRect((i*97+lt*12)%w,gy+10+i*8,40,2)}};bridge();
  // le héros, à moitié défoncé, titube au loin ; trois Kétosaures frappent une petite chienne
  silh(x,w*.16+Math.sin(lt*1.3)*sc*.15,gy,sc*.8,'#020306');const dx=w*.66;
  for(let i=0;i<3;i++){const kick=Math.max(0,Math.sin(lt*5+i*2.1)),X=dx+(i-1)*sc*1.25+(i-1)*kick*sc*.15;silh(x,X,gy,sc*.95,'#030408',{band:'#a04ae8'});
   x.fillStyle='#030408';x.save();x.translate(X+(i<1?.2:-.2)*sc,gy-sc*.05);x.rotate((i<1?-1:1)*kick*.9);x.fillRect(-sc*.1,0,sc*.2,sc*.62);x.restore()}
  const hit=Math.max(0,Math.sin(lt*5))>.92;dogS(x,dx-sc*.15+(hit?sc*.08:0),gy,sc*.75,false);
  if(hit){x.fillStyle='rgba(255,60,90,.18)';x.fillRect(0,0,w,h)}}
 else if(k===4){const bridge=()=>{bg('#05060c','#0a0e18');x.fillStyle='#0d1220';x.beginPath();x.moveTo(0,0);x.lineTo(w,0);x.lineTo(w,gy*.5);x.quadraticCurveTo(w/2,gy*.05-gy*.0+gy*.1,0,gy*.5);x.fill();
  x.fillStyle='#08101c';x.fillRect(0,gy,w,h-gy);for(let i=0;i<10;i++){x.fillStyle=`rgba(120,150,210,${.06+.05*Math.sin(t*.003+i)})`;x.fillRect((i*97+lt*12)%w,gy+10+i*8,40,2)}};const sh=(Math.sin(lt*23)*(lt%1.1<.25?1:0))*sc*.12;x.save();x.translate(sh,0);bridge();
  // la bagarre : le héros fonce, les Kétosaures volent
  const ph=lt%1.1,lunge=ph<.3?ph/.3:ph<.6?1-(ph-.3)/.3:0,hx=w*.38+lunge*sc*1.2;silh(x,hx,gy,sc*1.05,'#020306');
  x.fillStyle='#020306';x.save();x.translate(hx+sc*.35,gy-sc*1.05);x.rotate(-1.2+lunge*1.3);x.fillRect(0,-sc*.1,sc*.75,sc*.2);x.restore();
  for(let i=0;i<3;i++){const gone=Math.min(1,Math.max(0,(lt-1.2-i*1.1)/.8)),X=w*(.62+i*.11)+gone*w*.5,Y=gy-Math.sin(gone*PI)*sc*.6;x.globalAlpha=1-gone*.8;x.save();x.translate(X,Y);x.rotate(gone*1.6);silh(x,0,0,sc*.95,'#030408',{band:'#a04ae8'});x.restore();x.globalAlpha=1}
  dogS(x,w*.24,gy,sc*.7,false);
  if(ph>.27&&ph<.36){x.fillStyle='rgba(255,255,255,.55)';x.fillRect(0,0,w,h);x.fillStyle='#ffd84a';for(let j=0;j<8;j++){const a2=j/8*PI*2;x.fillRect(hx+sc*1.1+Math.cos(a2)*sc*.5,gy-sc*1.1+Math.sin(a2)*sc*.5,5,5)}}
  x.restore()}
 else if(k===5){bg('#1a1020','#3a2418');x.fillStyle='#24160f';x.fillRect(0,gy,w,h-gy);const r=Math.min(w,h)*(.25+Math.min(1,lt/3)*.25);const g=x.createRadialGradient(w*.45,gy-sc,4,w*.45,gy-sc,r);g.addColorStop(0,'rgba(255,200,120,.5)');g.addColorStop(1,'rgba(255,200,120,0)');x.fillStyle=g;x.fillRect(0,0,w,h);
  silh(x,w*.38,gy,sc*.85,'#100a08',{sit:1});dogS(x,w*.52,gy,sc*1.05,true)}
 else{bg('#0b0b12','#2c2c3a');stars.forEach(st=>{x.globalAlpha=.3+.5*Math.abs(Math.sin(t*.001+st[2]));x.fillStyle='#fff';x.fillRect(st[0]*w,st[1]*h*.35,1.5,1.5)});x.globalAlpha=1;x.fillStyle='#0d0d10';x.fillRect(w*.18,gy-sc*3.2,w*.64,sc*3.2);x.fillStyle='#16161c';x.fillRect(w*.42,gy-sc*1.9,w*.16,sc*1.9);
  x.shadowColor='#ffffff';x.shadowBlur=16;x.fillStyle='#f4f4f8';const bx=w*.34,bw=w*.32,by=gy-sc*3,bh=sc*.62;const bars=[3,1,2,1,1,3,2,1,3,1,2,2,1,3,1];let px=bx;const u=bw/bars.reduce((a2,b3)=>a2+b3+1,0);bars.forEach((b4,i)=>{if(i%2===0)x.fillRect(px,by,u*b4,bh);px+=u*(b4+1)});
  x.font=`600 ${Math.max(12,sc*.38)}px Fredoka,sans-serif`;x.textAlign='center';x.fillText('NIGHT WHITE',w/2,by+bh+sc*.5);x.shadowBlur=0;x.fillStyle='rgba(240,240,255,.12)';x.fillRect(w*.42,gy-sc*1.9,w*.16,sc*1.9);
  silh(x,w*.34,gy+4,sc*.95,'#050507');dogS(x,w*.42,gy+4,sc*.8,true)}
 // grain + scanlines + vignette
 x.fillStyle='rgba(255,255,255,.025)';for(let i=0;i<h;i+=3)x.fillRect(0,i,w,1);
 const vg=x.createRadialGradient(w/2,h/2,Math.min(w,h)*.3,w/2,h/2,Math.max(w,h)*.75);vg.addColorStop(0,'rgba(0,0,0,0)');vg.addColorStop(1,'rgba(0,0,0,.7)');x.fillStyle=vg;x.fillRect(0,0,w,h);
 // light glitch
 const gr=k===2||k===4?.035:k>=5?.008:.02;if(t>glitchUntil&&rnd()<gr)glitchUntil=t+70+rnd()*110;const tx=$('narrText');
 if(t<glitchUntil){x.setTransform(1,0,0,1,0,0);for(let i=0;i<3;i++){const sy=(rnd()*c.height)|0,sh=(8+rnd()*30*dpr)|0,dx=((rnd()-.5)*28*dpr)|0;x.drawImage(c,0,sy,c.width,sh,dx,sy,c.width,sh)}x.fillStyle='rgba(255,0,80,.05)';x.fillRect(0,0,c.width,c.height);tx.classList.add('gl')}else tx.classList.remove('gl');
 requestAnimationFrame(narrLoop)}
function narrType(t){return new Promise(r=>{const el=$('narrText');let i=0,done=false;el.textContent='';const iv=setInterval(()=>{i++;el.textContent=t.slice(0,i);if(i>=t.length){clearInterval(iv);done=true}},38);
 narrTap=skip=>{if(skip){clearInterval(iv);narrTap=null;r();return}if(!done){clearInterval(iv);el.textContent=t;done=true}else{narrTap=null;r()}}})}
$('narr').addEventListener('pointerdown',()=>narrTap&&narrTap(false));
// bruitages des tableaux du pont (cris, coups)
function narrSfx(i){if(i===3){[0,700,1400,2300].forEach(d=>setTimeout(()=>{if(narrIdx===3){sfx(700,.18,'triangle',.08);sfx(520,.25,'triangle',.06)}},d))}
 if(i===4){for(let k=0;k<6;k++)setTimeout(()=>{if(narrIdx===4){sfx(90,.18,'square',.16);sfx(60,.25,'sawtooth',.12)}},300+k*1100)}}
async function narration(){show('narr');narrOn=true;narrIdx=0;narrT0=performance.now();requestAnimationFrame(narrLoop);setSong('drame');let skipped=false;$('skip').style.display='';$('skip').onpointerdown=e=>{e.stopPropagation();skipped=true;narrTap&&narrTap(true)};
 await fadeIn();for(let i=0;i<NARR.length&&!skipped;i++){if(i){$('narr').classList.add('xf');await sleep(260);$('narr').classList.remove('xf')}narrIdx=i;narrT0=performance.now();narrSfx(i);if(i===NARR.length-1)setSong('celeste');await narrType(NARR[i])}
 narrIdx=NARR.length-1;setSong('celeste');$('narrText').textContent='';$('skip').style.display='none';
 await say('',"…Au fait. Toi qui m'écoutes. Tu es un garçon ou une fille ?");S.gender=await pickGender();
 await say('',"Et tu ressembles à quoi, aujourd'hui ? Choisis ta panoplie.");await pickLook();
 await say('',"Et c'est quoi, ton nom ?");S.name=await askName();await say('',"{P}. Ça sonne bien. Allez, on y va, une fois.");
 await fadeOut();hide('narr');narrOn=false}
function askName(){return new Promise(r=>{show('nameOv');const inp=$('nameIn');inp.value='';$('nameErr').textContent='';setTimeout(()=>inp.focus(),100);inp.oninput=()=>$('nameErr').textContent='';
 const ok=()=>{const v=inp.value.trim();if(!v){$('nameErr').textContent="Écris ton nom d'abord, hein !";return}inp.blur();hide('nameOv');r(v)};$('nameOk').onclick=ok;inp.onkeydown=e=>{e.stopPropagation();if(e.key==='Enter')ok()}})}
async function profIntro(){const P='Prof. Verhaegen';$('profImg').src=svgURI(chibi(CH.prof));$('profImg').classList.remove('shrink');
 $('mons').innerHTML=STARTER_SVG.map(s=>`<img src="${svgURI(s)}" alt="">`).join('');$('mons').style.opacity=0;show('prof');await fadeIn();
 await say(P,"Bonjour ! Bienvenue dans le monde des Lumons ! Ça va ?");
 await say(P,"Je m'appelle Lianne Verhaegen, mais ici, tout le monde m'appelle « la Prof ».");$('mons').style.opacity=1;
 await say(P,"Ce monde est peuplé de créatures appelées Lumons. Certains vivent dans les forêts des Ardennes, d'autres dans les canaux ou au cœur des terrils.");
 await say(P,"Humains et Lumons vivent ensemble, s'entraident… et s'affrontent parfois dans des duels amicaux. Toujours avec un bon cornet de frites après, bien sûr.");
 await say(P,"Moi, j'étudie l'Éclat : l'énergie mystérieuse qui relie les Lumons à notre région, Ardenval.");$('mons').style.opacity=0;
 await say(P,"Mais parlons un peu de toi. Tu es un garçon ou une fille ?");S.gender=await pickGender();
 await say(P,"Et comment tu t'appelles, dis ?");S.name=await askName();
 await say(P,"{P}… Mais c'est un chouette nom, ça !");
 await say(P,"Ton aventure à travers Ardenval va commencer. Des Lumons, des amis, des rivaux… et peut-être de grands secrets t'attendent.");
 await say(P,"Allez, en route ! Le monde des Lumons n'attend que toi !");$('profImg').classList.add('shrink');await sleep(900);await fadeOut();hide('prof')}
function camFly(tp_,tl,ms){const fp=camera.position.clone(),fl=camLook.clone();return tween(ms,k=>{const e=ease(k);camera.position.lerpVectors(fp,tp_,e);camLook.lerpVectors(fl,tl,e);camera.lookAt(camLook);camTarget.set(camLook.x,0,camLook.z)})}
async function flyover(){camMode='free';camera.position.set(34,9,30);camLook.set(24,0,14);camera.lookAt(camLook);camTarget.set(24,0,14);
 await fadeIn();const p=camFly(new V(15,13,30),new V(13,0,10),4800);setTimeout(()=>banner('Ixellette','Un petit village au bord de la Meuse… et le début de ton aventure',3000),1000);await p;
 await sleep(500);await camFly(new V(5,0,22).add(OFF),new V(5,.6,22),2600);camTarget.set(5,0,22);camMode='follow'}
async function momScene(){const M='Françoise',D='Doudoune',N='Dolba',mom=NPC.mom;mom.x=5;mom.z=21;mom.place();mom.face('down');mom.snap();mom.show(true);await sleep(300);
 await say(M,"{P} ! Mon chéri, te voilà debout ! Bien dormi ? Ça me fait tellement plaisir de t'avoir à la maison.");
 await say(D,"Hmpf. Encore une bouche à nourrir, avec tous ces chats… Mais bon. T'es mon neveu. Alors t'es chez toi, compris ?");
 await say(M,"La Prof Verhaegen est passée ce matin. Elle a vu ta Laïka roupiller avec Pistache, notre Jack Russell… Elle dit que ce n'est pas une chienne comme les autres !");
 await say(M,"Elle veut vous voir toutes les deux à son labo, au nord-ouest du village, à côté de la Grand-Place. Allez, file, à tantôt !");
 await say('Laïkamobile',"Waf ! Waf !");
 const n=NPC.nils;n.x=12;n.z=22;n.place();n.face('left');n.snap();n.show(true);
 await say('???',"Hé ! {P} ! Attends-moi, une fois !");await moveTo(n,[[6,22]],6);n.face('left');player.face('right');
 await say(N,"Pfff… Ça va ? Moi aussi la Prof m'a appelé ! Elle va enfin me confier mon premier Lumon, tu te rends compte ?");
 await say(N,"Toi, t'as déjà ta Laïka… C'est pas juste ! Je t'attends sur la Grand-Place, à côté de la fontaine Mouli-Pis. Traîne pas, hein !");
 await moveTo(n,[[14,22],[14,15],[15,15]],6);n.face('down');await moveTo(mom,[[4,21]]);mom.face('down');await say(D,"Ce gamin, il court comme un poulet sans tête. Bon, file. Et ramène pas de puces, y'en a assez avec les chats.");await say(M,"Vas-y, mon chéri. Et prends soin de toi, hein. Je suis fière de toi.")}
async function talkMom(){const M='Françoise';if(S.party.length){await healFx();await say(M,"Oh, mon chéri, ta {S} a l'air fatiguée ! Viens, je vous fais une tartine au choco… Voilà, tout le monde est en forme ! Tu as bien mangé, toi ?")}else await say(M,"La Prof t'attend au labo, au nord-ouest de la Grand-Place. Allez, file, mon grand !")}
async function talkDoudoune(){const D='Doudoune';const L=["Quoi encore ? … Ah, c'est toi. Bon, ça va alors. T'as mangé ?","Les voisins ? Des incapables. Tous. Sauf toi, t'es de la famille.","Ta mère, elle sourit à tout le monde. Moi, je souris à personne. Sauf à mes chats. Et à toi, un peu.","Si tu ramènes encore un Lumon à la maison, c'est moi qui le mets dehors. … Il est mignon, celui-là. Bon. Il peut rester.","Pistache a encore mangé un chausson. Je l'adore, ce chien. Ne lui dis pas."];await say(D,L[(rnd()*L.length)|0])}
async function talkCat(){sfx(880,.06,'triangle',.08);sfx(660,.1,'triangle',.08);await say('',["Miaou. Le chat te fixe, puis se lèche la patte avec mépris.","Mrrraou ! Le chat se frotte contre tes bottines.","Le chat dort. Il dort très fort."][(rnd()*3)|0])}
async function talkJack(){sfx(1100,.05,'square',.08);sfx(1300,.05,'square',.08);await say('Pistache',"Wouf ! Wouf wouf ! Pistache, le Jack Russell, tourne trois fois autour de toi puis file renifler Laïka.")}
function petModel(k,c){const g=new THREE.Group(),inner=new THREE.Group();g.add(inner);const P2=k==='jack'?'#8a5a32':c==='#2a2a30'?'#3a3a42':'#ffffff';
 tp(inner,SPH,c,0,.32,0,.2,.18,.34);tp(inner,SPH,c,0,.52,.3,.17,.16,.16);for(const[x,z]of[[-.1,.2],[.1,.2],[-.1,-.2],[.1,-.2]])tp(inner,CYL,c,x,.13,z,.05,.24,.05);
 if(k==='jack'){tp(inner,SPH,P2,.08,.58,.33,.1,.1,.08,{ol:false});tp(inner,SPH,P2,-.05,.36,-.12,.12,.1,.14,{ol:false});for(const s2 of[-1,1])tp(inner,SPH,P2,s2*.13,.6,.27,.06,.1,.04,{r:[0,0,s2*.6]});tp(inner,SPH,'#f0c8a0',0,.48,.45,.08,.06,.07,{ol:false})}
 else{for(const s2 of[-1,1])tp(inner,CONE,c,s2*.09,.7,.28,.06,.12,.05);tp(inner,SPH,P2,0,.47,.44,.07,.05,.04,{ol:false})}
 tp(inner,SPH,'#111',-.06,.56,.45,.025,.03,.02,{ol:false});tp(inner,SPH,'#111',.06,.56,.45,.025,.03,.02,{ol:false});const tl=new THREE.Group();tl.position.set(0,.4,-.3);inner.add(tl);tp(tl,CYL,c,0,.12,-.05,.035,.28,.035,{r:[-.6,0,0]});
 const r={g,inner,kind:'m',fx:t=>{tl.rotation.y=Math.sin(t*(k==='jack'?14:3))*.6}};ANIMS.add(r);return r}
const DANNY=["Tu sais que les pigeons de la Grand-Place sont des espions de Bruxellia ? Je les ai vus prendre des notes, une fois !","J'ai parlé avec la fontaine Mouli-Pis cette nuit. Elle dit qu'il va dracher. Elle a toujours raison, la fontaine.","Moi, avant, j'étais roi. Roi de quoi, je sais plus. Mais j'avais une couronne en carton, c'était magnifique.","Les terrils, c'est des montagnes qui ont oublié de grandir. Comme moi.","J'ai vu un Lumon tout brillant la nuit dernière ! … Ou c'était un lampadaire. Ça arrive.","On m'appelle Jésus dans le quartier. Je multiplie pas les pains, mais je multiplie les cornets de frites… dans ma tête."];
async function talkDanny(){const N='Danny';const f=F();
 if(f.crownFound&&!f.crownDone){f.crownDone=1;await say(N,"Ma… MA COURONNE ! Tu l'as retrouvée ! Je suis de nouveau roi !");await say(N,"Pour la peine, je te nomme chevalier d'Ixellette. Tiens, mon trésor royal : trois Lumisphères que j'ai trouvées… quelque part.");give('lumisphere',3);unlock('crown');setObj();return}
 if(!f.dannyMet){f.dannyMet=1;await say(N,"Hé… Hé ! Toi ! Je te connais… Le squat de la rue Haute ! T'avais une petite chienne trempée sous ton manteau.");await say(N,"T'as réussi à t'en sortir, toi. Respect, fieu. Moi j'y suis encore… mais j'ai la meilleure vue sur les étoiles d'Ixellette.")}
 else await say(N,DANNY[(rnd()*DANNY.length)|0]);
 const c=await choose(N,"T'aurais pas une petite pièce, une fois ? Juste une, pour un café. Ou deux. Ou un cornet.",["Donner 10 €","Désolé, Danny"]);
 if(c===1){await say(N,"Pas grave, pas grave ! Le ciel est gratuit, lui. Que les Lumons veillent sur toi !");return}
 if(S.money<10){await say(N,"T'as pas un rond non plus ? Hé hé… Bienvenue au club, frère.");return}
 S.money-=10;f.danny=(f.danny||0)+1;sfx(1318,.08);await say(N,["Merci ! Que ta route soit pavée de fricadelles !","Toi, t'es un ange. Un ange avec des bottines, mais un ange.","Bénis soient ton Lumon, ta chienne et tes frites !"][(rnd()*3)|0]);
 if(f.danny===2&&!f.crownAsk){f.crownAsk=1;await say(N,"Dis… T'aurais pas vu ma couronne ? Ma couronne en carton, celle de quand j'étais roi. Je l'ai perdue sur la Route 1, dans les hautes herbes près de l'entrée.");setObj()}
 if(f.danny%5===0){await say(N,"Tiens, attends… J'ai trouvé ça ce matin. Il est encore bon, je te jure, j'ai vérifié.");give(f.danny%10===0?'speculoos':'zisoa')}}
async function talkFernand(){const N='Fernand le friturier';
 const c=await choose(N,"Bienvenue chez Fernand, la meilleure friterie d'Ardenval ! Qu'est-ce que je te sers, fieu ?",["Frites-fricadelle","Mitraillette","Rien, merci"]);
 if(c===0){await say(N,"Un cornet de frites avec une fricadelle, sauce andalouse ! Cuites deux fois dans la graisse de bœuf, comme il faut.");if(S.party.length){await healFx();await say('',"Tu partages ton cornet avec tes Lumons. Toute l'équipe reprend des forces !")}else await say('',"C'est délicieux. Tu te sens prêt·e à conquérir Ardenval !")}
 else if(c===1){await say(N,"Une mitraillette ? Un demi-pain, une fricadelle, des frites et de la sauce samouraï par-dessus… T'as de l'appétit, toi !");if(!F().mitra){F().mitra=1;await say(N,"Tiens, cadeau de la maison pour ta première mitraillette !");give('sirop')}}
 else await say(N,"Pas de souci ! Mais un dresseur qui part le ventre vide, ça n'ira pas loin, hein. Repasse tantôt !")}
async function talkNilsTown(){const n=NPC.nils,N='Dolba';
 if(F().chapterDone&&!F().nilsBattle){await nilsDuel();return}
 await say(N,"Te voilà enfin ! J'ai cru que t'allais dormir jusqu'à midi, savoir.");await say(N,"Le labo, c'est le grand bâtiment blanc avec l'Atomium sur le toit. Le dernier arrivé est une moule pas fraîche !");
 const path=(player.x===15&&player.z===14)?[[16,15],[16,8],[6,8],[6,7]]:[[15,8],[6,8],[6,7]];await moveTo(n,path,6.5);n.face('up');await sleep(150);n.show(false);F().talkedNils=1}
async function nilsDuel(){const n=NPC.nils,N='Dolba';n.face(dirTo(n,player.x,player.z));player.face(dirTo(player,n.x,n.z));
 await say(N,"{P} ! T'as vu ? Les ouvriers de la commune enlèvent la barrière de la Route 1 !");
 await say(N,"Mais avant de partir… on avait dit duel, non ? Allez, montre-moi ce que ton {S} a dans le ventre !");
 const res=await battle({trainer:{name:'Rival Dolba',key:'nils',smart:.15,prize:30,mons:[mkMon(STARTERS[F().nilsMon],5)],win:"Quoi ?! J'ai perdu ? Pfff… C'est parce que j'ai pas mangé ma fricadelle ce matin.",lose:"Ha ! J'ai gagné ! T'inquiète, c'était juste l'échauffement.",noWhiteout:true}});
 F().nilsBattle=1;healAll();
 await say(N,res==='win'?"Bon, t'es pas mauvais·e. Tiens, je soigne tes Lumons avec mon Sirop de Liège, je suis bon joueur.":"Allez, je soigne tes Lumons, on est potes quand même.");
 refreshNPCs();await say(N,"La barrière est enlevée ! Tu vois les flèches ? La Route 1 monte tout droit vers le nord, jusqu'à Charleroc. Le dernier arrivé paie les frites !");
 await say(N,"Et après Charleroc, la Route 2 vers Bruxellia ? Noyée dans la brume. Paraît que c'est la fumée des concerts de Snow…");
 await moveTo(n,[[12,1],[12,0]],6.5);n.show(false);setObj()}
async function enterLab(){await fadeOut();NPC.nils.show(false);refreshNPCs();const f=F();if(!f.chapterDone){const nl=NPC.nilsL;nl.x=2;nl.z=3;nl.place();nl.face('right');nl.snap();nl.show(true)}gotoMap(LAB,4,5,'up');await fadeIn();
 if(!f.chapterDone)await labScene()}
async function labScene(){const f=F(),P='Prof. Verhaegen',N='Dolba',nl=NPC.nilsL,L=SP.laikamobile.n;f.labIntro=1;
 await say(P,"Ah, {P} ! Te voilà enfin. Et voici donc la fameuse Laïka… Approche, ma belle.");await say(N,"T'en as mis du temps ! J'ai failli commencer sans toi.");
 await say(P,"Laisse-moi la scanner avec mon Lumidex…",{auto:900});for(const q of[660,880,990,1320]){sfx(q,.1,'triangle',.15);await sleep(140)}
 await say(P,`Incroyable… Ce n'est pas une chienne. C'est un Lumon ! Une ${L}.`);
 await say(P,"Je n'en ai jamais vu dans aucun registre d'Ardenval. À ma connaissance, c'est la seule au monde.");
 await say(P,"Tu sais, {P}, les Lumons choisissent leur dresseur. Elle t'a choisi·e sous ce pont, et elle ne t'a plus jamais lâché·e. Ça, ça ne s'invente pas.");
 await say(N,"Waw… Bon. Prof, et moi alors ?");
 await say(P,"Patience, Dolba. Sur cette table, il y a trois Lumisphères : Chicorin, de type Plante, Charbonnet, de type Feu, et Moulinet, de type Eau. Choisis ton partenaire.");
 const j=(rnd()*3)|0;await moveTo(nl,[[2,4],[3+j,4],[3+j,3]],5);nl.face('up');f.nilsMon=j;LAB.spheres[j].visible=false;S.dex.seen[STARTERS[j]]=1;await sleep(400);nl.face(dirTo(nl,player.x,player.z));
 await say(N,`Moi, je prends ${SP[STARTERS[j]].n} ! On va tout casser, toi et moi. Non, peut-être ?`);
 await say(P,"{P}, les deux autres Lumisphères, je les garde au chaud. Quand tu auras fait tes preuves, je t'en confierai une. Promis.");
 await say(P,"En attendant, prenez ceci, tous les deux : le Lumidex. Il enregistre chaque Lumon que vous rencontrez. Et voici de quoi bien commencer.");
 S.bag={lumisphere:5,sirop:3};f.bagGiven=1;await banner('Lumidex obtenu !','+ 5 Lumisphères · 3 Sirops de Liège',2000);
 await say(P,`Ta ${L} ne connaît encore que des attaques simples. Vers le niveau 7, elle apprendra Morsure. Entraîne-la dans les hautes herbes !`);
 await say(N,"{P} ! Rendez-vous au nord du village, devant l'arche « Route 1 ». Là-bas, je te défie en duel ! Mon Lumon contre ta Laïka !");
 await moveTo(nl,[[3+j,5],[4,5],[4,6]],6);nl.show(false);
 await say(P,"Ce garçon, alors… Et toi, Laïka, tu restes bien près de {P}, hein ?");
 if(follower){player.face('down');await tween(500,q=>{follower.g.position.y=.1+Math.abs(Math.sin(q*PI*3))*.25});follower.place()}
 await say(L,CRY.laikamobile);
 f.chapterDone=1;unlock('prologue');refreshNPCs();$('endH').textContent='Prologue terminé !';
 $('endTxt').innerHTML=`<b>Laïka</b> est en réalité une <b>${L}</b>, un Lumon unique au monde. Tu as aussi reçu le <b>Lumidex</b>.<br><br>Chapitre 1 : le duel contre Dolba, la Route 1, Charleroc et sa première arène !<br><br>Le bouton <b>☰ Menu</b> en haut à gauche ouvre ton équipe, ton sac, le Lumidex, ta carte de dresseur et la Galerie.`;
 show('endc');await new Promise(r=>$('endOk').onclick=()=>{hide('endc');r()})}
async function exitLab(){if(!F().chapterDone){await say('Prof. Verhaegen',"Hé, {P} ! Attends, je n'ai pas fini avec Laïka !");player.face('up');await player.step(4,5);return}
 await fadeOut();gotoMap(TOWN,6,7,'down');refreshNPCs();await fadeIn()}
function starterCard(i){return new Promise(r=>{const sp=STARTERS[i],s=SP[sp];viewSpecies(sp);$('cName').textContent=s.n;$('cType').innerHTML=typH(s.t);$('cDesc').textContent=s.d+` Il évolue en ${SP[s.evo[1]].n} au niveau ${s.evo[0]}.`;show('card');
 $('cYes').onclick=()=>{hide('card');closeView();r(true)};$('cNo').onclick=()=>{hide('card');closeView();r(false)}})}
async function pickSphere(i){const f=F();
 if(i===f.nilsMon||i===f.starter||i===f.starter2){await say('',"Cette Lumisphère est vide.");return}
 await say('',`Dans cette Lumisphère dort ${SP[STARTERS[i]].n}. La Prof la garde pour plus tard.`)}
