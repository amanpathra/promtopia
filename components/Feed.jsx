'use client';

import { useEffect, useState } from "react";
import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
    return(
        <div className="mt-16 prompt_layout">
            {data.map((post) => (
                <PromptCard
                    key={post._id}
                    post={post}
                    handleTagClick={handleTagClick}
                />
            ))}
        </div>
    )
}

const Feed = () => {

    const [searchText, setSearchText] = useState('');
    const [posts, setPosts] = useState([]);

    const handleSearchChange = (e) => {
        setSearchText(e.target.value)
    }

    useEffect(() => {
        (async () => {
            const res = await fetch('/api/prompt');
            const data = await res.json();
            setPosts(data)
        })();
    }, [])

    return (
        <>
            <section className="feed">
                <form className="w-full flex-center relative">
                    <input
                        type="text"
                        placeholder="Search for a tag or username"
                        value={searchText}
                        onChange={handleSearchChange}
                        required
                        className="search_input peer"
                    />
                </form>
            </section>

            <PromptCardList
                data={posts}
                handleTagClick={()=>{}}
            />
        </>
    )
}

export default Feed;