/* Global Aurgument */
var google_map_api = 'AIzaSyB7UB3MVYFnzms2xRlima3ZGBEdKAckpNE';
var url = 'http://nekoten.sangskrit.com/';
var staff_id = localStorage.getItem('staff_id');
var size_g = ($(window).width()-30)/2;

/* Initialize */
localStorage.setItem('staff_id', '001');
localStorage.setItem('name_en', 'Vong Virak');
localStorage.setItem('name_kh', 'kk');
localStorage.setItem('total_paycheck', '150');

function openUrl(url){
    window.open(url, '_system', 'location=no');        
}
function reportToMe(){
    var url= 'fb://user-thread/100001442709860';    
    cordova.InAppBrowser.open(url);
}
    
function call(number) {
    var url= 'tel://'+number;    
    cordova.InAppBrowser.open(url);    
}

function openMap(query){
    var url = 'comgooglemaps://?q='+query;
    cordova.InAppBrowser.open(url);
}

function openCoordinate(coordinate){
    var url = 'comgooglemaps://?q='+coordinate+'&center='+coordinate;
    cordova.InAppBrowser.open(url);
}

function loadStore(store_id){
    openModal('store_modal');
    $.post(url+'app/staff/store.php', {store_id:store_id}, function(data){        
        
        var a = JSON.parse(data)[0];
        $('#store #name').text(a['name']);
        $('#store #n_order').text(a['n_order']);
        $('#store #n_product').text(a['n_product']);
        $('#store #facebook').text(a['facebook']);
        $('#store #address').text(a['address']);
        $('#store #coordinate').text(a['coordinate']);
        $('#store #phone_number').text(a['phone_number']);
        
        if (a['timeline_pic'] == 'exist'){
            $('#store #timeline_pic').attr('src', url+'stores/'+store_id+'/timeline.jpg');
        }
        if (a['profile_pic'] == 'exist'){
            $('#store #profile_pic').attr('src', url+'stores/'+store_id+'/profile.jpg');
        }
        $('#store #facebook').text(a['facebook']);
                   
        var arr = a['ads'];   
        
        for (var i = 0; i < arr.length; i++){            
            var ad = arr[i];            
            
            var str = '<ion-item onclick="loadProduct(\''+ad['ad_id']+'\');" class="ad-item">';
                str += '<div class="b">';
                    str += '<img style="width:100px;" src="'+url+'ads/'+ad['ad_id']+'/1_m.jpg">';
                str += '</div>';
                str += '<div class="a">';
                    str += '<span class="aa">'+ad['price']+'</span>';
                    str += '<span class="ab"><span>'+ad['n_order']+'</span> <span k="កម្មង់">order</span></span>';
                str += '</div>';
            str += '</ion-item>';
            
            $('#store_products').append(str);
        }    
    });
    
}

function storeItem(b){
    var str = '<div class="yw">';
        str += '<div class="a">';
            str += '<div class="ab"><img src="'+url+'stores/'+b['store_id']+'/profile.jpg"></div> <a onclick="loadStore(\''+b['store_id']+'\');">'+b['store_name']+'</a>';
        str += '</div>';
        str += '<div class="b" onclick="openMap($(this).text())">';
            str += '<span class="ba ion-ios-location"></span>';
            str += '<span class="bb">'+b['address']+'</span>';                    
        str += '</div>';
        str += '<div class="b" onclick="openCoordinate($(this).text())">';
            str += '<span class="ba ion-ios-navigate"></span>';
            str += '<span class="bb">'+b['coordinate']+'</span>';                    
        str += '</div>';
        str += '<div class="b">';
            str += '<span class="ba ion-ios-telephone"></span>';
            str += '<span class="bb">'+b['phone_number']+'</span>';                    
        str += '</div>';
    str += '</div>';
    return str;
}



function searchKeyword(){
    keyword = $('.search').val(); 
    opt = $('#search_opt').val();
    
    if (opt == 'order') {
        loadOrderList(keyword);
    } else {
        $.post(url+'app/staff/search.php', {keyword:keyword, opt:opt}, function(data){
            var a = JSON.parse(data);
            
            var str = '';
            for (var i = 0; i < a.length; i++){
                var b = a[i];
                if (opt == 'store') {
                    
                    str += storeItem(b);
                    str += '<div class="hr"></div>';
                } else if (opt == 'user'){
                    str += addressItem(b);
                    str += '<div class="hr"></div>';
                } else if (opt == 'product'){
                    str += productItem(b);
                    str += '<div class="hr"></div>';
                }
            }
            
            $('#search_res').html(str);
        });
    }
    
}


