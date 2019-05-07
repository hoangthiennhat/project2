 const popup = function() {
    $('#wrap-popup').css({
        top : '100px'
    })
    $('.delete').on('click',function() {
        $('#wrap-popup').css({
            display : 'none'
        })  
    })
 
 }      
 
    
    // localStorage
    window.addEventListener('DOMContentLoaded',function() {
        
        if(sessionStorage.getItem('name') != 'thiennhat') {
            popup();
            sessionStorage.setItem('name','thiennhat');
        } else {
            return true;
        } 
    })