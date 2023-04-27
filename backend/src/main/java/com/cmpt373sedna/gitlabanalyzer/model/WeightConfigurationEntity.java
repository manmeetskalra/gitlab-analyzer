package com.cmpt373sedna.gitlabanalyzer.model;

import lombok.*;
import org.json.JSONObject;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Data
@Builder
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class WeightConfigurationEntity {
    private @Id @GeneratedValue int id;
    private @Getter String token;
    private @Getter String configuration;

    public static WeightConfigurationEntity fromGitlabJSON(JSONObject json) {
       return WeightConfigurationEntity.builder()
               .token(json.getString("token"))
               .configuration(json.getJSONObject("configurations").toString())
               .build();
    }
}
