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
	day1   = Trim(request("day1"))
	orno   = Trim(request("orno"))
	
	items = Trim(Request("items"))
	Set jArray = json.parse(items)
	arrLeng = jArray.length
	ordt = ""
	orno = ""


	Dim items, jArray
	arrDataNull = true
	arrData = null
	Dim jData
	Dim data, arr_data
	open_db

	For i = 0 To jArray.length - 1

			ordt = ordt&"'"&Trim(CStr(jArray.Get(i).ordt))&"',"
			orno = orno&"'"&Trim(CStr(jArray.Get(i).orno))&"',"
				
	Next
	
	ordt = Mid(ordt,1,Len(ordt)-1)
	ordt = "("&ordt&")" 

	orno = Mid(orno,1,Len(orno)-1)
	orno = "("&orno&")" 


	SQL="SELECT A.WHCD WHCD,B.WHNM WHNM,A.SALEGU SALEGU,C.REFSNM REFSNM,"
	SQL=SQL&" A.OUTDT OUTDT,A.SEQ SEQ,A.STYCD STYCD,A.COLCD COLCD,"
	SQL=SQL&" A.SIZECD SIZECD,A.OUTQTY OUTQTY,A.OUTPRI OUTPRI,A.SUPPRI SUPPRI,A.REMARK REMARK  "
	SQL=SQL&" FROM  TBW030 A,(Select WHCD,WHNM From TBB100 WHERE WHCD  NOT IN ('S1100')) B, "
	'------S1100 제외하도록 수정 소병준 2011년 6월 9일 
	SQL=SQL&" ( SELECT REFCD,REFSNM  FROM TBB150  WHERE  REFTP = 'S2'  AND   REFCD <> '0000'  AND USEYN = 'Y') C "
	SQL=SQL&" WHERE  A.WHCD = B.WHCD"
	SQL=SQL&"  AND  A.SALEGU = C.REFCD"
	SQL=SQL&"  AND  A.VDCD = '"& dpcd &"'"
	SQL=SQL&"  AND  A.CBGU = '2'"
	SQL=SQL&"  AND  A.OUTDT  in "&ordt&" "
	SQL=SQL&"  AND  A.OUTNO  in "&orno&" "
	SQL=SQL&"    ORDER BY A.OUTDT ASC,A.WHCD ASC,A.OUTNO ASC,A.SEQ ASC"
	set rs=server.createobject("adodb.recordset")
	rs.open SQL,db

	If rs.eof Then	'검색결과 없음
		arrDataNull = true
		arrData=null
	else
		arrDataNull = false
		arrData = rs.getRows()

	end If
	
	SQL=" SELECT SUM(A.OUTQTY) OUTQTY "
	SQL=SQL&" FROM  TBW030 A"
	SQL=SQL&" WHERE A.VDCD = '"& dpcd &"'"
	SQL=SQL&"  AND  A.CBGU = '2'"
	SQL=SQL&"  AND  A.OUTDT  in "&ordt&" "
	SQL=SQL&"  AND  A.OUTNO  in "&orno&" "
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
				data("WHCD")		= arrData(0, i)
				data("WHNM")		= arrData(1, i)
				data("SALEGU")		= arrData(2, i)
				data("REFSNM")		= arrData(3, i)
				data("ORDT")		= arrData(4, i)
				data("SEQ")			= arrData(5, i)
				data("STYCD")		= arrData(6, i)
				data("COLCD")		= arrData(7, i)
				data("SIZECD")		= arrData(8, i)
				data("OUTQTY")		= arrData(9, i)
				data("OUTPRI")		= arrData(10, i)
				data("SUPPRI")		= arrData(11, i)
				data("REMARK")		= arrData(12, i)

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