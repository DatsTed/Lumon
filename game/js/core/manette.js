/* ---- Manette (Gamepad API : Bluetooth / USB, PC et Android) ----
   Monde : stick gauche ou croix = bouger, A = parler/valider, B maintenu = courir,
           Start = menu, Select = carte du monde.
   Menus, dialogues, combats : stick/croix = choisir (navigation spatiale), A = valider, B = retour.
   Le tactile et le clavier restent actifs. */
let padVec=null,padOn=false;
{const DZ=.28,st={btn:[],nav:0,navT:0,el:null,downEl:null};
 const vis=el=>el&&el.getClientRects().length>0&&getComputedStyle(el).visibility!=='hidden'&&!el.disabled&&!el.classList.contains('dis');
 const shown=id=>$(id)&&$(id).classList.contains('show');
 // éléments utilisables dans la couche d'interface active (null = on est dans le monde)
 function cibles(){
  const d=$('dlg');
  if(d&&d.style.display==='block'){const c=[...document.querySelectorAll('#dch button')].filter(vis);return c.length?c:[]}
  const bm=[...document.querySelectorAll('#bMenu button')].filter(vis);if(bm.length)return bm;
  const ovs=[...document.querySelectorAll('.ov.show')].filter(o=>o.id!=='narr');
  if(ovs.length){const o=ovs[ovs.length-1];return [...o.querySelectorAll('button,.prow,.opt,input,select,[data-pad]')].filter(vis)}
  if(shown('narr'))return [];
  return null}
 const centre=el=>{const r=el.getBoundingClientRect();return[r.left+r.width/2,r.top+r.height/2]};
 function focus(el){if(st.el&&st.el!==el)st.el.classList.remove('padf');st.el=el;if(el){el.classList.add('padf');try{el.scrollIntoView({block:'nearest',inline:'nearest'})}catch(e){}}}
 function bouger(L,dx,dy){if(!L.length)return;if(!L.includes(st.el)){focus(L[0]);return}
  const [x0,y0]=centre(st.el);let best=null,bs=1e9;
  for(const el of L){if(el===st.el)continue;const [x,y]=centre(el),vx=x-x0,vy=y-y0,av=vx*dx+vy*dy;if(av<=4)continue;const perp=Math.abs(vx*dy-vy*dx);const sc=av+perp*2.2;if(sc<bs){bs=sc;best=el}}
  if(!best){const i=L.indexOf(st.el),k=(dx+dy)>0?1:-1;best=L[(i+k+L.length)%L.length]}
  focus(best);try{sfx(660,.03,'square',.03)}catch(e){}}
 function activer(el){if(!el)return;if(el.tagName==='INPUT'){el.focus();return}
  if(el.onpointerdown)el.dispatchEvent(new PointerEvent('pointerdown',{bubbles:true,cancelable:true}));else el.click()}
 function retour(L){const d=$('dlg');if(d&&d.style.display==='block'&&!document.querySelector('#dch button')){advance();return}
  if(shown('pick')&&vis($('pBack'))){$('pBack').click();return}
  if(shown('narr')&&vis($('skip'))){$('skip').click();return}
  const r=(L||[]).find(el=>/^(Retour|Fermer|Annuler|Pas encore|Garder|Non)/i.test(el.textContent.trim()));if(r)activer(r)}
 addEventListener('gamepadconnected',()=>{if(!padOn){padOn=true;try{toast('team','Manette connectée')}catch(e){}}});
 function tick(){requestAnimationFrame(tick);const pads=navigator.getGamepads?navigator.getGamepads():[];let g=null;for(const p of pads)if(p&&p.connected){g=p;break}
  if(!g){padVec=null;return}padOn=true;
  const b=i=>!!(g.buttons[i]&&g.buttons[i].pressed),now=performance.now();
  const prs=i=>b(i)&&!st.btn[i];
  let ax=g.axes[0]||0,ay=g.axes[1]||0;if(Math.hypot(ax,ay)<DZ){ax=0;ay=0}
  const dx=(b(15)?1:0)-(b(14)?1:0)||(Math.abs(ax)>.5?Math.sign(ax):0),dy=(b(13)?1:0)-(b(12)?1:0)||(Math.abs(ay)>.5?Math.sign(ay):0);
  const L=cibles();
  if(L===null){ // dans le monde
   if(st.el){st.el.classList.remove('padf');st.el=null}
   if(ax||ay){const m=Math.min(1,Math.hypot(ax,ay));padVec=[ax/m,ay/m,b(1)?1:Math.max(.45,m*.9)]}
   else{const px=(b(15)?1:0)-(b(14)?1:0),pz=(b(13)?1:0)-(b(12)?1:0);padVec=px||pz?[px,pz,b(1)?1:.9]:null}
   if(prs(0))pressA();
   if(prs(9)&&vis($('menuBtn')))$('menuBtn').click();
   if(prs(8)&&!busy&&player&&$('minimap').onclick)$('minimap').onclick();
  }else{ // dans une interface
   padVec=null;
   if(L.length&&!L.includes(st.el))focus(L[0]);
   if(dx||dy){const k=dx+','+dy;if(st.nav!==k){st.nav=k;st.navT=now+330;bouger(L,dx,dy)}else if(now>st.navT){st.navT=now+130;bouger(L,dx,dy)}}else st.nav=0;
   if(prs(0)){if(L.length){st.downEl=st.el;activer(st.el)}else if(shown('narr'))$('narr').dispatchEvent(new PointerEvent('pointerdown',{bubbles:true}));else pressA()}
   if(prs(1))retour(L);
  }
  if(!b(0)&&st.btn[0]&&st.downEl){st.downEl.dispatchEvent(new PointerEvent('pointerup',{bubbles:true}));st.downEl=null}
  for(let i=0;i<g.buttons.length;i++)st.btn[i]=b(i)}
 requestAnimationFrame(tick)}
