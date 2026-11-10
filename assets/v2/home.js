(function(){
  var reduz = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var topo = document.getElementById('topo'), wa = document.querySelector('.wa-fixo');
  var btn = document.querySelector('.menu-btn'), menu = document.getElementById('menu');
  function rolou(){
    var y = window.scrollY;
    topo.classList.toggle('solido', y > 60);
    wa.classList.toggle('on', y > window.innerHeight * 0.6);
    var linha = document.querySelector('.passos-linha i');
    if (linha && !reduz){
      var r = linha.parentNode.getBoundingClientRect();
      var p = Math.min(1, Math.max(0, (window.innerHeight * 0.85 - r.top) / (window.innerHeight * 0.6)));
      linha.style.setProperty('--p', p.toFixed(3));
    }
    var foto = document.querySelector('.sobre-foto img');
    if (foto && !reduz && window.innerWidth > 900){
      var fr = foto.parentNode.getBoundingClientRect();
      foto.style.transform = 'scale(1.08) translateY(' + ((fr.top + fr.height/2 - window.innerHeight/2) * -0.06).toFixed(1) + 'px)';
    }
  }
  window.addEventListener('scroll', rolou, {passive:true}); rolou();
  btn.addEventListener('click', function(){
    var a = menu.classList.toggle("aberto"); topo.classList.toggle("aberto", a);
    btn.setAttribute('aria-expanded', a); btn.setAttribute('aria-label', a ? 'Fechar menu' : 'Abrir menu');
  });
  menu.addEventListener('click', function(e){ if (e.target.closest('a')) { menu.classList.remove('aberto'); topo.classList.remove('aberto'); btn.setAttribute('aria-expanded', false); } });
  var alvos = document.querySelectorAll('.rv, .onda');
  if (reduz || !('IntersectionObserver' in window)) { alvos.forEach(function(el){ el.classList.add('on'); }); return; }
  var io = new IntersectionObserver(function(es){
    es.forEach(function(e){ if (e.isIntersecting){ e.target.classList.add('on'); io.unobserve(e.target); } });
  }, {threshold: 0.12, rootMargin: '0px 0px -40px 0px'});
  alvos.forEach(function(el){ io.observe(el); });
})();
