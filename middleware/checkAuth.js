const z=require('zod');
const jwt = require('jsonwebtoken');
const secretKey=process.env.JWT_SECRET || "yourfavgirl";
const userSchema = z.object({
    name: z.string().min(1, "Name is required").optional(),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long")
});
const validateSchema = (req, res, next) => {
    const result = userSchema.safeParse(req.body);
    if (!result.success) {
        return res.status(400).json({
            name:"Validation Error",
            error: result.error.errors.map(err => err.message).join(", ")
        });
    }
    req.validateSchema = result;
    next();
};
const Authservice = (req, res, next) => {
    const token = req.cookies.token ; // Check for token in cookies or Authorization header
    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }
    try {
        const decoded = jwt.verify(token, secretKey);
        req.user = decoded;
        next();
    } catch (error) {
        console.error('Error verifying token:', error);
        return res.status(401).json({ error: 'Invalid token' });
    }
}
module.exports =  {validateSchema, Authservice} ;
