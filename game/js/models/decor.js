function house(g,m,x0,z0,w,d,wall,roof,doorX){const{ox,oz}=m,cx=ox+x0+(w-1)/2,cz=oz+z0+(d-1)/2,H=1.5,ww=w*.94,dd=d*.94,dx=ox+doorX;
 add(g,new THREE.BoxGeometry(ww,H,dd),wall,cx,.1+H/2,cz,{ol:.04,tex:'brick',rx:ww*1.2,ry:H*1.2});
 const hw=ww/2+.18,sh=new THREE.Shape();sh.moveTo(-hw,0);sh.lineTo(hw,0);sh.lineTo(0,1.15);sh.lineTo(-hw,0);
 const geo=new THREE.ExtrudeGeometry(sh,{depth:dd,bevelEnabled:false});geo.translate(0,0,-dd/2-.06);add(g,geo,roof,cx,.1+H,cz,{ol:.04});
 const fz=cz+dd/2+.04;for(let i=0;i<4;i++)box(g,ww*(1-i*.24),.3,.14,cx,.1+H+.15+i*.28,fz,wall,{ol:.025});
 box(g,.28,.7,.28,cx+w*.22,.1+H+.9,cz-.3,'#5a4a4a',{ol:.025});
 for(let x=x0;x<x0+w;x++){if(x===doorX)continue;box(g,.5,.5,.05,ox+x,1.1,fz-.01,'#ffffff',{cast:false,ol:.02});box(g,.4,.4,.06,ox+x,1.1,fz,'#bfe6ff',{emi:'#fff2b0',cast:false})}
 box(g,.58,.95,.07,dx,.58,fz,'#6b3e26',{cast:false,ol:.02});box(g,.07,.07,.08,dx+.18,.6,fz+.02,'#f6c80f',{cast:false});solidRect(m,x0,z0,w,d);return fz}
function bigBuilding(g,m,x0,z0,w,d,wall,roof,doorX,label,lbg,lfg){const{ox,oz}=m,cx=ox+x0+(w-1)/2,cz=oz+z0+(d-1)/2,H=2.3,ww=w*.95,dd=d*.95,fz=cz+dd/2;
 add(g,new THREE.BoxGeometry(ww,H,dd),wall,cx,.1+H/2,cz,{ol:.045,tex:'stone',rx:ww*.8,ry:H*.8});box(g,ww+.3,.25,dd+.3,cx,.1+H+.12,cz,roof,{ol:.035});box(g,ww+.05,.25,dd+.05,cx,.2,cz,roof,{cast:false});
 for(let x=x0;x<x0+w;x++){if(Math.abs(x-doorX)<1)continue;box(g,.6,.7,.05,ox+x,1.4,fz+.02,'#ffffff',{cast:false,ol:.02});box(g,.5,.6,.06,ox+x,1.4,fz+.03,'#bfe6ff',{emi:'#fff2b0',cast:false})}
 box(g,1,1.35,.08,ox+doorX,.78,fz+.03,'#3d6f9e',{emi:'#2a5a8a',cast:false,ol:.02});
 plane(g,Math.min(ww-.4,4.2),.55,cx,2.0,fz+.07,labelTex(label,lbg,lfg,768,128,label.length>16?44:54));solidRect(m,x0,z0,w,d);return{cx,cz,fz,top:.1+H+.25}}
function labExt(g,m,x0,z0){const{ox,oz}=m,cx=ox+x0+3,cz=oz+z0+1.5;
 add(g,new THREE.BoxGeometry(6.8,2.2,3.8),'#f4f1ea',cx,1.2,cz,{ol:.04});box(g,7.1,.22,4.1,cx,2.4,cz,'#5a6f8a',{ol:.03});box(g,6.85,.22,3.85,cx,.2,cz,'#5a6f8a');
 for(let k=-3;k<=3;k++){if(!k)continue;box(g,.6,.7,.05,cx+k,1.35,cz+1.92,'#ffffff',{cast:false});box(g,.5,.6,.06,cx+k,1.35,cz+1.93,'#bfe6ff',{emi:'#c8f0ff',cast:false})}
 box(g,1,1.3,.08,cx,.75,cz+1.92,'#3d6f9e',{emi:'#2a5a8a',cast:false,ol:.02});plane(g,3,.5,cx,1.85,cz+1.97,labelTex('LABO VERHAEGEN','#2b2b2b','#f6c80f'));
 const atom=new THREE.Group();atom.position.set(cx+1.6,3.3,cz-.3);g.add(atom);
 const aps=[[0,0,0],[.6,.6,.6],[-.6,.6,-.6],[.6,-.6,-.6],[-.6,-.6,.6],[.6,.6,-.6],[-.6,.6,.6],[.6,-.6,.6],[-.6,-.6,-.6]];aps.forEach(p=>tp(atom,SPH,'#dfe7ef',p[0],p[1],p[2],.22,.22,.22));
 const chrome=tmat('#b9c6d4');aps.slice(1).forEach(p=>{const tube=new THREE.Mesh(new THREE.CylinderGeometry(.05,.05,Math.hypot(...p),6),chrome);tube.position.set(p[0]/2,p[1]/2,p[2]/2);tube.lookAt(new V(p[0],p[1],p[2]).add(atom.position));tube.rotateX(PI/2);atom.add(tube)});
 {const st2=new THREE.Mesh(new THREE.CylinderGeometry(.05,.05,1,6),chrome);st2.position.set(-.6,-1.05,-.6);atom.add(st2)}atom.rotation.set(.35,.6,0);m.anim.push(t=>atom.rotation.y=.6+t*.15);solidRect(m,x0,z0,7,4)}
