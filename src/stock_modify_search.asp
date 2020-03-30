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
	pcd   = trim(Session("PCD"))
	dpcd   = trim(Session("DPCD"))
	day1   = Trim(request("day1"))
	chk	   = Trim(request("chk")) 
	barcode = Trim(request("barcode"))
	tb_area = unescape(request("tb_area"))
	s_vdcd = Trim(request("s_vdcd"))
	arrDataNull = true
	arrData = null
	Dim jData
	Dim data, arr_data
	open_db


	SQL = " SELECT SEQ , STYCD , COLCD , SIZECD , SILQTY , TAG , NVL(AREA,' ') AREA ,SPC_CHK , vdcd"
	SQL = SQL & " FROM ( " 
	SQL = SQL & " SELECT SEQ , STYCD , COLCD , SIZECD , SILQTY , TAG , NVL(AREA,' ') AREA ,SPC_CHK , vdcd"
	SQL = SQL & " FROM TBW110 "
	SQL = SQL & " WHERE SILDT =  '"&day1&"'" 
	If tb_area <> "" Then 
	SQL = SQL & " AND AREA = '"&tb_area&"' " 
	End If 
	SQL = SQL & " AND VDCD  in (select vdcd from sumis.tbb040 where pcd = '"&pcd&"' )"
	SQL = SQL & " UNION ALL "	
	SQL = SQL & " SELECT SEQ , STYCD , COLCD , SIZECD , SILQTY , TAG , NVL(AREA,' ') AREA ,SPC_CHK , vdcd"
	SQL = SQL & " FROM SUSPC.TBW110 "
	SQL = SQL & " WHERE SILDT =  '"&day1&"'" 
	If tb_area <> "" Then 
	SQL = SQL & " AND AREA = '"&tb_area&"' " 
	End If 
	SQL = SQL & " AND VDCD  in (select vdcd from sumis.tbb040 where pcd = '"&pcd&"' )"
	SQL = SQL & " ) " 
	If chk = "1" And barcode <> "" Then 
	SQL = SQL & " WHERE STYCD = '"&barcode&"' "
	ElseIf chk = "2"And barcode <> ""  Then 	
	SQL = SQL & " WHERE COLCD = '"&barcode&"' "
	ElseIf chk ="3"And barcode <> ""  Then	
	SQL = SQL & " WHERE SIZECD = '"&barcode&"' "
	End If 	
	SQL = SQL & " ORDER BY AREA , SPC_CHK , SEQ  "
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
				data("STYCD")		= arrData(1, i)
				data("COLCD")		= arrData(2, i)
				data("SIZECD")		= arrData(3, i)
				data("SILQTY")		= arrData(4, i)
				data("TAG")			= arrData(5, i)
				data("AREA")			= arrData(6, i)
				data("SPC_CHK")			= arrData(7, i)
				data("S_VDCD")			= arrData(8, i)

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