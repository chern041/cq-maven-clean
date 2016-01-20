package com.verizonwireless.brandexperience.service;

import com.verizonwireless.brandexperience.model.ProductSpotlight;
import org.apache.sling.api.resource.ResourceResolver;

import javax.jcr.Node;

import javax.jcr.RepositoryException;

public interface ProductSpotlightJcrService {

    public ProductSpotlight getProductSpotlight(Node productSpotlightNode, ResourceResolver resourceResolver) throws RepositoryException;

}
