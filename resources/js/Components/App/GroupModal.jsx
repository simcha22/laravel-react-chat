import TextAreaInput from "@/Components/TextAreaInput.jsx"
import InputError from "@/Components/InputError.jsx";
import InputLabel from "@/Components/InputLabel.jsx";
import Modal from "@/Components/Modal.jsx";
import TextInput from "@/Components/TextInput.jsx";
import SecondaryButton from "@/Components/SecondaryButton.jsx";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import UserPicker from "@/Components/App/UserPicker.jsx"

import {useForm, usePage} from "@inertiajs/react";
import {useEventBus} from "@/EventBus.jsx";
import {useEffect, useState} from "react";

export default function GroupModal({
                                       snow = false, onClose = () => {
    }
                                   }) {

    const page = usePage()
    const conversations = page.props.conversations
    const {on, emit} = useEventBus()
    const [group, setGroup] = useState({})
    const {data, setData, processing, reset, post, errors} = useForm({
        id: "",
        name: "",
        description: "",
        image: null,
        user_ids: [],
    })

    const users = conversations.filter((c) => !c.is_group);

    const createOrUpdateGroup = (e) => {
        e.preventDefault()

        if (group.id) {
            debugger
            post(route("group.update", group.id), {
                onSuccess: () => {
                    closeModal()
                    emit("toast.show", `Group "${data.name}" was updated.`)
                }
            })
            return;
        }

        post(route("group.store"), {
            onSuccess: () => {
                emit("toast.show", `Group "${data.name}" was created.`)
                closeModal()
            }
        })
    }

    const closeModal = () => {
        reset()
        onClose()
    }

    useEffect(() => {
        return on("GroupModal.show", (group) => {
            setData({
                name: group.name,
                description: group.description,
                image: null,
                _method: "PATCH",
                user_ids: group.users.filter((u) => group.owner_id !== u.id).map((u) => u.id)
            })
            setGroup(group)
        })
    }, [on])

    return (
        <Modal show={snow} onClose={closeModal}>
            <form
                onSubmit={createOrUpdateGroup}
                className="p-6 overflow-y-auto"
            >
                <h2 className="text-xl font-medium text-gray-900 ">
                    {group.id ? `Edit group ${group.name}` : "Create new Group"}
                </h2>

                <div className="mt-8">
                    <InputLabel htmlFor="name" value="Name"/>

                    <TextInput id="name" className="mt-1 block w-full" value={data.name} disabled={!!group.id}
                               onChange={(e) => setData("name", e.target.value)}
                               required isFocused/>

                    <InputError className="mt-2" message={errors.name}/>
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="description" value="Description"/>

                    <TextAreaInput id="description" rows="3" className="mt-1 block w-full"
                                   value={data.description || ""}
                                   onChange={(e) => setData("description", e.target.value)}/>

                    <InputError className="mt-2" message={errors.description}/>
                </div>

                <div className="mt-4">
                    <InputLabel value="Select Users"/>

                    <UserPicker value={
                        users.filter(
                            (u) =>
                                group.owner_id !== u.id &&
                                data.user_ids.includes(u.id)
                        ) || []
                    }
                                options={users}
                                onSelect={(users) => setData("user_ids", users.map((u) => u.id))}/>

                    <InputError className="mt-2" message={errors.user_ids}/>
                </div>

                <div>
                    <InputLabel htmlFor="image" value="Group Picture"/>

                    <input
                        id="image"
                        type="file"
                        className="file-input file-input-bordered file-input-info w-full max-w-xs"
                        onChange={(e) => setData("image", e.target.files[0])}
                    />
                    <p className="mt-1 text-gray-400">Please upload square Picture. Ex: 512px&times;512px</p>

                    <InputError className="mt-2" message={errors.image}/>
                </div>
                <div className="mt-6 flex justify-end">
                    <SecondaryButton onClick={closeModal}>
                        Cancel
                    </SecondaryButton>

                    <PrimaryButton className="ms-3" disabled={processing}>
                        {group.id ? "Update" : "Create"}
                    </PrimaryButton>
                </div>
            </form>
        </Modal>
    )
}
