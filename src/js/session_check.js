function session_check(data) {
	if (data == "<script>top.location.href='/stime_out.asp'</script>") {
		//alert("�ٽ� �α������ּ���.");
		opener.closed_refresh();
		//parent.top.location.href='/stime_out.asp';
		window.close();
	} else if (data == "\r\n\r\n<script language=\"javascript\">\r\nalert(\"�α׾ƿ��Ǿ����ϴ�.\\n�ٽ÷α������ּ���.\");\r\n\r\nparent.window.location = \"../default.asp\";\r\n</script>") {
		//alert("�ٽ� �α������ּ���.");
		opener.closed_refresh();
		//parent.parent.top.location.href='/stime_out.asp';
		window.close();
	}
}