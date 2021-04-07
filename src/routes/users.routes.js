const { Router }= require( "express");
const { renderSignUpForm, singup, renderSigninForm, signin, logout} =require( "../controllers/users.controller");

const router = Router();

// Routes
router.get("/users/signup", renderSignUpForm);

router.post("/users/signup", singup);

router.get("/users/signin", renderSigninForm);

router.post("/users/signin", signin);

router.get("/users/logout", logout);

module.exports=router;
