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
	day1   = Mid(Trim(request("day1")),1,4)&Mid(Trim(request("day1")),6,2)&Mid(Trim(request("day1")),9,2)
	day2   = Mid(Trim(request("day2")),1,4)&Mid(Trim(request("day2")),6,2)&Mid(Trim(request("day2")),9,2)
	outyn  = Trim(request("outyn"))
	' barcode = Trim(request("barcode"))
	confirm_from = Mid(Trim(request("confirm_from")),1,4)&Mid(Trim(request("confirm_from")),6,2)&Mid(Trim(request("confirm_from")),9,2)
	confirm_to = Mid(Trim(request("confirm_to")),1,4)&Mid(Trim(request("confirm_to")),6,2)&Mid(Trim(request("confirm_to")),9,2)
	chk_gb = Trim(request("chk_gb"))
	arrDataNull = true
	arrData = null
	Dim jData
	Dim data, arr_data
	open_db

	SQL1 = " SELECT A.ORDT, A.BOXNO, A.WHCD, B.WHNM, A.INTIME, A.UPDTIME, NVL (A.UPDUSER, ' '), A.T_RTQTY,A.TAG, "
	SQL1 = SQL1 & "    NVL (A.REMARK, ' ') REMARK,  A.ORNO,  DECODE (A.ORGU, '8', '성남', '이천') ORNM,  A.T_CFQTY,A.OUTDT, "
  SQL1 = SQL1 & "   (CASE  WHEN A.OUTNO <> 'N' THEN '도착'"
  SQL1 = SQL1 & "          WHEN LENGTH (A.OUTNO) > '1' THEN SUBSTR (A.UPDTIME, 1, 8) "
  SQL1 = SQL1 & "          ELSE A.OUTNO          END)  OUTNO,        "
  SQL1 = SQL1 & "   (CASE WHEN TAG = 'Y' THEN A.OUTNO ELSE '-' END) SIL_OUTNO      ,  R_C "
  SQL1 = SQL1 & " FROM (   "
  SQL1 = SQL1 & "     SELECT ORDT, NVL (MAX (BOXNO), '-')       BOXNO,  MAX (WHCD)                      WHCD, "
  SQL1 = SQL1 & "     MAX (INTIME)                     INTIME,       NVL (MAX (UPDTIME), 'N')   UPDTIME,   MAX (UPDUSER)                 UPDUSER, "
  SQL1 = SQL1 & "     SUM (REQQTY)                  T_RTQTY,   SUM ( (CASE WHEN OUTYN = 'N' THEN 0 ELSE CFQTY END))         T_CFQTY, "
  SQL1 = SQL1 & "     MAX (OUTYN)                    TAG,    MAX (REMARK)                  REMARK, MAX (ORNO)                     ORNO, "
  SQL1 = SQL1 & "     MAX (ORGU)                     ORGU,    NVL (MAX (OUTDT), 'N')    OUTDT,  NVL (MAX (OUTNO), 'N')    OUTNO ,    "
  SQL1 = SQL1 & "     NVL (    ( SELECT CASE WHEN    SUM(COUNT(*)) >0     THEN    '1'     ELSE   '0'       END          "
  SQL1 = SQL1 & "                FROM SUMIS.TBW010 WHERE VDCD = X.VDCD   AND ORNO    =  X.ORNO   AND REQQTY <> CFQTY  "
  SQL1 = SQL1 & "                GROUP BY ORNO ,   SEQ )    ,  'N'   )     R_C     "
  SQL1 = SQL1 & "   FROM SUMIS.TBW010 X "
	SQL1 = SQL1 & "   WHERE ORDT BETWEEN  '"&day1&"' AND '"&day2&"' "
	SQL1 = SQL1 & "      AND VDCD ='"&dpcd&"' "
	If Len(confirm_from) > 0 And  Len(confirm_to) > 0  Then
	SQL1 = SQL1 & "      AND OUTDT BETWEEN '"&confirm_from&"' AND '"&confirm_to&"' "
	End If
	SQL1 = SQL1 & "      AND OUTYN LIKE '%"&outyn&"%'"
	If chk_gb = "1" Then
	SQL1 = SQL1 & "      AND ORGU ='8' "
	ElseIf chk_gb ="2"Then
	SQL1 = SQL1 & "      AND ORGU = 'M' "
	End If
	SQL1 = SQL1 & "      AND CBGU ='2' "
	SQL1 = SQL1 & "      AND  ORSEQ IN ( '0', '9') "
	SQL1 = SQL1 & "     GROUP BY VDCD, ORDT, ORNO  "
	SQL1 = SQL1 & "     ORDER BY ORDT ) A, TBB100 B "
	SQL1 = SQL1 & " WHERE A.WHCD = B.WHCD"
  SQL1 = SQL1 & " ORDER BY A.ORDT DESC"
	set rs=server.createobject("adodb.recordset")
	rs.open SQL1,db

	If rs.eof Then	'검색결과 없음
		arrDataNull = true
		arrData=null
	else
		arrDataNull = false
		arrData = rs.getRows()

	end If

	SQL = " SELECT SUM(REQQTY) T_REQQTY , SUM(CFQTY) T_CFQTY"
	SQL = SQL & " FROM ( "
	SQL = SQL & "  SELECT REQQTY , (CASE WHEN OUTYN ='N' THEN 0 ELSE CFQTY END )CFQTY "
	SQL = SQL & " FROM TBW010 "
	SQL = SQL & "  WHERE  ORDT BETWEEN  '"&day1&"' AND '"&day2&"' "
	SQL = SQL & " AND VDCD ='"&dpcd&"' "
	If chk_gb = "1" Then
	SQL = SQL & " AND ORGU ='8' "
	ElseIf chk_gb ="2"Then
	SQL = SQL & " AND ORGU = 'M' "
	End If
  ' 20191030 byCho 조건 총계 추가
  If Len(confirm_from) > 0 And  Len(confirm_to) > 0  Then
  SQL = SQL & " AND OUTDT BETWEEN '"&confirm_from&"' AND '"&confirm_to&"' "
  End If
  SQL = SQL & "  AND OUTYN LIKE '%"&outyn&"%'"
	SQL = SQL & " and CBGU ='2' "
	SQL = SQL & " AND  ORSEQ IN ( '0', '9') ) "
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
			Set data = jsObject()
			data("ORDT")		= arrData(0, i)
			data("BOXNO")		= arrData(1, i)
			data("WHCD")		= arrData(2, i)
			data("WHNM")		= arrData(3, i)
			data("INTIME")		= arrData(4, i)'Mid(arrData(4, i),1,4)&"-"& Mid(arrData(4, i),5,2)&"-"& Mid(arrData(4, i),7,2)&" " & Mid(arrData(4, i),9,2)&":" & Mid(arrData(4, i),11,2)
			data("UPDTIME")		= arrData(5, i)'Mid(arrData(5, i),1,4)&"-"& Mid(arrData(5, i),5,2)&"-"& Mid(arrData(5, i),7,2)&" " & Mid(arrData(5, i),9,2)&":" & Mid(arrData(5, i),11,2)
			data("UPDUSER")		= arrData(6, i)
			data("T_RTQTY")      = arrData(7,i)
			data("TAG")			= arrData(8, i)
			data("AREA")		= arrData(9,i)
			data("ORNO")		= arrData(10,i)
			data("ORNM")		= arrData(11,i) '성남/이천 반품구분
			data("T_CFQTY")		= arrData(12,i) '확정수량
			data("OUTDT")		= arrData(13,i) '확정일자
			data("OUTNO")		= arrData(14,i) '도착상황
      data("SIL_OUTNO")		= arrData(15,i) '출고번호
      data("R_C")		= arrData(16,i) '1이면 수량이 다른것, 0이면 같은것

		Set arr_data(i) = data
	Next

	jData = toJSON(arr_data)


	jObject("error")	= "0"
	jObject("msg")		= "조회 성공"
	jObject("data")		= jData
	jObject("SQL1")		= SQL1
	jObject("T_REQQTY")		= T_REQQTY
	jObject("T_CFQTY")		= T_CFQTY
	jObject.Flush
end If
%>
