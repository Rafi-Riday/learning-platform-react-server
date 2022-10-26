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
    const response = data.map(d => {
        return { course: d.course, name: d.name }
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

    response.name = course.name;
    response.parts = course.parts.map(p => p.part);
    res.send(JSON.stringify(response));
});

app.get('/course/:COURSE/part', (req, res) => {
    const { COURSE } = req.params;
    const course = data.find(d => d.course.toString() === COURSE.toString());

    if (!course) {
        res.send(statusFalse);
    };

    res.send(JSON.stringify(course.parts));
});

app.get('/course/:COURSE/part/:PART', (req, res) => {
    const { COURSE, PART } = req.params;
    const response = {};
    const course = data.find(d => d.course.toString() === COURSE.toString());
    const part = course.parts.find(p => p.part.toString() === PART.toString());

    if (!course || !part) {
        res.send(statusFalse);
    };

    const weeks = part.weeks.map(w => w.week);
    response.weeks = weeks;
    res.send(JSON.stringify(response));
});

app.get('/course/:COURSE/part/:PART/week', (req, res) => {
    const { COURSE, PART } = req.params;
    const course = data.find(d => d.course.toString() === COURSE.toString());
    const part = course.parts.find(p => p.part.toString() === PART.toString());

    if (!course || !part) {
        res.send(statusFalse);
    };

    res.send(JSON.stringify(part.weeks));
});

app.get('/course/:COURSE/part/:PART/week/:WEEK', (req, res) => {
    const { COURSE, PART, WEEK } = req.params;
    const response = {};
    const course = data.find(d => d.course.toString() === COURSE.toString());
    const part = course.parts.find(p => p.part.toString() === PART.toString());
    const week = part.weeks.find(w => w.week.toString() === WEEK.toString());

    if (!course || !part || !week) {
        res.send(statusFalse);
    };

    const lessons = [];
    week.lessons.forEach(l => {
        lessons.push({ name: l.name, lesson: l.lesson });
    });
    response.lessons = lessons;
    res.send(JSON.stringify(response));
});

app.get('/course/:COURSE/part/:PART/week/:WEEK/lesson', (req, res) => {
    const { COURSE, PART, WEEK } = req.params;
    const course = data.find(d => d.course.toString() === COURSE.toString());
    const part = course.parts.find(p => p.part.toString() === PART.toString());
    const week = part.weeks.find(w => w.week.toString() === WEEK.toString());

    if (!course || !part || !week) {
        res.send(statusFalse);
    };

    res.send(JSON.stringify(week.lessons));
});

app.get('/course/:COURSE/part/:PART/week/:WEEK/lesson/:LESSON', (req, res) => {
    const { COURSE, PART, WEEK, LESSON } = req.params;
    const course = data.find(d => d.course.toString() === COURSE.toString());
    const part = course.parts.find(p => p.part.toString() === PART.toString());
    const week = part.weeks.find(w => w.week.toString() === WEEK.toString());
    const lesson = week.lessons.find(l => l.lesson.toString() === LESSON.toString());

    if (!course || !part || !week || !lesson) {
        res.send(statusFalse);
    };

    res.send(JSON.stringify(lesson));
});

app.listen(port, () => {
    console.log('App running on port', port);
})