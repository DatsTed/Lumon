/* ---- Lumons uniques des personnages : leurs évolutions, et les grands combats scénarisés ----
   Chaque boss garde son Lumon, mais il évolue au fil de l'histoire : bossMon(base, niveau) donne la forme adaptée.
   snowBattle(niv) : combat de Snow (scénario uniquement), en 2 contre 2 avec MC Sambre.
   Mode test : essayer un combat en duo et le combat de Snow (Options > Mode test). */
const BOSS_EVO={
 noctiluce:{id:'noctilumiere',lv:24,n:'Noctilumière',mv:'hantise',d:"Noctiluce a mué. Ses ailes immenses projettent des aurores vertes : il éclaire les secrets que Luciole n'ose toujours pas dire."},
 sambrax:{id:'sambrazor',lv:24,n:'Sambrazor',mv:'nuitbxl',d:"Le terril vivant de MC Sambre, couronné d'acier. Il frappe en rythme, toujours sur le temps."},
 givrale:{id:'givralpha',lv:30,n:'Givrâlpha',mv:'blizzard',d:"Le loup de Snow devenu chef de meute. Là où il passe, même la Sambre gèle. Il protège Snow… de tout, sauf de lui-même."},
 krakapitaine:{id:'krakamiral',lv:28,n:'Krakamiral',mv:'maree',d:"Krakapitaine a pris du galon. Un bicorne d'amiral, huit tentacules et autant de colères."}};
for(const base in BOSS_EVO){const e=BOSS_EVO[base],b=SP[base];if(!b||SP[e.id])continue;
 SP[e.id]=Object.assign({},b,{n:e.n,d:e.d,unique:1,cr:0,xp:Math.round(b.xp*1.25),b:b.b.map(v=>Math.round(v*1.18)),L:[...b.L,[e.lv,e.mv]].filter(([l,id])=>MV[id]),evo:null,pre:base});
 MODELS[e.id]=g=>{const r=(MODELS[base]||(gg=>genModel(gg,SP[base].G)))(g)||{};g.scale.multiplyScalar(1.18);const ring=tp(g,TOR,'#a04ae8',0,.08,0,.55,.55,.04,{emi:'#6a2aa0',ol:false,r:[PI/2,0,0]});return r};
 MSCALE[e.id]=(MSCALE[base]||1)*1.08;CRY[e.id]=e.n+' !'}
function bossMon(base,lv){const e=BOSS_EVO[base];return mkMon(e&&lv>=e.lv?e.id:base,lv)}

// Snow : uniquement dans le scénario, en 2 contre 2 avec son bras droit MC Sambre
function snowBattle(lv=30,extra={}){return battle(Object.assign({duo:alive().length>=2?2:0,music:'ketoboss',trainer:{name:'Snow et MC Sambre',key:'snow',boss:1,smart:.65,prize:120,
  mons:[bossMon('givrale',lv+2),bossMon('sambrax',lv),mkMon('scorion',lv-1),mkMon('terrilou',lv)],
  win:"…T'as de la lumière, le rockeur. Trop. Ça finira par te brûler.",lose:"Rentre chez ta mère. Dis-lui que Snow passe le bonjour."}},extra))}

async function testCombats(){const c=await choose('',"Mode test : quel combat ?",["Duo (2 contre 2)","Snow et MC Sambre (duo)","Retour"]);if(c===2)return;
 if(c===0)await battle({duo:2,music:'keto',trainer:{name:'Sbires Kétosaures',key:'keto',smart:.4,prize:60,mons:[mkMon('scorion',14),mkMon('pigeolet',14),mkMon('terrilou',15)],win:"Pfff… à deux contre deux, en plus.",lose:"Hé hé !"}});
 else await snowBattle(30)}
