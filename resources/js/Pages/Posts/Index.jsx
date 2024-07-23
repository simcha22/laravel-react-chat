import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import {usePage} from "@inertiajs/react";
import {useEffect, useState} from "react";
import PostItem from "@/Components/App/PostItem.jsx";

function Index({}) {

    const page = usePage();
    const posts = page.props.posts;
    const [localPosts, setLocalPosts] = useState([])
    const [sortedPosts, setSortedPosts] = useState([])

    const onSearch = (ev) => {
        const search = ev.target.value.toLowerCase();
        setLocalPosts(
            posts.filter((post) => {
                return (
                    post.title.toLowerCase().includes(search))
            })
        )
    }
    useEffect(() => {
        setSortedPosts(localPosts)
    }, [localPosts])

    useEffect(() => {
        setLocalPosts(posts.data)
    }, [posts]);
    return (
        <div className="flex-1 overflow-y-auto">
            {sortedPosts && sortedPosts.map((post) => (
                <PostItem key={post.id} post={post}/>
            ))}
        </div>
    )
}


Index.layout = (page) => {
    return (
        <AuthenticatedLayout
            user={page.props.auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Blog Post</h2>}
        >
            {page}
        </AuthenticatedLayout>
    )
}
export default Index
