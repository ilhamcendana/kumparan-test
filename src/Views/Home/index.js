import { useSelector } from "react-redux";


const Home = () => {
    const globalState = useSelector(state => state.users);
    console.log(globalState)
    return ( 
        <p className="text-white text-4xl">hello</p>
     );
}
 
export default Home;