const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


router.get('/:id', (req, res) => {
    console.log('in get route for lesson content', req.params.id);

    let chosenLessonID = req.params.id;
    console.log(chosenLessonID);
    const queryText = `SELECT * FROM content WHERE lesson_id=$1`;
    pool.query(queryText, [chosenLessonID])
        .then((result) => {
            res.send(result.rows[0]);
        })
        .catch((error) => {
            console.log('Error completing SELECT individual lesson query', error);
            res.sendStatus(500);
        });
});

router.post('/', (req, res) => {
    const newLesson = req.body;
    const queryText = `INSERT INTO lesson ("name", "description", "course_id") VALUES ($1, $2, $3)`


    const queryValues = [
        newLesson.name,
        newLesson.description,
        newLesson.course_id
    ]

    pool.query(queryText, queryValues)
        .then(() => { res.sendStatus(201); })
        .catch((error) => {
            console.log('error in completing new lesson query', error);
            res.sendStatus(500);
        });

})


module.exports = router;