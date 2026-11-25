/* ================= FUSION / FORMES ================= */
/* Chaque espèce a des "gènes" visuels. Le générateur procédural reconstruit un Lumon à partir de ces gènes.
   Fusion : on mélange les gènes, types, stats et attaques de 2 Lumons, avec mutations aléatoires.
   Évolution des fusions : la fusion grandit et gagne des parties. Formes : les Éclats ajoutent un type et une aura. */
const GENES={
 chicorin:{body:'round',size:1,c1:'#f1ecd2',c2:'#fbf6e2',c3:'#9cc65a',eyes:'round',top:'leaves',side:'none',back:'tail',feet:'four'},
 witloof:{body:'tall',size:1.25,c1:'#ece4c2',c2:'#fbf6e2',c3:'#7fb34a',eyes:'round',top:'leaves',side:'arms',back:'tail',feet:'two'},
 endivaure:{body:'tall',size:1.7,c1:'#d9cf9f',c2:'#f0e8c4',c3:'#5f9a35',eyes:'fierce',top:'leaves',side:'claws',back:'tree',feet:'two'},
 charbonnet:{body:'round',size:1,c1:'#55555f',c2:'#8a8a96',c3:'#f2c94c',eyes:'sleepy',top:'helmet',side:'none',back:'ember',feet:'four'},
 terrillon:{body:'round',size:1.3,c1:'#4e4e58',c2:'#8a8a96',c3:'#f2c94c',eyes:'sleepy',top:'helmet',side:'claws',back:'coal',feet:'four'},
 hautfourno:{body:'tall',size:1.7,c1:'#4a4a52',c2:'#7e7e8a',c3:'#f2c94c',eyes:'fierce',top:'helmet',side:'claws',back:'chimney',feet:'two'},
 moulinet:{body:'blob',size:1,c1:'#8fd3f0',c2:'#c9ecfa',c3:'#2b3550',eyes:'round',top:'shell',side:'none',back:'none',feet:'two'},
 moulefrit:{body:'blob',size:1.3,c1:'#8fd3f0',c2:'#c9ecfa',c3:'#2b3550',eyes:'round',top:'fries',side:'shells',back:'shellback',feet:'two'},
 krakamoule:{body:'round',size:1.7,c1:'#6cbde0',c2:'#c9ecfa',c3:'#1f2a44',eyes:'fierce',top:'crown',side:'shells',back:'shellback',feet:'tentacles'},
 gaufrelin:{body:'box',size:1,c1:'#e2b060',c2:'#c08a3a',c3:'#ffffff',eyes:'round',top:'sugar',side:'arms',back:'none',feet:'two'},
 pigeolet:{body:'round',size:.9,c1:'#9aa0ab',c2:'#d9dbe0',c3:'#4fae8a',eyes:'fierce',top:'none',side:'wings',back:'tail',feet:'two'},
 hannetonne:{body:'round',size:.9,c1:'#8a4a22',c2:'#2b2220',c3:'#5a3a1a',eyes:'round',top:'antennae',side:'none',back:'shellback',feet:'four'},
 terrilou:{body:'cone',size:1,c1:'#3d3833',c2:'#5a524a',c3:'#5fae45',eyes:'round',top:'grass',side:'none',back:'none',feet:'two'},
 scorion:{body:'rock',size:1,c1:'#4a4440',c2:'#ff8a2c',c3:'#3a3430',eyes:'fierce',top:'spikes',side:'arms',back:'coal',feet:'none'}
};
const GOPT={ears:['none','pointy','round','long','horns','fins'],pattern:['none','spots','stripes','belly','glow'],body:['round','tall','blob','box','cone','rock'],top:['leaves','helmet','shell','fries','grass','spikes','crown','sugar','antennae','none'],side:['arms','shells','wings','claws','none'],back:['tail','ember','tree','chimney','coal','shellback','none'],feet:['four','two','tentacles','none'],eyes:['round','sleepy','fierce']};
const BODY={round:{top:1.92,ey:1.15,fz:.88},tall:{top:2.5,ey:1.65,fz:.85},blob:{top:1.4,ey:.85,fz:.9},box:{top:1.85,ey:1.2,fz:.36},cone:{top:1.9,ey:.8,fz:.5},rock:{top:1.85,ey:1.1,fz:.85}};
function genModel(g,G){const R=.34*G.size,b=BODY[G.body]||BODY.round,top=R*b.top,fx=[];
 switch(G.body){case'box':tp(g,BOXG,G.c1,0,R*.95,0,R*1.5,R*1.6,R*.65);for(const v of[-.22,.22]){tp(g,BOXG,G.c2,v*R*2,R*.95,R*.34,R*.08,R*1.4,R*.02,{ol:false});tp(g,BOXG,G.c2,0,R*.95+v*R*2,R*.34,R*1.4,R*.08,R*.02,{ol:false})}break;
  case'cone':tp(g,CONE,G.c1,0,R*.95,0,R*1.05,R*1.9,R*1.05,{th:.03});break;case'rock':tp(g,DOD,G.c1,0,R,0,R,R*.92,R*.95,{th:.03});break;
  case'tall':tp(g,SPH,G.c1,0,R*1.25,0,R*.95,R*1.25,R*.9);tp(g,SPH,G.c2,0,R*1.1,R*.45,R*.6,R*.8,R*.5,{ol:false});break;
  case'blob':tp(g,SPH,G.c1,0,R*.7,0,R*1.05,R*.72,R*.95);tp(g,SPH,G.c2,0,R*.6,R*.45,R*.6,R*.5,R*.5,{ol:false});break;
  default:tp(g,SPH,G.c1,0,R,0,R,R*.93,R*.96);tp(g,SPH,G.c2,0,R*.85,R*.5,R*.6,R*.58,R*.5,{ol:false})}
 const ey=R*b.ey,ez=R*b.fz,es=R*.15;
 if(G.eyes==='sleepy')for(const s of[-1,1])tp(g,BOXG,'#1d1626',s*R*.32,ey,ez,es*1.3,es*.3,.02,{ol:false,r:[0,0,s*.25]});
 else eyes(g,ey,ez,R*.32,es,G.eyes==='fierce'?(G.c2==='#ff8a2c'?'#ffd24a':'#ff9a3c'):'#1d1626',G.eyes!=='fierce');
 switch(G.top){case'leaves':for(let i=-1;i<=1;i++)leaf(g,i?G.c3:'#cfe08a',i*R*.38,top+R*.4,0,R*.22,R*.65,-i*.4);break;
  case'helmet':tp(g,HEMI,G.c3,0,top-R*.5,0,R*.9,R*.62,R*.9);tp(g,CYL,'#fff6c8',0,top-R*.1,R*.7,R*.2,R*.16,R*.2,{r:[1.2,0,0],emi:'#fff3a0'});break;
  case'shell':tp(g,SPH,G.c3,0,top-R*.3,-R*.15,R*1.05,R*.7,R*1,{r:[.3,0,0]});break;
  case'fries':for(let k=-1;k<=1;k++)tp(g,BOXG,'#f2c14e',k*R*.3,top+R*.3,0,R*.14,R*.8,R*.14,{r:[0,0,-k*.35]});break;
  case'grass':tp(g,SPH,G.c3,0,top,0,R*.3,R*.2,R*.3);for(let k=-1;k<=1;k++)tp(g,CONE,'#4b9e36',k*R*.15,top+R*.25,0,R*.07,R*.35,R*.07,{ol:false});break;
  case'spikes':for(let k=0;k<5;k++){const a=k/5*PI*2;tp(g,CONE,G.c3,Math.cos(a)*R*.45,top-R*.1,Math.sin(a)*R*.4,R*.16,R*.5,R*.16,{r:[Math.sin(a)*.5,0,-Math.cos(a)*.5]})}break;
  case'crown':for(let k=-2;k<=2;k++)tp(g,CONE,'#f6c80f',k*R*.3,top+R*.15,R*.1,R*.12,R*.45,R*.12);break;
  case'sugar':for(let k=0;k<6;k++)tp(g,SPH,'#ffffff',(k%3-1)*R*.45,top-R*.05,(k<3?-1:1)*R*.15,R*.11,R*.11,R*.11,{ol:false});break;
  case'antennae':for(const s of[-1,1]){tp(g,CYL,'#2b2220',s*R*.2,top+R*.2,R*.3,R*.035,R*.5,R*.035,{r:[.5,0,-s*.4],ol:false});tp(g,SPH,G.c3,s*R*.33,top+R*.45,R*.45,R*.12,R*.05,R*.14,{ol:false})}break}
 switch(G.ears){case'pointy':for(const s2 of[-1,1])tp(g,CONE,G.c1,s2*R*.5,top+R*.05,-R*.05,R*.16,R*.42,R*.12,{r:[0,0,-s2*.3]});break;
  case'round':for(const s2 of[-1,1]){tp(g,SPH,G.c1,s2*R*.62,top-R*.05,-R*.05,R*.24,R*.24,R*.1);tp(g,SPH,G.c3,s2*R*.62,top-R*.05,R*.02,R*.14,R*.14,R*.05,{ol:false})}break;
  case'long':for(const s2 of[-1,1])tp(g,SPH,G.c1,s2*R*.32,top+R*.45,-R*.1,R*.13,R*.55,R*.1,{r:[0,0,-s2*.2]});break;
  case'horns':for(const s2 of[-1,1]){tp(g,CONE,'#efe8dc',s2*R*.45,top+R*.1,R*.05,R*.1,R*.45,R*.1,{r:[.3,0,-s2*.6]});tp(g,CONE,'#efe8dc',s2*R*.62,top+R*.42,R*.2,R*.06,R*.25,R*.06,{r:[.9,0,-s2*.3]})}break;
  case'fins':for(const s2 of[-1,1])tp(g,CONE,G.c2,s2*R*.95,R*.9,-R*.1,R*.08,R*.5,R*.3,{r:[0,0,-s2*1.2]});tp(g,CONE,G.c2,0,top+R*.15,-R*.35,R*.06,R*.5,R*.35,{r:[-.4,0,0]});break}
 switch(G.pattern){case'spots':for(let k=0;k<7;k++){const a=k*2.4,y=R*(.5+((k*37)%10)/14);tp(g,SPH,G.c3,Math.cos(a)*R*.9,y,Math.sin(a)*R*.85,R*.13,R*.13,R*.06,{ol:false})}break;
  case'stripes':for(let k=0;k<3;k++)tp(g,TOR,G.c3,0,R*(.55+k*.35),0,R*(.95-Math.abs(k-1)*.12),R*(.95-Math.abs(k-1)*.12),R*.07,{r:[PI/2,0,0],ol:false});break;
  case'belly':tp(g,SPH,G.c3,0,R*.7,R*.55,R*.55,R*.6,R*.3,{ol:false});break;
  case'glow':{const gl=tp(g,SPH,G.c3,0,R*.95,R*.62,R*.18,R*.18,R*.08,{ol:false,emi:G.c3});fx.push(t=>gl.scale.setScalar(R*.18*(1+Math.sin(t*4)*.25)))}break}
 const sy=top*.45;
 switch(G.side){case'arms':for(const s of[-1,1])tp(g,SPH,G.c1,s*R*1.05,sy,R*.1,R*.25,R*.45,R*.25,{r:[0,0,s*.5]});break;
  case'shells':for(const s of[-1,1])tp(g,SPH,G.c3,s*R*1.15,sy,R*.15,R*.25,R*.65,R*.5,{r:[0,0,s*.35]});break;
  case'wings':for(const s of[-1,1])tp(g,SPH,G.c2,s*R*1,sy+R*.15,-R*.05,R*.18,R*.5,R*.7,{r:[0,0,s*.3]});break;
  case'claws':for(const s of[-1,1]){tp(g,SPH,G.c1,s*R*1.1,sy,R*.25,R*.32,R*.28,R*.35);for(let c=0;c<3;c++)tp(g,CONE,'#efe8dc',s*R*1.1+(c-1)*R*.13,sy-R*.15,R*.55,R*.06,R*.25,R*.06,{r:[PI/2,0,0],ol:false})}break}
 switch(G.back){case'tail':tp(g,SPH,G.c1,0,R*.8,-R*1,R*.3,R*.3,R*.3);break;
  case'ember':{tp(g,CYL,G.c1,0,R*1,-R*1.1,R*.12,R*.9,R*.12,{r:[-.9,0,0]});const e=tp(g,SPH,'#ff9a3c',0,R*1.45,-R*1.5,R*.3,R*.3,R*.3,{emi:'#ff7a1a'});fx.push(t=>{const k=1+Math.sin(t*14)*.12;e.scale.setScalar(R*.3*k)})}break;
  case'tree':tp(g,CYL,'#7a5230',0,top*.75,-R*1.2,R*.16,R*1.4,R*.16);tp(g,CONE,'#3f8f3a',0,top*.75+R*1.2,-R*1.2,R*.8,R*1.6,R*.8);break;
  case'chimney':{tp(g,CYL,'#a95a3a',0,top*.7,-R*1.2,R*.5,R*2,R*.5);const f=tp(g,SPH,'#ff7a1a',0,top*.7+R*1.25,-R*1.2,R*.45,R*.55,R*.45,{emi:'#ff5a10'});fx.push(t=>{const k=1+Math.sin(t*10)*.15;f.scale.set(R*.45*k,R*.6*k,R*.45*k)})}break;
  case'coal':for(let k=0;k<4;k++)tp(g,DOD,'#2b2b30',(k-1.5)*R*.4,top*.8,-R*.7,R*.3,R*.3,R*.3,{r:[k,k,0]});break;
  case'shellback':for(let k=-1;k<=1;k++)tp(g,SPH,G.c3,k*R*.55,top*.65,-R*.6,R*.45,R*.25,R*.5,{r:[.5,0,0]});break}
 switch(G.feet){case'four':for(const[x,z]of[[-.55,.45],[.55,.45],[-.55,-.45],[.55,-.45]])tp(g,SPH,G.c2,x*R,R*.15,z*R,R*.25,R*.17,R*.28);break;
  case'two':for(const s of[-1,1])tp(g,SPH,G.c2,s*R*.4,R*.12,R*.35,R*.25,R*.17,R*.3);break;
  case'tentacles':for(let k=0;k<6;k++){const a=k/6*PI*2+.3;tp(g,CYL,G.c1,Math.cos(a)*R*.8,R*.4,Math.sin(a)*R*.8,R*.15,R*.9,R*.15,{r:[Math.sin(a)*.6,0,-Math.cos(a)*.6]})}break}
 if(G.sq&&G.sq!==1)g.scale.y=G.sq;
 return fx.length?{fx:t=>fx.forEach(f=>f(t))}:{}}
