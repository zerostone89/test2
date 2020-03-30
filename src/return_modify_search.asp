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
	Dim items, jArray
	Dim jObject
	Set jObject = jsObject()
	dpcd   = trim(Session("DPCD"))
	'day1   = Trim(request("day1"))
	'orno   = Trim(request("orno"))	
	items = Trim(Request("items"))
	chk = Trim(request("chk"))
	arrDataNull = true
	arrData = null
	Dim jData
	Dim data, arr_data

	
	Set jArray = json.parse(items)
	arrLeng = jArray.length
	ordt = ""
	orno = ""

	open_db


	For i = 0 To jArray.length - 1

				ordt = ordt&"'"&Trim(CStr(jArray.Get(i).ordt))&"',"
			orno = orno&"'"&Trim(CStr(jArray.Get(i).orno))&"',"
				
	Next
	
	ordt = Mid(ordt,1,Len(ordt)-1)
	ordt = "("&ordt&")" 

	orno = Mid(orno,1,Len(orno)-1)
	orno = "("&orno&")" 

	SQL = " SELECT A.WHCD WHCD,B.WHNM WHNM,A.SALEGU SALEGU,C.REFSNM REFSNM,  "
	SQL = SQL & "  A.ORDT ORDT,A.SEQ SEQ,A.STYCD STYCD,A.COLCD COLCD, "
	SQL = SQL & "  A.SIZECD SIZECD,A.REQQTY REQQTY,A.CFQTY CFQTY,A.OUTPRI OUTPRI,A.SUPPRI SUPPRI,A.OUTYN OUTYN, "
	SQL = SQL & " NVL(substr((select MAX(outdt) from tbw030 where outdt=A.outdt and outno=A.outno),0,8),' ') outdt, a.orno , NVL(A.BOXNO,'박스없음') BOXNO , ROWNUM ROWSEQ ,"
	SQL = SQL & " (case when a.outno ='C' then substr(a.updtime,1,8) when length(a.outno) > '1' then substr(a.updtime,1,8)  else 'N' end ) outno  " 
	SQL = SQL & " FROM  TBW010 A,(Select WHCD,WHNM From TBB100) B , "
	SQL = SQL & "  ( SELECT REFCD, REFSNM FROM TBB150 WHERE  REFTP = 'S2'  AND   REFCD <> '0000'  AND REFCD <> '0000'  AND USEYN = 'Y') C " 
	SQL = SQL & "  WHERE  A.WHCD = B.WHCD "
	SQL = SQL & " AND  A.SALEGU = C.REFCD "
	SQL = SQL & " AND A.ORDT  in "&ordt&" "
	SQL = SQL & " AND A.VDCD ='"&dpcd&"' "
	SQL = SQL & " AND A.ORNO  in "&orno&" "
	If chk ="1" Then 
	SQL = SQL & " AND A.ORGU ='8' "
	Else
	SQL = SQL & " AND A.ORGU = 'M' "
	End If 
	SQL = SQL & " ORDER BY A.ORDT ASC,A.ORNO ASC,A.WHCD ASC,A.SEQ Asc "
	set rs=server.createobject("adodb.recordset")
	rs.open SQL,db

	If rs.eof Then	'검색결과 없음
		arrDataNull = true
		arrData=null
	else
		arrDataNull = false
		arrData = rs.getRows()

	end If

	SQL = " SELECT SUM(REQQTY) T_REQQTY , SUM(CFQTY) T_CFQTY " 
	SQL = SQL & " FROM ( " 
	SQL = SQL & "  SELECT REQQTY , (CASE WHEN OUTYN ='N' THEN 0 ELSE CFQTY END )CFQTY "  
	SQL = SQL & " FROM TBW010 "
	SQL = SQL & "  WHERE  ORDT  in "&ordt&" "
	SQL = SQL & " AND VDCD ='"&dpcd&"' "
	SQL = SQL & " AND ORNO  in "&orno&") "
	set rs1=server.createobject("adodb.recordset")
	rs1.open SQL,db
	
	If rs1.eof Then	'검색결과 없음
		
	else
		T_REQQTY = rs1("T_REQQTY")
		T_CFQTY  = rs1("T_CFQTY")

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
				data("REQQTY")		= arrData(9, i)
				data("CFQTY")		= arrData(10, i)
				data("OUTPRI")		= arrData(11, i)
				data("SUPPRI")		= arrData(12, i)
				data("OUTYN")		= arrData(13, i)
				data("OUTDT")		= arrData(14, i)
				data("ORNO")		= arrData(15, i)
				data("BOXNO")		= arrData(16, i)
				data("ROWSEQ")		= arrData(17, i)
				data("OUTNO")		= arrData(18, i)'도착상황

		Set arr_data(i) = data
	Next

	jData = toJSON(arr_data)

	
	jObject("error")	= "0"
	jObject("msg")		= "조회 성공"
	jObject("data")		= jData	
	jObject("T_REQQTY")		= T_REQQTY	
	jObject("T_CFQTY")		= T_CFQTY
	jObject("sql")		= SQL	
	jObject.Flush
end If
%>