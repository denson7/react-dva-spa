const express = require('express');
const router = express.Router();

router.get('/api/list', (req, res) => {
  res.send([
    {name: 'AA', age: 10},
    {name: 'BB', age: 20},
    {name: 'CC', age: 30}
  ]);
});

// CommonJS规范
module.exports = router;