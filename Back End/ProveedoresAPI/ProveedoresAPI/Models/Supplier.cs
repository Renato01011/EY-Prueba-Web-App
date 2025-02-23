﻿namespace ProveedoresAPI.Models
{
    public class Supplier
    {
        public int Id { get; set; }
        public string? CompanyName { get; set; }
        public string? Name { get; set; }
        public decimal TaxIdentification { get;set; }
        public string? PhoneNumber { get; set; }
        public string? Email { get; set; }
        public string? WebSite { get; set; }
        public string? Address { get; set; }
        public string? Country { get; set; }
        public decimal AnnualBilling { get; set; }
        public DateTime LastModified { get; set; }
    }
}
