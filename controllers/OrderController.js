import FileService from "../services/FileService.js";

class OrderController {
  getOrders(req, res) {
    res.json({ test: "getOrders" });
  }

  async createOrder(req, res) {
    try {
      const filename = await FileService.uploadUserXls(req.files.document);
      res.json({ test: filename });
    } catch (error) {
      res.status(400).json(error);
    }
  }
}

export default new OrderController();
