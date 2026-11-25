/* ---- Économie réaliste (euros belges) et Lumisphères par paliers ----
   Prix entiers en euros. Les anciennes sauvegardes sont converties une seule fois (argent ÷ 25, S.eco2).
   Lumisphères : débloquées au fil de l'histoire (BALL_UNLOCK), multiplicateur de capture ballMult().
   Night White : nourriture + clopes et alcool (bonus ET malus en combat, champ bst). */
const PRIX={lumisphere:8,sirop:6,supersirop:14,spa:5,titzvel:2,zisoa:2,durum:8,baklava:4,frites:4,fricadelle:3,mitraillette:9,chips:2,choco:2,speculoos:3,eclat_feu:45,eclat_eau:45,eclat_plante:45,eclat_roche:45};
for(const k in PRIX)if(ITEMS[k])ITEMS[k].price=PRIX[k];
const BALLS={
 lumisphere:{n:'Lumisphère',d:'Pour capturer un Lumon sauvage. La base.',price:8,c:['#ff3b5c','#2a1450']},
 superlumi:{n:'Super Lumisphère',d:'Capture ×1,5. Pour les Lumons qui se débattent.',price:15,c:['#3a8ae8','#1a2a50']},
 megalumi:{n:'Méga Lumisphère',d:'Capture ×2. Le choix des dresseurs sérieux.',price:28,c:['#f6c80f','#2a2a30']},
 masterlumi:{n:'Master Lumisphère',d:'Capture à coup sûr. Il n\'en existe presque pas : on ne la trouve dans aucune boutique.',price:0,c:['#a04ae8','#ffffff']},
 aqualumi:{n:'Aqua Lumisphère',d:'Capture ×3 sur les Lumons de type Eau. Sinon, comme une Lumisphère.',price:12,c:['#3ef0ff','#0a3a5a']},
 ombrelumi:{n:'Ombre Lumisphère',d:'Capture ×3 sur les Lumons Ténèbres ou Spectre.',price:12,c:['#2a1a3a','#c77dff']},
 nuitlumi:{n:'Lumisphère Nocturne',d:'Capture ×3 la nuit. Le jour, elle dort.',price:12,c:['#1a1a50','#ffd84a']},
 eclairlumi:{n:'Lumisphère Éclair',d:'Capture ×4 si lancée au tout premier tour du combat.',price:14,c:['#ffd84a','#d8232a']}};
for(const k in BALLS){const b=BALLS[k];ITEMS[k]=Object.assign(ITEMS[k]||{},{n:b.n,d:b.d,price:b.price,ball:1});
 ICON[k]=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><circle cx="16" cy="16" r="12" fill="${b.c[0]}" stroke="#1d1626" stroke-width="2"/><path d="M4 16a12 12 0 0 1 24 0z" fill="${b.c[1]}"/><path d="M5 18 Q16 24 27 18" fill="none" stroke="#f6c80f" stroke-width="3"/><circle cx="16" cy="15" r="5" fill="${b.c[0]}" stroke="#1d1626" stroke-width="1.5"/><circle cx="14" cy="13" r="1.6" fill="#fff"/>${k==='masterlumi'?'<text x="16" y="12" font-size="7" font-weight="700" text-anchor="middle" fill="#fff">M</text>':''}</svg>`}
// paliers : ce que la Boutique Lumi peut vendre selon l'avancée de l'histoire
const BALL_UNLOCK=[['lumisphere',f=>true],['superlumi',f=>f.badge1],['aqualumi',f=>f.brux],['ombrelumi',f=>f.brux],['megalumi',f=>f.ch3],['nuitlumi',f=>f.ch3],['eclairlumi',f=>f.anv]];
const ballsDispo=()=>BALL_UNLOCK.filter(([k,ok])=>ok(F())).map(([k])=>k);
function ballMult(k,f){const t=typesOf(f);switch(k){case'superlumi':return 1.5;case'megalumi':return 2;case'masterlumi':return 999;
 case'aqualumi':return t.includes('Eau')?3:1;case'ombrelumi':return t.some(x=>x==='Ténèbres'||x==='Spectre')?3:1;case'nuitlumi':return ENV.night>.5?3:1;case'eclairlumi':return B&&B.turn<=1?4:1;default:return 1}}
// Night White : clopes et alcool (en combat uniquement, sur le Lumon en jeu)
Object.assign(ITEMS,{
 clopes:{n:'Paquet de clopes',d:'En combat : Précision +1 (ça calme), mais Défense −1 (le souffle court). À consommer avec modération… ou pas du tout.',price:10,bst:{acc:1,def:-1}},
 biere:{n:"Bière d'abbaye",d:"En combat : Attaque +1 (le courage liquide), mais Précision −1. Brassée par des moines, bue par des Lumons.",price:3,bst:{atk:1,acc:-1}},
 peket:{n:'Pèkèt',d:'En combat : Attaque +2, mais Défense −1 et Précision −1. Le genièvre liégeois, ça ne pardonne pas.',price:12,bst:{atk:2,def:-1,acc:-1}}});
Object.assign(ICON,{
 clopes:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect x="8" y="6" width="16" height="22" rx="2" fill="#f4f4f4" stroke="#1d1626" stroke-width="2"/><rect x="8" y="6" width="16" height="8" fill="#d8232a"/><rect x="11" y="2" width="3" height="6" fill="#f2c14e"/><rect x="15" y="3" width="3" height="5" fill="#f2c14e"/><text x="16" y="23" font-size="5" text-anchor="middle" fill="#1d1626">FUMER TUE</text></svg>`,
 biere:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path d="M8 8 h14 v18 a2 2 0 0 1 -2 2 h-10 a2 2 0 0 1 -2 -2z" fill="#e8a020" stroke="#1d1626" stroke-width="2"/><path d="M8 8 q3 -4 7 -1 q4 -3 7 1 v3 h-14z" fill="#fffbe8" stroke="#1d1626" stroke-width="1.5"/><path d="M22 12 h4 v8 h-4" fill="none" stroke="#1d1626" stroke-width="2"/></svg>`,
 peket:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path d="M12 3 h8 v6 l3 4 v15 a2 2 0 0 1 -2 2 h-10 a2 2 0 0 1 -2 -2 v-15 l3 -4z" fill="#dff4ff" stroke="#1d1626" stroke-width="2"/><rect x="10" y="15" width="12" height="8" fill="#f6c80f"/><text x="16" y="21" font-size="5" font-weight="700" text-anchor="middle" fill="#1d1626">PÈKÈT</text></svg>`});
function useBattleBoost(it,m){if(!B||m!==B.me)return `${nm(m)} n'est pas sur le terrain : ça ne servirait à rien maintenant.`;const st=B.st.p,lab={atk:'Attaque',def:'Défense',acc:'Précision'},out=[];
 for(const k in it.bst){st[k]=Math.max(-6,Math.min(6,(st[k]||0)+it.bst[k]));out.push(`${lab[k]} ${it.bst[k]>0?'+':''}${it.bst[k]}`)}hud();return `${nm(m)} ${it===ITEMS.clopes?'grille une clope':it===ITEMS.biere?"descend une bière d'abbaye":'avale un Pèkèt cul sec'}… ${out.join(', ')} !`}
const eur=n=>`${n} €`;
