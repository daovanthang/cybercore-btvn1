const fs = require("fs");

const getListProduct = () => {
  // đọc data từ file
  let result = fs.readFileSync("./src/products.json");
  // chuyển buffer sang json
  result = JSON.parse(result);
  return result;
};

const updateListProduct = (data) => {
  fs.writeFileSync("./src/products.json", JSON.stringify(data));
};

module.exports = {
    getListProduct,
    updateListProduct,
};
