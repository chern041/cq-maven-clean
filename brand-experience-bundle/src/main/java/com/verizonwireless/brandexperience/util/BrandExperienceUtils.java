package com.verizonwireless.brandexperience.util;

import javax.jcr.Node;
import javax.jcr.RepositoryException;

public class BrandExperienceUtils {

    public static String getProperty(final Node node, final String property) throws RepositoryException{
        if(node != null && node.hasProperty(property)){
            return node.getProperty(property).getString();
        }
        return null;
    }

}
