<%@include file="/apps/brand-experience/global.jsp"%>
<%@page import="com.brandexperience.cq.service.TestMultitabComponentService,
                com.brandexperience.cq.model.TestMultitab"
%>
<%
    TestMultitabComponentService service = sling.getService(TestMultitabComponentService.class);
    TestMultitab testMultitab = service.getTestMultitab(pageContext);
%>

<c:set var="testMultitab" value="<%= testMultitab %>"/>

<h1>**********Test******Multi******Tabs*************</h1>
<section style="border: 1px solid red;">
    <c:if test="${not empty testMultitab.titleTab1}">
            <h2>Title: ${testMultitab.titleTab1}</h2>
    </c:if>

    <c:if test="${not empty testMultitab.title}">
        <h2>Title: ${testMultitab.title}</h2>
    </c:if>
    <c:if test="${not empty testMultitab.description}">
        <p>Descriptions: ${testMultitab.description}</p>
    </c:if>
    <c:if test="${not empty testMultitab.color}">
        <p>Color that you chose: ${testMultitab.color} </p>
    </c:if>
    <div style="background-color:#<c:if test='${not empty testMultitab.color}'>${testMultitab.color}</c:if>">TestMultitab</div>
</section>