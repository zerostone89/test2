function session_check(data) {
	if (data == "<script>top.location.href='/stime_out.asp'</script>") {
		//alert("다시 로그인해주세요.");
		opener.closed_refresh();
		//parent.top.location.href='/stime_out.asp';
		window.close();
	} else if (data == "\r\n\r\n<script language=\"javascript\">\r\nalert(\"로그아웃되었습니다.\\n다시로그인해주세요.\");\r\n\r\nparent.window.location = \"../default.asp\";\r\n</script>") {
		//alert("다시 로그인해주세요.");
		opener.closed_refresh();
		//parent.parent.top.location.href='/stime_out.asp';
		window.close();
	}
}