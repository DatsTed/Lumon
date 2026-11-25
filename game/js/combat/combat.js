/* ================= BATTLE ================= */
let B=null;
function tween(ms,fn){const t0=performance.now();return new Promise(r=>{(function f(){const k=Math.min(1,(performance.now()-t0)/ms);try{fn(k)}catch(e){console.error('tween',e);r();return}if(k<1)requestAnimationFrame(f);else r()})()})}
const ease=k=>k<.5?2*k*k:1-Math.pow(-2*k+2,2)/2;
function stg(s){return s>=0?(2+s)/2:2/(2-s)}
function foeM(){return B.foes[B.fi]}
function label(side){const m=side==='p'?B.me:foeM();return side==='p'?nm(m):(B.wild?nm(m)+' sauvage':nm(m)+' ennemi')}
const STN={brn:['Brûlure','#c2410c'],psn:['Poison','#7e22ce'],slp:['Sommeil','#3b4bc8']};
function chips(m,st){let h='';if(m.status){const s=STN[m.status];h+=`<span class="chip" style="background:${s[1]};box-shadow:0 0 6px ${s[1]}">${ico('st_'+m.status,13)}${s[0]}</span>`}
 if(st)for(const[k,l]of[['atk','Attaque'],['def','Défense'],['acc','Précision']])if(st[k])h+=`<span class="chip ${st[k]>0?'up':'dn'}">${l} ${st[k]>0?'+':''}${st[k]}</span>`;return h}
function hud(){const f=foeM(),m=B.me;ensureGenes(f);$('fN').innerHTML=(f.shiny?'✦ ':'')+nm(f)+GSYM(f)+(B.wild&&S.dex.caught[f.sp]?'<i class="cIco" title="Déjà capturé"></i>':'');$('fBalls').innerHTML=B.tr?B.foes.map(x=>`<i class="${x.hp>0?'':'ko'}"></i>`).join(''):'';$('fL').textContent='N.'+f.lv;$('fT').innerHTML=typH(typesOf(f));$('fS').innerHTML=chips(f,B.st.f);
 const rf=f.hp/f.mhp;$('fB').style.width=rf*100+'%';$('fB').style.background=hpCol(rf);
 if(m){$('mN').textContent=nm(m);$('mL').textContent='N.'+m.lv;const rm=m.hp/m.mhp;$('mB').style.width=rm*100+'%';$('mB').style.background=hpCol(rm);$('mHP').textContent=`${m.hp} / ${m.mhp} PV`;$('mS').innerHTML=chips(m,B.st.p);
  const a=m.lv**3,b=(m.lv+1)**3;$('mX').style.width=Math.min(100,(m.xp-a)/(b-a)*100)+'%'}}
let camL=new V(300,.85,.3);
function layoutArena(){const port=innerHeight>innerWidth;camera.clearViewOffset();camera.updateProjectionMatrix();
 const cp=new V(300,port?1.7:1.5,port?8.2:8);camera.position.copy(cp);camL.set(300,port?.75:.8,0);camera.lookAt(camL);camera.updateMatrixWorld();
 if(B){B.camP=cp.clone();B.camLk=camL.clone();B.voBase=0;B.vo=0}
 const onGround=(nx,ny)=>{const v=new V(nx,ny,.5).unproject(camera).sub(cp).normalize();const t=(.12-cp.y)/v.y;return cp.clone().addScaledVector(v,t)};
 const P1=onGround(-.42,port?-.36:-.38),P2=onGround(port?.42:.4,port?-.14:-.12);ARENA.p1.set(P1.x,.12,P1.z);ARENA.p2.set(P2.x,.12,P2.z);
 ARENA.depthRatio=P2.distanceTo(cp)/P1.distanceTo(cp);ARENA.plats.forEach(pl=>pl.forEach(o=>o.visible=false));
 const vo=port?.2:.1;if(B){B.voBase=vo}setVO(vo)}
