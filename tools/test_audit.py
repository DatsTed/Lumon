"""Audit des données du jeu (faux Three.js) : espèces, attaques, objets, cartes, références dans le code.
Cherche les incohérences qu'aucun test de scène ne voit : évolution vers une espèce absente, attaque inconnue,
objet donné qui n'existe pas, PNJ ou panneau dans un mur, porte vers une case bloquée, etc.
Usage : python tools/test_audit.py"""
import os, re, sys, json; sys.path.insert(0, os.path.dirname(os.path.abspath(__file__))); sys.stdout.reconfigure(encoding='utf-8')
import test as T
from test_histoire import partie, verif, OK
from playwright.sync_api import sync_playwright

GAME = os.path.join(T.RACINE, 'game')


def litteraux():
    """Identifiants écrits en dur dans le code (espèces, objets)."""
    html = open(os.path.join(GAME, 'index.html'), encoding='utf-8').read()
    sp, it, ar = {}, {}, []
    for f in re.findall(r'<script src="(js/[^"]+)"', html):
        t = open(os.path.join(GAME, f), encoding='utf-8').read()
        for m in re.finditer(r"\b(?:mkMon|mkEgg|giveEgg|bossMon|ranchGiveEgg|receiveMonSp)\(\s*['\"]([a-z_0-9]+)['\"]", t):
            sp.setdefault(m.group(1), f)
        for m in re.finditer(r"\bS\.bag\.([a-zA-Z_]\w*)\s*(?:=|\+=|\+\+|-=|--|\|\|)", t):
            it.setdefault(m.group(1), f)
        for m in re.finditer(r"\bgive\(\s*['\"]([a-zA-Z_]\w*)['\"]", t):
            it.setdefault(m.group(1), f)
        for m in re.finditer(r"S\.bag\[['\"]([a-zA-Z_]\w*)['\"]\]", t):
            it.setdefault(m.group(1), f)
        for m in re.finditer(r"(?:goMap|gotoMap)\(([A-Z][A-Z_0-9]*),\s*(\d+),\s*(\d+)", t):
            ar.append([m.group(1), int(m.group(2)), int(m.group(3)), f])
    return sp, it, ar


AUDIT = r"""([LSP,LIT])=>{const P=[];const pb=(k,t)=>P.push(k+' : '+t);
 // espèces
 for(const [k,s] of Object.entries(SP)){
  if(!s.n)pb('espèce sans nom',k);
  (s.t||[]).forEach(t=>{if(!TC[t])pb('type inconnu',k+' -> '+t)});
  if(!s.b||s.b.length<4||s.b.some(v=>!(v>0)))pb('stats de base',k+' '+JSON.stringify(s.b));
  if(s.evo&&!SP[s.evo[1]])pb('évolution vers une espèce absente',k+' -> '+s.evo[1]);
  if(s.evo&&!(s.evo[0]>1&&s.evo[0]<=100))pb('niveau d’évolution',k+' '+s.evo[0]);
  (s.L||[]).forEach(([lv,mv])=>{if(!MV[mv])pb('attaque inconnue dans les apprentissages',k+' -> '+mv)});
  if(!(s.L||[]).length)pb('espèce sans attaques',k);
  if(!s.d&&!s.gen)pb('espèce sans description',k);
 }
 for(const [k,m] of Object.entries(MV)){if(!TC[m.t])pb('attaque de type inconnu',k+' '+m.t);if(!m.n)pb('attaque sans nom',k);
  if(m.p>0&&!(m.a>0))pb('précision',k);if(!(m.pp>0))pb('PP',k)}
 const mvFx=typeof MOVEFX!=='undefined'?Object.keys(MV).filter(k=>!MOVEFX[k]):[];if(mvFx.length)pb('attaques sans effet visuel',mvFx.join());
 // Lumidex
 (DEX||[]).forEach(k=>{if(!SP[k])pb('Lumidex : espèce absente',k)});
 Object.keys(SP).filter(k=>!SP[k].gen&&!SP[k].fusion&&!SP[k].pre&&!(DEX||[]).includes(k)&&!(typeof DEX_UNIQ!=='undefined'&&DEX_UNIQ.includes&&DEX_UNIQ.includes(k))).forEach(k=>pb('espèce absente du Lumidex',k));
 Object.keys(SP).filter(k=>!SP[k].fusion&&!SP[k].pre&&!etyOf(k)).forEach(k=>pb('espèce sans étymologie (Lumidex)',k));
 Object.keys(SP).filter(k=>!MODELS[k]&&!(SP[k].G)).forEach(k=>pb('espèce sans modèle 3D',k));
 // objets
 for(const [k,o] of Object.entries(ITEMS)){if(!o.n)pb('objet sans nom',k);if(!o.d)pb('objet sans description',k);if(!ICON[k])pb('objet sans icône',k)}
 Object.keys(ITEMS).forEach(k=>{try{pocketOf(k)}catch(e){pb('poche du sac',k)}});
 for(const [k,f] of Object.entries(LSP))if(!SP[k])pb('espèce écrite dans le code mais absente de SP',k+' ('+f+')');
 for(const [k,f] of Object.entries(LIT))if(!ITEMS[k])pb('objet du sac absent de ITEMS',k+' ('+f+')');
 // cartes : PNJ, panneaux, portes
 for(const m of Object.values(MAPS)){
  const sol=(x,z)=>x<0||z<0||x>=m.W||z>=m.H||m.solid[z*m.W+x];
  for(const c of m.npcs||[])if(c&&(c.x<0||c.z<0||c.x>=m.W||c.z>=m.H))pb('PNJ hors carte',m.id+' '+(c.name||'')+' '+c.x+','+c.z);
  for(const k of Object.keys(m.doors)){const [x,z]=k.split(',').map(Number);if(x<0||z<0||x>=m.W||z>=m.H)pb('porte hors carte',m.id+' '+k)}
  for(const tr of m.trainers||[]){if(!tr.flag)pb('dresseur sans drapeau',m.id);let L=[];try{L=tr.mons()}catch(e){pb('dresseur : équipe qui plante',m.id+' '+tr.flag+' '+e.message)}
   if(!L.length)pb('dresseur sans équipe',m.id+' '+tr.flag);L.forEach(x=>{if(!x||!SP[x.sp]||!x.mhp)pb('dresseur : Lumon invalide',m.id+' '+tr.flag)});
   if(tr.reward&&!ITEMS[tr.reward[0]])pb('dresseur : récompense inconnue',m.id+' '+tr.flag+' '+tr.reward[0]);
}
 }
 // objectifs : chaque étape a un texte
 try{const t=objText();if(!t||/undefined|NaN|null/.test(t))pb('objectif',t)}catch(e){pb('objText plante',e.message)}
 return P}"""


