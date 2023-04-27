package com.cmpt373sedna.gitlabanalyzer.model;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.json.JSONObject;
import org.springframework.lang.Nullable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import java.time.Instant;

@Data
@Builder
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class IssueEntity {
    private @Id int issueId;
    private int issueIid;
    private int projectId;
    private String issueName;
    @Column(columnDefinition = "TEXT")
    private String issueDescription;
    private @Nullable String assignee;
    private @Nullable Instant openedDate;
    private @Nullable Instant closedDate;
    private String author;


    public static IssueEntity fromGitlabJSON(JSONObject json) {
        Object o = json.get("assignee");
        JSONObject assigneeObject = !JSONObject.NULL.equals(o) ? (JSONObject) o : null;
        o = json.get("closed_at");
        String closedDateString = !JSONObject.NULL.equals(o) ? json.getString("created_at") : null;
        o = json.get("description");
        String descriptionString = !JSONObject.NULL.equals(o) ? json.getString("description") : null;
        return IssueEntity.builder()
                .issueId(json.getInt("id"))
                .issueIid(json.getInt("iid"))
                .projectId(json.getInt("project_id"))
                .issueName(json.getString("title"))
                .issueDescription(!JSONObject.NULL.equals(o) ? json.getString("description") : null)
                .assignee(!JSONObject.NULL.equals(assigneeObject) ? assigneeObject.getString("name") : "")
                .openedDate(Instant.parse(json.getString("created_at")))
                .closedDate(closedDateString == null ? null : Instant.parse(closedDateString))
                .author(json.getJSONObject("author").getString("username"))
                .build();
    }
}
