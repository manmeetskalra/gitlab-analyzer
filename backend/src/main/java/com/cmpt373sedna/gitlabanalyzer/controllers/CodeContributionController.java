package com.cmpt373sedna.gitlabanalyzer.controllers;

import com.cmpt373sedna.gitlabanalyzer.model.ConfigEntity;
import com.cmpt373sedna.gitlabanalyzer.model.ProjectEntity;
import org.json.JSONObject;

import java.util.List;

public class CodeContributionController {
    final private ConfigEntity config;

    final private ProjectEntity projectEntity;

    final private int contributionID;

    private int[] weights;

    final private Extractor extractor;

    private List<JSONObject> mergeRequests;

    private List<JSONObject> issues;

    private List<JSONObject> commits;

    private List<String> members;

    public CodeContributionController(ConfigEntity config, ProjectEntity projectEntity) {
        this.config = config;
        this.projectEntity = projectEntity;
        this.extractor = new Extractor();

        this.contributionID = projectEntity.getRepoId();
        this.mergeRequests =  this.extractor.getMergeRequests(config, projectEntity.getRepoId(), projectEntity.getLastSync());
        this.issues = this.extractor.getIssues(config, projectEntity.getRepoId(), projectEntity.getLastSync());
        this.commits = this.extractor.getCommits(config, projectEntity.getRepoId(), projectEntity.getLastSync());

        this.weights = new int[]{1, 1, 1};
    }

    public int getNumCommits(){
        return this.commits.size();
    }
    public int getNumMR() {
        return this.mergeRequests.size();
    }

    public int getNumComments() {
        int sum = 0;

        for(JSONObject issue : this.issues) {
            List<JSONObject> issueComments = this.extractor.getComments(this.config, this.projectEntity.getRepoId(),
                                        "issues/" +  issue.getInt("id"), this.projectEntity.getLastSync());
            sum += issueComments.size();
        }

        for(JSONObject mr : this.mergeRequests) {
            int mrId = (Integer) mr.get("iid");
            List<JSONObject> mrComments = this.extractor.getComments(this.config, this.projectEntity.getRepoId(),
                                                "merge_requests/" + mrId, this.projectEntity.getLastSync());
            sum += mrComments.size();
        }

        return sum;
    }
}


