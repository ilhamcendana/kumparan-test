import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'

export const CardSkeleton = ({ count = 1 }) => {
    return (
        <div className="flex flex-col gap-8">
            {new Array(count).fill(undefined).map((_, i) => (
                <div key={i} className="flex flex-col gap-2">
                    <Skeleton count={1} height={150} />
                    <Skeleton count={5} height={20} />
                </div>
            ))}
        </div>
    );
}

export const CardProfileSkeleton = () => {
    return (
        <div className="flex flex-col w-full max-w-xl gap-2 items-center pt-10">
            <Skeleton count={1} height={100} width={100} borderRadius='50%' />
            <div className="flex gap-2">
                <Skeleton count={1} height={20} width={125} />
                <Skeleton count={1} height={20} width={125} />
            </div>
            <Skeleton count={1} height={20} width={250} />            
        </div>
    )
}