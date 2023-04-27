package com.cmpt373sedna.gitlabanalyzer.controllers;

import com.cmpt373sedna.gitlabanalyzer.model.ConfigEntity;
import com.cmpt373sedna.gitlabanalyzer.model.ProjectEntity;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.net.URI;
import java.util.ArrayList;
import java.util.List;

import static java.util.stream.Collectors.toList;

@Component
public class Extractor {
    private final RestTemplate restTemplate;
    private final String PATH_MERGE_REQUEST = "merge_requests?per_page=100&target_branch=master&updated_after=%s&page=%s";
    private final String PATH_COMMENTS = "/notes?per_page=100&updated_after=%s&page=%s";
    private final String PATH_ISSUES = "issues?per_page=100&updated_after=%s&page=%s";
    private final String PATH_COMMITS = "repository/commits?per_page=100&since=%s&page=%s";
    private final String PATH_PROJECTS = "projects?membership=true&per_page=100&page=";

    public Extractor() {
        this.restTemplate = new RestTemplate();
    }

    public List<JSONObject> getProjects(ConfigEntity config) {
        List<JSONObject> projectsArray = getAPIRequestData(config, PATH_PROJECTS);
        return projectsArray;
    }

    public JSONObject getProject(ConfigEntity config, String projectId) {
        JSONObject projectJSON = getJsonObject(buildUri(config, projectId));
        return projectJSON;
    }

    private List<JSONObject> getAPIRequestData(ConfigEntity config, int projectId, String lastSync, String apiPath) {
        int page = 1;
        List<JSONObject> data = new ArrayList<>();
        String fullPath = String.format(apiPath, lastSync, page);
        List<JSONObject> newData = getJsonObjectsList(buildUri(config, projectId, fullPath));
        while(newData.size() > 0) {
            data.addAll(newData);

            page += 1;
            fullPath = String.format(apiPath, lastSync, page);
            newData = getJsonObjectsList(buildUri(config, projectId, fullPath));
        }
        return data;
    }

    private List<JSONObject> getAPIRequestData(ConfigEntity config, String apiPath) {
        int page = 1;
        List<JSONObject> data = new ArrayList<>();
        String fullPath = apiPath + page;
        List<JSONObject> newData = getJsonObjectsList(buildUriProjects(config,fullPath));
        while(newData.size() > 0) {
            data.addAll(newData);

            page += 1;
            fullPath = apiPath + page;
            newData = getJsonObjectsList(buildUriProjects(config, fullPath));
        }
        return data;
    }

    public List<JSONObject> getMergeRequests(ConfigEntity config, int projectId, String lastSync) {
        List<JSONObject> mr = getAPIRequestData(config, projectId, lastSync, PATH_MERGE_REQUEST);

        for(JSONObject mrs : mr){
            List<JSONObject> l = getJsonObjectsList(buildUri(config, projectId,"merge_requests/" + mrs.getInt("iid") + "/commits"));
            List<String> commits = new ArrayList<>();
            for(JSONObject commit : l){
                commits.add(commit.getString("id"));
            }
            mrs.put("commits",commits);
            List<JSONObject> MRDiffVersions = getJsonObjectsList(buildUri(config,projectId,"merge_requests/" + mrs.getInt("iid") + "/versions"));
            JSONObject j = getJsonObject(buildUri(config,projectId,"merge_requests/" + mrs.getInt("iid") + "/versions/"+MRDiffVersions.get(0).getInt("id")));
            mrs.put("mrDiffs",j.getJSONArray("diffs"));
        }
        return mr;
    }

    public List<JSONObject> getComments(ConfigEntity config, int projectId, String path, String lastSync) {
        List<JSONObject> comments = getAPIRequestData(config, projectId, lastSync, path + PATH_COMMENTS);
        return filterJSONComments(comments);
    }

