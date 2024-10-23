import express from 'express';
import  {adminLogin,  adminDashboard, deleteUser} from '../controllers/adminController.js';

const router=express.Router();

router.post('/',adminLogin);
router.get('/dashboard',adminDashboard);
router.patch('/deleteUser',deleteUser);
export default router;