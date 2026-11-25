async function r2Scene(){const f=F();f.r2scene=1;const px=player.x,pz=player.z;
 // les deux bandes face à face au milieu de la route, qui bloquent le passage (Kétos à gauche, Pirates à droite)
 const zz=Math.max(26,pz-5),free=(x,z)=>{for(const[dx,dz]of[[0,0],[0,-1],[0,1],[-1,0],[1,0]])if(walkable(cur,x+dx,z+dz))return[x+dx,z+dz];return[x,z]};
 const spots=[free(px-2,zz),free(px-2,zz+2),free(px+2,zz),free(px+2,zz+2),free(px,zz-3)];
const k1=await tempChar('keto',...spots[0],'right'),k2=await tempChar('keto2',...spots[1],'right'),p1=await tempChar('pirate',...spots[2],'left'),p2=await tempChar('pirate2',...spots[3],'left');const all=[k1,k2,p1,p2];
 player.face('up');player.yawOv=null;await say('',"Un peu plus loin, deux Kétosaures sont avachis au bord de la route, complètement à l'ouest. Ils se passent un petit sachet en ricanant.");
 await say('Sbire Kétosaure',"Hé hé… T'as vu le ciel, frère ? Il est tout… mauve…");
 await say('Pirate Bob',"Hé, les mauves ! Snow nous doit trois mille balles. Où est le fric ?!");await say('Sbire Kétosaure',"Quel fric ? On vous doit rien, bande de clochards ! Votre came, c'était de la farine !");
 await say('Pirate Jerry',"De la FARINE ?! Répète un peu pour voir !");setSong('trainer');
 await r2Fight(all);
 await say('','Les deux bandes se jettent les unes sur les autres. Coups de poing, sacoches qui volent, Lumons qui grognent…');
 setSong(null);for(let i=0;i<6;i++){sfx(i%2?740:960,.28,'square',.1);flashScr(i%2?'#2a5aff':'#ff2a3a',260,.35);await sleep(280)}
 await say('???',"POLICE ! Plus personne ne bouge !");const cop=await tempChar('agent',...spots[4],'up');cop.k=.01;cop.place();await tween(300,q=>{cop.k=q;cop.place()});
 await say('Sbire Kétosaure',"Les flics ! On se casse !");await say('Pirate Bob',"Sauve qui peut, man !");
 all.forEach(c=>{c.face('up');c.walking=true;c.wspd=1.9});
 await Promise.all(all.map((c,i)=>{const x0=c.g.position.x,z0=c.g.position.z,tx=cur.ox+px+(i<2?-.6:.6);return tween(1900,q=>{c.g.position.x=x0+(tx-x0)*Math.min(1,q*2.5);c.g.position.z=z0-q*9;c.sh.position.x=c.g.position.x;c.sh.position.z=c.g.position.z})}));all.forEach(c=>{c.walking=false;killTemp(c)});
 await say('Agent Verhaegen',"Évidemment… Ils filent toujours plus vite que nous. Toi, ça va ? Agent Verhaegen. Oui, comme la Prof : c'est ma grande sœur. Elle m'a parlé de toi, et de ta chienne.");await say('Agent Verhaegen',"Rentre pas dans leurs histoires, petit. Et si tu vois ma sœur, dis-lui que je viens manger dimanche. Elle fait les meilleurs boulets d'Ardenval.");await tween(500,q=>{cop.k=1-q;cop.place()});killTemp(cop);setSong(cur.song);
 await say('',"Te voilà seul sur la route. Par terre, là où se battaient les Kétosaures… une enveloppe épaisse. Pleine de billets.");
 await say('',"De l'argent sale. Tu sais trop bien d'où il vient. Pas question de le dépenser : il faut le rapporter à la police, à Bruxellia.");give('enveloppe');setObj()}
