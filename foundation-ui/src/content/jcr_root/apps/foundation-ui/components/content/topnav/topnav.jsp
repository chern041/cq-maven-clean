<%--

  Top Navigation component

  Draws the top navigation

--%><%@include file="/libs/foundation/global.jsp"%><%
%><%@ page import="java.util.Iterator,
        com.day.text.Text,
        com.day.cq.wcm.api.PageFilter,
        com.day.cq.wcm.api.Page,
        com.day.cq.commons.Doctype,
        org.apache.commons.lang3.StringEscapeUtils" %>
        
<div data-magellan-expedition="fixed">
<nav class="tab-bar">
    <section class="left tab-bar-section">
      <h1 class="title">Top Nav</h1>
    </section>
    <section class="right-small">
	    <a class="right-off-canvas-toggle menu-icon">
			<span></span>
		</a> 
	</section>
</nav>
    <!-- Off Canvas Menu -->
    	<aside class="right-off-canvas-menu">
        	<ul class="off-canvas-list">
        		<li><label><%=resourcePage.getTitle()%></label></li>

       		    <dl class="sub-nav">
			        <dd data-magellan-arrival="destination1"><a href="#destination1">First Destination</a></dd>
			        <dd data-magellan-arrival="destination2"><a href="#destination2">Second Destination</a></dd>
			    </dl>

<%
    // get starting point of navigation
    long absParent = currentStyle.get("absParent", 2L);
    String navstart = Text.getAbsoluteParent(currentPage.getPath(), (int) absParent);

    //if not deep enough take current node
    if (navstart.equals("")) navstart=currentPage.getPath();

    Resource rootRes = slingRequest.getResourceResolver().getResource(navstart);
    Page rootPage = rootRes == null ? null : rootRes.adaptTo(Page.class);
    String xs = Doctype.isXHTML(request) ? "/" : "";
    if (rootPage != null) {
        Iterator<Page> children = rootPage.listChildren(new PageFilter(request));
        while (children.hasNext()) {
            Page child = children.next();
            %>

          <li>            
	          <a href="<%= child.getPath() %>.html">
	          		<%= StringEscapeUtils.escapeXml(child.getTitle()) %>
	          </a>
          </li>

<%
        }
    }
%>
	        </ul>
	    </aside>
	
</div>