const Todo = require('../models/Todo');
const { v4: uuidv4 } = require('uuid');
const { Teacher } = require('../models/Users');
const { Student } = require('../models/Users');

module.exports = {
    getTodos: async (req,res)=>{
        console.log(req.user)
        const passKey =  uuidv4();
        try{
            let todoItems = await Todo.find({teacherId:req.user.teacherId})
            todoItems = todoItems.sort((a, b) => a.completed - b.completed)
            const itemsLeft = await Todo.countDocuments({assignedToId:req.user.id,completed: false})
            const teamTeachers = await Student.find({teacherId: req.user.teacherId})
            const adminTeacher = await Teacher.findById(req.user.teacherId)
            const allTeachers = [adminTeacher, ...teamTeachers]
            res.render('todos.ejs', {todos: todoItems, left: itemsLeft, user: req.user, teacherId: req.user.teacherId, teamTeachers: allTeachers, passKey: passKey})
        }catch(err){
            console.log(err)
        }
    },
    createDocument: async (req, res)=>{
        try{
            await Todo.create({todo: req.body.todoItem, completed: false, userId: req.user.id, completedByUserId: req.user.id, teacherId: req.user.teacherId})
            console.log('Todo has been added!')
            res.redirect('/todos')
        }catch(err){
            console.log(err)
        }
    },
    markComplete: async (req, res)=>{
        try{
            await Todo.findOneAndUpdate({_id:req.body.documentIdFromJSFile},{
                completed: true
            })
            console.log('Marked Complete')
            res.json('Marked Complete')
        }catch(err){
            console.log(err)
        }
    },
    markIncomplete: async (req, res)=>{
        try{
            await Todo.findOneAndUpdate({_id:req.body.documentIdFromJSFile},{
                completed: false
            })
            console.log('Marked Incomplete')
            res.json('Marked Incomplete')
        }catch(err){
            console.log(err)
        }
    },
    deleteDocument: async (req, res)=>{
        console.log(req.body.documentIdFromJSFile)
        try{
            await Todo.findOneAndDelete({_id:req.body.documentIdFromJSFile})
            console.log('Deleted Todo')
            res.json('Deleted It')
        }catch(err){
            console.log(err)
        }
    },
    getTeachersByTeacherId: async (req, res)=>{
        try{
            const userTeam = await Student.find({teacherId: req.user.teacherId})
            res.json(userTeam)
        }catch(err){
            console.error(err)
            res.status(500).send('Server Error')
        }
    },
    assignDocument: async (req, res)=>{
        try{
            await Todo.findByIdAndUpdate(req.params.documentId, {assignedToId: req.params.userId})
            res.json({status: 'OK'})
        }catch(err){
            console.error(err)
            res.status(500).send('Server Error')
        }
    }
}    