/* ================= CARTES ================= */
const MMC={'N':'#e8e8ee','T':'#1f5a2a','~':'#2a6aa8','=':'#a8743f','#':'#c9b78a','c':'#b8ad98','g':'#2f8a2a','D':'#6a5a4a','L':'#7aa040','r':'#8a8580','.':'#3f7a3a','f':'#4f8a3a','W':'#8a6a4a','K':'#3d3756','F':'#cccccc'};
function drawMinimap(){const c=$('minimap');if(!player||!cur||!cur.T||B||camMode!=='follow'||busy&&!cur){c.style.display='none';return}c.style.display='block';
 const W=cur.W,H=cur.H,k=4;if(c.width!==W*k||c.height!==H*k){c.width=W*k;c.height=H*k}const x=c.getContext('2d');
 for(let z=0;z<H;z++)for(let xx=0;xx<W;xx++){const t=cur.T[z][xx];let col=MMC[t]||'#3f7a3a';if(cur.solid[z*W+xx]&&!'T~LrF'.includes(t))col='#7a4ac8';x.fillStyle=col;x.fillRect(xx*k,z*k,k,k)}
 x.fillStyle='#ffd84a';for(const key in cur.steps){const[a,b]=key.split(',').map(Number);if(a===0||b===0||a===W-1||b===H-1)x.fillRect(a*k,b*k,k,k)}
 x.fillStyle='#ff3b5c';cur.npcs.forEach(n=>{if(!n.hidden)x.fillRect(n.x*k,n.z*k,k,k)});
 x.fillStyle='#ffffff';x.shadowColor='#3ef0ff';x.shadowBlur=6;x.beginPath();x.arc(player.x*k+k/2,player.z*k+k/2,k*.9,0,7);x.fill();x.shadowBlur=0}
setInterval(drawMinimap,250);
$('minimap').onclick=()=>{if(!busy&&player)runScript(worldMap)};
const WMN=[{k:'ix',n:'Ixellette',x:197,y:214,maps:['town','lab','nw_town'],town:1,a:'end'},{k:'r1',n:'Route 1',x:193,y:186,maps:['route'],a:'end'},{k:'ch',n:'Charleroc',x:188,y:160,maps:['charl','centre','shop','gym'],town:1,a:'end'},
 {k:'r2',n:'Route 2',x:188,y:146,maps:['route2'],a:'start',dx:4},{k:'bx',n:'Bruxellia',x:188,y:132,maps:['brux','centre_b','nw_brux'],town:1,a:'middle',dy:-16},{k:'r3',n:'Garage',x:201,y:134,maps:['route3'],a:'middle',dy:-9},{k:'jf',n:'Jourdanfritte',x:214,y:136,maps:['jf','centre_j','nw_jf'],town:1,dy:-10},{k:'an',n:'Anversaille',x:193,y:87,wip:1,town:1},{k:'ga',n:'Gandoux',x:131,y:111,wip:1,town:1,dy:22,a:'end',dx:10},{k:'co',n:'Côte du Nord',x:58,y:89,wip:1,town:1,dy:-14,a:'start',dx:-30},
 {k:'li',n:'Liègenoir',x:300,y:171,wip:1,town:1,a:'middle',dy:-15},{k:'na',n:'Namuroc',x:238,y:196,wip:1,town:1,dy:16},{k:'ba',n:'Bastognac',x:314,y:262,wip:1,town:1,a:'end'}];
