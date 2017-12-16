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
            str += '<div class="yt">';           
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
                
                str += '<ul class="c">';
                    var str2 = '';
                    for (var j = 0; j < b['ads'].length; j++){
                        var c = b['ads'][j];
                        str2 += '<li id="item-fhtv">';
                            str2 += '<div class="d">';
                                str2 += '<img src="'+url+'ads/'+c['ad_id']+'/1_m.jpg"/>';
                            str2 += '</div>';
                            str2 += '<div class="e">';
                                str2 += '<div id="title">'+c['title']+'</div>';
                                str2 += '<div class="f">';
                                    str2 += '<strong id="price">$ '+c['buy_in']+'</strong> x <strong id="qty">'+c['unit_count']+'</strong>';
                                str2 += '</div>';
                            str2 += '</div>';
                        str2 += '</li>';
                    }
                    str += str2;
                str += '</ul>';
                str += '<div class="h">';
                    str += '<span>Total</span> <span>('+b['store_item_count']+' items)</span><span class="total-price">$ '+b['store_buy_in']+'</span>';
                str += '</div>';
            str += '</div>';
            str += '<div class="hr"></div>';
        }
        
        
        str += '<div class="yr">';
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
            str += '<li class="item item-complex" onclick="loadOrder(\''+b['id']+'\')">';
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
            
        }
        str += '<ul>';
        if (keyword == '') {
            $('#order_list').html(str);
        } else {
            $('#search_res').html(str);
        }
    }); 
}



function closeSmallModal(page){        
    $('#'+page).css('transform', 'translateY(100%)');    
}

function openModal(page){
    $('#'+page).height($(window).height());        
    $('#'+page).css('transform', 'translateY(0)');
    $('.header-view').hide();        
    $('.tab-nav').hide();        
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
