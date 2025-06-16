import express from 'express';
import getAdmin from '../controllers/admin/getAdmin.js';
import postAdmin from '../controllers/admin/postAdmin.js';
import putAdmin from '../controllers/admin/putAdmin.js';
import patchAdmin from '../controllers/admin/patchAdmin.js';
import deleteAdmin from '../controllers/admin/deleteAdmin.js';
import loginAdmin from '../controllers/admin/loginAdmin.js';
import logoutAdmin from '../controllers/admin/logoutAdmin.js';
import verifyAdminToken from '../middlewares/verifyAdminToken.js';

const admin = express.Router();

admin.use(express.json());


admin.get('/:id', verifyAdminToken, getAdmin);
admin.post('/', postAdmin);
admin.post('/login', loginAdmin);
admin.delete('/logout', verifyAdminToken, logoutAdmin); 
admin.put('/', verifyAdminToken, putAdmin);
admin.patch('/:id', verifyAdminToken, patchAdmin);
admin.delete('/', verifyAdminToken, deleteAdmin);

export default admin;