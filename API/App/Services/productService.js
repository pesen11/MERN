class ProductService {
  validateProduct = (data) => {
    let errMsg = {};

    if (!data.name) {
      errMsg.name = "Product title is missing";
    }

    if (!data.price) {
      errMsg.price = "Price is missing";
    }

    if (!data.category) {
      errMsg.category = "Category missing";
    }
    if (Object.keys(errMsg).length > 0) {
      throw {
        status: 400,
        msg: errMsg,
      };
    } else {
      return null;
    }
  };
}

module.exports = ProductService;
