/* Page registry, footer, render loop, global listeners and boot. */
const PAGES={home,explore,prov,inbox,reqd,reqp,business,profile,dash:dashP,bookings:bkPage,requests:()=>isP()?preq():sreq()};
const foot=()=>`<footer><div class=w><span class=lgc style="display:flex"><img src="assets/logo/lockup-cream.png" alt="SAAY سعي" height=56></span><span>© 2026 SAAY · ${x('Saudi Arabia','المملكة العربية السعودية')}</span></div></footer>`;
function render(){document.documentElement.lang=S.lang;document.documentElement.dir=ar()?'rtl':'ltr';const f=document.activeElement&&document.activeElement.id,y=scrollY,ds=($('.dbody')||{}).scrollTop;const mainH=PAGES[S.page]();$('#app').innerHTML=hdr()+'<main>'+mainH+'</main>'+foot()+(S.modal=='cmp'?cmpM():S.modal)+(S.drw!=null?drawer():'')+(S.pm?pm():'');
document.querySelectorAll('input[type=date],input[type=time]').forEach(i=>{i.lang='en';i.dir='ltr'});
if(f&&$('#'+f)&&f!='fq')try{$('#'+f).focus()}catch(e){}
const op=!!(S.modal||S.pm||S.drw!=null);document.querySelectorAll('header,main,footer').forEach(e=>e.inert=op);const md=$('.md')||$('.drw');if(op&&md&&!md.contains(document.activeElement))(md.classList.contains('drw')?md.querySelector('.dh button'):md.querySelector('input:not([type=file]),select,textarea')||md.querySelector('button')||md).focus();
if(ds&&$('.dbody'))$('.dbody').scrollTop=ds;const mb=$('.mbody');if(mb)mb.scrollTop=mb.scrollHeight;scrollTo(0,y)}
document.addEventListener('click',()=>{if(S.menu||S.nm){closeAll();render()}});document.addEventListener('keydown',e=>{if(e.key=='Escape'&&(S.menu||S.nm||S.pm||S.modal||S.drw!=null)){closeAll();S.pm=0;S.modal='';S.drw=null;render()}});
render();
