/** Libs */
import Helmet from "react-helmet";

const NotFound = () => {
    return (
        <div>
            <Helmet>
                <title>404 | Kumparan Test</title>
            </Helmet>

            <section className="bg-gray-50">
                <div className="max-w-screen-xl px-4 py-32 mx-auto lg:h-screen lg:items-center lg:flex">
                    <div className="max-w-xl mx-auto text-center">
                        <h1 className="text-3xl font-extrabold sm:text-5xl">
                            Sorry! 😡
                            <strong className="font-extrabold text-primary sm:block">
                                The page you're looking for is not here
                            </strong>
                        </h1>

                        <div className="flex flex-wrap justify-center gap-4 mt-8">
                            <a className="block w-full px-12 py-3 text-sm font-medium text-white bg-primary rounded shadow sm:w-auto focus:outline-none focus:ring" href="/">
                                Go Home
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default NotFound;