function setVO(f){if(B)B.vo=f;camera.setViewOffset(innerWidth,innerHeight,0,innerHeight*f,innerWidth,innerHeight)}
function placeFoeHud(){return;if(!B||!B.fm||!B.camP)return;const r=B.fm,s0=r.g.scale.x,y0=r.g.position.y;r.g.scale.setScalar(r.sc);r.g.position.y=r.base.y;r.g.updateMatrixWorld(true);const bx=new THREE.Box3().setFromObject(r.g),h=bx.max.y;r.g.scale.setScalar(s0);r.g.position.y=y0;const sv=camera.position.clone(),sl=camL.clone();
 camera.position.copy(B.camP);camera.lookAt(B.camLk);camera.updateMatrixWorld();const p=new V(r.base.x,h+.05,r.base.z).project(camera);camera.position.copy(sv);camera.lookAt(sl);camera.updateMatrixWorld();
 const el=$('bFoe'),y=(1-p.y)/2*innerHeight,top=Math.max(54,Math.min(innerHeight*.45,y-el.offsetHeight-14));el.style.top=top+'px'}
function placeMon(side,m){const key=side==='p'?'pm':'fm';disposeModel(B[key]);const r=monModel(m.sp,m.form);if(m.shiny){shinyfy(r);setTimeout(()=>{if(B&&B[key]===r){burstAt(r.base.clone().setY(.9),'star',16,1.6,.5,700);sfx(1760,.1,'triangle',.15);sfx(2093,.2,'triangle',.12)}},300)}const pos=side==='p'?ARENA.p1:ARENA.p2;
 r.g.position.set(pos.x,.12,pos.z);r.base=r.g.position.clone();r.sc=(side==='p'?1.45:1.45*Math.min(1.7,Math.max(1.15,(ARENA.depthRatio||1.6)*.85)))*MSCALE[m.sp];r.g.scale.setScalar(r.sc);
 const o=side==='p'?ARENA.p2:ARENA.p1;{const o=side==='p'?ARENA.p2:ARENA.p1,toO=new V(o.x-pos.x,0,o.z-pos.z).normalize(),toC=new V((B.camP||camera.position).x-pos.x,0,(B.camP||camera.position).z-pos.z).normalize(),fd=toO.addScaledVector(toC,side==='p'?.3:.5).normalize();r.g.rotation.y=Math.atan2(fd.x,fd.z)}ARENA.group.add(r.g);B[key]=r;if(side==='f')setTimeout(placeFoeHud,0);return r}
async function popIn(r){const fl=tp(ARENA.group,SPH,'#ffffff',r.base.x,.8,r.base.z,.1,.1,.1,{ol:false,emi:'#ffffff'});sfx(660,.1);sfx(990,.15);
 await tween(380,k=>{r.g.scale.setScalar(r.sc*ease(k));fl.scale.setScalar(.1+k*1.2);fl.material.opacity=1-k});ARENA.group.remove(fl)}
async function lunge(r,to){const d=new V().subVectors(to,r.base).setY(0).normalize().multiplyScalar(.9);await tween(160,k=>r.g.position.copy(r.base).addScaledVector(d,k));await tween(200,k=>r.g.position.copy(r.base).addScaledVector(d,1-k))}
async function shot(fromR,toR,col){const p=tp(ARENA.group,SPH,col,0,0,0,.18,.18,.18,{emi:col});const a=fromR.base.clone().setY(.9),b=toR.base.clone().setY(.8);
 sfx(440,.15,'sawtooth',.1);await tween(380,k=>{p.position.lerpVectors(a,b,k);p.position.y+=Math.sin(k*PI)*.8;p.rotation.y=k*8});ARENA.group.remove(p)}
async function burst(r,col){const ps=[];for(let i=0;i<10;i++)ps.push(tp(ARENA.group,SPH,col,r.base.x,.8,r.base.z,.07,.07,.07,{ol:false,emi:col}));const dirs=ps.map(()=>new V(rnd()-.5,rnd()*.8,rnd()-.5).normalize());
 await tween(350,k=>ps.forEach((p,i)=>{p.position.set(r.base.x,.8,r.base.z).addScaledVector(dirs[i],k*1.3);p.scale.setScalar(.07*(1-k)+.01)}));ps.forEach(p=>ARENA.group.remove(p))}
async function hitFx(r){sfx(180,.15,'square',.2);for(let i=0;i<6;i++){r.g.visible=i%2===1;r.g.position.x=r.base.x+(i%2?.08:-.08);await sleep(60)}r.g.visible=true;r.g.position.copy(r.base)}
async function ringFx(r,up){const ring=tp(ARENA.group,TOR,up?'#ff6a5a':'#5a9aff',r.base.x,up?.2:1.6,r.base.z,.6,.6,.6,{r:[PI/2,0,0],ol:false,emi:up?'#ff6a5a':'#5a9aff'});sfx(up?520:300,.25,'triangle',.2);
 await tween(500,k=>{ring.position.y=up?.2+k*1.5:1.6-k*1.5});ARENA.group.remove(ring)}