function addressItem(a){
    var str = '<div class="yr">';
        str += '<div class="a">';
            str += '<div class="ab"><img src="'+url+'users/'+a['user_id']+'/profile.jpg"></div>';
            str += '<a onclick="loadUser(\''+a['ordered_by']+'\');">'+a['name']+'</a>';                
        str += '</div>';
        str += '<div class="b" onclick="openMap($(this).text())">';
            str += '<span class="ba ion-ios-location"></span>';
            str += '<span class="bb">'+a['address']+' '+a['location']+'</span>';                    
        str += '</div>';
        str += '<div class="b" onclick="openCoordinate($(this).text())">';
            str += '<span class="ba ion-ios-navigate"></span>';
            str += '<span class="bb">'+b['coordinate']+'</span>';                    
        str += '</div>';
        str += '<div class="b">';
            str += '<span class="ba ion-ios-telephone"></span>';
            str += '<span class="bb">'+a['phone_number']+'</span>';                    
        str += '</div>';
        if (a['bus_name'] != '' || a['bus_phone_number'] != '') {
            str += '<div class="b">';
                str += '<span class="ba ion-android-bus"></span>';
                str += '<span class="bb">'+a['bus_name']+' '+a['bus_phone_number']+'</span>';                    
            str += '</div>';
        }
    str += '</div>';
    return str;
}


function loadOrder(order_id){
    if (order_id == 'refresh') order_id = $('#order_modal #order_id').text();
    $('#order_modal #order_id').text(order_id);
    openModal('order_modal');
    $.post(url+'app/staff/order.php', {order_id: order_id}, function(data){
        //alert(data);
        var a = JSON.parse(data)[0];        
        
        var str = '<div class="re">';
            str += '<div class="a">';                
                str += '<span class="b">Delivery Time:</span>';
                str += '<span class="c delivery_time">'+a['delivery_time']+'</span>';
            str += '</div>';
            str += '<div class="a">';
                str += '<span class="b">Order ID:</span>';
                str += '<span class="c">'+a['order_id']+'</span>';
            str += '</div>';            
            str += '<div class="a">';
                str += '<span class="b">Order Date:</span>';
                str += '<span class="c">'+a['order_date']+'</span>';
            str += '</div>';            
        str += '</div>';
        str += '<div class="hr"></div>';
        for (var i = 0; i < a['stores'].length; i++) {
            var b = a['stores'][i];
            str += storeItem(b);
            str += '<div class="yt">';           
                str += '<ul class="c">';
                    var str2 = '';
                    for (var j = 0; j < b['ads'].length; j++){
                        var c = b['ads'][j];
                        str2 += productItem(c);
                    }
                    str += str2;
                str += '</ul>';
                str += '<div class="h">';
                    str += '<span>Total</span> <span>('+b['store_item_count']+' items)</span><span class="total-price">$ '+b['store_buy_in']+'</span>';
                str += '</div>';
            str += '</div>';
            str += '<div class="hr"></div>';
        }
        
        
        str += addressItem(a);
        str += '<div class="ys">';                
            str += '<div class="d">';
                str += '<div>';
                    str += '<span class="e">Payment Method:</span> <strong>';
                    if (a['payment_method'] == 'cash_on_delivery') {
                        str += 'Cash on Delivery';
                    } else {
                        str += 'Transfer Money';
                    }
                    str += '</strong>';
                str += '</div>';
                str += '<div>';
                    str += '<span class="e">Message:</span> <span>'+a['message']+'</span>';
                str += '</div>';
            str += '</div>';
            str += '<div class="h">';
                str += '<span>Subtotal</span> <span>('+a['item_count']+' items)</span><span class="i">$ '+a['subtotal']+'</span>';
            str += '</div>';
            str += '<div class="h">';
                str += '<span>Delivery Fee</span><span class="i">$ '+a['delivery_fee']+'</span>';
            str += '</div>';
            str += '<div class="h">';
                str += '<span>Total</span><span class="i total-price">$ '+a['total']+'</span>';
            str += '</div>';
        str += '</div>';
        $('#order').html(str);
    });
}

function productItem(c){
    var str2 = '<li class="pd">';
        str2 += '<div class="d">';
            str2 += '<img src="'+url+'ads/'+c['ad_id']+'/1_m.jpg"/>';
        str2 += '</div>';
        str2 += '<div class="e">';
            str2 += '<div id="title">'+c['title']+'</div>';
            if (c['unit_count'] != null) {
                str2 += '<div class="f">';
                    str2 += '<strong id="price">$ '+c['buy_in']+'</strong> x <strong id="qty">'+c['unit_count']+'</strong>';
                str2 += '</div>';
            } else {
                str2 += '<div class="a">';
                    str2 += '<div class="b">';
                        str2 += '<span class="c">Product ID: </span><span style="text-transform:uppercase">'+c['ad_id']+'</span>';
                    str2 += '</div>';
                    str2 += '<div class="b">';
                        str2 += '<span class="c">Quantity: </span><span>'+c['quantity']+'</span>';
                    str2 += '</div>';
                str2 += '</div>';
                str2 += '<div class="a">';
                    str2 += '<div class="b">';
                        str2 += '<span class="c">Buy In: </span><strong id="price">$ '+c['buy_in']+'</strong>';
                    str2 += '</div>';
                    str2 += '<div class="b">';
                        str2 += '<span class="c">Sell Out: </span><strong id="price">$ '+c['price']+'</strong>';
                    str2 += '</div>';
                str2 += '</div>';
                
            }
        str2 += '</div>';
    str2 += '</li>';
    return str2;
}

