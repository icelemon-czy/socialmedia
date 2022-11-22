import React, {useContext, useState} from "react"
import "./profile.scss"
import FacebookTwoToneIcon from "@mui/icons-material/FacebookTwoTone";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import TwitterIcon from "@mui/icons-material/Twitter";
import PlaceIcon from "@mui/icons-material/Place";
import LanguageIcon from "@mui/icons-material/Language";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Posts from "../../components/posts/Posts";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {makeRequest} from "../../axios";
import { useLocation } from "react-router-dom";
import {AuthContext} from "../../context/authContext";
import Update from "../../components/update/Update";

const Profile =() => {
    const [openUpdate,setOpenUpdate] = useState(false);

    const {currentUser} = useContext(AuthContext);
    // useLocation().pathname - /profile/10
    const userId = parseInt( useLocation().pathname.split("/")[2] );

    const {isLoading, error, data} = useQuery(["user"],
        () => makeRequest.get("/users/find/" + userId).then((res) => {
            return res.data;
        })
    );

    const {isLoading:followLoading, data:followData} = useQuery(["follow"],
        () => makeRequest.get("/follow?followedUserId=" + userId).then((res) => {
            return res.data;
        })
    );

    const queryClient = useQueryClient();

    const mutation = useMutation(
        (following)=>{
            if(following) return makeRequest.delete("/follow?followedUserId="+userId);
            return makeRequest.post("/follow",{followedUserId : userId});
        },{
            onSuccess: ()=>{
                queryClient.invalidateQueries(["follow"]);
            }
        },
    );

    const handleFollow = ()=>{
        mutation.mutate(followData.includes(currentUser.id));
    };

    return (
        <div className={"profile"}>
            {isLoading ? "Loading..." : (<>
                <div className="images">
                    <img
                        src={data.coverPic?"/upload/"+data.coverPic:"https://images.pexels.com/photos/14028501/pexels-photo-14028501.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load"}
                        alt=""
                        className="cover"
                    />
                    <img
                        src={data.profilePic?"/upload/"+data.profilePic:"https://images.pexels.com/photos/14028501/pexels-photo-14028501.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load"}
                        alt=""
                        className="profilePic"
                    />
                </div>
                <div className="profileContainer">
                    <div className="uInfo">
                        <div className="left">
                            <a href="http://facebook.com">
                                <FacebookTwoToneIcon fontSize="large"/>
                            </a>
                            <a href="http://facebook.com">
                                <InstagramIcon fontSize="large"/>
                            </a>
                            <a href="http://facebook.com">
                                <TwitterIcon fontSize="large"/>
                            </a>
                            <a href="http://facebook.com">
                                <LinkedInIcon fontSize="large"/>
                            </a>
                            <a href="http://facebook.com">
                                <PinterestIcon fontSize="large"/>
                            </a>
                        </div>

                        <div className="center">
                            <span>{data.name}</span>
                            <div className="info">
                                <div className="item">
                                    <PlaceIcon/>
                                    <span>{data.city}</span>
                                </div>
                                <div className="item">
                                    <LanguageIcon/>
                                    <span>{data.website}</span>
                                </div>
                            </div>
                            {followLoading
                                ?"Loading"
                                : userId === currentUser.id
                                ?(<button onClick={()=>setOpenUpdate(true)}>update</button>)
                                :(<button onClick={handleFollow}>{followData.includes(currentUser.id)? "following" : "follow"}</button>)}
                        </div>

                        <div className="right">
                            <EmailOutlinedIcon/>
                            <MoreVertIcon/>
                        </div>
                    </div>
                    <Posts userId={userId}/>
                </div>
            </>)}
            {openUpdate && <Update setOpenUpdate={setOpenUpdate} user={data}/>}
        </div>
    )
}

export default Profile;