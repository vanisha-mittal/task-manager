$(document).on('keydown', '.container input[type="text"]', function (e) {
  if (e.key === 'Enter') {
    e.preventDefault();
    addTask($(this));
  }
});

$(document).on('click', '.container .add-task-button', function () {
  const $section = $(this).closest('.container');
  const $input = $section.find('input[type="text"]').first();
  addTask($input);
});

function addTask($input) {
  if (!$input || !$input.length) return;
  const text = $input.val().trim();
  const $section = $input.closest('.container');
  let $warning = $section.find('.warning-message');
  if (!$warning.length) {
    $warning = $('<div class="warning-message" />')
      .hide()
      .insertAfter($section.find('.task-input'));
  }
  const $list = $section.find('.task-list');
  if (text === '') {
    $warning.text('⚠ Task cannot be empty.')
            .stop(true, true).fadeIn(120);
    clearTimeout($warning.data('hideTimer'));
    const t = setTimeout(() => $warning.fadeOut(200), 2000);
    $warning.data('hideTimer', t);
    return;
  }
  $warning.hide();
  const colors = [
    'teal', 'coral', 'slateblue', 'gold',
    'mediumseagreen', 'tomato', 'orchid', 'dodgerblue'
  ];
  const color = colors[Math.floor(Math.random() * colors.length)];
  $list.prepend(`
    <li class="task">
      <span class="dot ${color}"></span>
      <span>${text}</span>
      <span class="cross">X</span>
    </li>
  `);
  $input.val('').focus();
}

$(document).on('click', '.task-list li', function () {
  const $li = $(this);
  $li.fadeOut(function () {
    $li.toggleClass('completed');
    const $list = $li.closest('.task-list');
    if ($li.hasClass('completed')) {
      $li.detach().appendTo($list).fadeIn(600);
    } else {
      $li.detach().prependTo($list).fadeIn(600);
    }
  });
});

$(document).on('click', '.task-list .cross', function (e) {
  e.stopPropagation();
  $(this).parent().fadeOut(600, function () {
    $(this).remove();
  });
});

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
