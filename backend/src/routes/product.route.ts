import { Router } from 'express';
import productController from '../controller/product.controller';
const productRouter = Router();
// specifies the endpoint and the method to call
productRouter.get('/', productController.getAll);
// export the router
export default productRouter;