async function talkCop(){const N='Commissaire Lemaire',f=F();
 if(S.bag.enveloppe>0){await say(N,"Une enveloppe des Kétosaures ? Sur la Route 2 ? Montre… Mon Dieu, il y a au moins cinq mille euros là-dedans.");S.bag.enveloppe=0;delete S.bag.enveloppe;f.envDone=1;
  await say(N,"Tu aurais pu la garder. Personne n'en aurait rien su. Tu es honnête, {P}. C'est rare, par ici.");await say(N,"Voici une récompense officielle de la ville de Bruxellia. Et si tu croises encore ces bandes, viens me trouver.");S.money+=50;toast('money','+50 €');unlock('honest');setObj();return}
 await say(N,f.envDone?"Grâce à toi, on suit la piste de l'argent des Kétosaures. Ça mène… très haut. Jusqu'à Snow, peut-être.":"Commissaire Lemaire, police de Bruxellia. Les Kétosaures et les Pirates se font la guerre en ce moment. Si tu vois quelque chose, viens me voir.")}
async function aliasScene(){const f=F(),A='Alias';const a=NPC.alias;f.alias=1;a.face(dirTo(a,player.x,player.z));
 await say('???',"Excuse-moi… Tu es {P} ? Celui qui a battu MC Sambre à Charleroc ?");
 while(Math.abs(a.x-player.x)+Math.abs(a.z-player.z)>1){const nx=a.x+Math.sign(player.x-a.x),nz=nx!==a.x?a.z:a.z+Math.sign(player.z-a.z);if(nx===player.x&&nz===player.z)break;a.face(dirTo(a,nx,nz));await a.step(nx,nz,4.5)}
 a.face(dirTo(a,player.x,player.z));player.face(dirTo(player,a.x,a.z));player.yawOv=null;
 await say(A,"Je m'appelle Alias. Avocat, au Palais de justice. Et… l'ancien meilleur ami de Snow.");
 await say(A,"On a grandi ensemble, lui et moi. Les mêmes rues, les mêmes bêtises. Puis il est allé trop loin. La kétamine, les deals… Moi, j'en pouvais plus. Je suis parti. J'ai repris mes études.");
 await say(A,"Je l'ai laissé dans la galère. Il ne me l'a jamais pardonné. C'est là qu'il a relancé les Kétosaures, avec ses rappeurs.");
 const c=await choose(A,"Il t'a parlé de moi, hein ?",["« Snow n'a rien oublié », il a dit.","Pas vraiment."]);
 if(!c)await say(A,"…« Rien oublié ». Je sais. Moi non plus, je n'ai rien oublié. Ni les bons moments, ni le reste.");
 await say(A,"Moi, il ne m'écoute plus. Mais toi… toi, il te respecte. Tu viens d'où il vient. Si un jour tu peux lui tendre la main, fais-le. Il a encore un bon fond, je le sais.");
 await say(A,"Tiens, prends ça. Et si tu as besoin d'un avocat, tu sais où me trouver.");give('speculoos',2);unlock('alias');setObj()}
async function aliasTalk(){await say('Alias',F().alias?["Snow va mal, {P}. Plus mal qu'il ne le montre. Prends soin de toi, et de lui si tu peux.","Le droit, c'est comme les Lumons : il faut de la patience et du cœur.","Nour, du Night White ? Un type bien. Il m'a déjà fait crédit d'un café à trois heures du matin."][(rnd()*3)|0]:"…")}
async function smileEat(){const N='Jalal';const ks=['durum','frites','mitraillette','baklava'];
 if(!F().jalal){F().jalal=1;await say(N,"Bienvenue au Smile and Eat ! Moi c'est Jalal. Ici, on mange avec le sourire, sinon c'est pas la peine, hein !");await say(N,"Tu bosses chez Amin ? Alors t'es de la famille. Dürüm, baklava… Tout est fait maison, avec amour et un peu trop de sauce blanche.")}
 else await say(N,["Ah, mon client préféré ! Comme d'habitude ?","Mes cheveux ? Huile d'olive et confiance en soi, mon frère.","Un dürüm, ça répare tout. Même les cœurs brisés."][(rnd()*3)|0]);
 for(;;){const i=await pickList(`Smile and Eat · ${S.money} €`,ks.map(x=>({html:`${ico(x)}<span class="grow"><b>${ITEMS[x].n}</b> — ${ITEMS[x].price} €<br><small>${ITEMS[x].d} · Tu en as ${S.bag[x]||0}</small></span>`,dis:S.money<ITEMS[x].price})));if(i<0)break;S.money-=ITEMS[ks[i]].price;give(ks[i])}
 await say(N,"Merci, et souris, hein ! Ça coûte rien.")}

