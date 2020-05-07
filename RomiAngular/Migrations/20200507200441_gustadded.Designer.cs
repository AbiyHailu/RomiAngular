﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using RomiAngular.Data;

namespace RomiAngular.Migrations
{
    [DbContext(typeof(RomiContext))]
    [Migration("20200507200441_gustadded")]
    partial class gustadded
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "3.1.3")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("RomiAngular.Models.Drink", b =>
                {
                    b.Property<int>("DrinkID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("OrderID")
                        .HasColumnType("int");

                    b.Property<decimal>("UnitPrice")
                        .HasColumnType("decimal(10,2)");

                    b.HasKey("DrinkID");

                    b.HasIndex("OrderID");

                    b.ToTable("Drinks");
                });

            modelBuilder.Entity("RomiAngular.Models.Food", b =>
                {
                    b.Property<int>("FoodID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("OrderID")
                        .HasColumnType("int");

                    b.Property<decimal>("UnitPrice")
                        .HasColumnType("decimal(10,2)");

                    b.HasKey("FoodID");

                    b.HasIndex("OrderID");

                    b.ToTable("Foods");
                });

            modelBuilder.Entity("RomiAngular.Models.Gust", b =>
                {
                    b.Property<Guid>("GustId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("FirstName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("LastName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Phone")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("GustId");

                    b.ToTable("Gusts");
                });

            modelBuilder.Entity("RomiAngular.Models.Ingredient", b =>
                {
                    b.Property<int>("IngredientID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("OrderID")
                        .HasColumnType("int");

                    b.Property<decimal>("UnitPrice")
                        .HasColumnType("decimal(10,2)");

                    b.HasKey("IngredientID");

                    b.HasIndex("OrderID");

                    b.ToTable("Ingredients");
                });

            modelBuilder.Entity("RomiAngular.Models.Order", b =>
                {
                    b.Property<int>("OrderID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("OrderDate")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("PreferdDeliveryDate")
                        .HasColumnType("datetime2");

                    b.Property<decimal>("TotalExcVat")
                        .HasColumnType("decimal(10,2)");

                    b.Property<decimal>("TotalIncVat")
                        .HasColumnType("decimal(10,2)");

                    b.Property<bool>("deliverd")
                        .HasColumnType("bit");

                    b.Property<bool>("markasread")
                        .HasColumnType("bit");

                    b.Property<decimal>("servicecharge")
                        .HasColumnType("decimal(10,2)");

                    b.Property<decimal>("vat")
                        .HasColumnType("decimal(10,2)");

                    b.HasKey("OrderID");

                    b.ToTable("Orders");
                });

            modelBuilder.Entity("RomiAngular.Models.User", b =>
                {
                    b.Property<int>("UserID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Emailaddress")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("FirstName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("LastName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Password")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("UserType")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("UserID");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("RomiAngular.Models.Drink", b =>
                {
                    b.HasOne("RomiAngular.Models.Order", null)
                        .WithMany("Drinks")
                        .HasForeignKey("OrderID");
                });

            modelBuilder.Entity("RomiAngular.Models.Food", b =>
                {
                    b.HasOne("RomiAngular.Models.Order", null)
                        .WithMany("Foods")
                        .HasForeignKey("OrderID");
                });

            modelBuilder.Entity("RomiAngular.Models.Ingredient", b =>
                {
                    b.HasOne("RomiAngular.Models.Order", null)
                        .WithMany("Ingredients")
                        .HasForeignKey("OrderID");
                });
#pragma warning restore 612, 618
        }
    }
}
