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
   cnt    = trim(Request("cnt"))
   day1   = trim(Request("day1"))

	Dim jObject
	Set jObject = jsObject()
  
	   
	open_dbo
	SQL = "select (select SUMIS.UF_ITEMNM2 (a.ITYPE,a.ITEM) from dual) xstycd, a.STYCD stycd, a.COLCD colcd, a.SIZECD sizecd, a.LAPRI LAPRI, a.STATUS STATUS , a.BRCD,  a.YEAR, a.SEASON,  a.BRSEX, a.ITEM, a.ITYPE, SUBSTR(a.STYCD,6,2) SEQ , 0  RESEQ, nvl(a.SPC_CHK,'N') spc_chk, nvl(b.fipri,0) fipri "
	SQL = SQL & "from SUSPC.TBB070 a, SUMIS.TBB070 b"
 	SQL = SQL & " where a.BARCODE = '"& Ucase(keyword) &"'  and rownum = 1 "  
 	SQL = SQL & " AND a.stycd = b.stycd(+) "  
	set Rs=server.createobject("adodb.recordset")
	Rs.CursorLocation = adUseClient
	Rs.open SQL,db,adOpenStatic, adLockOptimistic
    'Response.Write.sql
   	if rs.eof then
		arrDataNull = true
	else
		arrDataNull = false
		arrData = rs.getRows()
	end if

	rs.close
	set rs=Nothing

If  arrDataNull Then
		
	'close_db
	
	'jObject("error") = "1"
	'jObject("msg") = "최초 상품이 존재하지 않습니다."

	'jObject.Flush
	'Response.end

	'아울렛 정보없음, SUMIS 검색	
	spc_chk = "N"	

	sql = " select nvl(sum(case etc1 when '1' then 1 else 0 end ),0) count, nvl(max(etc1),'1') etc1  "
	sql = sql &"  from SUMIS.tbb153  "
	sql = sql &" where refcd='ORDER' " 
	sql = sql &" AND  ETC2 = SUBSTR('"& UCase(keyword) &"',1,7) " 
	sql = sql &" AND ( ETC3 =SUBSTR('"& UCase(keyword) &"',8,2) OR ETC3 ='*') "
	sql = sql &" AND  (ETC4 =SUBSTR('"& UCase(keyword) &"',10,3) OR ETC4='*') "  
	sql = sql & "AND USEYN='Y'"
   
     
     set Rs10=server.createobject("adodb.recordset")
	 Rs10.CursorLocation = adUseClient
	 Rs10.open sql,db,adOpenStatic, adLockOptimistic
   
   IF Rs10.BOF OR Rs10.EOF  THEN
    cnt2= "0"
    etc1 = "1"
   else 
   	cnt2 = trim(Rs10("count"))
    etc1 = trim(Rs10("etc1"))
   end if
    
  	Rs10.close
	set Rs10=Nothing
                
	SQL = "select  a.STYCD stycd, a.COLCD colcd, a.SIZECD sizecd,a.LAPRI LAPRI,a.STATUS STATUS "
	SQL = SQL & "  from SUMIS.TBB070 a                           "
 	SQL = SQL & " where a.BARCODE = '"& Ucase(keyword) &"' "
 	'SQL = SQL & "   and a.BRCD = '"& BRAND &"'             "
 	SQL = SQL & " order by stycd,colcd,sizecd asc          "
 	
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

	'특정품번 판매 차단 2011년 10월 17일 소병준

    elseif cnt2 >= 1 then
		close_db
		jObject("error") = "1"
		jObject("msg") = "해당 품번은 관리 품번으로 판매을 할 수 없습니다."

		jObject.Flush
		response.end 	

	else


	style  = arrData(0,0)
	colcd  = arrData(1,0)
	sizecd = arrData(2,0)
	LAPRI  = arrData(3,0)
	STATUS = arrData(4,0)
	price1 = LAPRI
	status1=STATUS
	sacod1 = status1 &"0" '판매유형
	dc	   = 0            'dc율

	'작지 스타일정보 TBP040

	SQL = "SELECT (select SUMIS.UF_ITEMNM2 (a.ITYPE,a.ITEM) from dual) XSTYCD, BRCD,YEAR,SEASON,BRSEX,ITEM,ITYPE,SEQ,RESEQ,STYCD "
	SQL = SQL & "  FROM SUMIS.TBP040 a        "
	SQL = SQL & " WHERE STYCD ='"& style &"'"
	SQL = SQL & "   AND ROWNUM = 1          "

	set Rs1=server.createobject("adodb.recordset")
	Rs1.CursorLocation = adUseClient
	Rs1.open SQL,db,adOpenStatic, adLockOptimistic
	
	xstycd = rs1(0)
	brcd   = Rs1(1)
	year1  = Rs1(2)
	season = Rs1(3)
	brsex  = Rs1(4)
	item   = Rs1(5)
	itype  = Rs1(6)
	seq    = Rs1(7)
	reseq  = Rs1(8)
	
	Rs1.close
	set Rs1 = Nothing

	'정상 VDCD검색, 해당 정상의 PCD를 선 select 후 와 BRAND가 일치하는 VDCD search
	SQL = "SELECT MAX(VDCD) VDCD  FROM SUMIS.TBB040"  
	SQL = SQL & "  WHERE PCD = '" & pcd & "'"
	SQL = SQL & "  AND BRAND = '" & brcd & "'"

	set Rs9=server.createobject("adodb.recordset")
	Rs9.CursorLocation = adUseClient
	Rs9.open SQL,db,adOpenStatic, adLockOptimistic
	
	IF Rs9.BOF OR Rs9.EOF  THEN
		'jeago= "0"
	else 
	   l_dpcd  = trim(Rs9("VDCD"))
		'mis_cuscd = l_dpcd & "00000"
	End If
	
	Rs9.close
	set Rs9 = Nothing
	
	'jObject("l_dpcd") = l_dpcd

 	SQL = "SELECT LASTPRI, STATUS, FIPRI, NVL(EVENT,0) EVENT "
 	SQL = SQL & "	FROM SUMIS.TBB072"  
 	SQL = SQL & "  WHERE (STYCD,COLCD,DT) IN ( SELECT STYCD, COLCD, MAX(DT)  FROM SUMIS.TBB072"
 	SQL = SQL & "                       	WHERE STYCD = '"& style &"'"
 	SQL = SQL & "	                          AND COLCD = '"& colcd &"'"
 	SQL = SQL & "	                          AND DT   <= '" & day1 &"'"
 	SQL = SQL & "	                        GROUP BY STYCD, COLCD )" 
 	SQL = SQL & " 	AND ROWNUM = 1"
  
   ' Response.Write SQL

  set KK = server.createobject("adodb.recordset")
  KK.CursorLocation = adUseClient
	KK.open SQL,db,adOpenStatic, adLockOptimistic
	price  = trim(KK("LASTPRI"))
	price  = cdbl(price) 
	fprice = trim(KK("FIPRI"))
	status = trim(KK("STATUS"))
	mi_mg  = trim(KK("EVENT")) '20090327 특정행사 마진 - 처리 
	sacod  = status '판매유형
	KK.close
	set KK = Nothing
	
	'jObject("sacod11") = sacod
 
 ' 품번에 대한 현재고(tbwvdcd) 가져옴 소병준 2011년 6월 7일 

  
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
   end if
 
	'jObject("jaego22") = jeago
 

 if status ="10" then
		 SQL = "SELECT COUNT(STDT) cnt FROM SUMIS.TBS040"
		 SQL = SQL & " WHERE VDCD ='"& l_dpcd &"'"
		 SQL = SQL & " AND STDT <= '" & day1 &"'"
		 SQL = SQL & " AND ( ENDDT >= '" & day1 &"'  OR ENDDT IS NULL)"
		 SQL = SQL & " AND ( BRCD   = '"& brcd &"'   OR BRCD   = '*' )"
		 SQL = SQL & " AND ( YEAR   = '"& year1 &"'  OR YEAR   = '*' )"
		 SQL = SQL & " AND ( SEASON = '"& season &"' OR SEASON = '*' )"
		 SQL = SQL & " AND ( BRSEX  = '"& brsex &"'  OR BRSEX  = '*' )"
		 SQL = SQL & " AND ( ITEM   = '"& item &"'   OR ITEM   = '*' )"	
	 	 SQL = SQL & " AND ( ITYPE  = '"& itype &"'  OR ITYPE  = '*' )"
		 SQL = SQL & " AND ( SEQNO  = '"& seq &"'    OR SEQNO  = '*' )"
	 	 SQL = SQL & " AND ( REORDER = '"& reseq &"' OR REORDER  = '*' )"
		 SQL = SQL & " AND ( COLCD  = '"& colcd &"'  OR COLCD  = '*' )    "

			set Rs2=server.createobject("adodb.recordset")
			Rs2.CursorLocation = adUseClient
			Rs2.open SQL,db,adOpenStatic, adLockOptimistic
			cnt1 = cint(Rs2("cnt"))
			Rs2.close
			set Rs2 = nothing
			
			'response.write  cnt1
			'response.end
			'jObject("cnt1") = cnt1
	
		if cnt1 > 0 then   
			SQL = "SELECT COUNT(*) cnt2 FROM SUMIS.TBS045"    'SALE.제외정보 TBS045		
			SQL = SQL & " WHERE VDCD    ='"& l_dpcd &"'"
			SQL = SQL & " AND STDT   <= '" & day1 &"'"
			SQL = SQL & " AND (ENDDT >= '" & day1 &"' OR ENDDT IS NULL)"
			SQL = SQL & " AND STYCD = '" & style &"'"
	 	  SQL = SQL & "	AND ( COLCD = '"& colcd &"' OR COLCD  = '*' )"      
		 'response.write SQL
	  	set Rs3=server.createobject("adodb.recordset")
	  	Rs3.CursorLocation = adUseClient
		  Rs3.open SQL,db,adOpenStatic, adLockOptimistic
		  cnt2 = cint(Rs3("cnt2"))
		 'response.write cnt2


			
	  	Rs3.close
		set Rs3 = Nothing

		jObject("cnt2") = cnt2
			
				IF cnt1 > 1 THEN	'세일정보가 2개이상일때
				    if cnt1 <= cnt2 then	
								sacod  = "10"           
								price  = price
								
								'response.write sacod &"&nbsp;"& price
				    else
				    				'2009년 5월4일 변경 
					      SQL =       "  SELECT '20' sacd, nvl(dcrt,0) dc,DCAMT                                          "
                         	SQL = SQL & "    FROM SUMIS.TBS040                                                                   "
                         	SQL = SQL & "   WHERE VDCD ='"& l_dpcd &"'                                                       "
                         	SQL = SQL & "  	  AND ( STDT,HSEQ,SEQ ) IN ( SELECT STDT,HSEQ,SEQ                              "   
                         	SQL = SQL & "  	                               FROM                                            "
                         	SQL = SQL & "   		                            ( SELECT    STDT,HSEQ,SEQ                  "   
                         	SQL = SQL & "			                                FROM                                   "
                         	SQL = SQL & "	    			                           ( SELECT STDT,HSEQ,  SEQ            "  
                         	SQL = SQL & "				                                  FROM SUMIS.TBS040                      "
                         	SQL = SQL & "					                              WHERE VDCD ='"& l_dpcd &"'           "
                         	SQL = SQL & "					                                AND STDT IN ( SELECT STDT      "
                         	SQL = SQL & "		 			                                                FROM SUMIS.TBS040                       "
                         	SQL = SQL & "													               WHERE VDCD ='"& l_dpcd &"'                "
                         	SQL = SQL & "													                 AND STDT <='"& day1 &"'            "
                         	SQL = SQL & "														               AND ( ENDDT >= '"& day1 &"'   OR ENDDT IS NULL)   "
                         	SQL = SQL & "														               AND ( BRCD   = '"& brcd &"'   OR BRCD   = '*' )        "
                         	SQL = SQL & "														               AND ( YEAR   = '"& year1 &"'  OR YEAR   = '*' )        "
                         	SQL = SQL & "														               AND ( SEASON = '"& season &"' OR SEASON = '*' )        "
                         	SQL = SQL & "														               AND ( BRSEX  = '"& brsex &"'  OR BRSEX  = '*' )        "
                         	SQL = SQL & "														               AND ( ITEM   = '"& item &"'   OR ITEM   = '*' )        "
                         	SQL = SQL & "														               AND ( ITYPE  = '"& itype &"'  OR ITYPE  = '*' )        "
                         	SQL = SQL & "														               AND ( COLCD  = '"& colcd &"'  OR COLCD  = '*' )        "
                         	SQL = SQL & "														               AND ( SEQNO  = '"& seq &"'    OR SEQNO  = '*' )        "
                         	SQL = SQL & "														               AND ( REORDER = '"& reseq &"'  OR REORDER= '*' ) )      "
                         	SQL = SQL & "												     AND ( BRCD   = '"& brcd &"'   OR BRCD   = '*' )         "
                         	SQL = SQL & "												     AND ( YEAR   = '"& year1 &"'  OR YEAR   = '*' )         "
                         	SQL = SQL & "												     AND ( SEASON = '"& season &"' OR SEASON = '*' )         "
                         	SQL = SQL & "												     AND ( BRSEX  = '"& brsex &"'  OR BRSEX  = '*' )         "
                         	SQL = SQL & "													   AND ( ITEM   = '"& item &"'   OR ITEM   = '*' )         "
                         	SQL = SQL & "													   AND ( ITYPE  = '"& itype &"'  OR ITYPE  = '*' )         "
                         	SQL = SQL & "													   AND ( COLCD  = '"& colcd &"'  OR COLCD  = '*' )         "
                         	SQL = SQL & "												     AND ( SEQNO  = '"& seq &"'    OR SEQNO  = '*' )         "
                         	SQL = SQL & "													   AND ( REORDER = '"& reseq &"' OR REORDER= '*' )         "
                         	SQL = SQL & "										 	 MINUS                                                  "
                         	SQL = SQL & "										 		  SELECT A.STDT,A.HSEQ, A.SEQ              "    
                         	SQL = SQL & "												    FROM SUMIS.TBS040 A, SUMIS.TBS045 B                "
                         	SQL = SQL & "												   WHERE A.VDCD = B.VDCD                   "
                         	SQL = SQL & "													   AND A.STDT = B.STDT                   "
                         	SQL = SQL & "												     AND A.HSEQ = B.HSEQ                   "
                         	SQL = SQL & "												     AND A.VDCD ='"& l_dpcd &"'                   "
                         	SQL = SQL & "												     AND A.STDT IN ( SELECT  STDT          "   
                         	SQL = SQL & "														               FROM SUMIS.TBS040                      "
                         	SQL = SQL & "													                  WHERE VDCD ='"& l_dpcd &"'               "
                         	SQL = SQL & "														                AND STDT <='"& day1 &"'              "
                         	SQL = SQL & "														                AND ( ENDDT >= '"& day1 &"'   OR ENDDT IS NULL)  "
                         	SQL = SQL & "														                AND ( BRCD   = '"& brcd &"'   OR BRCD   = '*' )         "
                         	SQL = SQL & "														                AND ( YEAR   = '"& year1 &"'  OR YEAR   = '*' )         "
                         	SQL = SQL & "														                AND ( SEASON = '"& season &"' OR SEASON = '*' )         "
                         	SQL = SQL & "														                AND ( BRSEX  = '"& brsex &"'  OR BRSEX  = '*' )         "
                         	SQL = SQL & "														                AND ( ITEM   = '"& item &"'   OR ITEM   = '*' )         "
                         	SQL = SQL & "														                AND ( ITYPE  = '"& itype &"'  OR ITYPE  = '*' )         "
                         	SQL = SQL & "														                AND ( COLCD  = '"& colcd &"'  OR COLCD  = '*' )         "
                         	SQL = SQL & "														                AND ( SEQNO  = '"& seq &"'    OR SEQNO  = '*' )         "
                         	SQL = SQL & "														                AND ( REORDER = '"& reseq &"' OR REORDER = '*' ))        "
                         	SQL = SQL & "												   AND ( A.BRCD   = '"& brcd &"'    OR A.BRCD   = '*' )     "
                         	SQL = SQL & "													 AND ( A.YEAR   = '"& year1 &"'   OR A.YEAR   = '*' )     "
                         	SQL = SQL & "												   AND ( A.SEASON = '"& season &"'  OR A.SEASON = '*' )     "
                         	SQL = SQL & "													 AND ( A.BRSEX  = '"& brsex &"'   OR A.BRSEX  = '*' )     "
                         	SQL = SQL & "													 AND ( A.ITEM   = '"& item &"'    OR A.ITEM   = '*' )     "
                         	SQL = SQL & "													 AND ( A.ITYPE  = '"& itype &"'   OR A.ITYPE  = '*' )     "
                         	SQL = SQL & "													 AND ( A.COLCD  = '"& colcd &"'   OR A.COLCD  = '*' )     "
                         	SQL = SQL & "												   AND ( A.SEQNO  = '"& seq &"'     OR A.SEQNO  = '*' )     "
                         	SQL = SQL & "													 AND ( A.REORDER = '"& reseq &"'  OR A.REORDER= '*' )     "
                         	SQL = SQL & "													 AND ( B.STYCD   = '" & style &"' )                       "     
                         	SQL = SQL & "							 	           AND ( B.COLCD   = '"& colcd &"'  OR B.COLCD   = '*' )    "     
                         	SQL = SQL & "													                                  )  A                    "    
                         	SQL = SQL & "											   WHERE STDT <='"& day1 &"'                                  "  
                         	SQL = SQL & "											   ORDER BY   STDT DESC ,HSEQ DESC,  SEQ DESC  ) C                "
                         	SQL = SQL & "                                              WHERE ROWNUM = 1           "
                         	SQL = SQL & "													         )            "
				 
 	 
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
								SQL = "SELECT '20' sacd, nvl(dcrt,0) dc,DCAMT"
								SQL = SQL & "  FROM SUMIS.TBS040"
								SQL = SQL & " WHERE VDCD ='"& l_dpcd &"'"
								SQL = SQL & "	AND ( STDT,HSEQ,SEQ ) = ( SELECT STDT,HSEQ,MAX(SEQ)"
								SQL = SQL & "	 FROM SUMIS.TBS040"
								SQL = SQL & "	WHERE VDCD ='"& l_dpcd &"'"
								
								SQL = SQL & "	  AND STDT = ( SELECT MAX(STDT)"
								SQL = SQL & "	FROM SUMIS.TBS040"
								SQL = SQL & "  WHERE VDCD ='"& l_dpcd &"'"
								SQL = SQL & "			AND STDT <='"& day1 &"'"
								SQL = SQL & "			AND ( ENDDT >= '"& day1 &"' OR ENDDT IS NULL)"
								SQL = SQL & "			AND ( BRCD   = '"& brcd &"'   OR BRCD   = '*' )"
								SQL = SQL & "			AND ( YEAR   = '"& year1 &"'   OR YEAR   = '*' )"
								SQL = SQL & "			AND ( SEASON = '"& season &"' OR SEASON = '*' )"
								SQL = SQL & "			AND ( BRSEX  = '"& brsex &"'  OR BRSEX  = '*' )"
								SQL = SQL & "			AND ( ITEM   = '"& item &"'   OR ITEM   = '*' )" 
								SQL = SQL & "			AND ( ITYPE  = '"& itype &"'  OR ITYPE  = '*' )"
								SQL = SQL & "			AND ( SEQNO  = '"& seq &"'  OR SEQNO  = '*' )"
							  SQL = SQL & "	      AND ( COLCD  = '"& colcd &"'  OR COLCD  = '*' )    "
								SQL = SQL & "			AND ( REORDER = '"& reseq &"' OR REORDER  = '*' ))"
						
								SQL = SQL & "	  AND ENDDT >= '"& day1 &"'"
								SQL = SQL & "	 AND ( BRCD   = '"& brcd &"'   OR BRCD   = '*' )"
								SQL = SQL & "	 AND ( YEAR   = '"& year1 &"'   OR YEAR   = '*' )"
								SQL = SQL & "	 AND ( SEASON = '"& season &"' OR SEASON = '*' )"
								SQL = SQL & "	 AND ( BRSEX  = '"& brsex &"'  OR BRSEX   = '*' )"
								SQL = SQL & "	 AND ( ITEM   = '"& item &"'   OR ITEM   = '*' )"
								SQL = SQL & "	 AND ( ITYPE  = '"& itype &"'  OR ITYPE  = '*' )"
								SQL = SQL & "	 AND ( SEQNO  = '"& seq &"'  OR SEQNO  = '*' )"
							SQL = SQL & "	   AND ( COLCD  = '"& colcd &"'  OR COLCD  = '*' )    "
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
  
  
  
