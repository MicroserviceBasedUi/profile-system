#addin Cake.Yarn

var target = Argument("target", "Default");

var sourceDir = @"./src";
var backendDir = sourceDir + @"/backend";
var clientDir = sourceDir + @"/client";

Task("Restore:Backend")
    .Does(() =>
{
    Yarn.FromPath(backendDir).Install();
});

Task("Restore:Client")
  .Does(() =>
{
  Yarn.FromPath(clientDir).Install();
});

Task("Start:Client")
  .Does(() =>
{
  Yarn.FromPath(clientDir).RunScript("start");
});

Task("Start:Backend")
    .Does(() =>
{
    Yarn.FromPath(backendDir).RunScript("start");
});

Task("Default")
    .IsDependentOn("Start:Backend")
    .Does(() =>
{
});

RunTarget(target);
