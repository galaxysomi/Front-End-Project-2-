const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

//Load User
const Teacher = require ('../../models/Teacher');
const Parent =  require ('../../models/Parent');
const Admin = require ('../../models/admin');

exports.loginAdmin = async (req, res) => {
    const {username, password} = req.body;
    if (!username || !password)
		return res
			.status(400)
			.json({ success: false, message: 'Không tìm thấy tài khoản hoặc mật khẩu' })
    try{
        const user = await Admin.findOne({username})
        if (!user)
            return res
                .status(400)
                .json({success:false, message:'Tài khoản hoặc mật khẩu sai'})
        
        bcrypt.compare(password, user.password, (err, isMatch)=>{
            if (err) return res.json(err)
            if (isMatch){
                const token = jwt.sign(
                    {userId: user._id},'longphu')
                res.json(
                    {success:true, message: 'Đăng nhập thành công', token})
            }else{
                return res.json({success:false, message:'Tài khoản hoặc mật khẩu sai'})
            }
        })
    }catch(err){
        console.log(err)
        res.status(500).json({success:false, message:'Lỗi sever'})
    }

}
exports.loginParent = async (req, res) => {
    const {username, password} = req.body;
    if (!username || !password)
		return res
			.status(400)
			.json({ success: false, message: 'Không tìm thấy tài khoản hoặc mật khẩu' })
    try{
        const user = await Parent.findOne({username})
        if (!user)
            return res
                .status(400)
                .json({success:false, message:'Tài khoản hoặc mật khẩu sai'})
        
        bcrypt.compare(password, user.password, (err, isMatch)=>{
            if (err) return res.json(err)
            if (isMatch){
                const token = jwt.sign(
                    {userId: user._id},'longphu')
                res.json(
                    {success:true, message: 'Đăng nhập thành công', token})
            }else{
                return res.json({success:false, message:'Tài khoản hoặc mật khẩu sai'})
            }
        })
    }catch(err){
        console.log(err)
        res.status(500).json({success:false, message:'Lỗi sever'})
    }

}

exports.loginTeacher = async (req, res) => {
    const {username, password} = req.body;
    if (!username || !password)
		return res
			.status(400)
			.json({ success: false, message: 'Không tìm thấy tài khoản hoặc mật khẩu' })
    try{
        const user = await Teacher.findOne({username})
        if (!user)
            return res
                .status(400)
                .json({success:false, message:'Tài khoản hoặc mật khẩu sai'})
        
        bcrypt.compare(password, user.password, (err, isMatch)=>{
            if (err) return res.json(err)
            if (isMatch){
                const token = jwt.sign(
                    {userId: user._id},'longphu')
                res.json(
                    {success:true, message: 'Đăng nhập thành công', token})
            }else{
                return res.json({success:false, message:'Tài khoản hoặc mật khẩu sai'})
            }
        })
    }catch(err){
        console.log(err)
        res.status(500).json({success:false, message:'Lỗi sever'})
    }

}