function belfry(g,m,x0,z0){const{ox,oz}=m,cx=ox+x0+.5,cz=oz+z0+.5;
 add(g,new THREE.BoxGeometry(1.8,3.4,1.8),'#a95a3a',cx,1.8,cz,{ol:.04});box(g,1.95,.2,1.95,cx,3.5,cz,'#e7d8b8',{ol:.02});add(g,new THREE.BoxGeometry(1.4,1.3,1.4),'#bf6d48',cx,4.25,cz,{ol:.04});
 const rb=add(g,new THREE.ConeGeometry(1.15,1.7,4),'#3c4656',cx,5.75,cz,{ol:.04});rb.rotation.y=PI/4;add(g,new THREE.SphereGeometry(.12,8,6),'#f6c80f',cx,6.7,cz,{emi:'#f6c80f'});
 const cc=document.createElement('canvas');cc.width=cc.height=128;const c2=cc.getContext('2d');c2.fillStyle='#fffbe8';c2.beginPath();c2.arc(64,64,60,0,7);c2.fill();c2.strokeStyle='#2b2b2b';c2.lineWidth=6;c2.stroke();c2.lineWidth=7;c2.beginPath();c2.moveTo(64,64);c2.lineTo(64,24);c2.moveTo(64,64);c2.lineTo(92,70);c2.stroke();
 const clk=new THREE.Mesh(new THREE.CircleGeometry(.45,24),new THREE.MeshBasicMaterial({map:new THREE.CanvasTexture(cc)}));clk.position.set(cx,4.3,cz+.71);g.add(clk);
 for(let k=0;k<3;k++)box(g,.3,.6,.05,cx-.55+k*.55,2.4,cz+.91,'#3a2a2a',{cast:false});[['#1b1b1f',-.13],['#f6c80f',0],['#d8232a',.13]].forEach(([c,o])=>box(g,.13,.26,.02,cx+o,6.25,cz-.9,c,{cast:false}));solidRect(m,x0,z0,2,2)}
function fountain(g,m,x,z,sp='moulinet'){const{ox,oz}=m,X=ox+x,Z=oz+z;add(g,new THREE.CylinderGeometry(.5,.55,.35,16),'#c9c2b0',X,.28,Z,{ol:.03});add(g,new THREE.CylinderGeometry(.4,.4,.05,16),'#6cc0f0',X,.44,Z,{cast:false});add(g,new THREE.CylinderGeometry(.12,.16,.5,8),'#c9c2b0',X,.7,Z,{ol:.02});
 const st=monModel(sp);st.g.traverse(o=>{if(o.isMesh&&o.material!==OUTM)o.material=tmat('#bdb7a8')});st.g.position.set(X,.95,Z);st.g.scale.setScalar(.9);g.add(st.g);
 const jet=[];for(let k=0;k<10;k++)jet.push(add(g,new THREE.SphereGeometry(.035,5,4),'#bfe9ff',X,1,Z,{cast:false}));m.anim.push(t=>jet.forEach((d,k)=>{const p=((t*.9+k/10)%1);d.position.set(X,1.1+p*.25-p*p*.85,Z+.28+p*.45)}));setSolid(m,x,z)}
function friterie(g,m,x0,z,label){const{ox,oz}=m,fx=ox+x0+.5,fz2=oz+z;add(g,new THREE.BoxGeometry(1.9,1.15,1.1),'#f6c80f',fx,.68,fz2,{ol:.03});box(g,2.1,.12,1.3,fx,1.32,fz2,'#d8232a',{ol:.02});
 box(g,1.5,.5,.06,fx,.95,fz2+.56,'#3a2a20',{cast:false});box(g,1.7,.08,.3,fx,.66,fz2+.68,'#ffffff',{ol:.02});
 for(let k=0;k<6;k++){const a=box(g,.36,.05,.42,fx-.9+k*.36,1.2,fz2+.72,k%2?'#ffffff':'#d8232a',{cast:false});a.rotation.x=.5}
 plane(g,1.9,.42,fx,1.62,fz2+.4,labelTex(label||'FRITERIE CHEZ FERNAND','#d8232a','#ffffff',768,128,50));const cone=add(g,new THREE.ConeGeometry(.22,.5,8),'#ffffff',fx+.8,1.85,fz2,{ol:.02});cone.rotation.x=PI;
 for(let k=0;k<6;k++)box(g,.06,.32,.06,fx+.7+(k%3)*.08,2.15+(k%2)*.05,fz2-.05+(k>2?.08:0),'#f2c14e');solidRect(m,x0,z,2,1)}
