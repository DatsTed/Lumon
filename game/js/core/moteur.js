/* ================= THREE / TOON ================= */
const renderer=new THREE.WebGLRenderer({canvas:$('c'),antialias:true});
renderer.setPixelRatio(Math.min(devicePixelRatio,2));
renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;
const scene=new THREE.Scene();
scene.background=new THREE.Color('#2a2150');scene.fog=new THREE.Fog('#2a2150',28,66);
const SKYD=(()=>{const c=document.createElement('canvas');c.width=1024;c.height=256;const x=c.getContext('2d');const R=(a,b)=>a+Math.random()*(b-a);x.clearRect(0,0,1024,256);
 for(let i=0;i<70;i++){const cx=R(0,1024),cy=R(40,190),w=R(60,180);for(let k=0;k<9;k++){const g=x.createRadialGradient(cx+R(-w/2,w/2),cy+R(-14,14),2,cx,cy,R(26,58));g.addColorStop(0,'rgba(255,255,255,.22)');g.addColorStop(1,'rgba(255,255,255,0)');x.fillStyle=g;x.fillRect(0,0,1024,256)}}
 const t=new THREE.CanvasTexture(c);t.wrapS=THREE.RepeatWrapping;const m=new THREE.Mesh(new THREE.SphereGeometry(150,32,12,0,Math.PI*2,0,Math.PI*.5),new THREE.MeshBasicMaterial({map:t,transparent:true,opacity:.8,side:THREE.BackSide,depthWrite:false,fog:false}));m.renderOrder=-1;return m})();scene.add(SKYD);
const camera=new THREE.PerspectiveCamera(45,1,.1,300);
const OFF=new V(0,6.4,7.6);
scene.add(new THREE.HemisphereLight(0xc4b8ff,0x4a5a40,.72));
const sun=new THREE.DirectionalLight(0xffd2b8,.95);sun.shadow.normalBias=.03;sun.castShadow=true;sun.shadow.mapSize.set(1024,1024);sun.shadow.bias=-.0008;
Object.assign(sun.shadow.camera,{left:-14,right:14,top:14,bottom:-14,near:1,far:45});scene.add(sun);scene.add(sun.target);
function resize(){const w=innerWidth,h=innerHeight;renderer.setSize(w,h,false);camera.aspect=w/h;camera.fov=h>w?58:42;camera.updateProjectionMatrix()}
addEventListener('resize',resize);resize();
const GRAD=new THREE.DataTexture(new Uint8Array([110,190,255]),3,1,THREE.LuminanceFormat);GRAD.minFilter=GRAD.magFilter=THREE.NearestFilter;GRAD.needsUpdate=true;
const TM={};
function shade(c,l){try{const k=new THREE.Color(c);k.offsetHSL(0,0,l);return '#'+k.getHexString()}catch(e){return c}}
const SURF={};function surfTex(kind,rx=1,ry=1){const key=kind+'|'+rx+'|'+ry;if(SURF[key])return SURF[key];let base=SURF['_'+kind];
 if(!base){const c=document.createElement('canvas');c.width=c.height=128;const x=c.getContext('2d');const R=(a,b)=>a+Math.random()*(b-a);
  if(kind==='grain'){x.fillStyle='#ececec';x.fillRect(0,0,128,128);for(let i=0;i<2200;i++){const v=R(205,255)|0;x.fillStyle=`rgba(${v},${v},${v},.55)`;x.fillRect(R(0,128),R(0,128),1.5,1.5)}for(let i=0;i<14;i++){x.fillStyle='rgba(120,120,120,.06)';x.beginPath();x.arc(R(0,128),R(0,128),R(8,26),0,7);x.fill()}}
  else if(kind==='brick'){x.fillStyle='#b8b0a8';x.fillRect(0,0,128,128);for(let r=0;r<8;r++)for(let k=0;k<5;k++){const ox=(r%2)*16,v=R(200,250)|0;x.fillStyle=`rgb(${v},${v-8},${v-14})`;x.fillRect(k*32+ox-15,r*16+1.5,29,13);for(let n=0;n<6;n++){x.fillStyle='rgba(90,80,70,.15)';x.fillRect(k*32+ox-15+R(0,27),r*16+R(2,13),2,2)}}}
  else if(kind==='plaster'){x.fillStyle='#e6e2dc';x.fillRect(0,0,128,128);for(let i=0;i<900;i++){const v=R(200,250)|0;x.fillStyle=`rgba(${v},${v},${v-4},.6)`;x.fillRect(R(0,128),R(0,128),R(1,3),R(1,3))}for(let i=0;i<5;i++){x.strokeStyle='rgba(100,95,90,.18)';x.lineWidth=1;x.beginPath();let px=R(0,128),py=R(0,128);x.moveTo(px,py);for(let k=0;k<5;k++){px+=R(-10,10);py+=R(-10,10);x.lineTo(px,py)}x.stroke()}
   for(let i=0;i<4;i++){x.fillStyle='rgba(60,50,60,.08)';x.fillRect(R(0,110),R(60,128),R(10,30),R(20,60))}}
  else if(kind==='stone'){x.fillStyle='#a8a49e';x.fillRect(0,0,128,128);for(let r=0;r<4;r++)for(let k=0;k<3;k++){const ox=(r%2)*21,v=R(195,245)|0;x.fillStyle=`rgb(${v},${v-3},${v-6})`;x.fillRect(k*43+ox-20,r*32+2,40,29)}for(let i=0;i<500;i++){const v=R(150,230)|0;x.fillStyle=`rgba(${v},${v},${v},.35)`;x.fillRect(R(0,128),R(0,128),1.5,1.5)}}
  else if(kind==='carpet'){x.fillStyle='#d8d8d8';x.fillRect(0,0,128,128);x.strokeStyle='rgba(255,255,255,.55)';x.lineWidth=3;x.strokeRect(8,8,112,112);x.strokeStyle='rgba(60,60,60,.35)';x.lineWidth=2;x.strokeRect(16,16,96,96);for(let i=0;i<4;i++){x.save();x.translate(64,64);x.rotate(i*Math.PI/2);x.fillStyle='rgba(60,60,60,.3)';x.beginPath();x.moveTo(0,-30);x.lineTo(12,-12);x.lineTo(0,0);x.lineTo(-12,-12);x.fill();x.restore()}for(let i=0;i<1500;i++){const v=R(170,255)|0;x.fillStyle=`rgba(${v},${v},${v},.35)`;x.fillRect(R(0,128),R(0,128),1,1)}}
  else if(kind==='metal'){const g=x.createLinearGradient(0,0,128,0);g.addColorStop(0,'#d8d8dc');g.addColorStop(.5,'#f4f4f6');g.addColorStop(1,'#cfcfd4');x.fillStyle=g;x.fillRect(0,0,128,128);for(let i=0;i<120;i++){x.fillStyle='rgba(120,120,130,.12)';x.fillRect(0,R(0,128),128,1)}}
  base=SURF['_'+kind]=new THREE.CanvasTexture(c);base.wrapS=base.wrapT=THREE.RepeatWrapping}
 if(rx===1&&ry===1)return base;const t=base.clone();t.needsUpdate=true;t.repeat.set(rx,ry);return SURF[key]=t}
