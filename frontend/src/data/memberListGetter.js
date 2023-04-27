import axios from "axios";

const cache = {};

export default async function getMemberList(projectId) {
    if (cache[projectId]) {
        return cache[projectId];
    }

    cache[projectId] = (await axios.get(
        process.env.NODE_ENV === 'development' ?
            `${process.env.REACT_APP_DEVHOST}/project/${projectId}/members` :
            `/project/${projectId}/members`
    )).data;

    return cache[projectId];
}
