require('../css/goodsInfo.less');
require('./goodsCover.js');
require('jquery');

function getId(){
    var optionList = window.location.search.slice('1').split(';'),
        idNum;
        optionList.forEach(function(ele,index){
            if(ele.indexOf('id') !== -1){
                //'id=xxx'
                idNum = ele.slice(3);
            }
        })
        return idNum;
}
function getGoodsInfor(cb){
    var _url = 'http://localhost:8080/api/goodsList.json';
    $.ajax({
        type:'GET',
        url:_url,
        dataType:'json',
        success:function(data){
            cb(data);
        },
        error:function(){
            console.log('商品详情数据获取失败!');
        }
    })
}
getGoodsInfor(createGoodsInfor);
function createGoodsInfor(data){
    var idNum = getId(),
        dataList = data.list,
        len = dataList.length,
        str = '',
        minNum,
        maxNum,
        arr = [], 
        liStr = '';
        console.log(dataList);
        for(var i = 0 ;i < len;i++){
            if(dataList[i].id == idNum){
                
                $('.infor_one_img').attr('src',dataList[i].imgurl[0]);
                $('.one_name').add('.infor_three p').html(dataList[i].name);
                dataList[i].imgurl.forEach(function(ele,index){
                    str += '<img src="'+ele+'"/>';
                });
                $('.infor_three').append($(str));
                arr = dataList[i].spectList.sort(function(a,b){
                    return a.price-b.price;
                })
                $('.one_price').html('￥'+arr[0].price+'-'+arr[arr.length-1].price);
                dataList[i].spectList.forEach(function(ele,index){
                    liStr +='<li class="buy_spect_li" data-price="'+ele.price+'" data-quantity="'+ele.quantity+'">'+ele.spect+'</li>';
                })
                $('.buy_spect_wrap ul').html(liStr);
                $('.price_value').html($('.one_price').html());
                return;
            }
        }
}

 function bindEvent(){
     $('.infor_two').add('.infor_four').on('click',function(){
         $('.buy_wrap').css({'display':'block'});
         $('html').add($('body')).css({'height':'100%','overflow':'hidden'});
     })
     $('.buy_gray').click(function(){
        $('html').add($('body')).css({'height':'auto','overflow':'visible'});
        $('.buy_wrap').css({'display':'none'});
     })
 }

 bindEvent();
