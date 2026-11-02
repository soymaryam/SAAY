/* Toasts, notifications store, page navigation, role and language switching. */
function toast(m){const e=document.createElement('div');e.className='ts';e.textContent=m;$('#toasts').append(e);setTimeout(()=>e.remove(),3200)}
const NI={offer:'M3 12l9-9h9v9l-9 9zM15 8h.01',accepted:'M5 13l4 4L19 7',completed:'M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z',review:'M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z',status:'M12 21a9 9 0 100-18 9 9 0 000 18M12 8v5l3 2',booking:'M4 6h16v14H4zM4 10h16M8 3v4M16 3v4'};
function notify(r,q,type,p,a){if(!NI[type])return r==S.role&&toast(q);S.nt.unshift({r,type,x:q,at:Date.now(),s:0,p,a});if(r==S.role)toast(ln(q.includes('|')?q:q+'|'+q))}
const rel=ts=>{const m=Math.floor((Date.now()-ts)/6e4);return m<1?x('Just now','الآن'):m<60?x(m+'m ago','منذ '+n(m)+' د'):m<1440?x(Math.floor(m/60)+'h ago','منذ '+n(Math.floor(m/60))+' س'):x(Math.floor(m/1440)+'d ago','منذ '+n(Math.floor(m/1440))+' ي')};
const closeAll=()=>{S.nm=0;S.menu=0};
const go=(p,q)=>{let dv=null;if(p=='service'){dv=q;p='prov';q=SV[dv].pid}closeAll();S.rvn=3;S.rvd=3;S.drw=dv;if(dv!=null)S.dr2={tier:1,ad:[],hrs:0,date:'',time:'',loc:'',addr:'',notes:'',brief:'',dl:'',extra:'',err:''};if(S.page!=p||S.p!=q)S.hist.push([S.page,S.p]);if(p=='bookings'&&!S.keepbk)S.bkp=null;S.keepbk=0;S.page=p;S.p=q==null?null:q;S.modal='';scrollTo(0,0);render()};
const back=()=>{const h=S.hist.pop();if(!h)return go('home');S.page=h[0];S.p=h[1];S.modal='';S.drw=null;render()};
const ROLEP={seeker:['profile','reqd'],provider:['business','dash','reqp']};
const setRole=r=>{closeAll();S.bkp=null;S.hist=[];S.pm=0;S.role=r;S.modal='';if(ROLEP[r=='seeker'?'provider':'seeker'].includes(S.page))S.page='home';render();toast(t(r)+' ✓')};
const setLang=()=>{closeAll();S.lang=ar()?'en':'ar';render()};
const sav=i=>{const k=S.saved.indexOf(i);k<0?S.saved.push(i):S.saved.splice(k,1);render()};
const catGo=i=>{S.f={...S.f,q:'',g:String(C[i].g),k:String(i)};S.lim=24;go('explore')};
const unread=()=>Object.values(S.th).filter(h=>isP()?h.prov==PROV:h.cust==ME).reduce((a,h)=>a+h.ur[S.role],0);
