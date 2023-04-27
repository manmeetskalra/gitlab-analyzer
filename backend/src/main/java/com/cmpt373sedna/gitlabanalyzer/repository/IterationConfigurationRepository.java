package com.cmpt373sedna.gitlabanalyzer.repository;

import com.cmpt373sedna.gitlabanalyzer.model.IterationConfigurationEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface IterationConfigurationRepository extends CrudRepository<IterationConfigurationEntity, Integer> {
    @Override
    Optional<IterationConfigurationEntity> findById(Integer id);

    Iterable<IterationConfigurationEntity> findAllByToken(String token);
}
