let CINE=null;
function cineShell(m,on){if(!m||!m.room)return;if(!m.shell&&on){const g=new THREE.Group(),X=m.ox,W=m.W,Hh=m.H,mt=new THREE.MeshToonMaterial({color:'#1c1722',gradientMap:GRAD,map:surfTex('plaster',3,2)}),y=2.85;
 const pl=(w,h,x,yy,z,ry,rx)=>{const q=new THREE.Mesh(new THREE.PlaneGeometry(w,h),mt);q.position.set(x,yy,z);q.rotation.set(rx||0,ry||0,0);g.add(q);return q};
 pl(W,Hh,X+(W-1)/2,y,(Hh-1)/2,0,PI/2);pl(Hh,y,X-.45,y/2,(Hh-1)/2,PI/2);pl(Hh,y,X+W-.55,y/2,(Hh-1)/2,-PI/2);pl(W,y,X+(W-1)/2,y/2,Hh-.45,PI);
 for(let k=0;k<3;k++){const l=new THREE.Mesh(new THREE.PlaneGeometry(W*.7,.12),new THREE.MeshBasicMaterial({color:'#f4f4ff'}));l.rotation.x=PI/2;l.position.set(X+(W-1)/2,y-.02,1+k*2);g.add(l)}m.group.add(g);m.shell=g}if(m.shell)m.shell.visible=!!on}
function cineOn(){cineShell(cur,true);CINE={tp:new V(camera.position.x,camera.position.y,camera.position.z),tl:new V(),cl:new V(),sm:.02,track:null,off:new V(),ly:1};camMode='cine';let lb=$('lbox');if(!lb){lb=document.createElement('div');lb.id='lbox';lb.innerHTML='<i></i><i></i>';document.body.appendChild(lb);
 const st=document.createElement('style');st.textContent='#lbox i{position:fixed;left:0;right:0;height:0;background:#000;z-index:19;transition:height .5s}#lbox i:first-child{top:0}#lbox i:last-child{bottom:0}#lbox.on i{height:10vh}';document.head.appendChild(st)}requestAnimationFrame(()=>lb.classList.add('on'));$('obj').style.display='none'}
function cineOff(){cineShell(cur,false);camMode='follow';CINE=null;const lb=$('lbox');if(lb)lb.classList.remove('on');setObj()}
function camShot(p,l,o={}){CINE.track=null;CINE.tp.set(...p);CINE.tl.set(...l);CINE.sm=o.sm||.02;if(!o.move){camera.position.copy(CINE.tp);CINE.cl.copy(CINE.tl);camera.lookAt(CINE.cl)}if(!o.silent)sfx(1800,.01,'square',.02)}
function track(c,off,ly=1,sm=.03){CINE.track=c;CINE.off.set(...off);CINE.ly=ly;CINE.sm=sm;const q=c.g.position;camera.position.set(q.x+off[0],off[1],q.z+off[2]);CINE.cl.set(q.x,ly,q.z);camera.lookAt(CINE.cl)}
