const Activity = require('../../../models/activity')
const mongoose = require('mongoose')

exports.create = async (req,res)=>{
    // validate request
    if(!req.body){
        return res.status(400).json({success:false, message : "Content can not be emtpy!"})
    }

    const {title,description,place, date, timeStart, timeFinish} = req.body
    // new user
    try{const newActivity = new Activity({
        title,
        description,
        place,
        date,
        timeStart,
        timeFinish
    })

    await newActivity.save()
    res.json({ success: true, message: 'Thêm thành công', activity : newActivity })
    }catch{
            res.status(500).json({ success: false, message: 'Thất bại' })
        };

}

// retrieve and return all users/ retrive and return a single user
exports.find = async (req, res)=>{

   try{ if(req.query.id){
        const id = req.query.id;

        await Activity.findById(id)
            .then(data =>{
                if(!data){
                    res.status(404).json({ message : "Not found activity with id "+ id})
                }else{
                    res.json(data)
                }
            })
            .catch(err =>{
                res.status(500).json({ message: "Erro retrieving activity with id " + id})
            })

    }else{
        await Activity.find()
            .then(data => {
                res.json(data)
            })
            .catch(err => {
                res.status(500).json({ success: false, message : "Error Occurred while retriving activity information" })
            })
        }
    }catch{
    res.status(500).json({ success: false, message: 'Thất bại' })
    }
}

exports.findDate = async (req, res) => {
    if (!req.body){
        return res.json({ success: false, message: 'Bạn hãy nhập ngày'})
    }
    const date = new Date(req.body.date)
    await Activity.find({date})
        .then((data) => {
            if(data){
                return res.json({activity: data })
            }else{
                return res.json({susccess:false, message:"Không có hoạt động trong ngày này"})
            }
        })
        .catch(err=>{
            res.status(500).json({susccess:false, message : "Lỗi tìm kiếm"})
        })
}

// Update a new idetified user by user id
exports.update = (req, res)=>{
    if(!req.body){
        return res  
            .status(400)
            .json({success:false, message : "Data to update can not be empty"})
    }

    const id = req.params.id;
    Activity.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
        .then(data => {
            if(!data){
                res.status(404).json({ susccess:false,message : `Cannot Update activity with ${id}. Maybe user not found!`})
            }else{
                res.json({success:true, message:'Sửa thành công'})
            }
        })
        .catch(err =>{
            res.status(500).json({susccess:false, message : "Error Update activity information"})
        })
}

// Delete a user with specified user id in the request
exports.delete = (req, res)=>{
    const id = req.params.id;

    Activity.findByIdAndDelete(id)
        .then(data => {
            if(!data){
                res.status(404).json({success:false, message : `Cannot Delete with id ${id}. Maybe id is wrong`})
            }else{
                res.json({susccess:true,
                    message : "Activity was deleted successfully!"
                })
            }
        })
        .catch(err =>{
            res.status(500).json({
                susccess:false,
                message: "Could not delete activity with id=" + id
            });
        });
}

exports.findActivityById= (req,res)=>{
    const id= req.params.id;
    console.log(id)
    Activity.findOne({_id:id},(err,doc)=>{
        if(err)return res.json({status:'false',msg:"khong tim thay"})
        return res.json({status:"success",data:doc})
    })
}

