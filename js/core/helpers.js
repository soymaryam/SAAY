/* DOM, formatting and i18n helpers: $, v, esc, t, n, sar, ln, cn, gn, cy, fd, ago, av. */
const $=s=>document.querySelector(s),v=i=>($('#'+i)||{}).value||'',ar=()=>S.lang=='ar',H='href="javascript:void 0"',x=(a,b)=>ar()?b:a;
const esc=s=>String(s).replace(/[&<>"]/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[m]));
const yr=y=>Number(y).toLocaleString(ar()?'ar-SA':'en-US',{useGrouping:false}),t=k=>T[k]?T[k][+ar()]:k,n=q=>Number(q).toLocaleString(ar()?'ar-SA':'en-US'),sar=q=>n(q)+' '+t('sar');
const ln=p=>p.split('|')[+ar()],cn=i=>ln(C[i].e+'|'+C[i].a),gn=g=>ln(G[g][0]),cy=i=>ln(CT[i]);
const fd=s=>new Date(s).toLocaleDateString(ar()?'ar-SA-u-ca-gregory':'en-GB',{day:'numeric',month:'short',year:'numeric'});
const ago=d=>{const k=diff(d);return k<=0?x('Today','اليوم'):k==1?x('Yesterday','أمس'):x(k+' days ago','منذ '+n(k)+' أيام')};
const LOGO=`<svg viewBox="0 0 24 24" width="60%" height="60%" fill=none stroke=currentColor stroke-width=2.2 stroke-linecap=round stroke-linejoin=round aria-hidden=true><path d="M5 17V7l7 7 7-7v10"/></svg>`,HEART=on=>`<svg width=18 height=18 viewBox="0 0 24 24" fill="${on?'currentColor':'none'}" stroke=currentColor stroke-width=1.9 stroke-linejoin=round aria-hidden=true><path d="M12 20s-7-4.4-7-10a4 4 0 017-2.4A4 4 0 0119 10c0 5.6-7 10-7 10z"/></svg>`;
const av=(p,c='')=>p===PROV?`<span class="av logo ${c}" aria-hidden=true>${LOGO}</span>`:`<span class="av ${c}" aria-hidden=true>${p.split('|')[0].split(' ').map(w=>w[0]).join('').slice(0,2)}</span>`;
