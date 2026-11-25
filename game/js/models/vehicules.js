/* ---- Véhicules (garage Wagner) ----
   Rolls-Royce : silhouette relevée sur le modèle 3D « rollsroyce_phantom.glb » (15 Mo, trop lourd pour le jeu) :
   profil haut de caisse (UP), vitres (GU/GD), roues (WH), de l'arrière (0) à l'avant (1), hauteurs en mètres.
   Audi A6 Avant S-line : profil dessiné à la main dans le même esprit. Style du jeu : toon + contours, un peu trapu.
   carModel(kind) -> THREE.Group, voiture orientée vers +x, posée au sol (y=0), longueur ~2,3. */
const CARS={
 rolls:{L:4.911,UP:[.863,.917,.96,1.003,1.04,1.107,1.199,1.346,1.397,1.393,1.408,1.415,1.419,1.421,1.421,1.42,1.405,1.346,1.207,1.101,1.025,1.026,1.023,1.015,1.005,.994,.97,.996,.91],
  G:[4,20],GU:[1.071,1.167,1.261,1.275,1.184,1.286,1.299,1.304,1.304,1.307,1.296,1.295,1.291,1.339,1.303,1.213,1.108],GD:[.986,.986,1.087,1.191,.876,.883,.892,.898,.908,.914,.924,.968,.967,.965,.964,.964,.997],
  WH:[1.184,4.192],R:.337,low:.2},
 a6:{L:4.95,UP:[.78,.86,.98,1.12,1.3,1.4,1.43,1.45,1.46,1.46,1.46,1.45,1.44,1.42,1.38,1.3,1.18,1.06,.98,.95,.93,.91,.89,.87,.85,.82,.78,.74,.68],
  G:[3,18],GU:[1.18,1.26,1.32,1.36,1.37,1.37,1.37,1.36,1.35,1.34,1.31,1.26,1.2,1.12,1.04,.98],GD:[.99,.99,.99,.99,.98,.98,.98,.98,.98,.98,.97,.97,.96,.95,.94,.93],
  WH:[1.2,4.05],R:.33,low:.18}};
function carModel(kind,o={}){const D=CARS[kind==='a6'?'a6':'rolls'],g=new THREE.Group(),N=D.UP.length-1,SL=2.3/D.L,SH=SL*1.18,W=.92,R=D.R;
 const paint=o.paint||(kind==='a6'?'#4c5058':'#0e0e12'),trim=kind==='a6'?'#1a1a1e':'#d8dce4';
 const X=i=>i/N*D.L*SL-1.15;
 // carrosserie : profil haut + passages de roue en bas
 const sh=new THREE.Shape();sh.moveTo(X(0),D.low*SH);for(let i=0;i<=N;i++)sh.lineTo(X(i),D.UP[i]*SH);sh.lineTo(X(N),D.low*SH);
 for(const wz of[D.WH[1],D.WH[0]]){const cx=wz*SL-1.15,r=(R+.05)*SL*1.18,cy=R*SH*.98;sh.lineTo(cx+r,D.low*SH);for(let k=0;k<=8;k++){const a=k/8*PI;sh.lineTo(cx+Math.cos(a)*r,Math.max(D.low*SH,cy+Math.sin(a)*r))}}
 sh.lineTo(X(0),D.low*SH);
 const geo=new THREE.ExtrudeGeometry(sh,{depth:W-.08,bevelEnabled:true,bevelThickness:.04,bevelSize:.04,bevelSegments:2,curveSegments:4});geo.translate(0,0,-(W-.08)/2);
 add(g,geo,paint,0,0,0,{ol:.03});
 // vitres (bandeau sombre un peu plus large que la caisse)
 const gs=new THREE.Shape(),[a,b]=D.G;gs.moveTo(X(a),D.GD[0]*SH);for(let i=a;i<=b;i++)gs.lineTo(X(i),D.GU[i-a]*SH-.015);for(let i=b;i>=a;i--)gs.lineTo(X(i),D.GD[i-a]*SH+.01);
 const gg=new THREE.ExtrudeGeometry(gs,{depth:W+.01,bevelEnabled:false});gg.translate(0,0,-(W+.01)/2);add(g,gg,kind==='a6'?'#7fa6c8':'#1c2a3a',0,0,0,{ol:false,emi:kind==='a6'?'#24384a':'#0a1420'});
 if(kind==='a6'){// pare-brise, lunette et montants : on lit bien les vitres
  for(const i of[a+1,a+6,b-1]){const h=(D.GU[i-a]-D.GD[i-a])*SH;box(g,.07,h+.02,W+.03,X(i),(D.GU[i-a]+D.GD[i-a])/2*SH,0,paint,{ol:false})}
  for(const s of[-1,1])for(const i of[a+3,a+10]){const q=box(g,.5,.025,.01,X(i),(D.GU[i-a]*.6+D.GD[i-a]*.4)*SH,s*(W/2+.012),'#ffffff',{ol:false,emi:'#c8e0ff'});q.rotation.z=.5}}
 // montant central + ligne chromée
 box(g,.06,(D.GU[8]-D.GD[8])*SH,W+.03,X(a+8),(D.GU[8]+D.GD[8])/2*SH,0,paint,{ol:false});
 box(g,(X(N)-X(0))*.9,.025,W+.02,(X(0)+X(N))/2,D.GD[8]*SH-.02,0,trim,{ol:false,emi:kind==='a6'?null:'#6a6a70'});
 // roues
 for(const wz of D.WH)for(const s of[-1,1]){const cx=wz*SL-1.15,r=R*SL*1.18;tp(g,CYL,'#141416',cx,r,s*(W/2-.05),r,.16,r,{r:[PI/2,0,0]});tp(g,CYL,kind==='a6'?'#8a8e96':'#d8dce4',cx,r,s*(W/2+.03),r*.62,.02,r*.62,{r:[PI/2,0,0],emi:'#5a5a60',ol:false})}
 // avant : calandre, phares ; arrière : feux
 const fx=X(N),hy=D.UP[N]*SH;
 if(kind==='a6'){box(g,.05,hy*.42,W*.5,fx+.03,hy*.52,0,'#121214',{ol:.02});box(g,.05,.04,.1,fx+.06,hy*.62,-W*.18,'#d8232a',{ol:false,emi:'#a01018'})}
 else{box(g,.06,hy*.62,W*.36,fx+.03,hy*.5,0,'#e6e9ef',{ol:.02,emi:'#7a7a80'});for(let k=-2;k<=2;k++)box(g,.07,hy*.56,.012,fx+.05,hy*.5,k*W*.06,'#9aa0a8',{ol:false});
  tp(g,SPH,'#e6e9ef',fx-.02,hy+.06,0,.03,.07,.02,{emi:'#8a8a90',ol:false})}
 for(const s of[-1,1]){box(g,.05,.07,.2,fx+.02,hy*.7,s*W*.34,'#fff6d8',{emi:'#fff2c0',ol:false});box(g,.05,.08,.16,X(0)-.03,D.UP[0]*SH*.78,s*W*.36,'#d8232a',{emi:'#a01018',ol:false})}
 if(o.ruber)for(const s of[-1,1]){const p=plane(g,.95,.22,(X(D.G[0])+X(D.G[1]))/2,D.GD[8]*SH-.2,s*(W/2+.045),labelTex('Ruber',paint,'#2fe06a',512,120,92));if(s<0)p.rotation.y=PI}
 return g}
