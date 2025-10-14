async function run() {
  const body = document.body;

  // HEADER
  const header = document.createElement('header');
  header.id = 'header';

  const h1 = document.createElement('h1');
  h1.className = 'header__title';
  h1.textContent = 'Превью виджета "Виджет для учебы и концентрации" Кстати, сайт сделан адаптивным!';

  const h4 = document.createElement('h4');
  h4.className = 'header__description';
  h4.textContent =
    'Это краткое описание виджета, позволяющего учиться и измерять свою продуктивность';

  header.append(h1, h4);
  body.appendChild(header);

  // MAIN
  const main = document.createElement('main');

  const contentWrapper = document.createElement('div');
  contentWrapper.className = 'wrapper content__wrapper';
  contentWrapper.id = 'content';

  const sections = [
    {
      class: 'content__wrapper--user',
      title: 'Мне, как посетителю сайта, нужна возможность',
      items: [
        'иметь редактируемый список предметов или курсов для гибкости настройки виджета',
        'отслеживать свой прогресс по изучению каждого из предметов или курсов для понимания того, как я продвинулся в изучении каждого',
        'отслеживать свою статистику концентрации и количество отвлечений для осознания своей продуктивности'
      ]
    },
    {
      class: 'content__wrapper--admin',
      title: 'Мне, как администратору сайта, нужна возможность',
      items: [
        'редактировать размеры и разрешение виджета для того, чтобы аккуратно вписать его на сайт',
        'выбрать тему виджета: светлую или темную, чтобы он соотносился с основной темой сайта',
        'быть уверенным в устойчивости кода виджета и в том, что его присутствие на сайте не создаст брешь в безопасности всего сервиса для спокойствия души'
      ]
    },
    {
      class: 'content__wrapper--dev',
      title: 'Мне, как разработчику сайта, нужна возможность',
      items: [
        'помнить статистику посетителя даже после перезахода на сайт для сохранения статистики по пользователю',
        'обеспечить удобный и понятный интерфейс виджета для легкого пользования и минимума обучения гостя',
        'сделать виджет быстрым и легким с точки зрения ресурсов, загружаемых сайтом для увеличеняи производительности всего ресурса'
      ]
    }
  ];

  sections.forEach(sec => {
    const contentItem = document.createElement('div');
    contentItem.className = 'content__item ' + sec.class;

    const h2 = document.createElement('h2');
    h2.textContent = sec.title;
    contentItem.appendChild(h2);

    const group = document.createElement('div');
    group.className = 'content__item--group';

    sec.items.forEach(text => {
      const block = document.createElement('div');
      block.className = 'content__block';
      const p = document.createElement('p');
      p.textContent = text;
      block.appendChild(p);
      group.appendChild(block);
    });

    contentItem.appendChild(group);
    contentWrapper.appendChild(contentItem);
  });

  main.appendChild(contentWrapper);

  // JSON
  let data;
  try {
    const res = await fetch('data.json');
    data = await res.json();
  } catch (e) {
    console.error('Ошибка загрузки data.json', e);
    return;
  }

  // GALLERY
 const galleryWrapper = document.createElement('div');
  galleryWrapper.className = 'wrapper gallery__wrapper';
  galleryWrapper.id = 'gallery';

  const galleryContainer = document.createElement('div');
  galleryContainer.className = 'gallery__container';

  const img = document.createElement('img');
  img.className = 'gallery__img';
  img.src = data.gallery[0].image; // берем только первое фото
  img.alt = '';

  const galleryTitle = document.createElement('div');
  galleryTitle.className = 'gallery__title';
  const pGallery = document.createElement('p');
  pGallery.textContent =
    'Это - эскиз виджета, сделанный в программе DrawIo. В этом превью использована SVG-версия документа, в JSON есть и редактируемая .drawio версия';
  galleryTitle.appendChild(pGallery);

  galleryContainer.append(img, galleryTitle);
  galleryWrapper.appendChild(galleryContainer);
  main.appendChild(galleryWrapper);

  body.appendChild(main);

  // BOTTOM MENU
  const bottomMenu = document.createElement('div');
  bottomMenu.className = 'bottom-menu';
  bottomMenu.id = 'bottomMenu';

  data.bottom_menu.forEach(item => {
    const a = document.createElement('a');
    a.href = '#' + item.title;
    const img = document.createElement('img');
    img.src = item.image;
    img.alt = item.title;
    a.appendChild(img);
    bottomMenu.appendChild(a);
  });

  body.appendChild(bottomMenu);

  // SCROLL
  const menuLinks = bottomMenu.querySelectorAll('a');
  menuLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const id = link.getAttribute('href').substring(1);
      const target = document.getElementById(id);
      if (target) {
        const y = target.getBoundingClientRect().top + window.scrollY - 50;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    });
  });
}
