let TOWN,LAB,ROUTE,CHARL,CENTRE,SHOP,GYM,ARENA,GAL,NWT,NWC,NWR,ROUTE2,BRUX,ROUTE3,JF,CENTREB,CENTREJ,NWB,NWJ;
async function buildWorld(){
 buildIxellette();
 buildLabo();
 buildRoute1();
 buildCharleroc();
 buildInterieursCharleroc();
 buildRoute2();
 buildBruxellia();
 buildRoute3();
 buildJourdanfritte();
 buildInterieursFin();
 buildArene();
 placePNJIxellette();
 placePNJLuciole();
 nightSetup();
}
async function goMap(m,x,z,dir){if(player){player.walking=false;player.running=false}if(follower)follower.walking=false;await fadeOut();gotoMap(m,x,z,dir);refreshNPCs();await fadeIn();
 if(m===ROUTE&&!F().r1){F().r1=1;await banner('Route 1','Ixellette ↔ Charleroc',2200)}
 if(m===JF&&!F().jfSeen)F().jfSeen=1;if(m===CHARL&&!F().charl){F().charl=1;await banner('Charleroc','La cité des terrils',2400)}
 if(m===GYM&&!F().gymIn){F().gymIn=1;await banner('Arène de Charleroc','Type Roche · Maître de Guilde Ginette',2400)}}

function refreshNPCs(){const f=F();
 {const open=f.gate1||f.badge1||f.anouk||f.marcel;if(open&&!f.gate1)f.gate1=1;ROUTE.gate&&ROUTE.gate.forEach(o=>o.visible=!open);for(let x=10;x<=12;x++){setSolid(ROUTE,x,1,open?0:1);if(open)delete ROUTE.signs[x+',1']}}
 if(f.profBadge&&f.rap1&&!f.north)f.north=1;if(f.brux&&!f.north){f.profBadge=f.north=1}if((f.profBadge||f.brux||(f.badge1&&f.fusionIntro))&&!f.fusionOK)f.fusionOK=1;
 if(ROUTE3)pigeonSync();if(NPC.younesH){const bald=!!f.younesBald;NPC.younesH.show(!bald);NPC.younesB.show(bald)}
 if(NPC.mcs)NPC.mcs.show(!!f.luciole&&!f.rap1);lucRefresh();
 if(NPC.agent){const a=NPC.agent;if(f.north){a.x=22;a.z=3;a.face('down')}else{a.x=21;a.z=2;a.face('left')}a.px=a.x;a.pz=a.z;a.place();a.snap()}NPC.mom.show(!!f.introDone);const n=NPC.nils;
 if(f.chapterDone&&!f.nilsBattle){n.x=16;n.z=4;n.place();n.face('left');n.show(true)}else if(f.introDone&&!f.talkedNils&&!f.labIntro)n.show(true);else n.show(false);
 NPC.nilsL.show(!!f.labIntro&&!f.chapterDone);for(let k=0;k<3;k++)LAB.spheres[k].visible=!(k===f.starter||k===f.nilsMon||k===f.starter2);
 {const open=!!f.nilsBattle;TOWN.barrier.forEach(b=>b.visible=!open);TOWN.arrows.forEach(a=>a.visible=open);for(let x=12;x<=16;x++){setSolid(TOWN,x,1,open?0:1);if(open)delete TOWN.signs[x+',1']}}
 {const open=!!f.north;CHARL.mist.forEach(b=>b.visible=!open);for(const x of[19,20]){setSolid(CHARL,x,2,open?0:1);if(open)delete CHARL.signs[x+',2']}}
 for(const m of[ROUTE,CHARL])for(const k in m.items){const it=m.items[k];if(f[it.flag]){it.s.visible=false;const[x,z]=k.split(',').map(Number);setSolid(m,x,z,0)}}}

/* Défaite : Maison des Lumons la plus proche DÉJÀ DÉCOUVERTE (null = chez maman à Ixellette) */
const RESPAWN={town:[],lab:[],nw_town:[],route:[],charl:['charl'],centre:['charl'],shop:['charl'],gym:['charl'],
 route2:['brux','charl'],brux:['brux'],centre_b:['brux'],nw_brux:['brux'],route3:['jf','brux'],jf:['jf'],smile:['jf'],centre_j:['jf'],nw_jf:['jf']};
function respawnCentre(m){const f=F(),known={charl:!!f.charl,brux:!!f.brux,jf:!!(f.jfSeen||f.hired||f.ch3)},C={charl:CENTRE,brux:CENTREB,jf:CENTREJ};
 const L=m&&RESPAWN[m.id];if(!L)return C[f.healAt]||null;for(const k of L)if(known[k])return C[k];return null}