function hexMix(a,b,t){const ca=new THREE.Color(a),cb=new THREE.Color(b);return '#'+ca.lerp(cb,t).getHexString()}
const geneOf=sp=>SP[sp].G||GENES[sp];
function seedRng(str){let h=1779033703^str.length;for(let i=0;i<str.length;i++){h=Math.imul(h^str.charCodeAt(i),3432918353);h=h<<13|h>>>19}return()=>{h=Math.imul(h^h>>>16,2246822507);h=Math.imul(h^h>>>13,3266489909);h^=h>>>16;return(h>>>0)/4294967296}}
const LORE={hab:{Feu:'les terrils de Charleroc',Eau:'les canaux de Gandoux',Plante:'les potagers du Brabant',Roche:'les carrières de Namuroc',Sol:'les champs de betteraves de Hesbaye',Normal:'les grand-places',Vol:'les beffrois',Insecte:'les prairies de Bastognac',Électrik:'les vieux dépôts de trams de Bruxellia',Glace:'les Hautes Fagnes en plein hiver',Spectre:'les ruines des vieilles abbayes',Ténèbres:'les ruelles de Liègenoir la nuit'},
 body:{round:'tout rond',tall:'grand et élancé',blob:'mou comme une boulette sauce lapin',box:'carré comme un pavé de la Grand-Place',cone:'en forme de cornet de frites',rock:'massif comme un bloc de pierre bleue'},
 top:{leaves:'des feuilles de chicon sur la tête',helmet:'un casque de mineur vissé sur le crâne',shell:'une coquille de moule en guise de chapeau',fries:'des antennes dorées comme des frites',grass:"une touffe d'herbe de terril",spikes:'une crête de pointes',crown:'une petite couronne de carnaval',sugar:'des perles de sucre sur le front',antennae:'deux longues antennes',none:''},
 back:{tail:'une queue qui ne tient jamais en place',ember:'une braise qui fume dans le dos',tree:'un arbuste sur le dos',chimney:'une cheminée qui crache de la vapeur',coal:'des blocs de charbon sur l\'échine',shellback:'une carapace de coquillages',none:''},
 act:["Il se faufile sous les terrasses pour ramasser les miettes de gaufre.","Il ne sort jamais sans vérifier s'il drache.","On l'entend ronronner chaque fois qu'il passe devant une friterie.","Il fait la sieste dans les cornets de frites vides.","Il suit les fanfares du carnaval de Binche en tapant des pattes.","Il se dispute avec les Pigeolet pour les restes de mitraillette.","Il garde rancune très longtemps, une fois.","Il adore le bruit de la pluie sur les toits en ardoise.","Il ramène tout ce qui brille à son dresseur, même les capsules de bière.","Il s'endort pile à septante minutes de chaque combat, personne ne sait pourquoi."],
 rare:["Les chercheurs d'Ardenval n'en ont jamais vu deux pareils.","On dit qu'il n'en existe qu'un seul au monde.","Le Fusionneur d'Éclat l'a créé un soir d'orage, et il en garde l'humeur."],
 ety:["La Prof. Verhaegen l'a baptisé en trinquant avec une kriek.","Le nom a été tiré à pile ou face sur la Grand-Place.","Les gamins du quartier l'appelaient déjà comme ça avant même qu'il sorte du Fusionneur.","C'est le premier mot qu'a crié la Prof. en le voyant apparaître, une fois.","Son nom sonne comme une spécialité de friterie, et ce n'est sûrement pas un hasard."]};
