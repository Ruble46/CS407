using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace Game2gether.Migrations
{
    public partial class steamProfile : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "games1",
                table: "AspNetUsers",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "steamAvatar",
                table: "AspNetUsers",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "steamId",
                table: "AspNetUsers",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "steamName",
                table: "AspNetUsers",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "games1",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "steamAvatar",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "steamId",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "steamName",
                table: "AspNetUsers");
        }
    }
}
