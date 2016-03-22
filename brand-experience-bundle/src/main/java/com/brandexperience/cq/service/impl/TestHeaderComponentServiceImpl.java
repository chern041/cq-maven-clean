package com.brandexperience.cq.service.impl;

import com.brandexperience.cq.model.AEMComponentContext;
import com.brandexperience.cq.model.TestHeader ;
import com.brandexperience.cq.service.TestHeaderComponentService;
import com.brandexperience.cq.service.TestHeaderJcrService;

import org.apache.felix.scr.annotations.Component;
import org.apache.felix.scr.annotations.Reference;
import org.apache.felix.scr.annotations.Service;

import javax.jcr.RepositoryException;
import javax.servlet.jsp.PageContext;

@Service
@Component(metatype = false, name="brand-experience TestHeader Component Service")
public class TestHeaderComponentServiceImpl implements  TestHeaderComponentService {

    @Reference
    private  TestHeaderJcrService jcrService;

    @Override
    public  TestHeader getTestHeader(final  PageContext pageContext) throws RepositoryException{
        final AEMComponentContext context = AEMComponentContext.create(pageContext);
        return jcrService.getTestHeader(context.getCurrentNode(), context.getResourceResolver());
    }
}