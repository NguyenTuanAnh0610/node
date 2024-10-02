import  jwt  from "jsonwebtoken";

export const chenkAuth = (req, res, next) =>{
 if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, "12346", (error, data) =>{
        console.log(data);
       if (error) {
        console.log(error);
        if (error.name == "TokenExpiredError") {
            return res.status(400).json({ message: "Token het han" });
          } else if (error.name == "JsonWebTokenError") {
            return res.status(400).json({ message: "Token khong hop le" });
          }
       }
       next();
    });
 }
}