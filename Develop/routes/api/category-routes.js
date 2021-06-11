const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({
    attributes: ['category_name'],
    include: {
      model: Product,
      attributes: ['product_name', 'price', 'stock']
    }
  })
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findOne({
    attributes: ['category_name'],
    include: {
      model: Product,
      attributes: ['product_name', 'price', 'stock']
    }
  })
});

router.post('/', (req, res) => {
  // create a new category
  Category.create(req.body, {
    category_name: req.body.category_name
  }).then(categoryData => {
    res.json(categoryData)
  }).catch(err => {
    res.status(400).json(err);
  })
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(req.body, {
    where: {
      id: req.params.id
    }
  }).then(categoryInfo => {
    res.json(categoryInfo)
  }).catch(err => res.status(400).json(err));
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id
    }
  }).then(categoryInfo=> {
    res.json({message: 'Category was deleted'})
    return;
  }).catch(err => {
    res.status(500).json(err);
  })
});

module.exports = router;