function ensureLore(sp){const s=SP[sp];if(!s||!s.fusion||s.loreV===2)return;const r=seedRng(sp+s.n),pk=a=>a[(r()*a.length)|0],G=s.G||{};
 const[pa,pb]=s.fusion.map(x=>SP[x]?SP[x].n:x),evo=/Forme évoluée/.test(s.d||''),mut=/Mutation/.test(s.d||'');
 const look=[LORE.top[G.top],LORE.back[G.back]].filter(Boolean);
 s.d=`${evo?'Forme adulte d\'une fusion de '+pa+' et '+pb:'Fusion de '+pa+' et '+pb}, ${LORE.body[G.body]||'étrange'}${look.length?', avec '+look.join(' et '):''}. On le croise surtout dans ${LORE.hab[s.t[0]]||'tout Ardenval'}. ${pk(LORE.act)}${mut?' Une mutation rare le rend unique.':''} ${pk(LORE.rare)}`.replace(/\s+/g,' ').trim();
 s.ety=`Un nom de fusion : le début de <b>${pa}</b> collé à la fin de <b>${pb}</b>${evo?', avec le « -ard » des formes adultes, comme un vieux briscard':''}. ${pk(LORE.ety)}`;s.loreV=2}
function fuseName(a,b){const A=a.replace(/[^A-Za-zéèêàïô]/g,''),Bn=b.replace(/[^A-Za-zéèêàïô]/g,'');let n=A.slice(0,Math.ceil(A.length*.5))+Bn.slice(Math.floor(Bn.length*.5)).toLowerCase();n=n.replace(/(.)\1\1/g,'$1$1');if(n.length>11)n=n.slice(0,11);return n[0].toUpperCase()+n.slice(1)}
function sanitizeSpecies(d){const okT=Object.keys(TC);d.n=(typeof d.n==='string'&&d.n.trim())?d.n:'Lumon';d.t=(Array.isArray(d.t)?d.t:[]).filter(t=>okT.includes(t));if(!d.t.length)d.t=['Normal'];d.t=[...new Set(d.t)].slice(0,2);
 d.b=[0,1,2,3].map(i=>{const v=+((d.b||[])[i]);return isFinite(v)&&v>0?Math.round(Math.min(200,v)):50});if(!isFinite(d.xp)||d.xp<=0)d.xp=60;d.L=(Array.isArray(d.L)?d.L:[]).filter(e=>Array.isArray(e)&&MV[e[1]]);if(!d.L.length)d.L=[[1,'charge']].filter(e=>MV[e[1]]);
 const G=d.G=Object.assign({},d.G||{});for(const k in GOPT)if(!GOPT[k].includes(G[k]))G[k]=k==='eyes'?'round':k==='body'?'round':'none';G.size=isFinite(+G.size)&&+G.size>0?Math.min(2.2,Math.max(.5,+G.size)):1;G.sq=isFinite(+G.sq)?Math.min(1.3,Math.max(.7,+G.sq)):1;
 const col=c=>{try{return '#'+new THREE.Color(c||'#cccccc').getHexString()}catch(e){return '#cccccc'}};G.c1=col(G.c1);G.c2=col(G.c2||G.c1);G.c3=col(G.c3||G.c2);if(d.evo&&!(Array.isArray(d.evo)&&isFinite(d.evo[0])&&typeof d.evo[1]==='string'))delete d.evo;d.cr=d.cr||45;if(typeof d.d!=='string')d.d='Un Lumon mystérieux.';return d}
