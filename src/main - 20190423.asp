<meta name="generator" content="Namo WebEditor(Trial)">
				<%'�������� �˾�����%>
				<%
				open_dbo
					'�������� �Ұ� �ִ��� üũ..
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
				<%'�������� �˾���%>

<script language=javascript>

  //�˾� ���� 2012�� 8�� 27�� �̻������ ��û
 // window.open('popup.html','','toolbar=no,location=no,status=yes,menubar=yes,scroll bars=yes,resizable=yes,width=800,height=600,top=100,left =100');

 function ViewlayerPop(){
		    document.getElementById("layerPop").style.display='inline'
     }

 function CloselayerPop(){
		    document.getElementById("layerPop").style.display='none';

	 }
	
 function confrim2(){
 
  rank =document.form.rank.options[document.form.rank.selectedIndex].value; 
 
 
 
 
 document.form.target="ifrm1";
 document.form.action='./xinc/main_top_rank.asp?rank='+rank;
 form.submit();
 }
 
 	
	
 	 
 
</script>

<form name="smssends" method="post">
	<input type=hidden name=telnos value="">
	<input type=hidden name=callyn value="Y">
	<input type=hidden name=smsgb value="">
</form>


               <form name="form">
               
              <TABLE width="100%">              
                <tr>
                
                <td>
                </td>
                </tr>
                
                </TABLE>
                 

				<TABLE width="100%" border="0" cellspacing="0" cellpadding="0">
					<TR> 
						<TD align="center">
							<TABLE width="900" border="0" cellspacing="0" cellpadding="0">
								<TR>
									<TD width="450" height="100%" valign="top">
										
							           
							           	<TABLE width="456" border="0" cellspacing="0" cellpadding="0" height="10">
									      
									      <tr>
									       
												<TD width="4" height="4"><IMG src="/Images/Box_LeftT02.gif" width="4" height="4"></TD>
												<TD style="border-top:1px solid #E2E1DA" height="5"><IMG src="/Images/o.gif"></TD>
												<TD width="4" height="4"><IMG src="/Images/Box_RightT02.gif" width="4" height="4"></TD>
								         </tr>
										 <TR> 
											    
												<TD style="border-left:1px solid #E2E1DA"><IMG src="/Images/o.gif"></TD> <%'����%>
												<TD align="center">
												<!--���ٰ�������-->
												<!--#include virtual="/include/xinc/one_notice.asp"-->
												<!--���ٰ��� ��-->
												</TD>		
												
										        <!--<TD width="300" height="20"><iframe src='/include/xinc/main_top_rank.asp' name="ifrm1" width="300" height="20" marginheight="0" marginwidth="0" frameborder="0"  scrolling="no"></iframe></td>-->
												<TD style="border-right:1px solid #E2E1DA"><IMG src="/Images/o.gif"></TD> 
												
		
								
											          
												
											<!--	</td> -->
																						
										</TR>
								    	<TR>												
										      <TD width="4" height="4"><IMG src="/Images/Box_LeftB02.gif" width="4" height="4"></TD>
											  <TD style="border-bottom:1px solid #E2E1DA"><IMG src="/Images/o.gif"></TD>
											  <TD><IMG src="/Images/Box_RightB02.gif" width="4" height="4"></TD>											
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
													<!--�������� ����-->
													<!--#include virtual="/include/xinc/main_notice.asp"-->
													<!--�������� ��-->
												</TD>	
												<TD background="/Images/Box_ptnRight.gif">&nbsp;</TD>
									 </TR>
									  <TR>
												<TD width="7" height="7"><IMG src="/Images/Box_LeftB.gif" width="7" height="7"></TD>
												<TD background="/Images/Box_ptnBottom.gif"></TD>
												<TD><IMG src="/Images/Box_RightB.gif" width="7" height="7"></TD>
									  </TR>
								</TABLE>
										
										
							    <TABLE width="445" border="0" cellspacing="0" cellpadding="0">
									   <TR> 
												<TD width="7" height="7"><IMG src="/Images/Box_LeftT.gif" width="7" height="7"></TD>
												<TD width="435" background="/Images/Box_ptnTop.gif"></TD>												
												<TD width="7" height="7"><IMG src="/Images/Box_RightT.gif" width="7" height="7"></TD>
									   </TR>
									    <TR> 
												<TD background="/Images/Box_ptnLeft.gif">&nbsp;</TD>
												<TD align="center" style="padding-top:5px;padding-bottom:5px">
												
												<!-- ���Ű� ������ ����Ʈ -->
												 <!--#include virtual="/include/xinc/main_sale_call.asp"-->
												<!-- ���Ű� ������ ����Ʈ ��-->
												</TD>
												<TD background="/Images/Box_ptnRight.gif">&nbsp;</TD>
										</TR>
										<TR> 
												<TD width="7" height="7"><IMG src="/Images/Box_LeftB.gif" width="7" height="7"></TD>
												<TD background="/Images/Box_ptnBottom.gif"></TD>
												<TD><IMG src="/Images/Box_RightB.gif" width="7" height="7"></TD>
										</TR>
								 </TABLE>
								 
								  <TABLE width="220" border="0" cellspacing="0" cellpadding="0">
								  <TR>
								  	<TD>
										 	<TABLE width="220" border="0" cellspacing="0" cellpadding="0">
													<TR> 
														<TD width="7" height="7"><IMG src="/Images/Box_LeftT.gif" width="7" height="7"></TD>
														<TD width="220" background="/Images/Box_ptnTop.gif"></TD>
														
														<TD width="7" height="7"><IMG src="/Images/Box_RightT.gif" width="7" height="7"></TD>
													</TR>
													<TR> 
														<TD background="/Images/Box_ptnLeft.gif">&nbsp;</TD>
														<TD align="center" style="padding-top:0px;padding-bottom:0px">
														<!--������ ����-->
													    <!--#include virtual="/include/xinc/main_birth_call.asp"-->
														<!--������ ��-->
														</TD>
														<TD background="/Images/Box_ptnRight.gif">&nbsp;</TD>
													</TR>
													<TR> 
														<TD width="7" height="7"><IMG src="/Images/Box_LeftB.gif" width="7" height="7"></TD>
														<TD background="/Images/Box_ptnBottom.gif"></TD>
														<TD><IMG src="/Images/Box_RightB.gif" width="7" height="7"></TD>
													</TR>
												</TABLE>
											</TD>
										  <TD>
										 	<TABLE width="220" border="0" cellspacing="0" cellpadding="0">
													<TR> 
														<TD width="7" height="7"><IMG src="/Images/Box_LeftT.gif" width="7" height="7"></TD>
														<TD width="220" background="/Images/Box_ptnTop.gif"></TD>
														
														<TD width="7" height="7"><IMG src="/Images/Box_RightT.gif" width="7" height="7"></TD>
													</TR>
													<TR> 
														<TD background="/Images/Box_ptnLeft.gif">&nbsp;</TD>
														<TD align="center" style="padding-top:0px;padding-bottom:0px">
														<!--���� ��Ƽ Ȯ�� ����-->
													    <!--#include virtual="/include/xinc/main_marry_call.asp"-->
														<!--��Ƽ Ȯ�� ��-->
														</TD>
														<TD background="/Images/Box_ptnRight.gif">&nbsp;</TD>
													</TR>
													<TR> 
														<TD width="7" height="7"><IMG src="/Images/Box_LeftB.gif" width="7" height="7"></TD>
														<TD background="/Images/Box_ptnBottom.gif"></TD>
														<TD><IMG src="/Images/Box_RightB.gif" width="7" height="7"></TD>
													</TR>
												</TABLE>		
									  	</TD>
									  </TR>					 
								    </TABLE>
									</TD>
									
									<td>
									</td>
									
									<!--<TD width="471"  height="60%" valign="top" style="padding-top:38px;padding-left:24px">-->
								
								
								  <TD width="459" height="100%" valign="top">  
								  
								<TABLE width="459" border="0" cellspacing="0" cellpadding="0" height="10">
									      
									      <tr>
									       
												<TD width="4" height="4"><IMG src="/Images/Box_LeftT02.gif" width="4" height="4"></TD>
												<TD style="border-top:1px solid #E2E1DA" height="5"><IMG src="/Images/o.gif"></TD>
												<TD width="4" height="4"><IMG src="/Images/Box_RightT02.gif" width="4" height="4"></TD>
								         </tr>
										 <TR> 
											    
												<TD style="border-left:1px solid #E2E1DA"><IMG src="/Images/o.gif"></TD> <%'����%>
														
												<TD align="Left" valign=middle">
												<select name="rank" onchange="confrim2()"><option value= "1">�����Ǹ�</option> 							   
							                                            <option value= "2">�ְ��Ǹ�</option>
							                                            <option value= "3">�����Ǹ�</option>
							                    </select>
							                    <iframe src='/include/xinc/main_top_rank.asp' name="ifrm1" width="350" height="20" marginheight="0" marginwidth="0" frameborder="0"  scrolling="no"></iframe>
										       </td>
										        <!--<TD width="300" height="20"><iframe src='/include/xinc/main_top_rank.asp' name="ifrm1" width="300" height="20" marginheight="0" marginwidth="0" frameborder="0"  scrolling="no"></iframe></td>-->
												<TD style="border-right:1px solid #E2E1DA"><IMG src="/Images/o.gif"></TD> 
												
		
								
											          
												
											<!--	</td> -->
																						
										</TR>
								    	<TR>												
										      <TD width="4" height="4"><IMG src="/Images/Box_LeftB02.gif" width="4" height="4"></TD>
											  <TD style="border-bottom:1px solid #E2E1DA"><IMG src="/Images/o.gif"></TD>
											  <TD><IMG src="/Images/Box_RightB02.gif" width="4" height="4"></TD>											
								       </TR>
												
	                                     
								
								
							
							     </TABLE>
							     
									<TABLE width="445" border="0" cellspacing="0" cellpadding="0">
											<TR> 
												<TD width="7" height="7"><IMG src="/Images/Box_LeftT.gif" width="7" height="7"></TD>
												<TD width="30" background="/Images/Box_ptnTop.gif"></TD>
												
												<TD width="7" height="7"><IMG src="/Images/Box_RightT.gif" width="7" height="7"></TD>
											</TR>
											<TR> 
												<TD background="/Images/Box_ptnLeft.gif">&nbsp;</TD>
												<TD align="center" style="padding-top:5px;padding-bottom:5px">
												<!--����-->
												<!--#include virtual="/include/xinc/main_mail.asp"-->
												<!--���� ��-->
												</TD>
												<TD background="/Images/Box_ptnRight.gif">&nbsp;</TD>
											</TR>
											<TR> 
												<TD width="7" height="7"><IMG src="/Images/Box_LeftB.gif" width="7" height="7"></TD>
												<TD background="/Images/Box_ptnBottom.gif"></TD>
												<TD><IMG src="/Images/Box_RightB.gif" width="7" height="7"></TD>
											</TR>
									 	</TABLE> 
										
									
							    <TABLE width="445" border="0" cellspacing="0" cellpadding="0">
									   <TR> 
												<TD width="7" height="7"><IMG src="/Images/Box_LeftT.gif" width="7" height="7"></TD>
												<TD width="435" background="/Images/Box_ptnTop.gif"></TD>												
												<TD width="7" height="7"><IMG src="/Images/Box_RightT.gif" width="7" height="7"></TD>
									   </TR>
									    <TR> 
												<TD background="/Images/Box_ptnLeft.gif">&nbsp;</TD>
												<TD align="center" style="padding-top:5px;padding-bottom:5px">
												
												<!-- R/T ��û����/�ޱ� ����-->
												 <!--#include virtual="/include/xinc/main_list.asp"-->
												<!-- R/T ��û����/�ޱ� ��-->
												</TD>
												<TD background="/Images/Box_ptnRight.gif">&nbsp;</TD>
										</TR>
										<TR> 
												<TD width="7" height="7"><IMG src="/Images/Box_LeftB.gif" width="7" height="7"></TD>
												<TD background="/Images/Box_ptnBottom.gif"></TD>
												<TD><IMG src="/Images/Box_RightB.gif" width="7" height="7"></TD>
										</TR>
								 </TABLE>
								 
								 	<TABLE width="445" border="0" cellspacing="0" cellpadding="0">
											<TR> 
												<TD width="7" height="7"><IMG src="/Images/Box_LeftT.gif" width="7" height="7"></TD>
												<TD width="435" background="/Images/Box_ptnTop.gif"></TD>
												
												<TD width="7" height="7"><IMG src="/Images/Box_RightT.gif" width="7" height="7"></TD>
											</TR>
											<TR> 
												<TD background="/Images/Box_ptnLeft.gif">&nbsp;</TD>
												<TD align="center" style="padding-top:5px;padding-bottom:5px">
												<!--R/T �ֱ� ����-->
											    <!--#include virtual="/include/xinc/main_confirm.asp"-->
												<!--R/T �ֱ� ��-->
												</TD>
												<TD background="/Images/Box_ptnRight.gif">&nbsp;</TD>
											</TR>
											<TR> 
												<TD width="7" height="7"><IMG src="/Images/Box_LeftB.gif" width="7" height="7"></TD>
												<TD background="/Images/Box_ptnBottom.gif"></TD>
												<TD><IMG src="/Images/Box_RightB.gif" width="7" height="7"></TD>
											</TR>
										</TABLE>										
										
										
										<TABLE width="445" border="0" cellspacing="0" cellpadding="0">
											<TR> 
												<TD width="7" height="7"><IMG src="/Images/Box_LeftT.gif" width="7" height="7"></TD>
												<TD width="435" background="/Images/Box_ptnTop.gif"></TD>
												
												<TD width="7" height="7"><IMG src="/Images/Box_RightT.gif" width="7" height="7"></TD>
											</TR>
											<TR> 
												<TD background="/Images/Box_ptnLeft.gif">&nbsp;</TD>
												<TD align="center" style="padding-top:5px;padding-bottom:5px">
												<!--�����Խ���  ����-->
											    <!--#include virtual="/include/xinc/main_free.asp"-->
												<!--�����Խ���  ��-->
												</TD>
												<TD background="/Images/Box_ptnRight.gif">&nbsp;</TD>
											</TR>
											<TR> 
												<TD width="7" height="7"><IMG src="/Images/Box_LeftB.gif" width="7" height="7"></TD>
												<TD background="/Images/Box_ptnBottom.gif"></TD>
												<TD><IMG src="/Images/Box_RightB.gif" width="7" height="7"></TD>
											</TR>
										</TABLE>										
																				
								</TD> 
								 
								<!--</TR> -->
							</TABLE>							
						</TD>
					</TR>
				</TABLE>
				</form>