function buildLabo(){
 /* ---- Lab ---- */
 {const L=LAB=makeMap('lab',9,7,100,0,'town'),lg=L.group;
  box(lg,9,.2,7,104,0,3,'#c89a6a');box(lg,5,.03,3,104,.13,3.8,'#8a1a22',{cast:false,tex:'carpet',rx:2,ry:1});box(lg,4.4,.03,2.4,104,.16,3.8,'#a8862a',{cast:false,tex:'carpet',rx:2,ry:1});
  box(lg,9.4,3,.3,104,1.6,-.6,'#3a3456',{ol:.03,tex:'plaster',rx:6,ry:2});box(lg,.3,1.2,7.4,99.4,.7,3,'#3a3456',{ol:.03});box(lg,.3,1.2,7.4,108.6,.7,3,'#3a3456',{ol:.03});
  box(lg,4,.4,.3,101.6,.3,6.6,'#3a3456',{ol:.02});box(lg,4,.4,.3,106.4,.3,6.6,'#3a3456',{ol:.02});box(lg,.9,.04,.6,104,.14,6,'#3f8f3a',{cast:false});
  for(const sx of[101.5,106.5]){box(lg,2.8,2.2,.6,sx,1.2,0,'#8a5a32',{ol:.03});for(let r=0;r<3;r++){box(lg,2.6,.06,.55,sx,.5+r*.62,0,'#6b4426');for(let b=0;b<8;b++)box(lg,.18,.4+((b*7+r*3)%4)*.03,.3,sx-1.1+b*.31,.75+r*.62,.22,['#d8232a','#f6c80f','#2b2b2b','#3f7fd6','#6b9a34'][(b+r)%5],{cast:false})}}
  box(lg,1.8,1,.2,104,1.9,-.42,'#ffffff',{ol:.02});plane(lg,1.7,.9,104,1.9,-.31,labelTex('ARDENVAL','#e8f4ff','#2f6f9f',512,256,70));
  box(lg,3,.8,.9,104,.5,2,'#7a8aa8',{ol:.03});box(lg,3.1,.08,1,104,.94,2,'#e8eef8',{ol:.02});
  box(lg,.9,.75,.7,107,.47,1,'#8a5a32',{ol:.02});box(lg,.7,.5,.08,107,1.15,.9,'#2b2b2b');box(lg,.6,.4,.09,107,1.15,.92,'#7fd0ff',{emi:'#7fd0ff',cast:false});
  add(lg,new THREE.CylinderGeometry(.25,.2,.4,10),'#b9563c',101,.3,1,{ol:.02});tp(lg,SPH,'#4c9e3e',101,.78,1,.38,.38,.38);
  L.spheres=[];for(let k=0;k<3;k++){const s=new THREE.Group();s.position.set(103+k,1.2,2);lg.add(s);tp(s,SPH,'#b8a8ff',0,0,0,.2,.2,.2,{op:.55});tp(s,SPH,TC[SP[STARTERS[k]].t[0]],0,0,0,.1,.1,.1,{ol:false,emi:TC[SP[STARTERS[k]].t[0]]});s.ring=tp(s,TOR,'#f6c80f',0,0,0,.22,.22,.22,{r:[1.2,0,0],ol:false});L.spheres.push(s)}
  L.anim.push(t=>L.spheres.forEach((s,k)=>{s.position.y=1.2+Math.sin(t*2+k)*.04;s.ring.rotation.z=t*1.5+k}));
  for(let x=0;x<9;x++){setSolid(L,x,0);if(x!==4)setSolid(L,x,6)}for(let z=0;z<7;z++){setSolid(L,0,z);setSolid(L,8,z)}solidRect(L,3,2,3,1);setSolid(L,7,1);setSolid(L,1,1);
  for(let x=1;x<8;x++)L.signs[x+',0']="Des livres : « Les terrils et leurs mystères », « Guide des canaux de Gandoux », « 1001 façons de cuire un chicon ».";
  L.signs['7,1']="L'ordinateur de la Prof. Un dossier s'appelle « Éclat — rapport confidentiel »… Mieux vaut ne pas fouiller dans le brol des autres.";
  L.signs['1,1']="Une plante en pot. Il y a des feuilles de chicon partout autour… Un Chicorin a dû passer par là.";
  for(let k=0;k<3;k++)L.signs[(3+k)+',2']=()=>pickSphere(k);
  add(lg,new THREE.CylinderGeometry(.42,.48,.3,16),'#2b2b3a',106,.25,1,{ol:.02});const fz=tp(lg,CYL,'#3ef0ff',106,.95,1,.34,1.1,.34,{op:.35,emi:'#3ef0ff',ol:false});add(lg,new THREE.CylinderGeometry(.42,.42,.18,16),'#2b2b3a',106,1.6,1,{ol:.02});
  const fo=tp(lg,SPH,'#ff3b5c',106,1,1,.12,.12,.12,{emi:'#ff3b5c',ol:false});L.anim.push(t=>{const on=!!(S&&S.flags&&S.flags.fusionOK);fo.visible=on;fo.position.y=.9+Math.sin(t*2)*.25;fz.material.opacity=on?.3+Math.sin(t*4)*.1:.08});setSolid(L,6,1);L.signs['6,1']=fusionMachine;L.steps['4,6']=exitLab;}

}
function buildInterieursCharleroc(){
 /* ---- Interiors ---- */
 CENTRE=room('centre',9,7,120,'K','#4a2a44',()=>goMap(CHARL,6,9,'down'));
 {const m=CENTRE,g=m.group;box(g,4.6,.9,.8,124,.55,2,'#d8232a',{ol:.03});box(g,4.8,.1,1,124,1.02,2,'#ffffff',{ol:.02});solidRect(m,2,2,5,1);
  plane(g,3,.6,124,2.1,.42,labelTex('MAISON DES LUMONS','#ffffff','#d8232a',768,128,48));pcTerminal(g,127,1);setSolid(m,7,1);
  tp(g,SPH,'#4c9e3e',121,.7,1,.35,.4,.35);add(g,new THREE.CylinderGeometry(.22,.18,.35,10),'#b9563c',121,.27,1,{ol:.02});setSolid(m,1,1);
  {const mg=new THREE.Group();mg.position.set(125.6,1.07,2.05);g.add(mg);box(mg,1.05,.1,.62,0,.05,0,'#2a2440',{ol:.02});box(mg,.95,.3,.08,0,.2,-.27,'#3a3456',{ol:.02});
   const glow=new THREE.Mesh(new THREE.PlaneGeometry(.9,.5),new THREE.MeshBasicMaterial({color:'#7fffd0',transparent:true,opacity:.15,depthWrite:false,blending:THREE.AdditiveBlending}));glow.rotation.x=-PI/2;glow.position.y=.11;mg.add(glow);
   const ring=tp(mg,TOR,'#3ef0ff',0,.36,-.22,.09,.09,.09,{ol:false,emi:'#3ef0ff'});const slots=[];for(let r=0;r<2;r++)for(let c=0;c<3;c++){const x=-.3+c*.3,z=-.1+r*.22;tp(mg,TOR,'#c9ccd4',x,.11,z,.075,.075,.075,{r:[PI/2,0,0],ol:false});slots.push([x,.17,z])}
   m.mach={g:mg,slots,glow,ring}}
  NPC.nurse=npc(m,'nurse',4,1,'down',nurseHeal);for(let x=2;x<=6;x++)m.signs[x+',2']=nurseHeal;
  m.signs['7,1']=pcMenu;}
 setTimeout(()=>{CENTRE.song='hope';SHOP.song='charl';GYM.song='charl'},0);CENTRE.nurseN='Infirmière Josiane';CENTRE.healId='charl';
 CENTREB=centreRoom('centre_b',1000,()=>goMap(BRUX,5,13,'down'),'Infirmière Fatou','brux');CENTREJ=centreRoom('centre_j',1020,()=>goMap(JF,21,12,'down'),'Infirmier Pol','jf');
 NWB=nwRoom('brux',async()=>{await goMap(BRUX,23,12,'down');if(F().nourMet)shoutBubble('Nour (depuis la caisse) : « ET MERCIII ! » … HAHAHAHA !','Nour')});NWJ=nwRoom('jf',()=>goMap(JF,9,5,'down'));
}
function buildInterieursFin(){
 NWT=nwRoom('town',()=>goMap(TOWN,18,21,'down'));[ROUTE,ROUTE2,ROUTE3].forEach(ambushDecor);
 SHOP=room('shop',9,7,140,'W','#2a3a5a',()=>goMap(CHARL,22,9,'down'));
 {const m=SHOP,g=m.group;box(g,3,.9,.8,142,.55,2,'#3f7fd6',{ol:.03});box(g,3.2,.1,1,142,1.02,2,'#ffffff',{ol:.02});solidRect(m,1,2,3,1);
  for(const sx of[145,147]){box(g,1.6,1.8,.5,sx,1,.75,'#8a5a32',{ol:.03});for(let r=0;r<3;r++)for(let b=0;b<4;b++)tp(g,b%2?CYL:BOXG,['#5a2e16','#f6c80f','#ffffff','#c07a3a'][(b+r)%4],sx-.55+b*.37,.5+r*.55,1.05,.13,.18,.13,{th:.015})}
  plane(g,2.4,.5,142,2.1,.42,labelTex('BOUTIQUE LUMI','#3f7fd6','#ffffff'));
  npc(m,'clerk',2,1,'down',shopMenu);for(let x=1;x<=3;x++)m.signs[x+',2']=shopMenu;
  m.signs['5,0']=m.signs['6,0']=m.signs['7,0']="Des pots de Sirop de Liège, des Lumisphères… et une boîte de pralines « réservée au patron ».";}
 GYM=room('gym',11,15,160,'D','#5a4a40',()=>goMap(CHARL,14,6,'down'),T=>{[[2,11],[8,11],[1,8],[3,8],[7,8],[9,8],[2,5],[8,5],[3,3],[7,3],[1,12],[9,12]].forEach(([x,z])=>T[z][x]='r')});
 {const m=GYM,g=m.group;box(g,3,.1,2,165,.15,1.5,'#3a3a42',{ol:.02});for(const x of[3,7]){add(g,new THREE.ConeGeometry(.42,1.2,8),'#3d3833',160+x,.7,12,{ol:.03});setSolid(m,x,12);m.signs[x+',12']="Arène de Charleroc. Maître de Guilde : Ginette. Vainqueurs : … (le nom de Dolba a été rayé.)"}
  for(const s of[-1,1])tp(g,SPH,'#ff8a2c',165+s*2.5,1.6,-.3,.18,.18,.18,{emi:'#ff7a1a'});
  const marcel=npc(m,'miner',5,8,'down',async()=>say('Mineur Marcel',F().marcel?"Ginette t'attend au fond. Bonne chance, hein, t'en auras besoin !":"…"));
  m.trainers.push({c:marcel,range:3,flag:'marcel',name:'Mineur Marcel',key:'miner',smart:.35,mons:()=>[mkMon('scorion',8),mkMon('terrilou',8)],intro:"Personne n'approche la Reine des terrils sans passer par moi !",win:"Ouille… T'as la tête dure, toi. Comme un vrai Carolo !",reward:null});
  NPC.ginette=npc(m,'ginette',5,2,'down',ginetteTalk);}

}
