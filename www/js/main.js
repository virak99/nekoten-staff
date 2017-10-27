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


