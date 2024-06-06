import Block from "./Block";
import FilteredBlock from "./FilteredBlock";


const Body = () => {
    
        return (
            <>
            <div className="app_body">
                <Block />
                <FilteredBlock list="Books for you"/>
            </div>
            </>
        )

}

export default Body;