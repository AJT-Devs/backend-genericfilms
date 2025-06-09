import express from 'express';
import getAdmin from '../controllers/admin/getAdmin.js';
import postAdmin from '../controllers/admin/postAdmin.js';
import putAdmin from '../controllers/admin/putAdmin.js';
import patchAdmin from '../controllers/admin/patchAdmin.js';
import deleteAdmin from '../controllers/admin/deleteAdmin.js';
import loginAdmin from '../controllers/admin/loginAdmin.js';

const admin = express.Router();

admin.get('/', getAdmin);
admin.post('/', postAdmin);
admin.get('/login', express.json(),loginAdmin);
admin.put('/', putAdmin);
admin.patch('/', patchAdmin);
admin.delete('/', deleteAdmin);

export default admin;