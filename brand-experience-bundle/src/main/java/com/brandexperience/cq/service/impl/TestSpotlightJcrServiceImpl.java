package com.brandexperience.cq.service.impl;

import com.brandexperience.cq.model.TestSpotlight;
import com.brandexperience.cq.service.TestSpotlightJcrService;
import com.brandexperience.cq.util.BrandExperienceUtils;
import org.apache.felix.scr.annotations.Component;
import org.apache.felix.scr.annotations.Service;
import org.apache.sling.api.resource.ResourceResolver;

import javax.jcr.Node;
import javax.jcr.RepositoryException;
@Service
@Component(metatype = false, name = "brand-experience TestSpotlight JCR Service")
public class TestSpotlightJcrServiceImpl implements TestSpotlightJcrService{

    @Override
    public TestSpotlight getTestSpotlight(final Node testSpotlightNode, final ResourceResolver resourceResolver) throws RepositoryException{

        final TestSpotlight testSpotlight = new TestSpotlight();
        final String title= "title";
        final String description = "description";
        final String color= "color";

        if (testSpotlightNode != null){
            testSpotlight.setTitle(BrandExperienceUtils.getProperty(testSpotlightNode, title));
            testSpotlight.setDescription(BrandExperienceUtils.getProperty(testSpotlightNode, description));
            testSpotlight.setColor(BrandExperienceUtils.getProperty(testSpotlightNode, color));
        }
        return testSpotlight;
    }
}
