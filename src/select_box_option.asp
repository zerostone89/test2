<!--#include virtual="/include/common.asp"-->
<!-- #include file="json2.asp" -->
<!-- #include file="JSON_2.0.4.asp" -->
<!-- #include file="JSON_UTIL_0.1.1.asp" -->
<%g_loginCheck%>
<!--'#include virtual="/include/xinc/design.asp"-->
<%

   Response.Expires = 0
   Response.AddHeader "Pragma", "no-cache" 
   Response.AddHeader "cache-control", "no-store" 
   Response.CharSet = "euc-kr"
   Response.ContentType = "text/html;charset=euc-kr"


	Dim jObject
	Set jObject = jsObject()
	pcd = trim(Session("PCD"))
	dpcd = trim(Session("DPCD"))
	selectoption = Trim(request("selectoption"))
	select_itype = Trim(request("select_itype"))
arrDataNull = true
arrData = null

open_db
		
	If selectoption = "year" Then 
	sql=" select cnt  , a.refcd , a.refnm "
	sql=sql&" from ( "
	sql=sql&" select rownum cnt ,  z.refcd ,  z.refnm "
	sql=sql&" from "
	sql=sql&" ( "
	sql=sql&" Select  REFCD,REFNM "
	sql=sql&" From  sumis.TBB150 "
	sql=sql&" Where REFTP  = 'S9' "
	sql=sql&" And   REFCD <> '0000' "
	sql=sql&" And   USEYN  = 'Y'  "
	sql=sql&" order by refnm "
	sql=sql&" ) z   "
 	sql=sql&" ) a "
 	sql=sql&"order by cnt desc"
	End If 

	If selectoption = "brcd" Then 
	sql=" select b.scol , a.refcd , a.refnm "
	sql=sql&" from (  "
	sql=sql&" Select distinct mbrcd refcd , BRNM refnm   "
	sql=sql&" From  sumis.TBB030  "
	sql=sql&"  Where Rtrim(MBRCD) Is Not Null   "
	sql=sql&"  and useyn = 'Y'    "
	sql=sql&"  order by refnm  "
	sql=sql&"  ) a , sumis.tbb150 b  "
	sql=sql&"  where b.reftp='SB' "
	sql=sql&"  and b.refcd <> '0000' "
	sql=sql&"  and a.refcd = b.refsnm  "
	sql=sql&"  order by b.scol "
	End If 

	If selectoption = "brcd_pcd" Then 
	sql=" Select rownum , A.BRCD, A.BRNM "
	sql=sql&" FROM TBB030 A , TBB040 B "
	sql=sql&" Where B.PCD ='"&pcd&"'  AND A.BRCD = B.BRAND  AND B.USEYN = 'Y'"  
	End If 

	'시즌
	If selectoption = "season" Then 
	sql="   select rownum , refcd , refnm "
	sql=sql&" from ( "
	sql=sql&" Select   REFCD,REFNM  "
	sql=sql&" From  sumis.TBB150  "
	sql=sql&" Where REFTP  = 'P7'  "
	sql=sql&" And   REFCD <> '0000'  "
	sql=sql&" And   USEYN  = 'Y'  "
	sql=sql&" union all "
	sql=sql&" select '5' refcd , 'S/S' refnm from dual "
	sql=sql&" union all"
	sql=sql&" select '6' refcd , 'F/W' refnm from dual "
	sql=sql&" )order by REFCD  "
	End If 

	
	
	'성별
	If selectoption = "sex" Then 
	sql="  Select  rownum , REFCD,REFNM  "
	sql=sql&" From  sumis.TBB150  "
	sql=sql&" Where REFTP  = 'PD'  "
	sql=sql&" And   REFCD <> '0000'  "
	sql=sql&" And   USEYN  = 'Y'   "
	sql=sql&" order by REFCD  "
	End If 

	'형태
	If selectoption = "itype" Then 
	sql="  Select  rownum , REFCD,REFNM  "
	sql=sql&" From  sumis.TBB150  "
	sql=sql&" Where REFTP  = 'V4'  "
	sql=sql&" And   REFCD <> '0000'  "
	sql=sql&" And   USEYN  = 'Y'   "
	sql=sql&" order by REFCD  "
	End If 

	'아이템
	If selectoption = "item" Then 
	
		If select_itype = "A" Then 
			sql="  Select  rownum , REFCD,REFNM  "
			sql=sql&" From  sumis.TBB150  "
			sql=sql&" Where REFTP  = 'V6'  "
			sql=sql&" And   REFCD <> '0000'  "
			sql=sql&" And   USEYN  = 'Y'   "
			sql=sql&" order by REFCD  "
		ElseIf select_itype ="3" Then 
			sql="  Select  rownum , REFCD,REFNM  "
			sql=sql&" From  sumis.TBB150  "
			sql=sql&" Where REFTP  = 'VA'  "
			sql=sql&" And   REFCD <> '0000'  "
			sql=sql&" And   USEYN  = 'Y'   "
			sql=sql&" order by REFCD  "
		ElseIf select_itype ="4" Then 
			sql="  Select  rownum , REFCD,REFNM  "
			sql=sql&" From  sumis.TBB150  "
			sql=sql&" Where REFTP  = 'VB'  "
			sql=sql&" And   REFCD <> '0000'  "
			sql=sql&" And   USEYN  = 'Y'   "
			sql=sql&" order by REFCD  "
		ElseIf select_itype ="5" Then 
			sql="  Select  rownum , REFCD,REFNM  "
			sql=sql&" From  sumis.TBB150  "
			sql=sql&" Where REFTP  = 'VC'  "
			sql=sql&" And   REFCD <> '0000'  "
			sql=sql&" And   USEYN  = 'Y'   "
			sql=sql&" order by REFCD  "
		ElseIf select_itype ="6" Then 
			sql="  Select  rownum , REFCD,REFNM  "
			sql=sql&" From  sumis.TBB150  "
			sql=sql&" Where REFTP  = 'VD'  "
			sql=sql&" And   REFCD <> '0000'  "
			sql=sql&" And   USEYN  = 'Y'   "
			sql=sql&" order by REFCD  "
		Else			
			sql="  Select  rownum , REFCD,REFNM  "
			sql=sql&" From  sumis.TBB150  "
			sql=sql&" Where REFTP  = 'V5'  "
			sql=sql&" And   REFCD <> '0000'  "
			sql=sql&" And   USEYN  = 'Y'   "
			sql=sql&" order by REFCD  "
		End If 

	End If 


	'형태
	If selectoption = "spc_chk" Then 
	sql="  select rownum , refcd , refnm "
	sql=sql&" from ( "
	sql=sql&" select '1' refcd , '정상' refnm from dual  "
	sql=sql&" union all "
	sql=sql&" select '2' refcd , '아울렛' refnm from dual  "
	sql=sql&" )order by refcd "
	End If 

	'물류창고(성남)
	If selectoption = "s_whcd" Then 
	sql=" select rownum, WHCD,WHNM  "
	sql=sql&" From TBB100 "
	sql=sql&"  where whgu = '2' and type <> '3' "
	sql=sql&"  and WHCD NOT IN ('S3000','S1200','S1300','S1500','S1600') "
	sql=sql&" order by WHCD "
	End If 


	'물류창고(이천)
	If selectoption = "i_whcd" Then 
	sql=" Select rownum, WHCD,WHNM  "
	sql=sql&" From TBB100 "
	sql=sql&"   where whgu = '2' and type = '3' and WHCD='S1100' "
	sql=sql&" order by WHCD "
	End If 

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

	jObject.Flush
	Response.End
	
Else ' arrData not null	
	rowCount = ubound(arrData, 2)
	
	'jObject("msg1")		="rowCount: "& rowCount &" rowCount1 :"&rowCount1 & " rowTot :" &rowTot 
	Dim jData
	Dim data, arr_data
	ReDim arr_data(rowCount)
	For i = 0 To rowCount
		Set data = jsObject()
				data("REFCD")		= arrData(1, i)
				data("REFNM")		= arrData(2, i)

		Set arr_data(i) = data
	Next

	jData = toJSON(arr_data)
	jObject("error")	= "0"
	jObject("msg")		= select_itype
	jObject("data")		= jData	
	jObject.Flush
end If
%>