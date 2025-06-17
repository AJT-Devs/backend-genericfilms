import express from 'express';
import getListAdmin from '../controllers/admin/getListAdmin.js';
import getAdmin from '../controllers/admin/getAdmin.js';
import putAdmin from '../controllers/admin/putAdmin.js';
import patchAdmin from '../controllers/admin/patchAdmin.js';
import deleteAdmin from '../controllers/admin/deleteAdmin.js';
import signUpAdmin from '../controllers/auth/admin/signUpAdmin.js';
import loginAdmin from '../controllers/auth/admin/loginAdmin.js';
import logoutAdmin from '../controllers/auth/admin/logoutAdmin.js';
import verifyAdminToken from '../middlewares/verifyAdminToken.js';

const admin = express.Router();

admin.use(express.json());

admin.get('/list', verifyAdminToken, express.json(), getListAdmin);
admin.get('/:id', verifyAdminToken, getAdmin);
admin.post('/signup', signUpAdmin);
admin.post('/login', loginAdmin);
admin.delete('/logout', verifyAdminToken, logoutAdmin); 
admin.put('/:id', verifyAdminToken, putAdmin);
admin.patch('/:id', verifyAdminToken, patchAdmin);
admin.delete('/:id', verifyAdminToken, deleteAdmin); 

export default admin;