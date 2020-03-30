<!--METADATA TYPE="Typelib" NAME="ADODB Type Library"
FILE="c:\Program Files\Common Files\System\ado\msado15.dll"-->
<!--#include virtual="/include/common.asp"-->
<%g_loginCheck%>
<!-- #include file="json2.asp"-->
<!-- #include file="JSON_2.0.4.asp"-->
<!-- #include file="JSON_UTIL_0.1.1.asp"-->
<!--#include virtual="/include/xinc/design.asp"-->
<%
	
	Response.Expires = 0
	Response.AddHeader "Pragma", "no-cache" 
	Response.AddHeader "cache-control", "no-store" 
	Response.CharSet = "euc-kr"
	Response.ContentType = "text/html;charset=euc-kr"
   
   dim f1,Rs,SQL,keyword
   chk    = trim(Request("chk"))
   dpcd   = trim(Session("DPCD"))			'정상DPCD
   pcd	  = Trim(Session("PCD"))
   BRAND  = trim(Session("BRAND"))
   keyword= trim(Request("barcd"))
	Dim jObject
	Set jObject = jsObject()
  
	   
	open_dbo

                
	SQL = "select count(*) cnt "
	SQL = SQL & "from TBW010"
	SQL = SQL & " where BOXNO = '"& Ucase(keyword) &"'"
	set rs=server.createobject("adodb.recordset")
	rs.open SQL,db

	If rs.eof Then	'검색결과 없음
		arrDataNull = true
		arrData=null
	else
		arrDataNull = false
		arrData = rs.getRows()

	end If

	

	close_db

if arrDataNull  Then 

	jObject("error") = "1"
	jObject("msg") ="조회 할 자료가 없습니다."
	jObject("sql")		= SQL	

	jObject.Flush
	Response.End
	
Else ' arrData not null	
	rowCount = ubound(arrData, 2)
	
	'jObject("msg1")		="rowCount: "& rowCount &" rowCount1 :"&rowCount1 & " rowTot :" &rowTot 
	
	ReDim arr_data(rowCount)
	For i = 0 To rowCount
		Set data = jsObject()				
				data("CNT")		= arrData(0, i)

		Set arr_data(i) = data
	Next

	jData = toJSON(arr_data)

	
	jObject("error")	= "0"
	jObject("msg")		= "조회 성공"
	jObject("data")		= jData	
	jObject("sql")		= SQL	
	jObject.Flush
end If
%>