import React, {useState} from 'react'
import ProjectNotSelected from './ProjectNotSelected'

const useProjectNotSelected = () => {
    const [projectSelected, setProjectSelected] = useState(false)   
   
    return([
        projectSelected ? <ProjectNotSelected /> : null,
        () => setProjectSelected(true), 
        () => setProjectSelected(false)
    ]
    )
}
export default useProjectNotSelected