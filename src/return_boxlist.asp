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
	ordt   = Trim(request("ordt"))
	orno   = Trim(request("orno"))
  tag   = Trim(request("tag"))
  cfqty   = Trim(request("cfqty"))
	arrDataNull = true
	arrData = null
	arrDataNull1 = true
	arrData1 = null
	Dim jData
	Dim data, arr_data
	open_db



  SQL = "SELECT STYCD, SUM (REQQTY) REQQTY,  (CASE WHEN OUTYN = 'N' THEN 0 ELSE SUM (CFQTY) END) CFQTY,  MAX (OUTPRI) OUTPRI,         "

    If tag = "N" Then'미확정이면 금액 계산 20191120 조영석
  SQL = SQL & " TO_CHAR (SUM (REQQTY * OUTPRI), '999,999,999,999,999') OUTMAT, "
    Else '확정이면'
  SQL = SQL & " (CASE  WHEN OUTYN = 'N' THEN TO_CHAR (0)  ELSE (TO_CHAR (SUM (CFQTY * OUTPRI), '999,999,999,999,999'))  END) OUTMAT, "
    End If
  SQL = SQL & " COLCD,         SIZECD "
	SQL = SQL & " FROM  TBW010  "
	SQL = SQL & "  WHERE  ORDT ='"&ordt&"' "
	SQL = SQL & " AND VDCD ='"&dpcd&"' "
	SQL = SQL & " AND ORNO ='"&orno&"' "
	SQL = SQL & " GROUP BY STYCD, COLCD, SIZECD, OUTYN  "
	SQL = SQL & " ORDER BY STYCD, COLCD, SIZECD "
	set rs=server.createobject("adodb.recordset")
	rs.open SQL,db

	If rs.eof Then	'검색결과 없음
		arrDataNull = true
		arrData=null
	else
		arrDataNull = false
		arrData = rs.getRows()

	end If


	'박스내역 기본정보
	SQL = " SELECT B.WHNM , C.VDNM , A.VDCD, A.BOXNO , A.T_REQQTY , A.T_CFQTY , "
	SQL = SQL & " (SELECT BRSNM from tbb030  where brcd = (SELECT BRAND FROM TBB040 WHERE VDCD = A.INUSER))"
	SQL = SQL & " FROM  (  "
	SQL = SQL & "  select MAX(WHCD) WHCD ,MAX(VDCD) VDCD , MAX(BOXNO) BOXNO, SUM(REQQTY)  T_REQQTY ,  SUM(CFQTY) T_CFQTY , MAX(INUSER) INUSER "
	SQL = SQL & " FROM TBW010 "
	SQL = SQL & "  WHERE  ORDT ='"&ordt&"' "
	SQL = SQL & " AND VDCD ='"&dpcd&"' "
	SQL = SQL & " AND ORNO ='"&orno&"' "
	SQL = SQL & " ) A , TBB100 B , TBB040 C  "
	SQL = SQL & " WHERE A.WHCD = B.WHCD "
	SQL = SQL & " AND A.VDCD = C.VDCD "
	set rs1=server.createobject("adodb.recordset")
	rs1.open SQL,db

	If rs1.eof Then	'검색결과 없음
		arrDataNull1 = true
		arrData1=null
	else
		arrDataNull1 = false
		arrData1 = rs1.getRows()

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
	'jObject("msg1")		="rowCount: "& rowCount &" rowCount1 :"&rowCount1 & " rowTot :" &rowTot

	ReDim arr_data(rowCount)
	For i = 0 To rowCount
		Set data = jsObject()
				data("STYCD")		= arrData(0, i)
				data("REQQTY")		= arrData(1, i)
        data("CFQTY")		= arrData(2, i)
        data("OUTPRI")		= arrData(3, i)
        data("OUTMAT")		= arrData(4, i)
        data("COLCD")		= arrData(5, i)
        data("SIZECD")		= arrData(6, i)

		Set arr_data(i) = data
	Next

	jData = toJSON(arr_data)

	Dim jData1
	Dim data1, arr_data1
	ReDim arr_data1(rowCount1)
		Set data1 = jsObject()
				data1("WHNM")		= arrData1(0, 0)
				data1("VDNM")		= arrData1(1, 0)
				data1("VDCD")		= arrData1(2, 0)
				data1("BOXNO")		= arrData1(3, 0)
				data1("TOTQTY")		= arrData1(4, 0)
        data1("CF_TOTQTY")		= cfqty
				data1("INUSER")		= arrData1(5, 0)
		Set arr_data1(0) = data1
	jData1 = toJSON(arr_data1)


	jObject("error")	= "0"
	jObject("msg")		= "조회 성공"
	jObject("data")		= jData
	jObject("data1")		= jData1
	jObject("sql")		= SQL
	jObject.Flush
end If
%>
