/** Frameworks */
import { useState } from "react";
/** Utils */
import { fetchAxiosCore, useFetch } from "Utils/fetch";
/** Components */
import { CardPost, CardSkeleton } from "Components/Card";
/** Icons */
import { BsThreeDots } from 'react-icons/bs'
import { toast } from "react-toastify";

export const ModalContentDetailPost = ({ id, onClickDelete, onClickComment, userId }) => {
    //FETCH
    const { data: dataPost, isLoading: isLoadingPost } = useFetch('GET', `/posts/${id}`);
    const { data: dataComments, isLoading: isLoadingComments } = useFetch('GET', `/posts/${id}/comments`);
    // local state
    const [inputComment, inputCommentSet] = useState('');
    const [isEditMode, isEditModeSet] = useState(false);
    const [inputDataEdit, inputDataEditSet] = useState({
        title: '',
        body: ''
    });
    // func
    function onClickEdit() {
        inputDataEditSet(dataPost)
        isEditModeSet(true);
    }
    async function onEditHandler() {
        const { data } = await fetchAxiosCore('PUT', `/posts/${id}`,
            {
                id,
                title: inputDataEdit.title,
                body: inputDataEdit.body,
                userId
            },
            {
                'Content-type': 'application/json; charset=UTF-8',
            }
        )
        if (data) {
            toast.success('Post Updated!');
            isEditModeSet(false);
            inputDataEditSet({ title: '', body: '' })
        }
    }
    return (
        <div className="w-full max-w-xl mx-auto py-10">
            <div className="flex justify-between items-center">
                <p className="font-semibold text-2xl mb-4">Detail Post</p>
                <div className="dropdown dropdown-hover dropdown-end">
                    <label tabIndex="0" className="cursor-pointer">
                        <BsThreeDots size={20} />
                    </label>
                    <ul tabIndex="0" className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                        <li onClick={onClickEdit}><a>Edit</a></li>
                        <li onClick={onClickDelete}><a>Delete</a></li>
                    </ul>
                </div>
            </div>
            {isLoadingPost ?
                <CardSkeleton count={1} />
                :
                <CardPost
                    item={isEditMode ? inputDataEdit : dataPost}
                    showButton={false}
                    editMode={isEditMode}
                    onChange={(val, key) => inputDataEditSet(prev => {
                        return {
                            ...prev,
                            [key]: val
                        }
                    })}
                    onClickBtn={onEditHandler}
                    btnText='Edit'
                />}
            <div className="mt-6 flex flex-col gap-4">
                <p className="text-2xl font-semibold">Comments ({dataComments && dataComments.length})</p>
                <div className="flex flex-col gap-4 h-80 overflow-auto">
                    {isLoadingComments ?
                        <CardSkeleton count={3} /> :
                        dataComments.map((item) => (
                            <div key={item.id} className="p-4 bg-base-200">
                                <p className="card-title">{item.name}</p>
                                <p className="text-xs text-slate-500 my-2">{item.email}</p>
                                <p>{item.body}</p>
                            </div>
                        ))}
                </div>
            </div>

            <div className="flex gap-4 items-center mt-4">
                <input value={inputComment} onChange={e => inputCommentSet(e.target.value)} type="text" placeholder="Add comment here..." className="input border-b rounded-lg w-full flex-1" />
                <button
                    onClick={() => {
                        onClickComment(inputComment);
                        inputCommentSet('');
                    }}
                    className="btn btn-primary rounded-lg">Send</button>
            </div>
        </div>
    )
}

export const ModalContentDetailAlbum = ({ id }) => {
    //fetch
    const { data: dataDetailAlbum, isLoading: isLoadingDetailAlbum } = useFetch('GET', `/albums/${id}/photos`);
    const { data: dataAlbum, isLoading: isLoadingDataAlbum } = useFetch('GET', `/albums/${id}`);
    return (
        <div className="overflow-auto h-96 flex flex-col gap-4">
            {!isLoadingDataAlbum && <p className="font-semibold text-xl">{dataAlbum.title}</p>}
            {isLoadingDetailAlbum ?
                <CardSkeleton count={1} />
                :
                <div className="grid grid-cols-6 gap-1 w-full">
                    {dataDetailAlbum.map((item) => (
                        <div key={item.id} className=''>
                            <img src={item.thumbnailUrl} alt={item.title} />
                        </div>
                    ))}
                </div>
            }
        </div>
    )
}