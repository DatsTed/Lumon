/* ================= MODELS : humans ================= */
function human(o){const g=new THREE.Group(),P={arms:[],legs:[]};const inner=new THREE.Group();g.add(inner);
 for(const s of[-1,1]){const pv=new THREE.Group();pv.position.set(s*.11,.42,0);inner.add(pv);tp(pv,CYL,o.pants,0,-.18,0,.085,.36,.085);tp(pv,SPH,o.boots||'#3a2a28',0,-.38,.04,.1,.07,.14);if(o.boots)tp(pv,CYL,o.boots,0,-.32,0,.09,.1,.09);P.legs.push(pv)}
 const body=new THREE.Group();body.position.y=.42;inner.add(body);P.body=body;
 if(o.jacket){tp(body,SPH,o.jacket,0,.21,-.01,.265,.29,.215);tp(body,SPH,o.shirt,0,.24,.1,.13,.22,.13,{ol:false});for(const s of[-1,1])tp(body,BOXG,o.jacket,s*.085,.34,.17,.06,.14,.03,{ol:false,r:[0,0,s*.35]});tp(body,BOXG,'#c9ccd4',.12,.18,.19,.012,.12,.01,{ol:false})}
 else if(o.coat){tp(body,SPH,'#f7f7f7',0,.2,-.01,.27,.31,.22);tp(body,SPH,o.shirt,0,.25,.1,.15,.2,.13,{ol:false})}else tp(body,SPH,o.shirt,0,.22,0,.25,.27,.2);
 if(o.apron)tp(body,BOXG,'#ffffff',0,.14,.175,.3,.3,.03,{ol:false});
 if(o.tee){const pl=plane(body,.22,.08,0,.27,.205,labelTex(o.tee,'#161616','#f7971e',256,96,62));pl.position.set(0,.27,.205)}
 const armC=o.jacket||(o.coat?'#f7f7f7':o.shirt);
 for(const s of[-1,1]){const pv=new THREE.Group();pv.position.set(s*.27,.4,0);pv.rotation.z=s*.12;body.add(pv);tp(pv,CYL,armC,0,-.14,0,.07,.28,.07);if(o.tattoo&&s===1){tp(pv,CYL,o.skin,0,-.2,0,.072,.16,.072,{ol:false});for(let k=0;k<3;k++)tp(pv,CYL,'#24324a',0,-.13-k*.045,0,.075,.018,.075,{ol:false});tp(pv,SPH,'#24324a',0,-.22,.06,.03,.05,.02,{ol:false})}tp(pv,SPH,o.skin,0,-.31,0,.07,.07,.07);P.arms.push(pv)}
 if(o.shirtless){tp(body,SPH,o.skin,0,.22,0,.24,.27,.19);tp(body,SPH,'#d9a888',0,.25,.17,.11,.02,.02,{ol:false,op:.6});tp(body,CYL,'#f4f4f4',0,.0,0,.235,.07,.19,{ol:false});if(o.pouch){tp(body,BOXG,'#f2e6a0',.26,-.04,.06,.07,.13,.04,{op:.85});tp(body,CYL,'#d8dce4',.2,.06,.08,.012,.16,.012,{ol:false,r:[0,0,.5]})}}
 if(o.stripes){for(const s2 of[-1,1]){P.legs[s2<0?0:1].children.length;tp(P.legs[s2<0?0:1],BOXG,o.stripeC||'#ffffff',s2*.088,-.18,0,.012,.34,.05,{ol:false})}}
 if(o.strap){const st=tp(body,BOXG,'#1c1c22',0,.26,.16,.045,.5,.02,{ol:false,r:[0,0,.75]});tp(body,BOXG,'#1c1c22',-.15,.08,.18,.16,.12,.07);tp(body,BOXG,'#c9ccd4',-.15,.1,.22,.06,.015,.01,{ol:false})}
 if(o.logo){tp(body,CYL,'#ffffff',.1,.34,.18,.045,.01,.045,{ol:false,r:[PI/2,0,0]});tp(body,CYL,o.logoC||'#6a3aa0',.1,.34,.186,.03,.01,.03,{ol:false,r:[PI/2,0,0]})}
 if(o.chain)tp(body,TOR,o.chain===2?'#c9ccd4':'#f6c80f',0,.42,.04,.14,.14,.14,{r:[PI/2.2,0,0],ol:false,emi:o.chain===2?'#555':'#8a6a00'});
 if(o.spikes){tp(body,TOR,'#141414',0,.47,0,.13,.13,.13,{r:[PI/2,0,0],ol:false});for(let k=0;k<7;k++){const a=k/7*PI*2;tp(body,CONE,'#d8dce4',Math.sin(a)*.15,.47,Math.cos(a)*.15,.02,.05,.02,{ol:false,r:[Math.cos(a)*PI/2,0,-Math.sin(a)*PI/2]})}}
 if(o.cross){tp(body,BOXG,'#c9ccd4',0,.28,.205,.018,.09,.01,{ol:false});tp(body,BOXG,'#c9ccd4',0,.3,.205,.055,.016,.01,{ol:false})}
 if(o.studs)for(const sd of[-1,1])for(let k=0;k<4;k++)tp(body,CONE,'#d8dce4',sd*(.12+k*.04),.42-k*.02,.05,.018,.04,.018,{ol:false,r:[-.6,0,sd*-.4]});
 if(o.plaid){for(let k=0;k<4;k++)for(const sd of[-1,1])tp(body,BOXG,shade(o.jacket||'#8a1a22',-.25),sd*.14,.08+k*.1,.205,.07,.012,.01,{ol:false});}
 if(o.longcoat)add(body,new THREE.CylinderGeometry(.27,.36,.5,16,1,true),o.longcoat,0,-.22,0,{ol:.02});
 if(o.dress)add(body,new THREE.CylinderGeometry(.21,.33,.42,16),o.dress,0,-.12,0,{ol:.02});
 if(o.skirt)add(body,new THREE.CylinderGeometry(.23,.3,.2,16),o.skirt,0,-.02,0,{ol:.02});
 if(o.hood){tp(body,TOR,o.hood,0,.44,-.06,.16,.16,.2,{r:[PI/2.6,0,0]});tp(body,SPH,o.hood,0,.38,-.16,.17,.12,.08)}
 if(o.tie)tp(body,BOXG,o.tie,0,.26,.19,.05,.24,.02,{ol:false});
 if(o.collar)for(const s2 of[-1,1])tp(body,BOXG,'#ffffff',s2*.05,.43,.15,.07,.04,.04,{ol:false,r:[0,0,s2*.5]});
 if(o.glow)tp(body,SPH,o.glow,0,.4,.17,.03,.03,.03,{ol:false,emi:o.glow});
 if(o.bw){body.scale.x=body.scale.z=o.bw;inner.children.forEach(c=>{if(c!==body)c.position.x*=Math.sqrt(o.bw)})}
 const head=new THREE.Group();head.position.y=.72;body.add(head);P.head=head;if(o.bw)head.scale.x=head.scale.z=1/o.bw;
 tp(head,SPH,o.skin,0,0,0,.3,.28,.28);
 for(const s of[-1,1]){tp(head,SPH,o.eye||'#2a1f2e',s*.1,-.01,.255,.036,.046,.03,{ol:false});if(o.eye)tp(head,SPH,'#1a1420',s*.1,-.013,.268,.018,.024,.02,{ol:false});tp(head,SPH,'#ffffff',s*.1+.012,.006,.276,.008,.009,.01,{ol:false});
  tp(head,BOXG,o.brow||(o.hair&&o.hs!=='bald'?shade(o.hair,-.15):'#3a2a24'),s*.1,.065,.262,.085,.016,.02,{ol:false,r:[0,0,s*-.14]});tp(head,SPH,shade(o.skin,-.12),s*.1,-.06,.255,.03,.008,.01,{ol:false})}
 tp(head,SPH,'#c27a6a',0,-.11,.262,.04,.015,.02,{ol:false});
 const hc=o.hair;
 const hat=!!o.hat,hs=o.hs||'short';
 if(hs==='bald'){}
 else if(hs==='slick'){tp(head,HEMI,hc,0,.02,-.03,.305,.26,.31,{r:[-.35,0,0]});tp(head,SPH,hc,0,.04,-.17,.25,.17,.17)}
 else if(hs==='mullet'){tp(head,HEMI,hc,0,.02,-.01,.31,.24,.3,{r:[-.2,0,0]});tp(head,SPH,hc,0,-.2,-.19,.23,.27,.12)}
 else if(hs==='messy'||hs==='shag'){tp(head,HEMI,hc,0,.02,-.01,.315,.27,.315,{r:[-.15,0,0]});for(let k=0;k<6;k++){const a=k/6*PI*2;tp(head,CONE,hc,Math.cos(a)*.17,.24,Math.sin(a)*.15,.07,.12,.07,{r:[Math.sin(a)*.6,0,-Math.cos(a)*.6]})}for(const sd of[-1,1])tp(head,SPH,hc,sd*.25,-.12,0,.07,hs==='shag'?.26:.18,.14);tp(head,SPH,hc,0,-.14,-.2,.26,hs==='shag'?.28:.2,.11)}
 else if(hs==='dreads'){tp(head,HEMI,hc,0,.02,-.01,.31,.25,.31,{r:[-.2,0,0]});for(let k=0;k<11;k++){const a=PI*.92+k/10*PI*1.16;tp(head,CYL,hc,Math.cos(a)*.27,-.2,Math.sin(a)*.27-.02,.035,.36,.035)}}
 else if(hs==='sidecut'){tp(head,HEMI,hc,.03,.02,-.01,.31,.26,.31,{r:[-.2,0,-.15]});tp(head,SPH,hc,.22,-.2,-.03,.1,.32,.2)}
 else if(hs==='horseshoe'){for(const sd of[-1,1])tp(head,SPH,hc,sd*.255,-.03,-.04,.07,.12,.17);tp(head,SPH,hc,0,-.04,-.21,.21,.12,.09)}
 else if(hs==='buzz')tp(head,HEMI,hc,0,.0,-.01,.302,.29,.29,{r:[-.22,0,0]});
 else if(hs==='undercut'){tp(head,HEMI,hc,0,.0,-.01,.302,.29,.29,{r:[-.22,0,0],op:.6});tp(head,SPH,hc,0,.2,0,.24,.12,.27)}
 else if(hs==='afro'){if(hat)tp(head,SPH,hc,0,-.02,-.05,.36,.3,.34);else tp(head,SPH,hc,0,.12,-.17,.42,.4,.36)}
 else{tp(head,HEMI,hc,0,.02,-.01,hat?.305:.315,hat?.26:.3,hat?.29:.3,{r:[-.28,0,0]});tp(head,SPH,hc,0,-.03,-.07,.3,.27,.25)}
 if(hs==='long')tp(head,SPH,hc,0,-.28,-.12,.3,.36,.19);
 if(hs==='mid')tp(head,SPH,hc,0,-.14,-.1,.31,.24,.22);
 if(hs==='pony'){tp(head,SPH,hc,0,-.04,-.31,.08,.08,.08);tp(head,SPH,hc,0,-.24,-.36,.08,.2,.08,{r:[.25,0,0]})}
 if(hs==='curly')for(let k=0;k<10;k++){const a=(k/10)*PI*2;if(hat&&Math.sin(a)>-.2)continue;tp(head,SPH,hc,Math.cos(a)*.27,.06+(hat?-.06:Math.sin(a)*.12),Math.sin(a)*.2-.06,.12,.12,.12)}
 if(hs==='curly'&&!hat)tp(head,SPH,hc,0,.2,-.04,.27,.16,.25);
 if(hs==='spiky'&&!hat)for(let k=0;k<6;k++){const a=(k/6)*PI*2;tp(head,CONE,hc,Math.cos(a)*.16,.27,Math.sin(a)*.14-.03,.09,.2,.09,{r:[Math.sin(a)*.6,0,-Math.cos(a)*.6]})}
 if(hs==='bun'&&!hat)tp(head,SPH,hc,0,.27,-.14,.12,.12,.12);
 if(hs==='bun'&&hat)tp(head,SPH,hc,0,-.02,-.3,.11,.11,.11);
 if(hs==='manbun')tp(head,SPH,hc,0,hat?-.02:.18,-.28,.09,.09,.09);
 if(hs==='quiff'&&!hat)tp(head,SPH,hc,0,.28,.12,.16,.12,.14,{r:[-.5,0,0]});
 if(hs==='pigtails')for(const s2 of[-1,1]){tp(head,SPH,hc,s2*.31,-.02,-.04,.08,.08,.08);tp(head,SPH,hc,s2*.34,-.22,-.04,.07,.17,.07)}
 if(hs==='bob')tp(head,SPH,hc,0,-.12,-.05,.33,.2,.29);
 if(hs==='braid')for(let k=0;k<4;k++)tp(head,SPH,hc,0,-.15-k*.11,-.3-k*.02,.075,.075,.075);
 if(hs==='curlyl')for(let k=0;k<8;k++){const a=(k/8)*PI*2;tp(head,SPH,hc,Math.cos(a)*.28,-.22+Math.abs(Math.sin(a))*.06,Math.sin(a)*.18-.1,.12,.14,.12)}
 if(hs==='bangs'){tp(head,SPH,hc,0,-.28,-.12,.3,.36,.19);tp(head,BOXG,hc,0,.12,.24,.42,.08,.06,{r:[-.3,0,0]})}
 if(hs==='pixie')tp(head,SPH,hc,.08,.14,.15,.2,.08,.12,{r:[-.4,0,-.3]});
 if(hs==='mohawk'&&!hat)for(let k=0;k<5;k++)tp(head,BOXG,hc,0,.3-Math.abs(k-1.5)*.02,.1-k*.09,.06,.14,.08);
 if(o.hat==='cap'){tp(head,HEMI,o.hatC,0,.07,0,.325,.27,.325);tp(head,CYL,o.hatC==='#ffffff'?'#dddddd':'#2b2b2b',0,.08,.26,.19,.02,.13);tp(head,SPH,'#f6c80f',0,.2,.27,.04,.04,.02,{ol:false})}
 if(o.hat==='beanie'){tp(head,HEMI,o.hatC,0,.06,-.01,.33,.33,.33,{r:[-.12,0,0]});tp(head,CYL,shade(o.hatC,-.08),0,.08,-.01,.335,.07,.335,{r:[-.12,0,0]})}
 if(o.piercing){tp(head,TOR,'#c9ccd4',.3,-.04,.02,.03,.03,.03,{ol:false,r:[0,PI/2,0]});tp(head,TOR,'#c9ccd4',-.3,-.04,.02,.03,.03,.03,{ol:false,r:[0,PI/2,0]});tp(head,SPH,'#c9ccd4',.03,-.09,.28,.012,.012,.012,{ol:false})}
 if(o.hat==='beret')tp(head,SPH,o.hatC,-.04,.22,0,.31,.09,.31,{r:[0,0,.15]});
 if(o.hat==='bandana'){tp(head,HEMI,o.hatC,0,.06,-.01,.325,.22,.325,{r:[-.2,0,0]});tp(head,SPH,o.hatC,0,.0,-.3,.07,.07,.07);tp(head,SPH,o.hatC,.04,-.1,-.32,.04,.1,.03,{r:[0,0,.3]})}
 if(o.patch){tp(head,SPH,'#111',.1,-.01,.275,.07,.07,.02,{ol:false});tp(head,TOR,'#111',0,.02,0,.3,.3,.3,{r:[.25,0,.25],ol:false})}
 if(o.hat==='fisher'){tp(head,CYL,o.hatC,0,.14,0,.43,.025,.43);tp(head,HEMI,o.hatC,0,.14,0,.29,.2,.29)}
 if(o.glasses)for(const s of[-1,1])tp(head,TOR,'#333333',s*.1,-.01,.27,.065,.065,.065,{ol:false});
 if(o.beard)tp(head,SPH,o.beardC||(o.hair==='#3a2a20'?'#3a2a20':o.hair==='#2a2a2a'?'#2a2a2a':'#eeeeee'),0,-.17,.14,.2,.12,.15);
 return {g,inner,P,kind:'h'}}
