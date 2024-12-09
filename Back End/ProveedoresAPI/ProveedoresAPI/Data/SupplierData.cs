using Microsoft.Data.SqlClient;
using ProveedoresAPI.Models;
using System.Diagnostics.Metrics;
using System.Net;

namespace ProveedoresAPI.Data
{
    public class SupplierData
    {
        private readonly string conexion;

        public SupplierData(IConfiguration configuration)
        {
            conexion = configuration.GetConnectionString("SupplierDBConnectionString")!;
        }

        public async Task<Tuple<List<Supplier>, string>> GetSuppliers()
        {
            List<Supplier> resp = [];
            using (var con = new SqlConnection(conexion))
            {
                SqlCommand cmd = new("SP_GET_SUPPLIERS", con)
                {
                    CommandType = System.Data.CommandType.StoredProcedure
                };
                try
                {
                    await con.OpenAsync();
                    using (var reader = await cmd.ExecuteReaderAsync())
                    {
                        while (await reader.ReadAsync())
                        {
                            resp.Add(new Supplier
                            {
                                Id = Convert.ToInt32(reader["Id"]),
                                CompanyName = reader["CompanyName"].ToString()!,
                                Name = reader["Name"].ToString()!,
                                TaxIdentification = Convert.ToDecimal(reader["TaxIdentification"]),
                                PhoneNumber = reader["PhoneNumber"].ToString()!,
                                Email = reader["Email"].ToString()!,
                                WebSite = reader["WebSite"].ToString()!,
                                Address = reader["Address"].ToString()!,
                                Country = reader["Country"].ToString()!,
                                AnnualBilling = Convert.ToDecimal(reader["AnnualBilling"]),
                                LastModified = Convert.ToDateTime(reader["LastModified"]),
                            });
                        }
                    }
                }
                catch (Exception ex)
                {
                    return Tuple.Create(new List<Supplier>(), ex.Message);
                }
                
                return Tuple.Create(resp, "Ok");
            }
        }

        public async Task<string> AddSupplier(Supplier newSupplier)
        {
            string resp = "";

            using (var con = new SqlConnection(conexion))
            {
                SqlCommand cmd = new("SP_ADD_SUPPLIER", con)
                {
                    CommandType = System.Data.CommandType.StoredProcedure
                };
                cmd.Parameters.AddWithValue("@CompanyName", newSupplier.CompanyName);
                cmd.Parameters.AddWithValue("@Name", newSupplier.Name);
                cmd.Parameters.AddWithValue("@TaxIdentification", newSupplier.TaxIdentification);
                cmd.Parameters.AddWithValue("@PhoneNumber", newSupplier.PhoneNumber);
                cmd.Parameters.AddWithValue("@Email", newSupplier.Email);
                cmd.Parameters.AddWithValue("@WebSite", newSupplier.WebSite);
                cmd.Parameters.AddWithValue("@Address", newSupplier.Address);
                cmd.Parameters.AddWithValue("@Country", newSupplier.Country);
                cmd.Parameters.AddWithValue("@AnnualBilling", newSupplier.AnnualBilling);

                try
                {
                    await con.OpenAsync();
                    resp = await cmd.ExecuteNonQueryAsync() > 0 ? "Ok" : "Error";
                }
                catch (Exception error)
                {
                    resp = error.Message;
                }

                return resp;
            }
        }

        public async Task<string> EditSupplier(Supplier newSupplier)
        {
            string resp = "";

            using (var con = new SqlConnection(conexion))
            {
                SqlCommand cmd = new("SP_UPDATE_SUPPLIER", con)
                {
                    CommandType = System.Data.CommandType.StoredProcedure
                };
                cmd.Parameters.AddWithValue("@Id", newSupplier.Id);
                cmd.Parameters.AddWithValue("@CompanyName", newSupplier.CompanyName);
                cmd.Parameters.AddWithValue("@Name", newSupplier.Name);
                cmd.Parameters.AddWithValue("@TaxIdentification", newSupplier.TaxIdentification);
                cmd.Parameters.AddWithValue("@PhoneNumber", newSupplier.PhoneNumber);
                cmd.Parameters.AddWithValue("@Email", newSupplier.Email);
                cmd.Parameters.AddWithValue("@WebSite", newSupplier.WebSite);
                cmd.Parameters.AddWithValue("@Address", newSupplier.Address);
                cmd.Parameters.AddWithValue("@Country", newSupplier.Country);
                cmd.Parameters.AddWithValue("@AnnualBilling", newSupplier.AnnualBilling);

                try
                {
                    await con.OpenAsync();
                    resp = await cmd.ExecuteNonQueryAsync() > 0 ? "Ok" : "Error";
                }
                catch (Exception error)
                {
                    resp = error.Message;
                }

                return resp;
            }
        }

        public async Task<string> DeleteSupplier(int idSupplier)
        {
            string resp = "";

            using (var con = new SqlConnection(conexion))
            {
                SqlCommand cmd = new("SP_DELETE_SUPPLIER", con)
                {
                    CommandType = System.Data.CommandType.StoredProcedure
                };
                cmd.Parameters.AddWithValue("@IdSupplier", idSupplier);

                try
                {
                    await con.OpenAsync();
                    resp = await cmd.ExecuteNonQueryAsync() > 0 ? "Ok" : "Error";
                }
                catch (Exception error)
                {
                    resp = error.Message;
                }

                return resp;
            }
        }
    }
}
