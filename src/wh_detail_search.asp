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
  w_vdcd = Trim(request("w_vdcd"))
  items = Trim(Request("items"))

	arrDataNull = true
	arrData = null
	Dim jData
	Dim data, arr_data


	Set jArray = json.parse(items)
	outno = jArray.get(0).outno
	outdt = jArray.get(0).outdt

	open_db

	SQL1 = "  SELECT ROW_NUMBER () OVER (ORDER BY STYCD, COLCD, SIZECD) NUM,  "
  SQL1 = SQL1 & "           A.OUTDT OUTDT, "
  SQL1 = SQL1 & "           A.STYCD STYCD, "
  SQL1 = SQL1 & "         A.COLCD CDLCD,"
  SQL1 = SQL1 & "         A.SIZECD SIZECD,"
  SQL1 = SQL1 & "         (SELECT REFSNM FROM SUMIS.TBB150 WHERE REFTP = 'S2' AND REFCD = A.SALEGU) SALEGU,"
  SQL1 = SQL1 & "         TO_CHAR (A.OUTPRI, '999,999,999,999') OUTPRI,"
  SQL1 = SQL1 & "         A.OUTQTY OUTQTY,         "
  SQL1 = SQL1 & "         TO_CHAR((OUTPRI * OUTQTY),'999,999,999,999,999') SUM        "
	SQL1 = SQL1 & "  FROM TBW030 A "
	SQL1 = SQL1 & "   WHERE VDCD = '"&w_vdcd&"'  "
	SQL1 = SQL1 & "  AND OUTDT = '"&outdt&"'  "
  SQL1 = SQL1 & "  AND OUTNO = '"&outno&"' "
	SQL1 = SQL1 & " ORDER BY STYCD, COLCD, SIZECD "
	set rs=server.createobject("adodb.recordset")
	rs.open SQL1,db

	If rs.eof Then	'검색결과 없음
		arrDataNull = true
		arrData=null
	else
		arrDataNull = false
		arrData = rs.getRows()

	end If


  SQL = "  SELECT TO_CHAR( SUM(OUTPRI * OUTQTY),'999,999,999,999,999,999') D_SUM, SUM(OUTQTY) D_OUTQTY    "
	SQL = SQL & " FROM TBW030 "
	SQL = SQL & "  WHERE VDCD = '"&w_vdcd&"'   "
	SQL = SQL & " AND OUTDT = '"&outdt&"' "
  SQL = SQL & "  AND OUTNO = '"&outno&"' "
	set rs1=server.createobject("adodb.recordset")
	rs1.open SQL,db

	If rs1.eof Then	'검색결과 없음

	else
    D_OUTQTY =  rs1("D_OUTQTY")
    D_SUM =  rs1("D_SUM")
	end If

	close_db

if arrDataNull  Then

	jObject("error") = "1"
	jObject("msg") ="조회 할 자료가 없습니다!."
	jObject("SQL")		= SQL

	jObject.Flush
	Response.End

Else ' arrData not null
	rowCount = ubound(arrData, 2)

	'jObject("msg1")		="rowCount: "& rowCount &" rowCount1 :"&rowCount1 & " rowTot :" &rowTot

	ReDim arr_data(rowCount)
	For i = 0 To rowCount
		Set data = jsObject()
    		data("NUM")		= arrData(0, i)
				data("OUTDT")		= arrData(1, i)
				data("STYCD")		= arrData(2, i)
				data("COLCD")		= arrData(3, i)
        data("SIZECD")		= arrData(4, i)
        data("SALEGU")		= arrData(5, i)
				data("OUTPRI")		= arrData(6, i)
				data("OUTQTY")			= arrData(7, i)
        data("SUM")			= arrData(8, i)

		Set arr_data(i) = data
	Next

	jData = toJSON(arr_data)


	jObject("error")	= "0"
	jObject("msg")		= "조회 성공"
	jObject("data")		= jData
	jObject("D_OUTQTY")		= D_OUTQTY
  jObject("D_SUM")		= D_SUM
	' jObject("T_CFQTY")		= T_CFQTY
	jObject("sql1")		= SQL1
	jObject.Flush
end If
%>
