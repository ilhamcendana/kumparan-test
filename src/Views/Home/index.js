/** Utils */
import { useFetch } from "Utils/fetch";
/** Frameworks */
import { useState, useEffect } from "react";
/** Libs */
import Helmet from "react-helmet";
/** Components */
import { CardProfile } from "Components/Card";

const Home = () => {
    // fetch
    const { data, isLoading } = useFetch('GET', '/users');
    // local state
    const [recentData, recentDataSet] = useState(null);
    // func
    function goBelow() {
        window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })
    }
    function onClickVisitHandler(data) {
        window.localStorage.setItem('recent', JSON.stringify(data));
    }

    //useeffect
    useEffect(() => {
        const getRecent = window.localStorage.getItem('recent');
        if (getRecent) {
            recentDataSet(JSON.parse(getRecent));
        }
    }, [])
    //logs    
    return (
        <main>
            {/* HEAD HELMET */}
            <Helmet>
                <title>Kumparan Test</title>
            </Helmet>
            {/* ======== END: HEAD HELMET */}
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content text-center">
                    <div className="max-w-md">
                        <h1 className={`text-5xl font-bold`}>Hello there</h1>
                        <p className="py-6">This is my result of the test, take your time to explore, <br/> Thank you very much!</p>
                        <button onClick={goBelow} className="btn btn-primary rounded-lg normal-case">Get Started</button>
                    </div>
                </div>
            </div>

            {recentData &&
                <div className="grid grid-cols-1 gap-4 py-10 px-4 lg:px-0 max-w-xl container mx-auto">
                    <p className="text-2xl md:text-4xl font-semibold">Recent Visit</p>
                    <CardProfile item={recentData} />
                </div>}

            {!isLoading &&
                <div className="grid grid-cols-1 gap-4 py-10 min-h-screen px-4 lg:px-0 max-w-xl container mx-auto">
                    <p className="text-2xl md:text-4xl font-semibold">Users</p>
                    {data.map((item) => <CardProfile item={item} key={item?.id} onClickVisit={(data) => onClickVisitHandler(data)} />)}
                </div>}
        </main>
    );
}

export default Home;