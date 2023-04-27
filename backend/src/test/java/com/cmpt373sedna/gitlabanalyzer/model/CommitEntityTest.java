package com.cmpt373sedna.gitlabanalyzer.model;

import org.json.JSONObject;
import org.junit.jupiter.api.Test;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.time.Instant;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class CommitEntityTest {

    @Test
    void fromGitlabJSON_parses_Commit_correctly() {
        List<String> list = new ArrayList<>();
        JSONObject commitDiffs = new JSONObject();
        commitDiffs.put("diff","@@ -1,5 +1,8 @@\n # See https://help.github.com/articles/ignoring-files/ for more about ignoring files.\n \n+# package-lock\n+package-lock.json\n+\n # dependencies\n /node_modules\n /.pnp\n");
        commitDiffs.put("new_path","frontend.gitignore");
        commitDiffs.put("old_path","frontend.gitignore");
        commitDiffs.put("renamed_file", false);
        commitDiffs.put("score", 0);
        list.add(commitDiffs.toString());

        CommitEntity expected = CommitEntity.builder()
                .commitId("ed899a2f4b50b4370feeea94676502b42383c746")
                .projectId(3)
                .commitName("Replace sanitize with escape once")
                .author("Example User")
                .commitDate(Instant.parse("2012-09-20T11:50:22+03:00"))
                .url("https://gitlab.example.com/thedude/gitlab-foss/-/commit/ed899a2f4b50b4370feeea94676502b42383c746")
                .diffs(list)
                .build();

        String jsonString = "";
        try {
            jsonString = new String(this.getClass().getResourceAsStream("/json/gitlabApi/singleCommit.json").readAllBytes());
        } catch (IOException ex) {
            ex.printStackTrace();
        }
        JSONObject json = new JSONObject(jsonString);
        CommitEntity actual = CommitEntity.fromGitlabJSON(json);

        assertEquals(expected, actual);

    }
}
