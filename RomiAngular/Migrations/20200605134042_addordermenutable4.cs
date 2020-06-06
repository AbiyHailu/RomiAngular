using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace RomiAngular.Migrations
{
    public partial class addordermenutable4 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Menus_OrderMenus_OrderMenuId",
                table: "Menus");

            migrationBuilder.DropForeignKey(
                name: "FK_Orders_OrderMenus_OrderMenuId",
                table: "Orders");

            migrationBuilder.DropPrimaryKey(
                name: "PK_OrderMenus",
                table: "OrderMenus");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "OrderMenus");

            migrationBuilder.AddColumn<Guid>(
                name: "OrderMenuId",
                table: "OrderMenus",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddPrimaryKey(
                name: "PK_OrderMenus",
                table: "OrderMenus",
                column: "OrderMenuId");

            migrationBuilder.AddForeignKey(
                name: "FK_Menus_OrderMenus_OrderMenuId",
                table: "Menus",
                column: "OrderMenuId",
                principalTable: "OrderMenus",
                principalColumn: "OrderMenuId",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Orders_OrderMenus_OrderMenuId",
                table: "Orders",
                column: "OrderMenuId",
                principalTable: "OrderMenus",
                principalColumn: "OrderMenuId",
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

            migrationBuilder.DropPrimaryKey(
                name: "PK_OrderMenus",
                table: "OrderMenus");

            migrationBuilder.DropColumn(
                name: "OrderMenuId",
                table: "OrderMenus");

            migrationBuilder.AddColumn<Guid>(
                name: "Id",
                table: "OrderMenus",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddPrimaryKey(
                name: "PK_OrderMenus",
                table: "OrderMenus",
                column: "Id");

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
    }
}
