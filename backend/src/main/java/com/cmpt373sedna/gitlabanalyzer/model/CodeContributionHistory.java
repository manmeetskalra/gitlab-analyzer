package com.cmpt373sedna.gitlabanalyzer.model;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.time.Instant;

@Entity
@Data
public class CodeContributionHistory {
    private @Id @GeneratedValue long CCHId; //primary key
    Instant date;
    private int numCommits;
    private int numMR;
    private int numComments;

    public CodeContributionHistory() {
        this.CCHId = -1;
        this.numCommits = 0;
        this.numMR = 0;
        this.numComments = 0;
    }

    public CodeContributionHistory(int commits, int mergeRequests, int comments, Instant date) {
        this.numCommits = commits;
        this.numMR = mergeRequests;
        this.numComments = comments;
        this.date = date;
    }
}
