using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace RomiAngular.Migrations
{
    public partial class addordermenutable2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "id",
                table: "OrderMenus",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<Guid>(
                name: "OrderMenuid",
                table: "Menus",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_OrderMenus",
                table: "OrderMenus",
                column: "id");

            migrationBuilder.CreateIndex(
                name: "IX_Menus_OrderMenuid",
                table: "Menus",
                column: "OrderMenuid");

            migrationBuilder.AddForeignKey(
                name: "FK_Menus_OrderMenus_OrderMenuid",
                table: "Menus",
                column: "OrderMenuid",
                principalTable: "OrderMenus",
                principalColumn: "id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Menus_OrderMenus_OrderMenuid",
                table: "Menus");

            migrationBuilder.DropPrimaryKey(
                name: "PK_OrderMenus",
                table: "OrderMenus");

            migrationBuilder.DropIndex(
                name: "IX_Menus_OrderMenuid",
                table: "Menus");

            migrationBuilder.DropColumn(
                name: "id",
                table: "OrderMenus");

            migrationBuilder.DropColumn(
                name: "OrderMenuid",
                table: "Menus");
        }
    }
}
