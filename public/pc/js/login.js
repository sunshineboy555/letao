/**
 * Created by Administrator on 2018/1/12.
 */
$(function () {
  //console.log($('.form-horizontal'));
//登录前端简单验证
  $('#qinqin').bootstrapValidator({
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
      username:{
        validators:{
          notEmpty: {
            message:'用户名不能为空'
          },
          callback: {
            message:'用户名不存在'
          }
        }
      },
      password:{
        validators:{
          notEmpty: {
            message:'密码不能为空'
          },
          callback: {
            message:'密码错误'
          },
          stringLength: {
            min: 5,
            max: 12,
            message: '用户名长度必须在5到12之间'
          }
        }
      }
    }
  });

  //获取校验实例
  var validator = $("#qinqin").data('bootstrapValidator');
  //console.log(validator);

  //登录发送ajax请求从后台验证
  $('#qinqin').on('success.form.bv',function (e) {
    e.preventDefault();
    //console.log($('#qinqin').serialize());
    //alert('qinqin');
    //发送ajax请求
    $.ajax({
      type:'post',
      url:'/employee/employeeLogin',
      data:$('#qinqin').serialize(),
      dataType:'json',
      success:function (info) {
        //console.log(info);
        if(info.error==1000) {
          validator.updateStatus('username', 'INVALID', 'callback')
        };
        if(info.error==1001) {
          validator.updateStatus('password', 'INVALID', 'callback')
        };
        if(info.success) {
          location.herf= 'index.html'
        }
      }
    });
  });


  //登录重置
  $('.btn-reset').on('click',function () {
    //alert('qinqin')
    validator.resetForm();
  });


})