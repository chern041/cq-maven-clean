package com.brandexperience.cq.service.impl;

import com.brandexperience.cq.model.TestComponent;
import com.brandexperience.cq.service.TestComponentJcrService;
import com.brandexperience.cq.util.BrandExperienceUtils;
import org.apache.felix.scr.annotations.Component;
import org.apache.felix.scr.annotations.Service;
import org.apache.sling.api.resource.ResourceResolver;

import javax.jcr.Node;
import javax.jcr.RepositoryException;
@Service
@Component(metatype = false, name = "brand-experience TestComponent JCR Service")
public class TestComponentJcrServiceImpl implements TestComponentJcrService {

    @Override
    public TestComponent getTestComponent(final Node testComponentNode, final ResourceResolver resourceResolver) throws RepositoryException{

        final TestComponent testComponent = new TestComponent();
        final String title= "title";
        final String description = "description";
        final String color= "color";

        if (testComponentNode !=null){
            testComponent.setTitle(BrandExperienceUtils.getProperty(testComponentNode, title));
            testComponent.setDescription(BrandExperienceUtils.getProperty(testComponentNode, description));
            testComponent.setColor(BrandExperienceUtils.getProperty(testComponentNode, color));
        }
        return testComponent;
    }
}
