const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Review = require("../models/Review.model");
const Organization = require("../models/Organization.model");

// PUT  /api/reviews/:reviewId  - Updates a specific review by id
router.put("/reviews/edit/:reviewId", (req, res, next) => {
    const { reviewId } = req.params;

    const { 
        review, 
        rating
    } = req.body;
  
    if (!mongoose.Types.ObjectId.isValid(reviewId)) {
      res.status(400).json({ message: "Specified id is not valid" });
      return;
    }
  
    Review.findByIdAndUpdate(reviewId, 
        {
            review,
            rating
        }, 
        { 
            new: true 
        }
        )
        .then((updatedReview) => res.json(updatedReview))
        .catch((err) => {
            console.log("Review not updated: ", err)
            res.json(err)
        });
  });

//  DELETE /api/reviews/:reviewId  - Deletes a specific review by id
router.delete("/reviews/delete/:reviewId", (req, res, next) => {
    const { reviewId } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(reviewId)) {
      res.status(400).json({ message: "Specified id is not valid" });
      return;
    }
  
    Review.findByIdAndRemove(reviewId)
      .then(() =>
        res.json({ message: `Org with ${reviewId} is removed successfully.` 
        })
      )
      .catch((err) => {
        console.log("Review not deleted: ", err)  
        res.json(err)
        });
  });

//  GET /api/reviews/:reviewId  - Retrieves a specific review by id
router.get("/reviews/:reviewId", (req, res, next) => {
  const { reviewId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(reviewId)) {
    res.status(400).json({
      message: "Specified id is not valid",
    });
    return;
  }

  Review.findById(reviewId)
    .then((review) => res.status(200).json(review))
    .catch((error) => res.json(error));
});


//  POST /api/reviews  -  Creates a new review
router.post("/reviews", (req, res, next) => {
    const { review, rating, orgId } = req.body;
  
    Review.create({ 
        review, 
        rating, 
        reviewer : req.payload._id,
    })
      .then((newReview) => {
        return Organization.findByIdAndUpdate(orgId, {
                $push: {
              reviews: {
                $each: [newReview._id],
                $position: 0
              }
            }
          // $push: { reviews: newReview._id },$sort:{ createdAt: -1}
        });
      })
      .then((response) => {
          res.status(200).json(response);
      })
      .catch((err) => {
          console.log("Review not created: ", err)
          res.json(err)
      });
  });


  

module.exports = router;
