import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import Index from "@/Pages/Posts/Index.jsx";

function Post({post}) {
    return (
        <div className="flex-1 overflow-y-auto">
            <div className="mb-4 md:mb-0 w-full mx-auto relative">
                <div className="px-4 lg:px-0">
                    <h2 className="text-4xl font-semibold text-gray-800 leading-tight">
                        {post.title}
                    </h2>
                    {/*<a*/}
                    {/*    href="#"*/}
                    {/*    className="py-2 text-green-700 inline-flex items-center justify-center mb-2"*/}
                    {/*>*/}
                    {/*    */}
                    {/*</a>*/}
                </div>

                <img
                    src={post.image_url}
                    className="w-full object-cover lg:rounded"/>
            </div>
        </div>
    )
}

Post.layout = (page) => {
    return (
        <AuthenticatedLayout
            user={page.props.auth.user}
        >
            {page}
        </AuthenticatedLayout>
    )
}

export default Post
