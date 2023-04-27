package com.cmpt373sedna.gitlabanalyzer.model;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class ProjectEntityTest {

    @Test
    void testConstructor() {
        ProjectEntity projectEntity = new ProjectEntity(1, "repository", 19, 22, 33);

        assertEquals(1, projectEntity.getRepoId());
        assertEquals("repository", projectEntity.getRepoName());
        assertEquals(19, projectEntity.getNumCommits());
        assertEquals(22, projectEntity.getNumMR());
        assertEquals(33, projectEntity.getNumComments());
    }

    @Test
    void testEmptyConstructor() {
        ProjectEntity projectEntity = new ProjectEntity();

        assertEquals(-1, projectEntity.getRepoId());
        assertEquals("", projectEntity.getRepoName());
        assertEquals(0, projectEntity.getNumCommits());
        assertEquals(0, projectEntity.getNumMR());
        assertEquals(0, projectEntity.getNumComments());
    }
}