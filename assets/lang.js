// Language dropdown (gloves-style toggle)
(function(){
  var btn=document.getElementById('langBtn'),menu=document.getElementById('langMenu');
  if(!btn||!menu){return;}
  btn.addEventListener('click',function(e){e.stopPropagation();menu.classList.toggle('open');btn.setAttribute('aria-expanded',menu.classList.contains('open')?'true':'false');});
  document.addEventListener('click',function(){menu.classList.remove('open');});
  document.addEventListener('keydown',function(e){if(e.key==='Escape'){menu.classList.remove('open');}});
})();
