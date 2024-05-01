
import jwt from "jsonwebtoken";
import response from "../utils/response.js";

const verifyToken = (req, res, next) => {
    const token = req.headers["authorization"];

    if (!token) {
        return res.status(401).send(response("Token is required", {}, false, 401));
    }
    try {
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET_KEY || "job_management");
        if (decoded?.["user"]?.[0]?.["phone_no"] || decoded?.["user"]?.["email"]) {
            return next();
        }
        else {
            return res.status(401).send(response("UnAuthorized", {}, false, 401));
        }
    } catch (err) {
        return res.status(401).send(response(err, {}, false, 401));
    }

};

const getToken = (user) => {
    console.log("-->user : ", user, process.env.TOKEN_SECRET_KEY)
    const token = jwt.sign({ user: user }, process.env.TOKEN_SECRET_KEY || "job_management" ,
        {
            expiresIn: '7d'
        }
    );
    return token;
};


export { verifyToken, getToken };