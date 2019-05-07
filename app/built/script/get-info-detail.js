$(document).ready(function() {
    let query  = window.location.search;
    let param = decodeURI(query);
    let paramCorrect = param.slice(4);
    let quantity = $('.quantity li:nth-child(3)').text();
    quantity = +quantity;
    $.ajax({
        type : 'GET',
        url : '../db.json'
    }).done((data) => {
        let itemTitle = data.products.filter((val) => {
            return val.name == paramCorrect;
        })
        $('.detail--info-content h4').text(itemTitle[0].name);
        $('.detail--info-content>span').text(itemTitle[0].priceNew);
        $('.detail--info-content label').text(itemTitle[0].priceOld);
        $('.detail--info-content p').text(itemTitle[0].content);

        $('.btn-buy').on('click',function() {
            let textTitle = $('.detail--info-content h4').text();
            let itemAdd = data.products.filter((val) => {
                return val.name === textTitle;
            });
            let itemAdd1 = JSON.stringify(itemAdd[0]);
            if (localStorage.getItem(itemAdd[0].name) == undefined) {
                localStorage.setItem(itemAdd[0].name,quantity);
            } else {
                localStorage.setItem(itemAdd[0].name,+(localStorage.getItem(itemAdd[0].name)) + quantity);
            }
            
            
            window.location.href = `cart.html?name=${paramCorrect}&quantity=${quantity}`
        })
        
    })
    $('.quantity li:nth-child(4)').on('click',() => {
        quantity++;
        $('.quantity li:nth-child(3)').text(quantity);
    })
    $('.quantity li:nth-child(2)').on('click',() => {
        if (quantity > 1) {
            quantity--;
            $('.quantity li:nth-child(3)').text(quantity);
        }
        
    })
})