if  sacod ="20" then 	
		 		SQL = "SELECT MG, CDCRT,  CMG"
				SQL = SQL & "  FROM SUMIS.TBA020   "  
				SQL = SQL & " WHERE VDCD   ='"& l_dpcd &"'"
				SQL = SQL & "   AND (JYDT) IN ( SELECT MAX(JYDT)"
				SQL = SQL & "  FROM TBA020   "  
				SQL = SQL & " WHERE VDCD = '"& l_dpcd &"' "
				SQL = SQL & " AND SALETP = '"& sacod &"'"
				SQL = SQL & " AND JYDT  <= '"& day1 &"' "
				SQL = SQL & " AND DCRT   = '"& dc &"' ) "
				SQL = SQL & " 	AND SALETP = '"& sacod &"'"
				SQL = SQL & " 	AND DCRT   = '"& dc &"' "
		
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
	
	 elseif sacod ="30" then  
	 
	 		  fdcrt = ABS ( 100 - ( cdbl(price)  / cdbl(fprice)  ) * 100  )    '최초가대비 가격 올렸을경우 DCRT처리 20160122 by yun
		    		
		 		SQL = "SELECT JYDT,      MAX(DCRT) DCRT "  
				SQL = SQL & "  FROM SUMIS.TBA020   "  
				SQL = SQL & " WHERE VDCD   ='"& l_dpcd &"'"
				SQL = SQL & "   AND (JYDT) IN ( SELECT MAX(JYDT)"
				SQL = SQL & "                     FROM SUMIS.TBA020   "  
				SQL = SQL & "                    WHERE VDCD = '"& l_dpcd &"' "
				SQL = SQL & "                      AND SALETP = '"& sacod &"'"
				SQL = SQL & "                      AND JYDT  <= '"& day1 &"' ) "
				SQL = SQL & " 	AND SALETP = '"& sacod &"'"
				SQL = SQL & " 	AND DCRT  <= '"& fdcrt &"'"
				SQL = SQL & " GROUP BY JYDT             "
		
					 'response.write SQL
		
			  	set Rs8=server.createobject("adodb.recordset")
			  	Rs8.CursorLocation = adUseClient
				   Rs8.open SQL,db,adOpenStatic, adLockOptimistic
				 	if Rs8.bof  or Rs8.eof then 
				 		 jydt  = Rs8("JYDT")
				 		 edcrt = 0
				 	else 
				 		 jydt  = Rs8("JYDT")
				 		 edcrt = Rs8("DCRT") 
						'response.write edcrt		
				 	end if
				 	
				 	Rs8.close
				 	set Rs8 = nothing	 

			 		SQL = "SELECT  MG,  CDCRT,  CMG "
					SQL = SQL & "  FROM SUMIS.TBA020   "  
					SQL = SQL & " WHERE VDCD   = '"& l_dpcd &"'"
					SQL = SQL & "   AND JYDT   = '"& jydt &"'" 
					SQL = SQL & "   AND SALETP = '"& sacod &"'" 
					SQL = SQL & " 	AND DCRT   = '"& edcrt &"' "
		
					'response.write SQL
					'response.end
		
			  	set Rs9=server.createobject("adodb.recordset")
			  	Rs9.CursorLocation = adUseClient
				  Rs9.open SQL,db,adOpenStatic, adLockOptimistic
				 	if Rs9.bof  or Rs9.eof then
						 mg = 0  
				 	else  
				 		 mg = Rs9("MG") 
						'response.write edcrt		
				 	end if
				 	
				 	Rs9.close
				 	set Rs9 = nothing	    
	 
	 else 
				
					SQL = "    SELECT MG, CDCRT,  CMG"
					SQL = SQL & "      FROM SUMIS.TBA020 A"
					SQL = SQL & "     WHERE VDCD   ='"& l_dpcd &"'"
					SQL = SQL & "      AND (JYDT) IN ( SELECT MAX(JYDT)"
					SQL = SQL & "           FROM SUMIS.TBA020  "
					SQL = SQL & "         WHERE A.VDCD = VDCD"
					SQL = SQL & "         AND A.SALETP = SALETP"
					SQL = SQL & "          AND JYDT  <= '"& day1 &"'"
					SQL = SQL & "         AND A.DCRT = DCRT)"
					SQL = SQL & "     AND SALETP = '"& sacod &"'"
					SQL = SQL & "     AND DCRT   = '"& dc &"'"
				
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
	 
	 
	 'vvip 우대 추가 
		SQL = "    SELECT MG, CDCRT,  CMG"
		SQL = SQL & "      FROM SUMIS.TBA020 A"
		SQL = SQL & "     WHERE VDCD   ='"& l_dpcd &"'"
		SQL = SQL & "      AND (JYDT) IN ( SELECT MAX(JYDT)"
		SQL = SQL & "           FROM SUMIS.TBA020  "
		SQL = SQL & "         WHERE A.VDCD = VDCD"
		SQL = SQL & "         AND A.SALETP = SALETP"
		SQL = SQL & "          AND JYDT  <= '"& day1 &"'"
		SQL = SQL & "         AND A.DCRT = DCRT)"
		SQL = SQL & "     AND SALETP = '40'"
		SQL = SQL & "     AND DCRT   = '0'"
		
		'response.write SQL
		set Rs10=server.createobject("adodb.recordset")
		Rs10.CursorLocation = adUseClient
		 Rs10.open SQL,db,adOpenStatic, adLockOptimistic
		if Rs10.bof  or Rs10.eof then
			mg2 = 0 
		else
			mg2 = Rs10("MG")
			'response.write mg
		end if
		
		Rs10.close
		set Rs10 = nothing
				 	
	 
	 
	  '20100508 임페리얼 브랜드데이 처리 dc 추가 10%   -> 끝난후  20100528~31일 또 추가
	  '주석처리 할 것 2018 07 03
	 if day1 >= "20100528" and day1 <= "20100531" and BRAND = "I"  and year1 = "Q"  and itype <> "A" and ( sacod ="10" or sacod ="20" ) and ( season ="1" or season ="2" ) then
	   ' dc = dc + 10 
	    brcdday = "Y"   
	 else
	    brcdday = "N"
	 end if 
	  
	 	 
	 	'20090331 특정행사 대리점만마진 - 처리 
		SQL = "SELECT SHGU FROM SUMIS.TBB040"
		SQL = SQL & " WHERE  VDCD  = '"& l_dpcd &"' " 
	
		set Rs8=server.createobject("adodb.recordset")
		Rs8.CursorLocation = adUseClient
		Rs8.open SQL,db,adOpenStatic, adLockOptimistic
	
		shgu = Rs8("SHGU")    
	
		Rs8.close
		set Rs8 = nothing
		
			 
 		IF mg <> "0" and shgu = "D" THEN
		   mg = cdbl(mg)  - cdbl(mi_mg) '20090327 특정행사 대리점만마진 - 처리 
		END IF 
		
    
    IF brcdday = "N" THEN
	     silpak = round((100 - cdbl(dc)) * cdbl(price) / 100,0) '실판매가 및 dc 적용판매가
	  ElSE
	     silpak = round((100 - cdbl(dc)) * cdbl(price) / 100,0) '실판매가 및 dc 적용판매가	
	     silpak =   silpak * 0.9
	     dc = dc + (  10 -  (dc * 0.1) )
	  END IF
			'response.write silpak &"&nbsp;"& dc &"&nbsp;"& mg &"&nbsp;"& sacod	   
	
	
		IF  sacod ="20" AND dc ="0" AND DCAMT <> "0" THEN
		
			silpak = DCAMT
			dc = 100-(cdbl(DCAMT) / cdbl(price) * 100)
			dc = cint(dc)
		END IF 
	 
	
		SQL = "SELECT REFSNM FROM SUMIS.TBB150"
		SQL = SQL & " WHERE  REFTP = 'S2'"
		SQL = SQL & " AND REFCD = '"& sacod &"'"  
		SQL = SQL & " AND REFCD <> '0000' AND USEYN = 'Y'"
	
		set Rs7=server.createobject("adodb.recordset")
		Rs7.CursorLocation = adUseClient
		Rs7.open SQL,db,adOpenStatic, adLockOptimistic
	
		type1 = Rs7("REFSNM")    
	
		Rs7.close
		set Rs7 = Nothing

		'tbb070_t_price 매장별세일
		SQL = "SELECT ACOST , GUBUN "
		SQL = SQL & "  FROM SUSPC.TBB070_T_PRICE "  
		SQL = SQL & " WHERE VDCD   ='"& dpcd &"'"
		SQL = SQL & "   AND  '"& day1 &"' between STDT and ENDDT "
		SQL = SQL & "   AND STYCD   = '"& style &"'" 
		'response.write SQL

		set Rs10=server.createobject("adodb.recordset")
		Rs10.CursorLocation = adUseClient
		Rs10.open SQL,db,adOpenStatic, adLockOptimistic
			If  Rs10.bof  Or  Rs10.eof Then 
				t_price_yn = "N" 
			Else  
				t_price_yn = "Y" 
				sale_gb = Rs10("GUBUN") 	
					If sale_gb = "1" Then 
						silpak = Rs10("ACOST")
					Else
						dc = Rs10("ACOST")
						silpak = round((100 - cdbl(dc)) * cdbl(price) / 100,0)					
					End If 
			End If 

		Rs10.close
		set Rs10 = Nothing
		
		jObject("xstycd")		= xstycd
		jObject("style")		= style
		jObject("colcd")		= colcd
		jObject("sizecd")		= sizecd
		jObject("barcode")		= keyword
		jObject("cnt")			= cnt
		jObject("lapri")		= price
		jObject("silpak")		= silpak
		jObject("sacod")		= sacod
		jObject("type1")		= type1
		jObject("dc")			= dc
		jObject("mg")			= mg
		'jObject("mg2")			= mg2
		jObject("itype2")		= itype
		jObject("year2")		= year2
		jObject("season2")		= season2
		jObject("brcdday")		= brcdday
		jObject("jaego")		= jeago
		'jObject("colcd1")		= "0"
		'jObject("sizecd1")		= "0"
		'jObject("colocd_sized")	= colocd_sized
		jObject("fipri")		= fprice
		'jObject("etc1")			= etc1	
		jObject("spc_chk")		= spc_chk
		'jObject("t_price_yn")	= "0"
		jObject("t_price_yn")	= t_price_yn
		jObject("t_price_gb")	= sale_gb

		jObject("year") = year1
		jObject("brcd") = brcd

		jObject("error") = "0"

		jObject.Flush

	end if

