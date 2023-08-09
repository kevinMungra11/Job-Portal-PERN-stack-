// eslint-disable-next-line react/prop-types
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobs } from "../../redux/slices/jobSlice";

export const Search = () => {
    const dispatch = useDispatch();
    const job = useSelector((state) => state.jobs);
    const status = useSelector((state) => state.jobs.loading);
    const error = useSelector((state) => state.jobs.error);
    const [payload, setPayload] = useState({ page: 0, size: 8, search: '' });
    const word = React.createRef();

    const searchJobs = () => {
        setPayload({ ...payload, search: word.current.value })
        dispatch(fetchJobs(payload));
        console.log(word.current.value);
        console.log(job);
        // word.current.value = '';
    }

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className='input-group input-group-lg'>
                        <input ref={word} id="search-input" type="text" className="form-control" placeholder="Search Jobs" />
                        <button id="search-button" type="button" className="btn btn-primary" onClick={searchJobs}>
                            Search
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

const SearchBox = () => {
    return (
        <div className="p-5 text-center bg-light">
            <h1 className="mb-3">Find your dream job now</h1>
            <h4 className="mb-3">Discover job opportunities tailored to your skills and preferences.</h4>
            <Search />
        </div>
    )
}

export default SearchBox;