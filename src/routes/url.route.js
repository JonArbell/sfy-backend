import { Router } from "express";
import { validateBody } from "../middlewares/body-validator";
import { shortenUrlValidator } from "../dtos/request/shorten-url-request.dto";
import urlController from "../controllers/url-controller";
import { authenticateJWT } from "../middlewares/token-middleware";
const router = Router();
const authenticated = Router();
authenticated.post('/', authenticateJWT, validateBody(shortenUrlValidator), urlController.shortenUrl);
authenticated.get('/', authenticateJWT, urlController.getAllUrls);
authenticated.delete('/:id', authenticateJWT, urlController.deleteUrlById);
// authenticated.put('/:id',
//     authenticateJWT,
//     urlController.deleteUrlById
// );
// authenticated.get('/:id',
//     authenticateJWT,
//     urlController.deleteUrlById
// );
router.get('/short/:shortUrl', urlController.getUrlByShort);
router.use(authenticated);
export default router;
