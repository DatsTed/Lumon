/* ---- Monde vivant (bis) : lumière la nuit, lanternes au bord des routes, buissons qui cachent un objet,
   Lumons qui accompagnent les personnages principaux ----
   nightSetup() est appelé à la fin de buildWorld ; nightApply(n) par updateEnv (n = 0 le jour, 1 la nuit). */
let NIGHTG=[],GLOWT=null;
function glowTex(){if(GLOWT)return GLOWT;const c=document.createElement('canvas');c.width=c.height=64;const x=c.getContext('2d'),g=x.createRadialGradient(32,32,0,32,32,32);
 g.addColorStop(0,'rgba(255,255,255,1)');g.addColorStop(.3,'rgba(255,255,255,.5)');g.addColorStop(1,'rgba(255,255,255,0)');x.fillStyle=g;x.fillRect(0,0,64,64);GLOWT=new THREE.CanvasTexture(c);return GLOWT}
// halo lumineux (+ flaque de lumière au sol), invisible le jour
function glowAt(g,x,y,z,col='#ffd27a',s=1.1,ground=true){const sm=new THREE.SpriteMaterial({map:glowTex(),color:col,transparent:true,opacity:0,depthWrite:false,blending:THREE.AdditiveBlending}),sp=new THREE.Sprite(sm);sp.position.set(x,y,z);sp.scale.set(s,s,1);g.add(sp);NIGHTG.push([sm,.85]);
 if(ground){const pm=new THREE.MeshBasicMaterial({map:glowTex(),color:col,transparent:true,opacity:0,depthWrite:false,blending:THREE.AdditiveBlending}),pl=new THREE.Mesh(new THREE.PlaneGeometry(s*2.4,s*2.4),pm);pl.rotation.x=-PI/2;pl.position.set(x,.125,z);g.add(pl);NIGHTG.push([pm,.42])}}
function nightApply(n){const k=Math.max(0,Math.min(1,(n-.2)/.7));for(const[m,a]of NIGHTG)m.opacity=a*k}
// lanterne décorative (ne bloque pas le passage)
function lantern(g,m,x,z){const X=m.ox+x,Z=m.oz+z;add(g,new THREE.CylinderGeometry(.035,.05,1.15,6),'#2b2420',X,.65,Z,{ol:false});box(g,.2,.24,.2,X,1.3,Z,'#2b2420',{ol:.015});box(g,.14,.17,.14,X,1.3,Z,'#ffd98a',{emi:'#ffc24a',ol:false,cast:false});glowAt(g,X,1.32,Z,'#ffc870',1.25)}
function roadLanterns(m){const T=m.T;if(!T||m.room)return;const P=[],busy=(x,z)=>m.doors[x+','+z]||m.steps[x+','+z]||m.signs[x+','+z]||(m.items&&m.items[x+','+z])||m.npcs.some(n=>n.x===x&&n.z===z);
 for(let z=1;z<m.H-1;z++)for(let x=1;x<m.W-1;x++){if(T[z][x]!=='#')continue;for(const[dx,dz]of[[1,0],[-1,0],[0,1],[0,-1]]){const X=x+dx,Z=z+dz,X2=X+dx,Z2=Z+dz;
  if(!T[Z]||T[Z][X]!=='.'||m.solid[Z*m.W+X]||busy(X,Z)||!T[Z2]||T[Z2][X2]==='#')continue;if(P.some(([a,b])=>Math.abs(a-X)+Math.abs(b-Z)<7))continue;P.push([X,Z]);break}}
 P.slice(0,16).forEach(([x,z])=>lantern(m.group,m,x,z))}
