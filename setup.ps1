# GitHub Copilot Property Portal - Quick Start Script
# Run this script from the root directory

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "GitHub Copilot Property Portal Setup" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if Node.js is installed
Write-Host "Checking Node.js installation..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version
    Write-Host "✓ Node.js is installed: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "✗ Node.js is not installed. Please install Node.js 18+ from https://nodejs.org" -ForegroundColor Red
    exit 1
}

# Check if npm is installed
Write-Host "Checking npm installation..." -ForegroundColor Yellow
try {
    $npmVersion = npm --version
    Write-Host "✓ npm is installed: $npmVersion" -ForegroundColor Green
} catch {
    Write-Host "✗ npm is not installed" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Step 1: Backend Setup" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

$backendPath = "api(backend)"
if (Test-Path $backendPath) {
    Write-Host "Installing backend dependencies..." -ForegroundColor Yellow
    Set-Location $backendPath
    
    # Check if .env exists
    if (-not (Test-Path ".env")) {
        Write-Host "⚠ .env file not found. Please create .env file with required variables" -ForegroundColor Yellow
        Write-Host "  Required variables:" -ForegroundColor Yellow
        Write-Host "    - MONGO_URL" -ForegroundColor Yellow
        Write-Host "    - JWT_SECRET" -ForegroundColor Yellow
        Write-Host "    - CLOUDINARY_API_KEY, API_SECRET, CLOUD_NAME" -ForegroundColor Yellow
        Write-Host "    - PAYPAL_CLIENT_ID, CLIENT_SECRET" -ForegroundColor Yellow
        Write-Host "    - MAILJET_API_KEY, API_SECRET, EMAIL_SENDER" -ForegroundColor Yellow
        Write-Host "    - ONE_SIGNAL_API_KEY, APP_ID" -ForegroundColor Yellow
    }
    
    npm install
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✓ Backend dependencies installed successfully" -ForegroundColor Green
    } else {
        Write-Host "✗ Failed to install backend dependencies" -ForegroundColor Red
    }
    
    Set-Location ..
} else {
    Write-Host "✗ Backend directory not found: $backendPath" -ForegroundColor Red
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Step 2: Admin Panel Setup" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

$adminPath = "admin-panel"
if (Test-Path $adminPath) {
    Write-Host "Installing admin panel dependencies..." -ForegroundColor Yellow
    Set-Location $adminPath
    
    # Check if .env exists
    if (-not (Test-Path ".env")) {
        Write-Host "⚠ .env file not found. Please create .env file with required variables" -ForegroundColor Yellow
        Write-Host "  Required variables:" -ForegroundColor Yellow
        Write-Host "    - VITE_REACT_APP_BACKEND_URL" -ForegroundColor Yellow
        Write-Host "    - VITE_REACT_APP_PAYPAL_CLIENT_ID" -ForegroundColor Yellow
        Write-Host "    - VITE_REACT_APP_GOOGLE_MAP_API_KEY" -ForegroundColor Yellow
        Write-Host "    - VITE_REACT_APP_ENCRYPTION_KEY" -ForegroundColor Yellow
    }
    
    npm install --legacy-peer-deps
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✓ Admin panel dependencies installed successfully" -ForegroundColor Green
    } else {
        Write-Host "✗ Failed to install admin panel dependencies" -ForegroundColor Red
    }
    
    Set-Location ..
} else {
    Write-Host "✗ Admin panel directory not found: $adminPath" -ForegroundColor Red
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Step 3: Mobile App Check" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

$mobilePath = "mobile_app"
if (Test-Path $mobilePath) {
    Write-Host "Checking Flutter installation..." -ForegroundColor Yellow
    try {
        $flutterVersion = flutter --version
        Write-Host "✓ Flutter is installed" -ForegroundColor Green
        Write-Host ""
        Write-Host "To setup mobile app, run:" -ForegroundColor Yellow
        Write-Host "  cd mobile_app" -ForegroundColor Cyan
        Write-Host "  flutter pub get" -ForegroundColor Cyan
        Write-Host "  flutter build apk --release" -ForegroundColor Cyan
    } catch {
        Write-Host "⚠ Flutter is not installed" -ForegroundColor Yellow
        Write-Host "  Install Flutter from: https://flutter.dev/docs/get-started/install" -ForegroundColor Yellow
    }
} else {
    Write-Host "✗ Mobile app directory not found: $mobilePath" -ForegroundColor Red
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Setup Complete!" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next Steps:" -ForegroundColor Yellow
Write-Host "1. Configure environment variables (.env files)" -ForegroundColor White
Write-Host "2. Start backend: cd api(backend) && npm run start:dev" -ForegroundColor White
Write-Host "3. Start admin panel: cd admin-panel && npm run dev" -ForegroundColor White
Write-Host "4. Build mobile app: cd mobile_app && flutter build apk" -ForegroundColor White
Write-Host ""
Write-Host "For deployment instructions, see DEPLOYMENT_GUIDE.md" -ForegroundColor Cyan
Write-Host ""
Write-Host "Customizations Applied:" -ForegroundColor Yellow
Write-Host "  ✓ App name: GitHub Copilot" -ForegroundColor Green
Write-Host "  ✓ Color theme: Red (#DC2626)" -ForegroundColor Green
Write-Host "  ✓ Logo: GitHub Copilot branding" -ForegroundColor Green
Write-Host ""
