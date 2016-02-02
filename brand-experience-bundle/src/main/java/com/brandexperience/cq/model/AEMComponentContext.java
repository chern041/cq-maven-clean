package com.brandexperience.cq.model;


import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.WCMMode;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.resource.ResourceResolver;

import javax.jcr.Node;
import javax.jcr.RepositoryException;
import javax.jcr.Session;
import javax.servlet.jsp.PageContext;

public class AEMComponentContext {

    private AEMComponentContext(final PageContext pageContext){
        this.pageContext = pageContext;
        this.slingRequest = (SlingHttpServletRequest) pageContext.getRequest();
        this.slingResponse = (SlingHttpServletResponse) pageContext.getResponse();
    }

    public static AEMComponentContext create(final PageContext pageContext){
        return new AEMComponentContext(pageContext);
    }

    public PageContext getPageContext(){
        return this.pageContext;
    }

    public SlingHttpServletRequest getSlingRequest(){
        return this.slingRequest;
    }

    public SlingHttpServletResponse getSlingResponse(){
        return this.slingResponse;
    }

    public Node getCurrentNode(){
        return (Node) pageContext.getAttribute("currentNode");
    }

    public Page getCurrentPage(){
        return (Page) pageContext.getAttribute("currentPage");
    }

    public Node getCurrentPageNode() throws RepositoryException{
        return getSession().getNode(getCurrentPage().getPath());
    }

    public Session getSession(){
        return getResourceResolver().adaptTo(Session.class);
    }

    public ResourceResolver getResourceResolver(){
        return slingRequest.getResourceResolver();
    }

    public WCMMode getWCMMode(){
        return WCMMode.fromRequest(slingRequest);
    }

    private final PageContext pageContext;

    private final SlingHttpServletRequest slingRequest;

    private final SlingHttpServletResponse slingResponse;

}
