var target = Argument("target", "Default");

var sourceDir = @".\src";
var projectDir = System.IO.Path.Combine(sourceDir, "Zuehlke.ProfileSystem");
var project = "Zuehlke.ProfileSystem.csproj";

var runSettings = new DotNetCoreRunSettings
{
    WorkingDirectory = projectDir
};

Task("Restore")
    .Does(() =>
{
    DotNetCoreRestore(sourceDir);
});

Task("Build")
    .IsDependentOn("Restore")
    .Does(() =>
{
    DotNetCoreBuild(sourceDir);
});

Task("Start")
    .IsDependentOn("Build")
    .Does(() =>
{
    DotNetCoreRun(project,"--server.urls=http://localhost:5001/", runSettings);
});

Task("Default")
    .IsDependentOn("Build")
    .Does(() =>
{
});

RunTarget(target);
