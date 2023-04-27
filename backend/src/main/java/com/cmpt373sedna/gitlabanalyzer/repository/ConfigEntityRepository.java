package com.cmpt373sedna.gitlabanalyzer.repository;

import com.cmpt373sedna.gitlabanalyzer.model.ConfigEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ConfigEntityRepository extends CrudRepository<ConfigEntity, String> {
    Optional<ConfigEntity> findByUrl(String url);
    Optional<ConfigEntity> findByToken(String token);
}