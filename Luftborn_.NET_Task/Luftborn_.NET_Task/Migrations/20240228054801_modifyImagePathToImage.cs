using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Luftborn_.NET_Task.Migrations
{
    public partial class modifyImagePathToImage : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ImagePath",
                table: "Employees",
                newName: "Image");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Image",
                table: "Employees",
                newName: "ImagePath");
        }
    }
}
