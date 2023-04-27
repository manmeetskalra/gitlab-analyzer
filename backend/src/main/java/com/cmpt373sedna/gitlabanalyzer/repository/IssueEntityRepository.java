package com.cmpt373sedna.gitlabanalyzer.repository;

import com.cmpt373sedna.gitlabanalyzer.model.IssueEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface IssueEntityRepository extends CrudRepository<IssueEntity, Integer> {
    List<IssueEntity> findAllByAssignee(String assignee);
    List<IssueEntity> findAllByProjectId(int projectId);
    List<IssueEntity> findAllByProjectIdAndAssignee(int projectId, String assignee);
}