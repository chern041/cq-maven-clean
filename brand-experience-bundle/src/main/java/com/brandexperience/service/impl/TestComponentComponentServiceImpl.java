package com.brandexperience.service.impl;

import com.brandexperience.model.AEMComponentContext;
import com.brandexperience.model.TestComponent;
import com.brandexperience.service.TestComponentComponentService;
import com.brandexperience.service.TestComponentJcrService;
import org.apache.felix.scr.annotations.Component;
import org.apache.felix.scr.annotations.Reference;
import org.apache.felix.scr.annotations.Service;

import javax.jcr.RepositoryException;
import javax.servlet.jsp.PageContext;

@Service
@Component(metatype = false, name="brand-experience TestComponent Component Service")
public class TestComponentComponentServiceImpl implements  TestComponentComponentService {

    @Reference
    private  TestComponentJcrService jcrService;

    @Override
    public  TestComponent getTestComponent(final  PageContext pageContext) throws RepositoryException{
        final AEMComponentContext context = AEMComponentContext.create(pageContext);
        return jcrService.getTestComponent(context.getCurrentNode(), context.getResourceResolver());
    }
}
