
const ProductModel = require('../Model/ProductModel');

exports.showHomePage = (req, res) => {
      res.send("Hi,I am Santo biswas")
};

exports.loginCont = (req, res) => {
      res.send("home page")
};

// exports.addProductCont = (req, res) => {
//       res.render("Admin/AddProduct", {
//             title: "Add Product"
//       })
// };

exports.productDataCont = (req, res) => {
      const p_title = req.body.p_title;
      const p_price = req.body.p_price;
      const p_desc = req.body.p_desc;
      const p_image = req.file.path;
      //  console.log(p_title,p_price,p_desc);
      if (!p_title) {
            return res.status(401).json({
                  success: false,
                  message: "Product title is reqired"
            })
      } else if (!p_price) {
            return res.status(401).json({
                  success: false,
                  message: "Product price is reqired"
            })
      } else if (!p_desc) {
            return res.status(401).json({
                  success: false,
                  message: "Product desc is reqired"
            })
      } else if (!p_image) {
            return res.status(401).json({
                  success: false,
                  message: "Image is required"
            })
      } else {
            const product_data = new ProductModel({
                  p_title: p_title,
                  p_price: p_price,
                  p_desc: p_desc,
                  p_image: p_image
            })
            product_data.save().then((result) => {
                  return res.status(201).json({
                        success: true,
                        message: "Data is added",
                        data: result
                  })
            }).catch((err) => {
                  return res.status(401).json({
                        success: false,
                        message: err
                  })
            })
      }
};

exports.showDataCont = (req, res) => {
      ProductModel.find().then((data) => {
            return res.status(201).json({
                  success: true,
                  message: "Show data",
                  dataArray: data
            })
      }).catch((err) => {
            return res.status(401).json({
                  success: false,
                  message: err
            })
      })
};

exports.updateCont = (req, res) => {
      const { p_title, p_price, p_desc } = req.body;
      const e_id = req.params.e_id;
      let e_image = '';
      ProductModel.findById(e_id).then((up_data) => {
            const oldUrl = up_data.p_image;
            if (req.file === undefined) {
                  e_image = oldUrl
            } else {
                  e_image = req.file.path;
            }
            up_data.p_title = p_title,
                  up_data.p_price = p_price,
                  up_data.p_desc = p_desc,
                  up_data.p_image = e_image

            return up_data.save().then((data) => {
                  return res.status(201).json({
                        success: true,
                        message: "Data is successfully edit",
                        dataArray: data
                  })
            }).catch((err) => {
                  return res.status(401).json({
                        success: false,
                        message: err
                  })
            })
      }).catch((err) => {
            return res.status(401).json({
                  success: false,
                  message: err
            })
      })
};

exports.deleteCont = (req, res) => {
      const d_id = req.params.id;
      ProductModel.deleteOne({ _id: d_id }).then(() => {
            return res.status(201).json({
                  success: false,
                  message: "Data is successfully delete"
            })
      }).catch((err) => {
            return res.status(401).json({
                  success: false,
                  message: err
            })
      })
}
