// server/index.js

const express = require("express");

const PORT = process.env.PORT || 3001;

const app = express();

// API endpoints
//load jpoi module 
const Joi = require('joi')
app.use(express.json())
//Json object
const courses =[

    {id: 1, name: 'course1'},
    {id: 2, name: 'course2'},
    {id: 3, name: 'course3'}

]

app.get('api/',(req,res) => {
    res.send('Api Active')
});

/*
    app.get('/api/courses', (req,res)=> {
        res.send([1,3,4,4])
    });
*/

app.get('/api/getCourses', (req,res,next)=> {            
    res.send(courses);            
});

// Get Course at id 
app.get('/api/getCoursesAt', (req,res,next)=> {
    let argId = parseInt(req.query.id);
    logger.print(`argId: ${argId}`)
    const course =  courses.find(c => c.id === argId);
    if(typeof course === 'undefined') // 404    
    {    
        handle_requestError(404,next,'course not found')
    }
    else res.send(course);        
    //res.send(req.params.id)    
});

//post requirest
app.post('/api/pushCourse', (req,res,next) => {
    validateCourse(req.body,next,400);
    const cnewCourse = {
        id: courses.length + 1,
        name: req.body.name
    };    
    courses.push(cnewCourse);
    let newIndex = courses.find(courseID => courseID.id === courses.length);
    logger.print(JSON.stringify(courses));
    logger.print(newIndex);
    res.send(JSON.stringify(newIndex.id));
})

app.put('/api/updateCourse', (req,res,next) => {
    // get the desired object
    let argId = parseInt(req.query.id);
    const course =  courses.find(c => c.id === argId);    
    const cnewCourse = {
        id: courses.length + 1,
        name: req.body.name
    };  
    validateCourse(req.body,next,400);
       
    // Update property 
    course.name = req.body.name;

    res.send(course)
})

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
