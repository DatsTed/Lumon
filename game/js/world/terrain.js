/* ================= MAPS ================= */
function makeMap(id,W,H,ox,oz,song){const m={id,W,H,ox,oz,song,solid:new Uint8Array(W*H),npcs:[],signs:{},doors:{},steps:{},items:{},trainers:[],group:new THREE.Group(),anim:[]};scene.add(m.group);m.group.visible=false;MAPS[id]=m;return m}
const MAPS={};
const setSolid=(m,x,z,v=1)=>{if(x>=0&&z>=0&&x<m.W&&z<m.H)m.solid[z*m.W+x]=v};
const solidRect=(m,x0,z0,w,d)=>{for(let z=z0;z<z0+d;z++)for(let x=x0;x<x0+w;x++)setSolid(m,x,z)};
const grid=(W,H,f='.')=>Array.from({length:H},()=>Array(W).fill(f));
function rect(T,x0,z0,x1,z1,ch){for(let z=z0;z<=z1;z++)for(let x=x0;x<=x1;x++)if(T[z]&&T[z][x]!==undefined)T[z][x]=ch}
function pathLine(T,pts,w=3,ch='#'){const h=Math.floor(w/2);for(let i=0;i<pts.length-1;i++){const[a,b]=pts[i],[c,d]=pts[i+1];rect(T,Math.min(a,c)-h,Math.min(b,d)-h,Math.max(a,c)+h,Math.max(b,d)+h,ch)}}
function ellipse(T,cx,cz,rx,rz,ch){for(let z=Math.floor(cz-rz);z<=cz+rz;z++)for(let x=Math.floor(cx-rx);x<=cx+rx;x++)if(((x-cx)/rx)**2+((z-cz)/rz)**2<=1&&T[z]&&T[z][x]!==undefined)T[z][x]=ch}
const TILEG=new THREE.BoxGeometry(1,.2,1);
const TEXC={};const hsh=(x,z,k=1)=>{const v=Math.sin(x*127.1+z*311.7+k*74.7)*43758.5453;return v-Math.floor(v)};
function groundTex(kind){if(TEXC[kind])return TEXC[kind];const c=document.createElement('canvas');c.width=c.height=128;const x=c.getContext('2d');const R=(a,b)=>a+Math.random()*(b-a);
 if(kind==='grass'){x.fillStyle='#e2e2e2';x.fillRect(0,0,128,128);for(let i=0;i<900;i++){const v=R(150,255)|0;x.fillStyle=`rgb(${v},${v},${v})`;x.fillRect(R(0,128),R(0,128),2,2)}
  for(let i=0;i<140;i++){const px=R(0,128),py=R(0,128),v=R(170,255)|0;x.strokeStyle=`rgba(${v},${v},${v},.9)`;x.lineWidth=1.4;x.beginPath();x.moveTo(px,py);x.lineTo(px+R(-3,3),py-R(4,9));x.stroke()}
  for(let i=0;i<10;i++){x.fillStyle='rgba(120,120,120,.18)';x.beginPath();x.arc(R(0,128),R(0,128),R(6,16),0,7);x.fill()}}
 else if(kind==='gravel'){x.fillStyle='#e8e2d8';x.fillRect(0,0,128,128);for(let i=0;i<260;i++){const v=R(150,255)|0;x.fillStyle=`rgb(${v},${v-6},${v-14})`;x.beginPath();x.ellipse(R(0,128),R(0,128),R(1.5,4.5),R(1.2,3.5),R(0,3),0,7);x.fill()}}
 else if(kind==='cobble'){x.fillStyle='#8a8580';x.fillRect(0,0,128,128);for(let r=0;r<6;r++)for(let k=0;k<5;k++){const ox=(r%2)*13,v=R(195,250)|0;x.fillStyle=`rgb(${v},${v-4},${v-10})`;x.beginPath();x.roundRect?x.roundRect(k*26+ox-12,r*21+2,23,18,5):x.rect(k*26+ox-12,r*21+2,23,18);x.fill()}}
 else if(kind==='dirt'){x.fillStyle='#d8d0c4';x.fillRect(0,0,128,128);for(let i=0;i<500;i++){const v=R(140,240)|0;x.fillStyle=`rgb(${v},${v-8},${v-18})`;x.fillRect(R(0,128),R(0,128),R(1,4),R(1,3))}for(let i=0;i<12;i++){x.fillStyle='rgba(60,50,40,.3)';x.beginPath();x.arc(R(0,128),R(0,128),R(2,5),0,7);x.fill()}}
 else if(kind==='wood'){x.fillStyle='#e6dccc';x.fillRect(0,0,128,128);for(let r=0;r<4;r++){x.fillStyle='rgba(90,60,30,.35)';x.fillRect(0,r*32,128,2);for(let i=0;i<14;i++){x.strokeStyle='rgba(120,80,40,.18)';x.beginPath();x.moveTo(0,r*32+R(4,30));x.bezierCurveTo(40,r*32+R(4,30),80,r*32+R(4,30),128,r*32+R(4,30));x.stroke()}x.fillRect(((r*53)%128),r*32,2,32)}}
 else if(kind==='tile'){x.fillStyle='#d0d0d8';x.fillRect(0,0,128,128);x.fillStyle='#f4f4f8';x.fillRect(3,3,58,58);x.fillRect(67,67,58,58);x.fillStyle='#e4e4ec';x.fillRect(67,3,58,58);x.fillRect(3,67,58,58)}
 const t=new THREE.CanvasTexture(c);t.wrapS=t.wrapT=THREE.RepeatWrapping;t.anisotropy=4;return TEXC[kind]=t}
