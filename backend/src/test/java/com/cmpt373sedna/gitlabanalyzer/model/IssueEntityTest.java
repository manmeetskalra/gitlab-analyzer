package com.cmpt373sedna.gitlabanalyzer.model;

import org.json.JSONObject;
import org.junit.jupiter.api.Test;

import java.io.IOException;
import java.time.Instant;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class IssueEntityTest {

    @Test
    void fromGitlabJSON_parses_open_Issue_correctly() throws IOException {
        IssueEntity expected = IssueEntity.builder()
                .issueId(12)
                .issueIid(12)
                .projectId(2)
                .issueName("Create Issues Class")
                .issueDescription("Created a new class for issues")
                .assignee("Dr. Luella Kovacek")
                .author("root")
                .openedDate(Instant.parse("2021-01-30T03:29:41.831Z"))
                .closedDate(null)
                .build();

        String jsonString = new String(this.getClass().getResourceAsStream("/json/gitlabApi/singleOpenIssue.json").readAllBytes());
        JSONObject json = new JSONObject(jsonString);
        IssueEntity actual = IssueEntity.fromGitlabJSON(json);

        assertEquals(expected, actual);

    }

    @Test
    void fromGitlabJSON_parses_closed_Issue_correctly() throws IOException {
        IssueEntity expected = IssueEntity.builder()
                .issueId(41)
                .issueIid(1)
                .projectId(4)
                .issueName("Ut commodi ullam eos dolores perferendis nihil sunt.")
                .issueDescription("Omnis vero earum sunt corporis dolor et placeat.")
                .assignee("Dr. Luella Kovacek")
                .author("root")
                .openedDate(Instant.parse("2016-01-04T15:31:46.176Z"))
                .closedDate(Instant.parse("2016-01-04T15:31:46.176Z"))
                .build();

        String jsonString = new String(this.getClass().getResourceAsStream("/json/gitlabApi/singleClosedIssue.json").readAllBytes());
        JSONObject json = new JSONObject(jsonString);
        IssueEntity actual = IssueEntity.fromGitlabJSON(json);

        assertEquals(expected, actual);

    }
}
