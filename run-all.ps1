# SeniorConnect Full Stack Microservices Startup Script
Write-Host "=========================================================" -ForegroundColor Cyan
Write-Host "        SENIORCONNECT MICROSERVICES PLATFORM            " -ForegroundColor Green
Write-Host "=========================================================" -ForegroundColor Cyan

$services = @(
    @{ Name = "Eureka Server"; Directory = "eureka-server"; Main = "com.seniorconnect.eureka.EurekaServerApplication" },
    @{ Name = "API Gateway"; Directory = "api-gateway"; Main = "com.seniorconnect.gateway.ApiGatewayApplication" },
    @{ Name = "Auth Service"; Directory = "auth-service"; Main = "com.seniorconnect.auth.AuthServiceApplication" },
    @{ Name = "User Service"; Directory = "user-service"; Main = "com.seniorconnect.user.UserServiceApplication" },
    @{ Name = "Mentorship Service"; Directory = "mentorship-service"; Main = "com.seniorconnect.mentorship.MentorshipServiceApplication" },
    @{ Name = "Interview Service"; Directory = "interview-service"; Main = "com.seniorconnect.interview.InterviewServiceApplication" },
    @{ Name = "Resource Service"; Directory = "resource-service"; Main = "com.seniorconnect.resource.ResourceServiceApplication" },
    @{ Name = "Notification Service"; Directory = "notification-service"; Main = "com.seniorconnect.notification.NotificationServiceApplication" }
)

Write-Host "Starting Frontend (Vite React)..." -ForegroundColor Yellow
Start-Process -FilePath "npm" -ArgumentList "run", "dev" -WorkingDirectory "$PSScriptRoot\frontend"

Write-Host "`nAll Microservices are ready to launch!" -ForegroundColor Green
Write-Host "Frontend URL: http://localhost:3000" -ForegroundColor Cyan
Write-Host "Eureka Registry: http://localhost:8761" -ForegroundColor Cyan
Write-Host "API Gateway Entrypoint: http://localhost:8080/api" -ForegroundColor Cyan
