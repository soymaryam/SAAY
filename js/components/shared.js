/* Shared UI primitives: dialog, confirm, KPI tile, section header, review card, profile header, details card, chat opener. */
/* ---- shared components (single canonical implementations) ---- */
const mdl=(inner,cls='')=>`<div class=ov role=dialog aria-modal=true><div class="md ${cls}" tabindex=-1>${inner}</div></div>`;
const cfm=(msg,act,label)=>{S.modal=mdl(`<h3>${x('Please confirm','يرجى التأكيد')}</h3><p>${msg}</p><div class=row><button class="b d" onclick="${act}">${label}</button><button class="b o" onclick="S.modal='';render()">${x('Keep it','تراجع')}</button></div>`);render()};
const kpi=(a,b,note='',on='')=>{const tg=on?'button':'div';return `<${tg} class="bx ${on?'k':''}" ${on?`onclick="${on}"`:''}><div class=num>${a}</div><span class=mu>${b}</span>${note?`<br><span class="sm okt">${note}</span>`:''}</${tg}>`};
const sh=(title,act='')=>`<div class="row shr"><h2 class=sh style="margin:0">${title}</h2>${act}</div>`;
const revCard=(r,svc)=>`<div class=bx><div class=row><span><b>${ln(r.n)}</b> <span class=stars>${stars(r.r)}</span></span><span class="mu sm">${r.d?fd(r.d):''}${svc?' · '+cn(SV[r.sid].c):''}</span></div><p style="margin:6px 0 0">${esc(r.x)}</p></div>`;
const pHead=(nameP,sub,facts,actions)=>`<div class=ph2>${av(nameP,'l')}<div class=ph2t><h1 class="pt m0">${ln(nameP)}</h1><p class=mu style="margin:0">${sub}</p></div><div class=ph2a>${actions}</div></div><div class=facts>${facts.map(([a,b])=>`<div><b>${a}</b><span class="mu sm">${b}</span></div>`).join('')}</div>`;
const dCard=rows=>`<div class=bx><h3>${x('Details','التفاصيل')}</h3>${rows.map(([k,vv])=>`<p class=sm style="margin:0 0 12px"><span class=mu>${k}</span><br>${vv}</p>`).join('')}</div>`;
const chat=(key,sid,cust,prov)=>{if(!S.th[key])S.th[key]=TH(sid,cust,prov,[],[0,0]);S.th0=key;if(isP())S.thT=hasWork(S.th[key])?'client':'inq';go('inbox')};
const askBs=(id,s)=>cfm(s=='Declined'?x('Decline this booking request? The client will be notified.','رفض طلب الحجز؟ سيتم إشعار العميل.'):x('Cancel this booking? The provider will be notified.','إلغاء الحجز؟ سيتم إشعار مقدم الخدمة.'),`bs('${id}','${s}')`,s=='Declined'?t('reject'):x('Cancel booking','إلغاء الحجز'));
const askClose=id=>cfm(x('Close this request? Pending offers will be declined and providers can no longer respond.','إغلاق الطلب؟ سيتم رفض العروض المعلقة ولن يتمكن مقدمو الخدمة من الرد.'),`closeRq('${id}')`,x('Close request','إغلاق الطلب'));
const closeRq=id=>{S.rq.find(q=>q.id==id).st='Closed';notify('seeker',x('Your request was closed','تم إغلاق طلبك'),'status');S.of.forEach(o=>{if(o.rid==id&&o.st=='Pending')o.st='Declined'});S.modal='';go('requests')};
const stat0=(r)=>['Open','Offer Received'].includes(r.st);
