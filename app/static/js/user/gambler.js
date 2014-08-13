(function(){
  'use strict';

  $(document).ready(function(){
    $('.info').click(sellAsset);
  });

  function sellAsset(){
    var id = $(this).closest('.gambler').attr('data-gambler-id'),
        asset = $(this).children('.name').text(),
        type = 'delete',
        url = '/gamblers/'+id+'/assets/'+asset;

    $.ajax({url:url, type:type, dataType:'json', success:function(data){
      var $gambler = $('.gambler[data-gambler-id='+data.id+']');
      $gambler.find('.info .name:contains('+data.name+')').closest('.asset').fadeOut();
      $gambler.find('.cash').text('$'+ data.cash.toFixed(2));
    }});
  }




})();

