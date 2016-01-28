package com.brandexperience.service;

import com.brandexperience.model.ProductSpotlight;
import org.apache.sling.api.resource.ResourceResolver;

import javax.jcr.Node;

import javax.jcr.RepositoryException;

public interface ProductSpotlightJcrService {

    public ProductSpotlight getProductSpotlight(Node productSpotlightNode, ResourceResolver resourceResolver) throws RepositoryException;

}
