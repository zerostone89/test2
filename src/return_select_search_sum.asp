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
	'sales3_spcchk	= Trim(request("sales3_spcchk"))
	chk = Trim(request("chk"))
	chk1 = Trim(request("chk1"))
	chk2 = Trim(request("chk2"))
	chk3 = Trim(request("chk3"))
	chk4 = Trim(request("chk4"))
	chk5 = Trim(request("chk5"))
	'chk6 = Trim(request("chk6"))
	
	radiochk	   = Trim(request("radiochk"))
	barcode = Trim(request("barcode"))
	
	from_dt = Trim(request("from_dt"))
	to_dt   = Trim(request("to_dt"))
	confirm_from = Mid(Trim(request("confirm_from")),1,4)&Mid(Trim(request("confirm_from")),6,2)&Mid(Trim(request("confirm_from")),9,2)   
	confirm_to = Mid(Trim(request("confirm_to")),1,4)&Mid(Trim(request("confirm_to")),6,2)&Mid(Trim(request("confirm_to")),9,2) 
	
	chk_gb = Trim(request("chk_gb"))

	If Len(from_dt) > 8 Then 
		from_dt = Mid(from_dt,1,4)&Mid(from_dt,6,2)&Mid(from_dt,9,2)   
	End If 
	If Len(to_dt) > 8 Then 
		to_dt = Mid(to_dt,1,4)&Mid(to_dt,6,2)&Mid(to_dt,9,2)   
	End If 

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
	
	'For i = 0 To jArray.length - 1
	'		ordt = ordt&"'"&CStr(jArray.Get(i).ordt)&"',"
	'		orno = orno&"'"&CStr(jArray.Get(i).orno)&"',"
	'Next
	
	'ordt = Mid(ordt,1,Len(ordt)-1)
	'ordt = "("&ordt&")" 

	'orno = Mid(orno,1,Len(orno)-1)
	'orno = "("&orno&")" 

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
	SQL = SQL & " AND A.ORDT between '"&from_dt&"' and '"&to_dt&"' "
	If Len(confirm_from) > 0 And  Len(confirm_to) > 0  Then 
	SQL = SQL & " AND A.OUTDT BETWEEN '"&confirm_from&"' AND '"&confirm_to&"' " 
	End If 
	SQL = SQL & " AND A.VDCD ='"&dpcd&"' "
	'SQL = SQL & " AND A.ORNO in "&orno&" "	
	If chk_gb = "1" Then '성남반품
	SQL = SQL & " AND A.ORGU ='8' AND A.CBGU ='2' AND A.ORSEQ ='0' "
	ElseIf chk_gb ="2" Then '이천반품	
	SQL = SQL & " AND A.ORGU ='M' AND A.CBGU ='2' AND A.ORSEQ ='9' "
	End If 
	If chk = "brand" And select_brcd <> "%" Then 
	SQL = SQL & "  and A.brcd = '" & select_brcd & "'" 
	End If 
	If chk1 = "year" And select_year <> "%" Then 
	SQL = SQL & "  and A.year = '" & select_year & "'" 
	End If 
	If chk2 = "season" And select_season <> "%" Then 
		If select_season = "5" Then 
	SQL = SQL & "  and A.season in('1','2') "
		ElseIf select_season ="6" Then 
	SQL = SQL & "  and A.season in('3','4') "
		else
	SQL = SQL & "  and A.season ='" & select_season & "'"
		End If 
	End If 
	If chk3 = "sex" And select_sex <> "%" Then 
	SQL = SQL & "  and A.brsex ='"&select_sex&"'"
	End If 
	If chk4 = "itype" And select_itype <> "%" Then 
	SQL = SQL & "  and A.itype ='"&select_itype&"'"
	End If 
	If chk5 = "item" Then 
	SQL = SQL & "  and A.item  ='"&select_item&"'"
	End If 
	
	If radiochk = "1" And barcode <> "" Then 
	SQL = SQL & " AND A.STYCD = '"&barcode&"' "
	ElseIf radiochk = "2"And barcode <> ""  Then 	
	SQL = SQL & " AND A.COLCD = '"&barcode&"' "
	ElseIf radiochk ="3"And barcode <> ""  Then	
	SQL = SQL & " AND A.SIZECD = '"&barcode&"' "
	End If 
	'If chk6 = "spc_chk" Then 
	'SQL = SQL & "  and z.spc_chk  ='"&sales3_spcchk&"'"
	'End If 
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

	SQL = " SELECT SUM(REQQTY) T_REQQTY , SUM(CFQTY) T_CFQTY " 
	SQL = SQL & " FROM ( " 
	SQL = SQL & "  SELECT REQQTY , (CASE WHEN OUTYN ='N' THEN 0 ELSE CFQTY END )CFQTY "  
	SQL = SQL & " FROM TBW010 "
	SQL = SQL & "  WHERE  ORDT  between '"&from_dt&"' and '"&to_dt&"' "
	SQL = SQL & " AND VDCD ='"&dpcd&"' "
	'SQL = SQL & " AND ORNO  in "&orno&" "
	If chk_gb = "1" Then '성남반품
	SQL = SQL & " AND ORGU ='8' AND CBGU ='2' AND ORSEQ ='0' "
	ElseIf chk_gb ="2" Then '이천반품	
	SQL = SQL & " AND ORGU ='M' AND CBGU ='2' AND ORSEQ ='9' "
	End If 
	If Len(confirm_from) > 0 And  Len(confirm_to) > 0  Then 
	SQL = SQL & " AND OUTDT BETWEEN '"&confirm_from&"' AND '"&confirm_to&"' " 
	End If 

	If chk = "brand" Then 
	SQL = SQL & "  and brcd = '" & select_brcd & "'" 
	End If
	
	If chk1 = "year" Then 
	SQL = SQL & "  and year = '" & select_year & "'" 
	End If 

	If chk2 = "season" Then 
		If select_season = "5" Then 
	SQL = SQL & "  and season in('1','2') "
		ElseIf select_season ="6" Then 
	SQL = SQL & "  and season in('3','4') "
		else
	SQL = SQL & "  and season ='" & select_season & "'"
		End If 
	End If 

	If chk3 = "sex" Then 
	SQL = SQL & "  and brsex ='"&select_sex&"'"
	End If 

	If chk4 = "itype" Then 
	SQL = SQL & "  and itype ='"&select_itype&"'"
	End If 

	If chk5 = "item" Then 
	SQL = SQL & "  and item  ='"&select_item&"'"
	End If 
	
	If radiochk = "1" And barcode <> "" Then 
	SQL = SQL & " AND STYCD = '"&barcode&"' "
	ElseIf radiochk = "2"And barcode <> ""  Then 	
	SQL = SQL & " AND COLCD = '"&barcode&"' "
	ElseIf radiochk ="3"And barcode <> ""  Then	
	SQL = SQL & " AND SIZECD = '"&barcode&"' "
	End If 
	SQL = SQL & " ) "

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
	jObject("T_REQQTY")		= T_REQQTY	
	jObject("T_CFQTY")		= T_CFQTY
	jObject.Flush
end If
%>