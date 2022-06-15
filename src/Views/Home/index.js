import { Link } from "react-router-dom";
import { fetchAxiosCore, useFetch } from "Utils/fetch";

const Home = () => {
    const { data, isLoading } = useFetch('GET', '/users');
    // local state
    // func
    function goBelow() {
        window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })
    }
    //logs
    console.log(data);
    return (
        <main className="">
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content text-center">
                    <div className="max-w-md">
                        <h1 className="text-5xl font-bold">Hello there</h1>
                        <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                        <button onClick={goBelow} className="btn btn-primary">Get Started</button>
                    </div>
                </div>
            </div>

            {!isLoading &&
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 container mx-auto py-10 min-h-screen px-4 lg:px-0">
                    {data.map((item) => (
                        <div key={item.id} className="card bg-base-100 shadow-xl flex-auto">
                            <div className="card-body">
                                <div className="flex w-full justify-between gap-4">
                                    <div className="flex flex-col gap-4">
                                        <div className="avatar">
                                            <div className="w-24 rounded-full">
                                                <img src="https://api.lorem.space/image/face?hash=92310" />
                                            </div>
                                        </div>
                                        <Link to={`/detail?id=${item.id}`}>
                                        <button className="btn btn-primary btn-block md:w-auto px-8">Visit</button>
                                        </Link>
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-xs">{item.name}</p>
                                        <h2 className="card-title w-11/12 whitespace-nowrap inline-block overflow-hidden text-ellipsis">@{item.username}</h2>
                                    </div>
                                </div>                                
                            </div>
                        </div>
                    ))}
                </div>}
        </main>
    );
}

export default Home;