import WooCommerceAPI from "woocommerce-api";

const WooCommerce = new WooCommerceAPI({
  url: "https://kabelnye-lotki.ru",
  consumerKey: "ck_8c9cf4bebc8da20b63f13b197f624ba30c992ddc",
  consumerSecret: "cs_49d1c6848bbe8e0f3130b6748d5e29c459544343",
  wpAPI: true,
  version: "wc/v1",
});

function serialize(obj, prefix) {
  var str = [],
    p;
  for (p in obj) {
    if (obj.hasOwnProperty(p)) {
      var k = prefix ? prefix + "[" + p + "]" : p,
        v = obj[p];
      str.push(
        v !== null && typeof v === "object"
          ? serialize(v, k)
          : encodeURIComponent(k) + "=" + encodeURIComponent(v)
      );
    }
  }
  return str.join("&");
}

class CatalogController {
  getCatalog(req, res) {
    try {
      WooCommerce.getAsync("products?per_page=50&" + serialize(req.query)).then(
        function (result) {
          res.status(200).json({
            code: "get-catalog",
            totalPages: result.toJSON().headers["x-wp-totalpages"],
            total: result.toJSON().headers["x-wp-total"],
            data: JSON.parse(result.toJSON().body),
          });
        }
      );
    } catch (error) {
      res.status(400).json(error);
    }
  }
}

export default new CatalogController();
