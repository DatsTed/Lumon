const $=id=>document.getElementById(id);
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const V=THREE.Vector3,PI=Math.PI,rnd=Math.random;
let S={name:'',gender:0,flags:{},party:[],bag:{},dex:{seen:{},caught:{}}};
const F=()=>S.flags;
const LUMONS_VER='1.0',LUMONS_CH='chapitres 1 à 5';   // version affichée (écran titre, options) : à changer à chaque version officielle

let OPT={music:1,sfx:1,anim:1,txt:2,vol:3,voice:1};try{Object.assign(OPT,JSON.parse(localStorage.getItem('lumons_opt')||'{}'))}catch(e){}
if(OPT.mv==null)OPT.mv=Math.round((OPT.vol!=null?OPT.vol:3)*25);if(OPT.sv==null||!OPT.v2){OPT.sv=15;OPT.v2=1}
if(!OPT.v3){OPT.sv=50;OPT.wv=15;OPT.sfx=1;OPT.v3=1}if(OPT.wv==null)OPT.wv=15;
if(!OPT.v4){OPT.gv=100;OPT.mv=80;OPT.sv=90;OPT.wv=10;OPT.music=1;OPT.sfx=1;OPT.v4=1}if(OPT.gv==null)OPT.gv=100; // général 100, musique 80, bruitages 90, météo 10 // bruitages 50 %, météo 15 % (séparés)
const saveOpt=()=>{try{localStorage.setItem('lumons_opt',JSON.stringify(OPT))}catch(e){}};
