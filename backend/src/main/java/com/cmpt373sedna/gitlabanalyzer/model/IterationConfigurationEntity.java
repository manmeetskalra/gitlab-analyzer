package com.cmpt373sedna.gitlabanalyzer.model;

import lombok.*;
import org.json.JSONObject;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.time.Instant;

@Data
@Builder
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class IterationConfigurationEntity {
    private @Getter @Id @GeneratedValue int id;
    private @Getter String token;
    private @Getter String iterationName;
    private @Getter Instant startDate;
    private @Getter Instant endDate;

    public static IterationConfigurationEntity fromGitlabJSON(JSONObject json) {
        return IterationConfigurationEntity.builder()
                .token(json.getString("token"))
                .iterationName(json.getString("iterationName"))
                .startDate(Instant.parse(json.getString("startDate")))
                .endDate(Instant.parse(json.getString("endDate")))
                .build();
    }
}
