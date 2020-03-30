<%@ LANGUAGE="VBSCRIPT" %>
<!--#include virtual="/include/common.asp"-->

<!--METADATA TYPE="Typelib" NAME="ADODB Type Library"
	FILE="C:\Program Files\Common Files\System\ado\msado15.dll"-->
<%
	'Option Explicit
Response.Expires = 0
Response.AddHeader "Pragma", "no-cache"
Response.AddHeader "cache-control", "no-store"
%>
<SCRIPT LANGUAGE=javascript >
<!--
	function getCookie( name )
	{
			var nameOfCookie = name + "=";
			var x = 0;
			while ( x <= document.cookie.length )
			{
					var y = (x+nameOfCookie.length);
					if ( document.cookie.substring( x, y ) == nameOfCookie ) {
							if ( (endOfCookie=document.cookie.indexOf( ";", y )) == -1 )
									endOfCookie = document.cookie.length;
							return unescape( document.cookie.substring( y, endOfCookie ) );
					}
					x = document.cookie.indexOf( " ", x ) + 1;
					if ( x == 0 )
							break;
			}
			return "";
	}
//-->
</SCRIPT>
<%
	open_dbo
	Dim empl_numb,empl_knam,temp_db,Rs2,temp_db2, pwd, login_num, SQL, Rs
	Dim Rs1, temp_db1

	id     = Request("id")
	pwd    = Request("pass")
	idsave = Request("idsave")
	err_count5 = Request("err_count5")'20190611byCho'
	id  = Replace(id,"'","''")
	pwd = Replace(pwd,"'","''")
'	디버깅
'	Response.Write idsave
'	Response.End





	'/// 수정자 : 이정우 작업내역 : ID저장 쿠키추가 (정상,특판,아울렛)

	If idsave = "on" Then
		Response.Cookies("idchkjung").Domain = ".ssiiss.com"
		Response.Cookies("idchkjung").Path = "/"
		Response.Cookies("idchkjung") = id
		Response.Cookies("idchkjung").Expires = Date + 365
	Else
		Response.Cookies("idchkjung").Domain = ".ssiiss.com"
	  Response.Cookies("idchkjung") = ""
		Response.Cookies("idchkjung").Expires = Date - 4000
	End If


'	Response.write request.cookies("idchkjung" )
'	Response.end

	SQL = "select count(*) as idcheck "
	SQL = SQL & " from tbb060 "
	SQL = SQL & " where usrid = '" & UCASE(trim(id)) & "' "
	Set Rs = db.Execute(SQL)

	idchk = Rs("idcheck")
	idchk = cint(idchk)
	Rs.close
	Set Rs = nothing

	if idchk = 0 then   'id의 유무 체크
		close_db
		Response.redirect "../default.asp?err_code=1&id="&id
		Response.end
	else

		SQL1 = "select count(*) as passcheck "
		SQL1 = SQL1 & " from tbb060 "
		SQL1 = SQL1 & " where usrid = '" & UCASE(trim(id)) & "' "
		SQL1 = SQL1 & " and UPPER(passwd) = '" & UCASE(trim(pwd)) & "' "
'		SQL1 = SQL1 & " and passwd = encrypt ( 1234, '" & UCASE(trim(pwd)) & "' ) "
		Set Rs1 = db.Execute(SQL1)
'			response.write sql1

		pschk = Rs1("passcheck")
		pschk = cint(pschk)
		Rs1.close
		Set Rs1 = nothing

		if  pschk = 0 then   ' id와 password를 비교
			close_db
			Response.redirect "../default.asp?err_code=2&id="&id&"&err_count5="&err_count5 '20190611byCho'
		else

			SQL3 = "select  USRGB  "
			SQL3 = SQL3 & " from tbb060"
			SQL3 = SQL3 & " WHERE USRID = '" & UCASE(trim(id)) & "'"
		SQL1 = SQL3 & " and UPPER(passwd) = '" & UCASE(trim(pwd)) & "' "
'		SQL1 = SQL3 & " and passwd = encrypt ( 1234, '" & UCASE(trim(pwd)) & "' ) "

			Set Rs3 = db.Execute(SQL3)
			usrgb =Rs3("USRGB")
			Rs3.close
			Set Rs3 = nothing
'			response.write sql3

			if usrgb ="1" then
				close_db
				Response.redirect "../default.asp?err_code=3&id="&id
			else
				SQL4 = "select  count(*) as yumuchk"
				SQL4 = SQL4 & " from tbb060 a,tbb040 b"
				SQL4 = SQL4 & " WHERE a.DPCD = b.VDCD"
				SQL4 = SQL4 & " and a.USRID = '" & UCASE(trim(id)) & "'"
				SQL4 = SQL4 & " and UPPER(a.PASSWD) = '" & UCASE(trim(pwd)) & "'"
'				SQL4 = SQL4 & " and a.PASSWD = encrypt ( 1234, '" & UCASE(trim(pwd)) & "' ) "

				Set Rs4 = db.Execute(SQL4)
'			response.write sql4
				yumuchk = Rs4("yumuchk")
				yumuchk = cint(yumuchk)
				Rs4.close
				Set Rs4 = nothing

				if  yumuchk = 0 then   ' id와 password를 비교
					close_db
					Response.redirect "../default.asp?err_code=1&id="&id
					Response.end
				else
					SQL5 = "select  count(*) as dchk"
					SQL5 = SQL5 & " from tbb060 a,tbb040 b"
					SQL5 = SQL5 & " WHERE a.DPCD = b.VDCD"
					SQL5 = SQL5 & " and a.USRID = '" & UCASE(trim(id)) & "'"
					SQL5 = SQL5 & " and UPPER(a.PASSWD)  = '" & UCASE(trim(pwd)) & "'"
