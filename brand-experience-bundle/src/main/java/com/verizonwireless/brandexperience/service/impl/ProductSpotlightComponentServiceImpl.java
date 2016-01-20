package com.verizonwireless.brandexperience.service.impl;

import com.verizonwireless.brandexperience.model.AEMComponentContext;
import com.verizonwireless.brandexperience.model.ProductSpotlight;
import com.verizonwireless.brandexperience.service.ProductSpotlightComponentService;
import com.verizonwireless.brandexperience.service.ProductSpotlightJcrService;
import org.apache.felix.scr.annotations.Component;
import org.apache.felix.scr.annotations.Reference;
import org.apache.felix.scr.annotations.Service;

import javax.jcr.RepositoryException;
import javax.servlet.jsp.PageContext;

@Service
@Component(metatype = false, name = "brand-experience ProductSpotlight Component Service")
public class ProductSpotlightComponentServiceImpl implements ProductSpotlightComponentService{

    @Reference
    private ProductSpotlightJcrService jcrService;

    @Override
    public ProductSpotlight getProductSpotlight(final PageContext pageContext) throws RepositoryException{
        final AEMComponentContext context = AEMComponentContext.create(pageContext);
        return jcrService.getProductSpotlight(context.getCurrentNode(), context.getResourceResolver());
    }
}
