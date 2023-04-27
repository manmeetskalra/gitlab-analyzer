import moment from "moment";

const monthNames = ["January", "February", "March",
  "April", "May", "June", "July", "August", "September",
  "October", "November", "December"];

// Found a solution for grouping by date here:
// https://stackoverflow.com/questions/14446511/most-efficient-method-to-groupby-on-an-array-of-objects
const groupBy = (arr, key) => {
  return arr.reduce((storage, item) => {
    let group = formatGraphDate(item[key]);

    storage[group] = storage[group] || [];

    storage[group].push(item);

    return storage;
  }, {});
};

const fillNulls = (arr) => {
   for(let obj of arr) {
       if(obj["mergedAt"] === null) {
           obj["mergedAt"] = obj["createdAt"];
       }
   }
   return arr;
}

export const getGraphData = (arr, key, score) => {
  let result = [];
  if(key === "mergedAt") {
    arr = fillNulls(arr);
  }
  const groupedData = groupBy(arr, key);
    for(const obj in groupedData) {
      if (groupedData.hasOwnProperty(obj)) {
        let year = obj;
        let comments = 0;
        if (score) {
          for (let i = 0; i < groupedData[year].length; i++) {
            comments = comments + groupedData[year][i].score;
          }
        } else {
          comments = groupedData[year].length;
        }
        result.push({"year": year, "data": comments});
      }
    }

    result = result.sort((obj1, obj2) => {
        const date1 = new Date(obj1.year);
        const date2 = new Date(obj2.year)
        if(date1 > date2) {
            return 1;
        } else {
            return -1;
        }
    });

    return padDates(result);
};

const padDates = (dates) => {
    // Found the solution to use moment to check sequential dates: https://stackoverflow.com/questions/26756997/dump-missing-date-in-data-for-chartjs
    for(let i = 0; i < dates.length - 1; i++) {
        let date1 = moment(dates[i].year, "YYYY-MM-DD");
        let date2 = moment(dates[i+1].year, "YYYY-MM-DD");

        if(!date1.add(1, "days").isSame(date2)) {
            dates.splice(i+1, 0, {"year": date1.format("YYYY-MM-DD"), "data": 0});
        }
    }
    return dates;
}

export const formatGraphDate = (commentDate) => {
    let date = new Date(commentDate);
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let year = date.getFullYear();
    return `${year}-${month}-${day}`;
};

export const formatTableDate = (commentDate, includeTime = true) => {
    let date = new Date(commentDate);
    let month = monthNames[date.getMonth()];
    let day = date.getDate();
    let year = date.getFullYear();
    let time = date.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })

    return `${month} ${day}${includeTime ? `, ${year} @ ${time}` : ''}`;
}

export const formatDate = (dateString) => {
    const date = new Date(dateString);
    const minutes = (date.getMinutes() < 10 ? "0" : "") + date.getMinutes()
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()}:${minutes}` 
}
    
const createMRData = (id, iid, date, name, url, mrScore, totalCommitScore, relatedCommits,diff) => {
  return {id, iid, date, name, url, mrScore, totalCommitScore, relatedCommits,diff};
};

const createCommitData = (id, date, name, url, score,diff) => {
  return {id, date, name, url, score,diff};
};

const createGraphData = (year, MRDaily, CommitDaily) => {
  return { year, MRDaily, CommitDaily };
};

export const makeCodeContributionTableData = (mrData, mrArray, commitData) => {
  for(let mrDataIndex = 0; mrDataIndex < mrData.length; mrDataIndex++) {
    const relatedCommitIds = commitData.filter(val => {
      return mrData[mrDataIndex].commitIds.includes(val.commitId);
    });

    let relatedCommitsArray = [];
    for(let relatedCommitIndex = 0; relatedCommitIndex < relatedCommitIds.length; relatedCommitIndex++){
      const commitDate = new Date(relatedCommitIds[relatedCommitIndex].commitDate);
      const newCommitData = createCommitData(
        relatedCommitIds[relatedCommitIndex].commitId,
        '' + formatTableDate(commitDate),
        relatedCommitIds[relatedCommitIndex].commitName,
        relatedCommitIds[relatedCommitIndex].url,
          relatedCommitIds[relatedCommitIndex].score,
          relatedCommitIds[relatedCommitIndex].diffs);
      relatedCommitsArray.push(newCommitData);
    }

    const mrDate = new Date(mrData[mrDataIndex].mergedAt);
    const newMrData = createMRData(
      mrData[mrDataIndex].id,
      mrData[mrDataIndex].iid,
      '' + formatTableDate(mrDate),
      mrData[mrDataIndex].mergeRequestName,
      mrData[mrDataIndex].url,
      mrData[mrDataIndex].score,
      sumCommitScore(relatedCommitsArray),
      relatedCommitsArray,
      mrData[mrDataIndex].mrDiffs);
    mrArray.push(newMrData);
  }
};

const sumCommitScore = (commits) => {
    return commits.reduce((sum, commit) => sum + commit.score, 0).toFixed(2);
}

export const makeCommitGraphData = (commitDataTypeArray, commitDataOutputArray) => {
  for(let i = 0; i < commitDataTypeArray.length; i++) {
    commitDataOutputArray.push(
      createGraphData(
        commitDataTypeArray[i].year,
        0,
        commitDataTypeArray[i].data));
  }
};

export const makeMRGraphData = (mrDataTypeArray, mrDataOutputArray) => {
  for(let i = 0; i < mrDataTypeArray.length; i++) {
    mrDataOutputArray.push(
      createGraphData(
        mrDataTypeArray[i].year,
        mrDataTypeArray[i].data,
        0));
  }
};

export const mergeGraphData = (commitData, mrData) => {
  let merged;
  for (let i = 0; i < commitData.length; i++) {
    for (let j = 0; j < mrData.length; j++) {
      if (commitData[i].year === mrData[j].year) {
        commitData[i].MRDaily += mrData[j].MRDaily;
        mrData.splice(j, 1);
      }
    }
  }
  merged = [...commitData, ...mrData];
  merged.sort((a, b) => {
    let dateA = new Date(a.year);
    let dateB = new Date(b.year);
    return dateA - dateB;
  });
  return merged;
};


