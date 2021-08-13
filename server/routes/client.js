const express = require('express');
const router = express.Router();
const Client = require('../models/client');
const Activities = require('../models/activities')

// http://localhost:5000/client/create
router.post('/create', async(req,res) => {

    const clientName = req.body.clientName ; 

    const clientData = {
        clientName : clientName
    };
    const client = new Client(clientData);
    await client.save();


    const names = await Client 
      .find()
    
    res.send(names)
})

router.get('/all' , async(req,res) => {
    const names = await Client 
    .find()
    res.send(names)
})


router.post('/create/activity' , async(req,res) => {
    let client = await Client.findById('61143e7f2a699b804567d5e3')

    const newActivity = await Activities.create({
        desc: 'new' , 
        created: Date.now() , 
        tags:['#explore']
    })

    client.activities.push(newActivity)
    client.save()

    let updatedActivities = await Client.find().populate({
        path : 'activities',
        model : 'Activities'
    })

    res.send(updatedActivities)

})


module.exports = router ;



/*

await client 
    .find()
    .populate('activity')
    .select('triggers body')

*/ 