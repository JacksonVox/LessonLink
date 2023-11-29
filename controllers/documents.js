const Document = require('../models/Document');
const { v4: uuidv4 } = require('uuid');
const Teacher = require('../models/Teacher');
const Student = require('../models/Student');

module.exports = {
    getDocs: async (req,res)=>{
        console.log(req.user)
        const passKey =  uuidv4();
        try{
            let documentItems = await Document.find({adminId:req.user.adminId})
            documentItems = documentItems.sort((a, b) => a.completed - b.completed)
            const itemsLeft = await Document.countDocuments({assignedToId:req.user.id,completed: false})
            const teamUsers = await SubUser.find({adminId: req.user.adminId})
            const adminUser = await User.findById(req.user.adminId)
            const allUsers = [adminUser, ...teamUsers]
            res.render('teacher-documents.ejs', {documents: documentItems, left: itemsLeft, user: req.user, adminId: req.user.adminId, teamUsers: allUsers, passKey: passKey})
        }catch(err){
            console.log(err)
        }
    },
    createDocument: async (req, res)=>{
        try{
            await Document.create({document: req.body.documentItem, completed: false, userId: req.user.id, completedByUserId: req.user.id, adminId: req.user.adminId})
            console.log('Document has been added!')
            res.redirect('/documents')
        }catch(err){
            console.log(err)
        }
    },
    markComplete: async (req, res)=>{
        try{
            await Document.findOneAndUpdate({_id:req.body.documentIdFromJSFile},{
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
            await Document.findOneAndUpdate({_id:req.body.documentIdFromJSFile},{
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
            await Document.findOneAndDelete({_id:req.body.documentIdFromJSFile})
            console.log('Deleted Document')
            res.json('Deleted It')
        }catch(err){
            console.log(err)
        }
    },
    getUsersByAdminId: async (req, res)=>{
        try{
            const userTeam = await SubUser.find({adminId: req.user.adminId})
            res.json(userTeam)
        }catch(err){
            console.error(err)
            res.status(500).send('Server Error')
        }
    },
    assignDocument: async (req, res)=>{
        try{
            await Document.findByIdAndUpdate(req.params.documentId, {assignedToId: req.params.userId})
            res.json({status: 'OK'})
        }catch(err){
            console.error(err)
            res.status(500).send('Server Error')
        }
    }
}    