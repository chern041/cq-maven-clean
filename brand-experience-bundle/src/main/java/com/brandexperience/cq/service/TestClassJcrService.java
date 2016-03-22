package com.brandexperience.cq.service;

import com.brandexperience.cq.model.TestClass;
import org.apache.sling.api.resource.ResourceResolver;

import javax.jcr.Node;
import javax.jcr.RepositoryException;


public interface TestClassJcrService {
    public TestClass getTestClass (Node testClassNode, ResourceResolver resourceResolver) throws RepositoryException;
}
