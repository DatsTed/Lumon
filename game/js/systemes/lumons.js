const critRate=(m,v)=>{ensureGenes(m);const base=.03+(SP[m.sp].b[3]+m.iv[3])/1000+(SP[m.sp].unique&&m.fr?m.fr/2550:0);return Math.min(.35,base*(v&&v.hc?2:1))};
const NAT=[['Tranquille',-1,-1,'Pas de bonus, pas de malus. Un Lumon zen.'],['Dikkenek',1,2,'Attaque +10 %, Défense −10 %. Il se la pète un peu.'],['Zwanzeur',3,2,'Vitesse +10 %, Défense −10 %. Toujours une blague en tête.'],['Brusseleir',2,3,'Défense +10 %, Vitesse −10 %. Solide comme le Manneken.'],['Ketje',3,1,'Vitesse +10 %, Attaque −10 %. Un vrai gamin des Marolles.'],['Costaud',1,3,'Attaque +10 %, Vitesse −10 %. Il mange des boulets au petit-déj.'],['Bourgmestre',2,1,'Défense +10 %, Attaque −10 %. Calme et respecté.']];
const STATN=['PV','Attaque','Défense','Vitesse'];
function genderOf(sp){const d=SP[sp];if(!d)return null;if(/^laika|^cerbisc/.test(sp))return'f';if(d.unique)return null;return rnd()<.5?'m':'f'}
const GSYM=m=>m.gender==='m'?'<b style="color:#5ab0ff"> ♂</b>':m.gender==='f'?'<b style="color:#ff7ab0"> ♀</b>':'';
function ensureGenes(m){if(m.gender===undefined)m.gender=genderOf(m.sp);if(!m.iv)m.iv=[0,0,0,0].map(()=>Math.floor(rnd()*32));if(!m.ev)m.ev=[0,0,0,0];if(m.nat==null)m.nat=Math.floor(rnd()*NAT.length)}
function calc(m){ensureGenes(m);const b=SP[m.sp].b,L=m.lv,iv=m.iv,ev=m.ev,nt=NAT[m.nat],nf=i=>i===nt[1]?1.1:i===nt[2]?.9:1;const old=m.mhp||0;
 const st=i=>Math.floor((Math.floor((2*b[i]+iv[i]+Math.floor(ev[i]/4))*L/100)+5)*nf(i));m.mhp=Math.floor((2*b[0]+iv[0]+Math.floor(ev[0]/4))*L/100)+L+10;m.atk=st(1);m.def=st(2);m.spd=st(3);return m.mhp-old}
function calcOld(m){const b=SP[m.sp].b,L=m.lv;const old=m.mhp||0;m.mhp=Math.floor(2*b[0]*L/100)+L+10;m.atk=Math.floor(2*b[1]*L/100)+5;m.def=Math.floor(2*b[2]*L/100)+5;m.spd=Math.floor(2*b[3]*L/100)+5;return m.mhp-old}
function mkMon(sp,lv){const m={sp,lv,xp:lv**3,moves:[],gender:genderOf(sp)};SP[sp].L.forEach(([l,id])=>{if(l<=lv&&!m.moves.some(x=>x.id===id)){m.moves.push({id,pp:MV[id].pp});if(m.moves.length>4)m.moves.shift()}});calc(m);m.hp=m.mhp;return m}
const nm=m=>SP[m.sp].n;
const alive=()=>S.party.filter(m=>m.hp>0);
async function healJingle(){if(!AC||!OPT.sfx){await sleep(400);return}const was=musicOn;musicOn=false;const t0=AC.currentTime+.05,N=[[67,0],[72,.16],[76,.32],[79,.48],[76,.72],[79,.88],[84,1.04]];
 N.forEach(([n,t],i)=>{tone(mf(n),t0+t,i===N.length-1?.7:.2,'triangle',.55);tone(mf(n+12),t0+t,i===N.length-1?.5:.12,'sine',.18)});tone(mf(48),t0,1.6,'triangle',.4);tone(mf(55),t0+.48,1.2,'triangle',.3);
 await sleep(1900);musicOn=was;mNext=AC.currentTime+.05}
async function healFx(who){await healJingle();healAll();toast('sirop','Tous tes Lumons sont en pleine forme !')}
async function healMachine(){const M=cur&&cur.mach;if(!M){await healFx();return}const balls=[];
 for(let i=0;i<S.party.length;i++){const b=lumiBall(.075);const p=M.slots[i];b.position.set(p[0],p[1],p[2]);b.scale.setScalar(.01);M.g.add(b);balls.push(b);sfx(660+i*60,.06,'square',.12);await tween(160,q=>b.scale.setScalar(Math.max(.01,q<.7?q*1.5:1.05-(q-.7)*.17)));await sleep(90)}
 const run=tween(1900,q=>{M.glow.material.opacity=.35+.6*Math.abs(Math.sin(q*PI*5));M.ring.rotation.z=q*12;balls.forEach((b,i)=>{b.rotation.y=q*20+i;b.position.y=M.slots[i][1]+Math.abs(Math.sin(q*PI*6+i))*.05})});
 await Promise.all([healJingle(),run]);M.glow.material.opacity=.15;healAll();sfx(1568,.12,'triangle',.15);
 for(const b of balls){await tween(90,q=>b.scale.setScalar(1-q*.99));M.g.remove(b)}toast('sirop','Tous tes Lumons sont en pleine forme !')}
