package com.brandexperience.cq.util;

public class BrandExperienceUtils {
    public static String getProperty(final javax.jcr.Node node, final String property) throws javax.jcr.RepositoryException{
        if(node != null && node.hasProperty(property)){
            return node.getProperty(property).getString();
        }
        return null;
    }
}
