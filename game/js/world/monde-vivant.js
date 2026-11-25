/* ================= MONDE VIVANT ================= */
let runDustT=0;const DUSTM=new THREE.MeshBasicMaterial({color:'#e9e0cc',transparent:true,opacity:.5,depthWrite:false});
function runDust(){const m=new THREE.Mesh(SPH,DUSTM.clone());const p=player.g.position;m.position.set(p.x+(rnd()-.5)*.2,.18,p.z+(rnd()-.5)*.2);m.scale.setScalar(.08);scene.add(m);
 tween(420,q=>{m.scale.setScalar(.08+q*.18);m.position.y=.18+q*.15;m.material.opacity=.45*(1-q)}).then(()=>{scene.remove(m);m.material.dispose()})}
function wand(c){c.wander=1;c.home=[c.x,c.z];c.wt=1+rnd()*4;return c}
function patrolStep(n,dt){if(n.moving)return;n.wt-=dt;if(n.wt>0)return;const[tx,tz]=n.patrol[n.pi];if(n.x===tx&&n.z===tz){n.pi=(n.pi+1)%n.patrol.length;n.wt=.6+rnd()*1.2;n.face(n.x>=8&&tz<=3?'right':tz<=2?'up':'down');return}
 const opts=[];if(n.x!==tx)opts.push([n.x+Math.sign(tx-n.x),n.z]);if(n.z!==tz)opts.push([n.x,n.z+Math.sign(tz-n.z)]);
 for(const[nx,nz]of opts){if(walkable(cur,nx,nz)&&Math.hypot(player.px-nx,player.pz-nz)>1.05&&!(follower&&follower.map===cur&&Math.hypot(follower.px-nx,follower.pz-nz)<1)){n.face(dirTo(n,nx,nz));n.step(nx,nz,5.2);return}}n.wt=.4}
function wanderTick(dt){if(busy||B||!cur||!cur.npcs)return;for(const n of cur.npcs){if(n.patrol&&!n.hidden){patrolStep(n,dt);continue}if(!n.wander||n.hidden||n.moving)continue;n.wt-=dt;if(n.wt>0)continue;n.wt=2.2+rnd()*4.5;
  if(rnd()<.3){n.face(['up','down','left','right'][rnd()*4|0]);continue}
  const ds=['up','down','left','right'].sort(()=>rnd()-.5);for(const d of ds){const[dx,dz]=DV[d],nx=n.x+dx,nz=n.z+dz,k=nx+','+nz;
   if(Math.abs(nx-n.home[0])>(n.wr||2)||Math.abs(nz-n.home[1])>(n.wr||2))continue;if(!walkable(cur,nx,nz)||cur.doors[k]||cur.steps[k]||cur.signs[k]||cur.items[k])continue;
   if(cur.T&&cur.T[nz]&&'gL~'.includes(cur.T[nz][nx]))continue;if(Math.hypot(player.px-nx,player.pz-nz)<1.3||Math.hypot(player.px-n.x,player.pz-n.z)<1.1)continue;
   if(follower&&follower.map===cur&&Math.hypot(follower.px-nx,follower.pz-nz)<1.1)continue;n.face(d);n.step(nx,nz,2.3);break}}}
let ACTB=null;function actTex(){const c=document.createElement('canvas');c.width=c.height=128;const x=c.getContext('2d');x.translate(64,58);
 x.fillStyle='rgba(18,14,30,.55)';x.strokeStyle='rgba(62,240,255,.9)';x.lineWidth=6;x.shadowColor='#3ef0ff';x.shadowBlur=14;x.beginPath();x.arc(0,0,40,0,7);x.fill();x.stroke();
 x.beginPath();x.moveTo(-10,36);x.lineTo(0,56);x.lineTo(10,36);x.fillStyle='rgba(62,240,255,.9)';x.fill();x.shadowBlur=0;x.fillStyle='#fff';[-16,0,16].forEach(d=>{x.beginPath();x.arc(d,0,6,0,7);x.fill()});return new THREE.CanvasTexture(c)}
function actTarget(){if(!player||!cur)return null;const[dx,dz]=DV[player.dir],x=player.x+dx,z=player.z+dz,k=x+','+z;
 const n=cur.npcs.find(n=>!n.hidden&&n.talk&&n.x===x&&n.z===z);if(n)return n.g.position.clone().setY(n.g.position.y+(n.b.kind==='m'?1.35:2.05));
 const it=cur.items[k];if(it&&!F()[it.flag]&&it.s.visible){const v=new V();it.s.getWorldPosition(v);return v.setY(v.y+.75)}
 if(cur.signs[k])return new V(cur.ox+x,1.75,cur.oz+z);return null}
function updActBubble(ts){if(!ACTB){ACTB=new THREE.Sprite(new THREE.SpriteMaterial({map:actTex(),transparent:true,depthTest:false,opacity:0}));ACTB.scale.set(.62,.62,1);ACTB.renderOrder=999;scene.add(ACTB)}
 const t=(!busy&&!B&&!dlgResolve&&camMode==='follow')?actTarget():null;const m=ACTB.material;if(t)tip('talk',"Une bulle apparaît quand tu peux interagir : <b>touche l'écran</b> !");
 if(t){ACTB.position.lerp(t.setY(t.y+Math.sin(ts*3.2)*.06),m.opacity<.05?1:.35);m.opacity=Math.min(.78,m.opacity+.08);const s=.58+Math.sin(ts*3.2)*.03;ACTB.scale.set(s,s,1)}else m.opacity=Math.max(0,m.opacity-.1);ACTB.visible=m.opacity>.01}
