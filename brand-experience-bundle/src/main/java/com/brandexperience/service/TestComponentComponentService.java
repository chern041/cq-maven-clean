package com.brandexperience.service;

import com.brandexperience.model.TestComponent;

import javax.jcr.RepositoryException;
import javax.servlet.jsp.PageContext;

public interface TestComponentComponentService {
    TestComponent getTestComponent(PageContext pageContext) throws RepositoryException;
}
