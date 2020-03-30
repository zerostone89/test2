<!--#include virtual="/include/common.asp"-->
<!-- #include file="json2.asp" -->
<!-- #include file="JSON_2.0.4.asp" -->
<!-- #include file="JSON_UTIL_0.1.1.asp" -->
<!--METADATA TYPE="Typelib" NAME="ADODB Type Library"
	FILE="C:\Program Files\Common Files\System\ado\msado15.dll"-->
<%g_loginCheck%>
<%

	Response.Expires = 0
	Response.AddHeader "Pragma", "no-cache" 
	Response.AddHeader "cache-control", "no-store" 
	Response.CharSet = "euc-kr"
	Response.ContentType = "text/html;charset=euc-kr"

	Dim items, jArray
	Dim jObject
	Set jObject = jsObject()
	
	dpcd = trim(Session("DPCD"))
	items = Trim(Request("items"))	
	chk	   = Trim(request("chk"))
	barcode = Trim(request("barcode"))

	Set jArray = json.parse(items)
	arrLeng = jArray.length
	sildt = ""
	area = "" 
	j = 0
	Dim errorcheck :errorcheck= 0

open_db
	On Error Resume Next
	db.BeginTrans 
	maxseq = 0		
	
	For i = 0 To jArray.length - 1

			sildt = sildt&"'"&Trim(CStr(jArray.Get(i).sildt))&"',"
			area = area&"'"&Trim(unescape(CStr(jArray.Get(i).area_remark)))&"',"
				
	Next
	
	sildt = Mid(sildt,1,Len(sildt)-1)
	sildt = "("&sildt&")" 
	
	area = Mid(area,1,Len(area)-1)
	area = "("&area&")" 

	SQL = " SELECT  SEQ , STYCD , COLCD , SIZECD , SILQTY , TAG  , sildt , AREA"
	SQL = SQL & " FROM TBW110 "
	SQL = SQL & " WHERE SILDT in  "&sildt&" " 
	SQL = SQL & " AND VDCD ='"&dpcd&"' "
	SQL = SQL & " AND AREA in "&area&" " 
	If chk = "1" And barcode <> "" Then 
	SQL = SQL & " AND STYCD = '"&barcode&"' "
	ElseIf chk = "2"And barcode <> ""  Then 	
	SQL = SQL & " AND COLCD = '"&barcode&"' "
	ElseIf chk ="3"And barcode <> ""  Then	
	SQL = SQL & " AND SIZECD = '"&barcode&"' "
	End If 
	SQL = SQL & " ORDER BY sildt , SEQ  "
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
				data("SEQ")		= arrData(0, i)
				data("STYCD")	= arrData(1, i)
				data("COLCD")	= arrData(2, i)
				data("SIZECD")	= arrData(3, i)
				data("SILQTY")	= arrData(4, i)
				data("TAG")		= arrData(5, i)
				data("SILDT")	= arrData(6, i)
				data("AREA")	= arrData(7, i)

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