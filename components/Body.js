import Block from "./Block";
import FilteredBlock from "./FilteredBlock";
import ScrollView from "./ScrollView";

const Body = () => {



        return (
            <>
            <div className="app_body">
                <ScrollView/>
                <Block list="Best Sellers You Can't Miss"/>
                <FilteredBlock list="Dive into the World of Discovery"/>
                <FilteredBlock list="Must-Read Thriller Hits"/>
                <FilteredBlock list="Gas Station Horrors: Read If You Dare"/>
                <FilteredBlock list="Top Non-Fiction Books"/>
                <FilteredBlock list="Most Popular Fiction Books"/>
                <FilteredBlock list="Spine-Tingling Horror Hits"/>
                
            </div>
            </>
        )

}

export default Body;