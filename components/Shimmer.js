import load from "../files/shimmer_img.gif"

const Shimmer = ()=>{
    return(
        <div>
            <h2 >Crafting your bookish dreams, hold on...</h2>
            <div className="shimmer_ui">
            
                <img src={load} className="shimmer_img"/>
                <img src={load} className="shimmer_img"/>
                <img src={load} className="shimmer_img"/>
                <img src={load} className="shimmer_img"/>
                <img src={load} className="shimmer_img"/>
                <img src={load} className="shimmer_img"/>
                <img src={load} className="shimmer_img"/>
                <img src={load} className="shimmer_img"/>
            
            </div>
        </div>
    )
}

export default Shimmer;