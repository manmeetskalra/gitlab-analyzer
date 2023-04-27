package com.cmpt373sedna.gitlabanalyzer.controllers;

import com.cmpt373sedna.gitlabanalyzer.model.CommentEntity;
import com.cmpt373sedna.gitlabanalyzer.model.CommitEntity;
import com.cmpt373sedna.gitlabanalyzer.model.IssueEntity;
import com.cmpt373sedna.gitlabanalyzer.model.MergeRequestEntity;
import com.cmpt373sedna.gitlabanalyzer.repository.*;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.web.server.ResponseStatusException;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static java.util.Arrays.asList;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

@ExtendWith(SpringExtension.class)
class ProjectRESTControllerTest {
    @Mock
    private ProjectManager projectManager;

    @Mock
    private ProjectController projectController;

    @Mock
    private IssueEntityRepository issueRepository;

    @Mock
    private CommitEntityRepository commitRepository;

    @Mock
    private CommentEntityRepository commentEntityRepository;

    @Mock
    private MergeRequestEntityRepository mergeRequestEntityRepository;

    @Mock
    private ProjectEntityRepository projectEntityRepository;

    @InjectMocks
    private ProjectRESTController projectRESTController;

    @Test
    void load_throws_on_missing_project() {
        when(projectManager.findProject(5)).thenReturn(Optional.empty());
        assertThrows(ResponseStatusException.class, () -> projectRESTController.load(5));
    }

    @Test
    void load_saves_data_to_db() {
        when(projectManager.findProject(5)).thenReturn(Optional.of(projectController));
        when(projectController.load()).thenReturn(projectController);
        when(projectController.getCommitEntities()).thenReturn(Collections.singletonList(CommitEntity.builder().build()));
        when(projectController.getIssuesEntities()).thenReturn(Collections.singletonList(IssueEntity.builder().build()));
        when(projectController.getComments()).thenReturn(Collections.singletonList(CommentEntity.builder().build()));
        when(projectController.getMergeRequestEntities()).thenReturn(Collections.singletonList(MergeRequestEntity.builder().build()));

        projectRESTController.load(5);

        verify(issueRepository, times(1)).saveAll(notNull());
        verify(commitRepository, times(1)).saveAll(notNull());
        verify(commentEntityRepository, times(1)).saveAll(notNull());
        verify(mergeRequestEntityRepository, times(1)).saveAll(notNull());
    }

    @Test
    void getProjectMembers_throws_on_missing_project() {
        when(projectManager.findProject(5)).thenReturn(Optional.empty());
        assertThrows(ResponseStatusException.class, () -> projectRESTController.getProjectMembers(5));
    }

    @Test
    void getProjectMembers_returns_project_members() {
        List<String> expected = asList("member1", "member2");
        when(projectManager.findProject(5)).thenReturn(Optional.of(projectController));
        when(projectController.getMembers()).thenReturn(expected);

        List<String> result = projectRESTController.getProjectMembers(5);
        assertEquals(expected, result);
    }
}