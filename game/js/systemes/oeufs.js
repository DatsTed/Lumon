function baseOf(sp){let b=sp,guard=0;for(;;){const pre=Object.keys(SP).find(k=>SP[k].evo&&SP[k].evo[1]===b);if(!pre||guard++>5)return b;b=pre}}
function eggSteps(sp){const d=SP[sp];return Math.round(Math.min(2500,Math.max(800,d.b.reduce((a,b)=>a+b,0)*4))/50)*50}
function eggHint(e){const r=e.left/e.total;return r>.66?"On dirait qu'il faudra encore marcher longtemps.":r>.33?"Il bouge de temps en temps. Ça avance !":r>.08?"On entend des petits bruits dedans !":"Il va éclore d'un moment à l'autre !"}
function mkEgg(sp,ivFrom,shiny){const total=eggSteps(sp);return{sp,left:total,total,iv:ivFrom||null,shiny:!!shiny}}
function giveEgg(e){S.eggs=S.eggs||[];if(S.eggs.length>=3)return false;S.eggs.push(e);return true}
async function eggStory(){const G='Mineur Gérard',f=F();f.egg1=1;
 await say(G,"Hé, toi ! Viens voir. J'ai trouvé un truc près du vieux puits, ce matin, tout au chaud contre une scorie encore tiède…");
 await say(G,"Un œuf ! Un œuf de Lumon, une fois ! Mais moi, je peux pas le garder : ma femme dit déjà qu'il y a trop de bêtes à la maison.");
 await say(G,"Toi, t'as l'air d'aimer les Lumons. Garde-le au chaud, sur toi. Les œufs, ça éclot quand on marche beaucoup. Beaucoup beaucoup.");
 {const e=mkEgg('scorion',null,rnd()<1/50);e.left=e.total=1000;giveEgg(e)}sfx(784,.15);sfx(1046,.25);await banner('Tu as reçu un Œuf !','Marche pour le faire éclore',2200);
 await say(G,"Et si un jour tu veux d'autres œufs, va voir la Pension de Mamie Rose, près de la friterie. Elle garde les Lumons… et parfois, il se passe des choses, si tu vois ce que je veux dire. Hé hé.");setObj()}
async function talkPension(){const N='Mamie Rose',f=F();S.pension=S.pension||{mons:[],steps:0,egg:null};const P=S.pension;
 if(!f.egg1){await say(N,"Bonjour, mon petit ! Je tiens la Pension des Lumons. Mais je ne prends que les dresseurs qui savent s'occuper d'un œuf. Va voir Gérard, le mineur, il cherche quelqu'un de confiance.");return}
 if(P.egg){if((S.eggs||[]).length>=3){await say(N,"Il y a un œuf pour toi ! Mais tu en portes déjà trois. Fais-en éclore un d'abord.");}else{await say(N,"Ah, te voilà ! Tes deux Lumons… on a trouvé un œuf ! Je ne sais pas d'où il vient, hé hé. Tiens, prends-en bien soin.");giveEgg(P.egg);P.egg=null;sfx(784,.15);sfx(1046,.25);await banner('Tu as reçu un Œuf !','Marche pour le faire éclore',1800)}}
 if(!f.roseMet){f.roseMet=1;await say(N,"Bienvenue à la Pension de Mamie Rose ! Tu me confies deux Lumons, je les chouchoute, ils gagnent un peu d'expérience pendant que tu marches.");
  await say(N,"Et si c'est un mâle et une femelle de la même espèce, ou qui partagent un type… il arrive qu'un œuf apparaisse. Les Lumons uniques et les fusions, eux, ne font jamais d'œufs.")}
 const opts=P.mons.length?['Reprendre mes Lumons','Rien']:['Confier deux Lumons','Rien'];
 if(P.mons.length){await say(N,`Je garde ${P.mons.map(m=>nm(m)+(m.gender==='m'?' ♂':m.gender==='f'?' ♀':'')+' N.'+m.lv).join(' et ')}. ${compatTxt(P.mons)}`)}
 const c=await choose(N,"Qu'est-ce que je peux faire pour toi ?",opts);if(c)return;
 if(P.mons.length){if(S.party.length+P.mons.length>6){await say(N,"Ton équipe est trop pleine pour les reprendre tous les deux !");return}S.party.push(...P.mons);P.mons=[];P.steps=0;refreshFollower();await say(N,"Les voilà ! Ils ont bien profité. Reviens quand tu veux.");return}
 if(S.party.length<3){await say(N,"Il faut garder au moins un Lumon avec toi, mon petit. Reviens avec trois Lumons ou plus.");return}
 const pick=[];for(let k=0;k<2;k++){const i=await pickList(k?'Le 2e Lumon à confier':'Le 1er Lumon à confier',S.party.map((m,j)=>({html:partyRow(m),dis:pick.includes(m)})));if(i<0)return;pick.push(S.party[i])}
 S.party=S.party.filter(m=>!pick.includes(m));P.mons=pick;P.steps=0;refreshFollower();await say(N,`C'est noté ! Je garde ${pick.map(m=>nm(m)).join(' et ')}. ${compatTxt(pick)}`)}