function tmat(c,o={}){const tx=o.tex||(o.emi||o.op?null:'grain'),k=c+'|'+(o.emi||'')+'|'+(o.op||'')+'|'+(o.tex?o.tex+o.rx+o.ry:tx||'');if(TM[k])return TM[k];
 const m=new THREE.MeshToonMaterial({color:c,gradientMap:GRAD,emissive:o.emi||0,emissiveIntensity:o.emi?.7:0,transparent:!!o.op,opacity:o.op||1});if(tx)m.map=surfTex(tx,o.tex?Math.max(1,Math.round(o.rx||1)):1,o.tex?Math.max(1,Math.round(o.ry||1)):1);return TM[k]=m}
const OUTM=new THREE.MeshBasicMaterial({color:'#1d1626',side:THREE.BackSide});
const SPH=new THREE.SphereGeometry(1,20,14),HEMI=new THREE.SphereGeometry(1,20,10,0,PI*2,0,PI/2),CYL=new THREE.CylinderGeometry(1,1,1,14),
 CONE=new THREE.ConeGeometry(1,1,12),BOXG=new THREE.BoxGeometry(1,1,1),TOR=new THREE.TorusGeometry(1,.2,8,20),DOD=new THREE.DodecahedronGeometry(1);
function tp(par,geo,c,x,y,z,sx=1,sy=1,sz=1,o={}){const m=new THREE.Mesh(geo,o.m||tmat(c,o));m.position.set(x,y,z);m.scale.set(sx,sy,sz);if(o.r)m.rotation.set(o.r[0],o.r[1],o.r[2]);m.castShadow=true;par.add(m);
 if(o.ol!==false){const th=o.th||.025,ol=new THREE.Mesh(geo,OUTM);ol.scale.set(1+th/sx,1+th/sy,1+th/sz);m.add(ol)}return m}
function olMesh(m,th=.035){const g=m.geometry;g.computeBoundingBox();const s=new V();g.boundingBox.getSize(s);const ctr=new V();g.boundingBox.getCenter(ctr);const o=new THREE.Mesh(g,OUTM);o.scale.set((s.x+2*th)/s.x,(s.y+2*th)/s.y,(s.z+2*th)/Math.max(s.z,.001));o.position.copy(ctr).multiply(new V(1-o.scale.x,1-o.scale.y,1-o.scale.z));m.add(o);return m}
function add(g,geo,c,x,y,z,o={}){const m=new THREE.Mesh(geo,o.m||tmat(c,o));m.position.set(x,y,z);m.castShadow=o.cast!==false;m.receiveShadow=true;g.add(m);if(o.ol)olMesh(m,o.ol===true?.035:o.ol);return m}
function box(g,w,h,d,x,y,z,c,o){return add(g,new THREE.BoxGeometry(w,h,d),c,x,y,z,o)}
function labelTex(text,bg,fg,w=512,h=128,size=54){const neon=/^#?f{3,6}$/i.test(fg.replace('#',''))?bg:fg;const c=document.createElement('canvas');c.width=w;c.height=h;const x=c.getContext('2d');x.fillStyle='#120e1c';x.fillRect(0,0,w,h);
 x.shadowColor=neon;x.shadowBlur=16;x.strokeStyle=neon;x.lineWidth=5;x.strokeRect(10,10,w-20,h-20);x.font=`600 ${size}px Fredoka, sans-serif`;x.textAlign='center';x.textBaseline='middle';
 x.shadowBlur=24;x.fillStyle=neon;x.fillText(text,w/2,h/2+4);x.shadowBlur=6;x.globalAlpha=.75;x.fillStyle='#ffffff';x.fillText(text,w/2,h/2+4);const t=new THREE.CanvasTexture(c);t.anisotropy=4;return t}
function plane(g,w,h,x,y,z,tex){const m=new THREE.Mesh(new THREE.PlaneGeometry(w,h),new THREE.MeshBasicMaterial({map:tex}));m.position.set(x,y,z);g.add(m);return m}
const ANIMS=new Set();
