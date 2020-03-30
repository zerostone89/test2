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

	pcd = trim(Session("PCD"))
	dpcd = trim(Session("DPCD"))
	items = Trim(Request("items"))
	chk	   = Trim(request("chk"))
	barcode = Trim(request("barcode"))

	select_brcd		= Trim(request("select_brcd"))
	select_year		= Trim(request("select_year"))
	select_season   = Trim(request("select_season"))
	select_sex		= Trim(request("select_sex"))
	select_itype	= Trim(request("select_itype"))
	select_item		= Trim(request("select_item"))
	chk = Trim(request("chk"))
	chk1 = Trim(request("chk1"))
	chk2 = Trim(request("chk2"))
	chk3 = Trim(request("chk3"))
	chk4 = Trim(request("chk4"))
	chk5 = Trim(request("chk5"))

	radiochk	   = Trim(request("radiochk"))
	barcode = Trim(request("barcode"))


	arrDataNull4 = true
	arrData4 = null
	Dim jData4
	Dim data4, arr_data4





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

	Next

	sildt = Mid(sildt,1,Len(sildt)-1)
	sildt = "("&sildt&")"



	'아울렛 브랜드별
	SQL = " SELECT Z.BRCD , B.BRSNM , nvl(SUM(Z.SILQTY),0) T_SILQTY , nvl(SUM(Z.JEGO),0) T_JEGO"
	SQL = SQL & " FROM( "
	SQL = SQL & "  SELECT A.BRCD , A.SILQTY , SUSPC.UF_STOCK_VSCZ_C('"&dpcd&"', A.STYCD, A.COLCD, A.SIZECD, A.SILDT, '1') JEGO "
	SQL = SQL & " FROM SUSPC.TBW110 A"
	SQL = SQL & "  WHERE  A.SILDT  in "&sildt&" "
	SQL = SQL & " AND A.VDCD   in (select vdcd from tbb040 where pcd = '"& pcd &"'  )  "
	SQL = SQL & " )Z , TBB030 B "
	SQL = SQL & " WHERE Z.BRCD = B.BRCD "
	SQL = SQL & " GROUP BY Z.BRCD, B.BRSNM  "

	set rs4=server.createobject("adodb.recordset")
	rs4.open SQL,db

	If rs4.eof Then	'검색결과 없음
		arrDataNull4 = true
		arrData4=null
	else
		arrDataNull4 = false
		arrData4 = rs4.getRows()

	end If



	close_db

if arrDataNull4  Then

	jObject("error") = "1"
	jObject("msg") ="조회 할 자료가 없습니다."
	jObject("sql")		= SQL

	jObject.Flush
	Response.End

Else ' arrData not null
	rowCount4 = ubound(arrData4, 2)

	'아울렛 브랜드별
	ReDim arr_data4(rowCount4)
	For i = 0 To rowCount4
		Set data4 = jsObject()
				data4("BRCD")	= arrData4(0, i)
				data4("BRSNM")	= arrData4(1, i)
				data4("T_SILQTY")	= arrData4(2, i)
				data4("T_JEGO")	= arrData4(3, i)
		Set arr_data4(i) = data4
	Next

	jData4 = toJSON(arr_data4)



	jObject("error")	= "0"
	jObject("msg")		= "조회 성공"
	jObject("data4")		= jData4
	jObject("sql")		= SQL
	jObject.Flush
end If
%>
