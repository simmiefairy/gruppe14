(function() {
  'use strict';

  function myFunction() {
    var input = document.getElementById('myInput');
    var filter = (input.value || '').toUpperCase();
    var ul = document.getElementById('myUL');
    var li = ul.getElementsByTagName('li');
    var visibleCount = 0;

    // Skjul alt hvis søgefeltet er tomt
    if (filter.length === 0) {
      document.querySelector('.list-container').style.display = 'none';
      document.getElementById('noProductsSection').style.display = 'none';
      return;
    }

    // Vis list-container når der skrives
    document.querySelector('.list-container').style.display = 'block';

    for (var i = 0; i < li.length; i++) {
      var a = li[i].getElementsByTagName('a')[0];
      var txtValue = a.textContent || a.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        li[i].style.display = '';
        visibleCount++;
      } else {
        li[i].style.display = 'none';
      }
    }

    // Vis "ingen produkter" hvis ingen resultater
    if (visibleCount === 0) {
      document.querySelector('.list-container').style.display = 'none';
      document.getElementById('noProductsSection').style.display = 'block';
      document.getElementById('searchTerm').textContent = input.value;
    } else {
      document.getElementById('noProductsSection').style.display = 'none';
      document.getElementById('count').textContent = visibleCount;
    }
  }

  function closeNoProducts() {
    document.getElementById('noProductsSection').style.display = 'none';
    document.querySelector('.list-container').style.display = 'none';
    var input = document.getElementById('myInput');
    if (input) input.value = '';
  }

  document.addEventListener('DOMContentLoaded', function() {
    var inputEl = document.getElementById('myInput');
    var closeBtn = document.querySelector('.close-button');

    if (inputEl) {
      // Bevarer 'keyup' så funktionaliteten matcher eksisterende opførsel
      inputEl.addEventListener('keyup', myFunction);
    }

    if (closeBtn) {
      closeBtn.addEventListener('click', closeNoProducts);
    }
  });

})();
