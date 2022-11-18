import React, {useContext, useState} from 'react';
import comments from './comments.scss'
import {AuthContext} from "../../context/authContext";
import {QueryClient, useMutation, useQuery} from "@tanstack/react-query";
import {makeRequest} from "../../axios";
import moment from "moment";

// !!!!!!!!!!!!!!!! difference between postId and {postId}
const Comments = ({postId}) => {
    const [desc,setDesc] = useState("");
    const {currentUser} = useContext(AuthContext);

    const { isLoading, error, data } = useQuery(
        [`comments`],
        () => makeRequest.get("/comments?postId=" + postId).then((res)=>{return res.data})
    );

    // Create a client
    const queryClient = new QueryClient();

    // Mutations
    const mutation = useMutation(
        (newComment) => {
            return makeRequest.post("/comments", newComment);
        },
        {
            onSuccess: () => {
                // Invalidate and refetch
                queryClient.invalidateQueries(['comments']);
                console.log("FUCK");
            },
        }
    );

    //React Query - mutation
    const handleClick = async (e) => {
        e.preventDefault();
        const newComment = {desc,postId};
        mutation.mutate(newComment);
        setDesc("");
    };


    return (
        <div className={"comments"}>
            <div className={"write"}>
                <img src={currentUser.profilePic} alt={""}/>
                <input type={"text"}
                       placeholder={"write comment"}
                       value={desc}
                       onChange={(e)=>setDesc(e.target.value)}
                />
                <button onClick={handleClick}>Post</button>
            </div>
                {error
                    ? "Something went wrong"
                    : isLoading
                        ? "isLoading"
                        : data.map((comment) => (
                            <div className="comment" key={comment.id}>
                                <img src={comment.profilePicture} alt=""/>
                                <div className="info">
                                    <span>{comment.name}</span>
                                    <p>{comment.desc}</p>
                                </div>
                                <span className="date">
                                    {moment(comment.createdAt).fromNow()}
                                </span>
                            </div>
                        ))
                }
        </div>
    )
}
export default Comments;