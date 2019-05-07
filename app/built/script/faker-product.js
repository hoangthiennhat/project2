var faker = require('faker')
function generateProducts () {
  var products = [];
  for (var id = 0; id < 300; id++) {
    var firstName = faker.name.firstName()
    var lastName = faker.name.lastName()
    var email = faker.internet.email()
    products.push({
      "id": id,
      "first_name": firstName,
      "last_name": lastName,
      "email": email
    })
  }
  return { "product": products }
}
module.exports = generateProducts;