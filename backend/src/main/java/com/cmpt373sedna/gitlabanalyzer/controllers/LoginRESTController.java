package com.cmpt373sedna.gitlabanalyzer.controllers;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/login")
public class LoginRESTController {
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    private static class PasswordLoginRequestBody {
        public String name;
        public String password;
    }

    @PostMapping("/password")
    public String passwordLogin(@RequestBody PasswordLoginRequestBody body) {
        if (body.name != null && body.password != null && body.name.equals("admin") && body.password.equals("1234")) {
            return "gitlab-analyzer-secret-login-token";
        }

        throw new ResponseStatusException(HttpStatus.FORBIDDEN);
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    private static class SSOLoginRequestBody {
        public String ticket;
        public String service;
    }

    @PostMapping("/sso")
    public String passwordLogin(@RequestBody SSOLoginRequestBody body) {
        RestTemplate restTemplate = new RestTemplate();

        String response = restTemplate.getForObject("https://cas.sfu.ca/cas/serviceValidate?ticket=" + body.ticket + "&service=" + body.service + "&allow=sfu", String.class);

        if (response != null && (response.contains("<cas:authtype>sfu</cas:authtype>"))) {
            return "gitlab-analyzer-secret-login-token";
        }

        throw new ResponseStatusException(HttpStatus.FORBIDDEN);
    }
}
