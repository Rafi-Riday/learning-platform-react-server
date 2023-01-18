const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 6969;
const data = require('./data.json');
app.use(cors());

const statusTrue = JSON.stringify({ status: true, message: 'API running', });
const statusFalse = JSON.stringify({ status: false, message: 'Request not found', });

app.get('/', (req, res) => {
    res.send(statusTrue);
});

app.get('/course', (req, res) => {
    res.send(JSON.stringify(data));
});

app.get('/course-minified', (req, res) => {
    const response = data.map(d => {
        return { course: d.course, name: d.name, imgURL: d.imgURL }
    });
    res.send(JSON.stringify(response));
});

app.get('/course/:COURSE', (req, res) => {
    const { COURSE } = req.params;
    const response = {};
    const course = data.find(d => d.course.toString() === COURSE.toString());

    if (!course) {
        res.send(statusFalse);
    };

    const stringCourse = JSON.stringify(course);
    //
    const totalParts = stringCourse.split('"part"').length - 1;
    const totalLessons = stringCourse.split('"lesson"').length - 1;
    //
    response.totalParts = totalParts;
    response.totalLessons = totalLessons;
    //
    response.name = course.name;
    response.imgURL = course.imgURL;
    response.course = course.course;
    response.parts = course.parts.map(p => p.part);
    res.send(JSON.stringify(response));
});

// app.get('/course/:COURSE/part', (req, res) => {
//     const { COURSE } = req.params;
//     const course = data.find(d => d.course.toString() === COURSE.toString());

//     if (!course) {
//         res.send(statusFalse);
//     };

//     res.send(JSON.stringify(course.parts));
// });

// app.get('/course/:COURSE/part/:PART', (req, res) => {
//     const { COURSE, PART } = req.params;
//     const course = data.find(d => d.course.toString() === COURSE.toString());
//     const part = course.parts.find(p => p.part.toString() === PART.toString());

//     if (!course || !part) {
//         res.send(statusFalse);
//     };

//     res.send(JSON.stringify(part));
// });

// app.get('/course/:COURSE/part/:PART/lesson', (req, res) => {
//     const { COURSE, PART } = req.params;
//     const course = data.find(d => d.course.toString() === COURSE.toString());
//     const part = course.parts.find(p => p.part.toString() === PART.toString());

//     if (!course || !part) {
//         res.send(statusFalse);
//     };

//     res.send(JSON.stringify(part.lessons));
// });

app.get('/course/:COURSE/part/:PART/lesson/:LESSON', (req, res) => {
    const { COURSE, PART, LESSON, } = req.params;
    const course = data.find(d => d.course.toString() === COURSE.toString());
    const part = course.parts.find(p => p.part.toString() === PART.toString());
    const lesson = part.lessons.find(l => l.lesson.toString() === LESSON.toString());

    if (!course || !part || !lesson) {
        res.send(statusFalse);
    };

    res.send(JSON.stringify(lesson));
});

app.listen(port, () => {
    console.log(`App running on port http://localhost:${port}`);
});
