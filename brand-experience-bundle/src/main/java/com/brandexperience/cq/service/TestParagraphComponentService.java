package com.brandexperience.cq.service;

import com.brandexperience.cq.model.TestParagraph;

import javax.servlet.jsp.PageContext;

import javax.jcr.RepositoryException;

public interface TestParagraphComponentService {
    TestParagraph getTestParagraph(PageContext pageContext) throws RepositoryException;
}
