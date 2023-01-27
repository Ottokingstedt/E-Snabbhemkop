const {User} = require("../models/userModel");
const {auth, isUser, isAdmin} = require("../middleware/auth");
const moment = require("moment");
const bcrypt = require("bcrypt");

const router = require("express").Router();


router.get("/", isAdmin, async(req, res) =>{
    try{
    const user = await User.find().sort({ _id: -1})
    res.status(200).send(user)
} catch(error){
    console.log(error);
    res.status(500).send(error);
}
});

// GET USER

router.get("/find/:id", async(req, res) => {
    try{
        const user = await User.findById(req.params.id);

        res.status(200).send({
            _id: user._id,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            isAdmin: user.isAdmin,
        });
    }catch(error){
        res.status(500).send(error);
    }
})

// Delete

router.delete("/:id", isAdmin, async (req, res) => {
    try{ 
        const deleteUser = await User.findByIdAndDelete(req.params.id);

        res.status(200).send(deleteUser);
    } catch(error){
        res.status(500).send(error);
    }
})

// Update User 

router.put("/:id", isUser, async (req, res) => {
       try{ 
        const user = await User.findById(req.params.id);
        
        if(!(user.email === req.body.email)){
            const emailInUse = await User.findOne({ email: req.body.email });
            if(emailInUse)
            return res.status(400).send("Sorry that email is already taken...")
        }
        if(req.body.password && user){
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.password, salt);

            user.password = hashedPassword;
        }
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                isAdmin: req.body.isAdmin,
                password: user.password,
            },
            { new: true }
        )
        res.status(200).send({
            _id: updatedUser._id,
            firstname: updatedUser.firstname,
            lastname: updatedUser.lastname,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
        });
       } catch (error){
        res.status(500).send(error);
       } 
    });

router.get("/stats", isAdmin, async (req, res) => {
    const previousMonth = moment()
    .month(moment().month() - 1)
    .set("date", 1)
    .format("YYYY-MM-DD HH:mm:ss");

try{
    const users = await User.aggregate([
        {
            $match: {createdAt : {$gte: new Date(previousMonth)}},
        },
        {
            $project:{
                month: {$month: "$createdAt"}
            }
        },
        {
            $group:{
                _id: "$month",
                total: {$sum: 1}
            }
        }
    ]);
    res.status(200).send(users)

}catch(err){
    console.log(err);
    res.status(500).send(err)
}

});

module.exports = router;