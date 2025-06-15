import { ReadAllUsers } from '../../models/user.js';

async function getAllUser(req, res, next) {

    try {

        const users = await ReadAllUsers();

        if (!users || users.length === 0) {
            return res.status(404).json({ message: 'No users found' });
        }

        return res.status(200).json({
            message: 'ok',
            users: users
        });

    } catch (error) {
        next(error);
    }
    
}

export default getAllUser;