<%--
	Footer Navigation
	
	This contains the list of links. If there is no title specified, this component will 
	attempt to retrieve the title from the page within CQ, else it will display the link 
	path. If there is a node created with no link or text, it will not add it to the 
	collection of <code>PageLink</code>.
	
	Dependencies: StructureMultiField(widget)
	
	achew@siteworx.com
 --%>


<%@page import="java.util.HashMap"%>
<%@page import="java.util.List"%>
<%@page import="java.util.Map"%>
<%@include file="/apps/mcgladrey/global.jsp"%>
<%@include file="/apps/mcgladrey/components/utils/pagelink.jsp"%>
<%!
	private final static String PAGES_PROPERTY = "pages";
%>

<%
	final Map<String, Object> footerNavigation = new HashMap<String, Object>();
	
	if (currentNode != null && currentNode.hasNode(PAGES_PROPERTY)) {
	    final Node baseNode = currentNode.getNode(PAGES_PROPERTY);
	    final NodeIterator nodeIter = baseNode.getNodes();
	    List<PageLink> pageLinks = getPageLinks(nodeIter, pageManager);
	
	    footerNavigation.put("pageLinks", pageLinks);

	}
%>



<c:set var="footerNavigation" value="<%= footerNavigation %>"/>
<c:choose>
	<c:when test="${fn:length(footerNavigation.pageLinks) > 0}">
		<nav class="first left">
			<ul class="linklist">
				<c:forEach items="${footerNavigation.pageLinks}" var="pageLink" varStatus="status">
					<c:choose>
						<c:when test="${empty pageLink.link}">
							<li <c:if test="${status.first}">class="first portals"</c:if>><c:if test="${status.first}"><span></span></c:if>${pageLink.text}</li>
						</c:when>
						<c:otherwise>
							<li <c:if test="${status.first}">class="first portals"</c:if>><c:if test="${status.first}"><span></span></c:if><a href="${pageLink.link}<c:if test="${fn:startsWith(pageLink.link, '/')}">.html</c:if>">${pageLink.text}</a></li>
						</c:otherwise>
					</c:choose>
					<c:choose>
						<c:when test="${status.first}">
							<li class="mobile-hide">|</li>
						</c:when>
						<c:when test="${status.last}">
							<%--Don't display pipe --%>
						</c:when>
						<c:otherwise>
							<li>|</li>	
						</c:otherwise>
					</c:choose>
				</c:forEach>
			</ul>
			<cq:text property="text"/>
		</nav>
	</c:when>
    <c:otherwise>
        <c:if test="${isEditMode || isReadOnlyMode}">
            <span>Footer Navigation Component</span>
        </c:if>
    </c:otherwise>  
</c:choose>