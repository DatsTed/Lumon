/* ================= CHARACTERS ================= */
const YAW={down:0,up:PI,left:-PI/2,right:PI/2};
const GEO_SH=new THREE.CircleGeometry(.34,16);GEO_SH.rotateX(-PI/2);
const MAT_SH=new THREE.MeshBasicMaterial({color:0,transparent:true,opacity:.2,depthWrite:false});
class Char{
 constructor(model,map,x,z,dir='down',sc=1){Object.assign(this,{b:model,g:model.g,map,x,z,px:x,pz:z,dir,moving:false,hidden:false,ph:0,k:1,sc,yaw:YAW[dir],idle:rnd()*6});
  this.sh=new THREE.Mesh(GEO_SH,MAT_SH);map.group.add(this.g);map.group.add(this.sh);this.place()}
 place(px=this.free?this.px:this.x,pz=this.free?this.pz:this.z,bob=0){const{ox,oz}=this.map;this.g.position.set(ox+px,.1+bob,oz+pz);this.sh.position.set(ox+px,.115,oz+pz);this.g.scale.setScalar(this.sc*this.k)}
 face(d){this.dir=d;this.yawOv=null}
 snap(){this.yaw=YAW[this.dir];this.g.rotation.y=this.yaw}
 step(nx,nz,speed=4.6,jump=false){this.fx=this.free?this.px:this.x;this.fz=this.free?this.pz:this.z;this.x=nx;this.z=nz;this.t=0;this.moving=true;this.speed=speed;this.jump=jump;return new Promise(r=>this.done=r)}
 update(dt,ts){const ty=this.yawOv!=null?this.yawOv:YAW[this.dir];let dy=((ty-this.yaw+PI*3)%(PI*2))-PI;this.yaw+=dy*Math.min(1,dt*16);this.g.rotation.y=this.yaw;
  const P=this.b.P,isM=this.b.kind==='m';
  if(this.moving){this.t=Math.min(1,this.t+dt*this.speed);this.ph+=dt*this.speed*PI;const k=this.t;
   this.place(this.fx+(this.x-this.fx)*k,this.fz+(this.z-this.fz)*k,this.jump?Math.sin(k*PI)*.55:isM?Math.abs(Math.sin(k*PI))*.14:0);
   if(P){const s=Math.sin(this.ph);P.legs[0].rotation.x=s*.75;P.legs[1].rotation.x=-s*.75;P.arms[0].rotation.x=-s*.6;P.arms[1].rotation.x=s*.6;P.body.position.y=.42+Math.abs(s)*.03}
   if(this.t>=1){this.moving=false;this.px=this.x;this.pz=this.z;this.place();const d=this.done;this.done=null;d&&d()}}
  else if(this.walking){this.ph+=dt*11*(this.wspd||1);const s=Math.sin(this.ph);if(P){P.legs[0].rotation.x=s*.75;P.legs[1].rotation.x=-s*.75;P.arms[0].rotation.x=-s*.6;P.arms[1].rotation.x=s*.6;P.body.position.y=.42+Math.abs(s)*.03}
   if(isM){this.g.position.y=.1+Math.abs(Math.sin(this.ph*.8))*.12}}
  else{if(P){P.legs.forEach(l=>l.rotation.x*=.8);P.arms.forEach(a=>a.rotation.x*=.8);P.body.position.y=.42+Math.sin(ts*2.2+this.idle)*.008;P.head.rotation.z=Math.sin(ts*.9+this.idle)*.04}
   if(isM)this.b.inner.scale.set(1,1+Math.sin(ts*3+this.idle)*.035,1)}}
 setMap(m,x,z){m.group.add(this.g);m.group.add(this.sh);this.map=m;this.x=x;this.z=z;this.px=x;this.pz=z;this.place()}
 show(v){this.hidden=!v;this.g.visible=v;this.sh.visible=v}
}
let player=null,follower=null,cur=null,busy=true,camMode='free';
const TRAIL=[];function trailPush(){const l=TRAIL[TRAIL.length-1];if(!l||Math.hypot(player.px-l[0],player.pz-l[1])>.07)TRAIL.push([player.px,player.pz]);if(TRAIL.length>80)TRAIL.shift()}
function blockedAt(fx,fz){const r=.26;for(let iz=Math.round(fz-r);iz<=Math.round(fz+r);iz++)for(let ix=Math.round(fx-r);ix<=Math.round(fx+r);ix++){if(walkable(cur,ix,iz))continue;
 const cx=Math.max(ix-.5,Math.min(fx,ix+.5)),cz=Math.max(iz-.5,Math.min(fz,iz+.5));if((fx-cx)**2+(fz-cz)**2<r*r)return true}return false}
const camTarget=new V(12,0,10),camLook=new V(12,0,10);
const DV={up:[0,-1],down:[0,1],left:[-1,0],right:[1,0]};
const NPC={};
function npc(m,key,x,z,dir,talk){const c=new Char(human(CH[key]),m,x,z,dir);c.snap();c.talk=talk;m.npcs.push(c);return c}
function walkable(m,x,z){if(x<0||z<0||x>=m.W||z>=m.H)return false;if(m.solid[z*m.W+x])return false;return !m.npcs.some(n=>!n.hidden&&n.x===x&&n.z===z)}
const dirTo=(a,x,z)=>x>a.x?'right':x<a.x?'left':z>a.z?'down':'up';
async function moveTo(c,pts,speed=4.6){for(const[tx,tz]of pts){while(c.x!==tx||c.z!==tz){const nx=c.x+Math.sign(tx-c.x),nz=nx!==c.x?c.z:c.z+Math.sign(tz-c.z);c.face(dirTo(c,nx,nz));await c.step(nx,nz,speed)}}}
function gotoMap(m,x,z,dir){if(riding&&m.room)toggleRide(false);if(cur&&cur!==m&&cur.trainers)cur.trainers.forEach(t=>t.rematchReady=true);if(cur)cur.group.visible=false;cur=m;m.group.visible=true;player.setMap(m,x,z);player.face(dir);player.snap();
 if(follower){const[dx,dz]=DV[dir];let bx=x-dx,bz=z-dz;if(!walkable(m,bx,bz)){bx=x;bz=z}follower.setMap(m,bx,bz);follower.face(dir);follower.snap()}
 camTarget.set(m.ox+x,0,m.oz+z);setSong(m.song||'town');TRAIL.length=0}
function refreshFollower(){_refreshFollower();if(riding&&follower){follower.g.visible=false;follower.sh.visible=false}}
function _refreshFollower(){const lead=S.party.find(m=>m.hp>0)||S.party[0];if(!lead){if(follower){disposeModel(follower.b);follower.sh.parent&&follower.sh.parent.remove(follower.sh);follower=null}return}
 if(follower&&follower.b.sp===lead.sp&&follower.b.form===lead.form&&!!follower.shiny===!!lead.shiny)return;const m=follower?follower.map:cur,x=follower?follower.x:player.x,z=follower?follower.z:player.z;
 if(follower){disposeModel(follower.b);follower.sh.parent.remove(follower.sh)}const fm=monModel(lead.sp,lead.form);if(lead.shiny)shinyfy(fm);follower=new Char(fm,m,x,z,player.dir,.75*MSCALE[lead.sp]);follower.free=true}
