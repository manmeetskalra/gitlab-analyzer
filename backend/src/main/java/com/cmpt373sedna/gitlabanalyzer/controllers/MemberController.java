package com.cmpt373sedna.gitlabanalyzer.controllers;

import com.cmpt373sedna.gitlabanalyzer.model.*;
import com.cmpt373sedna.gitlabanalyzer.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/project/{projectId}/member")
public class MemberController {

    @Autowired
    private CommentEntityRepository commentEntityRepository;

    @Autowired
    private CommitEntityRepository commitRepository;

    @Autowired
    private IssueEntityRepository issueRepository;


    @Autowired
    private MergeRequestEntityRepository mergeRequestRepository;


    @GetMapping("/{memberName}/commits")
    Iterable<CommitEntity> getMemberCommits(@PathVariable(value = "projectId") int projectId, @PathVariable(value = "memberName") String author) {
        return this.commitRepository.findAllByProjectIdAndAuthor(projectId, author);
    }

    @GetMapping("/{memberName}/merge_requests")
    Iterable<MergeRequestEntity> getMemberMergeRequest(@PathVariable(value = "projectId") int projectId, @PathVariable(value = "memberName") String author) {
        return this.mergeRequestRepository.findAllByProjectIdAndAuthor(projectId, author);
    }

    @GetMapping("/{memberName}/comments")
    Iterable<CommentEntity> getMemberComments(@PathVariable(value = "projectId") int projectId, @PathVariable(value = "memberName") String author) {
        return this.commentEntityRepository.findAllByProjectIdAndCommenterOrderByCommentDateDesc(projectId, author);
    }

    @GetMapping("/{memberName}/issues")
    Iterable<IssueEntity> getMemberIssues(@PathVariable(value = "projectId") int projectId, @PathVariable(value = "memberName") String assignee) {
        return this.issueRepository.findAllByProjectIdAndAssignee(projectId, assignee);
    }
}
