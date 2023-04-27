package com.cmpt373sedna.gitlabanalyzer.controllers;

import com.cmpt373sedna.gitlabanalyzer.model.*;
import com.cmpt373sedna.gitlabanalyzer.repository.*;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/project")
public class ProjectRESTController {

    @Autowired
    private ProjectManager projectManager;

    @Autowired
    private ProjectEntityRepository projectRepository;

    @Autowired
    private IssueEntityRepository issueRepository;

    @Autowired
    private CommitEntityRepository commitRepository;

    @Autowired
    private CommentEntityRepository commentEntityRepository;

    @Autowired
    private MergeRequestEntityRepository mergeRequestEntityRepository;

    @PostMapping("/create")
    @Deprecated
    void initializeUser(@RequestParam String token) {
        this.projectManager.setProjectToken(token);
    }

    @PostMapping("/add")
    @Deprecated
    void addProject(@RequestParam String url) {
        ProjectController p = this.projectManager.getOrAddProject(url);
        this.projectRepository.save(new ProjectEntity(p.getProjectId(), p.getProjectName(), p.getNumCommits(), p.getNumMR(), p.getNumComments()));
        this.commitRepository.saveAll(p.getCommitEntities());
        this.issueRepository.saveAll(p.getIssuesEntities());
        this.commentEntityRepository.saveAll(p.getComments());
        this.mergeRequestEntityRepository.saveAll(p.getMergeRequestEntities());
    }

    @GetMapping("/all")
    Iterable<ProjectEntity> all() {
        return this.projectRepository.findAll();
    }

    @GetMapping("/all/projectList")
    List<String> getProjectListInfo() {
        List<String> temp = this.projectManager.getProjectListInfo();
        return temp;
    }

    @GetMapping("/{projectId}")
    String getProjectName(@PathVariable(value="projectId") int projectId) {
        return this.projectRepository.findProjectEntityByRepoId(projectId).getRepoName();
    }

    @PostMapping("/{projectId}/load")
    ProjectEntity load(@PathVariable() int projectId) {
        ProjectController projectController = this.projectManager.findProject(projectId)
                .map(ProjectController::load)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        this.commitRepository.saveAll(projectController.getCommitEntities());
        this.issueRepository.saveAll(projectController.getIssuesEntities());
        this.commentEntityRepository.saveAll(projectController.getComments());
        this.mergeRequestEntityRepository.saveAll(projectController.getMergeRequestEntities());
        String syncTime = ProjectEntity.getCurrentTime();
        this.projectRepository.updateLastSync(projectId, syncTime);

        ProjectEntity response = new ProjectEntity(projectId, syncTime);
        return response;
    }


    @GetMapping("/{projectId}/overview")
    List<?> getProjectOverview(@PathVariable(value="projectId") int projectId) {
        return this.mergeRequestEntityRepository.findContributions(projectId);
    }

    @GetMapping("/{projectId}/members")
    List<String> getProjectMembers(@PathVariable(value="projectId") int projectId) {
        ProjectController projectController = this.projectManager.findProject(projectId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        return projectController.getMembers();
    }

    @GetMapping("/{projectId}/merge_requests")
    Iterable<MergeRequestEntity> getProjectMergeRequests(@PathVariable(value="projectId") int projectId) {
        return this.mergeRequestEntityRepository.findAllByProjectId(projectId);
    }

    @GetMapping("/{projectId}/commits")
    Iterable<CommitEntity> getProjectCommits(@PathVariable(value="projectId") int projectId) {
        return this.commitRepository.findAllByProjectId(projectId);
    }

    @GetMapping("/{projectId}/issues")
    Iterable<IssueEntity> getProjectIssues(@PathVariable(value="projectId") int projectId) {
        return this.issueRepository.findAllByProjectId(projectId);
    }

    @GetMapping("/{projectId}/{MRorIssueId}/comments")
    Iterable<CommentEntity> getProjectCommentsForMROrIssue(@PathVariable(value="projectId") int projectId, @PathVariable(value="MRorIssueId") int MRorIssueId) {
        return this.commentEntityRepository.findAllByProjectIdAndMRorIssueId(projectId,MRorIssueId);
    }
    @GetMapping("/{projectId}/comments")
    Iterable<CommentEntity> getProjectComments(@PathVariable(value="projectId") int projectId) {
        return this.commentEntityRepository.findAllByProjectId(projectId);
    }

    @GetMapping("/{projectId}/languages")
    List<String> getProjectLanguages(@PathVariable(value="projectId") int projectId) {
        ProjectController projectController = this.projectManager.findProject(projectId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        return projectController.getLanguages();
    }
}