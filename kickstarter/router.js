const router = require("next-routes")();
router
  .add("/campaigns/new", "/campaigns/new")
  .add("/campaigns/:address", "/campaigns/show");
module.exports = router;
