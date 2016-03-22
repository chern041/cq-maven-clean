package com.brandexperience.cq.service.impl;

import com.brandexperience.cq.model.TestClass;
import com.brandexperience.cq.service.TestClassJcrService;
import com.brandexperience.cq.util.BrandExperienceUtils;
import org.apache.felix.scr.annotations.Component;
import org.apache.felix.scr.annotations.Service;
import org.apache.sling.api.resource.ResourceResolver;

import javax.jcr.Node;
import javax.jcr.RepositoryException;
@Service
@Component(metatype = false, name = "brand-experience TestClass JCR Service")
public class TestClassJcrServiceImpl implements TestClassJcrService{

    @Override
    public TestClass getTestClass(final Node testClassNode, final ResourceResolver resourceResolver) throws RepositoryException{

        final TestClass testClass = new TestClass();
        final String title= "title";
        final String description = "description";
        final String color= "color";

        if (testClassNode != null){
            testClass.setTitle(BrandExperienceUtils.getProperty(testClassNode, title));
            testClass.setDescription(BrandExperienceUtils.getProperty(testClassNode, description));
            testClass.setColor(BrandExperienceUtils.getProperty(testClassNode, color));
        }
        return testClass;
    }
}
