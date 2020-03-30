'7일 지난 파일 자동 삭제하는 스크립트

Option Explicit

' 폴더명, 날짜 지정
Const strRootPath = "C:\WINDOWS\system32\LogFiles\W3SVC1\"
Const nDays = 15

Dim oFSO
Set oFSO = CreateObject("scripting.FileSystemObject")

Dim oFolder, oSubFolder
Set oFolder = oFSO.GetFolder(strRootPath)

Dim oFile

'지정된 폴더 안의 파일 삭제
For Each oFile In oFolder.Files
If Int(Now() - oFile.DateLastModified) >= nDays Then
oFile.Delete
End If
Next
