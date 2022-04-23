const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // Access our Category model and run .findAll() method)
  Category.findAll({
    include:[Product]
  })
    .then(dbCategory => res.json(dbCategory))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
  Category.findOne({
    where: {
      id: req.params.id
    },
    include:[Product]
  })
    .then(dbCategory => {
      if (!dbCategory) {
        res.status(404).json({ message: 'No Category found with this id' });
        return;
      }
      res.json(dbCategory);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
  // create a new category
  Category.create({
    category_name: req.body.category_name
  })
    .then(dbCategory => res.json(dbCategory))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(req.body, {
    where: {
      id: req.params.id
    }
  })
    .then(dbCategory => {
      if (!dbCategory[0]) {
        res.status(404).json({ message: 'No Category found with this id' });
        return;
      }
      res.json(dbCategory);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbCategory => {
      if (!dbCategory) {
        res.status(404).json({ message: 'No Category found with this id' });
        return;
      }
      res.json(dbCategory);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