function registerSpecies(id,d){sanitizeSpecies(d);SP[id]=d;MODELS[id]=g=>genModel(g,d.G);MSCALE[id]=Math.min(1.1,1.05/Math.max(.9,d.G.size*.85));CRY[id]=d.n+' !'}
function fuse(a,b){const A=SP[a.sp],Bs=SP[b.sp],GA=geneOf(a.sp),GB=geneOf(b.sp),G={};const mut=[];
 const sig=X=>['body','top','side','back','feet','eyes','ears','pattern'].map(k=>X[k]||'none').join('|')+'|'+new THREE.Color(X.c1).getHSL({}).h.toFixed(1);
 const taken=new Set(Object.values(SP).filter(x=>x.G).map(x=>sig(x.G)));let tries=0;
 do{mut.length=0;for(const k of['body','top','side','back','feet','eyes','ears','pattern']){const pa=GA[k]||'none',pb=GB[k]||'none';G[k]=rnd()<.5?pa:pb;if(rnd()<(k==='ears'||k==='pattern'?.45:.25)+tries*.04){G[k]=GOPT[k][(rnd()*GOPT[k].length)|0];mut.push(k)}}
  G.size=+(((GA.size+GB.size)/2)*(.85+rnd()*.35)).toFixed(2);G.sq=+(.85+rnd()*.3).toFixed(2);
  const hc=new THREE.Color(hexMix(GA.c1,GB.c1,.2+rnd()*.6));if(rnd()<.35+tries*.05){hc.offsetHSL((rnd()-.5)*.35,.05,0);mut.push('couleur')}G.c1='#'+hc.getHexString();
  G.c2=rnd()<.5?GA.c2:GB.c2;G.c3=rnd()<.5?GA.c3:GB.c3;if(rnd()<.2)[G.c2,G.c3]=[G.c3,G.c2];tries++}while(taken.has(sig(G))&&tries<30);
 let t=[...new Set([A.t[0],Bs.t[0]])];if(t.length===1){const extra=[...A.t,...Bs.t].find(x=>x!==t[0]);if(extra)t.push(extra);else if(rnd()<.3){const all=Object.keys(TC).filter(x=>x!==t[0]);t.push(all[(rnd()*all.length)|0]);mut.push('type')}}
 const bs=A.b.map((v,i)=>Math.round((v+Bs.b[i])/2*(.92+rnd()*.22)+3));
 const L=[...A.L,...Bs.L].sort((x,y)=>x[0]-y[0]).filter((e,i,arr)=>arr.findIndex(f=>f[1]===e[1])===i);
 const lv=Math.round((a.lv+b.lv)/2)+1,id='fx'+Date.now().toString(36)+((rnd()*1e4)|0).toString(36);
 let n=fuseName(A.n,Bs.n);const names=new Set(Object.values(SP).map(x=>x.n));if(names.has(n)){const alt=fuseName(Bs.n,A.n);n=names.has(alt)?n:alt}
 const SUF=['ix','on','a','or','us','elle','ard','ino','ok','ette'];let k0=0;const base=n.replace(/[aeiouyéè]+$/,'');while(names.has(n)&&k0<40){n=base+SUF[(rnd()*SUF.length)|0]+(k0>20?String.fromCharCode(97+k0%26):'');k0++}
 const d={n,t,b:bs,xp:Math.round((A.xp+Bs.xp)/2*1.15),cr:45,G,L,evo:[lv+12,id+'_x'],fusion:[a.sp,b.sp],d:`Fusion de ${A.n} et ${Bs.n}, née dans le Fusionneur d'Éclat de la Prof.${mut.length?' Mutation : '+mut.join(', ')+' !':''}`};
 registerSpecies(id,d);ensureLore(id);S.fusions[id]=d;
 const pool=[...a.moves,...b.moves].map(x=>x.id).filter((x,i,arr)=>arr.indexOf(x)===i);
 pool.sort((x,y)=>(MV[y].p*(t.includes(MV[y].t)?1.5:1)+rnd()*30)-(MV[x].p*(t.includes(MV[x].t)?1.5:1)+rnd()*30));
 ensureGenes(a);ensureGenes(b);const m={sp:id,lv,xp:lv**3,moves:pool.slice(0,4).map(x=>({id:x,pp:MV[x].pp})),iv:a.iv.map((v,i)=>rnd()<.6?Math.max(v,b.iv[i]):Math.floor(rnd()*32)),ev:[0,0,0,0],nat:rnd()<.5?a.nat:b.nat};calc(m);m.hp=m.mhp;return m}
