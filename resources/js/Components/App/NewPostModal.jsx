import InputError from "@/Components/InputError.jsx";
import InputLabel from "@/Components/InputLabel.jsx";
import Modal from "@/Components/Modal.jsx";
import TextInput from "@/Components/TextInput.jsx";
import SecondaryButton from "@/Components/SecondaryButton.jsx";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import {useForm} from "@inertiajs/react";
import {useEventBus} from "@/EventBus.jsx";
import Checkbox from "@/Components/Checkbox.jsx";
import TextAreaInput from "@/Components/TextAreaInput.jsx";

export default function NewPostModal({
                                         show = false, onClose = () => {
    }
                                     }) {

    const {emit} = useEventBus()
    const {data, setData, processing, reset, post, errors} = useForm({
        title: "",
        body: "",
        image: null,
    })

    const submit = (e) => {
        e.preventDefault()
        post(route("post.store"), {
            onSuccess: () => {
                emit("toast.show", `Post "${data.title}" was created.`)
                closeModal()
            }
        })
    }

    const closeModal = () => {
        reset()
        onClose()
    }

    return (
        <Modal show={show} onClose={closeModal}>
            <form
                onSubmit={submit}
                className="p-6 overflow-y-auto"
            >
                <h2 className="text-xl font-medium text-gray-900 ">
                    Create new Post
                </h2>

                <div className="mt-8">
                    <InputLabel htmlFor="title" value="title"/>

                    <TextInput id="title" className="mt-1 block w-full" value={data.title}
                               onChange={(e) => setData("title", e.target.value)}
                               required isFocused/>

                    <InputError className="mt-2" message={errors.title}/>
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="body" value="body"/>

                    <TextAreaInput id="body" rows="3" className="mt-1 block w-full"
                                   value={data.body || ""}
                                   onChange={(e) => setData("body", e.target.value)}/>

                    <InputError className="mt-2" message={errors.body}/>
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
                        Create
                    </PrimaryButton>
                </div>
            </form>
        </Modal>
    )
}
