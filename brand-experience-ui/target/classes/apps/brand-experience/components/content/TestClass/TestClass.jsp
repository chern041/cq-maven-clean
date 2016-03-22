<%@include file="/apps/brand-experience/global.jsp"%>
<%@page import="com.brandexperience.cq.service.TestClassComponentService,
                com.brandexperience.cq.model.TestClass"
%>
<%
    TestClassComponentService service = sling.getService(TestClassComponentService.class);
    TestClass testClass = service.getTestClass(pageContext);
%>

<c:set var="testClass" value="<%= testClass %>"/>

<h1>Brand Experience</h1>
<section style="border: 1px solid red;">
    <c:if test="${not empty testClass.title}">
        <h2>Title: ${testClass.title}</h2>
    </c:if>
    <c:if test="${not empty testClass.description}">
        <p>Description: ${testClass.description}</p>
    </c:if>
    <c:if test="${not empty testClass.color}">
        <p>Color that your chose: ${testClass.color} </p>
    </c:if>
    <div style="background-color:#<c:if test='${not empty testClass.color}'>${testClass.color}</c:if>">TestClass</div>
</section>