$(document).ready(function() {
    $('section .section-new:first-child h4').click(function() {
        $('section').load('./new-detail.html',function() {
            return true;
        })
    })
})