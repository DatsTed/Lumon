/* ---- Lumons de Gandoux et de la Côte du Nord (chapitres 8 et 9) ----
   Route 8 et Gandoux : Moulivent (le moulin des polders), Canardin (le canard des canaux), Gravenfant -> Gravenspectre (le petit
   fantôme du Château des Comtes), Agnelys (l'Agneau mystique, rare).
   Route 9 et Côte du Nord : Crevetin -> Crevettor (la crevette grise), Mouettor (la mouette voleuse de frites), Éolys (l'esprit des
   éoliennes), Dunelle (la dune qui marche).
   Nouvelles attaques : Écume du Nord (Eau), Tempête de sable (Sol), Carillon du beffroi (Spectre). Chargé après especes-ardennes.js. */
Object.assign(MV,{
 ecume:{n:'Écume du Nord',t:'Eau',p:65,a:100,pp:20},
 sable:{n:'Tempête de sable',t:'Sol',p:60,a:95,pp:20},
 carillon:{n:'Carillon du beffroi',t:'Spectre',p:75,a:100,pp:15}});
Object.assign(MOVEFX,{
 ecume:async(a,d)=>{sfx(700,.4,'sine',.08);await streamFx(A_(a),D_(d),'bubble',12,.4,560,.2);await Promise.all([fountainFx(D_(d),'drop',12,.3,550,.9),shock(d.base,'#e8f8ff',1.6)])},
 sable:async(a,d)=>{sfx(200,.7,'sawtooth',.05);const ps=Array.from({length:18},(_,i)=>{const s=spr(i%2?'dust':'wind',.35+rnd()*.3);s.userData=[rnd()*PI*2,.2+rnd()*1,rnd()];return s});
  await tween(800,q=>ps.forEach(s=>{const[a0,h,r]=s.userData,ang=a0+q*7;s.position.set(d.base.x+Math.cos(ang)*(.4+r*.7),h,d.base.z+Math.sin(ang)*(.4+r*.5));s.material.opacity=Math.sin(q*PI)}));rm(ps);
  await Promise.all([shock(d.base,'#d8c494',1.9),camShake(240,.12)])},
 carillon:async(a,d)=>{for(const f of[392,330,262,196])sfx(f,.35,'triangle',.08);flashScr('#2a1a4a',400,.45,'multiply');
  await Promise.all([orbitFx(D_(d),'note',5,.5,900,.8,.3,1.1),orbitFx(D_(d),'ghost',3,.6,900,.9,.4,1)]);await Promise.all([shock(d.base,'#8a6ad0',2),camShake(260,.14)])}});