// buissons qui bougent… et qui cachent un objet (on ne sait jamais : Kétosaure ou trésor ?)
const BUSH_LOOT=['sirop','speculoos','chips','lumisphere','supersirop','choco','zisoa'];
function itemBushes(m,n,seed){const T=m.T;if(!T)return;let s=seed;const R=()=>(s=s*16807%2147483647)/2147483647,c=[];
 for(let z=2;z<m.H-2;z++)for(let x=2;x<m.W-2;x++)if(T[z][x]==='.'&&!m.solid[z*m.W+x]&&[[1,0],[-1,0],[0,1],[0,-1]].filter(([a,b])=>T[z+b][x+a]==='.'&&!m.solid[(z+b)*m.W+x+a]).length>=3&&!m.signs[x+','+z]&&!m.doors[x+','+z]&&!m.steps[x+','+z]&&!m.npcs.some(q=>q.x===x&&q.z===z))c.push([x,z]);
 const pick=[];while(pick.length<n&&c.length){const[x,z]=c.splice((R()*c.length)|0,1)[0];if(pick.some(([a,b])=>Math.abs(a-x)+Math.abs(b-z)<8))continue;pick.push([x,z])}
 pick.forEach(([x,z],i)=>{const fl='bush_'+m.id+i,item=BUSH_LOOT[(seed+i*3)%BUSH_LOOT.length],b=new THREE.Group();b.position.set(m.ox+x,0,m.oz+z);m.group.add(b);
  tp(b,SPH,'#3f8a36',0,.3,0,.42,.34,.42);tp(b,SPH,'#4c9e3e',.2,.42,.1,.26,.22,.26);setSolid(m,x,z);const ph=i*2.3+seed;
  m.anim.push(t=>{if(F()[fl]){b.rotation.z=0;return}b.rotation.z=(Math.sin(t*1.1+ph)>.88)?Math.sin(t*38)*.07:0});
  m.signs[x+','+z]=async()=>{if(F()[fl]){await say('',"Un buisson tout à fait normal. Il ne bouge plus.");return}F()[fl]=1;sfx(700,.06,'triangle',.1);await say('',"Tu écartes les feuilles du buisson qui bougeait… Il y a quelque chose dedans !");give(item)}})}
// Lumons qui accompagnent les personnages principaux (comme Laïka avec toi)
const PETS={luciole:'noctiluce',mcsambre:'sambrax',snow:'givrale',captain:'krakapitaine',ginette:'terrilou',nils:()=>F().nilsMon!=null?STARTERS[F().nilsMon]:null};
function addPet(c,key){let sp=PETS[key];if(typeof sp==='function')sp=sp();if(!sp||!SP[sp]||!c||!c.g)return;try{const r=monModel(sp);r.g.scale.setScalar(.72*(MSCALE[sp]||1));r.g.position.set(.62,0,-.5);r.g.rotation.y=-.3;c.g.add(r.g);c.pet=r}catch(e){}}
function nightSetup(){for(const id in MAPS){const m=MAPS[id];if(m.room||id==='arena'||id==='gal')continue;roadLanterns(m)}
 [['route',4,11],['route2',3,23],['route3',3,37]].forEach(([id,n,seed])=>MAPS[id]&&itemBushes(MAPS[id],n,seed))}
// ---- Intérieurs éclairés : les pièces ne suivent plus la nuit du dehors (lampes allumées, lumière chaude) ----
const INDOOR_IDS=new Set(['lab']),isIndoor=m=>!!m&&(m.room||INDOOR_IDS.has(m.id));
const INLIGHT=new THREE.PointLight('#ffd9a0',0,16,1.6);INLIGHT.castShadow=false;scene.add(INLIGHT);
// applique (ou retire) l'éclairage intérieur ; appelé par nightApply (toutes les 4 s) et à chaque changement de carte
function indoorLight(){const m=cur,on=isIndoor(m)&&!B;if(on){INLIGHT.position.set(m.ox+(m.W-1)/2,3.4,m.oz+(m.H-1)/2);INLIGHT.intensity=1.15;HEMIL.intensity=Math.max(HEMIL.intensity,.78);HEMIL.color.set('#fff0dc');sun.intensity=Math.max(sun.intensity,.5);sun.color.set('#ffe6c8')}else INLIGHT.intensity=0}
{const na=nightApply;nightApply=function(n){na(n);indoorLight()}}
{const gm=gotoMap;gotoMap=function(...a){const r=gm.apply(this,a);try{updateEnv()}catch(e){}return r}}
// appliques murales (toujours allumées) le long du mur du fond, avec un halo
function wallLamps(m){const g=m.group,lab=m.id==='lab',n=Math.max(2,Math.round(m.W/4)),z=lab?m.oz-.4:m.oz+.47,y=lab?2.6:2.05;
 const xs=lab?[m.ox+2.9,m.ox+5.1]:Array.from({length:n},(_,k)=>m.ox+(m.W-1)*(k+.5)/n);
 for(const x of xs){box(g,.1,.32,.12,x,y-.23,z,'#3a2c22',{ol:false,cast:false});box(g,.26,.2,.18,x,y,z+.08,'#fff2c8',{emi:'#ffcf7a',ol:false,cast:false});
  const sm=new THREE.SpriteMaterial({map:glowTex(),color:'#ffcf80',transparent:true,opacity:.75,depthWrite:false,blending:THREE.AdditiveBlending}),sp=new THREE.Sprite(sm);sp.position.set(x,y,z+.25);sp.scale.set(1.3,1.3,1);g.add(sp)}}
{const ns=nightSetup;nightSetup=function(){ns();for(const id in MAPS){const m=MAPS[id];if(isIndoor(m))wallLamps(m)}}}
