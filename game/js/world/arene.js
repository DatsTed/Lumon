function buildArene(){
 /* ---- Battle arena & gallery ---- */
 {const A=ARENA=makeMap('arena',1,1,300,0,'battle'),ag=A.group;{const gt=groundTex('grass').clone();gt.needsUpdate=true;gt.repeat.set(14,14);const gm=new THREE.Mesh(new THREE.CylinderGeometry(14,14,.2,48),new THREE.MeshToonMaterial({color:'#72b852',map:gt,gradientMap:GRAD}));gm.position.set(300,0,0);gm.receiveShadow=true;ag.add(gm);A.ground=gm}
  A.p1=new V(298.6,.15,1.6);A.p2=new V(301.8,.15,-1.6);
  {const dt=groundTex('dirt').clone();dt.needsUpdate=true;dt.repeat.set(5,3);const dp=new THREE.Mesh(new THREE.CircleGeometry(1,40),new THREE.MeshToonMaterial({color:'#c9a878',map:dt,gradientMap:GRAD,transparent:true,opacity:.92}));dp.rotation.x=-PI/2;dp.scale.set(6.5,3.6,1);dp.position.set(300.4,.105,.4);dp.receiveShadow=true;ag.add(dp)}
  for(let k=0;k<14;k++){const x=287+k*2,z=-9.5-hsh(k,3)*1.5,h=1.4+hsh(k,4)*1.2;add(ag,new THREE.BoxGeometry(2.3,h,1.6),hsh(k,5)<.5?'#9a7a5a':'#8a6c50',x,h/2,z,{ol:.04});tp(ag,SPH,'#5fae45',x,h+.05,z,1.25,.22,.85,{th:.03})}
  for(let k=0;k<16;k++){const x=287+k*1.8+hsh(k,6),z=-11.5-hsh(k,7)*2;tp(ag,CONE,'#2f6a4a',x,2.6,z,.9,2.6,.9,{th:.04});tp(ag,CONE,'#3a7f58',x,4,z,.65,2,.65,{th:.04})}
  A.plats=[A.p1,A.p2].map(p=>[add(ag,new THREE.CylinderGeometry(1.15,1.25,.14,28),'#a89470',p.x,.1,p.z,{ol:.03}),add(ag,new THREE.CylinderGeometry(.95,.95,.02,28),'#94805e',p.x,.18,p.z,{cast:false})]);
  for(let k=0;k<34;k++){const a=k/34*PI*2+hsh(k,1)*.2,r=9+hsh(k,2)*3.5;const x=300+Math.cos(a)*r,z=Math.sin(a)*r;add(ag,new THREE.CylinderGeometry(.15,.2,.9,6),'#7a5230',x,.5,z);
   if(hsh(k,3)<.4){tp(ag,CONE,'#2f7a3a',x,1.3,z,.8,1.2,.8,{th:.04});tp(ag,CONE,'#3d9a48',x,2,z,.55,1,.55,{th:.04})}else tp(ag,SPH,hsh(k,4)<.15?'#e0a040':k%2?'#3f9a3a':'#58b04a',x,1.5,z,.75+hsh(k,5)*.3,.85,.75,{th:.04})}
  for(let k=0;k<16;k++){const a=hsh(k,7)*PI*2,r=4.5+hsh(k,8)*4,x=300+Math.cos(a)*r,z=Math.sin(a)*r-1;if(z>1.5||(Math.abs(x-300)<4&&z>-4))continue;const h=hsh(k,9);
   if(h<.35){for(let j=0;j<3;j++)tp(ag,SPH,j%2?'#3f8f35':'#4a9e3c',x+(j-1)*.25,.3,z,.28,.24,.26,{th:.03})}else if(h<.6)tp(ag,DOD,'#9a958e',x,.2,z,.25,.18,.22,{th:.025,r:[k,k,0]});
   else if(h<.8){tp(ag,CYL,'#f3ead8',x,.2,z,.05,.18,.05,{th:.01});tp(ag,HEMI,'#d8232a',x,.28,z,.16,.11,.16,{th:.02})}else{for(let j=0;j<5;j++)tp(ag,SPH,['#d8232a','#f6c80f','#ffffff','#ff8ac2','#1b1b1f'][j],x+(j-2)*.12,.17,z+(j%2)*.1,.06,.06,.06,{ol:false})}}
  for(let k=0;k<5;k++){const x=295+k*2.6;tp(ag,SPH,'#5f9a45',x,-.6,-12-hsh(k,1)*2,3.2,2.2,2,{th:.05})}
  for(let k=0;k<10;k++){const t=new THREE.Group();t.position.set(296+k*1.1,.1,-4.5-(k%2));ag.add(t);for(let j=0;j<5;j++)tp(t,CONE,'#4b9e36',(j-2)*.12,.25,0,.08,.5,.08,{ol:false})}}
 GAL=makeMap('gal',1,1,500,0,'town');{const c=document.createElement('canvas');c.width=64;c.height=256;const x=c.getContext('2d'),gr=x.createLinearGradient(0,0,0,256);gr.addColorStop(0,'#05030a');gr.addColorStop(.45,'#1c0d33');gr.addColorStop(.62,'#3a1452');gr.addColorStop(1,'#050308');x.fillStyle=gr;x.fillRect(0,0,64,256);for(let i=0;i<60;i++){x.fillStyle=`rgba(200,170,255,${Math.random()*.6})`;x.fillRect(Math.random()*64,Math.random()*110,1,1)}
 const D=new THREE.Group();D.visible=false;GAL.group.add(D);GAL.dark=D;const dome=new THREE.Mesh(new THREE.SphereGeometry(11,32,16),new THREE.MeshBasicMaterial({map:new THREE.CanvasTexture(c),side:THREE.BackSide,fog:false,depthWrite:false}));dome.position.set(500,0,0);D.add(dome);
 const fl=new THREE.Mesh(new THREE.CircleGeometry(10,48),new THREE.MeshBasicMaterial({color:'#0a0612'}));fl.rotation.x=-PI/2;fl.position.set(500,.102,0);D.add(fl);
 const rg=new THREE.Mesh(new THREE.RingGeometry(1.35,1.5,64),new THREE.MeshBasicMaterial({color:'#a04ae8',transparent:true,opacity:.8,blending:THREE.AdditiveBlending,depthWrite:false}));rg.rotation.x=-PI/2;rg.position.set(500,.11,0);D.add(rg);GAL.anim.push(t=>{if(D.visible){rg.material.opacity=.55+Math.sin(t*3)*.3;rg.rotation.z=t*.3}})}
add(GAL.group,new THREE.CylinderGeometry(1.4,1.5,.2,32),'#f6c80f',500,0,0,{ol:.03});add(GAL.group,new THREE.CylinderGeometry(6,6,.1,32),'#8fd16a',500,-.1,0);

}