ARRIVEES = r"""(L)=>{const P=[];const sv=JSON.stringify(S.flags);Object.assign(F(),{introDone:1,labIntro:1,starter:0,nilsBattle:1,chapterDone:1,gate1:1,keto1:1,charl:1,badge1:1,luciole:1,rap1:1,profBadge:1,north:1,r2scene:1,brux:1});refreshNPCs();for(const [v,x,z,f] of L){let m;try{m=eval(v)}catch(e){if(v!=='HC')P.push('carte inconnue '+v+' ('+f+')');continue}
  if(!m||!m.solid){if(v!=='HC')P.push('carte inconnue '+v+' ('+f+')');continue}
  if(x>=m.W||z>=m.H||m.solid[z*m.W+x]){P.push('arrivée dans un mur : '+v+' '+x+','+z+' ('+f+')');continue}
  // flood fill : une porte, une case d'événement ou un bord de carte doit être atteignable
  const seen=new Uint8Array(m.W*m.H),Q=[[x,z]];seen[z*m.W+x]=1;let out=false,n=0;
  while(Q.length&&!out){const [a,b]=Q.pop();n++;if(m.doors[a+','+b]||m.steps[a+','+b]||a===0||b===0||a===m.W-1||b===m.H-1)out=true;
   for(const [dx,dz] of [[1,0],[-1,0],[0,1],[0,-1]]){const c=a+dx,d=b+dz;if(c<0||d<0||c>=m.W||d>=m.H)continue;const k=d*m.W+c;if(seen[k])continue;seen[k]=1;
    if(m.doors[c+','+d]||m.steps[c+','+d]){out=true;break}if(!m.solid[k])Q.push([c,d])}}
  if(!out&&!m.hook)P.push('arrivée sans sortie : '+v+' '+x+','+z+' ('+f+', '+n+' cases)')}
 S.flags=JSON.parse(sv);refreshNPCs();return P}"""


def main():
    srv = T.serveur(GAME)
    url = 'http://127.0.0.1:%d/index.html' % srv.server_address[1]
    sp, it, ar = litteraux()
    with sync_playwright() as pw:
        b = pw.chromium.launch(); ctx = b.new_context(viewport={'width': 400, 'height': 800}, service_workers='block')
        g = partie(ctx, url)
        print('   espèces : %s · attaques : %s · objets : %s · cartes : %s · dresseurs : %s' % tuple(g.js('()=>[Object.keys(SP).length,Object.keys(MV).length,Object.keys(ITEMS).length,Object.keys(MAPS).length,Object.values(MAPS).reduce((n,m)=>n+(m.trainers||[]).length,0)]')))
        P = g.js(AUDIT, [sp, it])
        for p in P: print('   -', p)
        verif('audit des données : aucune incohérence', not P, '%d problème(s)' % len(P))
        # dresseurs : chacun se bat sans planter (équipes valides)
        # objectifs du début à la fin du chapitre 5 : on rejoue la chaîne des drapeaux
        ob = g.js(r"""()=>{const out=[];const f=F();const save=JSON.stringify(S.flags);
          const keys=['introDone','labIntro','nilsBattle','keto1','charl','badge1','luciole','rap1','profBadge','north','r2scene','brux','nourMet','pigeon','captain','jourd','amin','essai3','ch3done','ch4','badge2','ch4done','r5','lie','badge3','cokerie','rap','ch5done','r6','givrale','namu','joute','badge4','cita','herseOK','ch6done','r7','piege','bast','badge5','fondCode','ch7done'];
          for(const k of keys){f[k]=1;let t;try{t=objText()}catch(e){t='PLANTE '+e.message}out.push(k+' -> '+t)}
          S.flags=JSON.parse(save);return out}""")
        bad = [o for o in ob if 'PLANTE' in o or 'undefined' in o]
        verif('textes d’objectif sans erreur', not bad, '; '.join(bad))
        A = g.js(ARRIVEES, ar)
        for p in A: print('   -', p)
        verif('arrivées sur les cartes : case libre, sortie atteignable', not A, '%d arrivée(s) testée(s)' % len(ar))
        print('erreurs console :', g.console or 'aucune')
        b.close()
    print('%d/%d vérifications OK' % (sum(OK), len(OK)))
    sys.exit(0 if all(OK) and not g.console else 1)


if __name__ == '__main__':
    main()
