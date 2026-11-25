/* ================= GAME DATA ================= */
const TC={Normal:'#a8a77a',Feu:'#ee8130',Eau:'#6390f0',Plante:'#5fae3a',Électrik:'#e8b80c',Insecte:'#94a81a',Vol:'#8f75e0',Roche:'#b09a36',Sol:'#c9a24a',Glace:'#7fe0e8',Spectre:'#8a6ad0',Ténèbres:'#5a4458'};
const CHART={Feu:{Plante:2,Insecte:2,Eau:.5,Feu:.5,Roche:.5},Eau:{Feu:2,Roche:2,Sol:2,Eau:.5,Plante:.5},Plante:{Eau:2,Roche:2,Sol:2,Feu:.5,Plante:.5,Vol:.5,Insecte:.5},
 Insecte:{Plante:2,Feu:.5,Vol:.5},Vol:{Plante:2,Insecte:2,Roche:.5,Électrik:.5},Normal:{Roche:.5},Roche:{Feu:2,Vol:2,Insecte:2,Sol:.5},
 Sol:{Feu:2,Électrik:2,Roche:2,Plante:.5,Vol:0,Insecte:.5},Électrik:{Eau:2,Vol:2,Plante:.5,Électrik:.5,Sol:0}};
CHART.Glace={Plante:2,Sol:2,Vol:2,Feu:.5,Eau:.5,Glace:.5};CHART.Spectre={Spectre:2,Normal:0,Ténèbres:.5};CHART.Ténèbres={Spectre:2,Ténèbres:.5};
Object.assign(CHART.Feu,{Glace:2});Object.assign(CHART.Roche,{Glace:2});Object.assign(CHART.Insecte,{Ténèbres:2,Spectre:.5});Object.assign(CHART.Normal,{Spectre:0});Object.assign(CHART.Eau,{});
const effOf=(t,defT)=>defT.reduce((m,d)=>m*((CHART[t]||{})[d]??1),1);
