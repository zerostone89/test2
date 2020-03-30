 				<!--#include virtual="/include/common.asp"-->
<%g_loginCheck%>
				
				<!--#include virtual="/include/xinc/design.asp"-->
				<%Call DrawPageStart%>
<%
		buseo     = trim(request("buseo"))
		jkwe     = trim(request("jkwe"))
		irum     = trim(request("irum"))
open_dbo


		SQL="select a.DPCD DPCD,b.refnm BUSEONM, a.JKWE JKWE,c.refnm JIKNM, a.NAME NAME,"
		SQL=SQL&"a.INNO INNO,a.HPNO HPNO,a.HOMENO HOMENO,a.EMAIL EMAIL"
		SQL=SQL&" from TBB060 a,("
		SQL=SQL&"		SELECT REFCD,REFNM"
		SQL=SQL&"		 FROM TBB150 WHERE  REFTP = 'Z1'"
		SQL=SQL&"		  AND REFCD <> '0000' AND    USEYN = 'Y'"
		SQL=SQL&"		  AND    REFCD <> 'Z00000'"
		SQL=SQL&"              ) b,"
		SQL=SQL&"              ("
		SQL=SQL&"		SELECT REFCD,REFNM"
		SQL=SQL&"		 FROM TBB150 WHERE  REFTP = 'Z4'"
		SQL=SQL&"		  AND REFCD <> '0000' AND    USEYN = 'Y'"
		SQL=SQL&"		  AND    REFCD <> 'Z00000'"
		SQL=SQL&"              ) c"
		SQL=SQL&" where a.DPCD = b.REFCD"
		SQL=SQL&"  and a.JKWE = c.REFCD(+)"
		SQL=SQL&"  and a.dpcd like '%"& buseo &"%'"
		SQL=SQL&"  and a.JKWE like '%"& jkwe &"%'"
		SQL=SQL&"  and a.name like '%"& irum &"%'"
		SQL=SQL&"  and a.useyn = 'Y'"
		SQL=SQL&"  and c.refcd <= '40'"
		SQL=SQL&"  order by a.JKWE asc, b.refnm asc"



'	response.write sql


		set rs1=server.createobject("adodb.recordset")
		rs1.CursorLocation = adUseClient
		rs1.open SQL,db,adOpenStatic, adLockOptimistic
		if rs1.eof then
			arrDataNull=true
		else
			arrDataNull=false
			arrData = rs1.getrows()
		end If
		


		SQL="select a.DPCD DPCD,b.refnm BUSEONM, a.JKWE JKWE,c.refnm JIKNM, a.NAME NAME,"
		SQL=SQL&"a.INNO INNO,a.HPNO HPNO,a.HOMENO HOMENO,a.EMAIL EMAIL"
		SQL=SQL&" from TBB060 a,("
		SQL=SQL&"		SELECT REFCD,REFNM"
		SQL=SQL&"		 FROM TBB150 WHERE  REFTP = 'Z1'"
		SQL=SQL&"		  AND REFCD <> '0000' AND    USEYN = 'Y'"
		SQL=SQL&"		  AND    REFCD <> 'Z00000'"
		SQL=SQL&"              ) b,"
		SQL=SQL&"              ("
		SQL=SQL&"		SELECT REFCD,REFNM"
		SQL=SQL&"		 FROM TBB150 WHERE  REFTP = 'Z4'"
		SQL=SQL&"		  AND REFCD <> '0000' AND    USEYN = 'Y'"
		SQL=SQL&"		  AND    REFCD <> 'Z00000'"
		SQL=SQL&"              ) c,"
		SQL=SQL&"              ("
		SQL=SQL&"		SELECT REFCD,REFNM"
		SQL=SQL&"		 FROM TBB150 WHERE  REFTP = 'Z6'"
		SQL=SQL&"		  AND REFCD <> '0000' AND    USEYN = 'Y'"
		SQL=SQL&"		  AND    REFCD <> 'Z00000'"
		SQL=SQL&"              ) d"
		SQL=SQL&" where a.DPCD = b.REFCD"
		SQL=SQL&"  and a.JKWE = c.REFCD(+)"
		SQL=SQL&"  and b.refnm = d.refnm"
		SQL=SQL&"  and a.dpcd like '%"& buseo &"%'"
		SQL=SQL&"  and a.JKWE like '%"& jkwe &"%'"
		SQL=SQL&"  and a.name like '%"& irum &"%'"
		SQL=SQL&"  and a.useyn = 'Y'"
		SQL=SQL&"  and c.refcd > '40'"
		SQL=SQL&"  order by d.refcd asc, a.JKWE asc"

		set rs2=server.createobject("adodb.recordset")
		rs2.CursorLocation = adUseClient
		rs2.open SQL,db,adOpenStatic, adLockOptimistic
		if rs2.eof then
			arrDataNull2=true
		else
			arrDataNull2=false
			arrData2 = rs2.getrows()
		end if
close_db


%>
				<TABLE width="940" border="1" align="center" cellpadding="0" cellspacing="0" bordercolorlight="#B5DCC9" bordercolordark="#ffffff">
				  <TR align="center"> 
					<TD width="38" height="22"  class="list2">no</TD>
					<TD width="115"  class="list2">부서</TD>
					<TD width="91"  class="list2">직위 </TD>
					<TD width="106"  class="list2">성명</TD>
					<TD width="72"  class="list2">내선번호</TD>
					<TD width="90"  class="list2">휴대폰</TD>
					<TD width="104"  class="list2">자택번호</TD>
					<TD width="166"  class="list2">E-Mail</TD>
				  </TR>
<% if arrDataNull And arrDataNull2 Then %>
				  <TR align="center"> 
					<TD height="20" colspan="8">자료가 없습니다.</TD>
				  </TR>
<%Else
z = 1
%>
	<% if Not arrDataNull Then %>
	<%for i=0 to ubound(arrData,2)%>
				  <TR align="center"> 
					<TD height="20"><%=i+1%></TD>
					<TD><%=ToEmptyString(arrData(1,i))%></TD>
					<TD><%=ToEmptyString(arrData(3,i))%></TD>
					<TD><%=ToEmptyString(arrData(4,i))%></TD>
					<TD><%=ToEmptyString(arrData(5,i))%></TD>
					<TD><%=ToEmptyString(arrData(6,i))%></TD>
					<TD><%=ToEmptyString(arrData(7,i))%></TD>
					<TD><%=ToEmptyString(arrData(8,i))%></TD>
				  </TR>
	<% 
	z = i + 2
	next %>
	<%End if%>
	
	<% if Not arrDataNull2 Then %>
	<%for i=0 to ubound(arrData2,2)%>
				  <TR align="center"> 
					<TD height="20"><%=z+i%></TD>
					<TD><%=ToEmptyString(arrData2(1,i))%></TD>
					<TD><%=ToEmptyString(arrData2(3,i))%></TD>
					<TD><%=ToEmptyString(arrData2(4,i))%></TD>
					<TD><%=ToEmptyString(arrData2(5,i))%></TD>
					<TD><%=ToEmptyString(arrData2(6,i))%></TD>
					<TD><%=ToEmptyString(arrData2(7,i))%></TD>
					<TD><%=ToEmptyString(arrData2(8,i))%></TD>
				  </TR>
	<% next %>
	<%End if%>
<%end if%>				  
				</TABLE>
				<br>