const GTEX={'N':'tile','#':'gravel','=':'gravel','c':'cobble','D':'dirt','W':'wood','K':'tile'};
const GCOL={'N':['#eeeef2','#e2e2e8'],'#':['#d8c494','#cfba88'],'c':['#d6ccb8','#c9bfab'],'D':['#8f7d68','#86745f'],'W':['#c89a6a','#bf905f'],'K':['#3d3756','#2c2842'],'T':['#6fb850','#6fb850'],'g':['#5fae45','#5fae45']};
function terrain(m,T){const H=T.length,W=T[0].length,g=m.group,ox=m.ox,oz=m.oz;m.T=T;
 const groups={};const dm=new THREE.Object3D(),col=new THREE.Color();const trees=[],flowers=[],grass=[],water=[],deco=[];
 for(let z=0;z<H;z++)for(let x=0;x<W;x++){const t=T[z][x];let y=0;
  if(t==='~'||t==='='){col.set('#2f6f9f');y=-.35;water.push([x,z])}else if(GCOL[t])col.set(GCOL[t][(x+z)%2]);else col.set((x+z)%2?'#7cc458':'#74bc52');
  if(t==='T')trees.push([x,z]);if(t==='g')grass.push([x,z]);if(t==='f')flowers.push([x,z]);if(t==='.'&&!m.room)deco.push([x,z]);
  col.offsetHSL(0,0,(hsh(x,z)-.5)*.05);const key=(t==='~'||t==='=')?'none':(GTEX[t]||'grass');(groups[key]=groups[key]||[]).push([ox+x,y,oz+z,col.clone()]);
  if('T~LrF'.includes(t))setSolid(m,x,z);
  if(t==='L'){add(g,new THREE.BoxGeometry(1.02,.26,.3),'#6a9a40',ox+x,.2,oz+z+.36,{ol:.02});add(g,new THREE.BoxGeometry(1.02,.06,.12),'#9a7a50',ox+x,.06,oz+z+.5,{cast:false})}
  if(t==='r'){const s=.32+((x*5+z*3)%3)*.06;tp(g,DOD,(x+z)%2?'#8a8580':'#7a7570',ox+x,.1+s*.7,oz+z,s*1.25,s,s*1.15,{r:[x,z,0],th:.03})}
  if(t==='F'){box(g,.1,.55,.1,ox+x,.37,oz+z,'#f0f0f0',{ol:.015});box(g,1,.07,.05,ox+x,.5,oz+z,'#f0f0f0')}}
 for(const key in groups){const L=groups[key],mt=new THREE.MeshToonMaterial({gradientMap:GRAD});if(key!=='none')mt.map=groundTex(key);const im=new THREE.InstancedMesh(TILEG,mt,L.length);im.receiveShadow=true;
  L.forEach(([x,y,z,c],k)=>{dm.position.set(x,y,z);dm.rotation.y=key==='grass'?((x*7+z*3)%4)*PI/2:0;dm.updateMatrix();im.setMatrixAt(k,dm.matrix);im.setColorAt(k,c)});dm.rotation.y=0;im.instanceColor.needsUpdate=true;g.add(im)}
 if(!m.room){const gt=groundTex('grass').clone();gt.needsUpdate=true;gt.repeat.set(W+40,H+40);const pl=new THREE.Mesh(new THREE.PlaneGeometry(W+40,H+40),new THREE.MeshToonMaterial({color:'#4f9a3c',map:gt,gradientMap:GRAD}));pl.rotation.x=-PI/2;pl.position.set(ox+(W-1)/2,-.11,oz+(H-1)/2);pl.receiveShadow=true;g.add(pl);
  const rim=[];for(let k=0;k<Math.floor((W+H)*1.2);k++){const side=k%4;let x,z;if(side===0){x=-2-hsh(k,1)*5;z=hsh(k,2)*H}else if(side===1){x=W+1+hsh(k,1)*5;z=hsh(k,2)*H}else if(side===2){z=-2-hsh(k,3)*5;x=hsh(k,4)*W}else{z=H+1+hsh(k,3)*4;x=hsh(k,4)*W}rim.push([x,z])}
  rim.forEach(([x,z],k)=>trees.push([x,z,1]))}
 /* décor : touffes, cailloux, champignons, buissons, souches */
 const tufts=[],peb=[],mush=[],bush=[];deco.forEach(([x,z])=>{const h=hsh(x,z,3);if(h<.3)tufts.push([x,z]);else if(h<.36)peb.push([x,z]);else if(h<.39)mush.push([x,z]);else if(h<.42&&!m.T[z+1]?.[x]?.match(/[#c]/))bush.push([x,z])});
 if(tufts.length){const im=new THREE.InstancedMesh(new THREE.ConeGeometry(.05,.22,3),tmat('#3f8a30'),tufts.length*3);let k=0;tufts.forEach(([x,z])=>{for(let j=0;j<3;j++){dm.position.set(ox+x-.3+hsh(x,z,j+5)*.6,.2,oz+z-.3+hsh(z,x,j+7)*.6);dm.rotation.set(0,j,(j-1)*.25);dm.updateMatrix();im.setMatrixAt(k++,dm.matrix)}});dm.rotation.set(0,0,0);g.add(im)}
 peb.forEach(([x,z])=>tp(g,DOD,'#9a958e',ox+x-.25+hsh(x,z,8)*.5,.14,oz+z-.25+hsh(x,z,9)*.5,.09,.06,.08,{th:.015,r:[x,z,0]}));
 mush.forEach(([x,z])=>{const px=ox+x-.2+hsh(x,z,4)*.4,pz=oz+z-.2+hsh(x,z,6)*.4;tp(g,CYL,'#f3ead8',px,.17,pz,.035,.12,.035,{th:.01});tp(g,HEMI,'#d8232a',px,.22,pz,.11,.08,.11,{th:.015});tp(g,SPH,'#ffffff',px+.04,.27,pz+.03,.018,.012,.018,{ol:false})});
 bush.forEach(([x,z])=>{const px=ox+x,pz=oz+z;for(let j=0;j<3;j++)tp(g,SPH,j%2?'#3f8f35':'#4a9e3c',px+(j-1)*.22,.25+(j%2)*.08,pz-.05,.24,.2,.22,{th:.025});setSolid(m,x,z)});
 if(water.length){const wm=new THREE.MeshToonMaterial({color:'#4aa3e0',gradientMap:GRAD,transparent:true,opacity:.88,emissive:'#2a6aa0',emissiveIntensity:.25});
  const wi=new THREE.InstancedMesh(new THREE.PlaneGeometry(1,1).rotateX(-PI/2),wm,water.length);water.forEach(([x,z],k)=>{dm.position.set(ox+x,-.05,oz+z);dm.updateMatrix();wi.setMatrixAt(k,dm.matrix)});g.add(wi);
  m.anim.push(t=>wm.emissiveIntensity=.22+Math.sin(t*1.6)*.06);
  const N=Math.min(60,water.length*2),sp=new THREE.BufferGeometry(),A=new Float32Array(N*3),base=[];for(let k=0;k<N;k++){const w=water[(rnd()*water.length)|0];base.push([ox+w[0]-.4+rnd()*.8,oz+w[1]-.4+rnd()*.8,rnd()*6])}
  sp.setAttribute('position',new THREE.BufferAttribute(A,3));g.add(new THREE.Points(sp,new THREE.PointsMaterial({color:'#ffffff',size:.09,transparent:true,opacity:.8})));
  m.anim.push(t=>{base.forEach((b,k)=>{A[k*3]=b[0];A[k*3+1]=Math.sin(t*2+b[2])>0?0:-5;A[k*3+2]=b[1]+((t*.3+b[2])%1)*.3});sp.attributes.position.needsUpdate=true})}
 if(trees.length){const isPine=([x,z])=>hsh(Math.floor(x),Math.floor(z),11)<.38;const RT=trees.filter(t=>!isPine(t)),PT=trees.filter(isPine);
  const tr=new THREE.InstancedMesh(new THREE.CylinderGeometry(.12,.16,.7,6),tmat('#7a5230'),trees.length);tr.castShadow=true;g.add(tr);trees.forEach(([x,z],k)=>{const s=.85+hsh(x,z,2)*.35;dm.scale.set(s,s,s);dm.position.set(ox+x,.45,oz+z);dm.updateMatrix();tr.setMatrixAt(k,dm.matrix)});
  const mk=(list,geos,ys)=>{if(!list.length)return;geos.forEach((geo,gi)=>{const im=new THREE.InstancedMesh(geo,new THREE.MeshToonMaterial({gradientMap:GRAD}),list.length),ol=new THREE.InstancedMesh(geo,OUTM,list.length);im.castShadow=true;im.receiveShadow=true;
   list.forEach(([x,z],k)=>{const s=.85+hsh(x,z,2)*.35;dm.scale.set(s,s,s);dm.position.set(ox+x,.1+ys[gi]*s,oz+z);dm.updateMatrix();im.setMatrixAt(k,dm.matrix);dm.scale.multiplyScalar(1.08);dm.updateMatrix();ol.setMatrixAt(k,dm.matrix);
    col.set(geos.length===3?['#2f7a3a','#348a40','#3d9a48'][gi]:(hsh(x,z,5)<.5?'#3f9a3a':'#58b04a'));if(gi&&geos.length<3)col.offsetHSL(0,0,.07);if(hsh(x,z,6)<.12&&geos.length<3)col.set(gi?'#e0a040':'#d08a2a');im.setColorAt(k,col)});im.instanceColor.needsUpdate=true;g.add(im);g.add(ol)})};
  mk(RT,[new THREE.SphereGeometry(.52,10,8),new THREE.SphereGeometry(.38,10,8)],[1.0,1.55]);mk(PT,[new THREE.ConeGeometry(.55,.8,8),new THREE.ConeGeometry(.42,.7,8),new THREE.ConeGeometry(.3,.6,8)],[.95,1.4,1.8]);dm.scale.set(1,1,1)}
 if(flowers.length){const fl=new THREE.InstancedMesh(new THREE.SphereGeometry(.07,6,5),new THREE.MeshToonMaterial({gradientMap:GRAD}),flowers.length*5);let fk=0;const fc=['#d8232a','#f6c80f','#ffffff','#ff8ac2','#1b1b1f'];
  flowers.forEach(([x,z])=>{for(let j=0;j<5;j++){dm.position.set(ox+x-.3+((j*37+x)%7)/10,.18,oz+z-.3+((j*53+z)%7)/10);dm.updateMatrix();fl.setMatrixAt(fk,dm.matrix);col.set(fc[(j+x+z)%5]);fl.setColorAt(fk,col);fk++}});fl.instanceColor.needsUpdate=true;g.add(fl)}
 if(grass.length){const n=grass.length*7,gi=new THREE.InstancedMesh(new THREE.ConeGeometry(.09,.55,4),new THREE.MeshToonMaterial({gradientMap:GRAD}),n);let k=0;
  grass.forEach(([x,z])=>{for(let j=0;j<7;j++){const a=j*2.4+x,r=j?.3:0;dm.position.set(ox+x+Math.cos(a)*r,.35,oz+z+Math.sin(a)*r);dm.rotation.set(Math.sin(a)*.15,a,Math.cos(a)*.15);dm.updateMatrix();gi.setMatrixAt(k,dm.matrix);col.set(j%2?'#3e8a2e':'#4b9e36');gi.setColorAt(k,col);k++}});
  dm.rotation.set(0,0,0);gi.instanceColor.needsUpdate=true;gi.castShadow=true;g.add(gi)}}
const sg=(mm,x,z,txt,big)=>{signPost(mm.group,mm,x,z,big);mm.signs[x+','+z]=txt};
function item(m,x,z,id,n,flag){const s=new THREE.Group();s.position.set(m.ox+x,.35,m.oz+z);m.group.add(s);
 if(id==='lumisphere'){s.add(lumiBall(.16))}
 else if(id==='speculoos'){tp(s,BOXG,'#c07a3a',0,0,0,.34,.06,.24,{r:[.4,0,0]})}else{tp(s,CYL,id==='sirop'?'#5a2e16':'#3a1a3a',0,0,0,.13,.26,.13);tp(s,CYL,id==='sirop'?'#ffffff':'#f6c80f',0,.16,0,.14,.07,.14)}
 m.anim.push(t=>{s.rotation.y=t*1.5;s.position.y=.35+Math.sin(t*3+x)*.05});m.items[x+','+z]={id,n,flag,s};setSolid(m,x,z)}

 const centreRoom=(id,X,exitFn,nurseN,healId)=>{const m=room(id,9,7,X,'K','#4a2a44',exitFn),g=m.group;m.song='hope';m.nurseN=nurseN;m.healId=healId;box(g,4.6,.9,.8,X+4,.55,2,'#d8232a',{ol:.03});box(g,4.8,.1,1,X+4,1.02,2,'#ffffff',{ol:.02});solidRect(m,2,2,5,1);
  plane(g,3,.6,X+4,2.1,.42,labelTex('MAISON DES LUMONS','#ffffff','#d8232a',768,128,48));tp(g,SPH,'#4c9e3e',X+1,.7,1,.35,.4,.35);add(g,new THREE.CylinderGeometry(.22,.18,.35,10),'#b9563c',X+1,.27,1,{ol:.02});setSolid(m,1,1);
  const mg=new THREE.Group();mg.position.set(X+5.6,1.07,2.05);g.add(mg);box(mg,1.05,.1,.62,0,.05,0,'#2a2440',{ol:.02});box(mg,.95,.3,.08,0,.2,-.27,'#3a3456',{ol:.02});
  const glow=new THREE.Mesh(new THREE.PlaneGeometry(.9,.5),new THREE.MeshBasicMaterial({color:'#7fffd0',transparent:true,opacity:.15,depthWrite:false,blending:THREE.AdditiveBlending}));glow.rotation.x=-PI/2;glow.position.y=.11;mg.add(glow);
  const ring=tp(mg,TOR,'#3ef0ff',0,.36,-.22,.09,.09,.09,{ol:false,emi:'#3ef0ff'});const slots=[];for(let r=0;r<2;r++)for(let c=0;c<3;c++){const x=-.3+c*.3,z=-.1+r*.22;tp(mg,TOR,'#c9ccd4',x,.11,z,.075,.075,.075,{r:[PI/2,0,0],ol:false});slots.push([x,.17,z])}m.mach={g:mg,slots,glow,ring};
  npc(m,'nurse',4,1,'down',nurseHeal);for(let x=2;x<=6;x++)m.signs[x+',2']=nurseHeal;return m};
 const wildNight=base=>z=>{let t=base(z).map(e=>e.slice());if(ENV.night){t=t.filter(e=>e[0]!=='pigeolet');t.push(['scorion',t[0][1],t[0][2]+1,25])}else t=t.filter(e=>e[0]!=='scorion');return t};
 const treesRim=(T,W,H,open)=>{for(let z=0;z<H;z++)for(let x=0;x<W;x++)if((x===0||x===W-1||z===0||z===H-1)&&!open(x,z))T[z][x]='T'};
