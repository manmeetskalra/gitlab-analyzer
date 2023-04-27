package com.cmpt373sedna.gitlabanalyzer.controllers;

import com.cmpt373sedna.gitlabanalyzer.model.ConfigEntity;
import com.cmpt373sedna.gitlabanalyzer.model.ProjectEntity;
import com.cmpt373sedna.gitlabanalyzer.repository.*;
import lombok.Getter;
import lombok.Setter;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Component
public class ProjectManager {
    private final @Getter List<ProjectController> allProjects;
    private final Extractor extractor;
    private @Setter String projectToken;
    private List<JSONObject> projectList;
    private @Setter ConfigEntity config;

    @Autowired
    private IssueEntityRepository issueRepository;

    @Autowired
    private CommitEntityRepository commitRepository;

    @Autowired
    private MergeRequestEntityRepository mergeRequestEntityRepository;

    public ProjectManager() {
        this.extractor = new Extractor();
        this.allProjects = new ArrayList<>();
    }

    public void addProjects(List<String> urls) {
        for (String url: urls) {
            getOrAddProject(url);
        }
    }

    @Deprecated
    public ProjectController getOrAddProject(String url) {
        int rootUrlIndex = url.indexOf('/', url.startsWith("https://") ? 8 : 7);
        String baseUrl = url.substring(0, rootUrlIndex+1);
        String projectId = url.substring(rootUrlIndex+1);
        projectId = URLEncoder.encode(projectId, StandardCharsets.UTF_8);

        ConfigEntity config = ConfigEntity.builder()
                .token(this.projectToken)
                .url(baseUrl)
                .build();

        JSONObject projectJSON = this.extractor.getProject(config, projectId);
        ProjectEntity projectEntity = ProjectEntity.fromGitlabJSON(projectJSON);


        ProjectController p = new ProjectController(this.extractor, config, projectEntity);
        p.load();
        allProjects.add(p);
        return p;
    }

    public ProjectController getOrAddProject(ConfigEntity config, ProjectEntity project) {
        Optional<ProjectController> existing = this.allProjects.stream()
                .filter(controller -> controller.getProjectId() == project.getRepoId())
                .findFirst();

        if (existing.isPresent()) {
            return existing.get();
        }

        ProjectController projectController = new ProjectController(this.extractor, config, project);
        allProjects.add(projectController);
        return projectController;
    }

    public ProjectController loadProject(ConfigEntity config, ProjectEntity project) {
        ProjectController projectController = getOrAddProject(config, project);

        projectController.load();

        this.commitRepository.saveAll(projectController.getCommitEntities());
        this.issueRepository.saveAll(projectController.getIssuesEntities());
        this.mergeRequestEntityRepository.saveAll(projectController.getMergeRequestEntities());

        return projectController;
    }

    public Optional<ProjectController> findProject(int projectId) {
        return this.allProjects.stream()
                .filter(project -> project.getProjectId() == projectId)
                .findFirst();
    }

    public List<String> getProjectListInfo() {
        List<String> temp = this.extractor.getBasicProjectInfo(this.config);
        return temp;
    }
}
