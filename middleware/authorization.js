import jwt from "jsonwebtoken"

export const authMiddleware= async (req, res, next) =>{
    const token = req.header("Authorization")?.replace("Bearer ", "")
    if(!token){
        return res.status(401).json({message:"You an not authorized"})
    }
    try {
        const decoded = jwt.verify(token, process.env.SECRETE_KEY);
        req.user = decoded;
        next()
    } catch (error) {
       return  res.status(500).json({message:error})
    }
}