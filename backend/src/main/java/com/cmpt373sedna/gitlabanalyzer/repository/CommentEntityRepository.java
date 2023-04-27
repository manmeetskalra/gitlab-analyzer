package com.cmpt373sedna.gitlabanalyzer.repository;

import com.cmpt373sedna.gitlabanalyzer.model.CommentEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentEntityRepository extends CrudRepository<CommentEntity, Long> {
    List<CommentEntity> findAllByProjectIdAndMRorIssueId(int projectId, int commentTypeId);
    List<CommentEntity> findAllByProjectIdAndCommenterOrderByCommentDateDesc(int id, String commenter);
    List<CommentEntity> findAllByProjectId(int id);
}