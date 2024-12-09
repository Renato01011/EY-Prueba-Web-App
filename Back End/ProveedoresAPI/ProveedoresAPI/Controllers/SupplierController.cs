using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ProveedoresAPI.Data;
using ProveedoresAPI.Models;

namespace ProveedoresAPI.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    [ApiController]
    public class SupplierController : ControllerBase
    {
        private readonly SupplierData _supplierData;
        public SupplierController(SupplierData supplierData)
        {
            _supplierData = supplierData;
        }

        [HttpGet]
        public async Task<IActionResult> GetSuppliers()
        {
            Tuple<List<Supplier>,string> Suppliers = await _supplierData.GetSuppliers();
            if (Suppliers.Item1.Count != 0)
            {
                return StatusCode(StatusCodes.Status200OK, new { suppliers = Suppliers.Item1, message = Suppliers.Item2 });
            }
            else
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { suppliers = Suppliers.Item1, message = Suppliers.Item2 });
            }
        }

        [HttpPost]
        public async Task<IActionResult> CreateSuppliers([FromBody] Supplier supplier)
        {
            string resp = await _supplierData.AddSupplier(supplier);
            if (resp == "Ok")
            {
                return StatusCode(StatusCodes.Status200OK, new { isSuccess = resp });
            }
            else
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { isSuccess = resp });
            }
        }

        [HttpPut]
        public async Task<IActionResult> EditSuppliers([FromBody] Supplier supplier)
        {
            string resp = await _supplierData.EditSupplier(supplier);
            if (resp == "Ok")
            {
                return StatusCode(StatusCodes.Status200OK, new { isSuccess = resp });
            }
            else
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { isSuccess = resp });
            }
        }

        [HttpDelete("{idSupplier}")]
        public async Task<IActionResult> DeleteSuppliers(int idSupplier)
        {
            string resp = await _supplierData.DeleteSupplier(idSupplier);
            if (resp == "Ok")
            {
                return StatusCode(StatusCodes.Status200OK, new { isSuccess = resp });
            }
            else
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { isSuccess = resp });
            }
        }
    }
}
