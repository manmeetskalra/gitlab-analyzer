package com.cmpt373sedna.gitlabanalyzer.controllers;

import com.cmpt373sedna.gitlabanalyzer.model.ConfigEntity;
import com.cmpt373sedna.gitlabanalyzer.model.ProjectEntity;
import com.cmpt373sedna.gitlabanalyzer.repository.ConfigEntityRepository;
import com.cmpt373sedna.gitlabanalyzer.repository.ProjectEntityRepository;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/config")
public class ConfigRESTController {
    @Autowired
    private ConfigEntityRepository configEntityRepository;

    @Autowired
    private Extractor extractor;

    @Autowired
    private ProjectManager projectManager;

    @Autowired
    private ProjectEntityRepository projectEntityRepository;

    @PostMapping("/create")
    public ConfigEntity create(@RequestBody ConfigEntity body) {
        projectManager.setConfig(body);
        return this.configEntityRepository.save(body);
    }

    @GetMapping("/all")
    public Iterable<ConfigEntity> getAll() {
        return this.configEntityRepository.findAll();
    }

    @PostMapping("/{token}/load")
    public List<ProjectEntity> loadConfig(@PathVariable(value="token") String token) {
        ConfigEntity config = this.configEntityRepository.findByToken(token).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        List<ProjectEntity> projectsFromGitlab = ProjectEntity.fromGitlabJSONList(this.extractor.getProjects(config));
        Iterable<ProjectEntity> projectsInDb = projectEntityRepository.findAll();
        List<ProjectEntity> projectsToSave = new ArrayList<>();
        boolean sameId = false;
        for(ProjectEntity peGL: projectsFromGitlab) {
            for (ProjectEntity peDB : projectsInDb) {
                if (peGL.getRepoId() == peDB.getRepoId()) {
                    sameId = true;
                }
            }
            if (!sameId) {
                projectsToSave.add(peGL);
            }
            sameId = false;
        }

        return projectsToSave.stream()
                .map(project -> this.projectEntityRepository.save(project))
                .peek(project -> this.projectManager.getOrAddProject(config, project))
                .collect(Collectors.toList());
    }
}
