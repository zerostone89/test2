<!--METADATA TYPE="Typelib" NAME="ADODB Type Library"
FILE="c:\Program Files\Common Files\System\ado\msado15.dll"-->
<!--#include virtual="/include/common.asp"-->
<%g_loginCheck%>
<!-- #include file="json2.asp"-->
<!-- #include file="JSON_2.0.4.asp"-->
<!-- #include file="JSON_UTIL_0.1.1.asp"-->
<!--#include virtual="/include/xinc/design.asp"-->
<%
	
	Response.Expires = 0
	Response.AddHeader "Pragma", "no-cache" 
	Response.AddHeader "cache-control", "no-store" 
	Response.CharSet = "euc-kr"
	Response.ContentType = "text/html;charset=euc-kr"
   
   dim f1,Rs,SQL,keyword
   chk    = trim(Request("chk"))
   dpcd   = trim(Session("DPCD"))			'정상DPCD
   pcd	  = Trim(Session("PCD"))
   BRAND  = trim(Session("BRAND"))
   keyword= trim(Request("barcd"))
   a_store    = trim(Request("a_store"))'창고코드
   day1   = trim(Request("day1"))

	Dim jObject
	Set jObject = jsObject()
  
	   
	open_dbo

                
	SQL = "select a.STYCD stycd, a.COLCD colcd, a.SIZECD sizecd,a.LAPRI LAPRI,a.STATUS STATUS, "
	SQL = SQL & " ( select nvl(SPC_CHK,'N') SPC_CHK from suspc.tbb070 where barcode = a.barcode) SPC_CHK, ITYPE "
	SQL = SQL & "from TBB070 a"
	SQL = SQL & " where a.BARCODE = '"& Ucase(keyword) &"'"
	SQL = SQL & "   AND a.BRCD = '"& BRAND &"'" 	
	SQL = SQL & " order by stycd,colcd,sizecd asc"
 	
	set Rs=server.createobject("adodb.recordset")
	Rs.CursorLocation = adUseClient
	Rs.open SQL,db,adOpenStatic, adLockOptimistic

 
    
	if rs.eof then
		arrDataNull = true
	else
		arrDataNull = false
		arrData = rs.getRows()
	end if
  
	rs.close
	set rs=Nothing

	if arrDataNull Then
		close_db
	
		jObject("error") = "1"
		jObject("msg") = "상품이 존재하지 않습니다."

		jObject.Flush
		Response.end
	else


	style  = arrData(0,0)
	colcd  = arrData(1,0)
	sizecd = arrData(2,0)
	LAPRI  = arrData(3,0)
	STATUS = arrData(4,0)
	SPCCHK = arrData(5,0)
	ITYPE  = arrData(6,0)

		
		If  SPCCHK = "Y" Or ITYPE = "D" Or ITYPE = "J" Or ITYPE = "B" Or ITYPE = "R"  Then 
		
			close_db
	
			jObject("error") = "1"
			jObject("msg") = "아울렛 제품은 ssiiss_sang.com/snag(특판시스템)에서 입력하십시오."

			jObject.Flush
			Response.end
			
		Else ' 검색시작
			dc	= 0  'dc율  
			'작지 스타일정보 TBP040

			SQL = "SELECT BRCD,YEAR,SEASON,BRSEX,ITEM,ITYPE,SEQ,RESEQ,STYCD "
			SQL = SQL & "FROM TBP040"
			SQL = SQL & " WHERE STYCD ='"& style &"'"

			set Rs1=server.createobject("adodb.recordset")
			Rs1.CursorLocation = adUseClient
			   Rs1.open SQL,db,adOpenStatic, adLockOptimistic
			   
			   'response.write SQL
			
			brcd   = Rs1(0)
			year1  = Rs1(1)
			season = Rs1(2)
			brsex  = Rs1(3)
			item   = Rs1(4)
			itype  = Rs1(5)
			seq    = Rs1(6)
			reseq  = Rs1(7)
			
			Rs1.close
			set Rs1 = nothing

				'response.write reseq

 	SQL = "SELECT LASTPRI, STATUS"
 	SQL = SQL & "	FROM TBB072"  
 	SQL = SQL & "  WHERE (STYCD,COLCD,DT) IN ( SELECT STYCD, COLCD, MAX(DT)  FROM TBB072"
 	SQL = SQL & "	                      WHERE STYCD = '"& style &"'"
 	SQL = SQL & "	                        AND COLCD = '"& colcd &"'"
 	SQL = SQL & "	                        AND DT   <= '" & day1 &"'"
 	SQL = SQL & "                         GROUP BY STYCD, COLCD )" 
 	SQL = SQL & "    AND ROWNUM = 1"

  	  'response.write SQL
  	set KK=server.createobject("adodb.recordset")
  	KK.CursorLocation = adUseClient
	   KK.open SQL,db,adOpenStatic, adLockOptimistic
		price = trim(KK("LASTPRI"))
		price = cdbl(price)
		status = trim(KK("STATUS"))
   		sacod     = status '판매유형
              'RESPONSE.WRITE price & status & sacod

	KK.close
	set KK = nothing

 if status ="10" then
  	
	 SQL = "SELECT COUNT(STDT) cnt FROM TBS040"
	 SQL = SQL & " WHERE VDCD ='"& dpcd &"'"
	 SQL = SQL & " AND STDT <= '" & day1 &"'"
	 SQL = SQL & " AND ( ENDDT >= '" & day1 &"' OR ENDDT IS NULL)"
	 SQL = SQL & " AND ( BRCD   = '"& brcd &"'   OR BRCD   = '*' )"
	 SQL = SQL & " AND ( YEAR   = '"& year1 &"'   OR YEAR   = '*' )"
	 SQL = SQL & " AND ( SEASON = '"& season &"' OR SEASON = '*' )"
	 SQL = SQL & " AND ( BRSEX  = '"& brsex &"'  OR BRSEX  = '*' )"
	 SQL = SQL & " AND ( ITEM   = '"& item &"'   OR ITEM   = '*' )"	
 	 SQL = SQL & " AND ( ITYPE  = '"& itype &"'  OR ITYPE  = '*' )"
	 SQL = SQL & " AND ( SEQNO  = '"& seq &"'  OR SEQNO  = '*' )"
 	 SQL = SQL & " AND ( REORDER = '"& reseq &"'  OR REORDER  = '*' )"
  
		'response.write SQL
  	set Rs2=server.createobject("adodb.recordset")
  	Rs2.CursorLocation = adUseClient
	   Rs2.open SQL,db,adOpenStatic, adLockOptimistic
		cnt1 = cint(Rs2("cnt"))
		'response.write cnt1
		
		Rs2.close
		set Rs2 = nothing

    if cnt1 > 0 then   
    
		SQL = "SELECT COUNT(*) cnt2 FROM TBS045"    'SALE.제외정보 TBS045		
		SQL = SQL & " WHERE VDCD    ='"& dpcd &"'"
		SQL = SQL & " AND STDT   <= '" & day1 &"'"
		SQL = SQL & " AND (ENDDT >= '" & day1 &"' OR ENDDT IS NULL)"
		SQL = SQL & " AND STYCD = '" & style &"'"

			'response.write SQL
  	set Rs3=server.createobject("adodb.recordset")
  	Rs3.CursorLocation = adUseClient
	   Rs3.open SQL,db,adOpenStatic, adLockOptimistic
		cnt2 = cint(Rs3("cnt2"))
		'response.write cnt2
		
		Rs3.close
		set Rs3 = nothing

	IF cnt1 > 1 THEN	'세일정보가 2개이상일때
	    if cnt1 <= cnt2 then	
		sacod  = "10"           
		price  = price
		
		'response.write sacod &"&nbsp;"& price
	    else
		SQL =       "  SELECT '20' sacd, nvl(dcrt,0) dc,DCAMT                                                              "
		SQL = SQL & "    FROM TBS040                                                                                       "
		SQL = SQL & "   WHERE VDCD ='"& dpcd &                                                                           "'"
		SQL = SQL & "	  AND ( STDT,HSEQ,SEQ ) IN ( SELECT STDT,HSEQ,MAX(SEQ)                                             "
		SQL = SQL & "                                  FROM TBS040                                                         "
		SQL = SQL & "	                              WHERE VDCD ='"& dpcd &                                             "'"
		SQL = SQL & "	                                AND STDT = ( SELECT MIN(STDT)                                      "
		SQL = SQL & "	                                               FROM TBS040                                         "
		SQL = SQL & "                                                 WHERE VDCD ='"& dpcd &                             "'"
		SQL = SQL & "	                                                AND STDT <='"& day1 &                            "'"
		SQL = SQL & "	                                                AND ( ENDDT >= '"& day1 &"' OR ENDDT IS NULL)      "
		SQL = SQL & "	                                                AND ( BRCD   = '"& brcd &"'   OR BRCD   = '*' )    "
		SQL = SQL & "	                                                AND ( YEAR   = '"& year1 &"'   OR YEAR   = '*' )   "
		SQL = SQL & "	                                                AND ( SEASON = '"& season &"' OR SEASON = '*' )    "
		SQL = SQL & "	                                                AND ( BRSEX  = '"& brsex &"'  OR BRSEX  = '*' )    "
		SQL = SQL & "	                                                AND ( ITEM   = '"& item &"'   OR ITEM   = '*' )    " 
		SQL = SQL & "	                                                AND ( ITYPE  = '"& itype &"'  OR ITYPE  = '*' )    "
		SQL = SQL & "	                                                AND ( SEQNO  = '"& seq &"'  OR SEQNO  = '*' )      "
		SQL = SQL & "	                                                AND ( REORDER = '"& reseq &"' OR REORDER  = '*' )) "
		SQL = SQL & "	                                AND ( BRCD   = '"& brcd &"'   OR BRCD   = '*' )                    "
		SQL = SQL & "	                                AND ( YEAR   = '"& year1 &"'   OR YEAR   = '*' )                   "
		SQL = SQL & "	                                AND ( SEASON = '"& season &"' OR SEASON = '*' )                    "
		SQL = SQL & "	                                AND ( BRSEX  = '"& brsex &"'  OR BRSEX   = '*' )                   "
		SQL = SQL & "	                                AND ( ITEM   = '"& item &"'   OR ITEM   = '*' )                    "
		SQL = SQL & "	                                AND ( ITYPE  = '"& itype &"'  OR ITYPE  = '*' )                    "
		SQL = SQL & "	                                AND ( SEQNO  = '"& seq &"'  OR SEQNO  = '*' )                      "
		SQL = SQL & "	                                AND ( REORDER = '"& reseq &"'  OR REORDER  = '*' )                 "
		SQL = SQL & "                              GROUP BY STDT, HSEQ                                                     "
		SQL = SQL & "                                MINUS                                                                 "
		SQL = SQL & "                                SELECT A.STDT,A.HSEQ,MAX(A.SEQ)                                       "
		SQL = SQL & "                                  FROM TBS040 A,TBS045 B                                              "
		SQL = SQL & "                                 WHERE A.VDCD = B.VDCD                                                "
		SQL = SQL & "	                                AND A.STDT = B.STDT                                                "
		SQL = SQL & "                                   AND A.HSEQ = B.HSEQ                                                "
		SQL = SQL & "	                                AND A.VDCD ='"& dpcd &                                           "'"		
		SQL = SQL & "	                                AND A.STDT = ( SELECT MIN(STDT)                                    "
		SQL = SQL & "	                                                 FROM TBS040                                       "
		SQL = SQL & "                                                   WHERE VDCD ='"& dpcd &                           "'"
		SQL = SQL & "	                                                  AND STDT <='"& day1 &                          "'"
		SQL = SQL & "	                                                  AND ( ENDDT >= '"& day1 &"' OR ENDDT IS NULL)    "
		SQL = SQL & "	                                                  AND ( BRCD   = '"& brcd &"'   OR BRCD   = '*' )  "
		SQL = SQL & "	                                                  AND ( YEAR   = '"& year1 &"'   OR YEAR   = '*' ) "
		SQL = SQL & "	                                                  AND ( SEASON = '"& season &"' OR SEASON = '*' )  "
		SQL = SQL & "	                                                  AND ( BRSEX  = '"& brsex &"'  OR BRSEX  = '*' )  "
		SQL = SQL & "	                                                  AND ( ITEM   = '"& item &"'   OR ITEM   = '*' )  " 
		SQL = SQL & "	                                                  AND ( ITYPE  = '"& itype &"'  OR ITYPE  = '*' )  "
		SQL = SQL & "	                                                  AND ( SEQNO  = '"& seq &"'  OR SEQNO  = '*' )    "
		SQL = SQL & "	                                                  AND ( REORDER = '"& reseq &"' OR REORDER = '*' ))"
		SQL = SQL & "	                                AND ( A.ENDDT >= '"& day1 &"' OR A.ENDDT IS NULL)                  "
		SQL = SQL & "	                                AND ( A.BRCD   = '"& brcd &"'   OR A.BRCD   = '*' )                "
		SQL = SQL & "	                                AND ( A.YEAR   = '"& year1 &"'   OR A.YEAR   = '*' )               "
		SQL = SQL & "	                                AND ( A.SEASON = '"& season &"' OR A.SEASON = '*' )                "
		SQL = SQL & "	                                AND ( A.BRSEX  = '"& brsex &"'  OR A.BRSEX   = '*' )               "
		SQL = SQL & "	                                AND ( A.ITEM   = '"& item &"'   OR A.ITEM   = '*' )                "
		SQL = SQL & "	                                AND ( A.ITYPE  = '"& itype &"'  OR A.ITYPE  = '*' )                "
		SQL = SQL & "	                                AND ( A.SEQNO  = '"& seq &"'  OR A.SEQNO  = '*' )                  "
		SQL = SQL & "	                                AND ( A.REORDER = '"& reseq &"'  OR A.REORDER  = '*' )             "
		SQL = SQL & "                          GROUP BY A.STDT, A.HSEQ)                                                    "		


			'response.write SQL
	  	set Rs4=server.createobject("adodb.recordset")
	  	Rs4.CursorLocation = adUseClient
		   Rs4.open SQL,db,adOpenStatic, adLockOptimistic
		IF Rs4.BOF OR Rs4.EOF  THEN
			sacod ="10"
			'response.write sacod	
		ELSE

			sacod =Rs4("sacd")
			dc    =Rs4("dc")
			DCAMT    =Rs4("DCAMT")

		  'Rs4.colse		
		  'set Rs4 = nothing

		END IF
		
	    END IF		
	
	ELSE	'세일정보가 1개일때

	    if cnt2 > 0 then	
		sacod  = "10"           
		price  = price
		
		'response.write sacod &"&nbsp;"& price
	    else
		SQL = "SELECT '20' sacd, DCRT dc,DCAMT"
		SQL = SQL & "  FROM TBS040"
		SQL = SQL & " WHERE VDCD ='"& dpcd &"'"
		SQL = SQL & "	AND ( STDT,HSEQ,SEQ ) = ( SELECT STDT,HSEQ,MAX(SEQ)"
		SQL = SQL & "	 FROM TBS040"
		SQL = SQL & "	WHERE VDCD ='"& dpcd &"'"
		SQL = SQL & "	  AND STDT = ( SELECT MAX(STDT)"
		SQL = SQL & "	FROM TBS040"
		SQL = SQL & "  WHERE VDCD ='"& dpcd &"'"
		SQL = SQL & "	 AND STDT <='"& day1 &"'"
		SQL = SQL & "	 AND ( ENDDT >= '"& day1 &"' OR ENDDT IS NULL)"
		SQL = SQL & "	 AND ( BRCD   = '"& brcd &"'   OR BRCD   = '*' )"
		SQL = SQL & "	 AND ( YEAR   = '"& year1 &"'   OR YEAR   = '*' )"
		SQL = SQL & "	 AND ( SEASON = '"& season &"' OR SEASON = '*' )"
		SQL = SQL & "	 AND ( BRSEX  = '"& brsex &"'  OR BRSEX  = '*' )"
		SQL = SQL & "	 AND ( ITEM   = '"& item &"'   OR ITEM   = '*' )" 
		SQL = SQL & "	 AND ( ITYPE  = '"& itype &"'  OR ITYPE  = '*' )"
		SQL = SQL & "	 AND ( SEQNO  = '"& seq &"'  OR SEQNO  = '*' )"
		SQL = SQL & "	 AND ( REORDER = '"& reseq &"' OR REORDER  = '*' ))"

		SQL = SQL & "	  AND ENDDT >= '"& day1 &"'"
		SQL = SQL & "	 AND ( BRCD   = '"& brcd &"'   OR BRCD   = '*' )"
		SQL = SQL & "	 AND ( YEAR   = '"& year1 &"'   OR YEAR   = '*' )"
		SQL = SQL & "	 AND ( SEASON = '"& season &"' OR SEASON = '*' )"
		SQL = SQL & "	 AND ( BRSEX  = '"& brsex &"'  OR BRSEX   = '*' )"
		SQL = SQL & "	 AND ( ITEM   = '"& item &"'   OR ITEM   = '*' )"
		SQL = SQL & "	 AND ( ITYPE  = '"& itype &"'  OR ITYPE  = '*' )"
		SQL = SQL & "	 AND ( SEQNO  = '"& seq &"'  OR SEQNO  = '*' )"
		SQL = SQL & "	 AND ( REORDER = '"& reseq &"'  OR REORDER  = '*' )"
		SQL = SQL & "  GROUP BY STDT,HSEQ )"
		


			'response.write SQL
	  	set Rs4=server.createobject("adodb.recordset")
	  	Rs4.CursorLocation = adUseClient
		   Rs4.open SQL,db,adOpenStatic, adLockOptimistic
		IF Rs4.BOF OR Rs4.EOF  THEN
			sacod ="10"
			'response.write sacod	
		ELSE

			sacod =Rs4("sacd")
			dc    =Rs4("dc")
			DCAMT    =Rs4("DCAMT")

		  'Rs4.colse		
		  'set Rs4 = nothing

		END IF
		
	    END IF		
	END IF
    end if
 end if   
  if sacod="20" then
      dc  ="0"  
     sacod="10"
  end if
  
 if  sacod ="20" then 	
 		SQL = "SELECT MG, CDCRT,  CMG"
		SQL = SQL & "  FROM TBA020"  
		SQL = SQL & " WHERE VDCD   ='"& dpcd &"'"
		SQL = SQL & "   AND (JYDT) IN ( SELECT MAX(JYDT)"
		SQL = SQL & "  FROM TBA020"  
		SQL = SQL & " WHERE VDCD   ='"& dpcd &"'"
		SQL = SQL & " AND SALETP = '"& sacod &"'"
		SQL = SQL & " AND JYDT  <= '"& day1 &"'"
		SQL = SQL & " AND DCRT   = '"& dc &"' )"
		SQL = SQL & " 	AND SALETP = '"& sacod &"'"
		SQL = SQL & " 	AND DCRT   = '"& dc &"'"

			'response.write SQL

	  	set Rs5=server.createobject("adodb.recordset")
	  	Rs5.CursorLocation = adUseClient
		   Rs5.open SQL,db,adOpenStatic, adLockOptimistic
 	if Rs5.bof  or Rs5.eof then
		mg = 0 

 	else
 	
 		mg = Rs5("MG")
		'response.write mg 			
 	end if
 	
 	Rs5.close
 	set Rs5 = nothing

 else
 
 		SQL = "SELECT MG, CDCRT,  CMG"
		SQL = SQL & "  FROM TBA020"  
		SQL = SQL & " WHERE VDCD   ='"& dpcd &"'"
		SQL = SQL & "   AND (JYDT) IN ( SELECT MAX(JYDT)"
		SQL = SQL & "  FROM TBA020"  
		SQL = SQL & " WHERE VDCD   ='"& dpcd &"'"
		SQL = SQL & " AND SALETP = '"& sacod &"'"
		SQL = SQL & " AND JYDT  <= '"& day1 &"')"
		SQL = SQL & " 	AND SALETP = '"& sacod &"'"

			'response.write SQL
	  	set Rs6=server.createobject("adodb.recordset")
	  	Rs6.CursorLocation = adUseClient
		   Rs6.open SQL,db,adOpenStatic, adLockOptimistic
 	if Rs6.bof  or Rs6.eof then
		mg = 0 

 	else
 	
 		mg = Rs6("MG")
 		'response.write mg
 	end if
 	
 	Rs6.close
 	set Rs6 = nothing
 
 end if
 	
  silpak = round((100 - cdbl(dc)) * cdbl(price) / 100,0) '실판매가 및 dc 적용판매가
  

 		SQL = "select DECGU from TBB040 where VDCD='"& dpcd &"'"

	  	set Rs7=server.createobject("adodb.recordset")
	  	Rs7.CursorLocation = adUseClient
		   Rs7.open SQL,db,adOpenStatic, adLockOptimistic

 		DECGU	 = Rs7("DECGU") '소숫점구분
 		
	Rs7.close
	set Rs7 = nothing
 		

 silpak = cdbl(silpak)
 
 mg11 = cdbl(mg) * 0.01
