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
	day1   = Mid(Trim(request("day1")),1,4)&Mid(Trim(request("day1")),6,2)&Mid(Trim(request("day1")),9,2)   
	day2   = Mid(Trim(request("day2")),1,4)&Mid(Trim(request("day2")),6,2)&Mid(Trim(request("day2")),9,2)

	stock_tag = Trim(request("stock_tag"))
	search_area	= unescape(Trim(request("search_area")))
	search_from	= Mid(Trim(request("search_from")),1,4)&Mid(Trim(request("search_from")),6,2)&Mid(Trim(request("search_from")),9,2)   
	search_to	= Mid(Trim(request("search_to")),1,4)&Mid(Trim(request("search_to")),6,2)&Mid(Trim(request("search_to")),9,2)   
	search_inuser	= unescape(Trim(request("search_inuser")))

	arrDataNull = true
	arrData = null
	Dim jData
	Dim data, arr_data
	open_db


	SQL = "  SELECT B.SILDT  , B.INTIME , B.INUSER , B.UPDTIME , B.UPDUSER , B.TAG , B.SILQTY ,  (case when b.chk  ='0' then b.area when b.chk ='1' then '합계' else '총합계'  end )  CHK1 , B.CHK  , B.VDCD "
	SQL = SQL & "  FROM ( " 
	SQL = SQL & "		 SELECT A.SILDT , MAX(A.INTIME)  INTIME, nvl(MAX(A.INUSER),'') INUSER , nvl(MAX(A.UPDTIME),'N') UPDTIME , nvl(MAX(A.UPDUSER),' ') UPDUSER ,  MAX(A.TAG) TAG , " 
	SQL = SQL & "		SUM(A.SILQTY) SILQTY , nvl(MAX(A.AREA),' ') AREA , GROUPING_ID (A.SILDT  , AREA ) CHK , MAX(A.VDCD) VDCD " 
	SQL = SQL & "		FROM (  " 
	SQL = SQL & "			SELECT SILDT  , INTIME , INUSER , UPDTIME , UPDUSER , TAG , SILQTY , AREA ,VDCD " 
	SQL = SQL & "			FROM TBW110  " 
	SQL = SQL & "			WHERE SILDT BETWEEN  '"&day1&"' AND '"&day2&"'" 
	SQL = SQL & "			AND VDCD  in (select vdcd from tbb040 where pcd = '"&pcd&"' )   " 
	SQL = SQL & "			AND TAG LIKE '%"&stock_tag&"%'"
	SQL = SQL & "			AND INUSER LIKE '%"&search_inuser&"%'"
	SQL = SQL & "			AND AREA LIKE '%"&search_area&"%'"
	If Len(search_from) > 0 And  Len(search_to) > 0  Then 
	SQL = SQL & "			AND SUBSTR((CASE WHEN LENGTH(UPDTIME) > 8 THEN UPDTIME ELSE INTIME END),1,8) BETWEEN '"&search_from&"' AND '"&search_to&"' "	
	End If 
	SQL = SQL & "			UNION ALL " 
	SQL = SQL & "			SELECT SILDT  , INTIME , INUSER , UPDTIME , UPDUSER , TAG , SILQTY , AREA  ,VDCD" 
	SQL = SQL & "			FROM SUSPC.TBW110  " 
	SQL = SQL & "			WHERE SILDT BETWEEN  '"&day1&"' AND '"&day2&"'" 
	SQL = SQL & "			AND VDCD  in (select vdcd from tbb040 where pcd = '"&pcd&"' )   " 	
	SQL = SQL & "			AND TAG LIKE '%"&stock_tag&"%'"
	SQL = SQL & "			AND INUSER LIKE '%"&search_inuser&"%'"
	SQL = SQL & "			AND AREA LIKE '%"&search_area&"%'"
	If Len(search_from) > 0 And  Len(search_to) > 0  Then 
	SQL = SQL & "			AND SUBSTR((CASE WHEN LENGTH(UPDTIME) > 8 THEN UPDTIME ELSE INTIME END),1,8) BETWEEN '"&search_from&"' AND '"&search_to&"' "	
	End If 
	SQL = SQL & "		 )A " 
	SQL = SQL & "		 GROUP BY ROLLUP (A.SILDT  , AREA)" 
	SQL = SQL & "	)B " 
	SQL = SQL & "  WHERE B.CHK IN(0,1) " 	
	SQL = SQL & "  ORDER BY  B.SILDT DESC  ,  B.CHK"
	set rs=server.createobject("adodb.recordset")
	rs.open SQL,db

	If rs.eof Then	'검색결과 없음
		arrDataNull = true
		arrData=null
	else
		arrDataNull = false
		arrData = rs.getRows()

	end If
	
	SQL = " SELECT SUM(SILQTY) T_SILQTY "
	SQL = SQL & "  FROM ( " 
	SQL = SQL & "  SELECT SILQTY " 
	SQL = SQL & "  FROM TBW110  " 
	SQL = SQL & "  WHERE SILDT BETWEEN  '"&day1&"' AND '"&day2&"'" 
	SQL = SQL & "  AND VDCD  in (select vdcd from tbb040 where pcd = '"&pcd&"' )  " 	
	SQL = SQL & "  AND TAG LIKE '%"&stock_tag&"%'"
	SQL = SQL & "  AND INUSER LIKE '%"&search_inuser&"%'"
	SQL = SQL & "  AND AREA LIKE '%"&search_area&"%'"
	If Len(search_from) > 0 And  Len(search_to) > 0  Then 
	SQL = SQL & "  AND SUBSTR((CASE WHEN LENGTH(UPDTIME) > 8 THEN UPDTIME ELSE INTIME END),1,8) BETWEEN '"&search_from&"' AND '"&search_to&"' "	
	End If 
	SQL = SQL & "  UNION ALL " 	
	SQL = SQL & "  SELECT SILQTY " 
	SQL = SQL & "  FROM SUSPC.TBW110  " 
	SQL = SQL & "  WHERE SILDT BETWEEN  '"&day1&"' AND '"&day2&"'" 
	SQL = SQL & "  AND VDCD  in (select vdcd from tbb040 where pcd = '"&pcd&"' )  " 
	SQL = SQL & "  AND TAG LIKE '%"&stock_tag&"%'"
	SQL = SQL & "  AND INUSER LIKE '%"&search_inuser&"%'"
	SQL = SQL & "  AND AREA LIKE '%"&search_area&"%'"
	If Len(search_from) > 0 And  Len(search_to) > 0  Then 
	SQL = SQL & "  AND SUBSTR((CASE WHEN LENGTH(UPDTIME) > 8 THEN UPDTIME ELSE INTIME END),1,8) BETWEEN '"&search_from&"' AND '"&search_to&"' "	
	End If 
	SQL = SQL & "  ) " 
	set rs1=server.createobject("adodb.recordset")
	rs1.open SQL,db
	
	If rs1.eof Then	'검색결과 없음
		
	else
		T_SILQTY = rs1("T_SILQTY")

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
				data("SILDT")		= arrData(0, i)
				data("INTIME")		= arrData(1,i)'Mid(arrData(1, i),1,4)&"-"& Mid(arrData(1, i),5,2)&"-"& Mid(arrData(1, i),7,2)&" " & Mid(arrData(1, i),9,2)&":" & Mid(arrData(1, i),11,2)
				data("INUSER")		= arrData(2, i)
				data("UPDTIME")		= arrData(3,i)'Mid(arrData(3, i),1,4)&"-"& Mid(arrData(3, i),5,2)&"-"& Mid(arrData(3, i),7,2)&" " & Mid(arrData(3, i),9,2)&":" & Mid(arrData(3, i),11,2)
				data("UPDUSER")		= arrData(4, i)
				data("TAG")			= arrData(5, i)
				data("SILQTY")      = arrData(6,i)
				data("AREA")		= arrData(7,i)
				data("CHK")		= arrData(8,i)
				data("S_VDCD")		= arrData(9,i)

		Set arr_data(i) = data
	Next

	jData = toJSON(arr_data)

	
	jObject("error")	= "0"
	jObject("msg")		= "조회 성공"
	jObject("data")		= jData	
	jObject("sql")		= SQL	
	jObject("T_SILQTY")		= T_SILQTY
	jObject.Flush
end If
%>