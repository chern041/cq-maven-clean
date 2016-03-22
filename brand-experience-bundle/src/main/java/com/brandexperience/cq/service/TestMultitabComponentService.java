package com.brandexperience.cq.service;

import com.brandexperience.cq.model.TestMultitab;

import javax.servlet.jsp.PageContext;

import javax.jcr.RepositoryException;

public interface TestMultitabComponentService {
    TestMultitab getTestMultitab(PageContext pageContext) throws RepositoryException;
}