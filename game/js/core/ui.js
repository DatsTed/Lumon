/* ================= UI ================= */
let dlgResolve=null;const TSPD=()=>[20,32,20,6][OPT.txt]||20;
const fmt=t=>t.replace(/\{P\}/g,S.name).replace(/\{S\}/g,S.party[0]?nm(S.party[0]):'');
function say(name,text,o={}){text=fmt(text);return new Promise(res=>{const d=$('dlg');d.style.display='block';$('dnm').textContent=name;$('dnm').style.display=name?'block':'none';$('dch').innerHTML='';$('dmore').style.display='none';
 const tx=$('dtx');tx.textContent='';let i=0,typing=true,at=null;const iv=setInterval(()=>{i++;tx.textContent=text.slice(0,i);if(!voiceBlip(name,text,i)&&i%3===0)blip();if(i>=text.length){clearInterval(iv);typing=false;$('dmore').style.display='block';if(o.auto)at=setTimeout(()=>dlgResolve&&dlgResolve(true),o.auto*[1,1.4,1,.55][OPT.txt])}},TSPD()*(o.fast?.6:1));
 dlgResolve=(force)=>{if(typing&&!force){clearInterval(iv);typing=false;tx.textContent=text;$('dmore').style.display='block';if(o.auto)at=setTimeout(()=>dlgResolve&&dlgResolve(true),o.auto*[1,1.4,1,.55][OPT.txt]);return false}clearInterval(iv);clearTimeout(at);dlgResolve=null;d.style.display='none';res();return true}})}
const msg=t=>say('',t,{auto:900,fast:true});
function advance(){if(dlgResolve)dlgResolve()}
$('dlg').addEventListener('pointerdown',e=>{e.stopPropagation();advance()});
function choose(name,text,opts){return new Promise(res=>{const d=$('dlg');d.style.display='block';$('dnm').textContent=name;$('dnm').style.display=name?'block':'none';$('dtx').textContent=fmt(text);$('dmore').style.display='none';dlgResolve=null;
 $('dch').innerHTML='';opts.forEach((o,i)=>{const b=document.createElement('button');b.className='btn';b.textContent=o;b.onpointerdown=e=>{e.stopPropagation();d.style.display='none';$('dch').innerHTML='';res(i)};$('dch').appendChild(b)})})}
const show=id=>$(id).classList.add('show'),hide=id=>$(id).classList.remove('show');
const fadeOut=async(c='#000')=>{$('fade').style.background=c;$('fade').style.opacity=1;await sleep(650)},fadeIn=async()=>{$('fade').style.opacity=0;await sleep(650)};
async function banner(t,s,ms=2600){$('bt').textContent=t;$('bs').textContent=s||'';$('banner').classList.add('on');await sleep(ms);$('banner').classList.remove('on')}
function setCtrl(on){$('ctrl').classList.toggle('off',!on);$('menuBtn').style.display=on&&F().chapterDone?'block':'none'}
const dayNum=()=>(S.day||0)+1;
const typH=ts=>ts.map(t=>`<span class="typ" style="background:${TC[t]}">${t}</span>`).join('');
function hpCol(r){return r>.5?'#4cc35a':r>.2?'#f2b33d':'#e04a3a'}
document.addEventListener('pointerdown',e=>{if(e.target.closest&&e.target.closest('.btn,.prow'))sfx(1200,.03,'square',.06)},true);
function pickList(title,items,cancel=true){return new Promise(r=>{$('pTitle').textContent=title;const L=$('pList');L.innerHTML='';
 items.forEach((it,i)=>{const b=document.createElement('button');b.className='prow'+(it.dis?' dis':'');b.style.animationDelay=(i*.04)+'s';b.innerHTML=it.html;b.onclick=()=>{if(it.dis)return;hide('pick');r(i)};L.appendChild(b)});
 $('pBack').style.display=cancel?'inline-block':'none';$('pBack').onclick=()=>{hide('pick');r(-1)};show('pick')})}
let iconR=null;const ICONC={};
function monIcon(sp,form){const key=sp+'|'+(form||'');if(key in ICONC)return ICONC[key];try{if(!iconR){iconR=new THREE.WebGLRenderer({antialias:true,alpha:true,preserveDrawingBuffer:true});iconR.setPixelRatio(1);iconR.setSize(96,96)}
 const sc=new THREE.Scene();sc.add(new THREE.HemisphereLight(0xffffff,0x6a6a8a,.95));const dl=new THREE.DirectionalLight(0xffffff,.7);dl.position.set(2,4,5);sc.add(dl);
 const r=monModel(sp,form);ANIMS.delete(r);sc.add(r.g);r.g.rotation.y=-.45;const bx=new THREE.Box3().setFromObject(r.g),size=bx.getSize(new V()),ctr=bx.getCenter(new V());
 const cam=new THREE.PerspectiveCamera(30,1,.05,60),dist=Math.max(size.x,size.y,size.z)*2.4+.3;cam.position.set(ctr.x+dist*.15,ctr.y+dist*.3,ctr.z+dist);cam.lookAt(ctr);
 iconR.render(sc,cam);const a=iconR.domElement.toDataURL();r.inner.scale.set(1.07,.9,1.07);r.g.position.y=size.y*.1;iconR.render(sc,cam);const b=iconR.domElement.toDataURL();
 return ICONC[key]=(a.length>200?[a,b]:null)}catch(e){return ICONC[key]=null}}
function iconHTML(m){const ic=monIcon(m.sp,m.form);return ic?`<span class="micon"><img src="${ic[0]}" alt=""><img src="${ic[1]}" alt=""></span>`:`<span class="dot" style="background:${TC[typesOf(m)[0]]}"></span>`}
function partyRow(m){ensureGenes(m);const r=m.hp/m.mhp;return `${iconHTML(m)}<span class="grow"><b>${nm(m)}</b>${GSYM(m)}${m.form?' ✦':''} N.${m.lv} ${typH(typesOf(m))}<div class="bar"><i style="width:${r*100}%;background:${hpCol(r)}"></i></div><div class="chips">${chips(m)}</div><small>${m.hp}/${m.mhp} PV · ${m.moves.map(x=>MV[x.id].n).join(', ')}</small></span>`}

function toast(k,t){const el=$('toast');el.innerHTML=ico(k,30)+'<span>'+t+'</span>';el.classList.add('on');clearTimeout(el._t);el._t=setTimeout(()=>el.classList.remove('on'),2200)}
function give(k,n=1){S.bag[k]=(S.bag[k]||0)+n;sfx(988,.1);sfx(1318,.2);toast(k,`+${n} ${ITEMS[k].n}`)}