async function faintFx(r){sfx(300,.4,'triangle',.25);sfx(150,.5,'triangle',.25);await tween(500,k=>{r.g.position.y=.18-k*.6;r.g.scale.setScalar(r.sc*(1-k*.7))});r.g.visible=false}
function bMenu(html){$('bMenu').classList.remove('mv');$('bMenu').innerHTML=html||''}
function act(){if(B&&B.camP&&camera.position.distanceTo(B.camP)>.05){camHome(350)}$('bhud').classList.remove('cine');return new Promise(res=>{const main=()=>{bMenu(`<button class="btn" id="a1">Attaque</button><button class="btn alt" id="a2">Sac</button><button class="btn alt" id="a3">Lumons</button><button class="btn alt" id="a4">Fuite</button>`);
  $('a1').onclick=moves;$('a2').onclick=bag;$('a3').onclick=async()=>{bMenu();const i=await pickList('Changer de Lumon',S.party.map(m=>({html:partyRow(m),dis:m.hp<=0||m===B.me})));if(i<0)main();else res({k:'switch',i})};$('a4').onclick=()=>{bMenu();res({k:'run'})}};
 const moves=()=>{const ms=B.me.moves;bMenu(ms.map((x,i)=>{const v=MV[x.id],e=v.p?effOf(v.t,typesOf(foeM())):1;return `<button class="btn mvb" data-i="${i}" style="--tc:${TC[v.t]}" ${x.pp<=0?'disabled':''}>${v.n}<small><span class="typ" style="background:${TC[v.t]}">${v.t}</span>PP ${x.pp}/${v.pp}${v.p?' · Puiss. '+v.p:' · Statut'}${v.hc?' · critique+':''}</small>${v.p?(e===0?'<span class="eff nul">Sans effet</span>':e>1?'<span class="eff sup">Super efficace</span>':e<1?'<span class="eff low">Peu efficace</span>':''):''}</button>`}).join('')+Array.from({length:4-ms.length},()=>'<button class="btn mvb empty" style="--tc:#3a2f55">—<small>&nbsp;</small></button>').join('')+`<button class="btn alt" id="mb">Retour</button>`);$('bMenu').classList.add('mv');
  document.querySelectorAll('.mvb:not(.empty)').forEach(b=>b.onclick=()=>{bMenu();res({k:'move',i:+b.dataset.i})});$('mb').onclick=main;
  if(ms.every(x=>x.pp<=0)){bMenu();res({k:'move',i:-1})}};
 const bag=async()=>{bMenu();const ks=Object.keys(S.bag).filter(k=>S.bag[k]>0&&!ITEMS[k].form&&(!ITEMS[k].ball||B.wild));if(!ks.length){await msg("Rien d'utile dans ton sac !");main();return}
  const i=await pickList('Sac',ks.map(k=>({html:`${ico(k)}<span class="grow"><b>${ITEMS[k].n}</b> ×${S.bag[k]}<br><small>${ITEMS[k].d}</small></span>`})));if(i<0){main();return}
  if(ITEMS[ks[i]].ball){res({k:'ball',id:ks[i]});return}
  const j=await pickList('Sur quel Lumon ?',S.party.map(m=>({html:partyRow(m),dis:!canUse(ks[i],m)})));if(j<0){main();return}res({k:'item',id:ks[i],t:j})};
 main()})}