const EVO_SUF=['ard','orax','ion','ador','elle','ius','ok','aure','ondor','ix'],EVO_PRE=['Grand','Méga','Haut','Roi'];
function evoName(n,r){const names=new Set(Object.values(SP).map(x=>x.n)),base=(n.length>8?n.slice(0,8):n).replace(/[aeiouyéèê]+$/i,'');for(let k=0;k<40;k++){const cand=k<10?base+EVO_SUF[(r()*EVO_SUF.length)|0]:EVO_PRE[(r()*EVO_PRE.length)|0]+base.toLowerCase()+(k>25?EVO_SUF[k%EVO_SUF.length]:'');const c=cand[0].toUpperCase()+cand.slice(1);if(!names.has(c)&&c.length<=13)return c}return base+'ard'+((r()*99)|0)}
const EPIC_PRE=['Archi','Ultra','Roi','Néo','Titan'];function epicName(n,r){const names=new Set(Object.values(SP).map(x=>x.n)),base=n.length>8?n.slice(0,8):n;for(let k=0;k<30;k++){const c=EPIC_PRE[(r()*EPIC_PRE.length)|0]+base.toLowerCase()+(k>10?['ix','or','us'][k%3]:'');if(!names.has(c)&&c.length<=14)return c}return 'Archi'+base.toLowerCase()+((r()*99)|0)}
function evolveFusionSpecies(from){const P=SP[from];if(!P||!P.evo)throw new Error('pas d\'évolution pour '+from);if(SP[P.evo[1]])return P.evo[1];const stage=(P.stage||0)+1,epic=stage>=2,r=seedRng(from+P.n),G={...P.G};G.size=+(Math.min(epic?2.2:2,(G.size||1)*(epic?1.2:1.25+r()*.2))).toFixed(2);
 {const c=new THREE.Color(G.c1||'#cccccc');c.offsetHSL((r()-.5)*.12,.08,-.06);G.c1='#'+c.getHexString();const a=new THREE.Color(G.c2||G.c1);a.offsetHSL(.04,.12,.04);G.c2='#'+a.getHexString()}
 if(G.pattern==='none'||r()<.35)G.pattern=['glow','stripes','spots'][(r()*3)|0];if(G.ears==='none'&&r()<.6)G.ears=['horns','pointy','fins'][(r()*3)|0];
 if(G.back==='none')G.back=GOPT.back[(rnd()*6)|0];if(G.side==='none')G.side=['claws','shells','wings','arms'][(rnd()*4)|0];if(rnd()<.4)G.top=['crown','spikes',G.top][(rnd()*3)|0];G.eyes='fierce';
 let t=P.t.slice();if(t.length===1&&r()<.35){const all=Object.keys(TC).filter(x=>x!==t[0]);t.push(all[(r()*all.length)|0])}
 if(epic){G.top=r()<.5?'crown':'spikes';G.side='wings';G.pattern='glow';if(G.back==='none'||r()<.5)G.back=['ember','tree','shellback'][(r()*3)|0];const c=new THREE.Color(G.c1);c.offsetHSL(0,.1,-.08);G.c1='#'+c.getHexString();G.c3='#ffd84a'}
 const tot=P.b.reduce((a,b)=>a+b,0)*(epic?.33:.25),w=[0,1,2,3].map(()=>.5+r()),ws=w.reduce((a,b)=>a+b,0);
 const id=P.evo[1],d={stage,epic:epic?1:0,n:epic?epicName(P.n,r):evoName(P.n,r),t,b:P.b.map((v,i)=>Math.round(v+tot*w[i]/ws)),xp:Math.round(P.xp*1.6),cr:45,G,L:P.L,fusion:P.fusion,d:epic?`Forme évoluée ultime de ${P.n}. Une légende née de l'Éclat : on dit que sa lumière se voit depuis les terrils de Charleroc.`:`Forme évoluée de ${P.n}. Plus grande, plus forte, et toujours aussi imprévisible.`};
 if(!epic)d.evo=[P.evo[0]+16,id+'_x'];
 registerSpecies(id,d);ensureLore(id);S.fusions[id]=d;return id}
