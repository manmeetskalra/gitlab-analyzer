package com.cmpt373sedna.gitlabanalyzer.controllers;

import com.cmpt373sedna.gitlabanalyzer.model.WeightConfigurationEntity;
import com.cmpt373sedna.gitlabanalyzer.model.IterationConfigurationEntity;
import com.cmpt373sedna.gitlabanalyzer.repository.WeightConfigurationEntityRepository;
import com.cmpt373sedna.gitlabanalyzer.repository.IterationConfigurationRepository;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;

@RestController
@RequestMapping("/configuration")
public class ConfigurationEntityController {

    @Autowired
    private WeightConfigurationEntityRepository weightConfigurationEntityRepository;

    @Autowired
    private IterationConfigurationRepository iterationConfigurationRepository;

    @GetMapping("/iterations/all")
    public Iterable<IterationConfigurationEntity> getAllIterations() {
        return this.iterationConfigurationRepository.findAll();
    }

    @GetMapping("/weights/all")
    public Iterable<WeightConfigurationEntity> getAllWeights() {
        return this.weightConfigurationEntityRepository.findAll();
    }

    @PostMapping("/newIterationConfig")
    public void createNewIteration(@RequestBody IterationConfigurationEntity body) {
        this.iterationConfigurationRepository.save(body);
    }

    @PostMapping("/newWeightConfig")
    public void createNewWeightConfig(@RequestBody String body) {
        JSONObject obj = new JSONObject(body);
        this.weightConfigurationEntityRepository.save(WeightConfigurationEntity.fromGitlabJSON(obj));
    }

    @GetMapping("/get/iterations/{token}")
    public Iterable<IterationConfigurationEntity> getIterationConfigurations(@PathVariable String token) {
        return this.iterationConfigurationRepository.findAllByToken(token);
    }

    @GetMapping("/get/weightScores/{token}")
    public Iterable<WeightConfigurationEntity> getScoreConfigurations(@PathVariable String token) {
        return this.weightConfigurationEntityRepository.findAllByToken(token);
    }

    @PostMapping("/update/iterations/{id}")
    public void updateIterationConfigurations(@PathVariable int id, @RequestBody IterationConfigurationEntity body) {
        IterationConfigurationEntity iterationConfig = this.iterationConfigurationRepository.findById(id).orElseThrow(() ->
                new ResponseStatusException(HttpStatus.NOT_FOUND));
        iterationConfig.setIterationName(body.getIterationName());
        iterationConfig.setStartDate(body.getStartDate());
        iterationConfig.setEndDate(body.getEndDate());
        this.iterationConfigurationRepository.save(iterationConfig);
    }

    @PostMapping("/update/weightScores/{id}")
    public void updateScoreConfigurations(@PathVariable int id, @RequestBody String body) {
        WeightConfigurationEntity weightConfig = this.weightConfigurationEntityRepository.findById(id).orElseThrow(() ->
                new ResponseStatusException(HttpStatus.NOT_FOUND));
        JSONObject updatedConfig = new JSONObject(body);
        weightConfig.setConfiguration(updatedConfig.getJSONObject("configurations").toString());
        this.weightConfigurationEntityRepository.save(weightConfig);
    }

    @DeleteMapping("/delete/iterations")
    public void deleteIterationConfigurations(@RequestBody String body){
        String numAsString = body.substring(8,(body.length()-2));
        String[] arrayOfNumAsString = numAsString.split(",");
        for(String numInString : arrayOfNumAsString){
            int id = Integer.parseInt(numInString);
            this.iterationConfigurationRepository.deleteById(id);
        }
    }
}
