﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Game2gether.API.Models;

namespace Game2gether.API
{
    public class ApplicationDbContext : IdentityDbContext <AppUser, IdentityRole, string>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {

        }
        public virtual DbSet<Post> Posts { get; set; }
        public virtual DbSet<Report> Reports { get; set; }
        public virtual DbSet<Rating> Ratings { get; set; }
<<<<<<< HEAD
        public virtual DbSet<Message> Messages { get; set; }
=======
>>>>>>> 36d44387a9bad4acf1f0440a99e050868804bda0
        public virtual DbSet<Games> Games { get; set; }
    }
}
