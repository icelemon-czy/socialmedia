import React, {useContext, useState} from "react"
import "./share.scss"
import Image from "../../images/img.png";
import Map from "../../images/map.png";
import Friend from "../../images/friend.png";
import { AuthContext } from "../../context/authContext";
import {
    useMutation,
    QueryClient,
} from '@tanstack/react-query'
import {makeRequest} from "../../axios";

const Share = ()=> {
    const [file, setFile] = useState(null);
    const [desc, setDesc] = useState("");
    const {currentUser} = useContext(AuthContext);

    const upload = async () =>{
        try{
            const formData = new FormData();
            formData.append("file",file);
            const res = await makeRequest.post("/upload",formData);
            return res.data; // Return url
        }catch (err){
            console.log(err);
        }
    }

    // Create a client
    const queryClient = new QueryClient()

    // Mutations
    const mutation = useMutation(
        (data) => {
            return makeRequest.post("/posts", data);
        },
        {
            onSuccess: () => {
                // Invalidate and refetch
                queryClient.invalidateQueries(["posts"]);
            },
        })
    //React Query - mutation
    const handleClick = async (e) => {
        e.preventDefault();
        let imgUrl = "";
        if (file) imgUrl = await upload();
        mutation.mutate({desc,img : imgUrl});
    };

    return (
        <div className={"share"}>
            <div className={"container"}>
                <div className={"top"}>
                    {/*Picture + text */}
                    <img src={currentUser.profilePic} alt={""}/>
                    <input type="text"
                           placeholder={`What's on your mind ${currentUser.name}?`}
                           onChange={(e) => setDesc(e.target.value)}
                    />
                </div>
                <hr/>
                <div className={"bottom"}>
                    <div className={"left"}>
                        <input type="file" id="file" style={{display: "none"}}
                               onChange={(e) => setFile(e.target.files[0])}
                        />
                        <label htmlFor={"file"}>
                            <div className="item">
                                <img src={Image} alt={""}/>
                                <span>Add Image</span>
                            </div>
                        </label>

                        <div className="item">
                            <img src={Map} alt={""}/>
                            <span>Add Place</span>
                        </div>

                        <div className="item">
                            <img src={Friend} alt={""}/>
                            <span>Tag Friends</span>
                        </div>

                    </div>
                    <div className={"right"}>
                        <button onClick={handleClick}>Share</button>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Share;