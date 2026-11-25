/* ---- Mini-jeu ADN de la fusion ----
   Le Fusionneur affiche un brin d'ADN Lumon (A, T, G, C) : on tape les bases COMPLÉMENTAIRES (A↔T, G↔C), dans l'ordre, avant la fin du chrono.
   Résultat : 0 = raté (mutations en pagaille, IV au hasard), 1 = bien (fusion normale), 2 = parfait (forme stable, IV renforcés).
   fuse(a,b,q) utilise ce résultat. */
const ADN_C={A:'T',T:'A',G:'C',C:'G'},ADN_COL={A:'#ff6a7a',T:'#3fe08a',G:'#ffd84a',C:'#3ef0ff'};
function dnaGame(){return new Promise(res=>{let ov=$('dna');if(!ov){ov=document.createElement('div');ov.id='dna';ov.className='ov';document.body.appendChild(ov)}
 const N=8,seq=Array.from({length:N},()=>'ATGC'[(rnd()*4)|0]);let i=0,err=0,t=12,done=false;
 const draw=()=>{ov.innerHTML=`<div class="panel dnap"><div class="dnat">🧬 Séquençage ADN — tape les bases complémentaires</div><div class="dnah">A ↔ T · G ↔ C · ⏱ ${t}s · erreurs : ${err}</div>
  <div class="dnas">${seq.map((b,k)=>`<span class="dnab${k<i?' ok':k===i?' cur':''}" style="--c:${ADN_COL[b]}"><b>${b}</b><i>${k<i?ADN_C[b]:'?'}</i></span>`).join('')}</div>
  <div class="dnak">${'ATGC'.split('').map(b=>`<button class="btn dnk" data-b="${b}" style="--c:${ADN_COL[b]}">${b}</button>`).join('')}</div></div>`;
  ov.querySelectorAll('.dnk').forEach(el=>el.onclick=()=>{if(done)return;if(el.dataset.b===ADN_C[seq[i]]){i++;sfx(660+i*90,.06,'triangle',.1);if(i>=N)end()}else{err++;t=Math.max(0,t-1);sfx(150,.15,'square',.12);el.classList.add('bad');setTimeout(()=>el.classList.remove('bad'),200)}if(!done)draw()})};
 const end=()=>{if(done)return;done=true;clearInterval(iv);const q=i>=N&&err===0?2:i>=N-2&&err<=2?1:0;
  ov.innerHTML=`<div class="panel dnap"><div class="dnat">${['❌ Séquence ratée','✔ Séquence correcte','✦ Séquence PARFAITE'][q]}</div><div class="dnah">${['L\'Éclat part dans tous les sens… La fusion risque d\'être… surprenante.','Le Fusionneur ronronne. Fusion stable.','Le Fusionneur chante ! Forme stable et IV renforcés.'][q]}</div></div>`;
  sfx(q===2?1318:q?988:200,.25,q?'triangle':'sawtooth',.12);setTimeout(()=>{hide('dna');res(q)},1600)};
 const iv=setInterval(()=>{t--;if(t<=0)end();else if(!done)draw()},1000);draw();show('dna')})}