async function useMove(side,mi){const a=side==='p'?B.me:foeM(),d=side==='p'?foeM():B.me,ar=side==='p'?B.pm:B.fm,dr=side==='p'?B.fm:B.pm,as=B.st[side],ds=B.st[side==='p'?'f':'p'];
 if(a.status==='slp'){a.slp=(a.slp||1)-1;if(a.slp>0){await statusFx(ar,'slp');await msg(`${label(side)} dort profondément…`);return}a.status=null;hud();await msg(`${label(side)} se réveille !`)}
 const mid=mi<0?'lutte':a.moves[mi].id,v=MV[mid];if(mi>=0)a.moves[mi].pp--;
 await msg(`${label(side)} utilise ${v.n} !`);
 const accM=as.acc>=0?(3+as.acc)/3:3/(3-as.acc);if(rnd()*100>v.a*accM){await msg("Mais ça rate !");return}
 const tside=side==='p'?'f':'p';
 if(!v.p&&v.st){if(d.status){await msg("Mais ça échoue !");return}await applyStatus(d,dr,v.st[0],tside);return}
 if(v.p){if(OPT.anim)await cineAttack(side,ar,dr,()=>vfxAttack(v.t,ar,dr,effOf(v.t,typesOf(d))));else await tween(160,k=>ar.g.position.y=ar.base.y+Math.sin(k*PI)*.2);
  const e=effOf(v.t,typesOf(d));if(e===0){await msg(`Ça n'affecte pas ${label(side==='p'?'f':'p')}…`);return}
  const A=a.atk*stg(as.atk)*(a.status==='brn'?.5:1),D=d.def*stg(ds.def),crit=rnd()<critRate(a,v);let dmg=Math.floor(Math.floor(Math.floor(2*a.lv/5+2)*v.p*A/D)/50)+2;
  dmg=Math.max(1,Math.floor(dmg*(typesOf(a).includes(v.t)?1.5:1)*e*(crit?1.5:1)*(.85+rnd()*.15)));
  if(SP[d.sp].unique&&d===B.me&&(d.fr||0)>=180&&dmg>=d.hp&&d.hp>1&&rnd()<.25){dmg=d.hp-1;B.endure=1}
  d.hp=Math.max(0,d.hp-dmg);hitNum(dr,'-'+dmg,e>1?'#ffd84a':crit?'#ff3b5c':'#ffffff');await hitFx(dr);hud();await sleep(300);if(B.endure){B.endure=0;await msg(`${nm(d)} tient bon pour toi ! Votre lien est trop fort.`)}
  if(crit){camShake(320,.18);burstAt(dr.base.clone().setY(1),'star',14,1.4,.4,500);await msg("Coup critique !")}if(e>1)await msg("C'est super efficace !");else if(e<1)await msg("Ce n'est pas très efficace…");
  if(mid==='lutte'){a.hp=Math.max(0,a.hp-Math.max(1,dmg>>2));hud();await msg(`${label(side)} se blesse en luttant !`)}
  if(v.st&&d.hp>0&&!d.status&&rnd()*100<v.st[1])await applyStatus(d,dr,v.st[0],tside)}
 else{const[stat,amt,who]=v.fx;const tg=who==='self'?side:(side==='p'?'f':'p'),tst=B.st[tg],tr=tg==='p'?B.pm:B.fm,nmS=stat==='atk'?"L'attaque":stat==='acc'?'La précision':'La défense';
  if((amt>0&&tst[stat]>=6)||(amt<0&&tst[stat]<=-6)){await msg(`${nmS} de ${label(tg)} ne peut plus bouger !`);return}
  tst[stat]=Math.max(-6,Math.min(6,(tst[stat]||0)+amt));burstAt(tr.base.clone().setY(.6),amt>0?'star':'bubble',8,.8,.3,500);await ringFx(tr,amt>0);hud();await msg(`${nmS} de ${label(tg)} ${amt>0?'augmente':'baisse'} !`)}}
async function applyStatus(d,dr,st,tside){const imm=(st==='brn'&&typesOf(d).includes('Feu'))||(st==='psn'&&typesOf(d).includes('Roche'));if(imm){await msg(`Ça n'a aucun effet sur ${label(tside)}…`);return}
 d.status=st;if(st==='slp')d.slp=1+Math.floor(rnd()*3);await statusFx(dr,st);hud();await msg({brn:`${label(tside)} est brûlé !`,psn:`${label(tside)} est empoisonné !`,slp:`${label(tside)} s'endort !`}[st])}
async function endTurn(){for(const side of['p','f']){const m=side==='p'?B.me:foeM(),r=side==='p'?B.pm:B.fm;if(!m||m.hp<=0)continue;
 if(m.status==='brn'||m.status==='psn'){const dmg=Math.max(1,Math.floor(m.mhp/(m.status==='brn'?16:8)));m.hp=Math.max(0,m.hp-dmg);await statusFx(r,m.status);hitNum(r,'-'+dmg,m.status==='brn'?'#ff9a3c':'#c77dff');hud();await msg(m.status==='brn'?`${label(side)} souffre de sa brûlure !`:`${label(side)} souffre du poison !`)}}}