'					SQL5 = SQL5 & " and a.PASSWD  = encrypt ( 1234, '" & UCASE(trim(pwd)) & "' ) "
					SQL5 = SQL5 & " and nvl(b.SHGU, ' ') <> 'S'"

					Set Rs5 = db.Execute(SQL5)

					dchk =Rs5("dchk")
					dchk =cint(dchk)
					Rs5.close
					Set Rs5 = nothing

					if  dchk = 0 then   ' id와 password를 비교
						close_db
						Response.redirect "../default.asp?err_code=5&id="&id
						Response.end
					else
						SQL6 = "select  USEYN"
						SQL6 = SQL6 & " from tbb060"
						SQL6 = SQL6 & " WHERE USRID = '" & UCASE(trim(id)) & "'"
						SQL6 = SQL6 & " and UPPER(PASSWD)  = '" & UCASE(trim(pwd)) & "'"
'						SQL6 = SQL6 & " and PASSWD  = encrypt ( 1234, '" & UCASE(trim(pwd)) & "' ) "
						Set Rs6 = db.Execute(SQL6)
						useyn =Rs6("USEYN")
						Rs6.close
						Set Rs6 = nothing

						if  useyn ="N" then
								close_db
								Response.redirect "../default.asp?err_code=4&id="&id
								Response.end
						else
								SQL7 = "select  a.USRID USRID,a.DPCD DPCD,a.NAME NAME,b.VDSNM VDSNM,b.BRAND BRAND,b.SHGU SHGU, B.UBGB UBGB, B.PCD, nvl(B.JUWSU, '9') JUWSU, nvl(TO_CHAR(B.GAMT), '19991231') GAMT "
								SQL7 = SQL7 & " from tbb060 a,tbb040 b"
								SQL7 = SQL7 & " WHERE a.DPCD = b.VDCD"
								SQL7 = SQL7 & " and a.USRID = '" & UCASE(trim(id)) & "'"
								SQL7 = SQL7 & " and UPPER(a.PASSWD)  = '" & UCASE(trim(pwd)) & "'"
'								SQL7 = SQL7 & " and a.PASSWD  = encrypt ( 1234, '" & UCASE(trim(pwd)) & "' ) "

								Set Rs7 = db.Execute(SQL7)

								Session("DPCD")   = Rs7("DPCD")    '매장코드 세션
								Session("PCD")    = Rs7("PCD")     '모매장명 세션
								Session("USRID")  = Rs7("USRID")   '매장사용자
								Session("NAME")   = Rs7("VDSNM")   '매장명 세션
								Session("BRAND")  = Rs7("BRAND")   '브랜드 세션
								Session("SHGU")   = Rs7("SHGU")    '매장구분 세션
								Session("UBGB")   = Rs7("UBGB")    '매장구분 이마트 구분세션
								Session("JUWSU")  = Rs7("JUWSU")   '결제사용구분 세션
								Session("GAMT")    = Rs7("GAMT")		'NEW포스 사용기한 세션 byCho20190508
								BRAND = Rs7("BRAND")
								Session.timeout = 120
								Rs7.close
								Set Rs7 = nothing


								SQL8 = "select  TO_CHAR(SYSDATE,'YYYYMMDD') as tday from dual"
								Set Rs8 = db.Execute(SQL8)
								tday =Trim(Rs8("tday"))

							'수정
								SQL10 = "select  crdateseq,fdate,tdate from question_save"
								SQL10 = SQL10 & " where fdate <= '" & tday & "' "
								SQL10 = SQL10 & "   AND tdate >= '" & tday & "' "
								SQL10 = SQL10 & "   AND dpcd = '"& session("dpcd") &"' "
								SQL10 = SQL10 & "   AND selectnum = 0"
								SQL10 = SQL10 & "	order by fdate,tdate,crdateseq desc "
								set rs10=server.createobject("adodb.recordset")
								rs10.CursorLocation = adUseClient
								rs10.open sql10,db,adOpenStatic, adLockOptimistic

								'pop_dpcd = ""

								If rs10.bof Or rs10.eof Then
									 pop_dpcd = ""
								Else
										rs10.movefirst
										do while not rs10.eof
											pop_dpcd = pop_dpcd & (rs10("crdateseq") & "|")
											rs10.movenext
										Loop
								End If
							Rs10.close
							Set Rs10 = nothing


						sql11 = " SELECT COUNT(*) as inter_chk "
						sql11 = sql11&" from tbb150 "
						sql11 = sql11&" where reftp='J8'  AND  refnm= '"&session("dpcd")&"' "

						Set rs11 =  db.Execute(sql11)

						Session("inter_chk") = rs11("inter_chk")

						rs11.Close
						Set rs11 = nothing

							if  pop_dpcd <> "" Then%>
								<script language=javascript>
									location.href="/research/research.asp?pop_dpcd=<%=pop_dpcd%>";
									//location.href="/index.asp";
								</script>
							<%
							else
%>
								<script language=javascript>
									location.href="/index.asp";
								</script>
<%
							end if
						end if
	           		end if
	            end if
			end if
		end if          '권한유무 비교
	end if            '등록된 id를 비교

close_db
%>
