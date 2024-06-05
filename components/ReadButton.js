import Read from "./Read";
import { useState } from "react";

const ReadButton = ({text, url}) => {
    const [showRead, setShowRead] = useState(false);
    return(
        <>
            <div>
                <button className="download_btn" onClick={() => setShowRead(true)}>{text}</button>
                {showRead && <Read url={url} />}
            </div>

            
        </>
    )
}

export default ReadButton;