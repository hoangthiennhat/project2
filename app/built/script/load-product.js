

$(document).ready(() => {
    /**
     * move param to detail product when click class product page one
     */
    $('.product').on('click',function() {
        redirectPage();
    })

    let selectLayout = $('.select-item:nth-child(2) option:selected').text(); 
    $('.pagination li:nth-child(2)').addClass('active-pagination');
    $('.select-item:nth-child(2)').change(function() {
        selectLayout = $('.select-item:nth-child(2) option:selected').text();
        $.ajax({
            url : '../db.json',
            type : 'GET',

        }).done(function(data) {
            ajaxProduct(data.products,1,selectLayout);
            ajaxProductList(data.products,1,selectLayout);
            $('.product').on('click',function() {
                redirectPage();
            })
        })
    })
    

    /**
     * load ajax when click to pagination
     */
    $('.pagination li' ).on('click',() => {
        let text = $(event.target).text() ;
        text = +text;
        if ($(event.target).text() == 'Trang sau') {
            
            if ($(event.target).prev().hasClass('active-pagination')) {
                for (let i =2 ;i < 6 ; i++) {
                    let textCurrent = $(`.pagination li:nth-child(${i})`).text(); 
                    $(`.pagination li:nth-child(${i})`).text(+textCurrent + 1);
                }
            } else {

                $('.pagination li.active-pagination').next().addClass('active-pagination');
                $('.pagination li.active-pagination').prev().removeClass('active-pagination');
            }

        
            loadAjax();      
        } else if ($(event.target).text() == 'Trang trước') {
            if ($(event.target).next().hasClass('active-pagination') && $(event.target).next().text() > 1) {
                for (let i =2 ;i < 6 ; i++) {
                    let textCurrent = $(`.pagination li:nth-child(${i})`).text(); 
                    $(`.pagination li:nth-child(${i})`).text(+textCurrent - 1);
                }
            } else {

                $('.pagination li.active-pagination').prev().addClass('active-pagination');
                $('.pagination li.active-pagination').next().removeClass('active-pagination');
            }
        
            loadAjax();
        } else {
            $('.pagination li').removeClass('active-pagination');
            $(event.target).addClass('active-pagination ');    
        }
        loadAjax();
    });

/**
 * function load ajax
 */

function loadAjax() {
    $.ajax({
        url : '../db.json',
        type : 'GET',

    }).done(function(data) {
        let page = $('.pagination li.active-pagination').text();
        ajaxProduct(data.products,page,selectLayout);
        ajaxProductList(data.products,page,selectLayout);

        $('.product').on('click',function() {
            redirectPage();
        })
    

    })
}

    /**
     * function redirect page
     */
    function redirectPage() {
        let target = $(event.currentTarget).find('p').text();
        window.location.href = `detail-product.html?pr=${target}`;
        
    }
    /**
     * close redirectPage
     */

    // onclick id nav list tab
    $('#nav-list-tab').on('click',function() {
        $.ajax({
            url : '../db.json',
            type : 'GET'
        }).done(function(data) {
            ajaxProductList(data.products,1,9);
            /**
             * add cart when load ajax
             */
            $('html,body').on('click',' .btn-buy',function() {
                let textTitle = $(this).parent().siblings('h4').text();
                let itemAdd = data.products.filter((val) => {
                    return val.name === textTitle;
                });
                let itemAdd1 = JSON.stringify(itemAdd[0]);
                let nhat = +localStorage.getItem(itemAdd[0].name);
                if (localStorage.getItem(itemAdd[0].name) == null) {
                    localStorage.setItem(itemAdd[0].name,1);
                } 

            })
        })
    })
});

/**
 * function load product list
 */

function ajaxProductList(data,page,size) {
    
    let wrapProduct = document.createElement('DIV');
    $(wrapProduct).addClass('grid-content');
    let arrProduct = paginate(data,page ,size);
    arrProduct.map((val) => {
        let content = `
                    <div class="item-list-product d-flex">
                        <img src=${val.src} alt="hoa">
                        <div class="item-content">
                            <h4>${val.name}</h4><img src="../images/star.png" alt="star">
                            <p class='mb-0'>${val.content}</p><span>${val.priceNew}</span>
                            <div class="btn-action d-flex align-items-center">
                                                <button class="btn-buy text-uppercase">mua ngay</button>
                                <figure><img src="../images/search.png" alt="search"></figure>
                                <figure><img src="../images/heart.png" alt="heart"></figure>
                        </div>
                        
                    </div>
                        `;                
        $(wrapProduct).append(content); 
        $('#nav-list').html(wrapProduct);
    })

}
/**
 * function load product grid
 */
function ajaxProduct(data,page,size) {
    
        let wrapProduct = document.createElement('DIV');
        $(wrapProduct).addClass('list-content');
        let arrProduct = paginate(data,page ,size);
        arrProduct.map((val) => {
            let content = `
                <div class='product position-relative'>
                    <figure><img src="${val.src}" alt="hoa"></figure>
                    <div class="content">
                        <p>${val.name}</p><img src="../images/star.png" alt="star">
                        <div class="price">
                            <div class="price--new">${val.priceNew}</div>
                            <div class="price--old">${val.priceOld}</div>
                        </div>
                    </div>
                </div>
                `;            
            $(wrapProduct).append(content); 
            $('#nav-grid').html(wrapProduct);
        })
    
}
/*
*   function quy định số tin trong một trang
*/
function paginate(data,page,size) {
    let index = page -1;
    return data.slice(index * size,(index+1)*size);
}


















