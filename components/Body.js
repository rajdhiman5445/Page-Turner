import Block from "./Block";
import FilteredBlock from "./FilteredBlock";


const Body = () => {
    
        return (
            <>
            <div className="app_body">
                <Block list="Best Sellers You Can't Miss"/>
                <FilteredBlock list="Must-Read Thriller Hits"/>
                <FilteredBlock list="Top Non-Fiction Books"/>
                <FilteredBlock list="Most Popular Fiction Books"/>
                <FilteredBlock list="Spine-Tingling Horror Hits"/>
            </div>
            </>
        )

}

export default Body;