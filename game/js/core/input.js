/* ---- Input ---- */
const held={};let lastDir=null;
const KM={ArrowUp:'up',ArrowDown:'down',ArrowLeft:'left',ArrowRight:'right',w:'up',s:'down',a:'left',d:'right',z:'up',q:'left'};
addEventListener('keydown',e=>{const d=KM[e.key];if(d){held[d]=true;lastDir=d;e.preventDefault()}if(e.key===' '||e.key==='Enter'){e.preventDefault();pressA()}});
addEventListener('keyup',e=>{const d=KM[e.key];if(d)held[d]=false});
document.querySelectorAll('.pb').forEach(b=>{const d=b.dataset.d;const on=e=>{e.preventDefault();held[d]=true;lastDir=d;b.classList.add('on')},off=()=>{held[d]=false;b.classList.remove('on')};
 b.addEventListener('pointerdown',on);b.addEventListener('pointerup',off);b.addEventListener('pointerleave',off);b.addEventListener('pointercancel',off)});
let joyVec=null;{const zone=$('joyzone'),joy=$('joy'),knob=$('knob');let jid=null,jc=null,t0=0,moved=0;
 window.resetJoy=()=>{joyVec=null;knob.style.transform='translate(-50%,-50%)';joy.classList.remove('on','float');joy.style.left='';joy.style.top=''};
 const jmove=e=>{let dx=e.clientX-jc[0],dy=e.clientY-jc[1];const L=Math.hypot(dx,dy),mx=50;moved=Math.max(moved,L);if(L>mx){dx*=mx/L;dy*=mx/L}knob.style.transform=`translate(calc(-50% + ${dx}px),calc(-50% + ${dy}px))`;
  if(L<8){joyVec=null;joy.classList.remove('on');return}joyVec=[dx/Math.min(L,mx),dy/Math.min(L,mx),Math.max(.45,Math.min(1,L/mx))];joy.classList.add('on')};
 zone.addEventListener('pointerdown',e=>{e.preventDefault();jid=e.pointerId;t0=performance.now();moved=0;try{zone.setPointerCapture(jid)}catch(_){}jc=[e.clientX,e.clientY];joy.classList.add('float');joy.style.left=(e.clientX-65)+'px';joy.style.top=(e.clientY-65)+'px'});
 zone.addEventListener('pointermove',e=>{if(e.pointerId===jid)jmove(e)});
 const jend=e=>{if(e.pointerId!==jid)return;jid=null;if(performance.now()-t0<260&&moved<10)pressA();resetJoy()};zone.addEventListener('pointerup',jend);zone.addEventListener('pointercancel',jend)}
{let t0=0,p0=null;const c=$('c');c.addEventListener('pointerdown',e=>{t0=performance.now();p0=[e.clientX,e.clientY]});c.addEventListener('pointerup',e=>{if(p0&&performance.now()-t0<300&&Math.hypot(e.clientX-p0[0],e.clientY-p0[1])<12)pressA();p0=null})}
$('btnA').addEventListener('pointerdown',e=>{e.preventDefault();pressA()});
let kRun=false;addEventListener('keydown',e=>{if(e.key==='Shift')kRun=true});addEventListener('keyup',e=>{if(e.key==='Shift')kRun=false});
function inputVec(){if(joyVec)return joyVec;if(typeof padVec!=='undefined'&&padVec)return padVec;const dx=(held.right?1:0)-(held.left?1:0),dz=(held.down?1:0)-(held.up?1:0);return dx||dz?[dx,dz,kRun?1:.9]:null}
function inputDir(){if(lastDir&&held[lastDir])return lastDir;for(const d in held)if(held[d])return d;return null}
function pressA(){if(dlgResolve){advance();return}if(!busy&&player&&!player.moving)interact()}
async function runScript(fn){busy=true;setCtrl(false);try{await fn()}catch(e){console.error(e)}busy=false;for(const k in held)held[k]=false;window.resetJoy&&resetJoy();setCtrl(true);setObj();saveGame()}
