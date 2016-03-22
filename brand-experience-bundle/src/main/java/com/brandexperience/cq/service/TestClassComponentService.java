package com.brandexperience.cq.service;

import com.brandexperience.cq.model.TestClass;

import javax.servlet.jsp.PageContext;

import javax.jcr.RepositoryException;

public interface TestClassComponentService {
    TestClass getTestClass(PageContext pageContext) throws RepositoryException;
}
