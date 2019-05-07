const templateClass = require('./api-manage.js');

const Product = new templateClass();
function checkApi() {
    return Product.addProduct(30,'Cây Dạ Lam','tên','nội dung',23,345);
}
module.exports = checkApi;