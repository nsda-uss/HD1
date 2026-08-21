/*
 * sidebar.js — Barra lateral única y compartida
 * Habilidades Directivas I · MGTO BA01
 *
 * Este es el ÚNICO lugar donde se define el markup, los estilos y los
 * enlaces de la barra lateral. Todas las páginas del sitio (index.html,
 * belbin_test.html, liderazgo_test.html, disc_test.html,
 * contrato_equipo.html) cargan este mismo archivo, por lo que cualquier cambio futuro (agregar un
 * instrumento, cambiar un ícono, renombrar una sección) se hace una
 * sola vez, aquí, y se refleja automáticamente en todo el sitio.
 */
(function () {
  var NAV_ITEMS = [
    {
      href: 'index.html',
      label: 'Inicio',
      title: 'Inicio',
      icon: '<path d="M3 11l9-8 9 8"/><path d="M5 10v10h14V10"/>'
    },
    {
      href: 'belbin_test.html',
      label: 'Roles',
      title: 'Test de Roles de Equipo (Belbin)',
      icon: '<path d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>'
    },
    {
      href: 'liderazgo_test.html',
      label: 'Liderazgo',
      title: 'Test de Estilos de Liderazgo (Goleman)',
      icon: '<circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>'
    },
    {
      href: 'disc_test.html',
      label: 'DISC',
      title: 'Test DISC de Comportamiento',
      icon: '<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>'
    },
    {
      href: 'contrato_equipo.html',
      label: 'Contrato',
      title: 'Contrato de Equipo',
      icon: '<path d="M9 12l2 2 4-4"/><path d="M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9c1.5 0 2.92.37 4.17 1.02"/><path d="M16 5l3 3-3 3"/>'
    },
    {
      href: 'simulador_cmi.html',
      label: 'CMI',
      title: 'Simulador de Cuadro de Mando Integral',
      icon: '<line x1="4" y1="20" x2="4" y2="12"/><line x1="10" y1="20" x2="10" y2="6"/><line x1="16" y1="20" x2="16" y2="14"/><line x1="4" y1="20" x2="16" y2="20"/>'
    },
    {
      href: 'https://www.16personalities.com/es',
      label: '16P',
      title: '16Personalities (recurso externo)',
      icon: '<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>',
      external: true
    }
  ];

  var CSS = [
    '.site-sidebar{position:fixed;top:0;left:0;bottom:0;width:64px;background:#0c2733;',
    'display:flex;flex-direction:column;align-items:center;padding-top:22px;gap:4px;',
    'z-index:100;border-right:1px solid rgba(255,255,255,0.06);}',
    '.site-sidebar a{display:flex;flex-direction:column;align-items:center;gap:6px;',
    'text-decoration:none;color:#cfe0dd;padding:10px 4px;border-radius:6px;',
    'font-family:"IBM Plex Mono",monospace;font-size:0.6rem;letter-spacing:0.04em;',
    'transition:background .15s ease,color .15s ease;}',
    '.site-sidebar a:hover,.site-sidebar a.active{background:rgba(255,255,255,0.08);color:#fff;}',
    '.site-sidebar svg{display:block;width:18px;height:18px;}',
    '@media (max-width:600px){.site-sidebar{width:48px;}.site-sidebar a span{display:none;}}'
  ].join('');

  function currentFile() {
    var path = window.location.pathname.split('/').pop();
    return path === '' ? 'index.html' : path;
  }

  function render() {
    // Inyecta el CSS del sidebar una sola vez
    var style = document.createElement('style');
    style.setAttribute('data-source', 'sidebar.js');
    style.textContent = CSS;
    document.head.appendChild(style);

    var here = currentFile();
    var nav = document.createElement('nav');
    nav.className = 'site-sidebar';

    NAV_ITEMS.forEach(function (item) {
      var a = document.createElement('a');
      a.href = item.href;
      a.title = item.title;
      if (!item.external && item.href === here) {
        a.classList.add('active');
      }
      if (item.external) {
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
      }
      a.innerHTML =
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">' +
        item.icon +
        '</svg><span>' + item.label + '</span>';
      nav.appendChild(a);
    });

    document.body.insertBefore(nav, document.body.firstChild);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', render);
  } else {
    render();
  }
})();
