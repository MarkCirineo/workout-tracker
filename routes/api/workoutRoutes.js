const router = require("express").Router();
const db = require("../../models");

router.get("/", (req, res) => {
    db.Workout.find({})
        .then(dbWorkouts => {
            res.json(dbWorkouts)
        })
        .catch(err => {
            res.json(err);
        });
});


router.post("/", (req, res) => {

});

router.put("/:id", (req, res) => {

});

router.get("/range", (req, res) => {

});

module.exports = router;