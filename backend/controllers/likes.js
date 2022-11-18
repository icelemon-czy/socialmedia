import jwt from "jsonwebtoken";
import {db} from "../connect.js";
import moment from "moment";
// id userid postId
export const getLikes = (req,res) => {
    const q= "select userId from Likes where postId = ?";

    db.query(q, [req.query.postId], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data.map((like) => like.userId));
    });

};

export const addLike = (req,res) => {
    const token = req.cookies.accessToken;
    if(!token) return req.status(401).json("Not logged in!");

    // Check token is legal (Not expired)
    jwt.verify(token,"secretkey", (err, userInfo) => {
        if(err) return res.status(403).json("Token is not valid!");

        const q = "Insert into Likes (`userId`,`postId`) Values (?)";

        const values = [
            userInfo.id,
            req.body.postId,
        ];

        db.query(q,[values],(err,data)=>{
            if(err) return res.status(500).json(err);
            return res.status(200).json("Post has been liked!");
        })
    });

};

export const deleteLike = (req,res) => {
    const token = req.cookies.accessToken;
    if(!token) return req.status(401).json("Not logged in!");

    // Check token is legal (Not expired)
    jwt.verify(token,"secretkey", (err, userInfo) => {
        if(err) return res.status(403).json("Token is not valid!");

        const q = "Delete From Likes where `userId`= ? AND `postId` = ?";

       //  console.log(req.query); {postId : 62}
        // console.log(req.body); {}
        db.query(q,[userInfo.id,req.query.postId],(err,data)=>{
            if(err) return res.status(500).json(err);
            return res.status(200).json("Post has been disliked!");
        })
    });

};