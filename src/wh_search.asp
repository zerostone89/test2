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
  pcd	 = Trim(Session("PCD"))
  w_vdcd = Trim(request("w_vdcd"))
  radio = Trim(request("radio"))
	day1   = Mid(Trim(request("day1")),1,4)&Mid(Trim(request("day1")),6,2)&Mid(Trim(request("day1")),9,2)
	day2   = Mid(Trim(request("day2")),1,4)&Mid(Trim(request("day2")),6,2)&Mid(Trim(request("day2")),9,2)
	box_barcode = Trim(request("box_barcode"))
  prd_barcode = Trim(request("prd_barcode"))
  gubun = Trim(request("gubun"))
	' chk_gb = Trim(request("chk_gb"))
	arrDataNull = true
	arrData = null
	Dim jData
	Dim data, arr_data


	open_db


  	SQL1 = " SELECT  ROW_NUMBER() OVER(ORDER BY  OUTDT DESC) NUM, B.WHNM WHNM,  A.OUTDT OUTDT,  A.OUTNO OUTNO, NVL(A.BOXNO,'-') BOXNO,  SUM(A.OUTQTY) OUTQTY "
  	SQL1 = sql1 & " FROM TBW030 A, "
  	sql1 = sql1 & "  (SELECT WHCD, WHNM FROM TBB100) B, "
  	sql1 = sql1 & "  (SELECT REFSNM, REFCD "
  	sql1 = sql1 & "    FROM TBB150 "
  	sql1 = sql1 & "    WHERE REFTP = 'S2' AND REFCD <> '0000' AND USEYN = 'Y') C "
  	sql1 = sql1 & " WHERE     A.WHCD = B.WHCD "
    sql1 = sql1 & "   AND A.SALEGU = C.REFCD "
    sql1 = sql1 & "   AND VDCD = '"&w_vdcd&"' "
    sql1 = sql1 & "   AND A.WHCD LIKE '"&gubun&"' "
    sql1 = sql1 & "   AND OUTDT BETWEEN '"&day1&"' AND '"&day2&"' "
    If len(box_barcode) = 0 Then
      '전표 또는 박스 검색 안 함'
    ElSE
      If radio = "1" Then
      sql1 = sql1 & "   AND A.OUTNO LIKE '%"&box_barcode&"%' "
      ElseIf radio = "2" Then
      sql1 = sql1 & "   AND A.BOXNO LIKE '%"&box_barcode&"%' "
      End If
    End if
    If len(prd_barcode) = 0 Then
    '품번 검색 안 함'
    ElSE

     sql1 = sql1 & "   AND STYCD||COLCD||SIZECD LIKE '%"&prd_barcode&"%' "
    END IF
    sql1 = sql1 & " GROUP BY B.WHNM    ,  A.OUTDT    ,  A.OUTNO    , NVL(A.BOXNO,'-')"
    sql1 = sql1 & " ORDER BY OUTDT DESC"
	set rs=server.createobject("adodb.recordset")
	rs.open sql1,db

	If rs.eof Then	'검색결과 없음
		arrDataNull = true
		arrData=null
    jObject("sql1")		= sql1
	else
		arrDataNull = false
		arrData = rs.getRows()

	end If

  SQL = " SELECT SUM(OUTQTY) T_OUTQTY "
	SQL = SQL & " FROM TBW030 "
	SQL = SQL & "  WHERE VDCD = '"&w_vdcd&"' "
  If len(box_barcode) = 0 Then
    '전표 또는 박스 검색 안 함'
  ElSE
    If radio = "1" Then
    SQL = SQL & "   AND OUTNO LIKE '%"&box_barcode&"%' "
    ElseIf radio = "2" Then
    SQL = SQL & "   AND BOXNO LIKE '%"&box_barcode&"%' "
    End If
  End if
  If len(prd_barcode) = 0 Then
  '품번 검색 안 함'
  ElSE

   SQL = SQL & "   AND STYCD||COLCD||SIZECD LIKE '%"&prd_barcode&"%' "
  END IF
	SQL = SQL & " AND OUTDT BETWEEN '"&day1&"' AND '"&day2&"' "
	set rs1=server.createobject("adodb.recordset")
	rs1.open SQL,db

	If rs1.eof Then	'검색결과 없음

	else
		T_OUTQTY = rs1("T_OUTQTY")

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
      data("NUM")		= arrData(0, i)
			data("WHNM")		= arrData(1, i)
			data("OUTDT")		= arrData(2, i)
			data("OUTNO")		= arrData(3, i)
			data("BOXNO")		= arrData(4, i)
			data("OUTQTY")		= arrData(5, i)

		Set arr_data(i) = data
	Next

	jData = toJSON(arr_data)


	jObject("error")	= "0"
	jObject("msg")		= "조회 성공"
	jObject("data")		= jData
	jObject("sql1")		= sql1
  jObject("T_OUTQTY")		= T_OUTQTY
	jObject.Flush
end If
%>
