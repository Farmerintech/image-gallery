import jwt from "jsonwebtoken"

export const authMiddleware= async (req, res, next) =>{
    const token = req.header("Authorization")?.replace("Bearer ", "")
    if(!token){
        return res.status(401).json({message:"You an not authorized, make sure you are logged in"})
    }
    try {
        const decoded = jwt.verify(token, process.env.SECRETE_KEY);
        req.user = decoded;
        console.log(req.user.id)
        next()
    } catch (error) {
       return  res.status(500).json({message:error})
    }
}