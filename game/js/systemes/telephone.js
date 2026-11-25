/* ---- Téléphone : appel vidéo de groupe (« Night White Family 🌙 ») ----
   phoneOn([[nom, cléPersonnage], …]) affiche un smartphone avec une tuile selfie par personne ;
   la tuile de celui qui parle s'allume (say() appelle phoneSpeak). phoneOff() raccroche. */
let PHONE=null;
function phoneOn(list){phoneOff();const el=document.createElement('div');el.id='phone';
 el.innerHTML=`<div class="ph-top">Night White Family 🌙 <span id="phT">00:00</span></div><div class="ph-grid">${list.map(([n,k],i)=>{let img='';try{img=lookPreview(CH[k])}catch(e){}
  return `<div class="ph-tile" data-n="${n}" style="--d:${i*.12}s"><div class="ph-face" style="background-image:url('${img}')"></div><b>${n}</b></div>`}).join('')}</div><div class="ph-bar"><i>🎤</i><i>📷</i><i class="ph-end">📞</i></div>`;
 document.body.appendChild(el);requestAnimationFrame(()=>el.classList.add('on'));const t0=performance.now();
 PHONE={el,iv:setInterval(()=>{const s=((performance.now()-t0)/1000)|0;const t=$('phT');if(t)t.textContent=String(s/60|0).padStart(2,'0')+':'+String(s%60).padStart(2,'0')},500)};window.PHONE=PHONE;
 for(const q of[880,1175])sfx(q,.08,'sine',.08)}
function phoneSpeak(name){if(!PHONE)return;PHONE.el.querySelectorAll('.ph-tile').forEach(t=>t.classList.toggle('talk',!!name&&name.startsWith(t.dataset.n)))}
function phoneOff(){if(!PHONE)return;clearInterval(PHONE.iv);const el=PHONE.el;el.classList.remove('on');setTimeout(()=>el.remove(),400);PHONE=null;window.PHONE=null;sfx(440,.15,'sine',.08)}
