import React, { useEffect, useState } from 'react';
import './SearchByInterest.css';
import mainLogo from '../Files/bruinsource_logo.png'
import searchIcon from '../Files/search_icon.png'
/*import { getProjectById } from '../../server/project';*/
import history from '../history';
import axios from 'axios';
import { Bars } from 'react-loading-icons'
import ProjectTable from '../Components/ProjectTable';
import { TagFacesSharp, VideoCameraBackTwoTone } from '@mui/icons-material';


const SearchByInterest = (props) => {

    const [projects, setProjects] = useState(null);
    const [search, setSearch] = useState(null);
    const [frontend_tag, setFrontEndTag] = useState(false);
    const [backend_tag, setBackEndTag] = useState(false);
    const [python_tag, setPythonTag] = useState(false);
    const [cpp_tag, setCppTag] = useState(false);
    const [javascript_tag, setJavascriptTag] = useState(false);
    const [tags, setTags] = useState([]);

    const [dataLoaded, setDataLoaded] = useState(false)

    const submitSearch = () => {
        axios.post('/api/projects/tags', {tags: tags})
            .then(res => {
                console.log(res.data);
                setProjects(res.data);
                /*
                const projectIds = res.data;
                for (const id in projectIds){
                    const projectId = parseInt(projectIds[id]);
                    console.log(projectId)
                    console.log(typeof(projectId))
                    axios.get(`/api/projects/projectidpath/${projectId}`)
                    .then(proj => {
                        console.log(proj);
                        setProjects(proj.data);
                    })
                }
                */
            });
    }

    const getDefaultProjects = () => {
        axios.get('/api/projects')
            .then(res => {
                setProjects(res.data)
            });
    }

    useEffect(() => {
        if (projects) {
            setDataLoaded(true)
            if (projects.length === 0) {
                // make some text to show that none exist for this search term
            }
        }
    }, [projects])

    useEffect(() => {
        getDefaultProjects()
    }, [])

    const submitTag = () => {
        let arr = [];
        let tag_arr = [];

        if (search.indexOf(',')){
            arr = search.split(',');
        } else {
            arr = [search];
        }

        arr.forEach(tag => {
            if (!tags.includes(tag.trim())) {
                tag_arr.push(tag.trim())
            }
        });

        setTags([...tags].concat(tag_arr));
        console.log(tags);

        if (tags.length > 0) {
            submitSearch()
        }
    }

    const renderTableData = () => {
        if (!projects || projects.length === 0) {
            return <tr> No entries exist for this search. </tr>
        } else {
            return projects.map((project, index) => {
                const { id, name, description, tags, date_created, last_updated, author, collaborators, requests } = project

                var d = new Date(date_created)
                d = d.toDateString()

                var collaboratorsExist = false
                if (collaborators && collaborators.length) {
                    if (collaborators.length > 0) {
                        collaboratorsExist = true
                    }
                }

                return (
                    <tr key={index}>
                        <td>{name}</td>
                        <td>{author}</td>
                        <td>{d}</td>
                        <td>{collaboratorsExist ? collaborators : 'No collaborators'}</td>
                    </tr>
                )
            })
        }
    }

    return (
        <div className="SearchByInterest">
            <img src={mainLogo} className="MainLogo" alt="mainLogo" />
            <h2> Search By Interest </h2>
            <form>
                    <input
                        type="text"
                        placeholder="Search for a project..."
                        onChange={event => setSearch(event.target.value)}
                    />
                </form>
            <button type="button" className="Search" onClick={submitTag}>
                <img src={searchIcon} width="50px" alt="searchIcon" ></img>
            </button>
            <button type="button" className="Create" onClick={() => history.push('/createproject')}>Create New Project</button>
            <button type="button" className="BackToProjects" onClick={() => history.push('/allprojects')}>Back to All Projects</button>
            <div className="ProjectList">
                {!dataLoaded ?
                    <div className="LoadingDiv"> <Bars fill="#005587" /> </div>
                    :
                    <ProjectTable data={projects} ></ProjectTable>
                }
            </div>
        </div>
    );
}

export default SearchByInterest;