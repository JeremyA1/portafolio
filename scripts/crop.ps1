# Recorta una captura y la guarda como JPG. Uso: crop.ps1 entrada.png salida.jpg alto
param($src, $dst, [int]$h)
Add-Type -AssemblyName System.Drawing
$img = [System.Drawing.Image]::FromFile((Resolve-Path $src))
$h = [Math]::Min($h, $img.Height)
$bmp = New-Object System.Drawing.Bitmap $img.Width, $h
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.DrawImage($img, (New-Object System.Drawing.Rectangle 0,0,$img.Width,$h), (New-Object System.Drawing.Rectangle 0,0,$img.Width,$h), [System.Drawing.GraphicsUnit]::Pixel)
$codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | ? { $_.MimeType -eq 'image/jpeg' }
$p = New-Object System.Drawing.Imaging.EncoderParameters 1
$p.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter ([System.Drawing.Imaging.Encoder]::Quality), 84L
$bmp.Save((Join-Path (Get-Location) $dst), $codec, $p)
$g.Dispose(); $bmp.Dispose(); $img.Dispose()
