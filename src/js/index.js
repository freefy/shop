require('../css/index.less');
// base.less-->index.less-->index.js===>webpack打包===>输出文件
require('jquery');
function goodsLists(cb){
    var _url = 'http://localhost:8080/api/goodsList.json';
    $.ajax({
        type:'GET',
        url:_url,
        dataType:'json',
        success:function(data){
            cb(data);
        },
        error:function(){
            console.log('商品列表数据获取失败!');
        }
    })
}
goodsLists(createList);
//回调函数
function createList(data){
    var str = '';
    console.log(data);  
   
    data.list.forEach(function(ele,index){
        var arr = ele.spectList.sort(function(a,b){
            return a.price-b.price;
        })
        str +='<a href="http://localhost:8080/goodsInfo.html?id='+ ele.id+'"><div class="goods_item">\
        <img src="'+ele.imgurl[0]+'" alt="">\
        <p class="item_name">'+ele.name+'</p>\
        <p class="item_price">￥'+arr[0].price+'</p>\
    </div></a>'
    })
    $('.tab_content').html(str);
}