/* ---- Formes (Éclats) ---- */
const FORMS={Feu:{n:'Forme Ardente',item:'eclat_feu'},Eau:{n:'Forme Marine',item:'eclat_eau'},Plante:{n:'Forme Sylvestre',item:'eclat_plante'},Roche:{n:'Forme Terril',item:'eclat_roche'}};
const typesOf=m=>{const t=SP[m.sp].t;if(!m.form)return t;return [...new Set([t[0],m.form])]};
function addAura(r,form){const col=TC[form],ring=tp(r.g,TOR,col,0,.06,0,.55,.55,.55,{r:[PI/2,0,0],ol:false,emi:col}),orbs=[];
 for(let k=0;k<3;k++)orbs.push(tp(r.g,SPH,col,0,0,0,.06,.06,.06,{ol:false,emi:col}));const prev=r.fx;
 r.fx=t=>{prev&&prev(t);ring.scale.setScalar(.55+Math.sin(t*3)*.04);orbs.forEach((o,k)=>{const a=t*2+k*2.09;o.position.set(Math.cos(a)*.5,.5+Math.sin(t*3+k)*.15,Math.sin(a)*.5)})};ANIMS.add(r)}
async function fusionMachine(){const P='Prof. Verhaegen';
 if(!F().fusionOK&&!(S&&S.testMode)){await say('',"Le Fusionneur d'Éclat est éteint. Un post-it est collé dessus : « Hors service — réservé aux dresseurs médaillés. »");await say(P,F().badge1?"Ah, tu as ta médaille ? Montre-la-moi d'abord, viens me parler !":"Pas encore, {P} ! Le Fusionneur est trop instable pour un débutant. Reviens me montrer ta première médaille, celle de l'arène de Charleroc, et je te l'ouvrirai.");return}
 if(!F().fusionIntro){F().fusionIntro=1;await say(P,"Ah, tu as trouvé mon Fusionneur d'Éclat ! C'est mon invention la plus folle.");await say(P,"Il fusionne deux Lumons en un seul, tout nouveau. Le résultat est différent à chaque fois : son corps, ses couleurs, ses types, ses attaques… même son nom !");await say(P,"Et si tu mets deux Lumons de la même espèce, il ne crée rien de nouveau : il renforce le meilleur des deux. Ses IV montent à chaque fois, jusqu'à devenir parfaits !");await say(P,"Attention : les deux Lumons d'origine disparaissent pour laisser place à la fusion. Et une fusion peut évoluer, elle aussi !")}
 if(S.party.length<2){await say('',"Il faut au moins deux Lumons dans ton équipe pour utiliser le Fusionneur.");return}
 if(S.party.filter(m=>!SP[m.sp].unique).length<2){await say(P,"Hmm… Il te faut deux Lumons qui peuvent fusionner. Et Laïka, n'y pense même pas : un Lumon unique comme elle ne se fusionne pas !");return}
 const i=await pickList('Fusionneur — 1er Lumon',S.party.map(m=>({html:partyRow(m)+(SP[m.sp].unique?' <small>unique</small>':''),dis:!!SP[m.sp].unique})));if(i<0)return;
 const j=await pickList('Fusionneur — 2e Lumon',S.party.map((m,k)=>({html:partyRow(m),dis:k===i||!!SP[m.sp].unique})));if(j<0)return;
 const a=S.party[i],b=S.party[j];if(S.party.length===2&&false)return;
 if(a.sp===b.sp){const c0=await choose(P,`Deux ${nm(a)} ? Le Fusionneur ne va pas créer un nouveau Lumon : il va renforcer ${nm(a)} N.${Math.max(a.lv,b.lv)}. Ses IV montent, il gagne de l'expérience, et le second disparaît. On y va ?`,['Renforcer !','Annuler']);if(c0)return;
  ensureGenes(a);ensureGenes(b);const keep=a.lv>=b.lv?a:b,gone=keep===a?b:a,old=keep.iv.slice();keep.iv=keep.iv.map((v,k)=>Math.min(31,Math.max(v,gone.iv[k])+4+Math.floor(Math.min(v,gone.iv[k])/8)));
  keep.xp+=Math.floor(gone.xp/2);let up=0;while(keep.lv<100&&keep.xp>=(keep.lv+1)**3){keep.lv++;up++}keep.shiny=keep.shiny||gone.shiny;keep.fu=(keep.fu||0)+1;const r0=keep.hp/(keep.mhp||1);calc(keep);keep.hp=Math.max(1,Math.round(keep.mhp*r0));
  viewSpecies(keep.sp);for(let k=0;k<10;k++){galModel.g.visible=k%2===0;sfx(400+k*80,.07,'triangle',.12);await sleep(100)}galModel.g.visible=true;sfx(1046,.15);sfx(1568,.4);
  S.party=S.party.filter(x=>x!==gone);await say('',`${nm(keep)} est renforcé ! IV : ${old.map((v,k)=>STATN[k]+' '+v+'→'+keep.iv[k]).join(' · ')}${up?` · +${up} niveau${up>1?'x':''} (N.${keep.lv})`:''}.`);
  if(keep.iv.every(v=>v>=31)){unlock('perfect');await say(P,"Incroyable… Des IV parfaits partout ! Ce Lumon est au sommet de son potentiel.")}else await say(P,`Encore quelques renforcements et ses IV seront parfaits. Fusion n°${keep.fu} pour lui !`);closeView();refreshFollower();return}
 const c=await choose('',`Fusionner ${nm(a)} (N.${a.lv}) et ${nm(b)} (N.${b.lv}) ? C'est définitif !`,['Fusionner !','Annuler']);if(c)return;
 const m=fuse(a,b);S.party=S.party.filter(x=>x!==a&&x!==b);S.party.unshift(m);S.dex.seen[m.sp]=S.dex.caught[m.sp]=1;saveGame();
 try{await fusionCine(a,b,m)}catch(e){console.error('fusionCine',e);viewSpecies(m.sp)}
 await say('',`Fusion réussie ! Voici ${nm(m)}, de type ${SP[m.sp].t.join(' / ')} !`);
 await say('',`Stats de base : PV ${SP[m.sp].b[0]} · Att ${SP[m.sp].b[1]} · Déf ${SP[m.sp].b[2]} · Vit ${SP[m.sp].b[3]}. Attaques : ${m.moves.map(x=>MV[x.id].n).join(', ')}.`);
 if(SP[m.sp].d.includes('Mutation'))await say(P,"Oh ! Une mutation ! Ce Lumon a des traits que ses parents n'avaient pas. Fascinant !");
 await say(P,`Il évoluera au niveau ${SP[m.sp].evo[0]}, puis une dernière fois en une forme ultime… Prends-en bien soin !`);darkStage(false);closeView();refreshFollower();setSong(cur.song)}

