import express from "express"
import userRoutes from "./routes/users.js"
import authRoutes from "./routes/auth.js"
import commentRoutes from "./routes/comments.js"
import likesRoutes from "./routes/likes.js"
import postsRoutes from "./routes/posts.js"
import cors from "cors"
import cookieParser from "cookie-parser"
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

app.use("/api/users",userRoutes);
app.use("/api/posts", postsRoutes);
app.use("/api/comments",commentRoutes);
app.use("/api/likes",likesRoutes);
app.use("/api/auth",authRoutes);

app.listen(8800,()=>{
    console.log("Connected to backend!")
})