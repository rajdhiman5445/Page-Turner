import load from "../files/shimmer_img.gif"

const Shimmer = ()=>{
    return(
        <div>
            
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