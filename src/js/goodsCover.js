require('jquery');
require('../css/goodsCover.less');
var state = {
    num: 1,
    choice: false,
}
function init() {
    bindEventSpect();
}
init();
var maxNum;
function bindEventSpect() {
    $('.buy_spect_wrap ul').on('click', '.buy_spect_li',function () {
        state.choice = true;
        $('.buy_spect_li').removeClass('active')
        $(this).addClass('active');//点击的选中 
        $('.price_value').html($(this).attr('data-price'));//价格
        maxNum = $(this).attr('data-quantity');
        $('.price_quantity').html('库存:'+maxNum);//库存
        state.num = 1;
        $('.buy_number_value').html(state.num);//数量默认为1
        
    })
    //数量加购
    $('.buy_number_decrease').click(function () {
        if(state.num > 1) {
            $('.buy_number_value').html(--state.num);
        }    
    })
    $('.buy_number_add').click(function () {
        if(state.num < maxNum){
            $('.buy_number_value').html(++state.num);
        }
    })
    // 加入购物车
    $('.buy_ok').click(function () {
        if(state.choice == true) {
            alert('提交成功');
            window.open('http://localhost:8080/index.html');        
        }else {
            alert('请选择规则');
        }
    })
}


