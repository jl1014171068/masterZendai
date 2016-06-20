function modalPublic(title, str, status) {
    //三个参数分别为标题，正文，状态，（默认1代表成功，可不填，反之填2）
    status = status || '1';
    if (status == 1) {
        status = 'mdi-action-done';
    } else {
        status = 'mdi-navigation-cancel';
    }
    var html = ' <div id="publicModal" class="modal modal-fixed-footer"><div class="modal-content"><h4>' + title + '</h4><div class="valign-wrapper status center-align"><i class="' + status + ' valign"></i></div><p class="center-align">' + str + '</p></div><div class="modal-footer"><a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat ">确定</a></div></div>';
    $('body').append(html);
    $('#publicModal').openModal();
}
// 上面是公用的模态弹窗
$(function() {
    var dom = $(".textLimit");
    var length = dom.attr('length');
    dom.on('input', function() {
        var str = dom.next('.character-counter').html();
        var nowL = parseInt(str.substring(0, str.indexOf('/')));
        var val = dom.val();
        if (nowL > length) {
            var sub = val.slice(0, length);
            dom.val(sub);
            modalPublic('提示', '最多只能输入' + length + '个字符！', 2);
        }
    });
}());
$(function() {
    var resultArry = [];

    function nullEvent() {
        var length = $('#leftMenu  .menu>ul>li').length;
        if (length) {
            $('#leftMenu .menu .null').hide();
        } else {
            $('#leftMenu  .menu .null').show();
        }
        var len = $('.medias').length;
        if (len) {
            $('#rightCon .menu .null').hide();
        } else {
            $('#rightCon .menu .medias').remove();
            $('#rightCon  .menu .null').show();
        }
    }
    // 增加

    function add(self, limit) {
        var length;
        var html;
        //如果是创建外围的li
        if (self.attr('class').indexOf('newFile') > -1) {
            limit = limit || 3;
            length = $('#leftMenu .menu>ul>li').length;
            if (length && length < limit) {
                html = '<li><div class="clearfix result"><div class="text"></div><ol class="setting wai"><li><i class="mdi-content-create set"></i></li><li><i class="mdi-content-add add"></i></li><li><i class="mdi-content-clear del"></i></li></ol></div><form action="#" class="zd-form"><div class="form-group"><input type="type" zd="noinp" class="form-control"></div><div class="form-group wai"><button class="waves-effect waves-light btn qr">保存</button><button class="waves-effect waves-light btn qx">取消</button></div></form></li>';
                $('#leftMenu .menu >ul >li').eq(-1).after(html);
            } else if (!length) {
                html = '<ul class="forms collection"><li><div class="clearfix result"><div class="text"></div><ol class="setting wai"><li><i class="mdi-content-create set"></i></li><li><i class="mdi-content-add add"></i></li><li><i class="mdi-content-clear del"></i></li></ol></div><form action="#" class="zd-form"><div class="form-group"><input type="type" class="form-control"></div><div class="form-group wai"><button class="waves-effect waves-light btn qr">保存</button><button class="waves-effect waves-light btn qx">取消</button></div></form></li></ul>';
                $('#leftMenu .menu').append(html);
            } else {
                modalPublic('添加失败', '添加失败，最多只能添加' + limit + '个菜单！', 2);
            }
        } else {
            limit = limit || 5;
            length = self.parents('li').find('ul.children>li').length;

            if (length && length < limit) {
                html = '<li><div class="clearfix result"><div class="text"></div><ol class="setting"><li><i class="mdi-content-create set"></i></li><li><i class="mdi-content-clear del"></i ></li></ol></div><form action="#" class="zd-form"><div class="form-group"><input type="type" zd="noinp" class="form-control"></div><div class="form-group"><button class="waves-effect waves-light btn qr">保存</button><button class="waves-effect waves-light btn qx">取消</button></div></form></li>';
                self.parents('.setting').parents('li').find('.children>li').eq(-1).after(html);
            } else if (!length) {
                html = '<ul class="children"><li><div class="clearfix result"><div class="text"></div><ol class="setting"><li><i class="mdi-content-create set"></i></li><li><i class="mdi-content-clear del"></i ></li></ol></div><form action="#" class="zd-form"><div class="form-group"><input type="type" zd="noinp" class="form-control"></div><div class="form-group"><button class="waves-effect waves-light btn qr">保存</button><button class="waves-effect waves-light btn qx">取消</button></div></form></li></ul>';
                self.parents('.setting').parents('li').append(html);
            } else {
                modalPublic('添加失败', '添加失败，最多只能添加' + limit + '个菜单！', 2);
            }
        }
        nullEvent();
    }
    //修改
    function set(self) {
        var str = self.parent().parent('.setting').siblings('.text').html();
        self.parents('.result').siblings('.zd-form').show().find('.form-control').val(str);
    }
    //删除
    function del(self) {
        self.parents('li').remove();
        nullEvent();
    }
    //保存
    function save(self) {
        var text = self.parents('.zd-form').find('.form-control').val();
        if (text) {
            self.parents('.zd-form').parent('li').find('>.result').show();
            self.parents('.zd-form').parent('li').find('>.result .text').show().text(text);
            self.parents('.zd-form').hide();
        } else {
            modalPublic('保存失败', '保存失败，名称不能为空！', 2);
        }
        nullEvent();
        return false;
    }
    //取消
    function cancel(self) {
        var text = self.parents('li').find('.text').html();
        if (text) {
            self.parents('.zd-form').hide();
        } else {
            self.parents('li').remove();
        }
        nullEvent();
        return false;
    }
    //上面是公用方法
    // 全局新建
    $('#leftMenu').on('click', '.add', function() {
        var self = $(this);
        add(self);
        return false;
    });
    $('#rightCon').on('click', '.add', function() {
        var self = $(this);
        add(self);
        return false;
    });
    //全局保存
    $('#leftMenu').on('click', '.qr', function() {
        var self = $(this);
        save(self);
        var ul = self.closest('ul');
        var lis = ul.children('li').length;
        // 如果是父级li
        if (ul.attr('class').indexOf('forms') > -1) {
            $("#leftMenu .forms>li").each(function(index, el) {
                $(this).attr('uid', 'rightW_' + index + '');
            });
        } else {
            var nowLi = self.closest('li');
            var nowUl = self.closest('ul');
            var parLi = nowLi.parent('ul').parent('li');
            var uid = parLi.attr('uid');
            nowUl.children('li').each(function(index, el) {
                $(this).attr('uid', '' + uid + '_' + index + '');
            });
            console.log(uid);
            $('#' + uid).remove();
        }
        nullEvent();
        return false;
    });
    //全局取消
    $('#leftMenu').on('click', '.qx', function() {
        var self = $(this);
        cancel(self);
        return false;
    });
    // 全局修改
    $('#leftMenu').on('click', '.set', function() {
        var self = $(this);
        set(self);
        return false;
    });
    // 全局删除
    $('#leftMenu').on('click', '.del', function() {
        var self = $(this);
        del(self);
        return false;
    });
    //左侧点击显示右侧
    $('#leftMenu').on('click', '.result .text', function() {
        var self = $(this);
        var selfLi = $(this).parent('.result').parent('li');
        var index = selfLi.index();
        var parentUl = selfLi.parent('ul');
        var rightHtml = '';
        var uid = '';
        uid = selfLi.attr('uid');
        // 判断是内层还是外层
        if (parentUl.attr('class').indexOf('forms') > -1) {
            rightHtml = '<div id="' + uid + '" class="medias row"><div class="col s12"><ul class="tabs"><li class="tab col s2"><a  href="#' + uid + '-1"><i class="mdi-action-info-outline"></i>文字</a></li><li class="tab col s2"><a href="#' + uid + '-2"><i class="mdi-action-language"></i>网址</a></li><li class="tab col s2 "><a href="#' + uid + '-3"><i class="mdi-action-perm-media"></i>图片</a></li><li class="tab col s2 "><a href="#' + uid + '-4"><i class="mdi-av-videocam"></i>视频</a></li><li class="tab col s2"><a href="#' + uid + '-5"><i class="mdi-av-volume-up"></i>声音</a></li><li class="tab col s2"><a href="#' + uid + '-6"><i class="mdi-action-picture-in-picture"></i>图文</a></li></ul></div><div id="' + uid + '-1" type="1" class="col s12 main text"><div class="row"><div class="input-field col s12"><textarea class="textLimit" length="120" cols="7"></textarea></div></div><button class="btn waves-effect waves-light bc qr" type="submit" name="action">保存</button><button class="btn waves-effect waves-light bc qx" type="submit" name="action">删除</button></div><div id="' + uid + '-2" type="2" class="col s12 main"><div class="form-group"><label for="">请输入网址</label><input type="type" class="form-control" placeholder="例：www.zendai.com"></div><button class="btn waves-effect waves-light bc qr" type="submit" name="action">保存</button><button class="btn waves-effect waves-light bc qx" type="submit" name="action">删除</button></div><div id="' + uid + '-3" type="3" class="col s12 main "><div class="default valign-wrapper minH15"><button class="btn waves-effect waves-light mar0a selectBtn" type="submit" name="action">选择图片</button></div><ul class="selectUl"></ul><button class="btn waves-effect waves-light bc qr" type="submit" name="action">保存</button><button class="btn waves-effect waves-light bc qx" type="submit" name="action">删除</button></div><div id="' + uid + '-4" type="4" class="col s12 main"><div class="default valign-wrapper minH15"><button class="btn waves-effect waves-light mar0a selectBtn" type="submit" name="action">选择视频</button></div><ul class="selectUl"></ul><button class="btn waves-effect waves-light bc qr" type="submit" name="action">保存</button><button class="btn waves-effect waves-light bc qx" type="submit" name="action">删除</button></div><div id="' + uid + '-5" type="5" class="col s12 main"><div class="default valign-wrapper minH15"><button class="btn waves-effect waves-light mar0a selectBtn" type="submit" name="action">选择声音</button></div><ul class="selectUl"></ul><button class="btn waves-effect waves-light bc qr" type="submit" name="action">保存</button><button class="btn waves-effect waves-light bc qx" type="submit" name="action">删除</button></div><div id="' + uid + '-6" type="6" class="col s12 main"><div class="default valign-wrapper minH15"><button class="btn waves-effect waves-light mar0a selectBtn" type="submit" name="action">选择图文</button></div><ul class="selectUl"></ul><button class="btn waves-effect waves-light bc qr" type="submit" name="action">保存</button><button class="btn waves-effect waves-light bc qx" type="submit" name="action">删除</button></div></div>';
            // 如果li下面没有子集
            if (!selfLi.find('ul').length) {
                $("#rightCon .menu .null").hide();
                $("#rightCon .menu .medias").remove();
                $("#rightCon .menu .null").after(rightHtml);
                $('ul.tabs').tabs();
            } else {
                $("#rightCon .menu .medias").remove();
                $("#rightCon .menu .null").show();
                $("#rightCon .menu .add").show().siblings().hide();
            }
        } else {
            rightHtml = '<div id="' + uid + '" class="medias row"><div class="col s12"><ul class="tabs"><li class="tab col s2"><a  href="#' + uid + '-1"><i class="mdi-action-info-outline"></i>文字</a></li><li class="tab col s2"><a href="#' + uid + '-2"><i class="mdi-action-language"></i>网址</a></li><li class="tab col s2 "><a href="#' + uid + '-3"><i class="mdi-action-perm-media"></i>图片</a></li><li class="tab col s2 "><a href="#' + uid + '-4"><i class="mdi-av-videocam"></i>视频</a></li><li class="tab col s2"><a href="#' + uid + '-5"><i class="mdi-av-volume-up"></i>声音</a></li><li class="tab col s2"><a href="#' + uid + '-6"><i class="mdi-action-picture-in-picture"></i>图文</a></li></ul></div><div id="' + uid + '-1" type="1" class="col s12 main text"><div class="row"><div class="input-field col s12"><textarea class="textLimit" length="120" cols="7"></textarea></div></div><button class="btn waves-effect waves-light bc qr" type="submit" name="action">保存</button><button class="btn waves-effect waves-light bc qx" type="submit" name="action">删除</button></div><div id="' + uid + '-2" type="2" class="col s12 main"><div class="form-group"><label for="">请输入网址</label><input type="type" class="form-control" placeholder="例：www.zendai.com"></div><button class="btn waves-effect waves-light bc qr" type="submit" name="action">保存</button><button class="btn waves-effect waves-light bc qx" type="submit" name="action">删除</button></div><div id="' + uid + '-3" type="3" class="col s12 main "><div class="default valign-wrapper minH15"><button class="btn waves-effect waves-light mar0a selectBtn" type="submit" name="action">选择图片</button></div><ul class="selectUl"></ul><button class="btn waves-effect waves-light bc qr" type="submit" name="action">保存</button><button class="btn waves-effect waves-light bc qx" type="submit" name="action">删除</button></div><div id="' + uid + '-4" type="4" class="col s12 main"><div class="default valign-wrapper minH15"><button class="btn waves-effect waves-light mar0a selectBtn" type="submit" name="action">选择视频</button></div><ul class="selectUl"></ul><button class="btn waves-effect waves-light bc qr" type="submit" name="action">保存</button><button class="btn waves-effect waves-light bc qx" type="submit" name="action">删除</button></div><div id="' + uid + '-5" type="5" class="col s12 main"><div class="default valign-wrapper minH15"><button class="btn waves-effect waves-light mar0a selectBtn" type="submit" name="action">选择声音</button></div><ul class="selectUl"></ul><button class="btn waves-effect waves-light bc qr" type="submit" name="action">保存</button><button class="btn waves-effect waves-light bc qx" type="submit" name="action">删除</button></div><div id="' + uid + '-6" type="6" class="col s12 main"><div class="default valign-wrapper minH15"><button class="btn waves-effect waves-light mar0a selectBtn" type="submit" name="action">选择图文</button></div><ul class="selectUl"></ul><button class="btn waves-effect waves-light bc qr" type="submit" name="action">保存</button><button class="btn waves-effect waves-light bc qx" type="submit" name="action">删除</button></div></div>';
            $("#rightCon .menu .null").hide();
            $("#rightCon .menu .medias").remove();
            $("#rightCon .menu .null").after(rightHtml);
            $('ul.tabs').tabs();
        }
        //  上面是展现
        $(".medias .qr").on('click', function() {
            var main = $(this).parents('.main');
            var type = main.attr('type');
            var waiId = main.parents('.medias').attr('id');
            var str = '';
            var local = '';
            var name='';
            name=$("li[uid=" + uid + "]").find('.result .text').text();
            // var uid=main.attr('id');
            // 如果是文字
            if (type == 1) {
                if (!main.find('textarea').val()) {
                    modalPublic('保存失败', '保存失败，不能为空！', 2);
                } else {
                    str = main.find('textarea').val();
                    local = 'type:click,name:'+name+',id:1,key:' + str + '';
                    $("li[uid=" + uid + "]").attr('local', local);
                    modalPublic('保存成功！', '保存成功！');
                }
            }
            //如果是网址
             else if (type == 2) {
                if (!main.find('input.form-control').val()) {
                    modalPublic('保存失败', '保存失败，不能为空！', 2);
                } else {
                    str = main.find('input.form-control').val();
                    local = 'type:href,name:'+name+',id:2,key:' + str + '';
                    $("li[uid=" + uid + "]").attr('local', local);
                    modalPublic('保存成功！', '保存成功！');
                }
            }
            // 如果是图片
            else if (type == 3) {
               if (!main.find('input.form-control').val()) {
                   modalPublic('保存失败', '保存失败，不能为空！', 2);
               } else {
                  //  str = main.find('input.form-control').val();
                  //  local =  'type:click,name:'+name+',id:3,key:' + str + '';
                  //  $("li[uid=" + uid + "]").attr('local', local);
                  //  modalPublic('保存成功！', '保存成功！');
               }
           }
        });

        return false;
    });
    //----------------------------下面进行右边的js----------------------
    function modalHtml(id, title, con) {
        var html = '<div id=' + id + ' class="modal modalHtml"><div class="modal-content"><h5>' + title + '</h5>' + con + '</div><div class="modalFooter center-align"><button class="btn waves-effect waves-light bc qr" type="submit" name="action">确定</button><button class="btn waves-effect waves-light bc qx" type="submit" name="action">取消</button></div></div>';
        $('body').append(html);
        $('#' + id).openModal();
    }
    $("#rightCon").on('click', '.main .selectBtn', function() {
        var self = $(this);
        var parmain = self.parents('.main');
        var sid = parmain.attr('id');
        var type = parmain.attr('type');
        var cont = '';
        var contArry = [];
        //如果是图文
        if (type == 6) {
            $.ajax({
                url: 'default/js/6.json',
                type: 'get',
                dataType: 'json',
                success: function(data) {
                    $.each(data.item, function(index, el) {
                        if (el.content.news_item.length <= 1) {
                            // var a={media_id:el.media_id,title:el.content.news_item[0].title,digest:el.content.news_item[0].digest};
                            // contArry.push(a);
                            cont += '<li media_id=' + el.media_id + '><div class="card "><div class="card-image waves-effect waves-block waves-light"><img class="activator" src="'+el.content.news_item[0].thumb_url+'"></div><div class="card-content"><span class="card-title activator grey-text text-darken-4">' + el.content.news_item[0].title + '</span><p>' + el.content.news_item[0].digest + '</p></div></div></li>';
                        } else if (el.content.news_item.length > 1) {
                            var s = [];
                            $.each(el.content.news_item, function(i, e) {
                                // var a={media_id:el.media_id,title:el.content.news_item[0].title,digest:el.content.news_item[0].digest};
                                //   s.push(a);
                                // cont+='<li media_id='+el.media_id+'><div class="card "><div class="card-image waves-effect waves-block waves-light"><img class="activator" src="default/img/test/office.jpg"><h5 class="oneTitle">'+e.title+'</h5></div><div class="card-content"><div class="text">'+e.title+'</div><div class="img  waves-effect"><img class="activator" src="default/img/test/office.jpg"></div></div><div class="card-content"><div class="text">'+el.content.news_item[0].title+'</div><div class="img  waves-effect"><img class="activator" src="default/img/test/office.jpg"></div></div></div></li>';
                                // var a={media_id:el.media_id,title:el.content.news_item[0].title,digest:el.content.news_item[0].digest};
                                s.push(e);
                                s.media_id = el.media_id;
                            });
                            var concon = '';
                            for (var i = 1; i < s.length; i++) {
                                concon += '<div class="card-content"><div class="text">' + s[i].title + '</div><div class="img  waves-effect"><img class="activator" src="'+s[i].thumb_url+'"></div></div>';
                            }
                            concon = '<li media_id=' + s.media_id + '><div class="card "><div class="card-image waves-effect waves-block waves-light"><img class="activator" src="'+s[0].thumb_url+'"><h5 class="oneTitle">' + s[0].title + '</h5></div>' + concon + '</div></li>';
                            // $.each(s,function(i,e){
                            //   console.log(s[i]);
                            //       concon+='<div class="card-content"><div class="text">'+e.title+'</div><div class="img  waves-effect"><img class="activator" src="default/img/test/office.jpg"></div></div>';
                            // });
                            // console.log(concon);
                            // contArry.push(s);
                            cont += concon;
                        }
                    });
                    var resutlt = '<ul class="selectUl">' + cont + '</ul>';
                    modalHtml('' + sid + '_modal', self.text(), resutlt);
                    $('#' + sid + '_modal .selectUl li').on('click', function() {
                        $(this).parents('.selectUl').find('.zz').remove();
                        $(this).parents('.selectUl').find('li').removeClass('active');
                        $(this).find('.card-image').append('<div class="zz valign-wrapper "><i class="mdi-action-done yes waves-light mar0a"></i></div>');
                        $(this).addClass('active');
                        return false;
                    });
                    $('#' + sid + '_modal  .qr').on('click', function() {
                        var par = $('#' + sid + '_modal .selectUl');
                        par.find('li').each(function(index, el) {
                            if ($(this).hasClass('active')) {
                                var html = this;
                                $("#" + sid + ' .default').hide();
                                $("#" + sid + ' .selectUl').append(html);
                                $('#' + sid + '_modal').closeModal();
                                $("#" + sid + ' .selectUl').find('.zz').remove();
                                $("#" + sid + ' .selectUl').nextAll('.btn').show();
                            }
                        });
                    });
                }
            });
        }
        else if(type==3){
          $.ajax({
              url: 'default/js/3.json',
              type: 'get',
              dataType: 'json',
              success: function(data) {
                console.log(data);
              }
          });

        }

    });

}());
