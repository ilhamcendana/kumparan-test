import { Link } from "react-router-dom";
import { IoLocationSharp } from 'react-icons/io5';
import PropTypes from 'prop-types';

const CardProfile = ({ item = {}, onClickVisit }) => {
    return (
        <div key={item?.id} className="card bg-base-100 shadow-xl flex-auto">
            <div className="card-body">
                <div className="flex w-full justify-between gap-4 items-center">
                    <div className="flex flex-col gap-4">
                        <div className="avatar">
                            <div className="w-24 rounded-full">
                                <img src={`https://api.lorem.space/image/face?hash=9231${item?.id}`} />
                            </div>
                        </div>
                    </div>
                    <div className="flex-1 flex flex-col md:flex-row md:items-center gap-4">
                        <div className="flex-1">
                            <h2 className="card-title w-11/12 whitespace-nowrap inline-block overflow-hidden text-ellipsis">@{item?.username}</h2>
                            <p className="text-xs">{item?.name}</p>
                            <div className="flex items-center gap-1 mt-2">
                                <IoLocationSharp className="text-primary" />
                                <p className="text-stone-400 text-xs">{item?.address?.city}</p>
                            </div>
                        </div>
                        <Link to={`/detail/${item?.id}/posts`}>
                            <button onClick={() => onClickVisit && onClickVisit(item)} className="btn btn-primary btn-block md:w-auto px-8 btn-sm font-normal normal-case rounded-lg">Visit</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CardProfile;

CardProfile.propTypes = {
    item: PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
        username: PropTypes.string,
        address: PropTypes.object,
    })
}