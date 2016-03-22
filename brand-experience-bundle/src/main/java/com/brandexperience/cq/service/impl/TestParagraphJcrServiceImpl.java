package com.brandexperience.cq.service.impl;

import com.brandexperience.cq.model.TestParagraph;
import com.brandexperience.cq.service.TestParagraphJcrService;
import com.brandexperience.cq.util.BrandExperienceUtils;
import org.apache.felix.scr.annotations.Component;
import org.apache.felix.scr.annotations.Service;
import org.apache.sling.api.resource.ResourceResolver;

import javax.jcr.Node;
import javax.jcr.RepositoryException;
@Service
@Component(metatype = false, name = "brand-experience TestParagraph JCR Service")
public class TestParagraphJcrServiceImpl implements TestParagraphJcrService{

    @Override
    public TestParagraph getTestParagraph(final Node testParagraphNode, final ResourceResolver resourceResolver) throws RepositoryException{

        final TestParagraph testParagraph = new TestParagraph();
        final String title= "title";
        final String description = "description";
        final String description2 = "description2";
        final String color= "color";

        if (testParagraphNode != null){
            testParagraph.setTitle(BrandExperienceUtils.getProperty(testParagraphNode, title));
            testParagraph.setDescription(BrandExperienceUtils.getProperty(testParagraphNode, description));
            testParagraph.setDescription2(BrandExperienceUtils.getProperty(testParagraphNode, description2));
            testParagraph.setColor(BrandExperienceUtils.getProperty(testParagraphNode, color));
        }
        return testParagraph;
    }
}
