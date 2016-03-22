package com.brandexperience.cq.service;

import com.brandexperience.cq.model.TestSpotlight;

import javax.servlet.jsp.PageContext;

import javax.jcr.RepositoryException;

public interface TestSpotlightComponentService {
    TestSpotlight getTestSpotlight(PageContext pageContext) throws RepositoryException;
}
