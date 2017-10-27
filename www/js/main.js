function signin(){
    var username = $('.uu #user_name').val();
    var password = $('.uu #password').val();
    $.post("http://www.nekoten.khmerqq.com/staff/sign_in.php",{username:username, password:password}, function (data){
        if (data.split(',')[0] == 'success'){ 
            $('#sign_in_modal').css('transform', 'translateY(100%)');
            $('.tab-nav').show();
            localStorage.setItem('staff_id', data.split(',')[1]);
            localStorage.setItem('name_en', data.split(',')[2]);
            localStorage.setItem('name_kh', data.split(',')[3]);
            load();
        } else {
            alert('Login failed');
        }
    });
}

localStorage.setItem('staff_id', '001');
localStorage.setItem('name_en', 'Vong Virak');
localStorage.setItem('name_kh', 'kk');


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

