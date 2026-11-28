"""Bot « bavard » : à cinq moments de l'histoire (début, fin des chapitres 3, 5 et 7, après la Ligue), il va sur chaque carte,
parle à chaque PNJ visible et lit chaque panneau, en répondant toujours le 1er choix. Il relève :
  - les erreurs JavaScript,
  - les interactions qui ne rendent jamais la main (blocage),
  - les textes avec « undefined », « NaN » ou « [object ».
Les combats lancés par une discussion sont joués par le pilote automatique (équipe niveau 40).
Usage : python tools/test_bavard.py [debut|ch3|ch5|ch7|fin ...]"""
import os, sys; sys.path.insert(0, os.path.dirname(os.path.abspath(__file__))); sys.stdout.reconfigure(encoding='utf-8', errors='replace')
import test as T
from test_histoire import partie, verif, OK
from playwright.sync_api import sync_playwright

CH3 = dict(chapterDone=1, nilsBattle=1, gate1=1, keto1=1, r1=1, charl=1, gymIn=1, badge1=1, colisProf=1, luciole=1, lucIx=1, rapMet=1, rap1=1,
           profBadge=1, north=1, fusionOK=1, fusionIntro=1, r2scene=1, brux=1, lucBx=1, nourMet=1, nourBox=0, captain=1, jfSeen=1, hired=1,
           trialDone=1, trial=3, prank=1, younesBald=1, younesSick=1, ch3=1, alex=1)
CH5 = dict(CH3, pcWagner=1, ch4=1, pont4=1, lucR4=1, anv=1, badge2=1, grue=1, ch4done=1, r5=1, lie=1, samira=1, ranch=1, badge3=1,
           rudi=1, vanessa=1, cokerie=1, rap=1, baron=1, ch5done=1)
CH7 = dict(CH5, r6=1, givrale=1, givAide=1, namu=1, joute=1, badge4=1, citaVu=1, cita=1, snowClean=1, herseOK=1, ch6done=1,
           r7=1, piege=1, bast=1, badge5=1, fondCode=1, ch7done=1)
FIN = dict(CH7, r8=1, gand=1, badge6=1, galaVu=1, presVu=1, coffre=1, brutus=1, ch8done=1, panneau=1, r9=1, cote=1, crevettes=1, badge7=1, capCote=1,
           ch9done=1, nourArVu=1, badge8=1, dolbaFin=1, ligue=1, conseil=4, champion=1, fin=1)
ETATS = {'debut': {}, 'ch3': CH3, 'ch5': CH5, 'ch7': CH7, 'fin': FIN}

# Liste des cibles d'une carte : PNJ visibles avec une discussion, panneaux-fonctions et panneaux-textes
CIBLES = r"""(id)=>{const m=MAPS[id],L=[];
 m.npcs.forEach((n,i)=>{if(!n.hidden&&n.talk)L.push(['npc',i,n.x,n.z])});
 Object.keys(m.signs).forEach(k=>{const [x,z]=k.split(',').map(Number);L.push(['sign',k,x,z])});
 return L}"""

# Place le joueur sur une case libre à côté de la cible, tourné vers elle, puis appuie sur A
PARLE = r"""([id,kind,key,x,z])=>{const m=MAPS[id];
 const free=(a,b)=>a>=0&&b>=0&&a<m.W&&b<m.H&&!m.solid[b*m.W+a]&&!m.npcs.some(n=>!n.hidden&&n.x===a&&n.z===b);
 for(const [dx,dz,dir] of [[0,1,'up'],[0,-1,'down'],[1,0,'left'],[-1,0,'right']]){const a=x+dx,b=z+dz;if(!free(a,b))continue;
  gotoMap(m,a,b,dir);player.face(dir);window.__dlgTxt='';interact();return true}
 // pas de case libre : on appelle directement l'action
 gotoMap(m,x,z+1>=m.H?z:z+1,'up');window.__dlgTxt='';
 if(kind==='npc'){const n=m.npcs[key];runScript(async()=>{await n.talk()})}else{const s=m.signs[key];runScript(async()=>{typeof s==='function'?await s():await say('',s)})}
 return true}"""

