const express = require('express');
const proj = require('./data/helpers/projectModel');
const router = express.Router();


router.get('/', (req, res) => {
    proj
        .get()
        .then(project => {
            res.status(200).json(project)
        })
        .catch(() => {
            res.status(500).json({ errorMessage: "The user list could not be retrieved." })
        })
});

router.get('/:id', (req, res) => {
    proj
    .get(req.params.id)
    .then(project => {
        if (project.length !== 0 ) {
          res.status(200).json(project);
        } else {
          res.status(404).json({ message: 'Post not found' });
        }
      })
    .catch(err => {
        res.status(500).json({ error: "the project could not be retieved"})
    })
})

router.get('/:id/actions', (req, res) => {
    proj
    .getProjectActions(req.params.id)
    .then(action => {
        if (action.length !== 0 ) {
          res.status(200).json(action);
        } else {
          res.status(404).json({ message: 'Post not found' });
        }
      })
      .catch(error => {
        res.status(500).json({
          message: "the project could not be retieved"
        });
      });
})

router.post('/', validateName, (req, res) => {
    proj
    .insert(req.body)
    .then(addProject => {
        res.status(201).json(addProject)
    })
    .catch(() => {
        res.status(500).json({
         errorMessage:
           'There was an error while saving the user to the database',
       });
    });
})
router.put("/:id", (req, res) => {
  
    proj
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
    proj
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

function validateName (req, res, next) {
    if( req.body.name && req.body.description ){
      next();
    } else {
      res.status(400).json({ error: "You need name & description"})
    }
  }

module.exports = router;