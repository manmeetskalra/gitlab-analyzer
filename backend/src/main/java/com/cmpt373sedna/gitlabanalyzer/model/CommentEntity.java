package com.cmpt373sedna.gitlabanalyzer.model;
import com.sun.istack.Nullable;
import lombok.*;
import org.json.JSONObject;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import java.time.Instant;


@Data
@Builder
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class CommentEntity {
    private @Id int commentId;
    private String commentType;
    private int projectId;
    private int MRorIssueId;
    private int wordCount;
    private String createdBy;
    @Column(columnDefinition="text")
    private @Nullable String commentText;
    private @Nullable String commenter;
    private @Nullable Instant commentDate;
    private @Nullable String MRorIssueName;


    public static CommentEntity fromGitlabJSON(JSONObject json) {

        return CommentEntity.builder()
                .commentId(json.getInt("id"))
                .MRorIssueId(json.getInt("MRorIssueId"))
                .projectId(json.getInt("project_id"))
                .createdBy(json.getString("created_by"))
                .MRorIssueName(json.getString("MRorIssueName"))
                .commenter(json.getJSONObject("author").getString("username"))
                .commentType(json.getString("noteable_type"))
                .wordCount(getWordCount(json.getString("body")))
                .commentText(json.getString("body"))
                .commentDate(Instant.parse(json.getString("created_at")))
                .build();
    }

    private static int getWordCount(String comment) {
        String trimmedComment = comment.trim();
        if(trimmedComment.isEmpty()) {
            return 0;
        }
        return trimmedComment.split("\\s+").length;
    }

}