function lamp(g,m,x,z){const{ox,oz}=m;add(g,new THREE.CylinderGeometry(.05,.07,1.6,6),'#2b2b2b',ox+x,.9,oz+z);box(g,.22,.28,.22,ox+x,1.8,oz+z,'#fff4c0',{emi:'#ffd24a',ol:.02});setSolid(m,x,z)}
function signPost(g,m,x,z,big){const{ox,oz}=m;add(g,new THREE.CylinderGeometry(.05,.05,big?1.1:.7,6),'#7a5230',ox+x,big?.65:.45,oz+z);box(g,big?.9:.6,big?.5:.36,.06,ox+x,big?1.05:.75,oz+z+.09,'#c89a5a',{ol:.02});setSolid(m,x,z)}
function arch(g,m,x0,x1,z,label){const{ox,oz}=m;for(const x of[x0,x1]){add(g,new THREE.BoxGeometry(.6,3,.6),'#9a8f80',ox+x,1.5,oz+z,{ol:.03});setSolid(m,x,z)}
 const w=x1-x0+.6;add(g,new THREE.BoxGeometry(w,.55,.7),'#8a7f70',ox+(x0+x1)/2,3.1,oz+z,{ol:.03});plane(g,Math.min(w-.6,3.4),.42,ox+(x0+x1)/2,3.1,oz+z+.36,labelTex(label,'#2b2b2b','#f6c80f'));
 [['#1b1b1f',-.3],['#f6c80f',0],['#d8232a',.3]].forEach(([c,o])=>box(g,.28,.5,.03,ox+(x0+x1)/2+o,3.75,oz+z,c,{cast:false}))}
function arrows(m,pts,dir){const{ox,oz}=m,g=m.group,list=[],mt=new THREE.MeshBasicMaterial({color:'#ffd24a',transparent:true,opacity:.9});
 pts.forEach(([x,z])=>{const a=new THREE.Mesh(new THREE.ConeGeometry(.28,.45,3),mt);a.rotation.x=dir==='up'?-PI/2:PI/2;a.position.set(ox+x,.25,oz+z);g.add(a);list.push(a)});
 m.anim.push(t=>{mt.opacity=.5+Math.sin(t*4)*.4;list.forEach(a=>a.position.y=.25+Math.abs(Math.sin(t*3))*.12)});return list}
function terril(g,m,cx,cz,r,h){const{ox,oz}=m;add(g,new THREE.ConeGeometry(r,h,10),'#3d3833',ox+cx,h/2,oz+cz,{ol:.05});tp(g,SPH,'#5fae45',ox+cx,h-.15,oz+cz,r*.18,.15,r*.18);
 for(let z=Math.floor(cz-r*.8);z<=cz+r*.8;z++)for(let x=Math.floor(cx-r*.8);x<=cx+r*.8;x++)if((x-cx)**2+(z-cz)**2<=(r*.8)**2)setSolid(m,x,z)}
function headframe(g,m,x,z){const{ox,oz}=m,X=ox+x+.5,Z=oz+z+.5;for(const[a,b]of[[-.6,-.6],[.6,-.6],[-.6,.6],[.6,.6]]){const l=add(g,new THREE.BoxGeometry(.12,4,.12),'#5a3a2a',X+a*.6,2,Z+b*.6,{ol:.015});l.rotation.z=-a*.12;l.rotation.x=b*.12}
 for(let k=1;k<4;k++)box(g,1.2-k*.15,.08,.08,X,k*1,Z+.4,'#5a3a2a');const w=tp(g,TOR,'#2b2b2b',X,4.2,Z,.55,.55,.55,{th:.02});m.anim.push(t=>w.rotation.z=t*1.2);solidRect(m,x,z,2,2)}
function room(id,W,H,ox,floor,wallC,exitFn,mod){const m=makeMap(id,W,H,ox,0,'town');m.room=1;const T=grid(W,H,floor);if(mod)mod(T);terrain(m,T);const g=m.group,d=(W-1)/2;
 box(g,W+.2,2.8,.9,ox+(W-1)/2,1.4,-.05,wallC,{ol:.03,tex:'plaster',rx:W*.7,ry:2});box(g,.9,1.2,H,ox,.6,(H-1)/2,wallC,{ol:.03,tex:'plaster',rx:H*.7,ry:1});box(g,.9,1.2,H,ox+W-1,.6,(H-1)/2,wallC,{ol:.03,tex:'plaster',rx:H*.7,ry:1});
 box(g,d-.5,.4,.5,ox+(d-.5)/2,.3,H-1,wallC,{ol:.02});box(g,d-.5,.4,.5,ox+W-1-(d-.5)/2,.3,H-1,wallC,{ol:.02});box(g,.9,.04,.7,ox+d,.14,H-1,'#3f6f3a',{cast:false,tex:'carpet'});
 for(let x=0;x<W;x++){setSolid(m,x,0);if(x!==d)setSolid(m,x,H-1)}for(let z=0;z<H;z++){setSolid(m,0,z);setSolid(m,W-1,z)}m.steps[d+','+(H-1)]=exitFn;m.entry=[d,H-2];return m}
