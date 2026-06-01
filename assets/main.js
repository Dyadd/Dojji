(function () {
  var search = document.getElementById('search');
  var list = document.getElementById('essay-list');
  var noResults = document.getElementById('no-results');
  if (!search || !list) return;

  var items = Array.prototype.slice.call(list.querySelectorAll('li'));

  function norm(s) { return (s || '').toLowerCase(); }

  function filter(q) {
    q = norm(q.trim());
    var visible = 0;
    items.forEach(function (li) {
      if (!q) {
        li.classList.remove('hidden');
        visible++;
        return;
      }
      var hay = norm(li.getAttribute('data-search') || li.textContent);
      var match = hay.indexOf(q) !== -1;
      li.classList.toggle('hidden', !match);
      if (match) visible++;
    });
    if (noResults) noResults.classList.toggle('hidden', visible > 0);
  }

  search.addEventListener('input', function (e) { filter(e.target.value); });

  // Keyboard shortcut: "/" focuses search
  document.addEventListener('keydown', function (e) {
    if (e.key === '/' && document.activeElement !== search) {
      e.preventDefault();
      search.focus();
    }
    if (e.key === 'Escape' && document.activeElement === search) {
      search.value = '';
      filter('');
      search.blur();
    }
  });

  // Auto-focus on load
  if (window.matchMedia('(min-width: 600px)').matches) search.focus();
})();
