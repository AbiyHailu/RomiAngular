using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace RomiAngular.Migrations
{
    public partial class addordermenutable6 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
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

            migrationBuilder.DropIndex(
                name: "IX_Menus_OrderMenuId",
                table: "Menus");

            migrationBuilder.DropColumn(
                name: "OrderMenuId",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "OrderMenuId",
                table: "Menus");

            migrationBuilder.AlterColumn<Guid>(
                name: "UserId",
                table: "Orders",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier");

            migrationBuilder.AlterColumn<Guid>(
                name: "GustId",
                table: "Orders",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<Guid>(
                name: "UserId",
                table: "Orders",
                type: "uniqueidentifier",
                nullable: false,
                oldClrType: typeof(Guid),
                oldNullable: true);

            migrationBuilder.AlterColumn<Guid>(
                name: "GustId",
                table: "Orders",
                type: "uniqueidentifier",
                nullable: false,
                oldClrType: typeof(Guid),
                oldNullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "OrderMenuId",
                table: "Orders",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "OrderMenuId",
                table: "Menus",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Orders_OrderMenuId",
                table: "Orders",
                column: "OrderMenuId");

            migrationBuilder.CreateIndex(
                name: "IX_Menus_OrderMenuId",
                table: "Menus",
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
    }
}
