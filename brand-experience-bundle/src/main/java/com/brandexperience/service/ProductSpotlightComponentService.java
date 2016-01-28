package com.brandexperience.service;

import com.brandexperience.model.ProductSpotlight;

import javax.jcr.RepositoryException;
import javax.servlet.jsp.PageContext;

public interface ProductSpotlightComponentService {

    ProductSpotlight getProductSpotlight(PageContext pageContext) throws RepositoryException;

}
