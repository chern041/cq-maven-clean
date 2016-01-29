<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@include file="/apps/brand-experience/global.jsp"%>
<%@page import="com.brandexperience.service.TestComponentComponentService,
                com.brandexperience.model.TestComponent"%>

<%
    TestComponentComponentService service = sling.getService(TestComponentComponentService.class);
    TestComponent testComponent = service.getTestComponent(pageContext);
%>

<h1>Brand Experience</h1>
<section style="border: 1px solid red;">
    <c:if test="${not empty testComponent.title}">
        <h2>Title: ${testComponent.title}</h2>
    </c:if>
    <c:if test="${not empty testComponent.description}">
        <p>Descriptions: ${testComponent.description}</p>
    </c:if>
    <c:if test="${not empty testComponent.color}">
        <p>Color that your chose: ${testComponent.color} </p>
    </c:if>
    <div style="background-color:<c:if test='${not empty testComponent.color}'>${testComponent.color}</c:if>">Test123</div>
</section>
