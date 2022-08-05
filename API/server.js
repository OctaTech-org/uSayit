import {mongoose_connect, History as Message} from './moduls/db.js'
import expres from 'express'
import path from 'path'
import ImageManipulation from './contorollers/imageManipulation.js'

const app = expres()

app.use(expres.json())

app.use((req, res, next) => {
            
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);

    next();

    return;
});

app.post('/api/sendMessage', (req,res) => {
    let messagePost = new Message()
        messagePost.message = req.body.message;
        messagePost.instagram = req.body.instagram
        messagePost.twitter = req.body.twitter
    messagePost.save((err, docs) => {
        if(!err){
            console.log(docs)
            res.json(docs)
        }else{
            console.log(err)
        }
    })
    
})

app.post('/api/sendFeedback', (req,res) => {
        res.send('kosongin dulu aja')
})

app.post('/api/igPreview' , async(req,res) => {
    let text = req.body.text
    let imagePreview =  await new ImageManipulation().preview(text)

    res.json({image : imagePreview});
    console.log(text)
})




app.listen(8080, () => {
    console.log('server at port : 8080')
})
