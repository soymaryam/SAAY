/* Canonical status labels, badge tones and the allowed status transitions (glossary). */
const stc=s=>({Completed:'ok',Confirmed:'ok',Accepted:'ok',Delivered:'ok',Cancelled:'bad',Declined:'bad',Pending:'w','Offer Received':'w'}[s]||'');
T.Delivered=['Delivered','تم التسليم'];T['In Progress']=['In progress','قيد التنفيذ'];T['Offer Received']=['Offers received','وصلتها عروض'];T.Closed=['Closed','مغلقة'];T.Declined=['Declined','مرفوض'];T.Cancelled=['Cancelled','ملغي'];T.Accepted=['Accepted','مقبول'];
/* GLOSSARY. Booking: Pending (awaiting provider) > Confirmed (accepted, not started) > In progress > Delivered (awaiting client approval) > Completed (client approved). Declined = provider refused; Cancelled = client withdrew. Request: Open > Offers received > Accepted > Closed. Offer: Pending / Accepted / Declined. */
const TR={seeker:{Pending:['Cancelled'],Confirmed:['Cancelled'],Delivered:['Completed','In Progress']},provider:{Pending:['Confirmed','Declined'],Confirmed:['In Progress'],'In Progress':['Delivered']}};
const stl=s=>`<span class="st ${stc(s)}">${t(s)}</span>`;
