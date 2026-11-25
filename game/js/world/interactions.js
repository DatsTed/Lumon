function laika(){return S.party.find(m=>m.sp==='laikamobile'||m.sp==='laikador'||m.sp==='cerbiscuit')}
function FOLD(){const l=laika();return l&&S.party[0]===l?.95-Math.min(255,l.fr||0)/255*.35:.95}
function addFr(n){const l=laika();if(!l)return;l.fr=Math.min(255,(l.fr||0)+n);if(l.fr>=255)unlock('friend')}
function interact(){if(follower&&follower.map===cur&&laika()&&S.party[0]===laika()){const[dx0,dz0]=DV[player.dir];if(Math.round(follower.px)===player.x+dx0&&Math.round(follower.pz)===player.z+dz0){runScript(petLaika);return}}const[dx,dz]=DV[player.dir],x=player.x+dx,z=player.z+dz,k=x+','+z;
 const n=cur.npcs.find(n=>!n.hidden&&n.x===x&&n.z===z);
 if(n&&n.talk){runScript(async()=>{const old=n.dir;n.face({up:'down',down:'up',left:'right',right:'left'}[player.dir]);await n.talk();if(n===NPC.fisher)n.face(old)});return}
 const it=cur.items[k];if(it&&!F()[it.flag]){runScript(async()=>{F()[it.flag]=1;it.s.visible=false;setSolid(cur,x,z,0);S.bag[it.id]=(S.bag[it.id]||0)+it.n;sfx(988,.1);sfx(1318,.2);await say('',`Tu trouves ${it.n} × ${ITEMS[it.id].n} !`)});return}
 const s=cur.signs[k];if(s){runScript(async()=>{typeof s==='function'?await s():await say('',s)});return}
 if(cur.doors[k])runScript(cur.doors[k])}
async function onStepped(){const k=player.x+','+player.z;breedTick();await eggTick();{const f=F();f.walk=(f.walk||0)+1;if(f.walk===18)tip('sprint',"Pousse le joystick tout au bord pour <b>courir</b> !");if(f.walk===60&&laika())tip('pet',"Mets-toi face à Laïka et touche l'écran pour la <b>caresser</b> : votre amitié grandit.")}
 {const a=ambushAt(cur.id,player.x,player.z);if(a){await runScript(()=>ambush(a));return}}
 if(cur.hook){const h=cur.hook(player.x,player.z);if(h){await runScript(h);return}}
 if(cur.steps[k]){await runScript(cur.steps[k]);return}
 for(const tr of cur.trainers){if(F()[tr.flag]&&!tr.rematchReady)continue;const c=tr.c,[dx,dz]=DV[c.dir];for(let i=1;i<=tr.range;i++){const x=c.x+dx*i,z=c.z+dz*i;if(cur.solid[z*cur.W+x])break;if(x===player.x&&z===player.z){await runScript(()=>trainerSpot(tr,i));return}}}
 if(cur.T&&cur.T[player.z][player.x]==='g'&&cur.wildAt&&alive().length&&rnd()<cur.grassRate){await runScript(wildEncounter)}}
async function trainerSpot(tr,dist){const c=tr.c;const ex=new THREE.Group();tp(ex,BOXG,'#d8232a',0,.18,0,.08,.26,.08);tp(ex,SPH,'#d8232a',0,-.02,0,.05,.05,.05);ex.position.y=1.8;c.g.add(ex);sfx(1200,.15);await sleep(700);c.g.remove(ex);
 const[dx,dz]=DV[c.dir];for(let i=1;i<dist;i++)await c.step(c.x+dx,c.z+dz);player.face({up:'down',down:'up',left:'right',right:'left'}[c.dir]);
 const re=!!F()[tr.flag];tr.rematchReady=false;await say(tr.name,re?(tr.re||"Encore toi ! Allez, revanche, on remet ça !"):tr.intro);const res=await battle({trainer:{name:tr.name,key:tr.key,smart:tr.smart,prize:tr.prize,rematch:re,mons:re?tr.mons().map(m=>{const n=mkMon(m.sp,m.lv+2);return n}):tr.mons(),win:tr.win}});
 if(res==='win'&&!re){F()[tr.flag]=1;if(tr.reward){await say(tr.name,`Tiens, prends ça, ça te servira !`);give(tr.reward[0],tr.reward[1])}}}
function shinyfy(r){r.g.traverse(o=>{if(o.isMesh&&o.material&&o.material.emissive!==undefined&&!o.userData.ol){o.material=o.material.clone();o.material.emissive=new THREE.Color('#3ef0ff');o.material.emissiveIntensity=.35;o.material.color&&o.material.color.offsetHSL(.45,.1,.05)}});return r}
async function wildEncounter(){const tb=cur.wildAt(player.z),tot=tb.reduce((s,w)=>s+w[3],0);let r=rnd()*tot,w=tb[0];for(const e of tb){if((r-=e[3])<0){w=e;break}}
 const lv=w[1]+Math.floor(rnd()*(w[2]-w[1]+1)),wm=mkMon(w[0],lv);if(rnd()<1/400||window.__forceShiny)wm.shiny=1;await battle({wild:wm})}

const TEMPS=new Set();async function tempChar(key,x,z,dir){const c=new Char(human(CH[key]),cur,x,z,dir);c.snap();TEMPS.add(c);return c}
function killTemp(c){TEMPS.delete(c);c.map.group.remove(c.g);c.map.group.remove(c.sh)}
function freeNear(r){const opts=[];for(let dz=-r;dz<=r;dz++)for(let dx=-r;dx<=r;dx++){if(Math.abs(dx)+Math.abs(dz)!==r)continue;const x=player.x+dx,z=player.z+dz;if(walkable(cur,x,z)&&cur.T&&cur.T[z]&&cur.T[z][x]!=='g'&&!(follower&&follower.x===x&&follower.z===z))opts.push([x,z])}return opts[(rnd()*opts.length)|0]}
