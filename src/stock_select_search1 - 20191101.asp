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

	arrDataNull = true
	arrData = null
	Dim jData
	Dim data, arr_data

	arrDataNull1 = true
	arrData1 = null
	Dim jData1
	Dim data1, arr_data1

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

	SQL = "    SELECT Z.STYCD , Z.COLCD , Z.SIZECD , SUM(Z.JEGO) JEGO , MAX(Z.COST) , SUM(Z.NMIQTY) , SUM(Z.NMOQTY) , SUM(SILQTY) "
 	SQL = SQL & "   FROM ( "
	SQL = SQL & "   SELECT A.SILDT , A.STYCD, A.COLCD, A.SIZECD, A.BRCD , A.YEAR , A.SEASON , A.BRSEX , A.ITEM , A.ITYPE ,  "
	SQL = SQL & "   SUMIS.F_GET_JEGO_STYCD_COLSZ ('"& dpcd &"', A.STYCD, A.COLCD, A.SIZECD, A.SILDT, '1') JEGO,          "
	SQL = SQL & "      (SELECT NVL(MAX(DECODE( '3' , '3', B.LAPRI, "
	SQL = SQL & "                               '2', B.ACOST, "
	SQL = SQL & "                                  '3', B.FIPRI,0 )),0)  "
	SQL = SQL & "    FROM TBB070 B "
	SQL = SQL & "  WHERE B.STYCD = A.STYCD AND ROWNUM = 1) COST,   "
	SQL = SQL & "  ( SELECT /*+ INDEX_DESC ( B IDX_TBS020_6) */ NVL(SUM(B.RTQTY),0) FROM SUMIS.TBS020 B  "
	SQL = SQL & "  WHERE B.RVDCD  =  '"& dpcd &"' AND B.STYCD  = A.STYCD AND B.COLCD  = A.COLCD AND B.SIZECD = A.SIZECD  "
	SQL = SQL & "         AND B.RTDT in  "&sildt&"   AND B.RTAG   = 'N' ) NMIQTY,  "
	SQL = SQL & "   ( SELECT /*+ INDEX_DESC ( B IDX_TBS020_5) */ NVL(SUM(B.RTQTY),0) FROM SUMIS.TBS020 B  "
	SQL = SQL & "      WHERE B.VDCD   =  '"& dpcd &"'  AND B.STYCD  = A.STYCD AND B.COLCD  = A.COLCD AND B.SIZECD = A.SIZECD  "
	SQL = SQL & "        AND B.RTDT in  "&sildt&"   AND B.RTAG   = 'N' ) NMOQTY , SUM(A.SILQTY) SILQTY  "
	SQL = SQL & "   FROM SUMIS.TBW110 A "
	SQL = SQL & "   WHERE A.SILDT    in  "&sildt&"  "
	SQL = SQL & "     AND A.VDCD   in (select vdcd from tbb040 where pcd = '"& pcd &"'  )     "
	SQL = SQL & "   GROUP BY A.SILDT ,  A.STYCD,A.COLCD,A.SIZECD ,A.BRCD , A.YEAR , A.SEASON , A.BRSEX , A.ITEM , A.ITYPE  "
	SQL = SQL & "  UNION ALL "
	SQL = SQL & "   SELECT A.SILDT , A.STYCD, A.COLCD, A.SIZECD, A.BRCD , A.YEAR , A.SEASON , A.BRSEX , A.ITEM , A.ITYPE ,  "
	SQL = SQL & "   SUSPC.UF_STOCK_VSCZ_C('"& dpcd &"', A.STYCD, A.COLCD, A.SIZECD, A.SILDT, '1') JEGO,          "
	SQL = SQL & "      (SELECT NVL(MAX(DECODE( '3' , '3', B.LAPRI, "
	SQL = SQL & "                               '2', B.ACOST, "
	SQL = SQL & "                                  '3', B.FIPRI,0 )),0)  "
	SQL = SQL & "    FROM TBB070 B "
	SQL = SQL & "  WHERE B.STYCD = A.STYCD AND ROWNUM = 1) COST,   "
	SQL = SQL & "  ( SELECT /*+ INDEX_DESC ( B IDX_TBS020_6) */ NVL(SUM(B.RTQTY),0) FROM SUSPC.TBS020 B  "
	SQL = SQL & "  WHERE B.RVDCD  =  '"& dpcd &"' AND B.STYCD  = A.STYCD AND B.COLCD  = A.COLCD AND B.SIZECD = A.SIZECD  "
	SQL = SQL & "         AND B.RTDT in  "&sildt&"   AND B.RTAG   = 'N' ) NMIQTY,  "
	SQL = SQL & "   ( SELECT /*+ INDEX_DESC ( B IDX_TBS020_5) */ NVL(SUM(B.RTQTY),0) FROM SUSPC.TBS020 B  "
	SQL = SQL & "      WHERE B.VDCD   =  '"& dpcd &"'  AND B.STYCD  = A.STYCD AND B.COLCD  = A.COLCD AND B.SIZECD = A.SIZECD  "
	SQL = SQL & "        AND B.RTDT in  "&sildt&"   AND B.RTAG   = 'N' ) NMOQTY , SUM(A.SILQTY) SILQTY  "
	SQL = SQL & "   FROM SUSPC.TBW110 A "
	SQL = SQL & "   WHERE A.SILDT    in  "&sildt&"  "
	SQL = SQL & "     AND A.VDCD   in (select vdcd from tbb040 where pcd = '"& pcd &"'  )     "
	SQL = SQL & "   GROUP BY A.SILDT ,  A.STYCD,A.COLCD,A.SIZECD  ,A.BRCD , A.YEAR , A.SEASON , A.BRSEX , A.ITEM , A.ITYPE "
 	SQL = SQL & "   ) Z "
	SQL = SQL & "   WHERE Z.SILDT IN "&sildt&" "
	If chk = "brand" And select_brcd <> "%" Then 
	SQL = SQL & "  AND Z.brcd = '" & select_brcd & "'" 
	End If 
	If chk1 = "year" Then 
	SQL = SQL & "  AND Z.year = '" & select_year & "'" 
	End If 
	If chk2 = "season"  And select_season <> "%" Then 
		If select_season = "5" Then 
	SQL = SQL & "  AND Z.season in('1','2') "
		ElseIf select_season ="6" Then 
	SQL = SQL & "  AND Z.season in('3','4') "
		else
	SQL = SQL & "  AND Z.season ='" & select_season & "'"
		End If 
	End If 
	If chk3 = "sex"  And select_sex <> "%" Then 
	SQL = SQL & "  AND Z.brsex ='"&select_sex&"'"
	End If 
	If chk4 = "itype"  And select_itype <> "%" Then 
	SQL = SQL & "  AND Z.itype ='"&select_itype&"'"
	End If 
	If chk5 = "item" Then 
	SQL = SQL & "  AND Z.item  ='"&select_item&"'"
	End If 
	If radiochk = "1" And barcode <> "" Then 
	SQL = SQL & " AND Z.STYCD = '"&barcode&"' "
	ElseIf radiochk = "2"And barcode <> ""  Then 	
	SQL = SQL & " AND Z.COLCD = '"&barcode&"' "
	ElseIf radiochk ="3"And barcode <> ""  Then	
	SQL = SQL & " AND Z.SIZECD = '"&barcode&"' "
	End If 
 	SQL = SQL & "  GROUP BY Z.STYCD,Z.COLCD,Z.SIZECD " 
 	SQL = SQL & "  ORDER BY Z.STYCD,Z.COLCD,Z.SIZECD " 
	set rs=server.createobject("adodb.recordset")
	rs.open SQL,db

	If rs.eof Then	'검색결과 없음
		arrDataNull = true
		arrData=null
	else
		arrDataNull = false
		arrData = rs.getRows()

	end If
	
	SQL = " SELECT SUM(J_SILQTY) J_SILQTY , SUM(O_SILQTY) O_SILQTY " 
	SQL = SQL & " FROM( " 
	SQL = SQL & "  SELECT SUM(SILQTY) J_SILQTY , 0 O_SILQTY "  
	SQL = SQL & " FROM SUMIS.TBW110 "
	SQL = SQL & "  WHERE  SILDT  in "&sildt&" "
	SQL = SQL & " AND VDCD   in (select vdcd from tbb040 where pcd = '"& pcd &"'  )  "
	SQL = SQL & " UNION ALL "
	SQL = SQL & "  SELECT 0 J_SILQTY , SUM(SILQTY) O_SILQTY "  
	SQL = SQL & " FROM SUSPC.TBW110 "
	SQL = SQL & "  WHERE  SILDT  in "&sildt&" "
	SQL = SQL & " AND VDCD in (select vdcd from tbb040 where pcd = '"& pcd &"'  )  "
	SQL = SQL & "  )"

	set rs1=server.createobject("adodb.recordset")
	rs1.open SQL,db
	
	If rs1.eof Then	'검색결과 없음
		
	else
		J_SILQTY = rs1("J_SILQTY")
		O_SILQTY  = rs1("O_SILQTY")

	end If
	

	'브랜드별
	SQL = " SELECT Z.BRCD , B.BRSNM , nvl(SUM(Z.SILQTY),0) T_SILQTY , nvl(SUM(Z.JEGO),0) T_JEGO" 
	SQL = SQL & " FROM( " 
	SQL = SQL & "  SELECT A.BRCD , A.SILQTY , SUMIS.F_GET_JEGO_STYCD_COLSZ ('"&dpcd&"', A.STYCD, A.COLCD, A.SIZECD, A.SILDT, '1') JEGO "  
	SQL = SQL & " FROM SUMIS.TBW110 A"
	SQL = SQL & "  WHERE  A.SILDT  in "&sildt&" "
	SQL = SQL & " AND A.VDCD   in (select vdcd from tbb040 where pcd = '"& pcd &"'  )  "
	SQL = SQL & "  UNION ALL "	
	SQL = SQL & "  SELECT A.BRCD , A.SILQTY , SUSPC.UF_STOCK_VSCZ_C('"&dpcd&"', A.STYCD, A.COLCD, A.SIZECD, A.SILDT, '1') JEGO "  
	SQL = SQL & " FROM SUSPC.TBW110 A"
	SQL = SQL & "  WHERE  A.SILDT  in "&sildt&" "
	SQL = SQL & " AND A.VDCD   in (select vdcd from tbb040 where pcd = '"& pcd &"'  )  "
	SQL = SQL & " )Z , TBB030 B "
	SQL = SQL & " WHERE Z.BRCD = B.BRCD "
	SQL = SQL & " GROUP BY Z.BRCD, B.BRSNM  "  

	set rs2=server.createobject("adodb.recordset")
	rs2.open SQL,db
	
	If rs2.eof Then	'검색결과 없음
		arrDataNull1 = true
		arrData1=null
	else
		arrDataNull1 = false
		arrData1 = rs2.getRows()

	end If

	'일자별
	SQL = " SELECT A.SILDT , sum(A.SILQTY) T_SILQTY" 
	SQL = SQL & " FROM TBW110 A   " 
	SQL = SQL & "  WHERE  A.SILDT  in "&sildt&" "
	SQL = SQL & " AND A.VDCD ='"&dpcd&"' "
	SQL = SQL & " GROUP BY A.SILDT "  
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
	rowCount = ubound(arrData, 2)
	rowCount1 = ubound(arrData1, 2)
	rowCount2 = ubound(arrData2, 2)
	
	'jObject("msg1")		="rowCount: "& rowCount &" rowCount1 :"&rowCount1 & " rowTot :" &rowTot 
	
	ReDim arr_data(rowCount)
	For i = 0 To rowCount
		Set data = jsObject()				
				data("STYCD")	= arrData(0, i)
				data("COLCD")	= arrData(1, i)
				data("SIZECD")	= arrData(2, i)
				data("JEGO")	= arrData(3, i)
				data("COST")	= arrData(4, i)
				data("NMIQTY")	= arrData(5, i)
				data("NMOQTY")	= arrData(6, i)
				data("SILQTY")	= arrData(7, i)

		Set arr_data(i) = data
	Next

	jData = toJSON(arr_data)
	
	'브랜드별
	ReDim arr_data1(rowCount1)
	For i = 0 To rowCount1
		Set data1 = jsObject()				
				data1("BRCD")	= arrData1(0, i)
				data1("BRSNM")	= arrData1(1, i)
				data1("T_SILQTY")	= arrData1(2, i)
				data1("T_JEGO")	= arrData1(3, i)

		Set arr_data1(i) = data1
	Next

	jData1 = toJSON(arr_data1)
	
	
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
	jObject("data")		= jData	
	jObject("data1")		= jData1	
	jObject("sql")		= SQL	
	jObject("J_SILQTY")		= J_SILQTY	
	jObject("O_SILQTY")		= O_SILQTY
	jObject.Flush
end If
%>