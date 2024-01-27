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

    const [allPosts, setAllPosts] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [searchTimeout, setSearchTimeout] = useState(null);
    const [searchedResults, setSearchedResults] = useState([]);

    const filterPrompts = (searchtext) => {
        const regex = new RegExp(searchtext, 'i');
        return allPosts.filter( item => 
            regex.test(item.creator.username) || regex.test(item.prompt) || regex.test(item.tag)
        )
    }

    const handleSearchChange = (e) => {
        clearTimeout(searchTimeout);
        setSearchText(e.target.value);
        
        // debounce method
        setSearchTimeout(
            setTimeout(() => {
                const searchResult = filterPrompts(e.target.value);
                setSearchedResults(searchResult);
            }, 500)
        )
    }

    const handleTagClick = (tagName) => {
        setSearchText(tagName);

        const searchResult = filterPrompts(tagName);
        setSearchedResults(searchResult);
    }

    useEffect(() => {
        (async () => {
            const res = await fetch('/api/prompt');
            const data = await res.json();
            setAllPosts(data)
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
                data={searchText ? searchedResults : allPosts}
                handleTagClick={handleTagClick}
            />
        </>
    )
}

export default Feed;