function darkStage(on){if(GAL&&GAL.dark)GAL.dark.visible=!!on}
async function fusionCine(a,b,m){
 const G=GAL.group;disposeModel(galModel);galModel=null;galOpen();darkStage(true);setSong('fusion');const fx=[],objs=[];
 const mk=(k,sz,op=1)=>{const sp=new THREE.Sprite(new THREE.SpriteMaterial({map:vfxTex(k),transparent:true,opacity:op,depthWrite:false,blending:THREE.AdditiveBlending}));sp.scale.set(sz,sz,1);G.add(sp);fx.push(sp);return sp};
 const put=(sp,x)=>{const r=monModel(sp);r.g.position.set(x,.1,0);r.g.scale.setScalar(1.05*mscale(sp));G.add(r.g);objs.push(r);return r};
 const portrait=innerHeight>innerWidth,far=portrait?3.2:5.2,meet=.55;
 const A=put(a.sp,500-far),Bm=put(b.sp,500+far);A.g.rotation.y=PI/2;Bm.g.rotation.y=-PI/2;
 const ring=new THREE.Mesh(new THREE.RingGeometry(.2,.32,48),new THREE.MeshBasicMaterial({color:'#3ef0ff',transparent:true,opacity:0,side:THREE.DoubleSide,depthWrite:false,blending:THREE.AdditiveBlending}));ring.rotation.x=-PI/2;ring.position.set(500,.12,0);G.add(ring);
 const aura=mk('spark',.1,0);aura.position.set(500,.9,0);
 $('fade').style.opacity=0;await sleep(250);
 await say('',`${nm(a)} et ${nm(b)} entrent dans le Fusionneur d'Éclat !`,{auto:650,fast:true});
 for(let k=0;k<3;k++)sfx(196+k*98,.4,'sine',.08);
 await tween(1600,q=>{const e=ease(q),x=far-(far-meet)*e,hop=Math.abs(Math.sin(q*PI*5))*.22*(1-q*.5);A.g.position.set(500-x,.1+hop,0);Bm.g.position.set(500+x,.1+Math.abs(Math.sin(q*PI*5+.8))*.22*(1-q*.5),0);
  ring.material.opacity=q*.8;ring.scale.setScalar(1+q*4);aura.material.opacity=q*.7;aura.scale.setScalar(.4+q*2.2);if(Math.random()<.12)sfx(300+q*500,.04,'triangle',.06)});
 const orb=[];for(let i=0;i<40;i++){const s0=mk(i%3?'spark':'star',.14+rnd()*.2,0);s0.userData={a:rnd()*PI*2,r:1.4+rnd()*1.4,y:rnd()*2.2,v:1+rnd()*2};orb.push(s0)}
 sfx(110,.6,'sawtooth',.12);
 await tween(1500,q=>{const sh=Math.sin(q*80)*.04*q;A.g.position.x=500-meet+sh;Bm.g.position.x=500+meet-sh;A.g.rotation.y=PI/2+q*PI*4;Bm.g.rotation.y=-PI/2-q*PI*4;
  [A,Bm].forEach(r=>r.g.traverse(o=>{if(o.isMesh&&o.material&&o.material.emissive){if(!o.userData.fuc){o.userData.fuc=1;o.material=o.material.clone();o.material.emissive=new THREE.Color('#bff8ff')}o.material.emissiveIntensity=q*2}}));
  orb.forEach(o=>{const u=o.userData,r=u.r*(1-q*.9),an=u.a+q*u.v*8;o.position.set(500+Math.cos(an)*r,u.y*(1-q)+.9*q,Math.sin(an)*r);o.material.opacity=q});
  SHK=q*.05;ring.rotation.z=q*6;if(Math.random()<.15)sfx(500+q*1200,.04,'square',.05)});
 SHK=0;objs.forEach(r=>{disposeModel(r)});objs.length=0;flashScr('#ffffff',700,1);camShake(450,.2);for(const q of[392,523,659,784,1046,1568])sfx(q,.4,'triangle',.13);
 galModel=monModel(m.sp);galModel.g.position.set(500,.1,0);galModel.g.scale.setScalar(.01);G.add(galModel.g);
 const burst=[];for(let i=0;i<46;i++){const s0=mk(i%2?'star':'spark',.25+rnd()*.3);s0.position.set(500,.9,0);const an=rnd()*PI*2,el=rnd()*1.3;s0.userData={d:new V(Math.cos(an)*Math.cos(el),Math.sin(el)+.2,Math.sin(an)*Math.cos(el)).multiplyScalar(2+rnd()*2.2)};burst.push(s0)}
 const fs=1.25*mscale(m.sp);await tween(1000,q=>{const e=q<.7?q/.7*1.15:1.15-(q-.7)/.3*.15;galModel.g.scale.setScalar(fs*e);burst.forEach(b=>{b.position.set(500,.9,0).addScaledVector(b.userData.d,q);b.material.opacity=1-q});orb.forEach(o=>o.material.opacity=1-q);aura.material.opacity=.7*(1-q);ring.material.opacity=.8*(1-q)});
 fx.forEach(x=>{G.remove(x);x.material.dispose()});G.remove(ring);ring.geometry.dispose();ring.material.dispose();galModel.g.scale.setScalar(fs);
 await banner('Fusion réussie !',`${nm(a)} + ${nm(b)} = ${nm(m)}`,2000)}
