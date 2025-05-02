# backend/Dockerfile

# 1) Build stage
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy the project file and restore
COPY *.csproj ./
RUN dotnet restore

# Copy the rest of the code and publish
COPY . .
RUN dotnet publish -c Release -o /app

# 2) Runtime stage
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app

# Copy the published app from build stage
COPY --from=build /app .

# Tell Kestrel to listen on container port 8080
ENV ASPNETCORE_URLS=http://+:8080
EXPOSE 8080

# The DLL name matches the .csproj (likely "backend.dll")
ENTRYPOINT ["dotnet", "backend.dll"]
