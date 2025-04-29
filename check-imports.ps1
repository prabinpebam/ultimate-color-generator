# Get all TypeScript and React files
$files = Get-ChildItem -Path .\src -Recurse -Include *.ts,*.tsx | Where-Object { -not $_.PSIsContainer }

$problems = @()

foreach ($file in $files) {
    $content = Get-Content $file.FullName
    $lineNumber = 0
    
    foreach ($line in $content) {
        $lineNumber++
        
        # Look for import statements with relative paths
        if ($line -match "import .* from [""'](\.[^""']+)[""']") {
            $importPath = $matches[1]
            
            # Skip non-relative imports
            if (-not $importPath.StartsWith(".")) { continue }
            
            # Get directory of current file
            $currentDir = Split-Path -Parent $file.FullName
            
            # Convert relative import to absolute path
            $targetPath = [System.IO.Path]::GetFullPath([System.IO.Path]::Combine($currentDir, $importPath))
            
            # Add extensions to check
            $extensionsToCheck = @(".ts", ".tsx", ".js", ".jsx")
            $found = $false
            
            foreach ($ext in $extensionsToCheck) {
                # Check if file exists with this extension
                if (Test-Path "${targetPath}${ext}") {
                    $found = $true
                    break
                }
                
                # Also check for index files in directories
                if (Test-Path "${targetPath}\index${ext}") {
                    $found = $true
                    break
                }
            }
            
            # Check if path exists without extension (directory case)
            if (Test-Path $targetPath) {
                $found = $true
            }
            
            if (-not $found) {
                $problems += [PSCustomObject]@{
                    File = $file.FullName
                    Line = $lineNumber
                    ImportStatement = $line.Trim()
                    MissingPath = $importPath
                }
            }
        }
    }
}

if ($problems.Count -gt 0) {
    Write-Host "Found $($problems.Count) problematic imports:" -ForegroundColor Yellow
    $problems | Format-Table -AutoSize
} else {
    Write-Host "No problematic imports found." -ForegroundColor Green
}

# Export problems to CSV if any found
if ($problems.Count -gt 0) {
    $problems | Export-Csv -Path "import-problems.csv" -NoTypeInformation
    Write-Host "Problems exported to import-problems.csv" -ForegroundColor Cyan
}
