using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace RomiAngular.Migrations
{
    public partial class addordermenutable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Menus_Orders_OrderID",
                table: "Menus");

            migrationBuilder.DropIndex(
                name: "IX_Menus_OrderID",
                table: "Menus");

            migrationBuilder.DropColumn(
                name: "MenuId",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "OrderID",
                table: "Menus");

            migrationBuilder.CreateTable(
                name: "OrderMenus",
                columns: table => new
                {
                    OrderID = table.Column<Guid>(nullable: false),
                    MenuId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "OrderMenus");

            migrationBuilder.AddColumn<int>(
                name: "MenuId",
                table: "Orders",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<Guid>(
                name: "OrderID",
                table: "Menus",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Menus_OrderID",
                table: "Menus",
                column: "OrderID");

            migrationBuilder.AddForeignKey(
                name: "FK_Menus_Orders_OrderID",
                table: "Menus",
                column: "OrderID",
                principalTable: "Orders",
                principalColumn: "OrderID",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