    public List<JSONObject> getIssues(ConfigEntity config, int projectId, String lastSync) {
        List<JSONObject> issues = getAPIRequestData(config, projectId, lastSync, PATH_ISSUES);
        return issues;
    }

    public List<JSONObject> getCommits(ConfigEntity config, int projectId, String lastSync) {
        List<JSONObject> commits = getAPIRequestData(config, projectId, lastSync, PATH_COMMITS);

        for(int i=0;i<commits.size();i++){
            List<JSONObject> l = getJsonObjectsList(buildUri(config, projectId, "repository/commits/"+ commits.get(i).getString("id") + "/diff"));
            commits.get(i).put("diffs",l);
        }
        return commits;
    }

    public List<String> getRepoMembers(ConfigEntity config, int projectId) {
        List<JSONObject> membersJson = getJsonObjectsList(buildUri(config, projectId, "members"));

        return membersJson.stream()
                .map(obj -> obj.getString("username"))
                .collect(toList());
    }

    public List<String> getBasicProjectInfo(ConfigEntity config) {
        List<JSONObject> projects = getAPIProjectListInfo(config, PATH_PROJECTS);
        List<String> temp = projects.stream()
                .map(obj -> new JSONObject(obj, "id", "name").toString())
                .collect(toList());
        return temp;
    }

    private List<JSONObject> getAPIProjectListInfo(ConfigEntity config, String apiPath) {
        int page = 1;
        List<JSONObject> data = new ArrayList<>();
        List<JSONObject> newData = getJsonObjectsList(buildUriProjectList(config, apiPath + page));
        while(newData.size() > 0) {
            data.addAll(newData);

            page += 1;
            newData = getJsonObjectsList(buildUriProjectList(config, apiPath + page));
        }
        return data;
    }

    public JSONObject getRepoFileTypes(ConfigEntity config, int projectId) {
        String response = restTemplate.getForObject(buildUri(config, projectId, "languages"), String.class);
        return new JSONObject(response);
    }

    private URI buildUri(ConfigEntity config, int projectId, String path) {
        return URI.create(config.getUrl() + "/api/v4/projects/" + projectId + "/" + path + (path.contains("?") ? "&access_token=" : "?access_token=") + config.getToken());
    }

    private URI buildUri(ConfigEntity config, int projectId) {
        return URI.create(config.getUrl() + "/api/v4/projects/" + projectId + "?access_token=" + config.getToken());
    }

    private URI buildUri(ConfigEntity config, String path) {
        URI temp = URI.create(config.getUrl() + "/api/v4/projects/" + path + (path.contains("?") ? "&access_token=" : "?access_token=") + config.getToken());
        return temp;
    }

    private URI buildUriProjects(ConfigEntity config, String path) {
        URI temp = URI.create(config.getUrl() + "/api/v4/" + path + (path.contains("?") ? "&access_token=" : "?access_token=") + config.getToken());
        return temp;
    }

    private URI buildUri(ConfigEntity config) {
        return URI.create(config.getUrl() + "/api/v4/projects?access_token=" + config.getToken());
    }

    private URI buildUriProjectList(ConfigEntity config, String path) {
        URI temp = URI.create(config.getUrl() + "/api/v4/" + path + (path.contains("?") ? "&access_token=" : "?access_token=") + config.getToken());
        return temp;
    }

    private List<JSONObject> getJsonObjectsList(URI url) {
        String response = restTemplate.getForObject(url, String.class);
        JSONArray jsonResponse = new JSONArray(response);

        List<JSONObject> jsonList = new ArrayList<>();
        jsonResponse.forEach(obj -> jsonList.add((JSONObject) obj));
        return jsonList;
    }

    private JSONObject getJsonObject(URI url) {
        String response = restTemplate.getForObject(url, String.class);
        return new JSONObject(response);
    }

    private List<JSONObject> filterJSONComments(List<JSONObject> comments) {
        return comments.stream()
                .filter(comment -> !comment.getBoolean("system"))
                .collect(toList());
    }
}
