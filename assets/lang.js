// Language dropdown (gloves-style toggle) - hardened 2026-11-01:
// click toggles; outside click / Escape closes; menu links close on tap;
// CSS :focus-within in site-additions.css keeps the menu usable if JS fails.
(function(){
  var btn=document.getElementById('langBtn'),menu=document.getElementById('langMenu');
  if(!btn||!menu){return;}
  if(btn.dataset.langBound){return;} btn.dataset.langBound='1';
  btn.addEventListener('click',function(e){e.stopPropagation();menu.classList.toggle('open');btn.setAttribute('aria-expanded',menu.classList.contains('open')?'true':'false');});
  menu.addEventListener('click',function(e){e.stopPropagation();menu.classList.remove('open');btn.setAttribute('aria-expanded','false');});
  document.addEventListener('click',function(){menu.classList.remove('open');btn.setAttribute('aria-expanded','false');});
  document.addEventListener('keydown',function(e){if(e.key==='Escape'){menu.classList.remove('open');btn.setAttribute('aria-expanded','false');}});
})();
