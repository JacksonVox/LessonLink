const { v4: uuidv4 } = require('uuid');
const { Teacher } = require('../models/Users');
const { Student } = require('../models/Users');

module.exports = {
    getStudents: async (req,res)=>{
        console.log(req.user)
        const passKey =  uuidv4();
        try{
            let students = await Student.find({teacherId:req.user.teacherId})
            students = students.sort((a, b) => a.completed - b.completed)
            const adminTeacher = await Teacher.findById(req.user.teacherId)
            res.render('students.ejs', {students: students, user: req.user, teacherId: req.user.teacherId, passKey: passKey})
        }catch(err){
            console.log(err)
        }
    },
}    