const FL_SP={
 moulivent:{n:'Moulivent',t:['Vol','Normal'],b:[58,60,62,72],xp:110,cr:120,L:[[1,'rafale'],[1,'bousculade'],[18,'aile'],[30,'pique']],
  G:{plan:'volant',body:'box',size:.9,c1:'#e8dcc8',c2:'#8a3a2a',c3:'#f4f0e8',eyes:'sleepy',top:'none',ears:'none',side:'wings',back:'none',feet:'none',pattern:'stripes'},
  d:"Un petit moulin des polders qui s'est mis à voler un jour de grand vent. Il tourne sur lui-même quand il est content. Il est presque toujours content.",cry:'Vouuu-vouuu !'},
 canardin:{n:'Canardin',t:['Eau','Vol'],b:[60,58,56,70],xp:100,cr:140,L:[[1,'jet'],[1,'roucoule'],[16,'aile'],[28,'ecume']],
  G:{plan:'bipede',body:'round',size:.75,c1:'#f6e8a0',c2:'#3a7a4a',c3:'#f08a2a',eyes:'round',top:'none',ears:'none',side:'wings',back:'tail',feet:'two',pattern:'belly'},
  d:"Il descend les canaux de Gandoux en se laissant porter par le courant. Il connaît tous les ponts. Il salue les touristes. Ils le prennent en photo. Il adore.",cry:'Kouin-kouin !'},
 gravenfant:{n:'Gravenfant',t:['Spectre','Roche'],b:[52,64,72,58],xp:95,cr:110,evo:[34,'gravenspectre'],L:[[1,'feufollet'],[1,'durcir'],[18,'jetpierre'],[28,'hantise']],
  G:{plan:'flottant',body:'rock',size:.75,c1:'#8a8a92',c2:'#4a4a5a',c3:'#7fe8ff',eyes:'round',top:'helmet',ears:'none',side:'none',back:'none',feet:'tentacles',pattern:'glow'},
  d:"Le fantôme d'un petit page du Château des Comtes. Il porte un casque trop grand pour lui. Il fait « bouh » aux visiteurs, puis il s'excuse.",cry:'Bouh… pardon.'},
 gravenspectre:{n:'Gravenspectre',t:['Spectre','Roche'],b:[76,90,98,72],xp:180,cr:45,L:[[1,'hantise'],[1,'jetpierre'],[1,'durcir'],[38,'carillon'],[44,'eboulis']],
  G:{plan:'bipede',body:'rock',size:1.3,c1:'#6a6a72',c2:'#2a2a3a',c3:'#7fe8ff',eyes:'fierce',top:'helmet',ears:'none',side:'arms',back:'none',feet:'two',pattern:'glow'},
  d:"Un chevalier en armure qui garde les remparts depuis mille ans. Il a oublié qui il protégeait. Alors il protège tout le monde.",cry:'HALTE… LÀ…'},
 agnelys:{n:'Agnelys',t:['Normal','Spectre'],b:[70,62,70,74],xp:170,cr:25,L:[[1,'berceuse'],[1,'feufollet'],[24,'fidelite'],[36,'carillon']],
  G:{plan:'quadrupede',body:'round',size:.85,c1:'#fbf6ea',c2:'#f6c80f',c3:'#ffffff',eyes:'sleepy',top:'crown',ears:'round',side:'none',back:'tail',feet:'four',pattern:'glow'},
  d:"On le dit sorti du grand retable de Gandoux, l'Agneau mystique. Il apparaît rarement, toujours la nuit, et laisse derrière lui une odeur de cire et de pain chaud.",cry:'Bêêê… (doucement)'},
 crevetin:{n:'Crevetin',t:['Eau','Normal'],b:[48,58,52,66],xp:70,cr:180,evo:[30,'crevettor'],L:[[1,'jet'],[1,'bousculade'],[14,'bulles'],[24,'ecume']],
  G:{plan:'serpent',body:'round',size:.6,c1:'#c8a888',c2:'#e8d0b8',c3:'#ff8a6a',eyes:'round',top:'antennae',ears:'none',side:'claws',back:'tail',feet:'none',pattern:'stripes'},
  d:"La crevette grise de la Côte du Nord. Les pêcheurs à cheval la ramassent à marée basse. Lui, il préfère qu'on le laisse tranquille dans le sable.",cry:'Tik-tik !'},
 crevettor:{n:'Crevettor',t:['Eau','Roche'],b:[78,92,88,70],xp:170,cr:45,L:[[1,'ecume'],[1,'jetpierre'],[1,'bulles'],[34,'maree'],[40,'tranche']],
  G:{plan:'quadrupede',body:'rock',size:1.25,c1:'#a87858',c2:'#e8b898',c3:'#ff6a4a',eyes:'fierce',top:'antennae',ears:'none',side:'claws',back:'tail',feet:'four',pattern:'stripes'},
  d:"Une crevette grande comme un chien, avec une carapace de galet. Elle fait fuir les mouettes d'un seul claquement de pinces.",cry:'KLAK-KLAK !'},
 mouettor:{n:'Mouettor',t:['Vol','Eau'],b:[56,66,50,86],xp:110,cr:150,L:[[1,'rafale'],[1,'jet'],[16,'aile'],[26,'pique'],[34,'ecume']],
  G:{plan:'volant',body:'round',size:.8,c1:'#f4f4f8',c2:'#9aa3ad',c3:'#f6c80f',eyes:'fierce',top:'none',ears:'none',side:'wings',back:'tail',feet:'two',pattern:'belly'},
  d:"La terreur de la digue. Elle vole les frites, les gaufres et les cornets de glace. Elle ne regrette rien. Elle recommencera demain.",cry:'KIAAA !'},
 eolys:{n:'Éolys',t:['Électrik','Vol'],b:[62,72,60,94],xp:150,cr:70,L:[[1,'etincelle'],[1,'rafale'],[24,'pique'],[34,'foudre']],
  G:{plan:'volant',body:'cone',size:.95,c1:'#f4f8ff',c2:'#7fd0ff',c3:'#f6e84a',eyes:'round',top:'antennae',ears:'none',side:'wings',back:'none',feet:'none',pattern:'glow'},
  d:"L'esprit des éoliennes de la mer du Nord. Ses ailes tournent sans jamais s'arrêter. Une nuit de tempête, un seul Éolys a éclairé toute la Côte.",cry:'Fwiiizzz !'},
 dunelle:{n:'Dunelle',t:['Sol','Normal'],b:[72,66,80,48],xp:120,cr:120,L:[[1,'bousculade'],[1,'durcir'],[20,'sable'],[32,'seisme']],
  G:{plan:'boule',body:'blob',size:.9,c1:'#e8d4a0',c2:'#c8a870',c3:'#5fae3a',eyes:'sleepy',top:'grass',ears:'none',side:'none',back:'none',feet:'none',pattern:'spots'},
  d:"Une petite dune qui avance d'un mètre par an. Des oyats lui poussent sur la tête. Si tu t'assois dessus, elle ne dit rien. Elle a l'habitude.",cry:'Fffshhh…'}
};
for(const id in FL_SP){const d=Object.assign({},FL_SP[id]),cry=d.cry;delete d.cry;registerSpecies(id,d);CRY[id]=cry;if(!DEX.includes(id))DEX.push(id)}
Object.assign(ETY,{
 moulivent:"De <b>moulin</b> et de <b>vent</b>. Les polders de Flandre en sont couverts : autrefois, les moulins pompaient l'eau pour que la terre reste sèche. Lui, il pompe surtout l'attention.",
 canardin:"De <b>canard</b> et du suffixe <b>-in</b>, comme un petit Flamand qui se promène. À Gandoux, il paraît qu'on peut traverser la ville sans toucher le sol, de bateau en bateau. Les Canardin, eux, ne touchent jamais le sol non plus.",
 gravenfant:"De <b>Gravensteen</b>, le « château des Comtes » en flamand, et d'<b>enfant</b>. Les pages étaient les petits garçons au service des chevaliers. Celui-ci a gardé son casque. Il ne l'a jamais retiré.",
 gravenspectre:"De <b>Gravensteen</b> et de <b>spectre</b>. Le château a été une forteresse, une prison, une usine de coton. Gravenspectre se souvient de tout. Il préfère quand c'était un château.",
 agnelys:"De l'<b>Agneau mystique</b>, le grand retable peint par les frères Van Eyck, et de <b>lys</b>, la fleur blanche. Un panneau du retable, « Les Juges intègres », a été volé il y a cent ans. On ne l'a jamais retrouvé. Officiellement.",
 crevetin:"De <b>crevette</b>, la petite crevette grise de la mer du Nord, qu'on mange dans les tomates-crevettes. Le <b>-in</b>, c'est pour qu'on ait un peu de peine avant de la manger.",
 crevettor:"De <b>crevette</b> et du suffixe <b>-or</b> des champions. Les pêcheurs à cheval racontent qu'une Crevettor a déjà retenu un cheval par la queue.",
 mouettor:"De <b>mouette</b> et de <b>-or</b>, parce qu'elle se croit en or. Sur la Côte du Nord, une affiche dit : « Ne nourrissez pas les mouettes. » Les Mouettor ne lisent pas les affiches. Elles les mangent.",
 eolys:"D'<b>Éole</b>, le dieu grec des vents, et du suffixe <b>-lys</b>. Il est né le jour où on a planté la première éolienne en mer. Il ne la quitte jamais.",
 dunelle:"De <b>dune</b>, et du <b>-elle</b> des petites choses. Les dunes de la Côte du Nord bougent avec le vent. Dunelle aussi. Elle a juste un peu plus de caractère."});
