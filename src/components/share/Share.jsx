import React, {useContext, useState} from "react"
import "./share.scss"
import Image from "../../images/img.png";
import Map from "../../images/map.png";
import Friend from "../../images/friend.png";
import { AuthContext } from "../../context/authContext";
import {
    useMutation,
    useQueryClient,
    QueryClient,
} from '@tanstack/react-query'
import {makeRequest} from "../../axios";

const Share = ()=> {
    const [file, setFile] = useState(null);
    const [desc, setDesc] = useState("");
    const {currentUser} = useContext(AuthContext);
    // Send file upload and get url
    const upload = async () =>{
        try{
            const formData = new FormData();
            formData.append("file",file);
            const res = await makeRequest.post("/upload",formData);
            // res.data : 1668450499558 +  421662905903_.pic_hd.jpg
            return res.data; // Return url
        }catch (err){
            console.log(err);
        }
    };

    // Create a client
    const queryClient = useQueryClient();

    // Mutations
    const mutation = useMutation(
        (newPost) => {
            return makeRequest.post("/posts", newPost);
        },
        {
            onSuccess: () => {
                // Invalidate and refetch
                queryClient.invalidateQueries(["posts"]);
                console.log("ABABABBA");
            },
        }
    );

    //React Query - mutation
    const handleClick = async (e) => {
        e.preventDefault();
        let imgUrl = "";
        if (file) imgUrl = await upload();
        const newPost = {desc,img : imgUrl};
        mutation.mutate(newPost);
        setDesc("");
        setFile(null);
    };

    return (
        <div className={"share"}>
            <div className={"container"}>
                <div className={"top"}>
                   <div className={"left"}>
                       {/*Picture + text */}
                       <img src={currentUser.profilePic} alt={""}/>
                       <input type="text"
                              placeholder={`What's on your mind ${currentUser.name}?`}
                              onChange={(e) => setDesc(e.target.value)}
                              value={desc}
                       />
                   </div>
                    <div className={"right"}>
                        {file && <img className={"file"} alt={""} src={URL.createObjectURL(file)} />}
                    </div>
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