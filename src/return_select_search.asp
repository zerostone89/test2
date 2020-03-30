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
	select_brcd		= Trim(request("select_brcd"))
	select_year		= Trim(request("select_year"))
	select_season   = Trim(request("select_season"))
	select_sex		= Trim(request("select_sex"))
	select_itype	= Trim(request("select_itype"))
	select_item		= Trim(request("select_item"))
	sales3_spcchk	= Trim(request("sales3_spcchk"))
	chk = Trim(request("chk"))
	chk1 = Trim(request("chk1"))
	chk2 = Trim(request("chk2"))
	chk3 = Trim(request("chk3"))
	chk4 = Trim(request("chk4"))
	chk5 = Trim(request("chk5"))
	chk6 = Trim(request("chk6"))
	Set jArray = json.parse(items)
	arrLeng = jArray.length
	ordt = ""
	orno = ""
	j = 0
	Dim errorcheck :errorcheck= 0

open_db
	On Error Resume Next
	db.BeginTrans 
	maxseq = 0		
	
	For i = 0 To jArray.length - 1

			ordt = ordt&"'"&CStr(jArray.Get(i).ordt)&"',"
			orno = orno&"'"&CStr(jArray.Get(i).orno)&"',"
				
	Next
	
	ordt = Mid(ordt,1,Len(ordt)-1)
	ordt = "("&ordt&")" 

	orno = Mid(orno,1,Len(orno)-1)
	orno = "("&orno&")" 

	SQL = " SELECT Z.WHCD , Z.WHNM , Z.SALEGU , Z.REFSNM , Z.ORDT ,  Z.STYCD , Z.COLCD , Z.SIZECD , "
	SQL = SQL & " SUM(Z.REQQTY) , SUM(Z.CFQTY) , MAX(Z.OUTPRI) , MAX(SUPPRI) ,  MAX(Z.OUTYN) , MAX(Z.OUTDT) , MAX(Z.ORNO) , MAX(BOXNO)"
	SQL = SQL & " FROM ("
	SQL = SQL & " SELECT A.WHCD WHCD,B.WHNM WHNM,A.SALEGU SALEGU,C.REFSNM REFSNM,  "
	SQL = SQL & "  A.ORDT ORDT,A.SEQ SEQ,A.STYCD STYCD,A.COLCD COLCD, "
	SQL = SQL & "  A.SIZECD SIZECD,A.REQQTY REQQTY,A.CFQTY CFQTY,A.OUTPRI OUTPRI,A.SUPPRI SUPPRI,A.OUTYN OUTYN, "
	SQL = SQL & " NVL(substr((select MAX(outdt) from tbw030 where outdt=A.outdt and outno=A.outno),0,8),' ') outdt, a.orno , NVL(A.BOXNO,'박스없음') BOXNO "
	SQL = SQL & " FROM  TBW010 A,(Select WHCD,WHNM From TBB100) B , "
	SQL = SQL & "  ( SELECT REFCD, REFSNM FROM TBB150 WHERE  REFTP = 'S2'  AND   REFCD <> '0000'  AND REFCD <> '0000'  AND USEYN = 'Y') C " 
	SQL = SQL & "  WHERE  A.WHCD = B.WHCD "
	SQL = SQL & " AND  A.SALEGU = C.REFCD "
	SQL = SQL & " AND A.ORDT in "&ordt&" "
	SQL = SQL & " AND A.VDCD ='"&dpcd&"' "
	SQL = SQL & " AND A.ORNO in "&orno&" "
	SQL = SQL & " )Z  "

	SQL = SQL & " GROUP BY  Z.WHCD , Z.WHNM , Z.SALEGU , Z.REFSNM , Z.ORDT , Z.STYCD , Z.COLCD , Z.SIZECD "
	SQL = SQL & " ORDER BY Z.ORDT ASC "
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
		
				data("WHCD")		= arrData(0, i)
				data("WHNM")		= arrData(1, i)
				data("SALEGU")		= arrData(2, i)
				data("REFSNM")		= arrData(3, i)
				data("ORDT")		= arrData(4, i)
				data("STYCD")		= arrData(5, i)
				data("COLCD")		= arrData(6, i)
				data("SIZECD")		= arrData(7, i)
				data("REQQTY")		= arrData(8, i)
				data("CFQTY")		= arrData(9, i)
				data("OUTPRI")		= arrData(10, i)
				data("SUPPRI")		= arrData(11, i)
				data("OUTYN")		= arrData(12, i)
				data("OUTDT")		= arrData(13, i)
				data("ORNO")		= arrData(14, i)
				data("BOXNO")		= arrData(15, i)

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