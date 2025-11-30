import { body, validationResult } from "express-validator";


export const validateSignup = [
body("name").notEmpty().withMessage("Name is required"),
body("email").isEmail().withMessage("Valid email is required"),
body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 chars"),
];


export const validateLogin = [
body("email").isEmail().withMessage("Valid email is required"),
body("password").exists().withMessage("Password is required"),
];


export const handleValidationErrors = (req, res, next) => {
const errors = validationResult(req);
if (!errors.isEmpty()) {
return res.status(400).json({ errors: errors.array() });
}
next();
};