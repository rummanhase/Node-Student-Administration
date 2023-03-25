const express = require('./libExport').express
const mongoose = require('./libExport').mongoose
const router = express.Router()

const Data = require('./InitialData')
const studentModel = require('./model')

mongoose.connection.once('open',async()=>{
    for(let i=0 ; i<Data.length ;i++){
        try{
            const new_student = new studentModel(Data[i])
        await new_student.save()
        }
        catch(err){
            console.error(`Error inserting data: ${error.message}`);
        }
    }
})

router.get('/api/student' ,async (req , res)=>{
    res.json(Data)
})

router.get('/api/student/:id' , (req,res)=>{
    const id = parseInt(req.params.id)
    const student = Data.find( stud => stud.id == id)
    if(student){
        res.send(student)
    }else{
        res.status(400).send('Sudent Not Found')
    }
})
let lastId = Math.max(...Data.map(s=>s.id))


router.post('/api/student' , async(req , res)=>{
    const {name , currentClass , division} = req.body
    if(!name || !currentClass || !division){
        res.status(400).send('Insufficient Data')
    }
    try{
        const new_student = new studentModel({
            id:lastId+1,
            name: req.body.name,
            currentClass: req.body.currentClass,
            division: req.body.division
        })
        await new_student.save()
        Data.push(new_student)
        res.send(new_student)
    }
    catch(err){
        console.error(`Error inserting data: ${err.message}`);
    }
})

router.put('/api/student/:id' ,async (req , res)=>{
    let id = req.params.id
    const isdata = await studentModel.findOne({id:id}) 
    console.log(isdata);
    let {name , currentClass , division} = req.body
    const update = await studentModel.findByIdAndUpdate(
        id,
        {
            name , currentClass , division
        }
    )
    res.send(update)
})

router.delete('/api/student/:id'  , async (req , res)=>{
    let id = req.params.id
    let isDataPresent = await studentModel.findOne({id})
    if(isDataPresent){
        const del_data = await studentModel.findByIdAndDelete(req.params.id)
        res.send(del_data)
    }
    res.status(403).json({message: 'Wrong ID given'})
})

module.exports = router