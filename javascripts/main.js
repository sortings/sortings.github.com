jQuery(
  function($) {
    $(".tabnav-tabs li").on('click', function(e) {
      if($(this).attr('class').split(' ').length != 2)
      {
        $selected = $(this).siblings('.selected');
        $selected.removeClass('selected');

        $code = $(this).closest('div').next('.code');
        $whatToHide = $code.find('.' + $selected.attr('class').split('-')[0]);
        $whatToShow = $code.find('.' + $(this).attr('class').split('-')[0]);

        $(this).addClass('selected');

        $whatToHide.first().hide();
        $whatToShow.first().show();
      }
  });
  SyntaxHighlighter.all();
});
