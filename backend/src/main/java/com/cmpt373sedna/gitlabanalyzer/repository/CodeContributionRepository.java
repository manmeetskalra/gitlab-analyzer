package com.cmpt373sedna.gitlabanalyzer.repository;

import com.cmpt373sedna.gitlabanalyzer.model.CodeContributionHistory;
import org.springframework.data.repository.CrudRepository;

public interface CodeContributionRepository extends CrudRepository<CodeContributionHistory, Integer> {
}
