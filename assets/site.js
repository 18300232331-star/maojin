(function(){
  'use strict';
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  window.dataLayer = window.dataLayer || [];

  /* mobile nav */
  var burger = document.getElementById('burger'), nav = document.getElementById('mainnav');
  if (burger && nav) burger.addEventListener('click', function(){
    var open = nav.classList.toggle('open');
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
  });

  /* conversion events: WhatsApp / email / phone clicks (event delegation) */
  document.addEventListener('click', function(e){
    var a = e.target && e.target.closest ? e.target.closest('a') : null;
    if (!a) return;
    var h = a.getAttribute('href') || '';
    if (h.indexOf('wa.me') > -1)   window.dataLayer.push({'event':'click_whatsapp'});
    if (h.indexOf('mailto:') > -1) window.dataLayer.push({'event':'click_email'});
    if (h.indexOf('tel:') > -1)    window.dataLayer.push({'event':'click_phone'});
  });

  /* back to top */
  var toTop = document.getElementById('toTop');
  if (toTop){
    window.addEventListener('scroll', function(){ toTop.classList.toggle('show', window.scrollY > 400); }, {passive:true});
    toTop.addEventListener('click', function(){ window.scrollTo({top:0, behavior: reduce?'auto':'smooth'}); });
  }

  /* product-detail gallery */
  var main = document.getElementById('pdMain');
  if (main){
    var thumbs = document.querySelectorAll('.pd-thumbs img');
    for (var t=0;t<thumbs.length;t++) (function(el){
      el.addEventListener('click', function(){
        main.src = el.getAttribute('src');
        for (var q=0;q<thumbs.length;q++) thumbs[q].classList.toggle('on', thumbs[q]===el);
      });
    })(thumbs[t]);
  }

  /* product category filter */
  var pbtns = document.querySelectorAll('[data-filter]');
  if (pbtns.length){
    var blocks = document.querySelectorAll('.cat-block');
    function filterProducts(val){
      for (var i=0;i<pbtns.length;i++) pbtns[i].classList.toggle('on', pbtns[i].getAttribute('data-filter')===val);
      for (var b=0;b<blocks.length;b++)
        blocks[b].style.display = (val==='all' || blocks[b].getAttribute('data-cat')===val) ? '' : 'none';
    }
    for (var i2=0;i2<pbtns.length;i2++) (function(btn){
      btn.addEventListener('click', function(){ filterProducts(btn.getAttribute('data-filter')); });
    })(pbtns[i2]);
    var m = location.search.match(/[?&]cat=(\d)/);
    if (m) filterProducts(m[1]);
  }

  /* news category filter */
  var nbtns = document.querySelectorAll('[data-nfilter]');
  if (nbtns.length){
    var cards = document.querySelectorAll('#newsGrid .news-card');
    for (var n=0;n<nbtns.length;n++) (function(btn){
      btn.addEventListener('click', function(){
        var val = btn.getAttribute('data-nfilter');
        for (var q=0;q<nbtns.length;q++) nbtns[q].classList.toggle('on', nbtns[q]===btn);
        for (var c=0;c<cards.length;c++)
          cards[c].style.display = (val==='all' || cards[c].getAttribute('data-ncat')===val) ? '' : 'none';
      });
    })(nbtns[n]);
  }

  /* preselect product category on contact page */
  var sel = document.querySelector('select.cat-select');
  if (sel && location.search){
    var mc = location.search.match(/[?&]cat=(\d)/);
    if (mc) sel.value = mc[1];
  }

  /* lead forms -> external form (normal POST; preview endpoint is a placeholder, replace before publish) */
  var forms = document.querySelectorAll('form.lead');
  for (var f=0;f<forms.length;f++) (function(form){
    var pageInput = form.querySelector('.js-page');
    if (pageInput) pageInput.value = location.pathname + location.search;
    form.addEventListener('submit', function(ev){
      var msg = form.querySelector('.form-msg');
      var name = form.name.value.trim(), phone = form.phone.value.trim(),
          email = form.email.value.trim(), need = form.need.value.trim();
      var digits = phone.replace(/[^\d]/g,'');
      function fail(txt){ if(msg){ msg.className='form-msg err'; msg.textContent = txt; } }
      if (!name) { ev.preventDefault(); return fail('Please enter your name.'); }
      if (digits.length < 7 || digits.length > 16) { ev.preventDefault(); return fail('Please enter a valid phone / WhatsApp number.'); }
      if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { ev.preventDefault(); return fail('That email address looks incorrect.'); }
      if (need.length < 4) { ev.preventDefault(); return fail('Please describe what you need.'); }
      if (!window.fetch || !window.FormData) return;  // let the browser POST normally
      /* Preview: external endpoint placeholder — let the browser POST normally. */
      return;
      var btn = form.querySelector('button[type=submit]');
      if (btn){ btn.disabled = true; btn.dataset.label = btn.textContent; btn.textContent = '...'; }
  })(forms[f]);
})();
