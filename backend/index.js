import express from "express"
import userRoutes from "./routes/users.js"
import authRoutes from "./routes/auth.js"
import commentRoutes from "./routes/comments.js"
import likesRoutes from "./routes/likes.js"
import postsRoutes from "./routes/posts.js"
import cors from "cors"
import cookieParser from "cookie-parser"
import multer from "multer";

const app = express();

// middle wares - be able to send JSON File
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Credentials", true);
    next();
});
app.use(express.json());
app.use(
    cors({
        origin: "http://localhost:3000",
    })
);
app.use(cookieParser());

// Upload file to ./ public/upload .....
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "../public/upload")
    },
    filename: function (req, file, cb) {
        cb(null, Date.now()+file.originalname);
    }
})
const upload = multer({ storage: storage })
app.post("/api/upload",upload.single("file"),(req,res)=>{
    const file = req.file;
    /**
     * File :
     * field name: "file"
     * orignial name: "4123432.pic_hd.jpg
     * encoding '7bit'
     * mimetype image/jpeg
     * destination: '../public/upload'
     * filename: 1668457 + 4123432.pic_hd.jpg
     * path: .....
     * size: 76417
     */
    res.status(200).json(file.filename);
});
app.use("/api/users",userRoutes);
app.use("/api/posts", postsRoutes);
app.use("/api/comments",commentRoutes);
app.use("/api/likes",likesRoutes);
app.use("/api/auth",authRoutes);

app.listen(8800,()=>{
    console.log("Connected to backend!")
})