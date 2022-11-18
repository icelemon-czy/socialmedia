import "./post.scss";
import React, {useContext} from "react"
import { Link } from "react-router-dom";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Comments from "../comments/Comments"
import {useState} from "react";
import moment from "moment";
import {useQuery} from "@tanstack/react-query";
import {makeRequest} from "../../axios";
import {AuthContext} from "../../context/authContext";

const Post = ({post})=> {
    const {currentUser}= useContext(AuthContext);

    const [commentOpen,setCommentOpen] = useState(false);

    const { isLoading, error, data } = useQuery(["likes",post.id],()=>
        makeRequest.get("/likes?postId="+post.id).then((res)=>{
            return res.data;
        })
    );
    console.log(data);

    const liked = true;
    return (
        <div className={"post"}>
            <div className={"container"}>
                <div className={"user"}>
                    <div className={"userInfo"}>
                        <img src={post.profilePic} alt={""}/>
                        <div className={"details"}>
                            <Link to={`/profile/${post.userId}`} style={{textDecoration: "none", color: "inherit"}}>
                                <span className={"name"}>{post.name}</span>
                            </Link>
                            <span className={"date"}>{moment(post.createdAt).fromNow()}</span>
                        </div>
                    </div>
                    <MoreHorizIcon/>
                </div>

                {/* p + picture*/}
                <div className={"content"}>
                    <p>{post.desc}</p>
                    <img src={"./upload/"+post.img} alt={""}/>
                </div>

                {/* Likes comments share */}
                <div className={"operation"}>
                    <div className={"item"}>
                        {data.includes(currentUser.id)}
                        {/*1h 45 min 14 s*/}
                        {liked ? <FavoriteOutlinedIcon style={{color:"red"}}/> : <FavoriteBorderOutlinedIcon/>}
                        {data.length} likes
                    </div>
                    <div className={"item"} onClick={()=>setCommentOpen(!commentOpen)}>
                        <TextsmsOutlinedIcon/>
                        12 comments
                    </div>
                    <div className={"item"}>
                        <ShareOutlinedIcon/>
                        share
                    </div>

                </div>
                <div>
                    {commentOpen && <Comments postId={post.id}/>}
                </div>

            </div>
        </div>
    )
}
export default Post;