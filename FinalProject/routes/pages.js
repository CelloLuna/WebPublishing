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
  let inventory = [];
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
  inventory = inventoryQuery;
  console.log(inventory);
  res.render('inventory', {
    user: req.user,
    title: 'Inventory',
    items: inventory,
  });
});
module.exports = router;
