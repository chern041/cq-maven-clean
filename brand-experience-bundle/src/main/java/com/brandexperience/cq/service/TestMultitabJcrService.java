package com.brandexperience.cq.service;

import com.brandexperience.cq.model.TestMultitab;
import org.apache.sling.api.resource.ResourceResolver;

import javax.jcr.Node;
import javax.jcr.RepositoryException;

public interface TestMultitabJcrService {
    public TestMultitab getTestMultitab(Node testMultitabNode, ResourceResolver resourceResolver) throws RepositoryException;
}
