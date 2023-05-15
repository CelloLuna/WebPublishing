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
router.get('/shop', ensureAuthenticated, async (req, res) => {
  res.render('shopInv', {
    user: req.user,
    title: 'Shop Inventory',
    products: [],
  });
});

//add item post
router.post('/addItem', async (req, res) => {
  const category = await getCategory(req.body.category);
  console.log(category);
  return await Item.create({
    name: req.body.name,
    qty: req.body.qty,
    uom: req.body.uom,
    category: category,
    location: req.body.location,
    last_purchase: Date.now(),
    use_by: req.body.use_by,
    note: req.body.note,
  }).then((items) => {
    if (items) {
      req.flash('success_msg', 'Item Added Successfully');
      res.redirect('inventory');
    } else {
      res.status(400).send('Error Inserting');
    }
  });
});

//delete item
router.post('/deleteItem/:Item_ID', async (req, res) => {
  const item = req.params.Item_ID;
  console.log('ITEM', item);
  return await Item.destroy({
    where: {
      Item_ID: item,
    },
  }).then(() => {
    req.flash('success_msg', 'Item Deleted Successfully');
    res.redirect('/inventory');
  });
});

//edit item
router.post('/editItem/:Item_ID', async (req, res) => {
  const category = await getCategory(req.body.category);
  const item = req.params.Item_ID;
  console.log('Item:', item);
  return await Item.update(
    {
      name: req.body.name,
      qty: req.body.zqty,
      uom: req.body.uom,
      category_id: category,
      location: req.body.location,
      use_by: req.body.use_by,
      note: req.body.note,
    },
    {
      where: { item_id: item },
    }
  ).then(() => {
    req.flash('success_msg', 'Item Updated Successfully');
    res.redirect('/inventory');
  });
});

async function getInventory() {
  //render inv query
  const inventoryQuery = await sequelize.query(
    `SELECT 
    inv.inventory_id as 'Item_ID',
    inv.name as 'Name', 
    CAST(inv.qty as varchar(20)) + ' ' + inv.uom as 'Quantity',
    cat.category as 'Category',
    inv.location as 'Location',
    inv.last_purchase as 'Last_Purchase',
    inv.use_by as 'Use_By',
    inv.note as Note,
    inv.qty as qty,
    inv.uom as uom
  
    FROM inventory_tbl inv

    JOIN inventory_category_ref cat
    ON inv.category = cat.category

	WHERE cat.category_for = 'food_items'
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
    SELECT cat.category
    FROM inventory_category_ref cat
    WHERE
    cat.category = '${category}';
    `
  );
  const getCategory = categoryQuery[0][0].category;
  return getCategory;
}

module.exports = router;
