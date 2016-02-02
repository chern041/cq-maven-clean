package com.brandexperience.cq.service.impl;

import com.brandexperience.cq.model.AEMComponentContext;
import com.brandexperience.cq.model.TestComponent;
import com.brandexperience.cq.service.TestComponentComponentService;
import com.brandexperience.cq.service.TestComponentJcrService;

import javax.servlet.jsp.PageContext;

import javax.jcr.RepositoryException;

@org.apache.felix.scr.annotations.Service
@org.apache.felix.scr.annotations.Component(metatype = false, name="brand-experience TestComponent Component Service")
public class TestComponentComponentServiceImpl implements  TestComponentComponentService {

    @org.apache.felix.scr.annotations.Reference
    private  TestComponentJcrService jcrService;

    @Override
    public  TestComponent getTestComponent(final  PageContext pageContext) throws RepositoryException{
        final AEMComponentContext context = AEMComponentContext.create(pageContext);
        return jcrService.getTestComponent(context.getCurrentNode(), context.getResourceResolver());
    }
}
