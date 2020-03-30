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
	outdt   = Trim(request("outdt"))
	outno   = Trim(request("outno"))
  w_vdcd   = Trim(request("w_vdcd"))
	arrDataNull = true
	arrData = null
	arrDataNull1 = true
	arrData1 = null
	Dim jData
	Dim data, arr_data
	open_db




	SQL = "SELECT STYCD , SUM(OUTQTY) OUTQTY, MAX(OUTPRI) OUTPRI, TO_CHAR(SUM(OUTQTY *OUTPRI),'999,999,999,999,999') OUTMAT, COLCD, SIZECD          "
	SQL = SQL & " FROM  TBW030  "
  SQL = SQL & "  WHERE  OUTDT ='"&outdt&"' "
	SQL = SQL & " AND VDCD ='"&w_vdcd&"' "
	SQL = SQL & " AND OUTNO ='"&outno&"' "
	SQL = SQL & " GROUP BY STYCD, COLCD, SIZECD  "
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
	SQL = "  SELECT B.WHNM , C.VDNM , A.VDCD,  NVL(A.BOXNO,'박스없음') BOXNO , A.T_OUTQTY ,  "
	SQL = SQL & "(SELECT BRSNM from tbb030  where brcd = (SELECT BRAND FROM TBB040 WHERE VDCD = A.INUSER)), DECODE(A.BRCD,'S','SGF67','I','임페리얼','A','프랑코 페라로','G','블랙마틴싯봉') BRCD"
	SQL = SQL & " FROM  (  "
	SQL = SQL & "    select MAX(WHCD) WHCD ,MAX(VDCD) VDCD , MAX(BOXNO) BOXNO, SUM(OUTQTY)  T_OUTQTY , MAX(INUSER) INUSER  , MAX(BRCD) BRCD  "
	SQL = SQL & " FROM TBW030 "
	SQL = SQL & "  WHERE  OUTDT ='"&outdt&"' "
	SQL = SQL & " AND VDCD ='"&w_vdcd&"' "
	SQL = SQL & " AND OUTNO ='"&outno&"' "
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
				data("OUTQTY")		= arrData(1, i)
        data("OUTPRI")		= arrData(2, i)
        data("OUTMAT")		= arrData(3, i)
        data("COLCD")		= arrData(4, i)
        data("SIZECD")		= arrData(5, i)

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
				data1("INUSER")		= arrData1(5, 0)
        data1("BRCD")		= arrData1(6, 0)
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
