async function checkEvos(){for(const m of S.party){const e=SP[m.sp].evo;if(e&&m.lv>=e[0]&&m.hp>0)await evolve(m,e[1])}}
async function evolve(m,to){if(!SP[to]){if(SP[m.sp]&&SP[m.sp].fusion){try{to=evolveFusionSpecies(m.sp)}catch(e){console.error('evo fusion',e);to=null}}else to=null}
 if(!to||!SP[to]){await say('',`${nm(m)} brille un instant… mais rien ne se passe.`);return}
 try{await evolveRun(m,to)}catch(e){console.error('evolve',e);if(SP[to]&&m.sp!==to){m.sp=to;calc(m)}}finally{GZ=0;SHK=0;darkStage(false);try{closeView()}catch(e){}refreshFollower();if(cur&&cur.song)setSong(cur.song);$('fade').style.opacity=0;await sleep(400)}}
async function evolveRun(m,to){const from=m.sp;viewSpecies(from);darkStage(true);GZ=0;$('fade').style.opacity=0;await sleep(300);setSong('evob');await say('',`Quoi ? ${SP[from].n} évolue !`);
 const old=galModel;const nw=monModel(to);nw.g.position.set(500,.1,0);nw.g.scale.setScalar(1.25*mscale(to));GAL.group.add(nw.g);nw.g.visible=false;const C=new V(500,.9,0),G=GAL.group;
 const fx=[],mk=(k,sz)=>{const sp=new THREE.Sprite(new THREE.SpriteMaterial({map:vfxTex(k),transparent:true,depthWrite:false,blending:THREE.AdditiveBlending}));sp.scale.set(sz,sz,1);G.add(sp);fx.push(sp);return sp};
 const pil=new THREE.Mesh(new THREE.CylinderGeometry(.9,1.2,7,24,1,true),new THREE.MeshBasicMaterial({color:'#bff8ff',transparent:true,opacity:0,side:THREE.DoubleSide,depthWrite:false,blending:THREE.AdditiveBlending}));pil.position.set(500,3.4,0);G.add(pil);
 const orb=[];for(let i=0;i<46;i++){const s0=mk(i%3?'spark':'star',.18+rnd()*.22);s0.userData={a:rnd()*PI*2,r:1.2+rnd()*1.6,y:rnd()*2.6,v:1+rnd()*2};orb.push(s0)}
 const glow=mk('spark',.2);glow.position.copy(C);for(let i=0;i<4;i++)sfx(220+i*110,.5,'sine',.08);
 let tt=0;await tween(3600,q=>{tt=q;pil.material.opacity=Math.min(.55,q*.8);orb.forEach((o,i)=>{const u=o.userData,r=u.r*(1-q*.85),a=u.a+q*u.v*9;o.position.set(500+Math.cos(a)*r,u.y*(1-q)+.9*q,Math.sin(a)*r);o.material.opacity=.4+.6*q});
  const fr=2+q*18;const on=Math.sin(q*fr*PI)>0;old.g.visible=on;nw.g.visible=!on;[old.g,nw.g].forEach(g=>g.traverse(o=>{if(o.isMesh&&o.material&&o.material.emissive){o.material.emissiveIntensity=q*2.2;if(!o.userData.evc){o.userData.evc=1;o.material=o.material.clone();o.material.emissive=new THREE.Color('#ffffff')}}}));
  glow.scale.setScalar(.2+q*3.4);glow.material.opacity=q;GZ=ease(q)*.9;SHK=q*q*.035;if(Math.random()<.08)sfx(600+q*900,.05,'triangle',.06)});SHK=0;
 old.g.visible=false;nw.g.visible=true;disposeModel(old);galModel=nw;flashScr('#ffffff',700,1);camShake(500,.22);setSong('evo');fanfare();tween(700,q=>GZ=.9*(1-ease(q)));
 nw.g.traverse(o=>{if(o.isMesh&&o.material&&o.material.emissive&&o.userData.evc)tween(900,q=>o.material.emissiveIntensity=2.2*(1-q))});
 const burst=[];for(let i=0;i<40;i++){const s0=mk(i%2?'star':'spark',.3+rnd()*.3);s0.position.copy(C);const a=rnd()*PI*2,e=rnd()*1.2;s0.userData={d:new V(Math.cos(a)*Math.cos(e),Math.sin(e)+.3,Math.sin(a)*Math.cos(e)).multiplyScalar(2+rnd()*2)};burst.push(s0)}
 await tween(1100,q=>{burst.forEach(b=>{b.position.copy(C).addScaledVector(b.userData.d,q);b.material.opacity=1-q});glow.material.opacity=1-q;pil.material.opacity=.55*(1-q);orb.forEach(o=>o.material.opacity=1-q)});
 fx.forEach(x=>{G.remove(x);x.material.dispose()});G.remove(pil);pil.geometry.dispose();pil.material.dispose();
 m.sp=to;const dh=calc(m);m.hp+=dh;S.dex.seen[to]=S.dex.caught[to]=1;GZ=0;
 {const rays=[];for(let i=0;i<10;i++){const r0=new THREE.Mesh(new THREE.PlaneGeometry(.12,6),new THREE.MeshBasicMaterial({color:i%2?'#ffd84a':'#3ef0ff',transparent:true,opacity:0,side:THREE.DoubleSide,depthWrite:false,blending:THREE.AdditiveBlending}));r0.position.set(500,.9,-.6);r0.rotation.z=i/10*PI;G.add(r0);rays.push(r0)}
  tween(2600,q=>{rays.forEach((r0,i)=>{r0.rotation.z=i/10*PI+q*1.2;r0.material.opacity=Math.sin(q*PI)*.45})}).then(()=>rays.forEach(r0=>{G.remove(r0);r0.geometry.dispose();r0.material.dispose()}))}
 await banner('Félicitations !',`${SP[from].n} a évolué en ${SP[to].n} !`,2600);await say('',`Félicitations ! Ton ${SP[from].n} a évolué en ${SP[to].n} !`);await say(SP[to].n,CRY[to]);
 for(const[l,id]of SP[to].L)if(l===m.lv&&!m.moves.some(x=>x.id===id))await learn(m,id);await fadeOut()}
