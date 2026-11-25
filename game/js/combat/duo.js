/* ---- Combats à plusieurs : 2 contre 2 (moments scénarisés) et 3 contre 3 (Snow et ses deux bras droits) ----
   battle({duo:2|3, trainer:{…, mons:[…]}}) : chaque camp a n Lumons sur le terrain.
   On réutilise le moteur 1 contre 1 en « branchant » la bonne paire (B.me / B.fi) avant chaque action.
   Ordre des actions : vitesse. Cible choisie par le joueur ; l'IA vise plutôt le Lumon le plus affaibli (selon B.tr.smart). */
function duoPlace(side,m,k,n){const r=monModel(m.sp,m.form);if(m.shiny)shinyfy(r);const a=ARENA.p1,b=ARENA.p2,base=side==='p'?a:b;
 const dir=new V(b.x-a.x,0,b.z-a.z).normalize(),perp=new V(-dir.z,0,dir.x),off=(k-(n-1)/2)*(side==='p'?.95:1.15);
 r.g.position.set(base.x+perp.x*off,.12,base.z+perp.z*off);r.base=r.g.position.clone();
 r.sc=(side==='p'?1.25:1.25*Math.min(1.6,Math.max(1.1,(ARENA.depthRatio||1.6)*.85)))*MSCALE[m.sp]*(n>2?.85:1);r.g.scale.setScalar(r.sc);
 const o=side==='p'?b:a;r.g.rotation.y=Math.atan2(o.x-r.base.x,o.z-r.base.z)+(side==='p'?.25:-.35);ARENA.group.add(r.g);return r}
function duoHud(D){let el=$('duoHud');if(!el){el=document.createElement('div');el.id='duoHud';document.body.appendChild(el)}if(!D){el.remove();return}
 const row=(m,cur)=>{const r=m.hp/m.mhp;return `<div class="dh${cur?' cur':''}${m.hp<=0?' ko':''}"><b>${nm(m)}</b> N.${m.lv}<i><u style="width:${r*100}%;background:${hpCol(r)}"></u></i></div>`};
 el.innerHTML=`<div class="dhs f">${D.fs.filter(Boolean).map(s=>row(B.foes[s.i],B.fi===s.i)).join('')}</div><div class="dhs p">${D.ps.filter(Boolean).map(s=>row(s.m,B.me===s.m)).join('')}</div>`}
async function duoEndSide(side){const m=side==='p'?B.me:foeM(),r=side==='p'?B.pm:B.fm;if(!m||m.hp<=0)return;
 if(m.status==='brn'||m.status==='psn'){const dmg=Math.max(1,Math.floor(m.mhp/(m.status==='brn'?16:8)));m.hp=Math.max(0,m.hp-dmg);await statusFx(r,m.status);hitNum(r,'-'+dmg,m.status==='brn'?'#ff9a3c':'#c77dff');hud();await msg(m.status==='brn'?`${label(side)} souffre de sa brûlure !`:`${label(side)} souffre du poison !`)}}
