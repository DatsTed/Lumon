const ITEMS={lumisphere:{n:'Lumisphère',d:'Pour capturer un Lumon sauvage.',price:200,ball:1},
 sirop:{n:'Sirop de Liège',d:'Rend 20 PV à un Lumon.',price:300,heal:20},
 supersirop:{n:'Super Sirop',d:'Rend 50 PV à un Lumon.',price:700,heal:50},
 spa:{n:'Eau de Spa',d:"Soigne toutes les altérations d'état (brûlure, poison, sommeil).",price:250,cure:1},
 titzvel:{n:'Eau de Titvel',de:"de l'Eau de Titvel",d:'Soigne les altérations d\'état et rend 20 PV. Plate ou pétillante, au choix.',price:350,cure:1,heal:20},
 zisoa:{n:'Cisoa Pomme Poire',de:'un Cisoa Pomme Poire',d:'Rend 60 PV à un Lumon. Le soda belge qui pétille et qui sucre.',price:700,heal:60},
 sphereEclat:{n:"Lumisphère d'Éclat",d:"Trouvée par Gérard au fond du puits Sainte-Barbe. Elle pulse d'une lumière cyan et elle est chaude comme un poêle. À rapporter à la Prof Verhaegen, au labo d'Ixellette.",price:0,quest:1},
 colisnw:{n:'Colis de Nour',d:'Douze canettes de Cisoa Pomme-Poire pour Amin, à Jourdanfritte. Ne pas laisser traîner près des Pigeolet.',price:0,quest:1},
 enveloppe:{n:'Enveloppe d\'argent sale',d:'Tombée des poches des Kétosaures sur la Route 2. Impossible de la dépenser : à remettre à la police de Bruxellia.',price:0,quest:1},
 durum:{n:'Dürüm',de:'un dürüm',d:'Rend 90 PV. Fait maison par Jalal, sauce blanche à volonté.',price:1100,heal:90},
 baklava:{n:'Baklava',d:'Relève un Lumon K.O. avec la moitié de ses PV. Ultra sucré.',price:1300,revive:1},
 frites:{n:'Cornet de frites',de:'un cornet de frites',d:'Rend 50 PV. Cuites deux fois, comme il faut.',price:600,heal:50},
 fricadelle:{n:'Fricadelle',de:'une fricadelle',d:'Soigne les altérations et rend 40 PV.',price:700,heal:40,cure:1},
 mitraillette:{n:'Mitraillette',de:'une mitraillette',d:'Rend 120 PV. Demi-baguette, frites, fricadelle, sauce samouraï.',price:1400,heal:120},
 chips:{n:'Chips paprika',d:'Rend 30 PV à un Lumon. Croustillant, une fois !',price:400,heal:30},
 choco:{n:'Lait chocolaté',d:'Rend 80 PV à un Lumon. Bien frais, sorti du frigo.',price:1000,heal:80},
 speculoos:{n:'Spéculoos',d:'Relève un Lumon K.O. avec la moitié de ses PV.',price:1500,revive:1},
 eclat_feu:{n:'Éclat ardent',d:'Forme Ardente : ajoute le type Feu et une aura. Réutilise pour revenir à la normale.',price:2500,form:'Feu'},
 eclat_eau:{n:'Éclat marin',d:'Forme Marine : ajoute le type Eau et une aura.',price:2500,form:'Eau'},
 eclat_plante:{n:'Éclat sylvestre',d:'Forme Sylvestre : ajoute le type Plante et une aura.',price:2500,form:'Plante'},
 eclat_roche:{n:'Éclat terril',d:'Forme Terril : ajoute le type Roche et une aura.',price:2500,form:'Roche'}};

function healAll(){S.party.forEach(m=>{m.hp=m.mhp;m.status=null;m.moves.forEach(x=>x.pp=MV[x.id].pp)})}
function canUse(id,m){const it=ITEMS[id];if(it.cure&&it.heal)return m.hp>0&&(!!m.status||m.hp<m.mhp);if(it.cure)return m.hp>0&&!!m.status;if(it.form)return m.hp>0;if(it.revive)return m.hp<=0;if(it.heal)return m.hp>0&&m.hp<m.mhp;return false}
function applyItem(id,m){S.bag[id]--;const it=ITEMS[id];if(it.cure){m.status=null;if(it.heal)m.hp=Math.min(m.mhp,m.hp+it.heal);return `${nm(m)} boit ${it.de||"de l'"+it.n}. Il est en pleine forme !`}if(it.form){if(m.form===it.form){m.form=null;setTimeout(refreshFollower,0);return `${nm(m)} reprend sa forme normale.`}m.form=it.form;setTimeout(refreshFollower,0);return SP[m.sp].t.includes(it.form)?`${nm(m)} absorbe l'Éclat… ${FORMS[it.form].n} ! Il est déjà de type ${it.form}, mais son aura brille de mille feux !`:`${nm(m)} absorbe l'Éclat… ${FORMS[it.form].n} ! Il gagne le type ${it.form} !`}if(ITEMS[id].revive){m.hp=Math.floor(m.mhp/2);m.status=null;return `${nm(m)} croque un spéculoos et se relève !`}const h=Math.min(ITEMS[id].heal,m.mhp-m.hp);m.hp+=h;return `${nm(m)} récupère ${h} PV. Miam !`}
