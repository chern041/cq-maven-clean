package com.brandexperience.cq.service;

import com.brandexperience.cq.model.TestHeader;
import org.apache.sling.api.resource.ResourceResolver;

import javax.jcr.Node;
import javax.jcr.RepositoryException;


public interface TestHeaderJcrService {
    public TestHeader getTestHeader (Node testHeaderNode, ResourceResolver resourceResolver) throws RepositoryException;
}
