function modalPublic(title,str,status){
  //三个参数分别为标题，正文，状态，（默认1代表成功，可不填，反之填2）
  status=status||'1';
  if(status==1){
    status='mdi-action-done';
  }
  else{
    status='mdi-navigation-cancel';
  }
 var html=' <div id="publicModal" class="modal modal-fixed-footer"><div class="modal-content"><h4>'+title+'</h4><div class="valign-wrapper status center-align"><i class="'+status+' valign"></i></div><p class="center-align">'+str+'</p></div><div class="modal-footer"><a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat ">确定</a></div></div>';
 $('body').append(html);
 $('#publicModal').openModal();
}

$(function(){
  //左边外部新建
  function add(){
     var length=$('#leftMenu  .menu>ul>li').length;
     var html;
     if(length && length<3){
       html='<li><div class="clearfix result"><div class="text"></div><ol class="setting wai"><li><i class="mdi-content-create set"></i></li><li><i class="mdi-content-add add"></i></li><li><i class="mdi-content-clear del"></i></li></ol></div><form action="#" class="zd-form"><div class="form-group"><input type="type" zd="noinp" class="form-control"></div><div class="form-group wai"><button class="waves-effect waves-light btn qr">保存</button><button class="waves-effect waves-light btn qx">取消</button></div></form></li>';
       $('#leftMenu .menu >ul >li').eq(-1).after(html);
     }
     else if(!length){
      html='<ul class="forms collection"><li><div class="clearfix result"><div class="text"></div><ol class="setting wai"><li><i class="mdi-content-create set"></i></li><li><i class="mdi-content-add add"></i></li><li><i class="mdi-content-clear del"></i></li></ol></div><form action="#" class="zd-form"><div class="form-group"><input type="type" class="form-control"></div><div class="form-group wai"><button class="waves-effect waves-light btn qr">保存</button><button class="waves-effect waves-light btn qx">取消</button></div></form></li></ul>';
      $('#leftMenu .menu').append(html);
     }
     return false;
  }
  function nullEvent(){
    var length=$('#leftMenu  .menu>ul>li').length;
    if(length){
      $('#leftMenu .menu .null').hide();
    }
    else{
      $('#leftMenu  .menu .null').show();
    }
  }
  // 左边外部点击保存
  $('.newFile').on('click',function(){
    add();
    nullEvent();
    return false;
  });
  // 点击外层保存按钮
  $('#leftMenu ').on('click','.wai .qr',function(){
    var self=$(this);
    var text=self.parents('.zd-form').find('.form-control').val();
    if(text){
       self.parents('li').find('.result .text').show().text(text);
       self.parents('.zd-form').hide();
    }
    else{
      modalPublic('保存失败','保存失败，名称不能为空！',2);
    }
    nullEvent();
    return false;
  });
  // 点击取消按钮
  $('#leftMenu ').on('click','.qx',function(){
    var self=$(this);
    self.parents('.zd-form').parent('li').remove();
    nullEvent();
  });
  $('#leftMenu ').on('click','.setting .set',function(){
    var str=$(this).parent().parent('.setting').siblings('.text').html();
    $(this).parents('.result').siblings('.zd-form').show(str).find('.form-control').val(1);

  });
}());
/**
<ul class="forms collection">
  <li>
    <div class="clearfix result">
      <div class="text">111</div>
      <ol>
        <li><i class="mdi-content-create"></i></li>
        <li><i class="mdi-content-add"></i></li>
        <li><i class="mdi-content-clear"></i></li>
      </ol>
    </div>
    <form action="#" class="zd-form">
       <div class="form-group">
            <input type="type" zd='noinp' class="form-control">
       </div>
       <div class="form-group">
          <button class='waves-effect waves-light btn qr'>保存</button>
          <button class='waves-effect waves-light btn qx'>取消</button>
       </div>
    </form>
  </li>
  <li>
    <form action="#" class="zd-form">
       <div class="form-group">
            <input type="type" zd='noinp' class="form-control">
       </div>
       <div class="form-group">
          <button class='waves-effect waves-light btn qr'>保存</button>
          <button class='waves-effect waves-light btn qx'>取消</button>
       </div>
    </form>
  </li>
</ul>
**/
