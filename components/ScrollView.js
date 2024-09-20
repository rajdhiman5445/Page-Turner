import types from "../data/types";
import ScrollCard from "./ScrollCard";

const ScrollView = () => {
    return(
        <>
        <div className="scroll_view">
            {types.map((item)=>(
                <ScrollCard key={item.id} link={item.link} img={item.img} title={item.title} />
            ))}
        </div>
        </>
    )
}

export default ScrollView;