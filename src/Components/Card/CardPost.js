/** Frameworks */
import { Link } from "react-router-dom";
/** Libs */
import PropTypes from 'prop-types';

const CardPost = ({ item = {}, type = 'posts', showButton = true, onClickBtn, editMode = false, onChange, isBtnLoading = false, isBtnDisabled = false, btnText = 'Add' }) => {
    return (
        <div key={item?.id} className="card flex-auto bg-base-100 shadow-xl w-full relative">
            <div className={`card-body ${type === 'albums' && 'flex-row items-center'}`}>
                {!editMode ?
                    <h2 className="card-title overflow-hidden text-ellipsis whitespace-nowrap inline-block">{item?.title}</h2>
                    :
                    <input onChange={e => onChange(e.target.value, 'title')} value={item?.title} className="input input-bordered rounded-lg" placeholder="Title" />}
                {!editMode ?
                    <p className="inline-block overflow-hidden text-ellipsis whitespace-pre md:whitespace-normal">{item?.body}</p>
                    :
                    <textarea onChange={e => onChange(e.target.value, 'body')} value={item?.body} className="textarea textarea-bordered rounded-lg resize-none h-32" placeholder="Body" />
                }
                {showButton && !editMode &&
                    <div className="card-actions justify-end">
                        {typeof onClickBtn === 'string' ?
                            <Link to={`/detail/post/${item.id}`}>
                                <button className="btn btn-primary rounded-lg normal-case">Detail</button>
                            </Link>
                            :
                            <button disabled={isBtnLoading || isBtnDisabled} onClick={onClickBtn} className={`btn btn-primary rounded-lg normal-case ${isBtnLoading && 'loading'}`}>Detail</button>
                        }
                    </div>}
                {
                    editMode && <button disabled={isBtnLoading || isBtnDisabled} onClick={onClickBtn} className={`btn btn-primary rounded-lg normal-case self-end ${isBtnLoading && 'loading'}`}>{btnText}</button>
                }
            </div>
        </div>
    );
}

export default CardPost;

CardPost.propTypes = {
    item: PropTypes.object,
    type: PropTypes.string,
    showButton: PropTypes.bool,
    onClickBtn: PropTypes.func,
    editMode: PropTypes.bool,
    onChange: PropTypes.func,
    isBtnLoading: PropTypes.bool,
    isBtnDisabled: PropTypes.bool,
    btnText: PropTypes.string
}