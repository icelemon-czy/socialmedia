import React, {useContext} from "react"
import "./share.scss"
import Image from "../../images/img.png";
import Map from "../../images/map.png";
import Friend from "../../images/friend.png";
import { AuthContext } from "../../context/authContext";

const Share = ()=>{
    const {currentUser} = useContext(AuthContext);
    return (
        <div className={"share"}>
            <div className={"container"}>
                <div className={"top"}>
                    {/*Picture + text */}
                    <img src={currentUser.profilePic} alt={""}/>
                    <input type="text" placeholder={`What's on your mind ${currentUser.name}?`} />
                </div>
                <hr />
                <div className={"bottom"}>
                    <div className={"left"}>
                        <input type="file" id="file" style={{display:"none"}} />
                        <label htmlFor={"file"}>
                            <div className="item">
                                <img src={Image} alt={""} />
                                <span>Add Image</span>
                            </div>
                        </label>

                        <div className="item">
                            <img src={Map} alt={""} />
                            <span>Add Place</span>
                        </div>

                        <div className="item">
                            <img src={Friend} alt={""} />
                            <span>Tag Friends</span>
                        </div>

                    </div>
                    <div className={"right"}>
                        <button>Share</button>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Share;