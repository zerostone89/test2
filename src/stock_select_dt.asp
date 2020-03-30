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


	arrDataNull2 = true
	arrData2 = null
	Dim jData2
	Dim data2, arr_data2





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


	'일자별
	SQL = "  SELECT Z.SILDT , SUM(Z.T_SILQTY) T_SILQTY "
	SQL = SQL & " FROM ( "
	SQL = SQL & " SELECT A.SILDT , sum(A.SILQTY) T_SILQTY" 
	SQL = SQL & " FROM SUMIS.TBW110 A   " 
	SQL = SQL & "  WHERE  A.SILDT  in "&sildt&" "
	SQL = SQL & " AND A.VDCD   in (select vdcd from tbb040 where pcd = '"& pcd &"'  )  "
	SQL = SQL & " GROUP BY A.SILDT"  
	SQL = SQL & " UNION ALL "
	SQL = SQL & " SELECT A.SILDT , sum(A.SILQTY) T_SILQTY" 
	SQL = SQL & " FROM SUSPC.TBW110 A   " 
	SQL = SQL & "  WHERE  A.SILDT  in "&sildt&" "
	SQL = SQL & " AND A.VDCD   in (select vdcd from tbb040 where pcd = '"& pcd &"'  )  "
	SQL = SQL & " GROUP BY A.SILDT"  
	SQL = SQL & " ) Z "
	SQL = SQL & " GROUP BY Z.SILDT " 
	set rs3=server.createobject("adodb.recordset")
	rs3.open SQL,db
	
	If rs3.eof Then	'검색결과 없음
		arrDataNull2 = true
		arrData2=null
	else
		arrDataNull2 = false
		arrData2 = rs3.getRows()

	end If




	close_db

if arrDataNull  Then 

	jObject("error") = "1"
	jObject("msg") ="조회 할 자료가 없습니다."
	jObject("sql")		= SQL	

	jObject.Flush
	Response.End
	
Else ' arrData not null	
	rowCount2 = ubound(arrData2, 2)
		
	'일자별
	ReDim arr_data2(rowCount2)
	For i = 0 To rowCount2
		Set data2 = jsObject()				
				data2("SILDT")	= arrData2(0, i)
				data2("DT_SILQTY")	= arrData2(1, i)

		Set arr_data2(i) = data2
	Next

	jData2 = toJSON(arr_data2)
	
	
	
	jObject("error")	= "0"
	jObject("msg")		= "조회 성공"
	jObject("data2")		= jData2
	jObject("sql")		= SQL	
	jObject.Flush
end If
%>