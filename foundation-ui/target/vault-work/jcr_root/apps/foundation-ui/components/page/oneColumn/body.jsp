<%--

Base body.jsp

--%>
<%@include file="/libs/foundation/global.jsp" %>
<body>
<div class="off-canvas-wrap">
  <div class="inner-wrap">
  <cq:include path="topNav" resourceType="foundation-ui/components/content/topnav"/>
  
  <!-- main content goes here -->
  <a href="/content/foundation/english/modals/modal-example.html" data-reveal-ajax="true" data-reveal-id="ajaxModal" class="radius button">Ajax Modal</a>
  <a href="#" data-reveal-id="genericModal" class="radius button">In Page Modal</a>
  
  <cq:include path="mainContent" resourceType="foundation/components/parsys"/>

  <!-- close the off-canvas menu -->
  <a class="exit-off-canvas"></a>

  </div>
</div>
	<div id="genericModal" class="reveal-modal" data-reveal>
	  <h2>Awesome. I have it.</h2>
	  <p class="lead">Your couch.  It is mine.</p>
	  <p>Im a cool paragraph that lives inside of an even cooler modal. Wins</p>
	  <a class="close-reveal-modal">&#215;</a>
	</div>
	<div id="ajaxModal" class="reveal-modal" data-reveal>
	</div>

</body>
<cq:includeClientLib categories="foundation.common"/>
<script>
  $(document).foundation();
</script>