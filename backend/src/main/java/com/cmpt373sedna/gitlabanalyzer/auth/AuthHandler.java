package com.cmpt373sedna.gitlabanalyzer.auth;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

// based off https://stackoverflow.com/a/42325065
public class AuthHandler extends HandlerInterceptorAdapter {
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) {
        if (request.getMethod().equals("OPTIONS")) {
            return true;
        }

        String auth = request.getHeader("Authorization");
        if (auth == null || !auth.equals("Bearer gitlab-analyzer-secret-login-token")) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED);
        }

        return true;
    }
}