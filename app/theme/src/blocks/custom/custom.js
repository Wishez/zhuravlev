$(window).resize(() => {
  let $navList = $('#navList'),
      navListStyle = $navList[0].style;
  
  if (window.innerWidth > 767) 
    navListStyle.display = 'inline-flex';
  else  
    navListStyle.display = 'none';
});
$(function() {
  const publicSrc = '/media/public';

  $('.curtain').animate({
    opacity: 0
  }, 1000, () => {
    $('.curtain').hide();
  });

  $(document).on('click', '#openMenuButton', openMenu);

  const $navList = $('#navList');
  let isOpen = false;

  function openMenu(e) {
    if (!isOpen) {
      isOpen = true;
      $navList.show('fast'); 
    } else {
      isOpen = false;
      $navList.hide('fast');
    }
  }

  $(document).on('click', '.not-follow', openUrlInNewWindow);

  function openUrlInNewWindow(e) {
    e.preventDefault();
    
    let $target = $(e.target);
    
    $target = $target[0].tagName === 'A' ? $target : $target.parent();
      
    let url = $target.prop('href');
    
    window.open(url);
  }// end openUrlInNewWindow


  $(document).on('click', '.navItem__refer', (e) => {
    if (window.innerWidth  < 767)
      $navList.hide('fast');

  }); // end click
});// end ready