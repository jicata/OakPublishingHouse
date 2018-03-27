namespace OakPublishingHouse.Data
{
    using Microsoft.EntityFrameworkCore;
    using Models;

    public class OakPublishingHouseDbContext : DbContext
    {
        public OakPublishingHouseDbContext(DbContextOptions options)
            : base(options)
        {

        }

        public DbSet<Book> Books { get; set; }
    }
}
