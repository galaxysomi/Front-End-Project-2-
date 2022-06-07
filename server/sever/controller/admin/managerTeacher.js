const express = require('express');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const flash = require('connect-flash');
// Load User model
const Teacher = require('../../../models/Teacher')

exports.add = (req, res) => {
    const { name, age,username,className, password, password2,SDT } = req.body;

    if (password != password2) {
      res.json({success:false, message: 'Passwords do not match' });
    }
  
    if (password.length < 6) {
      res.json({success:false, message: 'Password must be at least 6 characters' });
    }
     else {
      Teacher.findOne({ username: username }).then(user => {
        if (user) {
          res.json({success:false, message: 'Tài khoản đã tồn tại'})
        } else {
          const newUser = new Teacher({
            name,
            age,
            username,
            password,
            className,
            SDT
          });
  
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) throw err;
              newUser.password = hash;
              newUser
                .save()
                .then(user => {
                  res.json({success:true, message:'Tạo tài khoản thành công'})
                })
                .catch(err => res.status(400).send({success:false, message:'Something went wrong'}));
            });
          });
        }
      });
    }
}

exports.find = async(req, res) => {
  try{
    if(req.query.id){
      const id = req.query.id;

      await Teacher.findById(id)
          .then(data =>{
              if(!data){
                  res.status(404).json({ message : "Not found teacher with id "+ id})
              }else{
                  res.json(data)
              }
          })
          .catch(err =>{
              res.status(500).json({ message: "Erro retrieving teacher with id " + id})
          })

  }else{
      await Teacher.find()
          .then(data => {
              res.json(data)
          })
          .catch(err => {
              res.status(500).json({ success: false, message : "Error Occurred while retriving teacher information" })
          })
      }
  
  }catch{
    res.status(500).json({ success: false, message: 'Thất bại' })
  }
}

exports.update = (req, res)=>{
  if(!req.body){
      return res  
          .status(400)
          .json({success:false, message : "Data to update can not be empty"})
  }

  const id = req.params.id;
  Teacher.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
      .then(data => {
          if(!data){
              res.status(404).json({ susccess:false,message : `Cannot Update teacher with ${id}. Maybe teacher not found!`})
          }else{
              res.json({success:true, message:'Sửa thành công'})
          }
      })
      .catch(err =>{
          res.status(500).json({susccess:false, message : "Error Update teacher information"})
      })
}

// Delete a user with specified user id in the request
exports.delete = (req, res)=>{
  const id = req.params.id;

  Teacher.findByIdAndDelete(id)
      .then(data => {
          if(!data){
              res.status(404).json({success:false, message : `Cannot Delete with id ${id}. Maybe id is wrong`})
          }else{
              res.json({susccess:true,
                  message : "Teacher was deleted successfully!"
              })
          }
      })
      .catch(err =>{
          res.status(500).json({
              susccess:false,
              message: "Could not delete teacher with id=" + id
          });
      });
}
