package com.brandexperience.cq.service.impl;

import com.brandexperience.cq.model.AEMComponentContext;
import com.brandexperience.cq.model.TestSpotlight ;
import com.brandexperience.cq.service.TestSpotlightComponentService;
import com.brandexperience.cq.service.TestSpotlightJcrService;

import org.apache.felix.scr.annotations.Component;
import org.apache.felix.scr.annotations.Reference;
import org.apache.felix.scr.annotations.Service;

import javax.jcr.RepositoryException;
import javax.servlet.jsp.PageContext;

@Service
@Component(metatype = false, name="brand-experience TestSpotlight Component Service")
public class TestSpotlightComponentServiceImpl implements  TestSpotlightComponentService {

    @Reference
    private  TestSpotlightJcrService jcrService;

    @Override
    public  TestSpotlight getTestSpotlight(final  PageContext pageContext) throws RepositoryException{
        final AEMComponentContext context = AEMComponentContext.create(pageContext);
        return jcrService.getTestSpotlight(context.getCurrentNode(), context.getResourceResolver());
    }
}