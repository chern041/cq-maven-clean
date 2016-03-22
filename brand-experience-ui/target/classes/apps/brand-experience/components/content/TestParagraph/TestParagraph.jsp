<%@include file="/apps/brand-experience/global.jsp"%>
<%@page import="com.brandexperience.cq.service.TestParagraphComponentService,
                com.brandexperience.cq.model.TestParagraph"
%>
<%
    TestParagraphComponentService service = sling.getService(TestParagraphComponentService.class);
    TestParagraph testParagraph = service.getTestParagraph(pageContext);
%>

<c:set var="testParagraph" value="<%= testParagraph %>"/>

<h1>Brand Experience</h1>
<section style="border: 1px solid red;">
    <c:if test="${not empty testParagraph.title}">
        <h2>Title: ${testParagraph.title}</h2>
    </c:if>
    <c:if test="${not empty testParagraph.description}">
        <p>Description: ${testParagraph.description}</p>
    </c:if>
    <c:if test="${not empty testParagraph.description2}">
            <p>Description2: ${testParagraph.description2}</p>
        </c:if>
    <c:if test="${not empty testParagraph.color}">
        <p>Color that your chose: ${testParagraph.color} </p>
    </c:if>
    <div style="background-color:#<c:if test='${not empty testParagraph.color}'>${testParagraph.color}</c:if>">TestParagraph</div>
</section>