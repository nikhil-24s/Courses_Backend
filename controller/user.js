const bcrypt = require('bcrypt')
const userModel = require('../models/user')
const jwt = require('jsonwebtoken')

const Admin = async () => {

    const isAdminExist = await userModel.findOne({ email : 'admin@admin.com' });

    if (isAdminExist) {
        console.log('Admin Already Exist');
    }else{
        const hashPassword = await bcrypt.hash("Admin", 10);
    
        const user = userModel({
            username: 'Admin',
            email: 'admin@admin.com',
            password: hashPassword,
            role: 'Admin'
        });
    
        await user.save()
    
        console.log('Admin Created Successfully');
    }

}
const register = async (req, res) => {
    const { username, email, password } = req.body

    const isUserExist = await userModel.findOne({ email });

    if (isUserExist) {
        return res.json({ status: false, message: 'User Already Exist' })
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = userModel({
        username,
        email,
        password: hashPassword
    });

    await user.save()

    res.status(200).json({ status: true, message: 'Registered Successfully' })
}
const login = async (req, res) => {
    const { email, password } = req.body

    const isUserExist = await userModel.findOne({ email });

    if (!isUserExist) {
        return res.json({ status: false, message: 'Username Or Password Is Incorrect' })
    }

    const isPassMatch = await bcrypt.compare(password, isUserExist.password);

    if (!isPassMatch) {
        return res.json({ status: false, message: 'Username Or Password Is Incorrect' })
    }

    const token = jwt.sign({ userId: isUserExist._id, username: isUserExist.username, role: isUserExist.role }, process.env.JWT_SECRET, { expiresIn: '1d' })
    res.cookie('token', token, {
        httpOnly: true,
        sameSite: 'strict',
    });

    res.status(200).json({ status: true, message: 'Login Successfully' })
}

const logout = (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            sameSite: 'strict'
        })
        res.json({ status: true, message: 'Logout Successfully' })
    } catch (error) {
        res.json({ status: false, message: 'Logout failed', error })
    }
}

const authUser = (req, res) => {
    const token = req.cookies.token;
    if(!token){
        return res.json({status: false, message: 'You are not authorized'})
    }

    const user = jwt.verify(token, process.env.JWT_SECRET)
    res.json({ status : true, user })
}

module.exports = {
    register,
    login,
    logout,
    authUser,
    Admin
}