ESPION = r"""()=>{if(window.__esp)return;window.__esp=1;window.__mauvais=[];
 // pilote du bot : comme le pilote de test.py, mais il quitte les listes (boutiques, PC, couveuse) au lieu d'y boucler
 window.__auto=false;const shown=id=>{const e=document.getElementById(id);return e&&e.classList.contains('show')};
 const clk=el=>{if(!el)return;el.dispatchEvent(new PointerEvent('pointerdown',{bubbles:true}));el.click()};
 setInterval(()=>{try{if(document.getElementById('flipov')){flipperClose();return}
  if(shown('card')){clk(document.getElementById('cYes'));return}if(shown('endc')){clk(document.getElementById('endOk'));return}
  if(shown('pick')){const bk=document.getElementById('pBack');if(bk.style.display!=='none')clk(bk);else clk(document.querySelector('#pList .prow:not(.dis)'));return}
  const d=document.getElementById('dlg');if(d&&d.style.display==='block'){const ch=document.querySelectorAll('#dch > *');
   if(ch.length){const L=[...ch];const q=L.find(e=>/retour|non|plus tard|partir|quitter|rien|au revoir|laisse/i.test(e.textContent));clk(window.__dern?(q||L[L.length-1]):L[0])}else clk(d);return}
  const bm=document.querySelector('#bMenu button:not([disabled])');if(bm){clk(bm);return}}catch(e){}},120);
 const o=new MutationObserver(()=>{const d=document.getElementById('dlg');if(!d)return;const t=d.innerText||'';
  if(/undefined|NaN|\[object|null\b/.test(t)&&!__mauvais.includes(t))__mauvais.push((cur&&cur.id)+' : '+t.slice(0,140))});
 o.observe(document.body,{subtree:true,childList:true,characterData:true})}"""


def main():
    choix = sys.argv[1:] or list(ETATS)
    srv = T.serveur(os.path.join(T.RACINE, 'game'))
    url = 'http://127.0.0.1:%d/index.html' % srv.server_address[1]
    bloques, total = [], 0
    with sync_playwright() as pw:
        b = pw.chromium.launch()
        for nom in choix:
            ctx = b.new_context(viewport={'width': 400, 'height': 800}, service_workers='block')
            g = partie(ctx, url)
            g.js(ESPION)
            g.js('(f)=>{Object.assign(F(),f);S.money=5000;S.bag.lumisphere=20;S.bag.supersirop=20;refreshNPCs();try{saveGame()}catch(e){}}', ETATS[nom])
            base = g.js('()=>JSON.stringify(S.flags)')
            cartes = g.js('()=>Object.keys(MAPS)')
            n_err0 = len(g.console)
            for cid in cartes:
                if cid in ('arena', 'gal'):
                    continue
                cibles = g.js(CIBLES, cid)
                for c in cibles:
                    total += 1
                    # on remet les drapeaux de l'étape (une discussion peut faire avancer l'histoire) et on soigne l'équipe
                    g.js('(f)=>{S.flags=JSON.parse(f);S.party.forEach(m=>{m.hp=m.mhp;m.status=null});refreshNPCs()}', base)
                    g.js(PARLE, [cid] + c)
                    ok = g.attendre(g.libre(), 200)
                    if not ok:
                        g.js('()=>{window.__dern=1}'); ok = g.attendre(g.libre(), 60); g.js('()=>{window.__dern=0}')
                    if not ok:
                        ov = g.js('()=>[...document.querySelectorAll(".ov.show")].map(e=>e.id)')
                        if any(o in ('rap', 'job', 'dna', 'crane', 'esc', 'stair', 'grue') for o in ov):
                            print('   mini-jeu (normal, joué par d’autres tests)', nom, cid, c[:2], ov)
                        diag = g.js(T.DIAG)
                        if not any(o in ('rap', 'job', 'dna', 'crane', 'esc', 'stair', 'grue') for o in ov):
                            bloques.append('%s/%s %s %s,%s %s' % (nom, cid, c[0], c[1], c[2], diag))
                            print('   BLOQUÉ', bloques[-1])
                        # on débloque : on ferme ce qui est ouvert et on recharge la partie sauvegardée
                        g.p.reload(); g.attendre('document.getElementById("bCont").style.display==="inline-block"', 60)
                        g.js('()=>document.getElementById("bCont").click()'); g.attendre(g.libre(), 60); g.js(ESPION)
                    if len(g.console) > n_err0:
                        for e in g.console[n_err0:]: print('   ERREUR', nom, cid, c[:2], e[:300])
                        n_err0 = len(g.console)
            mauvais = g.js('()=>window.__mauvais||[]')
            for t in mauvais: print('   TEXTE', nom, t)
            verif('%s : aucune erreur JS' % nom, not g.console, '%d erreur(s)' % len(g.console))
            verif('%s : aucun texte cassé' % nom, not mauvais, '%d' % len(mauvais))
            ctx.close()
        b.close()
    verif('aucun blocage (%d interactions)' % total, not bloques, '%d bloquée(s)' % len(bloques))
    print('%d/%d vérifications OK' % (sum(OK), len(OK)))
    sys.exit(0 if all(OK) else 1)


if __name__ == '__main__':
    main()
