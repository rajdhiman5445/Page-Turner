import load from "../files/shimmer_img.gif"

const Shimmer = ()=>{
    return(
        <div>
            <h2> </h2>
            <div className="shimmer_ui">
                <div className="shimmer_card">
                <img src={load} className="shimmer_img"/>
                </div>
                <div className="shimmer_card">
                <img src={load} className="shimmer_img"/>
                </div>
                <div className="shimmer_card">
                <img src={load} className="shimmer_img"/>
                </div>
                <div className="shimmer_card">
                <img src={load} className="shimmer_img"/>
                </div>
                <div className="shimmer_card">
                <img src={load} className="shimmer_img"/>
                </div>
                <div className="shimmer_card">
                <img src={load} className="shimmer_img"/>
                </div>
                <div className="shimmer_card">
                <img src={load} className="shimmer_img"/>
                </div>
                
            
            </div>
        </div>
    )
}

export default Shimmer;