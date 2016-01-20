package com.verizonwireless.brandexperience.service;

import com.verizonwireless.brandexperience.model.ProductSpotlight;

import javax.jcr.RepositoryException;
import javax.servlet.jsp.PageContext;

public interface ProductSpotlightComponentService {

    ProductSpotlight getProductSpotlight(PageContext pageContext) throws RepositoryException;

}
