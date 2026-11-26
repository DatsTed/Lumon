/* ---- Combats en duo : 2 contre 2 (moments scénarisés de l'histoire) ----
   battle({duo:2, trainer:{…, mons:[…]}}) : chaque camp a 2 Lumons sur le terrain.
   On réutilise le moteur 1 contre 1 en « branchant » la bonne paire (B.me / B.fi) avant chaque action.
   Ordre des actions : vitesse. Cible choisie par le joueur ; l'IA vise plutôt le Lumon le plus affaibli (selon B.tr.smart). */
// mise en scène : caméra plus haute et plus reculée que le 1 contre 1, pour que les 4 Lumons soient tous visibles sans se cacher.
// Ton équipe en bas à gauche (de trois quarts dos), les adversaires en haut à droite (de face). Positions en coordonnées du monde.
const DUO_W={p:[[-1.2,3.0],[.55,3.55]],f:[[-.55,-.55],[1.35,-.15]]};
function duoCam(){const port=innerHeight>innerWidth,cp=new V(300+(port?.15:0),port?3.7:3.2,port?10.2:9.4),lk=new V(300+(port?.15:0),.35,.9);
 camera.clearViewOffset();camera.position.copy(cp);camL.copy(lk);camera.lookAt(camL);camera.updateProjectionMatrix();camera.updateMatrixWorld();
 B.camP=cp.clone();B.camLk=lk.clone();const vo=port?.1:.04;B.voBase=vo;setVO(vo)}
function duoGround(side,k){const[x,z]=DUO_W[side][Math.min(k,1)];return new V(300+x,.12,z)}
function duoPlace(side,m,k,n){const r=monModel(m.sp,m.form);if(m.shiny)shinyfy(r);const pos=duoGround(side,k);
 r.g.position.copy(pos);r.base=r.g.position.clone();r.sc=(side==='p'?1.25:1.4)*MSCALE[m.sp];r.g.scale.setScalar(r.sc);
 // face à face : chacun regarde le centre de l'équipe adverse, en se tournant un peu vers la caméra
 const o=side==='p'?'f':'p',c=duoGround(o,0).add(duoGround(o,1)).multiplyScalar(.5),toO=new V(c.x-pos.x,0,c.z-pos.z).normalize(),toC=new V(B.camP.x-pos.x,0,B.camP.z-pos.z).normalize(),fd=toO.addScaledVector(toC,side==='p'?.25:.55).normalize();
 r.g.rotation.y=Math.atan2(fd.x,fd.z);ARENA.group.add(r.g);
 // ombre ronde au sol (lisibilité) + anneau de couleur qui s'allume sous le Lumon qui doit agir
 const sh=new THREE.Mesh(new THREE.CircleGeometry(.62,28),new THREE.MeshBasicMaterial({color:'#000',transparent:true,opacity:.32,depthWrite:false}));sh.rotation.x=-PI/2;sh.position.set(pos.x,.13,pos.z);ARENA.group.add(sh);
 const ring=new THREE.Mesh(new THREE.RingGeometry(.62,.78,36),new THREE.MeshBasicMaterial({color:side==='p'?'#3fe08a':'#ff6a7a',transparent:true,opacity:0,depthWrite:false,side:THREE.DoubleSide,blending:THREE.AdditiveBlending}));ring.rotation.x=-PI/2;ring.position.set(pos.x,.14,pos.z);ARENA.group.add(ring);
 r.duoExtra=[sh,ring];r.ring=ring;return r}
