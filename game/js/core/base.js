const $=id=>document.getElementById(id);
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const V=THREE.Vector3,PI=Math.PI,rnd=Math.random;
let S={name:'',gender:0,flags:{},party:[],bag:{},dex:{seen:{},caught:{}}};
const F=()=>S.flags;

let OPT={music:1,sfx:1,anim:1,txt:2,vol:3,voice:1};try{Object.assign(OPT,JSON.parse(localStorage.getItem('lumons_opt')||'{}'))}catch(e){}
if(OPT.mv==null)OPT.mv=Math.round((OPT.vol!=null?OPT.vol:3)*25);if(OPT.sv==null||!OPT.v2){OPT.sv=15;OPT.v2=1}
const saveOpt=()=>{try{localStorage.setItem('lumons_opt',JSON.stringify(OPT))}catch(e){}};
