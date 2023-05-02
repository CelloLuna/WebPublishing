const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');
const mssql = require('mssql');
const request = new mssql.Request();
const Item = require('../modals/Item');
const { sequelize } = require('../config/database');
const { QueryTypes } = require('sequelize');

//Rendering home page
router.get('/', forwardAuthenticated, (req, res) => res.render('index', { title: 'Home' }));
//rendering inventory page with auth
router.get('/inventory', ensureAuthenticated, async (req, res) => {
  res.render('inventory', {
    user: req.user,
    title: 'Inventory',
    items: await getInventory(),
  });
});

//add item post
router.post('/addItem', async (req, res) => {
  const category = await getCategory(req.body.category);
  return await Item.create({
    name: req.body.name,
    qty: req.body.qty,
    uom: req.body.uom,
    category_id: category,
    location: req.body.location,
    last_purchase: Date.now(),
    use_by: req.body.use_by,
    note: req.body.note,
  }).then((items) => {
    if (items) {
      res.redirect('inventory');
    } else {
      res.status(400).send('Error Inserting');
    }
  });
});

async function getInventory() {
  //render inv query

  const inventoryQuery = await sequelize.query(
    `SELECT 
    inv.name as 'Name', 
    CAST(inv.qty as varchar(20)) + ' ' + inv.uom as 'Quantity',
    cat.category as 'Category',
    inv.location as 'Location',
    inv.last_purchase as 'Last_Purchase',
    inv.use_by as 'Use_By',
    inv.note as Note
  
    FROM cello_inventory_tbl inv
    JOIN cello_food_categories_tbl cat
    ON inv.category_id = cat.category_id;
  `,
    {
      model: Item,
      mapToModel: true,
      type: QueryTypes.SELECT,
      raw: true,
    }
  );
  const inventory = inventoryQuery;
  return inventory;
}

async function getCategory(category) {
  const categoryQuery = await sequelize.query(
    `
    SELECT cat.category_id
    FROM cello_food_categories_tbl cat
    JOIN cello_inventory_tbl inv
    ON cat.category_id = inv.category_id
    WHERE
    cat.category = '${category}';
    `
  );
  const getCategory = categoryQuery[0][0].category_id;
  return getCategory;
}

module.exports = router;
