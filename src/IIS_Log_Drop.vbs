'7�� ���� ���� �ڵ� �����ϴ� ��ũ��Ʈ

Option Explicit

' ������, ��¥ ����
Const strRootPath = "C:\WINDOWS\system32\LogFiles\W3SVC1\"
Const nDays = 15

Dim oFSO
Set oFSO = CreateObject("scripting.FileSystemObject")

Dim oFolder, oSubFolder
Set oFolder = oFSO.GetFolder(strRootPath)

Dim oFile

'������ ���� ���� ���� ����
For Each oFile In oFolder.Files
If Int(Now() - oFile.DateLastModified) >= nDays Then
oFile.Delete
End If
Next