function compat(a,b){if(!a||!b)return 0;ensureGenes(a);ensureGenes(b);const A=SP[a.sp],Bd=SP[b.sp];if(A.unique||Bd.unique||A.fusion||Bd.fusion)return 0;if(!a.gender||!b.gender||a.gender===b.gender)return 0;if(baseOf(a.sp)===baseOf(b.sp))return 2;return A.t.some(t=>Bd.t.includes(t))?1:0}
function compatTxt(ms){const c=compat(ms[0],ms[1]);return c===2?"Ils ont l'air de beaucoup s'apprécier !":c===1?"Ils s'entendent plutôt bien.":"Ils préfèrent jouer chacun de leur côté."}
function breedTick(){const P=S.pension;if(!P||P.mons.length<2)return;P.steps++;P.mons.forEach(m=>{m.xp+=1;while(m.xp>=(m.lv+1)**3&&m.lv<100){m.lv++;calc(m);m.hp=m.mhp}});
 const c=compat(P.mons[0],P.mons[1]);if(!P.egg&&c&&P.steps%120===0&&rnd()<(c===2?.6:.3)){const mom=P.mons.find(m=>m.gender==='f')||P.mons[0],dad=P.mons.find(m=>m!==mom);const iv=[0,0,0,0].map(()=>Math.floor(rnd()*32));
  [0,1,2,3].sort(()=>rnd()-.5).slice(0,3).forEach(k=>{iv[k]=(rnd()<.5?mom:dad).iv[k]});P.egg=mkEgg(baseOf(mom.sp),iv,rnd()<1/400);P.egg.nat=(rnd()<.5?mom:dad).nat;toast('egg',"Mamie Rose t'appelle : il s'est passé quelque chose à la Pension !")}}
async function eggTick(){if(!S.eggs||!S.eggs.length)return;for(const e of S.eggs)e.left=Math.max(0,e.left-(laika()&&(laika().fr||0)>=200?2:1));const e=S.eggs.find(x=>x.left<=0);if(e&&!busy)await runScript(()=>hatch(e))}
async function hatch(e){if(S.party.length>=6){if(!e.warned){e.warned=1;await say('',"Ton œuf bouge… mais ton équipe est pleine ! Libère une place pour qu'il puisse éclore.")}e.left=1;return}
 S.eggs=S.eggs.filter(x=>x!==e);await say('',"Oh ? Ton œuf bouge !");await fadeOut();viewSpecies(e.sp);galModel.g.visible=false;const G=GAL.group,egg=new THREE.Group();egg.position.set(500,.1,0);G.add(egg);
 tp(egg,SPH,'#fbf6ea',0,.75,0,.55,.7,.55);[[-.2,.9,.45,'#a04ae8'],[.25,.6,.48,'#3ef0ff'],[0,1.15,.35,'#ffd84a']].forEach(([x,y,z,c])=>tp(egg,SPH,c,x,y,z,.12,.12,.05,{ol:false}));$('fade').style.opacity=0;await sleep(300);
 for(let k=0;k<3;k++){sfx(300+k*80,.1,'triangle',.12);await tween(500,q=>egg.rotation.z=Math.sin(q*PI*4)*.25*(k+1)/3);await sleep(250)}
 flashScr('#ffffff',600,1);sfx(1046,.15);sfx(1318,.3);G.remove(egg);galModel.g.visible=true;
 const m=mkMon(e.sp,1);m.lv=1;m.xp=1;if(e.iv)m.iv=e.iv;if(e.nat!=null)m.nat=e.nat;if(e.shiny){m.shiny=1;shinyfy(galModel)}calc(m);m.hp=m.mhp;m.fromEgg=1;S.party.push(m);S.dex.seen[m.sp]=S.dex.caught[m.sp]=1;
 await banner('L\'œuf a éclos !',`${SP[m.sp].n}${m.shiny?' ✦ shiny':''} rejoint ton équipe !`,2200);await say(SP[m.sp].n,CRY[m.sp]||'…');unlock('egg');await fadeOut();closeView();refreshFollower();await fadeIn()}
