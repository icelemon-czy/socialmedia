import jwt from "jsonwebtoken";
import {db} from "../connect.js";
// id userid postId
export const getLikes = (req,res) => {
    const q= "select userId from Likes where postId = ?";

    db.query(q, [req.query.postId], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data);
    })

}