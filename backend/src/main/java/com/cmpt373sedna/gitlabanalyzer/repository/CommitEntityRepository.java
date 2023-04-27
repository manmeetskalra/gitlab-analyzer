package com.cmpt373sedna.gitlabanalyzer.repository;

import com.cmpt373sedna.gitlabanalyzer.model.CommitEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import javax.persistence.Table;
import java.util.List;

@Repository
public interface CommitEntityRepository extends CrudRepository<CommitEntity, String> {
    List<CommitEntity> findAllByProjectId(int id);
    List<CommitEntity> findAllByProjectIdAndAuthor(int id, String author);

}
