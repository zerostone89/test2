<!--#include virtual="/include/common.asp"-->
<!--METADATA TYPE="Typelib" NAME="ADODB Type Library"
	FILE="C:\Program Files\Common Files\System\ado\msado15.dll"-->

<%
open_dbo
	sql="		SELECT SUM(X.A),SUM(X.B),SUM(X.C),SUM(X.D),SUM(X.E) FROM		"
	sql=sql&"(	"
	sql=sql&"	SELECT ROUND(MAX(JAMT)/10000,0) A,0 B,0 C,0 D,0 E FROM tba110_D	"
	sql=sql&"	WHERE VDCD = '"&dpcd&"' 	"
	sql=sql&"	AND M_DATE BETWEEN TO_CHAR(SYSDATE, 'YYYYMM')||'01' AND TO_CHAR(LAST_DAY(SYSDATE),'YYYYMMDD')	"
	sql=sql&"UNION	"
	sql=sql&"	SELECT 0 A ,ROUND(NVL(JAMT, 0) / 10000) B,0 C,0 D,0 E	"
	sql=sql&"	FROM tba110_D	"
	sql=sql&"	WHERE VDCD = '"&dpcd&"'	"
	sql=sql&"	AND M_DATE = TO_CHAR(SYSDATE, 'YYYYMMDD')	"
	sql=sql&"UNION	"
	sql=sql&"	SELECT /*+ INDEX_DESC ( TBA010 IDX_TBA010_1 ) */ 0 A,0 B,ROUND(NVL(SUM(DECODE(SALEGU,'1', SILAMT, SILAMT*-1)) / 10000,0)) C,0 D,0 E	"
	sql=sql&"	FROM TBA010	"
	sql=sql&"	WHERE VDCD = '"&dpcd&"'	"
	sql=sql&"	AND SALEDT = TO_CHAR(SYSDATE-1, 'YYYYMMDD')	"
	sql=sql&"UNION	"
	sql=sql&"	SELECT /*+ INDEX_DESC ( TBA010 IDX_TBA010_1 ) */ 0 A,0 B,0 C,ROUND(NVL(SUM(DECODE(SALEGU,'1', SILAMT, SILAMT*-1)) / 10000,0)) D,0 E	"
	sql=sql&"	FROM TBA010	"
	sql=sql&"	WHERE VDCD = '"&dpcd&"'	"
	sql=sql&"	AND SALEDT = TO_CHAR(SYSDATE, 'YYYYMMDD')	"
'	sql=sql&"UNION	"
'	sql=sql&"	SELECT   0 A,0 B,0 C,0 D,ROUND(BRTOT / (SELECT  /*+ INDEX_DESC ( TBA010 idx_tba010_2 ) */  DECODE(COUNT(DISTINCT VDCD ),0,1,COUNT(DISTINCT VDCD)) FROM TBA010 WHERE SALEDT = TO_CHAR(SYSDATE-1, 'YYYYMMDD') AND BRCD =  '"&brand&"'   )) E	"
'	sql=sql&"	FROM (	"
'	sql=sql&"	SELECT  /*+ INDEX_DESC ( TBA010 idx_tba010_2 ) */  ROUND(NVL(SUM(DECODE(SALEGU,'1', SILAMT, SILAMT*-1)) / 10000,0)) BRTOT	"
'	sql=sql&"	FROM TBA010	"
'	sql=sql&"	WHERE SALEDT = TO_CHAR(SYSDATE-1, 'YYYYMMDD')	"
'	sql=sql&"	AND BRCD = '"&brand&"'  )	"
	sql=sql&") X	"
'response.write sql
	set rs=server.createobject("adodb.recordset")
	rs.CursorLocation = adUseClient		
	rs.open SQL,db,adOpenStatic, adLockOptimistic
	if rs.eof then
		var0=0
		var1=0
		var2=0
		var3=0
		var4=0
		var5=0
	else
		temp_var0=cdbl(rs(0))	' �̹��� ���� �ְ� ��ǥ��		
		temp_var1=cdbl(rs(2))	' ���ϸ���
		temp_var2=cdbl(rs(4))	' �귣�����
		temp_var3=cdbl(rs(3))	' ���ϸ���

		temp_var4=cdbl(rs(1))	' ���� �� ��ǥ 

	
		'��ǥ�� ���� ���ļ������..
		if ToLong(temp_var0)=0 then
			var0 = 0
			var1 = 0
			var2 = 0
			var3 = temp_var3
			var4= 0
		else
			var0 = ROUND(temp_var0 * 1.5,0)	'�ְ��ǥ�� * 1.5

			if var0 <> 0 then	
				var1 = ROUND((temp_var1/var0)*100,0)	'���ϸ���
				var2 = ROUND((temp_var2/var0)*100,0)	'�귣�����
				var3 = ROUND((temp_var3/var0)*100,0)	'���ϸ���
			else	'��ǥ�� ������ �ȵǾ�������
				var1 = 0
				var2 = 0
				var3 = 0
			end if

			if var3=0 then
				var4=0
			else
				var4 = ROUND((temp_var3/temp_var4)*100,0)	'14% �κ�
			end if
			

			if var0=0 then
				var5=0
			else
				var5 = ROUND((temp_var4/var0)*100,0)			' ��ǥ�ö� ��ġ������			
			end if


		end if
'	
'		var1=1000
'		response.write "temp_var0 ��ǥ��:" & temp_var0 & "<br>"
'		response.write "temp_var1 ���ϸ�:" & temp_var1 & "<br>"
'		response.write "temp_var2 �귣��:" & temp_var2 & "<br>"
'		response.write "temp_var3 ���ϸ�:" & temp_var3 & "<br>"
'		response.write "temp_var4 ���ø�:" & temp_var4 & "<br><br><br>"
'		response.write "var0 ��ǥ����::" & var0 & "<br>"
'		response.write "var1���ϸ���::" & var1 & "<br>"
'		response.write "var2�귣���::" & var2 & "<br>"
'		response.write "var3���ϸ�::" & var3 & "<br>"
'		response.write "var4����%::" & var4 & "<br>"
'		response.write "var5���ϸ�::" & var5 & "<br>"
'
'	
	end if
	rs.close
	set rs=nothing
close_db
%>

<%
'var1 : 1��°
'var4 : ����%
'var5 : ��ǥ
response.write "&var1="&var1&"&var2="&var2&"&var3="&var3&"&var4="&var4&"&var5="&var5&"&"

%>
