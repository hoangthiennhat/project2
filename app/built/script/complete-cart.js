$(document).ready(() => {
    // let param = window.location.search;
    // param = decodeURI(param);
    // let arrParam = param.split('&');
    // let param1 = arrParam[0].slice(6);
    $('.select-buy button:first-child').on('click',() => {
        localStorage.clear();
        window.location.reload();
    })
    $('.select-buy button:nth-child(2)').on('click',() => {
        window.location.href = 'list-product.html'
        
    })
    let arrPrice = [];
    for (let i = 0; i < localStorage.length; i++ ) {
        let key = localStorage.key(i);
        let value = localStorage.getItem(key); 

        $.ajax({
            type : 'GET',
            url : '../db.json'
        }).done((data) => {
            let objProduct = data.products.filter((val) => {
                return val.name == key;
            });
            let arrProduct = objProduct[0].priceNew.split('.');
            arrProduct[arrProduct.length - 1] = arrProduct[arrProduct.length - 1].slice(0,3);
            let strPrice = +(arrProduct.join(''));
            let createProduct = document.createElement('tr');
            $(createProduct).append(`
                <td>
                    <figure><img src=${objProduct[0].src} alt="cây"></figure>
                </td>
                <td class="text-uppercase">${key}</td>
                <td>${objProduct[0].priceNew}</td>
                <td>
                    <li>${value}</li>
                </td>
                <td>${strPrice * value}đ</td>
                <td><img src="../images/delete.png" alt="delete"></td>
        `)
            $('.cart tbody').append(createProduct);
            
            arrPrice.push(strPrice * value);
            let totalPay = 0;
            arrPrice.map((val) => {
                return totalPay += val;
            })        
            $('.total-pay tbody tr:first-child td:nth-child(2)').text(totalPay + ' Đ');
            $('.total-pay tbody tr:nth-child(2) td:nth-child(2)').text(totalPay * 10 / 100 + ' Đ');
            $('.total-pay thead tr td:nth-child(2)').text(totalPay + (totalPay * 10 / 100) + ' Đ');
            /**
             * show number product on cart header
             */
            $('.header--content-search>span').text(localStorage.length + ' sản phẩm');
            /**
             * remove item product
             */
            $('.cart tbody tr td:last-child img').on('click',() => {
                let target = $(event.currentTarget).parent().siblings('td:nth-child(2)').text();
                localStorage.removeItem(target);
                window.location.reload();
            })
        })

        

    }

    
    
})