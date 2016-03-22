<%@include file="/apps/brand-experience/global.jsp"%>
<%@page import="com.brandexperience.cq.service.TestSpotlightComponentService,
                com.brandexperience.cq.model.TestSpotlight"
%>
<%
    TestSpotlightComponentService service = sling.getService(TestSpotlightComponentService.class);
    TestSpotlight testSpotlight = service.getTestSpotlight(pageContext);
%>

<c:set var="testSpotlight" value="<%= testSpotlight %>"/>

<h1>Brand Experience</h1>
<section style="border: 1px solid red;">
    <c:if test="${not empty testSpotlight.title}">
        <h2>Title: ${testSpotlight.title}</h2>
    </c:if>
    <c:if test="${not empty testSpotlight.description}">
        <p>Descriptions: ${testSpotlight.description}</p>
    </c:if>
    <c:if test="${not empty testSpotlight.color}">
        <p>Color that your chose: ${testSpotlight.color} </p>
    </c:if>
    <div style="background-color:#<c:if test='${not empty testSpotlight.color}'>${testSpotlight.color}</c:if>">TestSpotlight</div>
</section>