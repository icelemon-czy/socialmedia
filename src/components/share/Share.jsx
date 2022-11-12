import React, {useContext} from "react"
import "./share.scss"
import { AuthContext } from "../../context/authContext";

const Share = ()=>{
    const {currentUser} = useContext(AuthContext);
    return (
        <div className={"share"}>
            <div className={"container"}>
                <div className={"top"}>
                    {/*Picture + text */}
                    <div className={"left"}>
                        <img src={"/upload"+currentUser.profilePic} alt={""} />
                        <input
                            type={"text"}
                            placeholder={`What's on your mind ${currentUser.name} ?`}
                        />


                    </div>
                </div>
                <hr />


            </div>
        </div>
    );
};
export default Share;