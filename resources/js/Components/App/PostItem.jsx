import UserAvatar from "@/Components/App/UserAvatar.jsx";
import {formatMessageDateShort} from "@/helpers.jsx";

const PostItem = ({post}) => {
    return (
        <div className="px-2">
            <article
                className="mx-auto my-10 flex max-w-md flex-col rounded-2xl bg-white px-4 shadow md:max-w-5xl md:flex-row md:items-center">
                <div className="shrink-0 my-4 md:mr-8 md:max-w-sm">
                    <img className="rounded-2xl"
                         src={post.image_url}
                         alt=""/>
                </div>
                <div className="py-4 sm:py-8">
                    <a href="#" className="mb-6 block text-2xl font-medium text-gray-700">{post.title}</a>
                    <p className="mb-6 text-gray-500">{post.sub_body} ...</p>
                    <div className="flex items-center">
                        <div className="h-10 w-10"><UserAvatar user={post.user}/></div>

                        <p className="ml-4 w-56">
                            <strong className="block font-medium text-gray-700">{post.user.name}</strong>
                            <span className="text-sm text-gray-400">{formatMessageDateShort(post.created_at)}</span>
                        </p>
                    </div>
                </div>
            </article>
        </div>
    )
}

export default PostItem
