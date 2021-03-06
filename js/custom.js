document.addEventListener('DOMContentLoaded', () => {
  // anchors for headings
  document.querySelectorAll('.entry-content h2, .entry-content h3, .entry-content h4, .entry-content h5').forEach((h) => {
    h.innerHTML = `${h.innerText} <a class="heading-anchor" href="#${h.id}">🔗</a>`;
  });

  // clickable images in index
  document.querySelectorAll('.blog-index article').forEach((art) => {
    const href = art.querySelector('a').getAttribute('href');
    const img = art.querySelector('img');
    if(!img) return;

    const a = document.createElement('a');
    a.setAttribute('href', href);
    img.parentNode.insertBefore(a, img);
    a.appendChild(img);
  });

  // aside remove
  setInterval(() => {
    if(window.matchMedia('min-width:1520px')) {
      const top = (window.pageYOffset || document.scrollTop)  - (document.clientTop || 0);
      if(top > 1000) {
        document.body.classList.add('aside-hidden');
      } else {
        document.body.classList.remove('aside-hidden');
      }
    }
  }, 1000);
});

$(function(){
  // скрыть текст, чтобы посмотреть на заголовки (по Ильяхову)
  if(location.host == 'localhost:1313'){
    $('aside').append(
      $('<button class="hide-text-toggle">Скрыть текст</button>').
        on('click', () => { $('body').toggleClass('hide-text'); })
    );
  }

  // оглавление
  setTimeout(() => {
    $('.contents').each((i, elem) => {
      const content = $(elem).find('.contents-data');
      const headerSelector = $(elem).data('header');

      $('.entry-content').find(headerSelector).each((i, header) => {
        const title = $(header).text().replace(' 🔗', '');
        const link = $(header).find('.heading-anchor').attr('href');
        content.append(`<li><a href="${link}">${title}</li>`);
      });
    });
  }, 50);

  // цель на клик по раскрывалке
  $('.entry-content').on('click', '.collapsed', function(){
    ym(51681281, 'reachGoal', 'spoiler', {spoiler: $(this).text()});
  });

  // подсказка на первом спойлере
  const firstSpoiler = $('.entry-content .spoiler-link').first();
  if (firstSpoiler.length > 0) firstSpoiler.text(firstSpoiler.text() + ' (нажмите, чтобы посмотреть)');
});