const express = require('express');
const act = require('./data/helpers/actionModel');
const router = express.Router();


router.get('/', (req, res) => {
    act
        .get()
        .then(project => {
            res.status(200).json(project)
        })
        .catch(() => {
            res.status(500).json({ errorMessage: "The user list could not be retrieved." })
        })
});

router.get('/:id', (req, res) => {
    act
    .get(req.params.id)
    .then(actions => {
        if (actions.length !== 0 ) {
          res.status(200).json(actions);
        } else {
          res.status(404).json({ message: 'Action not found' });
        }
      })
    .catch(err => {
        res.status(500).json({ error: "the action could not be retieved"})
    })
})


router.post('/', validateNotes, (req, res) => {
    act
    .insert(req.body)
    .then(action => {
        res.status(201).json(action)
    })
    .catch(() => {
        res.status(500).json({
         errorMessage:
           'There was an error while saving the user to the database',
       });
    });
})

router.put("/:id", (req, res) => {
  
    act
      .update(req.params.id, req.body)
      .then(updated => {
        res.status(200).json(updated);
      })
      .catch(error => {
        res.status(500).json({
          message: "There was an error while saving the user to the database"
        });
      });
  });
  
  router.delete("/:id", (req, res) => {
    act
      .remove(req.params.id)
      .then(deleted => {
        if (deleted > 0) {
            res.status(200).json({ message: 'The post has been nuked' });
        } else {
          res.status(404).json({
            message: "The post with the specified ID does not exist."
          });
        }
      })
      .catch(error => {
        res.status(500).json({
          message: "There was an error while saving the user to the database"
        });
      });
  });

  
// custom middleware

function validateNotes (req, res, next) {
    if( req.body.notes && req.body.description ){
      next();
    } else {
      res.status(400).json({ error: "You need description & notes"})
    }
  }

module.exports = router;