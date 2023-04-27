package com.cmpt373sedna.gitlabanalyzer.model;

import com.cmpt373sedna.gitlabanalyzer.controllers.DiffScore;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.lang.Nullable;

import javax.persistence.*;
import java.time.Instant;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import static org.apache.logging.log4j.util.Strings.isNotBlank;

@Data
@Builder
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class MergeRequestEntity {
    private @Id int id;
    private int projectId;
    private int iid;

    private String status; // TODO: Make this an enum

    private Instant createdAt;
    private @Nullable Instant mergedAt;

    private @Nullable String author;
    @Column(columnDefinition = "TEXT")
    private String description;

    private String mergeRequestName;
    @ElementCollection
    private List<String> commitIds;
    @Column(columnDefinition = "TEXT")
    @ElementCollection
    private List<String> mrDiffs;
    private double score;
    private String url;


    public static MergeRequestEntity fromGitlabJSON(JSONObject json) {
        String mergedAt = json.optString("merged_at");
        DiffScore parser = new DiffScore();
        List<String> mrDiffs = getMRDiffs(json);
        return MergeRequestEntity.builder()
                .id(json.getInt("id"))
                .iid(json.getInt("iid"))
                .author(json.getJSONObject("author").getString("username"))
                .projectId(json.getInt("project_id"))
                .status(json.getString("state"))
                .description(json.getString("description"))
                .createdAt(Instant.parse(json.getString("created_at")))
                .mergeRequestName(json.getString("title"))
                .commitIds(getCommitIds(json))
                .mrDiffs(mrDiffs)
                .score(parser.calcScore(mrDiffs))
                .mergedAt(isNotBlank(mergedAt) ? Instant.parse(mergedAt) : null)
                .url(json.getString("web_url"))
                .build();
    }
    public static List<String> getCommitIds(JSONObject json){
        JSONArray j = json.getJSONArray("commits");
        List<String> list = new ArrayList<>();
        for(int i=0;i<j.length();i++){
            list.add(j.getString(i));
        }
        return list;
    }
    public static List<String> getMRDiffs(JSONObject json){
        JSONArray j = json.getJSONArray("mrDiffs");
        List<String> list = new ArrayList<>();
        for(int i=0;i<j.length();i++){
            JSONObject js = j.getJSONObject(i);
            JSONObject MRDiffs = new JSONObject();
            MRDiffs.put("diff",js.getString("diff"));
            MRDiffs.put("new_path",js.getString("new_path"));
            MRDiffs.put("old_path",js.getString("old_path"));
            MRDiffs.put("renamed_file", js.getBoolean("renamed_file"));
            list.add(MRDiffs.toString());
        }
        return list;
    }
}