const WML=[['ix','r1'],['r1','ch'],['ch','r2'],['r2','bx'],['bx','r3'],['r3','jf'],['bx','an'],['bx','ga'],['ga','co'],['an','ga'],['ch','na'],['na','li'],['li','ba'],['na','ba']].map(([a,b])=>[WMN.findIndex(n=>n.k===a),WMN.findIndex(n=>n.k===b)]);
// Mode test : points d'arrivée de la téléportation (carte, x, z)
const WMTP={ix:['town',18,21],r1:['route',11,45],ch:['charl',6,9],r2:['route2',11,37],bx:['brux',5,13],r3:['route3',2,9],jf:['jf',9,5]};
function worldMap(){return new Promise(r=>{const here=WMN.findIndex(n=>n.maps&&n.maps.includes(cur&&cur.id));
 let h=`<svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" style="touch-action:none"><rect width="400" height="400" fill="#0e0b18"/><g id="wmG">
 <path d="M24.6,105.6 L65.6,82.8 L99.3,65.7 L143.1,88.5 L179.6,65.7 L193.3,50 L225.2,47.1 L257.1,57.1 L293.6,75.7 L325.5,97 L311.8,125.6 L310,149.8 L341,154.1 L363.8,172.6 L375.7,215.4 L357.4,239.6 L341.9,239.6 L325.5,296.7 L322.8,325.2 L289,332.3 L270.8,306.7 L234.3,289.5 L234.3,239.6 L218.8,262.5 L175,266.7 L170.5,222.5 L129.4,215.4 L93,189.7 L74.7,149.8 L56.5,161.2 L29.1,139.8 Z" fill="#1b1530" stroke="#3ef0ff" stroke-width="2.5" stroke-linejoin="round" style="filter:drop-shadow(0 0 4px #3ef0ff)"/>
 <path d="M24.6,105.6 L65.6,82.8 L99.3,65.7" fill="none" stroke="#2a6aa8" stroke-width="5" opacity=".8"/><text x="22" y="72" fill="#3a7ac8" font-family="Fredoka,sans-serif" font-size="11" transform="rotate(-28 22 72)">Mer du Nord</text>
 <polyline points="232.5,242.5 236.1,194 266.2,186.9 300,171.2 310.9,139.8 316.4,118.4" fill="none" stroke="#2a6aa8" stroke-width="3.5" opacity=".75"/><polyline points="165.9,218.2 196.9,202.6 236.1,194" fill="none" stroke="#2a6aa8" stroke-width="2.5" opacity=".6"/>
 <polyline points="102.1,175.5 131.3,111.3 165.9,107 193.3,87.1 179.6,65.7" fill="none" stroke="#2a6aa8" stroke-width="2.5" opacity=".6"/>
 <path d="M260,250 l6,-10 l6,10 M276,262 l6,-10 l6,10 M292,248 l6,-10 l6,10 M270,282 l6,-10 l6,10" fill="none" stroke="#3a6a4a" stroke-width="2" opacity=".7"/><text x="262" y="300" fill="#3a6a4a" font-family="Fredoka,sans-serif" font-size="11">Ardennes</text>`;
 WML.forEach(([a,b])=>{const A=WMN[a],Bn=WMN[b],w=A.wip||Bn.wip;h+=`<line x1="${A.x}" y1="${A.y}" x2="${Bn.x}" y2="${Bn.y}" stroke="${w?'#5a4a7a':'#ffd84a'}" stroke-width="${w?2:4}" ${w?'stroke-dasharray="5 5"':'style="filter:drop-shadow(0 0 3px #ffd84a)"'}/>`});
 WMN.forEach((n,i)=>{const col=n.wip?'#5a4a7a':(n.town?'#ffd84a':'#3ef0ff');h+=n.town?`<rect x="${n.x-8}" y="${n.y-8}" width="16" height="16" rx="3" fill="#14101f" stroke="${col}" stroke-width="3" data-i="${i}" style="cursor:pointer"/>`:`<circle cx="${n.x}" cy="${n.y}" r="6" fill="${col}" data-i="${i}" style="cursor:pointer"/>`;
  const an=n.a||'start',tx=n.x+(n.dx||0)+(an==='end'?-12:an==='middle'?0:12);h+=`<text data-i="${i}" x="${tx}" y="${n.y+5+(n.dy||0)}" fill="${n.wip?'#8a7aaa':'#efe8ff'}" font-family="Fredoka,sans-serif" font-size="13" text-anchor="${an}" style="paint-order:stroke" stroke="#0e0b18" stroke-width="3">${n.n}${n.wip?' 🚧':''}</text>`;
  if(i===here)h+=`<circle cx="${n.x}" cy="${n.y}" r="12" fill="none" stroke="#ff3b5c" stroke-width="3"><animate attributeName="r" values="10;18;10" dur="1.4s" repeatCount="indefinite"/><animate attributeName="opacity" values="1;.3;1" dur="1.4s" repeatCount="indefinite"/></circle>`});
 h+=`</g><text x="16" y="388" fill="#8a7aaa" font-family="Fredoka,sans-serif" font-size="12">🚧 en construction · ● tu es ici · touche une ville</text></svg>`;
 const world=()=>{$('wmTitle').textContent="Carte d'Ardenval";$('wmSvg').innerHTML=h+`<div class="wmz"><button class="btn alt" id="wmIn">＋</button><button class="btn alt" id="wmOut">－</button></div>`;const svg=$('wmSvg').querySelector('svg'),G=$('wmG');let sc=1,tx=0,ty=0,drag=null,moved=0;
  const ap=()=>{sc=Math.max(1,Math.min(3.2,sc));const lim=400*(sc-1);tx=Math.min(0,Math.max(-lim,tx));ty=Math.min(0,Math.max(-lim,ty));G.setAttribute('transform',`translate(${tx} ${ty}) scale(${sc})`)};
  const zoom=(f,cx=200,cy=200)=>{const ns=Math.max(1,Math.min(3.2,sc*f));tx=cx-(cx-tx)*ns/sc;ty=cy-(cy-ty)*ns/sc;sc=ns;ap()};
  if(here>=0){const n=WMN[here];zoom(1.8,n.x,n.y)}
  $('wmIn').onclick=()=>zoom(1.4);$('wmOut').onclick=()=>zoom(1/1.4);svg.onwheel=e=>{e.preventDefault();const b=svg.getBoundingClientRect();zoom(e.deltaY<0?1.2:1/1.2,(e.clientX-b.left)*400/b.width,(e.clientY-b.top)*400/b.height)};
  const pts=new Map();let pinch=0;
  svg.onpointerdown=e=>{svg.setPointerCapture(e.pointerId);pts.set(e.pointerId,[e.clientX,e.clientY]);drag=[e.clientX,e.clientY];moved=0;if(pts.size===2){const[a,b]=[...pts.values()];pinch=Math.hypot(a[0]-b[0],a[1]-b[1])}};
  svg.onpointermove=e=>{if(!pts.has(e.pointerId))return;pts.set(e.pointerId,[e.clientX,e.clientY]);const k=400/svg.getBoundingClientRect().width;
   if(pts.size===2){const[a,b]=[...pts.values()],d=Math.hypot(a[0]-b[0],a[1]-b[1]);if(pinch){zoom(d/pinch);moved=99}pinch=d;return}
   if(!drag)return;const dx=(e.clientX-drag[0])*k,dy=(e.clientY-drag[1])*k;moved+=Math.abs(dx)+Math.abs(dy);tx+=dx;ty+=dy;drag=[e.clientX,e.clientY];ap()};
  svg.onpointerup=async e=>{pts.delete(e.pointerId);if(pts.size<2)pinch=0;if(pts.size)return;drag=null;if(moved>6)return;const t=document.elementFromPoint(e.clientX,e.clientY);const i=t&&t.dataset&&t.dataset.i;if(i==null)return;const n=WMN[+i];
   if(n.wip){toast('map',`${n.n} : en construction 🚧`);return}const mid=n.maps[0];
   if(S.testMode&&WMTP[n.k]){hide('wmap');const c=await choose('',`Mode test : te téléporter à ${n.n} ?`,['Se téléporter','Voir le plan']);if(c===0){const[id,x,z]=WMTP[n.k];if(riding)toggleRide(false);await goMap(MAPS[id],x,z,'down');r();return}show('wmap')}
   cityView(MAPS[mid],n.n)};
  $('wmClose').textContent='Fermer';$('wmClose').onclick=()=>{hide('wmap');r()}};
 const POI={town:[[7,5,'Labo de la Prof'],[4,19,'Chez maman et tante Doudoune'],[18,19,'Night White'],[18,4,'Maison de Dolba'],[10,15,'Friterie Fernand'],[20,9,'Beffroi'],[14,13,'Fontaine'],[14,1,'↑ Route 1']],
  charl:[[6,6,'Maison des Lumons'],[22,7,'Boutique Lumi'],[14,3,'Arène'],[2,10,'Friterie Josette'],[25,13,'Scène Kéto'],[19,1,'↑ Route 2'],[14,24,'↓ Route 1'],[5,2,'Vieux terril']],
  route2:[[11,38,'↓ Charleroc'],[11,1,'↑ Bruxellia'],[16,34,'Étang']],brux:[[15,3,'Hôtel de ville'],[5,10,'Maison des Lumons'],[23,9,'Night White (Nour)'],[6,17,'Palais de justice'],[24,17,'Ligue'],[15,10,'Manneken-Lumon'],[14,24,'↓ Route 2'],[28,12,'→ Route 3']],
  route3:[[12,6,'Garage Wagner'],[1,9,'← Bruxellia'],[30,9,'Jourdanfritte →']],jf:[[9,2,'Night White (Amin)'],[16,3,'Smile and Eat'],[12,17,'Friterie'],[21,9,'Maison des Lumons'],[1,11,'← Route 3']],
  route:[[11,1,'Barrière de la mine'],[19,24,'Étang du Moulin'],[11,0,'↑ Charleroc'],[11,46,'↓ Ixellette']]};
 const cityView=(m,name)=>{$('wmTitle').textContent=name;const T=m.T,W=m.W,H=m.H,k=Math.floor(Math.min(380/W,420/H));const c=document.createElement('canvas');c.width=W*k;c.height=H*k;c.style.cssText='width:100%;height:auto;border-radius:10px;display:block;image-rendering:pixelated';
  const x=c.getContext('2d');for(let z=0;z<H;z++)for(let xx=0;xx<W;xx++){const ch=T[z][xx],sol=m.solid[z*W+xx]&&ch!=='T'&&ch!=='~';x.fillStyle=sol?'#5a4a6a':(MMC[ch]||'#3f7a3a');x.fillRect(xx*k,z*k,k,k);if(sol){x.fillStyle='rgba(255,255,255,.08)';x.fillRect(xx*k,z*k,k,2)}}
  m.npcs.forEach(n=>{if(n.hidden)return;x.fillStyle='#ff6a9a';x.beginPath();x.arc((n.x+.5)*k,(n.z+.5)*k,k*.28,0,7);x.fill()});
  x.font=`600 ${Math.max(10,k*.9)}px Fredoka,sans-serif`;x.textAlign='center';x.lineWidth=4;x.strokeStyle='#0e0b18';(POI[m.id]||[]).forEach(([px,pz,t])=>{const tw=x.measureText(t).width,X=Math.min(c.width-tw/2-3,Math.max(tw/2+3,(px+.5)*k));x.strokeText(t,X,(pz+.5)*k);x.fillStyle='#ffd84a';x.fillText(t,X,(pz+.5)*k)});
  if(cur===m&&player){x.fillStyle='#3ef0ff';x.shadowColor='#3ef0ff';x.shadowBlur=12;x.beginPath();x.arc((player.px+.5)*k,(player.pz+.5)*k,k*.45,0,7);x.fill();x.shadowBlur=0}
  $('wmSvg').innerHTML='';$('wmSvg').appendChild(c);$('wmSvg').insertAdjacentHTML('beforeend','<div style="font-size:12px;color:#b9add6;margin-top:4px">● cyan = toi · ● rose = habitants</div>');$('wmClose').textContent="◀ Carte d'Ardenval";$('wmClose').onclick=world};
 world();show('wmap')})}
