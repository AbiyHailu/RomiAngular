using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace RomiAngular.Migrations
{
    public partial class newmodel : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Drinks_Orders_OrderID",
                table: "Drinks");

            migrationBuilder.DropForeignKey(
                name: "FK_Foods_Orders_OrderID",
                table: "Foods");

            migrationBuilder.DropForeignKey(
                name: "FK_Ingredients_Orders_OrderID",
                table: "Ingredients");

            migrationBuilder.DropIndex(
                name: "IX_Ingredients_OrderID",
                table: "Ingredients");

            migrationBuilder.DropIndex(
                name: "IX_Foods_OrderID",
                table: "Foods");

            migrationBuilder.DropIndex(
                name: "IX_Drinks_OrderID",
                table: "Drinks");

            migrationBuilder.DropColumn(
                name: "OrderID",
                table: "Ingredients");

            migrationBuilder.DropColumn(
                name: "OrderID",
                table: "Foods");

            migrationBuilder.DropColumn(
                name: "OrderID",
                table: "Drinks");

            migrationBuilder.AlterColumn<Guid>(
                name: "UserID",
                table: "Users",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int")
                .OldAnnotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AddColumn<int>(
                name: "DrinkId",
                table: "Orders",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "FoodId",
                table: "Orders",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "GustId",
                table: "Orders",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<Guid>(
                name: "GustId1",
                table: "Orders",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "IngredientId",
                table: "Orders",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<Guid>(
                name: "UserID",
                table: "Orders",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "Orders",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Orders_DrinkId",
                table: "Orders",
                column: "DrinkId");

            migrationBuilder.CreateIndex(
                name: "IX_Orders_FoodId",
                table: "Orders",
                column: "FoodId");

            migrationBuilder.CreateIndex(
                name: "IX_Orders_GustId1",
                table: "Orders",
                column: "GustId1");

            migrationBuilder.CreateIndex(
                name: "IX_Orders_IngredientId",
                table: "Orders",
                column: "IngredientId");

            migrationBuilder.CreateIndex(
                name: "IX_Orders_UserID",
                table: "Orders",
                column: "UserID");

            migrationBuilder.AddForeignKey(
                name: "FK_Orders_Drinks_DrinkId",
                table: "Orders",
                column: "DrinkId",
                principalTable: "Drinks",
                principalColumn: "DrinkID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Orders_Foods_FoodId",
                table: "Orders",
                column: "FoodId",
                principalTable: "Foods",
                principalColumn: "FoodID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Orders_Gusts_GustId1",
                table: "Orders",
                column: "GustId1",
                principalTable: "Gusts",
                principalColumn: "GustId",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Orders_Ingredients_IngredientId",
                table: "Orders",
                column: "IngredientId",
                principalTable: "Ingredients",
                principalColumn: "IngredientID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Orders_Users_UserID",
                table: "Orders",
                column: "UserID",
                principalTable: "Users",
                principalColumn: "UserID",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Orders_Drinks_DrinkId",
                table: "Orders");

            migrationBuilder.DropForeignKey(
                name: "FK_Orders_Foods_FoodId",
                table: "Orders");

            migrationBuilder.DropForeignKey(
                name: "FK_Orders_Gusts_GustId1",
                table: "Orders");

            migrationBuilder.DropForeignKey(
                name: "FK_Orders_Ingredients_IngredientId",
                table: "Orders");

            migrationBuilder.DropForeignKey(
                name: "FK_Orders_Users_UserID",
                table: "Orders");

            migrationBuilder.DropIndex(
                name: "IX_Orders_DrinkId",
                table: "Orders");

            migrationBuilder.DropIndex(
                name: "IX_Orders_FoodId",
                table: "Orders");

            migrationBuilder.DropIndex(
                name: "IX_Orders_GustId1",
                table: "Orders");

            migrationBuilder.DropIndex(
                name: "IX_Orders_IngredientId",
                table: "Orders");

            migrationBuilder.DropIndex(
                name: "IX_Orders_UserID",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "DrinkId",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "FoodId",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "GustId",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "GustId1",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "IngredientId",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "UserID",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Orders");

            migrationBuilder.AlterColumn<int>(
                name: "UserID",
                table: "Users",
                type: "int",
                nullable: false,
                oldClrType: typeof(Guid))
                .Annotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AddColumn<int>(
                name: "OrderID",
                table: "Ingredients",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "OrderID",
                table: "Foods",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "OrderID",
                table: "Drinks",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Ingredients_OrderID",
                table: "Ingredients",
                column: "OrderID");

            migrationBuilder.CreateIndex(
                name: "IX_Foods_OrderID",
                table: "Foods",
                column: "OrderID");

            migrationBuilder.CreateIndex(
                name: "IX_Drinks_OrderID",
                table: "Drinks",
                column: "OrderID");

            migrationBuilder.AddForeignKey(
                name: "FK_Drinks_Orders_OrderID",
                table: "Drinks",
                column: "OrderID",
                principalTable: "Orders",
                principalColumn: "OrderID",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Foods_Orders_OrderID",
                table: "Foods",
                column: "OrderID",
                principalTable: "Orders",
                principalColumn: "OrderID",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Ingredients_Orders_OrderID",
                table: "Ingredients",
                column: "OrderID",
                principalTable: "Orders",
                principalColumn: "OrderID",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
