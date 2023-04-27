package com.cmpt373sedna.gitlabanalyzer.model;

import com.cmpt373sedna.gitlabanalyzer.repository.IterationConfigurationRepository;
import com.cmpt373sedna.gitlabanalyzer.repository.WeightConfigurationEntityRepository;
import org.json.JSONObject;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.io.IOException;
import java.time.Instant;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

@ExtendWith(SpringExtension.class)
public class ConfigurationEntityTest {

    IterationConfigurationEntity expectedIteration;
    WeightConfigurationEntity expectedConfiguration;
    IterationConfigurationEntity updatedIteration;
    WeightConfigurationEntity updatedConfiguration;

    IterationConfigurationEntity failedIteration = IterationConfigurationEntity.builder()
            .token("failed")
            .iterationName("test_failed")
            .startDate(Instant.now())
            .endDate(Instant.now())
            .build();

    JSONObject failedConfig = new JSONObject();
    WeightConfigurationEntity failedConfiguration = WeightConfigurationEntity.builder()
            .token("test1")
            .configuration(failedConfig.toString())
            .build();

    @Mock
    IterationConfigurationRepository iterationConfigurationRepository;

    @Mock
    WeightConfigurationEntityRepository weightConfigurationEntityRepository;

    @BeforeEach
    void setup() {
        JSONObject testConfig = new JSONObject();
        testConfig.put("Javascript", 1.2);
        testConfig.put("CSS", 0.4);

        JSONObject updatedConfig = new JSONObject();
        updatedConfig.put("Javascript", 2.2);
        updatedConfig.put("CSS", 2.4);
        updatedConfig.put("deleted", 2.4);

        JSONObject failedConfig = new JSONObject();
        failedConfig.put("PHP", 0.0);

        expectedIteration = IterationConfigurationEntity.builder()
                .token("test1")
                .iterationName("test_iteration")
                .startDate(Instant.parse("2013-10-02T09:22:45Z"))
                .endDate(Instant.parse("2013-10-02T10:22:45Z"))
                .build();

        expectedConfiguration = WeightConfigurationEntity.builder()
                .token("test1")
                .configuration(testConfig.toString())
                .build();

        updatedIteration = IterationConfigurationEntity.builder()
                .token("test1")
                .iterationName("test_iteration")
                .startDate(Instant.parse("2013-10-02T09:22:45Z"))
                .endDate(Instant.parse("2013-12-02T10:22:45Z"))
                .build();

        updatedConfiguration = WeightConfigurationEntity.builder()
                .token("test1")
                .configuration(updatedConfig.toString())
                .build();

        when(iterationConfigurationRepository.findById(1))
                .thenReturn(Optional.ofNullable(expectedIteration));

        when(weightConfigurationEntityRepository.findById(1))
                .thenReturn(Optional.ofNullable(expectedConfiguration));

    }

    @Test
    void fromGitlabJSON_parses_ConfigEntity_correctly() throws IOException {

        String weightJson = new String(this.getClass().getResourceAsStream("/json/gitlabApi/singleWeightConfigurationEntity.json").readAllBytes());
        String iterationJson = new String(this.getClass().getResourceAsStream("/json/gitlabApi/singleIterationConfiguration.json").readAllBytes());

        JSONObject iterationObj = new JSONObject(iterationJson);
        JSONObject weightObj = new JSONObject(weightJson);

        IterationConfigurationEntity actualIteration = IterationConfigurationEntity.fromGitlabJSON(iterationObj);
        WeightConfigurationEntity actualConfiguration = WeightConfigurationEntity.fromGitlabJSON(weightObj);

        assertEquals(expectedConfiguration, actualConfiguration);
        assertEquals(expectedIteration, actualIteration);
    }

    @Test
    void updateConfigurations() {

        this.iterationConfigurationRepository.save(expectedIteration);
        this.weightConfigurationEntityRepository.save(expectedConfiguration);

        Optional<IterationConfigurationEntity> iteration =  this.iterationConfigurationRepository.findById(1);
        Optional<WeightConfigurationEntity> configuration =  this.weightConfigurationEntityRepository.findById(1);

        IterationConfigurationEntity actualIteration = iteration.orElse(failedIteration);
        WeightConfigurationEntity actualConfiguration = configuration.orElse(failedConfiguration);

        JSONObject updatedConfig = new JSONObject();
        updatedConfig.put("Javascript", 2.2);
        updatedConfig.put("CSS", 2.4);
        updatedConfig.put("deleted", 2.4);

        actualIteration.setEndDate(Instant.parse("2013-12-02T10:22:45Z"));
        actualConfiguration.setConfiguration(updatedConfig.toString());

        assertEquals(updatedConfiguration, actualConfiguration);
        assertEquals(updatedIteration, actualIteration);
    }
}
