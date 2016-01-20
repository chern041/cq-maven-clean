package com.verizonwireless.brandexperience.service.impl;

import com.verizonwireless.brandexperience.model.ProductSpotlight;
import com.verizonwireless.brandexperience.service.ProductSpotlightJcrService;
import com.verizonwireless.brandexperience.util.BrandExperienceUtils;
import org.apache.felix.scr.annotations.Component;
import org.apache.felix.scr.annotations.Service;
import org.apache.sling.api.resource.ResourceResolver;

import javax.jcr.Node;
import javax.jcr.RepositoryException;


@Service
@Component(metatype=false, name="brand-experience ProductSpotlight JCR Service")
public class ProductSpotlightJcrServiceImpl implements ProductSpotlightJcrService {

    @Override
    public ProductSpotlight getProductSpotlight(final Node productSpotlightNode, final ResourceResolver resourceResolver) throws RepositoryException{

        final ProductSpotlight productSpotlight = new ProductSpotlight();
        final String titleBar = "titleBar";
        final String descriptionBar = "descriptionBar";
        final String buttonBar = "buttonBar";

        if(productSpotlightNode != null){
            productSpotlight.setTitleBar(BrandExperienceUtils.getProperty(productSpotlightNode, titleBar));
            productSpotlight.setDescriptionBar(BrandExperienceUtils.getProperty(productSpotlightNode, descriptionBar));
            productSpotlight.setButtonBar(BrandExperienceUtils.getProperty(productSpotlightNode, buttonBar));
        }
        return productSpotlight;
    }
}
