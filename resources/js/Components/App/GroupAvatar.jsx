import {UsersIcon} from "@heroicons/react/24/solid/index.js";

const GroupAvatar = ({group}) => {

    return (
        <>
            {group.image_url && (
                <div className={`chat-image avatar`}>
                    <div className={`rounded-full w-8`}>
                        <img src={group.image_url}/>
                    </div>
                </div>
            )}
            {!group.image_url && (
                <div className={`avatar placeholder`}>
                    <div className={`bg-gray-400 text-gray-800 rounded-full w-8`}>
                        <UsersIcon className={'w-4'}/>
                    </div>
                </div>
            )}
        </>
    )
}

export default GroupAvatar
