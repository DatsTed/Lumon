"""Test des combats à plusieurs (2 contre 2, Snow 3 contre 3, Captain), des stades de fusion,
de la musique techno des Kétosaures et des évolutions des Lumons uniques.
Usage : python tools/test_combats.py"""
import os, sys; sys.path.insert(0, os.path.dirname(os.path.abspath(__file__))); sys.stdout.reconfigure(encoding='utf-8')
import test as T
from test_histoire import partie, verif, OK
from playwright.sync_api import sync_playwright

def main():
    srv = T.serveur(os.path.join(T.RACINE, 'game'))
    url = 'http://127.0.0.1:%d/index.html' % srv.server_address[1]
    with sync_playwright() as pw:
        b = pw.chromium.launch(); ctx = b.new_context(viewport={'width': 400, 'height': 800}, service_workers='block')
        g = partie(ctx, url)
        g.js('()=>{for(const sp of ["moulefrit","hautfourno","terrillon","witloof"]){const m=mkMon(sp,32);S.party.push(m)}S.party.forEach(m=>{if(m.lv<32){m.lv=32;}calc(m);m.hp=m.mhp})}')
        # --- duo 2 contre 2
        g.js('''()=>{window.__res=null;window.__slots=0;const o=duoPlace;duoPlace=(...a)=>{window.__slots++;return o(...a)};
           runScript(async()=>{window.__res=await battle({duo:2,music:'keto',trainer:{name:'Sbires',key:'keto',smart:.4,prize:10,mons:[mkMon('scorion',14),mkMon('pigeolet',14),mkMon('terrilou',15)]}})})}''')
        ok = g.attendre('window.__res&&' + g.libre(), 600)
        verif('duo 2 contre 2 : combat jusqu’au bout', ok, 'résultat %s, %s Lumons placés' % (g.js('()=>window.__res'), g.js('()=>window.__slots')))
        verif('duo : 4 Lumons sur le terrain + remplaçant ennemi', g.js('()=>window.__slots>=5'))
        # --- Snow 3 contre 3
        g.js('()=>{S.party.forEach(m=>{m.hp=m.mhp;m.status=null;m.moves.forEach(x=>x.pp=MV[x.id].pp)});window.__res=null;window.__slots=0;window.__song=null;runScript(async()=>{const p=snowBattle(30);setTimeout(()=>window.__song=Object.keys(SONGS).find(k=>SONGS[k]===song),4000);window.__res=await p})}')
        ok = g.attendre('window.__res&&' + g.libre(), 900)
        verif('Snow : 3 contre 3 avec ses deux bras droits', ok and g.js('()=>window.__slots>=6'), 'résultat %s, %s placés, musique %s' % (g.js('()=>window.__res'), g.js('()=>window.__slots'), g.js('()=>window.__song')))
        verif('Snow : formes évoluées (Givrâlpha…)', g.js('()=>bossMon("givrale",32).sp==="givralpha"&&bossMon("noctiluce",30).sp==="noctilumiere"&&!!SP.krakamiral'))
        # --- Captain en duo
        g.js('()=>{S.party.forEach(m=>{m.hp=m.mhp;m.status=null;m.moves.forEach(x=>x.pp=MV[x.id].pp)});window.__slots=0;runScript(async()=>{await goMap(ROUTE3,20,9,"up");await captainScene()})}')
        verif('Captain et Pirate Bob : 2 contre 2', g.attendre('F().captain&&' + g.libre(), 600) and g.js('()=>window.__slots>=4'), g.js('()=>window.__slots'))
        # --- musique techno des Kétosaures
        g.js('()=>{window.__song=null;S.party.forEach(m=>m.hp=m.mhp);runScript(async()=>{const p=ketoBattle(null,"Yo !",[mkMon("scorion",5)],"Sbire Kétosaure");setTimeout(()=>window.__song=Object.keys(SONGS).find(k=>SONGS[k]===song),4000);await p})}')
        g.attendre(g.libre() + '&&window.__song', 300)
        verif('Kétosaures : musique techno', g.js('()=>window.__song==="keto"'), g.js('()=>window.__song'))
        # --- stades de fusion
        st = g.js('''()=>{const f=(x,y)=>{const m=fuse(mkMon(x,20),mkMon(y,20));return stageOf(m.sp)};
            return [f("chicorin","charbonnet"),f("witloof","terrillon"),f("endivaure","hautfourno"),f("chicorin","hautfourno")]}''')
        verif('fusion base+base -> 1re forme', st[0] == 0, str(st))
        verif('fusion évolué+évolué -> 2e forme', st[1] == 1)
        verif('fusion finale+finale -> forme ultime', st[2] == 2)
        verif('fusion base+finale -> 1re forme (le plus bas)', st[3] == 0)
        errs = g.console + g.js('()=>__errs')
        verif('aucune erreur console', not errs, '; '.join(e[:140] for e in errs[:3]))
        b.close()
    print('%d/%d vérifications OK' % (sum(OK), len(OK)))
    sys.exit(0 if all(OK) else 1)

if __name__ == '__main__':
    main()
