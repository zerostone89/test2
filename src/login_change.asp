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

	Session("DPCD")   = Rs7("DPCD")    '�����ڵ� ����
	Session("PCD")    = Rs7("PCD")     '����� ����
	Session("USRID")  = Rs7("USRID")   '��������
	Session("NAME")   = Rs7("VDSNM")   '����� ����
	Session("BRAND")  = Rs7("BRAND")   '�귣�� ����
	Session("SHGU")   = Rs7("SHGU")    '���屸�� ����
	Session("UBGB")   = Rs7("UBGB")    '���屸�� �̸�Ʈ ���м���
	Session("JUWSU")  = Rs7("JUWSU")   '������뱸�� ����
	
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