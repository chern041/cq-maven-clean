package com.brandexperience.cq.service;

        import com.brandexperience.cq.model.TestSpotlight;
        import org.apache.sling.api.resource.ResourceResolver;

        import javax.jcr.Node;
        import javax.jcr.RepositoryException;


public interface TestSpotlightJcrService {
        public TestSpotlight getTestSpotlight (Node testComponentNode, ResourceResolver resourceResolver) throws RepositoryException;
}
