import { Router } from "express";
import urlRoutes from './url.route';
import authRoutes from './auth.route';
import myAccountRoutes from './my-account.route';
import userRepository from "../repositories/user-repository";
import visitorRoutes from './visitor.route';

const api = Router();

const router = Router();

api.use('/api', router);

router.use(authRoutes)
router.use(myAccountRoutes);

router.use('/urls', urlRoutes);
router.use('/visitors', visitorRoutes);

router.delete('/delete', async (req, res, next) => {
    userRepository.deleteAll();

    res.json({ message : 'All users deleted' });
});

export default api;
