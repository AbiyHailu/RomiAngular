using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace RomiAngular.Migrations
{
    public partial class addordermenutable3 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Menus_OrderMenus_OrderMenuid",
                table: "Menus");

            migrationBuilder.RenameColumn(
                name: "id",
                table: "OrderMenus",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "OrderMenuid",
                table: "Menus",
                newName: "OrderMenuId");

            migrationBuilder.RenameIndex(
                name: "IX_Menus_OrderMenuid",
                table: "Menus",
                newName: "IX_Menus_OrderMenuId");

            migrationBuilder.AddColumn<Guid>(
                name: "OrderMenuId",
                table: "Orders",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Orders_OrderMenuId",
                table: "Orders",
                column: "OrderMenuId");

            migrationBuilder.AddForeignKey(
                name: "FK_Menus_OrderMenus_OrderMenuId",
                table: "Menus",
                column: "OrderMenuId",
                principalTable: "OrderMenus",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Orders_OrderMenus_OrderMenuId",
                table: "Orders",
                column: "OrderMenuId",
                principalTable: "OrderMenus",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Menus_OrderMenus_OrderMenuId",
                table: "Menus");

            migrationBuilder.DropForeignKey(
                name: "FK_Orders_OrderMenus_OrderMenuId",
                table: "Orders");

            migrationBuilder.DropIndex(
                name: "IX_Orders_OrderMenuId",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "OrderMenuId",
                table: "Orders");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "OrderMenus",
                newName: "id");

            migrationBuilder.RenameColumn(
                name: "OrderMenuId",
                table: "Menus",
                newName: "OrderMenuid");

            migrationBuilder.RenameIndex(
                name: "IX_Menus_OrderMenuId",
                table: "Menus",
                newName: "IX_Menus_OrderMenuid");

            migrationBuilder.AddForeignKey(
                name: "FK_Menus_OrderMenus_OrderMenuid",
                table: "Menus",
                column: "OrderMenuid",
                principalTable: "OrderMenus",
                principalColumn: "id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