async function gainXP(f){const team=[...B.part].filter(m=>m.hp>0&&S.party.includes(m));if(!team.length&&B.me.hp>0)team.push(B.me);if(!team.length)return;
 const g=Math.max(1,Math.floor(SP[f.sp].xp*f.lv/7*1.25*(B.wild?1:1.5))),share=Math.max(1,Math.ceil(g/team.length));
 for(const m of team){ensureGenes(m);{const bs=SP[f.sp].b,i=bs.indexOf(Math.max(...bs)),tot=m.ev.reduce((a,b)=>a+b,0);if(tot<252&&m.ev[i]<128){m.ev[i]=Math.min(128,m.ev[i]+(f.lv>=20?2:1));calc(m)}}
  m.xp+=share;await msg(`${nm(m)} gagne ${share} points d'expérience !`);hud();
  while(m.xp>=(m.lv+1)**3&&m.lv<100){m.lv++;const dh=calc(m);m.hp+=dh;hud();sfx(784,.12);sfx(988,.12);sfx(1175,.25);await say('',`${nm(m)} monte au niveau ${m.lv} !`);
   for(const[l,id]of SP[m.sp].L)if(l===m.lv&&!m.moves.some(x=>x.id===id))await learn(m,id)}}
 B.part=new Set([B.me])}
async function learn(m,id){const v=MV[id];if(m.moves.length<4){m.moves.push({id,pp:v.pp});await say('',`${nm(m)} apprend ${v.n} !`);return}
 const c=await choose('',`${nm(m)} veut apprendre ${v.n}, mais il connaît déjà 4 capacités. Laquelle oublier ?`,[...m.moves.map(x=>MV[x.id].n),'Ne pas apprendre']);
 if(c<4){const old=MV[m.moves[c].id].n;m.moves[c]={id,pp:v.pp};await say('',`1, 2 et… hop ! ${nm(m)} oublie ${old} et apprend ${v.n} !`)}else await say('',`${nm(m)} n'apprend pas ${v.n}.`)}
async function sendOut(m,first){B.me=m;B.st.p={atk:0,def:0,acc:0};B.part.add(m);const r=placeMon('p',m);r.g.scale.setScalar(0);hud();$('bMe').style.display='block';if(!OPT.anim){await camHome(0);await msg(first?`Vas-y, ${nm(m)} !`:`À toi, ${nm(m)} !`);await popIn(r);return}
 $('bhud').classList.add('cine');const f=new V().subVectors(ARENA.p2,r.base).setY(0).normalize(),sd=new V(-f.z,0,f.x),c=r.base.clone().setY(.62*MSCALE[m.sp]+.15);
 const p0=r.base.clone().addScaledVector(f,3.4).addScaledVector(sd,-1.6).setY(1.8),p1=r.base.clone().addScaledVector(f,2.4).addScaledVector(sd,1.0).setY(.95);
 await camGo(p0,c,first?500:350,0);const bm=beam(r.base);bm.material.color.set('#9ff6ff');tween(350,k=>bm.material.opacity=k*.16);
 await msg(first?`Vas-y, ${nm(m)} !`:`À toi, ${nm(m)} !`);const orb=camGo(p1,c,1100,0);await popIn(r);burstAt(c,'star',14,1.3,.35,650);sfx(988,.12,'triangle',.2);
 await orb;tween(400,k=>bm.material.opacity=.16*(1-k)).then(()=>ARENA.group.remove(bm));await tween(260,k=>r.g.position.y=r.base.y+Math.sin(k*PI)*.35);await sleep(250);
 await camHome(750);$('bhud').classList.remove('cine')}
function lumiBall(r){const b=new THREE.Group();tp(b,HEMI,'#2a1450',0,0,0,r,r,r,{th:.02});tp(b,HEMI,'#ff3b5c',0,0,0,r,r,r,{r:[PI,0,0],th:.02,emi:'#ff3b5c'});
 tp(b,TOR,'#ffd84a',0,0,0,r*1.02,r*1.02,r*1.02,{r:[PI/2,0,0],ol:false,emi:'#ffd84a'});tp(b,SPH,'#3ef0ff',0,0,r*.92,r*.28,r*.28,r*.14,{ol:false,emi:'#3ef0ff'});return b}
