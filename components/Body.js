import Block from "./Block";
import FilteredBlock from "./FilteredBlock";
import ScrollView from "./ScrollView";
import ContinueReading from "./ContinueReading";

// some comments here

const Body = () => {



        return (
            <>
            <div className="app_body">
                <ScrollView/>
                <Block list="Best Sellers You Can't Miss"/>
                <ContinueReading />
                <FilteredBlock list="Dive into the World of Discovery"/>
                <FilteredBlock list="Must-Read Thriller Hits"/>
                <FilteredBlock list="Gas Station Horrors: Read If You Dare"/>
                <FilteredBlock list="Top Non-Fiction Books"/>
                <FilteredBlock list="Most Popular Fiction Books"/>

                
            </div>
            </>
        )

}

export default Body;