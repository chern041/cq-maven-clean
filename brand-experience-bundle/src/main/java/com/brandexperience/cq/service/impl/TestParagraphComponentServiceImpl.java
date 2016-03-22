package com.brandexperience.cq.service.impl;

import com.brandexperience.cq.model.AEMComponentContext;
import com.brandexperience.cq.model.TestParagraph;
import com.brandexperience.cq.service.TestParagraphComponentService;
import com.brandexperience.cq.service.TestParagraphJcrService;

import org.apache.felix.scr.annotations.Component;
import org.apache.felix.scr.annotations.Reference;
import org.apache.felix.scr.annotations.Service;

import javax.jcr.RepositoryException;
import javax.servlet.jsp.PageContext;

@Service
@Component(metatype = false, name="brand-experience TestParagraph Component Service")
public class TestParagraphComponentServiceImpl implements TestParagraphComponentService {

    @Reference
    private TestParagraphJcrService jcrService;

    @Override
    public TestParagraph getTestParagraph(final  PageContext pageContext) throws RepositoryException{
        final AEMComponentContext context = AEMComponentContext.create(pageContext);
        return jcrService.getTestParagraph(context.getCurrentNode(), context.getResourceResolver());
    }
}