async function throwBall(k='lumisphere'){if(!ITEMS[k]||!ITEMS[k].ball)k='lumisphere';S.bag[k]--;await msg(`Tu lances une ${ITEMS[k].n} !`);const f=foeM(),r=B.fm;
 const ball=lumiBall(.17);ARENA.group.add(ball);const bsh=new THREE.Mesh(GEO_SH,MAT_SH);bsh.scale.setScalar(.6);ARENA.group.add(bsh);const glow=spr('ring',.9);glow.material.color.set('#ff3b5c');
 const trail=[];const tick=()=>{bsh.position.set(ball.position.x,.12,ball.position.z);glow.position.copy(ball.position);glow.material.opacity=.6+Math.sin(performance.now()*.02)*.3;if(trail.length<14&&ball.visible){const t=spr('star',.22);t.position.copy(ball.position);t.material.color.set('#ffd84a');trail.push(t)}trail.forEach(t=>{t.material.opacity*=.86})};
 const a=new V(ARENA.p1.x-.4,1.4,ARENA.p1.z+1.4),b=r.base.clone().setY(1.1);const CIN=OPT.anim;if(CIN)$('bhud').classList.add('cine');const vo0=B.vo||0;await tween(CIN?760:520,k=>{if(CIN)setVO(vo0*(1-k));ball.position.lerpVectors(a,b,k);ball.position.y+=Math.sin(k*PI)*1.4;ball.rotation.x=k*10;tick();if(CIN){camera.position.lerp(new V(ball.position.x-1.3,ball.position.y+.6,ball.position.z+2.3),.16);camL.lerp(ball.position,.3);camera.lookAt(camL)}});trail.forEach(t=>ARENA.group.remove(t));burstAt(b,'star',10,1,.35,350);
 await tween(260,k=>{r.g.scale.setScalar(r.sc*(1-k));tick()});r.g.visible=false;await tween(260,k=>{ball.position.y=1.1-k*.72;tick()});if(CIN){sfx(1568,.12,'sine',.2);const fwd=new V().subVectors(ARENA.p1,ball.position).setY(0).normalize();ball.rotation.set(0,Math.atan2(fwd.x,fwd.z),0);await camGo(ball.position.clone().addScaledVector(fwd,2.2).add(new V(0,.75,0)),ball.position.clone(),500,0)}
 const p=Math.min(1,((3*f.mhp-2*f.hp)*SP[f.sp].cr/(3*f.mhp))/255*1.25);const ok=k==='masterlumi'||rnd()<Math.min(1,p*ballMult(k,f)),shakes=ok?3:Math.floor(rnd()*3);
 for(let i=0;i<shakes;i++){await sleep(350);sfx(330,.08);if(CIN){camera.position.lerp(ball.position,.06);camL.copy(ball.position);camera.lookAt(camL)}await tween(300,k=>{ball.rotation.z=Math.sin(k*PI*2)*.5;tick();glow.scale.setScalar(.9+Math.sin(k*PI)*.5)})}await sleep(300);
 if(ok){sfx(1568,.1,'sine',.25);sfx(784,.12);sfx(1046,.3);if(CIN)burstAt(ball.position.clone().setY(.5),'star',18,1.2,.3,700);await tween(300,k=>ball.scale.setScalar(1+Math.sin(k*PI)*.3));await say('',`Hop ! ${nm(f)} est capturé !`);S.dex.caught[f.sp]=1;if(f.shiny)unlock('shiny');
  if(receiveMon(f)==='party')await say('',`${nm(f)} rejoint ton équipe !`);else await say('',`Ton équipe est pleine. ${nm(f)} est envoyé au PC de stockage.`);ARENA.group.remove(ball);ARENA.group.remove(bsh);ARENA.group.remove(glow);burstAt(r.base.clone().setY(.4),'star',16,1.6,.45,600);return true}
 ARENA.group.remove(ball);ARENA.group.remove(bsh);ARENA.group.remove(glow);camHome(450).then(()=>$('bhud').classList.remove('cine'));r.g.visible=true;await popIn(r);await msg(["Oh non ! Il s'est échappé !","Raah ! C'était presque !","Pas loin, une fois !"][shakes]||"Il s'est échappé !");return false}
