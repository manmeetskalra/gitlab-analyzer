package com.cmpt373sedna.gitlabanalyzer.model;

import org.json.JSONObject;
import org.junit.jupiter.api.Test;

import java.io.IOException;
import java.time.Instant;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class CommentEntityTest {
    @Test
    void fromGitlabJSON_parses_open_Comment_correctly() throws IOException {
        CommentEntity expected = CommentEntity.builder()
                .commentId(302)
                .MRorIssueId(92)
                .projectId(2)
                .MRorIssueName("test1")
                .createdBy("admin")
                .commenter("pipin")
                .commentType("Issue")
                .wordCount(1)
                .commentText("closed")
                .commentDate(Instant.parse("2013-10-02T09:22:45Z"))
                .build();

        String jsonString = new String(this.getClass().getResourceAsStream("/json/gitlabApi/singleComment.json").readAllBytes());
        JSONObject json = new JSONObject(jsonString);
        CommentEntity actual = CommentEntity.fromGitlabJSON(json);

        assertEquals(expected, actual);
    }
}
