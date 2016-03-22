package com.brandexperience.cq.service.impl;

import com.brandexperience.cq.model.TestMultitab;
import com.brandexperience.cq.service.TestMultitabJcrService;
import com.brandexperience.cq.util.BrandExperienceUtils;
import org.apache.felix.scr.annotations.Component;
import org.apache.felix.scr.annotations.Service;
import org.apache.sling.api.resource.ResourceResolver;

import javax.jcr.Node;
import javax.jcr.RepositoryException;
@Service
@Component(metatype = false, name = "brand-experience TestMultitab JCR Service")
public class TestMultitabJcrServiceImpl implements TestMultitabJcrService {

    @Override
    public TestMultitab getTestMultitab(final Node testMultitabNode, final ResourceResolver resourceResolver) throws RepositoryException{

        final TestMultitab testMultitab = new TestMultitab();
        final String titleTab1= "titleTab1";
        final String title= "title";
        final String description = "description";
        final String color= "color";

        if (testMultitabNode !=null){
            testMultitab.setTitleTab1(BrandExperienceUtils.getProperty(testMultitabNode, titleTab1));
            testMultitab.setTitle(BrandExperienceUtils.getProperty(testMultitabNode, title));
            testMultitab.setDescription(BrandExperienceUtils.getProperty(testMultitabNode, description));
            testMultitab.setColor(BrandExperienceUtils.getProperty(testMultitabNode, color));
        }
        return testMultitab;
    }
}
