<!--#include virtual="/include/common.asp"-->
<!-- #include file="json2.asp" -->
<!-- #include file="JSON_2.0.4.asp" -->
<!-- #include file="JSON_UTIL_0.1.1.asp" -->
<%g_loginCheck%>
<!--'#include virtual="/include/xinc/design.asp"-->
<%

   Response.Expires = 0
   Response.AddHeader "Pragma", "no-cache" 
   Response.AddHeader "cache-control", "no-store" 
   Response.CharSet = "euc-kr"
   Response.ContentType = "text/html;charset=euc-kr"

	
	dpcd   = trim(Session("DPCD"))
	Dim jObject
	Set jObject = jsObject()
	selectoption = Trim(request("selectoption"))
	select_itype = Trim(request("select_itype"))
arrDataNull = true
arrData = null

open_db
		
	If selectoption = "shopmanager" Then 
	sql=" select seq , name from shopmanager "
    sql=sql&" where vdcd ='"&dpcd&"' "
	sql=sql&" order by seq "
	End If 

	


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

	jObject.Flush
	Response.End
	
Else ' arrData not null	
	rowCount = ubound(arrData, 2)
	
	'jObject("msg1")		="rowCount: "& rowCount &" rowCount1 :"&rowCount1 & " rowTot :" &rowTot 
	Dim jData
	Dim data, arr_data
	ReDim arr_data(rowCount)
	For i = 0 To rowCount
		Set data = jsObject()
				data("REFCD")		= arrData(0, i)
				data("REFNM")		= arrData(1, i)

		Set arr_data(i) = data
	Next

	jData = toJSON(arr_data)
	jObject("error")	= "0"
	jObject("msg")		= select_itype
	jObject("data")		= jData	
	jObject.Flush
end If
%>