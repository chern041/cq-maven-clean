package com.brandexperience.cq.service.impl;

import com.brandexperience.cq.model.TestHeader;
import com.brandexperience.cq.service.TestHeaderJcrService;
import com.brandexperience.cq.util.BrandExperienceUtils;
import org.apache.felix.scr.annotations.Component;
import org.apache.felix.scr.annotations.Service;
import org.apache.sling.api.resource.ResourceResolver;

import javax.jcr.Node;
import javax.jcr.RepositoryException;
@Service
@Component(metatype = false, name = "brand-experience TestHeader JCR Service")
public class TestHeaderJcrServiceImpl implements TestHeaderJcrService{

    @Override
    public TestHeader getTestHeader(final Node testHeaderNode, final ResourceResolver resourceResolver) throws RepositoryException{

        final TestHeader testHeader = new TestHeader();
        final String title= "title";
        final String description = "description";
        final String titleTwo= "titletwo";

        if (testHeaderNode != null){
            testHeader.setTitle(BrandExperienceUtils.getProperty(testHeaderNode, title));
            testHeader.setDescription(BrandExperienceUtils.getProperty(testHeaderNode, description));
            testHeader.setTitleTwo(BrandExperienceUtils.getProperty(testHeaderNode, titleTwo));

        }
        return testHeader;
    }
}
