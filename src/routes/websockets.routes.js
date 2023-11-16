const { Router } = require('express');
const {
  homeProducts,
  realtimeProducts,
  chatPage,
} = require('../controllers/websockets.controllers');

const router = new Router();

router.get('/home', homeProducts);
router.get('/realtime', realtimeProducts);
router.get('/chat', chatPage);

module.exports = router;
