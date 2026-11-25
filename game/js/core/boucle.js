/* ================= LOOP ================= */
let last=performance.now();
function loop(t){try{loopB(t)}catch(e){console.error('loop',e);try{renderer.render(scene,camera)}catch(e2){}}requestAnimationFrame(loop);fadeGuard()}
let fgT=0;function fadeGuard(){const fd=$('fade');if(!fd||!player||busy||$('title').classList.contains('show')||$('narr').classList.contains('show')){fgT=0;return}if(+fd.style.opacity>=.99){if(!fgT)fgT=performance.now();else if(performance.now()-fgT>2500){fd.style.opacity=0;fgT=0;if(galModel||GAL.group.visible)closeView();console.warn('fadeGuard: écran noir débloqué')}}else fgT=0}
function loopB(t){const dt=Math.min(.05,(t-last)/1000);last=t;const ts=t/1000;
 if(player&&cur){
  if(!busy&&!player.moving&&!B){const v=inputVec();
   if(v){let vx=v[0],vz=v[1];const L=Math.hypot(vx,vz)||1;vx/=L;vz/=L;const run=v[2]>=.98;player.running=run;const sp=(run?6:3.6*Math.min(1,v[2]/.9))*(riding?1.6:1)*dt;player.yawOv=Math.atan2(vx,vz);player.dir=Math.abs(vx)>Math.abs(vz)?(vx>0?'right':'left'):(vz>0?'down':'up');player.walking=true;player.wspd=run?1.75:.6+v[2]*.5;
    const tx=Math.round(player.px),tz=Math.round(player.pz);
    if(vz>.7&&cur.T&&cur.T[tz+1]&&cur.T[tz+1][tx]==='L'&&walkable(cur,tx,tz+2)&&player.pz-tz>.12){player.walking=false;sfx(500,.12,'triangle');player.step(tx,tz+2,3,true).then(()=>{TRAIL.length=0;if(!busy)onStepped()})}
    else{const nx=player.px+vx*sp,nz=player.pz+vz*sp;if(!blockedAt(nx,player.pz))player.px=nx;if(!blockedAt(player.px,nz))player.pz=nz;
     const ddx=Math.abs(vx)>Math.abs(vz)?Math.sign(vx):0,ddz=ddx?0:Math.sign(vz),dk=(tx+ddx)+','+(tz+ddz);
     if(cur.doors[dk]&&(ddx?(player.px-tx)*ddx>.14:(player.pz-tz)*ddz>.14)){player.walking=false;player.face(ddx?(ddx>0?'right':'left'):(ddz>0?'down':'up'));runScript(cur.doors[dk])}
     player.place();trailPush();const nt=[Math.round(player.px),Math.round(player.pz)];if(nt[0]!==player.x||nt[1]!==player.z){player.x=nt[0];player.z=nt[1];onStepped()}}}
   else{player.walking=false;player.running=false}}
  if(follower&&follower.map===cur&&!follower.moving){let d=0,tgt=null;for(let i=TRAIL.length-1;i>0;i--){d+=Math.hypot(TRAIL[i][0]-TRAIL[i-1][0],TRAIL[i][1]-TRAIL[i-1][1]);if(d>=FOLD()){tgt=TRAIL[i-1];break}}
   if(tgt){const dx=tgt[0]-follower.px,dz=tgt[1]-follower.pz,L=Math.hypot(dx,dz);if(L>.03){const st=Math.min(L,dt*(L>1.4?7:4.2));follower.px+=dx/L*st;follower.pz+=dz/L*st;follower.yawOv=Math.atan2(dx,dz);follower.walking=true;follower.wspd=1}else follower.walking=false;follower.x=Math.round(follower.px);follower.z=Math.round(follower.pz);follower.place()}else follower.walking=false}
  {const P=player.b.P;if(P&&P.body){const tl=player.running&&player.walking?.22:0;P.body.rotation.x+=(tl-P.body.rotation.x)*Math.min(1,dt*10)}if(player.running&&player.walking&&!B){runDustT-=dt;if(runDustT<=0){runDustT=.12;runDust()}}}
  wanderTick(dt);updActBubble(ts);
  TEMPS.forEach(c=>c.update(dt,ts));
  player.update(dt,ts);rideTick(dt,ts);if(follower)follower.update(dt,ts);cur.npcs.forEach(n=>n.update(dt,ts));
  if(camMode==='follow'){const p=player.g.position;camTarget.lerp(new V(p.x,0,p.z),1-Math.pow(.002,dt));camera.position.copy(camTarget).add(OFF);camera.lookAt(camTarget.x,.6,camTarget.z)}
  else if(camMode==='cine'&&CINE){const k=1-Math.pow(CINE.sm,dt);if(CINE.track){const q=CINE.track.g.position;CINE.tp.set(q.x+CINE.off.x,CINE.off.y,q.z+CINE.off.z);CINE.tl.set(q.x,CINE.ly,q.z)}camera.position.lerp(CINE.tp,k);CINE.cl.lerp(CINE.tl,k);camera.lookAt(CINE.cl)}
 }else if(TOWN)TOWN.npcs.forEach(n=>n.update(dt,ts));
 if(camMode!=='battle'&&camera.view&&camera.view.enabled)camera.clearViewOffset();
 if(camMode==='gallery'){camera.position.set(500+Math.sin(ts*.9)*GZ*.25,1.5-GZ*.45,4.4-GZ*1.7);camera.lookAt(500,.75,0);{const w=innerWidth,h=innerHeight,port=h>w;if($('gal').classList.contains('show'))camera.setViewOffset(w,h,port?0:-w*.2,port?h*.24:h*.04,w,h);else if(camera.view&&camera.view.enabled)camera.clearViewOffset()}if(galModel)galModel.g.rotation.y=ts*.7;camTarget.set(500,0,0)}
 if(B){[B.pm,B.fm].forEach(r=>{if(r&&r.g.visible&&r.inner)r.inner.scale.set(1,1+Math.sin(ts*3)*.03,1)})}
 ANIMS.forEach(r=>r.fx(ts));envTick(dt);SKYD.position.set(camera.position.x,-20,camera.position.z);SKYD.rotation.y=ts*.004;SKYD.visible=!(cur&&cur.room)&&camMode!=='gallery';SKYD.material.opacity=ENV.night?.18:.75;
 Object.values(MAPS).forEach(m=>m.group.visible&&m.anim.forEach(f=>f(ts,dt)));
 {const q=28/1024,sx=Math.round(camTarget.x/q)*q,sz=Math.round(camTarget.z/q)*q;sun.position.set(sx-7,15,sz+6);sun.target.position.set(sx,0,sz)}
 let so=null;if(SHK>0&&(camMode==='battle'||camMode==='gallery')){so=new V((rnd()-.5)*SHK,(rnd()-.5)*SHK,0);camera.position.add(so)}renderer.render(scene,camera);if(so)camera.position.sub(so)}
