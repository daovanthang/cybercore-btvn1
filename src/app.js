const { getListProduct, updateListProduct } = require("./services/product-service");
const yargs = require("yargs");
const { string, number } = require("yargs");


yargs.command({
    command: "get-all",
    handler: () => {
      let listMusic = getListProduct();
      console.log("listMusic : ", listMusic);
    },
  });

  // add product
/**
 * gõ vào terminal :
 *     node ./src/app.js add --name="xiaomi note 100" --price=33 --amount=30 --description="hello"
 */
yargs.command({
    command: "add",
    builder: {
      name: {
        type: String,
      },
      price: {
        type: Number,
      },
      amount: {
        type: Number,
      },
      description: {
        type: String,
      },
    },
    handler: (args) => {
      const { name, price, amount, description } = args;
      let listProducts = getListProduct();
      let id =listProducts[0] && listProducts[listProducts.length -1].id ? listProducts[listProducts.length -1].id : 1;
      if(id !==1)
      id = parseInt(id,10)+1;
      listProducts = [...listProducts, { id:id.toString(), name, price, amount, description }];
      updateListProduct(listProducts);
      console.log("thêm thành công");
    },
  });

    // remove product
/**
 * gõ vào terminal :
 *     node ./src/app.js add --id="1"
 */
  yargs.command({
    command: "remove",
    builder: {
      id: {
        type: String,
      },
    },
    handler: (args) => {
      const { id } = args;
      let listProduct = getListProduct();
      listProduct = listProduct.filter(product => product.id != id);

      updateListProduct(listProduct);
      console.log("xóa thành công");
    },
  });
    // update product
/**
 * gõ vào terminal :
 *     node ./src/app.js update --id="1" --name="samsung" --price=12 --amount=20 --description="hello"
 */
  yargs.command({
    command: "update",
    builder: {
      id: {
        type: String,
      },
      name: {
        type: String,
      },
      price: {
        type: Number,
      },
      amount: {
        type: Number,
      },
      description: {
        type: String,
      },
      
    },
    handler: (args) => {
      const { id, name, price, amount,description} = args;
      let listProduct = getListProduct();
      const index = listProduct.findIndex((product) => product.id == id);
      if (index !== -1) {
        let product = listProduct[index];
        product = { ...product, name, price, amount,description };
        listProduct[index] = product;
        updateListProduct(listProduct);
        console.log("update thành công");
      } else {
        console.log("id không hợp lệ");
      }
    },
  });

/**  Nhập hàng
 * gõ vào terminal :
 *     node ./src/app.js import-goods --id="1"
 */
  yargs.command({
    command: "import-goods",
    builder: {
      id: {
        type: String
      }
    },
    handler: (args) => {
      const {id} = args;
      let listProduct = getListProduct();
      const index = listProduct.findIndex((product) => product.id == id);
      if (index !== -1) {
        let product = listProduct[index];
        product = { ...product,amount:product.amount+50};
        listProduct[index] = product;
        updateListProduct(listProduct);
        console.log("import-goods thành công");
      } else {
        console.log("id không hợp lệ");
      }
    },
  });

  yargs.parse();

