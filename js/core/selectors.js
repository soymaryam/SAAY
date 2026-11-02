/* Small data selectors (pricing, packages, medians, role checks). */
const budT=b=>b.neg?t('neg'):b.hi&&b.hi!=b.lo?sar(b.lo)+' – '+sar(b.hi):sar(b.lo);
const tgl=s=>(s.tg||TAG[s.j%14])[+ar()],mine=()=>SV.filter(s=>s.pv==PROV),isP=()=>S.role=='provider',PB=()=>S.bk.filter(b=>SV[b.sid].pv==PROV),MB=()=>S.bk.filter(b=>b.cust==ME);
const median=c=>{const a=SV.filter(s=>s.c==c).map(s=>s.price).sort((p,q)=>p-q);return a[a.length>>1]};
const pk=s=>s.pv==PROV?S.pc.packs:[1,1.8,3],rushP=s=>s.pv==PROV?S.pc.rush:25;
