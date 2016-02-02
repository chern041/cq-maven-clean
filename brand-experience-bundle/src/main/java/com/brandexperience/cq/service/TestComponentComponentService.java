package com.brandexperience.cq.service;

import com.brandexperience.cq.model.TestComponent;

import javax.servlet.jsp.PageContext;

import javax.jcr.RepositoryException;

public interface TestComponentComponentService {
    TestComponent getTestComponent(PageContext pageContext) throws RepositoryException;
}