Else '상품코드 존재시start

			
	xstycd	= arrData(0,0)
	style	= arrData(1,0)
	colcd	= arrData(2,0)
	sizecd	= arrData(3,0)
	LAPRI	= arrData(4,0)
	STATUS	= arrData(5,0)

	brcd	= arrData(6,0)
	year1	= arrData(7,0)
	season	= arrData(8,0)
	brsex	= arrData(9,0)
	item	= arrData(10,0)
	itype	= arrData(11,0)
	seq		= arrData(12,0)
	reseq	= arrData(13,0) 
	spc_chk = arrData(14,0) 
	fipri	= arrData(15,0)

	'SPC_CHK에 따라 분기
	
		
	dc	= 0  'dc율

	If spc_chk = "Y" Then

		SQL = "       SELECT LASTPRI, STATUS  FROM SUSPC.TBB072"  
		SQL = SQL & "  WHERE (STYCD, COLCD, DT) IN ( SELECT STYCD, COLCD, MAX(DT)  FROM SUSPC.TBB072"
		SQL = SQL & "                               	WHERE STYCD = '"& style &"'"
		SQL = SQL & "	                                  AND COLCD = '"& colcd &"'"
		SQL = SQL & "	                                  AND DT   <= '" & day1 &"'"
		SQL = SQL & "	                                GROUP BY STYCD, COLCD )" 
		SQL = SQL & " 	AND ROWNUM = 1"

		set KK=server.createobject("adodb.recordset")
		KK.CursorLocation = adUseClient
		KK.open SQL,db,adOpenStatic, adLockOptimistic

		price  = trim(KK("LASTPRI"))
		price  = cdbl(price)
		status = trim(KK("STATUS"))
		sacod  = status '판매유형

		KK.close
		set KK = nothing 

		' 품번에 대한 현재고(tbwvdcd) 가져옴 소병준 2011년 6월 7일   
		SQL =" select (ipsu+misu)-(ibsu+mcsu+sasu) jeago "
		SQL =sql & " from SUSPC.tbwvdcd "
		SQL = SQL & "  WHERE STYCD = '"& style &"'"
		SQL = SQL & " AND COLCD = '"& colcd &"'"
		SQL = SQL & " AND SIZECD ='"&SIZECD &"'"
		SQL = SQL & " and VDCD ='"& pcd &"'"
		set kk2=server.createobject("adodb.recordset")
		kk2.CursorLocation = adUseClient
		kk2.open SQL,db,adOpenStatic, adLockOptimistic

		IF kk2.BOF OR kk2.EOF  THEN
			jeago= "0"
		else 
			jeago = trim(kk2("jeago"))
		end if


		If status ="10" Then '정상제품일경우 start 
				 SQL = "SELECT COUNT(STDT) cnt FROM SUSPC.TBS040"
				 SQL = SQL & " WHERE VDCD ='"& pcd &"'"
				 SQL = SQL & " AND STDT <= '" & day1 &"'"
				 SQL = SQL & " AND ( ENDDT >= '" & day1 &"'  OR ENDDT IS NULL)"
				 SQL = SQL & " AND ( BRCD   = '"& brcd &"'   OR BRCD   = '*' )"
				 SQL = SQL & " AND ( YEAR   = '"& year1 &"'  OR YEAR   = '*' )"
				 SQL = SQL & " AND ( SEASON = '"& season &"' OR SEASON = '*' )"
				 SQL = SQL & " AND ( BRSEX  = '"& brsex &"'  OR BRSEX  = '*' )"
				 SQL = SQL & " AND ( ITEM   = '"& item &"'   OR ITEM   = '*' )"	
				 SQL = SQL & " AND ( ITYPE  = '"& itype &"'  OR ITYPE  = '*' )"
				 SQL = SQL & " AND ( SEQNO  = '"& seq &"'     OR SEQNO  = '*' )"
				 SQL = SQL & " AND ( REORDER = '"& reseq &"'  OR REORDER  = '*' )"
			
				set Rs2=server.createobject("adodb.recordset")
				Rs2.CursorLocation = adUseClient
				Rs2.open SQL,db,adOpenStatic, adLockOptimistic
				cnt1 = cint(Rs2("cnt"))
				Rs2.close
				set Rs2 = nothing
					
				If  cnt1 > 0 Then    
							SQL = "SELECT COUNT(*) cnt2 FROM SUSPC.TBS045"    'SALE.제외정보 TBS045		
							SQL = SQL & " WHERE VDCD    ='"& pcd &"'"
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
							set Rs3 = Nothing
							
							IF cnt1 > 1 THEN	'세일정보가 2개이상일때
								if cnt1 <= cnt2 then	
								sacod  = "10"           
								price  = price
								
								'response.write sacod &"&nbsp;"& price
							Else 
							
															'2009년 5월4일 변경 
									SQL =       "  SELECT '20' sacd, nvl(dcrt,0) dc,DCAMT                                          "
									SQL = SQL & "    FROM SUSPC.TBS040                                                                   "
									SQL = SQL & "   WHERE VDCD ='"& pcd &"'                                                       "
									SQL = SQL & "  	  AND ( STDT,HSEQ,SEQ ) IN ( SELECT STDT,HSEQ,SEQ                              "   
									SQL = SQL & "  	                               FROM                                            "
									SQL = SQL & "   		                            ( SELECT    STDT,HSEQ,SEQ                  "   
									SQL = SQL & "			                                FROM                                   "
									SQL = SQL & "	    			                           ( SELECT STDT,HSEQ,  SEQ            "  
									SQL = SQL & "				                                  FROM SUSPC.TBS040                      "
									SQL = SQL & "					                              WHERE VDCD ='"& pcd &"'           "
									SQL = SQL & "					                                AND STDT IN ( SELECT STDT      "
									SQL = SQL & "		 			                                                FROM SUSPC.TBS040                       "
									SQL = SQL & "													               WHERE VDCD ='"& pcd &"'                "
									SQL = SQL & "													                 AND STDT <='"& day1 &"'            "
									SQL = SQL & "														               AND ( ENDDT >= '"& day1 &"'   OR ENDDT IS NULL)   "
									SQL = SQL & "														               AND ( BRCD   = '"& brcd &"'   OR BRCD   = '*' )        "
									SQL = SQL & "														               AND ( YEAR   = '"& year1 &"'  OR YEAR   = '*' )        "
									SQL = SQL & "														               AND ( SEASON = '"& season &"' OR SEASON = '*' )        "
									SQL = SQL & "														               AND ( BRSEX  = '"& brsex &"'  OR BRSEX  = '*' )        "
									SQL = SQL & "														               AND ( ITEM   = '"& item &"'   OR ITEM   = '*' )        "
									SQL = SQL & "														               AND ( ITYPE  = '"& itype &"'  OR ITYPE  = '*' )        " 
									SQL = SQL & "														               AND ( SEQNO  = '"& seq &"'    OR SEQNO  = '*' )        "
									SQL = SQL & "														               AND ( REORDER = '"& reseq &"'  OR REORDER= '*' ) )      "
									SQL = SQL & "												     AND ( BRCD   = '"& brcd &"'   OR BRCD   = '*' )         "
									SQL = SQL & "												     AND ( YEAR   = '"& year1 &"'  OR YEAR   = '*' )         "
									SQL = SQL & "												     AND ( SEASON = '"& season &"' OR SEASON = '*' )         "
									SQL = SQL & "												     AND ( BRSEX  = '"& brsex &"'  OR BRSEX  = '*' )         "
									SQL = SQL & "													   AND ( ITEM   = '"& item &"'   OR ITEM   = '*' )         "
									SQL = SQL & "													   AND ( ITYPE  = '"& itype &"'  OR ITYPE  = '*' )         " 
									SQL = SQL & "												     AND ( SEQNO  = '"& seq &"'    OR SEQNO  = '*' )         "
									SQL = SQL & "													   AND ( REORDER = '"& reseq &"' OR REORDER= '*' )         "
									SQL = SQL & "										 	 MINUS                                                  "
									SQL = SQL & "										 		  SELECT A.STDT,A.HSEQ, A.SEQ              "    
									SQL = SQL & "												    FROM SUSPC.TBS040 A, SUSPC.TBS045 B                "
									SQL = SQL & "												   WHERE A.VDCD = B.VDCD                   "
									SQL = SQL & "													   AND A.STDT = B.STDT                   "
									SQL = SQL & "												     AND A.HSEQ = B.HSEQ                   "
									SQL = SQL & "												     AND A.VDCD ='"& pcd &"'                   "
									SQL = SQL & "												     AND A.STDT IN ( SELECT  STDT          "   
									SQL = SQL & "														               FROM SUSPC.TBS040                      "
									SQL = SQL & "													                  WHERE VDCD ='"& pcd &"'               "
									SQL = SQL & "														                AND STDT <='"& day1 &"'              "
									SQL = SQL & "														                AND ( ENDDT >= '"& day1 &"'   OR ENDDT IS NULL)  "
									SQL = SQL & "														                AND ( BRCD   = '"& brcd &"'   OR BRCD   = '*' )         "
									SQL = SQL & "														                AND ( YEAR   = '"& year1 &"'  OR YEAR   = '*' )         "
									SQL = SQL & "														                AND ( SEASON = '"& season &"' OR SEASON = '*' )         "
									SQL = SQL & "														                AND ( BRSEX  = '"& brsex &"'  OR BRSEX  = '*' )         "
									SQL = SQL & "														                AND ( ITEM   = '"& item &"'   OR ITEM   = '*' )         "
									SQL = SQL & "														                AND ( ITYPE  = '"& itype &"'  OR ITYPE  = '*' )         " 
									SQL = SQL & "														                AND ( SEQNO  = '"& seq &"'    OR SEQNO  = '*' )         "
									SQL = SQL & "														                AND ( REORDER = '"& reseq &"' OR REORDER = '*' ))        "
									SQL = SQL & "												   AND ( A.BRCD   = '"& brcd &"'    OR A.BRCD   = '*' )     "
									SQL = SQL & "													 AND ( A.YEAR   = '"& year1 &"'   OR A.YEAR   = '*' )     "
									SQL = SQL & "												   AND ( A.SEASON = '"& season &"'  OR A.SEASON = '*' )     "
									SQL = SQL & "													 AND ( A.BRSEX  = '"& brsex &"'   OR A.BRSEX  = '*' )     "
									SQL = SQL & "													 AND ( A.ITEM   = '"& item &"'    OR A.ITEM   = '*' )     "
									SQL = SQL & "													 AND ( A.ITYPE  = '"& itype &"'   OR A.ITYPE  = '*' )     " 
									SQL = SQL & "												   AND ( A.SEQNO  = '"& seq &"'     OR A.SEQNO  = '*' )     "
									SQL = SQL & "													 AND ( A.REORDER = '"& reseq &"'  OR A.REORDER= '*' )     "
									SQL = SQL & "													 AND ( B.STYCD   = '" & style &"' )                       "      
									SQL = SQL & "													                                  )  A                    "    
									SQL = SQL & "											   WHERE STDT <='"& day1 &"'                                  "  
									SQL = SQL & "											   ORDER BY   STDT DESC ,HSEQ DESC,  SEQ DESC  ) C                "
									SQL = SQL & "                                              WHERE ROWNUM = 1           "
									SQL = SQL & "													         )            "
																		   
									response.write SQL
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
					
									If  cnt2 > 0 Then 	
												sacod  = "10"           
												price  = price					
										 'response.write sacod &"&nbsp;"& price
									Else 
												SQL = "SELECT '20' sacd, nvl(dcrt,0) dc,DCAMT"
												SQL = SQL & "  FROM SUSPC.TBS040"
												SQL = SQL & " WHERE VDCD ='"& pcd &"'"
												SQL = SQL & "	AND ( STDT,HSEQ,SEQ ) = ( SELECT STDT,HSEQ,MAX(SEQ)"
												SQL = SQL & "	                            FROM SUSPC.TBS040"
												SQL = SQL & "	                           WHERE VDCD ='"& pcd &"'"					
												SQL = SQL & "	                             AND STDT = ( SELECT MAX(STDT)"
												SQL = SQL & "	FROM SUSPC.TBS040"
												SQL = SQL & "  WHERE VDCD ='"& pcd &"'"
												SQL = SQL & "			AND STDT <='"& day1 &"'"
												SQL = SQL & "			AND ( ENDDT >= '"& day1 &"'   OR ENDDT IS NULL)"
												SQL = SQL & "			AND ( BRCD   = '"& brcd &"'   OR BRCD   = '*' )"
												SQL = SQL & "			AND ( YEAR   = '"& year1 &"'  OR YEAR   = '*' )"
												SQL = SQL & "			AND ( SEASON = '"& season &"' OR SEASON = '*' )"
												SQL = SQL & "			AND ( BRSEX  = '"& brsex &"'  OR BRSEX  = '*' )"
												SQL = SQL & "			AND ( ITEM   = '"& item &"'   OR ITEM   = '*' )" 
												SQL = SQL & "			AND ( ITYPE  = '"& itype &"'  OR ITYPE  = '*' )"
												SQL = SQL & "			AND ( SEQNO  = '"& seq &"'    OR SEQNO  = '*' )"
												SQL = SQL & "			AND ( REORDER = '"& reseq &"' OR REORDER  = '*' ))"
										
												SQL = SQL & "	  AND ENDDT    >= '"& day1 &"'"
												SQL = SQL & "	  AND ( BRCD    = '"& brcd &"'   OR BRCD    = '*' )"
												SQL = SQL & "	  AND ( YEAR    = '"& year1 &"'  OR YEAR    = '*' )"
												SQL = SQL & "	  AND ( SEASON  = '"& season &"' OR SEASON  = '*' )"
												SQL = SQL & "	  AND ( BRSEX   = '"& brsex &"'  OR BRSEX   = '*' )"
												SQL = SQL & "	  AND ( ITEM    = '"& item &"'   OR ITEM    = '*' )"
												SQL = SQL & "	  AND ( ITYPE   = '"& itype &"'  OR ITYPE   = '*' )"
												SQL = SQL & "	  AND ( SEQNO   = '"& seq &"'    OR SEQNO   = '*' )"
												SQL = SQL & "	  AND ( REORDER = '"& reseq &"'  OR REORDER = '*' )"
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
				End If 
		End If '정상제품일경우 end 

		If status ="40" Then'균일제품일경우start
			SQL = "SELECT COUNT(STDT) cnt3 FROM SUSPC.TBS060"
			SQL = SQL & " WHERE VDCD ='"& pcd &"'"
			SQL = SQL & " AND STDT <= '" & day1 &"'"
			SQL = SQL & " AND ( ENDDT >= '" & day1 &"'  OR ENDDT IS NULL)"
			SQL = SQL & " AND ( BRCD   = '"& brcd &"'   OR BRCD   = '*' )"
			SQL = SQL & " AND ( YEAR   = '"& year1 &"'  OR YEAR   = '*' )"
			SQL = SQL & " AND ( SEASON = '"& season &"' OR SEASON = '*' )"
			SQL = SQL & " AND ( BRSEX  = '"& brsex &"'  OR BRSEX  = '*' )"
			SQL = SQL & " AND ( ITEM   = '"& item &"'   OR ITEM   = '*' )"	
			SQL = SQL & " AND ( ITYPE  = '"& itype &"'  OR ITYPE  = '*' )"
			SQL = SQL & " AND ( SEQNO  = '"& seq &"'     OR SEQNO  = '*' )"
			SQL = SQL & " AND ( REORDER = '"& reseq &"'  OR REORDER  = '*' )"

			set Rs6=server.createobject("adodb.recordset")
			Rs6.CursorLocation = adUseClient
			Rs6.open SQL,db,adOpenStatic, adLockOptimistic

			cnt3 = cint(Rs6("cnt3"))
			Rs6.close
			set Rs6 = nothing

			if cnt3 > 0 then   
				SQL = "SELECT COUNT(*) cnt4 FROM SUSPC.TBS065"    'SALE.제외정보 TBS045		
				SQL = SQL & " WHERE VDCD    ='"& pcd &"'"
				SQL = SQL & " AND STDT   <= '" & day1 &"'"
				SQL = SQL & " AND (ENDDT >= '" & day1 &"' OR ENDDT IS NULL)"
				SQL = SQL & " AND STYCD = '" & style &"'"
				'response.write SQL
				set Rs7=server.createobject("adodb.recordset")
				Rs7.CursorLocation = adUseClient
				Rs7.open SQL,db,adOpenStatic, adLockOptimistic
				cnt4 = cint(Rs7("cnt4"))
				'response.write cnt2

				Rs7.close
				set Rs7 = Nothing

				if cnt3 > 1 then	'세일정보가 2개이상일때
					if cnt3 <= cnt4 then	
						sacod  = "40"           
						price  = price

						'response.write sacod &"&nbsp;"& price
					else

						SQL =       "  SELECT '45' sacd, nvl(dcrt,0) dc,DCAMT                                                                           "
						SQL = SQL & "    FROM SUSPC.TBS060                                                                                                    "
						SQL = SQL & "   WHERE VDCD ='"& pcd &"'                                                                                        "
						SQL = SQL & "  	  AND ( STDT,HSEQ,SEQ ) IN ( SELECT STDT,HSEQ,SEQ                                                               "
						SQL = SQL & "  	                               FROM                                                                             "
						SQL = SQL & "   		                            ( SELECT STDT,HSEQ,SEQ                                                          "
						SQL = SQL & "			                                  FROM                                                                        "
						SQL = SQL & "	    			                               ( SELECT STDT,HSEQ,  SEQ                                                 "
						SQL = SQL & "				                                       FROM SUSPC.TBS060                                                          "
						SQL = SQL & "					                                    WHERE VDCD ='"& pcd &"'                                              "
						SQL = SQL & "					                                      AND STDT IN ( SELECT STDT                                           "
						SQL = SQL & "		 			                                                      FROM SUSPC.TBS060                                         "
						SQL = SQL & "													                                     WHERE VDCD ='"& pcd &"'                             "
						SQL = SQL & "													                                       AND STDT <='"& day1 &"'                            "
						SQL = SQL & "														                                     AND ( ENDDT >= '"& day1 &"' OR ENDDT IS NULL)      "
						SQL = SQL & "														                                     AND ( BRCD   = '"& brcd &"'   OR BRCD   = '*' )    "
						SQL = SQL & "														                                     AND ( YEAR   = '"& year1 &"'  OR YEAR   = '*' )    "
						SQL = SQL & "														                                     AND ( SEASON = '"& season &"' OR SEASON = '*' )    "
						SQL = SQL & "														                                     AND ( BRSEX  = '"& brsex &"'  OR BRSEX  = '*' )    "
						SQL = SQL & "														                                     AND ( ITEM   = '"& item &"'   OR ITEM   = '*' )    "
						SQL = SQL & "														                                     AND ( ITYPE  = '"& itype &"'  OR ITYPE  = '*' )    " 
						SQL = SQL & "														                                     AND ( SEQNO  = '"& seq &"'    OR SEQNO  = '*' )    "
						SQL = SQL & "														                                     AND ( REORDER = '"& reseq &"' OR REORDER= '*' ) )  "
						SQL = SQL & "												                        AND ( BRCD   = '"& brcd &"'   OR BRCD   = '*' )                     "
						SQL = SQL & "												                        AND ( YEAR   = '"& year1 &"'  OR YEAR   = '*' )                     "
						SQL = SQL & "												                        AND ( SEASON = '"& season &"' OR SEASON = '*' )                     "
						SQL = SQL & "												                        AND ( BRSEX  = '"& brsex &"'  OR BRSEX  = '*' )                     "
						SQL = SQL & "													                      AND ( ITEM   = '"& item &"'   OR ITEM   = '*' )                     "
						SQL = SQL & "													                      AND ( ITYPE  = '"& itype &"'  OR ITYPE  = '*' )                     "
						SQL = SQL & "												                        AND ( SEQNO  = '"& seq &"'    OR SEQNO  = '*' )                     "
						SQL = SQL & "													                      AND ( REORDER = '"& reseq &"' OR REORDER= '*' )                     "
						SQL = SQL & "										 	                       MINUS                                                                  "
						SQL = SQL & "										 		                     SELECT A.STDT,A.HSEQ, A.SEQ                                            "
						SQL = SQL & "												                       FROM SUSPC.TBS060 A, SUSPC.TBS065 B                                  "
						SQL = SQL & "												                      WHERE A.VDCD = B.VDCD                                                 "
						SQL = SQL & "													                      AND A.STDT = B.STDT                                                 "
						SQL = SQL & "												                        AND A.HSEQ = B.HSEQ                                                 "
						SQL = SQL & "												                        AND A.VDCD ='"& dpcd &"'                                            "
						SQL = SQL & "												                        AND A.STDT IN ( SELECT STDT                                         "
						SQL = SQL & "														                                      FROM SUSPC.TBS060                             "
						SQL = SQL & "													                                       WHERE VDCD ='"& pcd &"'                           "
						SQL = SQL & "														                                       AND STDT <='"& day1 &"'                          "
						SQL = SQL & "														                                       AND ( ENDDT >= '"& day1 &"'   OR ENDDT IS NULL)  "
						SQL = SQL & "														                                       AND ( BRCD   = '"& brcd &"'   OR BRCD   = '*' )  "
						SQL = SQL & "														                                       AND ( YEAR   = '"& year1 &"'  OR YEAR   = '*' )  "
						SQL = SQL & "														                                       AND ( SEASON = '"& season &"' OR SEASON = '*' )  "
						SQL = SQL & "														                                       AND ( BRSEX  = '"& brsex &"'  OR BRSEX  = '*' )  "
						SQL = SQL & "														                                       AND ( ITEM   = '"& item &"'   OR ITEM   = '*' )  "
						SQL = SQL & "														                                       AND ( ITYPE  = '"& itype &"'  OR ITYPE  = '*' )  "
						SQL = SQL & "														                                       AND ( SEQNO  = '"& seq &"'    OR SEQNO  = '*' )  "
						SQL = SQL & "														                                       AND ( REORDER = '"& reseq &"' OR REORDER = '*' ))"
						SQL = SQL & "												                       AND ( A.BRCD   = '"& brcd &"'    OR A.BRCD   = '*' )                 "
						SQL = SQL & "													                     AND ( A.YEAR   = '"& year1 &"'   OR A.YEAR   = '*' )                 "
						SQL = SQL & "												                       AND ( A.SEASON = '"& season &"'  OR A.SEASON = '*' )                 "
						SQL = SQL & "													                     AND ( A.BRSEX  = '"& brsex &"'   OR A.BRSEX  = '*' )                 "
						SQL = SQL & "													                     AND ( A.ITEM   = '"& item &"'    OR A.ITEM   = '*' )                 "
						SQL = SQL & "													                     AND ( A.ITYPE  = '"& itype &"'   OR A.ITYPE  = '*' )                 "
						SQL = SQL & "												                       AND ( A.SEQNO  = '"& seq &"'     OR A.SEQNO  = '*' )                 "
						SQL = SQL & "													                     AND ( A.REORDER = '"& reseq &"'  OR A.REORDER= '*' )                 "
						SQL = SQL & "													                     AND ( B.STYCD   = '" & style &"' )                                   "
						SQL = SQL & "													                      )  A                                                                "
						SQL = SQL & "											                  WHERE STDT <='"& day1 &"'                                                   "
						SQL = SQL & "											                  ORDER BY STDT DESC ,HSEQ DESC,  SEQ DESC  ) C                               "
						SQL = SQL & "                                 WHERE ROWNUM = 1                                                                  "
						SQL = SQL & "													         )                                                                                "
						response.write SQL
						set Rs8=server.createobject("adodb.recordset")
						Rs8.CursorLocation = adUseClient
						Rs8.open SQL,db,adOpenStatic, adLockOptimistic

						if Rs8.BOF or Rs8.EOF then
						sacod ="40"
						'response.write sacod	
						else
						sacod =Rs8("sacd")
						dc    =Rs8("dc")
						DCAMT =Rs8("DCAMT")
						'Rs4.colse		
						'set Rs4 = nothing
						end if
					end if					
				else	'세일정보가 1개일때

					if cnt3 > 0 then	
						sacod  = "40"           
						price  = price					
						'response.write sacod &"&nbsp;"& price
					else
						SQL       = "SELECT '45' sacd, nvl(dcrt,0) dc,DCAMT                                                            "
						SQL = SQL & "  FROM SUSPC.TBS060                                                                                     "
						SQL = SQL & " WHERE VDCD ='"& pcd &"'                                                                         "
						SQL = SQL & "	  AND ( STDT,HSEQ,SEQ ) = ( SELECT STDT,HSEQ,MAX(SEQ)                                            "
						SQL = SQL & "	                              FROM SUSPC.TBS060                                                        "
						SQL = SQL & "	                             WHERE VDCD ='"& pcd &"'                                            "
						SQL = SQL & "	                               AND STDT = ( SELECT MAX(STDT)                                     "
						SQL = SQL & "	                                              FROM SUSPC.TBS060                                        "
						SQL = SQL & "                                              WHERE VDCD ='"& pcd &"'                            "
						SQL = SQL & "			                                           AND STDT <='"& day1 &"'                           "
						SQL = SQL & "			                                           AND ( ENDDT >= '"& day1 &"'   OR ENDDT IS NULL)   "
						SQL = SQL & "			                                           AND ( BRCD   = '"& brcd &"'   OR BRCD   = '*' )   "
						SQL = SQL & "			                                           AND ( YEAR   = '"& year1 &"'  OR YEAR   = '*' )   "
						SQL = SQL & "			                                           AND ( SEASON = '"& season &"' OR SEASON = '*' )   "
						SQL = SQL & "			                                           AND ( BRSEX  = '"& brsex &"'  OR BRSEX  = '*' )   "
						SQL = SQL & "			                                           AND ( ITEM   = '"& item &"'   OR ITEM   = '*' )   "
						SQL = SQL & "			                                           AND ( ITYPE  = '"& itype &"'  OR ITYPE  = '*' )   "
						SQL = SQL & "			                                           AND ( SEQNO  = '"& seq &"'    OR SEQNO  = '*' )   "
						SQL = SQL & "			                                           AND ( REORDER = '"& reseq &"' OR REORDER  = '*' ))"
						SQL = SQL & "	                               AND ENDDT    >= '"& day1 &"'                                      "
						SQL = SQL & "	                               AND ( BRCD    = '"& brcd &"'   OR BRCD    = '*' )                 "
						SQL = SQL & "	                               AND ( YEAR    = '"& year1 &"'  OR YEAR    = '*' )                 "
						SQL = SQL & "	                               AND ( SEASON  = '"& season &"' OR SEASON  = '*' )                 "
						SQL = SQL & "	                               AND ( BRSEX   = '"& brsex &"'  OR BRSEX   = '*' )                 "
						SQL = SQL & "	                               AND ( ITEM    = '"& item &"'   OR ITEM    = '*' )                 "
						SQL = SQL & "	                               AND ( ITYPE   = '"& itype &"'  OR ITYPE   = '*' )                 "
						SQL = SQL & "	                               AND ( SEQNO   = '"& seq &"'    OR SEQNO   = '*' )                 "
						SQL = SQL & "	                               AND ( REORDER = '"& reseq &"'  OR REORDER = '*' )                 "
						SQL = SQL & "                              GROUP BY STDT,HSEQ )"
						'response.write SQL
						set Rs8=server.createobject("adodb.recordset")
						Rs8.CursorLocation = adUseClient
						Rs8.open SQL,db,adOpenStatic, adLockOptimistic

						If Rs8.BOF or Rs8.EOF Then 
						sacod ="40"
						'response.write sacod	
						Else
						sacod =Rs8("sacd")
						dc    =Rs8("dc")
						DCAMT =Rs8("DCAMT")
						'Rs4.colse		
						'set Rs4 = nothing
						End If
					End If		
				End If
			End If 
		End If '균일제품일경우end	

		SQL = "SELECT MG, CDCRT,  CMG"
		SQL = SQL & "  FROM SUSPC.TBA020"  
		SQL = SQL & " WHERE VDCD   ='"& pcd &"'"
		SQL = SQL & "   AND (JYDT) IN ( SELECT MAX(JYDT)"
		SQL = SQL & "                     FROM SUSPC.TBA020   "  
		SQL = SQL & "                    WHERE VDCD   = '"& pcd &"' "
		SQL = SQL & "                      AND SALETP = '"& sacod &"'"
		SQL = SQL & "                      AND JYDT  <= '"& day1 &"'"
		SQL = SQL & "                      AND DCRT   = '"& dc &"' )"
		SQL = SQL & " 	AND SALETP = '"& sacod &"'"
		SQL = SQL & "   AND DCRT   = '"& dc &"'"
		'response.write SQL

		set Rs5=server.createobject("adodb.recordset")
		Rs5.CursorLocation = adUseClient
		Rs5.open SQL,db,adOpenStatic, adLockOptimistic
			if Rs5.bof  or Rs5.eof then
				mg = 0 
			else 	
				mg = Rs5("MG") 	
			end if

		Rs5.close
		set Rs5 = nothing
			
		 

	  silpak = round((100 - cdbl(dc)) * cdbl(price) / 100,0) '실판매가 및 dc 적용판매가
			'response.write silpak &"&nbsp;"& dc &"&nbsp;"& mg &"&nbsp;"& sacod	   

		IF  sacod ="20" AND dc ="0" AND DCAMT <> "0" THEN	
			  silpak = DCAMT
			  dc = 100-(cdbl(DCAMT) / cdbl(price) * 100)
			  dc = cint(dc)
		END IF 


		SQL = "SELECT REFSNM FROM sumis.TBB150"
		SQL = SQL & " WHERE  REFTP = 'S2'"
		SQL = SQL & "   AND REFCD = '"& sacod &"'"  
		SQL = SQL & "   AND REFCD <> '0000' AND USEYN = 'Y'"

		set Rs7=server.createobject("adodb.recordset")
		Rs7.CursorLocation = adUseClient
		Rs7.open SQL,db,adOpenStatic, adLockOptimistic

		type1 = Rs7("REFSNM")    

		Rs7.close
		set Rs7 = Nothing
		
		'tbb070_t_price 매장별세일
		SQL = "SELECT ACOST , GUBUN "
		SQL = SQL & "  FROM SUSPC.TBB070_T_PRICE "  
		SQL = SQL & " WHERE VDCD   ='"& pcd &"'"
		SQL = SQL & "   AND  '"& day1 &"' between STDT and ENDDT"
		SQL = SQL & "   AND STYCD   = '"& style &"'" 
		'response.write SQL

		set Rs10=server.createobject("adodb.recordset")
		Rs10.CursorLocation = adUseClient
		Rs10.open SQL,db,adOpenStatic, adLockOptimistic
			If  Rs10.bof  Or  Rs10.eof Then 
				t_price_yn = "N" 
			Else  
				t_price_yn = "Y" 
				sale_gb = Rs10("GUBUN") 	
					If sale_gb = "1" Then 
						silpak = Rs10("ACOST")
					Else
						dc = Rs10("ACOST")
						silpak = round((100 - cdbl(dc)) * cdbl(price) / 100,0)					
					End If 
			End If 

		Rs10.close
		set Rs10 = Nothing

		jObject("barcode")		= keyword
		jObject("xstycd")		= xstycd
		jObject("style")		= style
		jObject("colcd")		= colcd
		jObject("sizecd")		= sizecd
		jObject("cnt")			= cnt
		jObject("fipri")		= fipri
		jObject("lapri")		= price
		jObject("silpak")		= silpak
		jObject("sacod")		= sacod
		jObject("type1")		= type1
		jObject("dc")			= dc
		jObject("mg")			= mg
		jObject("jaego")		= jeago
		jObject("spc_chk")		= spc_chk
		jObject("t_price_yn")	= t_price_yn
		jObject("t_price_gb")	= sale_gb

		jObject("brcd")			= brcd

		jObject("error") = "0"

		jObject.Flush
		'Response.write jObject.ToString(0)
		'"{""result"":"""&Chk&""",""Code"":"&J_DATA&",""whcd"":"&J_DATA_WHCD&",""brand"":"&J_DATA_BRCD&"}"

		End If
		' 아울렛 Search End

	If spc_chk = "N" Then
		
		sql = " select nvl(sum(case etc1 when '1' then 1 else 0 end ),0) count, nvl(max(etc1),'1') etc1  "
		  sql = sql &"  from SUMIS.tbb153  "
		  sql = sql &" where refcd='ORDER' " 
		  sql = sql &" AND  ETC2 = SUBSTR('"& UCase(keyword) &"',1,7) " 
		  sql = sql &" AND ( ETC3 =SUBSTR('"& UCase(keyword) &"',8,2) OR ETC3 ='*') "
		  sql = sql &" AND  (ETC4 =SUBSTR('"& UCase(keyword) &"',10,3) OR ETC4='*') "  
		  SQL = SQL & "AND USEYN='Y'"
		   
			 
			 set Rs10=server.createobject("adodb.recordset")
			 Rs10.CursorLocation = adUseClient
			 Rs10.open SQL,db,adOpenStatic, adLockOptimistic
		   
		   IF Rs10.BOF OR Rs10.EOF  THEN
			cnt2= "0"
			etc1 = "1"
		   else 
			cnt2 = trim(Rs10("count"))
			etc1 = trim(Rs10("etc1"))
		   end if
			
			Rs10.close
			set Rs10=Nothing
						
			SQL = "select  a.STYCD stycd, a.COLCD colcd, a.SIZECD sizecd,a.LAPRI LAPRI,a.STATUS STATUS "
			SQL = SQL & "  from SUMIS.TBB070 a                           "
			SQL = SQL & " where a.BARCODE = '"& Ucase(keyword) &"' "
			'SQL = SQL & "   and a.BRCD = '"& BRAND &"'             "
			SQL = SQL & " order by stycd,colcd,sizecd asc          "
			
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
				jObject("msg") = "Line 652. 상품이 존재하지 않습니다."

				jObject.Flush
				Response.end

			'특정품번 판매 차단 2011년 10월 17일 소병준

			elseif cnt2 >= 1 then
				close_db
				jObject("error") = "1"
				jObject("msg") = "해당 품번은 관리 품번으로 판매을 할 수 없습니다."

				jObject.Flush
				response.end 	

			else


			style  = arrData(0,0)
			colcd  = arrData(1,0)
			sizecd = arrData(2,0)
			LAPRI  = arrData(3,0)
			STATUS = arrData(4,0)
			price1 = LAPRI
			status1=STATUS
			sacod1 = status1 &"0" '판매유형
			dc	   = 0            'dc율

			'작지 스타일정보 TBP040

			SQL = "SELECT BRCD,YEAR,SEASON,BRSEX,ITEM,ITYPE,SEQ,RESEQ,STYCD "
			SQL = SQL & "  FROM SUMIS.TBP040              "
			SQL = SQL & " WHERE STYCD ='"& style &"'"
			SQL = SQL & "   AND ROWNUM = 1          "

			set Rs1=server.createobject("adodb.recordset")
			Rs1.CursorLocation = adUseClient
			Rs1.open SQL,db,adOpenStatic, adLockOptimistic
			
			brcd   = Rs1(0)
			year1  = Rs1(1)
			season = Rs1(2)
			brsex  = Rs1(3)
			item   = Rs1(4)
			itype  = Rs1(5)
			seq    = Rs1(6)
			reseq  = Rs1(7)
			
			Rs1.close
			set Rs1 = Nothing

			'정상 VDCD검색
			SQL = "SELECT MAX(VDCD) VDCD  FROM SUMIS.TBB040"  
			SQL = SQL & "  WHERE PCD = '" & pcd & "'"
			SQL = SQL & "  AND BRAND = '" & brcd & "'"

			set Rs9=server.createobject("adodb.recordset")
			Rs9.CursorLocation = adUseClient
			Rs9.open SQL,db,adOpenStatic, adLockOptimistic
			
			IF Rs9.BOF OR Rs9.EOF  THEN
				'jeago= "0"
			else 
			   l_dpcd  = trim(Rs9("VDCD"))
				'mis_cuscd = l_dpcd & "00000"
			End If
			
			Rs9.close
			set Rs9 = Nothing
			
			jObject("l_dpcd") = l_dpcd

			SQL = "SELECT LASTPRI, STATUS, FIPRI, NVL(EVENT,0) EVENT "
			SQL = SQL & "	FROM SUMIS.TBB072"  
			SQL = SQL & "  WHERE (STYCD,COLCD,DT) IN ( SELECT STYCD, COLCD, MAX(DT)  FROM SUMIS.TBB072"
			SQL = SQL & "                       	WHERE STYCD = '"& style &"'"
			SQL = SQL & "	                          AND COLCD = '"& colcd &"'"
			SQL = SQL & "	                          AND DT   <= '" & day1 &"'"
			SQL = SQL & "	                        GROUP BY STYCD, COLCD )" 
			SQL = SQL & " 	AND ROWNUM = 1"
		  
		   ' Response.Write SQL

		  set KK = server.createobject("adodb.recordset")
		  KK.CursorLocation = adUseClient
			KK.open SQL,db,adOpenStatic, adLockOptimistic
			price  = trim(KK("LASTPRI"))
			price  = cdbl(price) 
			fprice = trim(KK("FIPRI"))
			status = trim(KK("STATUS"))
			mi_mg  = trim(KK("EVENT")) '20090327 특정행사 마진 - 처리 
			sacod  = status '판매유형
			KK.close
			set KK = Nothing			
					 
		 ' 품번에 대한 현재고(tbwvdcd) 가져옴 소병준 2011년 6월 7일 

		  
		  SQL =" select (ipsu+misu)-(ibsu+mCsu+sasu) jeago "
		  SQL =sql & " from sumis.tbwvdcd "
		  SQL = SQL & "  WHERE STYCD = '"& style &"'"
		  SQL = SQL & " AND COLCD = '"& colcd &"'"
		  SQL = SQL & " AND SIZECD ='"&SIZECD &"'"
		  SQL = SQL & " AND VDCD ='"& l_dpcd &"'"

		  ' Response.Write SQL
		  ' Response END
		   
		   set kk2=server.createobject("adodb.recordset")
		   kk2.CursorLocation = adUseClient
		   kk2.open SQL,db,adOpenStatic, adLockOptimistic
		   
		   
		   IF kk2.BOF OR kk2.EOF  THEN
			jeago= "0"
		   else 
		   jeago = trim(kk2("jeago"))
		   end if
		 
		 
		 

		 if status ="10" then
				 SQL = "SELECT COUNT(STDT) cnt FROM sumis.TBS040"
				 SQL = SQL & " WHERE VDCD ='"& l_dpcd &"'"
				 SQL = SQL & " AND STDT <= '" & day1 &"'"
				 SQL = SQL & " AND ( ENDDT >= '" & day1 &"'  OR ENDDT IS NULL)"
				 SQL = SQL & " AND ( BRCD   = '"& brcd &"'   OR BRCD   = '*' )"
				 SQL = SQL & " AND ( YEAR   = '"& year1 &"'  OR YEAR   = '*' )"
				 SQL = SQL & " AND ( SEASON = '"& season &"' OR SEASON = '*' )"
				 SQL = SQL & " AND ( BRSEX  = '"& brsex &"'  OR BRSEX  = '*' )"
				 SQL = SQL & " AND ( ITEM   = '"& item &"'   OR ITEM   = '*' )"	
				 SQL = SQL & " AND ( ITYPE  = '"& itype &"'  OR ITYPE  = '*' )"
				 SQL = SQL & " AND ( SEQNO  = '"& seq &"'    OR SEQNO  = '*' )"
				 SQL = SQL & " AND ( REORDER = '"& reseq &"' OR REORDER  = '*' )"
				 SQL = SQL & " AND ( COLCD  = '"& colcd &"'  OR COLCD  = '*' )    "

					set Rs2=server.createobject("adodb.recordset")
					Rs2.CursorLocation = adUseClient
					Rs2.open SQL,db,adOpenStatic, adLockOptimistic
					cnt1 = cint(Rs2("cnt"))
					Rs2.close
					set Rs2 = nothing
					
					'response.write  cnt1
					'response.end
			
				if cnt1 > 0 then   
					SQL = "SELECT COUNT(*) cnt2 FROM sumis.TBS045"    'SALE.제외정보 TBS045		
					SQL = SQL & " WHERE VDCD    ='"& l_dpcd &"'"
					SQL = SQL & " AND STDT   <= '" & day1 &"'"
					SQL = SQL & " AND (ENDDT >= '" & day1 &"' OR ENDDT IS NULL)"
					SQL = SQL & " AND STYCD = '" & style &"'"
				  SQL = SQL & "	AND ( COLCD = '"& colcd &"' OR COLCD  = '*' )"      
				 'response.write SQL
				set Rs3=server.createobject("adodb.recordset")
				Rs3.CursorLocation = adUseClient
				  Rs3.open SQL,db,adOpenStatic, adLockOptimistic
				  cnt2 = cint(Rs3("cnt2"))
				 'response.write cnt2
					
				Rs3.close
				  set Rs3 = Nothing
					
						IF cnt1 > 1 THEN	'세일정보가 2개이상일때
							if cnt1 <= cnt2 then	
										sacod  = "10"           
										price  = price
										
										'response.write sacod &"&nbsp;"& price
							else
											'2009년 5월4일 변경 
								  SQL =       "  SELECT '20' sacd, nvl(dcrt,0) dc,DCAMT                                          "
									SQL = SQL & "    FROM sumis.TBS040                                                                   "
									SQL = SQL & "   WHERE VDCD ='"& l_dpcd &"'                                                       "
									SQL = SQL & "  	  AND ( STDT,HSEQ,SEQ ) IN ( SELECT STDT,HSEQ,SEQ                              "   
									SQL = SQL & "  	                               FROM                                            "
									SQL = SQL & "   		                            ( SELECT    STDT,HSEQ,SEQ                  "   
									SQL = SQL & "			                                FROM                                   "
									SQL = SQL & "	    			                           ( SELECT STDT,HSEQ,  SEQ            "  
									SQL = SQL & "				                                  FROM sumis.TBS040                      "
									SQL = SQL & "					                              WHERE VDCD ='"& l_dpcd &"'           "
									SQL = SQL & "					                                AND STDT IN ( SELECT STDT      "
									SQL = SQL & "		 			                                                FROM sumis.TBS040                       "
									SQL = SQL & "													               WHERE VDCD ='"& l_dpcd &"'                "
									SQL = SQL & "													                 AND STDT <='"& day1 &"'            "
									SQL = SQL & "														               AND ( ENDDT >= '"& day1 &"'   OR ENDDT IS NULL)   "
									SQL = SQL & "														               AND ( BRCD   = '"& brcd &"'   OR BRCD   = '*' )        "
									SQL = SQL & "														               AND ( YEAR   = '"& year1 &"'  OR YEAR   = '*' )        "
									SQL = SQL & "														               AND ( SEASON = '"& season &"' OR SEASON = '*' )        "
									SQL = SQL & "														               AND ( BRSEX  = '"& brsex &"'  OR BRSEX  = '*' )        "
									SQL = SQL & "														               AND ( ITEM   = '"& item &"'   OR ITEM   = '*' )        "
									SQL = SQL & "														               AND ( ITYPE  = '"& itype &"'  OR ITYPE  = '*' )        "
									SQL = SQL & "														               AND ( COLCD  = '"& colcd &"'  OR COLCD  = '*' )        "
									SQL = SQL & "														               AND ( SEQNO  = '"& seq &"'    OR SEQNO  = '*' )        "
									SQL = SQL & "														               AND ( REORDER = '"& reseq &"'  OR REORDER= '*' ) )      "
									SQL = SQL & "												     AND ( BRCD   = '"& brcd &"'   OR BRCD   = '*' )         "
									SQL = SQL & "												     AND ( YEAR   = '"& year1 &"'  OR YEAR   = '*' )         "
									SQL = SQL & "												     AND ( SEASON = '"& season &"' OR SEASON = '*' )         "
									SQL = SQL & "												     AND ( BRSEX  = '"& brsex &"'  OR BRSEX  = '*' )         "
									SQL = SQL & "													   AND ( ITEM   = '"& item &"'   OR ITEM   = '*' )         "
									SQL = SQL & "													   AND ( ITYPE  = '"& itype &"'  OR ITYPE  = '*' )         "
									SQL = SQL & "													   AND ( COLCD  = '"& colcd &"'  OR COLCD  = '*' )         "
									SQL = SQL & "												     AND ( SEQNO  = '"& seq &"'    OR SEQNO  = '*' )         "
									SQL = SQL & "													   AND ( REORDER = '"& reseq &"' OR REORDER= '*' )         "
									SQL = SQL & "										 	 MINUS                                                  "
									SQL = SQL & "										 		  SELECT A.STDT,A.HSEQ, A.SEQ              "    
									SQL = SQL & "												    FROM sumis.TBS040 A, sumis.TBS045 B                "
									SQL = SQL & "												   WHERE A.VDCD = B.VDCD                   "
									SQL = SQL & "													   AND A.STDT = B.STDT                   "
									SQL = SQL & "												     AND A.HSEQ = B.HSEQ                   "
									SQL = SQL & "												     AND A.VDCD ='"& l_dpcd &"'                   "
									SQL = SQL & "												     AND A.STDT IN ( SELECT  STDT          "   
									SQL = SQL & "														               FROM sumis.TBS040                      "
									SQL = SQL & "													                  WHERE VDCD ='"& l_dpcd &"'               "
									SQL = SQL & "														                AND STDT <='"& day1 &"'              "
									SQL = SQL & "														                AND ( ENDDT >= '"& day1 &"'   OR ENDDT IS NULL)  "
									SQL = SQL & "														                AND ( BRCD   = '"& brcd &"'   OR BRCD   = '*' )         "
									SQL = SQL & "														                AND ( YEAR   = '"& year1 &"'  OR YEAR   = '*' )         "
									SQL = SQL & "														                AND ( SEASON = '"& season &"' OR SEASON = '*' )         "
									SQL = SQL & "														                AND ( BRSEX  = '"& brsex &"'  OR BRSEX  = '*' )         "
									SQL = SQL & "														                AND ( ITEM   = '"& item &"'   OR ITEM   = '*' )         "
									SQL = SQL & "														                AND ( ITYPE  = '"& itype &"'  OR ITYPE  = '*' )         "
									SQL = SQL & "														                AND ( COLCD  = '"& colcd &"'  OR COLCD  = '*' )         "
									SQL = SQL & "														                AND ( SEQNO  = '"& seq &"'    OR SEQNO  = '*' )         "
									SQL = SQL & "														                AND ( REORDER = '"& reseq &"' OR REORDER = '*' ))        "
									SQL = SQL & "												   AND ( A.BRCD   = '"& brcd &"'    OR A.BRCD   = '*' )     "
									SQL = SQL & "													 AND ( A.YEAR   = '"& year1 &"'   OR A.YEAR   = '*' )     "
									SQL = SQL & "												   AND ( A.SEASON = '"& season &"'  OR A.SEASON = '*' )     "
									SQL = SQL & "													 AND ( A.BRSEX  = '"& brsex &"'   OR A.BRSEX  = '*' )     "
									SQL = SQL & "													 AND ( A.ITEM   = '"& item &"'    OR A.ITEM   = '*' )     "
									SQL = SQL & "													 AND ( A.ITYPE  = '"& itype &"'   OR A.ITYPE  = '*' )     "
									SQL = SQL & "													 AND ( A.COLCD  = '"& colcd &"'   OR A.COLCD  = '*' )     "
									SQL = SQL & "												   AND ( A.SEQNO  = '"& seq &"'     OR A.SEQNO  = '*' )     "
									SQL = SQL & "													 AND ( A.REORDER = '"& reseq &"'  OR A.REORDER= '*' )     "
									SQL = SQL & "													 AND ( B.STYCD   = '" & style &"' )                       "     
									SQL = SQL & "							 	           AND ( B.COLCD   = '"& colcd &"'  OR B.COLCD   = '*' )    "     
									SQL = SQL & "													                                  )  A                    "    
									SQL = SQL & "											   WHERE STDT <='"& day1 &"'                                  "  
									SQL = SQL & "											   ORDER BY   STDT DESC ,HSEQ DESC,  SEQ DESC  ) C                "
									SQL = SQL & "                                              WHERE ROWNUM = 1           "
									SQL = SQL & "													         )            "
						 
			 
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
										SQL = "SELECT '20' sacd, nvl(dcrt,0) dc,DCAMT"
										SQL = SQL & "  FROM sumis.TBS040"
										SQL = SQL & " WHERE VDCD ='"& l_dpcd &"'"
										SQL = SQL & "	AND ( STDT,HSEQ,SEQ ) = ( SELECT STDT,HSEQ,MAX(SEQ)"
										SQL = SQL & "	 FROM sumis.TBS040"
										SQL = SQL & "	WHERE VDCD ='"& l_dpcd &"'"
										
										SQL = SQL & "	  AND STDT = ( SELECT MAX(STDT)"
										SQL = SQL & "	FROM sumis.TBS040"
										SQL = SQL & "  WHERE VDCD ='"& l_dpcd &"'"
										SQL = SQL & "			AND STDT <='"& day1 &"'"
										SQL = SQL & "			AND ( ENDDT >= '"& day1 &"' OR ENDDT IS NULL)"
										SQL = SQL & "			AND ( BRCD   = '"& brcd &"'   OR BRCD   = '*' )"
										SQL = SQL & "			AND ( YEAR   = '"& year1 &"'   OR YEAR   = '*' )"
										SQL = SQL & "			AND ( SEASON = '"& season &"' OR SEASON = '*' )"
										SQL = SQL & "			AND ( BRSEX  = '"& brsex &"'  OR BRSEX  = '*' )"
										SQL = SQL & "			AND ( ITEM   = '"& item &"'   OR ITEM   = '*' )" 
										SQL = SQL & "			AND ( ITYPE  = '"& itype &"'  OR ITYPE  = '*' )"
										SQL = SQL & "			AND ( SEQNO  = '"& seq &"'  OR SEQNO  = '*' )"
									  SQL = SQL & "	      AND ( COLCD  = '"& colcd &"'  OR COLCD  = '*' )    "
										SQL = SQL & "			AND ( REORDER = '"& reseq &"' OR REORDER  = '*' ))"
								
										SQL = SQL & "	  AND ENDDT >= '"& day1 &"'"
										SQL = SQL & "	 AND ( BRCD   = '"& brcd &"'   OR BRCD   = '*' )"
										SQL = SQL & "	 AND ( YEAR   = '"& year1 &"'   OR YEAR   = '*' )"
										SQL = SQL & "	 AND ( SEASON = '"& season &"' OR SEASON = '*' )"
										SQL = SQL & "	 AND ( BRSEX  = '"& brsex &"'  OR BRSEX   = '*' )"
										SQL = SQL & "	 AND ( ITEM   = '"& item &"'   OR ITEM   = '*' )"
										SQL = SQL & "	 AND ( ITYPE  = '"& itype &"'  OR ITYPE  = '*' )"
										SQL = SQL & "	 AND ( SEQNO  = '"& seq &"'  OR SEQNO  = '*' )"
									SQL = SQL & "	   AND ( COLCD  = '"& colcd &"'  OR COLCD  = '*' )    "
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
		  
		  
		  
		if  sacod ="20" then 	
						SQL = "SELECT MG, CDCRT,  CMG"
						SQL = SQL & "  FROM sumis.TBA020   "  
						SQL = SQL & " WHERE VDCD   ='"& l_dpcd &"'"
						SQL = SQL & "   AND (JYDT) IN ( SELECT MAX(JYDT)"
						SQL = SQL & "  FROM sumis.TBA020   "  
						SQL = SQL & " WHERE VDCD = '"& l_dpcd &"' "
						SQL = SQL & " AND SALETP = '"& sacod &"'"
						SQL = SQL & " AND JYDT  <= '"& day1 &"' "
						SQL = SQL & " AND DCRT   = '"& dc &"' ) "
						SQL = SQL & " 	AND SALETP = '"& sacod &"'"
						SQL = SQL & " 	AND DCRT   = '"& dc &"' "
				
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
			
			 elseif sacod ="30" then  
			 
					  fdcrt = ABS ( 100 - ( cdbl(price)  / cdbl(fprice)  ) * 100  )    '최초가대비 가격 올렸을경우 DCRT처리 20160122 by yun
							
						SQL = "SELECT JYDT,      MAX(DCRT) DCRT "  
						SQL = SQL & "  FROM sumis.TBA020   "  
						SQL = SQL & " WHERE VDCD   ='"& l_dpcd &"'"
						SQL = SQL & "   AND (JYDT) IN ( SELECT MAX(JYDT)"
						SQL = SQL & "                     FROM sumis.TBA020   "  
						SQL = SQL & "                    WHERE VDCD = '"& l_dpcd &"' "
						SQL = SQL & "                      AND SALETP = '"& sacod &"'"
						SQL = SQL & "                      AND JYDT  <= '"& day1 &"' ) "
						SQL = SQL & " 	AND SALETP = '"& sacod &"'"
						SQL = SQL & " 	AND DCRT  <= '"& fdcrt &"'"
						SQL = SQL & " GROUP BY JYDT             "
				
							 'response.write SQL
				
						set Rs8=server.createobject("adodb.recordset")
						Rs8.CursorLocation = adUseClient
						   Rs8.open SQL,db,adOpenStatic, adLockOptimistic
							if Rs8.bof  or Rs8.eof then 
								 jydt  = Rs8("JYDT")
								 edcrt = 0
							else 
								 jydt  = Rs8("JYDT")
								 edcrt = Rs8("DCRT") 
								'response.write edcrt		
							end if
							
							Rs8.close
							set Rs8 = nothing	 

							SQL = "SELECT  MG,  CDCRT,  CMG "
							SQL = SQL & "  FROM sumis.TBA020   "  
							SQL = SQL & " WHERE VDCD   = '"& l_dpcd &"'"
							SQL = SQL & "   AND JYDT   = '"& jydt &"'" 
							SQL = SQL & "   AND SALETP = '"& sacod &"'" 
							SQL = SQL & " 	AND DCRT   = '"& edcrt &"' " 
				
							'response.write SQL
							'response.end
				
						set Rs9=server.createobject("adodb.recordset")
						Rs9.CursorLocation = adUseClient
						  Rs9.open SQL,db,adOpenStatic, adLockOptimistic
							if Rs9.bof  or Rs9.eof then
								 mg = 0  
							else  
								 mg = Rs9("MG") 
								'response.write edcrt		
							end if
							
							Rs9.close
							set Rs9 = nothing	    
			 
			 else 
						
							SQL = "    SELECT MG, CDCRT,  CMG"
							SQL = SQL & "      FROM sumis.TBA020 A"
							SQL = SQL & "     WHERE VDCD   ='"& l_dpcd &"'"
							SQL = SQL & "      AND (JYDT) IN ( SELECT MAX(JYDT)"
							SQL = SQL & "           FROM sumis.TBA020  "
							SQL = SQL & "         WHERE A.VDCD = VDCD"
							SQL = SQL & "         AND A.SALETP = SALETP"
							SQL = SQL & "          AND JYDT  <= '"& day1 &"'"
							SQL = SQL & "         AND A.DCRT = DCRT)"
							SQL = SQL & "     AND SALETP = '"& sacod &"'"
							SQL = SQL & "     AND DCRT   = '"& dc &"'"
						
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
			 
			 
			 'vvip 우대 추가 
				SQL = "    SELECT MG, CDCRT,  CMG"
				SQL = SQL & "      FROM sumis.TBA020 A"
				SQL = SQL & "     WHERE VDCD   ='"& l_dpcd &"'"
				SQL = SQL & "      AND (JYDT) IN ( SELECT MAX(JYDT)"
				SQL = SQL & "           FROM sumis.TBA020  "
				SQL = SQL & "         WHERE A.VDCD = VDCD"
				SQL = SQL & "         AND A.SALETP = SALETP"
				SQL = SQL & "          AND JYDT  <= '"& day1 &"'"
				SQL = SQL & "         AND A.DCRT = DCRT)"
				SQL = SQL & "     AND SALETP = '40'"
				SQL = SQL & "     AND DCRT   = '0'"
				
				'response.write SQL
				set Rs10=server.createobject("adodb.recordset")
				Rs10.CursorLocation = adUseClient
				 Rs10.open SQL,db,adOpenStatic, adLockOptimistic
				if Rs10.bof  or Rs10.eof then
					mg2 = 0 
				else
					mg2 = Rs10("MG")
					'response.write mg
				end if
				
				Rs10.close
				set Rs10 = nothing
							
			 
			 
			  '20100508 임페리얼 브랜드데이 처리 dc 추가 10%   -> 끝난후  20100528~31일 또 추가
			  '주석처리 할 것 2018 07 03
			 if day1 >= "20100528" and day1 <= "20100531" and BRAND = "I"  and year1 = "Q"  and itype <> "A" and ( sacod ="10" or sacod ="20" ) and ( season ="1" or season ="2" ) then
			   ' dc = dc + 10 
				brcdday = "Y"   
			 else
				brcdday = "N"
			 end if 
			  
				 
				'20090331 특정행사 대리점만마진 - 처리 
				SQL = "SELECT SHGU FROM sumis.TBB040"
				SQL = SQL & " WHERE  VDCD  = '"& l_dpcd &"' " 
			
				set Rs8=server.createobject("adodb.recordset")
				Rs8.CursorLocation = adUseClient
				Rs8.open SQL,db,adOpenStatic, adLockOptimistic
				'Rs8.open SQL,db
			
				shgu = Rs8("SHGU")    
			
				Rs8.close
				set Rs8 = nothing
				
					 
				IF mg <> "0" and shgu = "D" THEN
				   mg = cdbl(mg)  - cdbl(mi_mg) '20090327 특정행사 대리점만마진 - 처리 
				END IF 
				
			
			IF brcdday = "N" THEN
				 silpak = round((100 - cdbl(dc)) * cdbl(price) / 100,0) '실판매가 및 dc 적용판매가
			  ElSE
				 silpak = round((100 - cdbl(dc)) * cdbl(price) / 100,0) '실판매가 및 dc 적용판매가	
				 silpak =   silpak * 0.9
				 dc = dc + (  10 -  (dc * 0.1) )
			  END IF
					'response.write silpak &"&nbsp;"& dc &"&nbsp;"& mg &"&nbsp;"& sacod	   
			
			
				IF  sacod ="20" AND dc ="0" AND DCAMT <> "0" THEN
				
					silpak = DCAMT
					dc = 100-(cdbl(DCAMT) / cdbl(price) * 100)
					dc = cint(dc)
				END IF 
			 
			
				SQL = "SELECT REFSNM FROM sumis.TBB150"
				SQL = SQL & " WHERE  REFTP = 'S2'"
				SQL = SQL & " AND REFCD = '"& sacod &"'"  
				SQL = SQL & " AND REFCD <> '0000' AND USEYN = 'Y'"
			
				set Rs7=server.createobject("adodb.recordset")
				Rs7.CursorLocation = adUseClient
				Rs7.open SQL,db,adOpenStatic, adLockOptimistic
			
				type1 = Rs7("REFSNM")    
			
				Rs7.close
				set Rs7 = Nothing

				'tbb070_t_price 매장별세일
				SQL = "SELECT ACOST , GUBUN "
				SQL = SQL & "  FROM SUSPC.TBB070_T_PRICE "  
				SQL = SQL & " WHERE VDCD   ='"& dpcd &"'"
				SQL = SQL & "   AND  '"& day1 &"' between STDT and ENDDT "
				SQL = SQL & "   AND STYCD   = '"& style &"'" 
				'response.write SQL

				set Rs10=server.createobject("adodb.recordset")
				Rs10.CursorLocation = adUseClient
				Rs10.open SQL,db,adOpenStatic, adLockOptimistic
					If  Rs10.bof  Or  Rs10.eof Then 
						t_price_yn = "N" 
					Else  
						t_price_yn = "Y" 
						sale_gb = Rs10("GUBUN") 	
							If sale_gb = "1" Then 
								silpak = Rs10("ACOST")
							Else
								dc = Rs10("ACOST")
								silpak = round((100 - cdbl(dc)) * cdbl(price) / 100,0)					
							End If 
					End If 

				Rs10.close
				set Rs10 = Nothing
				
				'jObject("xstycd")		= xstycd
				'jObject("style")		= style
				'jObject("colcd")		= colcd
				'jObject("sizecd")		= sizecd
				'jObject("cnt")			= cnt
				'jObject("lapri")		= price
				'jObject("silpak")		= silpak
				'jObject("sacod")		= sacod
				'jObject("type1")		= type1
				'jObject("dc")			= dc
				'jObject("mg")			= mg
				'jObject("mg2")			= mg2
				'jObject("itype2")		= itype
				'jObject("year2")		= year2
				'jObject("season2")		= season2
				'jObject("brcdday")		= brcdday
				'jObject("jaego")		= jeago
				'jObject("colcd1")		= "0"
				'jObject("sizecd1")		= "0"
				'jObject("colocd_sized")	= colocd_sized
				'jObject("fipri")		= fprice
				'jObject("etc1")			= etc1		

				'If colcd = "00" and sizecd = "000" Then
				'	jObject("colcd1")	= colcd1		// db에 인서트 시킬 컬러 값
				'	jObject("sizecd1")	= sizecd1	// db에 인서트 시킬 사이즈 값
				'	jObject("cnt")		= "0"	   //갯수
				'	jObject("lapri")	= "0"  //소비자가
				'	jObject("silpak")	= "0" //실판매가 및 적용판매가
				'	jObject("sacod")	= "10"  //판매유형
				'	jObject("type1")	= "0"  //판매유형명		
				'	jObject("dc")		= "0"	   //dc율	 
				'	jObject("mg")		= "0"	   //마진율 
				'	jObject("mg2")		= "0"	   //마진율(vvip=40)				
				'	jObject("itype2")	= Mid(style, 2,1)	 //상품형태 	
				'	jObject("year2")	= Mid(style, 3,1)	 //상품년도 	
				'	jObject("season2")	= Mid(style, 5,1)	 //상품시즌 
				'	jObject("brcdday")	= "0"	 //브랜드데이여부		 
				'	jObject("brcd")		= brcd //SIZE
				'	jObject("jaego")	= "0" //현재고
				'	jObject("fipri")	= fprice
				'End If 
				jObject("barcode")		= keyword
				jObject("xstycd")		= xstycd
				jObject("style")		= style
				jObject("colcd")		= colcd
				jObject("sizecd")		= sizecd
				jObject("cnt")			= cnt
				jObject("fipri")		= fipri
				jObject("lapri")		= price
				jObject("silpak")		= silpak
				jObject("sacod")		= sacod
				jObject("type1")		= type1
				jObject("dc")			= dc
				jObject("mg")			= mg
				jObject("jaego")		= jeago
				jObject("spc_chk")		= spc_chk
				'jObject("t_price_yn")	= "0"
				jObject("t_price_yn")	= t_price_yn
				jObject("t_price_gb")	= sale_gb

				jObject("brcd")			= brcd

				jObject("error") = "0"

				jObject.Flush

			end if
	
	End If 
	'정상제품 Search End

	
End If '상품코드 존재시 end
%>