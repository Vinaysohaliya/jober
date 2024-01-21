import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/conf";
import parse from "html-react-parser";
import { Button } from '../components/index'
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const [img, setImg] = useState(''); 
    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);
    const isAuthor = post && userData ? post.userId === userData.data.$id : false;

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (slug) {
                    const fetchedPost = await appwriteService.getPost(slug);
                    if (fetchedPost) {
                        setPost(fetchedPost);
                        getImg(fetchedPost.img);
                    } else {
                        navigate("/");
                    }
                } else {
                    navigate("/");
                }
            } catch (error) {
                console.error("Error fetching post:", error);
            }
        };

        fetchData();
    }, [slug, navigate]);

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.img);
                navigate("/");
            }
        });
    };

    async function getImg(fileId) {
        try {
            const imagePreview = await appwriteService.getFilePreview(fileId);
            setImg(imagePreview.href);
            console.log(imagePreview); // Log the value to the console
        } catch (error) {
            console.error("Error fetching image:", error);
        }
    }

    return post ? (
        <div className="py-8 mx-auto max-w-screen-md">
            <div className="w-full mb-4 relative border rounded-xl p-2">
                <img
                    src={img}
                    alt={post.title}
                    className="w-full h-auto rounded-xl"
                />

                {isAuthor && (
                    <div className="absolute right-2 top-2">
                        <Link to={`/edit-post/${post.$id}`}>
                            <Button bgColor="bg-green-500" className="mr-2">
                                Edit
                            </Button>
                        </Link>
                        <Button bgColor="bg-red-500" onClick={deletePost}>
                            Delete
                        </Button>
                    </div>
                )}
            </div>
            <div className="w-full mb-6">
                <h1 className="text-2xl font-bold">{post.title}</h1>
            </div>
            <div className="browser-css">
                {parse(post.content)}
            </div>
        </div>
    ) : null;
}
