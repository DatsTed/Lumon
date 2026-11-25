/* ================= CIEL / HEURE / MÉTÉO ================= */
const HEMIL=scene.children.find(o=>o.isHemisphereLight);
const ENV={w:'clair'};
{const N=700,g=new THREE.BufferGeometry(),A=new Float32Array(N*3);for(let i=0;i<N;i++){const u=rnd()*2-1,t=rnd()*PI*2,r=Math.sqrt(1-u*u);A[i*3]=Math.cos(t)*r*140;A[i*3+1]=Math.abs(u)*140+5;A[i*3+2]=Math.sin(t)*r*140}
 g.setAttribute('position',new THREE.BufferAttribute(A,3));ENV.stars=new THREE.Points(g,new THREE.PointsMaterial({color:'#ffffff',size:2.2,sizeAttenuation:false,transparent:true,opacity:0,fog:false,depthWrite:false}));scene.add(ENV.stars);
 ENV.moon=new THREE.Mesh(new THREE.SphereGeometry(5,20,14),new THREE.MeshBasicMaterial({color:'#fff6d0',fog:false,transparent:true}));scene.add(ENV.moon);
 const R=500,rg=new THREE.BufferGeometry(),RA=new Float32Array(R*6);rg.setAttribute('position',new THREE.BufferAttribute(RA,3));ENV.rain=new THREE.LineSegments(rg,new THREE.LineBasicMaterial({color:'#bcd6ff',transparent:true,opacity:.55}));ENV.rain.visible=false;scene.add(ENV.rain);ENV.rainA=RA;ENV.rainP=Array.from({length:R},()=>[rnd()*30-15,rnd()*12,rnd()*30-15])}
const SKY=[[0,'#070a1e',1],[4.5,'#0d1233',1],[6,'#3a2a5a',.6],[7,'#f0957a',.25],[8.5,'#8cc8f2',0],[17,'#8cc8f2',0],[18.8,'#f08a5a',.2],[20,'#5a3070',.55],[21.5,'#141638',.9],[24,'#070a1e',1]];
function skyAt(h){for(let i=0;i<SKY.length-1;i++){const[a,ca,na]=SKY[i],[b,cb,nb]=SKY[i+1];if(h>=a&&h<=b){const t=(h-a)/(b-a);return{col:new THREE.Color(ca).lerp(new THREE.Color(cb),t),night:na+(nb-na)*t}}}return{col:new THREE.Color('#070a1e'),night:1}}
const DAYLEN=2400;function gameT(){if(!S||S.clock==null){const d=new Date();return{h:d.getHours()+d.getMinutes()/60,day:d.getDate()}}return{h:S.clock/60,day:S.day||0}}
setInterval(()=>{if(S&&player&&!document.hidden){if(S.clock==null){const d=new Date();S.clock=d.getHours()*60+d.getMinutes();S.day=0}S.clock+=1440/DAYLEN;if(S.clock>=1440){S.clock-=1440;S.day=(S.day||0)+1}}},1000);
function dayWeather(){const seed=S&&S.clock!=null?(S.day||0)*7+11:(()=>{const d=new Date();return d.getFullYear()*372+d.getMonth()*31+d.getDate()})(),v=Math.abs(Math.sin(seed*12.9898)*43758.5453)%1;return v<.3?'drache':v<.42?'brume':v<.56?'vent':'clair'}
function updateEnv(){const G=gameT(),h=G.h;let{col,night}=skyAt(h);ENV.w=dayWeather();ENV.night=night;
 if(ENV.w==='drache')col.lerp(new THREE.Color('#4a4f5e'),.45*(1-night*.6));if(ENV.w==='brume')col.lerp(new THREE.Color('#8a8aa0'),.35*(1-night*.5));
 scene.background.copy(col);scene.fog.color.copy(col);scene.fog.near=ENV.w==='brume'?8:28;scene.fog.far=ENV.w==='brume'?30:66;
 HEMIL.intensity=.3+.38*(1-night)*(ENV.w==='drache'?.8:1);HEMIL.color.set(night>.5?'#8a90ff':'#d8d0ff');sun.intensity=(.18+.72*(1-night))*(ENV.w==='clair'?1:.6);sun.color.set(night>.5?'#8090ff':(h<9||h>17?'#ffb890':'#fff0d8'));
 ENV.stars.material.opacity=ENV.w==='clair'?night:night*.3;ENV.moon.visible=night>.45&&ENV.w!=='brume';ENV.moon.material.opacity=night;ENV.rain.visible=ENV.w==='drache';
 for(const k in TM){const m=TM[k];if(m.emissive&&k.includes('#ffd24a')||k.includes('#fff2b0')||k.includes('#c8f0ff')||k.includes('#fff3a0'))m.emissiveIntensity=.35+night*3.2}nightApply(night);
 const hh=String(Math.floor(h)).padStart(2,'0')+':'+String(Math.floor((h%1)*60)).padStart(2,'0');$('clock').innerHTML=`<b>${hh}</b><br>${{clair:night>.5?'☾ Nuit claire':'☀ Beau temps',drache:'☂ Il drache',brume:'≋ Brume',vent:'🌬 Ça souffle'}[ENV.w]}`}
updateEnv();setInterval(updateEnv,4000);
function envTick(dt){const c=camera.position;ENV.stars.position.set(c.x,0,c.z);ENV.moon.position.set(c.x-50,75,c.z-100);
 if(ENV.rain.visible){const A=ENV.rainA;ENV.rainP.forEach((p,i)=>{p[1]-=dt*22;if(p[1]<0){p[1]=12;p[0]=rnd()*30-15;p[2]=rnd()*30-15}const x=camTarget.x+p[0],z=camTarget.z+p[2];A[i*6]=x;A[i*6+1]=p[1];A[i*6+2]=z;A[i*6+3]=x+.05;A[i*6+4]=p[1]+.5;A[i*6+5]=z});ENV.rain.geometry.attributes.position.needsUpdate=true}
 const cl=$('clock');cl.style.display=$('minimap').style.display}
