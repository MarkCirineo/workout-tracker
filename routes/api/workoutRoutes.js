const router = require("express").Router();
const db = require("../../models");

router.get("/", (req, res) => {
    db.Workout.find().sort({ day: -1 }).limit(1);
    db.Workout.aggregate([
        {
            $addFields: {
                totalDuration: { $sum: "$exercises.duration" },
            },
        },
    ])
        .then(dbWorkouts => {
            res.json(dbWorkouts)
        })
        .catch(err => {
            res.json(err);
        });
});


router.post("/", (req, res) => {
    db.Workout.create(req.body)
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.json(err);
        });
});

router.put("/:id", (req, res) => {
    db.Workout.findOneAndUpdate(
        { _id: req.params.id },
        { $push: { exercises: req.body } }, 
        { new: true }
        )
            .then(dbWorkout => {
                res.json(dbWorkout);
            })
            .catch(err => {
                res.json(err);
            });
});

router.get("/range", (req, res) => {
    db.Workout.aggregate([
        {
            $addFields: {
                totalDuration: {
                    $sum: "$exercises.duration"
                },
                totalPounds: {
                    $sum: "$exercises.weight"
                }
            }
        }
    ])
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.json(err);
        });
});

module.exports = router;