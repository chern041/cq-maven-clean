package com.brandexperience.service.cq.impl;

import com.brandexperience.cq.model.AEMComponentContext;
import com.brandexperience.cq.model.TestMultitab;
import com.brandexperience.cq.service.TestMultitabComponentService;
import com.brandexperience.cq.service.TestMultitabJcrService;
import org.apache.felix.scr.annotations.Component;
import org.apache.felix.scr.annotations.Reference;
import org.apache.felix.scr.annotations.Service;

import javax.jcr.RepositoryException;
import javax.servlet.jsp.PageContext;

@Service
@Component(metatype = false, name="brand-experience TestMultitab Component Service")
public class TestMultitabComponentServiceImpl implements  TestMultitabComponentService {

    @Reference
    private  TestMultitabJcrService jcrService;

    @Override
    public  TestMultitab getTestMultitab(final  PageContext pageContext) throws RepositoryException{
        final AEMComponentContext context = AEMComponentContext.create(pageContext);
        return jcrService.getTestMultitab(context.getCurrentNode(), context.getResourceResolver());
    }
}
