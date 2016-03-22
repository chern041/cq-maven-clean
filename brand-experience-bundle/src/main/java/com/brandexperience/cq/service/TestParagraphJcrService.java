package com.brandexperience.cq.service;

import com.brandexperience.cq.model.TestParagraph;
import org.apache.sling.api.resource.ResourceResolver;

import javax.jcr.Node;
import javax.jcr.RepositoryException;


public interface TestParagraphJcrService {
    public TestParagraph getTestParagraph (Node testParagraphNode, ResourceResolver resourceResolver) throws RepositoryException;
}