function duoDispose(r){if(r&&r.duoExtra)r.duoExtra.forEach(o=>ARENA.group.remove(o));disposeModel(r)}
{const la=layoutArena;layoutArena=function(){la();if(B&&B.duoOn)duoCam()}}
function duoMark(r,on){if(r&&r.ring)r.ring.material.opacity=on?.85:0}
// barres de vie comme en 1 contre 1, deux côte à côte (en haut : adversaires, en bas : ton équipe)
function duoHud(D){const hb=$('bhud');let el=$('duoHud');if(!D){if(el)el.remove();$('bFoe').style.display='';$('bMe').style.display='';return}
 if(!el){el=document.createElement('div');el.id='duoHud';hb.appendChild(el)}$('bFoe').style.display='none';$('bMe').style.display='none';
 const card=(m,cur,side,k,st)=>{const r=m.hp/m.mhp;return `<div class="hpb dcard ${side}${k}${cur?' cur':''}${m.hp<=0?' ko':''}"><div class="row"><span>${nm(m)}${GSYM(m)}</span><span>N.${m.lv}</span></div><div class="bar"><i style="width:${r*100}%;background:${hpCol(r)}"></i></div><div class="chips">${chips(m,st)}</div>${side==='p'?`<div class="dhp">${m.hp} / ${m.mhp} PV</div>`:''}</div>`};
 el.innerHTML=D.fs.map((s,k)=>s?card(B.foes[s.i],B.fi===s.i,'f',k,s.st):'').join('')+D.ps.map((s,k)=>s?card(s.m,B.me===s.m,'p',k,s.st):'').join('')}
async function duoEndSide(side){const m=side==='p'?B.me:foeM(),r=side==='p'?B.pm:B.fm;if(!m||m.hp<=0)return;
 if(m.status==='brn'||m.status==='psn'){const dmg=Math.max(1,Math.floor(m.mhp/(m.status==='brn'?16:8)));m.hp=Math.max(0,m.hp-dmg);await statusFx(r,m.status);hitNum(r,'-'+dmg,m.status==='brn'?'#ff9a3c':'#c77dff');hud();await msg(m.status==='brn'?`${label(side)} souffre de sa brûlure !`:`${label(side)} souffre du poison !`)}}
