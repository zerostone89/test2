<!--#include virtual="/include/common.asp"-->
<!-- #include file="json2.asp" -->
<!-- #include file="JSON_2.0.4.asp" -->
<!-- #include file="JSON_UTIL_0.1.1.asp" -->
<%g_loginCheck%>
<!--'#include virtual="/sang/include/xinc/design.asp"-->
<%

   Response.Expires = 0
   Response.AddHeader "Pragma", "no-cache" 
   Response.AddHeader "cache-control", "no-store" 
   Response.CharSet = "euc-kr"
   Response.ContentType = "text/html;charset=euc-kr"

	Dim jObject
	Set jObject = jsObject()
	dpcd   = trim(Session("DPCD"))
	day1   = Mid(Trim(request("day1")),1,4)&Mid(Trim(request("day1")),6,2)&Mid(Trim(request("day1")),9,2)   
	day2   = Mid(Trim(request("day2")),1,4)&Mid(Trim(request("day2")),6,2)&Mid(Trim(request("day2")),9,2)
	outyn  = Trim(request("outyn"))
	barcode = Trim(request("barcode"))
	confirm_from = Mid(Trim(request("confirm_from")),1,4)&Mid(Trim(request("confirm_from")),6,2)&Mid(Trim(request("confirm_from")),9,2)   
	confirm_to = Mid(Trim(request("confirm_to")),1,4)&Mid(Trim(request("confirm_to")),6,2)&Mid(Trim(request("confirm_to")),9,2) 

	arrDataNull = true
	arrData = null
	Dim jData
	Dim data, arr_data
	open_db


	SQL = "  SELECT Z.WHCD , Z.WHNM ,Z.OUTNO ,  Z.OUTDT , Z.OUTQTY , Z.REMARK  "
	SQL = SQL & "  FROM (  "
	SQL = SQL & " SELECT A.WHCD ,B.WHNM , A.OUTNO , A.OUTDT ,sum(A.OUTQTY) OUTQTY ,MAX(A.REMARK) REMARK  "
	SQL = SQL & " FROM TBW030 A , TBB100 B  "
	SQL = SQL & " WHERE A.WHCD = B.WHCD  "
	SQL = SQL & " AND A.OUTDT  BETWEEN  '"&day1&"' AND '"&day2&"' " 
	SQL = SQL & " AND A.VDCD ='"&dpcd&"' "
	SQL = SQL & " and A.CBGU ='2' "
	SQL = SQL & "  AND B.WHCD NOT IN ('S1100')  "
	SQL = SQL & "  GROUP BY A.WHCD , B.WHNM , A.OUTNO ,  A.OUTDT  )Z"
	SQL = SQL & "  ORDER BY Z.OUTDT , Z.OUTNO " 
	set rs=server.createobject("adodb.recordset")
	rs.open SQL,db

	If rs.eof Then	'검색결과 없음
		arrDataNull = true
		arrData=null
	else
		arrDataNull = false
		arrData = rs.getRows()

	end If

	
	SQL = " SELECT sum(A.OUTQTY) OUTQTY  " 
	SQL = SQL & " FROM TBW030 A , TBB100 B   " 
	SQL = SQL & "  WHERE A.WHCD = B.WHCD  "  
	SQL = SQL & " AND A.OUTDT  BETWEEN  '"&day1&"' AND '"&day2&"' " 
	SQL = SQL & " AND A.VDCD ='"&dpcd&"' "
	SQL = SQL & " and A.CBGU ='2' "
	SQL = SQL & "  AND B.WHCD NOT IN ('S1100')  "
	set rs1=server.createobject("adodb.recordset")
	rs1.open SQL,db
	
	If rs1.eof Then	'검색결과 없음
		
	else
		T_OUTQTY = rs1("OUTQTY")

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
			Set data = jsObject()				
			data("WHCD")		= arrData(0, i)
			data("WHNM")		= arrData(1, i)
			data("OUTNO")		= arrData(2, i)
			data("OUTDT")		= arrData(3, i)
			data("OUTQTY")		= arrData(4, i)
			data("REMARK")		= arrData(5, i)

		Set arr_data(i) = data
	Next

	jData = toJSON(arr_data)

	
	jObject("error")	= "0"
	jObject("msg")		= "조회 성공"
	jObject("data")		= jData	
	jObject("sql")		= SQL	
	jObject("T_OUTQTY") = T_OUTQTY
	jObject.Flush
end If
%>