async function flashTrans(){$('fade').style.transition='opacity .12s';for(let i=0;i<3;i++){$('fade').style.background='#fff';$('fade').style.opacity=.9;await sleep(120);$('fade').style.opacity=0;await sleep(120)}
 $('fade').style.background='#000';$('fade').style.opacity=1;await sleep(200);$('fade').style.transition=''}
async function afterHit(){
 if(foeM().hp<=0){await faintFx(B.fm);await msg(`${label('f')} est K.O. !`);await gainXP(foeM());
  if(B.tr&&B.fi<B.foes.length-1){B.fi++;B.st.f={atk:0,def:0,acc:0};S.dex.seen[foeM().sp]=1;await msg(`${B.tr.name} envoie ${nm(foeM())} !`);await camHome(300);const r=placeMon('f',foeM());r.g.scale.setScalar(0);hud();await popIn(r);return{f:1}}
  return{res:'win'}}
 if(B.me.hp<=0){await faintFx(B.pm);await msg(`${nm(B.me)} est K.O. !`);if(!alive().length)return{res:'lose'};
  const i=await pickList('Choisis ton prochain Lumon',S.party.map(m=>({html:partyRow(m),dis:m.hp<=0})),false);await sendOut(S.party[i]);return{p:1}}
 return null}
async function battle(cfg){setTimeout(()=>{tip('fight',"Choisis <b>Attaque</b>, puis une capacité. Les badges « Super efficace » t'aident à viser juste !");if(cfg.wild&&S.bag.lumisphere)tip('catch',"Affaiblis le Lumon sauvage, puis lance une <b>Lumisphère</b> depuis le Sac pour le capturer.")},2500);setSong(cfg.music||(cfg.trainer?(cfg.trainer.boss?'boss':cfg.trainer.key==='ginette'?'gymb':'trainer'):'battle'));await flashTrans();
 B={wild:!!cfg.wild,tr:cfg.trainer,foes:cfg.wild?[cfg.wild]:cfg.trainer.mons,fi:0,me:null,st:{p:{atk:0,def:0,acc:0},f:{atk:0,def:0,acc:0}},part:new Set(),pm:null,fm:null,tm:null};
 $('obj').style.display='none';const prevMap=cur;Object.values(MAPS).forEach(m=>{if(m!==ARENA)m.group.visible=false});ARENA.group.visible=true;camMode='battle';
 layoutArena();camTarget.set(300,0,0);
 S.dex.seen[foeM().sp]=1;const fr=placeMon('f',foeM());$('bMe').style.display='none';
 if(B.tr){fr.g.visible=false;B.tm=human(CH[B.tr.key]);B.tm.g.position.set(ARENA.p2.x+1.5,.12,ARENA.p2.z-1.2);B.tm.g.scale.setScalar(1.3);B.tm.g.rotation.y=Math.atan2(ARENA.p1.x-ARENA.p2.x,ARENA.p1.z-ARENA.p2.z);ARENA.group.add(B.tm.g)}
 let bm=null;if(OPT.anim){const tgt=(B.tr?B.tm.g.position:ARENA.p2).clone(),h=B.tr?1.05:.6;camera.position.copy(frontShot(tgt,ARENA.p1,B.tr?4.6:3.4,h+.45,.6));camL.copy(tgt).setY(h);camera.lookAt(camL);setVO(0);bm=beam(tgt);}
 await fadeIn();if(bm){sfx(220,.6,'sine',.15);await tween(500,k=>bm.material.opacity=k*.16);}
 $('bhud').classList.add('on');$('bFoe').style.display=B.tr?'none':'block';hud();
 if(B.wild){if(OPT.anim){const p=camGo(B.camP,B.camLk,1400,B.voBase);tween(1400,k=>bm.material.opacity=.16*(1-k)).then(()=>ARENA.group.remove(bm));await say('',`Un ${nm(foeM())} sauvage apparaît !`);await p}else await say('',`Un ${nm(foeM())} sauvage apparaît !`)}
 else{await say('',`${B.tr.name} veut se battre !`);if(bm){tween(500,k=>bm.material.opacity=.16*(1-k)).then(()=>ARENA.group.remove(bm));await camGo(frontShot(ARENA.p2,ARENA.p1,3.4,1.05,.6),ARENA.p2.clone().setY(.6),500,0)}await tween(400,k=>B.tm.g.position.x=ARENA.p2.x+1.5+k*3);B.tm.g.visible=false;if(cfg.duo){disposeModel(fr);B.fm=null}else{await msg(`${B.tr.name} envoie ${nm(foeM())} !`);fr.g.visible=true;fr.g.scale.setScalar(0);$('bFoe').style.display='block';hud();await popIn(fr);if(OPT.anim)await camHome(600)}}
 let result=null;if(cfg.duo&&B.tr)result=await duoLoop(cfg);else await sendOut(alive()[0],true);
 while(!result){B.turn=(B.turn||0)+1;const me=B.me,f=foeM();const a=await act();let acts=[];
  if(a.k==='run'){if(B.tr){await msg("On ne fuit pas un duel entre dresseurs, voyons !");continue}
   if(me.spd>=f.spd||rnd()<.55){sfx(600,.1);await msg("Tu prends la fuite… Allez, sans regrets !");result='run';break}await msg("Impossible de fuir !");acts=['f']}
  else if(a.k==='switch'){await msg(`Reviens, ${nm(me)} !`);await tween(250,k=>B.pm.g.scale.setScalar(B.pm.sc*(1-k)));await sendOut(S.party[a.i]);acts=['f']}
  else if(a.k==='item'){const m=S.party[a.t];const t=applyItem(a.id,m);hud();sfx(880,.1,'triangle');await msg(t);acts=['f']}
  else if(a.k==='ball'){if(await throwBall(a.id)){result='caught';break}acts=['f']}
  else{const ff=f.spd>me.spd||(f.spd===me.spd&&rnd()<.5);acts=ff?['f','p']:['p','f']}
  let brk=false;for(const side of acts){await useMove(side,side==='p'?a.i:foeChoice());const c=await afterHit();if(c&&c.res){result=c.res;break}if(c){brk=true;break}}
  if(!result&&!brk){await endTurn();const c=await afterHit();if(c&&c.res)result=c.res}}
 if(B.tr){if(result==='win'){const stop=await trainerOutro(true);sfx(784,.15);sfx(988,.15);sfx(1318,.4);await say('',`Tu as battu ${B.tr.name} !`);if(B.tr.win)await say(B.tr.name,B.tr.win);stop();const pz=B.tr.rematch?0:Math.round(Math.max(...B.foes.map(f=>f.lv))*(B.tr.prize||40)/25);if(pz){S.money+=pz;toast('money',`+${pz} €`)}await (pz?say('',`Tu gagnes ${pz} € !`):say('',"C'était une revanche : pas d'argent cette fois, mais tes Lumons ont gagné de l'expérience !"))}else if(result==='lose'&&B.tr.lose){const stop=await trainerOutro(false);await say(B.tr.name,B.tr.lose);stop()}}
 const HC=result==='lose'?respawnCentre(prevMap):null;if(result==='lose'&&!B.tr?.noWhiteout)await say('',HC?"Tu n'as plus de Lumon en état de se battre… Tu repars en courant vers la Maison des Lumons la plus proche !":"Tu n'as plus de Lumon en état de se battre… Tu repars en courant vers Ixellette, chez maman !");
 await fadeOut();$('bhud').classList.remove('on','cine');bMenu();disposeModel(B.pm);disposeModel(B.fm);if(B.tm)ARENA.group.remove(B.tm.g);ARENA.group.visible=false;
 const tr=B.tr;B=null;
 if(result==='lose'&&!tr?.noWhiteout){healAll();if(HC){gotoMap(HC,4,3,'up');refreshFollower();camMode='follow';await fadeIn();await say(HC.nurseN||'Infirmière Josiane',"Oh, mon chou… Tes Lumons étaient épuisés. Je les ai soignés. Courage, hein !")}else{gotoMap(TOWN,5,22,'up');refreshFollower();camMode='follow';await fadeIn();await say('Françoise',"Oh, mon chéri ! Tes Lumons sont épuisés… Voilà, une bonne soupe et ça repart. Fais attention à toi !")}refreshNPCs()}
 else{prevMap.group.visible=true;cur=prevMap;camMode='follow';setSong(cur.song);await checkEvos();refreshFollower();await fadeIn()}
 setObj();return result}
