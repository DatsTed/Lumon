/* ---- Luciole : rencontres scénarisées SANS combat (son humour évolue au fil des rencontres) ----
   1. Vieux terril de Charleroc : combat (chapitre1.js, lucioleScene) — froide, mystérieuse.
   2. Ixellette, friterie de Fernand (après le concert, avant de voir la Prof) — elle observe, pique un peu.
   3. Bruxellia, Manneken-Lumon (première visite) — plus complice, sarcastique, laisse filer un bout de son secret.
   Déclenchement : en approchant (2 cases), une seule fois. Drapeaux : lucIx, lucBx. */
function lucFree(m,x,z){for(let r=0;r<5;r++)for(let dz=-r;dz<=r;dz++)for(let dx=-r;dx<=r;dx++){if(Math.abs(dx)+Math.abs(dz)!==r)continue;const X=x+dx,Z=z+dz;if(walkable(m,X,Z)&&m.T&&m.T[Z]&&m.T[Z][X]!=='T'&&m.T[Z][X]!=='~')return[X,Z]}return[x,z]}
const LUC_RDV=[
 {flag:'lucIx',map:()=>TOWN,at:[9,16],dir:'right',when:f=>f.rap1&&!f.profBadge,scene:lucioleIxellette},
 {flag:'lucBx',map:()=>BRUX,at:[17,11],dir:'down',when:f=>f.brux&&f.luciole,scene:lucioleBruxellia}];
function placePNJLuciole(){for(const r of LUC_RDV){const m=r.map(),[x,z]=lucFree(m,...r.at);r.c=npc(m,'luciole',x,z,r.dir,async()=>{await r.scene(r)});r.c.show(false);
  const h0=m.hook;m.hook=(px,pz)=>{const f=F();if(!f[r.flag]&&r.c&&!r.c.hidden&&Math.abs(px-r.c.x)+Math.abs(pz-r.c.z)<=2)return()=>r.scene(r);return h0?h0(px,pz):null}}}
function lucRefresh(){const f=F();for(const r of LUC_RDV)if(r.c)r.c.show(!f[r.flag]&&!!r.when(f))}
async function lucLeave(r,last){const c=r.c;F()[r.flag]=1;if(last)await say('Luciole',last);sfx(180,.6,'sine',.15);await tween(600,q=>{c.k=1-q;c.place()});c.show(false);c.k=1;c.place();setObj()}
async function lucFace(r){const c=r.c;c.face(dirTo(c,player.x,player.z));player.face(dirTo(player,c.x,c.z));player.yawOv=null;await sleep(150)}
async function lucioleIxellette(r){const L='Luciole';await lucFace(r);setSong('memory');
 await say('',"Devant la friterie de Fernand, une fille aux cheveux noirs mange une fricadelle, la capuche sur la tête. Une petite lueur verte danse à son cou.");
 await say(L,"…Ne dis rien. Je ne suis pas là. Je mange une fricadelle, comme une personne normale.");
 await say(L,"Snow croit que je colle des affiches à Charleroc. Moi, je voulais juste voir à quoi ressemble ton village. C'est… petit. Mignon. Petit.");
 await say(L,"Ta mère a crié ton prénom trois fois par la fenêtre. Trois. On dirait une sirène d'usine. Je l'aime bien.");
 await say(S.name||'Toi',"Tu m'espionnes ?");
 await say(L,"J'observe. Nuance. … Bon. Un peu.");
 await say(L,"La brume au nord, c'est Snow qui l'entretient. Le jour où elle se lèvera, il sera déjà à Bruxellia. Fais gaffe à toi, le rockeur.");
 setSong(cur.song);await lucLeave(r,"Et dis à Fernand que sa sauce andalouse est trop salée. Ça, c'est pas de l'espionnage, c'est de la critique gastronomique.")}
async function lucioleBruxellia(r){const L='Luciole',f=F();await lucFace(r);setSong('memory');
 await say('',"Devant le Manneken-Lumon, quelqu'un prend un selfie en faisant la grimace. Cheveux noirs, yeux verts… Luciole.");
 await say(L,"Tiens. Le rockeur de Charleroc. Tu me suis, ou c'est le destin ? Je préfère que ce soit toi. Le destin, j'ai déjà donné.");
 if(f.monsieurNour)await say(L,"« Monsieur Nour »… Tout Bruxellia en parle. Même les Kétosaures ont rigolé. Snow, non. Snow ne rigole jamais.");
 await say(L,"Je suis venue voir le Manneken-Lumon. Il fait pipi depuis quatre cents ans et personne ne lui demande de rendre des comptes. J'envie sa liberté.");
 await say(L,"…Tu sais garder un secret ? Non, laisse tomber. Le jour où je te le dirai, c'est que je n'aurai plus rien à perdre.");
 await say(L,"Les Pirates traînent sur la Route 3. Si tu croises leur chef… ne lui parle pas de moi. Jamais. Promis ?");
 await lienChoix('luciole',L,"Promis ?",[["Promis.",'coeur',1],["Ça dépend de ce que tu caches…",'ami',1,"Ha. T'es moins naïf que t'en as l'air. J'aime bien."]]);
 setSong(cur.song);await lucLeave(r,"À la prochaine, {P}. Et essaie de ne pas te faire voler ton colis, hein. Bruxellia, c'est plein de pigeons.")}
