using Microsoft.Data.SqlClient;
using ProveedoresAPI.Models;

namespace ProveedoresAPI.Data
{
    public class UserData
    {
        private readonly string conexion;
        public UserData(IConfiguration configuration)
        {
            conexion = configuration.GetConnectionString("SupplierDBConnectionString")!;
        }

        public async Task<User> getUserByUsername(User user)
        {
            using (var con = new SqlConnection(conexion))
            {
                User respUser = new();
                await con.OpenAsync();
                SqlCommand cmd = new("SP_GET_USER_BY_USERNAME", con)
                {
                    CommandType = System.Data.CommandType.StoredProcedure
                };
                cmd.Parameters.AddWithValue("@Username", user.Username);

                using (var reader = await cmd.ExecuteReaderAsync())
                {
                    while (await reader.ReadAsync())
                    {
                        respUser.Username = reader["Username"].ToString()!;
                        respUser.Password = reader["Password"].ToString()!;
                        
                    }
                }
                return respUser;
            }
        }
    }
}
