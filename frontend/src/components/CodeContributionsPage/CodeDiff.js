import React from "react";
import { parseDiff, Diff, Hunk, Decoration } from "react-diff-view";
import "react-diff-view/style/index.css";
import '../../style/DiffViewStyle.css';


const CodeDiff = (diffText) => {
  let item2 = diffText["codeDiff"];
  let newData = JSON.parse(item2);
  const data  = newData["diff"];
  const new_path = newData["new_path"];
  const old_path = newData["old_path"];
  const diffText1 = 'diff --git a/' 
  + old_path 
  + ` b/` 
  + new_path 
  + '\n' 
  + `index 1111111..2222222 100644` 
  + '\n' 
  + `--- a/` 
  + old_path 
  + '\n' 
  + `+++ b/` 
  + new_path;
  const newDiffText = diffText1 + '\n' + data;
  const files = parseDiff(newDiffText);


  const renderFile = ({
    oldPath,
    newPath,
    oldRevision,
    newRevision,
    type,
    hunks
  }) => (
    <div key={oldRevision + "-" + newRevision} className="file-diff">
      <header className="diff-header">
        {oldPath === newPath ? oldPath : `${oldPath} -> ${newPath}`}
      </header>
      <Diff viewType="split" diffType={type} hunks={hunks}>
        {(hunks) =>
          hunks.map((hunk) => [
            <Decoration key={"deco-" + hunk.content}>
              <div className="hunk-header">{hunk.content}</div>
            </Decoration>,
            <Hunk key={hunk.content} hunk={hunk} />
          ])
        }
      </Diff>
    </div>
  );
  return <div>{files.map(renderFile)}</div>;
};

export default CodeDiff;
