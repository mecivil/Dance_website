const express=require('express');
const path=require('path');
const mongoose = require('mongoose');
const { stringify } = require('querystring');
const app=express();
const bodyparser = require('body-parser');
// mongoose.connect('mongodb://127.0.0.1/dance', {useNewUrlParser: true});
const url = `mongodb+srv://allaccess:monod.exe@cluster0.u7h8w6p.mongodb.net/?retryWrites=true&w=majority`;

const connectionParams={
    useNewUrlParser: true,
    useUnifiedTopology: true 
}
mongoose.connect(url,connectionParams)
    .then( () => {
        console.log('Connected to the database ')
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. n${err}`);
    })
const port=process.env.PORT||3000;
//Creating mongoose schemas and models and inserting into db
const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    city: String,
    concern: String
  });
  const Contact = mongoose.model('Contact', contactSchema);
//....................................
app.use('/static',express.static('static'));
app.use(express.urlencoded());
//Setting up pug template
app.set('view engine','pug');
app.set('views',path.join(__dirname,'views'));
app.get('/', (req, res)=>{
    const con = "This is the best content on the internet so far so use it wisely";
    const params = {'insert': "Harry's Dance Website", "content": con};
    res.status(200).render('index.pug', params);
});

// app.post('/', (req, res)=>{
//     const params = 'Your form has been submitted successfully';
//     res.status(200).render('index.pug', params);

// });
app.post('/contact', (req, res)=>{
    var myData=new Contact(req.body);
    myData.save().then(()=>{
     res.status(200).render('sent.pug');
    }).catch(()=>{
        res.status(400).render('err.pug');
    });
});

app.get('/contact', (req, res)=>{
    const params = {'tit':"Enter your details below"};
    res.status(200).render('contact.pug', params);

});
app.get('/about', (req, res)=>{
   
    res.status(200).render('about.pug');

});
app.get('/services', (req, res)=>{
   
    res.status(200).render('services.pug');

});
app.get('/class', (req, res)=>{
   
    res.status(200).render('class.pug');

});
// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});