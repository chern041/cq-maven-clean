<%@include file="/apps/brand-experience/global.jsp"%>
<%@page import="com.brandexperience.cq.service.TestHeaderComponentService,
                com.brandexperience.cq.model.TestHeader"
%>
<%
    TestHeaderComponentService service = sling.getService(TestHeaderComponentService.class);
    TestHeader testHeader = service.getTestHeader(pageContext);
%>
<c:set var="testHeader" value="<%= testHeader%>"/>
<h1>Brand Experience</h1>

<section style="border: 1px solid red;">

    <c:if test="${not empty testHeader.title}">
        <h2>Title: ${testHeader.title}</h2>
    </c:if>
    <c:if test="${not empty testHeader.description}">
        <p>Descriptions: ${testHeader.description}</p>
    </c:if>
    <c:if test="${not empty testHeader.titleTwo}">
        <h2>titleTwo: ${testHeader.titleTwo}</h2>
    </c:if>

</section>