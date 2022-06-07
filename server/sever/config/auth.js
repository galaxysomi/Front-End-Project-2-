const jwt =  require("jsonwebtoken")
const express = require("express")

//Load User
const Teacher = require('../../models/Teacher')
const Parent = require('../../models/Parent')
const Admin = require('../../models/admin')


exports.checkLogin = async (req, res, next) => {
	try {
        const authHeader = req.header('Authorization')
	    const token = authHeader && authHeader.split(' ')[1]
		const iidUser = jwt.verify(token,'longphu')
        res.json({success: false,message:'Ban da dang nhap'})   
	} catch (error) {
		next()
	}
}


exports.checkTeacher =async (req, res,next ) => {
    try{
        const authHeader = req.header('Authorization')
	    const token = authHeader && authHeader.split(' ')[1]
        const idUser = jwt.verify(token,'longphu')
        await Teacher.findOne({
            idUser
        })
        .then(user => {
            if(user){
                next()
            }else{
                res.json({success: false, message: 'Bạn không đủ quyền'})
            }
        })
    }catch(err){
        res.json({success: false, message: 'Bạn chưa đăng nhập'})
    }
}


exports.checkAdmin =  (req, res, next) => {
    try{
        const authHeader = req.header('Authorization')
	    const token = authHeader && authHeader.split(' ')[1]
        const idUser = jwt.verify(token,'longphu')
        Admin.findOne({
            idUser
        })
        .then(user => {
            if(user){
                next()
            }else{
                res.json({success: false, message: 'Bạn không đủ quyền'})
            }
        })
    }catch(err){
        res.json({success: false, message: 'Bạn chưa đăng nhập'})
    }
}

exports.checkParent = async (req, res, next) => {
    try{
        const authHeader = req.header('Authorization')
	    const token = authHeader && authHeader.split(' ')[1]
        const idUser = jwt.verify(token,'longphu')
        await Parent.findOne({
            idUser
        })
        .then(user => {
            if(user){
                next()
            }else{
                res.json({success: false, message: 'Bạn không đủ quyền'})
            }
        })
    }catch(err){
        res.json({success: false, message: 'Bạn chưa đăng nhập'})
    }
}