/* Cinématique de la bagarre Kétosaures / Pirates sur la Route 2 (~10 s) : les hommes ET leurs Lumons se battent */
async function r2Fight(all){const[k1,k2,p1,p2]=all,G=cur.group,mons=[];
 const pop=async(sp,c,side)=>{const r=monModel(sp);ANIMS.delete(r);const s=.95*(MSCALE[sp]||1);r.g.position.set(c.g.position.x+side*1.05,.1,c.g.position.z+.15);r.g.rotation.y=side>0?PI/2:-PI/2;r._s=s;G.add(r.g);
  await tween(260,q=>r.g.scale.setScalar(s*q));mons.push(r);return r};
 const mid=()=>{const v=new V();all.forEach(c=>v.add(c.g.position));return v.multiplyScalar(1/4)};
 cineOn();const M=mid();
 try{
  camShot([M.x,2.8,M.z+6],[M.x,.7,M.z]);sfx(90,.4,'sawtooth',.18);
  const sc=await pop(SP.scorion?'scorion':'pigeolet',k1,1),sb=await pop(SP.sambrax?'sambrax':'pigeolet',k2,1),kr=await pop(SP.krakapitaine?'krakapitaine':'pigeolet',p1,-1),pg=await pop('pigeolet',p2,-1);
  await say('Pirate Bob',"Krakapitaine, Pigeolet… À L'ABORDAGE !",{auto:500,fast:true});
  const duel=[[sc,kr],[kr,sb],[sb,pg],[pg,sc],[sc,kr],[sb,pg]],fx=['star','dust','star','dust','star','star'];
  const shots=[[[M.x-2.6,2.2,M.z+4.6],[M.x,.6,M.z]],[[M.x+2.8,2.4,M.z+4.4],[M.x,.6,M.z]],[[M.x,4.6,M.z+4.2],[M.x,.4,M.z]],[[M.x-1.2,1.6,M.z+4.2],[M.x,.7,M.z]]];
  for(let r=0;r<duel.length;r++){const[a,b]=duel[r];if(r%2===0)camShot(...shots[(r/2)%shots.length],{move:true,sm:.08,silent:true});
   const ax=a.g.position.x,az=a.g.position.z,bx=b.g.position.x,bz=b.g.position.z;
   await tween(220,q=>{const k=Math.sin(q*PI)*.7;a.g.position.x=ax+(bx-ax)*k;a.g.position.z=az+(bz-az)*k;a.g.position.y=.1+Math.sin(q*PI)*.35});
   sfx(140+r*40,.15,'square',.2);sfx(60,.25,'sawtooth',.15);camShake(220,.12);flashScr(r%2?'#a04ae8':'#ff8a2c',180,.25);
   sparkAt(b.g.position.x-cur.ox,b.g.position.z-cur.oz,fx[r],8);
   b.g.rotation.z=.35*(r%2?1:-1);await sleep(140);b.g.rotation.z=0;
   // les humains se cognent aussi
   const h=all[r%2],o=all[2+(r+1)%2],hx=h.g.position.x,hz=h.g.position.z;
   await tween(160,q=>{const k=Math.sin(q*PI)*.35;h.g.position.x=hx+(o.g.position.x-hx)*k;h.g.position.z=hz+(o.g.position.z-hz)*k});
   sfx(110,.1,'square',.18);o.g.rotation.z=.25*(r%2?-1:1);await sleep(220);o.g.rotation.z=0}
  camShot([M.x,2,M.z+4.6],[M.x,.7,M.z]);for(let i=0;i<3;i++){flashScr('#ffffff',120,.5);camShake(300,.18);sfx(50+i*20,.4,'sawtooth',.2);await sleep(200)}
  await Promise.all(mons.map(r=>tween(300,q=>r.g.scale.setScalar((1-q)*r._s))))}
 finally{mons.forEach(r=>{G.remove(r.g);disposeModel(r)});cineOff()}}
