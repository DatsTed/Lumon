function foeChoice(){const f=foeM(),ok=f.moves.map((x,i)=>i).filter(i=>f.moves[i].pp>0);if(!ok.length)return -1;
 const smart=B.wild?0:(B.tr.smart??.3);if(rnd()>smart)return ok[(rnd()*ok.length)|0];
 const sc=ok.map(i=>{const v=MV[f.moves[i].id];if(!v.p&&v.st)return B.me.status?1:22;if(!v.p){const[st,amt,who]=v.fx;const tg=who==='self'?B.st.f:B.st.p;return(amt>0?(tg[st]||0)>=2:(tg[st]||0)<=-2)?2:18}return v.p*effOf(v.t,typesOf(B.me))*(typesOf(f).includes(v.t)?1.5:1)});
 let r=rnd()*sc.reduce((a,b)=>a+b,0);for(let k=0;k<ok.length;k++){if((r-=sc[k])<0)return ok[k]}return ok[0]}