CHUL = cdbl(price) * (1 - cdbl(mg11)) 
CHULGA = cdbl(CHUL) / 1.1 '본매장공급가
select case DECGU
	CASE "1" 
		SQL ="select ROUND("& CHULGA &", 0) CHULGA FROM DUAL"
		
	  	set Rs8=server.createobject("adodb.recordset")
	  	Rs8.CursorLocation = adUseClient
		   Rs8.open SQL,db,adOpenStatic, adLockOptimistic
		
		CHULGA = Rs8("CHULGA")
		'CHULGA = ROUND(CHULGA, 0)    // 반올림
	CASE "2"
		SQL ="select CEIL("& CHULGA &") CHULGA FROM DUAL"
		
	  	set Rs8=server.createobject("adodb.recordset")
	  	Rs8.CursorLocation = adUseClient
		   Rs8.open SQL,db,adOpenStatic, adLockOptimistic
		
		CHULGA = Rs8("CHULGA")
		'CHULGA = CEILING(CHULGA)     // 절상
	CASE "3"
		SQL ="select TRUNC("& CHULGA &", 0) CHULGA FROM DUAL"
		
	  	set Rs8=server.createobject("adodb.recordset")
	  	Rs8.CursorLocation = adUseClient
		   Rs8.open SQL,db,adOpenStatic, adLockOptimistic
	
		CHULGA = Rs8("CHULGA")
		'CHULGA = TRUNCATE(CHULGA, 0) // 절하
	CASE ELSE
		SQL ="select ROUND("& CHULGA &", 0) CHULGA FROM DUAL"
		
	  	set Rs8=server.createobject("adodb.recordset")
	  	Rs8.CursorLocation = adUseClient
		   Rs8.open SQL,db,adOpenStatic, adLockOptimistic
		
		CHULGA = Rs8("CHULGA")
		'CHULGA = ROUND(CHULGA, 0)    //기타 미등록 반올림
