"""Headless smoke test: loads index.html and exercises the main flows for both roles.
Run:  pip install playwright && playwright install chromium && python tests/smoke_test.py
"""
import pathlib, sys
from playwright.sync_api import sync_playwright

ROOT = pathlib.Path(__file__).resolve().parent.parent
errors = []

def check(cond, msg):
    if not cond:
        errors.append("FAIL: " + msg)

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page(viewport={"width": 1280, "height": 900})
    page.on("pageerror", lambda e: errors.append("PAGEERROR: " + str(e)))
    page.goto((ROOT / "index.html").as_uri())
    ev = page.evaluate

    # --- data rules -------------------------------------------------------
    check(ev("SV.filter(s=>!ONL.has(C[s.c].e)&&s.mode!='in').length") == 0, "in-person-only services must not offer online")
    check(ev("SV.filter(s=>!ONL.has(C[s.c].e)&&LOCS(s).includes('online')).length") == 0, "no online location for in-person services")
    ev("S.f.city=9")  # Unaizah
    check(ev("filt().filter(s=>!(s.sv.includes(9)||s.mode=='online'||(s.mode=='both'&&ONL.has(C[s.c].e)))).length") == 0,
          "Unaizah results must be local or genuinely remote")
    ev("S.f.city=0")

    # --- seeker flows -----------------------------------------------------
    ev("catGo(ci('Nail Artist'))")
    ev("go('service', filt()[0].id)")
    check(ev("S.drw!=null"), "service drawer opens on the provider profile")
    ev("confirmBook()")
    check(ev("S.dr2.err") != "", "booking requires a date")
    ev("dset('date',ad(TODAY,3));dset('time','16:00');dset('loc','home');S.dr2.addr='Al Narjis';confirmBook()")
    check(ev("S.bk[S.bk.length-1].status") == "Pending", "booking is created as Pending")
    ev("S.modal='';go('bookings')")
    ev("bs('B5','Cancelled')")
    check(ev("S.bk.find(b=>b.id=='B5').status") == "Cancelled", "client can cancel a pending booking")
    ev("bs('B1','Completed')")
    check(ev("S.bk.find(b=>b.id=='B1').status") == "Confirmed", "invalid status transition is rejected")
    ev("go('reqd','R22')"); ev("accOf('O2')")
    check(ev("S.rq.find(q=>q.id=='R22').st") == "Accepted", "accepting an offer moves the request to Accepted")
    ev("postOpen()")
    ev("S.dr.g=0;S.dr.k=ci('Photographer');nextS()")
    ev("document.querySelector('#d1').value='Graduation shoot';document.querySelector('#d2').value='Two hours of coverage at campus';nextS()")
    ev("document.querySelector('#d6').value='2026-12-01';nextS()")
    ev("document.querySelector('#m1').value='700';nextS()"); ev("nextS()")
    check(ev("S.rq.some(r=>r.t[0]=='Graduation shoot')"), "request published")

    # --- provider flows ---------------------------------------------------
    ev("setRole('provider')")
    for pg in ["home", "requests", "bookings", "business", "dash", "inbox"]:
        ev(f"go('{pg}')")
        check("Maryam" not in ev("document.body.innerText"), f"provider page '{pg}' must not show the account owner's name")
    ev("bs('B3','Confirmed')")
    check(ev("S.bk.find(b=>b.id=='B3').status") == "Confirmed", "provider can accept a pending booking")
    ev("go('reqp','R1')")
    ev("document.querySelector('#op').value=2500;document.querySelector('#od').value=10;document.querySelector('#om').value='ok';subOf('R1')")
    check(ev("S.of.some(o=>o.rid=='R1'&&o.mine)"), "provider can send an offer")

    # --- language ---------------------------------------------------------
    ev("setLang()")
    check(ev("document.documentElement.dir") == "rtl", "Arabic switches the page to RTL")
    browser.close()

if errors:
    print("\n".join(errors)); sys.exit(1)
print("OK: smoke test passed")
