package com.cmpt373sedna.gitlabanalyzer.model;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import org.json.JSONObject;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.TimeZone;

import java.util.List;

import static java.util.stream.Collectors.toList;

@Entity
@Data
@Builder
public class ProjectEntity {
    private final String UNSYNCED = "1974-01-01T00:00Z";
    private @Getter
    @Id int repoId;
    private @Getter String repoName;
    private @Getter int numCommits;
    private @Getter int numMR;
    private @Getter int numComments;
    private @Getter String lastSync;

    public ProjectEntity(int repoId, String repoName, int numCommits, int numMR, int numComments) {
        this.repoId = repoId;
        this.repoName = repoName;
        this.numCommits = numCommits;
        this.numMR = numMR;
        this.numComments = numComments;
        this.lastSync = UNSYNCED;
    }

    public ProjectEntity() {
        this.repoId = -1;
        this.repoName = "";
        this.numCommits = 0;
        this.numMR = 0;
        this.numComments = 0;
        this.lastSync = UNSYNCED;
    }

    public ProjectEntity(int repoId, String lastSync) {
        this.repoId = repoId;
        this.repoName = "";
        this.numCommits = 0;
        this.numMR = 0;
        this.numComments = 0;
        this.lastSync = lastSync;
    }

    public ProjectEntity(int repoId, String repoName, int numCommits, int numMR, int numComments, String lastSync) {
        this.repoId = repoId;
        this.repoName = repoName;
        this.numCommits = numCommits;
        this.numMR = numMR;
        this.numComments = numComments;
        this.lastSync = UNSYNCED;
    }

    //code from: https://stackoverflow.com/questions/3914404/how-to-get-current-moment-in-iso-8601-format-with-date-hour-and-minute
    static public String getCurrentTime() {
        TimeZone tz = TimeZone.getTimeZone("UTC");
        DateFormat df = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm'Z'"); // Quoted "Z" to indicate UTC, no timezone offset
        df.setTimeZone(tz);
        String nowAsISO = df.format(new Date());
        return nowAsISO;
    }

    public static ProjectEntity fromGitlabJSON(JSONObject json) {
        return ProjectEntity.builder()
                .repoId(json.getInt("id"))
                .repoName(json.getString("name"))
                .build();
    }

    public static List<ProjectEntity> fromGitlabJSONList(List<JSONObject> projectsArray) {
        return projectsArray.stream()
                .map(obj -> ProjectEntity.builder()
                        .repoId(obj.getInt("id"))
                        .repoName(obj.getString("name"))
                        .build())
                .collect(toList());
    }
}
