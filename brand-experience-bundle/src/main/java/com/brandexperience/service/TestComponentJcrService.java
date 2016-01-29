package com.brandexperience.service;

import com.brandexperience.model.TestComponent;
import org.apache.sling.api.resource.ResourceResolver;

import javax.jcr.Node;

import javax.jcr.RepositoryException;

public interface TestComponentJcrService {
    public TestComponent getTestComponent(Node testComponentNode, ResourceResolver resourceResolver) throws RepositoryException;
}
