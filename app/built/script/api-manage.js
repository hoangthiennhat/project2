class Product {
    constructor() {
        this.product = require('../db.json');
        this.arrProduct = this.product.products;
    }
    allProduct() {
        return this.product;
    }
    
    addProduct(id,src,content,name,priceNew,priceOld) {
        this.arrProduct.push({
            id : id,
            src : src,
            content : content,
            name : name,
            priceNew : priceNew,
            priceOld : priceOld
        })
    
        
        return  this.product;
    }

    deleteProduct(name) {
        let arrDelete = this.arrProduct.filter((val) => val.name != name);
        return {
            products : arrDelete
        }
    }

    editProduct(title,name,content,priceNew,priceOld) {
        let arrProductOld = this.arrProduct.filter((val) => {
            return val.name !== title;
        })
        let arrNewProduct = [] ;
        let arrProduct = this.findProduct(title);
        arrProduct.products.map((val) => {
            val.name = name;
            val.content = content;
            val.priceNew = priceNew;
            val.priceOld = priceOld;
            arrNewProduct.push(val);
        })
        this.arrProduct = [...arrNewProduct,...arrProductOld];
        return {
            products : this.arrProduct
        }
    }
    findProduct(title) {
    let itemProduct = this.arrProduct.filter((val) => val.name.includes(title));
        return {
            products : itemProduct
        }
        
    }
 
}
module.exports = Product;