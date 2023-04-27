package com.cmpt373sedna.gitlabanalyzer.repository;

import com.cmpt373sedna.gitlabanalyzer.model.WeightConfigurationEntity;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface WeightConfigurationEntityRepository extends CrudRepository<WeightConfigurationEntity, Integer> {
    @Override
    Optional<WeightConfigurationEntity> findById(Integer id);

    Iterable<WeightConfigurationEntity> findAllByToken(String token);
}
