import "./post.scss";
import { Link } from "react-router-dom";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
const Post = ({post})=> {
    const liked = false;
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
                            <span className={"date"}>1 min ago</span>
                        </div>
                    </div>
                    <MoreHorizIcon/>
                </div>

                {/* p + picture*/}
                <div className={"content"}>
                    <p>{post.desc}</p>
                    <img src={post.img} alt={""}/>
                </div>

                {/* Likes comments share */}
                <div className={"operation"}>
                    <div className={"item"}>
                        {liked ? <FavoriteOutlinedIcon/> : <FavoriteBorderOutlinedIcon/>}
                        12 likes
                    </div>
                    <div className={"item"}>
                        <TextsmsOutlinedIcon/>
                        12 comments
                    </div>
                    <div className={"item"}>
                        <ShareOutlinedIcon/>
                        share
                    </div>

                </div>

            </div>
        </div>
    )
}
export default Post;