async function duoLoop(cfg){const n=cfg.duo,FO=B.foes,D={fs:[],ps:[]};let next=0;
 const liveF=()=>D.fs.filter(s=>s&&FO[s.i].hp>0),liveP=()=>D.ps.filter(s=>s&&s.m.hp>0);
 const ctx=(p,f)=>{if(p){B.me=p.m;B.pm=p.r;B.st.p=p.st}if(f){B.fi=f.i;B.fm=f.r;B.st.f=f.st}hud();$('bFoe').style.display='none';duoHud(D)};
 // les adversaires entrent
 if(B.fm){disposeModel(B.fm);B.fm=null}
 for(let k=0;k<n&&next<FO.length;k++){const i=next++;S.dex.seen[FO[i].sp]=1;const s={i,k,st:{atk:0,def:0,acc:0},r:duoPlace('f',FO[i],k,n)};s.r.g.scale.setScalar(0);D.fs.push(s)}
 ctx(null,D.fs[0]);await msg(`${B.tr.name} envoie ${D.fs.map(s=>nm(FO[s.i])).join(', ')} !`);for(const s of D.fs)await popIn(s.r);
 // ton équipe entre
 const team=alive().slice(0,n);team.forEach((m,k)=>{const s={m,k,st:{atk:0,def:0,acc:0},r:duoPlace('p',m,k,n)};s.r.g.scale.setScalar(0);B.part.add(m);D.ps.push(s)});
 ctx(D.ps[0],D.fs[0]);$('bMe').style.display='block';await msg(`Vas-y, ${D.ps.map(s=>nm(s.m)).join(' et ')} !`);for(const s of D.ps)await popIn(s.r);if(OPT.anim)await camHome(400);
 const ko=async()=>{for(const s of D.fs){if(!s||FO[s.i].hp>0||s.done)continue;s.done=1;ctx(liveP()[0]||D.ps[0],s);await faintFx(s.r);await msg(`${label('f')} est K.O. !`);await gainXP(FO[s.i]);
   if(next<FO.length){const i=next++,ns={i,k:s.k,st:{atk:0,def:0,acc:0},r:duoPlace('f',FO[i],s.k,n)};disposeModel(s.r);D.fs[D.fs.indexOf(s)]=ns;S.dex.seen[FO[i].sp]=1;ns.r.g.scale.setScalar(0);ctx(null,ns);await msg(`${B.tr.name} envoie ${nm(FO[i])} !`);await popIn(ns.r)}}
  for(const s of D.ps){if(!s||s.m.hp>0||s.done)continue;s.done=1;ctx(s,liveF()[0]||D.fs[0]);await faintFx(s.r);await msg(`${nm(s.m)} est K.O. !`);
   const bench=alive().filter(m=>!D.ps.some(q=>q&&q.m===m&&!q.done));if(!bench.length)continue;
   const j=await pickList(`Qui remplace ${nm(s.m)} ?`,bench.map(m=>({html:partyRow(m)})),false);const m=bench[Math.max(0,j)],ns={m,k:s.k,st:{atk:0,def:0,acc:0},r:duoPlace('p',m,s.k,n)};disposeModel(s.r);D.ps[D.ps.indexOf(s)]=ns;B.part.add(m);ns.r.g.scale.setScalar(0);ctx(ns,null);await msg(`À toi, ${nm(m)} !`);await popIn(ns.r)}};
 const fini=()=>!liveF().length&&next>=FO.length?'win':!liveP().length?'lose':null;
 let result=null;
 while(!result){const acts=[];
  for(const p of liveP()){for(;;){ctx(p,liveF()[0]);p.r.g.position.y=p.r.base.y+.18;const a=await act();p.r.g.position.y=p.r.base.y;
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
   if(A.t==='sw'){if(A.p.m.hp<=0)continue;ctx(A.p,liveF()[0]);await msg(`Reviens, ${nm(A.p.m)} !`);await tween(250,k=>A.p.r.g.scale.setScalar(A.p.r.sc*(1-k)));disposeModel(A.p.r);
    A.p.m=A.m;A.p.st={atk:0,def:0,acc:0};A.p.r=duoPlace('p',A.m,A.p.k,n);A.p.r.g.scale.setScalar(0);B.part.add(A.m);ctx(A.p,null);await msg(`À toi, ${nm(A.m)} !`);await popIn(A.p.r);continue}
   if(A.t==='it'){const m=S.party[A.a.t];const t=applyItem(A.a.id,m);hud();duoHud(D);sfx(880,.1,'triangle');await msg(t);continue}
   if(A.t==='mv'){if(A.p.m.hp<=0||!D.ps.includes(A.p))continue;const f=A.tg&&FO[A.tg.i].hp>0&&D.fs.includes(A.tg)?A.tg:liveF()[0];if(!f)continue;ctx(A.p,f);await useMove('p',A.mi)}
   if(A.t==='fm'){if(FO[A.f.i].hp<=0||!D.fs.includes(A.f))continue;const p=A.tg&&A.tg.m.hp>0&&D.ps.includes(A.tg)?A.tg:liveP()[0];if(!p)continue;ctx(p,A.f);await useMove('f',foeChoice())}
   await ko();result=fini()}
  if(!result){for(const p of liveP()){ctx(p,liveF()[0]);await duoEndSide('p')}for(const f of liveF()){ctx(liveP()[0],f);await duoEndSide('f')}await ko();result=fini()}}
 for(const s of[...D.fs,...D.ps])if(s)disposeModel(s.r);B.pm=null;B.fm=null;duoHud(null);B.fi=Math.min(B.fi,FO.length-1);return result}
