package com.brandexperience.cq.service;

import com.brandexperience.cq.model.TestHeader;

import javax.servlet.jsp.PageContext;

import javax.jcr.RepositoryException;

public interface TestHeaderComponentService {
    TestHeader getTestHeader(PageContext pageContext) throws RepositoryException;
}
