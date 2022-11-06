import "./post.scss";
import { Link } from "react-router-dom";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
const Post = ({post})=> {
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

                {/* span + picture*/}
                <div className={"content"}>

                </div>

                {/* Likes comments share */}
                <div className={"operation"}>

                </div>
            </div>
        </div>
    )
}
export default Post;