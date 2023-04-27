package com.cmpt373sedna.gitlabanalyzer.controllers;



import com.cmpt373sedna.gitlabanalyzer.model.*;
import lombok.Getter;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.List;
import static java.util.stream.Collectors.toList;

public class ProjectController {

    private @Getter int projectId;

    final private @Getter String projectName;

    private @Getter String projectLastSync;

    private Extractor extractor;

    private ConfigEntity config;

    private int[] weights;

    private int totalComments;

    private @Getter
    List<MergeRequestEntity> mergeRequestEntities;

    private @Getter List<IssueEntity> issuesEntities;

    private @Getter List<CommentEntity> comments;

    private @Getter List<CommitEntity> commitEntities;

    private @Getter List<String> members;

    private @Getter List<String> languages;

    public ProjectController(Extractor extractor, ConfigEntity configEntity, ProjectEntity projectEntity) {
        this.extractor = extractor;
        this.config = configEntity;

        this.projectId = projectEntity.getRepoId();
        this.projectName = projectEntity.getRepoName();
        this.projectLastSync = projectEntity.getLastSync();

        this.weights = new int[]{1, 1, 1, 1};
    }

    public ProjectController load() {
        this.mergeRequestEntities = this.getAndParseMergeRequests();
        this.issuesEntities = this.getAndParseIssues();
        this.members = this.extractor.getRepoMembers(this.config, this.projectId);
        this.comments = this.getAndParseComments();
        this.commitEntities = this.getAndParseCommits();
        this.languages = this.getAndParseProjectLanguages();

        return this;
    }

    private List<IssueEntity> getAndParseIssues() {
        List<JSONObject> issues = this.extractor.getIssues(this.config, this.projectId, this.projectLastSync);
        return issues.stream().map(IssueEntity::fromGitlabJSON).collect(toList());
    }
    private List<CommitEntity> getAndParseCommits() {
        List<JSONObject> commits = this.extractor.getCommits(this.config, this.projectId, this.projectLastSync);
        commits.forEach(commit -> commit.put("project_id", this.projectId));
        return commits.stream().map(CommitEntity::fromGitlabJSON).collect(toList());
    }

    private List<MergeRequestEntity> getAndParseMergeRequests() {
        List<JSONObject> mergeRequests = extractor.getMergeRequests(this.config, this.projectId, this.projectLastSync);
        return mergeRequests.stream().map(MergeRequestEntity::fromGitlabJSON).collect(toList());
    }

    private List<CommentEntity> getAndParseComments() {
        List<JSONObject> comments = new ArrayList<>();
        for(IssueEntity issue : this.issuesEntities) {
            List<JSONObject> issueComments = this.extractor.getComments(this.config, this.projectId,
                                            "issues/" + issue.getIssueIid(), this.projectLastSync);
            issueComments = issueComments.stream().peek(comment -> {
                comment.put("created_by", issue.getAssignee());
                comment.put("MRorIssueId", issue.getIssueIid());
                comment.put("MRorIssueName", issue.getIssueName());
            }).collect(toList());
            comments.addAll(issueComments);
        }

        for(MergeRequestEntity mr : this.mergeRequestEntities) {
            List<JSONObject> mrComments = this.extractor.getComments(this.config, this.projectId,
                                        "merge_requests/" + mr.getIid(), this.projectLastSync);
            mrComments = mrComments.stream().peek(comment -> {
                comment.put("created_by", mr.getAuthor());
                comment.put("MRorIssueId", mr.getIid());
                comment.put("MRorIssueName", mr.getMergeRequestName());
            }).collect(toList());
            comments.addAll(mrComments);
        }
        comments.forEach(comment -> comment.put("project_id", this.projectId));
        return comments.stream().map(CommentEntity::fromGitlabJSON).collect(toList());
    }

    private List<String> getAndParseProjectLanguages() {
        JSONObject langsJSON = this.extractor.getRepoFileTypes(this.config, this.projectId);
        List<String> langs = new ArrayList<>();
        langsJSON.keys().forEachRemaining(langs::add);

        return langs;
    }

    public int getNumCommits() {
        return this.commitEntities.size();
    }

    public int getNumMR() {
        return this.mergeRequestEntities.size();
    }

    public int getNumComments() {
        return this.comments.size();
    }

    public int getNumIssues() {
        return this.issuesEntities.size();
    }
}
