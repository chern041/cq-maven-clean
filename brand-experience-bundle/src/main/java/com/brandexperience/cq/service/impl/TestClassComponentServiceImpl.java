package com.brandexperience.cq.service.impl;

import com.brandexperience.cq.model.AEMComponentContext;
import com.brandexperience.cq.model.TestClass ;
import com.brandexperience.cq.service.TestClassComponentService;
import com.brandexperience.cq.service.TestClassJcrService;

import org.apache.felix.scr.annotations.Component;
import org.apache.felix.scr.annotations.Reference;
import org.apache.felix.scr.annotations.Service;

import javax.jcr.RepositoryException;
import javax.servlet.jsp.PageContext;

@Service
@Component(metatype = false, name="brand-experience TestClass Component Service")
public class TestClassComponentServiceImpl implements  TestClassComponentService {

    @Reference
    private  TestClassJcrService jcrService;

    @Override
    public  TestClass getTestClass(final  PageContext pageContext) throws RepositoryException{
        final AEMComponentContext context = AEMComponentContext.create(pageContext);
        return jcrService.getTestClass(context.getCurrentNode(), context.getResourceResolver());
    }
}