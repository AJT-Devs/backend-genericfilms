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

admin.get('/', getAdmin);
admin.post('/', postAdmin);
admin.post('/login', express.json(),loginAdmin);
admin.post('/verifytoken', express.json(),verifyAdminToken);
admin.delete('/logout', express.json(),logoutAdmin); 
admin.put('/', putAdmin);
admin.patch('/', patchAdmin);
admin.delete('/', deleteAdmin);

export default admin;