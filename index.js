const router = require("express").Router();


router.get("/", (req,res,next)=>{
    console.log("get request first");
})


module.exports = router;