async function duoLoop(cfg){const n=Math.min(2,cfg.duo),FO=B.foes,D={fs:[],ps:[]};let next=0;B.duoOn=1;duoCam();if(B.pm&&B.pm.g)B.pm.g.visible=false;
 const liveF=()=>D.fs.filter(s=>s&&FO[s.i].hp>0),liveP=()=>D.ps.filter(s=>s&&s.m.hp>0);
 const ctx=(p,f)=>{if(p){B.me=p.m;B.pm=p.r;B.st.p=p.st}if(f){B.fi=f.i;B.fm=f.r;B.st.f=f.st}hud();duoHud(D)};
 // les adversaires entrent
 if(B.fm){duoDispose(B.fm);B.fm=null}
 for(let k=0;k<n&&next<FO.length;k++){const i=next++;S.dex.seen[FO[i].sp]=1;const s={i,k,st:{atk:0,def:0,acc:0},r:duoPlace('f',FO[i],k,n)};s.r.g.scale.setScalar(0);D.fs.push(s)}
 ctx(null,D.fs[0]);await msg(`${B.tr.name} envoie ${D.fs.map(s=>nm(FO[s.i])).join(', ')} !`);for(const s of D.fs)await popIn(s.r);
 // ton équipe entre
 const team=alive().slice(0,n);team.forEach((m,k)=>{const s={m,k,st:{atk:0,def:0,acc:0},r:duoPlace('p',m,k,n)};s.r.g.scale.setScalar(0);B.part.add(m);D.ps.push(s)});
 ctx(D.ps[0],D.fs[0]);await msg(`Vas-y, ${D.ps.map(s=>nm(s.m)).join(' et ')} !`);for(const s of D.ps)await popIn(s.r);if(OPT.anim)await camHome(400);
 const ko=async()=>{for(const s of D.fs){if(!s||FO[s.i].hp>0||s.done)continue;s.done=1;ctx(liveP()[0]||D.ps[0],s);await faintFx(s.r);await msg(`${label('f')} est K.O. !`);await gainXP(FO[s.i]);
   if(next<FO.length){const i=next++,ns={i,k:s.k,st:{atk:0,def:0,acc:0},r:duoPlace('f',FO[i],s.k,n)};duoDispose(s.r);D.fs[D.fs.indexOf(s)]=ns;S.dex.seen[FO[i].sp]=1;ns.r.g.scale.setScalar(0);ctx(null,ns);await msg(`${B.tr.name} envoie ${nm(FO[i])} !`);await popIn(ns.r)}}
  for(const s of D.ps){if(!s||s.m.hp>0||s.done)continue;s.done=1;ctx(s,liveF()[0]||D.fs[0]);await faintFx(s.r);await msg(`${nm(s.m)} est K.O. !`);
   const bench=alive().filter(m=>!D.ps.some(q=>q&&q.m===m&&!q.done));if(!bench.length)continue;
   const j=await pickList(`Qui remplace ${nm(s.m)} ?`,bench.map(m=>({html:partyRow(m)})),false);const m=bench[Math.max(0,j)],ns={m,k:s.k,st:{atk:0,def:0,acc:0},r:duoPlace('p',m,s.k,n)};duoDispose(s.r);D.ps[D.ps.indexOf(s)]=ns;B.part.add(m);ns.r.g.scale.setScalar(0);ctx(ns,null);await msg(`À toi, ${nm(m)} !`);await popIn(ns.r)}};
 const fini=()=>!liveF().length&&next>=FO.length?'win':!liveP().length?'lose':null;
 let result=null;
 while(!result){const acts=[];
  for(const p of liveP()){for(;;){ctx(p,liveF()[0]);duoMark(p.r,1);const a=await act();duoMark(p.r,0);
    if(a.k==='run'){await msg("On ne fuit pas un duel entre dresseurs, voyons !");continue}
    if(a.k==='ball'){await msg("On ne capture pas les Lumons d'un dresseur !");continue}
    if(a.k==='switch'){const m=S.party[a.i];if(D.ps.some(q=>q&&q.m===m)){await msg(`${nm(m)} est déjà sur le terrain !`);continue}acts.push({t:'sw',p,m,spd:1e4});break}
    if(a.k==='item'){acts.push({t:'it',p,a,spd:9e3});break}
    let tg=liveF()[0];const lf=liveF();if(a.i>=0&&lf.length>1){const j=await pickList(`${nm(p.m)} vise…`,lf.map(s=>({html:partyRow(FO[s.i])})));if(j<0)continue;tg=lf[j]}
    acts.push({t:'mv',p,mi:a.i,tg,spd:p.m.spd+rnd()});break}}
  const smart=B.tr.smart??.4;
  for(const f of liveF()){const lp=liveP();let tg=lp[(rnd()*lp.length)|0];if(rnd()<smart)tg=lp.slice().sort((x,y)=>x.m.hp/x.m.mhp-y.m.hp/y.m.mhp)[0];acts.push({t:'fm',f,tg,spd:FO[f.i].spd+rnd()})}
  acts.sort((x,y)=>y.spd-x.spd);
  for(const A of acts){if(result)break;
   if(A.t==='sw'){if(A.p.m.hp<=0)continue;ctx(A.p,liveF()[0]);await msg(`Reviens, ${nm(A.p.m)} !`);await tween(250,k=>A.p.r.g.scale.setScalar(A.p.r.sc*(1-k)));duoDispose(A.p.r);
    A.p.m=A.m;A.p.st={atk:0,def:0,acc:0};A.p.r=duoPlace('p',A.m,A.p.k,n);A.p.r.g.scale.setScalar(0);B.part.add(A.m);ctx(A.p,null);await msg(`À toi, ${nm(A.m)} !`);await popIn(A.p.r);continue}
   if(A.t==='it'){ctx(A.p,liveF()[0]);const m=S.party[A.a.t];const t=applyItem(A.a.id,m);hud();duoHud(D);sfx(880,.1,'triangle');await msg(t);continue}
   if(A.t==='mv'){if(A.p.m.hp<=0||!D.ps.includes(A.p))continue;const f=A.tg&&FO[A.tg.i].hp>0&&D.fs.includes(A.tg)?A.tg:liveF()[0];if(!f)continue;ctx(A.p,f);await useMove('p',A.mi)}
   if(A.t==='fm'){if(FO[A.f.i].hp<=0||!D.fs.includes(A.f))continue;const p=A.tg&&A.tg.m.hp>0&&D.ps.includes(A.tg)?A.tg:liveP()[0];if(!p)continue;ctx(p,A.f);await useMove('f',foeChoice())}
   await ko();result=fini()}
  if(!result){for(const p of liveP()){ctx(p,liveF()[0]);await duoEndSide('p')}for(const f of liveF()){ctx(liveP()[0],f);await duoEndSide('f')}await ko();result=fini()}}
 for(const s of[...D.fs,...D.ps])if(s)duoDispose(s.r);B.pm=null;B.fm=null;B.duoOn=0;duoHud(null);B.fi=Math.min(B.fi,FO.length-1);return result}