end select

	Rs8.close
	set Rs8 = Nothing
	
  ' 품번에 대한 현재고(tbwvdcd) 가져옴 
  SQL =" select (ipsu+misu)-(ibsu+mCsu+sasu) jeago "
  SQL =SQL & " from SUMIS.tbwvdcd "
  SQL = SQL & "  WHERE STYCD = '"& style &"'"
  SQL = SQL & " AND COLCD = '"& colcd &"'"
  SQL = SQL & " AND SIZECD ='"&sizecd &"'"
  SQL = SQL & " AND VDCD ='"& l_dpcd &"'"

  jObject("jeago sql") = SQL

  ' Response.Write SQL
  ' Response END
   
   set kk2=server.createobject("adodb.recordset")
   kk2.CursorLocation = adUseClient
   kk2.open SQL,db,adOpenStatic, adLockOptimistic
   
   
   IF kk2.BOF OR kk2.EOF  THEN
    jeago= "0"
   else 
   jeago = trim(kk2("jeago"))
   end If
   


	db.close
	set db = nothing




				jObject("style")		= style
				jObject("colcd")		= colcd
				jObject("sizecd")		= sizecd
				jObject("cnt")			= cnt '갯수
				jObject("price")		= price '소비자가
				jObject("silpak")		= silpak '실판매가 및 적용판매가
				jObject("sacod")		= sacod'판매유형
				jObject("dc")			= dc 'dc율
				jObject("mg")			= mg '마진
				jObject("supri")		= CHULGA ' 본매장공급가
				jObject("jaego")		= jeago
				jObject("spc_chk")		= SPCCHK

				jObject("error") = "0"

				jObject.Flush
			
	
	 End If ' 검색시작

	
End If 
%>