<%@include file="/apps/mcgladrey/global.jsp"%>
<c:if test="${isEditMode}">
	<div>This is the Eloqua Form Editor component. This message is only visible in EDIT mode.</div>
	<c:choose>
		<c:when test="${empty properties['eloquaFormName'] or empty properties['eloquaFormType']}">
			<div>Please enter the eloquaFormName and eloquaFormType.</div>
		</c:when>
		<c:when test="${not empty properties['eloquaFormName'] and not empty properties['eloquaFormType']}">
			<div>Currently tracking evars: eloquaFormName = '${properties['eloquaFormName']}', eloquaFormType = '${properties['eloquaFormType']}'</div>
		</c:when>
	</c:choose>
	<hr/>
</c:if>
<cq:text property="text"/>
<c:if test="${not empty properties['eloquaFormName'] and not empty properties['eloquaFormType']}">
	<div style="display:none" record="'eloquaFormVisit', {'eloquaFormName':'${properties['eloquaFormName']}', 'eloquaFormType': '${properties['eloquaFormType']}'}"></div>
</c:if>
