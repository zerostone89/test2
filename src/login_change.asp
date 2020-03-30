<!--#include virtual="/include/common.asp"-->

<%  	
	'Option Explicit
Response.Expires = 0
Response.AddHeader "Pragma", "no-cache" 
Response.AddHeader "cache-control", "no-store" 

	open_dbo
 
	id   = Request("id")
	PCD  = Session("PCD") 
	  
	SQL7 = " SELECT  b.vdcd USRID,B.vdcd  DPCD,a.NAME NAME,b.VDSNM VDSNM,b.BRAND BRAND,b.SHGU SHGU, B.UBGB UBGB, B.PCD PCD, nvl(B.JUWSU, '') JUWSU "
	SQL7 = SQL7 & " from tbb060 a,tbb040 b "
	SQL7 = SQL7 & " WHERE a.USRID = b.PCD  "
	SQL7 = SQL7 & " and B.VDCD   = '" & UCASE(trim(id)) & "'  " 
	SQL7 = SQL7 & " and a.USRID  = '" & UCASE(trim(PCD)) & "' " 

  'response.write SQL7
  'response.end
  
	Set Rs7 = db.Execute(SQL7)

	Session("DPCD")   = Rs7("DPCD")    '매장코드 세션
	Session("PCD")    = Rs7("PCD")     '매장명 세션
	Session("USRID")  = Rs7("USRID")   '매장사용자
	Session("NAME")   = Rs7("VDSNM")   '매장명 세션
	Session("BRAND")  = Rs7("BRAND")   '브랜드 세션
	Session("SHGU")   = Rs7("SHGU")    '매장구분 세션
	Session("UBGB")   = Rs7("UBGB")    '매장구분 이마트 구분세션
	Session("JUWSU")  = Rs7("JUWSU")   '결제사용구분 세션
	
	Session.timeout = 120
	Rs7.close
	Set Rs7 = nothing
	 					 
%>
	<script language=javascript>
		parent.location.href="/index.asp";
	</script>
<%            

close_db

%>