				<%'설문조사 팝업시작%>
				<%
				open_dbo
					'설문조사 할게 있는지 체크..
					tday = Right("0000"&Year(now),4)&Right("00"&Month(now),2)&Right("00"&Day(Now),2)
					SQL = "select  crdateseq,fdate,tdate from question_save"
					SQL = SQL & " where fdate <= '" & tday & "' "
					SQL = SQL & "   AND tdate >= '" & tday & "' "
					SQL = SQL & "   AND dpcd = '"& session("dpcd") &"' "
					SQL = SQL & "   AND selectnum = 0"
					SQL = SQL & "	order by fdate,tdate,crdateseq desc "
					Set rs = Server.Createobject("Adodb.Recordset")
					rs.CursorLocation = adUseClient
					rs.open sql,db,adOpenStatic, adLockOptimistic
					If rs.eof then
						arrResearchNull=True						
					else
						arrResearchNull=True						
						arrResearch=rs.getRows()						
					end if
					rs.close
					set rs=Nothing
					'response.write sql

				close_db
				%>
				<%'설문조사 팝업끝%>




				<TABLE width="100%" border="0" cellspacing="0" cellpadding="0">
					<TR> 
						<TD align="center">
							<TABLE width="900" border="0" cellspacing="0" cellpadding="0">
								<TR>
									<TD width="449" height="100%" valign="top">
										<TABLE width="449" border="0" cellspacing="0" cellpadding="0">
											<TR>
												<TD height="38" valign="bottom"><IMG src="/Images/M_tit_Notice.gif" width="81" height="32"></TD>
												<TD align="right" valign="bottom"><a href="/comm/notice/notice_list.asp"><IMG src="/Images/B_btn_More.gif" width="46" height="18"></a></TD>
											</TR>
										</TABLE>
										<TABLE width="450" border="0" cellspacing="0" cellpadding="0">
											<TR>
												<TD width="7" height="7"><IMG src="/Images/Box_LeftT.gif" width="7" height="7"></TD>
												<TD width="435" background="/Images/Box_ptnTop.gif"></TD>
												<TD width="10" height="7"><IMG src="/Images/Box_RightT.gif" width="7" height="7"></TD>
											</TR>
											<TR>
												<TD background="/Images/Box_ptnLeft.gif">&nbsp;</TD>
												<TD align="center" style="padding-top:5px;padding-bottom:2px">
													<!--notice시작-->
													<!--#include virtual="/include/xinc/main_notice.asp"-->
													<!--notice끝-->
												</TD>	
												<TD background="/Images/Box_ptnRight.gif">&nbsp;</TD>
											</TR>
											<TR>
												<TD width="7" height="7"><IMG src="/Images/Box_LeftB.gif" width="7" height="7"></TD>
												<TD background="/Images/Box_ptnBottom.gif"></TD>
												<TD><IMG src="/Images/Box_RightB.gif" width="7" height="7"></TD>
											</TR>
										</TABLE>
										<TABLE width="1" border="0" cellspacing="0" cellpadding="0">
											<TR><TD height="8"></TD></TR>
										</TABLE>
										<TABLE width="448" border="0" cellspacing="0" cellpadding="0">
											<TR> 
												<TD width="4" height="4"><IMG src="/Images/Box_LeftT02.gif" width="4" height="4"></TD>
												<TD style="border-top:1px solid #E2E1DA"><IMG src="/Images/o.gif"></TD>
												<TD width="4" height="4"><IMG src="/Images/Box_RightT02.gif" width="4" height="4"></TD>
											</TR>
											<TR> 
												<TD style="border-left:1px solid #E2E1DA"><IMG src="/Images/o.gif"></TD>
												<TD align="center" >
												<!--한줄공지시작-->
												<!--#include virtual="/include/xinc/one_notice.asp"-->
												<!--한줄공지 끝-->
												</TD>
												<TD style="border-right:1px solid #E2E1DA"><IMG src="/Images/o.gif"></TD>
											</TR>
											<TR> 
												<TD width="4" height="4"><IMG src="/Images/Box_LeftB02.gif" width="4" height="4"></TD>
												<TD style="border-bottom:1px solid #E2E1DA"><IMG src="/Images/o.gif"></TD>
												<TD><IMG src="/Images/Box_RightB02.gif" width="4" height="4"></TD>
											</TR>
										</TABLE>
										<TABLE width="1" border="0" cellspacing="0" cellpadding="0">
											<TR><TD height="8"></TD></TR>
										</TABLE>
									</TD>
									<TD width="471"  height="60%" valign="top" style="padding-top:38px;padding-left:24px">
										<TABLE width="445" border="0" cellspacing="0" cellpadding="0">
											<TR> 
												<TD width="7" height="7"><IMG src="/Images/Box_LeftT.gif" width="7" height="7"></TD>
												<TD background="/Images/Box_ptnTop.gif"></TD>
												<TD width="7" height="7"><IMG src="/Images/Box_RightT.gif" width="7" height="7"></TD>
											</TR>
											<TR> 
												<TD background="/Images/Box_ptnLeft.gif">&nbsp;</TD>
												<TD align="center" style="padding-top:5px;padding-bottom:5px">
												<!--매출분석시작-->
												<!--#include virtual="/include/xinc/main_graph.asp"-->
												<!--매출분석끝-->
												</TD>
												<TD background="/Images/Box_ptnRight.gif">&nbsp;</TD>
											</TR>
											<TR> 
												<TD width="7" height="7"><IMG src="/Images/Box_LeftB.gif" width="7" height="7"></TD>
												<TD background="/Images/Box_ptnBottom.gif"></TD>
												<TD><IMG src="/Images/Box_RightB.gif" width="7" height="7"></TD>
											</TR>
										</TABLE>
										<TABLE width="1" border="0" cellspacing="0" cellpadding="0">
											<TR>
												<TD height="12"></TD>
											</TR>
										</TABLE>
										<!--mail시작-->
										<!--#include virtual="/include/xinc/main_mail.asp"-->
										<!--mail끝-->
										<TABLE width="1" border="0" cellspacing="0" cellpadding="0">
											<TR> 
												<TD height="8"></TD>
											</TR>
										</TABLE>										
									</TD>
								</TR>
							</TABLE>							
						</TD>
					</TR>
				</TABLE>