function signin(){
    var username = $('.uu #user_name').val();
    var password = $('.uu #password').val();
    $.post(url+"app/staff/sign_in.php",{username:username, password:password}, function (data){
        if (data.split(',')[0] == 'success'){ 
            $('#sign_in_modal').css('transform', 'translateY(100%)');
            $('.tab-nav').show();
            localStorage.setItem('staff_id', data.split(',')[1]);
            localStorage.setItem('name_en', data.split(',')[2]);
            localStorage.setItem('name_kh', data.split(',')[3]);
            localStorage.setItem('total_payback', data.split(',')[4]);
            load();
        } else {
            alert('Login failed');
        }
    });
}

function loadOrderList(keyword){        
    $.post(url+'app/staff/order_list.php', {staff_id: staff_id, keyword:keyword}, function(data){     
        //alert(data);
        var a = JSON.parse(data);
        var str = '<ul class="ol">';
        for (var i = 0; i < a.length; i++){
            b = a[i];                
            str += orderItem(b);
        }
        str += '<ul>';
        //alert(keyword);
        if (keyword == '') {
            $('#order_list').html(str);
        } else {
            
            $('#search_res').html(str);
        }
    }); 
}

function orderItem(b){
    var str = '<li class="item item-complex" onclick="loadOrder(\''+b['id']+'\')">';
        str += '<a class="item-content">';
            str += '<div class="c">';
                str += '<span class="delivery_time">'+b['delivery_time']+'</span>';
                str += '<span class="cc">#'+b['id']+'</span>';
            str += '</div>';
            
            for (var j = 0; j < b['stores'].length; j++) {
                c = b['stores'][j];
                str += '<div class="a">';                        
                    str += '<span class="name">'+c['store_name']+'</span> ';
                    str += '<span class="address">'+c['address']+'</span>';                                                                            
                str += '</div>';
                str += '<div class="b">';
                    str += '<span class="price">$ '+c['buy_in']+'</span> (<span class="item_count">'+c['unit_count']+'<span> items)';
                    str += '<span class="distance">~2 km</span>';
                str += '</div>';
            }
            
            str += '<div class="ion-arrow-down-c"></div>';
            str += '<div class="a">';                        
                str += '<span class="name">'+b['name']+'</span> ';
                str += '<span class="address">'+b['address']+' '+b['location']+'</span>';
            str += '</div>';
            str += '<div class="b">';
                str += '<span class="price">$ '+b['total']+'</span> (<span class="item_count">'+b['item_count']+'<span> items)';
                str += '<span class="distance">~1.1 km</span>';
            str += '</div>';
            str += '<span class="ion-ios-arrow-right"></span>';
        str += '</a>';
    str += '</li>';
    return str;
}

function closeSmallModal(page){        
    $('#'+page).css('transform', 'translateY(100%)');    
}
function cancelClick(){
    $('.button-clear').hide(); 
    $('.search').val('');
    $('.search').prop('disabled', true);
    setTimeout(function(){
        $('.search').prop('disabled', false);
    }, 500);
}
function openModal(page){
    $('#'+page).height($(window).height());        
    $('#'+page).css('transform', 'translateY(0)');
    $('.header-view').hide();        
    $('.tab-nav').hide();    
    $('.search').prop('disabled', true);
    //StatusBar.hide();
}
function openModal2(page){
    $('#'+page).height($(window).height());        
    $('#'+page).css('transform', 'translateY(0)');
    $('.header-view').hide();                  
    //StatusBar.hide();
    
}
function closeModal(page){        
    $('#'+page).css('transform', 'translateY(100%)');    
    $('.header-view').show();        
    $('.tab-nav').show();
    setTimeout(function(){
        $('.search').prop('disabled', false);
    }, 500);
}


function openSmallModal(page){
    $('#'+page).height($(window).height());
    $('#'+page).css('transform', 'translateY(0)');    
    $('.header-view').hide();        
    $('.tab-nav').hide();        
    //StatusBar.hide();
}


function myAlert(en){
    $('#alert .ms-alert-header').text(en);    
    $('#alert').css('display', 'flex');   
}
 

function openActionMenu(id){    
    $('#'+id).css('display', 'flex');   
    setTimeout(function(){
        $('#'+id+' .ms-alert-body').css('transform', 'translateY(0)');    
    }, 100);
    
}
function closeActionMenu(){    
    $('.action-menu .ms-alert-body').css('transform', 'translateY(150%)');
    setTimeout(function(){ $('.action-menu').css('display', 'none');}, 200);
    
}
