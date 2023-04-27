package com.cmpt373sedna.gitlabanalyzer.model;

import org.json.JSONObject;
import org.junit.jupiter.api.Test;

import java.io.IOException;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

class MergeRequestEntityTest {

    @Test
    void fromGitlabJSON_parses_open_MR_correctly() throws IOException {
        List<String> list = new ArrayList<>();
        JSONObject Diffs = new JSONObject();
        Diffs.put("diff","@@ -1,5 +1,8 @@\n # See https://help.github.com/articles/ignoring-files/ for more about ignoring files.\n \n+# package-lock\n+package-lock.json\n+\n # dependencies\n /node_modules\n /.pnp\n");
        Diffs.put("new_path","frontend.gitignore");
        Diffs.put("old_path","frontend.gitignore");
        Diffs.put("renamed_file", false);
        list.add(Diffs.toString());
        List<String> commitIds = new ArrayList<>();
        commitIds.add("90e99af00139f751c7caf4a9bf1058e0fd75bc38");
        commitIds.add("9ef5d47243b7dc4c1d6ff582b1eab93f10020959");

        MergeRequestEntity expected = MergeRequestEntity.builder()
                .id(1)
                .iid(1)
                .projectId(3)
                .status("opened")
                .author("admin")
                .description("fixed login page css paddings")
                .mergeRequestName("test1")
                .createdAt(Instant.parse("2017-04-29T08:46:00Z"))
                .commitIds(commitIds)
                .mrDiffs(list)
                .mergedAt(null)
                .url("http://gitlab.example.com/my-group/my-project/merge_requests/1")
                .build();

        String jsonString = new String(this.getClass().getResourceAsStream("/json/gitlabApi/singleOpenMR.json").readAllBytes());
        JSONObject json = new JSONObject(jsonString);
        MergeRequestEntity actual = MergeRequestEntity.fromGitlabJSON(json);

        assertEquals(expected, actual);
    }

    @Test
    void fromGitlabJSON_parses_merged_MR_correctly() throws IOException {
        List<String> list = new ArrayList<>();
        JSONObject Diffs = new JSONObject();
        Diffs.put("diff","@@ -1,5 +1,8 @@\n # See https://help.github.com/articles/ignoring-files/ for more about ignoring files.\n \n+# package-lock\n+package-lock.json\n+\n # dependencies\n /node_modules\n /.pnp\n");
        Diffs.put("new_path","frontend.gitignore");
        Diffs.put("old_path","frontend.gitignore");
        Diffs.put("renamed_file", false);
        list.add(Diffs.toString());
        List<String> commitIds = new ArrayList<>();
        commitIds.add("90e99af00139f751c7caf4a9bf1058e0fd75bc38");
        commitIds.add("9ef5d47243b7dc4c1d6ff582b1eab93f10020959");

        MergeRequestEntity expected = MergeRequestEntity.builder()
                .id(1)
                .iid(1)
                .projectId(3)
                .status("merged")
                .description("fixed login page css paddings")
                .author("admin")
                .mergeRequestName("test1")
                .createdAt(Instant.parse("2017-04-29T08:46:00Z"))
                .commitIds(commitIds)
                .mrDiffs(list)
                .mergedAt(Instant.parse("2018-09-07T11:16:17.520Z"))
                .url("http://gitlab.example.com/my-group/my-project/merge_requests/1")
                .build();

        String jsonString = new String(this.getClass().getResourceAsStream("/json/gitlabApi/singleMergedMR.json").readAllBytes());
        JSONObject json = new JSONObject(jsonString);
        MergeRequestEntity actual = MergeRequestEntity.fromGitlabJSON(json);

        assertEquals(expected, actual);
    }
}