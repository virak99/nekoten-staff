function isLogined(){
    var a = localStorage.getItem('user_id');
    return (typeof a !== 'undefined' && a !== null);
}

function loadProduct(ad_id){  

    $.post('http://www.nekoten.khmerqq.com/app/product.php',{ad_id:ad_id},function(data){
        var ad = JSON.parse(data)[0];
        $('#title').html(ad['title']);
        
        var img = ad['image'].split(',');
        
        
        $('#ad_image').trigger('destroy.owl.carousel');
        //$('#ad_image').html($('#ad_image').find('.owl-stage-outer').html()).removeClass('owl-loaded');
        for (var i = 0; i < img.length; i++){
            var img_url = 'http://nekoten.khmerqq.com/ads/'+ad['ad_id']+'/'+img[i];
            
            $('#ad_image').append('<img src="'+img_url+'">');
        }
        $('#ad_image').owlCarousel({
            responsive:{
                0:{
                    items:1
                }
            }
        });
        
        
        $('.pp #price').html(ad['price']);
        $('.pp #normal_price').html(ad['normal_price']);
        $('.pp #discount').html('-'+ad['discount']+'%');
        var qty = ad['quantity'];
        var t = '';
        if (qty == 0){
            t += '<span class="sold-out">SOLD OUT</span>';
        } else if (qty <= 10){
            t += '<span class="item-left">'+qty+' item';
            if (qty > 1) t += 's';
            t += ' left</span>';
        } else {
            t += '<span class="in-stock">IN STOCK</span>';
        }
        $('.pp #quantity').html(t);
        
        $('.ii #rate').html(ad['rate']);
        $('.ii #review').html(ad['review']);
        $('.ii #view').html(ad['view']);
        $('.ii #n_order').html(ad['n_order']);
        $('.pd #desc').html(ad['description']);
        $('#product_body').show();
    });
    $.post('http://www.nekoten.khmerqq.com/app/location.php',{},function(data){
        var arr = JSON.parse(data);
        for (var i = 0; i < arr.length; i++){
            var location = arr[i];
            $('.dt #location').append($('<option>', {
                value: location['name_en'],
                text: location['name_en']
            }));
        }
        $('.dt #delivery_fee').html('Free');
        $('.dt #delivery_fee').css('color', 'limegreen');
        $('.dt #delivery_time').html('Tomorrow Morning');
    });
    
    $.post('http://www.nekoten.khmerqq.com/app/question.php',{ad_id:ad_id},function(data){
        var arr = JSON.parse(data);
        $('.qs #question').html('');
        $('#n_question').text(arr[0]['nq']);
        for (var i = 0; i < arr.length; i++){
            var q = arr[i];
            $('.qs #question').append('<div class="b"><div class="c"><img src="http://www.nekoten.khmerqq.com/users/'+q['posted_by']+'/profile.jpg"></div><div class="d"><div class="g"><span class="e">'+q['full_name']+'</span><span class="f">'+q['posted_date']+'</span></div><div class="h">'+q['question']+'</div></div></div>');
        }
        
    });
     window.location.href='#tab/product/';
    
}


function searchClick(){ 
    $('.cancel').show();    
}
function cancelClick(){
   $('.search-bar .cancel').hide();
   $('.search-bar .search').val('');
   $('.search-form').html('');
   $('.search-form').height('0');
}

function search(keyword){
    $('#search_res_item').html('');
    cancelClick();
    searchProduct(keyword); 
    window.location.href = '#tab/search_res';
}

function searchKeyword(tab){
    var q = $('#search-'+tab).val();
    //alert(q);
    if (q == ''){
        $('.search-form').html('');
        $('.search-form').height('0');
    } else {
        $.post('http://www.nekoten.khmerqq.com/app/search.php',{q:q},function(data){
            var arr = JSON.parse(data);
            $('.search-form').html('');
            $('.search-form').height('800px');
            for (var i = 0; i < arr.length; i++){
                var ad = arr[i];
                
                //$('.search-form').append('<li onclick="$(\'#search_res_item\').html(\'\'); cancelClick(); searchProduct(\''+ad['keyword']+'\'); window.location.href=\'#tab/search_res\'")>'+ad['keyword']+'</li>');
                $('.search-form').append('<li onclick="search(\''+ad['keyword']+'\')")>'+ad['keyword']+'</li>');
                
                
            }
        });
    }
}

function submitSearchForm(tab){
    var keyword = $('#'+tab).val();
    searchProduct(keyword);;
     cancelClick(); 
     window.location.href = '#tab/search_res';
}

function searchProduct(keyword) {
    
    var size_l = '120';
    var size_g = ($(window).width()-30)/2;
    
    $.post('http://www.nekoten.khmerqq.com/app/search_result.php',{size_g:size_g, size_l:size_l, keyword:keyword},function(data){
        var arr = JSON.parse(data);
        //$('#search_res_item').html('');
        for (var i = 0; i < arr.length; i++){
            var ad = arr[i];
            var ad_id = ad['ad_id'];
            var str = '<li px_l="'+ad['px_l']+'" px_g="'+ad['px_g']+'" margin="'+ad['margin']+'" onclick="loadProduct(\''+ad_id+'\');" class="p-list">';
                str += '<div class="a" style="width:'+size_l+'px;height:'+size_l+'px">';
                    str += '<img style="width:'+ad['w']+'; height:'+ad['h']+'; margin-'+ad['margin']+':'+ad['px_l']+'px" src="http://www.nekoten.khmerqq.com/ads/'+ad['ad_id']+'/1.jpg">';
                str += '</div>';
                str += '<div class="b">';
                    str += '<div class="c">'+ad['title']+'</div>';
                    str += '<div class="e">';
                        str += '<div class="d">'+ad['price']+'</div>';
                        str += '<div class="g">'+ad['n_order']+' Orders</div>';
                    str += '</div>';
                str += '</div>';
            str += '</li>';
            $('#search_res_item').append(str);
        }        
    });
    setTimeout(function() {
        $('#search-search-res').val(keyword);
    }, 100);
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position){
            alert(position.coords.latitude+','+position.coords.longitude);
        });
    }
}


