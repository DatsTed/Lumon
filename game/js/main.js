(async()=>{try{await document.fonts.ready}catch(e){}
 await buildWorld();cur=TOWN;TOWN.group.visible=true;camera.position.set(21,9,24);camLook.set(12,0,9);camera.lookAt(camLook);
 NPC.mom.show(false);NPC.nils.show(false);NPC.nilsL.show(false);requestAnimationFrame(loop);
 {const v=$('ver');if(v)v.textContent='v'+LUMONS_VER+' · '+LUMONS_CH}$('loading').style.display='none';$('bNew').style.display='inline-block';$('bGal').style.display='inline-block';const sv=loadGame();if(sv&&sv.S)$('bCont').style.display='inline-block';
 $('bNew').onclick=()=>newGame();$('bCont').onclick=()=>continueGame(sv);$('bGal').onclick=async()=>{hide('title');await gallery(0);show('title')};
 let a=0;(function idle(){if(!player&&camMode!=='gallery'){a+=.003;camera.position.set(12+Math.cos(a)*14,9,10+Math.sin(a)*14);camera.lookAt(12,0,9)}if(!player)requestAnimationFrame(idle)})();
})();
