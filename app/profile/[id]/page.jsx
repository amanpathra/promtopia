'use client';

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

import Profile from "@components/Profile";

const UserProfile = ({ params }) => {

    const searchParams = useSearchParams();
    const username = searchParams.get('name');

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const res = await fetch(`/api/users/${params?.id}/posts`);
            const data = await res.json();
            setPosts(data)
        };

        if (params?.id) fetchPosts();
    }, [])
    
    return (
        <Profile
            name={`${username}'s`}
            desc={`Welcome to ${username}'s personalized profile page`}
            data={posts}
        />
    )
}

export default UserProfile;