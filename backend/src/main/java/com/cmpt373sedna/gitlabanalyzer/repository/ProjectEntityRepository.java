package com.cmpt373sedna.gitlabanalyzer.repository;

import com.cmpt373sedna.gitlabanalyzer.model.ProjectEntity;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
public interface ProjectEntityRepository extends CrudRepository<ProjectEntity, Integer> {
    ProjectEntity findProjectEntityByRepoId(int id);

    @Transactional
    @Modifying(clearAutomatically = true)
    @Query(value="UPDATE project_entity " +
                 "SET last_Sync = :lastSync " +
                 "WHERE repo_Id = :id", nativeQuery = true)
    void updateLastSync(int id, String lastSync);
}
