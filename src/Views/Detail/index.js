/** Frameworks */
import { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
/** Utils */
import { fetchAxiosCore, useFetch } from "Utils/fetch";
/** Libs */
import Helmet from "react-helmet";
import { toast } from "react-toastify";
/** Components */
import { CardPost, CardProfileSkeleton, CardSkeleton } from "Components/Card";
import Modal from "Components/Modal";
/** Icons */
import { IoLocationSharp } from "react-icons/io5";
import { ModalContentDetailPost, ModalContentDetailAlbum } from "./ModalContent";


const DetailProfile = () => {
    // rrd
    const params = useParams();
    const currentTab = params.tab;

    //fetch
    const { data: dataUser, isLoading: isLoadingUser } = useFetch('GET', `/users/${params.id}`);
    const { data: dataTab, isLoading: isLoadingTab } = useFetch('GET', `/users/${params.id}/${currentTab}`);



    //local state
    const [scaleAvatar, scaleAvatarSet] = useState(1);
    const [isModalOpenPost, isModalOpenPostSet] = useState(false);
    const [idSelectedPost, idSelectedPostSet] = useState(null);
    const [isModalOpenAlbum, isModalOpenAlbumSet] = useState(false);
    const [idSelectedAlbum, idSelectedAlbumSet] = useState(null);
    const [isEditMode, isEditModeSet] = useState(false);
    const [inputDataEdit, inputDataEditSet] = useState({
        title: '',
        body: ''
    });
    const [isLoadingAddPost, isLoadingAddPostSet] = useState(false);

    //useeffect for animation
    useEffect(() => {
        function detectScroll() {
            const calc = ((90 - window.scrollY) / 100) * 2;
            const value = window.scrollY === 0 ? 1 : window.scrollY >= 90 ? 0 : calc >= 1 ? 1 : calc;
            scaleAvatarSet(value);
        }
        window.addEventListener('scroll', detectScroll);
        return () => window.removeEventListener('scroll', detectScroll)
    }, []);

    //var
    const routeChild = ['posts', 'albums'];
    const translateCalc = (2 - 10) / scaleAvatar;
    const translateValue = translateCalc <= -100 ? -100 : translateCalc;
    const heightCalc = ((scaleAvatar * 2) * (310 - 160));
    const heightValue = heightCalc <= 150 ? 200 : heightCalc;
    const firstName = dataUser?.name.split(" ")[0];

    // func 
    async function submitPostHandler() {
        isLoadingAddPostSet(true);
        const { data } = await fetchAxiosCore('POST', '/posts',
            {
                title: inputDataEdit.title,
                body: inputDataEdit.body,
                userId: params.id,
            },
            {
                'Content-type': 'application/json; charset=UTF-8',
            }
        );
        if (data) {
            isEditModeSet(false);
            toast.success('Post Added!');
            inputDataEditSet({
                title: '',
                body: ''
            })
        }
        isLoadingAddPostSet(false);
    }

    async function submitComment(commentText) {
        const { data } = await fetchAxiosCore('POST', '/comments',
            {
                postId: idSelectedPost,
                name: 'Current User',
                email: 'current_user@gmail.com',
                body: commentText,

            },
            {
                'Content-type': 'application/json; charset=UTF-8',
            }
        );
        if (data) {
            toast.success('Comment Added!');
        }
    }

    async function onClickDeleteHandler() {
        const { data } = await fetchAxiosCore('DELETE', `/posts/${idSelectedPost}`);
        if (data) {
            toast.success('Post Deleted!');
            isModalOpenPostSet(false);
        }
    }

    // if route doesnt match
    if (!routeChild.includes(currentTab)) return <Navigate to='*' />

    return (
        <main>
            {/* HEAD HELMET */}
            <Helmet>
                <title>{`${firstName || 'user'} | Kumparan Test`}</title>
            </Helmet>
            {/* ======== END: HEAD HELMET */}

            <div className="container mx-auto flex flex-col gap-4 items-center pb-8 relative">
                {/* PROFILE DETAIL USER */}
                {!isLoadingUser ?
                    <div style={{ height: `${heightValue}px`, transition: '1s' }} className="fixed z-20 w-full flex flex-col gap-4 items-center bg-base-100 py-8 shadow-xs">
                        <div className={`avatar`}>
                            <div style={{ transform: `scale(${scaleAvatar})`, opacity: scaleAvatar, transition: '.5s' }} className="rounded-full w-24">
                                <img src="https://api.lorem.space/image/face?hash=92310" />
                            </div>
                        </div>


                        <div style={{ transform: `translateY(${translateValue}px)`, transition: '1s' }} className="flex flex-col gap-4 items-center">
                            <div className="flex flex-col gap-1 items-center">
                                <p className="text-xl lg:text-4xl font-semibold">{dataUser.name}</p>
                                <div className="flex gap-4 items-center">
                                    <p className="text-sm md:text-lg  text-slate-500">{dataUser.email}</p>
                                    <div className="flex items-center gap-1">
                                        <IoLocationSharp className="text-primary" />
                                        <p className="text-sm md:text-lg text-slate-500">{dataUser.address?.city}</p>
                                    </div>
                                </div>
                                <a href={`https://${dataUser?.website}`} target='_blank' className="underline">{dataUser?.website}</a>
                            </div>
                            <div className="tabs tabs-boxed">
                                <Link to={`/detail/${params.id}/posts`}>
                                    <span className={`tab ${currentTab === 'posts' && 'tab-active'}`}>Post</span>
                                </Link>
                                <Link to={`/detail/${params.id}/albums`}>
                                    <span className={`tab ${currentTab === 'albums' && 'tab-active'}`}>Album</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                    :
                    <CardProfileSkeleton />
                }
                {/* ======== END: PROFILE DETAIL USER */}

                {/* LIST POST AND ALBUM  */}
                <div className={`flex flex-col gap-4 px-4 ${isLoadingUser ? 'mt-8' : 'mt-[340px]'} max-w-xl w-full`}>
                    <div className="w-full justify-between items-center flex">
                        <h3 className="text-4xl font-semibold uppercase">{currentTab || ''}</h3>
                        <button onClick={() => isEditModeSet(prev => !prev)} className={`btn  ${isEditMode ? 'btn-error' : 'btn-primary'} rounded-lg`}>{isEditMode ? 'Cancel' : 'Add post'}</button>
                    </div>
                    {isEditMode &&
                        <CardPost
                            item={inputDataEdit}
                            type={currentTab}
                            editMode
                            onClickBtn={submitPostHandler}
                            onChange={(val, key) => inputDataEditSet(prev => {
                                return {
                                    ...prev,
                                    [key]: val
                                }
                            })}
                            isBtnLoading={isLoadingAddPost}
                            isBtnDisabled={!inputDataEdit.title || !inputDataEdit.body}
                        />}
                    {!isLoadingTab ?
                        dataTab.map((item, i) =>
                            <CardPost
                                key={i}
                                item={item}
                                type={currentTab}
                                onClickBtn={() => {
                                    if (currentTab === 'posts') {
                                        idSelectedPostSet(item.id)
                                        isModalOpenPostSet(true);
                                    } else {
                                        idSelectedAlbumSet(item.id)
                                        isModalOpenAlbumSet(true);
                                    }
                                }} />)
                        :
                        <CardSkeleton count={3} />
                    }
                </div>
            </div>
            {/* ========== END: LIST POST AND ALBUM  */}
            {/* MODAL POST */}
            <Modal isOpen={isModalOpenPost} onClose={() => isModalOpenPostSet(false)}>
                <ModalContentDetailPost
                    id={idSelectedPost}
                    onClickDelete={onClickDeleteHandler}
                    onClickComment={comment => submitComment(comment)}
                />
            </Modal>
            {/* MODAL ALBUM */}
            <Modal isOpen={isModalOpenAlbum} onClose={() => isModalOpenAlbumSet(false)}>
                <ModalContentDetailAlbum id={idSelectedAlbum} />
            </Modal>
        </main>
    );
}

export default DetailProfile;