/* ---- Lumons de Liègenoir (chapitre 5) : les premiers Lumons Ténèbres sauvages ----
   Modèles procéduraux (gène plan : silhouettes de systemes/formes.js). Chargé après formes.js. */
const LIE_SP={
 ratoir:{n:'Ratoir',t:['Ténèbres'],b:[50,62,46,72],xp:72,cr:160,evo:[30,'perronrat'],L:[[1,'morsure'],[1,'regard'],[1,'bousculade'],[24,'nuitbxl']],
  G:{plan:'quadrupede',body:'round',size:.78,c1:'#4a4048',c2:'#8a7a80',c3:'#ff4a6a',eyes:'fierce',top:'none',ears:'round',side:'none',back:'tail',feet:'four',pattern:'none'},
  d:"Les rats du Perron. Ils connaissent chaque cave de Liègenoir et revendent tout ce qu'ils y trouvent, même ce qui ne leur appartient pas.",cry:'Kiiik !'},
 perronrat:{n:'Perronrat',t:['Ténèbres','Roche'],b:[76,92,70,88],xp:168,cr:60,L:[[1,'morsure'],[1,'regard'],[1,'nuitbxl'],[34,'triplecroc']],
  G:{plan:'quadrupede',body:'rock',size:1.25,c1:'#3a3238',c2:'#6a5a60',c3:'#f6c80f',eyes:'fierce',top:'crown',ears:'round',side:'claws',back:'coal',feet:'four',pattern:'none'},
  d:"Le roi des égouts de Liègenoir. Il porte une couronne volée sur le Perron et ne la rendra jamais. Il paraît qu'il a déjà mordu un huissier.",cry:'KRRRAAAK !'},
 tchantchou:{n:'Tchantchou',t:['Normal','Ténèbres'],b:[70,66,62,64],xp:140,cr:90,L:[[1,'bousculade'],[1,'grogne'],[1,'regard'],[28,'fidelite']],
  G:{plan:'bipede',body:'tall',size:.95,c1:'#e8c8a0',c2:'#3a5a9a',c3:'#d8232a',eyes:'round',top:'none',ears:'none',side:'arms',back:'none',feet:'two',pattern:'stripes'},
  d:"Une marionnette de bois qui s'est animée un soir de 15 août, en Outremeuse. Le nez de travers, le cœur sur la main… et une sainte horreur du Baron.",cry:'Hé, m\'fi !'},
 smogule:{n:'Smogule',t:['Spectre','Ténèbres'],b:[56,70,52,80],xp:120,cr:110,L:[[1,'feufollet'],[1,'fumee'],[1,'regard'],[30,'hantise']],
  G:{plan:'flottant',body:'blob',size:.95,c1:'#5a5060',c2:'#8a8090',c3:'#c8ff4a',eyes:'sleepy',top:'none',ears:'none',side:'none',back:'none',feet:'tentacles',pattern:'glow'},
  d:"Né de la fumée des cokeries. Plus la ville est sale, plus il grossit. Le jour où le ciel de Liègenoir redeviendra bleu, il disparaîtra… ou il deviendra autre chose.",cry:'Fffhhhh…'},
 lucinelle:{n:'Lucinelle',t:['Insecte','Spectre'],b:[58,64,56,82],xp:110,cr:0,L:[[1,'piqure'],[1,'feufollet'],[12,'vrombi'],[26,'hantise']],
  G:{plan:'volant',body:'round',size:.7,c1:'#2a1a3a',c2:'#7fffd0',c3:'#2fbf4f',eyes:'round',top:'antennae',ears:'none',side:'wings',back:'none',feet:'none',pattern:'glow'},
  d:"La petite de Noctiluce. Elle ne naît que d'un œuf confié par quelqu'un qui te fait vraiment confiance. Sa lueur verte s'allume quand tu dis la vérité.",cry:'Frrr… pip !'},
 cokelin:{n:'Cokelin',t:['Feu','Ténèbres'],b:[62,80,58,74],xp:130,cr:100,L:[[1,'braise'],[1,'morsure'],[1,'grisou'],[32,'haufo']],
  G:{plan:'serpent',body:'round',size:1,c1:'#2b2b30',c2:'#5a5a62',c3:'#ff6a1a',eyes:'fierce',top:'spikes',ears:'none',side:'none',back:'ember',feet:'none',pattern:'stripes'},
  d:"Ce serpent de charbon se glisse dans les fours des cokeries. Les vieux ouvriers le nourrissaient en cachette, pour qu'il garde les fours au chaud la nuit.",cry:'Tssssss !'}
};
for(const id in LIE_SP){const d=Object.assign({},LIE_SP[id]),cry=d.cry;delete d.cry;registerSpecies(id,d);CRY[id]=cry;if(!DEX.includes(id))DEX.push(id)}

// « D'où vient son nom ? » dans le Lumidex
Object.assign(ETY,{
 ratoir:"De <b>rat</b> et de <b>trottoir</b>. À Liègenoir, on dit qu'un Ratoir connaît chaque pavé du Carré, chaque cave et chaque soupirail. Il ne vole pas : il « récupère ».",
 perronrat:"Du <b>Perron</b>, la colonne de bronze qui trône place du Marché, symbole des libertés liégeoises, et de <b>rat</b>. Un roi des égouts qui s'est couronné tout seul, sur le monument de la liberté. Les Liégeois trouvent ça très logique.",
 tchantchou:"De <b>Tchantchès</b>, la marionnette d'Outremeuse : un gamin au nez de travers, né entre deux pavés, qui n'a peur de rien et qui parle wallon. « Tchantchou », c'est le petit nom affectueux qu'on lui donne quand il a fait une bêtise.",
 smogule:"De <b>smog</b>, le brouillard de fumée des villes industrielles, et de <b>goule</b>, l'esprit qui se nourrit de ce qui pourrit. Plus le ciel est noir, plus il a faim.",
 lucinelle:"De <b>Luciole</b>, évidemment, et du suffixe tendre <b>-nelle</b>, « la petite ». Son nom, c'est Luciole qui l'a choisi. Elle ne l'a dit à personne… sauf à toi.",
 cokelin:"De <b>coke</b>, le charbon cuit des hauts-fourneaux, et de <b>-lin</b>, comme un petit animal qu'on garde au chaud. Rien à voir avec l'autre coke : les vieux ouvriers de la Cokerie insistent beaucoup là-dessus."});
