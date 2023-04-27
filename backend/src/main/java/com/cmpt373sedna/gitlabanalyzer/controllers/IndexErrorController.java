package com.cmpt373sedna.gitlabanalyzer.controllers;

import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.web.servlet.error.DefaultErrorAttributes;
import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.ModelAndView;

@CrossOrigin
@RestController
@Slf4j
public class IndexErrorController implements ErrorController {

    private static final String PATH = "/error";

    @RequestMapping(value = PATH, method = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.PATCH})
    public Object error(WebRequest webRequest) {
        Throwable exception = new DefaultErrorAttributes().getError(webRequest);
        if (exception != null) {
            log.error("", exception);
            return exception.getMessage();
        }

        return new ModelAndView("forward:/");
    }

    @Override
    public String getErrorPath() {
        return PATH;
    }
}
